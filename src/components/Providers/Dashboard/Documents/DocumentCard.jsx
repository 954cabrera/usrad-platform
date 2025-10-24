// src/components/Providers/Dashboard/Documents/DocumentCard.jsx
import React from "react";
import {
  FileText,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  Shield,
  Check,
} from "lucide-react";
import { documentStyles } from "./shared/styles";

export default function DocumentCard({
  document,
  viewMode,
  onDownload,
  onView,
  showActionMenu,
  onToggleMenu,
}) {
  // STEP 1: Create helper functions that use the shared styles
  const getFileIcon = (type) => {
    return documentStyles.fileIcons[type] || documentStyles.fileIcons.default;
  };

  const getCategoryColor = (category) => {
    return (
      documentStyles.categoryColors[category] ||
      documentStyles.categoryColors.Other
    );
  };

  if (viewMode === "list") {
    return (
      <div className="document-list-item">
        <div className="doc-icon">
          {/* STEP 2: Use the helper function to get the icon */}
          <span className="file-emoji">{getFileIcon(document.type)}</span>
        </div>

        <div className="doc-info">
          <h4 className="doc-name">{document.name}</h4>
          <div className="doc-meta">
            <span className="doc-size">{document.size}</span>
            <span className="separator">•</span>
            <span className="doc-date">{document.uploadDate}</span>
            {document.encrypted && (
              <>
                <span className="separator">•</span>
                <Shield size={12} className="encrypted-icon" />
              </>
            )}
          </div>
        </div>

        <div className="doc-category desktop-only">
          {/* STEP 3: Use inline styles with the color object */}
          <span
            className="category-badge"
            style={{
              background: getCategoryColor(document.category).bg,
              color: getCategoryColor(document.category).color,
            }}
          >
            {document.category}
          </span>
        </div>

        <div className="doc-actions">
          <button
            className="action-btn desktop-only"
            onClick={() => onView(document)}
            aria-label="View document"
          >
            <Eye size={16} />
          </button>
          <button
            className="action-btn desktop-only"
            onClick={() => onDownload(document)}
            aria-label="Download document"
          >
            <Download size={16} />
          </button>
          <button
            className="action-btn mobile-only"
            onClick={() => onToggleMenu(document.id)}
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </button>
        </div>

        {showActionMenu === document.id && (
          <div className="mobile-action-menu">
            <button onClick={() => onView(document)}>
              <Eye size={16} /> View
            </button>
            <button onClick={() => onDownload(document)}>
              <Download size={16} /> Download
            </button>
          </div>
        )}

        {/* STEP 4: Define styles - some using shared, some component-specific */}
        <style>{`
          .document-list-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            transition: all 0.2s;
            position: relative;
          }

          .document-list-item:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .doc-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .file-emoji {
            font-size: 1.5rem;
          }

          .doc-info {
            flex: 1;
            min-width: 0;
          }

          .doc-name {
            color: white;
            font-weight: 500;
            margin: 0 0 0.25rem 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .doc-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.813rem;
            color: rgba(255, 255, 255, 0.6);
          }

          .encrypted-icon {
            color: #22c55e;
          }

          .separator {
            opacity: 0.3;
          }

          .category-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .doc-actions {
            display: flex;
            gap: 0.5rem;
          }

          .action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: white;
            cursor: pointer;
            transition: all 0.2s;
          }

          .action-btn:hover {
            background: rgba(255, 255, 255, 0.15);
          }

          .mobile-action-menu {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 0.5rem;
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            z-index: 10;
            min-width: 150px;
          }

          .mobile-action-menu button {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
            padding: 0.75rem 1rem;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;
            cursor: pointer;
            text-align: left;
            transition: background 0.2s;
          }

          .mobile-action-menu button:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          /* Responsive utilities */
          .desktop-only {
            display: flex;
          }

          .mobile-only {
            display: none;
          }

          @media (max-width: 768px) {
            .desktop-only {
              display: none !important;
            }

            .mobile-only {
              display: flex !important;
            }

            .document-list-item {
              padding: 0.75rem;
            }

            .doc-icon {
              width: 40px;
              height: 40px;
            }

            .file-emoji {
              font-size: 1.25rem;
            }

            .doc-name {
              font-size: 0.875rem;
            }

            .doc-meta {
              font-size: 0.75rem;
            }
          }

          @media (hover: none) {
            .document-list-item:active {
              transform: scale(0.98);
            }

            .action-btn:active {
              transform: scale(0.95);
            }
          }
        `}</style>
      </div>
    );
  }

  // Grid view
  return (
    <div className="document-card glass-card">
      <div className="card-header">
        <div className="file-type">
          <span className="file-emoji">{getFileIcon(document.type)}</span>
          <span className="file-ext">.{document.type}</span>
        </div>
        <button
          className="more-btn"
          onClick={() => onToggleMenu(document.id)}
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="card-body">
        <h4 className="doc-name">{document.name}</h4>
        <p className="doc-size">{document.size}</p>

        <div className="doc-badges">
          <span
            className="category-badge"
            style={{
              background: getCategoryColor(document.category).bg,
              color: getCategoryColor(document.category).color,
            }}
          >
            {document.category}
          </span>
          {document.encrypted && (
            <span className="encrypted-badge">
              <Shield size={12} />
              Encrypted
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="upload-info">
          <Calendar size={14} />
          <span>{document.uploadDate}</span>
        </div>
        {document.verified && (
          <div className="verified-badge">
            <Check size={14} />
            Verified
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="action-btn primary" onClick={() => onView(document)}>
          <Eye size={16} />
          <span>View</span>
        </button>
        <button
          className="action-btn secondary"
          onClick={() => onDownload(document)}
        >
          <Download size={16} />
          <span className="desktop-only">Download</span>
        </button>
      </div>

      {showActionMenu === document.id && (
        <div className="dropdown-menu">
          <button>Share</button>
          <button>Rename</button>
          <button className="danger">Delete</button>
        </div>
      )}

      <style>{`
        /* STEP 5: Use the shared glass card style */
        .glass-card {
          ${documentStyles.glassCard}
          position: relative;
          overflow: visible;
        }

        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .file-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .file-emoji {
          font-size: 1.5rem;
        }

        .file-ext {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .more-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .more-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .card-body {
          margin-bottom: 1rem;
        }

        .doc-name {
          color: white;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        .doc-size {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0 0 0.75rem 0;
        }

        .doc-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .category-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .encrypted-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;
        }

        .upload-info {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.813rem;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #22c55e;
          font-size: 0.813rem;
          font-weight: 500;
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }

        .action-btn.primary {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.15);
        }

        .dropdown-menu {
          position: absolute;
          top: 60px;
          right: 0;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 10;
          min-width: 150px;
        }

        .dropdown-menu button {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }

        .dropdown-menu button:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .dropdown-menu button.danger {
          color: #ef4444;
        }

        .desktop-only {
          display: inline;
        }

        @media (max-width: 768px) {
          .glass-card {
            padding: 1rem;
          }

          .card-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }

          .desktop-only {
            display: none !important;
          }
        }

        @media (hover: none) {
          .glass-card:active {
            transform: scale(0.98);
          }

          .action-btn:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
