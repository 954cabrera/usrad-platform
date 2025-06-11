// src/pages/api/docuseal/create-submission.js
// Fixed API endpoint for your self-hosted DocuSeal server

export async function POST({ request }) {
    try {
      const submissionData = await request.json();
      
      console.log('📥 Received submission request:', JSON.stringify(submissionData, null, 2));
      console.log('🔍 Submitter data being sent:', JSON.stringify(submissionData.submitters[0], null, 2));
      
      // DocuSeal CLOUD SERVICE configuration (per official docs)
      const DOCUSEAL_API_URL = 'https://api.docuseal.com'; 
      const DOCUSEAL_API_TOKEN = import.meta.env.DOCUSEAL_API_TOKEN;
      
      console.log('🔐 API Token check:', DOCUSEAL_API_TOKEN ? 'Token present' : 'Token missing');
      
      if (!DOCUSEAL_API_TOKEN) {
        throw new Error('DocuSeal API token not configured');
      }
      
      // Create submission via DocuSeal API (per official docs)
      const response = await fetch(`${DOCUSEAL_API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'X-Auth-Token': DOCUSEAL_API_TOKEN, // Official docs use X-Auth-Token header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: submissionData.template_id, // Use the template_id from your request (1155842)
          send_email: submissionData.send_email || false,
          submitters: submissionData.submitters.map(submitter => ({
            role: submitter.role,
            name: submitter.name,
            email: submitter.email,
            
            // Pre-fill all form fields
            values: submitter.values
          })),
          
          // Add metadata for tracking
          metadata: {
            ...submissionData.metadata,
            created_via: 'USRad_API',
            api_version: '1.0'
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ DocuSeal API error:', response.status, errorText);
        throw new Error(`DocuSeal API error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('✅ DocuSeal submission created successfully:', result);
      
      // Handle array response from DocuSeal API
      const responseData = Array.isArray(result) ? result[0] : result;
      
      // Return the result with signing URLs (handle different response formats)
      return new Response(JSON.stringify({
        success: true,
        submission_id: responseData?.submission_id || responseData?.id,
        submitters: Array.isArray(result) ? result : [result],
        signing_url: responseData?.embed_src || responseData?.send_link_url,
        embed_src: responseData?.embed_src,
        metadata: responseData?.metadata || {}
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
    } catch (error) {
      console.error('❌ Error in create-submission endpoint:', error);
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        details: 'Failed to create DocuSeal submission'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
  // Handle GET requests (for testing)
  export async function GET() {
    return new Response(JSON.stringify({
      message: 'DocuSeal submission endpoint is active',
      method: 'POST',
      required_fields: [
        'template_id',
        'submitters'
      ]
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }