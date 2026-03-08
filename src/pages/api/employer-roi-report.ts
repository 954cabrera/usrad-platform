// src/pages/api/employer-roi-report.ts
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { generateROIReport } from "../../lib/roi-pdf/generateROIReport";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      contactEmail,
      totalEmployees,
      wcScans,
      healthScans,
      avgCost,
    } = body;

    if (!companyName || !contactEmail || !totalEmployees) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: companyName, contactEmail, totalEmployees" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Generate PDF in-process — no Python, no subprocess ──
    const pdfBytes = await generateROIReport({
      companyName,
      contactName,
      totalEmployees: Number(totalEmployees),
      wcScans:        Number(wcScans    || 0),
      healthScans:    Number(healthScans || 0),
      avgCost:        Number(avgCost    || 2400),
    });

    // ── Stream PDF to browser first ──
    const pdfFilename = `USRad-ROI-Report-${companyName.replace(/\s+/g, "-")}.pdf`;
    const pdfResponse = new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFilename}"`,
        "Content-Length":      String(pdfBytes.length),
      },
    });

    // ── Save lead to Supabase (non-blocking, after PDF ready) ──
    const annualSavings =
      (Number(wcScans || 0) + Number(healthScans || 0)) *
      (Number(avgCost || 2400) - 350);

    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        await supabase.from("employer_leads").insert({
      company_name:      companyName,
      contact_name:      contactName || null,
      contact_email:     contactEmail,
      total_employees:   Number(totalEmployees),
      wc_scans:          Number(wcScans    || 0),
      health_scans:      Number(healthScans || 0),
      avg_cost_per_scan: Number(avgCost    || 2400),
      annual_savings:    annualSavings,
      source:            "roi_calculator",
      created_at:        new Date().toISOString(),
    });
    } catch (dbError) {
          console.error("Supabase insert failed (non-fatal):", dbError);
        }
      } else {
        console.warn("Supabase env vars missing — skipping lead insert");
      }

    // ── Fire admin alert via Remix — non-blocking ──
    const firstName = contactName?.split(" ")[0] || "there";

    fetch(`${import.meta.env.PUBLIC_REMIX_URL}/api/marketing-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "employer-roi-report",
        data: {
          firstName,
          name:             contactName || contactEmail,
          email:            contactEmail,
          company:          companyName,
          projectedSavings: `$${annualSavings.toLocaleString()}`,
          employees:        Number(totalEmployees).toLocaleString(),
        },
      }),
    }).catch(() => {}); // non-blocking — don't let email failure block PDF delivery

    return pdfResponse;

  } catch (error) {
    console.error("ROI PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};