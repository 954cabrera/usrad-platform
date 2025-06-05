/* empty css                                    */
import { c as createComponent, e as createAstro, m as maybeRenderHead, d as renderTemplate, a as renderHead, r as renderComponent } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ConsultationForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ConsultationForm;
  const { simplified = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="consultation-container" data-astro-cid-6jk3w3wk> <div class="form-content" data-astro-cid-6jk3w3wk> <div class="form-header" data-astro-cid-6jk3w3wk> <h2 class="form-title" data-astro-cid-6jk3w3wk> ${simplified ? "Request Information" : "Schedule Your Consultation"} </h2> <p class="form-subtitle" data-astro-cid-6jk3w3wk> ${simplified ? "Get information about our services with no obligation" : "We'll connect you with an imaging specialist to discuss your needs"} </p> </div> <!-- Form action points to the thank you page --> <form class="consultation-form" action="/form-submitted" method="get" data-astro-cid-6jk3w3wk> <!-- Name Field --> <div class="form-field" data-astro-cid-6jk3w3wk> <label for="name" data-astro-cid-6jk3w3wk>Your Name<span class="required" data-astro-cid-6jk3w3wk>*</span></label> <input type="text" id="name" name="name" placeholder="Your Full Name" required data-astro-cid-6jk3w3wk> </div> <!-- Email Field --> <div class="form-field" data-astro-cid-6jk3w3wk> <label for="email" data-astro-cid-6jk3w3wk>Work Email<span class="required" data-astro-cid-6jk3w3wk>*</span></label> <input type="email" id="email" name="email" placeholder="Your Work Email" required data-astro-cid-6jk3w3wk> </div> <!-- Facility Field --> <div class="form-field" data-astro-cid-6jk3w3wk> <label for="facility" data-astro-cid-6jk3w3wk>Facility Name<span class="required" data-astro-cid-6jk3w3wk>*</span></label> <input type="text" id="facility" name="facility" placeholder="Facility Name" required data-astro-cid-6jk3w3wk> </div> ${!simplified && renderTemplate`<div class="form-field" data-astro-cid-6jk3w3wk> <label for="locations" data-astro-cid-6jk3w3wk>
Number of Locations<span class="required" data-astro-cid-6jk3w3wk>*</span> </label> <select id="locations" name="locations" required data-astro-cid-6jk3w3wk> <option value="" disabled selected data-astro-cid-6jk3w3wk>
Select number of locations
</option> <option value="1" data-astro-cid-6jk3w3wk>1 Location</option> <option value="2-5" data-astro-cid-6jk3w3wk>2-5 Locations</option> <option value="6-10" data-astro-cid-6jk3w3wk>6-10 Locations</option> <option value="11-25" data-astro-cid-6jk3w3wk>11-25 Locations</option> <option value="26+" data-astro-cid-6jk3w3wk>26+ Locations</option> </select> </div>`} ${!simplified && renderTemplate`<div class="form-field" data-astro-cid-6jk3w3wk> <label for="message" data-astro-cid-6jk3w3wk>Additional Information</label> <textarea id="message" name="message" rows="4" placeholder="Tell us about your imaging center and any specific questions" data-astro-cid-6jk3w3wk></textarea> </div>`} <button type="submit" class="submit-button" data-astro-cid-6jk3w3wk> ${simplified ? "Request Information" : "Schedule Consultation"} </button> <p class="disclaimer" data-astro-cid-6jk3w3wk>
By submitting, you'll receive information about the USRad partner
        network. No obligation.
</p> </form> </div> </div> `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/ConsultationForm.astro", void 0);

const $$Schedule = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-ijniy5ul> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Schedule Consultation | USRad</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-ijniy5ul> <header class="header" data-astro-cid-ijniy5ul> <div class="header-container" data-astro-cid-ijniy5ul> <a href="/" class="logo-link" data-astro-cid-ijniy5ul> <img src="/logo/USRad-Logo-final.png" alt="USRad Logo" class="logo" data-astro-cid-ijniy5ul> </a> </div> </header> <main data-astro-cid-ijniy5ul> <div class="page-container" data-astro-cid-ijniy5ul> <div class="page-header" data-astro-cid-ijniy5ul> <h1 data-astro-cid-ijniy5ul>Join USRad's Network</h1> <p data-astro-cid-ijniy5ul>
Join our network of leading imaging centers and expand your reach
</p> </div> <div class="consultation-section" data-astro-cid-ijniy5ul> ${renderComponent($$result, "ConsultationForm", $$ConsultationForm, { "data-astro-cid-ijniy5ul": true })} </div> </div> </main> <footer class="footer" data-astro-cid-ijniy5ul> <div class="footer-container" data-astro-cid-ijniy5ul> <p data-astro-cid-ijniy5ul>&copy; 2024 USRad. All rights reserved.</p> </div> </footer> </body></html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/schedule.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/schedule.astro";
const $$url = "/imaging-center/schedule";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Schedule,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
