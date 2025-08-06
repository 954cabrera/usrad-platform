// components/Providers/shared/config/providers.config.js

// Provider Routes Configuration
export const PROVIDER_ROUTES = {
  // Main sections
  PORTAL: '/providers/portal',
  DASHBOARD: '/providers/dashboard',
  ONBOARDING: '/providers/onboarding',
  
  // Onboarding sub-routes
  ONBOARDING_FACILITIES: '/providers/onboarding/facilities',
  ONBOARDING_PRICING: '/providers/onboarding/pricing',
  ONBOARDING_PSA: '/providers/onboarding/psa-signing',
  
  // Dashboard sub-routes
  DASHBOARD_ANALYTICS: '/providers/dashboard/analytics',
  DASHBOARD_ORDERS: '/providers/dashboard/orders',
  DASHBOARD_SETTINGS: '/providers/dashboard/settings',
  DASHBOARD_PROFILE: '/providers/dashboard/profile',
  
  // API endpoints
  API: {
    CREATE_SUBMISSION: '/api/docuseal/create-submission',
    UPDATE_PROFILE: '/api/providers/update-profile',
    GET_STATS: '/api/providers/stats'
  }
};

// Provider Status Constants
export const PROVIDER_STATUS = {
  PENDING_SETUP: 'pending_setup',
  PENDING_VERIFICATION: 'pending_verification',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive'
};

// Form Steps Configuration
export const ONBOARDING_STEPS = {
  ORGANIZATION: {
    id: 'organization',
    title: 'Organization Profile',
    description: 'Tell us about your organization',
    route: PROVIDER_ROUTES.PORTAL,
    icon: '/images/icons/building.svg'
  },
  FACILITIES: {
    id: 'facilities',
    title: 'Add Centers',
    description: 'Register your imaging centers',
    route: PROVIDER_ROUTES.ONBOARDING_FACILITIES,
    icon: '/images/icons/map-1.svg'
  },
  PRICING: {
    id: 'pricing',
    title: 'Set Pricing',
    description: 'Choose your pricing strategy',
    route: PROVIDER_ROUTES.ONBOARDING_PRICING,
    icon: '/images/icons/volatility.svg'
  },
  PSA: {
    id: 'psa',
    title: 'Sign Agreement',
    description: 'Review and sign PSA',
    route: PROVIDER_ROUTES.ONBOARDING_PSA,
    icon: '/images/icons/contract-1.svg'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  PROVIDER_ORGANIZATION: 'provider_organization',
  PROVIDER_SIGNUP_DATA: 'provider_signup_data',
  PROVIDER_FACILITIES: 'provider_facilities',
  PROVIDER_PRICING: 'provider_pricing',
  ONBOARDING_STEP: 'provider_onboarding_step'
};

// DocuSeal Configuration
export const DOCUSEAL_CONFIG = {
  SERVER_URL: 'https://docuseal.nimshuda.com',
  TEMPLATE_ID: 1,
  ROLE_NAME: 'Provider'
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\(\d{3}\) \d{3}-\d{4}$/,
  TAX_ID_REGEX: /^\d{2}-\d{7}$/,
  ZIP_REGEX: /^\d{5}$/
};

// Default Values
export const DEFAULT_VALUES = {
  BUSINESS_TYPE: 'llc',
  STATE: 'FL',
  ROLE: 'single-admin'
};