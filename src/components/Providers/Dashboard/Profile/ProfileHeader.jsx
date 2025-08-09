// src/components/Providers/Dashboard/Profile/ProfileHeader.jsx
import React from "react";
import { Edit3, Save, X } from "lucide-react";

export default function ProfileHeader({
  isEditing,
  saving,
  onEdit,
  onSave,
  onCancel,
}) {
  return (
    <div className="profile-header">
      <div className="header-content">
        <h2 className="section-title">Organization Profile</h2>
        <p className="section-subtitle">
          Manage your organization's information and settings
        </p>
      </div>
      <div className="header-actions desktop-only">
        {!isEditing ? (
          <button className="edit-btn glass-button" onClick={onEdit}>
            <Edit3 size={20} />
            Edit Profile
          </button>
        ) : (
          <>
            <button className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="save-btn glass-button"
              onClick={onSave}
              disabled={saving}
            >
              <Save size={20} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
