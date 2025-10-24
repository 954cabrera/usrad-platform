// src/components/Providers/Dashboard/Documents/DocumentsSkeleton.jsx
import React from "react";
import { Skeleton } from "../Skeleton";

export default function DocumentsSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="documents-header">
        <div className="header-content">
          <Skeleton
            style={{ height: "2rem", width: "150px", marginBottom: "0.5rem" }}
          />
          <Skeleton style={{ height: "1rem", width: "280px" }} />
        </div>
        <Skeleton
          style={{ height: "44px", width: "160px", borderRadius: "12px" }}
        />
      </div>

      {/* Security Notice Skeleton */}
      <div
        style={{
          padding: "1rem",
          background: "rgba(34, 197, 94, 0.05)",
          borderRadius: "12px",
          marginBottom: "2rem",
        }}
      >
        <Skeleton
          style={{ height: "16px", width: "400px", maxWidth: "100%" }}
        />
      </div>

      {/* Stats Skeleton */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem" }}>
            <Skeleton
              style={{ height: "16px", width: "100px", marginBottom: "0.5rem" }}
            />
            <Skeleton style={{ height: "32px", width: "80px" }} />
          </div>
        ))}
      </div>

      {/* Controls Bar Skeleton */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <Skeleton
          style={{
            height: "44px",
            flex: 1,
            minWidth: "200px",
            borderRadius: "12px",
          }}
        />
        <Skeleton
          style={{ height: "44px", width: "120px", borderRadius: "12px" }}
        />
        <Skeleton
          style={{ height: "44px", width: "100px", borderRadius: "8px" }}
        />
      </div>

      {/* Document Grid Skeleton */}
      <div className="documents-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <Skeleton
                style={{ width: "48px", height: "48px", borderRadius: "12px" }}
              />
              <div style={{ flex: 1 }}>
                <Skeleton
                  style={{
                    height: "18px",
                    width: "70%",
                    marginBottom: "0.5rem",
                  }}
                />
                <Skeleton style={{ height: "14px", width: "50%" }} />
              </div>
            </div>
            <Skeleton
              style={{ height: "14px", width: "100%", marginBottom: "1rem" }}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Skeleton
                style={{ height: "36px", flex: 1, borderRadius: "8px" }}
              />
              <Skeleton
                style={{ height: "36px", flex: 1, borderRadius: "8px" }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .documents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        @media (max-width: 768px) {
          .documents-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .documents-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}
