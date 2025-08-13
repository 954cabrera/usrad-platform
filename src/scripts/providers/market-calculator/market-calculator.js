// src/scripts/providers/market-calculator/market-calculator.js
import { 
  LocationManager,
  RateCalculator,
  UIManager,
  MobileToggleManager
} from './modules/index.js';
import { MARKET_CONFIG } from './market-calculator.config.js';
import { StorageHelpers } from '../shared/storage.js';

class MarketCalculator {
  constructor() {
    console.log('Market calculator script loaded');
    this.locationManager = new LocationManager();
    this.rateCalculator = new RateCalculator();
    this.uiManager = new UIManager();
    this.mobileToggleManager = new MobileToggleManager();
    this.config = MARKET_CONFIG;
  }

  init() {
    this.locationManager.init();
    this.rateCalculator.init();
    this.uiManager.init();
    this.mobileToggleManager.init();
    
    this.setupEventListeners();
    
    // Initialize customization features after delay
    setTimeout(() => {
      this.fixRevenueDisplay();
      this.addCustomizationPrompt();
      this.addScrollIndicator();
      this.addFloatingNextButton();
    }, 1500);
  }

  setupEventListeners() {
    // Listen for any existing event listeners your modules might need
  }

  // Fix revenue display to show "Per Center"
  fixRevenueDisplay() {
    const revenueHeading = document.querySelector('.revenue-projection-card h3');
    if (revenueHeading && !revenueHeading.textContent.includes('Per Center')) {
      revenueHeading.textContent = 'Your Annual Revenue Potential Per Center';
    }
  }

