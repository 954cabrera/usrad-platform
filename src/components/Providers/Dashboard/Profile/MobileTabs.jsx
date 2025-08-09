// src/components/Providers/Dashboard/Profile/MobileTabs.jsx
import React from "react";

export default function MobileTabs({
  sections,
  activeSection,
  onSectionChange,
}) {
  return (
    <div className="mobile-tabs mobile-only">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`tab-btn ${activeSection === section.id ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{section.label}</span>
          </button>
        );
      })}
    </div>
  );
}
