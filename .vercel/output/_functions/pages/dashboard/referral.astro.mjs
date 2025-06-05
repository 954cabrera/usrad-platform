/* empty css                                    */
import { c as createComponent, a as renderHead, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Referral = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-a76trk62> <head><meta charset="UTF-8"><title>Referring Physician Dashboard</title>${renderHead()}</head> <body data-astro-cid-a76trk62> <h1 data-astro-cid-a76trk62>Welcome to the Referring Physician Dashboard</h1> </body></html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/referral.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/referral.astro";
const $$url = "/dashboard/referral";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Referral,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