  // Add scroll indicator after revenue box
  addScrollIndicator() {
    const revenueCard = document.querySelector('.revenue-projection-card');
    if (revenueCard && !document.querySelector('.scroll-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'scroll-indicator';
      indicator.innerHTML = `
        <div style="text-align: center; margin: 2rem 0; animation: bounce 2s infinite;">
          <div style="font-size: 2rem; color: #0ea5e9;">⬇️</div>
          <p style="color: #0ea5e9; font-weight: 600; margin: 0.5rem 0;">Continue Below</p>
          <p style="color: #64748b; font-size: 0.875rem;">Choose your pricing strategy</p>
        </div>
        <style>
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        </style>
      `;
      revenueCard.parentElement.insertBefore(indicator, revenueCard.nextSibling);
    }
  }

  // Add the main customization prompt
  addCustomizationPrompt() {
    // Find the revenue projection card
    const revenueCard = document.querySelector('.revenue-projection-card');
    if (!revenueCard) {
      console.log('Revenue card not found, retrying...');
      setTimeout(() => this.addCustomizationPrompt(), 1000);
      return;
    }
    
    // Check if prompt already exists
    if (document.querySelector('.customization-prompt-wrapper')) {
      return;
    }
    
    // Get current values
    const slider = document.querySelector('input[type="range"]');
    const currentRate = slider ? slider.value : '100';
    const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    const facilityCount = facilities.length || 1;
    
    // Create prompt
    const promptWrapper = document.createElement('div');
    promptWrapper.className = 'customization-prompt-wrapper';
    promptWrapper.style.cssText = 'margin: 2rem 0;';
    promptWrapper.innerHTML = `
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15);">
        <div style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: flex-start;">
          <div style="font-size: 3rem;">🎯</div>
          <div style="flex: 1;">
            <h3 style="margin: 0 0 0.75rem; font-size: 1.75rem; color: #0c4a6e; font-weight: 700;">Ready to Continue?</h3>
            <p style="margin: 0.5rem 0; color: #334155; font-size: 1.125rem;">
              You've selected <strong class="selected-rate" style="color: #0ea5e9; font-size: 1.25rem;">${currentRate}%</strong> of Medicare for all facilities.
            </p>
            <p style="font-size: 1rem; color: #64748b; margin-top: 1rem;">Would you like to:</p>
            <ul style="margin: 1rem 0 0; padding-left: 1.5rem; list-style: none;">
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #0ea5e9;">•</span>
                <span class="keep-simple-text"><strong>Keep it simple:</strong> Use ${currentRate}% for all ${facilityCount} facilities</span>
              </li>
              <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">
                <span style="position: absolute; left: 0; color: #0ea5e9;">•</span>
                <strong>Optimize by location:</strong> Customize rates based on local market conditions
              </li>
            </ul>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
          <button class="btn-uniform" onclick="marketCalculator.continueWithUniformRate()" style="flex: 1; padding: 1rem 1.5rem; background: white; color: #475569; border: 2px solid #e2e8f0; border-radius: 0.625rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
            ✓ Keep ${currentRate}% for All Facilities
          </button>
          <button class="btn-customize" onclick="marketCalculator.customizeByLocation()" style="flex: 1; padding: 1rem 1.5rem; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; border: none; border-radius: 0.625rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
            🎯 Customize Rates by Location
          </button>
        </div>
        
        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: rgba(255, 255, 255, 0.8); border-radius: 0.5rem; font-size: 0.875rem; color: #64748b;">
          <span style="font-size: 1.25rem;">💡</span>
          <span>Most providers (80%) use uniform rates for simplicity</span>
        </div>
      </div>
    `;
    
    // Insert right after the revenue card
    revenueCard.parentElement.insertBefore(promptWrapper, revenueCard.nextSibling);
    
    // Smooth scroll to make it visible
    setTimeout(() => {
      promptWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
    
    // Setup slider listener
    if (slider) {
      slider.addEventListener('input', () => this.updateCustomizationPrompt());
    }
    
    // Setup button hover effects
    const buttons = promptWrapper.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  }

  // Update prompt when slider changes
  updateCustomizationPrompt() {
    const slider = document.querySelector('input[type="range"]');
    const currentRate = slider ? slider.value : '100';
    
    const prompt = document.querySelector('.customization-prompt-wrapper');
    if (prompt) {
      // Update rate displays
      const rateDisplay = prompt.querySelector('.selected-rate');
      if (rateDisplay) {
        rateDisplay.textContent = currentRate + '%';
      }
      
      // Update button text
      const uniformBtn = prompt.querySelector('.btn-uniform');
      if (uniformBtn) {
        uniformBtn.innerHTML = `✓ Keep ${currentRate}% for All Facilities`;
      }
      
      // Update keep simple text
      const keepSimpleText = prompt.querySelector('.keep-simple-text');
      if (keepSimpleText) {
        const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
        keepSimpleText.innerHTML = `<strong>Keep it simple:</strong> Use ${currentRate}% for all ${facilities.length || 1} facilities`;
      }
    }
  }

  // Add floating next button
  addFloatingNextButton() {
    if (document.querySelector('.floating-next-btn')) return;
    
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-next-btn';
    floatingBtn.innerHTML = `
      <button onclick="marketCalculator.scrollToPrompt()" style="position: fixed; bottom: 2rem; right: 2rem; background: #0ea5e9; color: white; padding: 1rem 2rem; border-radius: 2rem; border: none; font-weight: 600; box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3); cursor: pointer; z-index: 1000; display: flex; align-items: center; gap: 0.5rem;">
        Continue to Pricing Options
        <span style="font-size: 1.25rem;">→</span>
      </button>
    `;
    document.body.appendChild(floatingBtn);
  }

  // Scroll to prompt function
  scrollToPrompt() {
    const prompt = document.querySelector('.customization-prompt-wrapper');
    if (prompt) {
      prompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Continue with uniform rate
  continueWithUniformRate() {
    const slider = document.querySelector('input[type="range"]');
    const rate = slider ? slider.value : '100';
    const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    
    // Save data
    const revenueElement = document.querySelector('.annual-revenue');
    const revenue = revenueElement ? revenueElement.textContent : '$0';
    
    const marketCalcData = {
      selectedRate: parseInt(rate),
      projectedRevenue: revenue,
      timestamp: new Date().toISOString()
    };
    StorageHelpers.save('market_calculator_result', marketCalcData);
    
    const pricingData = {
      structure: 'uniform',
      displayStructure: 'Uniform Rate - All Locations',
      displayRate: `${rate}% of Medicare`,
      uniformRate: parseInt(rate),
      customization: 'none',
      timestamp: new Date().toISOString()
    };
    StorageHelpers.save('provider_pricing', pricingData);
    StorageHelpers.save('pricing_completed', true);
    
    // Show confirmation overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;';
    overlay.innerHTML = `
      <div style="background: white; padding: 3rem; border-radius: 1rem; text-align: center; animation: scaleIn 0.3s;">
        <div style="font-size: 4rem;">✅</div>
        <h3 style="font-size: 1.5rem; margin: 1rem 0;">Perfect!</h3>
        <p>All ${facilities.length} facilities will use ${rate}% of Medicare rates.</p>
        <p style="margin-top: 2rem; color: #666;">Redirecting to confirmation...</p>
      </div>
      <style>
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      window.location.href = '/providers/onboarding/confirmation';
    }, 2000);
  }

  // Customize by location
  customizeByLocation() {
    const slider = document.querySelector('input[type="range"]');
    const rate = slider ? slider.value : '100';
    
    const marketCalcData = {
      selectedRate: parseInt(rate),
      baseRate: parseInt(rate),
      timestamp: new Date().toISOString()
    };
    StorageHelpers.save('market_calculator_result', marketCalcData);
    StorageHelpers.save('market_education_completed', true);
    
    window.location.href = '/providers/onboarding/pricing-customizer';
  }
}

// Create and initialize
const marketCalculator = new MarketCalculator();

// Make instance available globally for onclick handlers
window.marketCalculator = marketCalculator;

document.addEventListener('DOMContentLoaded', () => {
  marketCalculator.init();
});

// Export for module usage
export { MarketCalculator };