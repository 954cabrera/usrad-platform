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

// Add the continueToNext function for pricing configurator navigation
window.continueToNext = function() {
  // Get facilities from storage
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  
  if (facilities.length === 0) {
    alert('Please add at least one imaging center before continuing.');
    return;
  }

  // Mark facilities step as completed
  localStorage.setItem('facilities_completed', 'true');
  localStorage.setItem('facilities_completed_at', new Date().toISOString());
  
  // Log the transition for debugging
  console.log(`✅ Facilities completed: ${facilities.length} centers added`);
  console.log('🚀 Navigating to Pricing Configurator...');
  
  // Navigate to pricing configurator
  window.location.href = '/providers/onboarding/pricing-configurator';
};

// Function to update continue section visibility and state
function updateContinueSection() {
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  const continueSection = document.getElementById('continue-section');
  const finalCount = document.getElementById('final-count');
  
  if (facilities.length > 0) {
    // Show continue section
    if (continueSection) {
      continueSection.style.display = 'block';
      
      // Update count
      if (finalCount) {
        finalCount.textContent = facilities.length;
      }
      
      // Enable continue button
      const continueBtn = continueSection.querySelector('button');
      if (continueBtn) {
        continueBtn.disabled = false;
        continueBtn.style.opacity = '1';
      }
      
      // Smooth scroll to continue section for single/multi-center users
      const userRole = localStorage.getItem('selectedRole');
      if (userRole !== 'executive' && userRole !== 'Executive/Corporate') {
        setTimeout(() => {
          continueSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  } else {
    // Hide continue section if no facilities
    if (continueSection) {
      continueSection.style.display = 'none';
    }
  }
}

// Make updateContinueSection globally available
window.updateContinueSection = updateContinueSection;

// Setup custom event handling
document.addEventListener('showAddForm', () => formHandler.showAddForm());
document.addEventListener('showEditForm', (e) => formHandler.showAddForm(e.detail.isEditing));

// Listen for facility changes to update continue section
document.addEventListener('facilityAdded', updateContinueSection);
document.addEventListener('facilityRemoved', updateContinueSection);
document.addEventListener('facilitiesImported', updateContinueSection);

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
  updateQuickStats();
  
  // Update continue section based on current facilities
  updateContinueSection();
  
  // Handle executive/corporate user display
  const userRole = localStorage.getItem('selectedRole');
  if (facilities.length > 0 && (userRole === 'executive' || userRole === 'Executive/Corporate')) {
    handleExecutiveUserDisplay();
  }
});

// Function to update quick stats
function updateQuickStats() {
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  const states = new Set(facilities.map(f => f.state).filter(Boolean));
  
  // Update centers count
  const centersElements = document.querySelectorAll('.stat-number, .stat-value, [data-stat="centers"]');
  centersElements.forEach((el, index) => {
    if (index === 0 || el.getAttribute('data-stat') === 'centers') {
      el.textContent = facilities.length;
    }
  });
  
  // Update states count
  const statesElements = document.querySelectorAll('.stat-number, .stat-value, [data-stat="states"]');
  statesElements.forEach((el, index) => {
    if (index === 1 || el.getAttribute('data-stat') === 'states') {
      el.textContent = states.size;
    }
  });
  
  console.log(`📊 Stats updated: ${facilities.length} centers in ${states.size} states`);
}

// Function to handle executive user display
function handleExecutiveUserDisplay() {
  const addCenterSection = document.getElementById('add-center-section');
  const continueSection = document.querySelector('.continue-section');
  
  if (addCenterSection) {
    const hasSuccessUI = addCenterSection.querySelector('.upload-success') || 
                        addCenterSection.textContent.includes('facilities registered');
    
    if (hasSuccessUI && continueSection) {
      // Hide the bottom continue section for executive users with custom UI
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

// Make updateQuickStats globally available
window.updateQuickStats = updateQuickStats;