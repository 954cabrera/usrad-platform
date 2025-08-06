// src/scripts/providers/portal/portal.js - Main entry point for portal page
import { 
  PortalFormHandler,
  PortalValidation
} from './modules/index.js';
import { PORTAL_CONFIG } from './portal.config.js';
import { StorageHelpers } from '../shared/storage.js';

console.log("Portal script loaded");

// Initialize modules
const formHandler = new PortalFormHandler(PORTAL_CONFIG);
const validation = new PortalValidation();

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Setup form handler
  formHandler.initialize();
  
  // Setup validation
  validation.initialize();
  
  // Load any existing organization data and update UI if needed
  const orgData = StorageHelpers.getOrganizationData();
  if (orgData && orgData.legalName) {
    console.log("Organization data already exists:", orgData.legalName);
  }
});