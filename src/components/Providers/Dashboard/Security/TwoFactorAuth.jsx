// src/components/Providers/Dashboard/Security/TwoFactorAuth.jsx
import React, { useState } from "react";
import { Shield, Smartphone, RefreshCw, X, QrCode } from "lucide-react";

export default function TwoFactorAuth() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className="two-factor-auth">
      <div className="section-header">
        <h3>Two-Factor Authentication</h3>
        <p>Add an extra layer of security to your account</p>
      </div>

      <div className="two-factor-status glass-card">
        <div className="status-icon">
          {twoFactorEnabled ? (
            <Shield size={24} className="enabled" />
          ) : (
            <Shield size={24} className="disabled" />
          )}
        </div>
        <div className="status-info">
          <h4>Status: {twoFactorEnabled ? "Enabled" : "Disabled"}</h4>
          <p>
            {twoFactorEnabled
              ? "2FA is protecting your account"
              : "Enable 2FA for enhanced security"}
          </p>
        </div>
      </div>

      {!twoFactorEnabled && (
        <button className="enable-2fa-btn" onClick={() => setShowQRCode(true)}>
          <Smartphone size={20} />
          Enable Two-Factor Authentication
        </button>
      )}

      {showQRCode && !twoFactorEnabled && (
        <div className="qr-setup">
          <div className="setup-steps">
            <h4>Setup Instructions</h4>
            <ol>
              <li>
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>Download an authenticator app</p>
                  <div className="app-suggestions">
                    <span>Google Authenticator</span>
                    <span>Authy</span>
                    <span>Microsoft Authenticator</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>Scan this QR code with your app</p>
                  <div className="qr-container">
                    <div className="qr-placeholder">
                      <QrCode size={120} />
                    </div>
                    <p className="manual-entry">
                      Can't scan? Enter code manually:
                      <code>ABCD-EFGH-IJKL-MNOP</code>
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="step-number">3</div>
                <div className="step-content">
                  <p>Enter the 6-digit code from your app</p>
                  <div className="verify-form">
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength="6"
                      className="verify-input"
                    />
                    <button className="verify-btn">Verify & Enable</button>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      )}

      {twoFactorEnabled && (
        <div className="two-factor-options">
          <button className="option-btn">
            <RefreshCw size={20} />
            Generate Recovery Codes
          </button>
          <button className="option-btn danger">
            <X size={20} />
            Disable 2FA
          </button>
        </div>
      )}

      <style>{`
        /* Component-specific styles */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .two-factor-status {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .status-icon svg {
          width: 48px;
          height: 48px;
        }

        .status-icon svg.enabled {
          color: #22c55e;
        }

        .status-icon svg.disabled {
          color: rgba(255, 255, 255, 0.3);
        }

        .enable-2fa-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .setup-steps {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .setup-steps ol {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .setup-steps li {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .step-number {
          width: 32px;
          height: 32px;
          background: rgba(102, 126, 234, 0.2);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          font-weight: 600;
          flex-shrink: 0;
        }

        .app-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .app-suggestions span {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .qr-container {
          text-align: center;
          margin-top: 1rem;
        }

        .qr-placeholder {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 160px;
          background: white;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .qr-placeholder svg {
          color: #1e293b;
        }

        .verify-form {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .verify-input {
          flex: 1;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 1.25rem;
          text-align: center;
          letter-spacing: 0.5em;
          font-family: monospace;
        }

        .verify-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .two-factor-options {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }

        .option-btn.danger {
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .verify-form {
            flex-direction: column;
          }

          .verify-btn {
            width: 100%;
          }

          .two-factor-options {
            flex-direction: column;
          }

          .option-btn {
            width: 100%;
            justify-content: center;
          }
        }

        // Add these mobile optimizations to TwoFactorAuth.jsx
        @media (max-width: 768px) {
          .setup-steps {
            padding: 1rem;
          }

          .setup-steps li {
            flex-direction: column;
            text-align: center;
          }

          .step-number {
            margin: 0 auto 0.5rem;
          }

          .qr-placeholder {
            width: 140px;
            height: 140px;
          }

          .qr-placeholder svg {
            width: 100px;
            height: 100px;
          }

          .verify-form {
            flex-direction: column;
          }

          .verify-btn {
            width: 100%;
          }

          .two-factor-options {
            flex-direction: column;
          }

          .option-btn {
            width: 100%;
            justify-content: center;
          }

          /* Mobile-specific adjustments */
          .manual-entry code {
            font-size: 0.75rem;
            word-break: break-all;
          }

          .app-suggestions {
            justify-content: center;
          }
        }

        /* Small mobile */
        @media (max-width: 400px) {
          .app-suggestions span {
            font-size: 0.625rem;
            padding: 0.2rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
