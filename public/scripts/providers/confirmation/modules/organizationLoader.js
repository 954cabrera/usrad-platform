// src/scripts/providers/confirmation/modules/organizationLoader.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class OrganizationLoader {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
  }

  async load() {
    try {
      // Load organization data
      const orgData = StorageHelpers.load(StorageHelpers.KEYS.PROVIDER_ORGANIZATION);
      
      // Load signup data as backup
      const signupData = StorageHelpers.load(StorageHelpers.KEYS.PROVIDER_SIGNUP_DATA);
      
      if (orgData) {
        this.updateUI(orgData, signupData);
      } else if (signupData) {
        // Fallback to signup data if org data not found
        this.updateUIFromSignup(signupData);
      }
    } catch (error) {
      console.error('Error loading organization info:', error);
      this.showError();
    }
  }

  updateUI(orgData, signupData) {
    const elements = this.config.elements;
    
    // Organization name from legalName
    document.getElementById(elements.orgName).textContent = 
      orgData.legalName || signupData?.organizationName || 'N/A';
    
    // Contact name from signer object
    document.getElementById(elements.orgContact).textContent = 
      orgData.signer?.fullName || signupData?.fullName || 'N/A';
    
    // Email from signer object
    document.getElementById(elements.orgEmail).textContent = 
      orgData.signer?.email || 'N/A';
    
    // Phone from signer object
    document.getElementById(elements.orgPhone).textContent = 
      orgData.signer?.phone || 'N/A';
  }

  updateUIFromSignup(signupData) {
    const elements = this.config.elements;
    
    document.getElementById(elements.orgName).textContent = 
      signupData.organizationName || 'N/A';
    document.getElementById(elements.orgContact).textContent = 
      signupData.fullName || 'N/A';
    document.getElementById(elements.orgEmail).textContent = 'N/A';
    document.getElementById(elements.orgPhone).textContent = 'N/A';
  }

  showError() {
    const errorText = 'Error loading data';
    ['orgName', 'orgContact', 'orgEmail', 'orgPhone'].forEach(key => {
      const element = document.getElementById(this.config.elements[key]);
      if (element && element.textContent === 'Loading...') {
        element.textContent = errorText;
      }
    });
  }
}