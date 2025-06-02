// src/pages/api/docuseal-webhook.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== DocuSeal Webhook Received ===');
    
    const payload = await request.json();
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));

    // Verify webhook authenticity (optional but recommended)
    const webhookSecret = import.meta.env.DOCUSEAL_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get('x-docuseal-signature');
      // Add signature verification logic here if needed
    }

    // Handle different event types based on DocuSeal's actual events
    const eventType = payload.event_type || payload.type;
    const submissionData = payload.data || payload;

    console.log('Event type:', eventType);
    console.log('Submission ID:', submissionData.id || submissionData.submission_id);

    switch (eventType) {
      case 'form.completed':
      case 'submission.completed':
        await handleDocumentCompleted(submissionData);
        break;
      
      case 'form.started':
        await handleDocumentStarted(submissionData);
        break;
      
      case 'form.viewed':
        await handleDocumentViewed(submissionData);
        break;
      
      case 'submission.expired':
        await handleDocumentExpired(submissionData);
        break;
      
      case 'form.declined':
        await handleDocumentDeclined(submissionData);
        break;
      
      case 'submission.created':
        await handleSubmissionCreated(submissionData);
        break;
      
      case 'submission.archived':
        await handleSubmissionArchived(submissionData);
        break;
      
      default:
        console.log('Unhandled event type:', eventType);
    }

    return new Response(
      JSON.stringify({ status: 'received' }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

async function handleDocumentCompleted(submissionData: any) {
  console.log('📋 Document completed:', submissionData.id || submissionData.submission_id);
  
  try {
    // Example: Update database
    // await updateProviderPSAStatus(submissionData.provider_id, 'completed');
    
    // Example: Send notification email
    // await sendPSACompletionNotification(submissionData);
    
    // Log the completion with relevant details
    const signerName = submissionData.name || submissionData.signer_name;
    const signerEmail = submissionData.email || submissionData.signer_email;
    
    console.log('✅ PSA completed by:', signerName, signerEmail);
    console.log('📄 Completed at:', submissionData.completed_at);
    
    // Store completion data (you'll want to persist this in your database)
    const completionRecord = {
      submissionId: submissionData.id || submissionData.submission_id,
      providerId: extractProviderIdFromSubmission(submissionData),
      completedAt: submissionData.completed_at || new Date().toISOString(),
      signerName: signerName,
      signerEmail: signerEmail,
      status: 'completed'
    };
    
    console.log('💾 Completion record:', completionRecord);
    
    // TODO: Save to your database
    // await saveCompletionRecord(completionRecord);
    
  } catch (error) {
    console.error('Error handling document completion:', error);
  }
}

async function handleDocumentStarted(submissionData: any) {
  console.log('🚀 Document started:', submissionData.id || submissionData.submission_id);
  // Update status to "in_progress" or "signing"
}

async function handleDocumentViewed(submissionData: any) {
  console.log('👀 Document viewed:', submissionData.id || submissionData.submission_id);
  // Update status to "viewed" if needed
}

async function handleSubmissionCreated(submissionData: any) {
  console.log('📝 Submission created:', submissionData.id || submissionData.submission_id);
  // Log creation for tracking
}

async function handleSubmissionArchived(submissionData: any) {
  console.log('🗄️ Submission archived:', submissionData.id || submissionData.submission_id);
  // Handle archival
}

async function handleDocumentDeclined(submissionData: any) {
  console.log('❌ Document declined:', submissionData.id);
  
  // Handle document decline
  // await updateProviderPSAStatus(submissionData.provider_id, 'declined');
  // await sendDeclineNotification(submissionData);
}

async function handleDocumentExpired(submissionData: any) {
  console.log('⏰ Document expired:', submissionData.id);
  
  // Handle document expiration
  // await updateProviderPSAStatus(submissionData.provider_id, 'expired');
  // await sendExpirationNotification(submissionData);
}

function extractProviderIdFromSubmission(submissionData: any): string {
  // Extract provider ID from the submission data
  // Check multiple possible locations for the provider ID
  
  // Option 1: Check values array (as shown in the webhook example)
  if (submissionData.values && Array.isArray(submissionData.values)) {
    const providerField = submissionData.values.find(
      (field: any) => field.field === 'provider_id' || field.field === 'providerId'
    );
    if (providerField) return providerField.value;
  }
  
  // Option 2: Check direct properties
  if (submissionData.provider_id) return submissionData.provider_id;
  if (submissionData.providerId) return submissionData.providerId;
  
  // Option 3: Extract from external_id if you're setting it
  if (submissionData.external_id) return submissionData.external_id;
  
  // Option 4: Use submission_id as fallback
  return submissionData.submission_id || submissionData.id || 'unknown';
}

// Handle preflight CORS requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-DocuSeal-Signature',
    },
  });
};