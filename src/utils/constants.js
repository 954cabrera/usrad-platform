// ===========================================
// src/utils/constants.js
// Configuration and constants for the application
// ===========================================

class Constants {
    // ===========================================
    // API Configuration
    // ===========================================
  
    static API = {
      TIMEOUT: 30000,
      RETRY_ATTEMPTS: 3,
      RETRY_DELAY: 1000,
      ENDPOINTS: {
        SEARCH_PROVIDERS: '/api/centers/search-with-pricing',
        PROVIDER_PRICING: '/api/centers/{facilityId}/pricing',
        REVENUE_ANALYSIS: '/api/provider/revenue-analysis',
        CREATE_BOOKING: '/api/bookings/create',
        UPDATE_PRICING: '/api/slots/update-pricing',
        POPULATE_MEDICARE: '/api/admin/populate-medicare-data'
      }
    };
  
    // ===========================================
    // Cache Configuration
    // ===========================================
  
    static CACHE = {
      SEARCH_RESULTS_TTL: 5 * 60 * 1000, // 5 minutes
      PROVIDER_DETAILS_TTL: 15 * 60 * 1000, // 15 minutes
      PRICING_DATA_TTL: 10 * 60 * 1000, // 10 minutes
      MAX_SIZE: 100,
      CACHE_TYPES: {
        SEARCH: 'search',
        PROVIDER: 'provider',
        PRICING: 'pricing',
        REVENUE: 'revenue'
      }
    };
  
    // ===========================================
    // Search Configuration
    // ===========================================
  
    static SEARCH = {
      DEFAULT_PAGE_SIZE: 20,
      MAX_PAGE_SIZE: 50,
      DEBOUNCE_DELAY: 300,
      DEFAULT_STATE: 'FL',
      DEFAULT_PROCEDURE: '70551', // MRI Brain without contrast
      MAX_DISTANCE: 50, // miles
      SORT_OPTIONS: {
        DISTANCE: 'distance',
        PRICE: 'price',
        SAVINGS: 'savings',
        NAME: 'name',
        AVAILABILITY: 'availability'
      }
    };
  
    // ===========================================
    // Procedure Codes and Names
    // ===========================================
  
    static PROCEDURES = {
      '70551': 'MRI Brain without contrast',
      '70552': 'MRI Brain with contrast',
      '72148': 'MRI Lumbar Spine without contrast',
      '72149': 'MRI Lumbar Spine with contrast',
      '74177': 'CT Abdomen and Pelvis with contrast',
      '76700': 'Ultrasound Abdomen',
      '71046': 'Chest X-Ray'
    };
  
    // ===========================================
    // State and Geographic Data
    // ===========================================
  
    static STATES = {
      'FL': 'Florida',
      'GA': 'Georgia',
      'TX': 'Texas',
      'CA': 'California',
      'NY': 'New York'
      // Add more states as needed
    };
  
    static MEDICARE_LOCALITIES = {
      FLORIDA: {
        'MIAMI': { code: '03030', multiplier: 1.073 },
        'FORT_LAUDERDALE': { code: '03040', multiplier: 1.050 },
        'REST_OF_FLORIDA': { code: '03890', multiplier: 1.000 }
      },
      GEORGIA: {
        'ATLANTA': { code: '01510', multiplier: 1.025 },
        'REST_OF_GEORGIA': { code: '01890', multiplier: 1.000 }
      }
    };
  
    // ===========================================
    // UI Configuration
    // ===========================================
  
    static UI = {
      ANIMATION_DURATION: 300,
      TOAST_DURATION: 5000,
      LOADING_DELAY: 100,
      MOBILE_BREAKPOINT: 768,
      MODAL_Z_INDEX: 50,
      TOAST_Z_INDEX: 60
    };
  
    // ===========================================
    // Map Configuration
    // ===========================================
  
    static MAP = {
      DEFAULT_CENTER: { lat: 26.1224, lng: -80.1373 }, // Fort Lauderdale
      DEFAULT_ZOOM: 10,
      CLUSTER_THRESHOLD: 10,
      MARKER_ANIMATION_DELAY: 100,
      INFO_WINDOW_MAX_WIDTH: 300
    };
  
