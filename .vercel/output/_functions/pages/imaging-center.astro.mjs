/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, g as renderScript, d as renderTemplate, e as createAstro, f as addAttribute, r as renderComponent } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PartnerPageLayout } from '../chunks/PartnerPageLayout_Bhl0cH-P.mjs';
import { $ as $$AOSInit } from '../chunks/Footer_DMjklgAz.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$HeroImagingCenter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative w-full min-h-[700px] overflow-hidden bg-[#fcf9f0] text-[#003087]"> <!-- Video Background --> <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0" poster="/images/website/imaging-center-hero-fallback.webp?v=2.1"> <source src="/videos/imaging-center-hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)"> <source src="/videos/imaging-center-hero.mp4" type="video/mp4"> <source src="/videos/imaging-center-hero.webm" type="video/webm"> <img src="/images/website/imaging-center-hero-fallback.webp?v=2.1" alt="Radiologist collaboration" class="w-full h-full object-cover"> </video> <!-- Radial Overlay --> <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.7)_40%,transparent_85%)] z-0"></div> <!-- Decorative Circles --> <div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.03] blur-3xl z-10"></div> <div class="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#003087] opacity-[0.03] blur-3xl z-10"></div> <!-- Hero Content --> <div class="max-w-6xl mx-auto relative z-20"> <div class="text-center mb-12"> <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight font-manrope text-[#003087] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" data-aos="fade-up" data-aos-delay="100">
Join the <span class="text-[#b8860b] relative font-black">
USRad Network
<svg class="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 340 6" xmlns="http://www.w3.org/2000/svg"> <path d="M2 3.5C2 3.5 70 0.5 170 3.5C270 6.5 338 3.5 338 3.5" stroke="#cc9933" stroke-width="4" stroke-linecap="round"></path> </svg> </span> </h1> <p class="mt-6 text-xl sm:text-2xl text-[#003087] max-w-3xl mx-auto leading-relaxed font-manrope" data-aos="fade-up" data-aos-delay="200">
Connect with self-pay patients, boost scan volume, and eliminate billing
        friction — all through one trusted platform.
</p> </div> <!-- Quick Stats --> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="400"> <div class="bg-white p-4 rounded-xl shadow-md text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-[#cc9933]"> <div class="text-[#003087] text-3xl font-bold mb-2 font-manrope stat-number">
1,200+
</div> <p class="text-[#003087] font-manrope">Centers in previous network</p> </div> <div class="bg-white p-4 rounded-xl shadow-md text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-[#cc9933]"> <div class="text-[#003087] text-3xl font-bold mb-2 font-manrope stat-number">
100M+
</div> <p class="text-[#003087] font-manrope">
Uninsured & underinsured patients
</p> </div> <div class="bg-white p-4 rounded-xl shadow-md text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-[#cc9933]"> <!-- Rotating Benefits Container - Clean approach --> <div class="h-14 flex items-center justify-center overflow-hidden"> <div id="rotating-benefits" class="text-center transition-opacity duration-500"> <!-- All benefits in one container, shown/hidden with opacity --> <div class="benefit-item opacity-100"> <div class="text-[#003087] text-3xl font-bold mb-1 font-manrope stat-number">
96%
</div> <p class="text-[#003087] font-manrope text-sm">
Reimbursements within 5 days
</p> </div> </div> </div> ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/imaging/HeroImagingCenter.astro?astro&type=script&index=0&lang.ts")} <!-- Wave Divider --> <div class="absolute bottom-0 left-0 right-0 overflow-hidden z-20"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-auto"> <path fill="#ffffff" fill-opacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path> </svg> </div> </div> </div> </div> </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/imaging/HeroImagingCenter.astro", void 0);

