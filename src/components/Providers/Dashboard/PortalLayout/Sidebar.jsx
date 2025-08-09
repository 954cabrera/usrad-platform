// src/components/Providers/Dashboard/PortalLayout/Sidebar.jsx
import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';

export default function Sidebar({ 
  isSidebarOpen, 
  isMobile, 
  currentPage, 
  navigation, 
  provider,
  onToggleSidebar,
  onNavigate
}) {
  const getProviderInitials = () => {
    if (!provider || !provider.legalName) return 'PR';
    return provider.legalName.substring(0, 2).toUpperCase();
  };

  const getProviderName = () => {
    if (!provider || !provider.legalName) return 'Provider';
    return provider.legalName;
  };

  return (
    <>
      {/* Sidebar Backdrop for Mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onToggleSidebar}
        />
      )}

      <aside
        className={`portal-sidebar ${isSidebarOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-gradient">
              <Building2 size={28} />
            </div>
            {(!isMobile || isSidebarOpen) && (
              <span className="logo-text">Provider Portal</span>
            )}
          </div>
          {!isMobile && (
            <button
              className="sidebar-toggle"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <ChevronRight
                size={16}
                className={`toggle-icon ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        <nav className="sidebar-nav" role="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""} ${item.soon ? "coming-soon" : ""}`}
                onClick={(e) => {
                  if (item.soon) {
                    e.preventDefault();
                    alert("Coming soon!");
                  } else {
                    onNavigate(item.id);
                  }
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} className="nav-icon" />
                {(!isMobile || isSidebarOpen) && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.soon && <span className="soon-badge">Soon</span>}
                  </>
                )}
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {/* Network Status */}
          <div className="network-status">
            <div className="status-dot active"></div>
            <span className="status-text">Network Operational</span>
          </div>
          <div className="compliance-info">
            <span className="compliance-text">SOC 2 Certified</span>
          </div>

          {/* User Info */}
          {(!isMobile || isSidebarOpen) && provider && (
            <div className="user-info">
              <div className="user-avatar">{getProviderInitials()}</div>
              <div className="user-details">
                <div className="user-name">{getProviderName()}</div>
                <div className="user-role">Provider Admin</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}