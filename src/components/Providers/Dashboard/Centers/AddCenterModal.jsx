// src/components/Providers/Dashboard/Centers/AddCenterModal.jsx
import React, { useState } from "react";
import { X, Plus, Building2, MapPin, Phone, Mail } from "lucide-react";
import { centerStyles } from "./shared/styles";

export default function AddCenterModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "FL",
    zipCode: "",
    phone: "",
    email: "",
    hours: "",
    status: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Center</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-section">
            <h4>
              <Building2 size={20} /> Basic Information
            </h4>

            <div className="form-group">
              <label>Center Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Advanced Imaging Center"
                required
              />
            </div>

            <div className="form-group">
              <label>Operating Hours *</label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                placeholder="e.g., Mon-Fri 8AM-6PM"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h4>
              <MapPin size={20} /> Location
            </h4>

            <div className="form-group">
              <label>Street Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                >
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="AL">Alabama</option>
                  <option value="SC">South Carolina</option>
                </select>
              </div>

              <div className="form-group">
                <label>ZIP *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  placeholder="XXXXX"
                  maxLength="5"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>
              <Phone size={20} /> Contact Information
            </h4>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(XXX) XXX-XXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="center@example.com"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <Plus size={20} />
              Add Center
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: #1e293b;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h3 {
          color: white;
          font-size: 1.25rem;
          margin: 0;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section:last-of-type {
          margin-bottom: 0;
        }

        .form-section h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-size: 1rem;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        .form-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cancel-btn,
        .submit-btn {
          flex: 1;
          padding: 0.875rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .cancel-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .modal-content {
            max-height: calc(100vh - 2rem);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .modal-footer {
            flex-direction: column;
          }

          .cancel-btn,
          .submit-btn {
            width: 100%;
          }
        }

        @media (hover: none) {
          .close-btn:active {
            transform: scale(0.95);
          }

          .submit-btn:active,
          .cancel-btn:active {
            transform: scale(0.98);
          }
        }

        @supports (padding: env(safe-area-inset-bottom)) {
          .modal-content {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
}
