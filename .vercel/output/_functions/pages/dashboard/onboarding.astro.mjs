/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_gZIsqg2i.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 usrad-gradient-navy relative overflow-hidden animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 bg-white/20 rounded-lg w-64 mb-3" }),
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-white/15 rounded w-96 mb-6" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-white/20 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/15 rounded w-48" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/15 rounded w-32" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-pulse", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded w-16 mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-4 mb-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-200 to-green-300 h-4 rounded-full w-1/5" }) }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 animate-pulse", style: { animationDelay: `${0.2 + i * 0.1}s` }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full mr-4 ${i === 0 ? "bg-gradient-to-r from-green-200 to-green-300" : i === 1 ? "bg-gradient-to-r from-blue-200 to-blue-300" : "bg-gradient-to-r from-gray-200 to-gray-300"}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [...Array(3)].map((_2, j) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mr-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" })
      ] }, j)) })
    ] })
  ] }) }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32" }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg w-24" })
    ] })
  ] }) })
] });
const OnboardingContent = () => {
  const onboardingStatus = {
    facilities: { completed: false, completedDate: null, status: "pending" },
    psa: { completed: false, completedDate: null, status: "locked" },
    caqh: { completed: false, completedDate: null, status: "locked" },
    banking: { completed: false, completedDate: null, status: "locked" },
    welcome: { completed: false, completedDate: null, status: "locked" }
  };
  const steps = Object.values(onboardingStatus);
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round(completedSteps / totalSteps * 100);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", style: { fontFamily: "'Manrope', sans-serif" }, children: "Welcome to USRad! 🎉" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl mb-6", style: { fontFamily: "'Manrope', sans-serif" }, children: "Let's get you onboarded to start providing diagnostic imaging services in our network." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-blue-400 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-100 font-medium", children: "Your onboarding is in progress" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-blue-100", children: [
            completedSteps,
            " of ",
            totalSteps,
            " steps completed"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Onboarding Progress" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Complete all steps to activate your provider account" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold usrad-gold", style: { fontFamily: "'Manrope', sans-serif" }, children: [
            progressPercentage,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Complete" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-4 mb-4", children: /* @__PURE__ */ jsx("div", { className: "progress-bar h-4 rounded-full bg-gradient-to-r from-green-400 to-green-500", style: { width: `${progressPercentage}%` } }) }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: completedSteps === totalSteps ? "🎉 Congratulations! Your onboarding is complete." : `${totalSteps - completedSteps} step${totalSteps - completedSteps !== 1 ? "s" : ""} remaining` })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "usrad-card p-8 step-card active animate-fade-in-up cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-300",
          style: { animationDelay: "0.2s" },
          onClick: () => window.location.href = "/dashboard/onboarding/facilities",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "step-number bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "1" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Facility Locations Setup" }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 opacity-90", children: "Add all imaging center locations that will be included in your Provider Service Agreement." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm opacity-80", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }),
                  "Support for 1 to 1000+ locations"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }),
                  "Bulk CSV upload available"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  "Est. 5-15 minutes"
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 step-card locked animate-fade-in-up cursor-not-allowed", style: { animationDelay: "0.3s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "step-number bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center mr-4", children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "2" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Provider Service Agreement" }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 opacity-90", children: "Review and digitally sign your PSA with all facility locations included." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm opacity-80", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) }),
              "100% Medicare rates"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Includes your facility locations"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Est. 5-10 minutes"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm opacity-60", children: "🔒 Complete facility setup first" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.6s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Need Help?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Our onboarding team is here to assist you every step of the way." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ jsx("button", { className: "px-6 py-3 usrad-gradient-navy text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300", children: "Email Support" }),
        /* @__PURE__ */ jsx("button", { className: "px-6 py-3 border-2 border-usrad-gold text-usrad-gold font-semibold rounded-lg hover:bg-usrad-gold hover:text-white transition-all duration-300", children: "Call Us" })
      ] })
    ] }) })
  ] });
};
const SkeletonOnboardingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }

        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .bg-usrad-navy { background-color: #003087; }
        .bg-usrad-gold { background-color: #cc9933; }

        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }

        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
        }

        .step-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .step-card.completed {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .step-card.active {
          background: linear-gradient(135deg, #003087, #001a4d);
          color: white;
        }

        .step-card.locked {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .step-card.locked:hover {
          transform: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-pulse {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
          background-size: 200px;
        }
      ` }),
    isLoading ? /* @__PURE__ */ jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsx(OnboardingContent, {})
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Provider Onboarding", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonOnboardingSystem", SkeletonOnboardingSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/SkeletonOnboardingSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/index.astro";
const $$url = "/dashboard/onboarding";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
