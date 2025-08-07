// src/scripts/providers/psa/psa.config.js
export const PSA_CONFIG = {
  // API Configuration
  API_ENDPOINT: '/api/docuseal/create-submission',
  TEMPLATE_ID: 1155842,
  DOCUSEAL_SCRIPT_URL: 'https://cdn.docuseal.com/js/form.js',
  
  // Storage Keys
  STORAGE_KEYS: {
    ORGANIZATION: 'provider_organization',
    CENTERS: 'provider_centers',
    PRICING: 'selected_rate_strategy',
    PSA_SIGNED: 'psa_signed',
    PSA_SIGNED_DATE: 'psa_signed_date'
  },
  
  // Redirect Routes
  ROUTES: {
    SUCCESS: '/providers/onboarding/success',
    ERROR: '/providers/onboarding/error'
  },
  
  // UI Configuration
  CONFETTI: {
    PARTICLE_COUNT: 200,
    DURATION: 6000,
    COLORS: [
      '#003087', // USRad Navy
      '#059669', // Success Green
      '#3b82f6', // Blue
      '#f59e0b', // Gold
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#10b981', // Emerald
    ]
  },
  
  // Timing Configuration
  TIMINGS: {
    HELPER_BUTTON_DELAY: 15000,
    COMPLETION_POLL_INTERVAL: 3000,
    REDIRECT_DELAY: 8000,
    OVERLAY_DISPLAY_DURATION: 6000
  },
  
  // Step Configuration
  PSA_STEPS: [
    { id: 'floating-step-1', text: 'Step 1: Review Agreement' },
    { id: 'floating-step-2', text: 'Step 2: Scroll to Bottom' },
    { id: 'floating-step-3', text: 'Step 3: Click "Sign Now"' },
    { id: 'floating-step-4', text: 'Step 4: Complete Signing' }
  ]
};