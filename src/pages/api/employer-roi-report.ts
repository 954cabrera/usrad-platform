// src/pages/api/employer-roi-report.ts
// Unchanged architecture — only the PDF generator changes underneath.
// This file is intentionally minimal: validate → generate → stream → side effects.

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

    // ── Validation ──
    if (!companyName || !contactEmail || !totalEmployees) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: companyName, contactEmail, totalEmployees",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Generate PDF ──
    // generateROIReport now returns a Buffer (Puppeteer output)
    const pdfBuffer = await generateROIReport({
      companyName,
      contactName,
      totalEmployees:  Number(totalEmployees),
      wcScans:         Number(wcScans     || 0),
      healthScans:     Number(healthScans  || 0),
      avgCost:         Number(avgCost     || 2400),
    });

    // ── Build response — stream PDF first, side effects after ──
    const pdfFilename = `USRad-ROI-Report-${companyName.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;

    const pdfResponse = new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFilename}"`,
        "Content-Length":      String(pdfBuffer.length),
      },
    });

    // ── Calculate savings for lead record ──
    const annualSavings =
      (Number(wcScans || 0) + Number(healthScans || 0)) *
      (Number(avgCost || 2400) - 350);

    // ── Supabase lead insert (non-blocking) ──
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

    // ── Admin email notification (fire-and-forget) ──
    const firstName = contactName?.split(" ")[0] || "there";
    const remixUrl = process.env.PUBLIC_REMIX_URL ?? import.meta.env.PUBLIC_REMIX_URL;

    console.log("[ROI] Admin notification — PUBLIC_REMIX_URL:", remixUrl ?? "MISSING");
    console.log("[ROI] Admin notification — lead:", { contactEmail, companyName, annualSavings });

    if (!remixUrl) {
      console.error("[ROI] Admin notification SKIPPED — PUBLIC_REMIX_URL is not set in environment");
    } else {
      fetch(`${remixUrl}/api/marketing-email`, {
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
      })
      .then(res => {
        console.log("[ROI] Admin notification response:", res.status, res.statusText);
        if (!res.ok) {
          res.text().then(body => console.error("[ROI] Admin notification error body:", body));
        }
      })
      .catch(err => {
        console.error("[ROI] Admin notification fetch failed:", err);
      });
    }

    return pdfResponse;

  } catch (error) {
    console.error("ROI PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};