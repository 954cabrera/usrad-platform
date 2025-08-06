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
});