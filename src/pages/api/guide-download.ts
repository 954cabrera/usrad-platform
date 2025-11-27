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
        guide_type: "cash-pay-imaging-playbook",
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

    // Step 2: Generate PDF URL from Supabase Storage
    const baseUrl = import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';
    const pdfUrl = `${baseUrl}/guides/playbook?download=true`;

    console.log("📄 PDF URL:", pdfUrl);

    // Step 3: Send email via Resend (using YOUR from email)
    const firstName = name.split(" ")[0];
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL || import.meta.env.FROM_EMAIL;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `USRad Guides <${fromEmail}>`,
      to: email,
      subject: "Your Cash-Pay Imaging Playbook is Ready",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:0 auto;">
          
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px;text-align:center;">
              <h1 style="margin:0;font-size:24px;color:#1f2937;font-weight:bold;">
                Your Cash-Pay Imaging Playbook is Ready
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.5;">
                Hi ${firstName},
              </p>
              
              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.5;">
                Thanks for your interest in cash-pay imaging! Your playbook is ready for download:
              </p>

              <!-- NEW: Two options -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" style="display:inline-block;">
                      <tr>
                        <!-- Primary: Download -->
                        <td style="padding-right:8px;">
                          <a href="${pdfUrl}" 
                            style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:6px;font-size:16px;font-weight:bold;">
                            📥 Download Playbook
                          </a>
                        </td>
                        <!-- Secondary: Preview -->
                        <td style="padding-left:8px;">
                          <a href="${baseUrl}/guides/playbook?download=false" 
                            style="display:inline-block;background-color:#ffffff;color:#2563eb;text-decoration:none;padding:16px 32px;border-radius:6px;font-size:16px;font-weight:600;border:2px solid #2563eb;">
                            👁️ Preview Online
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 16px;font-size:16px;color:#374151;line-height:1.5;">
                <strong>Inside you'll find:</strong>
              </p>

              <ul style="margin:0 0 24px;padding-left:20px;color:#374151;font-size:16px;line-height:1.8;">
                <li>Market opportunity analysis ($200K-600K revenue potential)</li>
                <li>Economics comparison (insurance vs. cash-pay)</li>
                <li>Two implementation paths (independent vs. partnership)</li>
                <li>Real AnciCare network results (1,200 centers, $180M delivered)</li>
              </ul>

              <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.5;">
                <strong>Quick question:</strong> What prompted you to explore cash-pay options for your facility?
              </p>

              <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.5;">
                I'm happy to discuss your specific situation anytime.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="https://cal.com/usrad/15min" 
                       style="display:inline-block;background-color:#10b981;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">
                      📅 Schedule a 15-Minute Call
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:16px;color:#374151;line-height:1.5;">
                Best,<br>
                <strong>USRad Provider Success Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
              <p style="margin:0 0 8px;font-size:14px;color:#6b7280;text-align:center;">
                USRad | Connecting Patients to Quality Imaging
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                1234 Healthcare Blvd, Fort Lauderdale, FL 33301
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
                <a href="https://usrad.com/privacy" style="color:#2563eb;text-decoration:none;">Privacy Policy</a> | 
                <a href="https://usrad.com/contact" style="color:#2563eb;text-decoration:none;">Contact Us</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (emailError) {
      console.error("❌ Email error:", emailError);

      // Update database with failure status
      await supabase
        .from("guide_downloads")
        .update({ status: "failed" })
        .eq("id", guideDownload.id);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send email",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("✅ Email sent:", emailData?.id);

    // Step 4: Update database with email sent status
    await supabase
      .from("guide_downloads")
      .update({
        status: "sent",
        email_sent_at: new Date().toISOString(),
        email_id: emailData?.id || null,
      })
      .eq("id", guideDownload.id);

    // Step 5: Update or create lead score
    await updateLeadScore(email, "guide_download");

    console.log("🎉 Guide download process complete");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Guide download link sent to email",
        data: {
          email,
          guideName: "The Complete Cash-Pay Imaging Playbook",
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