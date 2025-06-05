/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_gZIsqg2i.mjs';
import { v as validateAuthSession, A as AuthService } from '../../chunks/auth_C63G2fu-.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 animate-pulse", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: `${i * 0.1}s` }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl" }),
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-12" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-1" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-2" })
  ] }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: `${0.5 + i * 0.1}s` }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-16" }),
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mx-auto mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mx-auto" })
    ] }) })
  ] }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.7s" }, children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "metric-item", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: `bg-gradient-to-r ${i === 0 ? "from-blue-200 to-blue-300" : i === 1 ? "from-yellow-200 to-yellow-300" : i === 2 ? "from-green-200 to-green-300" : "from-purple-200 to-purple-300"} h-2 rounded-full`, style: { width: `${Math.random() * 60 + 20}%` } }) }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mt-1" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.8s" }, children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: `bg-gradient-to-r ${i === 0 ? "from-green-200 to-green-300" : i === 1 ? "from-blue-200 to-blue-300" : i === 2 ? "from-yellow-200 to-yellow-300" : "from-orange-200 to-orange-300"} h-3 rounded-full`, style: { width: `${Math.random() * 60 + 30}%` } }) }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-1" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.9s" }, children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 mb-6" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-12 mx-auto mb-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mx-auto mb-1" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-green-200 to-green-300 rounded w-20 mx-auto" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-green-200 to-green-300 rounded w-8 mx-auto mb-1" }),
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mx-auto" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-yellow-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded w-6 mx-auto mb-1" }),
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mx-auto" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" })
        ] }, i)) })
      ] })
    ] })
  ] })
] });
const AnalyticsContent = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 animate-fade-in-up", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold usrad-navy mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Detailed insights and performance metrics for your imaging center" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
      /* @__PURE__ */ jsxs("select", { className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [
        /* @__PURE__ */ jsx("option", { children: "Last 30 Days" }),
        /* @__PURE__ */ jsx("option", { children: "Last 7 Days" }),
        /* @__PURE__ */ jsx("option", { children: "Last 90 Days" }),
        /* @__PURE__ */ jsx("option", { children: "This Year" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "px-4 py-2 usrad-gradient-navy text-white rounded-lg hover:shadow-lg transition-all duration-300", children: "Export Report" })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-navy rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold", children: "+23%" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy mb-1", children: "124" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Total Appointments" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "vs last month" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.2s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-gold rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold", children: "+15%" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy mb-1", children: "$47,500" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Revenue" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "vs last month" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.3s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold", children: "+5%" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy mb-1", children: "96%" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Completion Rate" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "vs last month" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.4s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold", children: "+0.2" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy mb-1", children: "4.8" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Patient Satisfaction" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "out of 5.0" })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.5s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Revenue Trend" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx("button", { className: "px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full", children: "Monthly" }),
          /* @__PURE__ */ jsx("button", { className: "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full", children: "Weekly" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 usrad-gradient-navy rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: "Interactive Revenue Chart" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Chart.js integration coming soon" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.6s" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Appointment Trends" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx("button", { className: "px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full", children: "Daily" }),
          /* @__PURE__ */ jsx("button", { className: "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full", children: "Weekly" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 usrad-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-medium", children: "Appointment Trend Analysis" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Real-time data visualization" })
      ] }) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.7s" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "'Manrope', sans-serif" }, children: "Scan Type Breakdown" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "metric-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Brain MRI" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "32%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-navy h-2 rounded-full", style: { width: "32%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "40 scans this month" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "metric-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Spine MRI" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "28%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-2 rounded-full", style: { width: "28%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "35 scans this month" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "metric-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Knee MRI" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "22%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full", style: { width: "22%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "27 scans this month" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "metric-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: "Other" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "18%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full", style: { width: "18%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "22 scans this month" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "'Manrope', sans-serif" }, children: "Performance Metrics" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Average Scan Time" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "28 min" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full", style: { width: "75%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Target: 30 min" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Equipment Utilization" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "84%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-navy h-3 rounded-full", style: { width: "84%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Optimal range: 80-90%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Patient Wait Time" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "12 min" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-3 rounded-full", style: { width: "60%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Target: < 15 min" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "No-Show Rate" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold usrad-navy", children: "8%" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full", style: { width: "8%" } }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Industry avg: 12%" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.9s" }, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "'Manrope', sans-serif" }, children: "Monthly Summary" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold usrad-navy", children: "124" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Total Appointments" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-600 mt-1", children: "↑ 23% from last month" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-green-700", children: "96%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Completed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-3 bg-yellow-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-yellow-700", children: "4%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Cancelled" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "Best Day" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "Wednesday" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "Peak Hours" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "10 AM - 2 PM" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: "Avg Revenue/Day" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "$1,583" })
          ] })
        ] })
      ] })
    ] })
  ] })
] });
const SkeletonAnalyticsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
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

        .usrad-navy {
          color: #003087;
        }
        .usrad-gold {
          color: #cc9933;
        }
        .bg-usrad-navy {
          background-color: #003087;
        }
        .bg-usrad-gold {
          background-color: #cc9933;
        }

        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }

        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
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

        .chart-container {
          height: 400px;
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #cbd5e1;
        }

        .metric-item {
          padding: 20px;
          border-radius: 12px;
          background: white;
          border: 1px solid rgba(0, 48, 135, 0.05);
          transition: all 0.3s ease;
        }

        .metric-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
    isLoading ? /* @__PURE__ */ jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsx(AnalyticsContent, {})
  ] });
};

const $$Astro = createAstro();
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Analytics;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  const dashboardData = await AuthService.getUserDashboardData(user.id);
  const { imagingCenter } = dashboardData;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Analytics", "user": user, "imagingCenter": imagingCenter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonAnalyticsSystem", SkeletonAnalyticsSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/SkeletonAnalyticsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/analytics.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/analytics.astro";
const $$url = "/dashboard/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
