import { A as AuthService, l as lucia } from '../../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: "Email and password are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const authResult = await AuthService.authenticateUser(email, password);
    if (!authResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: authResult.error
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const session = await lucia.createSession(authResult.user.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes
    });
    let redirectUrl = "/dashboard";
    if (authResult.user.role === "admin") {
      redirectUrl = "/dashboard/admin";
    } else if (authResult.user.role === "imaging_center") {
      redirectUrl = "/dashboard";
    }
    return new Response(JSON.stringify({
      success: true,
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
        role: authResult.user.role,
        firstName: authResult.user.firstName,
        lastName: authResult.user.lastName
      },
      redirectUrl
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "An unexpected error occurred. Please try again."
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
