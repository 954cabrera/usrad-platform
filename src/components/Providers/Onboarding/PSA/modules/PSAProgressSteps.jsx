// src/components/Providers/Onboarding/PSA/modules/PSAProgressSteps.jsx
import React from "react";

export default function PSAProgressSteps({ currentStep }) {
  const steps = [
    { number: 1, label: "Review Information" },
    { number: 2, label: "Sign Agreement" },
    { number: 3, label: "Complete" },
  ];

  return (
    <div className="psa-steps">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`step ${currentStep >= step.number ? "active" : ""}`}>
            <span className="step-number">{step.number}</span>
            <span className="step-label">{step.label}</span>
          </div>
          {index < steps.length - 1 && <div className="step-connector" />}
        </React.Fragment>
      ))}

      <style jsx>{`
        .psa-steps {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 3rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .step.active {
          opacity: 1;
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #3b82f6;
          color: white;
          transform: scale(1.1);
        }

        .step-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .step.active .step-label {
          color: #1f2937;
          font-weight: 600;
        }

        .step-connector {
          width: 40px;
          height: 2px;
          background: #e5e7eb;
          position: relative;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .psa-steps {
            flex-direction: column;
            gap: 0.5rem;
            padding: 1rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }

          .step {
            width: 100%;
            padding: 0.75rem 1rem;
            background: #f9fafb;
            border-radius: 8px;
            border: 2px solid transparent;
            transition: all 0.3s ease;
          }

          .step.active {
            background: #eff6ff;
            border-color: #3b82f6;
          }

          .step-connector {
            display: none;
          }

          .step-number {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
}
