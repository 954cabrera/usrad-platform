// ============================================================================
// ⚠️  SOURCE OF TRUTH: Changes here must be synced to Remix
// ============================================================================
//
// Synced file: app/components/pbs/PBSHeader.tsx (Remix booking app)
//
// After making changes:
// 1. Update PBSHeader.tsx in Remix to match
// 2. Update "Last synced" date in both files
//
//  Last synced: 2025-12-26
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand/BrandLogo";

// Add CSS animation for smooth dropdown appearance
const dropdownStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;

// ✅ Environment-aware Remix URL for login redirects
const REMIX_URL = import.meta.env.PUBLIC_REMIX_URL || "http://localhost:5173";

export default function CarbonHeader({ isHeroPage = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for desktop transition
      setIsScrolled(currentScrollY > 50);

      // Mobile auto-hide logic
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide header
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          setIsVisible(true);
        }
      } else {
        // Desktop - always visible
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Determine header styling based on hero page and scroll state
  const getHeaderStyles = () => {
    if (isHeroPage && !isScrolled) {
      // Transparent header for hero sections
      return {
        background: "bg-transparent",
        textColor: "text-white",
        hoverColor: "hover:text-white/80",
        betaBg: "bg-white/20",
        betaText: "text-white",
        buttonBg: "bg-white/10 border-white/30",
        buttonText: "text-white",
        buttonHover: "hover:bg-white/20",
        // B2B link styles for transparent header
        b2bText: "text-white/60",
        b2bHover: "hover:text-white/80",
        b2bDivider: "text-white/30",
      };
    } else {
      // White header (default or after scroll)
      return {
        background: isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-white",
        textColor: "text-gray-700",
        hoverColor: "hover:text-[#003087]",
        betaBg: "bg-[#cc9933]",
        betaText: "text-white",
        buttonBg: "bg-[#003087]",
        buttonText: "text-white",
        buttonHover: "hover:bg-[#002266]",
        // B2B link styles for white header
        b2bText: "text-gray-400",
        b2bHover: "hover:text-gray-600",
        b2bDivider: "text-gray-300",
      };
    }
  };

  const styles = getHeaderStyles();

  return (
    <>
      {/* Inject animation styles */}
      <style dangerouslySetInnerHTML={{ __html: dropdownStyles }} />

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${styles.background}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <BrandLogo
                  variant={isHeroPage && !isScrolled ? "white" : "primary"}
                  className="h-10 w-auto transition-all duration-300"
                  alt="USRad Logo"
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/how-it-works"
                className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}
              >
                How it works
              </a>
              {/* <a href="/pricing" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                Pricing
              </a> */}
              <a
                href="/education/what-is-an-mri"
                className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}
              >
                What is an MRI?
              </a>
              <a
                href="/about"
                className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}
              >
                About us
              </a>
              <a
                href="/contact"
                className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}
              >
                Contact
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Subtle B2B Links - Desktop Only */}
              <div className="flex items-center text-xs">
                <a
                  href="/employer"
                  className={`transition-all duration-300 ${styles.b2bText} ${styles.b2bHover}`}
                >
                  For Employers
                </a>
                <span className={`mx-2 ${styles.b2bDivider}`}>|</span>
                <a
                  href="/provider"
                  className={`transition-all duration-300 ${styles.b2bText} ${styles.b2bHover}`}
                >
                  For Imaging Centers
                </a>
                <span className={`mx-3 ${styles.b2bDivider}`}>|</span>
              </div>

              <LoginDropdown isHeroPage={isHeroPage} isScrolled={isScrolled} />
              <a
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${styles.buttonBg} ${styles.buttonText} ${styles.buttonHover}`}
              >
                Book Scan
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? (
                <svg
                  className={`w-6 h-6 transition-colors duration-300 ${styles.textColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M 4 6 h 16 M 4 12 h 16 M 4 18 h 16"
                  />
                </svg>
              ) : (
                <svg
                  className={`w-6 h-6 transition-colors duration-300 ${styles.textColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M 6 18 L 18 6 M 6 6 l 12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold text-[#003087]">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M 6 18 L 18 6 M 6 6 l 12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="p-4">
            <div className="space-y-1">
              <MobileNavLink
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </MobileNavLink>
              {/*<MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </MobileNavLink> */}
              <MobileNavLink
                href="/education/what-is-an-mri"
                onClick={() => setMobileMenuOpen(false)}
              >
                What is an MRI?
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About us
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </div>

            {/* Mobile Actions */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <MobileLoginSection onClose={() => setMobileMenuOpen(false)} />
              <a
                href="/"
                className="block w-full bg-[#003087] text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-[#002266] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Scan
              </a>
            </div>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t">
              <a
                href="/employer"
                className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-[#003087]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>For Employers</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M 9 5 l 7 7 l -7 7"
                  />
                </svg>
              </a>
              <a
                href="/provider"
                className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-[#003087]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>For Imaging Centers</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M 9 5 l 7 7 l -7 7"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block py-3 text-base font-medium text-gray-700 hover:text-[#003087] transition"
    >
      {children}
    </a>
  );
}

// Desktop Login Dropdown
function LoginDropdown({ isHeroPage, isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loginOptions = [
    {
      href: `${REMIX_URL}/patient/login`,
      title: "Member Portal",
      subtitle: "View results & book scans",
      icon: (
        <img
          src="/images/icons/patient.svg"
          alt="Member Portal"
          className="w-5 h-5"
        />
      ),
      color: "text-[#003087]",
      bgColor: "bg-[#003087]/10",
    },
    {
      href: `${REMIX_URL}/login`,
      title: "Imaging Center",
      subtitle: "Manage facility & reports",
      icon: (
        <img
          src="/images/icons/mri-machine.svg"
          alt="Imaging Center"
          className="w-5 h-5"
        />
      ),
      color: "text-[#cc9933]",
      bgColor: "bg-[#cc9933]/10",
    },
    {
      href: "/login/referrallogin",
      title: "Physician Portal",
      subtitle: "Refer patients & view reports",
      icon: (
        <img
          src="/images/icons/analytic.svg"
          alt="Physician Portal"
          className="w-5 h-5"
        />
      ),
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
    },
  ];

  // Determine text color based on hero page and scroll state
  const textColor =
    isHeroPage && !isScrolled
      ? "text-white hover:text-white/80"
      : "text-gray-700 hover:text-[#003087]";
  const iconColor = isHeroPage && !isScrolled ? "text-white" : "text-gray-500";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${textColor}`}
      >
        <img
          src="/images/icons/lock.svg"
          alt="Sign in"
          className={`w-4 h-4 transition-all duration-300 ${iconColor}`}
        />
        Sign in
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M 19 9 l -7 7 l -7 -7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Choose Portal
              </p>
            </div>
            {loginOptions.map((option, index) => (
              <a
                key={option.href}
                href={option.href}
                className="flex items-center gap-3 px-3 py-3 mt-1 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                >
                  <span className={option.color}>{option.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
                    {option.title}
                  </p>
                  <p className="text-xs text-gray-500">{option.subtitle}</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M 9 5 l 7 7 l -7 7"
                  />
                </svg>
              </a>
            ))}
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Secure login
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Login Section
function MobileLoginSection({ onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const loginOptions = [
    {
      href: `${REMIX_URL}/patient/login`,
      title: "Member Portal",
      subtitle: "View results & book scans",
      icon: (
        <img
          src="/images/icons/patient.svg"
          alt="Member Portal"
          className="w-5 h-5"
        />
      ),
      color: "text-[#003087]",
      bgColor: "bg-[#003087]/10",
    },
    {
      href: `${REMIX_URL}/login`,
      title: "Imaging Center",
      subtitle: "Manage facility & reports",
      icon: (
        <img
          src="/images/icons/mri-machine.svg"
          alt="Imaging Center"
          className="w-5 h-5"
        />
      ),
      color: "text-[#cc9933]",
      bgColor: "bg-[#cc9933]/10",
    },
    {
      href: "/login/referrallogin",
      title: "Physician Portal",
      subtitle: "Refer patients & view reports",
      icon: (
        <img
          src="/images/icons/analytic.svg"
          alt="Physician Portal"
          className="w-5 h-5"
        />
      ),
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <img src="/images/icons/lock.svg" alt="Sign in" className="w-4 h-4" />
          <span>Sign in</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M 9 5 l 7 7 l -7 7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-2 pb-2 space-y-1">
          {loginOptions.map((option) => (
            <a
              key={option.href}
              href={option.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white transition-all group"
              onClick={onClose}
            >
              <div
                className={`w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
              >
                <span className={option.color}>{option.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {option.title}
                </p>
                <p className="text-xs text-gray-500">{option.subtitle}</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M 9 5 l 7 7 l -7 7"
                />
              </svg>
            </a>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Secure login
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
