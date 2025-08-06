// components/Providers/shared/utils/providerHelpers.js
import { STORAGE_KEYS, VALIDATION_RULES } from '../config/providers.config.js';

// ========== Data Formatting Helpers ==========

/**
 * Format provider data for API submission
 * @param {Object} data - Raw form data
 * @returns {Object} Formatted provider data
 */
export const formatProviderData = (data) => {
  return {
    organization: {
      legalName: data.legalName?.trim(),
      dba: data.dba?.trim() || null,
      taxId: data.taxId?.replace(/\D/g, '').replace(/(\d{2})(\d{7})/, '$1-$2'),
      businessType: data.businessType,
      yearEstablished: data.yearEstablished ? parseInt(data.yearEstablished) : null
    },
    address: {
      street: data.corpAddress?.trim(),
      city: data.corpCity?.trim(),
      state: data.corpState,
      zip: data.corpZip?.trim()
    },
    signer: {
      firstName: data.signerFirstName?.trim(),
      lastName: data.signerLastName?.trim(),
      fullName: `${data.signerFirstName?.trim()} ${data.signerLastName?.trim()}`,
      title: data.signerTitle?.trim(),
      email: data.signerEmail?.toLowerCase().trim(),
      phone: formatPhoneNumber(data.signerPhone)
    },
    metadata: {
      role: data.role,
      createdAt: new Date().toISOString(),
      source: 'web_portal'
    }
  };
};

/**
 * Format phone number to (XXX) XXX-XXXX format
 * @param {string} phone - Raw phone input
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

/**
 * Format tax ID to XX-XXXXXXX format
 * @param {string} taxId - Raw tax ID input
 * @returns {string} Formatted tax ID
 */
export const formatTaxId = (taxId) => {
  const cleaned = taxId.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 9)}`;
  }
  return cleaned;
};

// ========== Validation Helpers ==========

/**
 * Validate provider form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with errors
 */
export const validateProviderForm = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = [
    'role', 'legalName', 'taxId', 'businessType',
    'corpAddress', 'corpCity', 'corpState', 'corpZip',
    'signerFirstName', 'signerLastName', 'signerTitle',
    'signerEmail', 'signerPhone'
  ];

  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = 'This field is required';
    }
  });

  // Email validation
  if (formData.signerEmail && !VALIDATION_RULES.EMAIL_REGEX.test(formData.signerEmail)) {
    errors.signerEmail = 'Please enter a valid email address';
  }

  // Tax ID validation
  if (formData.taxId && !VALIDATION_RULES.TAX_ID_REGEX.test(formatTaxId(formData.taxId))) {
    errors.taxId = 'Tax ID must be in format XX-XXXXXXX';
  }

  // ZIP code validation
  if (formData.corpZip && !VALIDATION_RULES.ZIP_REGEX.test(formData.corpZip)) {
    errors.corpZip = 'ZIP code must be 5 digits';
  }

  // Phone validation
  const formattedPhone = formatPhoneNumber(formData.signerPhone);
  if (formData.signerPhone && !VALIDATION_RULES.PHONE_REGEX.test(formattedPhone)) {
    errors.signerPhone = 'Phone must be 10 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ========== Storage Helpers ==========

/**
 * Save provider data to localStorage
 * @param {string} key - Storage key from STORAGE_KEYS
 * @param {Object} data - Data to save
 */
export const saveProviderData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving provider data:', error);
    return false;
  }
};

/**
 * Get provider data from localStorage
 * @param {string} key - Storage key from STORAGE_KEYS
 * @returns {Object|null} Retrieved data or null
 */
export const getProviderData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving provider data:', error);
    return null;
  }
};

/**
 * Clear all provider data from localStorage
 */
export const clearProviderData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// ========== Progress Helpers ==========

/**
 * Get current onboarding step
 * @returns {string} Current step ID
 */
export const getCurrentStep = () => {
  return localStorage.getItem(STORAGE_KEYS.ONBOARDING_STEP) || 'organization';
};

/**
 * Save current onboarding step
 * @param {string} step - Step ID
 */
export const saveCurrentStep = (step) => {
  localStorage.setItem(STORAGE_KEYS.ONBOARDING_STEP, step);
};

/**
 * Check if a step is completed
 * @param {string} step - Step ID to check
 * @returns {boolean} Whether the step is completed
 */
export const isStepCompleted = (step) => {
  switch (step) {
    case 'organization':
      return !!getProviderData(STORAGE_KEYS.PROVIDER_ORGANIZATION);
    case 'facilities':
      return !!getProviderData(STORAGE_KEYS.PROVIDER_FACILITIES);
    case 'pricing':
      return !!getProviderData(STORAGE_KEYS.PROVIDER_PRICING);
    case 'psa':
      // Check if PSA is signed (you might have a different logic)
      const org = getProviderData(STORAGE_KEYS.PROVIDER_ORGANIZATION);
      return org?.psaSigned || false;
    default:
      return false;
  }
};

// ========== Navigation Helpers ==========

/**
 * Get next step in onboarding
 * @param {string} currentStep - Current step ID
 * @returns {string} Next step route
 */
export const getNextStepRoute = (currentStep) => {
  const steps = ['organization', 'facilities', 'pricing', 'psa'];
  const currentIndex = steps.indexOf(currentStep);
  
  if (currentIndex < steps.length - 1) {
    const nextStep = steps[currentIndex + 1];
    return `/providers/onboarding/${nextStep === 'organization' ? 'portal' : nextStep}`;
  }
  
  return '/providers/dashboard';
};

// ========== Display Helpers ==========

/**
 * Get display name for provider
 * @returns {string} Provider display name
 */
export const getProviderDisplayName = () => {
  const org = getProviderData(STORAGE_KEYS.PROVIDER_ORGANIZATION);
  return org?.dba || org?.legalName || 'Provider';
};

/**
 * Get provider initials for avatar
 * @returns {string} Two-letter initials
 */
export const getProviderInitials = () => {
  const name = getProviderDisplayName();
  const words = name.split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};