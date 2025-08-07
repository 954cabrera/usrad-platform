// src/scripts/providers/psa/modules/psaStateManager.js
import { PSA_CONFIG } from '../psa.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class PSAStateManager {
  constructor() {
    this.state = {
      currentStep: 1,
      psaStep: 1,
      completed: false,
      embedSrc: null,
      psaData: null
    };
  }

  // Load onboarding data from localStorage
  loadOnboardingData() {
    try {
      console.log('Loading onboarding data from localStorage...');

      const orgData = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.ORGANIZATION) || {};
      const centers = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.CENTERS) || [];
      const pricing = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.PRICING) || {};

      const primaryCenter = centers.find(c => c.isPrimary) || centers[0] || {};

      const data = {
        organization: orgData,
        centers: centers,
        primaryCenter: primaryCenter,
        pricing: pricing,
        signer: orgData.signer || {}
      };

      console.log('📊 Loaded onboarding data:', data);
      this.state.psaData = data;
      return data;
    } catch (error) {
      console.error('Error loading onboarding data:', error);
      return null;
    }
  }

  // Update state
  updateState(updates) {
    this.state = { ...this.state, ...updates };
    this.dispatchStateChange();
  }

  // Get current state
  getState() {
    return { ...this.state };
  }

  // Save completion status
  saveCompletionStatus() {
    StorageHelpers.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED, true);
    StorageHelpers.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED_DATE, new Date().toISOString());
  }

  // Dispatch state change event
  dispatchStateChange() {
    window.dispatchEvent(new CustomEvent('psa:state-change', {
      detail: this.state
    }));
  }
}