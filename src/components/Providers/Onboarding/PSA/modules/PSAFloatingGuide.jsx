// src/components/Providers/Onboarding/PSA/modules/PSAFloatingGuide.jsx
import React, { useState, useEffect } from "react";

export default function PSAFloatingGuide({ currentStep, isVisible }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Add a useEffect to log step changes for debugging
  useEffect(() => {
    console.log("PSA Guide Step Updated:", currentStep);
  }, [currentStep]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isVisible) return null;

  const steps = [
    { id: 1, text: "Review Agreement", icon: "📄" },
    { id: 2, text: "Scroll to Bottom", icon: "👇" },
    { id: 3, text: 'Click "Sign Now"', icon: "✍️" },
    { id: 4, text: "Complete Signing", icon: "✅" },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getInstruction = () => {
    switch (currentStep) {
      case 1:
        return "Review and sign your PSA →";
      case 2:
        return 'Keep scrolling to find "Sign Now" →';
      case 3:
        return 'Click the "Sign Now" button!';
      case 4:
        return "🎉 Signing completed!";
      default:
        return "";
    }
  };

  return (
    <div
      className={`floating-guide ${isMinimized ? "minimized" : ""} ${isMobile ? "mobile" : ""}`}
      id="floating-progress-guide"
    >
      <div className="guide-header">
        <span className="guide-title">📋 PSA Signing Guide</span>
        <button
          className="minimize-btn"
          onClick={() => setIsMinimized(!isMinimized)}
          aria-label={isMinimized ? "Expand guide" : "Minimize guide"}
        >
          {isMinimized ? "➕" : "➖"}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="steps-container">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div
                  key={step.id}
                  className={`step-item ${status}`}
                  id={`floating-step-${step.id}`}
                >
                  <span className="step-icon">{step.icon}</span>
                  <span className="step-text">
                    {status === "completed" && "✅ "}
                    {status === "current" && "▶️ "}
                    {status === "pending" && "⏳ "}
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="instruction" id="floating-instruction">
            {getInstruction()}
          </div>
        </>
      )}

      <style jsx>{`
        .floating-guide {
          position: fixed;
          z-index: 99999;
          background: rgba(255, 255, 255, 0.98);
          border: 2px solid #003087;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 8px 32px rgba(0, 48, 135, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          animation: slideIn 0.5s ease-out;
        }

        /* Desktop positioning */
        .floating-guide:not(.mobile) {
          top: 100px;
          right: 20px;
          width: 280px;
        }

        /* Mobile positioning */
        .floating-guide.mobile {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 360px;
        }

        .floating-guide.minimized {
          padding: 12px;
        }

        .guide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .guide-title {
          font-weight: 700;
          color: #003087;
          font-size: 14px;
        }

        .minimize-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
          color: #003087;
          transition: transform 0.2s ease;
        }

        .minimize-btn:hover {
          transform: scale(1.2);
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          padding: 6px 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .step-icon {
          font-size: 16px;
        }

        .step-text {
          flex: 1;
        }

        .step-item.completed {
          color: #059669;
          font-weight: 600;
          background: rgba(5, 150, 105, 0.1);
        }

        .step-item.current {
          color: #f59e0b;
          font-weight: 700;
          background: rgba(245, 158, 11, 0.1);
          animation: pulse 2s ease-in-out infinite;
        }

        .step-item.pending {
          color: #9ca3af;
          font-weight: 500;
        }

        .instruction {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          font-weight: 600;
        }

        .step-item.current ~ .instruction {
          color: #f59e0b;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            background: rgba(245, 158, 11, 0.1);
          }
          50% {
            background: rgba(245, 158, 11, 0.2);
          }
        }

        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .floating-guide {
            font-size: 14px;
          }

          .guide-title {
            font-size: 15px;
          }

          .step-item {
            padding: 8px 10px;
          }

          .instruction {
            font-size: 13px;
            padding: 10px 0 0;
          }
        }
      `}</style>
    </div>
  );
}
