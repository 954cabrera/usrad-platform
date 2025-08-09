// src/components/Providers/Dashboard/Profile/BankingSection.jsx
import React from "react";
import { DollarSign, AlertCircle, ChevronDown } from "lucide-react";

export default function BankingSection({ provider, isEditing, onInputChange }) {
  return (
    <div className="profile-section glass-card">
      <h3 className="section-header">
        <DollarSign size={20} />
        Banking Information
      </h3>

      <div className="secure-notice">
        <AlertCircle size={16} />
        <span>Banking information is encrypted and stored securely</span>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Bank Name</label>
          <input
            type="text"
            value={provider.bankName || ""}
            onChange={(e) => onInputChange("bankName", e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
            placeholder="Bank name"
          />
        </div>

        <div className="form-group">
          <label>Account Type</label>
          <div className="select-wrapper">
            <select
              value={provider.accountType || ""}
              onChange={(e) => onInputChange("accountType", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "disabled" : ""}
            >
              <option value="">Select Type</option>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
          </div>
        </div>

        <div className="form-group">
          <label>Routing Number</label>
          <input
            type="text"
            value={
              provider.routingNumber
                ? "****" + provider.routingNumber.slice(-4)
                : ""
            }
            disabled={true}
            className="disabled secure"
            placeholder="Contact support to update"
          />
          <p className="help-text">For security, contact support to update</p>
        </div>

        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            value={
              provider.accountNumber
                ? "****" + provider.accountNumber.slice(-4)
                : ""
            }
            disabled={true}
            className="disabled secure"
            placeholder="Contact support to update"
          />
          <p className="help-text">For security, contact support to update</p>
        </div>
      </div>
    </div>
  );
}
