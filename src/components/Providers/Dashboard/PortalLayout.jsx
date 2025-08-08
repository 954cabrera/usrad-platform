// src/components/Providers/Dashboard/PortalLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building2,
  CreditCard,
  Shield,
  ChevronRight,
  Bell,
  HelpCircle,
  Home
} from 'lucide-react';

export default function PortalLayout({ children, currentPage = "dashboard" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [provider, setProvider] = useState(null);
  const sidebarRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Don't auto-open sidebar on desktop
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Get provider info
    const providerData = localStorage.getItem('provider_organization');
    if (providerData) {
      try {
        setProvider(JSON.parse(providerData));
      } catch (e) {
        console.error('Error parsing provider data:', e);
      }
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    if (isRightSwipe && !isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/providers/portal",
      mobileLabel: "Home"
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      href: "/providers/portal/documents",
      mobileLabel: "Docs"
    },
    {
      id: "centers",
      label: "Centers",
      icon: Building2,
      href: "/providers/portal/centers",
      mobileLabel: "Centers"
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/providers/portal/profile",
      mobileLabel: "Profile"
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      href: "/providers/portal/billing",
      soon: true,
      mobileLabel: "Billing"
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      href: "/providers/portal/security",
      mobileLabel: "Security"
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/providers/login';
  };

  const getCurrentNav = () => {
    const found = navigation.find((n) => n.id === currentPage);
    return found ? found.label : 'Dashboard';
  };

  const getProviderInitials = () => {
    if (!provider || !provider.legalName) return 'PR';
    return provider.legalName.substring(0, 2).toUpperCase();
  };

  const getProviderName = () => {
    if (!provider || !provider.legalName) return 'Provider';
    return provider.legalName;
  };

  return (
    <div 
      className="portal-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Animated Background */}
      <div className="portal-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Mobile Header */}
      {isMobile && (
        <header className="mobile-header">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="mobile-title">{getCurrentNav()}</h1>
          <button className="mobile-notification-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
        </header>
      )}

      {/* Sidebar Backdrop for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`portal-sidebar ${isSidebarOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-gradient">
              <Building2 size={28} />
            </div>
            {(!isMobile || isSidebarOpen) && <span className="logo-text">Provider Portal</span>}
          </div>
          {!isMobile && (
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <ChevronRight size={16} className={`toggle-icon ${isSidebarOpen ? "rotate-180" : ""}`} />
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
                } else if (isMobile) {
                    // Close sidebar on mobile after navigation
                    setTimeout(() => setIsSidebarOpen(false), 100);
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
          {(!isMobile || isSidebarOpen) && provider && (
            <div className="user-info">
              <div className="user-avatar">
                {getProviderInitials()}
              </div>
              <div className="user-details">
                <div className="user-name">{getProviderName()}</div>
                <div className="user-role">Provider Admin</div>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
            <LogOut size={20} />
            {(!isMobile || isSidebarOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`portal-main ${isSidebarOpen && !isMobile ? "sidebar-open" : "sidebar-closed"}`}>
        {/* Desktop Header */}
        {!isMobile && (
          <header className="portal-header">
            <div className="header-content">
              <h1 className="page-title">
                {getCurrentNav()}
              </h1>
              <div className="header-actions">
                <button className="notification-btn" aria-label="Notifications">
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>
                <button className="help-btn" aria-label="Help">
                  <HelpCircle size={20} />
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <div className="portal-content">{children}</div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <nav className="mobile-bottom-nav">
            {navigation.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`bottom-nav-item ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={20} />
                  <span>{item.mobileLabel}</span>
                </a>
              );
            })}
          </nav>
        )}
      </main>

      <style jsx>{`
        .portal-container {
          min-height: 100vh;
          display: flex;
          position: relative;
          background: #0a0f1b;
          overflow: hidden;
        }

        .portal-background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #667eea 0%, transparent 70%);
          top: -200px;
          right: -200px;
        }

        .orb-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #764ba2 0%, transparent 70%);
          bottom: -300px;
          left: -300px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #f093fb 0%, transparent 70%);
          top: 50%;
          left: 50%;
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          padding: 0 1rem;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-menu-btn,
        .mobile-notification-btn {
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          transition: background 0.2s;
          position: relative;
        }

        .mobile-menu-btn:active,
        .mobile-notification-btn:active {
          background: rgba(255, 255, 255, 0.1);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
        }

        .mobile-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }

        /* Sidebar */
        .portal-sidebar {
          width: 260px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1000;
        }

        .portal-sidebar.closed:not(.mobile) {
          width: 80px;
        }

        .portal-sidebar.mobile {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 280px;
          transform: translateX(-100%);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
        }

        .portal-sidebar.mobile.open {
          transform: translateX(0);
        }

        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .sidebar-header {
          padding: 2rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow: hidden;
        }

        .logo-gradient {
          min-width: 48px;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }

        .logo-text {
          font-size: 1.125rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }

        .sidebar-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .toggle-icon {
          transition: transform 0.3s;
        }

        .toggle-icon.rotate-180 {
          transform: rotate(180deg);
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          font-weight: 500;
          min-height: 48px;
        }

        .portal-sidebar.closed:not(.mobile) .nav-item {
          padding: 0.875rem;
          justify-content: center;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item:active {
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-item.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-item.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 0 4px 4px 0;
        }

        .nav-item.coming-soon {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-icon {
          flex-shrink: 0;
        }

        .nav-label {
          flex: 1;
          white-space: nowrap;
        }

        .soon-badge {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Sidebar Footer */
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-bottom: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .user-details {
          flex: 1;
          overflow: hidden;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          justify-content: center;
          min-height: 44px;
        }

        .portal-sidebar.closed:not(.mobile) .logout-btn {
          padding: 0.75rem;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.02);
        }

        .logout-btn:active {
          transform: scale(0.98);
        }

        /* Main Content */
        .portal-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s ease;
          position: relative;
          z-index: 1;
        }

        /* Desktop Header */
        .portal-header {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 2rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn,
        .help-btn {
          position: relative;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .notification-btn:hover,
        .help-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 999px;
          min-width: 18px;
          text-align: center;
        }

        /* Content Area */
        .portal-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Mobile Bottom Navigation */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 56px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
          padding: 0 1rem;
        }

        .bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.2s;
          padding: 0.5rem;
        }

        .bottom-nav-item.active {
          color: #667eea;
        }

        .bottom-nav-item:active {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          .portal-header {
            display: none;
          }

          .portal-main {
            margin-left: 0 !important;
          }

          .portal-content {
            padding: 1rem;
            padding-top: calc(56px + 1rem);
            padding-bottom: calc(56px + 1rem);
          }

          .mobile-bottom-nav {
            display: flex;
          }

          /* Disable orbs on mobile for performance */
          .gradient-orb {
            display: none;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 768px) and (max-width: 1024px) {
          .portal-sidebar {
            width: 200px;
          }
          
          .portal-sidebar.closed {
            width: 60px;
          }

          .portal-content {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: light) {
          /* Add light mode overrides if needed */
        }

        /* iOS Safe Areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .mobile-bottom-nav {
            padding-bottom: env(safe-area-inset-bottom);
            height: calc(56px + env(safe-area-inset-bottom));
          }

          .portal-content {
            padding-bottom: calc(56px + env(safe-area-inset-bottom) + 1rem);
          }
        }
      `}</style>
    </div>
  );
}