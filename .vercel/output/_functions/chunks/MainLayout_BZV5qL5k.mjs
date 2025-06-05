import { c as createComponent, r as renderComponent, a as renderHead, b as renderSlot, d as renderTemplate } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
/* empty css                            */
import { $ as $$AOSInit, a as $$UtilityHeader, P as PatientHeader, b as $$Footer } from './Footer_DMjklgAz.mjs';
/* empty css                            */

const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-ouamjn2i> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title><slot name="title" /></title><!-- Color scheme enforcement --><meta name="color-scheme" content="light only"><meta name="theme-color" content="#fcf9f0"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="msapplication-TileColor" content="#fcf9f0"><!-- Font: Manrope --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- AOS Animation Init -->${renderComponent($$result, "AOSInit", $$AOSInit, { "data-astro-cid-ouamjn2i": true })}${renderHead()}</head> <body class="font-manrope text-[#003087] bg-[#fcf9f0] min-h-screen" data-astro-cid-ouamjn2i> ${renderComponent($$result, "UtilityHeader", $$UtilityHeader, { "data-astro-cid-ouamjn2i": true })} ${renderComponent($$result, "PatientHeader", PatientHeader, { "client:load": true, "showStickyBar": false, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/PatientHeader.jsx", "client:component-export": "default", "data-astro-cid-ouamjn2i": true })} <main class="main-content relative z-10" data-astro-cid-ouamjn2i> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ouamjn2i": true })}  </body> </html>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
