// src/components/Providers/Dashboard/Security/ApiKeysManager.jsx
import React, { useState } from "react";
import { Key, Copy, Trash2, Check, Info, X } from "lucide-react";

export default function ApiKeysManager() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Production API",
      key: "sk_live_****************************1234",
      created: "2025-07-15",
      lastUsed: "2025-08-08",
    },
    {
      id: 2,
      name: "Test API",
      key: "sk_test_****************************5678",
      created: "2025-08-01",
      lastUsed: "2025-08-07",
    },
  ]);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const copyApiKey = (key, id) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="api-keys-manager">
      <div className="section-header">
        <h3>API Keys</h3>
        <p>Manage API keys for integrations</p>
      </div>

      <button
        className="create-key-btn"
        onClick={() => setShowCreateModal(true)}
      >
        <Key size={20} />
        Create New API Key
      </button>

      <div className="api-keys-list">
        {apiKeys.map((key) => (
          <div key={key.id} className="api-key-card glass-card">
            <div className="key-header">
              <h4>{key.name}</h4>
              <div className="key-actions">
                <button
                  className="icon-btn"
                  onClick={() => copyApiKey(key.key, key.id)}
                  aria-label="Copy key"
                >
                  {copiedKey === key.id ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <button className="icon-btn danger" aria-label="Delete key">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <code className="key-value">{key.key}</code>
            <div className="key-meta">
              <span>Created: {key.created}</span>
              <span>Last used: {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="api-info">
        <Info size={16} />
        <p>
          Keep your API keys secure. Never share them or commit them to version
          control.
        </p>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create API Key</h3>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Key Name</label>
                <input type="text" placeholder="e.g., Production API" />
              </div>
              <div className="form-group">
                <label>Permissions</label>
                <div className="checkbox-group">
                  <label className="checkbox">
                    <input type="checkbox" defaultChecked />
                    <span>Read access</span>
                  </label>
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span>Write access</span>
                  </label>
                </div>
              </div>
              <button className="create-btn">Create Key</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Component-specific styles */
        .create-key-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .api-keys-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1rem;
        }

        .key-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .key-header h4 {
          color: white;
          font-size: 1rem;
          margin: 0;
        }

        .key-actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .icon-btn.danger {
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .key-value {
          display: block;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-family: monospace;
          font-size: 0.813rem;
          margin-bottom: 0.75rem;
          overflow-x: auto;
        }

        .key-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .api-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 8px;
          color: #f59e0b;
        }

        .api-info p {
          font-size: 0.813rem;
          margin: 0;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: #1e293b;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
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
          padding: 0.25rem;
        }

        .modal-body {
          padding: 1.5rem;
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

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .create-btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .key-meta {
            flex-direction: column;
            gap: 0.25rem;
          }

          .key-value {
            font-size: 0.75rem;
          }
        }

        // Add to ApiKeysManager.jsx
        @media (max-width: 768px) {
          .api-key-card {
            position: relative;
            padding-bottom: 3rem !important;
          }

          .key-actions {
            position: absolute;
            bottom: 0.75rem;
            right: 0.75rem;
          }

          .key-value {
            font-size: 0.625rem;
            padding: 0.375rem;
          }

          .key-meta {
            flex-direction: column;
            gap: 0.25rem;
            font-size: 0.625rem;
          }

          .api-info {
            flex-direction: column;
            text-align: center;
          }

          .api-info svg {
            margin: 0 auto;
          }

          /* Modal mobile optimizations */
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }

          .checkbox-group {
            background: rgba(255, 255, 255, 0.03);
            padding: 0.75rem;
            border-radius: 8px;
          }
        }

        /* Touch interactions */
        @media (hover: none) {
          .icon-btn:active {
            transform: scale(0.9);
          }

          .create-key-btn:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
