/* empty css                                    */
import { c as createComponent, a as renderHead, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Center = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-rfew6xq4> <head><meta charset="UTF-8"><title>Imaging Center Dashboard</title>${renderHead()}</head> <body data-astro-cid-rfew6xq4> <h1 data-astro-cid-rfew6xq4>Welcome to the Imaging Center Dashboard</h1> </body></html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/center.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/center.astro";
const $$url = "/dashboard/center";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Center,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
