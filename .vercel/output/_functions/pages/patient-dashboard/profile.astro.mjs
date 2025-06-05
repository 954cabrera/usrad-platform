/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Camera, User, Heart, Shield, Users, Settings, Trash2, Plus, Save } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gray-300 rounded-full animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-32 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-32 animate-pulse" }) })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded w-32 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-16 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-300 h-3 rounded-full w-4/5 animate-pulse" }) })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-gray-100 p-1 rounded-lg", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx("div", { className: "flex-1 h-12 bg-gray-200 rounded-md animate-pulse" }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg animate-pulse" })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-24 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded-lg w-20 animate-pulse" })
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
const SkeletonProfileSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "medical", label: "Medical History", icon: Heart },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "emergency", label: "Emergency Contacts", icon: Users },
    { id: "preferences", label: "Preferences", icon: Settings }
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
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl", children: "👤" }),
          /* @__PURE__ */ jsx("button", { className: "absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors", children: /* @__PURE__ */ jsx(Camera, { className: "w-4 h-4 text-white" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: "Sarah Johnson" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-100", children: "Patient ID: USR-2024-001234" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsx("button", { className: "bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors", children: "Edit Profile" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy", children: "Profile Completion" }),
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold usrad-gold", children: "85%" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-3 rounded-full transition-all duration-1000", style: { width: "85%" } }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mt-2", children: "Complete your emergency contacts to reach 100%" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto", children: tabs.map((tab) => {
      const IconComponent = tab.icon;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `flex-1 min-w-max py-3 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${activeTab === tab.id ? "bg-white usrad-navy shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
          children: [
            /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 mr-2" }),
            tab.label
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
      activeTab === "personal" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy mb-6", children: "Personal Information" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "First Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "Sarah", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Last Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "Johnson", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Date of Birth" }),
            /* @__PURE__ */ jsx("input", { type: "date", defaultValue: "1985-06-15", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Gender" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none", children: [
              /* @__PURE__ */ jsx("option", { children: "Female" }),
              /* @__PURE__ */ jsx("option", { children: "Male" }),
              /* @__PURE__ */ jsx("option", { children: "Other" }),
              /* @__PURE__ */ jsx("option", { children: "Prefer not to say" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone Number" }),
            /* @__PURE__ */ jsx("input", { type: "tel", defaultValue: "(305) 555-0123", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Address" }),
            /* @__PURE__ */ jsx("input", { type: "email", defaultValue: "sarah.johnson@email.com", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Address" }),
          /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "1234 Ocean Drive, Miami Beach, FL 33139", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
        ] })
      ] }),
      activeTab === "medical" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy mb-6", children: "Medical History" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Known Allergies" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm", children: "Penicillin" }),
              /* @__PURE__ */ jsx("span", { className: "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm", children: "Shellfish" })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "+ Add Allergy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Current Medications" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
                /* @__PURE__ */ jsx("span", { children: "Lisinopril 10mg - Daily" }),
                /* @__PURE__ */ jsx("button", { className: "text-red-600 hover:text-red-800", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
                /* @__PURE__ */ jsx("span", { children: "Vitamin D3 2000 IU - Daily" }),
                /* @__PURE__ */ jsx("button", { className: "text-red-600 hover:text-red-800", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium", children: "+ Add Medication" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Medical Conditions" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm", children: "Hypertension" }),
              /* @__PURE__ */ jsx("span", { className: "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm", children: "Vitamin D Deficiency" })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "+ Add Condition" })
          ] })
        ] })
      ] }),
      activeTab === "insurance" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy mb-6", children: "Insurance Information" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Primary Insurance" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Insurance Provider" }),
              /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "Blue Cross Blue Shield", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Policy Number" }),
              /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "BCBS123456789", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Group Number" }),
              /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "GRP001234", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Member ID" }),
              /* @__PURE__ */ jsx("input", { type: "text", defaultValue: "MEM987654321", className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" })
            ] })
          ] })
        ] }) })
      ] }),
      activeTab === "emergency" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy mb-6", children: "Emergency Contacts" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Michael Johnson" }),
              /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm", children: "Primary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Relationship:" }),
                " Spouse"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
                " (305) 555-0456"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Email:" }),
                " michael.johnson@email.com"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 mx-auto mb-2" }),
            "Add Emergency Contact"
          ] })
        ] })
      ] }),
      activeTab === "preferences" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold usrad-navy mb-6", children: "Communication Preferences" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Notification Settings" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
              "Appointment reminders",
              "Report availability notifications",
              "Referral program updates",
              "Health tips and educational content",
              "Promotional offers and discounts"
            ].map((item, index) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: index < 3, className: "w-5 h-5 text-blue-600 rounded" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, index)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Preferred Contact Method" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ["Email", "SMS Text", "Phone Call", "In-App Notifications"].map((method) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "contact", defaultChecked: method === "Email", className: "w-5 h-5 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { children: method })
            ] }, method)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-4", children: [
        /* @__PURE__ */ jsxs("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center", children: [
          /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
          "Save Changes"
        ] }),
        /* @__PURE__ */ jsx("button", { className: "bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors", children: "Cancel" })
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
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Profile Management", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonProfileSystem", SkeletonProfileSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonProfileSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/profile/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/profile/index.astro";
const $$url = "/patient-dashboard/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
