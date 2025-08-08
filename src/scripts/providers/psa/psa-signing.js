// src/scripts/providers/psa/psa-signing.js - Main entry point for PSA page
import { PSA_CONFIG } from './psa.config.js';
import { PSAStateManager } from './modules/psaStateManager.js';
import { PSACompletionHandler } from './modules/psaCompletionHandler.js';
import { ConfettiManager } from './modules/confettiManager.js';
import { HelperButtonManager } from './modules/helperButtonManager.js';
import { FloatingGuideManager } from './modules/floatingGuideManager.js';
import docusealFix from './modules/docusealNavigationFix.js';


// Global flag to disable all custom scroll handling
window.DOCUSEAL_ACTIVE = false;

// Store original event listeners
const originalAddEventListener = EventTarget.prototype.addEventListener;
const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

// Override addEventListener to intercept scroll listeners
EventTarget.prototype.addEventListener = function(type, listener, options) {
  // If DocuSeal is active and this is a scroll event, skip it
  if (window.DOCUSEAL_ACTIVE && type === 'scroll') {
    console.log('🚫 Blocking scroll listener while DocuSeal is active');
    return;
  }
  
  // For all other events, call the original
  return originalAddEventListener.call(this, type, listener, options);
};

// Add this function to be called when DocuSeal iframe is loaded
window.activateDocuSealMode = function() {
  console.log('🔒 Activating DocuSeal mode - disabling all scroll handlers');
  
  window.DOCUSEAL_ACTIVE = true;
  
  // Remove all existing scroll listeners
  const allElements = [window, document, document.body, document.documentElement];
  allElements.forEach(element => {
    // Clone the element to remove all event listeners
    if (element !== window) {
      const clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
    }
  });
  
  // Hide floating guide
  const floatingGuide = document.getElementById('floating-progress-guide');
  if (floatingGuide) {
    floatingGuide.style.display = 'none';
  }
  
  // Disable mobile enhancements
  document.body.classList.add('docuseal-no-enhancements');
};

// Add this function to be called when leaving the PSA page
window.deactivateDocuSealMode = function() {
  console.log('🔓 Deactivating DocuSeal mode');
  window.DOCUSEAL_ACTIVE = false;
  
  // Restore floating guide
  const floatingGuide = document.getElementById('floating-progress-guide');
  if (floatingGuide) {
    floatingGuide.style.display = '';
  }
  
  document.body.classList.remove('docuseal-no-enhancements');
};

// Initialize PSA modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing PSA modules...');
  
  // Initialize state manager
  const stateManager = new PSAStateManager();
  
  // Initialize completion handler
  const completionHandler = new PSACompletionHandler(stateManager);
  
  // Initialize UI managers
  const confettiManager = new ConfettiManager();
  const helperButtonManager = new HelperButtonManager();
  const floatingGuideManager = new FloatingGuideManager();
  
  // Initialize DocuSeal navigation fix
  docusealFix.initialize();
  
  // Set up global event listeners
  window.addEventListener('psa:completion', (event) => {
    console.log('🎉 PSA completion event received!', event.detail);
    confettiManager.celebrate();
    completionHandler.handleCompletion(event.detail);
  });
  
  window.addEventListener('psa:step-change', (event) => {
    console.log('📋 PSA step change:', event.detail);
    floatingGuideManager.updateStep(event.detail.step);
  });
  
  window.addEventListener('psa:show-helper', (event) => {
    console.log('🔧 Showing helper button:', event.detail);
    helperButtonManager.showButton(event.detail.type);
  });
  
  // Expose managers to window for React component access
  window.PSAManagers = {
    state: stateManager,
    completion: completionHandler,
    confetti: confettiManager,
    helperButtons: helperButtonManager,
    floatingGuide: floatingGuideManager
  };
  
  console.log('✅ PSA modules initialized');
});