// src/scripts/providers/confirmation/modules/navigationManager.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class NavigationManager {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
  }

  editOrganization() {
    window.location.href = this.config.routes.organization;
  }

  editCenters() {
    window.location.href = this.config.routes.centers;
  }

  editPricing() {
    window.location.href = this.config.routes.pricing;
  }

  goBack() {
    window.location.href = this.config.routes.pricing;
  }

  proceedToSign() {
    // Save confirmation status using StorageHelpers.save
    StorageHelpers.save(
      this.config.storageKeys.confirmationStatus, 
      true
    );
    
    // Navigate to PSA signing
    window.location.href = this.config.routes.psaSigning;
  }
}