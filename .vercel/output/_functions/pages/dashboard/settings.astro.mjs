/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../chunks/DashboardLayout_gZIsqg2i.mjs';
import { v as validateAuthSession, A as AuthService } from '../../chunks/auth_C63G2fu-.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-8 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 mb-2" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-pulse", style: { animationDelay: "0.1s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2" }),
              /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2" }),
              /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-pulse", style: { animationDelay: "0.2s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-72" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg w-36" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-pulse", style: { animationDelay: "0.3s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 mb-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-68" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          [...Array(3)].map((_, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-2" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" })
          ] }, i)),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4 pt-4", children: /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-36" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.4s" }, children: [
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" }),
          /* @__PURE__ */ jsx("div", { className: `h-6 bg-gradient-to-r ${i === 0 ? "from-blue-200 to-blue-300" : i === 1 ? "from-green-200 to-green-300" : "from-gray-200 to-gray-300"} rounded-full w-24` })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.5s" }, children: [
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" }),
          /* @__PURE__ */ jsx("div", { className: "w-5 h-5 bg-gradient-to-r from-blue-200 to-blue-300 rounded" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse", style: { animationDelay: "0.6s" }, children: [
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-28" }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-pulse border-red-200", style: { animationDelay: "0.7s" }, children: [
        /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-red-200 to-red-300 rounded w-24 mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-4" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-red-200 to-red-300 rounded-lg w-full" }),
          /* @__PURE__ */ jsx("div", { className: "h-10 bg-gradient-to-r from-red-300 to-red-400 rounded-lg w-full" })
        ] })
      ] })
    ] })
  ] })
] });
const SettingsContent = ({ user, imagingCenter }) => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-8 animate-fade-in-up", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold usrad-navy mb-2", style: { fontFamily: "'Manrope', sans-serif" }, children: "Settings" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Manage your profile and imaging center preferences" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.1s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Profile Information" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Update your personal details and contact information" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-usrad-gold to-yellow-400 rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg", children: user.firstName?.[0] || user.email[0].toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "First Name" }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: user.firstName || "", placeholder: "Enter first name" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Last Name" }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: user.lastName || "", placeholder: "Enter last name" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Email Address" }),
            /* @__PURE__ */ jsx("input", { type: "email", className: "form-input", defaultValue: user.email, placeholder: "Enter email address" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Phone Number" }),
            /* @__PURE__ */ jsx("input", { type: "tel", className: "form-input", defaultValue: user.phone || "", placeholder: "Enter phone number" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4", children: [
            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-primary", children: "Save Changes" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold", children: "Cancel" })
          ] })
        ] })
      ] }),
      imagingCenter && /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.2s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Imaging Center Settings" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Configure your imaging center information and preferences" })
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Center Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: imagingCenter.name, placeholder: "Enter center name" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Address" }),
            /* @__PURE__ */ jsx("textarea", { className: "form-input", rows: 3, placeholder: "Enter complete address", defaultValue: imagingCenter.address })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "City" }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: imagingCenter.city || "", placeholder: "City" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "State" }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: imagingCenter.state || "", placeholder: "State" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "ZIP Code" }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: imagingCenter.zipCode || "", placeholder: "ZIP" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Phone" }),
              /* @__PURE__ */ jsx("input", { type: "tel", className: "form-input", defaultValue: imagingCenter.phone || "", placeholder: "Center phone" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Email" }),
              /* @__PURE__ */ jsx("input", { type: "email", className: "form-input", defaultValue: imagingCenter.email || "", placeholder: "Center email" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "License Number" }),
            /* @__PURE__ */ jsx("input", { type: "text", className: "form-input", defaultValue: imagingCenter.licenseNumber || "", placeholder: "Medical license number" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-4", children: [
            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-secondary", children: "Update Center Info" }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold", children: "Cancel" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 animate-fade-in-up", style: { animationDelay: "0.3s" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold usrad-navy", style: { fontFamily: "'Manrope', sans-serif" }, children: "Security Settings" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Update your password and security preferences" })
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Current Password" }),
            /* @__PURE__ */ jsx("input", { type: "password", className: "form-input", placeholder: "Enter current password" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "New Password" }),
            /* @__PURE__ */ jsx("input", { type: "password", className: "form-input", placeholder: "Enter new password" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Confirm New Password" }),
            /* @__PURE__ */ jsx("input", { type: "password", className: "form-input", placeholder: "Confirm new password" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4 pt-4", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-primary", children: "Change Password" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.4s" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-4", style: { fontFamily: "'Manrope', sans-serif" }, children: "Account Status" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Account Type" }),
            /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold", children: user.role === "imaging_center" ? "Imaging Center" : user.role === "admin" ? "Administrator" : "User" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Status" }),
            /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Member Since" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: new Date(user.createdAt || Date.now()).toLocaleDateString() })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.5s" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-4", style: { fontFamily: "'Manrope', sans-serif" }, children: "Notifications" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Email Notifications" }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: true, className: "w-5 h-5 text-blue-600 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "SMS Alerts" }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", className: "w-5 h-5 text-blue-600 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "Appointment Reminders" }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: true, className: "w-5 h-5 text-blue-600 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: "System Updates" }),
            /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: true, className: "w-5 h-5 text-blue-600 rounded" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up", style: { animationDelay: "0.6s" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold usrad-navy mb-4", style: { fontFamily: "'Manrope', sans-serif" }, children: "Support" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "block text-blue-600 hover:text-blue-800 transition-colors", children: "📖 Documentation" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "block text-blue-600 hover:text-blue-800 transition-colors", children: "💬 Contact Support" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "block text-blue-600 hover:text-blue-800 transition-colors", children: "🎥 Video Tutorials" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "block text-blue-600 hover:text-blue-800 transition-colors", children: "❓ FAQ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 animate-fade-in-up border-red-200", style: { animationDelay: "0.7s" }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-red-600 mb-4", style: { fontFamily: "'Manrope', sans-serif" }, children: "Danger Zone" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: "These actions cannot be undone." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 font-semibold", children: "Export Data" }),
          /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold", children: "Delete Account" })
        ] })
      ] })
    ] })
  ] })
] });
const SkeletonSettingsSystem = ({ user, imagingCenter }) => {
  const [isLoading, setIsLoading] = useState(true);
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
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #003087;
          box-shadow: 0 0 0 3px rgba(0, 48, 135, 0.1);
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-family: 'Manrope', sans-serif;
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
          font-family: 'Manrope', sans-serif;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 48, 135, 0.3);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #cc9933, #e6b84d);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(204, 153, 51, 0.3);
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
    isLoading ? /* @__PURE__ */ jsx(SkeletonLoader, {}) : /* @__PURE__ */ jsx(SettingsContent, { user, imagingCenter })
  ] });
};

const $$Astro = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  const dashboardData = await AuthService.getUserDashboardData(user.id);
  const { imagingCenter } = dashboardData;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Settings", "user": user, "imagingCenter": imagingCenter }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonSettingsSystem", SkeletonSettingsSystem, { "client:load": true, "user": user, "imagingCenter": imagingCenter, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/SkeletonSettingsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/settings.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/settings.astro";
const $$url = "/dashboard/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
