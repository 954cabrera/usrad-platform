// src/components/Providers/Onboarding/PSA/HelperButtons.jsx
import React from "react";

export default function HelperButtons({ type, onAction }) {
  if (type === "signed-check") {
    return (
      <div
        id="signed-check-button"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          zIndex: 99999,
          background: "#f59e0b",
          color: "white",
          padding: "20px 28px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(245, 158, 11, 0.4)",
          cursor: "pointer",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 600,
          textAlign: "center",
          border: "none",
          transition: "all 0.3s ease",
          maxWidth: "360px",
          animation: "slideInUp 0.5s ease-out",
        }}
        onClick={() => onAction("signed")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.background = "#d97706";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#f59e0b";
        }}
      >
        <div style={{ fontSize: "16px", marginBottom: "6px" }}>
          📝 Have you signed the PSA?
        </div>
        <div
          style={{
            fontSize: "13px",
            marginBottom: "8px",
            opacity: 0.9,
            lineHeight: 1.4,
          }}
        >
          DocuSeal may ask you to review each field.
          <br />
          After reviewing, click here:
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          ✅ Yes, I've Signed & Reviewed
        </div>
      </div>
    );
  }

  if (type === "ready-continue") {
    return (
      <div
        id="ready-to-continue-button"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          zIndex: 99999,
          background: "#22c55e",
          color: "white",
          padding: "20px 28px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(34, 197, 94, 0.4)",
          cursor: "pointer",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 600,
          textAlign: "center",
          border: "none",
          transition: "all 0.3s ease",
          maxWidth: "320px",
          animation: "slideInUp 0.5s ease-out",
        }}
        onClick={() => onAction("continue")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.background = "#059669";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#22c55e";
        }}
      >
        <div style={{ fontSize: "16px", marginBottom: "6px" }}>
          🎉 Ready to continue?
        </div>
        <div style={{ fontSize: "13px", marginBottom: "12px", opacity: 0.9 }}>
          Click below to complete your onboarding:
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          🚀 Continue
        </div>
      </div>
    );
  }

  return null;
}
