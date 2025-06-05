/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
  /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl p-8 mb-8 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-2/3 mx-auto mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded-lg w-1/2 mx-auto animate-pulse" })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8 mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-24 mb-3 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-xl border-2 border-gray-300 animate-pulse" })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-100 rounded-xl border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-16 mx-auto mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-32 mx-auto mb-1 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse" })
    ] }) }, i)) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-64 mx-auto mb-8 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 mx-auto mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse" })
    ] }, i)) })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-2xl p-8 border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded mx-auto mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-80 mx-auto mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-20 mx-auto animate-pulse" })
    ] }, i)) })
  ] }) }),
  /* @__PURE__ */ jsx("style", { jsx: true, children: `
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
    ` })
] });
const SkeletonBookingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProcedure, setSelectedProcedure] = useState("MRI without Contrast");
  const [location, setLocation] = useState("Los Angeles, CA");
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  const searchCenters = () => {
    alert(`🚀 Searching for ${selectedProcedure} centers near ${location}${selectedDate ? ` on ${selectedDate}` : ""}...

Advanced booking system with real provider data coming soon!

This will show:
• Real-time availability
• Transparent pricing
• Instant booking
• Provider details`);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Book Your Medical Imaging" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100", children: "Find the perfect imaging center with transparent pricing and instant booking" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Procedure Type" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedProcedure,
              onChange: (e) => setSelectedProcedure(e.target.value),
              className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white",
              children: [
                /* @__PURE__ */ jsx("option", { children: "MRI without Contrast" }),
                /* @__PURE__ */ jsx("option", { children: "MRI with Contrast" }),
                /* @__PURE__ */ jsx("option", { children: "CT Scan" }),
                /* @__PURE__ */ jsx("option", { children: "Ultrasound" }),
                /* @__PURE__ */ jsx("option", { children: "X-Ray" }),
                /* @__PURE__ */ jsx("option", { children: "Mammography" }),
                /* @__PURE__ */ jsx("option", { children: "DEXA Scan" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Location" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "City, State or ZIP Code",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                className: "w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Preferred Date" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: selectedDate,
                onChange: (e) => setSelectedDate(e.target.value),
                className: "w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Find Centers" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: searchCenters,
              className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 inline mr-2" }),
                "Search Now"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "65%" }),
          /* @__PURE__ */ jsx("div", { className: "text-green-700 font-medium", children: "Average Savings vs Hospitals" }),
          /* @__PURE__ */ jsx("div", { className: "text-green-600 text-sm mt-1", children: "Save $800+ on typical MRI" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-blue-600 mb-2", children: "500+" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-700 font-medium", children: "Certified Imaging Centers" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-600 text-sm mt-1", children: "All ACR accredited facilities" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-600 mb-2", children: "24hrs" }),
          /* @__PURE__ */ jsx("div", { className: "text-purple-700 font-medium", children: "Average Scheduling Time" }),
          /* @__PURE__ */ jsx("div", { className: "text-purple-600 text-sm mt-1", children: "Most appointments same week" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 text-center mb-8", children: "How USRad Booking Works" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-blue-600", children: "1" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Search & Compare" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Find imaging centers near you with transparent pricing and real-time availability" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-green-600", children: "2" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Book Instantly" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Select your preferred time slot and complete your booking in minutes" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-purple-600", children: "3" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Get Your Scan" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Arrive with your physician's order and receive high-quality imaging" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "🚀" }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Advanced Booking Features Coming Soon" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 max-w-2xl mx-auto", children: "We're building the most advanced imaging booking platform with real-time provider availability, detailed facility profiles, instant confirmations, and integrated payment processing." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-2", children: "📅" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: "Real-time Availability" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-2", children: "🏥" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: "Provider Profiles" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-2", children: "💳" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: "Instant Payment" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-2", children: "📱" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: "Mobile Optimized" })
        ] })
      ] })
    ] }) })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/patientlogin");
  }
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Book Imaging", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonBookingSystem", SkeletonBookingSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonBookingSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/booking/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/booking/index.astro";
const $$url = "/patient-dashboard/booking";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
