// src/scripts/providers/psa/modules/helperButtonManager.js
export class HelperButtonManager {
  constructor() {
    this.activeButton = null;
  }

  showButton(type) {
    if (type === 'signed-check') {
      this.showSignedCheckButton();
    } else if (type === 'ready-continue') {
      this.showReadyToContinueButton();
    }
  }

  showSignedCheckButton() {
    this.removeActiveButton();
    
    const button = document.createElement('div');
    button.id = 'signed-check-button';
    // Button creation handled by React component
    this.activeButton = button;
    
    // Dispatch event for React component
    window.dispatchEvent(new CustomEvent('psa:show-helper', {
      detail: { type: 'signed-check' }
    }));
  }

  showReadyToContinueButton() {
    this.removeActiveButton();
    
    const button = document.createElement('div');
    button.id = 'ready-to-continue-button';
    // Button creation handled by React component
    this.activeButton = button;
    
    // Dispatch event for React component
    window.dispatchEvent(new CustomEvent('psa:show-helper', {
      detail: { type: 'ready-continue' }
    }));
  }

  removeActiveButton() {
    if (this.activeButton && document.body.contains(this.activeButton)) {
      this.activeButton.remove();
    }
    this.activeButton = null;
  }

  removeAllButtons() {
    const buttonIds = ['signed-check-button', 'ready-to-continue-button'];
    buttonIds.forEach(id => {
      const button = document.getElementById(id);
      if (button) button.remove();
    });
    this.activeButton = null;
  }
}