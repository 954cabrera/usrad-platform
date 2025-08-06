// src/scripts/providers/portal/portal.config.js - Configuration for portal page

export const PORTAL_CONFIG = {
  // Routes
  ROUTES: {
    NEXT_STEP: '/providers/onboarding/facilities',
    DASHBOARD: '/providers/dashboard',
    LOGIN: '/providers/login'
  },

  // Form field names
  FORM_FIELDS: {
    ROLE: 'role',
    LEGAL_NAME: 'legalName',
    DBA: 'dba',
    TAX_ID: 'taxId',
    BUSINESS_TYPE: 'businessType',
    YEAR_ESTABLISHED: 'yearEstablished',
    CORP_ADDRESS: 'corpAddress',
    CORP_CITY: 'corpCity',
    CORP_STATE: 'corpState',
    CORP_ZIP: 'corpZip',
    SIGNER_FIRST_NAME: 'signerFirstName',
    SIGNER_LAST_NAME: 'signerLastName',
    SIGNER_TITLE: 'signerTitle',
    SIGNER_EMAIL: 'signerEmail',
    SIGNER_PHONE: 'signerPhone'
  },

  // Role options
  ROLES: {
    SINGLE_ADMIN: 'single-admin',
    MULTI_ADMIN: 'multi-admin',
    EXECUTIVE: 'executive'
  },

  // Business types
  BUSINESS_TYPES: [
    { value: 'llc', label: 'LLC' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'sole-proprietor', label: 'Sole Proprietorship' },
    { value: 'non-profit', label: 'Non-Profit' },
    { value: 'other', label: 'Other' }
  ],

  // Validation messages
  VALIDATION_MESSAGES: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_TAX_ID: 'Tax ID must be in format XX-XXXXXXX',
    INVALID_ZIP: 'ZIP code must be 5 digits'
  },

  // Default values
  DEFAULTS: {
    STATE: 'FL',
    BUSINESS_TYPE: 'llc'
  }
};