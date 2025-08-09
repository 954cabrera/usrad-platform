// src/components/Providers/Dashboard/Profile/BasicInfoSection.jsx
import React from "react";
import { Building2, Hash, Calendar, ChevronDown } from "lucide-react";

export default function BasicInfoSection({
  provider,
  isEditing,
  onInputChange,
}) {
  return (
    <div className="profile-section glass-card">
      <h3 className="section-header">
        <Building2 size={20} />
        Basic Information
      </h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Legal Entity Name *</label>
          <input
            type="text"
            value={provider.legalName || ""}
            onChange={(e) => onInputChange("legalName", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="Enter legal name"
          />
        </div>

        <div className="form-group">
          <label>DBA (Doing Business As)</label>
          <input
            type="text"
            value={provider.dba || ""}
            onChange={(e) => onInputChange("dba", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="Enter DBA if different"
          />
        </div>

        <div className="form-group">
          <label>Tax ID (EIN) *</label>
          <div className="input-with-icon">
            <Hash size={16} className="input-icon" />
            <input
              type="text"
              value={provider.taxId || ""}
              onChange={(e) => onInputChange("taxId", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="XX-XXXXXXX"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Business Type *</label>
          <div className="select-wrapper">
            <select
              value={provider.businessType || ""}
              onChange={(e) => onInputChange("businessType", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
            >
              <option value="">Select Type</option>
              <option value="llc">LLC</option>
              <option value="corporation">Corporation</option>
              <option value="partnership">Partnership</option>
              <option value="sole_proprietor">Sole Proprietor</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="form-group">
          <label>Year Established</label>
          <div className="input-with-icon">
            <Calendar size={16} className="input-icon" />
            <input
              type="number"
              value={provider.yearEstablished || ""}
              onChange={(e) => onInputChange("yearEstablished", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="form-group">
          <label>NPI Number</label>
          <input
            type="text"
            value={provider.npiNumber || ""}
            onChange={(e) => onInputChange("npiNumber", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="10-digit NPI"
          />
        </div>
      </div>
    </div>
  );
}
