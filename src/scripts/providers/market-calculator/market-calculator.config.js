// src/scripts/providers/market-calculator/market-calculator.config.js

export const MARKET_CONFIG = {
  // Routes
  ROUTES: {
    NEXT_STEP: '/providers/onboarding/confirmation',
    PRICING_API: '/api/pricing/calculate-db'
  },

  // States and Counties
  STATES: ['FL', 'GA', 'TX', 'CA', 'NY'],
  
  COUNTY_DATA: {
    FL: [
      { value: "Miami-Dade", label: "Miami-Dade County" },
      { value: "Broward", label: "Broward County" },
      { value: "Palm Beach", label: "Palm Beach County" },
      { value: "Lee", label: "Lee County" },
      { value: "Collier", label: "Collier County" },
      { value: "Other", label: "All Other Florida Counties" }
    ],
    GA: [
      { value: "Fulton", label: "Fulton County (Atlanta)" },
      { value: "DeKalb", label: "DeKalb County" },
      { value: "Gwinnett", label: "Gwinnett County" },
      { value: "Cobb", label: "Cobb County" },
      { value: "Other", label: "All Other Georgia Counties" }
    ],
    TX: [
      { value: "Harris", label: "Harris County (Houston)" },
      { value: "Dallas", label: "Dallas County" },
      { value: "Travis", label: "Travis County (Austin)" },
      { value: "Other", label: "All Other Texas Counties" }
    ],
    CA: [
      { value: "Los Angeles", label: "Los Angeles County" },
      { value: "San Diego", label: "San Diego County" },
      { value: "Orange", label: "Orange County" },
      { value: "Other", label: "All Other California Counties" }
    ],
    NY: [
      { value: "New York", label: "New York County (Manhattan)" },
      { value: "Kings", label: "Kings County (Brooklyn)" },
      { value: "Queens", label: "Queens County" },
      { value: "Other", label: "All Other New York Counties" }
    ]
  },

  // Popular procedures
  PROCEDURES: [
    { cpt: "72148", name: "MRI Lumbar Spine" },
    { cpt: "72158", name: "MRI Lumbar + Contrast" },
    { cpt: "70551", name: "MRI Brain" },
    { cpt: "73721", name: "MRI Knee" }
  ],

  // Rate slider configuration
  RATE_SLIDER: {
    MIN: 90,
    MAX: 150,
    DEFAULT: 100,
    VOLUME_THRESHOLDS: {
      HIGH: { max: 100, width: 90, label: "Expected Volume: High", weeklyVolume: 17.5, range: "15-20/week" },
      GOOD: { max: 110, width: 70, label: "Expected Volume: Good", weeklyVolume: 10, range: "8-12/week" },
      MODERATE: { max: 120, width: 50, label: "Expected Volume: Moderate", weeklyVolume: 5, range: "4-6/week" },
      LOW: { max: 150, width: 30, label: "Expected Volume: Low", weeklyVolume: 2.5, range: "2-3/week" }
    }
  },

  // UI Text
  UI_TEXT: {
    LOADING: "Calculating rates for your area...",
    ERROR: "Error loading rates. Please try again.",
    NO_LOCATION: "Please select both state and county"
  },

  // Animation durations
  ANIMATIONS: {
    SLIDER_TRANSITION: 300,
    FADE_TRANSITION: 200
  }
};