const $$Astro = createAstro();
const $$NetworkMap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NetworkMap;
  const {
    title = "Network Expansion Opportunities",
    subtitle = "We're actively building partnerships in high-demand markets where imaging centers can capitalize on significant unmet patient needs.",
    badge = "Active Expansion",
    showStats = true,
    showMarketOpportunity = true,
    ctaText = "Apply to Join Our Network \u2192",
    ctaLink = "/imaging-center/apply"
  } = Astro2.props;
  const marketStats = [
    { value: "90M+", label: "Underinsured Americans" },
    { value: "35%", label: "Typical Slot Utilization" },
    { value: "$2.8B", label: "Addressable Market" }
  ];
  const opportunityStats = [
    { value: "65%", label: "Average Unfilled Appointment Slots" },
    { value: "100%", label: "Payment Collection Rate" },
    { value: "15 Days", label: "Guaranteed Payment Timeline" }
  ];
  const mapPins = [
    {
      top: "77%",
      left: "77.5%",
      state: "Florida",
      context: "High patient demand",
      delay: 300
    },
    {
      top: "74%",
      left: "46%",
      state: "Texas",
      context: "Major metro expansion",
      delay: 500
    },
    {
      top: "62%",
      left: "72%",
      state: "Georgia",
      context: "Southeast growth hub",
      delay: 400
    },
    {
      top: "57%",
      left: "77%",
      state: "South Carolina",
      context: "Regional expansion",
      delay: 600
    },
    {
      top: "49%",
      left: "79%",
      state: "North Carolina",
      context: "Rapid growth market",
      delay: 700
    },
    {
      top: "21%",
      left: "81%",
      state: "New York",
      context: "Premium opportunity",
      delay: 800
    },
    {
      top: "32%",
      left: "83%",
      state: "New Jersey",
      context: "Northeast corridor",
      delay: 900
    },
    {
      top: "30.5%",
      left: "78%",
      state: "Pennsylvania",
      context: "Key metro areas",
      delay: 1e3
    },
    {
      top: "35%",
      left: "62%",
      state: "Illinois",
      context: "Midwest gateway",
      delay: 1100
    },
    {
      top: "45%",
      left: "13%",
      state: "California",
      context: "Largest market potential",
      delay: 1200
    }
  ];
  return renderTemplate`<!-- Network Expansion Opportunities Map Section -->${maybeRenderHead()}<section class="bg-[#f0f4f9] py-24 relative overflow-hidden"> <!-- Background decorative elements --> <div class="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.05] blur-3xl"></div> <div class="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-[#003087] opacity-[0.05] blur-3xl"></div> <div class="max-w-5xl mx-auto px-6 sm:px-12 text-center relative z-10"> <!-- Header Section --> <div class="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-2 mb-4"> <p class="text-xl sm:text-2xl font-semibold uppercase tracking-wide text-[#cc9933] font-manrope">
Priority Markets
</p> <span class="bg-[#003087] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"> ${badge} </span> </div> <h2 class="text-3xl sm:text-4xl font-bold text-[#003087] mb-6 font-manrope"> ${title} </h2> <p class="text-lg text-gray-700 mb-4 max-w-3xl mx-auto font-manrope"> ${subtitle} </p> <!-- Market Stats --> ${showStats && renderTemplate`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100"> ${marketStats.map((stat) => renderTemplate`<div class="bg-white p-4 rounded-lg shadow-md"> <div class="text-2xl font-bold text-[#cc9933] mb-1"> ${stat.value} </div> <div class="text-sm text-gray-600">${stat.label}</div> </div>`)} </div>`} <!-- Map Container --> <div class="relative bg-white border border-[#e6c378]/30 rounded-3xl p-8 shadow-2xl" data-aos="zoom-in" data-aos-delay="200"> <!-- US Map --> <img src="/images/usa-transparent.svg" alt="US Map showing USRad priority markets" loading="lazy" class="w-full mx-auto max-w-3xl rounded-xl"> <!-- Interactive Pin Container --> <div class="absolute inset-0"> ${mapPins.map((pin) => renderTemplate`<div class="group absolute"${addAttribute(`top: ${pin.top}; left: ${pin.left};`, "style")}> <img src="/images/usrad-pin-dark.png" data-aos="fade-up"${addAttribute(pin.delay, "data-aos-delay")} class="w-6 sm:w-7 md:w-8 h-auto transition-transform duration-200 group-hover:scale-125"> <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center"> <div class="px-3 py-2 bg-[#003087] text-white text-xs rounded shadow-lg text-center whitespace-nowrap"> <div class="font-semibold">${pin.state}</div> <div class="text-[10px] opacity-90">${pin.context}</div> </div> </div> </div>`)} </div> </div> <!-- Partner-Focused Bottom Content --> <div class="mt-12 space-y-8"> <!-- Market Opportunity Summary --> ${showMarketOpportunity && renderTemplate`<div class="bg-gradient-to-r from-[#003087] to-[#0052cc] rounded-2xl p-8 text-white" data-aos="fade-up" data-aos-delay="400"> <h3 class="text-2xl font-bold mb-4 font-manrope">
Market Opportunity
</h3> <div class="grid md:grid-cols-3 gap-6 text-center"> ${opportunityStats.map((stat) => renderTemplate`<div> <div class="text-3xl font-bold text-[#cc9933] mb-2"> ${stat.value} </div> <div class="text-sm opacity-90">${stat.label}</div> </div>`)} </div> </div>`} <!-- Call to Action --> <div class="text-center"> <p class="text-lg text-gray-700 mb-6 font-manrope">
Position your imaging center in these high-growth markets and start
          capturing incremental revenue from day one.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"> <a${addAttribute(ctaLink, "href")} class="bg-[#cc9933] text-[#003087] px-8 py-4 rounded-xl shadow-md hover:bg-[#e6c378] hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold font-manrope"> ${ctaText} </a> <a href="/imaging-center/market-analysis" class="text-[#003087] hover:text-[#cc9933] transition-colors font-medium inline-flex items-center font-manrope">
View Detailed Market Analysis
<svg class="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> </a> </div> </div> </div> </div> </section>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/imaging/NetworkMap.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PartnerPageLayout", $$PartnerPageLayout, { "data-astro-cid-s7ipcnsm": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "AOSInit", $$AOSInit, { "data-astro-cid-s7ipcnsm": true })}${renderComponent($$result2, "HeroImagingCenter", $$HeroImagingCenter, { "data-astro-cid-s7ipcnsm": true })}${maybeRenderHead()}<section class="py-16 bg-[#fcf9f0] text-gray-800 relative overflow-hidden" data-aos="fade-up" data-aos-delay="100" data-astro-cid-s7ipcnsm><!-- Subtle pattern overlay --><div class="absolute inset-0 bg-repeat opacity-[0.03]" style="background-image: url('/images/subtle-pattern.svg');" data-astro-cid-s7ipcnsm></div><!-- Decorative elements --><div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#e6c378] opacity-[0.03] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#003087] opacity-[0.03] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="px-6 sm:px-8 lg:px-12" data-astro-cid-s7ipcnsm><div class="relative z-10 max-w-7xl mx-auto" data-astro-cid-s7ipcnsm><div class="grid md:grid-cols-2 gap-12 items-center" data-astro-cid-s7ipcnsm><div class="relative flex justify-center items-center" data-aos="fade-right" data-aos-delay="200" data-astro-cid-s7ipcnsm><img src="/images/michael.jpg" srcset="/images/michael-sm.jpg 400w, /images/michael.jpg 800w" sizes="(max-width: 768px) 85vw, 40vw" width="600" height="750" loading="lazy" alt="Michael Cabrera, Founder & CEO" class="w-[85%] h-auto rounded-xl shadow-lg relative z-10" data-astro-cid-s7ipcnsm><div class="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-[#e6c378] opacity-20" data-astro-cid-s7ipcnsm></div></div><div class="space-y-5" data-aos="fade-left" data-aos-delay="300" data-astro-cid-s7ipcnsm><!-- Strategic Positioning Badges - Option 1 --><div class="flex items-center space-x-4 text-sm" data-astro-cid-s7ipcnsm><span class="px-3 py-1 bg-[#cc9933] text-white rounded-full font-semibold" data-astro-cid-s7ipcnsm>
Serial Entrepreneur
</span><span class="px-3 py-1 bg-[#003087] text-white rounded-full font-semibold" data-astro-cid-s7ipcnsm>
Proven Exit
</span><span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold" data-astro-cid-s7ipcnsm>
Strategic Re-Entry
</span></div><h2 class="text-3xl font-semibold text-[#003087] flex items-center font-manrope" data-astro-cid-s7ipcnsm><span class="w-2 h-10 bg-[#e6c378] rounded-full mr-3" data-astro-cid-s7ipcnsm></span>
Pioneering Experience
</h2><p class="text-xl text-gray-700 leading-relaxed font-manrope" data-astro-cid-s7ipcnsm>
"We've not only built a previous network of 1,200+ imaging centers
              nationwide, but pioneered the first workers' compensation
              marketplace of its kind before anyone else did."
</p><p class="text-lg text-gray-700 leading-relaxed italic mt-3 font-manrope" data-astro-cid-s7ipcnsm>
— Michael Cabrera, Founder & CEO
</p><div class="mt-2" data-astro-cid-s7ipcnsm><a href="/imaging-center/experience" class="text-[#003087] hover:text-[#cc9933] transition-colors font-medium flex items-center font-manrope" data-astro-cid-s7ipcnsm>
Learn more about our experience
<svg class="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-s7ipcnsm></path></svg></a></div></div></div></div></div></section><section class="py-16 bg-white text-[#003087] relative overflow-hidden" data-astro-cid-s7ipcnsm><!-- Background elements --><div class="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.05] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-[#003087] opacity-[0.05] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="px-6 sm:px-8 lg:px-12" data-astro-cid-s7ipcnsm><div class="max-w-7xl mx-auto relative z-10" data-astro-cid-s7ipcnsm><div class="text-center mb-12" data-aos="fade-up" data-aos-delay="100" data-astro-cid-s7ipcnsm><h2 class="text-4xl font-semibold text-[#003087] inline-flex items-center justify-center font-manrope" data-astro-cid-s7ipcnsm><span class="w-2 h-10 bg-[#cc9933] rounded-full mr-3" data-astro-cid-s7ipcnsm></span>
Network Benefits
</h2><p class="text-xl text-gray-700 mt-4 max-w-3xl mx-auto font-manrope" data-astro-cid-s7ipcnsm>
Join the network that's reimagining imaging access while creating
            sustainable value for participating centers.
</p></div><div class="grid md:grid-cols-3 gap-8" data-astro-cid-s7ipcnsm><!-- Benefit 1: Incremental Revenue --><div class="bg-[#f8f2e1] p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#cc9933]" data-aos="fade-up" data-aos-delay="200" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#003087] rounded-full flex items-center justify-center mb-6 mx-auto" data-astro-cid-s7ipcnsm><svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-s7ipcnsm></path></svg></div><h3 class="text-xl font-semibold text-[#003087] text-center mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Incremental Revenue
</h3><p class="text-[#003087] text-center font-manrope" data-astro-cid-s7ipcnsm>
Convert vacant appointment slots into immediate revenue with zero
              additional overhead costs.
</p></div><!-- Benefit 2: Simplified Operations --><div class="bg-[#f8f2e1] p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#cc9933]" data-aos="fade-up" data-aos-delay="300" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#003087] rounded-full flex items-center justify-center mb-6 mx-auto" data-astro-cid-s7ipcnsm><svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-s7ipcnsm></path></svg></div><h3 class="text-xl font-semibold text-[#003087] text-center mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Simplified Operations
</h3><p class="text-[#003087] text-center font-manrope" data-astro-cid-s7ipcnsm>
We handle patient acquisition, scheduling, and payment processing,
              allowing you to focus on clinical excellence.
</p></div><!-- Benefit 3: Guaranteed Payment --><div class="bg-[#f8f2e1] p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#cc9933]" data-aos="fade-up" data-aos-delay="400" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#003087] rounded-full flex items-center justify-center mb-6 mx-auto" data-astro-cid-s7ipcnsm><svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-s7ipcnsm></path></svg></div><h3 class="text-xl font-semibold text-[#003087] text-center mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Guaranteed Payment
</h3><p class="text-[#003087] text-center font-manrope" data-astro-cid-s7ipcnsm>
Receive payment within 15 days - no lengthy insurance claim
              cycles, denials, or payment delays.
</p></div></div><div class="text-center mt-12" data-astro-cid-s7ipcnsm><a href="/imaging-center/benefits" class="text-[#003087] hover:text-[#cc9933] transition-colors font-medium inline-flex items-center font-manrope" data-astro-cid-s7ipcnsm>
View all network benefits
<svg class="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-s7ipcnsm></path></svg></a></div></div></div></section>${renderComponent($$result2, "NetworkMap", $$NetworkMap, { "title": "Join Our Growing Network", "showStats": true, "ctaText": "Start Your Application \u2192", "data-astro-cid-s7ipcnsm": true })}<section class="py-16 bg-[#f0f4f9] text-[#003087] relative overflow-hidden" data-astro-cid-s7ipcnsm><!-- Background elements --><div class="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#cc9933] opacity-[0.05] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-white opacity-[0.1] blur-3xl" data-astro-cid-s7ipcnsm></div><div class="px-6 sm:px-8 lg:px-12" data-astro-cid-s7ipcnsm><div class="max-w-7xl mx-auto relative z-10" data-astro-cid-s7ipcnsm><div class="text-center mb-16" data-aos="fade-up" data-aos-delay="100" data-astro-cid-s7ipcnsm><h2 class="text-4xl font-semibold text-[#003087] inline-flex items-center justify-center font-manrope" data-astro-cid-s7ipcnsm><span class="w-2 h-10 bg-[#cc9933] rounded-full mr-3" data-astro-cid-s7ipcnsm></span>
Simple Implementation
</h2><p class="text-xl text-gray-700 mt-4 max-w-3xl mx-auto font-manrope" data-astro-cid-s7ipcnsm>
Our streamlined onboarding process gets you up and running quickly
            with minimal disruption.
</p><div class="mt-6 flex justify-center items-center space-x-4 text-sm text-gray-600" data-astro-cid-s7ipcnsm><div class="flex items-center" data-astro-cid-s7ipcnsm><div class="w-3 h-3 bg-green-500 rounded-full mr-2" data-astro-cid-s7ipcnsm></div><span data-astro-cid-s7ipcnsm>Average: 2-3 weeks</span></div><div class="flex items-center" data-astro-cid-s7ipcnsm><div class="w-3 h-3 bg-[#cc9933] rounded-full mr-2" data-astro-cid-s7ipcnsm></div><span data-astro-cid-s7ipcnsm>Zero setup costs</span></div></div></div><!-- Enhanced Timeline with Animations --><div class="relative" data-aos="fade-up" data-aos-delay="200" data-astro-cid-s7ipcnsm><!-- Animated Progress Line --><div class="absolute top-20 left-0 right-0 h-1 bg-gray-200 hidden lg:block rounded-full overflow-hidden" data-astro-cid-s7ipcnsm><div class="h-full bg-gradient-to-r from-[#cc9933] to-[#003087] rounded-full transition-all duration-2000 ease-out" id="progressLine" style="width: 0%" data-astro-cid-s7ipcnsm></div></div><!-- Mobile Vertical Line --><div class="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 lg:hidden rounded-full overflow-hidden" data-astro-cid-s7ipcnsm><div class="w-full bg-gradient-to-b from-[#cc9933] to-[#003087] rounded-full transition-all duration-2000 ease-out" id="progressLineMobile" style="height: 0%" data-astro-cid-s7ipcnsm></div></div><!-- Enhanced Step Cards --><div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6" data-astro-cid-s7ipcnsm><!-- Step 1: Eligibility Review --><div class="flex flex-col items-center text-center lg:items-center" data-aos="zoom-in" data-aos-delay="300" data-astro-cid-s7ipcnsm><div class="relative mb-6" data-astro-cid-s7ipcnsm><!-- Main Icon Container --><div class="w-20 h-20 bg-gradient-to-br from-[#003087] to-[#0052cc] rounded-2xl flex items-center justify-center relative z-10 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3" data-astro-cid-s7ipcnsm><!-- Clipboard Check Icon --><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" data-astro-cid-s7ipcnsm></path></svg></div><!-- Step Number Badge --><div class="absolute -top-2 -right-2 w-8 h-8 bg-[#cc9933] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20" data-astro-cid-s7ipcnsm>
1
</div><!-- Floating Indicator --><div class="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse" data-astro-cid-s7ipcnsm></div></div><div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#cc9933] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:ml-6" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] mb-3 font-manrope" data-astro-cid-s7ipcnsm>
Eligibility Review
</h3><p class="text-gray-600 font-manrope text-sm leading-relaxed mb-4" data-astro-cid-s7ipcnsm>
Quick but thorough evaluation of your center's qualifications
                  and readiness for our network.
</p><div class="flex items-center text-xs text-green-600 font-semibold" data-astro-cid-s7ipcnsm><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-s7ipcnsm><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-astro-cid-s7ipcnsm></path></svg>
Review process typically takes 2-3 business days
</div></div></div><!-- Step 2: Onboarding --><div class="flex flex-col items-center text-center lg:items-center" data-aos="zoom-in" data-aos-delay="400" data-astro-cid-s7ipcnsm><div class="relative mb-6" data-astro-cid-s7ipcnsm><div class="w-20 h-20 bg-gradient-to-br from-[#cc9933] to-[#e6c378] rounded-2xl flex items-center justify-center relative z-10 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3" data-astro-cid-s7ipcnsm><!-- Handshake Icon --><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" data-astro-cid-s7ipcnsm></path></svg></div><div class="absolute -top-2 -right-2 w-8 h-8 bg-[#003087] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20" data-astro-cid-s7ipcnsm>
2
</div><div class="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse" data-astro-cid-s7ipcnsm></div></div><div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#003087] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:ml-6" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] mb-3 font-manrope" data-astro-cid-s7ipcnsm>
Onboarding
</h3><p class="text-gray-600 font-manrope text-sm leading-relaxed mb-4" data-astro-cid-s7ipcnsm>
Dedicated support specialist guides you through paperwork,
                  contracts, and initial setup process.
</p><div class="flex items-center text-xs text-blue-600 font-semibold" data-astro-cid-s7ipcnsm><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-s7ipcnsm><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" data-astro-cid-s7ipcnsm></path></svg>
One-on-one guidance throughout
</div></div></div><!-- Step 3: Integration --><div class="flex flex-col items-center text-center lg:items-center" data-aos="zoom-in" data-aos-delay="500" data-astro-cid-s7ipcnsm><div class="relative mb-6" data-astro-cid-s7ipcnsm><div class="w-20 h-20 bg-gradient-to-br from-[#003087] to-[#0052cc] rounded-2xl flex items-center justify-center relative z-10 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3" data-astro-cid-s7ipcnsm><!-- Computer/Integration Icon --><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-s7ipcnsm></path></svg></div><div class="absolute -top-2 -right-2 w-8 h-8 bg-[#cc9933] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20" data-astro-cid-s7ipcnsm>
3
</div><div class="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full animate-pulse" data-astro-cid-s7ipcnsm></div></div><div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#cc9933] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:ml-6" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] mb-3 font-manrope" data-astro-cid-s7ipcnsm>
Integration
</h3><p class="text-gray-600 font-manrope text-sm leading-relaxed mb-4" data-astro-cid-s7ipcnsm>
Simple connection to our scheduling platform and patient
                  management system. No complex IT work required.
</p><div class="flex items-center text-xs text-purple-600 font-semibold" data-astro-cid-s7ipcnsm><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-s7ipcnsm><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" data-astro-cid-s7ipcnsm></path></svg>
Fast & simple setup
</div></div></div><!-- Step 4: Launch --><div class="flex flex-col items-center text-center lg:items-center" data-aos="zoom-in" data-aos-delay="600" data-astro-cid-s7ipcnsm><div class="relative mb-6" data-astro-cid-s7ipcnsm><div class="w-20 h-20 bg-gradient-to-br from-[#cc9933] to-[#e6c378] rounded-2xl flex items-center justify-center relative z-10 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3" data-astro-cid-s7ipcnsm><!-- Rocket Launch Icon --><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-s7ipcnsm></path></svg></div><div class="absolute -top-2 -right-2 w-8 h-8 bg-[#003087] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20" data-astro-cid-s7ipcnsm>
4
</div><div class="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse" data-astro-cid-s7ipcnsm></div></div><div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#003087] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:ml-6" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] mb-3 font-manrope" data-astro-cid-s7ipcnsm>
Launch & Earn
</h3><p class="text-gray-600 font-manrope text-sm leading-relaxed mb-4" data-astro-cid-s7ipcnsm>
Begin receiving patients and generating incremental revenue.
                  Full support and monitoring included.
</p><div class="flex items-center text-xs text-green-600 font-semibold" data-astro-cid-s7ipcnsm><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-s7ipcnsm><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" data-astro-cid-s7ipcnsm></path></svg>
Start earning immediately
</div></div></div></div></div><!-- Timeline Summary --><div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="700" data-astro-cid-s7ipcnsm><div class="bg-gradient-to-r from-[#003087] to-[#0052cc] rounded-2xl p-8 text-white shadow-xl" data-astro-cid-s7ipcnsm><h3 class="text-2xl font-bold mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Complete Process Timeline
</h3><div class="grid md:grid-cols-3 gap-6" data-astro-cid-s7ipcnsm><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>
3-5 days
</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Eligibility Review</div></div><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>1 week</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Setup & Integration</div></div><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>
2-3 weeks
</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Total Time to Revenue</div></div></div></div></div><!-- CTA Link --><div class="text-center mt-12" data-astro-cid-s7ipcnsm><a href="/imaging-center/implementation" class="text-[#003087] hover:text-[#cc9933] transition-colors font-medium inline-flex items-center font-manrope group" data-astro-cid-s7ipcnsm>
View detailed implementation process
<svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-s7ipcnsm></path></svg></a></div></div></div><!-- Animation Script -->${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/index.astro?astro&type=script&index=0&lang.ts")}</section><section class="py-16 bg-white" data-astro-cid-s7ipcnsm><div class="max-w-6xl mx-auto px-6" data-astro-cid-s7ipcnsm><div class="text-center mb-12" data-aos="fade-up" data-astro-cid-s7ipcnsm><h2 class="text-3xl font-semibold text-[#003087] mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Compatible with Leading Equipment
</h2><p class="text-lg text-gray-700 max-w-3xl mx-auto font-manrope" data-astro-cid-s7ipcnsm>
Our network supports imaging centers with equipment from all major
          manufacturers, ensuring seamless integration regardless of your
          current setup.
</p></div><!-- MRI Equipment Showcase --><div class="mb-16" data-aos="fade-up" data-aos-delay="100" data-astro-cid-s7ipcnsm><h3 class="text-2xl font-semibold text-[#003087] text-center mb-8 font-manrope" data-astro-cid-s7ipcnsm>
MRI Systems
</h3><div class="grid md:grid-cols-3 gap-8" data-astro-cid-s7ipcnsm><!-- Siemens MRI --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/siemens-mri.webp" alt="Siemens MRI System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/siemens.svg" alt="Siemens" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
Siemens MRI
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
MAGNETOM Skyra, Prisma, and Vida 3-Tesla systems with advanced
                imaging
</p></div></div><!-- GE MRI --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/ge-mri.jpg" alt="GE MRI System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/ge.svg" alt="GE Healthcare" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
GE MRI
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
SIGNA Pioneer wide-bore and Premier systems with advanced AIR
                Technology
</p></div></div><!-- Philips MRI --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/philips-mri.webp" alt="Philips MRI System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/philips.svg" alt="Philips" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
Philips MRI
<h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
Philips 3T MRI
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
Ingenia Elition with helium-free BlueSeal magnet and
                  Compressed SENSE technology
</p></h4></div></div></div><!-- CT Equipment Showcase --><div class="mb-16" data-aos="fade-up" data-aos-delay="200" data-astro-cid-s7ipcnsm><h3 class="text-2xl font-semibold text-[#003087] text-center mb-8 font-manrope" data-astro-cid-s7ipcnsm>
CT Systems
</h3><div class="grid md:grid-cols-3 gap-8" data-astro-cid-s7ipcnsm><!-- Canon CT --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/canon-ct.jpeg" alt="Canon CT System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/canon.svg" alt="Canon Medical" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
Canon CT
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
Aquilion ONE PRISM and PRIME series with advanced dose
                  reduction technology
</p></div></div><!-- Siemens CT --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/siemens-ct.webp" alt="Siemens CT System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/siemens.svg" alt="Siemens" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
Siemens CT
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
SOMATOM Force and Definition Edge with advanced dual-energy
                  capabilities
</p></div></div><!-- GE CT --><div class="bg-gradient-to-br from-[#f8f2e1] to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-astro-cid-s7ipcnsm><div class="aspect-w-16 aspect-h-10 mb-6" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/ge-ct.jpg" alt="GE CT System" class="w-full h-48 object-cover rounded-lg shadow-md" data-astro-cid-s7ipcnsm></div><div class="text-center" data-astro-cid-s7ipcnsm><img src="/images/manufacturers/ge.svg" alt="GE Healthcare" class="h-8 mx-auto mb-3" data-astro-cid-s7ipcnsm><h4 class="text-lg font-semibold text-[#003087] mb-2 font-manrope" data-astro-cid-s7ipcnsm>
GE CT
</h4><p class="text-sm text-gray-600 font-manrope" data-astro-cid-s7ipcnsm>
Revolution HD and Apex series with 256-slice capability and
                  spectral imaging
</p></div></div></div></div><!-- Equipment Stats & Features --><div class="bg-gradient-to-r from-[#003087] to-[#0052cc] rounded-2xl p-8 text-white" data-aos="fade-up" data-aos-delay="300" data-astro-cid-s7ipcnsm><div class="text-center mb-8" data-astro-cid-s7ipcnsm><h3 class="text-2xl font-bold mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Network Equipment Standards
</h3><p class="text-lg opacity-90 font-manrope" data-astro-cid-s7ipcnsm>
All partner facilities meet our rigorous equipment and quality
              standards
</p></div><div class="grid md:grid-cols-4 gap-6 text-center" data-astro-cid-s7ipcnsm><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>1.5T+</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Minimum MRI Field Strength</div></div><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>64+</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Minimum CT Slice Count</div></div><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>100%</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Equipment Certification Rate</div></div><div data-astro-cid-s7ipcnsm><div class="text-3xl font-bold text-[#cc9933] mb-2" data-astro-cid-s7ipcnsm>24/7</div><div class="text-sm opacity-90" data-astro-cid-s7ipcnsm>Technical Support Available</div></div></div></div><!-- Additional Equipment Types --><div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="400" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] mb-6 font-manrope" data-astro-cid-s7ipcnsm>
We Also Support
</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto" data-astro-cid-s7ipcnsm><div class="text-center" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#cc9933]/10 rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-s7ipcnsm><span class="text-2xl" data-astro-cid-s7ipcnsm>🫁</span></div><p class="text-sm font-medium text-[#003087] font-manrope" data-astro-cid-s7ipcnsm>
Ultrasound
</p></div><div class="text-center" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#cc9933]/10 rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-s7ipcnsm><span class="text-2xl" data-astro-cid-s7ipcnsm>🦴</span></div><p class="text-sm font-medium text-[#003087] font-manrope" data-astro-cid-s7ipcnsm>
X-Ray
</p></div><div class="text-center" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#cc9933]/10 rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-s7ipcnsm><span class="text-2xl" data-astro-cid-s7ipcnsm>🏥</span></div><p class="text-sm font-medium text-[#003087] font-manrope" data-astro-cid-s7ipcnsm>
Mammography
</p></div><div class="text-center" data-astro-cid-s7ipcnsm><div class="w-16 h-16 bg-[#cc9933]/10 rounded-full flex items-center justify-center mx-auto mb-3" data-astro-cid-s7ipcnsm><span class="text-2xl" data-astro-cid-s7ipcnsm>💀</span></div><p class="text-sm font-medium text-[#003087] font-manrope" data-astro-cid-s7ipcnsm>
DEXA
</p></div></div></div></div></div><!-- FAQ Preview - Just 2-3 Most Common Questions --><section class="py-16 bg-white" data-astro-cid-s7ipcnsm><div class="max-w-4xl mx-auto px-6" data-astro-cid-s7ipcnsm><div class="text-center mb-8" data-astro-cid-s7ipcnsm><h2 class="text-3xl font-semibold text-[#003087] mb-4 font-manrope" data-astro-cid-s7ipcnsm>
Common Questions
</h2></div><div class="space-y-4" data-astro-cid-s7ipcnsm><!-- FAQ 1 --><div class="bg-[#f8f2e1] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] flex items-center font-manrope" data-astro-cid-s7ipcnsm><span class="w-1.5 h-6 bg-[#cc9933] rounded-full mr-3" data-astro-cid-s7ipcnsm></span>
What is the process to join USRad?
</h3><p class="text-lg text-gray-700 mt-4 pl-4 font-manrope" data-astro-cid-s7ipcnsm>
The process is simple: complete our streamlined application to get
              started immediately, or schedule a consultation if you have
              questions. Most network providers who apply directly are live
              within 2-3 weeks.
</p></div><!-- FAQ 2 --><div class="bg-[#f8f2e1] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" data-astro-cid-s7ipcnsm><h3 class="text-xl font-semibold text-[#003087] flex items-center font-manrope" data-astro-cid-s7ipcnsm><span class="w-1.5 h-6 bg-[#cc9933] rounded-full mr-3" data-astro-cid-s7ipcnsm></span>
Are there any costs involved in joining USRad?
</h3><p class="text-lg text-gray-700 mt-4 pl-4 font-manrope" data-astro-cid-s7ipcnsm>
Joining USRad is free for eligible centers. We offer a
              transparent, simple model with no hidden fees or monthly charges.
</p></div></div><div class="text-center mt-8" data-astro-cid-s7ipcnsm><a href="/imaging-center/faq" class="text-[#003087] hover:text-[#cc9933] transition-colors font-medium inline-flex items-center font-manrope" data-astro-cid-s7ipcnsm>
View all frequently asked questions
<svg class="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-s7ipcnsm></path></svg></a></div></div></section><!-- Streamlined CTA Section --><section class="bg-[#003087] text-white py-20 px-6 sm:px-12 relative overflow-hidden" data-aos="fade-up" data-astro-cid-s7ipcnsm><div class="max-w-7xl mx-auto relative z-10 grid md:grid-cols-5 gap-12 items-start" data-astro-cid-s7ipcnsm><!-- Text & CTA --><div class="md:col-span-3" data-aos="fade-right" data-aos-delay="100" data-astro-cid-s7ipcnsm><h2 class="text-4xl sm:text-5xl font-bold leading-tight mb-6 font-manrope" data-astro-cid-s7ipcnsm>
Ready to Join the USRad Network?
</h2><p class="text-lg mb-8 font-manrope leading-relaxed" data-astro-cid-s7ipcnsm>
Start generating revenue from unused appointment slots while serving
            patients who need affordable imaging. No monthly fees. Quick
            onboarding.
</p><div class="flex flex-col sm:flex-row sm:items-center gap-4" data-astro-cid-s7ipcnsm><a href="/imaging-center/apply" class="px-8 py-4 bg-[#cc9933] text-[#003087] font-bold rounded-full hover:bg-[#e6c378] transition-all duration-300 hover:shadow-xl font-manrope text-center" data-astro-cid-s7ipcnsm>
Apply Now - Get Started
</a><a href="/imaging-center/coming-soon" class="inline-flex items-center text-white hover:text-[#cc9933] transition-all duration-300 font-manrope" data-astro-cid-s7ipcnsm><svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-s7ipcnsm><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" data-astro-cid-s7ipcnsm></path></svg>
Download Network Overview (PDF)
</a></div></div><!-- Process Card --><div class="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#cc9933] text-left font-manrope" data-aos="fade-left" data-aos-delay="200" data-astro-cid-s7ipcnsm><h3 class="text-2xl font-semibold text-[#003087] mb-4" data-astro-cid-s7ipcnsm>
Quick & Easy Process
</h3><div class="space-y-6" data-astro-cid-s7ipcnsm><div class="flex items-start gap-4" data-astro-cid-s7ipcnsm><div class="w-8 h-8 bg-[#cc9933] text-white rounded-full flex items-center justify-center text-sm font-bold" data-astro-cid-s7ipcnsm>
1
</div><p class="text-sm text-gray-800" data-astro-cid-s7ipcnsm>
Complete a short application (5 minutes)
</p></div><div class="flex items-start gap-4" data-astro-cid-s7ipcnsm><div class="w-8 h-8 bg-[#cc9933] text-white rounded-full flex items-center justify-center text-sm font-bold" data-astro-cid-s7ipcnsm>
2
</div><p class="text-sm text-gray-800" data-astro-cid-s7ipcnsm>
Our team reviews your eligibility in 48 hours
</p></div><div class="flex items-start gap-4" data-astro-cid-s7ipcnsm><div class="w-8 h-8 bg-[#cc9933] text-white rounded-full flex items-center justify-center text-sm font-bold" data-astro-cid-s7ipcnsm>
3
</div><p class="text-sm text-gray-800" data-astro-cid-s7ipcnsm>
You begin receiving patients — no delays, no red tape
</p></div></div><p class="text-xs text-gray-500 text-center mt-6" data-astro-cid-s7ipcnsm>
Free to join • No monthly fees • Fast approval
</p></div></div></section>${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/index.astro?astro&type=script&index=1&lang.ts")}</section>` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/index.astro";
const $$url = "/imaging-center";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
