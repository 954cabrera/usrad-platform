// src/pages/api/docuseal/webhook.js
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase client for secure server-side updates
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for write access
);

// 📧 (Future) Email notification handler (Resend, etc.)
async function sendConfirmationEmail({ email, documentUrl }) {
  // Placeholder only. Integrate Resend later here.
  console.log('📨 [Email] Would send confirmation to:', email);
}

export async function POST({ request }) {
  try {
    const webhookData = await request.json();
    console.log('🔔 DocuSeal webhook received:', webhookData);

    // ✅ Check for form completion event
    if (webhookData.event_type === 'form.completed') {
      const { data } = webhookData;

      const userEmail = data.email;
      const submissionId = data.submission_id;
      const documentUrl = data.documents?.[0]?.url;
      const completedAt = data.completed_at;

      // 🔍 Update user in Supabase
      const { error } = await supabase
        .from('user_profiles')
        .update({
          psa_signed: true,
          psa_signed_at: completedAt,
          psa_document_url: documentUrl,
          psa_submission_id: submissionId,
          onboarding_progress: 75
        })
        .eq('email', userEmail);

      if (error) {
        console.error('❌ Supabase update failed:', error.message);
        return new Response(
          JSON.stringify({ success: false, error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.log('✅ PSA completion recorded for:', userEmail);

      // ✉️ Optional email confirmation (future)
      if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
        await sendConfirmationEmail({ email: userEmail, documentUrl });
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Webhook processing error:', error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'DocuSeal webhook endpoint is active',
      supported_events: ['form.completed'],
      endpoint: '/api/docuseal/webhook'
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
