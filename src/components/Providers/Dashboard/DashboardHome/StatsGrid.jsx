// src/components/Providers/Dashboard/DashboardHome/StatsGrid.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

export default function StatsGrid({ stats, recentDocuments }) {
  // Update stats with actual document count
  const updatedStats = stats.map((stat) => {
    if (stat.id === 1) {
      return { ...stat, value: recentDocuments.length || 1 };
    }
    return stat;
  });

  return (
    <div className="stats-grid">
      {updatedStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="stat-card glass-card">
            <div className="stat-header">
              <div
                className="stat-icon"
                style={{
                  background: stat.bgColor,
                  borderColor: stat.borderColor,
                  color: stat.iconColor,
                }}
              >
                <Icon size={24} />
              </div>
              {stat.trend && (
                <span className="stat-trend" style={{ color: stat.iconColor }}>
                  {stat.trend}
                </span>
              )}
            </div>

            <div className="stat-body">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">
                <span className="desktop-label">{stat.label}</span>
                <span className="mobile-label">{stat.mobileLabel}</span>
              </div>
              {stat.subtext && (
                <div className="stat-subtext">{stat.subtext}</div>
              )}
            </div>

            {stat.status && (
              <div className="stat-footer">
                <span className={`status-badge ${stat.color}`}>
                  {stat.status}
                </span>
                {stat.label === "Compliance Score" && (
                  <span className="trust-indicator">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
