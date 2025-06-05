/* empty css                                 */
import { c as createComponent, e as createAstro, a as renderHead, f as addAttribute, b as renderSlot, g as renderScript, d as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { v as validateAuthSession } from '../chunks/auth_C63G2fu-.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { A as Alert, c as AlertDescription, C as Card, d as CardHeader, e as CardTitle, a as CardContent, B as Badge, P as Progress, g as Button } from '../chunks/button_CchWNAiu.mjs';
import { CheckCircle, AlertTriangle, Zap, Calendar, ArrowUp, DollarSign, Building2, Users, Activity, Target, BarChart3, MapPin, Star, Globe, Shield, Smartphone, Monitor, Clock } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$CorporateDashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CorporateDashboardLayout;
  const { title, user } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en" data-astro-cid-ky3aigub> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | USRad Executive</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gradient-to-br from-usrad-light to-white" data-astro-cid-ky3aigub> <!-- Mobile Menu Overlay --> <div id="mobile-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden" data-astro-cid-ky3aigub></div> <!-- Executive Sidebar --> <aside id="sidebar" class="fixed top-0 left-0 z-50 w-72 h-screen executive-gradient text-white sidebar-transition mobile-menu-closed lg:mobile-menu-open lg:translate-x-0 shadow-2xl" data-astro-cid-ky3aigub> <!-- Executive Logo Section --> <div class="flex items-center justify-between p-6 border-b border-blue-800" data-astro-cid-ky3aigub> <div class="flex items-center space-x-3" data-astro-cid-ky3aigub> <img src="/logo/usrad-logo.png" alt="USRad Logo" class="w-10 h-10 rounded-lg" data-astro-cid-ky3aigub> <div data-astro-cid-ky3aigub> <h1 class="text-xl font-bold text-white" data-astro-cid-ky3aigub>USRad</h1> <p class="text-xs text-blue-200" data-astro-cid-ky3aigub>Executive Suite</p> </div> </div> <button id="close-sidebar" class="lg:hidden text-white hover:text-usrad-gold transition-colors p-2" data-astro-cid-ky3aigub> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-ky3aigub></path> </svg> </button> </div> <!-- Executive User Info --> ${user && renderTemplate`<div class="p-6 border-b border-blue-800 bg-gradient-to-r from-blue-800/20 to-transparent" data-astro-cid-ky3aigub> <div class="flex items-center space-x-4" data-astro-cid-ky3aigub> <div class="w-12 h-12 usrad-gradient-gold rounded-full flex items-center justify-center font-bold text-usrad-navy text-lg shadow-lg" data-astro-cid-ky3aigub> ${user.firstName?.[0] || user.email[0].toUpperCase()} </div> <div class="flex-1 min-w-0" data-astro-cid-ky3aigub> <p class="font-semibold text-white truncate" data-astro-cid-ky3aigub> ${user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email} </p> <p class="text-sm text-blue-200 truncate" data-astro-cid-ky3aigub> ${user.role === "ceo" ? "Chief Executive Officer" : user.role === "cfo" ? "Chief Financial Officer" : user.role === "coo" ? "Chief Operating Officer" : user.role === "vp_marketing" ? "VP of Marketing" : user.role === "vp_network" ? "VP of Network Development" : user.role === "vp_patient_services" ? "VP of Patient Services" : "Executive Access"} </p> <div class="flex items-center mt-1" data-astro-cid-ky3aigub> <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" data-astro-cid-ky3aigub></div> <span class="text-xs text-blue-200 ml-2" data-astro-cid-ky3aigub>Online</span> </div> </div> </div> </div>`} <!-- Executive Navigation --> <nav class="flex-1 px-4 py-6 space-y-2" data-astro-cid-ky3aigub> <div class="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-4 px-4" data-astro-cid-ky3aigub>
Executive Overview
</div> <a href="/corporate-dashboard"${addAttribute(`nav-link ${currentPath === "/corporate-dashboard" ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Dashboard Overview</span> </a> <a href="/corporate-dashboard/analytics"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/analytics") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Analytics & Reports</span> </a> <a href="/corporate-dashboard/financial"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/financial") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Financial Performance</span> </a> <div class="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-4 px-4 pt-6" data-astro-cid-ky3aigub>
Strategic Management
</div> <a href="/corporate-dashboard/providers"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/providers") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Provider Network</span> </a> <a href="/corporate-dashboard/patients"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/patients") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Patient Insights</span> </a> <a href="/corporate-dashboard/markets"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/markets") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Market Analytics</span> </a> <a href="/corporate-dashboard/strategy"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/strategy") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Strategic Planning</span> </a> <div class="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-4 px-4 pt-6" data-astro-cid-ky3aigub>
Administration
</div> <a href="/corporate-dashboard/admin"${addAttribute(`nav-link ${currentPath.startsWith("/corporate-dashboard/admin") ? "active" : ""}`, "class")} data-astro-cid-ky3aigub> <div class="usrad-gradient-navy p-2 rounded-lg mr-3" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-astro-cid-ky3aigub></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>System Administration</span> </a> </nav> <!-- Executive Logout Section --> <div class="p-4 border-t border-blue-800 bg-gradient-to-r from-red-900/10 to-transparent" data-astro-cid-ky3aigub> <form action="/api/auth/logout" method="POST" data-astro-cid-ky3aigub> <button type="submit" class="w-full flex items-center px-4 py-3 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-900 rounded-xl transition-all duration-200" data-astro-cid-ky3aigub> <div class="p-2 rounded-lg mr-3 bg-red-900/30" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-ky3aigub></path> </svg> </div> <span data-astro-cid-ky3aigub>Sign Out</span> </button> </form> </div> </aside> <!-- Main Content --> <div class="lg:ml-72 min-h-screen" data-astro-cid-ky3aigub> <!-- Executive Top Header --> <header class="bg-white backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-4 relative z-30" data-astro-cid-ky3aigub> <div class="flex items-center justify-between" data-astro-cid-ky3aigub> <div class="flex items-center space-x-4" data-astro-cid-ky3aigub> <button id="menu-toggle" class="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors" data-astro-cid-ky3aigub> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-ky3aigub></path> </svg> </button> <div data-astro-cid-ky3aigub> <h1 class="text-2xl font-bold usrad-navy" data-astro-cid-ky3aigub>${title}</h1> <p class="text-sm text-gray-600" data-astro-cid-ky3aigub>Executive Command Center</p> </div> </div> <div class="flex items-center space-x-4" data-astro-cid-ky3aigub> <!-- Executive Quick Actions --> <button class="bg-usrad-navy text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold" data-astro-cid-ky3aigub>
📊 Board Report
</button> <!-- Executive Notifications --> <button class="relative text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors" data-astro-cid-ky3aigub> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-astro-cid-ky3aigub></path> </svg> <span class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse" data-astro-cid-ky3aigub>2</span> </button> <!-- Executive Profile & Logout --> <div class="flex items-center space-x-3" data-astro-cid-ky3aigub> <div class="flex items-center space-x-3 bg-gray-50 rounded-lg p-2" data-astro-cid-ky3aigub> <div class="w-8 h-8 usrad-gradient-gold rounded-lg flex items-center justify-center font-bold text-usrad-navy text-sm" data-astro-cid-ky3aigub> ${user?.firstName?.[0] || user?.email[0].toUpperCase() || "E"} </div> <span class="text-sm font-medium text-gray-700 sm:block" data-astro-cid-ky3aigub> ${user?.firstName || "Executive"} </span> </div> <form action="/api/auth/logout" method="POST" class="inline" data-astro-cid-ky3aigub> <button type="submit" class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" title="Sign Out" data-astro-cid-ky3aigub> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ky3aigub> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-ky3aigub></path> </svg> <span class="md:inline" data-astro-cid-ky3aigub>Sign Out</span> </button> </form> </div> </div> </div> </header> <!-- Executive Page Content --> <main class="p-6 animate-fade-in" data-astro-cid-ky3aigub> ${renderSlot($$result, $$slots["default"])} </main> </div> ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/CorporateDashboardLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/CorporateDashboardLayout.astro", void 0);

const SkeletonCard = () => /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg", children: [
  /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-3/4" }) }),
  /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded animate-pulse w-1/2" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-2/3" })
  ] }) })
] });
const SkeletonMetricCard = ({ color = "bg-blue-600" }) => /* @__PURE__ */ jsxs(Card, { className: `relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white`, children: [
  /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/20 rounded animate-pulse w-2/3" }) }),
  /* @__PURE__ */ jsxs(CardContent, { children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-white/20 rounded animate-pulse w-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/20 rounded animate-pulse w-3/4" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-white/20 rounded" }) })
  ] })
] });
const CorporateDashboardSystem = ({ userContext = {} }) => {
  const [currentTime, setCurrentTime] = useState(/* @__PURE__ */ new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(loadingTimer);
  }, [selectedTimeframe]);
  useEffect(() => {
    setIsLoading(true);
  }, [selectedTimeframe]);
  const platformMetrics = {
    today: {
      scans: 847,
      scansChange: 12,
      revenue: 127400,
      revenueChange: 18,
      activeProviders: 1247,
      providersChange: 3,
      newPatients: 342,
      patientsChange: 25,
      platformHealth: 94,
      conversionRate: 23.8,
      avgBookingValue: 450
    },
    week: {
      scans: 5234,
      scansChange: 15,
      revenue: 892800,
      revenueChange: 22,
      activeProviders: 1247,
      providersChange: 8,
      newPatients: 2156,
      patientsChange: 31,
      platformHealth: 96,
      conversionRate: 24.2,
      avgBookingValue: 465
    },
    month: {
      scans: 18947,
      scansChange: 28,
      revenue: 3458920,
      revenueChange: 35,
      activeProviders: 1247,
      providersChange: 89,
      newPatients: 8934,
      patientsChange: 42,
      platformHealth: 95,
      conversionRate: 25.1,
      avgBookingValue: 475
    }
  };
  const currentMetrics = platformMetrics[selectedTimeframe];
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  const getTimeframeSuffix = () => {
    switch (selectedTimeframe) {
      case "today":
        return "vs yesterday";
      case "week":
        return "vs last week";
      case "month":
        return "vs last month";
      default:
        return "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: ["today", "week", "month"].map((timeframe) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setSelectedTimeframe(timeframe),
        className: `px-4 py-2 rounded-lg font-medium transition-all ${selectedTimeframe === timeframe ? "bg-[#003087] text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50 border"}`,
        children: timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
      },
      timeframe
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(Alert, { className: "border-green-200 bg-green-50", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-600" }),
        /* @__PURE__ */ jsxs(AlertDescription, { className: "text-green-800", children: [
          /* @__PURE__ */ jsx("strong", { children: "System Health:" }),
          " All platforms operational (99.8% uptime)"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Alert, { className: "border-yellow-200 bg-yellow-50", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-600" }),
        /* @__PURE__ */ jsxs(AlertDescription, { className: "text-yellow-800", children: [
          /* @__PURE__ */ jsx("strong", { children: "Capacity Alert:" }),
          " Miami market at 85% provider utilization"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Alert, { className: "border-blue-200 bg-blue-50", children: [
        /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-blue-600" }),
        /* @__PURE__ */ jsxs(AlertDescription, { className: "text-blue-800", children: [
          /* @__PURE__ */ jsx("strong", { children: "Growth Opportunity:" }),
          " 12 new high-value providers pending onboarding"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SkeletonMetricCard, {}),
      /* @__PURE__ */ jsx(SkeletonMetricCard, {}),
      /* @__PURE__ */ jsx(SkeletonMetricCard, {}),
      /* @__PURE__ */ jsx(SkeletonMetricCard, {})
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary to-blue-800 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium text-blue-100 flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 mr-2" }),
          "Total Scans"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-2 font-manrope", children: formatNumber(currentMetrics.scans) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-blue-100", children: [
            /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4 mr-1" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "+",
              currentMetrics.scansChange,
              "% ",
              getTimeframeSuffix()
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-20", children: /* @__PURE__ */ jsx(Calendar, { className: "h-16 w-16" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium text-green-100 flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 mr-2" }),
          "Platform Revenue"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-2 font-manrope", children: formatCurrency(currentMetrics.revenue) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-green-100", children: [
            /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4 mr-1" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "+",
              currentMetrics.revenueChange,
              "% ",
              getTimeframeSuffix()
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-20", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-16 w-16" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium text-purple-100 flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4 mr-2" }),
          "Active Providers"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-2 font-manrope", children: formatNumber(currentMetrics.activeProviders) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-purple-100", children: [
            /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4 mr-1" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "+",
              currentMetrics.providersChange,
              " new ",
              selectedTimeframe === "today" ? "today" : `this ${selectedTimeframe}`
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-20", children: /* @__PURE__ */ jsx(Building2, { className: "h-16 w-16" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-accent to-yellow-600 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium text-yellow-100 flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 mr-2" }),
          "New Patients"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold mb-2 font-manrope", children: formatNumber(currentMetrics.newPatients) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-yellow-100", children: [
            /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4 mr-1" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "+",
              currentMetrics.patientsChange,
              "% ",
              getTimeframeSuffix()
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-20", children: /* @__PURE__ */ jsx(Users, { className: "h-16 w-16" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SkeletonCard, {}),
      /* @__PURE__ */ jsx(SkeletonCard, {}),
      /* @__PURE__ */ jsx(SkeletonCard, {})
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-primary flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Activity, { className: "h-5 w-5 mr-2" }),
          "Platform Health Score"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-primary mb-2 font-manrope", children: [
              currentMetrics.platformHealth,
              "/100"
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: "Excellent" })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: currentMetrics.platformHealth, className: "h-3" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "System Uptime" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "99.8%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "API Performance" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "98ms avg" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "User Satisfaction" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "4.8/5.0" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-primary flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Target, { className: "h-5 w-5 mr-2" }),
          "Conversion Performance"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold text-primary mb-2 font-manrope", children: [
              currentMetrics.conversionRate,
              "%"
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: "Above Target" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Search to View" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "67%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "View to Book" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "35%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Guest vs Registered" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "60% / 40%" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-primary flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5 mr-2" }),
          "Avg Scan Value"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-primary mb-2 font-manrope", children: formatCurrency(currentMetrics.avgBookingValue) }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: "+8% vs target" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "MRI Scans" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "$685" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "CT Scans" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "$425" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Ultrasound" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "$285" })
            ] })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SkeletonCard, {}),
      /* @__PURE__ */ jsx(SkeletonCard, {})
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-primary flex items-center justify-between font-manrope", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 mr-2" }),
            "Top Performing Markets"
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "View All Markets" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
          { market: "Miami-Dade, FL", bookings: 142, growth: 28, gmv: 89400 },
          { market: "Los Angeles, CA", bookings: 118, growth: 22, gmv: 76500 },
          { market: "Houston, TX", bookings: 94, growth: 15, gmv: 58200 },
          { market: "Phoenix, AZ", bookings: 87, growth: 31, gmv: 52800 },
          { market: "Atlanta, GA", bookings: 73, growth: 18, gmv: 45100 }
        ].map((market, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-background rounded-lg hover:bg-backgroundAlt transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-primary font-manrope", children: market.market }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
              market.bookings,
              " scans • ",
              formatCurrency(market.gmv),
              " revenue"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [
            "+",
            market.growth,
            "%"
          ] }) })
        ] }, index)) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-primary flex items-center font-manrope", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 mr-2" }),
          "Executive Quick Actions"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "w-full justify-between bg-gradient-to-r from-primary to-blue-800 hover:shadow-lg transition-all",
              size: "lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium font-manrope", children: "Generate Board Report" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-blue-100", children: "Monthly KPI summary with insights" })
                ] }),
                /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "w-full justify-between bg-gradient-to-r from-accent to-yellow-600 hover:shadow-lg transition-all",
              size: "lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium font-manrope", children: "Market Expansion Analysis" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-yellow-100", children: "Identify high-opportunity regions" })
                ] }),
                /* @__PURE__ */ jsx(Globe, { className: "h-5 w-5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "w-full justify-between bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg transition-all",
              size: "lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium font-manrope", children: "Provider Network Review" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-green-100", children: "Capacity optimization opportunities" })
                ] }),
                /* @__PURE__ */ jsx(Building2, { className: "h-5 w-5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "w-full justify-between bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg transition-all",
              size: "lg",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium font-manrope", children: "Competitive Intelligence" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-purple-100", children: "RadNet & SimonMed analysis" })
                ] }),
                /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5" })
              ]
            }
          )
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SkeletonCard, {}),
      /* @__PURE__ */ jsx(SkeletonCard, {}),
      /* @__PURE__ */ jsx(SkeletonCard, {})
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-[#003087] flex items-center", children: [
          /* @__PURE__ */ jsx(Smartphone, { className: "h-5 w-5 mr-2" }),
          "Mobile Usage"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-[#003087] mb-2", children: "67%" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "of all bookings" }),
          /* @__PURE__ */ jsx(Progress, { value: 67, className: "mt-3 h-2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-[#003087] flex items-center", children: [
          /* @__PURE__ */ jsx(Monitor, { className: "h-5 w-5 mr-2" }),
          "Desktop Usage"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-[#003087] mb-2", children: "33%" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "of all bookings" }),
          /* @__PURE__ */ jsx(Progress, { value: 33, className: "mt-3 h-2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-lg", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-[#003087] flex items-center", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 mr-2" }),
          "Avg Session Time"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-[#003087] mb-2", children: "8:42" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "minutes per session" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "mt-2 text-green-600 border-green-600", children: "+15% vs industry" })
        ] }) })
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
    return Astro2.redirect("/login/imaginglogin");
  }
  user.role = "admin";
  return renderTemplate`${renderComponent($$result, "CorporateDashboardLayout", $$CorporateDashboardLayout, { "title": "Corporate Dashboard - Executive Command Center", "user": user }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gradient-to-r from-primary to-blue-800 text-white p-6 rounded-lg shadow-xl mb-6"> <div class="flex justify-between items-center"> <div> <h1 class="text-3xl font-bold mb-2 font-manrope">Corporate Command Center</h1> <p class="text-blue-100 text-lg">
Welcome, ${user.firstName || "Executive"} • Real-Time Intelligence
</p> <p class="text-blue-200 text-sm">Role: ${user.role} | Executive Access</p> </div> <div class="text-right"> <div class="text-blue-100">Executive Dashboard</div> <div class="text-blue-200 text-sm" id="live-timestamp"> ${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </div> </div> </div> </div>  ${renderComponent($$result2, "CorporateDashboardSystem", CorporateDashboardSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/corporate-dashboard/CorporateDashboardSystem", "client:component-export": "default" })}  ${renderScript($$result2, "/home/usrad/Web Development/usradiology-redund-project/src/pages/corporate-dashboard/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/corporate-dashboard/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/corporate-dashboard/index.astro";
const $$url = "/corporate-dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
