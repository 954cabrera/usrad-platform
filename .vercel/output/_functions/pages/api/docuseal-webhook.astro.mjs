export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    console.log("=== DocuSeal Webhook Received ===");
    const payload = await request.json();
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));
    const webhookSecret = "your_webhook_secret_here";
    if (webhookSecret) {
      const signature = request.headers.get("x-docuseal-signature");
    }
    const eventType = payload.event_type || payload.type;
    const submissionData = payload.data || payload;
    console.log("Event type:", eventType);
    console.log("Submission ID:", submissionData.id || submissionData.submission_id);
    switch (eventType) {
      case "form.completed":
      case "submission.completed":
        await handleDocumentCompleted(submissionData);
        break;
      case "form.started":
        await handleDocumentStarted(submissionData);
        break;
      case "form.viewed":
        await handleDocumentViewed(submissionData);
        break;
      case "submission.expired":
        await handleDocumentExpired(submissionData);
        break;
      case "form.declined":
        await handleDocumentDeclined(submissionData);
        break;
      case "submission.created":
        await handleSubmissionCreated(submissionData);
        break;
      case "submission.archived":
        await handleSubmissionArchived(submissionData);
        break;
      default:
        console.log("Unhandled event type:", eventType);
    }
    return new Response(
      JSON.stringify({ status: "received" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
const GET = async () => {
  return new Response(
    JSON.stringify({
      message: "DocuSeal Webhook Endpoint",
      status: "ready",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      methods: ["POST"],
      note: "This endpoint receives DocuSeal webhook events via POST requests"
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
};
async function handleDocumentCompleted(submissionData) {
  console.log("📋 Document completed:", submissionData.id || submissionData.submission_id);
  try {
    const signerName = submissionData.name || submissionData.signer_name;
    const signerEmail = submissionData.email || submissionData.signer_email;
    console.log("✅ PSA completed by:", signerName, signerEmail);
    console.log("📄 Completed at:", submissionData.completed_at);
    const completionRecord = {
      submissionId: submissionData.id || submissionData.submission_id,
      providerId: extractProviderIdFromSubmission(submissionData),
      completedAt: submissionData.completed_at || (/* @__PURE__ */ new Date()).toISOString(),
      signerName,
      signerEmail,
      status: "completed"
    };
    console.log("💾 Completion record:", completionRecord);
  } catch (error) {
    console.error("Error handling document completion:", error);
  }
}
async function handleDocumentStarted(submissionData) {
  console.log("🚀 Document started:", submissionData.id || submissionData.submission_id);
}
async function handleDocumentViewed(submissionData) {
  console.log("👀 Document viewed:", submissionData.id || submissionData.submission_id);
}
async function handleSubmissionCreated(submissionData) {
  console.log("📝 Submission created:", submissionData.id || submissionData.submission_id);
}
async function handleSubmissionArchived(submissionData) {
  console.log("🗄️ Submission archived:", submissionData.id || submissionData.submission_id);
}
async function handleDocumentDeclined(submissionData) {
  console.log("❌ Document declined:", submissionData.id);
}
async function handleDocumentExpired(submissionData) {
  console.log("⏰ Document expired:", submissionData.id);
}
function extractProviderIdFromSubmission(submissionData) {
  if (submissionData.values && Array.isArray(submissionData.values)) {
    const providerField = submissionData.values.find(
      (field) => field.field === "provider_id" || field.field === "providerId"
    );
    if (providerField) return providerField.value;
  }
  if (submissionData.provider_id) return submissionData.provider_id;
  if (submissionData.providerId) return submissionData.providerId;
  if (submissionData.external_id) return submissionData.external_id;
  return submissionData.submission_id || submissionData.id || "unknown";
}
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-DocuSeal-Signature"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
