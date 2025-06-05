/* empty css                                    */
import { c as createComponent, a as renderHead, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Patient = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-dnfofipv> <head><meta charset="UTF-8"><title>Patient Dashboard</title>${renderHead()}</head> <body data-astro-cid-dnfofipv> <h1 data-astro-cid-dnfofipv>Welcome to the Patient Dashboard</h1> </body></html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/patient.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/patient.astro";
const $$url = "/dashboard/patient";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Patient,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
