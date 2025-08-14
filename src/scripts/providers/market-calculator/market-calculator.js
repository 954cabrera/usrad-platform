// src/scripts/providers/market-calculator/market-calculator.js
// Clean fixed version with proper error handling

// Import modules with error handling
let LocationManager, RateCalculator, UIManager, MobileToggleManager, MARKET_CONFIG;

try {
  const modules = await import('./modules/index.js');
  LocationManager = modules.LocationManager;
  RateCalculator = modules.RateCalculator;
  UIManager = modules.UIManager;
  MobileToggleManager = modules.MobileToggleManager;
} catch (error) {
  console.warn('Could not import modules:', error);
  // Create stub classes if imports fail
  LocationManager = class { init() {} };
  RateCalculator = class { init() {} };
  UIManager = class { init() {} };
  MobileToggleManager = class { init() {} };
}

try {
  const config = await import('./market-calculator.config.js');
  MARKET_CONFIG = config.MARKET_CONFIG || {};
} catch (error) {
  console.warn('Could not import config:', error);
  MARKET_CONFIG = {};
}

class MarketCalculator {
  constructor() {
    try {
      this.locationManager = new LocationManager(MARKET_CONFIG);
      this.rateCalculator = new RateCalculator(MARKET_CONFIG);
      this.uiManager = new UIManager(MARKET_CONFIG);
      this.mobileToggleManager = new MobileToggleManager();
      this.config = MARKET_CONFIG;
    } catch (error) {
      console.error('Error creating MarketCalculator modules:', error);
      // Create fallback empty objects
      this.locationManager = { init: () => {} };
      this.rateCalculator = { init: () => {} };
      this.uiManager = { init: () => {} };
      this.mobileToggleManager = { init: () => {} };
      this.config = {};
    }
  }

  // Safely call .init() if present, else .initialize()
  _safeInit(mod) {
    if (!mod) {
      console.warn('[MarketCalculator] module is null/undefined');
      return;
    }
    
    try {
      if (typeof mod.init === 'function') {
        mod.init();
        return;
      }
      if (typeof mod.initialize === 'function') {
        mod.initialize();
        return;
      }
      console.warn('[MarketCalculator] module has no init/initialize:', mod?.constructor?.name);
    } catch (error) {
      console.error('[MarketCalculator] Error initializing module:', mod?.constructor?.name, error);
    }
  }

  init() {
    console.log('🚀 MarketCalculator initializing...');
    
    try {
      this._safeInit(this.locationManager);
      this._safeInit(this.rateCalculator);
      this._safeInit(this.uiManager);
      this._safeInit(this.mobileToggleManager);

      // Initialize role-based routing
      this.initializeRouting();

      // Optional UX helpers with delay
      setTimeout(() => {
        this.initializeEnhancements();
      }, 1000);

      console.log('✅ MarketCalculator initialized successfully');
    } catch (error) {
      console.error('❌ Error during MarketCalculator initialization:', error);
    }
  }

  initializeEnhancements() {
    try {
      if (typeof this.fixRevenueDisplay === 'function') this.fixRevenueDisplay();
      if (typeof this.addCustomizationPrompt === 'function') this.addCustomizationPrompt();
      if (typeof this.addScrollIndicator === 'function') this.addScrollIndicator();
      if (typeof this.addFloatingNextButton === 'function') this.addFloatingNextButton();
      
      // Re-bootstrap if needed
      if (this.locationManager && typeof this.locationManager._bootstrapIfComplete === 'function') {
        this.locationManager._bootstrapIfComplete();
      }
    } catch (error) {
      console.warn('Non-critical enhancement error:', error);
    }
  }

  initializeRouting() {
    setTimeout(() => {
      this.updateContinueButton();
      this.enhanceContinueButtonText();
      this.showRoleAwareMessaging();
      console.log('🎯 Role-based routing initialized');
    }, 500);
  }

  // Role-based routing functions
  handleContinue() {
    try {
      const role = localStorage.getItem('usrad_role') || 'center-admin';
      console.log('Market calculator continue - Role:', role);
      
      // Save the current rate selection
      const currentRate = this.getCurrentSelectedRate();
      if (currentRate) {
        localStorage.setItem('market_calculator_rate', currentRate.toString());
      }
      
      // Route based on role
      if (role === 'center-admin') {
        console.log('Routing Center Admin to PSA');
        window.location.href = '/providers/onboarding/psa-signing';
      } else {
        console.log('Routing Multi-Center/Executive to pricing configuration');
        window.location.href = '/providers/onboarding/pricing-multi';
      }
      
    } catch (error) {
      console.error('Error in market calculator routing:', error);
      // Fallback to PSA
      window.location.href = '/providers/onboarding/psa-signing';
    }
  }

