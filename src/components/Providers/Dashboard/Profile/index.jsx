// src/components/Providers/Dashboard/Profile/index.jsx
import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  MapPin,
  DollarSign,
  Edit3,
  Save,
  X,
  Check,
} from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import BasicInfoSection from "./BasicInfoSection";
import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import BankingSection from "./BankingSection";
import MobileTabs from "./MobileTabs";
import ProfileSkeleton from "./ProfileSkeleton";
import "../../../../styles/providers/profile-manager.css";

export default function ProfileManager({ provider: initialProvider }) {
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState(initialProvider);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

  const handleCancel = () => {
    setIsEditing(false);
    setProvider(initialProvider);
    setErrors({});
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
          <BasicInfoSection
            provider={provider}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        );
      case "contact":
        return (
          <ContactSection
            provider={provider}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case "address":
        return (
          <AddressSection
            provider={provider}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        );
      case "banking":
        return (
          <BankingSection
            provider={provider}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="profile-manager">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="profile-manager">
      <ProfileHeader
        isEditing={isEditing}
        saving={saving}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />

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
          <button className="cancel-btn" onClick={handleCancel}>
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

      {/* Mobile Tabs */}
      <MobileTabs
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Desktop - All Sections */}
      <div className="profile-sections desktop-only">
        <BasicInfoSection
          provider={provider}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
        <ContactSection
          provider={provider}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          errors={errors}
        />
        <AddressSection
          provider={provider}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
        <BankingSection
          provider={provider}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
      </div>

      {/* Mobile - Single Section */}
      <div className="profile-sections mobile-only">{renderSection()}</div>
    </div>
  );
}
