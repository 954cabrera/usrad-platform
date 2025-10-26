// src/pages/api/subscribe-waitlist.js
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const { email, source = 'footer_newsletter' } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if email already exists in database
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_active')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "You're already on our waitlist! We'll notify you soon." 
          }), 
          { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Reactivate if previously unsubscribed
        await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null 
          })
          .eq('email', email);
      }
    } else {
      // Add new subscriber to database
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
        console.error('Database insert error:', insertError);
        throw new Error('Failed to add subscriber');
      }
    }

    // Send notification to YOU (the admin)
    try {
      console.log('📧 Attempting to send admin notification...');
      console.log('Admin email address:', import.meta.env.NOTIFICATION_EMAIL);
      
      const adminEmailResult = await resend.emails.send({
        from: 'Newsletter <newsletter@send.usrad.com>',
        to: import.meta.env.NOTIFICATION_EMAIL,
        subject: '🎉 New Newsletter Signup - USRad Waitlist',
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
      console.log('✅ Admin notification sent:', adminEmailResult);
    } catch (adminEmailError) {
      console.error('❌ Admin notification error:', adminEmailError);
      console.error('Admin email error details:', {
        message: adminEmailError.message,
        statusCode: adminEmailError.statusCode,
        name: adminEmailError.name
      });
      // Continue even if admin notification fails
    }

    // Send welcome email to the subscriber (enhanced version)
    try {
      console.log('📧 Attempting to send welcome email to:', email);
      
      const welcomeEmailResult = await resend.emails.send({
        from: 'USRad <hello@send.usrad.com>',
        to: email,
        subject: 'Welcome to USRad! 🎉',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to USRad!</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 20px;">
                  
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #003087 0%, #004299 100%); padding: 40px 40px 30px; text-align: center;">
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; line-height: 1.2;">
                          Welcome to USRad! 🎉
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 40px 30px; text-align: center;">
                        <p style="color: #374151; font-size: 18px; line-height: 1.6; margin: 0 0 30px;">
                          Thanks for joining our waitlist! We'll notify you when appointments open up in your area.
                        </p>
                        
                        <!-- Highlight Box -->
                        <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #003087 0%, #004299 100%); border-radius: 12px; padding: 24px; margin: 0 0 30px;">
                          <tr>
                            <td style="text-align: center;">
                              <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0;">
                                You're now part of thousands saving up to 
                                <span style="color: #cc9933; font-weight: 700; font-size: 22px;">70%</span> 
                                on medical imaging scans.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Pricing Callout -->
                        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 0 0 20px; border: 2px solid #f59e0b;">
                        <p style="color: #92400e; font-size: 18px; line-height: 1.6; margin: 0; font-weight: 600;">
                            Quality MRI scans starting at just <span style="color: #b45309; font-size: 28px; font-weight: 800; display: inline-block; margin: 0 4px;">$260</span>
                        </p>
                        <p style="color: #78350f; font-size: 14px; margin: 8px 0 0;">
                            No insurance required • Results in 24-48 hours
                        </p>
                        </div>

                        <!-- Waitlist Confirmation -->
                        <div style="background-color: #f0fdf4; padding: 24px; border-radius: 12px; border: 2px solid #10b981; margin: 0 0 20px;">
                        <p style="color: #065f46; font-size: 18px; margin: 0 0 8px; font-weight: 700;">
                            ✓ You're on the waitlist!
                        </p>
                        <p style="color: #047857; font-size: 15px; margin: 0; line-height: 1.5;">
                            We'll send you an email the moment appointments open up in your area. In the meantime, feel free to explore our services and learn more about how we're making medical imaging affordable for everyone.
                        </p>
                        </div>

                        <p style="color: #9ca3af; font-size: 13px; margin: 16px 0 0;">
                        <a href="https://usrad.com" style="color: #003087; text-decoration: underline;">Visit our website</a> to learn more about USRad
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                      <td style="padding: 0 40px;">
                        <div style="height: 1px; background-color: #e5e7eb;"></div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0 0 8px; font-style: italic;">
                          - The USRad Team
                        </p>
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0;">
                          Making medical imaging affordable and accessible
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                  
                  <!-- Fine Print -->
                  <table role="presentation" style="max-width: 600px; margin: 20px auto 0;">
                    <tr>
                      <td style="text-align: center; padding: 0 20px;">
                        <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
                          © 2025 USRad. All rights reserved.<br>
                          <a href="https://usrad.com/privacy" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a> · 
                          <a href="https://usrad.com/terms" style="color: #9ca3af; text-decoration: underline;">Terms of Service</a>
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
      console.log('✅ Welcome email sent:', welcomeEmailResult);
    } catch (emailError) {
      console.error('❌ Welcome email error:', emailError);
      console.error('Welcome email error details:', {
        message: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name
      });
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