    // ===========================================
    // Business Logic
    // ===========================================
  
    static BUSINESS = {
      USRAD_MARKUP: 75, // USRad service fee
      MIN_SAVINGS_PERCENTAGE: 50,
      HOSPITAL_MARKUP_MULTIPLIER: 3.5, // Estimate hospital pricing
      AVERAGE_APPOINTMENT_DURATION: 45, // minutes
      BOOKING_CONFIRMATION_TIMEOUT: 24, // hours
      REPORT_DELIVERY_TIME: '24-48 hours'
    };
  
    // ===========================================
    // Validation Rules
    // ===========================================
  
    static VALIDATION = {
      ZIP_CODE: {
        pattern: /^\d{5}(-\d{4})?$/,
        message: 'Please enter a valid ZIP code'
      },
      PHONE: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/,
        message: 'Please enter a valid phone number'
      },
      EMAIL: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      NAME: {
        minLength: 2,
        maxLength: 50,
        message: 'Name must be between 2 and 50 characters'
      }
    };
  
    // ===========================================
    // Error Messages
    // ===========================================
  
    static ERRORS = {
      NETWORK: 'Network connection error. Please check your internet connection.',
      TIMEOUT: 'Request timed out. Please try again.',
      SEARCH_FAILED: 'Search failed. Please try again with different criteria.',
      BOOKING_FAILED: 'Booking failed. Please try again.',
      PAYMENT_FAILED: 'Payment processing failed. Please try again.',
      INVALID_DATA: 'Invalid data provided. Please check your input.',
      PROVIDER_NOT_FOUND: 'Provider not found. Please try a different search.',
      NO_RESULTS: 'No providers found matching your criteria. Try expanding your search area.'
    };
  
    // ===========================================
    // Feature Flags
    // ===========================================
  
    static FEATURES = {
      ENABLE_CACHING: true,
      ENABLE_ANALYTICS: true,
      ENABLE_MAP_CLUSTERING: true,
      ENABLE_LAZY_LOADING: true,
      ENABLE_TOAST_NOTIFICATIONS: true,
      ENABLE_KEYBOARD_SHORTCUTS: true,
      ENABLE_ANIMATION: true,
      ENABLE_PWA: false // Progressive Web App features
    };
  
    // ===========================================
    // Analytics Events
    // ===========================================
  
    static ANALYTICS = {
      EVENTS: {
        SEARCH_PERFORMED: 'search_performed',
        PROVIDER_SELECTED: 'provider_selected',
        BOOKING_STARTED: 'booking_started',
        BOOKING_COMPLETED: 'booking_completed',
        MAP_MARKER_CLICKED: 'map_marker_clicked',
        FILTER_APPLIED: 'filter_applied',
        SORT_CHANGED: 'sort_changed',
        PAGE_CHANGED: 'page_changed'
      }
    };
  
    // ===========================================
    // Helper Methods
    // ===========================================
  
    static getProcedureName(code) {
      return this.PROCEDURES[code] || 'Unknown Procedure';
    }
  
    static getStateName(code) {
      return this.STATES[code] || code;
    }
  
    static getMedicareLocality(state, city) {
      const stateLocalities = this.MEDICARE_LOCALITIES[state?.toUpperCase()];
      if (!stateLocalities) return null;
      
      const cityKey = city?.toUpperCase().replace(/\s+/g, '_');
      return stateLocalities[cityKey] || stateLocalities.REST_OF_FLORIDA || stateLocalities.REST_OF_GEORGIA;
    }
  
    static isFeatureEnabled(feature) {
      return this.FEATURES[feature] || false;
    }
  }
  
  // ===========================================
  // Export all utilities
  // ===========================================
  
  export { APIClient, CacheManager, FormattingUtils, Constants };
  
  // Also make available globally for Astro components
  if (typeof window !== 'undefined') {
    window.APIClient = APIClient;
    window.CacheManager = CacheManager;
    window.FormattingUtils = FormattingUtils;
    window.Constants = Constants;
    
    // Create global instances
    window.apiClient = new APIClient();
    window.cacheManager = new CacheManager();
  }