// src/scripts/providers/shared/storage.js - LocalStorage helper utilities

export class StorageHelpers {
  // Storage keys enum
  static KEYS = {
    PROVIDER_ORGANIZATION: 'provider_organization',
    PROVIDER_SIGNUP_DATA: 'provider_signup_data',
    PROVIDER_CENTERS: 'provider_centers',
    PROVIDER_PRICING: 'provider_pricing',
    FACILITIES_COMPLETED: 'facilities_completed',
    ONBOARDING_STEP: 'provider_onboarding_step'
  };

  // Save data to localStorage with error handling
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Load data from localStorage with error handling
  static load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  }

  // Remove item from localStorage
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }

  // Clear all provider-related data
  static clearProviderData() {
    Object.values(this.KEYS).forEach(key => {
      this.remove(key);
    });
  }

  // Check if key exists
  static exists(key) {
    return localStorage.getItem(key) !== null;
  }

  // Get all provider data as an object
  static getAllProviderData() {
    const data = {};
    Object.entries(this.KEYS).forEach(([name, key]) => {
      data[name] = this.load(key);
    });
    return data;
  }

  // Merge data with existing stored data
  static merge(key, newData) {
    const existingData = this.load(key, {});
    const mergedData = { ...existingData, ...newData };
    return this.save(key, mergedData);
  }

  // Get organization data helper
  static getOrganizationData() {
    return this.load(this.KEYS.PROVIDER_ORGANIZATION, {});
  }

  // Get centers data helper
  static getCentersData() {
    return this.load(this.KEYS.PROVIDER_CENTERS, []);
  }

  // Save completion status for a step
  static saveStepCompletion(step) {
    const key = `${step}_completed`;
    return this.save(key, true);
  }

  // Check if a step is completed
  static isStepCompleted(step) {
    const key = `${step}_completed`;
    return this.load(key, false);
  }
}