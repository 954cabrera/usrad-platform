// src/components/Providers/Dashboard/Documents/UploadModal.jsx
import React, { useState, useRef } from "react";
import { X, Upload, FileText, Shield, AlertCircle } from "lucide-react";
import { documentStyles } from "./shared/styles";

export default function UploadModal({ onClose, onUpload }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ["PSA", "Insurance", "Compliance", "Financial", "Other"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !category) {
      alert("Please select files and a category");
      return;
    }

    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      console.log("Uploading files:", selectedFiles);
      setUploading(false);
      if (onUpload) {
        onUpload(selectedFiles, { category, isEncrypted });
      }
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload Documents</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Drop Zone */}
          <div
            className={`drop-zone ${dragOver ? "drag-over" : ""} ${selectedFiles.length > 0 ? "has-files" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            />

            <Upload size={48} />
            <h4>Drop files here or click to browse</h4>
            <p>PDF, DOC, XLS, PNG, JPG up to 10MB</p>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h4>Selected Files ({selectedFiles.length})</h4>
              <div className="files-list">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <FileText size={20} />
                      <div>
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                      aria-label="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Options */}
          <div className="upload-options">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="encryption-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isEncrypted}
                  onChange={(e) => setIsEncrypted(e.target.checked)}
                />
                <div className="checkbox-text">
                  <span>Encrypt documents</span>
                  <small>Recommended for sensitive information</small>
                </div>
              </label>
              <Shield size={20} className={isEncrypted ? "active" : ""} />
            </div>
          </div>

          {/* Security Notice */}
          <div className="security-notice">
            <AlertCircle size={16} />
            <p>All documents are stored in HIPAA-compliant secure storage</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || !category || uploading}
          >
            {uploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload size={20} />
                Upload {selectedFiles.length}{" "}
                {selectedFiles.length === 1 ? "File" : "Files"}
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
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

        /* Drop Zone */
        .drop-zone {
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(255, 255, 255, 0.02);
        }

        .drop-zone:hover {
          border-color: rgba(102, 126, 234, 0.5);
          background: rgba(102, 126, 234, 0.05);
        }

        .drop-zone.drag-over {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .drop-zone.has-files {
          padding: 2rem 1rem;
        }

        .drop-zone svg {
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 1rem;
        }

        .drop-zone h4 {
          color: white;
          font-size: 1.125rem;
          margin: 0 0 0.5rem 0;
        }

        .drop-zone p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0;
        }

        /* Selected Files */
        .selected-files {
          margin-top: 1.5rem;
        }

        .selected-files h4 {
          color: white;
          font-size: 1rem;
          margin: 0 0 1rem 0;
        }

        .files-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
        }

        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .file-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }

        .file-info svg {
          color: rgba(255, 255, 255, 0.6);
          flex-shrink: 0;
        }

        .file-name {
          color: white;
          font-size: 0.875rem;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
          margin: 0;
        }

        .remove-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        /* Upload Options */
        .upload-options {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .category-select {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .category-select:focus {
          outline: none;
          border-color: #667eea;
        }

        .encryption-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          flex: 1;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .checkbox-text {
          display: flex;
          flex-direction: column;
        }

        .checkbox-text span {
          color: white;
          font-size: 0.875rem;
        }

        .checkbox-text small {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
        }

        .encryption-option svg {
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.2s;
        }

        .encryption-option svg.active {
          color: #22c55e;
        }

        /* Security Notice */
        .security-notice {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 8px;
        }

        .security-notice svg {
          color: #22c55e;
          flex-shrink: 0;
        }

        .security-notice p {
          color: #22c55e;
          font-size: 0.813rem;
          margin: 0;
        }

        /* Modal Footer */
        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cancel-btn,
        .upload-btn {
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

        .upload-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .upload-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        .upload-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .modal-content {
            max-height: calc(100vh - 2rem);
            margin: 1rem;
          }

          .drop-zone {
            padding: 2rem 1rem;
          }

          .drop-zone h4 {
            font-size: 1rem;
          }

          .drop-zone p {
            font-size: 0.813rem;
          }

          .files-list {
            max-height: 150px;
          }

          .modal-footer {
            flex-direction: column;
          }

          .cancel-btn,
          .upload-btn {
            width: 100%;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .modal-header {
            padding: 1rem;
          }

          .modal-body {
            padding: 1rem;
          }

          .drop-zone {
            padding: 1.5rem 0.75rem;
          }

          .drop-zone svg {
            width: 36px;
            height: 36px;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .close-btn:active {
            transform: scale(0.95);
          }

          .upload-btn:active:not(:disabled),
          .cancel-btn:active {
            transform: scale(0.98);
          }

          .file-item:active {
            transform: scale(0.98);
          }
        }

        /* Safe areas */
        @supports (padding: env(safe-area-inset-bottom)) {
          .modal-content {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
}
