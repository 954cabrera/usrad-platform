// src/components/Providers/Dashboard/Centers/CenterCard.jsx
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  Star,
  Wifi,
  Car,
  Accessibility,
} from "lucide-react";
import { centerStyles } from "./shared/styles";

export default function CenterCard({
  center,
  onEdit,
  onDelete,
  onViewDetails,
}) {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const getStatusStyle = () => {
    const status =
      centerStyles.statusColors[center.status] ||
      centerStyles.statusColors.inactive;
    return status;
  };

  const getEquipmentIcon = (type) => {
    return (
      centerStyles.equipmentIcons[type] || centerStyles.equipmentIcons.default
    );
  };

  return (
    <div className="center-card glass-card">
      {/* Center Header */}
      <div className="center-header">
        <div className="center-title-row">
          <h3 className="center-name">{center.name}</h3>
          <span
            className="status-badge"
            style={{
              background: getStatusStyle().bg,
              color: getStatusStyle().color,
            }}
          >
            {getStatusStyle().label}
          </span>
        </div>

        {/* Desktop Actions */}
        <div className="center-actions desktop-only">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(center)}
            aria-label="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(center)}
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Mobile Actions Menu */}
        <button
          className="mobile-action-btn mobile-only"
          onClick={() => setShowActionMenu(!showActionMenu)}
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>

        {/* Mobile Action Dropdown */}
        {showActionMenu && (
          <div className="mobile-action-menu">
            <button onClick={() => onEdit(center)}>
              <Edit size={16} />
              Edit Center
            </button>
            <button className="delete" onClick={() => onDelete(center)}>
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
      <div className="mobile-contact mobile-only">
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
              <Accessibility size={14} />
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
          <span className="metric-value">${center.avgPrice || "N/A"}</span>
          <span className="metric-label">Avg Price</span>
        </div>
      </div>

      {/* Mobile View Details Button */}
      <button
        className="view-details-btn mobile-only"
        onClick={() => onViewDetails(center)}
      >
        View Details
        <ChevronRight size={16} />
      </button>

      <style>{`
        .center-card {
          ${centerStyles.glassCard}
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .center-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
          gap: 1rem;
        }

        .center-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin: 0;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .center-actions {
          ${centerStyles.desktopOnly}
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
          ${centerStyles.touchButton}
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
          ${centerStyles.mobileOnly}
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

        .mobile-action-menu button {
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

        .mobile-action-menu button:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-action-menu button.delete {
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
          ${centerStyles.mobileOnly}
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
          ${centerStyles.touchButton}
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
          ${centerStyles.mobileOnly}
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
          ${centerStyles.touchButton}
        }

        /* Utilities */
        .desktop-only {
          ${centerStyles.desktopOnly}
        }

        .mobile-only {
          ${centerStyles.mobileOnly}
        }

        .mobile-hide {
          display: flex;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .center-card {
            padding: 1rem;
          }

          .center-name {
            font-size: 1.125rem;
          }

          .mobile-hide {
            display: none !important;
          }

          .equipment-item {
            padding: 0.375rem;
          }

          .equipment-icon {
            font-size: 1rem;
            width: 24px;
          }

          .feature-badge {
            padding: 0.25rem 0.5rem;
          }

          .feature-badge span {
            display: none;
          }

          .center-metrics {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric-value {
            font-size: 1rem;
          }

          .view-details-btn {
            margin-top: 0.5rem;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .center-card:active {
            transform: scale(0.98);
          }

          .mobile-action-btn:active {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
