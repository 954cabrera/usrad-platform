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
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-40" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: `${i * 0.1}s` }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg" })
  ] }) }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 mb-8 animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-36" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-16" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40" }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsx("tr", { children: ["Patient", "Scan Type", "Date & Time", "Duration", "Status", "Actions"].map((header, i) => /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left", children: /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-20" }) }, i)) }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full" }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-1" }),
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-1" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-1" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-20" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-10" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded w-8" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-red-200 to-red-300 rounded w-12" })
        ] }) })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48" }),
      /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8" }, i)) })
    ] }) })
  ] })
] });
const AppointmentsContent = ({ appointments }) => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 animate-fade-in-up", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold usrad-navy mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Appointments" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Manage your imaging appointments and schedule" })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "btn-primary flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }),
      /* @__PURE__ */ jsx("span", { children: "New Appointment" })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600", children: "Today" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold usrad-navy", children: "8" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-navy rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.2s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600", children: "This Week" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold usrad-navy", children: "32" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.3s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600", children: "Completed" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold usrad-navy", children: "98" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-gold rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.4s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600", children: "Revenue" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold usrad-navy", children: "$47K" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" }) }) })
    ] }) })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-6 mb-8 animate-fade-in-up", style: { animationDelay: "0.5s" }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search patients...",
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }
      ),
      /* @__PURE__ */ jsxs("select", { className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [
        /* @__PURE__ */ jsx("option", { children: "All Status" }),
        /* @__PURE__ */ jsx("option", { children: "Confirmed" }),
        /* @__PURE__ */ jsx("option", { children: "In Progress" }),
        /* @__PURE__ */ jsx("option", { children: "Upcoming" }),
        /* @__PURE__ */ jsx("option", { children: "Completed" })
      ] }),
      /* @__PURE__ */ jsxs("select", { className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [
        /* @__PURE__ */ jsx("option", { children: "All Scan Types" }),
        /* @__PURE__ */ jsx("option", { children: "Brain MRI" }),
        /* @__PURE__ */ jsx("option", { children: "Spine MRI" }),
        /* @__PURE__ */ jsx("option", { children: "Knee MRI" }),
        /* @__PURE__ */ jsx("option", { children: "Shoulder MRI" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ jsx("button", { className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "Export" }),
      /* @__PURE__ */ jsx("button", { className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "Print" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card animate-fade-in-up", style: { animationDelay: "0.6s" }, children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "All Appointments" }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Patient" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Scan Type" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date & Time" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Duration" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: appointments.map((appointment, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", style: { animationDelay: `${0.7 + index * 0.1}s` }, children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 usrad-gradient-navy rounded-full flex items-center justify-center text-white font-semibold", children: appointment.patientName.split(" ").map((n) => n[0]).join("") }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: appointment.patientName }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: appointment.phone })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: appointment.scanType }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: appointment.withContrast ? "With Contrast" : "No Contrast" })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: new Date(appointment.scheduledDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: appointment.scheduledTime })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
          appointment.duration,
          " mins"
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `status-badge status-${appointment.status}`, children: appointment.status.replace("_", " ") }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2", children: [
          /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-900", children: "View" }),
          /* @__PURE__ */ jsx("button", { className: "text-indigo-600 hover:text-indigo-900", children: "Edit" }),
          /* @__PURE__ */ jsx("button", { className: "text-red-600 hover:text-red-900", children: "Cancel" })
        ] })
      ] }, appointment.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-700", children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "1" }),
        " to ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "5" }),
        " of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: "25" }),
        " results"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "Previous" }),
        /* @__PURE__ */ jsx("button", { className: "px-3 py-2 usrad-gradient-navy text-white rounded-lg", children: "1" }),
        /* @__PURE__ */ jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "2" }),
        /* @__PURE__ */ jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "3" }),
        /* @__PURE__ */ jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "Next" })
      ] })
    ] }) })
  ] })
] });
const SkeletonAppointmentsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      scanType: "Brain MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "09:30",
      duration: 45,
      status: "confirmed",
      withContrast: true,
      phone: "(555) 123-4567",
      email: "sarah.j@email.com"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      scanType: "Knee MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "11:15",
      duration: 30,
      status: "in_progress",
      withContrast: false,
      phone: "(555) 234-5678",
      email: "m.chen@email.com"
    },
    {
      id: 3,
      patientName: "Emma Rodriguez",
      scanType: "Spine MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "14:00",
      duration: 60,
      status: "upcoming",
      withContrast: true,
      phone: "(555) 345-6789",
      email: "emma.r@email.com"
    },
    {
      id: 4,
      patientName: "David Park",
      scanType: "Shoulder MRI",
      scheduledDate: "2025-05-31",
      scheduledTime: "10:00",
      duration: 40,
      status: "confirmed",
      withContrast: false,
      phone: "(555) 456-7890",
      email: "d.park@email.com"
    },
    {
      id: 5,
      patientName: "Lisa Williams",
      scanType: "Abdominal MRI",
      scheduledDate: "2025-05-31",
      scheduledTime: "13:30",
      duration: 45,
      status: "completed",
      withContrast: true,
      phone: "(555) 567-8901",
      email: "l.williams@email.com"
    }
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1e3);
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

        .btn-primary {
          background: linear-gradient(135deg, #003087, #0040a0);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Manrope", sans-serif;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 48, 135, 0.3);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-confirmed {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-in_progress {
          background: #fef3c7;
          color: #d97706;
        }
        .status-upcoming {
          background: #e0e7ff;
          color: #6366f1;
        }
        .status-completed {
          background: #d1fae5;
          color: #059669;
        }
        .status-cancelled {
          background: #fee2e2;
          color: #dc2626;
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
    isLoading ? /* @__PURE__ */ jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsx(AppointmentsContent, { appointments })
  ] });
};

const $$Astro = createAstro();
const $$Appointments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Appointments;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  const dashboardData = await AuthService.getUserDashboardData(user.id);
  const { imagingCenter } = dashboardData;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Appointments", "user": user, "imagingCenter": imagingCenter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonAppointmentsSystem", SkeletonAppointmentsSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/SkeletonAppointmentsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/appointments.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/appointments.astro";
const $$url = "/dashboard/appointments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Appointments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
