// src/components/Providers/Dashboard/Security/SessionsManager.jsx
import React, { useState } from "react";
import {
  Monitor,
  MapPin,
  Clock,
  LogOut,
  Smartphone,
  Laptop,
  Globe,
} from "lucide-react";

export default function SessionsManager() {
  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      deviceType: "desktop",
      location: "Pembroke Pines, FL",
      ip: "192.168.1.1",
      lastActive: "2 minutes ago",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      deviceType: "mobile",
      location: "Miami, FL",
      ip: "192.168.1.2",
      lastActive: "1 hour ago",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on Mac",
      deviceType: "desktop",
      location: "Fort Lauderdale, FL",
      ip: "192.168.1.3",
      lastActive: "3 days ago",
      current: false,
    },
  ]);

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone size={20} />;
      case "desktop":
        return <Laptop size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  const handleRevokeSession = (sessionId) => {
    console.log("Revoking session:", sessionId);
    // Implement session revocation
  };

  const handleRevokeAll = () => {
    console.log("Revoking all sessions");
    // Implement revoke all
  };

  return (
    <div className="sessions-manager">
      <div className="section-header">
        <h3>Active Sessions</h3>
        <p>Manage devices with access to your account</p>
      </div>

      <div className="sessions-list">
        {sessions.map((session) => (
          <div key={session.id} className="session-card glass-card">
            <div className="session-header">
              <div className="session-device">
                <div className="device-icon">
                  {getDeviceIcon(session.deviceType)}
                </div>
                <div className="device-info">
                  <h4>{session.device}</h4>
                  {session.current && (
                    <span className="current-badge">Current</span>
                  )}
                </div>
              </div>
              {!session.current && (
                <button
                  className="revoke-btn"
                  onClick={() => handleRevokeSession(session.id)}
                  aria-label="Revoke session"
                >
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
                <Globe size={14} />
                <span>IP: {session.ip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sessions-footer">
        <div className="security-tip">
          <p>
            <strong>Security Tip:</strong> If you see any unfamiliar devices,
            revoke their access immediately and change your password.
          </p>
        </div>

        <button className="revoke-all-btn" onClick={handleRevokeAll}>
          <LogOut size={20} />
          Revoke All Other Sessions
        </button>
      </div>

      <style jsx>{`
        .sessions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .session-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .session-device {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .device-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
          flex-shrink: 0;
        }

        .device-info h4 {
          color: white;
          font-size: 1rem;
          margin: 0 0 0.25rem 0;
          font-weight: 500;
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
          padding: 0.5rem 0.875rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 8px;
          font-size: 0.813rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .revoke-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-1px);
        }

        .session-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 0.875rem;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .detail svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .sessions-footer {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .security-tip {
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 12px;
        }

        .security-tip p {
          color: #f59e0b;
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.5;
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

        .desktop-only {
          display: inline;
        }

        @media (max-width: 768px) {
          .session-card {
            position: relative;
            padding: 1rem;
          }

          .revoke-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.375rem 0.5rem;
          }

          .desktop-only {
            display: none !important;
          }

          .session-details {
            gap: 0.75rem;
            font-size: 0.813rem;
          }

          .device-icon {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
