// src/components/Providers/Dashboard/shared/styles.js
export const dashboardStyles = {
  // Primary gradient used across all dashboard components
  primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  
  // Common glass effect
  glass: `
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    transition: all 0.3s ease;
  `,
  
  // Common section header style
  sectionHeader: `
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
    
    @media (max-width: 768px) {
      .section-title {
        font-size: 1.5rem;
      }
      
      .section-subtitle {
        font-size: 1rem;
      }
    }
  `,
  
  // Common mobile FAB style
  floatingActionButton: `
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
    display: flex;
    align-items: center;
    justify-content: center;
    
    @supports (padding: env(safe-area-inset-bottom)) {
      bottom: calc(80px + env(safe-area-inset-bottom));
    }
    
    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }
  `,
  
  // Common button styles
  primaryButton: `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    @media (hover: none) {
      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }
  `,
  
  secondaryButton: `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
    
    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }
  `,
  
  // Form input styles
  formInput: `
    width: 100%;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 16px; /* Prevents zoom on iOS */
    transition: all 0.3s;
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.08);
      border-color: #667eea;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  `,
  
  // Common modal styles
  modal: {
    overlay: `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    
    content: `
      background: #1e293b;
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease;
      
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
      
      @media (max-width: 768px) {
        max-height: calc(100vh - 2rem);
        margin: 1rem;
      }
      
      @supports (padding: env(safe-area-inset-bottom)) {
        padding-bottom: env(safe-area-inset-bottom);
      }
    `
  },
  
  // Responsive utilities
  utilities: {
    mobileOnly: `
      display: none;
      
      @media (max-width: 768px) {
        display: flex;
      }
    `,
    
    desktopOnly: `
      display: flex;
      
      @media (max-width: 768px) {
        display: none;
      }
    `,
    
    touchActive: `
      @media (hover: none) {
        &:active {
          transform: scale(0.98);
        }
      }
    `,
    
    safeArea: `
      @supports (padding: env(safe-area-inset-bottom)) {
        padding-bottom: env(safe-area-inset-bottom);
      }
    `
  }
};

// Common breakpoints used across dashboard
export const breakpoints = {
  mobile: 768,
  smallMobile: 400,
  tablet: 1024,
  desktop: 1440
};

// Common animations
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  
  slideUp: `
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
  `,
  
  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  scaleIn: `
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `
};

// Common color palette
export const colors = {
  primary: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    solid: '#667eea',
    light: 'rgba(102, 126, 234, 0.2)',
    border: 'rgba(102, 126, 234, 0.3)'
  },
  success: {
    solid: '#22c55e',
    light: 'rgba(34, 197, 94, 0.2)',
    border: 'rgba(34, 197, 94, 0.3)'
  },
  warning: {
    solid: '#f59e0b',
    light: 'rgba(245, 158, 11, 0.2)',
    border: 'rgba(245, 158, 11, 0.3)'
  },
  danger: {
    solid: '#ef4444',
    light: 'rgba(239, 68, 68, 0.2)',
    border: 'rgba(239, 68, 68, 0.3)'
  },
  info: {
    solid: '#3b82f6',
    light: 'rgba(59, 130, 246, 0.2)',
    border: 'rgba(59, 130, 246, 0.3)'
  }
};

// Common z-index values
export const zIndex = {
  dropdown: 10,
  modal: 1000,
  toast: 2000,
  fab: 100
};

// Helper function to apply multiple styles
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).join('\n');
};