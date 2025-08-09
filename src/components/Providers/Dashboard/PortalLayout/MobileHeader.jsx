// src/components/Providers/Dashboard/PortalLayout/MobileHeader.jsx
import React from "react";
import { Menu, Bell, LogOut } from "lucide-react";

export default function MobileHeader({ currentNav, onMenuToggle, onLogout }) {
  return (
    <header className="mobile-header">
      <button
        className="mobile-menu-btn"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
      <h1 className="mobile-title">{currentNav}</h1>
      <div className="mobile-header-actions">
        <button className="mobile-notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <button
          className="mobile-logout-btn"
          onClick={onLogout}
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
