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

// Add the continueToNext function for market calculator navigation with Supabase save
window.continueToNext = async function() {
  // Get facilities from storage
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  
  if (facilities.length === 0) {
    alert('Please add at least one imaging center before continuing.');
    return;
  }

  // Show saving state
  const continueBtn = event.target;
  const originalText = continueBtn ? continueBtn.innerHTML : '';
  if (continueBtn) {
    continueBtn.disabled = true;
    continueBtn.innerHTML = 'Saving to database...';
  }

  try {
    // Save to Supabase
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    const supabase = createClient(window.PUBLIC_SUPABASE_URL, window.PUBLIC_SUPABASE_ANON_KEY);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user && facilities.length > 0) {
      console.log(`📤 Saving ${facilities.length} facilities to Supabase...`);
      
      // Map facilities to database format
      const dbFacilities = facilities.map(f => ({
        user_id: user.id,
        center_name: f.centerName || f.name,
        street_address: f.streetAddress || f.address,
        city: f.city,
        state: f.state,
        zip_code: f.zipCode || f.zip,
        center_phone: f.centerPhone || f.phone,
        administrator_name: f.contactName || f.administrator,
        administrator_email: f.contactEmail || f.adminEmail,
        administrator_phone: f.directPhone || f.adminPhone,
        is_primary: f.isPrimary || false
      }));
      
      // Clear existing and insert new
      await supabase.from('user_facilities').delete().eq('user_id', user.id);
      const { error } = await supabase.from('user_facilities').insert(dbFacilities);
      
      if (error) {
        console.error('❌ Error saving facilities:', error);
      } else {
        console.log('✅ Facilities saved to Supabase');
        
        // Update onboarding progress
        await supabase
          .from('corporate_entities')
          .update({
            onboarding_steps: {
              organization: true,
              facilities: true,
              pricing: false,
              agreement: false
            }
          })
          .eq('user_id', user.id);
      }
    }
  } catch (error) {
    console.error('Failed to save facilities:', error);
  }

  // Mark facilities step as completed
  localStorage.setItem('facilities_completed', 'true');
  localStorage.setItem('facilities_completed_at', new Date().toISOString());
  
  // Log the transition for debugging
  console.log(`✅ Facilities completed: ${facilities.length} centers added`);
  console.log('🚀 Navigating to Market Calculator...');
  
  // Navigate to market calculator
  window.location.href = '/providers/onboarding/market-calculator';
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
  
  // Update quick stats whenever continue section updates
  updateQuickStats();
}

// Make updateContinueSection globally available
window.updateContinueSection = updateContinueSection;

// Setup custom event handling
document.addEventListener('showAddForm', () => formHandler.showAddForm());
document.addEventListener('showEditForm', (e) => formHandler.showAddForm(e.detail.isEditing));

// Listen for facility changes to update continue section
document.addEventListener('facilityAdded', updateContinueSection);
document.addEventListener('facilityRemoved', updateContinueSection);
document.addEventListener('facilitiesImported', (e) => {
  updateContinueSection();
  // Handle bulk import success UI for executive/multi-center
  if (e.detail && e.detail.facilities) {
    handleBulkImportSuccess(e.detail.facilities);
  }
});

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
  const userRole = localStorage.getItem('selectedRole') || localStorage.getItem('usrad_role');
  if (facilities.length > 0 && (userRole === 'executive' || userRole === 'Executive/Corporate')) {
    handleExecutiveUserDisplay();
  }
});

// Function to update quick stats - ENHANCED VERSION
function updateQuickStats() {
  const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
  const states = new Set(facilities.map(f => f.state).filter(Boolean));
  
  console.log(`🔄 Updating stats: ${facilities.length} centers in ${states.size} states`);
  
  // Update centers count - Multiple selectors for compatibility
  const centerCountSelectors = [
    '#center-count',
    '.center-count',
    '[data-stat="centers"]',
    '.quick-stat-value.centers'
  ];
  
  centerCountSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) {
        el.textContent = facilities.length;
        console.log(`✅ Updated center count (${selector}) to:`, facilities.length);
      }
    });
  });
  
  // Update states count - Multiple selectors for compatibility
  const stateCountSelectors = [
    '#state-count',
    '.state-count',
    '[data-stat="states"]',
    '.quick-stat-value.states'
  ];
  
  stateCountSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) {
        el.textContent = states.size;
        console.log(`✅ Updated state count (${selector}) to:`, states.size);
      }
    });
  });
  
  console.log(`📊 Stats updated: ${facilities.length} centers in ${states.size} states`);
}

