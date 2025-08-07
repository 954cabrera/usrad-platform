// src/components/Providers/Onboarding/PSA/PSACompletionSection.jsx
import React from "react";

export default function PSACompletionSection() {
  return (
    <div className="completion-container">
      <div className="success-icon">✅</div>
      <h2>Agreement Signed Successfully!</h2>
      <p>Your Provider Service Agreement has been completed.</p>
      <p className="redirect-message">Redirecting to complete your setup...</p>
    </div>
  );
}
