// src/components/Providers/Dashboard/Security/PasswordManager.jsx
import React, { useState } from "react";
import { Lock, Eye, EyeOff, Check } from "lucide-react";

export default function PasswordManager() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  return (
    <div className="password-manager">
      <div className="section-header">
        <h3>Change Password</h3>
        <p>Update your account password regularly for better security</p>
      </div>

      <form className="password-form" onSubmit={(e) => e.preventDefault()}>
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
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {passwordForm.newPassword && (
            <>
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
            </>
          )}
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

      <style jsx>{`
        /* Component-specific styles */
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

        .password-requirements {
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
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

        // Add to PasswordManager.jsx styles
        @media (max-width: 768px) {
          .password-form {
            max-width: 100%;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .password-requirements {
            padding: 0.5rem;
          }

          .password-requirements li {
            font-size: 0.75rem;
          }

          .submit-btn {
            padding: 1rem;
            font-size: 1rem;
          }
        }

        /* Touch states */
        @media (hover: none) {
          .submit-btn:active:not(:disabled) {
            transform: scale(0.98);
          }

          .toggle-password:active {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
