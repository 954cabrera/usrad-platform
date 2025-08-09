// src/components/Providers/Dashboard/Profile/ContactSection.jsx
import React from "react";
import { Mail, Phone, User, FileText, Globe } from "lucide-react";

export default function ContactSection({
  provider,
  isEditing,
  onInputChange,
  errors,
}) {
  return (
    <div className="profile-section glass-card">
      <h3 className="section-header">
        <Mail size={20} />
        Contact Information
      </h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Primary Contact Name *</label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              type="text"
              value={provider.primaryContact || ""}
              onChange={(e) => onInputChange("primaryContact", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="Full name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <div className="input-with-icon">
            <Mail size={16} className="input-icon" />
            <input
              type="email"
              value={provider.email || ""}
              onChange={(e) => onInputChange("email", e.target.value)}
              disabled={!isEditing}
              className={`${!isEditing ? "disabled" : ""} ${errors.email ? "error" : ""}`}
              placeholder="email@example.com"
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <div className="input-with-icon">
            <Phone size={16} className="input-icon" />
            <input
              type="tel"
              value={provider.phone || ""}
              onChange={(e) => onInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Fax Number</label>
          <div className="input-with-icon">
            <FileText size={16} className="input-icon" />
            <input
              type="tel"
              value={provider.fax || ""}
              onChange={(e) => onInputChange("fax", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Website</label>
          <div className="input-with-icon">
            <Globe size={16} className="input-icon" />
            <input
              type="url"
              value={provider.website || ""}
              onChange={(e) => onInputChange("website", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
