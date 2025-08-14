// src/scripts/providers/market-calculator/modules/uiManager.js

export class UIManager {
  constructor(config) {
    this.config = config;
    this.elements = {};
    this.period = localStorage.getItem('usrad_market_period') || 'fiveYear'; // oneYear|fiveYear|tenYear
  }

  initialize() {
    this.elements = {
      loadingState: document.getElementById('loading-state'),
      resultsGrid: document.getElementById('results-grid'),
      revenueProjection: document.getElementById('revenue-projection'),
      volumeIndicator: document.getElementById('volume-indicator'),
      volumeBar: document.querySelector('.volume-bar'),
      volumeLabel: document.querySelector('.volume-label')
    };

    this.setupEventListeners();
    this.ensureProjectionUI(); // build enhanced UI once
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
    this.elements.loadingState.innerHTML = `<p style="color:#EF4444;">${this.config.UI_TEXT.ERROR}</p>`;
  }

  hideResults() {
    this.elements.resultsGrid.style.display = 'none';
    this.elements.revenueProjection.style.display = 'none';
    const btn = document.getElementById('accept-rates-btn');
    if (btn) btn.disabled = true;
  }

  // Build the enhanced revenue projection block + period toggle once
  ensureProjectionUI() {
    const host = this.elements.revenueProjection;
    if (!host || host.dataset.enhanced === '1') return;

    host.dataset.enhanced = '1';
    host.style.display = 'block';
    host.innerHTML = `
      <div class="revenue-projection-card revenue-projection-enhanced">
        <div class="projection-header">
          <h3>Your Revenue Potential</h3>
          <span class="per-center-label">Per Center</span>
        </div>

        <div class="projection-toggle" role="tablist" aria-label="Projection period">
          <button class="toggle-btn" data-years="1">1 Year</button>
          <button class="toggle-btn" data-years="5">5 Years</button>
          <button class="toggle-btn" data-years="10">10 Years</button>
        </div>

        <div class="projection-featured">
          <div class="time-period">5-Year Total</div>
          <div class="amount-large" data-val="0">$0</div>
        </div>

        <div class="projection-breakdown">
          <div class="metric" data-k="annual">
            <span>Annual</span>
            <strong data-val="0">$0</strong>
          </div>
          <div class="metric" data-k="monthly">
            <span>Monthly Avg</span>
            <strong data-val="0">$0</strong>
          </div>
        </div>

        <div class="portfolio-total" style="display:none;">
          <div class="total-label">All Centers (5 Years)</div>
          <div class="total-amount" data-val="0">$0</div>
          <div class="impact-message">Total partnership value</div>
        </div>
      </div>
    `;

    // toggle behavior
    host.querySelector('.projection-toggle').addEventListener('click', (e) => {
      const btn = e.target.closest('.toggle-btn');
      if (!btn) return;
      const val = btn.getAttribute('data-years');
      this.period = val === '1' ? 'oneYear' : val === '10' ? 'tenYear' : 'fiveYear';
      localStorage.setItem('usrad_market_period', this.period);
      this.setActiveToggle();
      // Re-render with last known numbers (trigger a synthetic reflow by reusing last detail if available)
      if (this._lastDetail) this.renderProjections(this._lastDetail);
    });

    this.setActiveToggle();
  }

  setActiveToggle() {
    const buttons = this.elements.revenueProjection.querySelectorAll('.projection-toggle .toggle-btn');
    buttons.forEach(b => b.classList.remove('active'));
    const key = this.period === 'oneYear' ? '1' : this.period === 'tenYear' ? '10' : '5';
    const active = this.elements.revenueProjection.querySelector(`.toggle-btn[data-years="${key}"]`);
    if (active) active.classList.add('active');

    const tp = this.elements.revenueProjection.querySelector('.projection-featured .time-period');
    if (tp) tp.textContent = key === '1' ? '1-Year Total' : key === '10' ? '10-Year Total' : '5-Year Total';
  }

