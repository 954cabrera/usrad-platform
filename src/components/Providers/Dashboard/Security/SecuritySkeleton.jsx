// src/components/Providers/Dashboard/Security/SecuritySkeleton.jsx
import React from "react";
import { Skeleton } from "../Skeleton";

export default function SecuritySkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="security-header">
        <Skeleton
          style={{ height: "2rem", width: "200px", marginBottom: "0.5rem" }}
        />
        <Skeleton style={{ height: "1.125rem", width: "350px" }} />
      </div>

      {/* Security Score Skeleton */}
      <div
        className="glass-card"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <Skeleton
              style={{ height: "24px", width: "150px", marginBottom: "0.5rem" }}
            />
            <Skeleton style={{ height: "16px", width: "250px" }} />
          </div>
          <Skeleton
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Skeleton
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
              <Skeleton style={{ height: "16px", flex: 1 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          overflowX: "auto",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            style={{
              height: "40px",
              width: "100px",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Tab Content Skeleton */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "16px",
          padding: "1.5rem",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <Skeleton
            style={{ height: "20px", width: "180px", marginBottom: "0.5rem" }}
          />
          <Skeleton style={{ height: "16px", width: "300px" }} />
        </div>

        {/* Form Fields Skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3].map((i) => (
            <div key={i}>
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

        <Skeleton
          style={{
            height: "44px",
            width: "140px",
            borderRadius: "8px",
            marginTop: "1.5rem",
          }}
        />
      </div>

      <style jsx>{`
        .security-header {
          margin-bottom: 2rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        @media (max-width: 768px) {
          .security-header {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
