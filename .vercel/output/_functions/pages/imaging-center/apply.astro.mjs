/* empty css                                    */
import { c as createComponent, m as maybeRenderHead, g as renderScript, d as renderTemplate, r as renderComponent } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_BZV5qL5k.mjs';
import 'clsx';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$NetworkApplicationForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-gray-50 py-20 px-6" data-astro-cid-g2oiqpcc> <div class="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-xl" data-astro-cid-g2oiqpcc> <h1 class="text-3xl font-bold mb-3 text-center text-blue-900" data-astro-cid-g2oiqpcc>
Join USRad's Nationwide Imaging Network
</h1> <p class="text-lg text-center text-gray-700 mb-6" data-astro-cid-g2oiqpcc>
Tell us more about your imaging center and take the first step toward
      becoming a trusted provider.
</p> <form name="partner-application" method="POST" data-astro-cid-g2oiqpcc> <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-g2oiqpcc> <!-- Legal Business Name --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Legal Business Name *</label> <input type="text" name="legalBusinessName" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <!-- Contact Name --> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>First Name *</label> <input type="text" name="firstName" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Last Name *</label> <input type="text" name="lastName" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <!-- Contact Info --> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Email *</label> <input type="email" name="email" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Phone *</label> <input type="tel" name="phone" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <!-- Location --> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>City *</label> <input type="text" name="city" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <div data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>State *</label> <input type="text" name="state" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <!-- Street Address --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Street Address</label> <input type="text" name="address" class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <!-- Service Area --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Service Area *</label> <textarea name="serviceArea" required rows="3" class="input mt-1 w-full" data-astro-cid-g2oiqpcc></textarea> </div> <!-- Are you currently partnered with USRad? --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>Are you currently contracted with USRad? *</label> <select name="currentPartner" required class="input mt-1 w-full" data-astro-cid-g2oiqpcc> <option value="" data-astro-cid-g2oiqpcc>Select</option> <option value="yes" data-astro-cid-g2oiqpcc>Yes</option> <option value="no" data-astro-cid-g2oiqpcc>No</option> <option value="not_sure" data-astro-cid-g2oiqpcc>Not sure</option> </select> </div> <!-- Equipment & Services Offered --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>What imaging services and equipment do you currently offer? *</label> <div class="flex flex-wrap gap-4 mt-2" data-astro-cid-g2oiqpcc> <label class="inline-flex items-center" data-astro-cid-g2oiqpcc> <input type="checkbox" name="equipment" value="MRI" class="mr-2" data-astro-cid-g2oiqpcc> MRI
</label> <label class="inline-flex items-center" data-astro-cid-g2oiqpcc> <input type="checkbox" name="equipment" value="CT" class="mr-2" data-astro-cid-g2oiqpcc>
CT
</label> <label class="inline-flex items-center" data-astro-cid-g2oiqpcc> <input type="checkbox" name="equipment" value="XR" class="mr-2" data-astro-cid-g2oiqpcc>
X-ray
</label> <label class="inline-flex items-center" data-astro-cid-g2oiqpcc> <input type="checkbox" name="equipment" value="Ultrasound" class="mr-2" data-astro-cid-g2oiqpcc> Ultrasound
</label> <label class="inline-flex items-center" data-astro-cid-g2oiqpcc> <input type="checkbox" name="equipment" value="Other" class="mr-2" data-astro-cid-g2oiqpcc> Other
</label> </div> </div> <!-- Other Equipment Textarea --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>If you selected Other, please describe: *</label> <textarea name="otherEquipment" rows="2" class="input mt-1 w-full" required data-astro-cid-g2oiqpcc></textarea> </div> </div> <!-- MRI Field Strength --> <div class="md:col-span-2 hidden" data-astro-cid-g2oiqpcc> <label class="block text-sm font-medium text-gray-700" data-astro-cid-g2oiqpcc>If you offer MRI, what is the field strength?</label> <input type="text" name="mriFieldStrength" placeholder="e.g., 1.5T, 3T" class="input mt-1 w-full" data-astro-cid-g2oiqpcc> </div> <hr class="md:col-span-2 my-8 border-gray-300" data-astro-cid-g2oiqpcc> <!-- Consent --> <div class="md:col-span-2 mt-2" data-astro-cid-g2oiqpcc> <label class="inline-flex items-center w-full" data-astro-cid-g2oiqpcc> <input type="checkbox" name="consent" required class="mr-2 mt-1" data-astro-cid-g2oiqpcc> <span class="text-sm text-gray-700" data-astro-cid-g2oiqpcc>I agree to be contacted regarding this application.</span> </label> </div> <!-- Submit Button --> <div class="md:col-span-2" data-astro-cid-g2oiqpcc> <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition" data-astro-cid-g2oiqpcc>
Submit Application
</button> </div> </form> ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/NetworkApplicationForm.astro?astro&type=script&index=0&lang.ts")} </div> </section> `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/NetworkApplicationForm.astro", void 0);

const $$Apply = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NetworkApplicationForm", $$NetworkApplicationForm, {})} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/apply.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/apply.astro";
const $$url = "/imaging-center/apply";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Apply,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
