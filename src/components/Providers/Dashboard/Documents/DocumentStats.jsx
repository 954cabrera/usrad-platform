// src/components/Providers/Dashboard/Documents/DocumentStats.jsx
import React from "react";
import { FileText, Shield, HardDrive, TrendingUp } from "lucide-react";
import { documentStyles } from "./shared/styles";

export default function DocumentStats({ documents }) {
  // Calculate statistics
  const stats = {
    total: documents.length,
    encrypted: documents.filter((doc) => doc.encrypted).length,
    totalSize: documents.reduce((acc, doc) => {
      const size = parseFloat(doc.size);
      const unit = doc.size.match(/[A-Z]+/)[0];
      const multiplier = unit === "GB" ? 1024 : unit === "MB" ? 1 : 0.001;
      return acc + size * multiplier;
    }, 0),
    recentUploads: documents.filter((doc) => {
      const uploadDate = new Date(doc.uploadDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate > weekAgo;
    }).length,
  };

  const formatSize = (mb) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="document-stats">
      <div className="stat-card glass-card">
        <div className="stat-icon">
          <FileText size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.total}</p>
          <p className="stat-label">Total Documents</p>
        </div>
      </div>

      <div className="stat-card glass-card">
        <div className="stat-icon">
          <Shield size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.encrypted}</p>
          <p className="stat-label">Encrypted</p>
        </div>
      </div>

      <div className="stat-card glass-card mobile-hide">
        <div className="stat-icon">
          <HardDrive size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{formatSize(stats.totalSize)}</p>
          <p className="stat-label">Storage Used</p>
        </div>
      </div>

      <div className="stat-card glass-card mobile-hide">
        <div className="stat-icon">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.recentUploads}</p>
          <p className="stat-label">This Week</p>
        </div>
      </div>

      <style jsx>{`
        .document-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        /* Use the shared glass card style */
        .glass-card {
          ${documentStyles.glassCard}
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem !important;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .stat-content {
          min-width: 0;
        }

        .stat-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0.25rem 0 0 0;
        }

        /* Mobile optimization */
        .mobile-hide {
          display: flex;
        }

        @media (max-width: 768px) {
          .document-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-card {
            padding: 1rem !important;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-icon svg {
            width: 20px;
            height: 20px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }

          .mobile-hide {
            display: none !important;
          }
        }

        /* Small mobile */
        @media (max-width: 400px) {
          .stat-card {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }

        /* Touch states */
        @media (hover: none) {
          .stat-card:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
