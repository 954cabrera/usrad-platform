// src/pages/api/providers/docuseal/create-submission.js
export async function POST({ request }) {
  try {
    const body = await request.json();
    
    console.log('Provider DocuSeal Request:', JSON.stringify(body, null, 2));
    
    // Make sure you have the API key
    const apiKey = import.meta.env.DOCUSEAL_API_KEY;
    if (!apiKey) {
      throw new Error('DocuSeal API key not configured');
    }
    
    const response = await fetch('https://docuseal.nimshuda.com/api/submissions', {
      method: 'POST',
      headers: {
        'X-Auth-Token': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log('DocuSeal Response Status:', response.status);
    console.log('DocuSeal Response Data:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create submission');
    }

    // Find the signing URL in various possible locations
    const signingUrl = data.submission_url || 
                      data.embed_url || 
                      data.url ||
                      data.signing_url ||
                      (data.submission && data.submission.url) ||
                      (data.submission && data.submission.embed_url);

    console.log('Found signing URL:', signingUrl);

    return new Response(JSON.stringify({
      success: true,
      signingUrl: signingUrl,
      embed_url: signingUrl,
      submissionId: data.id || data.submission_id,
      fullResponse: data // Include full response for debugging
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Provider DocuSeal API Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}