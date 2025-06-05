/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, g as renderScript } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Label, Area } from 'recharts';
import { $ as $$AOSInit } from '../chunks/Footer_DMjklgAz.mjs';
export { renderers } from '../renderers.mjs';

const HealthcareCoverageCrisisGraph = () => {
  const data = [
    { year: 2015, uninsured: 28, underinsured: 42, total: 70 },
    { year: 2018, uninsured: 29, underinsured: 46, total: 75 },
    { year: 2020, uninsured: 30, underinsured: 50, total: 80 },
    { year: 2022, uninsured: 24, underinsured: 58, total: 82 },
    { year: 2024, uninsured: 25, underinsured: 65, total: 90 },
    // Projections start after 2024
    { year: 2027, uninsured: 28, underinsured: 72, total: 100 },
    { year: 2030, uninsured: 32, underinsured: 78, total: 110 },
    { year: 2035, uninsured: 38, underinsured: 82, total: 120 }
  ];
  const [activePoint, setActivePoint] = useState(null);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 border border-gray-200 shadow-md rounded-md text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#003087]", children: `Year: ${label}` }),
        payload.map((entry, index) => /* @__PURE__ */ jsx("p", { style: { color: entry.color }, children: `${entry.name}: ${entry.value} million` }, `item-${index}`)),
        label === 2024 && /* @__PURE__ */ jsx("p", { className: "text-xs italic mt-1 text-gray-600", children: "Current state" }),
        label > 2024 && /* @__PURE__ */ jsx("p", { className: "text-xs italic mt-1 text-gray-600", children: "Projected" })
      ] });
    }
    return null;
  };
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, dataKey, value, index } = props;
    const isActive = activePoint === `${dataKey}-${index}`;
    const isCurrentYear = props.payload.year === 2024;
    const radius = isCurrentYear ? 6 : isActive ? 5 : 3;
    const strokeWidth = isCurrentYear ? 2 : isActive ? 2 : 1;
    return /* @__PURE__ */ jsx(
      "circle",
      {
        cx,
        cy,
        r: radius,
        stroke,
        strokeWidth,
        fill: isCurrentYear ? "#fff" : isActive ? "#fff" : stroke,
        style: { cursor: "pointer" },
        onMouseEnter: () => setActivePoint(`${dataKey}-${index}`),
        onMouseLeave: () => setActivePoint(null)
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white rounded-lg", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-blue-900 mb-4 text-center", children: "America's Healthcare Coverage Crisis: 2015-2035" }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-gray-600 -mt-2 mb-3", children: "Increasing opportunity for direct-pay imaging services" }),
    /* @__PURE__ */ jsxs("div", { className: "h-80", children: [
      " ",
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
        AreaChart,
        {
          data,
          margin: { top: 20, right: 30, left: 0, bottom: 20 },
          onMouseLeave: () => setActivePoint(null),
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "colorUninsured", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#4169E1", stopOpacity: 0.8 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#4169E1", stopOpacity: 0.1 })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "colorUnderinsured", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#E6C378", stopOpacity: 0.8 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#E6C378", stopOpacity: 0.1 })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "colorTotal", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#003087", stopOpacity: 0.8 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#003087", stopOpacity: 0.1 })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "graphGloss", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: 0.7 }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e0e0e0" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "year",
                tick: { fontSize: 12, fill: "#555" },
                tickCount: 7
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                label: { value: "Millions of Americans", angle: -90, position: "insideLeft", style: { textAnchor: "middle", fill: "#555" } },
                tick: { fontSize: 12, fill: "#555" }
              }
            ),
            /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
            /* @__PURE__ */ jsx(
              Legend,
              {
                verticalAlign: "top",
                height: 36,
                wrapperStyle: { fontSize: "12px" }
              }
            ),
            /* @__PURE__ */ jsx(
              ReferenceLine,
              {
                x: "2024",
                stroke: "#003087",
                strokeWidth: 2,
                label: /* @__PURE__ */ jsx(
                  Label,
                  {
                    value: "TODAY: 90 MILLION",
                    position: "top",
                    fill: "#003087",
                    fontSize: 13,
                    fontWeight: "bold",
                    offset: 15
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "uninsured",
                stroke: "#4169E1",
                fillOpacity: 1,
                fill: "url(#colorUninsured)",
                name: "Uninsured",
                strokeWidth: 2,
                dot: /* @__PURE__ */ jsx(CustomizedDot, {}),
                activeDot: { r: 6, stroke: "#4169E1", strokeWidth: 2, fill: "white" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "underinsured",
                stroke: "#E6C378",
                fillOpacity: 1,
                fill: "url(#colorUnderinsured)",
                name: "Underinsured",
                strokeWidth: 2,
                dot: /* @__PURE__ */ jsx(CustomizedDot, {}),
                activeDot: { r: 6, stroke: "#E6C378", strokeWidth: 2, fill: "white" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "total",
                stroke: "#003087",
                fillOpacity: 1,
                fill: "url(#colorTotal)",
                name: "Total (Combined)",
                strokeWidth: 3,
                dot: /* @__PURE__ */ jsx(CustomizedDot, {}),
                activeDot: { r: 7, stroke: "#003087", strokeWidth: 2, fill: "white" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "total",
                stroke: "transparent",
                fill: "url(#graphGloss)",
                fillOpacity: 0.3,
                name: "",
                legendType: "none"
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-gray-600 border-t border-gray-100 pt-2 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("p", { children: "Data sources: Kaiser Family Foundation, Commonwealth Fund, HHS" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-100 opacity-70 mr-2" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Projections after 2024" })
      ] })
    ] })
  ] });
};

