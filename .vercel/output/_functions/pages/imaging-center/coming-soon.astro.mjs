/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PartnerPageLayout } from '../../chunks/PartnerPageLayout_Bhl0cH-P.mjs';
import { $ as $$AOSInit } from '../../chunks/Footer_DMjklgAz.mjs';
/* empty css                                          */
export { renderers } from '../../renderers.mjs';

const $$ComingSoon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PartnerPageLayout", $$PartnerPageLayout, { "title": "Training Materials | Coming Soon | USRad", "currentPage": "Training Materials", "hideTitle": false, "data-astro-cid-vcfb7aip": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "AOSInit", $$AOSInit, { "data-astro-cid-vcfb7aip": true })}${maybeRenderHead()}<section class="py-32 bg-white text-center" data-astro-cid-vcfb7aip><div class="max-w-4xl mx-auto px-6" data-astro-cid-vcfb7aip><div class="mb-10" data-aos="fade-up" data-astro-cid-vcfb7aip><div class="w-24 h-24 bg-[#f8f2e1] rounded-full flex items-center justify-center mx-auto mb-8" data-astro-cid-vcfb7aip><svg class="h-12 w-12 text-[#cc9933]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-vcfb7aip><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-vcfb7aip></path></svg></div><h2 class="text-4xl font-bold text-[#003087] mb-6 font-manrope" data-astro-cid-vcfb7aip>
Coming Soon
</h2><p class="text-xl text-gray-700 mb-8 font-manrope" data-astro-cid-vcfb7aip>
We're currently developing comprehensive training materials for our
          network centers. These resources will be available in the near future.
</p><p class="text-lg text-gray-600 mb-12 font-manrope" data-astro-cid-vcfb7aip>
In the meantime, please contact your support team for any
          training needs.
</p><a href="/imaging-center/support" class="inline-block px-8 py-4 bg-[#003087] text-white font-bold rounded-full hover:bg-[#002266] transition-all duration-300 hover:shadow-xl border border-transparent hover:border-[#cc9933] font-manrope" data-astro-cid-vcfb7aip>
Return to Network Support
</a></div></div></section>` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/coming-soon.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/coming-soon.astro";
const $$url = "/imaging-center/coming-soon";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ComingSoon,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
