// src/components/Providers/Dashboard/Centers/shared/styles.js
export const centerStyles = {
  // Glass card style for center cards
  glassCard: `
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  `,
  
  // Equipment type icons
  equipmentIcons: {
    MRI: '🧲',
    CT: '🔄',
    'X-Ray': '📡',
    Ultrasound: '🔊',
    PET: '⚛️',
    Mammography: '🎯',
    DEXA: '💀',
    default: '🏥'
  },
  
  // Status colors
  statusColors: {
    active: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', label: 'Active' },
    pending: { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', label: 'Pending' },
    inactive: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', label: 'Inactive' },
    maintenance: { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', label: 'Maintenance' }
  },
  
  // Feature icons
  featureIcons: {
    wifi: { icon: 'Wifi', label: 'WiFi Available' },
    parking: { icon: 'Car', label: 'Free Parking' },
    wheelchair: { icon: 'Accessibility', label: 'Wheelchair Accessible' },
    emergency: { icon: 'AlertCircle', label: '24/7 Emergency' },
    cafe: { icon: 'Coffee', label: 'Café' }
  },
  
  // Mobile-specific styles
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
  
  // Touch-friendly button
  touchButton: `
    @media (hover: none) {
      &:active {
        transform: scale(0.95);
      }
    }
  `
};