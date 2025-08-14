// src/scripts/providers/market-calculator/modules/rateCalculator.js

export class RateCalculator {
  constructor(config) {
    this.config = config;
    this.currentRates = null;
    this.currentPercentage = 100;
    this.MIN = 90;
    this.MAX = 150;
  }

  initialize() {
    document.addEventListener('locationComplete', (e) => {
      this.calculateRates(e.detail);
    });

    const rateSlider = document.getElementById('rate-slider');
    if (rateSlider) {
      rateSlider.min = String(this.MIN);
      rateSlider.max = String(this.MAX);
      rateSlider.step = '1';

      const v = parseInt(rateSlider.value || '100', 10);
      this.currentPercentage = this._clamp(v);
      rateSlider.value = String(this.currentPercentage);

      rateSlider.addEventListener('input', (e) => {
        this.currentPercentage = this._clamp(parseInt(e.target.value, 10));
        this.updateVolumeIndicator();
        if (this.currentRates) this.displayResults();
      });
    }
  }

  _clamp(v) { return v < this.MIN ? this.MIN : (v > this.MAX ? this.MAX : v); }

  // Build candidate county strings for robustness
  _countyCandidates(countyDisplay, countyApi) {
    var candidates = [];
    function pushUnique(s) { if (s && candidates.indexOf(s) === -1) candidates.push(s); }

    // Preferred: api string from the option
    pushUnique(countyApi);
    // Strip trailing " County"
    if (countyDisplay) {
      var stripped = countyDisplay.replace(/\s+County$/i, '').trim();
      pushUnique(stripped);
      // As a last resort, original display
      pushUnique(countyDisplay);
    }
    return candidates;
  }

  async calculateRates(location) {
    var stateVal  = location && location.state  ? location.state  : '';
    var countyDis = location && location.county ? location.county : '';
    var countyApi = location && location.countyApi ? location.countyApi : '';

    document.dispatchEvent(new CustomEvent('calculationStarted'));

    try {
      const countyList = this._countyCandidates(countyDis, countyApi);

      const fetchForProc = async (proc) => {
        // try each county candidate until one responds OK
        let lastErr = null;
        for (let i = 0; i < countyList.length; i++) {
          const c = countyList[i];
          const url =
            this.config.ROUTES.PRICING_API +
            `?cpt=${encodeURIComponent(proc.cpt)}` +
            `&state=${encodeURIComponent(stateVal)}` +
            `&county=${encodeURIComponent(c)}`;

          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            return { ...data, displayName: proc.name };
          } else {
            lastErr = new Error(`Failed ${proc.cpt} with county="${c}" (${res.status})`);
          }
        }
        // if none worked, throw the last error
        throw lastErr || new Error(`Failed to fetch rates for ${proc.cpt}`);
      };

      const promises = this.config.PROCEDURES.map(fetchForProc);
      this.currentRates = await Promise.all(promises);
      this.displayResults();

      const btn = document.getElementById('accept-rates-btn');
      if (btn) btn.disabled = false;

    } catch (error) {
      console.error('Error calculating rates:', error);
      document.dispatchEvent(new CustomEvent('calculationError', { detail: { error: error.message } }));
    }
  }

  displayResults() {
    if (!this.currentRates) return;

    const results = this.currentRates.map((rate) => {
      const medicareRate  = rate.pricing.medicare_rate;
      const yourRate      = medicareRate * (this.currentPercentage / 100);
      const hospitalRate  = rate.pricing.hospital_estimate;
      const patientSavings = hospitalRate - yourRate;
      return { ...rate, yourRate, patientSavings };
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
    document.dispatchEvent(new CustomEvent('volumeUpdated', { detail: volumeData }));
    const pctEl = document.getElementById('rate-percentage');
    if (pctEl) pctEl.textContent = `${this.currentPercentage}%`;
  }

  getVolumeData() {
    const p = this.currentPercentage;
    const t = this.config.RATE_SLIDER.VOLUME_THRESHOLDS;
    if (p <= t.HIGH.max) return t.HIGH;
    if (p <= t.GOOD.max) return t.GOOD;
    if (p <= t.MODERATE.max) return t.MODERATE;
    return t.LOW;
  }

  getCurrentRateData() {
    const stateEl = document.querySelector('#state-select');
    const countyEl = document.querySelector('#county-select');
    const state = stateEl ? stateEl.value : '';
    const county = countyEl ? countyEl.value : '';
    return { percentage: this.currentPercentage, state, county, location: `${state}-${county}` };
  }

  calculateProjections(baseAnnualRevenue, facilityCount) {
    const by = (y) => ({ perCenter: baseAnnualRevenue * y, total: baseAnnualRevenue * y * facilityCount });
    return { oneYear: by(1), fiveYear: by(5), tenYear: by(10) };
  }
}
