// src/pages/api/employer-consultation.js
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  try {
    // Check environment variables
    console.log('🔧 Environment check:');
    console.log('RESEND_API_KEY exists:', !!import.meta.env.RESEND_API_KEY);
    console.log('PUBLIC_SUPABASE_URL exists:', !!import.meta.env.PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY);

    const data = await request.json();
    console.log('📋 === Employer Consultation Request ===');
    console.log('Executive Name:', data.firstName, data.lastName);
    console.log('Company:', data.companyName);
    console.log('Email:', data.email);

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.companyName) {
      return new Response(
        JSON.stringify({ 
          error: 'Name, email, and company are required',
          received: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            companyName: data.companyName
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate reference ID
    const referenceId = `EC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Format the imaging challenges array if it exists
    const imagingChallengesFormatted = Array.isArray(data.imagingChallenges) 
      ? data.imagingChallenges.join(', ')
      : data.imagingChallenges || 'Not specified';

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error: dbError } = await supabase
      .from('employer_consultations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company_name: data.companyName,
        job_title: data.jobTitle || null,
        company_size: data.companySize || null,
        industry: data.industry || null,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime || null,
        consultation_type: data.consultationType || null,
        current_provider: data.currentProvider || null,
        imaging_challenges: Array.isArray(data.imagingChallenges) 
          ? data.imagingChallenges 
          : (data.imagingChallenges ? [data.imagingChallenges] : []),
        annual_budget: data.annualBudget || null,
        specific_needs: data.specificNeeds || null,
        timeline: data.timeline || null,
        reference_id: referenceId,
        status: 'new',
        submitted_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('❌ Database error:', dbError);
      throw new Error('Failed to save to database');
    }

    console.log('✅ Saved to database with reference:', referenceId);

    // Send notification email to admin (mcabrera@usrad.com)
    try {
      await resend.emails.send({
        from: 'USRad Employer Consultations <noreply@send.usrad.com>',
        to: 'mcabrera@usrad.com',
        subject: `🎯 New Employer Consultation Lead - ${data.companyName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Employer Consultation Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #cc9933 0%, #b8861f 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎯 New Consultation Lead
              </h1>
              <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Executive received calendar link to schedule
              </p>
            </td>
          </tr>

          <!-- Executive Information -->
          <tr>
            <td style="padding: 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h2 style="margin: 0 0 16px 0; color: #003087; font-size: 20px;">Executive Contact</h2>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Name:</strong> ${data.firstName} ${data.lastName}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Title:</strong> ${data.jobTitle || 'Not provided'}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Company:</strong> ${data.companyName}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Industry:</strong> ${data.industry || 'Not specified'}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Company Size:</strong> ${data.companySize || 'Not specified'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 8px;">
                    <a href="mailto:${data.email}" style="display: block; background-color: #003087; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; text-align: center; font-weight: 600;">
                      📧 Email
                    </a>
                  </td>
                  <td style="padding-left: 8px;">
                    <a href="tel:${data.phone || ''}" style="display: block; background-color: #22c55e; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; text-align: center; font-weight: 600;">
                      📞 Call
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scheduling Status -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h2 style="margin: 0 0 12px 0; color: #1e40af; font-size: 20px;">📅 Scheduling Status</h2>
                    <p style="margin: 0; color: #333; font-size: 15px;">
                      Executive received Calendly link to self-schedule consultation. You'll receive a calendar invite when they book their time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Current Benefits Info -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="margin: 0 0 12px 0; color: #003087; font-size: 18px;">Current Benefits Landscape</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Current Provider:</strong> ${data.currentProvider || 'Not disclosed'}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Annual Budget:</strong> ${data.annualBudget || 'Not disclosed'}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Implementation Timeline:</strong> ${data.timeline || 'Not specified'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pain Points -->
          ${data.imagingChallenges ? `
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #fee2e2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
                    <h3 style="margin: 0 0 12px 0; color: #991b1b; font-size: 18px;">🎯 Pain Points Identified</h3>
                    <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">
                      ${imagingChallengesFormatted}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Specific Needs -->
          ${data.specificNeeds ? `
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="margin: 0 0 12px 0; color: #003087; font-size: 18px;">Topics to Discuss</h3>
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #cc9933;">
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">
                  ${data.specificNeeds.replace(/\n/g, '<br>')}
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 18px;">📋 Action Items</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
                      <li>Executive received calendar link to self-schedule consultation</li>
                      <li>Prepare custom ROI analysis based on ${data.companySize || 'company size'}</li>
                      <li>Review their current provider (${data.currentProvider || 'TBD'})</li>
                      <li>Prepare briefing on implementation timeline</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reference ID -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 13px;">
                Reference ID: <strong>${referenceId}</strong>
              </p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 13px;">
                Submitted: ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      });
      console.log('✅ Admin notification sent to mcabrera@usrad.com');
    } catch (emailError) {
      console.error('❌ Error sending admin notification:', emailError);
    }

    // Send confirmation email to executive
    try {
      await resend.emails.send({
        from: 'USRad Benefits Team <noreply@send.usrad.com>',
        to: data.email,
        subject: 'Your Employer Benefits Consultation is Confirmed',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #003087 0%, #001f5c 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                ✓ Consultation Confirmed
              </h1>
              <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">
                Thank you for your interest in USRad
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">
                Hi ${data.firstName},
              </p>
              <p style="margin: 16px 0 0 0; color: #333; font-size: 16px; line-height: 1.6;">
                Thank you for requesting a consultation with USRad. I'm Michael Cabrera, President of USRad, and I'll be personally reaching out to discuss how we can help ${data.companyName} reduce imaging costs by 50-70% while improving employee satisfaction.
              </p>
            </td>
          </tr>

          <!-- Schedule Now Button -->
          <tr>
            <td style="padding: 0 30px 20px 30px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #cc9933 0%, #b8861f 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <h3 style="margin: 0 0 12px 0; color: #ffffff; font-size: 20px; font-weight: 700;">
                      📅 Schedule Your Consultation Now
                    </h3>
                    <p style="margin: 0 0 20px 0; color: #ffffff; font-size: 15px; opacity: 0.95;">
                      Choose a time that works best for you from my calendar
                    </p>
                    <a href="https://calendly.com/mcabrera-usrad/30min" style="display: inline-block; background-color: #ffffff; color: #003087; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                      View Available Times →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #f0f9ff; padding: 24px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h2 style="margin: 0 0 16px 0; color: #003087; font-size: 20px;">What Happens Next</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 600; font-size: 14px;">1</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.5;">
                                  <strong>Right now:</strong> Click the button above to schedule your consultation at a time that works for you
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 600; font-size: 14px;">2</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.5;">
                                  <strong>Before our call:</strong> I'll prepare a custom ROI analysis tailored to ${data.companyName}'s size and industry
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 32px; vertical-align: top;">
                                <div style="width: 24px; height: 24px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 600; font-size: 14px;">3</div>
                              </td>
                              <td style="padding-left: 12px;">
                                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.5;">
                                  <strong>During our consultation:</strong> We'll discuss your challenges and I'll show you exactly how we've helped similar companies achieve 50-70% savings
                                </p>
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

          <!-- Your Information -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="margin: 0 0 12px 0; color: #003087; font-size: 18px;">Your Consultation Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Company:</strong> ${data.companyName}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Company Size:</strong> ${data.companySize || 'Not specified'}
                    </p>
                    ${data.preferredDate ? `
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Preferred Date:</strong> ${data.preferredDate}
                    </p>
                    ` : ''}
                    ${data.preferredTime ? `
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Preferred Time:</strong> ${data.preferredTime}
                    </p>
                    ` : ''}
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Reference Number:</strong> ${referenceId}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Questions? -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #cc9933; text-align: center;">
                    <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 18px;">Haven't Scheduled Yet?</h3>
                    <p style="margin: 0 0 16px 0; color: #333; font-size: 15px;">
                      Don't forget to book your consultation time, or reach out if you have questions
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <a href="https://calendly.com/mcabrera-usrad/30min" style="display: block; background-color: #003087; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; text-align: center; font-weight: 600;">
                            📅 Schedule Consultation
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="mailto:mcabrera@usrad.com" style="display: block; background-color: #f3f4f6; color: #003087; text-decoration: none; padding: 12px 24px; border-radius: 6px; text-align: center; font-weight: 600;">
                            ✉️ Email Michael Cabrera
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 30px; border-top: 1px solid #e1e8ed;">
              <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; line-height: 1.6;">
                Looking forward to our conversation,<br>
                <strong style="color: #003087;">Michael Cabrera</strong><br>
                <span style="color: #666;">President, USRad</span>
              </p>
              <p style="margin: 16px 0 0 0; color: #999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} USRad. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      });
      console.log('✅ Confirmation email sent to executive');
    } catch (emailError) {
      console.error('❌ Error sending confirmation email:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceId,
        message: 'Consultation request received successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error processing employer consultation:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process consultation request',
        details: error.message // Include error message in production for debugging
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};