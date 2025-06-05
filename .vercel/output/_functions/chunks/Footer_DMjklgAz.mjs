import { c as createComponent, m as maybeRenderHead, g as renderScript, d as renderTemplate } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useRef, useState } from 'react';

const $$AOSInit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" media="print" onload="this.media='all'">${maybeRenderHead()}<noscript><link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css"></noscript>${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/AOSInit.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/AOSInit.astro", void 0);

const $$UtilityHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="utility-header" data-astro-cid-ju56vllu> <div class="utility-container" data-astro-cid-ju56vllu> <div class="relative group" data-astro-cid-ju56vllu> <a href="/managed-care?ref=topnav" class="utility-link" data-astro-cid-ju56vllu>
For Imaging Centers
<svg class="utility-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-ju56vllu> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-ju56vllu></path> </svg> </a> <!-- Tooltip --> <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-[#003087] text-white text-xs sm:text-sm px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 whitespace-nowrap pointer-events-none" data-astro-cid-ju56vllu> <div class="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#003087] rotate-45" data-astro-cid-ju56vllu></div>
Join our credentialed imaging network
</div> </div> </div> </div> `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/UtilityHeader.astro", void 0);

function PatientHeader({ showStickyBar = true }) {
  const headerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSearchBar = () => setShowSearchBar((prev) => !prev);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        ref: headerRef,
        className: "fixed top-0 left-0 right-0 z-50 bg-[#f8f2e1] border-b border-[#e6c378] shadow-sm w-full h-[76px] md:h-[90px] sticky-header-fix transition-all duration-300",
        children: /* @__PURE__ */ jsx("div", { className: "w-full px-4 pt-6 pb-4 md:pt-6 md:pb-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full md:hidden", children: [
            /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center pt-1", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/logo/USRad-Logo-final.png",
                alt: "USRad Logo",
                className: "h-10"
              }
            ) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "pt-4 p-2 focus:outline-none z-50",
                onClick: toggleMobileMenu,
                "aria-label": "Toggle menu",
                children: !mobileMenuOpen ? /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-[#003087]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) : /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex w-full items-center justify-between", children: [
            /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/logo/USRad-Logo-final.png",
                alt: "USRad Logo",
                className: "h-12"
              }
            ) }),
            /* @__PURE__ */ jsx("nav", { className: "flex justify-center space-x-6 md:space-x-8 lg:space-x-10 text-sm md:text-base font-medium text-[#003087]", children: [
              { href: "/about", label: "About" },
              { href: "/how-it-works", label: "How It Works" },
              { href: "/locations", label: "Locations" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Contact" }
            ].map((link) => /* @__PURE__ */ jsx(
              "a",
              {
                href: link.href,
                className: "relative hover:text-[#cc9933] transition-colors duration-200",
                children: /* @__PURE__ */ jsx("span", { className: "hover-underline-animation", children: link.label })
              },
              link.href
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 pt-2 md:pt-6", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/employer",
                  className: "bg-[#cc9933] text-white px-4 py-[6px] rounded-lg text-sm font-semibold shadow-md hover:bg-[#b5832d] transition duration-200",
                  children: "For Employers"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/login",
                  className: "px-3 py-1 border border-[#003087] text-sm font-medium text-[#003087] rounded-md hover:bg-[#003087]/10 transition",
                  children: "Login"
                }
              )
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed inset-0 bg-[#cc9933] text-[#003087] z-[1000] flex flex-col justify-between transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`,
        "aria-hidden": !mobileMenuOpen,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleMobileMenu,
              className: "absolute top-6 right-6 text-white p-2 z-50",
              "aria-label": "Close menu",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col pt-24 px-6 space-y-8 text-left text-2xl font-semibold", children: [
            [
              { href: "/about", label: "About" },
              { href: "/how-it-works", label: "How It Works" },
              { href: "/locations", label: "Locations" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Contact" }
            ].map((link) => /* @__PURE__ */ jsx(
              "a",
              {
                href: link.href,
                onClick: toggleMobileMenu,
                className: "text-2xl font-semibold hover:text-[#003087]/80 transition-colors",
                children: link.label
              },
              link.href
            )),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col pt-6 space-y-3", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/employer",
                  onClick: toggleMobileMenu,
                  className: "text-center px-4 py-2 border border-white text-white text-lg rounded-md hover:bg-white hover:text-[#cc9933] transition",
                  children: "For Employers"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/login",
                  onClick: toggleMobileMenu,
                  className: "text-center px-4 py-2 bg-white text-[#003087] text-lg rounded-md font-semibold hover:bg-[#f8f2e1] transition",
                  children: "Login"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-6 py-4 text-sm text-white text-center opacity-60", children: "© 2025 USRad. All rights reserved." })
        ]
      }
    ),
    showStickyBar && /* @__PURE__ */ jsxs("div", { className: "fixed left-0 right-0 top-[76px] md:top-[90px] z-40 bg-[#f8f2e1] shadow-md border-y border-[#e6c378] px-4 md:px-0 transition-all duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "flex items-center space-x-2 text-[#003087] font-semibold text-base",
            onClick: toggleSearchBar,
            "aria-expanded": showSearchBar,
            "aria-controls": "search-form",
            children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-5 h-5 text-[#cc9933]", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Find an Imaging Center" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: `w-5 h-5 text-[#cc9933] transform transition-transform duration-300 ${showSearchBar ? "" : "rotate-180"}`,
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          id: "search-form",
          className: `max-w-7xl mx-auto px-4 pb-4 transition-all duration-300 origin-top ${showSearchBar ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0 overflow-hidden"}`,
          children: /* @__PURE__ */ jsxs("form", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Type of scan (e.g. MRI)",
                className: "flex-1 border border-[#ccc] px-3 py-2 rounded-md text-sm"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "ZIP code or city",
                className: "flex-1 border border-[#ccc] px-3 py-2 rounded-md text-sm"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "bg-[#cc9933] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#b5832d]",
                children: "Find"
              }
            )
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .hover-underline-animation {
          position: relative;
        }
        .hover-underline-animation::after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #cc9933;
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .hover-underline-animation:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      ` })
  ] });
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-main" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-logo-section" data-astro-cid-sz7xmlte> <img src="/logo/USRad-Logo-final.png" alt="USRad Logo" class="footer-logo" data-astro-cid-sz7xmlte> <p class="footer-tagline" data-astro-cid-sz7xmlte>Medical Imaging Done Right</p> <!-- Contact Info --> <div class="footer-contact" data-astro-cid-sz7xmlte> <div class="contact-item" data-astro-cid-sz7xmlte> <span class="contact-icon" data-astro-cid-sz7xmlte>📞</span> <a href="tel:1-800-USR-RADO" class="contact-link" data-astro-cid-sz7xmlte>1-800-USRad-24</a> </div> <div class="contact-item" data-astro-cid-sz7xmlte> <span class="contact-icon" data-astro-cid-sz7xmlte>✉️</span> <a href="mailto:info@usrad.com" class="contact-link" data-astro-cid-sz7xmlte>info@usrad.com</a> </div> </div> <!-- Social Media Links --> <div class="social-links" data-astro-cid-sz7xmlte> <a href="https://www.linkedin.com/company/usrad" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn" data-astro-cid-sz7xmlte> <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://twitter.com/usrad" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter" data-astro-cid-sz7xmlte> <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </div> <div class="footer-columns" data-astro-cid-sz7xmlte> <!-- First Column: About USRad --> <div class="footer-column" data-astro-cid-sz7xmlte> <h3 class="footer-heading" data-astro-cid-sz7xmlte>Company</h3> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/about" class="footer-link" data-astro-cid-sz7xmlte>About Us</a></li> <li data-astro-cid-sz7xmlte><a href="/founder" class="footer-link" data-astro-cid-sz7xmlte>Meet the Founder</a></li> <li data-astro-cid-sz7xmlte><a href="/news" class="footer-link" data-astro-cid-sz7xmlte>News</a></li> <li data-astro-cid-sz7xmlte><a href="/careers" class="footer-link" data-astro-cid-sz7xmlte>Careers</a></li> </ul> </div> <!-- Second Column: For Patients --> <div class="footer-column" data-astro-cid-sz7xmlte> <h3 class="footer-heading" data-astro-cid-sz7xmlte>For Patients</h3> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/our-approach" class="footer-link" data-astro-cid-sz7xmlte>Our Approach</a> </li> <li data-astro-cid-sz7xmlte><a href="/how-it-works" class="footer-link" data-astro-cid-sz7xmlte>How It Works</a></li> <li data-astro-cid-sz7xmlte><a href="/locations" class="footer-link" data-astro-cid-sz7xmlte>Find a Center</a></li> <li data-astro-cid-sz7xmlte><a href="/faq" class="footer-link" data-astro-cid-sz7xmlte>Patient FAQs</a></li> <li data-astro-cid-sz7xmlte><a href="/contact" class="footer-link" data-astro-cid-sz7xmlte>Contact Us</a></li> </ul> </div> <!-- Third Column: For Employers --> <div class="footer-column" data-astro-cid-sz7xmlte> <h3 class="footer-heading" data-astro-cid-sz7xmlte>For Employers</h3> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/employer" class="footer-link" data-astro-cid-sz7xmlte>Employer Solutions</a> </li> <li data-astro-cid-sz7xmlte> <a href="/employer/schedule" class="footer-link" data-astro-cid-sz7xmlte>Schedule Consultation</a> </li> <li data-astro-cid-sz7xmlte> <a href="/employers/case-studies" class="footer-link" data-astro-cid-sz7xmlte>Case Studies</a> </li> <li data-astro-cid-sz7xmlte> <a href="/employers/pricing" class="footer-link" data-astro-cid-sz7xmlte>Pricing Information</a> </li> </ul> </div> <!-- Fourth Column: For Imaging Centers --> <div class="footer-column" data-astro-cid-sz7xmlte> <h3 class="footer-heading" data-astro-cid-sz7xmlte>For Imaging Centers</h3> <p class="footer-text" data-astro-cid-sz7xmlte>
Join our nationwide network of premium imaging centers and optimize
            your facility utilization.
</p> <a href="/managed-care" class="footer-button" data-astro-cid-sz7xmlte>Learn About Joining</a> <div class="quick-links" data-astro-cid-sz7xmlte> <a href="/imaging-center/apply" class="quick-link" data-astro-cid-sz7xmlte>Apply Now</a> <a href="/imaging-center/faq" class="quick-link" data-astro-cid-sz7xmlte>Network FAQs</a> </div> </div> </div> <!-- Newsletter Signup --> <div class="newsletter-section" data-astro-cid-sz7xmlte> <div class="newsletter-content" data-astro-cid-sz7xmlte> <h3 class="newsletter-title" data-astro-cid-sz7xmlte>Stay Updated</h3> <p class="newsletter-description" data-astro-cid-sz7xmlte>
Get the latest healthcare imaging insights and USRad news delivered
            to your inbox.
</p> </div> <form class="newsletter-form" action="#" method="POST" data-astro-cid-sz7xmlte> <input type="email" placeholder="Enter your email address" class="newsletter-input" required data-astro-cid-sz7xmlte> <button type="submit" class="newsletter-button" data-astro-cid-sz7xmlte>Subscribe</button> </form> </div> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="copyright" data-astro-cid-sz7xmlte>
&copy; ${currentYear} USRad. All rights reserved.
</div> <div class="certifications" data-astro-cid-sz7xmlte> <span class="cert-badge" data-astro-cid-sz7xmlte>HIPAA Compliant</span> <span class="cert-badge" data-astro-cid-sz7xmlte>SOC 2 Certified</span> </div> <div class="legal-links" data-astro-cid-sz7xmlte> <a href="/privacy-policy" class="footer-link" data-astro-cid-sz7xmlte>Privacy Policy</a> <a href="/terms-of-service" class="footer-link" data-astro-cid-sz7xmlte>Terms of Service</a> <a href="/accessibility" class="footer-link" data-astro-cid-sz7xmlte>Accessibility</a> </div> </div> </div> </footer> `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/Footer.astro", void 0);

export { $$AOSInit as $, PatientHeader as P, $$UtilityHeader as a, $$Footer as b };
