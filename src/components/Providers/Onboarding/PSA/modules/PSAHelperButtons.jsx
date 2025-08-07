// src/components/Providers/Onboarding/PSA/modules/PSAHelperButtons.jsx
import React, { useState, useEffect } from "react";

export const SignedCheckButton = ({ onConfirm }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Add animation styles to head if not already present
    if (!document.getElementById("helper-button-animations")) {
      const style = document.createElement("style");
      style.id = "helper-button-animations";
      style.textContent = `
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translate(-50%, 100px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const baseStyles = {
    position: "fixed",
    zIndex: "99999",
    background: isHovered ? "#d97706" : "#f59e0b",
    color: "white",
    padding: isMobile ? "16px 20px" : "20px 28px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(245, 158, 11, 0.4)",
    cursor: "pointer",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: "600",
    textAlign: "center",
    border: "none",
    transition: "all 0.3s ease",
    animation: "slideInUp 0.5s ease-out",
  };

  const desktopStyles = {
    bottom: "80px",
    right: "20px",
    maxWidth: "360px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const mobileStyles = {
    bottom: "20px",
    left: "50%",
    transform: isHovered ? "translateX(-50%) scale(1.02)" : "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: "320px",
  };

  const buttonStyles = {
    ...baseStyles,
    ...(isMobile ? mobileStyles : desktopStyles),
  };

  return (
    <div
      id="signed-check-button"
      style={buttonStyles}
      onClick={onConfirm}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{ fontSize: isMobile ? "15px" : "16px", fontWeight: "700" }}
        >
          📝 Have you signed the PSA?
        </div>
        <div
          style={{
            fontSize: isMobile ? "12px" : "13px",
            opacity: "0.9",
            lineHeight: "1.4",
          }}
        >
          DocuSeal may ask you to review each field.
          <br />
          After reviewing, click here:
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: isMobile ? "8px 12px" : "10px 16px",
            borderRadius: "8px",
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: "700",
            marginTop: "4px",
          }}
        >
          ✅ Yes, I've Signed & Reviewed
        </div>
      </div>
    </div>
  );
};

export const ReadyToContinueButton = ({ onContinue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseStyles = {
    position: "fixed",
    zIndex: "99999",
    background: isHovered ? "#059669" : "#22c55e",
    color: "white",
    padding: isMobile ? "16px 20px" : "20px 28px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(34, 197, 94, 0.4)",
    cursor: "pointer",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: "600",
    textAlign: "center",
    border: "none",
    transition: "all 0.3s ease",
    animation: "slideInUp 0.5s ease-out",
  };

  const desktopStyles = {
    bottom: "80px",
    right: "20px",
    maxWidth: "320px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const mobileStyles = {
    bottom: "20px",
    left: "50%",
    transform: isHovered ? "translateX(-50%) scale(1.02)" : "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: "320px",
  };

  const buttonStyles = {
    ...baseStyles,
    ...(isMobile ? mobileStyles : desktopStyles),
  };

  return (
    <div
      id="ready-to-continue-button"
      style={buttonStyles}
      onClick={onContinue}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{ fontSize: isMobile ? "15px" : "16px", fontWeight: "700" }}
        >
          🎉 Ready to continue?
        </div>
        <div style={{ fontSize: isMobile ? "12px" : "13px", opacity: "0.9" }}>
          Click below to complete your onboarding:
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: isMobile ? "8px 12px" : "10px 16px",
            borderRadius: "8px",
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: "700",
            marginTop: "4px",
          }}
        >
          🚀 Continue
        </div>
      </div>
    </div>
  );
};
