import React, { useEffect, useRef, useState } from "react";

export default function PatientHeader({ showStickyBar = true }) {
  const headerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSearchBar = () => setShowSearchBar((prev) => !prev);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f2e1] border-b border-[#e6c378] shadow-sm w-full h-[76px] md:h-[90px] sticky-header-fix transition-all duration-300"
      >
        <div className="w-full px-4 pt-6 pb-4 md:pt-6 md:pb-5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* === Mobile: Logo + Hamburger === */}
            <div className="flex items-center justify-between w-full md:hidden">
              <a href="/" className="flex items-center pt-1">
                <img
                  src="/logo/USRad-Logo-final.png"
                  alt="USRad Logo"
                  className="h-10"
                />
              </a>
              <button
                className="pt-4 p-2 focus:outline-none z-50"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {!mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#003087]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* === Desktop: Logo + Nav === */}
            <div className="hidden md:flex w-full items-center justify-between">
              <a href="/" className="flex items-center">
                <img
                  src="/logo/USRad-Logo-final.png"
                  alt="USRad Logo"
                  className="h-12"
                />
              </a>
              <nav className="flex justify-center space-x-6 md:space-x-8 lg:space-x-10 text-sm md:text-base font-medium text-[#003087]">

                {[
                  { href: "/about", label: "About" },
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/locations", label: "Locations" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative hover:text-[#cc9933] transition-colors duration-200"
                  >
                    <span className="hover-underline-animation">{link.label}</span>
                  </a>
                ))}
              </nav>
              <div className="flex items-center space-x-4 pt-2 md:pt-6">

                <a
                  href="/partner"
                  className="bg-[#cc9933] text-white px-4 py-[6px] rounded-lg text-sm font-semibold shadow-md hover:bg-[#b5832d] transition duration-200"
                >
                  For Employers
                </a>
                <a
                  href="/login"
                  className="px-3 py-1 border border-[#003087] text-sm font-medium text-[#003087] rounded-md hover:bg-[#003087]/10 transition"
                >
                  Login
                </a>

              </div>


            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-[#cc9933] text-[#003087] z-[1000] flex flex-col justify-between transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-6 right-6 text-white p-2 z-50"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col pt-24 px-6 space-y-8 text-left text-2xl font-semibold">
          {[
            { href: "/about", label: "About" },
            { href: "/how-it-works", label: "How It Works" },
            { href: "/locations", label: "Locations" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact" },
            { href: "/partner", label: "Partner" },
            { href: "/login", label: "Login" },
          ].map((link) => (

            <a
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="hover:underline transition-colors duration-200 hover:text-[#003087]/80"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="px-6 py-4 text-sm text-white text-center opacity-60">
          © 2025 USRad. All rights reserved.
        </div>
      </div>

      {showStickyBar && (
        <div className="fixed left-0 right-0 top-[76px] md:top-[90px] z-40 bg-[#f8f2e1] shadow-md border-y border-[#e6c378] px-4 md:px-0 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
            <button
              className="flex items-center space-x-2 text-[#003087] font-semibold text-base"
              onClick={toggleSearchBar}
              aria-expanded={showSearchBar}
              aria-controls="search-form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#cc9933]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <span>Find an Imaging Center</span>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 text-[#cc9933] transform transition-transform duration-300 ${showSearchBar ? "" : "rotate-180"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div
            id="search-form"
            className={`max-w-7xl mx-auto px-4 pb-4 transition-all duration-300 origin-top ${showSearchBar ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0 overflow-hidden"}`}
          >
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Type of scan (e.g. MRI)"
                className="flex-1 border border-[#ccc] px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="ZIP code or city"
                className="flex-1 border border-[#ccc] px-3 py-2 rounded-md text-sm"
              />
              <button
                type="submit"
                className="bg-[#cc9933] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#b5832d]"
              >
                Find
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
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
      `}</style>
    </>
  );
}
