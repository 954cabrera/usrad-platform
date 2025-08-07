// src/scripts/providers/confirmation/confirmation.js
import { CONFIRMATION_CONFIG } from './confirmation.config.js';
import { 
  OrganizationLoader, 
  CentersLoader, 
  PricingLoader,
  ChecklistManager,
  NavigationManager,
  ExhibitBManager
} from './modules/index.js';

class ConfirmationPage {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.organizationLoader = new OrganizationLoader();
    this.centersLoader = new CentersLoader();
    this.pricingLoader = new PricingLoader();
    this.checklistManager = new ChecklistManager();
    this.navigationManager = new NavigationManager();
    this.exhibitBManager = new ExhibitBManager();
  }

  init() {
    this.loadAllData();
    this.setupEventListeners();
    this.exposeGlobalFunctions();
  }

  async loadAllData() {
    await this.organizationLoader.load();
    this.centersLoader.load();
    this.pricingLoader.load();
  }

  setupEventListeners() {
    this.checklistManager.init();
  }

  exposeGlobalFunctions() {
    // Expose navigation functions globally
    window.editOrganization = () => this.navigationManager.editOrganization();
    window.editCenters = () => this.navigationManager.editCenters();
    window.editPricing = () => this.navigationManager.editPricing();
    window.goBack = () => this.navigationManager.goBack();
    window.proceedToSign = () => this.navigationManager.proceedToSign();
    
    // Expose modal functions
    window.previewExhibitB = () => this.exhibitBManager.preview();
    window.closeModal = () => this.exhibitBManager.close();
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const confirmationPage = new ConfirmationPage();
  confirmationPage.init();
});