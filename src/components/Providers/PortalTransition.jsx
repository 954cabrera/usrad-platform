// src/components/Providers/PortalTransition.jsx
import React, { useEffect } from "react";
import { CheckCircle, Shield, Activity } from "lucide-react";

export default function PortalTransition() {
  useEffect(() => {
    // Redirect after animation completes
    const timer = setTimeout(() => {
      window.location.href = "/providers/portal";
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="transition-container">
      <div className="transition-content">
        <div className="success-icon">
          <CheckCircle size={80} />
        </div>

        <h1 className="transition-title">Welcome to the USRad Network!</h1>
        <p className="transition-subtitle">
          You've successfully completed onboarding
        </p>

        <div className="status-items">
          <div className="status-item completed">
            <CheckCircle size={20} />
            <span>Organization Verified</span>
          </div>
          <div className="status-item completed">
            <CheckCircle size={20} />
            <span>Centers Added</span>
          </div>
          <div className="status-item completed">
            <CheckCircle size={20} />
            <span>PSA Signed</span>
          </div>
        </div>

        <div className="portal-preview">
          <h3>Entering Your Secure Provider Portal</h3>
          <div className="features-preview">
            <div className="feature">
              <Shield size={24} />
              <span>HIPAA Compliant Dashboard</span>
            </div>
            <div className="feature">
              <Activity size={24} />
              <span>Real-time Network Status</span>
            </div>
          </div>
        </div>

        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>

      <style jsx>{`
        .transition-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0f1b;
          position: relative;
          overflow: hidden;
          animation: fadeFromWhite 2s ease-out;
        }

        @keyframes fadeFromWhite {
          from {
            background: #ffffff;
          }
          to {
            background: #0a0f1b;
          }
        }

        /* Animated gradient orbs like in the portal */
        .transition-container::before,
        .transition-container::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0;
          animation: orbFadeIn 2s ease-out 1s forwards;
        }

        .transition-container::before {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #667eea 0%, transparent 70%);
          top: -200px;
          right: -200px;
        }

        .transition-container::after {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #764ba2 0%, transparent 70%);
          bottom: -300px;
          left: -300px;
        }

        @keyframes orbFadeIn {
          to {
            opacity: 0.3;
          }
        }

        .transition-content {
          text-align: center;
          max-width: 600px;
          position: relative;
          z-index: 1;
          animation: contentFadeIn 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }

        @keyframes contentFadeIn {
          to {
            opacity: 1;
          }
        }

        .success-icon {
          color: #10b981;
          margin-bottom: 2rem;
          filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));
          animation: scaleIn 0.5s ease-out 1s forwards;
          opacity: 0;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .transition-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .transition-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
        }

        .status-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .status-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          color: #10b981;
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3));
        }

        .status-item:nth-child(1) {
          animation-delay: 1.5s;
        }
        .status-item:nth-child(2) {
          animation-delay: 1.8s;
        }
        .status-item:nth-child(3) {
          animation-delay: 2.1s;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .portal-preview {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          animation: fadeIn 1s ease-out 2.5s forwards;
          opacity: 0;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
        }

        .portal-preview h3 {
          color: white;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .features-preview {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #667eea;
        }

        .loading-bar {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          margin: 0 auto;
          overflow: hidden;
          opacity: 0;
          animation: fadeIn 0.5s ease-out 3s forwards;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          animation: loading 2.5s ease-in-out 3.2s forwards;
          width: 0%;
        }

        @keyframes loading {
          to {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .transition-title {
            font-size: 2rem;
          }

          .features-preview {
            flex-direction: column;
            gap: 1rem;
          }

          .transition-container::before,
          .transition-container::after {
            display: none; /* Disable orbs on mobile for performance */
          }
        }
      `}</style>
    </div>
  );
}