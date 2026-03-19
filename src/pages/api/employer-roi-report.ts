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
      website_url,
      form_start,
    } = body;

    // ── Anti-bot: honeypot (bots fill hidden fields; humans don't) ──
    if (website_url) {
      console.log("[ROI] Honeypot triggered — bot submission blocked:", { contactEmail, companyName });
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Anti-bot: timing check (real users take > 3s to fill a form) ──
    const elapsed = form_start ? Date.now() - Number(form_start) : 99999;
    if (elapsed < 3000) {
      console.log("[ROI] Timing check failed — submission too fast:", elapsed, "ms");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Anti-bot: block free/consumer email domains ──
    const FREE_EMAIL_DOMAINS = [
      "gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com",
      "icloud.com","protonmail.com","mail.com","ymail.com","live.com",
    ];
    const emailDomain = contactEmail?.split("@")[1]?.toLowerCase();
    if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
      return new Response(
        JSON.stringify({ error: "Please use your work email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

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
      try {
        const res = await fetch(`${remixUrl}/api/marketing-email`, {
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
        });
        console.log("[ROI] Admin notification response:", res.status, res.statusText);
        if (!res.ok) {
          const body = await res.text();
          console.error("[ROI] Admin notification error body:", body);
        }
      } catch (err) {
        console.error("[ROI] Admin notification fetch failed:", err);
      }
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