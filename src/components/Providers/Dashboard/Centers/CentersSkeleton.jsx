// src/components/Providers/Dashboard/Centers/CentersSkeleton.jsx
import React from "react";
import { Skeleton } from "../Skeleton";

export default function CentersSkeleton() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="centers-header">
        <div className="header-content">
          <Skeleton
            style={{ height: "2rem", width: "200px", marginBottom: "0.5rem" }}
          />
          <Skeleton style={{ height: "1.125rem", width: "300px" }} />
        </div>
        <Skeleton
          style={{ height: "48px", width: "160px", borderRadius: "12px" }}
        />
      </div>

      {/* Stats Skeleton */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <Skeleton
                style={{ width: "48px", height: "48px", borderRadius: "12px" }}
              />
              <Skeleton
                style={{ width: "60px", height: "24px", borderRadius: "12px" }}
              />
            </div>
            <Skeleton
              style={{ height: "32px", width: "80px", marginBottom: "0.5rem" }}
            />
            <Skeleton style={{ height: "16px", width: "120px" }} />
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
            height: "48px",
            flex: 1,
            minWidth: "200px",
            borderRadius: "12px",
          }}
        />
        <Skeleton
          style={{ height: "48px", width: "150px", borderRadius: "12px" }}
        />
      </div>

      {/* Centers Grid Skeleton */}
      <div className="centers-grid">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass-card"
            style={{ padding: "1.5rem", minHeight: "400px" }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Skeleton
                style={{ height: "24px", width: "70%", marginBottom: "0.5rem" }}
              />
              <Skeleton style={{ height: "16px", width: "90%" }} />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <Skeleton
                style={{
                  height: "16px",
                  width: "100%",
                  marginBottom: "0.5rem",
                }}
              />
              <Skeleton style={{ height: "16px", width: "80%" }} />
            </div>

            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}
            >
              {[1, 2, 3, 4].map((j) => (
                <Skeleton
                  key={j}
                  style={{
                    height: "28px",
                    width: "60px",
                    borderRadius: "14px",
                  }}
                />
              ))}
            </div>

            <Skeleton
              style={{ height: "1px", width: "100%", margin: "1.5rem 0" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton
                style={{ height: "36px", width: "100px", borderRadius: "8px" }}
              />
              <Skeleton
                style={{ height: "36px", width: "100px", borderRadius: "8px" }}
              />
            </div>
          </div>
        ))}

        {/* Add Card Skeleton - Desktop Only */}
        <div
          className="glass-card desktop-only"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            borderStyle: "dashed",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Skeleton
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                margin: "0 auto 1rem",
              }}
            />
            <Skeleton
              style={{
                height: "20px",
                width: "120px",
                margin: "0 auto 0.5rem",
              }}
            />
            <Skeleton
              style={{ height: "16px", width: "100px", margin: "0 auto" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .centers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .centers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .desktop-only {
          display: block;
        }

        @media (max-width: 768px) {
          .centers-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .centers-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