const $$ManagedCare = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AOSInit", $$AOSInit, {})} ${maybeRenderHead()}<section class="relative w-full min-h-[700px] bg-[#fcf9f0] overflow-hidden mt-0 pt-0"> <!-- Background Image --> <img src="/images/managed-care-hero.webp" alt="Coordinator helping patient on tablet" class="absolute inset-0 w-full h-full object-cover object-center md:object-left" loading="eager"> <!-- Optional Gradient Overlay --> <div class="absolute inset-0 bg-gradient-to-r from-[#fcf9f0]/90 via-white/85 to-transparent z-0"></div> <!-- Content Wrapper --> <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-24 md:py-32 flex flex-col md:flex-row items-center md:items-start"> <div class="w-full md:w-1/2 text-center md:text-left"> <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#003087] mb-6 leading-tight" data-aos="fade-up">
A New Kind of <br class="hidden sm:inline"> Managed Care
</h1> <!-- Rotating Text Block --> <div class="text-2xl sm:text-3xl font-bold mb-6 flex justify-center md:justify-start items-center gap-2 tracking-tight" data-aos="fade-up" data-aos-delay="100"> <span>Built for the</span> <span class="relative h-[40px] w-[12ch] overflow-hidden inline-block"> <span id="rotating-container" class="absolute top-0 left-0 font-extrabold text-[#cc9933]"> <span class="block text-left h-[40px] leading-[40px]">Uninsured</span> <span class="block text-left h-[40px] leading-[40px]">Underinsured</span> <span class="block text-left h-[40px] leading-[40px]">Uninsured</span> </span> </span> </div> <p class="text-lg sm:text-xl text-[#003087] mb-8 max-w-xl" data-aos="fade-up" data-aos-delay="150">
USRad is the first managed care platform focused on ancillary
          services—starting with diagnostic imaging.
</p> <!-- Hero Section CTAs - Mobile Optimized --> <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="200"> <a href="/imaging-center" class="bg-[#cc9933] hover:bg-[#b8862e] text-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all text-center text-base sm:text-lg min-h-[48px] flex items-center justify-center">
Join the Imaging Network
</a> <a href="/about" class="border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all text-center text-base sm:text-lg min-h-[48px] flex items-center justify-center">
Learn About the Model
</a> </div> </div> </div> <!-- Rotating Text Script --> ${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/managed-care.astro?astro&type=script&index=0&lang.ts")} </section>  <section class="py-20 bg-white text-[#003087] px-6 sm:px-12" data-aos="fade-up"> <h2 class="text-3xl font-bold text-center mb-12">
The System Wasn’t Built for Self-Pay Patients
</h2> <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"> <div class="bg-[#f9f5eb] p-6 rounded-xl shadow" data-aos="fade-up" data-aos-delay="100"> <h3 class="text-xl font-semibold mb-4">Traditional Insurance</h3> <ul class="list-disc pl-6 space-y-2"> <li>High deductibles</li> <li>Complex referrals</li> <li>Surprise bills</li> <li>Hospital markups</li> <li>Denials, delays</li> </ul> </div> <div class="bg-[#fefbf5] p-6 rounded-xl border border-[#e6c378]" data-aos="fade-up" data-aos-delay="200"> <h3 class="text-xl font-semibold mb-4">USRad Managed Care</h3> <ul class="list-disc pl-6 space-y-2"> <li>Flat-rate pricing</li> <li>Direct scheduling</li> <li>All-inclusive fees</li> <li>Independent centers</li> <li>Navigation support</li> </ul> </div> </div> </section> <section class="py-20 bg-[#fcf9f0] text-[#003087] px-6 sm:px-12 text-center" data-aos="fade-up"> <h2 class="text-3xl font-bold mb-6">The Coverage Crisis</h2> <p class="max-w-2xl mx-auto mb-10 text-lg">
Over 90 million Americans are either uninsured or underinsured — and the
      number keeps growing. USRad is built to close that gap.
</p> <div class="max-w-5xl mx-auto"> ${renderComponent($$result2, "HealthcareCoverageCrisisGraph", HealthcareCoverageCrisisGraph, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/HealthcareCoverageCrisisGraph.jsx", "client:component-export": "default" })} </div> </section>  <section class="py-16 sm:py-20 bg-[#fcf9f0] text-[#003087] px-4 sm:px-6 lg:px-12" data-aos="fade-up"> <h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
The USRad Platform
</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"> <div class="text-center bg-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="zoom-in" data-aos-delay="100"> <img src="/icons/managed-care/network.png" alt="Network" class="mx-auto h-10 sm:h-12 mb-4"> <h3 class="font-semibold text-lg sm:text-xl mb-2">
Nationwide Credentialed Network
</h3> <p class="text-sm sm:text-base leading-relaxed">
High-field MRI/CT facilities, vetted for quality, licensure, and
          equipment.
</p> </div> <div class="text-center bg-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="zoom-in" data-aos-delay="200"> <img src="/icons/managed-care/pricing.png" alt="Pricing" class="mx-auto h-10 sm:h-12 mb-4"> <h3 class="font-semibold text-lg sm:text-xl mb-2">
Flat-Rate Contracts
</h3> <p class="text-sm sm:text-base leading-relaxed">
Patients pay one pre-negotiated price. No billing games.
</p> </div> <div class="text-center bg-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="zoom-in" data-aos-delay="300"> <img src="/icons/managed-care/radiology.png" alt="Radiologists" class="mx-auto h-10 sm:h-12 mb-4"> <h3 class="font-semibold text-lg sm:text-xl mb-2">
Board-Certified Radiology Reads
</h3> <p class="text-sm sm:text-base leading-relaxed">
Every scan is interpreted by a board-certified radiologist.
</p> </div> </div> </section>  <section class="py-20 bg-gradient-to-br from-[#f5e7c5] to-[#fcf9f0] text-[#003087] px-6 sm:px-12 relative overflow-hidden" data-aos="fade-up"> <!-- Background Elements --> <div class="absolute inset-0 opacity-10"> <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#cc9933]/20 to-transparent"></div> </div> <div class="relative z-10"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold mb-4">
This Isn't Our First Time
</h2> <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
Our founder, Michael Cabrera, built AnciCare PPO into a $20M/year
          specialty network
</p> </div> <!-- Desktop Timeline (Hidden on Mobile) --> <div class="hidden md:block max-w-4xl mx-auto mb-12"> <div class="relative"> <!-- Timeline Line --> <div class="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-[#cc9933] to-[#003087]"></div> <!-- Timeline Items --> <div class="space-y-12"> <!-- AnciCare Success --> <div class="relative" data-aos="fade-right" data-aos-delay="100"> <div class="flex items-center"> <div class="w-1/2 pr-8 text-right"> <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#cc9933]"> <h3 class="text-xl font-bold text-[#003087] mb-3">
AnciCare PPO Success
</h3> <div class="space-y-2 text-sm"> <div class="flex justify-between"> <span>Annual Revenue:</span> <span class="font-bold">$20M+</span> </div> <div class="flex justify-between"> <span>Imaging Centers:</span> <span class="font-bold">1,200+</span> </div> <div class="flex justify-between"> <span>Radiologists:</span> <span class="font-bold">3,000+</span> </div> </div> </div> </div> <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#cc9933] rounded-full border-4 border-white shadow-lg z-10"></div> <div class="w-1/2 pl-8"> <div class="text-sm text-gray-600"> <strong>1994-2002:</strong> Built and scaled comprehensive specialty
                    network
</div> </div> </div> </div> <!-- USRad Launch --> <div class="relative" data-aos="fade-left" data-aos-delay="200"> <div class="flex items-center"> <div class="w-1/2 pr-8 text-right"> <div class="text-sm text-gray-600"> <strong>2025-Present:</strong> Building the future of accessible
                    imaging care
</div> </div> <div class="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#cc9933] to-[#003087] rounded-full border-4 border-white shadow-lg z-10 animate-pulse"></div> <div class="w-1/2 pl-8"> <div class="bg-gradient-to-r from-[#cc9933] to-[#003087] p-6 rounded-xl shadow-lg text-white"> <h3 class="text-xl font-bold mb-3">
USRad Platform Launch
</h3> <p class="text-sm opacity-90">
Leveraging proven experience to build the first managed
                      care platform focused on self-pay imaging
</p> <div class="mt-4 flex justify-start"> <div class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
Current
</div> </div> </div> </div> </div> </div> <!-- Future Service Expansion --> <div class="relative" data-aos="fade-right" data-aos-delay="300"> <div class="flex items-center"> <div class="w-1/2 pr-8 text-right"> <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-400 opacity-75"> <h3 class="text-xl font-bold text-gray-600 mb-3">
Service Portfolio Expansion
</h3> <div class="grid grid-cols-2 gap-2 text-sm text-gray-500"> <div>• Labs & Bloodwork</div> <div>• Mobile Diagnostics</div> <div>• Home Imaging</div> <div>• Physical Therapy</div> <div>• Portable MRI</div> <div>• DME Services</div> </div> <div class="mt-4 flex justify-end"> <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
Planned
</div> </div> </div> </div> <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full border-4 border-white shadow-lg z-10"></div> <div class="w-1/2 pl-8"> <div class="text-sm text-gray-500"> <strong>2027+:</strong> Planned expansion into comprehensive
                    ancillary services
</div> </div> </div> </div> </div> </div> </div> <!-- Mobile Timeline (Visible only on Mobile) --> <div class="md:hidden max-w-2xl mx-auto mb-12"> <div class="relative pl-8"> <!-- Vertical Line --> <div class="absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-[#cc9933] to-gray-400"></div> <!-- Mobile Timeline Items --> <div class="space-y-8"> <!-- AnciCare Success --> <div class="relative" data-aos="fade-up" data-aos-delay="100"> <div class="absolute left-0 w-3 h-3 bg-[#cc9933] rounded-full border-2 border-white shadow-lg transform -translate-x-1/2"></div> <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#cc9933] ml-4"> <div class="text-xs font-semibold text-gray-500 mb-2">
2015-2019
</div> <h3 class="text-lg font-bold text-[#003087] mb-3">
AnciCare PPO Success
</h3> <div class="grid grid-cols-1 gap-2 text-sm"> <div class="flex justify-between"> <span>Annual Revenue:</span> <span class="font-bold">$20M+</span> </div> <div class="flex justify-between"> <span>Imaging Centers:</span> <span class="font-bold">1,200+</span> </div> <div class="flex justify-between"> <span>Radiologists:</span> <span class="font-bold">3,000+</span> </div> </div> </div> </div> <!-- USRad Launch --> <div class="relative" data-aos="fade-up" data-aos-delay="200"> <div class="absolute left-0 w-4 h-4 bg-gradient-to-r from-[#cc9933] to-[#003087] rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 animate-pulse"></div> <div class="bg-gradient-to-r from-[#cc9933] to-[#003087] p-6 rounded-xl shadow-lg text-white ml-4"> <div class="text-xs font-semibold opacity-80 mb-2">
2024-Present
</div> <h3 class="text-lg font-bold mb-3">USRad Platform Launch</h3> <p class="text-sm opacity-90 mb-4">
Leveraging proven experience to build the first managed care
                  platform focused on self-pay imaging
</p> <div class="flex justify-start"> <div class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
Current
</div> </div> </div> </div> <!-- Future Service Expansion --> <div class="relative" data-aos="fade-up" data-aos-delay="300"> <div class="absolute left-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2"></div> <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-400 opacity-75 ml-4"> <div class="text-xs font-semibold text-gray-500 mb-2">
2027+
</div> <h3 class="text-lg font-bold text-gray-600 mb-3">
Service Portfolio Expansion
</h3> <div class="grid grid-cols-1 gap-1 text-sm text-gray-500 mb-4"> <div>• Labs & Bloodwork</div> <div>• Mobile Diagnostics</div> <div>• Home Imaging</div> <div>• Physical Therapy</div> <div>• Portable MRI</div> <div>• DME Services</div> </div> <div class="flex justify-start"> <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
Planned
</div> </div> </div> </div> </div> </div> </div> <!-- Achievement Stats (Mobile-Optimized) --> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"> <div class="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg text-center" data-aos="zoom-in" data-aos-delay="100"> <div class="text-2xl sm:text-3xl font-bold text-[#cc9933] mb-2">
Proven
</div> <div class="text-sm font-medium">Track Record</div> </div> <div class="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg text-center" data-aos="zoom-in" data-aos-delay="200"> <div class="text-2xl sm:text-3xl font-bold text-[#003087] mb-2">
Scaled
</div> <div class="text-sm font-medium">Operations</div> </div> <div class="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg text-center" data-aos="zoom-in" data-aos-delay="300"> <div class="text-2xl sm:text-3xl font-bold text-[#cc9933] mb-2">
Trusted
</div> <div class="text-sm font-medium">Leadership</div> </div> </div> </div> </section>  <section class="py-16 sm:py-20 bg-white text-[#003087] px-4 sm:px-6 lg:px-12" data-aos="fade-up"> <h2 class="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
Designed to Serve Millions. Priced to Scale.
</h2> <p class="text-center text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
Centers benefit from increased utilization with no billing friction. <br class="hidden sm:block">
Patients avoid opaque hospital systems entirely.
</p> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"> <div class="text-center bg-gradient-to-br from-[#fcf9f0] to-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="100"> <h3 class="text-3xl sm:text-4xl font-extrabold text-[#cc9933] mb-2" id="counter-1">
90M+
</h3> <p class="text-sm sm:text-base font-medium">Uninsured & Underinsured</p> </div> <div class="text-center bg-gradient-to-br from-[#fcf9f0] to-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200"> <h3 class="text-3xl sm:text-4xl font-extrabold text-[#003087] mb-2" id="counter-2">
1M+ Scans/Year
</h3> <p class="text-sm sm:text-base font-medium">Platform capacity</p> </div> <div class="text-center bg-gradient-to-br from-[#fcf9f0] to-white p-6 sm:p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300"> <h3 class="text-3xl sm:text-4xl font-extrabold text-[#cc9933] mb-2" id="counter-3">
50 States
</h3> <p class="text-sm sm:text-base font-medium">Credentialed coverage</p> </div> </div> </section>  ${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/managed-care.astro?astro&type=script&index=1&lang.ts")}  <section class="py-16 bg-[#fefbf5] text-[#003087] px-6 sm:px-12 text-center" data-aos="fade-in"> <p class="text-xl max-w-4xl mx-auto font-medium"> <strong>USRad earns margin on efficiency</strong>—not denial or volume.
      Our platform replaces billing complexity and insurance friction with
      speed, scale, and clarity.
</p> </section>  <section class="py-16 sm:py-20 bg-[#003087] text-white px-4 sm:px-6 text-center" id="partner" data-aos="fade-up"> <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
Let's Build the Future of Care
</h2> <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto"> <a href="/locations" class="bg-[#cc9933] hover:bg-[#b8862e] px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg">
Find a Location
</a> <a href="/imaging-center" class="bg-white text-[#003087] hover:bg-[#003087] hover:text-white border-2 border-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg">
Join Our Network
</a> <a href="/contact" class="bg-white text-[#003087] hover:bg-[#003087] hover:text-white border-2 border-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg">
Schedule a Call
</a> </div> </section> ${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/managed-care.astro?astro&type=script&index=2&lang.ts")} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/managed-care.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/managed-care.astro";
const $$url = "/managed-care";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ManagedCare,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
