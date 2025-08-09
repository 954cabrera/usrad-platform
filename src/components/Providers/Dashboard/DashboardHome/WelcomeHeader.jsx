// src/components/Providers/Dashboard/DashboardHome/WelcomeHeader.jsx
import React from "react";
import { Calendar, Shield, CheckCircle } from "lucide-react";

export default function WelcomeHeader({ provider }) {
  return (
    <div className="welcome-header">
      <div className="welcome-content">
        <h2 className="welcome-title">
          Welcome back,{" "}
          <span className="provider-name">
            {provider?.organization_name || "Provider"}
          </span>
        </h2>
        <p className="welcome-subtitle">
          Here's an overview of your USRad Network activity
        </p>
        <div className="header-badges">
          <span className="header-badge">
            <Shield size={14} />
            HIPAA Compliant
          </span>
          <span className="header-badge">
            <CheckCircle size={14} />
            ACR Accredited
          </span>
        </div>
      </div>
      <div className="header-actions">
        <button className="quick-action-btn mobile-hide">
          <Calendar size={20} />
          <span>Schedule Demo</span>
        </button>
      </div>
    </div>
  );
}
