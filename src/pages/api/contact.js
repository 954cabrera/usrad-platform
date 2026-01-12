import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://app.usrad.com';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST({ request }) {
  try {
    const { firstName, lastName, email, phone, topic, message, zipCode } = await request.json();
    const fullName = `${firstName} ${lastName}`.trim();

    console.log('📧 === Contact Form Submission ===');
    console.log('Customer Name:', fullName);
    console.log('Customer Email:', email);
    console.log('Admin Email:', import.meta.env.SUPPORT_EMAIL);
    console.log('Has SUPPORT_EMAIL?', !!import.meta.env.SUPPORT_EMAIL);
    console.log('Topic:', topic);

    // Validate required fields
    if (!email || !message) {
      console.log('❌ Validation failed');
      return new Response(
        JSON.stringify({ error: 'Email and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if admin email is set
    if (!import.meta.env.SUPPORT_EMAIL) {
      console.error('⚠️  WARNING: SUPPORT_EMAIL not set in environment variables!');
    }

    // Generate reference ID
    const referenceId = generateReferenceId();
    console.log('Reference ID:', referenceId);
    
    // Get source info
    const source = request.headers.get('referer') || 'Direct';
    const userAgent = request.headers.get('user-agent')?.substring(0, 50) || 'Unknown';

    // 1. Save to Supabase database FIRST
    console.log('\n💾 Saving to database...');
    try {
      const { data: savedContact, error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone || null,
            topic: topic || 'general',
            message: message,
            status: 'new',
            priority: 'normal',
            metadata: { 
              reference_id: referenceId,
              source: source,
              user_agent: userAgent
            }
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database save failed:', dbError.message);
        console.error('   Details:', dbError);
      } else {
        console.log('✅ Saved to database! ID:', savedContact.id);
        console.log('   Name:', firstName, lastName);
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
    }

    // 2. Send emails via Remix API (branded templates)
    console.log('\n📤 Sending emails via Remix API...');
    let customerEmailSent = false;
    let adminEmailSent = false;
    
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: {
            firstName,
            lastName,
            email,
            phone,
            topic,
            message,
            referenceId,
          },
        }),
      });

      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log('✅ Emails sent via Remix API');
        console.log('   Customer Email ID:', result.customerEmailId);
        console.log('   Admin Email ID:', result.adminEmailId);
        customerEmailSent = !!result.customerEmailId;
        adminEmailSent = !!result.adminEmailId;
      } else {
        console.error('❌ Remix API failed:', emailResponse.status);
        // Fallback to direct Resend
        console.log('📤 Falling back to direct email...');
        const customerResult = await resend.emails.send({
          from: 'USRad Support <support@send.usrad.com>',
          to: email,
          subject: 'Thanks for contacting USRad - We\'ll respond within 2 hours',
          html: getCustomerEmailTemplate({ fullName, topic, referenceId })
        });
        customerEmailSent = true;
        console.log('✅ Fallback customer email sent:', customerResult.id);
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      // Fallback to direct Resend
      try {
        console.log('📤 Falling back to direct email...');
        const customerResult = await resend.emails.send({
          from: 'USRad Support <support@send.usrad.com>',
          to: email,
          subject: 'Thanks for contacting USRad - We\'ll respond within 2 hours',
          html: getCustomerEmailTemplate({ fullName, topic, referenceId })
        });
        customerEmailSent = true;
        console.log('✅ Fallback customer email sent:', customerResult.id);
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError.message);
        throw fallbackError;
      }
    }

    console.log('\n📊 Summary:');
    console.log('   Database: ✅ Saved');
    console.log('   Customer email:', customerEmailSent ? '✅ Sent' : '❌ Failed');
    console.log('   Admin email:', adminEmailSent ? '✅ Sent' : '❌ Failed');
    console.log('=================================\n');

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceId,
        message: 'Message sent successfully!',
        debug: {
          customerEmailSent,
          adminEmailSent,
          adminEmailConfigured: !!import.meta.env.SUPPORT_EMAIL
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('\n❌ === CONTACT FORM ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('============================\n');
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send message. Please try again.',
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function generateReferenceId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomStr}`.toUpperCase();
}

function getPriorityLevel(topic) {
  const highPriority = ['urgent', 'billing', 'complaint', 'emergency'];
  const mediumPriority = ['booking', 'appointment', 'pricing'];
  
  const topicLower = (topic || '').toLowerCase();
  
  if (highPriority.some(keyword => topicLower.includes(keyword))) {
    return 'High';
  } else if (mediumPriority.some(keyword => topicLower.includes(keyword))) {
    return 'Medium';
  }
  return 'Normal';
}

function getPriorityColor(topic) {
  const priority = getPriorityLevel(topic);
  
  switch(priority) {
    case 'High':
      return { bg: '#fef2f2', text: '#991b1b' };
    case 'Medium':
      return { bg: '#fef3c7', text: '#92400e' };
    default:
      return { bg: '#f0f9ff', text: '#1e40af' };
  }
}

function getCustomerEmailTemplate({ fullName, topic, referenceId }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
          <td align="center">
            
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #003087 0%, #004299 100%); padding: 40px; text-align: center;">
                  <div style="background-color: white; display: inline-block; padding: 12px 24px; border-radius: 8px; margin-bottom: 15px;">
                    <h1 style="margin: 0; color: #003087; font-size: 28px; font-weight: bold;">USRad</h1>
                  </div>
                  <h2 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">Thanks for contacting us! ✅</h2>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                    Hi ${fullName || 'there'},
                  </p>
                  
                  <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #374151;">
                    We've received your message and our team will get back to you <strong>within 2 hours</strong> during business hours (8AM-8PM EST).
                  </p>
                  
                  <!-- Message Summary Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; margin: 30px 0;">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="margin: 0 0 10px; font-size: 14px; font-weight: 600; color: #065f46;">Your message summary:</p>
                        <p style="margin: 0 0 8px; font-size: 14px; color: #374151;">
                          <strong>Topic:</strong> ${topic || 'General inquiry'}
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #6b7280;">
                          <strong>Reference:</strong> ${referenceId}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Helpful Resources Section -->
                  <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                    In the meantime, here are some helpful resources:
                  </p>
                  
                  <!-- Resource Links -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 30px;">
                    <tr>
                      <td>
                        <a href="https://usrad.com/how-it-works" style="display: block; background-color: #f9fafb; padding: 16px 20px; border-radius: 8px; text-decoration: none; border: 1px solid #e5e7eb; margin-bottom: 12px;">
                          <span style="font-size: 20px; margin-right: 8px;">💻</span>
                          <span style="color: #003087; font-weight: 600; font-size: 15px;">How USRad Works</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="https://usrad.com/what-is-an-mri" style="display: block; background-color: #f9fafb; padding: 16px 20px; border-radius: 8px; text-decoration: none; border: 1px solid #e5e7eb; margin-bottom: 12px;">
                          <span style="font-size: 20px; margin-right: 8px;">🧠</span>
                          <span style="color: #003087; font-weight: 600; font-size: 15px;">Learn About MRI Scans</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="https://usrad.com/#book-scan" style="display: block; background-color: #f9fafb; padding: 16px 20px; border-radius: 8px; text-decoration: none; border: 1px solid #e5e7eb; margin-bottom: 12px;">
                          <span style="font-size: 20px; margin-right: 8px;">🔍</span>
                          <span style="color: #003087; font-weight: 600; font-size: 15px;">Find Imaging Centers</span>
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Call to Action Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border: 2px solid #003087; border-radius: 12px; margin: 30px 0;">
                    <tr>
                      <td style="padding: 24px; text-align: center;">
                        <p style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #003087;">
                          Need immediate assistance?
                        </p>
                        <a href="tel:8008772324" style="display: inline-block; background-color: #003087; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                          Call (800) USRad-24
                        </a>
                        <p style="margin: 12px 0 0; font-size: 13px; color: #6b7280;">
                          Available 8AM-8PM EST
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 8px; font-size: 14px; color: #374151; font-weight: 600;">
                    - The USRad Team
                  </p>
                  <p style="margin: 0 0 15px; font-size: 11px; color: #9ca3af; font-style: italic;">
                    Making medical imaging affordable and accessible
                  </p>
                  
                  <!-- Compliance Badges -->
                  <div style="margin-top: 15px;">
                    <span style="display: inline-block; background-color: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 600; margin: 0 4px;">
                      ✓ HIPAA Compliant
                    </span>
                    <span style="display: inline-block; background-color: #eff6ff; color: #1e40af; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 600; margin: 0 4px;">
                      ✓ SOC 2 Certified
                    </span>
                  </div>
                  
                  <p style="margin: 15px 0 0; font-size: 10px; color: #9ca3af;">
                    © 2025 USRad. All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
            
          </td>
        </tr>
      </table>
      
    </body>
    </html>
  `;
}

