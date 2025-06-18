// /api/docuseal-webhook.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST({ request }) {
  try {
    const payload = await request.json();
    const eventType = payload?.event_type;
    const data = payload?.data;

    console.log('📩 Incoming DocuSeal Webhook:', JSON.stringify(payload, null, 2));

    // Only handle completion
    if (eventType !== 'form.completed') {
      return new Response('Ignored event type', { status: 200 });
    }

    const submissionId = data?.submission_id;
    const email = data?.email;
    const completedAt = data?.completed_at;

    if (!email || !submissionId) {
      console.error('❌ Missing email or submission ID');
      return new Response('Invalid payload', { status: 400 });
    }

    // 🔍 Helper to extract field values from DocuSeal
    const extractValue = (fieldName) => {
      return data.values?.find((v) => v.field === fieldName)?.value || null;
    };

    const primaryContactName = extractValue('primary_contact_name');
    const primaryContactPhone = extractValue('primary_contact_phone');
    const primaryContactEmail = extractValue('primary_contact_email');
    const totalLocations = extractValue('total_locations');
    const agreementDate = extractValue('agreement_date');
    const providerName = extractValue('provider_name');
    const signerName = extractValue('signer_name');
    const signerTitle = extractValue('signer_title');
    const providerDate = extractValue('provider_date');
    const taxId = extractValue('tax_id');
    const providerEmail = extractValue('provider_email');
    const providerPhone = extractValue('provider_phone');

    // 🔄 Update the matching user profile in Supabase
    const { error } = await supabase
      .from('user_profiles')
      .update({
        psa_signed: true,
        psa_signed_at: completedAt,
        psa_document_url: data.document_url,
        psa_submission_id: submissionId,
        onboarding_progress: 75,

        // ✍️ Auto-filled fields
        primary_contact_name: primaryContactName,
        primary_contact_phone: primaryContactPhone,
        primary_contact_email: primaryContactEmail,
        total_locations: totalLocations,
        agreement_date: agreementDate,
        provider_name: providerName,
        signer_name: signerName,
        signer_title: signerTitle,
        provider_date: providerDate,
        tax_id: taxId,
        provider_email: providerEmail,
        provider_phone: providerPhone,
      })
      .eq('email', email);

    if (error) {
      console.error('❌ Failed to update Supabase:', error);
      return new Response('Database error', { status: 500 });
    }

    console.log(`✅ PSA record updated for ${email}`);
    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('❌ Webhook processing failed:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
