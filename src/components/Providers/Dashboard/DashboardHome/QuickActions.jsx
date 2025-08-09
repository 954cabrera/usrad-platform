// src/components/Providers/Dashboard/DashboardHome/QuickActions.jsx
import React from 'react';

export default function QuickActions({ actions }) {
  return (
    <div className="quick-actions-section">
      <h3 className="section-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map((action, index) => {
          const ActionIcon = action.icon;
          return (
            <a
              key={index}
              href={action.href}
              className="quick-action-card"
            >
              <div
                className="action-icon"
                style={{
                  background: action.bgColor,
                  color: action.iconColor,
                }}
              >
                <ActionIcon size={24} />
              </div>
              <span className="action-label">{action.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}