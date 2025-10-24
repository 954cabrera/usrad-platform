// src/components/Providers/Dashboard/Centers/CenterStats.jsx
import React from "react";
import { Building2, Camera, Shield } from "lucide-react";
import { centerStyles } from "./shared/styles";

export default function CenterStats({ centers }) {
  const stats = {
    total: centers.length,
    active: centers.filter((c) => c.status === "active").length,
    totalEquipment: centers.reduce(
      (acc, center) => acc + (center.equipment?.length || 0),
      0
    ),
  };

  return (
    <div className="stats-row">
      <div className="stat-card glass-card">
        <div className="stat-icon">
          <Building2 size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.total}</p>
          <p className="stat-label">Total Centers</p>
        </div>
      </div>

      <div className="stat-card glass-card">
        <div className="stat-icon">
          <Camera size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.totalEquipment}</p>
          <p className="stat-label">Equipment</p>
        </div>
      </div>

      <div className="stat-card glass-card mobile-hide">
        <div className="stat-icon">
          <Shield size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-value">{stats.active}</p>
          <p className="stat-label">Active</p>
        </div>
      </div>

      <style jsx>{`
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .glass-card {
          ${centerStyles.glassCard}
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
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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

        .stat-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .mobile-hide {
          display: flex;
        }

        @media (max-width: 768px) {
          .mobile-hide {
            display: none !important;
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
        }

        @media (hover: none) {
          .stat-card:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
