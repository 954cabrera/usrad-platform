// src/pages/api/docuseal/webhook.js
// Webhook handler for DocuSeal form completions

export async function POST({ request }) {
    try {
      const webhookData = await request.json();
      
      console.log('🔔 DocuSeal webhook received:', webhookData);
      
      // Check if this is a form completion event
      if (webhookData.event_type === 'form.completed') {
        const { data } = webhookData;
        
        console.log('✅ PSA completed for:', data.email);
        
        // Extract user information from the webhook
        const userEmail = data.email;
        const submissionId = data.submission_id;
        const documentUrl = data.documents?.[0]?.url;
        const completedAt = data.completed_at;
        
        // Find the user in Supabase by email
        try {
          // You'll need to import your Supabase client here
          // For now, we'll log the data that needs to be updated
          console.log('📝 Need to update user PSA status:', {
            email: userEmail,
            submission_id: submissionId,
            document_url: documentUrl,
            completed_at: completedAt
          });
          
          // TODO: Update user's PSA status in Supabase
          // const { data: user, error } = await supabase
          //   .from('user_profiles')
          //   .update({
          //     psa_signed: true,
          //     psa_signed_at: completedAt,
          //     psa_document_url: documentUrl,
          //     psa_submission_id: submissionId,
          //     onboarding_progress: 75
          //   })
          //   .eq('email', userEmail);
          
          console.log('✅ PSA completion processed successfully');
          
        } catch (dbError) {
          console.error('❌ Error updating user PSA status:', dbError);
        }
      }
      
      // Return 200 OK to acknowledge webhook receipt
      return new Response(JSON.stringify({
        success: true,
        message: 'Webhook processed successfully'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
    } catch (error) {
      console.error('❌ Error processing DocuSeal webhook:', error);
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
  // Handle other HTTP methods
  export async function GET() {
    return new Response(JSON.stringify({
      message: 'DocuSeal webhook endpoint is active',
      supported_events: ['form.completed'],
      endpoint: '/api/docuseal/webhook'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }