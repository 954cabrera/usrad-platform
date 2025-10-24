// src/components/Providers/Dashboard/Security/ActivityLogs.jsx
import React, { useState } from "react";
import {
  Check,
  X,
  Download,
  Calendar,
  Filter,
  AlertTriangle,
} from "lucide-react";

export default function ActivityLogs() {
  const [logs] = useState([
    {
      id: 1,
      action: "Password changed",
      timestamp: "2025-08-05 14:30:00",
      ip: "192.168.1.1",
      status: "success",
      details: "Password successfully updated",
    },
    {
      id: 2,
      action: "Login attempt",
      timestamp: "2025-08-08 09:15:00",
      ip: "192.168.1.1",
      status: "success",
      details: "Logged in from Chrome on Windows",
    },
    {
      id: 3,
      action: "API key created",
      timestamp: "2025-08-01 10:00:00",
      ip: "192.168.1.1",
      status: "success",
      details: "Created new API key: Production API",
    },
    {
      id: 4,
      action: "Failed login attempt",
      timestamp: "2025-07-28 15:45:00",
      ip: "192.168.1.5",
      status: "failed",
      details: "Invalid password - 3 attempts remaining",
    },
    {
      id: 5,
      action: "2FA enabled",
      timestamp: "2025-07-20 11:30:00",
      ip: "192.168.1.1",
      status: "success",
      details: "Two-factor authentication activated",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7days");

  const getActionIcon = (action, status) => {
    if (status === "failed") {
      return <X size={16} className="failed" />;
    }
    return <Check size={16} className="success" />;
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.status === filter;
  });

  const downloadLogs = () => {
    // Implement CSV download
    console.log("Downloading logs...");
  };

  return (
    <div className="activity-logs">
      <div className="section-header">
        <h3>Security Activity</h3>
        <p>Recent security-related events on your account</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Activity
          </button>
          <button
            className={`filter-btn ${filter === "success" ? "active" : ""}`}
            onClick={() => setFilter("success")}
          >
            <Check size={14} />
            Successful
          </button>
          <button
            className={`filter-btn ${filter === "failed" ? "active" : ""}`}
            onClick={() => setFilter("failed")}
          >
            <X size={14} />
            Failed
          </button>
        </div>

        <select
          className="date-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="24hours">Last 24 hours</option>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
      </div>

      {/* Logs List */}
      <div className="logs-list">
        {filteredLogs.map((log) => (
          <div key={log.id} className="log-item">
            <div className="log-icon">
              {getActionIcon(log.action, log.status)}
            </div>
            <div className="log-content">
              <div className="log-header">
                <h4 className="log-action">{log.action}</h4>
                <span className={`status-badge ${log.status}`}>
                  {log.status}
                </span>
              </div>
              <p className="log-details">{log.details}</p>
              <div className="log-meta">
                <span>
                  <Calendar size={12} />
                  {log.timestamp}
                </span>
                <span className="desktop-only">
                  <Globe size={12} />
                  IP: {log.ip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Alert */}
      <div className="security-alert">
        <AlertTriangle size={20} />
        <div>
          <p>
            <strong>Notice any suspicious activity?</strong>
          </p>
          <p>
            If you see any unrecognized actions, change your password
            immediately and contact support.
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button className="download-logs-btn" onClick={downloadLogs}>
        <Download size={16} />
        Download Full Activity Log
      </button>

      <style>{`
        /* Filters */
        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          gap: 0.5rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
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

        .date-select {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .date-select:focus {
          outline: none;
          border-color: #667eea;
        }

        /* Logs List */
        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .log-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: all 0.2s;
        }

        .log-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .log-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .log-icon svg.success {
          color: #22c55e;
        }

        .log-icon svg.failed {
          color: #ef4444;
        }

        .log-content {
          flex: 1;
        }

        .log-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .log-action {
          color: white;
          font-weight: 500;
          margin: 0;
          font-size: 0.875rem;
        }

        .status-badge {
          padding: 0.125rem 0.5rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.success {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .status-badge.failed {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .log-details {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.813rem;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .log-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .log-meta span {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .log-meta svg {
          width: 12px;
          height: 12px;
        }

        /* Security Alert */
        .security-alert {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .security-alert svg {
          color: #f59e0b;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .security-alert p {
          color: #f59e0b;
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.5;
        }

        .security-alert p:first-child {
          margin-bottom: 0.25rem;
        }

        /* Download Button */
        .download-logs-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .download-logs-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .desktop-only {
          display: flex;
        }

        @media (max-width: 768px) {
          .filters-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            width: 100%;
            justify-content: space-between;
          }

          .date-select {
            width: 100%;
          }

          .log-meta {
            flex-direction: column;
            gap: 0.25rem;
          }

          .desktop-only {
            display: none !important;
          }

          .log-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
