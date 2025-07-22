import React, { useEffect, useRef, useState } from "react";

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Determine header styling based on hero page and scroll state
  const getHeaderStyles = () => {
    if (isHeroPage && !isScrolled) {
      // Transparent header for hero sections
      return {
        background: 'bg-transparent',
        textColor: 'text-white',
        hoverColor: 'hover:text-white/80',
        logoFilter: 'brightness-0 invert',
        betaBg: 'bg-white/20',
        betaText: 'text-white',
        buttonBg: 'bg-white/10 border-white/30',
        buttonText: 'text-white',
        buttonHover: 'hover:bg-white/20'
      };
    } else {
      // White header (default or after scroll)
      return {
        background: isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white',
        textColor: 'text-gray-700',
        hoverColor: 'hover:text-[#003087]',
        logoFilter: '',
        betaBg: 'bg-[#cc9933]',
        betaText: 'text-white',
        buttonBg: 'bg-[#003087]',
        buttonText: 'text-white',
        buttonHover: 'hover:bg-[#002266]'
      };
    }
  };

  const styles = getHeaderStyles();

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${styles.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/index-carbon" className="flex items-center">
                <img 
                  src="/logo/USRad-Logo-final-rev.png" 
                  alt="USRad Logo" 
                  className={`h-10 w-auto transition-all duration-300 ${styles.logoFilter}`}
                />
                <span className={`ml-2 text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${styles.betaBg} ${styles.betaText}`}>
                  BETA
                </span>
              </a>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/how-it-works-carbon" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                How it works
              </a>
              <a href="/pricing" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                Pricing
              </a>
              <a href="/education/what-is-an-mri-carbon" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                What is an MRI?
              </a>
              <a href="/about-carbon" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                About
              </a>
              <a href="/contact-carbon" className={`text-sm font-medium transition-all duration-300 ${styles.textColor} ${styles.hoverColor}`}>
                Contact
              </a>
            </nav>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <LoginDropdown isHeroPage={isHeroPage} isScrolled={isScrolled} />
              <a
                href="/search-results"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${styles.buttonBg} ${styles.buttonText} ${styles.buttonHover}`}
              >
                Book scan
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? (
                <svg className={`w-6 h-6 transition-colors duration-300 ${styles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className={`w-6 h-6 transition-colors duration-300 ${styles.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold text-[#003087]">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="p-4">
            <div className="space-y-1">
              <MobileNavLink href="/how-it-works-carbon" onClick={() => setMobileMenuOpen(false)}>
                How it works
              </MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </MobileNavLink>
              <MobileNavLink href="/education/what-is-an-mri-carbon" onClick={() => setMobileMenuOpen(false)}>
                What is an MRI?
              </MobileNavLink>
              <MobileNavLink href="/about-carbon" onClick={() => setMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact-carbon" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
            </div>

            {/* Mobile Actions */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <MobileLoginSection onClose={() => setMobileMenuOpen(false)} />
              <a
                href="/search-results"
                className="block w-full bg-[#003087] text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-[#002266] transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book scan
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/managed-care"
                className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-[#003087]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>For Imaging Centers</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loginOptions = [
    {
      href: "/login/patientlogin",
      title: "Patient Portal",
      icon: "👤"
    },
    {
      href: "/login/imaginglogin", 
      title: "Imaging Center",
      icon: "🏥"
    },
    {
      href: "/login/referrallogin",
      title: "Physician Portal", 
      icon: "👨‍⚕️"
    }
  ];

  // Determine text color based on hero page and scroll state
  const textColor = (isHeroPage && !isScrolled) ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-[#003087]';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 ${textColor}`}
      >
        Sign in
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          {loginOptions.map((option) => (
            <a
              key={option.href}
              href={option.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium text-gray-700">{option.title}</span>
            </a>
          ))}
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
      href: "/login/patientlogin",
      title: "Patient Portal",
      icon: "👤"
    },
    {
      href: "/login/imaginglogin", 
      title: "Imaging Center",
      icon: "🏥"
    },
    {
      href: "/login/referrallogin",
      title: "Physician Portal", 
      icon: "👨‍⚕️"
    }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-700"
      >
        <span>Sign in</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="px-1 pb-1">
          {loginOptions.map((option) => (
            <a
              key={option.href}
              href={option.href}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white transition"
              onClick={onClose}
            >
              <span>{option.icon}</span>
              <span className="text-sm text-gray-700">{option.title}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}