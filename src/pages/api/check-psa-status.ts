// src/pages/api/check-psa-status.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const submissionId = url.searchParams.get('submissionId');
    
    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: 'Submission ID is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('=== Checking PSA Status ===');
    console.log('Submission ID:', submissionId);

    // Get API key from environment
    const API_KEY = import.meta.env.DOCUSEAL_API_KEY;
    
    if (!API_KEY) {
      return new Response(
        JSON.stringify({ error: 'DocuSeal API key not configured' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check submission status with DocuSeal API
    const docusealResponse = await fetch(`https://api.docuseal.com/submissions/${submissionId}`, {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_KEY
      }
    });

    if (!docusealResponse.ok) {
      console.error('DocuSeal API Error:', docusealResponse.status);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to check submission status',
          status: 'unknown'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const submissionData = await docusealResponse.json();
    console.log('DocuSeal submission data:', submissionData);

    // Check if all submitters have completed
    const isCompleted = submissionData.submitters?.every(
      (submitter: any) => submitter.completed_at !== null
    );

    // Extract relevant information
    const status = isCompleted ? 'completed' : 'pending';
    const completedSubmitter = submissionData.submitters?.find(
      (submitter: any) => submitter.completed_at !== null
    );

    const responseData = {
      status: status,
      submissionId: submissionData.id,
      isCompleted: isCompleted,
      completedAt: completedSubmitter?.completed_at || null,
      signerName: completedSubmitter?.name || null,
      signerEmail: completedSubmitter?.email || null,
      documentUrl: completedSubmitter?.embed_src || null
    };

    console.log('Status check result:', responseData);

    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Status check error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        status: 'error',
        message: error.message
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Handle preflight CORS requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};