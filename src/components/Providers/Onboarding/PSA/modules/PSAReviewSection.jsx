// src/components/Providers/Onboarding/PSA/modules/PSAReviewSection.jsx
import React from "react";

export default function PSAReviewSection({ psaData, onContinue, loading }) {
  if (!psaData) return null;

  return (
    <div className="review-container">
      <h2>Review Your Information</h2>

      <div className="info-grid">
        <div className="info-section">
          <div className="section-icon">🏢</div>
          <h3>Organization</h3>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">
              {psaData.organization.legalName || "Not provided"}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Tax ID:</span>
            <span className="value">
              {psaData.organization.taxId || "Not provided"}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Type:</span>
            <span className="value">
              {psaData.organization.businessType || "Not provided"}
            </span>
          </div>
        </div>

        <div className="info-section">
          <div className="section-icon">✍️</div>
          <h3>Authorized Signer</h3>
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">
              {psaData.signer.fullName || "Not provided"}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Title:</span>
            <span className="value">
              {psaData.signer.title || "Not provided"}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">
              {psaData.signer.email || "Not provided"}
            </span>
          </div>
        </div>

        <div className="info-section">
          <div className="section-icon">💰</div>
          <h3>Centers & Pricing</h3>
          <div className="info-item">
            <span className="label">Total Centers:</span>
            <span className="value">{psaData.centers.length}</span>
          </div>
          <div className="info-item">
            <span className="label">Medicare Rate:</span>
            <span className="value highlight">
              {psaData.pricing.percentage || 100}%
            </span>
          </div>
        </div>
      </div>

      <div className="action-container">
        <button
          className="continue-btn"
          onClick={onContinue}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Preparing Agreement...
            </>
          ) : (
            <>
              Continue to Sign
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .review-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          max-width: 900px;
          margin: 0 auto;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 2rem;
          text-align: center;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-section {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .info-section:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .section-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 500;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .value {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.875rem;
          text-align: right;
        }

        .value.highlight {
          color: #059669;
          font-size: 1rem;
        }

        .action-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .continue-btn {
          background: #3b82f6;
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .continue-btn:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .continue-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .review-container {
            padding: 1.5rem;
            margin: 1rem;
          }

          h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .info-section {
            padding: 1rem;
          }

          .info-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .value {
            text-align: left;
            font-size: 1rem;
          }

          .continue-btn {
            width: 100%;
            justify-content: center;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
