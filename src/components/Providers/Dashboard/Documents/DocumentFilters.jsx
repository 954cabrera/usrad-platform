// src/components/Providers/Dashboard/Documents/DocumentFilters.jsx
import React from "react";
import { Filter, Calendar, X, Check } from "lucide-react";
import { documentStyles } from "./shared/styles";

export default function DocumentFilters({
  activeFilters,
  onFilterChange,
  showMobileFilters,
  onToggleMobileFilters,
}) {
  const categories = [
    "All",
    "PSA",
    "Insurance",
    "Compliance",
    "Financial",
    "Other",
  ];
  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "year", label: "This Year" },
  ];

  return (
    <>
      {/* Desktop Filters */}
      <div className="desktop-filters">
        <div className="filter-group">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-chip ${activeFilters.category === category ? "active" : ""}`}
              onClick={() => onFilterChange("category", category)}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          className="date-filter"
          value={activeFilters.dateRange}
          onChange={(e) => onFilterChange("dateRange", e.target.value)}
        >
          {dateRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Button */}
      <button className="mobile-filter-btn" onClick={onToggleMobileFilters}>
        <Filter size={20} />
        <span>Filters</span>
        {(activeFilters.category !== "All" ||
          activeFilters.dateRange !== "all") && (
          <span className="filter-count">
            {
              [
                activeFilters.category !== "All",
                activeFilters.dateRange !== "all",
              ].filter(Boolean).length
            }
          </span>
        )}
      </button>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal">
          <div className="filter-backdrop" onClick={onToggleMobileFilters} />
          <div className="filter-content">
            <div className="filter-header">
              <h3>Filter Documents</h3>
              <button
                className="close-btn"
                onClick={onToggleMobileFilters}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="filter-section">
              <h4>Category</h4>
              <div className="filter-options">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-option ${activeFilters.category === category ? "active" : ""}`}
                    onClick={() => onFilterChange("category", category)}
                  >
                    <span>{category}</span>
                    {activeFilters.category === category && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Date Range</h4>
              <div className="filter-options">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    className={`filter-option ${activeFilters.dateRange === range.value ? "active" : ""}`}
                    onClick={() => onFilterChange("dateRange", range.value)}
                  >
                    <span>{range.label}</span>
                    {activeFilters.dateRange === range.value && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button
                className="reset-btn"
                onClick={() => {
                  onFilterChange("category", "All");
                  onFilterChange("dateRange", "all");
                }}
              >
                Reset Filters
              </button>
              <button className="apply-btn" onClick={onToggleMobileFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Desktop Filters - visible only on desktop */
        .desktop-filters {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .desktop-filters {
            display: none;
          }
        }

        .filter-group {
          display: flex;
          gap: 0.5rem;
        }

        .filter-chip {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-chip.active {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        .date-filter {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .date-filter:focus {
          outline: none;
          border-color: #667eea;
        }

        /* Mobile Filter Button - visible only on mobile */
        .mobile-filter-btn {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          position: relative;
        }

        @media (max-width: 768px) {
          .mobile-filter-btn {
            display: flex;
          }
        }

        .filter-count {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: #667eea;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Mobile Filter Modal */
        .mobile-filter-modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .mobile-filter-modal {
            display: block;
          }
        }

        .filter-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .filter-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0f172a;
          border-radius: 24px 24px 0 0;
          padding: 1.5rem;
          max-height: 85vh;
          overflow-y: auto;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .filter-header h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0.5rem;
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-section h4 {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .filter-option.active {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .filter-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reset-btn,
        .apply-btn {
          flex: 1;
          padding: 0.875rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .apply-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        /* Touch States */
        @media (hover: none) {
          .filter-chip:active,
          .filter-option:active {
            transform: scale(0.95);
          }

          .mobile-filter-btn:active {
            transform: scale(0.98);
          }
        }

        /* Safe areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .filter-content {
            padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
}
