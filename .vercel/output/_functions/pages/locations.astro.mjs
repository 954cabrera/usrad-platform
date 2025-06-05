/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, b as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { $ as $$ChatbotToggle } from '../chunks/ChatbotToggle_C34OpM7j.mjs';
import { $ as $$AOSInit } from '../chunks/Footer_DMjklgAz.mjs';
export { renderers } from '../renderers.mjs';

const $$Locations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AOSInit", $$AOSInit, {})} ${maybeRenderHead()}<div class="max-w-5xl mx-auto py-12"> <!-- Hero Section --> <section class="text-center mb-12" data-aos="fade-up"> <h1 class="text-4xl font-bold text-[#003087] mb-4">
Find Your Imaging Center. Save Hundreds.
</h1> <p class="text-lg text-gray-600 max-w-3xl mx-auto">
Trusted, board-certified radiologists. Accredited centers nationwide.
        Transparent all-inclusive rates.
</p> </section> <!-- Search Form --> <section class="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100" data-aos="fade-up" data-aos-delay="100"> <form action="/search" method="GET" class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Type of Study --> <div class="space-y-2"> <label for="study" class="block text-sm font-medium text-gray-700">Type of Study</label> <select id="study" name="study" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required> <option value="" disabled selected>Select a study type</option> <option value="MRI">MRI</option> <option value="CT">CT</option> <option value="Ultrasound">Ultrasound</option> <option value="X-Ray">X-Ray</option> </select> </div> <!-- Body Area --> <div class="space-y-2"> <label for="bodyArea" class="block text-sm font-medium text-gray-700">Body Area</label> <input type="text" id="bodyArea" name="bodyArea" placeholder="e.g., Brain, Shoulder, Knee" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"> </div> <!-- Scan Type --> <div class="space-y-2"> <label for="scanType" class="block text-sm font-medium text-gray-700">Scan Type</label> <select id="scanType" name="scanType" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required> <option value="" disabled selected>Select scan details</option> <option value="Without Contrast">Without Contrast</option> <option value="With Contrast">With Contrast</option> <option value="With and Without Contrast">With and Without Contrast</option> </select> </div> <!-- City --> <div class="space-y-2"> <label for="city" class="block text-sm font-medium text-gray-700">City</label> <select id="city" name="city" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"> <option value="" disabled selected>Select a city</option> <option value="Miami">Miami</option> <option value="Fort Lauderdale">Fort Lauderdale</option> <option value="Orlando">Orlando</option> <option value="Tampa">Tampa</option> <option value="Atlanta">Atlanta</option> <option value="Dallas">Dallas</option> <option value="Houston">Houston</option> <option value="Austin">Austin</option> <option value="Chicago">Chicago</option> <option value="New York">New York</option> </select> </div> </div> <!-- Find Centers Button --> <div class="pt-4"> <button type="submit" class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
Find Centers →
</button> </div> </form> </section> <!-- Help Section --> <section class="mt-12 text-center py-6 px-4 rounded-xl bg-gray-50 border border-gray-100" data-aos="fade-up" data-aos-delay="200"> <p class="text-gray-600">
Need help finding the right scan? Call us at <span class="font-semibold text-[#003087]">(800) USRAD-24</span> </p> </section> </div> ${renderComponent($$result2, "ChatbotToggle", $$ChatbotToggle, { "chatbotLabel": "\u{1F4AC} Let's Talk" })} `, "title": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"], renderTemplate`Locations & Rates | USRad`)}` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/locations.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/locations.astro";
const $$url = "/locations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Locations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
