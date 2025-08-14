// src/scripts/providers/portal/multi-pricing.client.js
// Enhanced Multi-center pricing configuration with smart auto-population

// Storage keys
const STORAGE_KEYS = {
  ROLE: 'usrad_role',
  STATE_RATES: 'usrad_state_rates',
  CONFIG: 'usrad_multi_config',
  SELECTION: 'usrad_multi_selection',
  FACILITIES: 'facilities',
  SMART_DEFAULTS: 'smart_multi_defaults'
};

// Configuration
const CONFIG = {
  MIN_RATE: 90,
  MAX_RATE: 150,
  DEFAULT_RATE: 100,
  DEFAULT_BASELINE: 212000,
  DEFAULT_CENTERS: 1,
  NEXT_URL: '/providers/onboarding/confirmation'  // Changed from facilities to confirmation
};

// US States list
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getStorageItem = (key, defaultValue = {}) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error parsing localStorage item ${key}:`, error);
    return defaultValue;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving to localStorage ${key}:`, error);
  }
};

// Animation utility
const animateNumber = (element, fromValue, toValue, duration = 300) => {
  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = fromValue + (toValue - fromValue) * easeOut;
    
    element.textContent = formatCurrency(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

// Enhanced State Manager with Smart Auto-Population
class SmartStateManager {
  constructor() {
    this.stateRates = getStorageItem(STORAGE_KEYS.STATE_RATES, {});
    this.centerCounts = {};
    this.config = getStorageItem(STORAGE_KEYS.CONFIG, {
      centers: CONFIG.DEFAULT_CENTERS,
      baseline: CONFIG.DEFAULT_BASELINE,
      period: 'five'
    });
    this.currentProjections = {};
    
    // Auto-populate from uploaded facilities
    this.autoPopulateFromFacilities();
  }

  autoPopulateFromFacilities() {
    console.log('🧠 Smart auto-population starting...');
    
    // Get facility data and smart defaults
    const facilities = JSON.parse(localStorage.getItem(STORAGE_KEYS.FACILITIES) || "[]");
    const smartDefaults = JSON.parse(localStorage.getItem(STORAGE_KEYS.SMART_DEFAULTS) || "{}");
    
    console.log('📊 Facilities found:', facilities.length);
    console.log('💡 Smart defaults:', smartDefaults);
    
    if (facilities.length === 0) {
      console.log('⚠️ No facilities found, using manual setup');
      return;
    }
    
    // Analyze facilities and auto-populate states
    const facilityAnalysis = this.analyzeFacilities(facilities);
    this.populateStatesFromAnalysis(facilityAnalysis, smartDefaults);
    
    // Update UI with smart suggestions (after DOM is ready)
    setTimeout(() => {
      this.addSmartSuggestions(facilityAnalysis);
      this.showAutoPopulationMessage(facilityAnalysis);
    }, 500);
  }

  analyzeFacilities(facilities) {
    const stateData = {};
    
    console.log('🔍 Analyzing facilities:', facilities);
    
    facilities.forEach((facility, index) => {
      console.log(`Facility ${index}:`, facility);
      
      // Try multiple possible state field names
      const state = facility.state || 
                   facility.address_state || 
                   facility.location?.state || 
                   facility.State || 
                   facility.ADDRESS_STATE ||
                   facility.facilityState ||
                   facility.facility_state;
      
      console.log(`Facility ${index} state:`, state);
      
      if (!state) {
        console.warn(`No state found for facility ${index}:`, facility);
        return;
      }
      
      if (!stateData[state]) {
        stateData[state] = {
          count: 0,
          facilities: [],
          cities: new Set()
        };
      }
      
      stateData[state].count++;
      stateData[state].facilities.push(facility);
      
      // Try multiple possible city field names
      const city = facility.city || 
                  facility.address_city || 
                  facility.location?.city ||
                  facility.City ||
                  facility.ADDRESS_CITY ||
                  facility.facilityCity ||
                  facility.facility_city;
      
      if (city) {
        stateData[state].cities.add(city);
      }
    });
    
    console.log('📊 Final state breakdown:', stateData);
    
    return {
      totalFacilities: facilities.length,
      stateData: stateData,
      states: Object.keys(stateData),
      isMultiState: Object.keys(stateData).length > 1
    };
  }

  populateStatesFromAnalysis(analysis, smartDefaults) {
    console.log('🎯 Populating states from analysis:', analysis);
    
    // Clear existing states
    this.stateRates = {};
    this.centerCounts = {};
    
    // Add each state with smart defaults
    Object.entries(analysis.stateData).forEach(([stateName, stateInfo]) => {
      const suggestedRate = smartDefaults.stateRates?.[stateName] || this.getMarketRate(stateName);
      
      console.log(`Setting up ${stateName}:`, {
        rate: suggestedRate,
        facilityCount: stateInfo.count,
        facilities: stateInfo.facilities.length
      });
      
      this.stateRates[stateName] = suggestedRate;
      this.centerCounts[stateName] = stateInfo.count;
    });
    
    // Update total centers in config
    this.config.centers = analysis.totalFacilities;
    
    // Save to localStorage
    setStorageItem(STORAGE_KEYS.STATE_RATES, this.stateRates);
    setStorageItem(STORAGE_KEYS.CONFIG, this.config);
    
    console.log('✅ Final state setup:');
    console.log('State rates:', this.stateRates);
    console.log('Center counts:', this.centerCounts);
    console.log('Total centers:', this.config.centers);
  }

  getMarketRate(stateName) {
    // Market intelligence - suggest 100% as baseline for all states
    // Let companies decide to adjust upward based on their market analysis
    return 100;  // Default 100% baseline for all states
  }

  getStateIntelligence(stateName) {
    // Updated market intelligence - emphasize 100% baseline approach
    const intelligence = {
      'Florida': 'Market analysis suggests 100% as baseline rate',
      'Georgia': 'Market analysis suggests 100% as baseline rate',
      'Texas': 'Market analysis suggests 100% as baseline rate',
      'North Carolina': 'Market analysis suggests 100% as baseline rate',
      'South Carolina': 'Market analysis suggests 100% as baseline rate',
      'Alabama': 'Market analysis suggests 100% as baseline rate',
      'Tennessee': 'Market analysis suggests 100% as baseline rate',
      'Virginia': 'Market analysis suggests 100% as baseline rate',
      'West Virginia': 'Market analysis suggests 100% as baseline rate',
      'Kentucky': 'Market analysis suggests 100% as baseline rate',
      'Mississippi': 'Market analysis suggests 100% as baseline rate',
      'Louisiana': 'Market analysis suggests 100% as baseline rate'
    };
    
    return intelligence[stateName] || 'Market analysis suggests 100% as baseline rate';
  }

  showAutoPopulationMessage(analysis) {
    const existingMessage = document.querySelector('.auto-population-message');
    if (existingMessage) existingMessage.remove();
    
    const messageHTML = `
      <div class="auto-population-message" style="
        background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        border: 2px solid #22c55e;
        border-radius: 1rem;
        padding: 1.5rem;
        margin: 1rem 0;
        animation: slideIn 0.5s ease-out;
      ">
        <h4 style="margin: 0 0 0.5rem; color: #15803d; display: flex; align-items: center; gap: 0.5rem;">
          ✨ Smart Setup Complete
        </h4>
        <p style="margin: 0; color: #166534; line-height: 1.5;">
          Automatically configured <strong>${analysis.states.length} states</strong> with 
          <strong>${analysis.totalFacilities} facilities</strong> using market-optimized rates. 
          You can adjust any rates above before continuing.
        </p>
      </div>
    `;
    
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.insertAdjacentHTML('afterend', messageHTML);
      
      // Auto-remove message after 8 seconds
      setTimeout(() => {
        const message = document.querySelector('.auto-population-message');
        if (message) {
          message.style.transition = 'opacity 0.5s ease-out';
          message.style.opacity = '0';
          setTimeout(() => message.remove(), 500);
        }
      }, 8000);
    }
  }

  addSmartSuggestions(analysis) {
    // Add suggestions panel
    const suggestionsHTML = `
      <div class="smart-suggestions" style="
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border: 2px solid #0ea5e9;
        border-radius: 1rem;
        padding: 1.5rem;
        margin: 1rem 0;
      ">
        <h4 style="margin: 0 0 1rem; color: #0c4a6e;">💡 Smart Suggestions</h4>
        <div class="suggestion-grid" style="display: grid; gap: 1rem;">
          ${this.generateSuggestions(analysis)}
        </div>
      </div>
    `;
    
    const configSection = document.querySelector('.configuration-section');
    if (configSection) {
      configSection.insertAdjacentHTML('beforeend', suggestionsHTML);
    }
  }

  generateSuggestions(analysis) {
    const suggestions = [];
    
    if (analysis.isMultiState) {
      suggestions.push(`
        <div class="suggestion-item">
          <strong>Multi-State Portfolio:</strong> Consider state-specific competitive positioning. 
          Less competitive states can support higher rates.
        </div>
      `);
    }
    
    if (analysis.totalFacilities > 10) {
      suggestions.push(`
        <div class="suggestion-item">
          <strong>Large Portfolio:</strong> Your ${analysis.totalFacilities} facilities provide 
          significant volume leverage for favorable rate negotiations.
        </div>
      `);
    }
    
    const highVolumeStates = Object.entries(analysis.stateData)
      .filter(([_, data]) => data.count >= 5)
      .map(([state, _]) => state);
    
    if (highVolumeStates.length > 0) {
      suggestions.push(`
        <div class="suggestion-item">
          <strong>Volume Leverage:</strong> ${highVolumeStates.join(', ')} have sufficient 
          volume to support competitive rate negotiations.
        </div>
      `);
    }
    
    return suggestions.join('');
  }

  getStateRates() {
    return this.stateRates;
  }

  setStateRate(state, rate) {
    this.stateRates[state] = clamp(rate, CONFIG.MIN_RATE, CONFIG.MAX_RATE);
    setStorageItem(STORAGE_KEYS.STATE_RATES, this.stateRates);
  }

  removeState(state) {
    delete this.stateRates[state];
    delete this.centerCounts[state];
    setStorageItem(STORAGE_KEYS.STATE_RATES, this.stateRates);
  }

  getConfig() {
    return this.config;
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
    setStorageItem(STORAGE_KEYS.CONFIG, this.config);
  }

  getAverageRate() {
    const rates = Object.values(this.stateRates);
    if (rates.length === 0) return CONFIG.DEFAULT_RATE;
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  }

  calculateProjections() {
    const { centers, baseline } = this.config;
    const avgRate = this.getAverageRate();
    const annualPerCenter = baseline * (avgRate / 100);
    
    const projections = {
      avgRate,
      annualPerCenter,
      projections: {
        one: {
          perCenter: annualPerCenter,
          total: annualPerCenter * centers
        },
        five: {
          perCenter: annualPerCenter * 5,
          total: annualPerCenter * 5 * centers
        },
        ten: {
          perCenter: annualPerCenter * 10,
          total: annualPerCenter * 10 * centers
        }
      }
    };
    
    this.currentProjections = projections;
    return projections;
  }

  // Enhanced save method - goes to confirmation instead of facilities
  saveAndContinue() {
    console.log('💾 Saving multi-center configuration...');
    
    // Validate configuration
    if (Object.keys(this.stateRates).length === 0) {
      this.showError('Please configure at least one state before continuing.');
      return;
    }
    
    // Save configuration
    const config = {
      stateRates: this.stateRates,
      centerCounts: this.centerCounts,
      projections: this.currentProjections,
      timestamp: Date.now()
    };
    
    setStorageItem(STORAGE_KEYS.SELECTION, config);
    setStorageItem(STORAGE_KEYS.STATE_RATES, this.stateRates);
    
    console.log('✅ Configuration saved:', config);
    
    // Navigate to confirmation page (NOT facilities)
    window.location.href = '/providers/onboarding/confirmation';
  }

  showError(message) {
    console.error(message);
    // Could integrate with UI manager's setStatus method if available
  }
}

// Enhanced UI Manager with Smart State Support
class SmartUIManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.currentPeriod = this.stateManager.getConfig().period || 'five';
    this.initializeElements();
    this.setupEventListeners();
    this.render();
  }

  initializeElements() {
    // State controls
    this.stateSelector = $('#state-selector');
    this.addStateBtn = $('#add-state-btn');
    this.stateList = $('#state-list');
    this.emptyState = $('#empty-state');
    this.bulkRateInput = $('#bulk-rate');
    this.bulkApplyBtn = $('#bulk-apply-btn');

    // Projection controls
    this.periodToggle = $('#period-toggle');
    this.centersInput = $('#centers-input');
    this.baselineInput = $('#baseline-input');

    // Projection display
    this.featuredPeriod = $('#featured-period');
    this.featuredAmount = $('#featured-amount');
    this.annualAmount = $('#annual-amount');
    this.monthlyAmount = $('#monthly-amount');
    this.portfolioBox = $('#portfolio-box');
    this.portfolioSub = $('#portfolio-sub');
    this.portfolioPeriod = $('#portfolio-period');
    this.portfolioAmount = $('#portfolio-amount');

    // Actions
    this.saveContinueBtn = $('#save-continue-btn');
    this.statusMessage = $('#status-message');

    // Populate state selector
    this.populateStateSelector();
    
    // Set initial values and make centers input read-only
    const config = this.stateManager.getConfig();
    if (this.centersInput) {
      this.centersInput.value = config.centers;
      this.centersInput.readOnly = true;
      this.centersInput.classList.add('readonly-input');
    }
    if (this.baselineInput) this.baselineInput.value = config.baseline;
  }

  populateStateSelector() {
    if (!this.stateSelector) return;
    
    // Clear existing options except the first placeholder
    this.stateSelector.innerHTML = '<option value="" disabled selected>Select a state</option>';
    
    const existingStates = Object.keys(this.stateManager.getStateRates());
    
    US_STATES.forEach(state => {
      if (!existingStates.includes(state)) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        this.stateSelector.appendChild(option);
      }
    });
  }

  setupEventListeners() {
    // Add state
    this.addStateBtn?.addEventListener('click', () => this.addState());
    
    // Bulk apply
    this.bulkApplyBtn?.addEventListener('click', () => this.bulkApplyRate());
    
    // Period toggle
    this.periodToggle?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-period]');
      if (btn) this.changePeriod(btn.dataset.period);
    });
    
    // Config inputs - only baseline input is editable now
    this.baselineInput?.addEventListener('input', () => this.updateConfig());
    
    // Save and continue - updated to use enhanced method
    this.saveContinueBtn?.addEventListener('click', () => this.stateManager.saveAndContinue());
  }

  addState() {
    if (!this.stateSelector) return;
    
    const selectedState = this.stateSelector.value;
    if (!selectedState) {
      this.setStatus('Please select a state', 'error');
      return;
    }

    if (this.stateManager.getStateRates()[selectedState]) {
      this.setStatus(`${selectedState} is already in your list`, 'error');
      return;
    }

    this.stateManager.setStateRate(selectedState, CONFIG.DEFAULT_RATE);
    this.populateStateSelector();
    this.renderStateList();
    this.updateProjections();
    this.setStatus(`Added ${selectedState} at ${CONFIG.DEFAULT_RATE}%`, 'success');
  }

  removeState(state) {
    this.stateManager.removeState(state);
    this.populateStateSelector();
    this.renderStateList();
    this.updateProjections();
    this.setStatus(`Removed ${state}`, 'success');
  }

  updateStateRate(state, rate) {
    this.stateManager.setStateRate(state, rate);
    this.updateProjections();
    this.renderStateProjection(state);
  }

  bulkApplyRate() {
    if (!this.bulkRateInput) return;
    
    const rate = parseFloat(this.bulkRateInput.value);
    if (!rate || rate < CONFIG.MIN_RATE || rate > CONFIG.MAX_RATE) {
      this.setStatus(`Please enter a rate between ${CONFIG.MIN_RATE}% and ${CONFIG.MAX_RATE}%`, 'error');
      return;
    }

    const states = Object.keys(this.stateManager.getStateRates());
    if (states.length === 0) {
      this.setStatus('Add some states first', 'error');
      return;
    }

    states.forEach(state => {
      this.stateManager.setStateRate(state, rate);
    });

    this.renderStateList();
    this.updateProjections();
    this.setStatus(`Applied ${rate}% to all ${states.length} states`, 'success');
    this.bulkRateInput.value = '';
  }

  changePeriod(period) {
    this.currentPeriod = period;
    this.stateManager.updateConfig({ period });
    
    // Update toggle buttons
    $$('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = $(`[data-period="${period}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    this.updateProjections(true);
  }

  updateConfig() {
    // Only baseline is editable now - centers is auto-detected and read-only
    const centers = this.stateManager.getConfig().centers; // Use existing auto-detected value
    const baseline = Math.max(50000, parseInt(this.baselineInput?.value) || CONFIG.DEFAULT_BASELINE);
    
    this.stateManager.updateConfig({ centers, baseline });
    this.updateProjections();
  }

  render() {
    this.renderStateList();
    this.updateProjections();
  }

  renderStateList() {
    if (!this.stateList || !this.emptyState) return;
    
    const stateRates = this.stateManager.getStateRates();
    const states = Object.keys(stateRates).sort();
    
    if (states.length === 0) {
      this.stateList.style.display = 'none';
      this.emptyState.style.display = 'block';
      return;
    }

    this.stateList.style.display = 'block';
    this.emptyState.style.display = 'none';
    
    this.stateList.innerHTML = states.map(state => this.createStateRow(state, stateRates[state])).join('');
    
    this.stateList.querySelectorAll('.rate-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const state = e.target.closest('.state-row').dataset.state;
        const rate = parseFloat(e.target.value) || CONFIG.DEFAULT_RATE;
        this.updateStateRate(state, rate);
      });
    });
  }

  createStateRow(state, rate) {
    const { baseline } = this.stateManager.getConfig();
    const annualRevenue = baseline * (rate / 100);
    const facilityCount = this.stateManager.centerCounts[state] || 1;
    const intelligence = this.stateManager.getStateIntelligence(state);
    
    console.log(`🏗️ Creating state row for ${state}:`, {
      rate,
      facilityCount,
      centerCounts: this.stateManager.centerCounts,
      intelligence
    });
    
    return `
      <div class="state-row" data-state="${state}">
        <div class="col-state">
          <div class="state-name">${state}</div>
          <div class="facility-count">${facilityCount} ${facilityCount === 1 ? 'facility' : 'facilities'}</div>
          <div class="state-intelligence">${intelligence}</div>
        </div>
        <div class="col-rate">
          <div class="rate-control">
            <input type="number" 
                   class="rate-input" 
                   min="${CONFIG.MIN_RATE}" 
                   max="${CONFIG.MAX_RATE}" 
                   value="${rate}" />
            <span class="rate-display">%</span>
          </div>
        </div>
        <div class="col-projected">
          <span class="projected-revenue" data-state-projection="${state}">
            ${formatCurrency(annualRevenue)}
          </span>
        </div>
      </div>
    `;
  }

  renderStateProjection(state) {
    const rate = this.stateManager.getStateRates()[state];
    const { baseline } = this.stateManager.getConfig();
    const annualRevenue = baseline * (rate / 100);
    
    const projectionEl = $(`[data-state-projection="${state}"]`);
    if (projectionEl) {
      projectionEl.textContent = formatCurrency(annualRevenue);
    }
  }

  updateProjections(animate = false) {
    const { avgRate, annualPerCenter, projections } = this.stateManager.calculateProjections();
    const { centers } = this.stateManager.getConfig();
    
    // Update period labels
    const periodLabels = {
      one: '1-Year Total',
      five: '5-Year Total', 
      ten: '10-Year Total'
    };
    
    if (this.featuredPeriod) this.featuredPeriod.textContent = periodLabels[this.currentPeriod];
    if (this.portfolioPeriod) this.portfolioPeriod.textContent = periodLabels[this.currentPeriod];
    
    // Update amounts
    const currentProjection = projections[this.currentPeriod];
    
    if (animate && this.featuredAmount) {
      const currentAmount = parseFloat(this.featuredAmount.textContent.replace(/[^0-9.-]/g, '')) || 0;
      animateNumber(this.featuredAmount, currentAmount, currentProjection.perCenter);
      
      if (centers > 1 && this.portfolioAmount) {
        const currentPortfolio = parseFloat(this.portfolioAmount.textContent.replace(/[^0-9.-]/g, '')) || 0;
        animateNumber(this.portfolioAmount, currentPortfolio, currentProjection.total);
      }
    } else {
      if (this.featuredAmount) this.featuredAmount.textContent = formatCurrency(currentProjection.perCenter);
      if (this.portfolioAmount) this.portfolioAmount.textContent = formatCurrency(currentProjection.total);
    }
    
    if (this.annualAmount) this.annualAmount.textContent = formatCurrency(annualPerCenter);
    if (this.monthlyAmount) this.monthlyAmount.textContent = formatCurrency(annualPerCenter / 12);
    
    // Show/hide portfolio section
    if (this.portfolioBox && this.portfolioSub) {
      if (centers > 1) {
        this.portfolioBox.style.display = 'block';
        this.portfolioSub.textContent = `All ${centers} centers combined`;
      } else {
        this.portfolioBox.style.display = 'none';
      }
    }
  }

  setStatus(message, type = 'info') {
    if (!this.statusMessage) return;
    
    this.statusMessage.textContent = message;
    this.statusMessage.className = `status-message status-${type}`;
    
    // Clear status after 5 seconds
    setTimeout(() => {
      this.statusMessage.textContent = '';
      this.statusMessage.className = 'status-message';
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  try {
    console.log('🚀 Smart Pricing-Multi initializing...');
    const stateManager = new SmartStateManager();
    const uiManager = new SmartUIManager(stateManager);
    
    // Make managers available globally for debugging
    window.stateManager = stateManager;
    window.uiManager = uiManager;
    
    console.log('✅ Multi-center pricing interface initialized with smart features');
  } catch (error) {
    console.error('Error initializing pricing interface:', error);
  }
});

// Add CSS for enhanced styling
const style = document.createElement('style');
style.textContent = `
  .facility-count {
    color: #64748b;
    font-size: 0.875rem;
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    margin-top: 0.25rem;
  }
  
  .state-intelligence {
    color: #64748b;
    font-size: 0.75rem;
    line-height: 1.4;
    margin-top: 0.5rem;
    font-style: italic;
  }
  
  .suggestion-item {
    background: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #e0f2fe;
    font-size: 0.875rem;
    line-height: 1.4;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);