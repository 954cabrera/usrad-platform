/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Plus, CreditCard, Download, Settings } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-64 mb-3 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-80 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-300 rounded-lg w-40 animate-pulse" })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-16 mx-auto mb-2 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse" })
  ] }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsx("div", { className: "p-4 border-2 border-gray-200 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-200 rounded animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-32 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded w-16 animate-pulse" })
    ] }) }, i)) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-40 mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-lg animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-32 mb-1 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-20 animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-16 mb-1 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-12 animate-pulse" })
      ] })
    ] }, i)) })
  ] }),
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
const SkeletonBillingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }
        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
        .usrad-gradient-gold { background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%); }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Billing & Payments" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "Manage your payments and track your healthcare savings" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2 inline" }),
          "Add Payment Method"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "$2,340" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Total Saved" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "vs. hospital pricing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-navy mb-2", children: "$890" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "This Year" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Total spent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-gold mb-2", children: "3" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Transactions" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Completed payments" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-600 mb-2", children: "$0" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Outstanding" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Current balance" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Payment Methods" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-2 border-blue-200 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-8 h-8 text-blue-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "•••• •••• •••• 4532" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Visa - Primary" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold", children: "Active" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 border-2 border-gray-200 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-8 h-8 text-gray-400" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "HSA Account" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Health Savings" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-800 font-semibold", children: "Connect" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "mt-4 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 mx-auto mb-2" }),
        "Add New Payment Method"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy", children: "Recent Transactions" }),
        /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-800 font-semibold", children: "View All" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { id: 1, type: "Brain MRI", provider: "Miami Lakes Medical", amount: 450, date: "2024-11-28", saved: 1200, status: "Paid" },
        { id: 2, type: "Knee MRI", provider: "South Beach Radiology", amount: 520, date: "2024-11-08", saved: 890, status: "Paid" },
        { id: 3, type: "X-Ray Series", provider: "Downtown Medical", amount: 120, date: "2024-10-15", saved: 320, status: "Paid" }
      ].map((transaction) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 usrad-gradient-navy rounded-lg flex items-center justify-center text-white font-bold", children: "💳" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: transaction.type }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
              transaction.provider,
              " • ",
              transaction.date
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-bold", children: [
            "$",
            transaction.amount
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-green-600", children: [
            "Saved $",
            transaction.saved
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold", children: transaction.status }),
          /* @__PURE__ */ jsx("button", { className: "p-2 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }) })
        ] })
      ] }, transaction.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Your Savings vs. Hospital Pricing" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600", children: "$2,340" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Total Savings This Year" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-gray-900", children: "$890" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Amount You Paid" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full", style: { width: "72%" } }) }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-2 text-sm text-gray-600", children: "You saved 72% compared to average hospital pricing" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Auto-Pay Settings" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6 text-blue-600" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Automatic Payments" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Pay appointments automatically after completion" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", className: "w-5 h-5 text-blue-600 rounded" }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 font-medium", children: "Enable" })
        ] })
      ] })
    ] })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Billing", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonBillingSystem", SkeletonBillingSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonBillingSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/billing/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/billing/index.astro";
const $$url = "/patient-dashboard/billing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
