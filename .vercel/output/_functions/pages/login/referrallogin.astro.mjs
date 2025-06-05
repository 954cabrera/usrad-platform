/* empty css                                    */
import { c as createComponent, a as renderHead, g as renderScript, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                            */
export { renderers } from '../../renderers.mjs';

const $$Referrallogin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-fnz44ojp> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Referring Physician Login | USRad</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-fnz44ojp> <div class="login-layout" data-astro-cid-fnz44ojp> <div class="logo-side" data-astro-cid-fnz44ojp> <a href="/login" class="back-link" data-astro-cid-fnz44ojp> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-fnz44ojp> <path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-fnz44ojp></path> </svg>
Back to Selection
</a> <img src="/logo/USRad-Logo-final-white-text-ref-phy-login.png" alt="USRad Logo" data-astro-cid-fnz44ojp> <p class="brand-tagline" data-astro-cid-fnz44ojp>
Partnering with physicians to deliver excellence in diagnostic
          imaging.
</p> </div> <div class="form-side" data-astro-cid-fnz44ojp> <div class="login-box" data-astro-cid-fnz44ojp> <h2 data-astro-cid-fnz44ojp>Referring Physician Login</h2> <form onsubmit="handleSubmit(event)" data-astro-cid-fnz44ojp> <label for="username" data-astro-cid-fnz44ojp>Username<span class="asterisk" data-astro-cid-fnz44ojp>*</span></label> <div class="input-wrapper" data-astro-cid-fnz44ojp> <input type="text" id="username" name="username" required data-astro-cid-fnz44ojp> </div> <label for="password" data-astro-cid-fnz44ojp>Password<span class="asterisk" data-astro-cid-fnz44ojp>*</span></label> <div class="input-wrapper" data-astro-cid-fnz44ojp> <input type="password" id="password" name="password" required data-astro-cid-fnz44ojp> <span class="toggle-password" onclick="togglePassword()" data-astro-cid-fnz44ojp> <svg id="eye-open" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-fnz44ojp> <path d="M12 4.5C7.305 4.5 3.29 7.635 1.5 12c1.79 4.365 5.805 7.5 10.5 7.5s8.71-3.135 10.5-7.5C20.71 7.635 16.695 4.5 12 4.5zm0 12.5a5 5 0 110-10 5 5 0 010 10z" data-astro-cid-fnz44ojp></path> <circle cx="12" cy="12" r="2.5" data-astro-cid-fnz44ojp></circle> </svg> <svg id="eye-slash" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="display:none;" data-astro-cid-fnz44ojp> <path d="M2.39 1.73L1.11 3l3.01 3.01A11.42 11.42 0 002 12c1.79 4.365 5.805 7.5 10.5 7.5a11.5 11.5 0 005.26-1.25l3.73 3.73 1.27-1.27L2.39 1.73zm7.82 9.09l2.98 2.98a2.5 2.5 0 01-2.98-2.98zM12 6.5c2.03 0 3.7 1.5 4.09 3.46l2.31 2.31c-.61 1.64-1.76 3.03-3.26 3.89l-1.6-1.6a4.99 4.99 0 01-6.65-6.65l1.6 1.6C8.47 8.11 10.04 6.5 12 6.5z" data-astro-cid-fnz44ojp></path> </svg> </span> </div> <a href="#" class="forgot" data-astro-cid-fnz44ojp>Forgot password?</a> <button type="submit" data-astro-cid-fnz44ojp>Sign In</button> <p class="terms" data-astro-cid-fnz44ojp>
By inputting your username and password above and pressing 'Sign
              In', you agree to USRad's <a href="#" data-astro-cid-fnz44ojp>Terms of Use</a>.
</p> <a href="#" class="signup" data-astro-cid-fnz44ojp>Need an Account? Sign Up</a> </form> </div> </div> </div> ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/pages/login/referrallogin.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/login/referrallogin.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/login/referrallogin.astro";
const $$url = "/login/referrallogin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Referrallogin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