  displayResults({ results, percentage, volumeData }) {
    // Hide loading & show results grid (existing behavior)
    this.elements.loadingState.style.display = 'none';
    this.elements.resultsGrid.innerHTML = '';
    this.elements.resultsGrid.style.display = 'grid';

    let totalRate = 0;
    let count = 0;

    results.forEach((result) => {
      totalRate += result.yourRate;
      count++;
      const card = this.createResultCard(result);
      this.elements.resultsGrid.appendChild(card);
    });

    // Per-center base annual at selected % with volume
    const avgRate = totalRate / count;
    const baseAnnual = avgRate * volumeData.weeklyVolume * 52;

    // Cache last detail for toggle re-renders
    this._lastDetail = { baseAnnual };

    // Build per-center + portfolio projections
    this.renderProjections({ baseAnnual });
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

  renderProjections({ baseAnnual }) {
    const host = this.elements.revenueProjection;
    if (!host) return;

    // Facility count (localStorage "facilities" array); default 1
    const facilityCount = (() => {
      try {
        const list = JSON.parse(localStorage.getItem('facilities') || '[]');
        return (Array.isArray(list) && list.length) ? list.length : 1;
      } catch { return 1; }
    })();

    // inside UIManager.renderProjections
var calc = (window && window.marketCalculator) ? window.marketCalculator.rateCalculator : null;
var projections = (calc && typeof calc.calculateProjections === 'function')
  ? calc.calculateProjections(baseAnnual, facilityCount)
  : {
      oneYear: { perCenter: baseAnnual, total: baseAnnual * facilityCount },
      fiveYear: { perCenter: baseAnnual * 5, total: baseAnnual * 5 * facilityCount },
      tenYear: { perCenter: baseAnnual * 10, total: baseAnnual * 10 * facilityCount }
    };


    // Update featured total (per-center)
    const featured = host.querySelector('.amount-large');
    this.animateMoney(featured, projections[this.period].perCenter);

    // Annual + Monthly (per-center)
    const annualEl = host.querySelector('.projection-breakdown .metric[data-k="annual"] strong');
    const monthlyEl = host.querySelector('.projection-breakdown .metric[data-k="monthly"] strong');
    this.animateMoney(annualEl, baseAnnual);
    this.animateMoney(monthlyEl, baseAnnual / 12);

    // Portfolio section (only if >1)
    const wrap = host.querySelector('.portfolio-total');
    if (facilityCount > 1) {
      wrap.style.display = 'block';
      const years =
        this.period === 'oneYear' ? '1 Year' :
        this.period === 'tenYear' ? '10 Years' : '5 Years';
      const label = wrap.querySelector('.total-label');
      const amt = wrap.querySelector('.total-amount');
      label.textContent = `All ${facilityCount} Centers (${years})`;
      this.animateMoney(amt, projections[this.period].total);
    } else {
      wrap.style.display = 'none';
    }
  }

  // Simple 300ms money animation
  animateMoney(el, to) {
    if (!el) return;
    const from = parseFloat(el.getAttribute('data-val') || '0');
    const start = performance.now();
    const dur = 300;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const v = from + (to - from) * p;
      el.textContent = v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      if (p < 1) requestAnimationFrame(tick); else el.setAttribute('data-val', String(Math.round(to)));
    };
    requestAnimationFrame(tick);
  }

  updateVolumeIndicator(volumeData) {
    if (!this.elements.volumeBar || !this.elements.volumeLabel) return;

    this.elements.volumeBar.style.width = `${volumeData.width}%`;

    let color;
    if (volumeData.max <= 100) color = "linear-gradient(90deg, #34D399 0%, #10B981 100%)";
    else if (volumeData.max <= 110) color = "linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%)";
    else if (volumeData.max <= 120) color = "linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%)";
    else color = "linear-gradient(90deg, #F87171 0%, #EF4444 100%)";

    this.elements.volumeBar.style.background = color;
    this.elements.volumeLabel.textContent = volumeData.label;
  }
}
