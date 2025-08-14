// src/scripts/providers/market-calculator/modules/locationManager.js
export class LocationManager {
  constructor(config) {
    this.config = config || {};
    this.stateSelect = null;
    this.countySelect = null;
    this._boundHandleStateChange = this.handleStateChange.bind(this);
  }

  initialize() { this._wire(); }
  init()       { this._wire(); }

  _wire() {
    this.stateSelect  = document.getElementById('state-select');
    this.countySelect = document.getElementById('county-select');
    if (!this.stateSelect || !this.countySelect) return;

    // normal change wiring
    this.stateSelect.removeEventListener('change', this._boundHandleStateChange);
    this.stateSelect.addEventListener('change', this._boundHandleStateChange);

    // build county options for the current state
    if (this.stateSelect.value) this.updateCountyOptions(this.stateSelect.value);

    // 🔹 NEW: bootstrap if both already selected (no user change needed)
    this._bootstrapIfComplete();
  }

  _bootstrapIfComplete() {
    var stateVal  = this.stateSelect && this.stateSelect.value ? this.stateSelect.value : '';
    var countyVal = this.countySelect && this.countySelect.value ? this.countySelect.value : '';
    if (!stateVal || !countyVal) return;

    // Prefer API-safe value if present on the selected <option>
    var sel = this.countySelect.options[this.countySelect.selectedIndex];
    var countyApi = sel ? (sel.getAttribute('data-api') || countyVal) : countyVal;

    document.dispatchEvent(new CustomEvent('locationComplete', {
      detail: { state: stateVal, county: countyVal, countyApi: countyApi }
    }));
  }

  handleStateChange() {
    var state = this.stateSelect.value;
    this.updateCountyOptions(state);
    document.dispatchEvent(new CustomEvent('locationChanged', { detail: { state: state } }));
  }

  _toApiCounty(name) {
    if (!name) return '';
    var n = String(name);
    n = n.replace(/\s+County$/i, '');
    n = n.replace(/\s+/g, ' ');
    return n.trim();
  }

  updateCountyOptions(state) {
    var map = (this.config && this.config.COUNTY_DATA) ? this.config.COUNTY_DATA : {};
    var counties = map[state] || [];

    // reset and rebuild
    this.countySelect.innerHTML = '<option value="" disabled selected>Select county</option>';

    for (var i = 0; i < counties.length; i++) {
      var c = counties[i];
      var display = (c && typeof c === 'object') ? (c.name || c.label || String(c)) : String(c);
      var apiVal  = this._toApiCounty(display);

      var opt = document.createElement('option');
      opt.value = display;
      opt.textContent = display;
      opt.setAttribute('data-api', apiVal);
      this.countySelect.appendChild(opt);
    }

    // if no prior selection, pick first real county; otherwise keep user’s
    if (!this.countySelect.value && this.countySelect.options.length > 1) {
      this.countySelect.value = this.countySelect.options[1].value;
    }
  }
}
