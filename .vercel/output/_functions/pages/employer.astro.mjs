/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, g as renderScript, d as renderTemplate, r as renderComponent } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$HeroEmployer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full min-h-[700px] overflow-hidden bg-[#fcf9f0] text-[#003087]"> <!-- Background Video --> <video id="partnerHeroVideo" autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0" poster="/images/partner-hero-fallback-enhanced.webp"> <source src="/videos/partner-hero-softblur-mobile.mp4" type="video/mp4" media="(max-width: 768px)"> <source src="/videos/partner-hero-softblur.mp4" type="video/mp4"> <source src="/videos/partner-hero-softblur.webm" type="video/webm"> <img src="/images/partner-hero-fallback-enhanced-mobile.webp" alt="Trade show networking" class="w-full h-full object-cover"> </video> <!-- Optional Overlay Gradient --> <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.6)_45%,transparent_90%)] z-0"></div> <!-- Hero Content --> <div class="relative z-10 max-w-6xl mx-auto text-center py-24 px-6 sm:px-12"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-manrope text-[#003087] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mb-6" data-aos="fade-up" data-aos-delay="100">
Connect With USRad <br> <span class="text-[#cc9933]">at the Frontlines of Imaging</span> </h1> <p class="text-xl sm:text-2xl text-[#003087] font-manrope max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
From trade show floors to national partnerships, we’ve built this network
      alongside you. Let’s elevate imaging access—together.
</p> <!-- CTA Buttons --> <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="300"> <a href="/employer/schedule" class="inline-block bg-[#003087] hover:bg-[#002070] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
Schedule a Consultation!
</a> </div> </div> <!-- Mobile Poster Swap Script --> ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/employer/HeroEmployer.astro?astro&type=script&index=0&lang.ts")} </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/employer/HeroEmployer.astro", void 0);

const $$Employer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroEmployer", $$HeroEmployer, {})}  ${maybeRenderHead()}<section class="py-20 bg-white text-[#003087] px-6 sm:px-12 text-center"> <h2 class="text-3xl font-bold mb-12">Who We Support</h2> <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left"> <div class="text-center"> <img src="/icons/partner/employers.png" alt="Self-Funded Employers" class="h-12 mx-auto mb-4"> <h3 class="text-xl font-semibold mb-2">Self-Funded Employers</h3> <p>
Lower diagnostic costs and deliver a better patient experience with no
          billing friction.
</p> </div> <div class="text-center"> <img src="/icons/partner/tpa.png" alt="Third-Party Administrators" class="h-12 mx-auto mb-4"> <h3 class="text-xl font-semibold mb-2">Third-Party Administrators</h3> <p>
Access a credentialed national imaging network with flat-rate, all-in
          pricing.
</p> </div> <div class="text-center"> <img src="/icons/partner/digital-health.png" alt="Digital Health" class="h-12 mx-auto mb-4"> <h3 class="text-xl font-semibold mb-2">
Care Navigation & Digital Health
</h3> <p>
Embed MRI/CT scheduling seamlessly into your member experience or app
          platform.
</p> </div> </div> </section>  <section class="py-20 bg-[#fcf9f0] text-[#003087] px-6 sm:px-12"> <h2 class="text-3xl font-bold text-center mb-12">
How USRad Helps Employers
</h2> <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"> <div class="text-center"> <img src="/icons/partner/costs.png" alt="Control Costs" class="h-12 mx-auto mb-4"> <h3 class="text-lg font-semibold mb-2">Control Imaging Costs</h3> <p>
Replace high hospital charges with predictable, flat-rate pricing.
</p> </div> <div class="text-center"> <img src="/icons/partner/access.png" alt="Improve Access" class="h-12 mx-auto mb-4"> <h3 class="text-lg font-semibold mb-2">Improve Member Access</h3> <p>
Use our digital scheduling and fast report turnaround to improve
          satisfaction.
</p> </div> <div class="text-center"> <img src="/icons/partner/streamline.png" alt="Streamline Operations" class="h-12 mx-auto mb-4"> <h3 class="text-lg font-semibold mb-2">Streamline Operations</h3> <p>
No billing disputes. No denials. Just efficient referrals with clarity
          and speed.
</p> </div> <div class="text-center"> <img src="/icons/partner/roi.png" alt="ROI" class="h-12 mx-auto mb-4"> <h3 class="text-lg font-semibold mb-2">Show ROI Quickly</h3> <p>
Measurable savings on every scan without new overhead or contracts to
          manage.
</p> </div> </div> </section> <section class="py-20 bg-[#f5f9ff] text-[#003087] px-6 sm:px-12"> <div class="max-w-6xl mx-auto"> <h2 class="text-3xl font-bold text-center mb-6">
Built on Trust, Backed by Quality
</h2> <p class="text-center text-lg max-w-3xl mx-auto mb-12">
Our network is designed from the ground up with quality standards and
        transparency that partners and patients can trust.
</p> <div class="grid md:grid-cols-3 gap-8"> <!-- Quality Pillar 1 --> <div class="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#cc9933]"> <div class="rounded-full bg-[#fcf9f0] p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#cc9933]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-3 text-center">
Rigorous Quality Standards
</h3> <ul class="space-y-2 text-gray-700"> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>100% board-certified radiologists</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>ACR accredited facilities only</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Specialty interpretations for complex cases</span> </li> </ul> </div> <!-- Quality Pillar 2 --> <div class="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#cc9933]"> <div class="rounded-full bg-[#fcf9f0] p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#cc9933]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-3 text-center">
Experienced Leadership
</h3> <ul class="space-y-2 text-gray-700"> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Founded by imaging network veterans</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Previously built 1,200+ center network</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>25+ years in managed imaging</span> </li> </ul> </div> <!-- Quality Pillar 3 --> <div class="bg-white rounded-xl shadow-sm p-6 border-t-4 border-[#cc9933]"> <div class="rounded-full bg-[#fcf9f0] p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#cc9933]" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <h3 class="text-xl font-semibold mb-3 text-center">
Transparent Operations
</h3> <ul class="space-y-2 text-gray-700"> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Upfront pricing with no surprises</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Clear reporting on utilization</span> </li> <li class="flex items-start"> <svg class="h-5 w-5 text-[#cc9933] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span>Open API access for integration</span> </li> </ul> </div> </div> <!-- Future Vision --> <div class="mt-16 bg-[#003087] text-white rounded-xl p-8 text-center"> <h3 class="text-2xl font-semibold mb-4">
Our Vision: A New Standard in Accessible Imaging
</h3> <p class="max-w-3xl mx-auto">
We're building a nationwide network where quality diagnostic imaging
          is accessible to everyone without the hospital markups or insurance
          complexity. Join us as we bring this vision to reality.
</p> </div> </div> </section>  <section class="py-20 bg-[#003087] text-white px-6 sm:px-12 text-center"> <h2 class="text-3xl font-bold mb-4">Let's Talk</h2> <p class="text-lg mb-8">
Schedule a quick consultation and discover how USRad can work with your
      population or platform.
</p> <a href="/employers/schedule" class="bg-[#e6c378] hover:bg-[#cc9933] text-white px-6 py-3 rounded-xl font-semibold">
Schedule a Consultation
</a> <p class="mt-6 text-sm opacity-80">
Are you an imaging center? <a href="/managed-care" class="underline text-white hover:text-[#e6c378]">See our Managed Care Platform →</a> </p> </section> ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/employer.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/employer.astro";
const $$url = "/employer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Employer,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
