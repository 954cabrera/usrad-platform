// /src/pages/api/docuseal/create-submission-embedded.ts
// Fixed version with proper error handling and prerender configuration

export const prerender = false; // ✅ CRITICAL: Enable server-side rendering for POST requests

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== DocuSeal API Route Called ===');
    
    // ✅ ENHANCED: Better request body parsing with error handling
    let requestData;
    try {
      const requestText = await request.text();
      console.log('Raw request body:', requestText);
      
      if (!requestText.trim()) {
        throw new Error('Empty request body');
      }
      
      requestData = JSON.parse(requestText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON in request body',
        details: parseError.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { templateId, providerData } = requestData;
    console.log('Parsed data:', { templateId, providerData });

    if (!templateId || !providerData) {
      console.error('Missing required data');
      return new Response(JSON.stringify({ 
        error: 'Missing templateId or providerData' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for API key
    const apiKey = import.meta.env.DOCUSEAL_API_KEY;
    console.log('API Key present:', !!apiKey);
    
    if (!apiKey) {
      console.error('No API key found');
      return new Response(JSON.stringify({ 
        error: 'DOCUSEAL_API_KEY not configured. Please add it to your .env file.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ✅ ENHANCED: Better submission data structure
    const submissionData = {
      template_id: parseInt(templateId),
      send_email: false,
      submitters: [{
        role: 'Provider',
        name: providerData.facilityName || providerData.contactName,
        email: providerData.email,
        // ✅ FIXED: Use values instead of fields for pre-population
        values: {
          primary_contact_name: providerData.contactName || 'Not provided',
          primary_contact_phone: providerData.contactPhone || providerData.phone || '',
          primary_contact_email: providerData.contactEmail || providerData.email || '',
          total_locations: providerData.totalLocations || '1',
          agreement_date: new Date().toLocaleDateString('en-US'),
          provider_name: providerData.facilityName || '',
          signer_name: providerData.contactName || 'Provider Contact',
          signer_title: providerData.signerTitle || 'Administrator',
          provider_date: new Date().toLocaleDateString('en-US'),
          tax_id: providerData.taxId || '',
          provider_email: providerData.email || '',
          provider_phone: providerData.phone || ''
        }
      }]
    };

    console.log('Sending to DocuSeal:', JSON.stringify(submissionData, null, 2));

    // ✅ ENHANCED: Better error handling for DocuSeal API call
    let response;
    try {
      response = await fetch('https://api.docuseal.com/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': apiKey
        },
        body: JSON.stringify(submissionData)
      });
    } catch (fetchError) {
      console.error('Network error calling DocuSeal:', fetchError);
      return new Response(JSON.stringify({ 
        error: 'Network error connecting to DocuSeal',
        details: fetchError.message
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('DocuSeal response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DocuSeal API error:', errorText);
      
      return new Response(JSON.stringify({ 
        error: 'DocuSeal API failed',
        details: errorText,
        status: response.status
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const submissionResponse = await response.json();
    console.log('DocuSeal success response:', JSON.stringify(submissionResponse, null, 2));
    
    // ✅ FIXED: DocuSeal returns submitters array directly, not wrapped in object
    let submitters;
    let submissionId;
    
    if (Array.isArray(submissionResponse)) {
      // Direct array response
      console.log('Response is direct submitters array');
      submitters = submissionResponse;
      submissionId = submitters[0]?.submission_id;
    } else if (submissionResponse.submitters) {
      // Wrapped in object response
      console.log('Response has submitters property');
      submitters = submissionResponse.submitters;
      submissionId = submissionResponse.id;
    } else {
      console.error('Unknown response format:', submissionResponse);
      return new Response(JSON.stringify({ 
        error: 'Invalid response from DocuSeal',
        details: 'Unknown response format'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Submitters array:', submitters);
    console.log('Submitters length:', submitters?.length);
    
    if (!submitters || !Array.isArray(submitters) || submitters.length === 0) {
      console.error('No submitters array found');
      return new Response(JSON.stringify({ 
        error: 'Invalid response from DocuSeal',
        details: 'No submitters array found'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const submitter = submitters[0];
    console.log('First submitter:', JSON.stringify(submitter, null, 2));
    
    if (!submitter) {
      console.error('First submitter is null/undefined');
      return new Response(JSON.stringify({ 
        error: 'Invalid response from DocuSeal',
        details: 'First submitter is null'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Submitter embed_src:', submitter.embed_src);

    if (!submitter.embed_src) {
      console.error('No embed_src in submitter:', submitter);
      return new Response(JSON.stringify({ 
        error: 'Invalid response from DocuSeal',
        details: 'No embed_src found in submitter data'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Found embed_src:', submitter.embed_src);

    // ✅ SUCCESS: Return the embed URL and submission details
    return new Response(JSON.stringify({
      success: true,
      submission_id: submissionId,
      embed_src: submitter.embed_src,
      submitter_slug: submitter.slug,
      submitter_id: submitter.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API endpoint error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};