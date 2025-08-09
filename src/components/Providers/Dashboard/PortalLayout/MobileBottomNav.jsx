// src/components/Providers/Dashboard/PortalLayout/MobileBottomNav.jsx
import React from 'react';

export default function MobileBottomNav({ navigation, currentPage }) {
  return (
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
  );
}