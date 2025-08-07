// src/components/Providers/Onboarding/PSA/modules/PSACompletionOverlay.jsx
import React, { useState, useEffect } from "react";

export default function PSACompletionOverlay({ psaData, isVisible }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isVisible) return null;

  const signerEmail = psaData?.signer?.email || "your email";

  return (
    <div className="completion-overlay" id="completion-overlay">
      <div className={`overlay-content ${isMobile ? "mobile" : ""}`}>
        <div className="success-icon">🎉</div>

        <h2>PSA Completed Successfully!</h2>

        <p className="success-message">
          Welcome to the USRad Network! You're now ready to start serving
          patients.
        </p>

        <div className="email-notification">
          <p className="email-title">📧 Check Your Email!</p>
          <p className="email-text">
            Your signed agreement has been sent to{" "}
            <strong>{signerEmail}</strong>
          </p>
        </div>

        <div className="completion-checklist">
          <p className="checklist-item">✅ Provider Service Agreement Signed</p>
          <p className="checklist-item">✅ Network Access Approved</p>
          <p className="checklist-item">✅ Onboarding Complete</p>
        </div>

        <p className="redirect-message">
          Redirecting to complete your setup...
        </p>
      </div>

      <style jsx>{`
        .completion-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999998;
          padding: 1rem;
          animation: fadeIn 0.3s ease-out;
        }

        .overlay-content {
          background: white;
          border: 3px solid #059669;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideIn 0.5s ease-out;
        }

        .overlay-content.mobile {
          padding: 1.5rem;
          max-width: calc(100% - 2rem);
        }

        .success-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: bounce 1s ease-in-out;
        }

        h2 {
          color: #003087;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
        }

        .success-message {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .email-notification {
          background: #eff6ff;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid #3b82f6;
        }

        .email-title {
          color: #1d4ed8;
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .email-text {
          color: #2563eb;
          font-size: 0.875rem;
          margin: 0;
        }

        .completion-checklist {
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .checklist-item {
          color: #059669;
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        .redirect-message {
          color: #9ca3af;
          font-size: 0.875rem;
          font-style: italic;
          margin: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .overlay-content {
            margin: 0 1rem;
          }

          .success-icon {
            font-size: 2.5rem;
          }

          h2 {
            font-size: 1.25rem;
          }

          .success-message {
            font-size: 0.9375rem;
          }

          .email-notification,
          .completion-checklist {
            padding: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
