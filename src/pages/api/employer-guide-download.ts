// src/pages/api/employer-guide-download.ts
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || "https://app.usrad.com";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, company, source, roiData, website_url, form_start } = data;

    // ── Anti-bot: honeypot ──
    if (website_url) {
      console.log("[Guide] Honeypot triggered — bot blocked:", { email, company });
      return new Response(JSON.stringify({ success: true, message: "Guide sent to your inbox" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // ── Anti-bot: timing check ──
    const elapsed = form_start ? Date.now() - Number(form_start) : 99999;
    if (elapsed < 3000) {
      console.log("[Guide] Timing check failed:", elapsed, "ms");
      return new Response(JSON.stringify({ success: true, message: "Guide sent to your inbox" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // ── Anti-bot: free email domain block ──
    const FREE_EMAIL_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","mail.com","ymail.com","live.com"];
    const emailDomain = email?.split("@")[1]?.toLowerCase();
    if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
      return new Response(JSON.stringify({ success: false, message: "Please use your work email address." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Validate required fields
    if (!name || !email || !company) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields: name, email, company" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("📄 Employer Guide Download Request:", { name, email, company, source, roiData });

    // Step 1: Save to Supabase
    const { data: guideDownload, error: dbError } = await supabase
      .from("guide_downloads")
      .insert({
        name,
        email,
        phone: null,
        facility_type: "employer",
        source: source || "employer-implementation-guide",
        guide_type: "employer-implementation-guide",
        page_url: request.headers.get("referer") || null,
        user_agent: request.headers.get("user-agent") || null,
        referrer: request.headers.get("referer") || null,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to save request" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Saved to database:", guideDownload.id);

    const pdfUrl =
      "https://skpxihbmwdswmcajnhut.supabase.co/storage/v1/object/public/guides/usrad-employer-implementation-guide.pdf";

    const firstName = name.split(" ")[0];

    // Format ROI values for email display (if provided from calculator)
    const hasRoi = !!(roiData?.projectedSavings);
    const formattedSavings = hasRoi ? String(roiData.projectedSavings) : null;
    const formattedEmployees = hasRoi && roiData?.employees
      ? String(roiData.employees)
      : null;

    let emailData: { id?: string } | null = null;

    // Step 2: Send emails via Remix API (branded templates), fallback to Resend
    console.log("📧 Sending emails via Remix API...");
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "employer-guide-download",
          data: {
            firstName,
            name,
            email,
            company,
            pdfUrl,
            // Pass ROI data through so branded template can show personalized savings
            roiData: hasRoi
              ? {
                  projectedSavings: formattedSavings,
                  employees: formattedEmployees,
                }
              : null,
          },
        }),
      });

      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log("✅ Emails sent via Remix API");
        emailData = { id: result.customerEmailId };
      } else {
        throw new Error(`Remix API responded with ${emailResponse.status}`);
      }
    } catch (err) {
      console.error("⚠️ Remix API failed, falling back to Resend:", err);
      try {
        const fromEmail =
          import.meta.env.RESEND_FROM_EMAIL || import.meta.env.FROM_EMAIL;

        // ROI panel — only rendered when calculator data is present
        const roiPanel = hasRoi
          ? `
            <div style="background: linear-gradient(135deg, #16a34a, #059669); border-radius: 12px; padding: 20px 24px; margin: 24px 0; text-align: center;">
              <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin: 0 0 4px 0; font-weight: 500;">Your Projected Year-One Savings</p>
              <p style="color: white; font-size: 38px; font-weight: 800; margin: 0; letter-spacing: -1px;">${formattedSavings}</p>
              ${formattedEmployees ? `<p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 8px 0 0 0;">for a ${formattedEmployees}-employee workforce</p>` : ""}
            </div>
          `
          : "";

        const emailSubject = `Your Employer Implementation Guide is Ready`;

        const introText = `Thank you for your interest in USRad. Your Employer Implementation Guide is ready to download.`;

        const fallbackResult = await resend.emails.send({
          from: `USRad <${fromEmail}>`,
          to: email,
          subject: emailSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">

              <!-- Header -->
              <div style="background: #003087; border-radius: 12px 12px 0 0; padding: 28px 32px; text-align: center;">
                <p style="color: white; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">USRad</p>
                <p style="color: rgba(255,255,255,0.65); font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Employer Imaging Solutions</p>
              </div>

              <!-- Body -->
              <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 36px 32px;">

                <h2 style="color: #003087; font-size: 22px; font-weight: 700; margin: 0 0 20px 0;">Hi ${firstName},</h2>

                ${roiPanel}

                <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 28px 0;">${introText}</p>

                <!-- Download CTA -->
                <div style="text-align: center; margin: 0 0 32px 0;">
                  <a href="${pdfUrl}"
                     style="background: #003087; color: white; padding: 16px 36px; text-decoration: none; border-radius: 10px; display: inline-block; font-weight: 700; font-size: 15px;">
                    📥 Download the Implementation Guide
                  </a>
                </div>

                <!-- What's inside hint -->
                <div style="background: #f8fafc; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px;">
                  <p style="color: #374151; font-size: 13px; font-weight: 600; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">What's inside:</p>
                  <ul style="color: #4b5563; font-size: 14px; line-height: 1.7; margin: 0; padding-left: 18px;">
                    <li>30-day implementation timeline</li>
                    <li>WC &amp; health benefits integration workflows</li>
                    <li>Roles &amp; responsibilities breakdown</li>
                    <li>Reporting &amp; analytics setup</li>
                  </ul>
                </div>

                <!-- Schedule CTA -->
                <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
                  <p style="color: #374151; font-size: 14px; margin: 0 0 12px 0; line-height: 1.6;">
                    When you're ready to talk specifics, schedule a 30-minute briefing directly with me — no sales team, no middlemen:
                  </p>
                  <a href="https://usrad.com/employer/schedule"
                     style="color: #003087; font-weight: 700; font-size: 14px; text-decoration: none;">
                    Schedule Executive Briefing →
                  </a>
                </div>

                <!-- Signature -->
                <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
                  <p style="color: #6b7280; font-size: 13px; line-height: 1.7; margin: 0;">
                    Best,<br>
                    <strong style="color: #111827; font-size: 14px;">Michael Cabrera</strong><br>
                    President &amp; Founder, USRad<br>
                    <span style="color: #9ca3af; font-size: 12px;">Founded AnciCare · Acquired by CorVel (NASDAQ: CRVL)</span>
                  </p>
                </div>

              </div>
            </div>
          `,
        });
        emailData = fallbackResult.data;
        console.log("✅ Fallback email sent");
      } catch (fallbackError) {
        console.error("❌ Fallback email also failed:", fallbackError);
        // Non-fatal — lead is saved, continue
      }
    }

    // Step 3: Update database status
    await supabase
      .from("guide_downloads")
      .update({
        status: "sent",
        email_sent_at: new Date().toISOString(),
        email_id: emailData?.id || null,
      })
      .eq("id", guideDownload.id);

    // Step 4: Update lead score (non-fatal)
    try {
      const { data: existingScore } = await supabase
        .from("lead_scores")
        .select("*")
        .eq("email", email)
        .single();

      if (existingScore) {
        const newIntentScore = existingScore.intent_score + 20;
        const newTotal =
          existingScore.engagement_score + newIntentScore + existingScore.fit_score;
        const grade =
          newTotal >= 80 ? "A" : newTotal >= 60 ? "B" : newTotal >= 40 ? "C" : "D";
        await supabase
          .from("lead_scores")
          .update({
            intent_score: newIntentScore,
            total_score: newTotal,
            grade,
            guides_downloaded: existingScore.guides_downloaded + 1,
            last_activity_at: new Date().toISOString(),
          })
          .eq("email", email);
      } else {
        await supabase.from("lead_scores").insert({
          email,
          intent_score: 20,
          total_score: 20,
          grade: "D",
          guides_downloaded: 1,
          last_activity_at: new Date().toISOString(),
        });
      }
      console.log("✅ Lead score updated for:", email);
    } catch (scoreError) {
      console.error("⚠️ Lead score update failed (non-fatal):", scoreError);
    }

    console.log("🎉 Employer guide download process complete");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Guide sent to your inbox",
        data: { email, guideName: "Employer Implementation Guide" },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Employer guide download API error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};