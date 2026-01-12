// src/pages/api/subscribe-newsletter.js
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://usrad-platform.vercel.app';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const REMIX_API_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://app.usrad.com';

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

    // Send emails via Remix API (branded templates)
    console.log('📧 Sending emails via Remix API...');
    try {
      const emailResponse = await fetch(`${REMIX_API_URL}/api/marketing-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          data: {
            email,
            source,
          },
        }),
      });

      if (emailResponse.ok) {
        const result = await emailResponse.json();
        console.log('✅ Emails sent via Remix API');
        console.log('   Customer Email ID:', result.customerEmailId);
        console.log('   Admin Email ID:', result.adminEmailId);
      } else {
        console.error('❌ Remix API failed:', emailResponse.status);
        // Fallback to direct Resend
        await sendFallbackEmails(email, source);
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      // Fallback to direct Resend
      await sendFallbackEmails(email, source);
    }

    async function sendFallbackEmails(email, source) {
      console.log('📤 Falling back to direct email...');
      try {
        await resend.emails.send({
          from: 'Newsletter <newsletter@send.usrad.com>',
          to: import.meta.env.NOTIFICATION_EMAIL,
          subject: '🎉 New Newsletter Signup - USRad',
          html: `<div style="font-family: Arial, sans-serif;"><h2>New Subscriber</h2><p>Email: ${email}</p><p>Source: ${source}</p></div>`
        });
        await resend.emails.send({
          from: 'USRad Healthcare Insights <hello@send.usrad.com>',
          to: email,
          subject: '💡 Welcome to USRad Healthcare Insights!',
          html: `<div style="font-family: Arial, sans-serif;"><h2>Welcome!</h2><p>Thanks for subscribing. We'll send you healthcare savings tips monthly.</p></div>`
        });
        console.log('✅ Fallback emails sent');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError.message);
      }
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