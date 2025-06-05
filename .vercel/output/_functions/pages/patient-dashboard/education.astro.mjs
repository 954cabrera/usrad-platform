/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Award, Search, Filter, Play, BookOpen, CheckCircle, Clock, Users, Star } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-72 mb-3 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-96 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-300 rounded-lg w-48 animate-pulse" })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-12 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-300 h-2 rounded-full w-3/4 animate-pulse" }) }),
    /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-20 animate-pulse" })
  ] }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "flex space-x-4 overflow-x-auto pb-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded-full w-32 flex-shrink-0 animate-pulse" }, i)) }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-40 bg-gray-200 rounded-lg mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full mb-3 animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-12 animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-16 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded-full w-20 animate-pulse" })
    ] })
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
const SkeletonEducationSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const categories = ["all", "preparation", "safety", "results", "technology"];
  const courses = [
    {
      id: 1,
      title: "MRI Preparation Guide",
      description: "Complete guide to preparing for your MRI scan",
      category: "preparation",
      duration: "15 min",
      type: "video",
      progress: 100,
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: "Understanding CT Scan Results",
      description: "Learn how to read and understand your CT scan reports",
      category: "results",
      duration: "20 min",
      type: "article",
      progress: 60,
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      title: "Radiation Safety in Medical Imaging",
      description: "Everything you need to know about radiation safety",
      category: "safety",
      duration: "12 min",
      type: "video",
      progress: 0,
      rating: 4.7,
      students: 2100
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
        .usrad-gold { color: #cc9933; }
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
        .usrad-gradient-gold { background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%); }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Health Education Center" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "Learn about medical imaging and prepare for your scans" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 mr-2 inline" }),
          "View Certificates"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold usrad-navy", children: "Courses Completed" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold usrad-gold", children: "3" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-2 rounded-full", style: { width: "60%" } }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "3 of 5 courses" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold usrad-navy", children: "Learning Time" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-blue-600", children: "2.5h" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: "75%" } }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "This month" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold usrad-navy", children: "Certificates Earned" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-green-600", children: "2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsx("div", { className: "bg-green-500 h-2 rounded-full", style: { width: "40%" } }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Patient Safety, MRI Prep" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "usrad-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 w-5 h-5 text-gray-400" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search courses, articles, or videos...",
            className: "w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center", children: [
        /* @__PURE__ */ jsx(Filter, { className: "w-5 h-5 mr-2" }),
        "Filter"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex space-x-4 overflow-x-auto pb-2", children: categories.map((category) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCategory(category),
        className: `px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${activeCategory === category ? "usrad-gradient-navy text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
        children: category.charAt(0).toUpperCase() + category.slice(1)
      },
      category
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: courses.map((course) => /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 hover:shadow-xl transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center", children: course.type === "video" ? /* @__PURE__ */ jsx(Play, { className: "w-12 h-12 text-blue-600" }) : /* @__PURE__ */ jsx(BookOpen, { className: "w-12 h-12 text-purple-600" }) }),
        course.progress > 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: course.progress === 100 ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600" }) : /* @__PURE__ */ jsx("div", { className: "bg-white rounded-full p-1 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-blue-200 rounded-full relative", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-blue-600 rounded-full",
            style: {
              background: `conic-gradient(#2563eb ${course.progress * 3.6}deg, #e5e7eb 0deg)`
            }
          }
        ) }) }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-2", children: course.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: course.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: course.duration })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: course.students })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
          /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-current" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: course.rating })
        ] })
      ] }),
      course.progress > 0 && course.progress < 100 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            course.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-blue-500 h-2 rounded-full transition-all duration-300",
            style: { width: `${course.progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("button", { className: `w-full py-3 px-4 rounded-lg font-semibold transition-colors ${course.progress === 100 ? "bg-green-600 hover:bg-green-700 text-white" : course.progress > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`, children: course.progress === 100 ? "Review" : course.progress > 0 ? "Continue" : "Start Course" })
    ] }, course.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Your Achievements" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-8 h-8 text-yellow-600" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-yellow-800", children: "MRI Preparation Expert" }),
            /* @__PURE__ */ jsx("div", { className: "text-yellow-700 text-sm", children: "Completed MRI preparation course" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-8 h-8 text-green-600" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-green-800", children: "Safety First" }),
            /* @__PURE__ */ jsx("div", { className: "text-green-700 text-sm", children: "Completed radiation safety course" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-8 h-8 text-gray-400" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-gray-600", children: "CT Scan Specialist" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: "Complete CT scan course to unlock" })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Education", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonEducationSystem", SkeletonEducationSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonEducationSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/education/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/education/index.astro";
const $$url = "/patient-dashboard/education";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
