// src/pages/api/subscribe-newsletter.js
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://usrad-platform.vercel.app';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  console.log('🚨🚨🚨 NEWSLETTER API CALLED! 🚨🚨🚨');
  console.log('Environment variables check:');
  console.log('- RESEND_API_KEY exists:', !!import.meta.env.RESEND_API_KEY);
  console.log('- RESEND_API_KEY length:', import.meta.env.RESEND_API_KEY?.length || 0);
  console.log('- NOTIFICATION_EMAIL:', import.meta.env.NOTIFICATION_EMAIL);
  console.log('- PUBLIC_SUPABASE_URL exists:', !!import.meta.env.PUBLIC_SUPABASE_URL);
  
  try {
    console.log('📝 Starting newsletter subscription process...');
    const { email, source = 'footer_newsletter' } = await request.json();
    console.log('📥 Received email:', email, 'source:', source);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Email validation passed');

    // Check if email already exists in database
    console.log('🔍 Checking for existing subscriber...');
    const { data: existingSubscriber, error: selectError } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_active')
      .eq('email', email)
      .single();

    console.log('Database check result:', { existingSubscriber, selectError });

    if (existingSubscriber) {
      console.log('📌 Subscriber already exists');
      if (existingSubscriber.is_active) {
        console.log('✓ Subscriber is already active');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "You're already subscribed! Keep an eye on your inbox." 
          }), 
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Reactivate if previously unsubscribed
        console.log('🔄 Reactivating previously unsubscribed user...');
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null 
          })
          .eq('email', email);
        
        if (updateError) {
          console.error('❌ Error reactivating subscriber:', updateError);
        } else {
          console.log('✅ Subscriber reactivated');
        }
      }
    } else {
      // Add new subscriber to database
      console.log('➕ Adding new subscriber to database...');
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email,
            source,
            subscribed_at: new Date().toISOString(),
            is_active: true
          }
        ]);

      if (insertError) {
        console.error('❌ Database insert error:', insertError);
        console.error('Insert error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        throw new Error('Failed to add subscriber');
      }
      
      console.log('✅ New subscriber added to database');
    }

    // Send notification to YOU (the admin)
    console.log('📧 Attempting to send admin notification email...');
    try {
      const adminEmailResult = await resend.emails.send({
        from: 'Newsletter <newsletter@send.usrad.com>',
        to: import.meta.env.NOTIFICATION_EMAIL,
        subject: '🎉 New Newsletter Signup - USRad',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003087;">New Newsletter Subscriber</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 10px 0;"><strong>Source:</strong> ${source}</p>
            </div>
          </div>
        `
      });
      console.log('✅ Admin notification sent:', JSON.stringify(adminEmailResult));
    } catch (adminEmailError) {
      console.error('❌ Admin notification error:', adminEmailError);
      console.error('Admin email error details:', JSON.stringify(adminEmailError, null, 2));
      // Continue even if admin notification fails
    }

    // Send PREMIUM welcome email to the subscriber
    console.log('📧 Attempting to send welcome email to subscriber...');
    try {
      const welcomeEmailResult = await resend.emails.send({
        from: 'USRad Healthcare Insights <hello@send.usrad.com>',
        to: email,
        subject: '💡 Your First Healthcare Savings Tip (Plus Welcome to USRad!)',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your First Healthcare Savings Tip</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
            
            <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
              <tr>
                <td style="padding: 40px 20px;">
                  
                  <!-- Main Container -->
                  <table role="presentation" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 48, 135, 0.15); overflow: hidden;">
                    
                    <!-- Hero Header with Gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #003087 0%, #0047ab 50%, #005bc5 100%); padding: 50px 40px; text-align: center; position: relative;">
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0 0 12px; line-height: 1.2; letter-spacing: -0.5px;">
                          💡 Your First Savings Tip
                        </h1>
                        <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 0; font-weight: 500;">
                          Welcome to Healthcare Insights by USRad
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 45px 40px;">
                        
                        <!-- Welcome Message -->
                        <p style="color: #1f2937; font-size: 19px; line-height: 1.7; margin: 0 0 24px; font-weight: 500;">
                          Hey there! 👋
                        </p>
                        
                        <p style="color: #4b5563; font-size: 17px; line-height: 1.7; margin: 0 0 32px;">
                          Thanks for subscribing! Let's skip the fluff and get straight to your first money-saving insight:
                        </p>
                        
                        <!-- FEATURED TIP - The Real Cost Article -->
                        <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 20px; padding: 32px; margin: 0 0 32px; border: 2px solid #f59e0b;">
                          <tr>
                            <td>
                              <p style="color: #92400e; font-size: 13px; font-weight: 700; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1.5px;">
                                💰 THIS MONTH'S TIP
                              </p>
                              <h2 style="color: #78350f; font-size: 24px; font-weight: 800; margin: 0 0 16px; line-height: 1.3;">
                                The Real Cost of an MRI: What Hospitals Don't Want You to Know
                              </h2>
                              <p style="color: #92400e; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
                                Here's something most people don't realize: <strong>the exact same MRI scan</strong> can cost $3,000 at a hospital or $260 at an independent imaging center. Same machine. Same quality. Board-certified radiologists either way.
                              </p>
                              <p style="color: #92400e; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
                                The difference? Hospital overhead, facility fees, and a billing system designed for insurance—not for you.
                              </p>
                              <p style="color: #92400e; font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
                                <strong>The takeaway:</strong> Always ask for cash-pay pricing at independent imaging centers before using your insurance. You might save thousands.
                              </p>
                              <a href="${SITE_URL}/blog/real-cost-of-mri" style="display: inline-block; background: linear-gradient(135deg, #003087 0%, #0047ab 100%); color: #ffffff; font-size: 16px; font-weight: 700; padding: 14px 28px; border-radius: 50px; text-decoration: none; box-shadow: 0 4px 15px rgba(0, 48, 135, 0.3);">
                                Read the Full Article →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Quick Stats Box -->
                        <table role="presentation" style="width: 100%; margin: 0 0 32px;">
                          <tr>
                            <td style="background: #f0f9ff; border-radius: 16px; padding: 24px; text-align: center; width: 48%;">
                              <p style="color: #003087; font-size: 36px; font-weight: 800; margin: 0;">70%</p>
                              <p style="color: #4b5563; font-size: 14px; margin: 8px 0 0;">Average savings vs. hospitals</p>
                            </td>
                            <td style="width: 4%;"></td>
                            <td style="background: #f0f9ff; border-radius: 16px; padding: 24px; text-align: center; width: 48%;">
                              <p style="color: #003087; font-size: 36px; font-weight: 800; margin: 0;">$260</p>
                              <p style="color: #4b5563; font-size: 14px; margin: 8px 0 0;">MRI scans starting at</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- CTA Section -->
                        <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #003087 0%, #0047ab 100%); border-radius: 20px; padding: 32px; margin: 0 0 32px; box-shadow: 0 10px 30px rgba(0, 48, 135, 0.2);">
                          <tr>
                            <td style="text-align: center;">
                              <h3 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
                                Need a Scan Now?
                              </h3>
                              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Skip the hospital markup. Get transparent pricing in seconds.
                              </p>
                              <a href="${SITE_URL}" style="display: inline-block; background: linear-gradient(135deg, #cc9933 0%, #b38829 100%); color: #ffffff; font-size: 17px; font-weight: 700; padding: 16px 40px; border-radius: 50px; text-decoration: none; box-shadow: 0 8px 20px rgba(204, 153, 51, 0.3);">
                                Find Pricing Near You →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- What to Expect -->
                        <div style="background: #f9fafb; border-radius: 16px; padding: 28px; margin: 0 0 24px;">
                          <h3 style="color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 16px; text-align: center;">
                            📬 What to Expect
                          </h3>
                          <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0; text-align: center;">
                            Once a month, you'll get one actionable healthcare tip—no fluff, no spam. Just practical ways to save money and navigate the healthcare system smarter.
                          </p>
                        </div>
                        
                        <!-- Closing -->
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin: 0;">
                          Questions? Just reply to this email—we read every message.
                        </p>
                        
                        <p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 24px 0 0;">
                          To your health (and your wallet),<br>
                          <span style="color: #003087; font-weight: 700;">The USRad Team</span>
                        </p>
                        
                      </td>
                    </tr>
                    
                    <!-- Elegant Divider -->
                    <tr>
                      <td style="padding: 0 40px;">
                        <div style="height: 2px; background: linear-gradient(to right, transparent, #e5e7eb, transparent);"></div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 36px 40px; text-align: center; background: #f9fafb;">
                        
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
                          <strong>USRad</strong> • Making medical imaging affordable for 90 million Americans
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 0;">
                          <a href="${SITE_URL}" style="color: #003087; text-decoration: none; font-weight: 600;">Visit Website</a> • 
                          <a href="${SITE_URL}/blog" style="color: #003087; text-decoration: none; font-weight: 600;">More Tips</a> • 
                          <a href="${SITE_URL}/contact" style="color: #003087; text-decoration: none; font-weight: 600;">Contact Us</a>
                        </p>
                        
                      </td>
                    </tr>
                    
                  </table>
                  
                  <!-- Legal Footer -->
                  <table role="presentation" style="max-width: 650px; margin: 24px auto 0;">
                    <tr>
                      <td style="text-align: center; padding: 0 20px;">
                        <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
                          © 2025 USRad. All rights reserved.<br>
                          <a href="${SITE_URL}/privacy" style="color: #6b7280; text-decoration: underline;">Privacy Policy</a> • 
                          <a href="${SITE_URL}/terms" style="color: #6b7280; text-decoration: underline;">Terms</a> • 
                          <a href="${SITE_URL}/unsubscribe" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                        </p>
                        <p style="color: #d1d5db; font-size: 11px; margin: 12px 0 0;">
                          You're receiving this because you subscribed at ${email}
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
      console.log('✅ Welcome email sent:', JSON.stringify(welcomeEmailResult));
    } catch (emailError) {
      console.error('❌ Welcome email error:', emailError);
      console.error('Welcome email error details:', JSON.stringify(emailError, null, 2));
      // Continue even if welcome email fails - subscriber is saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome! Check your email for your first healthcare tip.' 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Something went wrong. Please try again.' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}