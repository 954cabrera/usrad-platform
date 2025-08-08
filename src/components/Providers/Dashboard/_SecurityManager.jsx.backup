// src/components/Providers/Dashboard/SecurityManager.jsx
import React, { useState } from "react";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  AlertTriangle,
  Check,
  X,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Monitor,
  MapPin,
  Clock,
  ChevronRight,
  Info,
  Copy,
  Trash2,
  QrCode,
  LogOut,
} from "lucide-react";

export default function SecurityManager({ providerId }) {
  const [activeTab, setActiveTab] = useState("password");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Production API",
      key: "sk_live_****************************1234",
      created: "2025-07-15",
      lastUsed: "2025-08-08",
    },
    {
      id: 2,
      name: "Test API",
      key: "sk_test_****************************5678",
      created: "2025-08-01",
      lastUsed: "2025-08-07",
    },
  ]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Pembroke Pines, FL",
      ip: "192.168.1.1",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Miami, FL",
      ip: "192.168.1.2",
      lastActive: "1 hour ago",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on Mac",
      location: "Fort Lauderdale, FL",
      ip: "192.168.1.3",
      lastActive: "3 days ago",
      current: false,
    },
  ]);

  const [securityLogs] = useState([
    {
      id: 1,
      action: "Password changed",
      timestamp: "2025-08-05 14:30:00",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      id: 2,
      action: "Login attempt",
      timestamp: "2025-08-08 09:15:00",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      id: 3,
      action: "API key created",
      timestamp: "2025-08-01 10:00:00",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      id: 4,
      action: "Failed login attempt",
      timestamp: "2025-07-28 15:45:00",
      ip: "192.168.1.5",
      status: "failed",
    },
  ]);

  const tabs = [
    { id: "password", label: "Password", icon: Lock },
    { id: "2fa", label: "2FA", icon: Smartphone },
    { id: "api", label: "API Keys", icon: Key },
    { id: "sessions", label: "Sessions", icon: Monitor },
    { id: "logs", label: "Activity", icon: AlertTriangle },
  ];

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const strengthLevels = [
      { strength: 0, text: "", color: "" },
      { strength: 1, text: "Weak", color: "#ef4444" },
      { strength: 2, text: "Fair", color: "#f59e0b" },
      { strength: 3, text: "Good", color: "#3b82f6" },
      { strength: 4, text: "Strong", color: "#22c55e" },
    ];

    return strengthLevels[strength];
  };

  const currentStrength = passwordStrength(passwordForm.newPassword);

  const copyApiKey = (key, id) => {
    // In real app, copy full key
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "password":
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>Change Password</h3>
              <p>Update your account password regularly for better security</p>
            </div>

            <form
              className="password-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={
                      showCurrentPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordForm.newPassword && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${currentStrength.strength * 25}%`,
                          backgroundColor: currentStrength.color,
                        }}
                      />
                    </div>
                    <span
                      className="strength-text"
                      style={{ color: currentStrength.color }}
                    >
                      {currentStrength.text}
                    </span>
                  </div>
                )}
                <div className="password-requirements">
                  <p className="requirement-title">Password must contain:</p>
                  <ul>
                    <li
                      className={
                        passwordForm.newPassword.length >= 8 ? "met" : ""
                      }
                    >
                      <Check size={14} /> At least 8 characters
                    </li>
                    <li
                      className={
                        passwordForm.newPassword.match(/[A-Z]/) ? "met" : ""
                      }
                    >
                      <Check size={14} /> One uppercase letter
                    </li>
                    <li
                      className={
                        passwordForm.newPassword.match(/[0-9]/) ? "met" : ""
                      }
                    >
                      <Check size={14} /> One number
                    </li>
                    <li
                      className={
                        passwordForm.newPassword.match(/[^a-zA-Z0-9]/)
                          ? "met"
                          : ""
                      }
                    >
                      <Check size={14} /> One special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                  className={
                    passwordForm.confirmPassword &&
                    passwordForm.confirmPassword !== passwordForm.newPassword
                      ? "error"
                      : ""
                  }
                />
                {passwordForm.confirmPassword &&
                  passwordForm.confirmPassword !== passwordForm.newPassword && (
                    <span className="error-message">Passwords don't match</span>
                  )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword ||
                  passwordForm.newPassword !== passwordForm.confirmPassword
                }
              >
                Update Password
              </button>
            </form>
          </div>
        );

      case "2fa":
        return (
          <div className="tab-content">
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
              <button
                className="enable-2fa-btn"
                onClick={() => setShowQRCode(true)}
              >
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
                          <button className="verify-btn">
                            Verify & Enable
                          </button>
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
          </div>
        );

      case "api":
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>API Keys</h3>
              <p>Manage API keys for integrations</p>
            </div>

            <button
              className="create-key-btn"
              onClick={() => setShowApiKeyModal(true)}
            >
              <Key size={20} />
              Create New API Key
            </button>

            <div className="api-keys-list">
              {apiKeys.map((key) => (
                <div key={key.id} className="api-key-card glass-card">
                  <div className="key-header">
                    <h4>{key.name}</h4>
                    <div className="key-actions">
                      <button
                        className="icon-btn"
                        onClick={() => copyApiKey(key.key, key.id)}
                        aria-label="Copy key"
                      >
                        {copiedKey === key.id ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        className="icon-btn danger"
                        aria-label="Delete key"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <code className="key-value">{key.key}</code>
                  <div className="key-meta">
                    <span>Created: {key.created}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="api-info">
              <Info size={16} />
              <p>
                Keep your API keys secure. Never share them or commit them to
                version control.
              </p>
            </div>
          </div>
        );

      case "sessions":
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>Active Sessions</h3>
              <p>Manage devices with access to your account</p>
            </div>

            <div className="sessions-list">
              {sessions.map((session) => (
                <div key={session.id} className="session-card glass-card">
                  <div className="session-header">
                    <div className="session-device">
                      <Monitor size={20} />
                      <div>
                        <h4>{session.device}</h4>
                        {session.current && (
                          <span className="current-badge">Current</span>
                        )}
                      </div>
                    </div>
                    {!session.current && (
                      <button className="revoke-btn">
                        <LogOut size={16} />
                        <span className="desktop-only">Revoke</span>
                      </button>
                    )}
                  </div>
                  <div className="session-details">
                    <div className="detail">
                      <MapPin size={14} />
                      <span>{session.location}</span>
                    </div>
                    <div className="detail">
                      <Clock size={14} />
                      <span>{session.lastActive}</span>
                    </div>
                    <div className="detail desktop-only">
                      <span>IP: {session.ip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="revoke-all-btn">
              <LogOut size={20} />
              Revoke All Other Sessions
            </button>
          </div>
        );

      case "logs":
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>Security Activity</h3>
              <p>Recent security-related events</p>
            </div>

            <div className="logs-list">
              {securityLogs.map((log) => (
                <div key={log.id} className="log-item">
                  <div className="log-icon">
                    {log.status === "success" ? (
                      <Check size={16} className="success" />
                    ) : (
                      <X size={16} className="failed" />
                    )}
                  </div>
                  <div className="log-content">
                    <p className="log-action">{log.action}</p>
                    <div className="log-meta">
                      <span>{log.timestamp}</span>
                      <span className="desktop-only">IP: {log.ip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="download-logs-btn">
              <Download size={16} />
              Download Full Log
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="security-manager">
      {/* Header */}
      <div className="security-header">
        <h2 className="section-title">Security Settings</h2>
        <p className="section-subtitle">
          Manage your account security and access controls
        </p>
      </div>

      {/* Security Score */}
      <div className="security-score glass-card">
        <div className="score-content">
          <div className="score-visual">
            <div className="score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="85, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                  85%
                </text>
              </svg>
            </div>
            <div className="score-label">Security Score</div>
          </div>

          <div className="score-details">
            <h4>Recommendations:</h4>
            <div className="recommendations">
              <div
                className={`recommendation ${twoFactorEnabled ? "completed" : ""}`}
              >
                {twoFactorEnabled ? <Check size={16} /> : <X size={16} />}
                <span>Enable two-factor authentication</span>
              </div>
              <div className="recommendation completed">
                <Check size={16} />
                <span>Use a strong password</span>
              </div>
              <div className="recommendation completed">
                <Check size={16} />
                <span>Regular security reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="mobile-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowApiKeyModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create API Key</h3>
              <button
                className="close-btn"
                onClick={() => setShowApiKeyModal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Key Name</label>
                <input type="text" placeholder="e.g., Production API" />
              </div>
              <div className="form-group">
                <label>Permissions</label>
                <div className="checkbox-group">
                  <label className="checkbox">
                    <input type="checkbox" defaultChecked />
                    <span>Read access</span>
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span>Write access</span>
                  </label>
                </div>
              </div>
              <button className="create-btn">Create Key</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .security-manager {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .security-header {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
        }

        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        /* Security Score */
        .security-score {
          margin-bottom: 2rem;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.1) 0%,
            rgba(118, 75, 162, 0.1) 100%
          ) !important;
          border-color: rgba(102, 126, 234, 0.2) !important;
        }

        .score-content {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .score-visual {
          text-align: center;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          position: relative;
        }

        .circular-chart {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 2.8;
        }

        .circle {
          fill: none;
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke: #22c55e;
          animation: progress 1s ease-out forwards;
        }

        @keyframes progress {
          0% {
            stroke-dasharray: 0 100;
          }
        }

        .percentage {
          fill: white;
          font-size: 0.5em;
          text-anchor: middle;
          font-weight: 700;
        }

        .score-label {
          margin-top: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        .score-details {
          flex: 1;
        }

        .score-details h4 {
          color: white;
          margin-bottom: 0.75rem;
        }

        .recommendations {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .recommendation {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .recommendation.completed {
          color: #22c55e;
        }

        .recommendation svg {
          flex-shrink: 0;
        }

        /* Mobile Tabs */
        .mobile-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 0.5rem;
        }

        .mobile-tabs::-webkit-scrollbar {
          display: none;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .tab-btn.active {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        /* Tab Content */
        .tab-content {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h3 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .section-header p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        /* Password Form */
        .password-form {
          max-width: 400px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .password-input {
          position: relative;
        }

        .password-input input,
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          padding-right: 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-group input {
          padding-right: 0.75rem;
        }

        .password-input input:focus,
        .form-group input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        .form-group input.error {
          border-color: #ef4444;
        }

        .error-message {
          display: block;
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .toggle-password {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.3s;
        }

        .toggle-password:hover {
          color: white;
        }

        /* Password Strength */
        .password-strength {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition:
            width 0.3s,
            background-color 0.3s;
        }

        .strength-text {
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Password Requirements */
        .password-requirements {
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .requirement-title {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .password-requirements ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .password-requirements li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.813rem;
          padding: 0.25rem 0;
        }

        .password-requirements li.met {
          color: #22c55e;
        }

        .password-requirements li svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Two-Factor Status */
        .two-factor-status {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1.5rem !important;
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

        .status-info h4 {
          color: white;
          margin-bottom: 0.25rem;
        }

        .status-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        /* 2FA Buttons */
        .enable-2fa-btn,
        .create-key-btn {
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
          transition: all 0.3s;
          margin-bottom: 1.5rem;
        }

        .enable-2fa-btn:hover,
        .create-key-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* QR Setup */
        .setup-steps {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .setup-steps h4 {
          color: white;
          margin-bottom: 1rem;
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

        .step-content {
          flex: 1;
        }

        .step-content p {
          color: white;
          margin-bottom: 0.5rem;
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

        .manual-entry {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.813rem;
        }

        .manual-entry code {
          display: block;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          color: white;
          font-family: monospace;
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

        /* Two-Factor Options */
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
          transition: all 0.2s;
        }

        .option-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .option-btn.danger {
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .option-btn.danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        /* API Keys */
        .api-keys-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .api-key-card {
          padding: 1rem !important;
        }

        .key-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .key-header h4 {
          color: white;
          font-size: 1rem;
          margin: 0;
        }

        .key-actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .icon-btn.danger {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .icon-btn.danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .key-value {
          display: block;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-family: monospace;
          font-size: 0.813rem;
          margin-bottom: 0.75rem;
          overflow-x: auto;
        }

        .key-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .api-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 8px;
          color: #f59e0b;
        }

        .api-info svg {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .api-info p {
          font-size: 0.813rem;
          margin: 0;
        }

        /* Sessions */
        .sessions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .session-card {
          padding: 1rem !important;
        }

        .session-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .session-device {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .session-device svg {
          color: rgba(255, 255, 255, 0.6);
          flex-shrink: 0;
        }

        .session-device h4 {
          color: white;
          font-size: 0.875rem;
          margin: 0 0 0.25rem 0;
        }

        .current-badge {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .revoke-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 6px;
          font-size: 0.813rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .revoke-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .session-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.813rem;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .detail svg {
          width: 14px;
          height: 14px;
        }

        .revoke-all-btn {
          width: 100%;
          padding: 0.875rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .revoke-all-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        /* Activity Logs */
        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .log-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .log-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .log-icon svg.success {
          color: #22c55e;
        }

        .log-icon svg.failed {
          color: #ef4444;
        }

        .log-content {
          flex: 1;
        }

        .log-action {
          color: white;
          font-weight: 500;
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
        }

        .log-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .download-logs-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .download-logs-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: #1e293b;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h3 {
          color: white;
          font-size: 1.25rem;
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .checkbox input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .create-btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
        }

        /* Utilities */
        .desktop-only {
          display: inline;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          /* Security Score */
          .score-content {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .score-circle {
            width: 100px;
            height: 100px;
          }

          .recommendations {
            text-align: left;
          }

          /* Tab Content */
          .tab-content {
            padding: 1rem;
          }

          /* Password Requirements */
          .password-requirements {
            font-size: 0.75rem;
          }

          /* 2FA Setup */
          .setup-steps {
            padding: 1rem;
          }

          .setup-steps li {
            flex-direction: column;
            text-align: center;
          }

          .step-number {
            margin: 0 auto;
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

          /* API Keys */
          .key-value {
            font-size: 0.75rem;
          }

          .key-meta {
            flex-direction: column;
            gap: 0.25rem;
          }

          /* Sessions */
          .session-card {
            position: relative;
          }

          .revoke-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.5rem;
          }

          .desktop-only {
            display: none !important;
          }

          /* Activity Logs */
          .log-meta {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }

          .tab-btn svg {
            width: 16px;
            height: 16px;
          }

          .two-factor-options {
            flex-direction: column;
          }

          .option-btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .tab-btn:active {
            transform: scale(0.95);
          }

          .submit-btn:active:not(:disabled) {
            transform: scale(0.98);
          }

          .icon-btn:active {
            transform: scale(0.9);
          }
        }

        /* iOS Safe Areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .modal-content {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
}
