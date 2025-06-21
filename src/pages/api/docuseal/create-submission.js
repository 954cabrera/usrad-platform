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

    // 🎯 Enhanced payload with proper field mapping
    const docuSealPayload = {
      template_id: templateId,
      submitters: body.submitters.map(submitter => {
        // Ensure all required fields have fallback values
        const values = submitter.values || {};
        
        return {
          role: submitter.role || 'Provider',
          name: submitter.name,
          email: submitter.email,
          values: {
            // Primary contact fields
            primary_contact_name: values.primary_contact_name || submitter.name || 'Provider Contact',
            primary_contact_phone: values.primary_contact_phone || values.provider_phone || '(000) 000-0000',
            primary_contact_email: values.primary_contact_email || submitter.email || 'provider@usrad.com',
            
            // Provider/Company fields
            provider_name: values.provider_name || submitter.name || 'USRad Provider',
            provider_email: values.provider_email || submitter.email || 'provider@usrad.com',
            provider_phone: values.provider_phone || values.primary_contact_phone || '(000) 000-0000',
            tax_id: values.tax_id || '00-0000000',
            
            // Signer fields
            signer_name: values.signer_name || values.primary_contact_name || submitter.name || 'Provider Representative',
            signer_title: values.signer_title || 'President',
            
            // Location and agreement fields
            total_authorized_locations: values.total_authorized_locations || values.total_locations || '1',
            agreement_date: values.agreement_date || new Date().toLocaleDateString('en-US'),
            provider_date: values.provider_date || new Date().toLocaleDateString('en-US'),
            
            // Ensure any additional fields are included
            ...values
          }
        };
      })
    };

    console.log("📤 Enhanced DocuSeal payload:", JSON.stringify(docuSealPayload, null, 2));

    const docuSealRes = await fetch("https://api.docuseal.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": apiKey
      },
      body: JSON.stringify(docuSealPayload)
    });

    const docuSealData = await docuSealRes.json();
    console.log("📥 DocuSeal Cloud response:", JSON.stringify(docuSealData, null, 2));

    // Log submission values for debugging
    if (docuSealData.submitters && docuSealData.submitters[0]) {
      console.log("🔍 DocuSeal returned values:", docuSealData.submitters[0].values);
    }

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
      submission_id: docuSealData.id || null,
      debug_values: docuSealData.submitters?.[0]?.values || null
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