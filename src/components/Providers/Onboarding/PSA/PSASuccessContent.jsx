// src/components/Providers/Onboarding/PSA/PSASuccessContent.jsx
import React, { useEffect, useState } from "react";

export default function PSASuccessContent() {
  const [organizationName, setOrganizationName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const orgData = localStorage.getItem("provider_organization");
    if (orgData) {
      const parsed = JSON.parse(orgData);
      setOrganizationName(parsed.legalName || "Your Organization");
      setSignerEmail(parsed.signer?.email || "");
    }

    // Trigger animations
    setTimeout(() => setIsVisible(true), 100);

    // Create floating particles only on desktop
    if (window.innerWidth > 768) {
      createFloatingParticles();
    }

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
    }
  }, []);

  const createFloatingParticles = () => {
    const container = document.querySelector(".success-page");
    if (!container) return;

    // Reduce particle count on mobile
    const particleCount = window.innerWidth > 768 ? 30 : 10;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 20 + 20}s linear infinite;
        animation-delay: ${Math.random() * 20}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
    }
  };

  return (
    <div className={`success-content ${isVisible ? "visible" : ""}`}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="success-badge">
          <div className="badge-glow"></div>
          <div className="badge-inner">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="success-title">
          <span className="title-gradient">Welcome to the USRad Network!</span>
        </h1>

        <p className="success-subtitle">
          <strong>{organizationName}</strong>, your Provider Service Agreement
          has been successfully signed and processed.
        </p>
      </div>

      {/* Status Cards */}
      <div className="status-cards">
        <div className="status-card email-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Check Your Email</h3>
          <p>
            We've sent a copy of your signed agreement to{" "}
            <strong>{signerEmail || "your email"}</strong>
          </p>
          <div className="card-decoration"></div>
        </div>

        <div className="status-card next-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 7L18 12M18 12L13 17M18 12H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>What's Next?</h3>
          <p>
            Our team will review your application and activate your account
            within <strong>24-48 hours</strong>
          </p>
          <div className="card-decoration"></div>
        </div>

        <div className="status-card help-card">
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8.27924C8.54484 3 8.79934 3.10536 8.98669 3.29289L11.707 6.01318C11.8946 6.20071 12 6.45521 12 6.72077V9M3 5V16.967C3 18.0876 3.896 19 5 19H9M3 5L12 14M15 11V19M15 19L12 16M15 19L18 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Need Help?</h3>
          <p>
            Contact our support team at{" "}
            <a href="tel:1-800-USRAD">1-800-USRAD</a>
          </p>
          <div className="card-decoration"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-section">
        <a href="/providers/portal-transition" className="btn-primary">
          <span>Enter Provider Portal</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a href="/providers/onboarding/facilities" className="btn-secondary">
          <span>Add More Centers</span>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          from {
            transform: translate(0, 0) rotate(0deg);
          }
          to {
            transform: translate(100px, -100vh) rotate(360deg);
          }
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

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .success-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 2rem;
          opacity: 0;
          transition: opacity 0.5s ease;
          position: relative;
          z-index: 1;
        }

        .success-content.visible {
          opacity: 1;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeInUp 0.8s ease-out;
        }

        .success-badge {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
        }

        .badge-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(
            circle,
            rgba(34, 197, 94, 0.4) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .badge-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(34, 197, 94, 0.3);
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .success-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .title-gradient {
          background: linear-gradient(135deg, #fff 0%, #e0f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .success-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        /* Status Cards */
        .status-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .status-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out 0.5s both;
        }

        .status-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .card-decoration {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 70%
          );
          transform: rotate(45deg);
          pointer-events: none;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: white;
        }

        .status-card h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .status-card p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .status-card strong {
          color: white;
          font-weight: 600;
        }

        .status-card a {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .status-card a:hover {
          color: #93c5fd;
          text-decoration: underline;
        }

        /* Action Section */
        .action-section {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: white;
          color: #003087;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 48, 135, 0.1),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(255, 255, 255, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .success-title {
            font-size: 2.5rem;
          }

          .status-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .action-section {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
