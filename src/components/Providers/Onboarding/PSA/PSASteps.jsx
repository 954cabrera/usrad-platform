// src/components/Providers/Onboarding/PSA/PSASteps.jsx
import React from 'react';

export default function PSASteps({ currentStep }) {
  const steps = [
    { id: 1, label: "Review Information" },
    { id: 2, label: "Sign Agreement" },
    { id: 3, label: "Complete" }
  ];

  return (
    <div className="psa-steps">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`step ${currentStep >= step.id ? "active" : ""}`}
        >
          <span className="step-number">{step.id}</span>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
}