// facilities.js - Main entry point for facilities page
import { 
  FacilitiesState, 
  FormHandler, 
  EquipmentDetailsManager, 
  CentersListManager, 
  FormValidation, 
  PrepopulateManager 
} from './modules/index.js';
import { FACILITIES_CONFIG } from './facilities.config.js';
import { StorageHelpers } from '../shared/storage.js';
// Import the upload handler module to ensure it loads
import './modules/facilityUploadHandler.js';

console.log("Facilities script loaded");

// Initialize modules
const state = new FacilitiesState();
const formHandler = new FormHandler(state, FACILITIES_CONFIG);
const equipmentManager = new EquipmentDetailsManager(FACILITIES_CONFIG);
const centersManager = new CentersListManager(state, FACILITIES_CONFIG);
const validation = new FormValidation();
const prepopulate = new PrepopulateManager();

// Make functions globally available for onclick handlers
window.editCenter = (index) => centersManager.editCenter(index);
window.deleteCenter = (index) => centersManager.deleteCenter(index);
window.continueToNext = () => formHandler.continueToNext();

// Setup custom event handling
document.addEventListener('showAddForm', () => formHandler.showAddForm());
document.addEventListener('showEditForm', (e) => formHandler.showAddForm(e.detail.isEditing));

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Load saved data using storage helper
  state.loadFromStorage();
  
  // Setup all modules
  formHandler.initialize();
  validation.initialize();
  equipmentManager.initialize();
  
  // Setup prepopulate with organization data
  const orgData = StorageHelpers.getOrganizationData();
  prepopulate.setup(orgData);
  
  // Initial UI update
  centersManager.updateUI();
  
  // Load existing facilities and update stats
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  console.log('Loaded facilities on page init:', facilities.length);
  
  // Update quick stats to reflect current facilities
  if (window.updateQuickStats) {
    window.updateQuickStats();
  } else {
    // Fallback: manually update stats if function not available yet
    const states = new Set(facilities.map(f => f.state));
    
    // Look for elements that might contain the stats
    const possibleSelectors = [
      '.stat-number',
      '.stat-value',
      '[data-stat="centers"]',
      '[data-stat="states"]'
    ];
    
    possibleSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length >= 2) {
        elements[0].textContent = facilities.length;
        elements[1].textContent = states.size;
      }
    });
  }
  
  // If user has facilities and is executive, show appropriate view
  const userRole = localStorage.getItem('selectedRole');
  if (facilities.length > 0) {
    // Update the continue button state
    const continueSection = document.querySelector('.continue-section');
    if (continueSection) {
      const continueBtn = continueSection.querySelector('button');
      if (continueBtn) {
        continueBtn.disabled = false;
        continueBtn.style.opacity = '1';
      }
      
      // For executive users, hide the bottom continue section if showing custom UI
      if (userRole === 'executive' || userRole === 'Executive/Corporate') {
        const addCenterSection = document.getElementById('add-center-section');
        if (addCenterSection && (addCenterSection.querySelector('.upload-success') || 
            addCenterSection.textContent.includes('facilities registered'))) {
          continueSection.style.display = 'none';
          
          // Also hide "Your Imaging Centers" section to avoid duplication
          const yourCentersHeader = Array.from(document.querySelectorAll('h2, h3'))
            .find(el => el.textContent.includes('Your Imaging Centers'));
          if (yourCentersHeader && yourCentersHeader.parentElement) {
            yourCentersHeader.parentElement.style.display = 'none';
          }
        }
      }
    }
  }
});