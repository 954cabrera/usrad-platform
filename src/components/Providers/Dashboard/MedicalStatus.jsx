// src/components/Providers/Dashboard/MedicalStatus.jsx
import React from "react";
import { Shield, Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function MedicalStatus() {
  return (
    <div className="medical-status-card glass-card">
      <div className="status-header">
        <Shield size={20} />
        <h3>Network Status</h3>
      </div>
      <div className="status-grid">
        <div className="status-item">
          <div className="status-indicator active">
            <div className="pulse-ring"></div>
            <div className="pulse-core"></div>
          </div>
          <span>All Systems Operational</span>
        </div>
        <div className="status-item">
          <Activity size={16} />
          <span>HIPAA Compliant</span>
        </div>
        <div className="status-item">
          <CheckCircle size={16} />
          <span>SOC 2 Certified</span>
        </div>
      </div>

      <style>{`
        .medical-status-card {
          margin-bottom: 1.5rem;
          padding: 1.5rem;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #0ea5e9;
        }

        .status-header h3 {
          margin: 0;
          font-size: 1.125rem;
          color: white;
        }

        .status-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .status-indicator {
          position: relative;
          width: 12px;
          height: 12px;
        }

        .status-indicator.active .pulse-core {
          background: #10b981;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .pulse-ring {
          position: absolute;
          inset: -8px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
          opacity: 0.5;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .medical-status-card {
            margin-bottom: 1rem;
            padding: 1rem;
          }

          .status-header h3 {
            font-size: 1rem;
          }

          .status-item {
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
}
