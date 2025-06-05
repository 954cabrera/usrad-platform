/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Search, HelpCircle, Download, CheckCircle, Clock } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-64 mx-auto mb-3 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-80 mx-auto animate-pulse" })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 mx-auto mb-2 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-40 mx-auto mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-full animate-pulse" })
  ] }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-48 mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg mb-6 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "p-4 border border-gray-200 rounded-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full animate-pulse" })
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
const SkeletonSupportSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const faqs = [
    {
      question: "How do I prepare for my MRI scan?",
      answer: "Remove all metal objects, inform us of any implants, and follow fasting instructions if required. Arrive 15 minutes early."
    },
    {
      question: "When will my results be available?",
      answer: "Most results are available within 24-48 hours. You'll receive an email notification when your report is ready."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule up to 24 hours before your appointment through your dashboard or by calling us."
    },
    {
      question: "Do you accept my insurance?",
      answer: "We work with most major insurance providers. Check your specific coverage in the billing section of your dashboard."
    }
  ];
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
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Help & Support Center" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "We're here to help with any questions about your imaging experience" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6 text-green-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-2", children: "Live Chat" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Get instant help from our support team" }),
        /* @__PURE__ */ jsxs("button", { className: "w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse" }),
          "Chat Now - We're Online"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Average response: 30 seconds" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-2", children: "Phone Support" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Speak directly with a patient advocate" }),
        /* @__PURE__ */ jsx("button", { className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors", children: "Call (305) 555-USRAD" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Mon-Fri 8AM-8PM, Sat 9AM-5PM" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-purple-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-2", children: "Email Support" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Send us a detailed message" }),
        /* @__PURE__ */ jsx("button", { className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors", children: "Send Email" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Response within 2 hours" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search for answers...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsx("div", { className: "p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: faq.question }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: faq.answer })
        ] })
      ] }) }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-4", children: "Helpful Resources" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          "Patient Preparation Guide",
          "Insurance Coverage Information",
          "Appointment Scheduling Help",
          "Understanding Your Results",
          "Payment Options & Billing"
        ].map((resource, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: resource }),
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-blue-600" })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-4", children: "System Status" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
              /* @__PURE__ */ jsx("span", { children: "Booking System" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold", children: "Operational" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }),
              /* @__PURE__ */ jsx("span", { children: "Report Access" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold", children: "Operational" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-yellow-600" }),
              /* @__PURE__ */ jsx("span", { children: "Payment Processing" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-600 font-semibold", children: "Maintenance" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-4", children: "Last updated: 2 minutes ago" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 bg-red-50 border-2 border-red-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-red-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-red-600 font-bold", children: "!" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-red-900", children: "Medical Emergency" }),
        /* @__PURE__ */ jsx("p", { className: "text-red-800 text-sm", children: "For medical emergencies, call 911 immediately. This platform is for scheduling and support only." })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Support", "user": user }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "SkeletonSupportSystem", SkeletonSupportSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonSupportSystem", "client:component-export": "default" })}  ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/support/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/support/index.astro";
const $$url = "/patient-dashboard/support";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
