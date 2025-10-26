// src/pages/api/provider-consultation.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  console.log('🏥 === Provider Consultation Request ===');
  
  try {
    const data = await request.json();
    console.log('Provider Name:', data.firstName, data.lastName);
    console.log('Organization:', data.organizationName);
    console.log('Center Count:', data.centerCount);
    console.log('Email:', data.email);

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.position || !data.organizationName || !data.centerCount) {
      return new Response(
        JSON.stringify({ 
          error: 'Name, email, position, organization, and center count are required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine if this is a VIP lead (10+ centers)
    const isVIP = ['10-20', '21-50', '50+'].includes(data.centerCount);
    console.log('Is VIP Lead (10+ centers):', isVIP);

    // Generate reference ID
    const referenceId = `PC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Format the primary interests array if it exists
    const primaryInterestsFormatted = Array.isArray(data.primaryInterest) 
      ? data.primaryInterest.join(', ')
      : data.primaryInterest || 'Not specified';

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('💾 Saving to database...');
    const { error: dbError } = await supabase
      .from('provider_consultations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        position: data.position || null,
        organization_name: data.organizationName,
        center_count: data.centerCount,
        monthly_volume: data.monthlyVolume || null,
        center_locations: data.centerLocations || null,
        primary_interest: Array.isArray(data.primaryInterest) 
          ? data.primaryInterest 
          : (data.primaryInterest ? [data.primaryInterest] : []),
        additional_questions: data.additionalQuestions || null,
        timeline: data.timeline || null,
        is_vip: isVIP,
        reference_id: referenceId,
        status: 'new',
        consultation_scheduled: false,
        submitted_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('❌ Database error:', dbError);
      throw new Error('Failed to save to database');
    }

    console.log('✅ Saved to database with reference:', referenceId);

    // Send notification email to admin
    try {
      console.log('📧 Sending admin notification...');
      console.log('Admin email:', process.env.MCABRERA_EMAIL || 'NOT SET');
      await resend.emails.send({
        from: 'USRad Provider Network <providers@send.usrad.com>',
        to: process.env.MCABRERA_EMAIL || 'mcabrera@usrad.com',
        subject: isVIP 
          ? `🎯 HIGH VALUE LEAD - ${data.centerCount} Centers - ${data.organizationName}`
          : `📋 New Provider Inquiry - ${data.centerCount} Centers - ${data.organizationName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Provider Consultation Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: ${isVIP ? 'linear-gradient(135deg, #cc9933 0%, #b8861f 100%)' : 'linear-gradient(135deg, #003087 0%, #004299 100%)'}; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${isVIP ? '🎯 VIP Provider Lead' : '📋 New Provider Inquiry'}
              </h1>
              <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                ${isVIP ? 'High-value lead with 10+ imaging centers' : 'Provider consultation request received'}
              </p>
            </td>
          </tr>

          ${isVIP ? `
          <!-- VIP Alert -->
          <tr>
            <td style="padding: 20px 30px;">
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  ⭐ This is a high-value lead! Personal consultation recommended.
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Provider Information -->
          <tr>
            <td style="padding: 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h2 style="margin: 0 0 16px 0; color: #003087; font-size: 20px;">Provider Contact</h2>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Name:</strong> ${data.firstName} ${data.lastName}
                    </p>
                    ${data.position ? `
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Position:</strong> ${data.position}
                    </p>
                    ` : ''}
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Email:</strong> <a href="mailto:${data.email}" style="color: #003087; text-decoration: none;">${data.email}</a>
                    </p>
                    ${data.phone ? `
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #003087; text-decoration: none;">${data.phone}</a>
                    </p>
                    ` : ''}
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Organization:</strong> ${data.organizationName}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Center Count:</strong> <span style="color: ${isVIP ? '#cc9933' : '#003087'}; font-weight: 700;">${data.centerCount} centers</span>
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Monthly Volume:</strong> ${data.monthlyVolume || 'Not specified'}
                    </p>
                    ${data.centerLocations ? `
                    <p style="margin: 8px 0; color: #333; font-size: 16px;">
                      <strong>Locations:</strong> ${data.centerLocations}
                    </p>
                    ` : ''}
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

          <!-- Primary Interests -->
          ${data.primaryInterest ? `
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #003087;">
                    <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 18px;">Primary Interests</h3>
                    <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">
                      ${primaryInterestsFormatted}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Additional Questions -->
          ${data.additionalQuestions ? `
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="margin: 0 0 12px 0; color: #003087; font-size: 18px;">Additional Questions</h3>
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #cc9933;">
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                  ${data.additionalQuestions}
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Timeline & Next Steps -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Timeline:</strong> ${data.timeline || 'Not specified'}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Reference ID:</strong> ${referenceId}
                    </p>
                    <p style="margin: 8px 0; color: #333; font-size: 15px;">
                      <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                        dateStyle: 'full', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${isVIP ? `
          <!-- VIP Action Reminder -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #cc9933 0%, #b8861f 100%); padding: 24px; border-radius: 8px; text-align: center;">
                    <h3 style="margin: 0 0 12px 0; color: #ffffff; font-size: 18px;">Recommended Action</h3>
                    <p style="margin: 0 0 16px 0; color: #ffffff; font-size: 15px; opacity: 0.95;">
                      Consider scheduling a personal consultation to discuss their specific needs and present custom pricing.
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 14px;">
                      Provider has received your calendar link for self-scheduling.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      });
      console.log('✅ Admin notification sent');
    } catch (emailError) {
      console.error('❌ Error sending admin notification:', emailError);
    }

    // Send confirmation email to provider (different based on VIP status)
    try {
      console.log('📧 Sending provider confirmation email...');
      
      const calendarLink = 'https://cal.com/usrad/15min';
      
      await resend.emails.send({
        from: 'USRad Provider Network <providers@send.usrad.com>',
        to: data.email,
        subject: isVIP 
          ? 'Personal Consultation with USRad President - Michael Cabrera'
          : 'Welcome to the USRad Provider Network',
        html: isVIP ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Schedule Your Consultation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #cc9933 0%, #b8861f 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Let's Discuss Your Partnership
              </h1>
              <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">
                Personal consultation with Michael Cabrera, President
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
                Thank you for your interest in joining the USRad provider network. Given ${data.organizationName}'s scale with multiple imaging centers, I'd like to personally discuss how we can support your growth and success.
              </p>
            </td>
          </tr>

          <!-- Calendar CTA -->
          <tr>
            <td style="padding: 0 30px 20px 30px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #003087 0%, #004299 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <h3 style="margin: 0 0 12px 0; color: #ffffff; font-size: 20px; font-weight: 700;">
                      📅 Schedule Your Consultation
                    </h3>
                    <p style="margin: 0 0 20px 0; color: #ffffff; font-size: 15px; opacity: 0.95;">
                      Choose a time that works best for you
                    </p>
                    <a href="${calendarLink}" style="display: inline-block; background-color: #cc9933; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                      View Available Times →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What to Expect -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <h3 style="margin: 0 0 16px 0; color: #003087; font-size: 20px;">What We'll Discuss</h3>
              <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
                <li>Custom pricing based on your volume and locations</li>
                <li>Revenue opportunities with 10-day payment terms</li>
                <li>Market expansion strategies for your centers</li>
                <li>Integration process and timeline</li>
                <li>Success stories from similar multi-center groups</li>
              </ul>
            </td>
          </tr>

          <!-- Why USRad -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 24px; border-radius: 8px; border-left: 4px solid #003087;">
                <h3 style="margin: 0 0 12px 0; color: #003087; font-size: 18px;">Why Multi-Center Groups Choose USRad</h3>
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">
                  We delivered over <strong>$180 million</strong> to imaging centers through AnciCare, our previous platform. Same proven team, new direct-to-patient model with even better economics for providers.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; border-top: 1px solid #e1e8ed; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; line-height: 1.6;">
                Looking forward to our conversation,<br>
                <strong style="color: #003087;">Michael Cabrera</strong><br>
                <span style="color: #666;">President, USRad</span>
              </p>
              <p style="margin: 16px 0 0 0; color: #999; font-size: 12px;">
                Reference: ${referenceId}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        ` : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to USRad</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #003087 0%, #004299 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                Welcome to USRad! 🎉
              </h1>
              <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">
                Let's get you started
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">
                Hi ${data.firstName},
              </p>
              <p style="margin: 16px 0 0 0; color: #333; font-size: 16px; line-height: 1.6;">
                Thanks for your interest in joining the USRad provider network. We're excited to partner with ${data.organizationName}!
              </p>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 8px; border-left: 4px solid #22c55e;">
                <h3 style="margin: 0 0 16px 0; color: #065f46; font-size: 20px;">Next Steps</h3>
                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0;">
                      <div style="display: flex; align-items: flex-start;">
                        <div style="width: 32px; height: 32px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">1</div>
                        <p style="margin: 4px 0; color: #333; font-size: 15px; line-height: 1.5;">
                          <strong>Complete Your Account Setup</strong><br>
                          Takes just 5 minutes to add your centers and services
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <div style="display: flex; align-items: flex-start;">
                        <div style="width: 32px; height: 32px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">2</div>
                        <p style="margin: 4px 0; color: #333; font-size: 15px; line-height: 1.5;">
                          <strong>Go Live in 48 Hours</strong><br>
                          Start receiving patient appointments
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <div style="display: flex; align-items: flex-start;">
                        <div style="width: 32px; height: 32px; background-color: #003087; color: white; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">3</div>
                        <p style="margin: 4px 0; color: #333; font-size: 15px; line-height: 1.5;">
                          <strong>Get Paid in 10 Days</strong><br>
                          Fast, reliable payments directly to your account
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="https://usrad.com/provider/signup" style="display: inline-block; background: linear-gradient(135deg, #cc9933 0%, #b8861f 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 15px rgba(204, 153, 51, 0.3);">
                Complete Your Signup →
              </a>
            </td>
          </tr>

          <!-- Support Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                <h4 style="margin: 0 0 12px 0; color: #003087; font-size: 16px;">Questions? We're Here to Help</h4>
                <p style="margin: 0; color: #666; font-size: 15px; line-height: 1.6;">
                  📞 <strong>1-800-USRAD-24</strong> (Mon-Fri 8am-8pm EST)<br>
                  📧 <a href="mailto:providers@usrad.com" style="color: #003087; text-decoration: underline;">providers@usrad.com</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px; border-top: 1px solid #e1e8ed; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                Welcome to the USRad family!
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                Reference: ${referenceId}
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
      console.log('✅ Provider confirmation email sent');
    } catch (emailError) {
      console.error('❌ Error sending provider confirmation:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceId,
        isVIP,
        calendarLink: isVIP ? 'https://cal.com/usrad/15min' : null,
        message: 'Consultation request received successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error processing provider consultation:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process consultation request',
        details: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};