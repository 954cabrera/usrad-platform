// src/components/Providers/Onboarding/PSA/PSAReviewSection.jsx
import React from 'react';

export default function PSAReviewSection({ psaData, onStartSigning, loading }) {
  return (
    <div className="review-container">
      <h2>Review Your Information</h2>

      <div className="info-section">
        <h3>Organization</h3>
        <p>
          <strong>Name:</strong>{" "}
          {psaData.organization.legalName || "Not provided"}
        </p>
        <p>
          <strong>Tax ID:</strong>{" "}
          {psaData.organization.taxId || "Not provided"}
        </p>
        <p>
          <strong>Type:</strong>{" "}
          {psaData.organization.businessType || "Not provided"}
        </p>
      </div>

      <div className="info-section">
        <h3>Authorized Signer</h3>
        <p>
          <strong>Name:</strong> {psaData.signer.fullName || "Not provided"}
        </p>
        <p>
          <strong>Title:</strong> {psaData.signer.title || "Not provided"}
        </p>
        <p>
          <strong>Email:</strong> {psaData.signer.email || "Not provided"}
        </p>
      </div>

      <div className="info-section">
        <h3>Centers & Pricing</h3>
        <p>
          <strong>Total Centers:</strong> {psaData.centers.length}
        </p>
        <p>
          <strong>Medicare Rate:</strong>{" "}
          {psaData.pricing.percentage || 100}%
        </p>
      </div>

      <button
        className="continue-btn"
        onClick={onStartSigning}
        disabled={loading}
      >
        {loading ? "Preparing..." : "Continue to Sign"}
      </button>
    </div>
  );
}