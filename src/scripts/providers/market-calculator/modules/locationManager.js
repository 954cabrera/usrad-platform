// src/scripts/providers/market-calculator/modules/locationManager.js

export class LocationManager {
  constructor(config) {
    this.config = config;
    this.stateSelect = null;
    this.countySelect = null;
  }

  initialize() {
    this.stateSelect = document.getElementById("state-select");
    this.countySelect = document.getElementById("county-select");
    
    if (this.stateSelect) {
      this.stateSelect.addEventListener("change", () => this.handleStateChange());
    }
    
    if (this.countySelect) {
      this.countySelect.addEventListener("change", () => this.handleCountyChange());
    }
  }

  handleStateChange() {
    const state = this.stateSelect.value;
    this.updateCountyOptions(state);
    
    // Clear results when state changes
    document.dispatchEvent(new CustomEvent('locationChanged', { 
      detail: { state, county: null } 
    }));
  }

  handleCountyChange() {
    const state = this.stateSelect.value;
    const county = this.countySelect.value;
    
    if (state && county) {
      // Trigger rate calculation
      document.dispatchEvent(new CustomEvent('locationComplete', { 
        detail: { state, county } 
      }));
    }
  }

  updateCountyOptions(state) {
    // Clear current options
    this.countySelect.innerHTML = '<option value="">Select County</option>';
    
    if (state && this.config.COUNTY_DATA[state]) {
      this.config.COUNTY_DATA[state].forEach((county) => {
        const option = document.createElement("option");
        option.value = county.value;
        option.textContent = county.label;
        this.countySelect.appendChild(option);
      });
    }
  }

  getCurrentLocation() {
    return {
      state: this.stateSelect?.value || null,
      county: this.countySelect?.value || null
    };
  }

  isLocationComplete() {
    const location = this.getCurrentLocation();
    return location.state && location.county;
  }
}