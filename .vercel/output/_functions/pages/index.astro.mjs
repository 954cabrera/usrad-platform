/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, d as renderTemplate, f as addAttribute, e as createAstro, r as renderComponent } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainPatientLayout } from '../chunks/MainPatientLayout_tWPdLOgG.mjs';
import { $ as $$ChatbotToggle } from '../chunks/ChatbotToggle_C34OpM7j.mjs';
import { $ as $$FadeIn } from '../chunks/FadeIn_B7TD7XXD.mjs';
import { $ as $$AOSInit } from '../chunks/Footer_DMjklgAz.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$FAQPreview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Premium FAQ Preview Section -->${maybeRenderHead()}<section class="py-24 px-6 sm:px-12 bg-white relative overflow-hidden"> <!-- Decorative elements for premium feel --> <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.03] blur-3xl"></div> <div class="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#003087] opacity-[0.03] blur-3xl"></div> <div class="max-w-6xl mx-auto relative z-10"> <div class="text-center mb-16"> <h2 class="text-4xl font-semibold text-[#003087] font-manrope" data-aos="fade-up">
Frequently Asked Questions
</h2> <p class="mt-4 text-xl text-[#003087] max-w-3xl mx-auto font-manrope" data-aos="fade-up" data-aos-delay="100">
Answers to common questions about our premium diagnostic imaging
        services.
