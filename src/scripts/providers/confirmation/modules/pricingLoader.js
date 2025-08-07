// src/scripts/providers/confirmation/modules/pricingLoader.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class PricingLoader {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
  }

  load() {
    // Use StorageHelpers.load instead of getItem
    const strategy = StorageHelpers.load(this.config.storageKeys.rateStrategy, {});
    const percentage = strategy.percentage || 100;
    
    this.updateDisplay(percentage);
  }

  updateDisplay(percentage) {
    const elements = this.config.elements;
    
    // Update percentage display
    document.getElementById(elements.rateValue).textContent = percentage;
    
    // Find appropriate tier
    const tier = this.config.pricingTiers.find(t => percentage <= t.max);
    
    // Update volume and revenue
    document.getElementById(elements.expectedVolume).textContent = tier.volume;
    document.getElementById(elements.projectedRevenue).textContent = tier.revenue;
  }
}