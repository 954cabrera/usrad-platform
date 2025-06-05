/* empty css                                 */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { v as validateAuthSession } from '../chunks/auth_C63G2fu-.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, FileText, Users } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-gray-300/20 rounded-full translate-y-24 -translate-x-24" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-2/3 mb-3 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded-lg w-1/2 mb-6 animate-pulse" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-300 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-32 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-24 animate-pulse" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded-2xl animate-pulse" }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded w-16 mb-2 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-20 animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-24 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-16 animate-pulse" })
    ] })
  ] }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 usrad-card p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-64 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-24 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gray-50 rounded-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 mb-2 animate-pulse" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-24 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-20 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-28 animate-pulse" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20 animate-pulse" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg animate-pulse" }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-40 mb-6 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-24 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-16 animate-pulse" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-300 h-3 rounded-full w-3/4 animate-pulse" }) })
        ] }, i)) })
      ] })
    ] })
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
const SkeletonDashboardSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1e3);
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
        .bg-usrad-navy { background-color: #003087; }
        .bg-usrad-gold { background-color: #cc9933; }
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
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold mb-3", children: [
          "Good ",
          (/* @__PURE__ */ new Date()).getHours() < 12 ? "Morning" : (/* @__PURE__ */ new Date()).getHours() < 18 ? "Afternoon" : "Evening",
          ", Sarah! 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl mb-6", children: "Welcome back to your health journey dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-green-400 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-100 font-medium", children: "All systems healthy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-blue-100", children: [
            "Last updated: ",
            (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Calendar, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", children: "Dec 15" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Next Scan" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm bg-blue-50 px-3 py-2 rounded-full font-semibold usrad-navy", children: "Brain MRI - 2:30 PM" }),
          /* @__PURE__ */ jsx("a", { href: "/patient-dashboard/appointments", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Details →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.2s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", children: "$2,340" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Total Saved" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold", children: "vs. Hospital Pricing" }),
          /* @__PURE__ */ jsx("a", { href: "/patient-dashboard/billing", className: "text-sm font-semibold usrad-gold hover:text-yellow-600 transition-colors", children: "View Savings →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.3s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", children: "8.7" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Health Score" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm bg-yellow-50 px-3 py-2 rounded-full font-semibold usrad-gold", children: "Excellent Progress" }),
          /* @__PURE__ */ jsx("a", { href: "/patient-dashboard/profile", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Profile →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.4s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", children: "12" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm bg-purple-50 px-3 py-2 rounded-full font-semibold text-purple-700", children: "All Reports Ready" }),
          /* @__PURE__ */ jsx("a", { href: "/patient-dashboard/reports", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Reports →" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.5s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy", children: "Your Health Journey" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Recent appointments and upcoming care" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/patient-dashboard/appointments", className: "px-6 py-3 usrad-gradient-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300", children: "View All" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-green-50 to-transparent rounded-2xl border border-green-100", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white font-bold", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-80", children: "Done" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Knee MRI Completed" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "📍 Coral Gables Imaging" }),
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "💰 Saved $890" }),
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "📄 Report Ready" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold", children: "Completed" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border border-blue-100", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white font-bold", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "Dec" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "15" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Brain MRI with Contrast" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "📍 Miami Lakes Medical" }),
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "⏰ 2:30 PM" }),
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "💰 Save $1,200" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold", children: "Upcoming" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-purple-50 to-transparent rounded-2xl border border-purple-100", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "2/5" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-80", children: "Refs" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Referral Rewards Progress" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "🎯 3 more for $100 credit" }),
                /* @__PURE__ */ jsx("span", { className: "flex items-center font-medium", children: "⭐ Bronze Member" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold", children: "Active" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.6s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", children: "Quick Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("button", { className: "w-full usrad-gradient-navy text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 mr-3" }),
              "Book New Scan"
            ] }) }),
            /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 mr-3" }),
              "View Reports"
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 font-semibold", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 mr-3" }),
              "Refer Friends"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.7s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", children: "Health Progress" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Profile Completion" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: "85%" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full", style: { width: "85%" } }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Referral Progress" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: "2/5" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-3 rounded-full", style: { width: "40%" } }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Health Score" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: "8.7/10" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-navy h-3 rounded-full", style: { width: "87%" } }) })
            ] })
          ] })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Dashboard Overview", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonDashboardSystem", SkeletonDashboardSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonDashboardSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/index.astro";
const $$url = "/patient-dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