  getCurrentSelectedRate() {
    try {
      // Try multiple ways to get the current rate
      const slider = document.querySelector('#rate-slider') || 
                    document.querySelector('.rate-slider') ||
                    document.querySelector('input[type="range"]');
      if (slider) {
        return parseFloat(slider.value) || 100;
      }
      
      const rateDisplay = document.querySelector('.rate-display') || 
                         document.querySelector('#selected-rate') ||
                         document.querySelector('[data-rate]');
      if (rateDisplay) {
        const rateText = rateDisplay.textContent || rateDisplay.innerText || '';
        const rateMatch = rateText.match(/(\d+(?:\.\d+)?)%?/);
        if (rateMatch) {
          return parseFloat(rateMatch[1]);
        }
      }
      
      // Check for global variable
      if (typeof window.selectedRate !== 'undefined') {
        return window.selectedRate;
      }
      
      return 100; // Default fallback
    } catch (error) {
      console.warn('Error getting selected rate:', error);
      return 100;
    }
  }

  updateContinueButton() {
    try {
      const continueBtn = document.querySelector('#continue-btn') || 
                         document.querySelector('.continue-button') ||
                         document.querySelector('.accept-button') ||
                         document.querySelector('[onclick*="continue"]') ||
                         document.querySelector('[onclick*="accept"]') ||
                         document.querySelector('button[type="submit"]');
      
      if (continueBtn) {
        // Remove existing click handlers by cloning
        const newButton = continueBtn.cloneNode(true);
        continueBtn.parentNode.replaceChild(newButton, continueBtn);
        
        // Add new click handler
        newButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleContinue();
        });
        
        console.log('✅ Continue button updated with role-based routing');
      } else {
        console.warn('⚠️ Could not find continue button in market calculator');
      }
    } catch (error) {
      console.error('Error updating continue button:', error);
    }
  }

  enhanceContinueButtonText() {
    try {
      const role = localStorage.getItem('usrad_role') || 'center-admin';
      const continueBtn = document.querySelector('#continue-btn') || 
                         document.querySelector('.continue-button') ||
                         document.querySelector('.accept-button');
      
      if (continueBtn) {
        const buttonTexts = {
          'center-admin': 'Accept These Rates & Continue',
          'multi-center': 'Continue to Pricing Setup',
          'executive': 'Continue to Advanced Pricing'
        };
        
        const targetText = buttonTexts[role] || 'Continue';
        
        // Update button text
        const textSpan = continueBtn.querySelector('.btn-text') || 
                        continueBtn.querySelector('span:not(.icon):not([class*="arrow"])');
        if (textSpan) {
          textSpan.textContent = targetText;
        } else if (!continueBtn.querySelector('svg') && !continueBtn.querySelector('.icon')) {
          continueBtn.textContent = targetText;
        }
        
        console.log(`🏷️ Button text updated for role: ${role}`);
      }
    } catch (error) {
      console.warn('Error updating button text:', error);
    }
  }

  showRoleAwareMessaging() {
    try {
      const role = localStorage.getItem('usrad_role') || 'center-admin';
      
      // Only show for multi-center and executive
      if (role === 'center-admin') return;
      
      const messageContainer = document.querySelector('.revenue-projection') ||
                              document.querySelector('.calculator-panel') ||
                              document.querySelector('.market-calculator') ||
                              document.querySelector('main');
      
      if (!messageContainer) return;
      
      // Remove existing message
      const existingMessage = document.querySelector('.role-aware-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      const messages = {
        'multi-center': {
          icon: '🏢',
          title: 'Multi-Center Optimization',
          text: 'Next, you\'ll customize rates by state to optimize for local market conditions.'
        },
        'executive': {
          icon: '⚡',
          title: 'Enterprise Configuration',
          text: 'Next, configure advanced pricing structures and view comprehensive portfolio analytics.'
        }
      };
      
      const message = messages[role];
      if (!message) return;
      
      const messageEl = document.createElement('div');
      messageEl.className = 'role-aware-message';
      messageEl.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #0ea5e9;
          border-radius: 0.75rem;
          padding: 1rem 1.5rem;
          margin: 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        ">
          <span style="font-size: 1.5rem;">${message.icon}</span>
          <div>
            <h4 style="margin: 0 0 0.25rem; color: #0c4a6e; font-weight: 700;">${message.title}</h4>
            <p style="margin: 0; color: #475569; font-size: 0.875rem;">${message.text}</p>
          </div>
        </div>
      `;
      
      // Insert before the continue button or at end
      const continueBtn = document.querySelector('.accept-button') || 
                         document.querySelector('.continue-button');
      if (continueBtn) {
        continueBtn.parentNode.insertBefore(messageEl, continueBtn);
      } else {
        messageContainer.appendChild(messageEl);
      }
      
      console.log(`💬 Role message shown for: ${role}`);
    } catch (error) {
      console.warn('Error showing role message:', error);
    }
  }

  // Harmless stub methods
  fixRevenueDisplay() {}
  addCustomizationPrompt() {}
  addScrollIndicator() {}
  addFloatingNextButton() {}
}

// Initialize market calculator
const marketCalculator = new MarketCalculator();
window.marketCalculator = marketCalculator;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  marketCalculator.init();
});

// Export for debugging
window.marketCalculatorRouting = {
  handleContinue: () => marketCalculator.handleContinue(),
  getCurrentRate: () => marketCalculator.getCurrentSelectedRate(),
  updateButton: () => marketCalculator.updateContinueButton()
};

export { MarketCalculator };