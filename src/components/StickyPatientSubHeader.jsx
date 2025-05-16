import { useState, useEffect, useRef } from "react";

const scanOptions = [
  "MRI without Contrast",
  "MRI with Contrast",
  "MRI without and with Contrast",
  "CT without Contrast",
  "CT with Contrast",
  "CT without and with Contrast",
  "X-Ray",
  "Ultrasound",
  "Mammogram",
];

export default function StickyPatientSubHeader() {
  // Main state
  const [scanType, setScanType] = useState("");
  const [location, setLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  // Refs
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Handle outside clicks for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add custom animation class and handle scroll
  useEffect(() => {
    // Add animation styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Handle scroll behavior
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.head.removeChild(styleElement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scanType || !location) return;
    window.location.href = `/book?scan=${encodeURIComponent(scanType)}&location=${encodeURIComponent(location)}`;
  };

  // Handle scan input change
  const handleScanInput = (e) => {
    const value = e.target.value;
    setScanType(value);
    
    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowDropdown(false);
    } else {
      const filtered = scanOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(filtered.length > 0);
      setHighlightedIndex(-1);
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setScanType(option);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    
    // Keep expanded on mobile
    if (window.innerWidth < 640) {
      setIsExpanded(true);
    }
    
    // Focus the location input after selection
    setTimeout(() => {
      const locationInput = document.querySelector('input[placeholder="ZIP code or city"]');
      if (locationInput) locationInput.focus();
    }, 100);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        (prev + 1) % filteredOptions.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        e.preventDefault();
        handleOptionClick(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // Toggle mobile expansion
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // If expanding, focus the scan input after a brief delay
    if (!isExpanded) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
      
      // Add a subtle animation when expanding
      const formElement = document.querySelector('.search-form-container');
      if (formElement) {
        formElement.classList.add('animate-fadeIn');
        setTimeout(() => {
          formElement.classList.remove('animate-fadeIn');
        }, 500);
      }
    }
  };

  return (
    <div 
      ref={headerRef} 
      className={`
        ${isScrolled ? "fixed top-0 left-0 right-0" : "relative"} 
        z-30 bg-white/95 backdrop-blur border-b border-[#e6c378] shadow-sm
      `}
      style={{ 
        transition: "all 0.3s ease-in-out"
      }}
    >
      {/* Desktop View: Display form directly with proper spacing */}
      <div className="hidden sm:block pt-5 pb-5 bg-[#f8f0d8]/50">
        <form
          onSubmit={handleSubmit}
          className="relative max-w-6xl mx-auto px-4 flex gap-4 items-center"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type of scan (e.g. MRI)"
              className="search-field w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
              value={scanType}
              onChange={handleScanInput}
              onFocus={() => {
                if (filteredOptions.length > 0) {
                  setShowDropdown(true);
                }
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            
            {/* Dropdown menu */}
            {showDropdown && (
              <ul 
                ref={dropdownRef}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto text-sm"
              >
                {filteredOptions.map((option, index) => (
                  <li
                    key={option}
                    className={`px-4 py-2 cursor-pointer ${
                      index === highlightedIndex
                        ? "bg-[#fcf9f0] font-semibold"
                        : "hover:bg-[#fcf9f0]"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="ZIP code or city"
            className="search-field w-64 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          
          <button
            type="submit"
            className="find-button bg-[#cc9933] text-[#003087] font-bold px-5 py-2 rounded-md shadow hover:bg-[#e6c378] transition text-sm whitespace-nowrap"
          >
            Find
          </button>
        </form>
      </div>

      {/* Mobile View: Toggle button and collapsible form */}
      <div className="block sm:hidden">
        <div className="px-4 py-2">
          <button
            type="button"
            onClick={toggleExpanded}
            className="flex items-center justify-between w-full bg-[#fcf9f0] text-[#003087] font-medium px-3 py-2 rounded-md border border-[#e6c378] shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center">
              {/* Search Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                fill="currentColor" 
                viewBox="0 0 16 16" 
                className="mr-2 text-[#cc9933]"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <span className="font-semibold">{isExpanded ? "Hide Search" : "Find an Imaging Center"}</span>
            </div>
            
            {/* Chevron Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
              className={`transition-transform duration-300 text-[#cc9933] ${isExpanded ? "rotate-180" : ""}`}
            >
              <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </button>
        </div>

        {/* Mobile Search Form */}
        <div className={`${isExpanded ? "block" : "hidden"} search-form-container transition-all duration-300 px-4 pb-2`}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type of scan (e.g. MRI)"
                className="search-field w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
                value={scanType}
                onChange={handleScanInput}
                onFocus={() => {
                  if (filteredOptions.length > 0) {
                    setShowDropdown(true);
                  }
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              
              {/* Dropdown menu */}
              {showDropdown && (
                <ul 
                  ref={dropdownRef}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto text-sm"
                >
                  {filteredOptions.map((option, index) => (
                    <li
                      key={option}
                      className={`px-4 py-2 cursor-pointer ${
                        index === highlightedIndex
                          ? "bg-[#fcf9f0] font-semibold"
                          : "hover:bg-[#fcf9f0]"
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ZIP code or city"
                className="search-field flex-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="find-button bg-[#cc9933] text-[#003087] font-bold px-5 py-2 rounded-md shadow hover:bg-[#e6c378] transition text-sm whitespace-nowrap"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        /* Enhanced search fields */
        .search-field {
          border: 1px solid rgba(0, 48, 135, 0.15);
          border-radius: 6px;
          padding: 0.75rem 1rem;
          font-family: var(--font-manrope, 'Manrope', system-ui, sans-serif);
          font-size: 1rem;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .search-field:focus {
          border-color: rgba(204, 153, 51, 0.5);
          box-shadow: 0 1px 3px rgba(204, 153, 51, 0.2);
          outline: none;
        }

        .search-field::placeholder {
          color: rgba(0, 48, 135, 0.4);
          font-weight: 400;
        }

        /* Enhanced Find button */
        .find-button {
          background-color: #cc9933;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-manrope, 'Manrope', system-ui, sans-serif);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .find-button:hover {
          background-color: #b88a2a;
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .find-button:active {
          transform: translateY(0);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}