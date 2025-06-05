export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const submissionId = url.searchParams.get("submissionId");
    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: "Submission ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("=== Checking PSA Status ===");
    console.log("Submission ID:", submissionId);
    const API_KEY = "f5CQKmJukoe9kKvtCb3DZqroyvtBJj3ug2AKSXuUmuV";
    if (!API_KEY) ;
    const docusealResponse = await fetch(`https://api.docuseal.com/submissions/${submissionId}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_KEY
      }
    });
    if (!docusealResponse.ok) {
      console.error("DocuSeal API Error:", docusealResponse.status);
      return new Response(
        JSON.stringify({
          error: "Failed to check submission status",
          status: "unknown"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const submissionData = await docusealResponse.json();
    console.log("DocuSeal submission data:", submissionData);
    const isCompleted = submissionData.submitters?.every(
      (submitter) => submitter.completed_at !== null
    );
    const status = isCompleted ? "completed" : "pending";
    const completedSubmitter = submissionData.submitters?.find(
      (submitter) => submitter.completed_at !== null
    );
    const responseData = {
      status,
      submissionId: submissionData.id,
      isCompleted,
      completedAt: completedSubmitter?.completed_at || null,
      signerName: completedSubmitter?.name || null,
      signerEmail: completedSubmitter?.email || null,
      documentUrl: completedSubmitter?.embed_src || null
    };
    console.log("Status check result:", responseData);
    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Status check error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        status: "error",
        message: error.message
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
