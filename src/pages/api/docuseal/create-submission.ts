// src/pages/api/docuseal/create-submission.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const requestData = await request.json();

    // DocuSeal configuration
    const DOCUSEAL_URL = 'https://docuseal.nimshuda.com';
    const DOCUSEAL_TOKEN = 'nApDo896RP1i3WuE2sjohkYKwrSS6ZENhhCuicrT7e7';
    const TEMPLATE_ID = 1;

    // Extract fields from request
    const {
      template_id = TEMPLATE_ID,
      submitters
    } = requestData;

    const providerData = submitters?.[0];

    if (!providerData) {
      return new Response(JSON.stringify({ success: false, message: 'Missing provider data' }), { status: 400 });
    }

    console.log('Received provider data:', providerData);

    // Mock facilities (replace with database later)
    const mockFacilities = [
      {
        name: 'Advanced Imaging Center of Davie',
        address: '123 Medical Plaza Dr, Davie, FL 33328',
        phone: '(954) 555-0123'
      },
      {
        name: 'Miami Imaging Associates',
        address: '456 Biscayne Blvd, Miami, FL 33132',
        phone: '(305) 555-0124'
      }
    ];

    const facilityLocationsList = mockFacilities
      .map((facility, index) => `${index + 1}. ${facility.name} - ${facility.address}`)
      .join('\n');


      console.log('DEBUG: provider_name sent as:', providerData.fields?.provider_name || providerData.name);

    // Construct submission payload
    const submissionData = {
      template_id: template_id,
      template_variables: {
        primary_facility_name: mockFacilities[0].name,
        primary_facility_phone: mockFacilities[0].phone,
        provider_email: providerData.email,
        total_locations: mockFacilities.length.toString(),
        agreement_date: new Date().toISOString().split('T')[0],
        provider_name: "⚡ Hardcoded Success Test",
        provider_phone: providerData.fields?.provider_phone || '',
        tax_id: providerData.fields?.tax_id || '',
        signer_name: providerData.fields?.signer_name || providerData.name,
        signer_title: providerData.fields?.signer_title || 'Provider',
        provider_date: new Date().toISOString().split('T')[0],
        facility_locations_list: facilityLocationsList
      },
      submitters: [
        {
          name: providerData.name,
          role: 'Provider',
          email: providerData.email,
          redirect_url: providerData.redirect_url
        },
        {
          role: 'USRad',
          email: '954cabrera+test@gmail.com'
        }
      ]
    };

    console.log('Sending to DocuSeal URL:', `${DOCUSEAL_URL}/api/submissions`);
    console.log('Using token:', DOCUSEAL_TOKEN.substring(0, 10) + '...');
    console.log('Sending data:', JSON.stringify(submissionData, null, 2));

    const response = await fetch(`${DOCUSEAL_URL}/api/submissions`, {
      method: 'POST',
      headers: {
        'X-Auth-Token': DOCUSEAL_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
,
      body: JSON.stringify(submissionData)
    });

    console.log('DocuSeal response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DocuSeal error:', errorText);
      return new Response(
        JSON.stringify({ success: false, message: 'DocuSeal API error', details: errorText }),
        { status: response.status }
      );
    }

    const docusealResponse = await response.json();
    const providerSubmitter = docusealResponse.find(submitter => submitter.role === 'Provider');
    const signingUrl = providerSubmitter?.embed_src;

    console.log('Found signing URL:', signingUrl);

    return new Response(
      JSON.stringify({
        success: true,
        id: providerSubmitter?.submission_id,
        submitters: docusealResponse,
        template_id: template_id,
        status: providerSubmitter?.status,
        url: signingUrl
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error: any) {
    console.error('API Error Details:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error',
        details: 'Failed to create DocuSeal submission'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
