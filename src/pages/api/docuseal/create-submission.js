// src/pages/api/docuseal/create-submission.js
export async function POST({ request }) {
  console.log('🔥 API ENDPOINT HIT - Starting DocuSeal API call');

  try {
    const body = await request.json();
    console.log("📦 Incoming request payload:", JSON.stringify(body, null, 2));

    if (!body?.submitters?.[0]?.email || !body?.submitters?.[0]?.name) {
      console.error("❌ Missing required `email` or `name` in payload:", body);
      return new Response(JSON.stringify({ error: "Missing submitter email or name" }), { status: 400 });
    }

    const apiKey = import.meta.env.DOCUSEAL_API_TOKEN;
    const templateId = parseInt(import.meta.env.DOCUSEAL_TEMPLATE_ID) || 1155842; 

    console.log("🔍 Loaded .env values:", {
      apiKey,
      templateId
    });
    

    if (!apiKey) throw new Error('Missing DOCUSEAL_API_TOKEN');
    if (!templateId) throw new Error('Missing DOCUSEAL_TEMPLATE_ID');

    const res = await fetch('https://api.docuseal.com/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': apiKey
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('✅ DocuSeal Cloud response:', JSON.stringify(data, null, 2));

    const embedUrl = Array.isArray(data) && data.length > 0 
  ? data[0].embed_src 
  : data?.submitters?.[0]?.embed_url || data?.submitters?.[0]?.embed_src;

    if (!embedUrl) {
      return new Response(JSON.stringify({ error: 'No embed URL returned from DocuSeal' }), { status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      embed_url: embedUrl,
      submission_id: data.id
    }), { status: 200 });

  } catch (err) {
    console.error("❌ DocuSeal handler failed:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
