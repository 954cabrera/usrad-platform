/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Share, Search, Eye, Download, Shield } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-64 mb-3 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-80 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-300 rounded-lg w-40 animate-pulse" })
    ] }) })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-12 mx-auto mb-2 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse" })
  ] }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg animate-pulse" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg w-32 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg w-28 animate-pulse" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-xl animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 mb-2 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-24 animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-16 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-20 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-20 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-24 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-18 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-16 animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((j) => /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-20 animate-pulse" }, j)) })
  ] }, i)) }),
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
const SkeletonReportsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const reports = [
    {
      id: 1,
      type: "MRI",
      title: "Brain MRI with Contrast",
      date: "2024-11-28",
      provider: "Miami Lakes Medical Center",
      status: "Ready",
      size: "2.4 MB",
      shared: false,
      downloadCount: 2
    },
    {
      id: 2,
      type: "CT",
      title: "Chest CT Scan",
      date: "2024-11-15",
      provider: "Coral Gables Imaging",
      status: "Ready",
      size: "1.8 MB",
      shared: true,
      downloadCount: 5
    },
    {
      id: 3,
      type: "MRI",
      title: "Knee MRI without Contrast",
      date: "2024-10-22",
      provider: "South Beach Radiology",
      status: "Ready",
      size: "3.1 MB",
      shared: true,
      downloadCount: 3
    },
    {
      id: 4,
      type: "X-Ray",
      title: "Lower Back X-Ray Series",
      date: "2024-10-08",
      provider: "Downtown Medical Imaging",
      status: "Ready",
      size: "890 KB",
      shared: false,
      downloadCount: 1
    }
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "MRI":
        return "🧠";
      case "CT":
        return "🫁";
      case "X-Ray":
        return "🦴";
      case "Ultrasound":
        return "❤️";
      default:
        return "📄";
    }
  };
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
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Medical Reports & Imaging" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "Secure access to all your medical imaging reports and results" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center", children: [
          /* @__PURE__ */ jsx(Share, { className: "w-5 h-5 mr-2" }),
          "Share Reports"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-navy mb-2", children: "12" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Total Reports" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "All imaging results" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: "11" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Ready" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Available for download" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-gold mb-2", children: "3" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Shared" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "With healthcare providers" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-600 mb-2", children: "8.2" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "MB Total" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Storage used" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search reports by type, provider, or date...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filterType,
            onChange: (e) => setFilterType(e.target.value),
            className: "px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors",
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "All Types" }),
              /* @__PURE__ */ jsx("option", { value: "mri", children: "MRI" }),
              /* @__PURE__ */ jsx("option", { value: "ct", children: "CT Scan" }),
              /* @__PURE__ */ jsx("option", { value: "xray", children: "X-Ray" }),
              /* @__PURE__ */ jsx("option", { value: "ultrasound", children: "Ultrasound" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: sortBy,
            onChange: (e) => setSortBy(e.target.value),
            className: "px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors",
            children: [
              /* @__PURE__ */ jsx("option", { value: "date", children: "Latest First" }),
              /* @__PURE__ */ jsx("option", { value: "type", children: "By Type" }),
              /* @__PURE__ */ jsx("option", { value: "provider", children: "By Provider" }),
              /* @__PURE__ */ jsx("option", { value: "status", children: "By Status" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: reports.map((report) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 hover:shadow-xl transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-navy rounded-xl flex items-center justify-center text-white text-xl", children: getTypeIcon(report.type) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-lg", children: report.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: report.provider })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`, children: report.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-4 text-sm text-gray-600", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Date:" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: new Date(report.date).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "File Size:" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: report.size })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Downloads:" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            report.downloadCount,
            " times"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Shared:" }),
          /* @__PURE__ */ jsx("span", { className: `font-medium ${report.shared ? "text-green-600" : "text-gray-500"}`, children: report.shared ? "Yes" : "No" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
          "View"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
          "Download"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Share, { className: "w-4 h-4 mr-2" }),
          "Share"
        ] })
      ] })
    ] }, report.id)) }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 bg-blue-50 border border-blue-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-blue-600 flex-shrink-0 mt-1" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "HIPAA Compliant & Secure" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-700 text-sm", children: "All medical reports are stored with enterprise-grade encryption and are fully HIPAA compliant. Your medical information is protected with the highest security standards, and access is logged for your safety." })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Medical Reports", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonReportsSystem", SkeletonReportsSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonReportsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/reports/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/reports/index.astro";
const $$url = "/patient-dashboard/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
