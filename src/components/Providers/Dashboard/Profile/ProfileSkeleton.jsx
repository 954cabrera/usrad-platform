// src/components/Providers/Dashboard/Profile/ProfileSkeleton.jsx
import React from "react";
import { Skeleton } from "../Skeleton";

export default function ProfileSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="profile-header">
        <div className="header-content">
          <Skeleton
            style={{ height: "2rem", width: "250px", marginBottom: "0.5rem" }}
          />
          <Skeleton style={{ height: "1.125rem", width: "400px" }} />
        </div>
        <Skeleton
          style={{ height: "48px", width: "140px", borderRadius: "12px" }}
        />
      </div>

      {/* Section Skeletons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="profile-section glass-card"
          style={{ marginBottom: "1.5rem" }}
        >
          <div className="section-header">
            <Skeleton style={{ height: "24px", width: "200px" }} />
          </div>

          <div className="form-grid">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="form-group">
                <Skeleton
                  style={{
                    height: "14px",
                    width: "120px",
                    marginBottom: "0.5rem",
                  }}
                />
                <Skeleton
                  style={{ height: "44px", width: "100%", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
