// src/scripts/providers/market-calculator/modules/uiManager.js

export class UIManager {
  constructor(config) {
    this.config = config;
    this.elements = {};
  }

  initialize() {
    // Cache DOM elements
    this.elements = {
      loadingState: document.getElementById('loading-state'),
      resultsGrid: document.getElementById('results-grid'),
      revenueProjection: document.getElementById('revenue-projection'),
      volumeIndicator: document.getElementById('volume-indicator'),
      volumeBar: document.querySelector('.volume-bar'),
      volumeLabel: document.querySelector('.volume-label')
    };
    
    // Listen for events
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('calculationStarted', () => this.showLoading());
    document.addEventListener('calculationError', (e) => this.showError(e.detail.error));
    document.addEventListener('resultsReady', (e) => this.displayResults(e.detail));
    document.addEventListener('volumeUpdated', (e) => this.updateVolumeIndicator(e.detail));
    document.addEventListener('locationChanged', () => this.hideResults());
  }

  showLoading() {
    this.elements.loadingState.style.display = 'block';
    this.elements.resultsGrid.style.display = 'none';
    this.elements.revenueProjection.style.display = 'none';
    
    this.elements.loadingState.innerHTML = `
      <div class="spinner"></div>
      <p>${this.config.UI_TEXT.LOADING}</p>
    `;
  }

  showError(error) {
    this.elements.loadingState.innerHTML = `
      <p style="color: #EF4444;">${this.config.UI_TEXT.ERROR}</p>
    `;
  }

  hideResults() {
    this.elements.resultsGrid.style.display = 'none';
    this.elements.revenueProjection.style.display = 'none';
    document.getElementById('accept-rates-btn').disabled = true;
  }

  displayResults({ results, percentage, volumeData }) {
    // Hide loading
    this.elements.loadingState.style.display = 'none';
    
    // Clear and show results grid
    this.elements.resultsGrid.innerHTML = '';
    this.elements.resultsGrid.style.display = 'grid';
    
    let totalRate = 0;
    let count = 0;
    
    results.forEach((result) => {
      totalRate += result.yourRate;
      count++;
      
      const resultCard = this.createResultCard(result);
      this.elements.resultsGrid.appendChild(resultCard);
    });
    
    // Calculate and display revenue projection
    const avgRate = totalRate / count;
    this.displayRevenueProjection(avgRate, volumeData);
  }

  createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'procedure-result';
    card.innerHTML = `
      <div class="procedure-code">CPT ${result.procedure.cpt_code}</div>
      <div class="procedure-name">${result.displayName}</div>
      <div class="procedure-price">$${result.yourRate.toFixed(0)}</div>
      <div class="savings-label">Patient saves $${result.patientSavings.toFixed(0)}</div>
    `;
    return card;
  }

  displayRevenueProjection(avgRate, volumeData) {
    const annualRevenue = avgRate * volumeData.weeklyVolume * 52;
    
    document.getElementById('avg-rate').textContent = `$${avgRate.toFixed(0)}`;
    document.getElementById('est-volume').textContent = volumeData.range;
    document.getElementById('annual-revenue').textContent = 
      `$${annualRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    this.elements.revenueProjection.style.display = 'block';
  }

  updateVolumeIndicator(volumeData) {
    if (!this.elements.volumeBar || !this.elements.volumeLabel) return;
    
    // Update width
    this.elements.volumeBar.style.width = `${volumeData.width}%`;
    
    // Update color based on volume level
    let color;
    if (volumeData.max <= 100) {
      color = "linear-gradient(90deg, #34D399 0%, #10B981 100%)";
    } else if (volumeData.max <= 110) {
      color = "linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%)";
    } else if (volumeData.max <= 120) {
      color = "linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%)";
    } else {
      color = "linear-gradient(90deg, #F87171 0%, #EF4444 100%)";
    }
    
    this.elements.volumeBar.style.background = color;
    this.elements.volumeLabel.textContent = volumeData.label;
  }
}