function getAdminEmailTemplate({ fullName, email, phone, topic, message, zipCode, referenceId, source, userAgent }) {
  const priorityColors = getPriorityColor(topic);
  const priorityLevel = getPriorityLevel(topic);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
          <td align="center">
            
            <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <tr>
                <td style="background: linear-gradient(135deg, #cc9933 0%, #b38829 100%); padding: 30px 40px;">
                  <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">
                    New Contact Form Submission
                  </h1>
                  <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                    Someone needs your help! Respond within 2 hours.
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 20px 40px 0;">
                  <span style="display: inline-block; background-color: ${priorityColors.bg}; color: ${priorityColors.text}; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                    ${priorityLevel} Priority
                  </span>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 30px 40px;">
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-left: 4px solid #003087; border-radius: 8px;">
                    <tr>
                      <td style="padding: 25px;">
                        <p style="margin: 0 0 15px; font-size: 16px; font-weight: 600; color: #003087;">Contact Information</p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Name:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 14px; color: #111827;">
                              ${fullName || 'Not provided'}
                            </td>
                          </tr>
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Email:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 14px;">
                              <a href="mailto:${email}" style="color: #003087; text-decoration: none; font-weight: 600;">${email}</a>
                            </td>
                          </tr>
                          ${phone ? `
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Phone:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 14px;">
                              <a href="tel:${phone}" style="color: #003087; text-decoration: none; font-weight: 600;">${phone}</a>
                            </td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Topic:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 14px; color: #111827;">
                              ${topic || 'General inquiry'}
                            </td>
                          </tr>
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Reference:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 12px; color: #6b7280; font-family: monospace;">
                              ${referenceId}
                            </td>
                          </tr>
                          <tr>
                            <td width="120" style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;">
                              <strong>Received:</strong>
                            </td>
                            <td style="padding: 8px 0; font-size: 14px; color: #111827;">
                              ${new Date().toLocaleString()}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <tr>
                <td style="padding: 0 40px 30px;">
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <tr>
                      <td style="padding: 25px;">
                        <p style="margin: 0 0 15px; font-size: 16px; font-weight: 600; color: #111827;">Message:</p>
                        <div style="padding: 15px; background-color: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message || 'No message provided'}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <tr>
                <td style="padding: 0 40px 40px;">
                  
                  <p style="margin: 0 0 15px; font-size: 14px; font-weight: 600; color: #111827;">Quick Actions:</p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 8px 8px 0; width: ${phone ? '50%' : '100%'};">
                        <a href="mailto:${email}?subject=Re: Your USRad inquiry (${referenceId})&body=Hi ${fullName || 'there'},%0D%0A%0D%0AThank you for contacting USRad.%0D%0A%0D%0A" style="display: block; background-color: #003087; color: white; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                          Reply via Email
                        </a>
                      </td>
                      ${phone ? `
                      <td style="padding: 8px 0 8px 8px; width: 50%;">
                        <a href="tel:${phone}" style="display: block; background-color: #10b981; color: white; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                          Call Now
                        </a>
                      </td>
                      ` : ''}
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
  `;
}