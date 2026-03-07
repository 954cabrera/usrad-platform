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
    const { name, email, company, source } = data;

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

    console.log("📄 Employer Guide Download Request:", { name, email, company, source });

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

    // Step 2: PDF URL — update this path once guide is uploaded to Supabase Storage
    const pdfUrl =
      "https://skpxihbmwdswmcajnhut.supabase.co/storage/v1/object/public/guides/usrad-employer-implementation-guide.pdf";

    const firstName = name.split(" ")[0];
    let emailData: { id?: string } | null = null;

    // Step 3: Send emails via Remix API, fallback to Resend
    console.log("📧 Sending emails via Remix API...");
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "employer-guide-download",
          data: { firstName, name, email, company, pdfUrl },
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
        const fallbackResult = await resend.emails.send({
          from: `USRad <${fromEmail}>`,
          to: email,
          subject: "Your Employer Implementation Guide is Ready",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #003087;">Hi ${firstName},</h2>
            <p>Thank you for your interest in USRad. Your Employer Implementation Guide is ready to download.</p>
            <p style="margin: 24px 0;">
              <a href="${pdfUrl}" style="background: #003087; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                📥 Download the Guide
              </a>
            </p>
            <p>When you're ready to talk specifics, you can schedule a 30-minute briefing directly with Michael Cabrera, our founder:</p>
            <p>
              <a href="https://usrad.com/employer/schedule" style="color: #003087;">Schedule Executive Briefing →</a>
            </p>
            <p style="margin-top: 32px; color: #666; font-size: 14px;">
              Best,<br>
              Michael Cabrera<br>
              President & Founder, USRad
            </p>
          </div>`,
        });
        emailData = fallbackResult.data;
        console.log("✅ Fallback email sent");
      } catch (fallbackError) {
        console.error("❌ Fallback email also failed:", fallbackError);
        // Non-fatal — lead is saved, continue
      }
    }

    // Step 4: Update database status
    await supabase
      .from("guide_downloads")
      .update({
        status: "sent",
        email_sent_at: new Date().toISOString(),
        email_id: emailData?.id || null,
      })
      .eq("id", guideDownload.id);

    // Step 5: Update lead score (non-fatal)
    try {
      const { data: existingScore } = await supabase
        .from("lead_scores")
        .select("*")
        .eq("email", email)
        .single();

      if (existingScore) {
        const newIntentScore = existingScore.intent_score + 20;
        const newTotal = existingScore.engagement_score + newIntentScore + existingScore.fit_score;
        const grade = newTotal >= 80 ? "A" : newTotal >= 60 ? "B" : newTotal >= 40 ? "C" : "D";
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