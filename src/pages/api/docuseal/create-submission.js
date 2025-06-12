// src/pages/api/docuseal/create-submission.js

export async function POST({ request }) {
  console.log('🔥 API ENDPOINT HIT - Starting DocuSeal API call');
  
  try {
    const body = await request.json();
    const { email, name } = body;

    console.log('📄 Creating DocuSeal Cloud submission for:', email);

    // Get environment variables
    const apiKey = "MZtmQ5gQNf3qEkbxJvLEtyWMRu5zHy4oLgDxw9aCpwX"; // Hardcoded for testing
    const templateId = import.meta.env.DOCUSEAL_TEMPLATE_ID;

    console.log('🔍 API Key loaded:', !!apiKey);
    console.log('🔍 API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
    console.log('🔍 Template ID:', templateId);

    // Validate required environment variables
    if (!apiKey) {
      console.log('❌ API KEY MISSING!');
      throw new Error('DOCUSEAL_API_TOKEN is not configured');
    }
    if (!templateId) {
      console.log('❌ TEMPLATE ID MISSING!');
      throw new Error('DOCUSEAL_TEMPLATE_ID is not configured');
    }

    console.log('🔑 Using template ID:', templateId);

    // DocuSeal Cloud API endpoint (corrected)
    const response = await fetch('https://api.docuseal.com/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': apiKey,
      },
      body: JSON.stringify({
        template_id: parseInt(templateId), // Convert to number
        submitters: [{
          role: 'Provider',
          name: name,
          email: email,
          // Add any additional fields your template needs
          values: {
            provider_name: name,
            provider_email: email,
            // Add other form field mappings here
          }
        }]
      }),
    });

    const data = await response.json();
    console.log('✅ DocuSeal Cloud response status:', response.status);
    console.log('✅ DocuSeal Cloud response data:', JSON.stringify(data, null, 2));

    // Handle different response formats
    if (response.ok && data) {
      console.log('✅ DocuSeal response is an array:', Array.isArray(data));
      
      // DocuSeal returns an array of submitters
      let embedUrl = null;
      
      if (Array.isArray(data) && data[0]) {
        const submitter = data[0];
        console.log('📍 Checking submitter object:', Object.keys(submitter));
        
        if (submitter.embed_src) {
          embedUrl = submitter.embed_src;
          console.log('📍 Found embed URL in data[0].embed_src');
        } else if (submitter.embed_url) {
          embedUrl = submitter.embed_url;
          console.log('📍 Found embed URL in data[0].embed_url');
        }
      } else if (data.submitters && data.submitters[0]) {
        if (data.submitters[0].embed_url) {
          embedUrl = data.submitters[0].embed_url;
          console.log('📍 Found embed URL in data.submitters[0].embed_url');
        } else if (data.submitters[0].embed_src) {
          embedUrl = data.submitters[0].embed_src;
          console.log('📍 Found embed URL in data.submitters[0].embed_src');
        }
      } else if (data.embed_url) {
        embedUrl = data.embed_url;
        console.log('📍 Found embed URL in data.embed_url');
      } else if (data.embed_src) {
        embedUrl = data.embed_src;
        console.log('📍 Found embed URL in data.embed_src');
      } else {
        console.log('❌ Available keys in response:', Object.keys(data));
        if (Array.isArray(data) && data[0]) {
          console.log('❌ Available keys in data[0]:', Object.keys(data[0]));
        }
      }

      if (embedUrl) {
        return new Response(JSON.stringify({
          success: true,
          embed_url: embedUrl,
          submission_id: data.id,
          data: data // Include full response for debugging
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        console.error('❌ No embed URL found in response:', data);
        throw new Error('No embed URL found in DocuSeal response');
      }
    } else {
      console.error('❌ DocuSeal API error response:', data);
      throw new Error(data.error || data.message || 'DocuSeal API request failed');
    }

  } catch (error) {
    console.error('❌ DocuSeal Cloud API error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}