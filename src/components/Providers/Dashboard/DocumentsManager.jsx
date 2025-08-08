// src/components/Providers/Dashboard/DocumentsManager.jsx
import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Upload,
  Shield,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Grid,
  List,
  X,
} from "lucide-react";

export default function DocumentsManager({
  providerId,
  documents: initialDocuments = [],
}) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [downloading, setDownloading] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock function to log activity
  const logActivity = async (action, details) => {
    console.log("Activity:", action, details);
  };

  const downloadDocument = async (doc) => {
    setDownloading((prev) => ({ ...prev, [doc.id]: true }));

    try {
      // For testing: Create a mock download
      if (doc.storage_path.includes("test-123")) {
        const mockPdfContent = `
          USRad Network
          ${doc.document_type.replace(/_/g, " ")}
          
          Provider: ${providerId}
          Signed Date: ${new Date(doc.signed_date).toLocaleDateString()}
          
          This is a test document.
        `;

        const blob = new Blob([mockPdfContent], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${doc.document_type}_${new Date(doc.signed_date).toISOString().split("T")[0]}.pdf`;
        link.click();

        URL.revokeObjectURL(url);

        await logActivity("DOCUMENT_DOWNLOADED", {
          document_id: doc.id,
          document_type: doc.document_type,
        });
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document. Please try again.");
    } finally {
      setDownloading((prev) => ({ ...prev, [doc.id]: false }));
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case "PSA":
        return "📄";
      case "EXHIBIT_B":
        return "📋";
      case "INSURANCE":
        return "🛡️";
      case "CREDENTIAL":
        return "🏥";
      case "LICENSE":
        return "📜";
      default:
        return "📄";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "emerald";
      case "pending":
        return "amber";
      case "expired":
        return "red";
      default:
        return "gray";
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const documentTypes = [
    { value: "all", label: "All Documents" },
    { value: "PSA", label: "PSA" },
    { value: "EXHIBIT_B", label: "Exhibit B" },
    { value: "INSURANCE", label: "Insurance" },
    { value: "CREDENTIAL", label: "Credentials" },
    { value: "LICENSE", label: "Licenses" },
  ];

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesType =
      filterType === "all" || doc.document_type === filterType;
    const matchesSearch = doc.document_type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="documents-manager">
      {/* Header */}
      <div className="documents-header">
        <div className="header-content">
          <h2 className="section-title">Documents</h2>
          <p className="section-subtitle">
            Manage your agreements and compliance documents
          </p>
        </div>
        <button className="upload-btn glass-button desktop-only">
          <Upload size={20} />
          Upload Document
        </button>
      </div>

      {/* Security Notice */}
      <div className="security-notice glass-card">
        <Shield size={20} />
        <div className="notice-content">
          <p className="notice-title">Bank-Level Security</p>
          <p className="notice-text">
            All documents are encrypted and stored securely in compliance with
            HIPAA regulations
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        {/* Search */}
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Desktop Filters */}
        <div className="desktop-filters">
          {documentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`filter-btn ${filterType === type.value ? "active" : ""}`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter size={20} />
          <span>Filter</span>
        </button>

        {/* View Mode Toggle */}
        <div className="view-toggle desktop-only">
          <button
            onClick={() => setViewMode("grid")}
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal">
          <div
            className="filter-backdrop"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="filter-content">
            <div className="filter-header">
              <h3>Filter Documents</h3>
              <button
                className="close-btn"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>
            <div className="filter-options">
              {documentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setFilterType(type.value);
                    setShowMobileFilters(false);
                  }}
                  className={`filter-option ${filterType === type.value ? "active" : ""}`}
                >
                  <span>{type.label}</span>
                  {filterType === type.value && <CheckCircle size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Button Mobile */}
      <button className="upload-fab mobile-only">
        <Upload size={24} />
      </button>

      {/* Documents Grid/List */}
      <div className={`documents-container ${viewMode}`}>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="document-card glass-card">
              {/* Document Header */}
              <div className="document-header">
                <div className="document-icon-wrapper">
                  <span className="document-emoji">
                    {getDocumentIcon(doc.document_type)}
                  </span>
                  <FileText size={24} className="document-icon" />
                </div>
                <div className="document-meta">
                  <span
                    className={`status-badge ${getStatusColor(doc.status)}`}
                  >
                    {doc.status}
                  </span>
                  {doc.expires_date && (
                    <span className="expires-badge">
                      Expires {new Date(doc.expires_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Document Info */}
              <div className="document-body">
                <h3 className="document-title">
                  {doc.document_type.replace(/_/g, " ")}
                </h3>

                <div className="document-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>
                      Signed {new Date(doc.signed_date).toLocaleDateString()}
                    </span>
                  </div>

                  {doc.last_accessed && (
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>
                        Accessed{" "}
                        {new Date(doc.last_accessed).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="detail-item">
                    <FileText size={16} />
                    <span>{formatFileSize(doc.file_size || 245000)}</span>
                  </div>
                </div>
              </div>

              {/* Document Actions */}
              <div className="document-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => console.log("View document:", doc.id)}
                >
                  <Eye size={18} />
                  <span className="btn-label">View</span>
                </button>

                <button
                  className="action-btn download-btn"
                  onClick={() => downloadDocument(doc)}
                  disabled={downloading[doc.id]}
                >
                  <Download size={18} />
                  <span className="btn-label">
                    {downloading[doc.id] ? "Downloading..." : "Download"}
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FileText size={48} />
            </div>
            <h3>No documents found</h3>
            <p>Upload your first document to get started</p>
            <button className="upload-btn glass-button">
              <Upload size={20} />
              Upload Document
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .documents-manager {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .documents-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* Security Notice */
        .security-notice {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem !important;
          background: rgba(34, 197, 94, 0.1) !important;
          border-color: rgba(34, 197, 94, 0.2) !important;
          margin-bottom: 1.5rem;
        }

        .security-notice svg {
          color: #22c55e;
          flex-shrink: 0;
        }

        .notice-title {
          color: #22c55e;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .notice-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        /* Controls Bar */
        .controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

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
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        /* Desktop Filters */
        .desktop-filters {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
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
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 0.25rem;
        }

        .view-btn {
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 6px;
        }

        .view-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        /* Mobile Filter Modal */
        .mobile-filter-modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1000;
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
        }

        .filter-option.active {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        /* Upload FAB */
        .upload-fab {
          display: none;
          position: fixed;
          bottom: 80px;
          right: 1rem;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          z-index: 100;
        }

        /* Documents Container */
        .documents-container {
          display: grid;
          gap: 1.5rem;
        }

        .documents-container.grid {
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        }

        .documents-container.list {
          grid-template-columns: 1fr;
        }

        /* Document Card */
        .document-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .document-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .document-icon-wrapper {
          position: relative;
          width: 48px;
          height: 48px;
        }

        .document-emoji {
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 1.5rem;
          filter: grayscale(0.2);
        }

        .document-icon {
          width: 48px;
          height: 48px;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .document-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.emerald {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .status-badge.amber {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .status-badge.red {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .expires-badge {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Document Body */
        .document-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          text-transform: capitalize;
          margin-bottom: 0.75rem;
        }

        .document-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .detail-item svg {
          flex-shrink: 0;
        }

        /* Document Actions */
        .document-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .view-btn {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .view-btn:hover {
          background: rgba(59, 130, 246, 0.2);
        }

        .download-btn {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .download-btn:hover {
          background: rgba(34, 197, 94, 0.2);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Empty State */
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .empty-state h3 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          margin-bottom: 1.5rem;
        }

        /* Utilities */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          /* Header */
          .documents-header {
            flex-direction: column;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: flex !important;
          }

          /* Security Notice */
          .security-notice {
            flex-direction: column;
            text-align: center;
          }

          /* Controls */
          .controls-bar {
            flex-direction: column;
            width: 100%;
          }

          .search-container {
            width: 100%;
          }

          .desktop-filters {
            display: none;
          }

          .mobile-filter-btn {
            display: flex;
            width: 100%;
            justify-content: center;
          }

          /* Mobile Filter Modal */
          .mobile-filter-modal {
            display: block;
          }

          /* Upload FAB */
          .upload-fab {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          /* Documents Grid */
          .documents-container.grid {
            grid-template-columns: 1fr;
          }

          /* Document Card */
          .document-card {
            padding: 1rem !important;
          }

          .document-title {
            font-size: 1.125rem;
          }

          .btn-label {
            display: none;
          }

          .action-btn {
            padding: 0.625rem;
          }

          /* List view on mobile */
          .documents-container.list .document-card {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
            padding: 1rem !important;
          }

          .documents-container.list .document-header {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
          }

          .documents-container.list .document-meta {
            display: none;
          }

          .documents-container.list .document-body {
            flex: 1;
          }

          .documents-container.list .document-details {
            display: none;
          }

          .documents-container.list .document-actions {
            margin: 0;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .document-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .document-card:active {
            transform: scale(0.98);
          }

          .action-btn:active {
            transform: scale(0.95);
          }
        }

        /* Safe areas for iOS */
        @supports (padding: env(safe-area-inset-bottom)) {
          .upload-fab {
            bottom: calc(80px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