// Function to handle bulk import success for executive/multi-center users
function handleBulkImportSuccess(facilities) {
  const userRole = localStorage.getItem('selectedRole') || localStorage.getItem('usrad_role');
  
  // Only show special UI for executive/multi-center users
  if (userRole !== 'executive' && userRole !== 'multi-center') {
    return;
  }
  
  const states = [...new Set(facilities.map(f => f.state).filter(Boolean))];
  
  // Hide the add center form/import section
  const addCenterSection = document.getElementById('add-center-section');
  const importSection = document.querySelector('.import-section, .upload-section');
  
  if (addCenterSection) {
    addCenterSection.style.display = 'none';
  }
  if (importSection) {
    importSection.style.display = 'none';
  }
  
  // Create or update success container
  let successContainer = document.getElementById('bulk-import-success');
  if (!successContainer) {
    successContainer = document.createElement('div');
    successContainer.id = 'bulk-import-success';
    
    // Insert after header or at top of main container
    const headerSection = document.querySelector('.header-section');
    const mainContainer = document.querySelector('.facilities-container');
    
    if (headerSection && headerSection.nextSibling) {
      headerSection.parentNode.insertBefore(successContainer, headerSection.nextSibling);
    } else if (mainContainer) {
      mainContainer.insertBefore(successContainer, mainContainer.firstChild);
    }
  }
  
  // Build success UI with proper checkmark size
  successContainer.innerHTML = `
    <div class="import-success-card">
      <div class="success-icon-wrapper">
        <svg class="success-checkmark" width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="#10b981" stroke="#059669" stroke-width="2"/>
          <path d="M20 30 L26 36 L40 22" stroke="white" stroke-width="3" fill="none" 
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h2 class="success-title">🎉 ${facilities.length} Facilities Successfully Added!</h2>
      <p class="success-subtitle">
        Your imaging centers have been registered. Ready to set up your pricing strategy?
      </p>
      
      <div class="import-success-stats">
        <div class="stat-box">
          <div class="stat-value">${facilities.length}</div>
          <div class="stat-label">Centers Added</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${states.length}</div>
          <div class="stat-label">States Covered</div>
        </div>
        ${userRole === 'executive' ? `
        <div class="stat-box">
          <div class="stat-value">$${Math.round(facilities.length * 0.18)}M+</div>
          <div class="stat-label">Revenue Potential</div>
        </div>
        ` : ''}
      </div>
      
      <div class="import-success-actions">
        <button onclick="continueToNext()" class="btn btn-primary btn-large">
          Continue to Pricing Strategy →
        </button>
        
        <button onclick="toggleImportedList()" class="btn btn-secondary">
          View All Centers
        </button>
        
        <details class="add-more-menu">
          <summary class="btn btn-outline">+ Add More Centers</summary>
          <div class="dropdown-options">
            <button onclick="showAddSingleForm()" class="dropdown-option">
              📝 Add Single Center
            </button>
            <button onclick="showBulkImportAgain()" class="dropdown-option">
              📁 Upload Another CSV
            </button>
          </div>
        </details>
      </div>
      
      <div id="imported-centers-list" class="imported-list" style="display: none;">
        <h3>Your Imported Centers:</h3>
        <div class="centers-grid">
          ${facilities.map((f, i) => `
            <div class="center-card">
              <strong>${f.centerName || f.name}</strong>
              <p>${f.city}, ${f.state} ${f.zipCode || f.zip}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Add styles if needed
  addImportSuccessStyles();
}

// Add styles for import success UI
function addImportSuccessStyles() {
  if (!document.getElementById('import-success-styles')) {
    const styles = document.createElement('style');
    styles.id = 'import-success-styles';
    styles.textContent = `
      .import-success-card {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border: 2px solid #10b981;
        border-radius: 16px;
        padding: 2rem;
        margin: 2rem 0;
        text-align: center;
      }
      
      .success-icon-wrapper {
        display: inline-block;
        margin-bottom: 1rem;
      }
      
      .success-checkmark {
        display: block;
        width: 60px;
        height: 60px;
      }
      
      .success-title {
        color: #047857;
        font-size: 1.875rem;
        font-weight: 700;
        margin: 1rem 0;
      }
      
      .import-success-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
        margin: 2rem auto;
        max-width: 500px;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
      }
      
      .stat-box {
        text-align: center;
      }
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #059669;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.5rem;
      }
      
      .import-success-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 2rem;
      }
      
      .btn-large {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }
      
      .add-more-menu {
        position: relative;
      }
      
      .add-more-menu[open] .dropdown-options {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.5rem;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        min-width: 200px;
        z-index: 100;
      }
      
      .dropdown-option {
        display: block;
        width: 100%;
        padding: 0.75rem 1rem;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
      }
      
      .dropdown-option:hover {
        background: #f3f4f6;
      }
      
      .imported-list {
        margin-top: 2rem;
        padding: 1.5rem;
        background: white;
        border-radius: 12px;
        max-height: 400px;
        overflow-y: auto;
      }
      
      .centers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .center-card {
        padding: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
      }
    `;
    document.head.appendChild(styles);
  }
}

// Helper functions for UI interactions
window.toggleImportedList = function() {
  const list = document.getElementById('imported-centers-list');
  if (list) {
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
  }
};

window.showAddSingleForm = function() {
  document.getElementById('bulk-import-success')?.remove();
  document.getElementById('add-center-section')?.style.display = 'block';
  formHandler.showAddForm();
};

window.showBulkImportAgain = function() {
  document.getElementById('bulk-import-success')?.remove();
  const importSection = document.querySelector('.import-section, .upload-section');
  if (importSection) {
    importSection.style.display = 'block';
  }
};

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