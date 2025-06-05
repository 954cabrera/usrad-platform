/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Plus, Search, Bell, Edit, Calendar, MapPin, Phone, Clock } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-72 mb-3 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-96 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-300 rounded-lg w-48 animate-pulse" })
    ] }) })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-12 mx-auto mb-2 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse" })
  ] }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg w-32 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg w-28 animate-pulse" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-gray-100 p-1 rounded-lg", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "flex-1 h-10 bg-gray-200 rounded-md animate-pulse" }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded-2xl animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-32 animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-8 animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [1, 2, 3].map((j) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-200 rounded animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-24 animate-pulse" })
    ] }, j)) }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((j) => /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-24 animate-pulse" }, j)) })
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
const SkeletonAppointmentsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const appointments = {
    upcoming: [
      {
        id: 1,
        type: "MRI",
        title: "Brain MRI with Contrast",
        date: "2024-12-15",
        time: "2:30 PM",
        provider: "Miami Lakes Medical Center",
        address: "15900 NW 67th Ave, Miami Lakes, FL 33014",
        phone: "(305) 558-8500",
        status: "Confirmed",
        preparationRequired: true,
        estimatedDuration: "45 minutes"
      },
      {
        id: 2,
        type: "CT",
        title: "Abdominal CT Scan",
        date: "2024-12-22",
        time: "10:00 AM",
        provider: "Coral Gables Imaging",
        address: "3661 S Miami Ave, Coral Gables, FL 33133",
        phone: "(305) 667-8989",
        status: "Confirmed",
        preparationRequired: true,
        estimatedDuration: "30 minutes"
      }
    ],
    completed: [
      {
        id: 3,
        type: "MRI",
        title: "Knee MRI without Contrast",
        date: "2024-11-08",
        time: "11:30 AM",
        provider: "South Beach Radiology",
        address: "1234 Ocean Dr, Miami Beach, FL 33139",
        phone: "(305) 674-2778",
        status: "Completed",
        reportReady: true,
        savings: "$890"
      },
      {
        id: 4,
        type: "X-Ray",
        title: "Lower Back X-Ray Series",
        date: "2024-10-15",
        time: "3:00 PM",
        provider: "Downtown Medical Imaging",
        address: "100 SE 2nd St, Miami, FL 33131",
        phone: "(305) 555-0123",
        status: "Completed",
        reportReady: true,
        savings: "$320"
      }
    ],
    cancelled: [
      {
        id: 5,
        type: "Ultrasound",
        title: "Abdominal Ultrasound",
        date: "2024-10-01",
        time: "9:00 AM",
        provider: "Kendall Imaging Center",
        status: "Cancelled",
        reason: "Patient request"
      }
    ]
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        return "📅";
    }
  };
  const currentAppointments = appointments[activeTab] || [];
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
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Appointment Management" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "Manage all your medical imaging appointments in one place" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
          "Schedule New Scan"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-navy mb-2", children: appointments.upcoming.length }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Upcoming" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Scheduled appointments" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-600 mb-2", children: appointments.completed.length }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Completed" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Successful scans" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-gold mb-2", children: "$1,210" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Total Saved" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "vs. hospital pricing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-600 mb-2", children: "4.9" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 font-medium mb-1", children: "Avg Rating" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Provider satisfaction" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search appointments by type, provider, or date...",
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
        /* @__PURE__ */ jsxs("button", { className: "px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center", children: [
          /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5 mr-2" }),
          "Reminders"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-gray-100 p-1 rounded-lg", children: ["upcoming", "completed", "cancelled"].map((tab) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveTab(tab),
        className: `flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-300 ${activeTab === tab ? "bg-white usrad-navy shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
        children: [
          tab.charAt(0).toUpperCase() + tab.slice(1),
          " (",
          appointments[tab].length,
          ")"
        ]
      },
      tab
    )) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: currentAppointments.map((appointment) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 hover:shadow-xl transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white text-2xl", children: getTypeIcon(appointment.type) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: appointment.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: appointment.provider })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("span", { className: `px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`, children: appointment.status }),
          activeTab === "upcoming" && /* @__PURE__ */ jsx("button", { className: "p-2 text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx(Edit, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            new Date(appointment.date).toLocaleDateString(),
            " at ",
            appointment.time
          ] })
        ] }),
        appointment.address && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-green-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: appointment.address })
        ] }),
        appointment.phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-purple-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: appointment.phone })
        ] }),
        appointment.estimatedDuration && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-orange-600" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
            "Duration: ",
            appointment.estimatedDuration
          ] })
        ] }),
        appointment.savings && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-4 h-4 text-green-600", children: "💰" }),
          /* @__PURE__ */ jsxs("span", { className: "text-green-600 font-medium", children: [
            "Saved ",
            appointment.savings
          ] })
        ] }),
        appointment.preparationRequired && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-4 h-4 text-yellow-600", children: "⚠️" }),
          /* @__PURE__ */ jsx("span", { className: "text-yellow-600 font-medium", children: "Preparation Required" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        activeTab === "upcoming" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors", children: "View Details" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors", children: "Get Directions" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors", children: "Contact Provider" })
        ] }),
        activeTab === "completed" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors", children: "View Report" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors", children: "Download Results" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors", children: "Book Follow-up" })
        ] })
      ] }),
      activeTab === "upcoming" && appointment.preparationRequired && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-yellow-800 mb-2", children: "Preparation Instructions" }),
        /* @__PURE__ */ jsxs("ul", { className: "text-yellow-700 text-sm space-y-1", children: [
          /* @__PURE__ */ jsx("li", { children: "• Fast for 4 hours before the scan (water is okay)" }),
          /* @__PURE__ */ jsx("li", { children: "• Remove all metal objects and jewelry" }),
          /* @__PURE__ */ jsx("li", { children: "• Arrive 15 minutes early for check-in" }),
          /* @__PURE__ */ jsx("li", { children: "• Bring your ID and insurance card" })
        ] })
      ] })
    ] }, appointment.id)) }),
    currentAppointments.length === 0 && /* @__PURE__ */ jsxs("div", { className: "usrad-card p-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "📅" }),
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-2", children: [
        "No ",
        activeTab,
        " appointments"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: activeTab === "upcoming" ? "You don't have any upcoming appointments. Schedule your next scan!" : `No ${activeTab} appointments found.` }),
      activeTab === "upcoming" && /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors", children: "Schedule New Appointment" })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Appointments", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonAppointmentsSystem", SkeletonAppointmentsSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonAppointmentsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/appointments/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/appointments/index.astro";
const $$url = "/patient-dashboard/appointments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
