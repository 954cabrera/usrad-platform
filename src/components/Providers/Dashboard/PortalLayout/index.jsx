// src/components/Providers/Dashboard/PortalLayout/index.jsx
import React, { useState, useEffect } from "react";
import BackgroundOrbs from "./BackgroundOrbs";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";
import { navigation } from "./navigation";
import "../../../../styles/providers/portal-layout.css";

export default function PortalLayout({ children, currentPage = "dashboard" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [provider, setProvider] = useState(null);
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
    const providerData = localStorage.getItem("provider_organization");
    if (providerData) {
      try {
        setProvider(JSON.parse(providerData));
      } catch (e) {
        console.error("Error parsing provider data:", e);
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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/providers/login";
  };

  const getCurrentNav = () => {
    const found = navigation.find((n) => n.id === currentPage);
    return found ? found.label : "Dashboard";
  };

  const handleNavigate = (pageId) => {
    if (isMobile) {
      // Close sidebar on mobile after navigation
      setTimeout(() => setIsSidebarOpen(false), 100);
    }
  };

  return (
    <div
      className="portal-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <BackgroundOrbs />

      {isMobile && (
        <MobileHeader
          currentNav={getCurrentNav()}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        currentPage={currentPage}
        navigation={navigation}
        provider={provider}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={handleNavigate}
      />

      <main
        className={`portal-main ${isSidebarOpen && !isMobile ? "sidebar-open" : "sidebar-closed"}`}
      >
        {!isMobile && (
          <DesktopHeader currentNav={getCurrentNav()} onLogout={handleLogout} />
        )}

        <div className="portal-content">{children}</div>

        {isMobile && (
          <MobileBottomNav navigation={navigation} currentPage={currentPage} />
        )}
      </main>
    </div>
  );
}
