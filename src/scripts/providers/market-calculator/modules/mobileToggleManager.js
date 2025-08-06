// src/scripts/providers/market-calculator/modules/mobileToggleManager.js

export class MobileToggleManager {
  constructor() {
    this.toggleButtons = null;
    this.educationPanel = null;
    this.calculatorPanel = null;
  }

  initialize() {
    this.toggleButtons = document.querySelectorAll('.toggle-button');
    this.educationPanel = document.querySelector('.education-panel');
    this.calculatorPanel = document.querySelector('.calculator-panel');
    
    if (!this.toggleButtons.length) return;
    
    // Set up event listeners
    this.toggleButtons.forEach((button) => {
      button.addEventListener('click', () => this.handleToggle(button));
    });
    
    // Initialize mobile view if needed
    if (window.innerWidth <= 1024) {
      this.educationPanel?.classList.add('active');
    }
  }

  handleToggle(clickedButton) {
    // Update button states
    this.toggleButtons.forEach((button) => {
      button.classList.remove('active');
    });
    clickedButton.classList.add('active');
    
    // Update panel visibility
    const panel = clickedButton.dataset.panel;
    
    if (panel === 'education') {
      this.educationPanel?.classList.add('active');
      this.calculatorPanel?.classList.remove('active');
    } else {
      this.educationPanel?.classList.remove('active');
      this.calculatorPanel?.classList.add('active');
    }
  }
}