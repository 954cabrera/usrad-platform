// src/components/Providers/Dashboard/ProfileManager.jsx
import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Save,
  Edit3,
  Check,
  AlertCircle,
  X,
  Camera,
  ChevronDown,
  User,
  Briefcase,
  Hash,
  FileText,
} from "lucide-react";

export default function ProfileManager({ provider: initialProvider }) {
  const [provider, setProvider] = useState(initialProvider);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setProvider((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: Building2 },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "address", label: "Address", icon: MapPin },
    { id: "banking", label: "Banking", icon: DollarSign },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "basic":
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
                  onChange={(e) =>
                    handleInputChange("legalName", e.target.value)
                  }
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
                  onChange={(e) => handleInputChange("dba", e.target.value)}
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
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("businessType", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange("yearEstablished", e.target.value)
                    }
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
                  onChange={(e) =>
                    handleInputChange("npiNumber", e.target.value)
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "disabled" : ""}
                  placeholder="10-digit NPI"
                />
              </div>
            </div>
          </div>
        );

      case "contact":
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
                    onChange={(e) =>
                      handleInputChange("primaryContact", e.target.value)
                    }
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    onChange={(e) => handleInputChange("phone", e.target.value)}
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
                    onChange={(e) => handleInputChange("fax", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "disabled" : ""}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "address":
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
                  onChange={(e) => handleInputChange("address", e.target.value)}
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
                  onChange={(e) => handleInputChange("city", e.target.value)}
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
                    onChange={(e) => handleInputChange("state", e.target.value)}
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
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "disabled" : ""}
                  placeholder="XXXXX"
                  maxLength="5"
                />
              </div>
            </div>
          </div>
        );

      case "banking":
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
                  onChange={(e) =>
                    handleInputChange("bankName", e.target.value)
                  }
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
                    onChange={(e) =>
                      handleInputChange("accountType", e.target.value)
                    }
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
                <p className="help-text">
                  For security, contact support to update
                </p>
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
                <p className="help-text">
                  For security, contact support to update
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profile-manager">
      {/* Header */}
      <div className="profile-header">
        <div className="header-content">
          <h2 className="section-title">Organization Profile</h2>
          <p className="section-subtitle">
            Manage your organization's information and settings
          </p>
        </div>
        <div className="header-actions desktop-only">
          {!isEditing ? (
            <button
              className="edit-btn glass-button"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={20} />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setProvider(initialProvider);
                  setErrors({});
                }}
              >
                Cancel
              </button>
              <button
                className="save-btn glass-button"
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={20} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Edit Button */}
      {!isEditing && (
        <button
          className="mobile-edit-btn mobile-only"
          onClick={() => setIsEditing(true)}
        >
          <Edit3 size={20} />
          Edit Profile
        </button>
      )}

      {/* Mobile Edit Actions */}
      {isEditing && (
        <div className="mobile-edit-actions mobile-only">
          <button
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setProvider(initialProvider);
              setErrors({});
            }}
          >
            <X size={20} />
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <Save size={20} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {/* Success Alert */}
      {showSuccess && (
        <div className="success-alert glass-card">
          <Check size={20} />
          Profile updated successfully!
        </div>
      )}

      {/* Mobile Section Tabs */}
      <div className="mobile-tabs mobile-only">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`tab-btn ${activeSection === section.id ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop - All Sections */}
      <div className="profile-sections desktop-only">
        {/* Basic Information */}
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
                onChange={(e) => handleInputChange("legalName", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              />
            </div>

            <div className="form-group">
              <label>DBA (Doing Business As)</label>
              <input
                type="text"
                value={provider.dba || ""}
                onChange={(e) => handleInputChange("dba", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              />
            </div>

            <div className="form-group">
              <label>Tax ID (EIN) *</label>
              <input
                type="text"
                value={provider.taxId || ""}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              />
            </div>

            <div className="form-group">
              <label>Business Type *</label>
              <select
                value={provider.businessType || ""}
                onChange={(e) =>
                  handleInputChange("businessType", e.target.value)
                }
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              >
                <option value="">Select Type</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="partnership">Partnership</option>
                <option value="sole_proprietor">Sole Proprietor</option>
              </select>
            </div>

            <div className="form-group">
              <label>Year Established</label>
              <input
                type="number"
                value={provider.yearEstablished || ""}
                onChange={(e) =>
                  handleInputChange("yearEstablished", e.target.value)
                }
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              />
            </div>

            <div className="form-group">
              <label>NPI Number</label>
              <input
                type="text"
                value={provider.npiNumber || ""}
                onChange={(e) => handleInputChange("npiNumber", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "disabled" : ""}
              />
            </div>
          </div>
        </div>

        {/* Contact, Address, and Banking sections for desktop... */}
        {/* (Same content as mobile but displayed all at once) */}
      </div>

      {/* Mobile - Single Section */}
      <div className="profile-sections mobile-only">{renderSection()}</div>

      <style jsx>{`
        .profile-manager {
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Header */
        .profile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .edit-btn,
        .save-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn:hover,
        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Mobile Edit Buttons */
        .mobile-edit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .mobile-edit-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          position: sticky;
          top: 0;
          background: #0a0f1b;
          padding: 1rem 0;
          z-index: 10;
        }

        .mobile-edit-actions .cancel-btn,
        .mobile-edit-actions .save-btn {
          flex: 1;
          justify-content: center;
        }

        /* Success Alert */
        .success-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem !important;
          background: rgba(34, 197, 94, 0.1) !important;
          border-color: rgba(34, 197, 94, 0.3) !important;
          color: #22c55e;
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Tabs */
        .mobile-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 0.5rem;
        }

        .mobile-tabs::-webkit-scrollbar {
          display: none;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .tab-btn.active {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }

        /* Profile Sections */
        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-group input:focus:not(:disabled),
        .form-group select:focus:not(:disabled) {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        .form-group input.disabled,
        .form-group select.disabled,
        .form-group input:disabled,
        .form-group select:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.02);
        }

        .form-group input.secure {
          font-family: monospace;
          letter-spacing: 0.1em;
        }

        .form-group input.error {
          border-color: #ef4444;
        }

        /* Input with Icon */
        .input-with-icon {
          position: relative;
        }

        .input-with-icon input {
          padding-left: 2.5rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
        }

        /* Select Wrapper */
        .select-wrapper {
          position: relative;
        }

        .select-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        /* Help Text */
        .help-text {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
        }

        .error-message {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.25rem;
        }

        /* Secure Notice */
        .secure-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 8px;
          color: #f59e0b;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        /* Utilities */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: flex !important;
          }

          .glass-card {
            padding: 1.5rem !important;
            border-radius: 12px;
          }

          .section-header {
            font-size: 1.125rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-group label {
            font-size: 0.813rem;
          }

          .form-group input,
          .form-group select {
            font-size: 16px; /* Prevents zoom on iOS */
            padding: 0.875rem;
          }

          .secure-notice {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .mobile-edit-actions {
            gap: 0.5rem;
          }

          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.813rem;
          }

          .tab-btn svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .tab-btn:active {
            transform: scale(0.95);
          }

          .mobile-edit-btn:active {
            transform: scale(0.98);
          }
        }

        /* iOS Safe Areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .mobile-edit-actions {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
}
