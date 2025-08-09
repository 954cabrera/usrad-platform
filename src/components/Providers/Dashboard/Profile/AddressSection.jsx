// src/components/Providers/Dashboard/Profile/AddressSection.jsx
import React from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function AddressSection({ provider, isEditing, onInputChange }) {
  return (
    <div className="profile-section glass-card">
      <h3 className="section-header">
        <MapPin size={20} />
        Corporate Address
      </h3>

      <div className="form-grid">
        <div className="form-group full-width">
          <label>Street Address *</label>
          <input
            type="text"
            value={provider.address || ""}
            onChange={(e) => onInputChange("address", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="123 Main Street"
          />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            value={provider.city || ""}
            onChange={(e) => onInputChange("city", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="City"
          />
        </div>

        <div className="form-group">
          <label>State *</label>
          <div className="select-wrapper">
            <select
              value={provider.state || ""}
              onChange={(e) => onInputChange("state", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
            >
              <option value="">Select State</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="AL">Alabama</option>
              <option value="SC">South Carolina</option>
              <option value="NC">North Carolina</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="form-group">
          <label>ZIP Code *</label>
          <input
            type="text"
            value={provider.zipCode || ""}
            onChange={(e) => onInputChange("zipCode", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="XXXXX"
            maxLength="5"
          />
        </div>
      </div>
    </div>
  );
}
