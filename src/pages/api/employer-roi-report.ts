// src/pages/api/employer-roi-report.ts
// PDF generation and delivery are removed; this route no longer produces a document.
// Workstream A: the route stays parked pending the flat-fee-per-modality pricing
// rebuild — see open item #32 and standing rule 9 on reactivation.
// This file is intentionally minimal: validate → record lead → notify.

import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      contactEmail,
      totalEmployees,
      totalScans,
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

    // ── Calculate savings for the admin notification ──
    // Retained deliberately. This figure is NO LONGER PERSISTED (annual_savings is
    // omitted from the insert below, founder-ruled under FD-MKT-002), but it still
    // feeds `projectedSavings` on the outbound notification, where the portal
    // template interpolates it at six unguarded sites. Removing it would render the
    // literal string "undefined" into the admin email, including its subject line.
    const annualSavings =
      Number(totalScans || 0) * (Number(avgCost || 2400) - 350);

    // ── Supabase lead insert ──
    // supabase-js v2 `.insert()` RESOLVES with { data, error } rather than throwing,
    // so a PostgREST rejection is invisible to try/catch. The result is inspected
    // explicitly and the outcome tracked, because the response status below depends
    // on it (FD-MKT-002).
    let leadPersisted = false;

    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const { error: insertError } = await supabase.from("employer_leads").insert({
          company_name:      companyName,
          contact_name:      contactName || null,
          contact_email:     contactEmail,
          total_employees:   Number(totalEmployees),
          total_scans:       Number(totalScans || 0),
          avg_cost_per_scan: Number(avgCost    || 2400),
          source:            "roi_calculator",
          created_at:        new Date().toISOString(),
        });

        if (insertError) {
          // Sanitized: code and message only. `details` and `hint` are deliberately
          // NOT logged — PostgREST can echo submitted row values into them, which
          // would put lead PII in the logs.
          console.error("[ROI] Lead persistence FAILED — no row was written:", {
            code: insertError.code,
            message: insertError.message,
          });
        } else {
          leadPersisted = true;
        }
      } catch (dbError) {
        // Genuinely thrown: network, DNS, TLS, createClient. Also a persistence failure.
        console.error("[ROI] Lead persistence FAILED — threw before returning a result:", {
          name: (dbError as Error)?.name,
          message: (dbError as Error)?.message,
        });
      }
    } else {
      console.error("[ROI] Lead persistence FAILED — Supabase env vars missing; nothing was recorded");
    }

    // ── Admin email notification ──
    // Attempted UNCONDITIONALLY, including after a persistence failure. This is the
    // current fallback record of the prospect, so it is never skipped or
    // short-circuited on the insert's outcome (FD-MKT-002, founder-ruled).
    let adminNotified = false;
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
        if (res.ok) {
          adminNotified = true;
        } else {
          const body = await res.text();
          console.error("[ROI] Admin notification error body:", body);
        }
      } catch (err) {
        console.error("[ROI] Admin notification fetch failed:", err);
      }
    }

    // ── Response ──
    // Founder-ruled under FD-MKT-002:
    //   insert OK                            -> notify -> 200
    //   insert FAILS, notification SUCCEEDS  -> notify -> 200
    //   insert FAILS and notification FAILS  -> 500
    // 500 fires only when BOTH channels failed, i.e. when no record of this
    // prospect exists anywhere and the submission is genuinely lost.
    if (!leadPersisted && !adminNotified) {
      console.error(
        "[ROI] TOTAL FAILURE — lead was neither persisted nor notified; no record of this prospect exists"
      );
      return new Response(
        JSON.stringify({ error: "Failed to record your request. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("ROI PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};