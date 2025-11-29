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
    const pdfUrl = `${baseUrl}/guides/playbook?download=true`;

    console.log("📄 PDF URL:", pdfUrl);

    // Step 3: Send email via Resend (using YOUR from email)
    const firstName = name.split(" ")[0];
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL || import.meta.env.FROM_EMAIL;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `USRad Guides <${fromEmail}>`,
      to: email,
      subject: "Your Cash-Pay Imaging Decision Guide is Ready",
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
                Your Cash-Pay Imaging Decision Guide is Ready
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
                Thanks for your interest in cash-pay imaging! Your executive guide is ready for download:
              </p>

              <!-- Two Button Options -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" style="display:inline-block;">
                      <tr>
                        <!-- Primary: Download -->
                        <td style="padding-right:8px;">
                          <a href="${pdfUrl}" 
                             style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:6px;font-size:16px;font-weight:bold;">
                            📥 Download Guide
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
                <li>Should you build your own cash-pay program or partner with a network?</li>
                <li>Real economics: What centers actually earn from cash-pay patients</li>
                <li>The AnciCare case study: How 1,200+ centers built a $180M network</li>
                <li>Hidden costs and realistic timelines for both paths</li>
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
                <strong style="color:#1f2937;">USRad Provider Success Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <p style="margin:0;font-size:14px;color:#6b7280;font-weight:600;">
                      USRad | Connecting Patients to Quality Imaging
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">
                      1234 Healthcare Blvd, Fort Lauderdale, FL 33301
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" style="display:inline-block;">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="${baseUrl}/privacy" style="color:#2563eb;text-decoration:none;font-size:12px;">Privacy Policy</a>
                        </td>
                        <td style="padding:0 8px;color:#d1d5db;">|</td>
                        <td style="padding:0 8px;">
                          <a href="${baseUrl}/contact" style="color:#2563eb;text-decoration:none;font-size:12px;">Contact Us</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
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
      console.error("❌ Email send error:", emailError);
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

    console.log("✅ Email sent successfully:", emailData?.id);

    // Step 4: Send notification to sales team
    try {
      await resend.emails.send({
        from: `USRad Lead Alerts <${fromEmail}>`,
        to: "support@usrad.com",
        subject: `🔔 New Guide Download: ${name} (${facilityType})`,
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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);margin:0 auto;">
          
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;background-color:#2563eb;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:bold;">
                🔔 New Guide Download
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.5;">
                Someone just downloaded the Cash-Pay Imaging Decision Guide:
              </p>

              <!-- Lead Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <!-- Name -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Name:</td>
                        <td style="font-size:16px;color:#1f2937;font-weight:600;">${name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Email -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Email:</td>
                        <td style="font-size:16px;color:#1f2937;">
                          <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Phone -->
                ${phone ? `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Phone:</td>
                        <td style="font-size:16px;color:#1f2937;">
                          <a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                <!-- Facility Type -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Facility Type:</td>
                        <td style="font-size:16px;color:#1f2937;text-transform:capitalize;">${facilityType.replace('-', ' ')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Source -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Source:</td>
                        <td style="font-size:16px;color:#1f2937;text-transform:capitalize;">${source || "exit_modal"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Lead Score -->
                <tr>
                  <td style="padding:12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:140px;font-size:14px;color:#6b7280;font-weight:600;padding-left:16px;">Initial Score:</td>
                        <td>
                          <span style="display:inline-block;padding:4px 12px;background-color:#fef3c7;color:#92400e;border-radius:4px;font-size:14px;font-weight:600;">
                            20 points (Grade D - COLD)
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 16px;">
                    <h3 style="margin:0;font-size:16px;color:#1f2937;">Quick Actions:</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Email Button -->
                        <td style="padding-right:8px;">
                          <a href="mailto:${email}?subject=Following up on your USRad guide download&body=Hi ${firstName},%0D%0A%0D%0AI saw you downloaded our Cash-Pay Imaging Decision Guide. " 
                             style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">
                            📧 Send Email
                          </a>
                        </td>
                        <!-- Call Button -->
                        <td style="padding-left:8px;">
                          ${phone ? `
                          <a href="tel:${phone}" 
                             style="display:inline-block;background-color:#10b981;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">
                            📞 Call Now
                          </a>
                          ` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dashboard Link -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:6px;padding:16px;">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 12px;font-size:14px;color:#6b7280;">
                      View full lead details in your dashboard:
                    </p>
                    <a href="${baseUrl}/admin/leads" 
                       style="display:inline-block;background-color:#ffffff;color:#2563eb;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:14px;font-weight:600;border:2px solid #2563eb;">
                      View Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">
                This is an automated notification from your USRad lead capture system.
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
      console.log("✅ Notification email sent to support@usrad.com");
    } catch (notificationError) {
      console.error("⚠️ Failed to send notification email:", notificationError);
      // Don't throw - user email already sent successfully
    }

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