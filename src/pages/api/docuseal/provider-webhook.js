// src/pages/api/docuseal/provider-webhook.js
// Enhanced with immediate USRad auto-signing functionality

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

    const submissionId = data?.submission_id || data?.id;
    const email = data?.email || data?.submitters?.[0]?.email;
    const completedAt = data?.completed_at || new Date().toISOString();
    const documentUrl = data?.document_url;

    if (!email || !submissionId) {
      console.error('❌ Missing email or submission ID');
      return new Response('Invalid payload', { status: 400 });
    }

    // 🎯 CHECK FOR AUTO-SIGNING NEED FIRST
    const needsAutoSigning = await checkIfNeedsUSRadAutoSigning(payload);
    
    if (needsAutoSigning) {
      console.log('🚀 PSA needs USRad auto-signing - triggering immediately...');
      
      const autoSignResult = await autoSignForUSRad(payload);
      
      if (autoSignResult.success) {
        console.log('✅ USRad auto-signed successfully!');
        
        // Send welcome email immediately
        await sendProviderWelcomeEmail(email, autoSignResult.downloadUrl, data);
        
      } else {
        console.error('❌ USRad auto-signing failed:', autoSignResult.error);
      }
    }

    // Continue with existing provider processing...
    const psaFieldData = extractPSAFieldData(data);
    const provider = await findOrCreateProvider(email, psaFieldData);
    
    if (!provider) {
      return new Response('Provider processing failed', { status: 500 });
    }

    console.log(`✅ Found/created provider: ${provider.id}`);

    // Handle PDF download and storage
    const storagePath = await downloadAndStorePDF(documentUrl, provider.id);

    // Update/create document records
    await updateProviderDocuments(provider.id, submissionId, completedAt, storagePath);

    // Update provider record with PSA field data
    await updateProviderRecord(provider.id, psaFieldData);

    // Log activity
    await logProviderActivity(provider.id, submissionId, eventType, email, psaFieldData);

    // Generate Exhibit B
    await generateExhibitB(provider.id, psaFieldData);

    console.log(`🎉 PSA webhook processed successfully for provider ${provider.id}`);
    return new Response('Webhook processed successfully', { status: 200 });

  } catch (err) {
    console.error('❌ Webhook processing failed:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// 🎯 NEW: Check if this submission needs USRad auto-signing
async function checkIfNeedsUSRadAutoSigning(payload) {
  const data = payload?.data;
  const submitters = data?.submitters || [];
  
  // Check if this is a provider completion (not USRad signing)
  const providerSubmitter = submitters.find(s => s.role === 'Provider' && s.completed_at);
  const usradSubmitter = submitters.find(s => s.role === 'USRad' && s.completed_at);
  
  // We need auto-signing if:
  // 1. Provider has signed
  // 2. USRad hasn't signed yet
  // 3. This is a PSA template (you can add template ID check here)
  
  const needsSigning = providerSubmitter && !usradSubmitter;
  
  console.log('🔍 Auto-signing check:', {
    providerSigned: !!providerSubmitter,
    usradSigned: !!usradSubmitter,
    needsAutoSigning: needsSigning
  });
  
  return needsSigning;
}

// 🚀 NEW: Auto-sign for USRad immediately
async function autoSignForUSRad(payload) {
  const data = payload?.data;
  const submissionId = data?.submission_id || data?.id;
  
  const DOCUSEAL_API_KEY = process.env.DOCUSEAL_API_TOKEN;
  const DOCUSEAL_BASE_URL = 'https://api.docuseal.com';

  try {
    console.log('🔄 Adding USRad submitter to submission:', submissionId);

    // Add USRad as a submitter to the existing submission
    const response = await fetch(`${DOCUSEAL_BASE_URL}/submissions/${submissionId}/submitters`, {
      method: 'POST',
      headers: {
        'X-Auth-Token': DOCUSEAL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: 'USRad',
        name: 'Michael Cabrera',
        email: 'michael@usradiology.com',
        completed: true, // This auto-signs immediately
        send_email: false, // Don't send signing request to USRad
        values: {
          usrad_signature: 'Michael Cabrera',
          usrad_date: new Date().toLocaleDateString('en-US'),
          usrad_title: 'President & CEO',
          usrad_name: 'Michael Cabrera'
        }
      })
    });

    const result = await response.json();
    console.log('📋 USRad auto-sign response:', result);

    if (response.ok) {
      // Get the updated submission with both signatures
      const submissionResponse = await fetch(`${DOCUSEAL_BASE_URL}/submissions/${submissionId}`, {
        headers: {
          'X-Auth-Token': DOCUSEAL_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const submissionData = await submissionResponse.json();
      
      return {
        success: true,
        submissionId: submissionId,
        downloadUrl: submissionData.document_url || submissionData.signed_document_url
      };
    } else {
      return {
        success: false,
        error: result.error || 'Auto-signing failed'
      };
    }

  } catch (error) {
    console.error('❌ Auto-signing API error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 📧 NEW: Send immediate welcome email
async function sendProviderWelcomeEmail(providerEmail, downloadUrl, submissionData) {
  try {
    console.log('📧 Sending immediate welcome email to:', providerEmail);
    
    // You can implement your email service here
    // For now, just log the email content
    const welcomeMessage = {
      to: providerEmail,
      subject: '🎉 Welcome to USRad Network - Agreement Fully Executed!',
      content: `
        Welcome to the USRad Network! 
        
        Your Provider Service Agreement has been fully executed.
        
        Download your signed agreement: ${downloadUrl}
        Access your portal: https://usradiology.com/providers/portal
        
        Start receiving referrals within 48 hours!
      `
    };
    
    console.log('✅ Welcome email prepared:', welcomeMessage);
    
    // TODO: Implement actual email sending with your email service
    // await yourEmailService.send(welcomeMessage);

  } catch (error) {
    console.error('❌ Welcome email failed:', error);
  }
}

// Helper to extract field values from DocuSeal
function extractPSAFieldData(data) {
  const extractValue = (fieldName) => {
    return data.values?.find((v) => v.field === fieldName)?.value || null;
  };

  return {
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
}

// Find or create provider (existing function)
async function findOrCreateProvider(email, psaFieldData) {
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
      return null;
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
      return null;
    }

    return newProvider;
  }

  return provider;
}

// Download and store PDF (existing function - keeping it the same)
async function downloadAndStorePDF(documentUrl, providerId) {
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
    const filePath = `${providerId}/${fileName}`;

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

  return storagePath;
}

// Update provider documents (existing function - keeping it the same)
async function updateProviderDocuments(providerId, submissionId, completedAt, storagePath) {
  // Check if there's a pending document record
  const { data: existingDoc } = await supabase
    .from('provider_documents')
    .select('id')
    .eq('provider_id', providerId)
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
      provider_id: providerId,
      document_type: 'PSA',
      signed_date: completedAt,
      status: 'active',
      docuseal_submission_id: submissionId
    };

    if (storagePath) {
      insertData.storage_path = storagePath;
    } else {
      // Use a placeholder path if no PDF was uploaded
      insertData.storage_path = `${providerId}/psa-external-${submissionId}.pdf`;
    }

    await supabase
      .from('provider_documents')
      .insert(insertData);

    console.log('✅ Created new document record');
  }
}

// Update provider record (existing function - keeping it the same)
async function updateProviderRecord(providerId, psaFieldData) {
  const { error: updateError } = await supabase
    .from('providers')
    .update({
      organization_name: psaFieldData.provider_name,
      tax_id: psaFieldData.tax_id,
      contact_name: psaFieldData.primary_contact_name,
      contact_email: psaFieldData.primary_contact_email,
      contact_phone: psaFieldData.primary_contact_phone,
      updated_at: new Date().toISOString()
    })
    .eq('id', providerId);

  if (updateError) {
    console.error('❌ Failed to update provider:', updateError);
  }
}

// Log activity (existing function - keeping it the same)
async function logProviderActivity(providerId, submissionId, eventType, email, psaFieldData) {
  await supabase
    .from('provider_activity_logs')
    .insert({
      provider_id: providerId,
      action: 'PSA_WEBHOOK_PROCESSED',
      resource: 'provider_documents',
      details: {
        submission_id: submissionId,
        document_type: 'PSA',
        email: email,
        event_type: eventType,
        psa_fields: psaFieldData,
        auto_signed: true // NEW: Flag to indicate auto-signing occurred
      }
    });
}

// Generate Exhibit B (existing function - keeping it the same)
async function generateExhibitB(providerId, psaData) {
  try {
    // Get provider centers for pricing
    const { data: centers } = await supabase
      .from('provider_centers')
      .select('*')
      .eq('provider_id', providerId);

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
    const fileName = `exhibit-b-${Date.now()}.txt`;
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