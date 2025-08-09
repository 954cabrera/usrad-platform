// src/components/Providers/Dashboard/PortalLayout/DesktopHeader.jsx
import React from "react";
import { Bell, HelpCircle, LogOut } from "lucide-react";

export default function DesktopHeader({ currentNav, onLogout }) {
  return (
    <header className="portal-header">
      <div className="header-content">
        <h1 className="page-title">{currentNav}</h1>
        <div className="header-actions">
          <button className="notification-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="help-btn" aria-label="Help">
            <HelpCircle size={20} />
          </button>
          <button
            className="logout-btn-header"
            onClick={onLogout}
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
