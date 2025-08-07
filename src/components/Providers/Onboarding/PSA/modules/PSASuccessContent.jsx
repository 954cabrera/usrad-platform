// src/components/Providers/Onboarding/PSA/modules/PSASuccessContent.jsx
import React, { useState, useEffect } from "react";
import PSAConfettiCelebration from "./PSAConfettiCelebration";

export default function PSASuccessContent() {
  const [psaData, setPsaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Load PSA data from localStorage
    const loadData = () => {
      try {
        const orgData = JSON.parse(
          localStorage.getItem("provider_organization") || "{}"
        );
        const centers = JSON.parse(
          localStorage.getItem("provider_centers") || "[]"
        );
        const pricing = JSON.parse(
          localStorage.getItem("selected_rate_strategy") || "{}"
        );
        const psaSignedDate = localStorage.getItem("psa_signed_date");

        setPsaData({
          organization: orgData,
          centers: centers,
          pricing: pricing,
          signer: orgData.signer || {},
          signedDate: psaSignedDate,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading PSA data:", error);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const downloadPSACopy = () => {
    // This would typically call an API
    alert("Your signed PSA copy will be emailed to you shortly.");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your success page...</p>
      </div>
    );
  }

  return (
    <>
      <div className="success-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="success-animation">
            <div className="success-circle">
              <svg
                className="checkmark"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="hero-title">🎉 Welcome to the USRad Network!</h1>
          <p className="hero-subtitle">
            Your Provider Service Agreement is complete. You're now officially
            part of our network of premier imaging providers.
          </p>

          {/* Agreement Summary */}
          <div className="agreement-summary">
            <h3>Agreement Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Organization:</span>
                <span className="value">
                  {psaData?.organization?.legalName || "Your Organization"}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Centers:</span>
                <span className="value">
                  {psaData?.centers?.length || 0} Location
                  {psaData?.centers?.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Medicare Rate:</span>
                <span className="value highlight">
                  {psaData?.pricing?.percentage || 100}%
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Signed By:</span>
                <span className="value">
                  {psaData?.signer?.fullName || "Provider"}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Date Signed:</span>
                <span className="value">
                  {new Date(
                    psaData?.signedDate || Date.now()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Status:</span>
                <span className="value status">
                  <span className="status-icon">✅</span> Active
                </span>
              </div>
            </div>
          </div>

          {/* Email Notice */}
          <div className="email-notice">
            <p>
              📧 A copy of your signed agreement has been sent to{" "}
              <strong>{psaData?.signer?.email || "your email"}</strong>
            </p>
          </div>
        </div>

        {/* Journey Section */}
        <div className="journey-section">
          <h2>🚀 Your Journey with USRad</h2>

          <div className="journey-steps">
            <div className="journey-step completed">
              <div className="step-icon">✓</div>
              <div className="step-content">
                <h4>Agreement Signed</h4>
                <p>Just Now</p>
              </div>
            </div>

            <div className="step-connector active"></div>

            <div className="journey-step current">
              <div className="step-icon">→</div>
              <div className="step-content">
                <h4>Access Portal</h4>
                <p>Ready Now</p>
              </div>
            </div>

            <div className="step-connector"></div>

            <div className="journey-step">
              <div className="step-icon">💼</div>
              <div className="step-content">
                <h4>Accept Referrals</h4>
                <p>Ready</p>
              </div>
            </div>
          </div>

          {/* What You Can Do Now */}
          <div className="capabilities-section">
            <h3>✨ You Can Now:</h3>
            <ul className="capabilities-list">
              <li>✅ Access your Provider Portal dashboard</li>
              <li>
                ✅ View and manage your {psaData?.centers?.length || 0} facility
                information
              </li>
              <li>✅ Start receiving patient referrals</li>
              <li>✅ Track your imaging orders and revenue</li>
              <li>
                ✅ Access billing and payment reports at{" "}
                {psaData?.pricing?.percentage || 100}% Medicare rate
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/providers/portal")}
          >
            Enter Your Portal
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="btn-secondary" onClick={downloadPSACopy}>
            Download PSA Copy
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>Need Help Getting Started?</h3>
          <div className="support-grid">
            <div className="support-item">
              <div className="support-icon">📧</div>
              <h4>Email Support</h4>
              <p>providers@usrad.com</p>
            </div>
            <div className="support-item">
              <div className="support-icon">📞</div>
              <h4>Phone Support</h4>
              <p>1-800-USRAD-55</p>
            </div>
            <div className="support-item">
              <div className="support-icon">💬</div>
              <h4>Live Chat</h4>
              <p>Available 8am-6pm EST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger confetti on mount */}
      <PSAConfettiCelebration trigger={true} />

      <style jsx>{`
        .loading-container {
          text-align: center;
          padding: 2rem;
          color: white;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .success-container {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hero Section */
        .hero-section {
          background: white;
          border-radius: 1rem;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          margin-bottom: 2rem;
        }

        .success-animation {
          margin-bottom: 2rem;
        }

        .success-circle {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .checkmark {
          width: 60px;
          height: 60px;
          color: white;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          color: #003087;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        /* Agreement Summary */
        .agreement-summary {
          background: #f8fafc;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid #e2e8f0;
        }

        .agreement-summary h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          text-align: left;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .label {
          font-weight: 500;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .value {
          color: #1f2937;
          font-weight: 600;
        }

        .value.highlight {
          color: #059669;
          font-size: 1.125rem;
        }

        .value.status {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #059669;
        }

        /* Email Notice */
        .email-notice {
          background: #eff6ff;
          padding: 1rem;
          border-radius: 0.5rem;
          display: inline-block;
        }

        .email-notice p {
          color: #1d4ed8;
          font-size: 0.875rem;
          margin: 0;
        }

        /* Journey Section */
        .journey-section {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .journey-section h2 {
          font-size: 1.875rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 2rem;
          text-align: center;
        }

        .journey-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .journey-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .step-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .journey-step.completed .step-icon {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .journey-step.current .step-icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          animation: nextStepPulse 2s ease-in-out infinite;
        }

        @keyframes nextStepPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
          }
        }

        .journey-step:not(.completed):not(.current) .step-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .step-content h4 {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .step-content p {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .step-connector {
          width: 60px;
          height: 2px;
          background: #e5e7eb;
          position: relative;
        }

        .step-connector.active {
          background: linear-gradient(to right, #10b981, #3b82f6);
        }

        /* Capabilities Section */
        .capabilities-section {
          background: #f0fdf4;
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid #bbf7d0;
        }

        .capabilities-section h3 {
          font-weight: 600;
          color: #059669;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .capabilities-list {
          list-style: none;
          padding: 0;
          margin: 0;
          color: #047857;
        }

        .capabilities-list li {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(5, 150, 105, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #374151;
          border: 2px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .btn-icon {
          width: 20px;
          height: 20px;
        }

        /* Support Section */
        .support-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .support-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .support-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .support-item {
          text-align: center;
          padding: 1rem;
        }

        .support-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        .support-item h4 {
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .support-item p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: 2rem 1.5rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .success-circle {
            width: 100px;
            height: 100px;
          }

          .checkmark {
            width: 50px;
            height: 50px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .journey-steps {
            flex-direction: column;
          }

          .step-connector {
            width: 2px;
            height: 40px;
            margin: -0.5rem 0;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }

          .journey-section,
          .support-section {
            padding: 1.5rem;
          }

          .support-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-section {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
