// src/scripts/providers/psa/modules/completionOverlayManager.js
import { PSA_CONFIG } from '../psa.config.js';

export class CompletionOverlayManager {
  showCompletionMessage(psaData) {
    const overlay = document.createElement('div');
    overlay.id = 'completion-overlay';
    overlay.style.cssText = `
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 999998 !important;
      background: white !important;
      border: 3px solid #059669 !important;
      border-radius: 16px !important;
      padding: 32px !important;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
      text-align: center !important;
      min-width: 450px !important;
      animation: slideIn 0.5s ease-out !important;
    `;

    overlay.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
      <h2 style="color: #003087; font-size: 24px; font-weight: bold; margin-bottom: 12px;">
        PSA Completed Successfully!
      </h2>
      <p style="color: #6b7280; font-size: 16px; margin-bottom: 20px;">
        Welcome to the USRad Network! You're now ready to start serving patients.
      </p>
      
      <!-- Email Notification Section -->
      <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #3b82f6;">
        <p style="color: #1d4ed8; font-size: 15px; font-weight: 600; margin-bottom: 4px;">
          📧 Check Your Email!
        </p>
        <p style="color: #2563eb; font-size: 14px;">
          Your signed agreement has been sent to <strong>${psaData?.signer?.email || 'your email'}</strong>
        </p>
      </div>
      
      <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #059669; font-size: 14px; font-weight: 600;">
          ✅ Provider Service Agreement Signed<br>
          ✅ Network Access Approved<br>
          ✅ Onboarding Complete
        </p>
      </div>
      <p style="color: #9ca3af; font-size: 14px;">
        Redirecting to complete your setup...
      </p>
    `;

    // Add animation keyframes
    this.addAnimationStyles();

    document.body.appendChild(overlay);

    // Schedule removal
    setTimeout(() => {
      this.removeOverlay(overlay);
    }, PSA_CONFIG.TIMINGS.OVERLAY_DISPLAY_DURATION);
  }

  addAnimationStyles() {
    if (!document.getElementById('completion-overlay-animations')) {
      const style = document.createElement('style');
      style.id = 'completion-overlay-animations';
      style.textContent = `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  removeOverlay(overlay) {
    if (document.body.contains(overlay)) {
      overlay.style.transition = 'opacity 0.5s ease-out';
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 500);
    }
  }
}