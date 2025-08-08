// src/pages/api/docuseal/provider-webhook.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const prerender = false;

export async function POST({ request }) {
  try {
    const payload = await request.json();
    console.log('📩 Provider DocuSeal Webhook received:', JSON.stringify(payload, null, 2));

    const eventType = payload?.event_type;
    const data = payload?.data;

    // Handle both 'form.completed' and 'submission.completed' event types
    if (eventType !== 'form.completed' && eventType !== 'submission.completed') {
      return new Response('Ignored event type', { status: 200 });
    }

    const submissionId = data?.submission_id;
    const email = data?.email || data?.submitters?.[0]?.email;
    const completedAt = data?.completed_at || new Date().toISOString();
    const documentUrl = data?.document_url;

    if (!email || !submissionId) {
      console.error('❌ Missing email or submission ID');
      return new Response('Invalid payload', { status: 400 });
    }

    // Helper to extract field values from DocuSeal
    const extractValue = (fieldName) => {
      return data.values?.find((v) => v.field === fieldName)?.value || null;
    };

    // Extract PSA field values
    const psaFieldData = {
      primary_contact_name: extractValue('primary_contact_name'),
      primary_contact_phone: extractValue('primary_contact_phone'),
      primary_contact_email: extractValue('primary_contact_email'),
      provider_name: extractValue('provider_name'),
      provider_email: extractValue('provider_email'),
      provider_phone: extractValue('provider_phone'),
      tax_id: extractValue('tax_id'),
      signer_name: extractValue('signer_name'),
      signer_title: extractValue('signer_title'),
      total_locations: extractValue('total_locations'),
      agreement_date: extractValue('agreement_date'),
      provider_date: extractValue('provider_date')
    };

    // Find the provider by email
    const { data: provider, error: providerError } = await supabase
      .from('providers')
      .select('id, organization_name')
      .or(`email.eq.${email},contact_email.eq.${email}`)
      .single();

    if (providerError || !provider) {
      console.error('❌ Provider not found for email:', email);
      
      // Try to find by user email
      const { data: user } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', email)
        .single();

      if (!user) {
        return new Response('Provider not found', { status: 404 });
      }

      // Create provider record if it doesn't exist
      const { data: newProvider, error: createError } = await supabase
        .from('providers')
        .insert({
          user_id: user.id,
          organization_name: psaFieldData.provider_name || 'Unknown',
          email: email,
          tax_id: psaFieldData.tax_id,
          status: 'active'
        })
        .select()
        .single();

      if (createError) {
        console.error('❌ Failed to create provider:', createError);
        return new Response('Failed to create provider', { status: 500 });
      }

      provider = newProvider;
    }

    console.log(`✅ Found/created provider: ${provider.id}`);

    // Download the signed PDF if URL is provided
    let pdfBlob = null;
    if (documentUrl) {
      try {
        console.log('📥 Downloading PDF from:', documentUrl);
        const pdfResponse = await fetch(documentUrl);
        
        if (pdfResponse.ok) {
          const pdfBuffer = await pdfResponse.arrayBuffer();
          pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
        } else {
          console.error('Failed to download PDF:', pdfResponse.status);
        }
      } catch (downloadError) {
        console.error('PDF download error:', downloadError);
      }
    }

    // Upload to Supabase Storage if we have the PDF
    let storagePath = null;
    if (pdfBlob) {
      const timestamp = Date.now();
      const fileName = `psa-agreement-${timestamp}.pdf`;
      const filePath = `${provider.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('provider-documents')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: false
        });

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
      } else {
        storagePath = uploadData.path;
        console.log('✅ PDF uploaded to:', storagePath);
      }
    }

    // Check if there's a pending document record
    const { data: existingDoc } = await supabase
      .from('provider_documents')
      .select('id')
      .eq('provider_id', provider.id)
      .eq('document_type', 'PSA')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingDoc) {
      // Update the pending record
      const updateData = {
        status: 'active',
        docuseal_submission_id: submissionId,
        signed_date: completedAt
      };
      
      if (storagePath) {
        updateData.storage_path = storagePath;
      }

      await supabase
        .from('provider_documents')
        .update(updateData)
        .eq('id', existingDoc.id);

      console.log('✅ Updated existing document record');
    } else {
      // Create a new document record
      const insertData = {
        provider_id: provider.id,
        document_type: 'PSA',
        signed_date: completedAt,
        status: 'active',
        docuseal_submission_id: submissionId
      };

      if (storagePath) {
        insertData.storage_path = storagePath;
      } else {
        // Use a placeholder path if no PDF was uploaded
        insertData.storage_path = `${provider.id}/psa-external-${submissionId}.pdf`;
      }

      await supabase
        .from('provider_documents')
        .insert(insertData);

      console.log('✅ Created new document record');
    }

    // Update provider record with PSA field data
    const { error: updateError } = await supabase
      .from('providers')
      .update({
        organization_name: psaFieldData.provider_name || provider.organization_name,
        tax_id: psaFieldData.tax_id || provider.tax_id,
        contact_name: psaFieldData.primary_contact_name,
        contact_email: psaFieldData.primary_contact_email,
        contact_phone: psaFieldData.primary_contact_phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', provider.id);

    if (updateError) {
      console.error('❌ Failed to update provider:', updateError);
    }

    // Log activity
    await supabase
      .from('provider_activity_logs')
      .insert({
        provider_id: provider.id,
        action: 'PSA_WEBHOOK_PROCESSED',
        resource: 'provider_documents',
        details: {
          submission_id: submissionId,
          document_type: 'PSA',
          email: email,
          event_type: eventType,
          psa_fields: psaFieldData
        }
      });

    // Generate Exhibit B
    await generateExhibitB(provider.id, psaFieldData);

    console.log(`✅ PSA webhook processed successfully for provider ${provider.id}`);
    return new Response('Webhook processed successfully', { status: 200 });

  } catch (err) {
    console.error('❌ Webhook processing failed:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Generate Exhibit B document
async function generateExhibitB(providerId, psaData) {
  try {
    // Get provider centers for pricing
    const { data: centers } = await supabase
      .from('provider_centers')
      .select('*')
      .eq('provider_id', providerId);

    // For now, create a simple text placeholder
    // TODO: Implement actual PDF generation
    const exhibitBContent = `
EXHIBIT B - PRICING SCHEDULE

Provider: ${psaData.provider_name}
Tax ID: ${psaData.tax_id}
Date: ${new Date().toLocaleDateString()}

Total Authorized Locations: ${psaData.total_locations || centers?.length || 0}

PRICING STRUCTURE:
[Pricing details will be populated based on provider selection]

This Exhibit B is automatically generated based on the Provider Service Agreement.
    `.trim();

    const exhibitBBlob = new Blob([exhibitBContent], { type: 'text/plain' });
    
    // Upload Exhibit B
    const fileName = `exhibit-b-${Date.now()}.txt`; // Using .txt for now
    const filePath = `${providerId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('provider-documents')
      .upload(filePath, exhibitBBlob, {
        contentType: 'text/plain',
        upsert: false
      });

    if (!uploadError) {
      // Create document record for Exhibit B
      await supabase
        .from('provider_documents')
        .insert({
          provider_id: providerId,
          document_type: 'EXHIBIT_B',
          storage_path: uploadData.path,
          signed_date: new Date(),
          status: 'active'
        });

      console.log('✅ Exhibit B generated and uploaded');
    }
  } catch (error) {
    console.error('❌ Failed to generate Exhibit B:', error);
  }
}