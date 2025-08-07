// src/scripts/providers/psa/modules/floatingGuideManager.js
import { PSA_CONFIG } from '../psa.config.js';

export class FloatingGuideManager {
  constructor() {
    this.currentStep = 1;
    this.guideElement = null;
  }

  updateStep(step) {
    if (step === this.currentStep) return;
    
    this.currentStep = step;
    this.updateGuideDisplay();
    
    // Dispatch event for React component
    window.dispatchEvent(new CustomEvent('psa:step-change', {
      detail: { step }
    }));
  }

  updateGuideDisplay() {
    const guide = document.getElementById('floating-progress-guide');
    if (!guide) return;

    PSA_CONFIG.PSA_STEPS.forEach((stepInfo, index) => {
      const element = document.getElementById(stepInfo.id);
      if (element) {
        const stepNumber = index + 1;
        
        if (stepNumber < this.currentStep) {
          element.style.color = '#059669';
          element.style.fontWeight = '600';
          element.innerHTML = `✅ ${stepInfo.text}`;
        } else if (stepNumber === this.currentStep) {
          element.style.color = '#f59e0b';
          element.style.fontWeight = '700';
          element.innerHTML = `▶️ ${stepInfo.text}`;
        } else {
          element.style.color = '#9ca3af';
          element.style.fontWeight = '500';
          element.innerHTML = `⏳ ${stepInfo.text}`;
        }
      }
    });

    this.updateInstruction();
  }

  updateInstruction() {
    const instruction = document.getElementById('floating-instruction');
    if (!instruction) return;

    switch (this.currentStep) {
      case 1:
        instruction.innerHTML = 'Review and sign your PSA →';
        instruction.style.color = '#6b7280';
        break;
      case 2:
        instruction.innerHTML = 'Keep scrolling to find "Sign Now" →';
        instruction.style.color = '#f59e0b';
        instruction.style.fontWeight = '600';
        break;
      case 3:
        instruction.innerHTML = 'Click the "Sign Now" button!';
        instruction.style.color = '#dc2626';
        instruction.style.fontWeight = '700';
        break;
      case 4:
        instruction.innerHTML = '🎉 Signing completed!';
        instruction.style.color = '#059669';
        instruction.style.fontWeight = '700';
        break;
    }
  }

  markComplete() {
    const guide = document.getElementById('floating-progress-guide');
    if (!guide) return;

    PSA_CONFIG.PSA_STEPS.forEach((stepInfo) => {
      const element = document.getElementById(stepInfo.id);
      if (element) {
        element.style.color = '#059669';
        element.style.fontWeight = '700';
        element.innerHTML = `✅ ${stepInfo.text}`;
      }
    });

    const instruction = document.getElementById('floating-instruction');
    if (instruction) {
      instruction.innerHTML = '🎉 All steps completed! Redirecting...';
      instruction.style.color = '#059669';
      instruction.style.fontWeight = '700';
    }

    guide.style.background = 'rgba(16, 185, 129, 0.1)';
    guide.style.borderColor = '#059669';
    guide.style.borderWidth = '3px';
    guide.style.animation = 'pulse 2s infinite';

    this.addPulseAnimation();
  }

  addPulseAnimation() {
    if (!document.getElementById('pulse-animation')) {
      const style = document.createElement('style');
      style.id = 'pulse-animation';
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}