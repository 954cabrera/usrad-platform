import React, { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand/BrandLogo";

const REMIX_URL = import.meta.env.PUBLIC_REMIX_URL || "https://app.usrad.com";

// Apple-Style Desktop Login Dropdown Component
function AppleStyleLoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const loginOptions = [
    {
      href: "/login/patientlogin",
      title: "Patient Portal",
      subtitle: "Book appointments • View results"
    },
    {
      href: "/login/imaginglogin", 
      title: "Imaging Center",
      subtitle: "Provider dashboard • Analytics"
    },
    {
      href: "/login/referrallogin",
      title: "Referring Physician", 
      subtitle: "Medical referrals • Collaboration"
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 text-sm font-medium text-[#003087] rounded-md hover:bg-black/5 transition-all duration-200 flex items-center gap-1.5 ${isOpen ? 'bg-black/5' : ''}`}
      >
        Login
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-1 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
            <div className="p-1">
              {loginOptions.map((option, index) => (
                <a
                  key={option.href}
                  href={option.href}
                  className={`flex flex-col px-4 py-3 hover:bg-black/5 transition-all duration-150 group ${index === 0 ? 'rounded-t-xl' : index === loginOptions.length - 1 ? 'rounded-b-xl' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-sm font-medium text-gray-900 mb-0.5">
                    {option.title}
                  </div>
                  <div className="text-xs text-gray-500 font-normal">
                    {option.subtitle}
                  </div>
                </a>
              ))}
            </div>
            
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50/50">
              <div className="text-xs text-gray-400 text-center">
                Secure access to your USRad account
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Apple-Style Mobile Login Dropdown Component
function AppleStyleMobileLoginDropdown({ onMenuClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const loginOptions = [
    {
      href: "/login/patientlogin",
      title: "Patient Portal",
      subtitle: "Book appointments • View results"
    },
    {
      href: "/login/imaginglogin", 
      title: "Imaging Center",
      subtitle: "Provider dashboard • Analytics"
    },
    {
      href: "/login/referrallogin",
      title: "Referring Physician",
      subtitle: "Medical referrals • Collaboration"
    }
  ];

  const handleOptionClick = (href) => {
    setIsOpen(false);
    onMenuClose();
    window.location.href = href;
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-center px-4 py-2 bg-white/95 backdrop-blur-sm text-[#003087] text-lg rounded-xl font-medium hover:bg-white transition-all duration-200 flex items-center justify-between ${isOpen ? 'bg-white' : ''}`}
      >
        <span>Login</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
          {loginOptions.map((option, index) => (
            <button
              key={option.href}
              onClick={() => handleOptionClick(option.href)}
              className={`w-full flex flex-col p-3 bg-white/90 hover:bg-white rounded-lg transition-all duration-150 group text-left ${index !== loginOptions.length - 1 ? 'mb-1' : ''}`}
            >
              <div className="text-sm font-medium text-[#003087] mb-0.5">
                {option.title}
              </div>
              <div className="text-xs text-gray-600 font-normal">
                {option.subtitle}
              </div>
            </button>
          ))}
          
          <div className="border-t border-white/20 px-3 py-2 mt-1">
            <div className="text-xs text-white/70 text-center">
              Secure access to your USRad account
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal Search Component
function SearchModal({ isOpen, onClose }) {
  const [searchData, setSearchData] = useState({
    zipCode: '',
    procedure: '70551',
    state: 'FL'
  });
  const [isSearching, setIsSearching] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus on ZIP input when modal opens
      setTimeout(() => {
        const zipInput = document.getElementById('modal-zipcode');
        if (zipInput) zipInput.focus();
      }, 100);

      // Handle escape key
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleZipCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    handleInputChange('zipCode', value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchData.zipCode || searchData.zipCode.length !== 5) {
      alert('Please enter a valid 5-digit ZIP code.');
      return;
    }

    setIsSearching(true);

    try {
      const searchParams = new URLSearchParams({
        zip: searchData.zipCode
      });

      window.location.href = `${REMIX_URL}/pbs/search?${searchParams.toString()}`;
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const quickFillLocation = (zipCode, cityName) => {
    setSearchData(prev => ({ ...prev, zipCode }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#003087]">Find Imaging Centers</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="p-6 space-y-4">
            <div>
              <label htmlFor="modal-zipcode" className="block text-sm font-medium text-[#003087] mb-2">
                ZIP Code *
              </label>
              <input
                id="modal-zipcode"
                type="text"
                value={searchData.zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter ZIP code"
                required
                pattern="[0-9]{5}"
                maxLength="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="modal-procedure" className="block text-sm font-medium text-[#003087] mb-2">
                Procedure
              </label>
              <select
                id="modal-procedure"
                value={searchData.procedure}
                onChange={(e) => handleInputChange('procedure', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
              >
                <option value="70551">MRI Brain (without contrast)</option>
                <option value="73721">MRI Knee</option>
                <option value="72148">MRI Spine</option>
                <option value="74181">CT Abdomen</option>
                <option value="70450">CT Head</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-state" className="block text-sm font-medium text-[#003087] mb-2">
                State
              </label>
              <select
                id="modal-state"
                value={searchData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
              >
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-[#cc9933] text-white font-semibold py-3 rounded-lg hover:bg-[#b5832d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                  Find Centers
                </>
              )}
            </button>
          </form>

          {/* Quick Locations */}
          <div className="px-6 pb-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3 mt-4">Popular locations:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { zip: '33012', city: 'Miami' },
                { zip: '32801', city: 'Orlando' },
                { zip: '33602', city: 'Tampa' },
                { zip: '30309', city: 'Atlanta' }
              ].map((location) => (
                <button
                  key={location.zip}
                  type="button"
                  onClick={() => quickFillLocation(location.zip, location.city)}
                  className="text-sm bg-gray-100 text-[#003087] px-3 py-1 rounded-full hover:bg-[#cc9933] hover:text-white transition-colors"
                >
                  {location.city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Updated Header Search Component
function HeaderSearch({ showSearchBar, onToggleSearch }) {
  const [showModal, setShowModal] = useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
  };

  const handleQuickDemo = () => {
    window.location.href = '/pricing?zipCode=33330&procedure=70551&state=FL&autoSearch=true';
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-[76px] md:top-[90px] z-40 bg-[#f8f2e1] shadow-md border-y border-[#e6c378] px-4 md:px-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          <button
            className="flex items-center space-x-2 text-[#003087] font-semibold text-base"
            onClick={handleSearchClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#cc9933]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <span>Find an Imaging Center</span>
          </button>
          
          <button
            onClick={handleQuickDemo}
            className="hidden md:flex items-center space-x-1 bg-[#cc9933] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#b5832d] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Quick Demo</span>
          </button>
        </div>
      </div>

      <SearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

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
                <BrandLogo
                  variant="primary"
                  className="h-10"
                  alt="USRad Logo"
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
                <BrandLogo
                  variant="primary"
                  className="h-12"
                  alt="USRad Logo"
                />
              </a>
              <nav className="flex justify-center space-x-6 md:space-x-8 lg:space-x-10 text-sm md:text-base font-medium text-[#003087]">

                {[
                  { href: "/about", label: "About" },
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/education/what-is-an-mri?", label: "What is an MRI?" },
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
                  href="/employer"
                  className="bg-[#cc9933] text-white px-4 py-[6px] rounded-lg text-sm font-semibold shadow-md hover:bg-[#b5832d] transition duration-200"
                >
                  For Employers
                </a>
                
                {/* Apple-Style Desktop Login Dropdown */}
                <AppleStyleLoginDropdown />

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
            { href: "/education/what-is-an-mri?", label: "What is an MRI?" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMobileMenu}
              className="text-2xl font-semibold hover:text-[#003087]/80 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col pt-6 space-y-3">
            <a
              href="/employer"
              onClick={toggleMobileMenu}
              className="text-center px-4 py-2 border border-white text-white text-lg rounded-md hover:bg-white hover:text-[#cc9933] transition"
            >
              For Employers
            </a>
            
            {/* Apple-Style Mobile Login Dropdown */}
            <AppleStyleMobileLoginDropdown onMenuClose={toggleMobileMenu} />
          </div>

        </div>

        <div className="px-6 py-4 text-sm text-white text-center opacity-60">
          © 2025 USRad. All rights reserved.
        </div>
      </div>

      {showStickyBar && (
  <HeaderSearch 
    showSearchBar={showSearchBar} 
    onToggleSearch={toggleSearchBar}
  />
)}

      <style>{`
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