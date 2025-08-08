// src/components/Providers/Dashboard/CentersManager.jsx
import React, { useState } from "react";
import { Badge } from "@tremor/react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit,
  Trash2,
  Plus,
  Camera,
  Wifi,
  Shield,
  ChevronRight,
  Filter,
  Search,
  X,
  MoreVertical,
  CheckCircle,
  Car,
  Accessibility, // Changed from Wheelchair
  Star,
} from "lucide-react";

export default function CentersManager({
  providerId,
  centers: initialCenters = [],
}) {
  const [centers, setCenters] = useState(initialCenters);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "emerald";
      case "pending":
        return "amber";
      case "inactive":
        return "red";
      default:
        return "gray";
    }
  };

  const getEquipmentIcon = (type) => {
    switch (type) {
      case "MRI":
        return "🧲";
      case "CT":
        return "🔄";
      case "X-Ray":
        return "📡";
      case "Ultrasound":
        return "🔊";
      case "PET":
        return "⚛️";
      default:
        return "🏥";
    }
  };

  const statusOptions = [
    { value: "all", label: "All Centers" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  // Filter centers
  const filteredCenters = centers.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || center.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="centers-manager">
      {/* Header */}
      <div className="centers-header">
        <div className="header-content">
          <h2 className="section-title">Imaging Centers</h2>
          <p className="section-subtitle">
            Manage your imaging centers and equipment
          </p>
        </div>
        <button
          className="add-center-btn glass-button desktop-only"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add New Center
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats-row">
        <div className="stat-card glass-card">
          <div className="stat-icon">
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-value">{centers.length}</p>
            <p className="stat-label">Total Centers</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon">
            <Camera size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-value">
              {centers.reduce(
                (acc, center) => acc + (center.equipment?.length || 0),
                0
              )}
            </p>
            <p className="stat-label">Equipment</p>
          </div>
        </div>
        <div className="stat-card glass-card mobile-hide">
          <div className="stat-icon">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-value">
              {centers.filter((c) => c.status === "active").length}
            </p>
            <p className="stat-label">Active</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="controls-bar">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search centers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Desktop Status Filters */}
        <div className="desktop-filters">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`filter-btn ${filterStatus === option.value ? "active" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal">
          <div
            className="filter-backdrop"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="filter-content">
            <div className="filter-header">
              <h3>Filter Centers</h3>
              <button
                className="close-btn"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="filter-options">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilterStatus(option.value);
                    setShowMobileFilters(false);
                  }}
                  className={`filter-option ${filterStatus === option.value ? "active" : ""}`}
                >
                  <span>{option.label}</span>
                  {filterStatus === option.value && <CheckCircle size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Center FAB (Mobile) */}
      <button
        className="add-fab mobile-only"
        onClick={() => setShowAddModal(true)}
        aria-label="Add center"
      >
        <Plus size={24} />
      </button>

      {/* Centers Grid */}
      <div className="centers-grid">
        {filteredCenters.map((center) => (
          <div key={center.id} className="center-card glass-card">
            {/* Center Header */}
            <div className="center-header">
              <div className="center-title-row">
                <h3 className="center-name">{center.name}</h3>
                <Badge color={getStatusColor(center.status)} size="sm">
                  {center.status}
                </Badge>
              </div>

              {/* Desktop Actions */}
              <div className="center-actions desktop-only">
                <button className="action-btn edit-btn" aria-label="Edit">
                  <Edit size={16} />
                </button>
                <button className="action-btn delete-btn" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Mobile Actions Menu */}
              <button
                className="mobile-action-btn mobile-only"
                onClick={() =>
                  setShowActionMenu(
                    showActionMenu === center.id ? null : center.id
                  )
                }
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>

              {/* Mobile Action Dropdown */}
              {showActionMenu === center.id && (
                <div className="mobile-action-menu">
                  <button className="menu-item">
                    <Edit size={16} />
                    Edit Center
                  </button>
                  <button className="menu-item delete">
                    <Trash2 size={16} />
                    Delete Center
                  </button>
                </div>
              )}
            </div>

            {/* Center Info */}
            <div className="center-info">
              <div className="info-item">
                <MapPin size={16} />
                <span>{center.address}</span>
              </div>
              <div className="info-item mobile-hide">
                <Phone size={16} />
                <span>{center.phone}</span>
              </div>
              <div className="info-item mobile-hide">
                <Mail size={16} />
                <span>{center.email}</span>
              </div>
              <div className="info-item">
                <Clock size={16} />
                <span>{center.hours}</span>
              </div>
            </div>

            {/* Contact Info Mobile */}
            <div className="mobile-contact">
              <a href={`tel:${center.phone}`} className="contact-btn">
                <Phone size={16} />
                Call
              </a>
              <a href={`mailto:${center.email}`} className="contact-btn">
                <Mail size={16} />
                Email
              </a>
            </div>

            {/* Equipment Section */}
            <div className="equipment-section">
              <h4 className="equipment-title">
                Equipment ({center.equipment?.length || 0})
              </h4>
              <div className="equipment-list">
                {center.equipment?.slice(0, 3).map((equip, idx) => (
                  <div key={idx} className="equipment-item">
                    <span className="equipment-icon">
                      {getEquipmentIcon(equip.type)}
                    </span>
                    <div className="equipment-details">
                      <p className="equipment-name">
                        {equip.type} • {equip.strength}
                      </p>
                      <p className="equipment-model">{equip.manufacturer}</p>
                    </div>
                  </div>
                ))}
                {center.equipment?.length > 3 && (
                  <button className="view-more-btn">
                    +{center.equipment.length - 3} more
                  </button>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="features-section">
              <div className="feature-badges">
                {center.features?.includes("wifi") && (
                  <div className="feature-badge" title="WiFi Available">
                    <Wifi size={14} />
                    <span className="desktop-only">WiFi</span>
                  </div>
                )}
                {center.features?.includes("parking") && (
                  <div className="feature-badge" title="Free Parking">
                    <Car size={14} />
                    <span className="desktop-only">Parking</span>
                  </div>
                )}
                {center.features?.includes("wheelchair") && (
                  <div className="feature-badge" title="Wheelchair Accessible">
                    <Accessibility size={14} /> {/* Changed from Wheelchair */}
                    <span className="desktop-only">Accessible</span>
                  </div>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="center-metrics">
              <div className="metric">
                <span className="metric-value">{center.monthlyScans || 0}</span>
                <span className="metric-label">Scans/Mo</span>
              </div>
              <div className="metric">
                <span className="metric-value">
                  {center.rating ? (
                    <>
                      {center.rating} <Star size={12} />
                    </>
                  ) : (
                    "N/A"
                  )}
                </span>
                <span className="metric-label">Rating</span>
              </div>
              <div className="metric mobile-hide">
                <span className="metric-value">
                  ${center.avgPrice || "N/A"}
                </span>
                <span className="metric-label">Avg Price</span>
              </div>
            </div>

            {/* Mobile View Details Button */}
            <button
              className="view-details-btn mobile-only"
              onClick={() => setSelectedCenter(center)}
            >
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
        ))}

        {/* Add Center Card - Desktop */}
        <div
          className="center-card add-card glass-card desktop-only"
          onClick={() => setShowAddModal(true)}
        >
          <div className="add-content">
            <Plus size={48} className="add-icon" />
            <p className="add-text">Add New Center</p>
            <p className="add-subtext">Expand your network</p>
          </div>
        </div>

        {/* Empty State */}
        {filteredCenters.length === 0 && (
          <div className="empty-state">
            <Building2 size={48} />
            <h3>No centers found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .centers-manager {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .centers-header {
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

        .add-center-btn {
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

        .add-center-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem !important;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .stat-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        /* Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        /* Controls Bar */
        .controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        /* Desktop Filters */
        .desktop-filters {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-btn.active {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: #667eea;
        }

        /* Mobile Filter Button */
        .mobile-filter-btn {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          cursor: pointer;
        }

        /* Mobile Filter Modal */
        .mobile-filter-modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1000;
        }

        .filter-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .filter-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0f172a;
          border-radius: 24px 24px 0 0;
          padding: 1.5rem;
          max-height: 80vh;
          overflow-y: auto;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .filter-header h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0.5rem;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-option.active {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        /* Add FAB */
        .add-fab {
          display: none;
          position: fixed;
          bottom: 80px;
          right: 1rem;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          z-index: 100;
          align-items: center;
          justify-content: center;
        }

        /* Centers Grid */
        .centers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .center-card {
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .center-header {
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1rem;
        }

        .center-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .center-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }

        .center-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* Mobile Action Menu */
        .mobile-action-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem;
          cursor: pointer;
        }

        .mobile-action-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 10;
          min-width: 160px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.2s;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .menu-item.delete {
          color: #ef4444;
        }

        /* Center Info */
        .center-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .info-item svg {
          color: rgba(255, 255, 255, 0.5);
          flex-shrink: 0;
        }

        /* Mobile Contact */
        .mobile-contact {
          display: none;
          gap: 0.75rem;
        }

        .contact-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .contact-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Equipment Section */
        .equipment-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }

        .equipment-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .equipment-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .equipment-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .equipment-icon {
          font-size: 1.25rem;
          width: 32px;
          text-align: center;
        }

        .equipment-name {
          color: white;
          font-weight: 500;
          margin: 0;
          font-size: 0.875rem;
        }

        .equipment-model {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
          margin: 0;
        }

        .view-more-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-top: 0.5rem;
        }

        .view-more-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        /* Features */
        .feature-badges {
          display: flex;
          gap: 0.5rem;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 999px;
          color: #22c55e;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Metrics */
        .center-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .metric-value {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .metric-label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
        }

        /* View Details Button */
        .view-details-btn {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 8px;
          color: #667eea;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        /* Add Card */
        .add-card {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          cursor: pointer;
          border-style: dashed;
        }

        .add-card:hover {
          border-color: rgba(102, 126, 234, 0.3);
          background: rgba(102, 126, 234, 0.05) !important;
        }

        .add-content {
          text-align: center;
        }

        .add-icon {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1rem;
        }

        .add-text {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .add-subtext {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        /* Empty State */
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          gap: 1rem;
        }

        .empty-state h3 {
          color: white;
          font-size: 1.25rem;
        }

        /* Utilities */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        .mobile-hide {
          display: flex;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          /* Header */
          .centers-header {
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

          .mobile-hide {
            display: none !important;
          }

          /* Stats */
          .stat-card {
            padding: 1rem !important;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          /* Controls */
          .controls-bar {
            flex-direction: column;
            width: 100%;
          }

          .search-container {
            width: 100%;
          }

          .desktop-filters {
            display: none;
          }

          .mobile-filter-btn {
            display: flex;
            width: 100%;
            justify-content: center;
          }

          .mobile-filter-modal {
            display: block;
          }

          /* Centers Grid */
          .centers-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .center-card {
            padding: 1rem !important;
          }

          .center-name {
            font-size: 1.125rem;
          }

          /* Mobile Contact */
          .mobile-contact {
            display: flex;
          }

          /* Equipment */
          .equipment-item {
            padding: 0.375rem;
          }

          .equipment-icon {
            font-size: 1rem;
            width: 24px;
          }

          /* Features */
          .feature-badge {
            padding: 0.25rem 0.5rem;
          }

          .feature-badge span {
            display: none;
          }

          /* Metrics */
          .center-metrics {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric-value {
            font-size: 1rem;
          }

          /* View Details */
          .view-details-btn {
            display: flex;
            margin-top: 0.5rem;
          }

          /* Add FAB */
          .add-fab {
            display: flex !important;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .centers-grid {
            padding: 0 0.5rem;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Touch States */
        @media (hover: none) {
          .center-card:active {
            transform: scale(0.98);
          }

          .contact-btn:active {
            transform: scale(0.95);
          }
        }

        /* Safe areas for iOS */
        @supports (padding: env(safe-area-inset-bottom)) {
          .add-fab {
            bottom: calc(80px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
