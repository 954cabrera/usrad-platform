/* empty css                                 */
import { c as createComponent, g as renderScript, a as renderHead, d as renderTemplate } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                           */
export { renderers } from '../renderers.mjs';

const $$BackgroundTest = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-vfh2ghsq> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Background Debug Test</title><meta name="color-scheme" content="light only"><meta name="theme-color" content="#fcf9f0">${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/pages/background-test.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> <body data-astro-cid-vfh2ghsq> <div class="toggle-bar" data-astro-cid-vfh2ghsq> <button id="toggle" data-astro-cid-vfh2ghsq>Toggle Test Mode</button> </div> <div class="test-box working" data-astro-cid-vfh2ghsq> <p data-astro-cid-vfh2ghsq>
This is the <strong data-astro-cid-vfh2ghsq>working</strong> test.<br data-astro-cid-vfh2ghsq>
Toggle to compare how broken it looks when dark overrides aren't fixed.
</p> </div> </body></html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/background-test.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/background-test.astro";
const $$url = "/background-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BackgroundTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
