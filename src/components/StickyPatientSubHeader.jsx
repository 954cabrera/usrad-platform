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
  const [scanType, setScanType] = useState("");
  const [location, setLocation] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scanType || !location) return;
    window.location.href = `/book?scan=${encodeURIComponent(scanType)}&location=${encodeURIComponent(location)}`;
  };

  const handleScanInput = (e) => {
    const value = e.target.value;
    setScanType(value);
    if (value.trim() === "") {
      setFilteredOptions([]);
    } else {
      const filtered = scanOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setHighlightedIndex(-1);
    }
  };

  const handleOptionClick = (option) => {
    setScanType(option);
    setFilteredOptions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        e.preventDefault();
        handleOptionClick(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setFilteredOptions([]);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#e6c378] shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-6xl mx-auto px-4 py-2 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between"
      >
        <div className="relative w-full sm:flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type of scan (e.g. MRI)"
            className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
            value={scanType}
            onChange={handleScanInput}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          {filteredOptions.length > 0 && scanType.trim() !== "" && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto text-sm">
              {filteredOptions.map((option, index) => (
                <li
                  key={option}
                  className={`px-4 py-2 cursor-pointer ${index === highlightedIndex ? "bg-[#fcf9f0] font-semibold" : "hover:bg-[#fcf9f0]"}`}
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
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#cc9933] text-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#cc9933] text-[#003087] font-bold px-5 py-2 rounded-md shadow hover:bg-[#e6c378] transition text-sm"
        >
          Find
        </button>
      </form>
    </div>
  );
}