// src/scripts/providers/market-calculator/market-calculator.js
import { 
  LocationManager,
  RateCalculator,
  UIManager,
  MobileToggleManager
} from './modules/index.js';
import { MARKET_CONFIG } from './market-calculator.config.js';
import { StorageHelpers } from '../shared/storage.js';

console.log("Market calculator script loaded");

// Initialize modules
const locationManager = new LocationManager(MARKET_CONFIG);
const rateCalculator = new RateCalculator(MARKET_CONFIG);
const uiManager = new UIManager(MARKET_CONFIG);
const mobileToggle = new MobileToggleManager();

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  locationManager.initialize();
  rateCalculator.initialize();
  uiManager.initialize();
  mobileToggle.initialize();
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Accept rates button
  const acceptButton = document.getElementById("accept-rates-btn");
  if (acceptButton) {
    acceptButton.addEventListener("click", handleAcceptRates);
  }
}

function handleAcceptRates() {
  const rateData = rateCalculator.getCurrentRateData();
  
  // Save the selected rate strategy
  StorageHelpers.save('market_education_completed', true);
  StorageHelpers.save('selected_rate_strategy', {
    ...rateData,
    timestamp: new Date().toISOString()
  });
  
  // Continue to next step
  window.location.href = MARKET_CONFIG.ROUTES.NEXT_STEP;
}