// src/pages/api/docuseal.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== DocuSeal API Route Called ===');
    
    const { templateId, providerData } = await request.json();
    console.log('Received data:', { templateId, providerData });
    
    // Get API key from environment
    const API_KEY = import.meta.env.DOCUSEAL_API_KEY;
    
    if (!API_KEY) {
      console.error('DOCUSEAL_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: 'DocuSeal API key not configured' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('API Key found:', API_KEY.substring(0, 10) + '...');

    // Prepare submission data with CORRECT field names from your template
    const submissionData = {
      template_id: parseInt(templateId),
      send_email: false,
      submitters: [
        {
          role: 'Provider',
          name: providerData.contactName || 'Dr. John Smith',
          email: providerData.email || 'admin@example.com',
          // Add redirect URL to bring users back after signing
          redirect_url: `https://usrad-platform.vercel.app/dashboard/psa/completed?submission_id={{submission.id}}`,
          fields: [
            { name: 'provider_name', value: providerData.providerName || providerData.facilityName },
            { name: 'primary_contact_name', value: providerData.contactName },
            { name: 'signer_name', value: providerData.contactName },
            { name: 'signer_title', value: providerData.signerTitle },
            { name: 'primary_contact_email', value: providerData.email },
            { name: 'provider_email', value: providerData.email },
            { name: 'primary_contact_phone', value: providerData.phone },
            { name: 'provider_phone', value: providerData.phone },
            { name: 'tax_id', value: providerData.taxId },
            { name: 'total_locations', value: providerData.totalLocations },
            { name: 'agreement_date', value: providerData.effectiveDate },
            { name: 'provider_date', value: providerData.generatedDate }
          ]
        }
      ]
    };

    console.log('Submission data being sent to DocuSeal:', JSON.stringify(submissionData, null, 2));

    // Make request to DocuSeal API
    const docusealResponse = await fetch('https://api.docuseal.com/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': API_KEY
      },
      body: JSON.stringify(submissionData)
    });

    console.log('DocuSeal response status:', docusealResponse.status);

    const responseText = await docusealResponse.text();
    console.log('DocuSeal raw response:', responseText);

    if (!docusealResponse.ok) {
      console.error('DocuSeal API Error Response:', responseText);
      
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = errorJson;
      } catch (e) {
        // Keep as text if not JSON
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to create DocuSeal submission',
          status: docusealResponse.status,
          details: errorDetails 
        }), 
        { 
          status: docusealResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse successful response
    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Parsed DocuSeal response:', result);
    } catch (e) {
      console.error('Failed to parse DocuSeal response as JSON:', e);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response from DocuSeal',
          details: responseText 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // DocuSeal returns an array of submitters, so we need the first one
    const submitter = result[0]; // Get the first submitter from the array
    
    // Ensure the embed URL is in the correct format for iframe embedding
    let embedUrl = submitter.embed_src;
    
    // DocuSeal sometimes returns URLs that need to be converted for iframe use
    if (embedUrl && !embedUrl.includes('?embed=1')) {
      embedUrl = embedUrl + '?embed=1';
    }
    
    console.log('Original embed_src:', submitter.embed_src);
    console.log('Modified embed URL:', embedUrl);
    
    const responseData = {
      id: submitter.submission_id, // Use submission_id for the submission
      embed_src: embedUrl, // Use the modified embed URL
      status: submitter.status,
      submitters: [submitter] // Wrap in array for consistency
    };

    console.log('Returning response data:', responseData);

    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Route Error:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};