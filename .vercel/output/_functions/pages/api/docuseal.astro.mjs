export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    console.log("=== DocuSeal API Route Called ===");
    const { templateId, providerData } = await request.json();
    console.log("Received data:", { templateId, providerData });
    const API_KEY = "f5CQKmJukoe9kKvtCb3DZqroyvtBJj3ug2AKSXuUmuV";
    if (!API_KEY) ;
    console.log("API Key found:", API_KEY.substring(0, 10) + "...");
    const submissionData = {
      template_id: parseInt(templateId),
      send_email: false,
      submitters: [
        {
          role: "Provider",
          name: providerData.contactName || "Dr. John Smith",
          email: providerData.email || "admin@example.com",
          // Add redirect URL to bring users back after signing
          redirect_url: `https://usrad-r-production.up.railway.app/dashboard/psa/completed?submission_id={{submission.id}}`,
          fields: [
            { name: "provider_name", value: providerData.providerName || providerData.facilityName },
            { name: "primary_contact_name", value: providerData.contactName },
            { name: "signer_name", value: providerData.contactName },
            { name: "signer_title", value: providerData.signerTitle },
            { name: "primary_contact_email", value: providerData.email },
            { name: "provider_email", value: providerData.email },
            { name: "primary_contact_phone", value: providerData.phone },
            { name: "provider_phone", value: providerData.phone },
            { name: "tax_id", value: providerData.taxId },
            { name: "total_locations", value: providerData.totalLocations },
            { name: "agreement_date", value: providerData.effectiveDate },
            { name: "provider_date", value: providerData.generatedDate }
          ]
        }
      ]
    };
    console.log("Submission data being sent to DocuSeal:", JSON.stringify(submissionData, null, 2));
    const docusealResponse = await fetch("https://api.docuseal.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": API_KEY
      },
      body: JSON.stringify(submissionData)
    });
    console.log("DocuSeal response status:", docusealResponse.status);
    const responseText = await docusealResponse.text();
    console.log("DocuSeal raw response:", responseText);
    if (!docusealResponse.ok) {
      console.error("DocuSeal API Error Response:", responseText);
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = errorJson;
      } catch (e) {
      }
      return new Response(
        JSON.stringify({
          error: "Failed to create DocuSeal submission",
          status: docusealResponse.status,
          details: errorDetails
        }),
        {
          status: docusealResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    let result;
    try {
      result = JSON.parse(responseText);
      console.log("Parsed DocuSeal response:", result);
    } catch (e) {
      console.error("Failed to parse DocuSeal response as JSON:", e);
      return new Response(
        JSON.stringify({
          error: "Invalid response from DocuSeal",
          details: responseText
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const submitter = result[0];
    let embedUrl = submitter.embed_src;
    if (embedUrl && !embedUrl.includes("?embed=1")) {
      embedUrl = embedUrl + "?embed=1";
    }
    console.log("Original embed_src:", submitter.embed_src);
    console.log("Modified embed URL:", embedUrl);
    const responseData = {
      id: submitter.submission_id,
      // Use submission_id for the submission
      embed_src: embedUrl,
      // Use the modified embed URL
      status: submitter.status,
      submitters: [submitter]
      // Wrap in array for consistency
    };
    console.log("Returning response data:", responseData);
    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : void 0
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
