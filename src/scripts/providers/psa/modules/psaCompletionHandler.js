// src/scripts/providers/psa/modules/psaCompletionHandler.js
import { PSA_CONFIG } from '../psa.config.js';
import { CompletionOverlayManager } from './completionOverlayManager.js';

export class PSACompletionHandler {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.overlayManager = new CompletionOverlayManager();
  }

  handleCompletion(detail) {
    console.log('🎉 Handling PSA completion:', detail);
    
    // Update state
    this.stateManager.updateState({
      completed: true,
      currentStep: 3,
      psaStep: 4
    });

    // Save completion status
    this.stateManager.saveCompletionStatus();

    // Remove any helper buttons
    this.removeHelperButtons();

    // Show completion overlay
    this.overlayManager.showCompletionMessage(detail.psaData);

    // Schedule redirect
    this.scheduleRedirect();
  }

  removeHelperButtons() {
    const buttonIds = ['signed-check-button', 'ready-to-continue-button'];
    buttonIds.forEach(id => {
      const button = document.getElementById(id);
      if (button) button.remove();
    });
  }

  scheduleRedirect() {
    setTimeout(() => {
      console.log('🔄 Redirecting to success page...');
      window.location.href = PSA_CONFIG.ROUTES.SUCCESS;
    }, PSA_CONFIG.TIMINGS.REDIRECT_DELAY);
  }
}