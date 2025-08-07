// src/scripts/providers/psa/psa-signing.js - Main entry point for PSA page
import { PSA_CONFIG } from './psa.config.js';
import { PSAStateManager } from './modules/psaStateManager.js';
import { PSACompletionHandler } from './modules/psaCompletionHandler.js';
import { ConfettiManager } from './modules/confettiManager.js';
import { HelperButtonManager } from './modules/helperButtonManager.js';
import { FloatingGuideManager } from './modules/floatingGuideManager.js';
import docusealFix from './modules/docusealNavigationFix.js';

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