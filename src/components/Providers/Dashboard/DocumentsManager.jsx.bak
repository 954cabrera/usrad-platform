// src/components/Providers/Dashboard/DocumentsManager.jsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  Search,
  Upload,
  Plus,
  Shield,
  FileText,
} from "lucide-react";
import DocumentCard from "./Documents/DocumentCard";
import DocumentFilters from "./Documents/DocumentFilters";
import DocumentStats from "./Documents/DocumentStats";
import UploadModal from "./Documents/UploadModal";
import DocumentsSkeleton from "./Documents/DocumentsSkeleton";
import { dashboardStyles } from "./shared/styles";

export default function DocumentsManager({ providerId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const [filters, setFilters] = useState({
    category: "All",
    dateRange: "all",
  });

  const [documents] = useState([
    {
      id: 1,
      name: "Provider Service Agreement 2025",
      type: "pdf",
      size: "2.4 MB",
      category: "PSA",
      uploadDate: "2025-08-01",
      encrypted: true,
      verified: true,
    },
    // ... more documents
  ]);

  useEffect(() => {
    // Simulate loading documents
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleDownload = (doc) => {
    console.log("Downloading:", doc.name);
  };

  const handleView = (doc) => {
    console.log("Viewing:", doc.name);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filters.category === "All" || doc.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="documents-manager">
        <DocumentsSkeleton />
      </div>
    );
  }

  return (
    <div className="documents-manager">
      {/* Header */}
      <div className="documents-header">
        <div className="header-content">
          <h2 className="section-title">Documents</h2>
          <p className="section-subtitle">
            Securely manage and access your documents
          </p>
        </div>
        <button
          className="upload-btn desktop-only"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={20} />
          Upload Document
        </button>
      </div>

      {/* Security Notice */}
      <div className="security-notice">
        <Shield size={20} />
        <p>
          All documents are encrypted and stored securely in compliance with
          HIPAA regulations.
        </p>
      </div>

      {/* Stats */}
      <DocumentStats documents={documents} />

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <DocumentFilters
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          showMobileFilters={showMobileFilters}
          onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
        />

        <div className="view-toggle desktop-only">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Documents Display */}
      {viewMode === "grid" ? (
        <div className="documents-grid">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              viewMode={viewMode}
              onDownload={handleDownload}
              onView={handleView}
              showActionMenu={showActionMenu}
              onToggleMenu={setShowActionMenu}
            />
          ))}
        </div>
      ) : (
        <div className="documents-list">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              viewMode={viewMode}
              onDownload={handleDownload}
              onView={handleView}
              showActionMenu={showActionMenu}
              onToggleMenu={setShowActionMenu}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No documents found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Upload FAB (Mobile) */}
      <button
        className="upload-fab mobile-only"
        onClick={() => setShowUploadModal(true)}
        aria-label="Upload document"
      >
        <Plus size={24} />
      </button>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}

      <style jsx>{`
        .documents-manager {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ===== USING SHARED STYLES ===== */

        /* 1. Section header styles from shared (this replaces the individual .section-title and .section-subtitle styles) */
        ${dashboardStyles.sectionHeader}

        /* 2. Upload button uses shared primary button style (this replaces most of the .upload-btn styles) */
        .upload-btn {
          ${dashboardStyles.primaryButton}
        }

        /* 3. FAB uses shared floating action button style (this replaces most of the .upload-fab styles) */
        .upload-fab {
          ${dashboardStyles.floatingActionButton}
        }

        /* 4. Utility classes from shared */
        .desktop-only {
          ${dashboardStyles.utilities.desktopOnly}
        }

        .mobile-only {
          ${dashboardStyles.utilities.mobileOnly}
        }

        /* ===== COMPONENT-SPECIFIC STYLES (not in shared) ===== */

        /* Header - only the layout, not the text styles */
        .documents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        /* Security Notice - unique to documents */
        .security-notice {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          margin-bottom: 2rem;
          color: #22c55e;
        }

        .security-notice p {
          font-size: 0.875rem;
          margin: 0;
        }

        /* Controls Bar */
        .controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        /* Search - could potentially be shared but has specific styles */
        .search-container {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .search-input {
          ${dashboardStyles.formInput}
          padding-left: 3rem; /* Override for icon space */
        }

        /* View Toggle - specific to documents */
        .view-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 0.25rem;
        }

        .view-btn {
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .view-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        /* Documents Grid/List - specific layouts */
        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .documents-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .empty-state h3 {
          color: white;
          font-size: 1.25rem;
          margin: 1rem 0 0.5rem;
        }

        /* Mobile Overrides */
        @media (max-width: 768px) {
          .documents-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .controls-bar {
            flex-direction: column;
            width: 100%;
          }

          .search-container {
            width: 100%;
          }

          .documents-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .security-notice {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Touch States - only for elements not covered by shared styles */
        @media (hover: none) {
          .view-btn:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
