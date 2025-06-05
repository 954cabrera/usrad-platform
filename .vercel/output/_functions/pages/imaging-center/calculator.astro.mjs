/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, g as renderScript } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PartnerPageLayout } from '../../chunks/PartnerPageLayout_Bhl0cH-P.mjs';
import { $ as $$AOSInit } from '../../chunks/Footer_DMjklgAz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Calculator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PartnerPageLayout", $$PartnerPageLayout, { "title": "Revenue Calculator | USRad Imaging Centers", "currentPage": "Revenue Calculator", "hideTitle": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AOSInit", $$AOSInit, {})}  ${maybeRenderHead()}<section class="bg-gradient-to-br from-[#fcf9f0] to-[#f5e7c5] py-16 px-6"> <div class="max-w-4xl mx-auto text-center" data-aos="fade-up"> <h1 class="text-4xl md:text-5xl font-bold text-[#003087] mb-6">
Calculate Your Revenue Potential
</h1> <p class="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
See how partnering with USRad could increase your imaging center's
        revenue with guaranteed payments, zero billing complexity, and access to
        50,000+ self-pay patients.
</p> <div class="flex flex-wrap justify-center gap-4"> <div class="bg-white/80 px-6 py-3 rounded-full"> <span class="font-semibold text-[#003087]">✓ Guaranteed payment per scan</span> </div> <div class="bg-white/80 px-6 py-3 rounded-full"> <span class="font-semibold text-[#003087]">✓ 100% collection rate</span> </div> <div class="bg-white/80 px-6 py-3 rounded-full"> <span class="font-semibold text-[#003087]">✓ Zero billing costs</span> </div> </div> </div> </section>  <section class="py-16 bg-gray-50"> <div class="max-w-6xl mx-auto px-6"> <div class="grid lg:grid-cols-2 gap-12"> <!-- Calculator Inputs --> <div class="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-right"> <h2 class="text-2xl font-bold text-[#003087] mb-6">
Your Current Situation
</h2> <div class="space-y-8"> <!-- Monthly Scan Volume --> <div> <label class="block text-sm font-semibold text-gray-700 mb-3">
Current Monthly Scan Volume
</label> <div class="relative"> <input type="range" id="monthlyScans" min="10" max="500" value="100" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"> <div class="flex justify-between text-sm text-gray-500 mt-2"> <span>10</span> <span>500+</span> </div> </div> <div class="text-center mt-3"> <span class="text-2xl font-bold text-[#003087]" id="scansDisplay">100</span> <span class="text-gray-600"> scans/month</span> </div> </div> <!-- Average Reimbursement --> <div> <label class="block text-sm font-semibold text-gray-700 mb-3">
Average Reimbursement per Scan
</label> <div class="relative"> <input type="range" id="avgReimbursement" min="150" max="600" value="300" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"> <div class="flex justify-between text-sm text-gray-500 mt-2"> <span>$150</span> <span>$600+</span> </div> </div> <div class="text-center mt-3"> <span class="text-2xl font-bold text-[#003087]" id="reimbursementDisplay">$300</span> <span class="text-gray-600"> per scan</span> </div> </div> <!-- USRad Contract Rate --> <div> <label class="block text-sm font-semibold text-gray-700 mb-3">
Your USRad Contract Rate
</label> <div class="relative"> <input type="range" id="usradRate" min="200" max="400" value="300" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"> <div class="flex justify-between text-sm text-gray-500 mt-2"> <span>$200</span> <span>$400</span> </div> </div> <div class="text-center mt-3"> <span class="text-2xl font-bold text-[#003087]" id="usradRateDisplay">$300</span> <span class="text-gray-600"> per scan</span> </div> <p class="text-xs text-gray-500 mt-2 text-center">
* Rates vary by market and volume. Final rate determined during
                contract negotiations.
</p> </div> <!-- Capacity Utilization --> <div> <label class="block text-sm font-semibold text-gray-700 mb-3">
Current Capacity Utilization
</label> <div class="relative"> <input type="range" id="capacity" min="50" max="100" value="75" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"> <div class="flex justify-between text-sm text-gray-500 mt-2"> <span>50%</span> <span>100%</span> </div> </div> <div class="text-center mt-3"> <span class="text-2xl font-bold text-[#003087]" id="capacityDisplay">75</span> <span class="text-gray-600">% utilized</span> </div> </div> <!-- Geographic Market --> <div> <label class="block text-sm font-semibold text-gray-700 mb-3">
Geographic Market
</label> <select id="market" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003087] focus:border-[#003087] transition"> <option value="1.0">National Average</option> <option value="1.2">New York Metro</option> <option value="1.15">Los Angeles</option> <option value="1.1">Chicago</option> <option value="1.05">Dallas/Houston</option> <option value="1.0">Atlanta</option> <option value="1.08">Miami/Fort Lauderdale</option> <option value="0.95">Other Major Cities</option> <option value="0.9">Smaller Markets</option> </select> </div> </div> </div> <!-- Results Display --> <div class="bg-gradient-to-br from-[#003087] to-[#0052cc] rounded-2xl p-8 text-white" data-aos="fade-left"> <h2 class="text-2xl font-bold mb-6">
Your USRad Partnership Potential
</h2> <div class="space-y-6"> <!-- Key Metrics --> <div class="grid grid-cols-2 gap-4"> <div class="bg-white/10 rounded-xl p-4 text-center"> <div class="text-2xl font-bold text-[#cc9933]" id="additionalScans">
25
</div> <div class="text-sm opacity-90">Additional Scans/Month</div> </div> <div class="bg-white/10 rounded-xl p-4 text-center"> <div class="text-2xl font-bold text-[#cc9933]" id="newCapacity">
85%
</div> <div class="text-sm opacity-90">New Capacity</div> </div> </div> <!-- Revenue Impact --> <div class="bg-white/20 rounded-xl p-6"> <h3 class="text-lg font-bold mb-4">Revenue Impact</h3> <div class="space-y-3"> <div class="flex justify-between"> <span>Monthly Revenue Increase:</span> <span class="font-bold text-[#cc9933]" id="monthlyIncrease">$11,250</span> </div> <div class="flex justify-between"> <span>Annual Revenue Boost:</span> <span class="font-bold text-[#cc9933]" id="annualIncrease">$135,000</span> </div> <hr class="border-white/30"> <div class="flex justify-between text-lg font-bold"> <span>Total New Annual Revenue:</span> <span class="text-[#cc9933]" id="totalRevenue">$135,000</span> </div> </div> </div> <!-- USRad Advantages --> <div class="bg-white/10 rounded-xl p-6"> <h3 class="text-lg font-bold mb-4">USRad Advantages</h3> <div class="space-y-2 text-sm"> <div class="flex items-center"> <span class="text-green-400 mr-2">✓</span> <span>Guaranteed payment per scan</span> </div> <div class="flex items-center"> <span class="text-green-400 mr-2">✓</span> <span>No insurance billing or denials</span> </div> <div class="flex items-center"> <span class="text-green-400 mr-2">✓</span> <span>Patients pay upfront - zero bad debt</span> </div> <div class="flex items-center"> <span class="text-green-400 mr-2">✓</span> <span>Access to 50,000+ self-pay patients</span> </div> <div class="flex items-center"> <span class="text-green-400 mr-2">✓</span> <span>Fill unused appointment slots</span> </div> </div> </div> <!-- CTA Section --> <div class="text-center pt-4"> <button onclick="showLeadForm()" class="bg-[#cc9933] hover:bg-[#b8862e] text-[#003087] px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 w-full">
Get Detailed Revenue Analysis →
</button> <p class="text-sm opacity-80 mt-3">
Free consultation • No commitment required
</p> </div> </div> </div> </div> </div> </section>  <section class="py-16 bg-white"> <div class="max-w-6xl mx-auto px-6"> <h2 class="text-3xl font-bold text-[#003087] text-center mb-12" data-aos="fade-up">
Why Imaging Centers Choose USRad
</h2> <div class="grid md:grid-cols-2 gap-8"> <!-- Current Situation --> <div class="border-2 border-red-200 rounded-xl p-6" data-aos="fade-right"> <h3 class="text-xl font-bold text-red-600 mb-4">
Your Current Situation
</h3> <div class="space-y-3 text-sm"> <div class="flex justify-between"> <span>Average reimbursement:</span> <span class="font-semibold" id="currentReimbursement">$300</span> </div> <div class="flex justify-between"> <span>Collection rate:</span> <span class="font-semibold">~85%</span> </div> <div class="flex justify-between"> <span>Billing/admin costs:</span> <span class="font-semibold">~$45/scan</span> </div> <div class="flex justify-between"> <span>Bad debt:</span> <span class="font-semibold">~$25/scan</span> </div> <hr class="border-gray-300"> <div class="flex justify-between text-lg font-bold"> <span>Net per scan:</span> <span class="text-red-600" id="netCurrent">~$195</span> </div> </div> <div class="mt-4 p-3 bg-red-50 rounded-lg"> <p class="text-sm text-red-600">
⚠️ Plus unpredictable denials and delays
</p> </div> </div> <!-- USRad Situation --> <div class="border-2 border-green-200 rounded-xl p-6" data-aos="fade-left"> <h3 class="text-xl font-bold text-[#003087] mb-4">With USRad</h3> <div class="space-y-3 text-sm"> <div class="flex justify-between"> <span>Guaranteed payment:</span> <span class="font-semibold" id="usradPaymentDisplay">$300</span> </div> <div class="flex justify-between"> <span>Collection rate:</span> <span class="font-semibold">100%</span> </div> <div class="flex justify-between"> <span>Billing/admin costs:</span> <span class="font-semibold">$0</span> </div> <div class="flex justify-between"> <span>Bad debt:</span> <span class="font-semibold">$0</span> </div> <hr class="border-gray-300"> <div class="flex justify-between text-lg font-bold"> <span>Net per scan:</span> <span class="text-[#003087]" id="netUsrad">$300</span> </div> </div> <div class="mt-4 p-3 bg-green-50 rounded-lg"> <p class="text-sm text-green-600">
✅ Predictable revenue stream with zero hassle
</p> </div> </div> </div> <div class="text-center mt-8"> <div class="text-3xl font-bold text-[#cc9933]" id="netDifference" data-aos="zoom-in">
+$105 more per USRad scan
</div> <p class="text-gray-600 mt-2">
Plus eliminated billing overhead and administrative costs
</p> </div> </div> </section>  <section class="py-16 bg-[#003087] text-white text-center"> <div class="max-w-4xl mx-auto px-6" data-aos="fade-up"> <h2 class="text-3xl font-bold mb-6">Ready to Increase Your Revenue?</h2> <p class="text-xl mb-8 opacity-90">
Join hundreds of imaging centers already earning predictable revenue
        with USRad
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/imaging-center/apply" class="bg-[#cc9933] hover:bg-[#b8862e] text-[#003087] px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
Apply to Join Network →
</a> </div> </div> </section>  <div id="leadModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-6 hidden z-50"> <div class="bg-white rounded-2xl p-8 max-w-md w-full"> <h3 class="text-2xl font-bold text-[#003087] mb-4">
Get Your Detailed Analysis
</h3> <p class="text-gray-600 mb-6">
Enter your details to receive a personalized revenue analysis and speak
        with our partnership team.
</p> <form id="leadForm" class="space-y-4"> <div> <input type="text" placeholder="Imaging Center Name" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"> </div> <div> <input type="text" placeholder="Your Name" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"> </div> <div> <input type="email" placeholder="Email Address" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"> </div> <div> <input type="tel" placeholder="Phone Number" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#003087] focus:border-[#003087]"> </div> <div class="flex gap-3 pt-4"> <button type="submit" class="bg-[#cc9933] hover:bg-[#b8862e] text-white px-6 py-3 rounded-lg font-bold flex-1 transition-all">
Send My Analysis
</button> <button type="button" onclick="hideLeadForm()" class="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all">
Cancel
</button> </div> </form> </div> </div> ${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/calculator.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/calculator.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/imaging-center/calculator.astro";
const $$url = "/imaging-center/calculator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calculator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
