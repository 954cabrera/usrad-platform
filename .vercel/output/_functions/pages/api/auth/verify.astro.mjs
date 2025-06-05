import { D as DatabaseService, A as AuthService } from '../../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ url, cookies, redirect }) => {
  try {
    const token = url.searchParams.get("token");
    if (!token) {
      return redirect("/provider-signup?error=invalid_link");
    }
    const verification = await DatabaseService.verifyToken(token);
    if (!verification || verification.expired) {
      return redirect("/provider-signup?error=expired_link");
    }
    if (verification.used) {
      return redirect("/provider-signup?error=link_already_used");
    }
    const user = await DatabaseService.getUserById(verification.userId);
    if (!user) {
      return redirect("/provider-signup?error=user_not_found");
    }
    await DatabaseService.updateProviderStatus(verification.userId, "psa_pending");
    await DatabaseService.markTokenAsUsed(token);
    const session = await AuthService.createSession(user.id);
    cookies.set("auth_session", session.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    return redirect("/dashboard?verified=true&welcome=true");
  } catch (error) {
    console.error("Magic link verification error:", error);
    return redirect("/provider-signup?error=verification_failed");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
