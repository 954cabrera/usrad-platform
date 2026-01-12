// src/pages/api/guide-download.ts
import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Supabase using YOUR env variables
const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY // Server-side key for full access
);

// Initialize Resend using YOUR env variable
const resend = new Resend(import.meta.env.RESEND_API_KEY);
const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://app.usrad.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, facilityType, source, timestamp } = data;

    // Validate required fields
    if (!name || !email || !facilityType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: name, email, facilityType",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate facilityType
    const validFacilityTypes = [
      "hospital",
      "independent",
      "mobile",
      "urgent-care",
      "other",
    ];
    if (!validFacilityTypes.includes(facilityType)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid facility_type",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("📄 Guide Download Request:", {
      name,
      email,
      facilityType,
      source,
    });

    // Step 1: Save to Supabase database
    const { data: guideDownload, error: dbError } = await supabase
      .from("guide_downloads")
      .insert({
        name,
        email,
        phone: phone || null,
        facility_type: facilityType,
        source: source || "exit_modal",
        guide_type: "cash-pay-imaging-decision",
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
        JSON.stringify({
          success: false,
          error: "Failed to save request",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("✅ Saved to database:", guideDownload.id);

    // Step 2: Generate branded PDF download URL
    const baseUrl = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';
    const pdfUrl = `${baseUrl}/guides/playbook?download=true&v=2`;

    console.log("📄 PDF URL:", pdfUrl);

    // Step 3: Send emails via Remix API (branded templates)
    const firstName = name.split(" ")[0];
    const pdfUrl = `${baseUrl}/guides/playbook?download=true&v=2`;
    
    let emailData: { id?: string } | null = null;

    console.log('📧 Sending emails via Remix API...');
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'guide-download',
          data: {
            firstName,
            name,
            email,
            phone,
            facilityType,
            pdfUrl,
          },
        }),
      });

      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log('✅ Emails sent via Remix API');
        console.log('   Customer Email ID:', result.customerEmailId);
        console.log('   Admin Email ID:', result.adminEmailId);
        emailData = { id: result.customerEmailId };
      } else {
        console.error('❌ Remix API failed:', emailResponse.status);
        // Fallback to direct Resend (simple email)
        const fromEmail = import.meta.env.RESEND_FROM_EMAIL || import.meta.env.FROM_EMAIL;
        const fallbackResult = await resend.emails.send({
          from: `USRad Guides <${fromEmail}>`,
          to: email,
          subject: "Your Cash-Pay Imaging Decision Guide is Ready",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #003087;">Hi ${firstName},</h2>
            <p>Your Cash-Pay Imaging Decision Guide is ready!</p>
            <p><a href="${pdfUrl}" style="background: #003087; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">📥 Download Guide</a></p>
            <p>Best,<br>USRad Provider Success Team</p>
          </div>`
        });
        emailData = fallbackResult.data;
        console.log('✅ Fallback email sent');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      // Fallback to direct Resend
      try {
        const fromEmail = import.meta.env.RESEND_FROM_EMAIL || import.meta.env.FROM_EMAIL;
        const fallbackResult = await resend.emails.send({
          from: `USRad Guides <${fromEmail}>`,
          to: email,
          subject: "Your Cash-Pay Imaging Decision Guide is Ready",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #003087;">Hi ${firstName},</h2>
            <p>Your Cash-Pay Imaging Decision Guide is ready!</p>
            <p><a href="${pdfUrl}" style="background: #003087; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">📥 Download Guide</a></p>
            <p>Best,<br>USRad Provider Success Team</p>
          </div>`
        });
        emailData = fallbackResult.data;
        console.log('✅ Fallback email sent');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
    }

    // Admin notification is now handled by Remix API

    // Step 5: Update database with email sent status
    await supabase
      .from("guide_downloads")
      .update({
        status: "sent",
        email_sent_at: new Date().toISOString(),
        email_id: emailData?.id || null,
      })
      .eq("id", guideDownload.id);

    // Step 6: Update or create lead score
    await updateLeadScore(email, "guide_download");

    console.log("🎉 Guide download process complete");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Guide download link sent to email",
        data: {
          email,
          guideName: "The Cash-Pay Imaging Decision",
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("❌ Guide download API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// Helper function to update lead scoring
async function updateLeadScore(email: string, action: "guide_download") {
  try {
    // Check if lead score exists
    const { data: existingScore } = await supabase
      .from("lead_scores")
      .select("*")
      .eq("email", email)
      .single();

    const pointsForAction = {
      guide_download: 20,
    };

    if (existingScore) {
      // Update existing score
      const newIntentScore = existingScore.intent_score + pointsForAction[action];
      const newTotalScore =
        existingScore.engagement_score + newIntentScore + existingScore.fit_score;
      const newGuidesDownloaded = existingScore.guides_downloaded + 1;

      // Calculate grade
      let grade = "C";
      if (newTotalScore >= 80) grade = "A";
      else if (newTotalScore >= 60) grade = "B";
      else if (newTotalScore >= 40) grade = "C";
      else if (newTotalScore >= 20) grade = "D";
      else grade = "F";

      await supabase
        .from("lead_scores")
        .update({
          intent_score: newIntentScore,
          total_score: newTotalScore,
          grade,
          guides_downloaded: newGuidesDownloaded,
          last_activity_at: new Date().toISOString(),
        })
        .eq("email", email);
    } else {
      // Create new lead score
      const intentScore = pointsForAction[action];
      const totalScore = intentScore;

      let grade = "D"; // 20 points = D grade
      if (totalScore >= 80) grade = "A";
      else if (totalScore >= 60) grade = "B";
      else if (totalScore >= 40) grade = "C";
      else if (totalScore >= 20) grade = "D";
      else grade = "F";

      await supabase.from("lead_scores").insert({
        email,
        intent_score: intentScore,
        total_score: totalScore,
        grade,
        guides_downloaded: 1,
        last_activity_at: new Date().toISOString(),
      });
    }

    console.log("✅ Lead score updated for:", email);
  } catch (error) {
    console.error("⚠️ Error updating lead score:", error);
    // Don't throw - lead scoring is non-critical
  }
}