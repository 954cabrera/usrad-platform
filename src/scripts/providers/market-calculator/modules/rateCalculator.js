// src/scripts/providers/market-calculator/modules/rateCalculator.js

export class RateCalculator {
  constructor(config) {
    this.config = config;
    this.currentRates = null;
    this.currentPercentage = 100;
  }

  initialize() {
    // Listen for location changes
    document.addEventListener('locationComplete', (e) => {
      this.calculateRates(e.detail);
    });
    
    // Listen for rate slider changes
    const rateSlider = document.getElementById('rate-slider');
    if (rateSlider) {
      rateSlider.addEventListener('input', (e) => {
        this.currentPercentage = parseInt(e.target.value);
        this.updateVolumeIndicator();
        
        // Recalculate if we have rates
        if (this.currentRates) {
          this.displayResults();
        }
      });
    }
  }

  async calculateRates(location) {
    const { state, county } = location;
    
    // Show loading state
    document.dispatchEvent(new CustomEvent('calculationStarted'));
    
    try {
      // Fetch rates for each procedure
      const promises = this.config.PROCEDURES.map(async (proc) => {
        const response = await fetch(
          `${this.config.ROUTES.PRICING_API}?cpt=${proc.cpt}&state=${state}&county=${encodeURIComponent(county)}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch rates for ${proc.cpt}`);
        }
        
        const data = await response.json();
        return {
          ...data,
          displayName: proc.name
        };
      });
      
      this.currentRates = await Promise.all(promises);
      this.displayResults();
      
      // Enable accept button
      document.getElementById('accept-rates-btn').disabled = false;
      
    } catch (error) {
      console.error('Error calculating rates:', error);
      document.dispatchEvent(new CustomEvent('calculationError', { 
        detail: { error: error.message } 
      }));
    }
  }

  displayResults() {
    if (!this.currentRates) return;
    
    const results = this.currentRates.map(rate => {
      const medicareRate = rate.pricing.medicare_rate;
      const yourRate = medicareRate * (this.currentPercentage / 100);
      const hospitalRate = rate.pricing.hospital_estimate;
      const patientSavings = hospitalRate - yourRate;
      
      return {
        ...rate,
        yourRate,
        patientSavings
      };
    });
    
    document.dispatchEvent(new CustomEvent('resultsReady', { 
      detail: { 
        results, 
        percentage: this.currentPercentage,
        volumeData: this.getVolumeData()
      } 
    }));
  }

  updateVolumeIndicator() {
    const volumeData = this.getVolumeData();
    document.dispatchEvent(new CustomEvent('volumeUpdated', { 
      detail: volumeData 
    }));
    
    // Update percentage display
    document.getElementById('rate-percentage').textContent = `${this.currentPercentage}%`;
  }

  getVolumeData() {
    const percentage = this.currentPercentage;
    const thresholds = this.config.RATE_SLIDER.VOLUME_THRESHOLDS;
    
    if (percentage <= thresholds.HIGH.max) return thresholds.HIGH;
    if (percentage <= thresholds.GOOD.max) return thresholds.GOOD;
    if (percentage <= thresholds.MODERATE.max) return thresholds.MODERATE;
    return thresholds.LOW;
  }

  getCurrentRateData() {
    const location = document.querySelector('#state-select').value + '-' + 
                     document.querySelector('#county-select').value;
    
    return {
      percentage: this.currentPercentage,
      state: document.querySelector('#state-select').value,
      county: document.querySelector('#county-select').value,
      location
    };
  }
}