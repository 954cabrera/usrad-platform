// src/scripts/providers/confirmation/confirmation.config.js
export const CONFIRMATION_CONFIG = {
  routes: {
    organization: '/providers/join',
    centers: '/providers/onboarding/facilities',
    pricing: '/providers/onboarding/market-calculator',
    psaSigning: '/providers/onboarding/psa-signing'
  },
  
  storageKeys: {
    signupData: 'provider_signup_data',
    centers: 'provider_centers',
    rateStrategy: 'selected_rate_strategy',
    confirmationStatus: 'psa_confirmation_completed'
  },
  
  pricingTiers: [
    { max: 100, volume: 'High (15-20 patients/week)', revenue: '$351,000' },
    { max: 110, volume: 'Good (8-12 patients/week)', revenue: '$280,000' },
    { max: 120, volume: 'Moderate (4-6 patients/week)', revenue: '$156,000' },
    { max: Infinity, volume: 'Low (2-3 patients/week)', revenue: '$87,750' }
  ],
  
  elements: {
    // Organization
    orgName: 'org-name',
    orgContact: 'org-contact',
    orgEmail: 'org-email',
    orgPhone: 'org-phone',
    
    // Centers
    totalCenters: 'total-centers',
    totalStates: 'total-states',
    totalEquipment: 'total-equipment',
    centersList: 'centers-list',
    exhibitCount: 'exhibit-count',
    
    // Pricing
    rateValue: 'rate-value',
    expectedVolume: 'expected-volume',
    projectedRevenue: 'projected-revenue',
    
    // Modal
    exhibitModal: 'exhibit-modal',
    exhibitCentersList: 'exhibit-centers-list',
    
    // Buttons
    continueBtn: 'continue-btn'
  }
};