</p> </div> <div class="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200"> <!-- FAQ Item 1 --> <div class="bg-[#f8f2e1] p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#cc9933]"> <div class="flex items-start"> <div class="flex-shrink-0"> <svg class="h-8 w-8 text-[#003087]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div class="ml-4"> <h3 class="text-xl font-semibold text-[#003087] font-manrope">
What makes USRad different from other imaging centers?
</h3> <p class="mt-2 text-[#003087] font-manrope">
USRad offers a trusted network of high-quality, affordable imaging
              centers featuring advanced technology, board-certified
              radiologists, extended appointment times for personalized care, and priority scheduling typically
              within days, not weeks.
</p> </div> </div> </div> <!-- FAQ Item 2 --> <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#cc9933]"> <div class="flex items-start"> <div class="flex-shrink-0"> <svg class="h-8 w-8 text-[#003087]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div class="ml-4"> <h3 class="text-xl font-semibold text-[#003087] font-manrope">
What payment options are available?
</h3> <p class="mt-2 text-[#003087] font-manrope">
We offer transparent, all-inclusive pricing with no hidden fees or
              surprise bills. Our direct payment options include all major
              credit cards, HSA/FSA accounts, and flexible payment plans. Our
              rates are typically 30-70% lower than hospital pricing.
</p> </div> </div> </div> <!-- FAQ Item 3 --> <div class="bg-[#f8f2e1] p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#cc9933]"> <div class="flex items-start"> <div class="flex-shrink-0"> <svg class="h-8 w-8 text-[#003087]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div class="ml-4"> <h3 class="text-xl font-semibold text-[#003087] font-manrope">
How quickly can I get an appointment?
</h3> <p class="mt-2 text-[#003087] font-manrope">
Our priority scheduling network allows most patients to get
              appointments within 2-4 days, rather than the 2-4 weeks typical at
              many hospitals. Urgent or stat appointments can often be
              accommodated within 24-48 hours.
</p> </div> </div> </div> </div> <!-- Elegant Link to Full FAQ Page with Premium Design --> <div class="relative mt-12 text-center" data-aos="fade-up" data-aos-delay="300"> <div class="inline-block relative"> <a href="/faq" class="inline-block px-10 py-5 bg-[#003087] text-white rounded-full font-medium hover:bg-[#002266] transition-all duration-300 border border-transparent hover:border-[#cc9933] hover:shadow-xl font-manrope group"> <span class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path> </svg>
View Complete FAQ Resource
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> </span> </a> <!-- Decorative elements for premium feel --> <div class="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#cc9933] opacity-40"></div> <div class="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#cc9933] opacity-40"></div> </div> <!-- Premium note --> <p class="mt-6 text-[#003087] italic font-manrope">
Our comprehensive resource addresses all aspects of premium medical
        imaging services.
</p> </div> </div> </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/FAQPreview.astro", void 0);

const $$CoreBenefits = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="core-benefits-section" data-aos="fade-up" data-aos-delay="100" data-astro-cid-c2ohmo54> <div class="section-header" data-astro-cid-c2ohmo54> <div class="flex items-center justify-center gap-3 mb-2" data-astro-cid-c2ohmo54> <span class="h-px w-12 bg-[#cc9933]" data-astro-cid-c2ohmo54></span> <span class="text-[#cc9933] uppercase tracking-wider text-sm font-bold" data-astro-cid-c2ohmo54>
Premium Experience
</span> <span class="h-px w-12 bg-[#cc9933]" data-astro-cid-c2ohmo54></span> </div> <h2 class="text-4xl font-semibold text-[#003087] inline-flex items-center justify-center mb-4" data-astro-cid-c2ohmo54> <span class="w-2 h-10 bg-[#cc9933] rounded-full mr-3" data-astro-cid-c2ohmo54></span>
The USRad Advantage
</h2> <p class="mt-4 text-xl text-[#003087] max-w-3xl mx-auto text-center mb-10" data-astro-cid-c2ohmo54>
We've reimagined medical imaging to deliver an experience that puts you
      first – at prices 30-70% below hospitals.
</p> </div> <!-- Balanced Responsive Grid Layout --> <div class="benefits-grid gap-y-10 items-stretch" data-astro-cid-c2ohmo54> <!-- Cards below use tighter padding and spacing --> <div class="benefit-card p-5 md:p-4 rounded-2xl shadow-sm flex flex-col$1hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]" data-astro-cid-c2ohmo54> <div class="benefit-icon mb-2" data-astro-cid-c2ohmo54> <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-c2ohmo54> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-c2ohmo54></path> </svg> </div> <h3 class="benefit-title text-base font-semibold mb-1" data-astro-cid-c2ohmo54>
True Price Transparency
</h3> <p class="benefit-description text-sm mb-3" data-astro-cid-c2ohmo54>
See the exact price before you book – no hidden fees or surprise bills.
        Our all-inclusive pricing covers both facility and radiologist fees,
        with savings of 30–70% compared to hospital rates.
</p> <ul class="text-sm space-y-1 mt-auto" data-astro-cid-c2ohmo54> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ All-inclusive pricing</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ No separate radiologist bills</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ No insurance required</li> </ul> </div> <div class="benefit-card $1transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#fdf6e9]" data-astro-cid-c2ohmo54> <div class="benefit-tag text-xs bg-[#003087] text-white px-2 py-0.5 rounded mb-2 inline-block" data-astro-cid-c2ohmo54>
2–4 Day Wait vs. Weeks
</div> <div class="benefit-icon mb-2" data-astro-cid-c2ohmo54> <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-c2ohmo54> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-c2ohmo54></path> </svg> </div> <h3 class="benefit-title text-base font-semibold mb-1" data-astro-cid-c2ohmo54>
Priority Scheduling
</h3> <p class="benefit-description text-sm mb-3" data-astro-cid-c2ohmo54>
Get your scan within 2–4 days instead of the typical 2–3 week wait. Our
        priority scheduling system gives you access to preferred appointment
        slots at state-of-the-art imaging centers.
</p> <ul class="text-sm space-y-1" data-astro-cid-c2ohmo54> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ 2–4 day typical wait time</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Reserved priority slots</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Online scheduling</li> </ul> </div> <div class="benefit-card p-5 md:p-4 rounded-2xl shadow-sm flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1" data-astro-cid-c2ohmo54> <div class="benefit-tag text-xs bg-[#003087] text-white px-2 py-0.5 rounded mb-2 inline-block" data-astro-cid-c2ohmo54>
100% Board-Certified
</div> <div class="benefit-icon mb-2" data-astro-cid-c2ohmo54> <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-c2ohmo54> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-c2ohmo54></path> </svg> </div> <h3 class="benefit-title text-base font-semibold mb-1" data-astro-cid-c2ohmo54>
Radiologist-Guided Expertise
</h3> <p class="benefit-description text-sm mb-3" data-astro-cid-c2ohmo54>
Your scan is reviewed by a board-certified radiologist — and if your
        case requires it, it’s seamlessly escalated to a subspecialist with
        advanced training, ensuring accuracy without delays.
</p> <ul class="text-sm space-y-1" data-astro-cid-c2ohmo54> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Subspecialty expertise</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Fellowship-trained physicians</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Scan-specific specialists</li> </ul> </div> <div class="benefit-card p-5 md:p-4 rounded-2xl shadow-sm flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1" data-astro-cid-c2ohmo54> <div class="relative mb-2" data-astro-cid-c2ohmo54> <div class="absolute top-0 inset-x-0 text-[10px] bg-[#cc9933] text-white px-2 py-0.5 rounded-bl-md uppercase font-semibold tracking-wide shimmer text-center" data-astro-cid-c2ohmo54>
Coming Soon
</div> </div>  <div class="benefit-icon mb-2" data-astro-cid-c2ohmo54> <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-c2ohmo54> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-c2ohmo54></path> </svg> </div> <h3 class="benefit-title text-base font-semibold mb-1" data-astro-cid-c2ohmo54>
Streamlined Prescription Process
</h3> <p class="benefit-description text-sm mb-3" data-astro-cid-c2ohmo54>
We're developing partnerships with telehealth providers to simplify the
        path from prescription to imaging.
</p> <ul class="text-sm space-y-1" data-astro-cid-c2ohmo54> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Virtual prescription options</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Cost-effective consultation</li> <li class="flex items-center gap-1" data-astro-cid-c2ohmo54>✓ Simplified coordination</li> </ul> </div> </div> </div> <!-- Comparison Table (Optional) --> <div class="comparison-banner mt-20" data-aos="fade-up" data-astro-cid-c2ohmo54> <!-- Comparison table content here if desired --> </div> `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/CoreBenefits.astro", void 0);

const $$TrustBadgesBar = createComponent(($$result, $$props, $$slots) => {
  const badges = [
    {
      icon: "/images/badges/stethoscope.png",
      // Your existing stethoscope.svg
      label: "Radiologist-Matched Care"
    },
    {
      icon: "/images/badges/mri.png",
      // Create this file
      label: "High-Field MRI Only"
    },
    {
      icon: "/images/badges/no-surprise-bill.png",
      // Create this file
      label: "No Surprise Billing"
    },
    {
      icon: "/images/badges/pricing.png",
      // Create this file
      label: "Transparent Flat-Rate Pricing"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#fefbf5] py-16 border-y border-[#e6c378]"> <div class="max-w-7xl mx-auto px-6 md:px-12"> <div class="text-center mb-14"> <h2 class="text-2xl md:text-3xl font-bold text-[#003087] tracking-tight">
You Deserve Care You Can Trust
</h2> <p class="text-lg text-[#444] mt-3 max-w-2xl mx-auto leading-relaxed">
We eliminate uncertainty with medical imaging you can feel good about —
        certified radiologists, cutting-edge technology, and upfront pricing.
</p> </div> <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 text-center"> ${badges.map((badge) => renderTemplate`<div class="flex flex-col items-center group transition-transform duration-300 ease-in-out hover:scale-105"> <div class="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md border-2 border-[#e6c378] group-hover:ring-2 ring-[#cc9933] mb-5"> <img${addAttribute(badge.icon, "src")}${addAttribute(badge.label, "alt")} class="h-12 w-12 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"> </div> <p class="text-sm md:text-base text-[#003087] font-medium leading-snug max-w-[10rem]"> ${badge.label} </p> </div>`)} </div> </div> </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/TrustBadgesBar.astro", void 0);

const $$Astro$1 = createAstro();
const $$PrimaryButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PrimaryButton;
  const { href, text, color = "gold" } = Astro2.props;
  const baseColor = color === "gold" ? "#cc9933" : "#003087";
  const hoverColor = color === "gold" ? "#e6c378" : "#002266";
  const textColor = color === "gold" ? "#003087" : "white";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="px-8 py-4 font-bold rounded-full transition-all duration-300 hover:shadow-xl font-manrope"${addAttribute(`background-color: ${baseColor}; color: ${textColor};`, "style")}${addAttribute(() => event.target.style.backgroundColor = hoverColor, "on:mouseenter")}${addAttribute(() => event.target.style.backgroundColor = baseColor, "on:mouseleave")}> ${text} </a>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/PrimaryButton.astro", void 0);

const $$Astro = createAstro();
const $$SecondaryButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SecondaryButton;
  const { href, text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-[#003087] transition-all duration-300 hover:shadow-xl font-manrope"> ${text} </a>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/SecondaryButton.astro", void 0);

const $$CallToAction = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-gradient-to-br from-[#003087] to-[#002266] text-white py-20 px-6 sm:px-12 relative overflow-hidden" data-aos="fade-up"> <div class="absolute inset-0 bg-repeat opacity-[0.03]" style="background-image: url('/images/subtle-pattern.svg');"></div> <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.05] blur-3xl"></div> <div class="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-white opacity-[0.03] blur-3xl"></div> <div class="max-w-6xl mx-auto text-center relative z-10"> <h2 class="text-4xl font-semibold mb-6 font-manrope">
Ready to Experience Imaging Done Right?
</h2> <p class="text-xl max-w-3xl mx-auto mb-12 font-manrope">
Skip the referral, see transparent pricing, and book with confidence at a
      trusted imaging center near you.
</p> <div class="flex flex-col sm:flex-row justify-center gap-6"> ${renderComponent($$result, "PrimaryButton", $$PrimaryButton, { "href": "/locations", "color": "gold", "text": "Find an Imaging Center" })} ${renderComponent($$result, "SecondaryButton", $$SecondaryButton, { "href": "/how-it-works", "text": "Learn How It Works" })} </div> </div> </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/CallToAction.astro", void 0);

const $$ClinicalIntroWithImage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="space-y-6" data-aos="fade-right"> <div class="flex items-center gap-3"> <span class="h-px w-12 bg-[#cc9933]"></span> <span class="text-[#cc9933] uppercase tracking-wider text-sm font-bold">
Clinical Excellence
</span> <span class="h-px w-12 bg-[#cc9933]"></span> </div> <div class="credential-icon" data-aos="zoom-in" data-aos-delay="200"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <h2 class="text-3xl md:text-4xl font-semibold text-[#003087]">
The Experts Behind Every Scan
</h2> <p class="text-lg md:text-xl text-[#003087] leading-relaxed">
Your scan isn't just run through a machine — it's carefully interpreted by
    board-certified radiologists who specialize in diagnostic imaging. We ensure
    clinical excellence at every step.
</p> <img src="/images/website/42448168.webp" alt="Patient undergoing MRI scan" class="w-full h-auto rounded-2xl shadow-xl mt-8" data-aos="fade-up" data-aos-delay="300"> </div>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/ClinicalIntroWithImage.astro", void 0);

const $$ClinicalCredentialsGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Make sure lucide-react or equivalent icons are available --><!-- Make sure lucide-react or equivalent icons are available --><!-- Make sure lucide-react or equivalent icons are available -->${maybeRenderHead()}<div class="space-y-12" data-aos="fade-left"> <div class="grid md:grid-cols-3 gap-6"> <div class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="100"> <div class="credential-icon mb-4" data-aos="zoom-in" data-aos-delay="200"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-lg font-semibold text-[#003087] mb-2">
Board-Certified Radiologists
</h3> <p class="text-sm text-[#003087]/90">
Every scan is interpreted by radiologists who have passed rigorous board
        certification exams and maintain ongoing medical education.
</p> </div> <div class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="200"> <div class="credential-icon mb-4" data-aos="zoom-in" data-aos-delay="300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> </svg> </div> <h3 class="text-lg font-semibold text-[#003087] mb-2">
Specialist Support When Needed
</h3> <p class="text-sm text-[#003087]/90">
If your case requires it, your scan is reviewed by a subspecialist to
        ensure the highest accuracy.
</p> </div> <div class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="300"> <div class="credential-icon mb-4" data-aos="zoom-in" data-aos-delay="400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <h3 class="text-lg font-semibold text-[#003087] mb-2">
Accredited Facilities
</h3> <p class="text-sm text-[#003087]/90">
We partner exclusively with imaging centers that meet nationally
        recognized standards for technology and safety.
</p> </div> </div> <!-- Quality Commitment Block --> <div class="mt-16 space-y-10"> <h3 class="text-2xl font-semibold text-[#003087]">
Our Quality Commitment
</h3> <div class="grid md:grid-cols-2 gap-6"> <div class="bg-white rounded-2xl shadow-xl p-6 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="100"> <h4 class="text-lg font-semibold text-[#003087] mb-1">
Fast, Clear Results
</h4> <p class="text-sm text-[#003087]/90">
Most scans are read and returned within 24–48 hours — far faster than
          the typical 3–5 day wait.
</p> </div> <div class="bg-white rounded-2xl shadow-xl p-6 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="200"> <h4 class="text-lg font-semibold text-[#003087] mb-1">
Quality Assurance Process
</h4> <p class="text-sm text-[#003087]/90">
We regularly review imaging centers to ensure they meet USRad’s high
          standards.
</p> </div> <div class="bg-white rounded-2xl shadow-xl p-6 border border-[#e6e9f0]" data-aos="fade-up" data-aos-delay="300"> <h4 class="text-lg font-semibold text-[#003087] mb-1">
Consistent Scan Quality
</h4> <p class="text-sm text-[#003087]/90">
Every center in our network follows consistent guidelines to deliver
          clear, reliable results — no matter where you go.
</p> </div> </div> </div> <!-- Quote Block --> <div class="expert-quote mt-12 p-8 bg-[#f0f4f9] rounded-xl border border-[#e6e9f0]"> <div class="text-center text-xl md:text-2xl italic text-[#003087] mb-4">
"When it's your health on the line, guesswork isn't good enough. You
      deserve precision. You deserve peace of mind."
</div> <div class="text-sm text-center font-medium text-[#003087]/70">
— USRad Clinical Oversight Team
</div> </div> </div>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/ClinicalCredentialsGrid.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainPatientLayout", $$MainPatientLayout, { "showPatientHeader": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AOSInit", $$AOSInit, {})}  ${renderComponent($$result2, "FadeIn", $$FadeIn, { "effect": "fade", "delay": 0 }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<section class="relative h-[80vh] overflow-hidden hero-section-mobile"> <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0" poster="/images/home-hero-mri.webp?v=2.1"> <source src="/videos/home-hero-mri-mobile.mp4" type="video/mp4" media="(max-width: 768px)"> <source src="/videos/home-hero-mri.mp4" type="video/mp4"> <source src="/videos/home-hero-mri.webm" type="video/webm"> <img src="/images/website/home-hero-mri.webp?v=2.1" alt="MRI Hero" class="w-full h-full object-cover"> </video> <!-- Enhanced Gradient Overlay --> <div class="absolute inset-0 bg-[#003087]/70 flex flex-col justify-center items-center text-white text-center px-4"> <!-- Animated Heading --> <h1 class="text-3xl sm:text-5xl lg:text-6xl font-semibold mb-4 drop-shadow-lg animate-fade-in-up"> <span class="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
Modern MRI.
</span> <br> <span class="text-[#cc9933] font-bold"> Transparent Pricing. </span> </h1> <!-- Enhanced Subtitle --> <p class="max-w-xl text-lg sm:text-xl mb-6 drop-shadow animate-fade-in-up animation-delay-300">
Direct access to <span class="text-[#cc9933] font-semibold">top-tier imaging centers</span> —
<span class="text-yellow-300 font-bold"> 30–70% below</span> hospital rates.
</p> <!-- Enhanced CTA Button --> <div class="animate-fade-in-up animation-delay-600"> <a href="/locations" class="group bg-gradient-to-r from-[#cc9933] to-yellow-400 text-[#003087] font-semibold px-8 py-5 sm:py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
Book an MRI
<svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div> <!-- Trust Indicators --> <div class="mt-6 animate-fade-in-up animation-delay-900"> <div class="flex flex-wrap justify-center items-center gap-4 text-base sm:text-sm opacity-90">
>
<div class="flex items-center gap-1"> <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span>Same-Day Appointments</span> </div> <div class="flex items-center gap-1"> <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span>No Insurance Required</span> </div> <div class="flex items-center gap-1"> <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span>Results in 24-48 Hours</span> </div> </div> </div> </div> </section> ` })} <section class="bg-[#fefbf5] py-20 px-6 text-[#003087]"> <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"> <!-- Image on Left --> <div data-aos="fade-right"> <img src="/images/two-rads-control-center.webp" loading="lazy" alt="Expert medical team reviewing imaging results" class="w-full h-auto rounded-2xl shadow-xl"> </div> <!-- Text on Right --> <div data-aos="fade-left" class="text-left"> <p class="text-sm uppercase tracking-wide font-semibold text-[#cc9933] mb-4">
Behind the Simplicity
</p> <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-[#003087]">
Full-Scale Care Organization
</h2> <div class="space-y-4 text-lg text-[#003087]/90"> <p>
USRad isn't just a booking tool or referral marketplace. We operate
            like a full-scale managed care organization — with dedicated teams
            for provider relations, customer support, quality assurance, and
            medical oversight.
</p> <p>
The difference? We do it all as a carve-out — focused entirely on
            diagnostic imaging, and built for the 90+ million Americans priced
            out of traditional insurance.
</p> </div> </div> </div> </section>  <section class="relative pt-16 pb-20" style="
    background: linear-gradient(135deg, #fcf9f0 0%, #f8f5e8 100%);
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(0, 48, 135, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(204, 153, 51, 0.03) 0%, transparent 50%);
    background-size: 120px 120px, 80px 80px;
  "> <div class="relative z-10"> ${renderComponent($$result2, "CoreBenefits", $$CoreBenefits, {})} </div> </section>  <section class="bg-white py-20 px-6"> <div class="max-w-7xl mx-auto text-center mb-12"> <h2 class="text-3xl font-bold text-[#003087] mb-4" data-aos="fade-up">
Personal Care Every Step
</h2> <p class="text-lg text-[#003087]/80" data-aos="fade-up" data-aos-delay="100">
Our dedicated team guides you through your entire MRI experience
</p> </div> <div class="max-w-4xl mx-auto" data-aos="zoom-in" data-aos-delay="200"> <img src="/images/website/trust-duo.webp" loading="" lazy" alt="Technologist guiding patient through MRI process" class="w-full h-auto rounded-3xl shadow-2xl"> </div> </section>  <section class="bg-[#f0f4f9] py-16 px-6"> <div class="max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="300"> ${renderComponent($$result2, "TrustBadgesBar", $$TrustBadgesBar, {})} </div> </section>  ${renderComponent($$result2, "FadeIn", $$FadeIn, { "effect": "fade", "delay": 100 }, { "default": ($$result3) => renderTemplate` <section class="bg-white dark:bg-[#0f172a] py-24"> <div class="max-w-5xl mx-auto px-6 sm:px-12 text-center"> <div class="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-2 mb-4"> <p class="text-xl sm:text-2xl font-semibold uppercase tracking-wide text-[#cc9933]">
National Footprint
</p> <span class="bg-[#003087] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
Initial Launch
</span> </div> <div class="relative bg-[#fdfaf3] dark:bg-[#1e293b] border border-[#e6c378]/30 rounded-3xl p-8 shadow-2xl"> <!-- Transparent US Map --> <img src="/images/usa-transparent.svg" alt="US Map" loading="lazy" class="w-full mx-auto max-w-3xl rounded-xl"> <!-- Interactive Pin Container --> <div class="absolute inset-0"> <!-- Each pin is wrapped for hover tooltip + scale effect --> <div class="group absolute" style="top: 77%; left: 77.5%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="100" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
Florida
</div> </div> <div class="group absolute" style="top: 74%; left: 46%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="500" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
Texas
</div> </div> <div class="group absolute" style="top: 62%; left: 72%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="300" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
Georgia
</div> </div> <div class="group absolute" style="top: 57%; left: 77%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="500" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
South Carolina
</div> </div> <div class="group absolute" style="top: 49%; left: 79%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="700" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
North Carolina
</div> </div> <div class="group absolute" style="top: 21%; left: 81%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="900" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
New York
</div> </div> <div class="group absolute" style="top: 32%; left: 83%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="1100" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
New Jersey
</div> </div> <div class="group absolute" style="top: 30.5%; left: 78%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="1300" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
Pennsylvania
</div> </div> <div class="group absolute" style="top: 35%; left: 62%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="1500" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
Illinois
</div> </div> <div class="group absolute" style="top: 45%; left: 13%;"> <img src="/images/usrad-pin-dark.png" data-aos="fade-up" data-aos-delay="500" class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex px-2 py-1 bg-[#003087] text-white text-xs rounded shadow">
California
</div> </div> </div> </div> <p class="text-[#003087] dark:text-white text-base mt-6">
Our signal is growing—launching now with top imaging centers to bring
          fast, affordable diagnostics nationwide.
</p> <a href="/managed-care" class="mt-6 inline-block bg-[#003087] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#002266] hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
For Imaging Providers: Expand with USRad →
</a> </div> </section> ` })} <section class="bg-white py-20 px-6"> <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"> ${renderComponent($$result2, "ClinicalIntroWithImage", $$ClinicalIntroWithImage, {})} ${renderComponent($$result2, "ClinicalCredentialsGrid", $$ClinicalCredentialsGrid, {})} </div> </section> ${renderComponent($$result2, "FAQPreview", $$FAQPreview, {})}  ${renderComponent($$result2, "FadeIn", $$FadeIn, { "effect": "fade", "delay": 100 }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CallToAction", $$CallToAction, {})} ` })} ${renderComponent($$result2, "ChatbotToggle", $$ChatbotToggle, { "chatbotLabel": "\u{1F4AC} Let's Talk" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
