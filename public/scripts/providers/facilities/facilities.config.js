// src/scripts/providers/facilities/facilities.config.js - Configuration for facilities page

export const FACILITIES_CONFIG = {
  // Routes
  ROUTES: {
    NEXT_STEP: '/providers/onboarding/market-calculator',
    PORTAL: '/providers/portal',
    DASHBOARD: '/providers/dashboard'
  },

  // Equipment configuration
  EQUIPMENT: {
    TYPES: [
      { value: "MRI", name: "MRI", icon: "/images/icons/mri-machine.svg" },
      { value: "CT", name: "CT Scan", icon: "/images/icons/ct-scan-1.svg" },
      { value: "X-Ray", name: "X-Ray", icon: "/images/icons/x-ray.svg" },
      { value: "Ultrasound", name: "Ultrasound", icon: "/images/icons/ultrasound (1).svg" },
      { value: "PET", name: "PET Scan", icon: "/images/icons/pet-scan.svg" },
      { value: "Mammography", name: "Mammography", icon: "/images/icons/screening.svg" }
    ],
    MANUFACTURERS: {
      COMMON: ['GE', 'Siemens', 'Philips', 'Canon'],
      MRI: ['GE', 'Siemens', 'Philips', 'Canon', 'Hitachi'],
      CT: ['GE', 'Siemens', 'Philips', 'Canon'],
      XRAY: ['GE', 'Siemens', 'Philips', 'Carestream', 'Fujifilm']
    }
  },

  // Targeted states for facilities
  TARGETED_STATES: ["FL", "GA", "TX", "CA", "NY", "IL", "PA", "OH", "NC", "MI"],

  // Form defaults
  DEFAULTS: {
    IS_PRIMARY: true,
    EQUIPMENT_DETAILS_VISIBLE: false
  },

  // Validation messages
  VALIDATION_MESSAGES: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_ZIP: 'Please enter a 5-digit ZIP code',
    MIN_CENTERS: 'Please add at least one imaging center before continuing',
    CONFIRM_DELETE: 'Are you sure you want to remove this center?'
  },

  // UI Text
  UI_TEXT: {
    ADD_FIRST_CENTER: 'Add Your First Center',
    ADD_ANOTHER_CENTER: 'Add Another Center',
    EDIT_CENTER: 'Edit Center',
    SAVE_CHANGES: 'Save Changes',
    ADD_CENTER_BUTTON: 'Add Center',
    CONTINUE_BUTTON: 'Continue to Pricing Strategy →'
  },

  // Stats configuration
  STATS: {
    REVENUE_DELIVERED: '$180M+'
  }
};