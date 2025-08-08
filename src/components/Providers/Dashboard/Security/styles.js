// src/components/Providers/Dashboard/Security/styles.js
export const sharedStyles = `
  /* Glass Card Base */
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  /* Section Headers */
  .section-header {
    margin-bottom: 1.5rem;
  }

  .section-header h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .section-header p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }

  /* Form Groups */
  .form-group {
    margin-bottom: 1.5rem;
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
    transition: all 0.3s;
  }

  .form-group input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border-color: #667eea;
  }
`;