import { A as AuthService } from '../../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect }) => {
  try {
    const sessionId = cookies.get("auth_session")?.value;
    if (sessionId) {
      await AuthService.invalidateSession(sessionId);
    }
    cookies.delete("auth_session", {
      path: "/"
    });
    const contentType = request.headers.get("content-type");
    const isFormSubmission = contentType?.includes("application/x-www-form-urlencoded");
    if (isFormSubmission) {
      return redirect("/imaging-center", 302);
    } else {
      return new Response(JSON.stringify({
        success: true,
        message: "Logged out successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    const contentType = request.headers.get("content-type");
    const isFormSubmission = contentType?.includes("application/x-www-form-urlencoded");
    if (isFormSubmission) {
      return redirect("/imaging-center", 302);
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: "Logout failed"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
