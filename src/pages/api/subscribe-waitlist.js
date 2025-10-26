// src/pages/api/subscribe-waitlist.js
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  console.log('🚨🚨🚨 NEWSLETTER API CALLED! 🚨🚨🚨');
  console.log('Environment variables check:');
  console.log('- RESEND_API_KEY exists:', !!import.meta.env.RESEND_API_KEY);
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
    try {
      await resend.emails.send({
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
    } catch (adminEmailError) {
      console.error('Admin notification error:', adminEmailError);
      // Continue even if admin notification fails
    }

    // Send PREMIUM welcome email to the subscriber
    try {
      await resend.emails.send({
        from: 'USRad Healthcare Insights <hello@send.usrad.com>',
        to: email,
        subject: '🎯 Welcome to USRad Healthcare Insights!',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to USRad Healthcare Insights</title>
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
                        <!-- Decorative elements -->
                        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(204, 153, 51, 0.1); border-radius: 50%; filter: blur(60px);"></div>
                        
                        <h1 style="color: #ffffff; font-size: 36px; font-weight: 800; margin: 0 0 12px; line-height: 1.2; letter-spacing: -0.5px;">
                          🎯 You're In!
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
                          Thanks for subscribing! You're now part of a community that's saving thousands on medical imaging while staying informed about healthcare innovations.
                        </p>
                        
                        <!-- Feature Grid -->
                        <table role="presentation" style="width: 100%; margin: 0 0 36px;">
                          <tr>
                            <td style="padding: 0;">
                              
                              <!-- Feature 1 -->
                              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 0 0 16px; border-left: 4px solid #003087;">
                                <tr>
                                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #003087 0%, #0047ab 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 48, 135, 0.2);">
                                      <span style="font-size: 24px;">💡</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <h3 style="color: #003087; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Weekly Healthcare Tips</h3>
                                    <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
                                      Expert insights on reducing medical costs and understanding your imaging options
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                              <!-- Feature 2 -->
                              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 24px; margin: 0 0 16px; border-left: 4px solid #cc9933;">
                                <tr>
                                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #cc9933 0%, #b38829 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(204, 153, 51, 0.3);">
                                      <span style="font-size: 24px;">💰</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <h3 style="color: #92400e; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Exclusive Savings</h3>
                                    <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
                                      Early access to promotions and strategies to save up to 70% on imaging scans
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                              <!-- Feature 3 -->
                              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 16px; padding: 24px; margin: 0; border-left: 4px solid #10b981;">
                                <tr>
                                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                                      <span style="font-size: 24px;">🏥</span>
                                    </div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <h3 style="color: #065f46; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Expert Guidance</h3>
                                    <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
                                      Founded by radiologists – get insider knowledge about medical imaging
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                            </td>
                          </tr>
                        </table>
                        
                        <!-- CTA Section -->
                        <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #003087 0%, #0047ab 100%); border-radius: 20px; padding: 32px; margin: 0 0 32px; box-shadow: 0 10px 30px rgba(0, 48, 135, 0.2);">
                          <tr>
                            <td style="text-align: center;">
                              <h3 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
                                Need an MRI Right Now?
                              </h3>
                              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Don't wait. Get same-day appointments at prices 70% lower than hospitals.
                              </p>
                              <a href="https://usrad.com" style="display: inline-block; background: linear-gradient(135deg, #cc9933 0%, #b38829 100%); color: #ffffff; font-size: 17px; font-weight: 700; padding: 16px 40px; border-radius: 50px; text-decoration: none; box-shadow: 0 8px 20px rgba(204, 153, 51, 0.3); transition: all 0.3s;">
                                Book Your Scan Now →
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Pricing Highlight -->
                        <table role="presentation" style="width: 100%; background: linear-gradient(to right, #fef3c7, #fde68a, #fef3c7); border-radius: 16px; padding: 28px; margin: 0 0 32px; border: 2px solid #f59e0b;">
                          <tr>
                            <td style="text-align: center;">
                              <p style="color: #92400e; font-size: 15px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
                                Transparent Pricing
                              </p>
                              <p style="color: #78350f; font-size: 16px; margin: 0;">
                                MRI scans starting at just 
                                <span style="color: #b45309; font-size: 32px; font-weight: 900; display: inline-block; margin: 0 6px;">$260</span>
                              </p>
                              <p style="color: #92400e; font-size: 14px; margin: 12px 0 0; line-height: 1.6;">
                                ✓ No insurance required • ✓ Results in 24-48 hours • ✓ Board-certified radiologists
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- What to Expect -->
                        <div style="background: #f9fafb; border-radius: 16px; padding: 28px; margin: 0 0 24px;">
                          <h3 style="color: #1f2937; font-size: 20px; font-weight: 700; margin: 0 0 16px; text-align: center;">
                            📬 What to Expect
                          </h3>
                          <ul style="color: #4b5563; font-size: 15px; line-height: 2; margin: 0; padding-left: 24px;">
                            <li style="margin-bottom: 8px;">Weekly healthcare tips delivered every Monday</li>
                            <li style="margin-bottom: 8px;">Cost-saving strategies for medical imaging</li>
                            <li style="margin-bottom: 8px;">Updates on new locations and services</li>
                            <li style="margin-bottom: 0;">Patient stories and success cases</li>
                          </ul>
                        </div>
                        
                        <!-- Social Proof -->
                        <div style="text-align: center; margin: 0 0 24px;">
                          <p style="color: #6b7280; font-size: 14px; font-style: italic; margin: 0;">
                            "USRad saved me over $2,400 on my MRI. The process was seamless!"
                          </p>
                          <p style="color: #9ca3af; font-size: 13px; margin: 8px 0 0;">
                            — Sarah M., Miami, FL ⭐⭐⭐⭐⭐
                          </p>
                        </div>
                        
                        <!-- Closing -->
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin: 0;">
                          We're excited to have you here. If you have any questions, just reply to this email – we read every message.
                        </p>
                        
                        <p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 24px 0 0;">
                          To your health,<br>
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
                        
                        <!-- Social Icons -->
                        <div style="margin: 0 0 20px;">
                          <a href="https://linkedin.com/company/usrad" style="display: inline-block; margin: 0 8px;">
                            <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="LinkedIn" width="32" height="32" style="border-radius: 8px;">
                          </a>
                          <a href="https://twitter.com/usrad" style="display: inline-block; margin: 0 8px;">
                            <img src="https://img.icons8.com/fluency/48/twitter.png" alt="Twitter" width="32" height="32" style="border-radius: 8px;">
                          </a>
                          <a href="https://facebook.com/usrad" style="display: inline-block; margin: 0 8px;">
                            <img src="https://img.icons8.com/fluency/48/facebook.png" alt="Facebook" width="32" height="32" style="border-radius: 8px;">
                          </a>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
                          <strong>USRad</strong> • Making medical imaging affordable and accessible
                        </p>
                        
                        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 0;">
                          <a href="https://usrad.com" style="color: #003087; text-decoration: none; font-weight: 600;">Visit Website</a> • 
                          <a href="https://usrad.com/blog" style="color: #003087; text-decoration: none; font-weight: 600;">Read Blog</a> • 
                          <a href="https://usrad.com/contact" style="color: #003087; text-decoration: none; font-weight: 600;">Contact Us</a>
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
                          <a href="https://usrad.com/privacy" style="color: #6b7280; text-decoration: underline;">Privacy Policy</a> • 
                          <a href="https://usrad.com/terms" style="color: #6b7280; text-decoration: underline;">Terms</a> • 
                          <a href="https://usrad.com/unsubscribe" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                        </p>
                        <p style="color: #d1d5db; font-size: 11px; margin: 12px 0 0;">
                          You're receiving this because you subscribed to USRad Healthcare Insights at ${email}
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
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Continue even if welcome email fails - subscriber is saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome! Check your email for confirmation.' 
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