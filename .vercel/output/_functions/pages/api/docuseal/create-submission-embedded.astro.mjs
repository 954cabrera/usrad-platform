export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    console.log("API endpoint called");
    const { templateId, providerData } = await request.json();
    console.log("Received data:", { templateId, providerData });
    if (!templateId || !providerData) {
      console.error("Missing required data");
      return new Response(JSON.stringify({
        error: "Missing templateId or providerData"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = "f5CQKmJukoe9kKvtCb3DZqroyvtBJj3ug2AKSXuUmuV";
    console.log("API Key present:", !!apiKey);
    console.log("API Key value:", apiKey ? `${apiKey.substring(0, 10)}...` : "null");
    if (!apiKey) ;
    const submissionData = {
      template_id: templateId,
      send_email: false,
      submitters: [{
        role: "Provider",
        name: providerData.facilityName,
        email: providerData.email,
        fields: [
          {
            name: "primary_contact_name",
            default_value: providerData.contactName || "Not provided"
          },
          {
            name: "primary_contact_phone",
            default_value: providerData.contactPhone || providerData.phone
          },
          {
            name: "primary_contact_email",
            default_value: providerData.contactEmail || providerData.email
          },
          {
            name: "total_locations",
            default_value: providerData.totalLocations || "1"
          },
          {
            name: "agreement_date",
            default_value: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US")
          },
          {
            name: "provider_name",
            default_value: providerData.facilityName
          },
          {
            name: "signer_name",
            default_value: providerData.contactName || "Provider Contact"
          },
          {
            name: "signer_title",
            default_value: providerData.signerTitle || "Administrator"
          },
          {
            name: "provider_date",
            default_value: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US")
          },
          {
            name: "tax_id",
            default_value: providerData.taxId
          },
          {
            name: "provider_email",
            default_value: providerData.email
          },
          {
            name: "provider_phone",
            default_value: providerData.phone
          }
        ]
      }]
    };
    console.log("Sending to DocuSeal:", JSON.stringify(submissionData, null, 2));
    const response = await fetch("https://api.docuseal.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": apiKey
      },
      body: JSON.stringify(submissionData)
    });
    console.log("DocuSeal response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("DocuSeal API error:", errorText);
      return new Response(JSON.stringify({
        error: "DocuSeal API failed",
        details: errorText,
        status: response.status
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }
    const submission = await response.json();
    console.log("DocuSeal success:", submission);
    const submitter = submission.submitters?.[0];
    if (!submitter || !submitter.embed_src) {
      console.error("No embed_src in response:", submission);
      return new Response(JSON.stringify({
        error: "Invalid response from DocuSeal",
        details: "No embed_src found"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      submission_id: submission.id,
      embed_src: submitter.embed_src,
      submitter_slug: submitter.slug
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API endpoint error:", error);
    return new Response(JSON.stringify({
      error: "Internal server error",
      details: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
