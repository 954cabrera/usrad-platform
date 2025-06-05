/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { $ as $$Breadcrumb } from '../chunks/Breadcrumb_1mBWWSBp.mjs';
export { renderers } from '../renderers.mjs';

const $$Careers = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbPaths = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Careers",
      href: "/careers",
      current: true
    }
  ];
  const jobOpenings = [
    {
      title: "Radiologist",
      location: "Remote",
      type: "Full-time",
      status: "Coming Soon"
    },
    {
      title: "Customer Success Manager",
      location: "Fort Lauderdale, FL",
      type: "Full-time",
      status: "Coming Soon"
    },
    {
      title: "Medical Director",
      location: "Remote",
      type: "Part-time",
      status: "Coming Soon"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Careers | USRad" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "paths": breadcrumbPaths })} ${maybeRenderHead()}<div class="careers-hero bg-gradient-to-r from-[#f8f2e1] to-white py-16 px-6"> <div class="max-w-6xl mx-auto"> <div class="text-center"> <h1 class="text-4xl font-bold text-[#003087] mb-4">Join Our Team</h1> <div class="bg-[#cc9933] text-white font-semibold py-2 px-6 rounded-full inline-block mb-6">
Coming Soon
</div> <p class="text-xl text-gray-700 max-w-3xl mx-auto">
We're building a team of passionate professionals dedicated to
          transforming medical imaging accessibility.
</p> </div> </div> </div> <div class="max-w-6xl mx-auto px-6 py-16"> <div class="grid md:grid-cols-2 gap-12 items-center mb-16"> <div> <h2 class="text-3xl font-semibold text-[#003087] mb-6">
Why Work With Us
</h2> <div class="space-y-4"> <div class="flex items-start"> <div class="bg-[#003087] p-2 rounded-full text-white mr-4 mt-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-[#003087]">
Mission-Driven Organization
</h3> <p class="text-gray-600">
Join a team committed to improving healthcare accessibility.
</p> </div> </div> <div class="flex items-start"> <div class="bg-[#003087] p-2 rounded-full text-white mr-4 mt-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-[#003087]">
Innovative Environment
</h3> <p class="text-gray-600">
Work at the intersection of healthcare and technology.
</p> </div> </div> <div class="flex items-start"> <div class="bg-[#003087] p-2 rounded-full text-white mr-4 mt-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h3 class="text-lg font-semibold text-[#003087]">
Comprehensive Benefits
</h3> <p class="text-gray-600">
Competitive compensation, health benefits, and more.
</p> </div> </div> </div> </div> <div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#cc9933]"> <h3 class="text-2xl font-semibold text-[#003087] mb-6">
Express Interest
</h3> <p class="text-gray-600 mb-6">
While our careers page is under development, you can express interest
          in future opportunities by sending your resume and cover letter.
</p> <a href="mailto:careers@usrad.com" class="bg-[#003087] text-white py-3 px-6 rounded-full font-semibold inline-block transition-all hover:bg-[#002266] hover:shadow-lg w-full text-center">
Email Your Resume
</a> </div> </div> <div class="mt-16"> <h2 class="text-3xl font-semibold text-[#003087] mb-8 text-center">
Upcoming Opportunities
</h2> <div class="space-y-4"> ${jobOpenings.map((job) => renderTemplate`<div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all"> <div class="flex flex-wrap justify-between items-center"> <div> <h3 class="text-xl font-semibold text-[#003087]"> ${job.title} </h3> <div class="flex items-center text-gray-600 mt-1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> ${job.location} <span class="mx-3">•</span> ${job.type} </div> </div> <div class="bg-[#f8f2e1] text-[#cc9933] py-1 px-4 rounded-full text-sm font-medium"> ${job.status} </div> </div> </div>`)} </div> </div> </div> ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/careers.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/careers.astro";
const $$url = "/careers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Careers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
