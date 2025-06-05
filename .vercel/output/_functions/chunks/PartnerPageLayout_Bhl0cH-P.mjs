import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate, m as maybeRenderHead, b as renderSlot } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_BZV5qL5k.mjs';
import { $ as $$Breadcrumb } from './Breadcrumb_1mBWWSBp.mjs';
/* empty css                            */

const $$Astro = createAstro();
const $$PartnerPageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PartnerPageLayout;
  const { title, currentPage, hideTitle = false } = Astro2.props;
  const breadcrumbPaths = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "For Imaging-Centers",
      href: "/imaging-center"
    },
    {
      label: currentPage,
      href: "#",
      current: true
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="breadcrumb-container"> ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "paths": breadcrumbPaths })} </div> <div class="py-8"> ${!hideTitle && renderTemplate`<div class="max-w-6xl mx-auto px-6"> <h1 class="text-3xl font-bold text-[#003087] mb-6">${currentPage}</h1> </div>`} ${renderSlot($$result2, $$slots["default"])} <!-- Cross-navigation links at the bottom --> <div class="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200"> <h3 class="text-xl font-semibold text-[#003087] mb-4">
Explore More Network Resources
</h3> <ul class="flex flex-wrap gap-y-3 gap-x-8"> <li> <a href="/imaging-center/calculator" class="text-gray-600 hover:text-[#003087] relative group">
Revenue Calculator
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/experience" class="text-gray-600 hover:text-[#003087] relative group">
Our Experience
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/model" class="text-gray-600 hover:text-[#003087] relative group">
Network Model
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/implementation" class="text-gray-600 hover:text-[#003087] relative group">
Implementation Process
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/benefits" class="text-gray-600 hover:text-[#003087] relative group">
Benefits
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/faq" class="text-gray-600 hover:text-[#003087] relative group">
FAQs
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> <li> <a href="/imaging-center/apply" class="text-gray-600 hover:text-[#003087] relative group">
Apply Now
<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a> </li> </ul> </div> </div>  ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/layouts/PartnerPageLayout.astro", void 0);

export { $$PartnerPageLayout as $ };
