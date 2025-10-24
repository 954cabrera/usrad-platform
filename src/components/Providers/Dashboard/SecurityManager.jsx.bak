// src/components/Providers/Dashboard/SecurityManager.jsx
import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Monitor,
  AlertTriangle,
} from "lucide-react";
import PasswordManager from "./Security/PasswordManager";
import TwoFactorAuth from "./Security/TwoFactorAuth";
import ApiKeysManager from "./Security/ApiKeysManager";
import SessionsManager from "./Security/SessionsManager";
import ActivityLogs from "./Security/ActivityLogs";
import SecurityScore from "./Security/SecurityScore";
import SecuritySkeleton from "./Security/SecuritySkeleton";

export default function SecurityManager({ providerId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("password");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    // Simulate loading security settings
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "password", label: "Password", icon: Lock },
    { id: "2fa", label: "2FA", icon: Smartphone },
    { id: "api", label: "API Keys", icon: Key },
    { id: "sessions", label: "Sessions", icon: Monitor },
    { id: "logs", label: "Activity", icon: AlertTriangle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "password":
        return <PasswordManager />;
      case "2fa":
        return <TwoFactorAuth onStatusChange={setTwoFactorEnabled} />;
      case "api":
        return <ApiKeysManager />;
      case "sessions":
        return <SessionsManager />;
      case "logs":
        return <ActivityLogs />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="security-manager">
        <SecuritySkeleton />
      </div>
    );
  }

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
      <SecurityScore twoFactorEnabled={twoFactorEnabled} />

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
      <div className="tab-content">{renderTabContent()}</div>

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

        /* Shared Styles */
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

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .tab-content {
            padding: 1rem;
            border-radius: 12px;
          }

          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }

          .tab-btn svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Small mobile */
        @media (max-width: 400px) {
          .mobile-tabs {
            gap: 0.25rem;
          }

          .tab-btn {
            padding: 0.375rem 0.5rem;
            font-size: 0.625rem;
          }

          .tab-btn span {
            display: none; /* Show only icons on very small screens */
          }
        }

        /* iOS Safe Areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .security-manager {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
}
