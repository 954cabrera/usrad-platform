// src/components/Providers/Dashboard/Centers/CenterFilters.jsx
import React from "react";
import { Filter, X, Check } from "lucide-react";
import { centerStyles } from "./shared/styles";

export default function CenterFilters({
  activeFilter,
  onFilterChange,
  showMobileFilters,
  onToggleMobileFilters,
}) {
  const filterOptions = [
    { value: "all", label: "All Centers", count: null },
    { value: "active", label: "Active", count: null },
    { value: "pending", label: "Pending", count: null },
    { value: "inactive", label: "Inactive", count: null },
  ];

  return (
    <>
      {/* Desktop Status Filters */}
      <div className="desktop-filters">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`filter-btn ${activeFilter === option.value ? "active" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile Filter Button */}
      <button className="mobile-filter-btn" onClick={onToggleMobileFilters}>
        <Filter size={20} />
        <span>Filter</span>
      </button>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal">
          <div className="filter-backdrop" onClick={onToggleMobileFilters} />
          <div className="filter-content">
            <div className="filter-header">
              <h3>Filter Centers</h3>
              <button
                className="close-btn"
                onClick={onToggleMobileFilters}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="filter-options">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilterChange(option.value);
                    onToggleMobileFilters();
                  }}
                  className={`filter-option ${activeFilter === option.value ? "active" : ""}`}
                >
                  <span>{option.label}</span>
                  {activeFilter === option.value && <Check size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Desktop Filters */
        .desktop-filters {
          ${centerStyles.desktopOnly}
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-btn.active {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        /* Mobile Filter Button */
        .mobile-filter-btn {
          ${centerStyles.mobileOnly}
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          ${centerStyles.touchButton}
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
          max-height: 80vh;
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
          ${centerStyles.touchButton}
        }

        .filter-option.active {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        @supports (padding: env(safe-area-inset-bottom)) {
          .filter-content {
            padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
}
