// src/scripts/providers/confirmation/modules/checklistManager.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';

export class ChecklistManager {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.checkboxes = [];
    this.continueBtn = null;
  }

  init() {
    this.checkboxes = document.querySelectorAll('.confirmation-checkbox');
    this.continueBtn = document.getElementById(this.config.elements.continueBtn);
    
    this.setupListeners();
  }

  setupListeners() {
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.validateChecklist());
    });
  }

  validateChecklist() {
    const allChecked = Array.from(this.checkboxes).every(cb => cb.checked);
    this.continueBtn.disabled = !allChecked;
    
    // Emit custom event
    if (allChecked) {
      document.dispatchEvent(new CustomEvent('confirmationComplete'));
    }
  }
}