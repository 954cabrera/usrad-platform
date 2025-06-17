// src/pages/api/docuseal/create-submission.js
export async function POST({ request }) {
  console.log('🔥 API ENDPOINT HIT - Starting DocuSeal API call');

  try {
    const body = await request.json();
    console.log("📦 Incoming request payload:", JSON.stringify(body, null, 2));

    const submitter = body?.submitters?.[0];
    const name = submitter?.name?.trim();
    const email = submitter?.email?.trim();

    if (!name || !email) {
      console.error("❌ Missing or invalid submitter `email` or `name` in payload:", { name, email });
      return new Response(JSON.stringify({ error: "Missing or invalid submitter email or name" }), {
        status: 400
      });
    }

    const apiKey = import.meta.env.DOCUSEAL_API_TOKEN;
    const templateId = parseInt(import.meta.env.DOCUSEAL_TEMPLATE_ID) || 1155842;

    console.log("🔐 Loaded .env values:", {
      apiKeyLoaded: !!apiKey,
      templateId
    });

    if (!apiKey) throw new Error("Missing DOCUSEAL_API_TOKEN");
    if (!templateId) throw new Error("Missing DOCUSEAL_TEMPLATE_ID");

    const docuSealRes = await fetch("https://api.docuseal.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": apiKey
      },
      body: JSON.stringify({
        template_id: templateId,
        submitters: body.submitters
      })
    });

    const docuSealData = await docuSealRes.json();
    console.log("📥 DocuSeal Cloud response:", JSON.stringify(docuSealData, null, 2));

    // Extract embed URL
    const embedUrl =
      Array.isArray(docuSealData) && docuSealData[0]?.embed_src
        ? docuSealData[0].embed_src
        : docuSealData?.submitters?.[0]?.embed_url || docuSealData?.submitters?.[0]?.embed_src;

    if (!embedUrl) {
      console.error("❌ No embed URL returned by DocuSeal");
      return new Response(JSON.stringify({ error: "No embed URL returned from DocuSeal" }), {
        status: 500
      });
    }

    return new Response(JSON.stringify({
      success: true,
      embed_url: embedUrl,
      submission_id: docuSealData.id || null
    }), {
      status: 200
    });

  } catch (err) {
    console.error("❌ DocuSeal handler failed:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}
