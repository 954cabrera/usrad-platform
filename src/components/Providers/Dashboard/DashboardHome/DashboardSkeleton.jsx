// src/components/Providers/Dashboard/DashboardHome/DashboardSkeleton.jsx
import React from "react";
import { Skeleton, SkeletonCard, SkeletonText } from "../Skeleton";

export default function DashboardSkeleton() {
  return (
    <>
      {/* Skeleton Header */}
      <div className="welcome-header">
        <div className="welcome-content">
          <Skeleton
            style={{ height: "2rem", width: "300px", marginBottom: "0.5rem" }}
          />
          <Skeleton style={{ height: "1.125rem", width: "200px" }} />
        </div>
      </div>

      {/* Skeleton Stats */}
      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Skeleton Charts */}
      <div className="charts-section">
        <div className="chart-card glass-card">
          <SkeletonText lines={2} style={{ marginBottom: "1rem" }} />
          <Skeleton className="skeleton-chart" />
        </div>
        <div className="chart-card glass-card">
          <SkeletonText lines={2} style={{ marginBottom: "1rem" }} />
          <Skeleton className="skeleton-chart" />
        </div>
      </div>

      {/* Skeleton Activity */}
      <div className="activity-section">
        <div className="activity-card glass-card">
          <div className="section-header">
            <Skeleton style={{ height: "1.25rem", width: "120px" }} />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-activity">
              <Skeleton className="skeleton-activity-icon" />
              <div className="skeleton-activity-content">
                <Skeleton className="skeleton-activity-text" />
                <Skeleton className="skeleton-activity-time" />
              </div>
            </div>
          ))}
        </div>
        <div className="documents-card glass-card">
          <div className="section-header">
            <Skeleton style={{ height: "1.25rem", width: "140px" }} />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}
            >
              <Skeleton
                style={{ width: "40px", height: "40px", borderRadius: "8px" }}
              />
              <div style={{ flex: 1 }}>
                <Skeleton
                  style={{
                    height: "16px",
                    width: "60%",
                    marginBottom: "0.5rem",
                  }}
                />
                <Skeleton style={{ height: "14px", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
