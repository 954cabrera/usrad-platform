// src/components/Providers/Dashboard/Documents/shared/styles.js
export const documentStyles = {
  // This is a string that can be inserted into styled-jsx
  glassCard: `
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  `,
  
  // These are JavaScript objects we can use in our components
  categoryColors: {
    PSA: { bg: 'rgba(147, 51, 234, 0.2)', color: '#a855f7' },
    Insurance: { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' },
    Compliance: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    Financial: { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' },
    Other: { bg: 'rgba(156, 163, 175, 0.2)', color: '#9ca3af' }
  },
  
  fileIcons: {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    default: '📎'
  }
};