/* empty css                                 */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../chunks/DashboardLayout_gZIsqg2i.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { v as validateAuthSession, A as AuthService } from '../chunks/auth_C63G2fu-.mjs';
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
      /* @__PURE__ */ jsx("div", { className: "w-15 h-15 bg-gray-200 rounded-2xl animate-pulse" }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded w-16 mb-2 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-20 animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-24 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-20 animate-pulse" })
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
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-20 animate-pulse" })
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
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-200 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-20 animate-pulse" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20 animate-pulse" })
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

      .usrad-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 48, 135, 0.08);
        transition: all 0.3s ease;
      }
    ` })
] });
const SkeletonProviderDashboardSystem = ({ user, imagingCenter, mockData, fullyOnboarded }) => {
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

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
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
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold mb-3", style: { fontFamily: "Manrope, sans-serif" }, children: [
          "Good ",
          (/* @__PURE__ */ new Date()).getHours() < 12 ? "Morning" : (/* @__PURE__ */ new Date()).getHours() < 18 ? "Afternoon" : "Evening",
          ",",
          user?.firstName || "Doctor",
          "! 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl mb-6", style: { fontFamily: "Manrope, sans-serif" }, children: imagingCenter ? `Managing ${imagingCenter.name}` : "Welcome to your USRad dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-green-400 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-100 font-medium", children: "All systems operational" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-blue-100", children: [
            "Last updated: ",
            (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          ] })
        ] })
      ] })
    ] }),
    !fullyOnboarded && /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-yellow-600 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-yellow-800", children: "Complete your onboarding" }),
          /* @__PURE__ */ jsx("p", { className: "text-yellow-700 text-sm", children: "Finish setting up your provider account to start receiving referrals" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/dashboard/onboarding", className: "px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors", children: "Continue Setup →" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "stat-icon usrad-gradient-navy", children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", style: { width: "28px", height: "28px" }, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", style: { fontFamily: "Manrope, sans-serif" }, children: mockData?.todayAppointments || 8 }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Today's Scans" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold", children: "+12% vs yesterday" }),
          /* @__PURE__ */ jsx("a", { href: "/dashboard/appointments", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Schedule →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.2s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "stat-icon", style: { background: "linear-gradient(135deg, #10b981, #059669)" }, children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", style: { width: "28px", height: "28px" }, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", style: { fontFamily: "Manrope, sans-serif" }, children: mockData?.totalAppointments || 124 }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "This Month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold", children: "+18% vs last month" }),
          /* @__PURE__ */ jsx("a", { href: "/dashboard/analytics", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Trends →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.3s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "stat-icon usrad-gradient-gold", children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", style: { width: "28px", height: "28px" }, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-gray-900", style: { fontFamily: "Manrope, sans-serif" }, children: mockData?.completedScans || 98 }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm bg-blue-50 px-3 py-2 rounded-full font-semibold usrad-navy", children: [
            Math.round((mockData?.completedScans || 98) / (mockData?.totalAppointments || 124) * 100),
            "% completion rate"
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/dashboard/reports", className: "text-sm font-semibold usrad-gold hover:text-yellow-600 transition-colors", children: "View Reports →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.4s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "stat-icon", style: { background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }, children: /* @__PURE__ */ jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", style: { width: "28px", height: "28px" }, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-gray-900", style: { fontFamily: "Manrope, sans-serif" }, children: [
              "$",
              ((mockData?.totalRevenue || 47500) / 1e3).toFixed(0),
              "K"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600 font-medium", children: "This Month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold", children: "+8% vs last month" }),
          /* @__PURE__ */ jsx("a", { href: "/dashboard/analytics", className: "text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors", children: "View Details →" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.5s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy", style: { fontFamily: "Manrope, sans-serif" }, children: "Today's Schedule" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-1", children: [
              "Managing ",
              mockData?.todayAppointments || 8,
              " appointments today"
            ] })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/dashboard/appointments", className: "px-6 py-3 usrad-gradient-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300", style: { fontFamily: "Manrope, sans-serif" }, children: "View All" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-20 h-20 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white font-bold shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", style: { fontFamily: "Manrope, sans-serif" }, children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "9:30" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-80", children: "AM" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", style: { fontFamily: "Manrope, sans-serif" }, children: "Sarah Johnson" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
                  "Brain MRI"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  "45 mins"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold", children: "With Contrast" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold", children: "Confirmed" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-purple-50 to-transparent rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg", style: { background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }, children: /* @__PURE__ */ jsxs("div", { className: "text-center", style: { fontFamily: "Manrope, sans-serif" }, children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "11:15" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-80", children: "AM" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", style: { fontFamily: "Manrope, sans-serif" }, children: "Michael Chen" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
                  "Knee MRI"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  "30 mins"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold", children: "No Contrast" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold", children: "In Progress" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center p-6 bg-gradient-to-r from-yellow-50 to-transparent rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-20 h-20 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white font-bold shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", style: { fontFamily: "Manrope, sans-serif" }, children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: "2:00" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-80", children: "PM" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-2", style: { fontFamily: "Manrope, sans-serif" }, children: "Emma Rodriguez" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
                  "Spine MRI"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center font-medium", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  "60 mins"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold", children: "With Contrast" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold", children: "Upcoming" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.6s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "Manrope, sans-serif" }, children: "Quick Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => window.location.href = "/dashboard/appointments",
                className: "w-full usrad-gradient-navy text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg",
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", style: { fontFamily: "Manrope, sans-serif" }, children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
                  "Schedule Appointment"
                ] })
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => window.location.href = "/dashboard/patients",
                className: "w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }) }),
                  /* @__PURE__ */ jsx("span", { style: { fontFamily: "Manrope, sans-serif" }, children: "Add New Patient" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => window.location.href = "/dashboard/reports",
                className: "w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 font-semibold",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                  /* @__PURE__ */ jsx("span", { style: { fontFamily: "Manrope, sans-serif" }, children: "Generate Report" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.7s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "Manrope, sans-serif" }, children: "System Status" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", style: { fontFamily: "Manrope, sans-serif" }, children: "MRI Scanner" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm", children: "Operational" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", style: { fontFamily: "Manrope, sans-serif" }, children: "PACS System" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm", children: "Online" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-yellow-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", style: { fontFamily: "Manrope, sans-serif" }, children: "Backup System" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-yellow-600 font-semibold bg-yellow-50 px-3 py-1 rounded-full text-sm", children: "Syncing" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.8s" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-6", style: { fontFamily: "Manrope, sans-serif" }, children: "Today's Performance" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Average Scan Time" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: mockData?.avgScanTime || "28 min" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000", style: { width: "75%" } }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Patient Satisfaction" }),
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-900", children: [
                  mockData?.patientSatisfaction || "4.8",
                  "/5.0"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-3 rounded-full transition-all duration-1000", style: { width: "96%" } }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600 font-medium", children: "Equipment Utilization" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: "84%" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-navy h-3 rounded-full transition-all duration-1000", style: { width: "84%" } }) })
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
    return Astro2.redirect("/login/imaginglogin");
  }
  const dashboardData = await AuthService.getUserDashboardData(user.id);
  const { imagingCenter, stats } = dashboardData;
  const fullyOnboarded = false;
  const mockData = {
    todayAppointments: stats?.todayAppointments || 8,
    totalAppointments: stats?.totalAppointments || 124,
    completedScans: stats?.completedAppointments || 98,
    totalRevenue: stats?.totalRevenue || 47500,
    pendingReports: 12,
    avgScanTime: "28 min",
    patientSatisfaction: 4.8,
    equipmentStatus: "Operational"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Dashboard Overview", "user": user, "imagingCenter": imagingCenter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonProviderDashboardSystem", SkeletonProviderDashboardSystem, { "client:load": true, "user": user, "imagingCenter": imagingCenter, "mockData": mockData, "fullyOnboarded": fullyOnboarded, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/SkeletonProviderDashboardSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
