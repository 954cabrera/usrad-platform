// src/scripts/providers/confirmation/modules/centersLoader.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class CentersLoader {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.centers = [];
    this.displayMode = 'auto';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.searchTerm = '';
    this.filterState = 'all';
  }

  load() {
    console.log('CentersLoader: Starting load...');
    
    // Always check both storage locations and use the one with more centers
    const providerCenters = StorageHelpers.load(this.config.storageKeys.centers, []);
    const facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    
    console.log('From provider_centers:', providerCenters.length);
    console.log('From facilities:', facilities.length);
    
    // Use whichever has more centers
    if (facilities.length > providerCenters.length) {
      this.centers = facilities;
      // Update provider_centers to match
      StorageHelpers.save(this.config.storageKeys.centers, facilities);
      console.log('Using facilities data and updating provider_centers');
    } else {
      this.centers = providerCenters;
    }
    
    console.log('Total centers loaded:', this.centers.length);
    
    // Update the UI elements
    this.updateStats();
    this.render();
    
    // Add CSS fixes for center display
    this.addDisplayStyles();
    
    // Force update the "Loading..." text
    setTimeout(() => {
      const loadingEl = document.querySelector('.centers-review .review-summary');
      if (loadingEl && this.centers.length > 0) {
        loadingEl.textContent = `${this.centers.length} centers to be included in agreement`;
      }
    }, 100);
    
    return this.centers;
  }

  addDisplayStyles() {
    if (document.getElementById('centers-display-fix')) return;
    
    const style = document.createElement('style');
    style.id = 'centers-display-fix';
    style.textContent = `
      /* Fix center number and name display */
      .review-section ol li {
        display: block !important;
        margin-bottom: 1.5rem;
      }
      
      .review-section ol li strong {
        display: block;
        margin-bottom: 0.25rem;
      }
      
      /* Ensure center details are properly formatted */
      .center-details,
      .review-section ol li > div {
        display: block;
        margin-left: 0;
        padding-left: 1.5rem;
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
      }
      
      /* Fix for inline display issues */
      .review-section .centers-review-content li {
        list-style-position: outside;
      }
    `;
    document.head.appendChild(style);
  }

  updateStats() {
    // Update centers count
    const centersCountElements = document.querySelectorAll('.centers-count, .stat-value');
    centersCountElements.forEach(el => {
      if (el.textContent.includes('center') || el.textContent === '0') {
        el.textContent = this.centers.length.toString();
      }
    });
    
    // Update "X centers" text
    const centerTextElements = Array.from(document.querySelectorAll('*')).filter(el => 
      el.textContent.match(/^\d+\s+centers?/) && !el.querySelector('*')
    );
    centerTextElements.forEach(el => {
      el.textContent = `${this.centers.length} centers`;
    });
    
    // Update the "Loading..." text to show actual count
    const loadingElements = document.querySelectorAll('.review-summary, .centers-summary');
    loadingElements.forEach(el => {
      if (el.textContent.includes('Loading') || el.textContent.includes('to be included')) {
        el.textContent = `${this.centers.length} centers to be included in agreement`;
      }
    });
    
    // Also check for any element with just "Loading..." text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.textContent.trim() === 'Loading...' && !el.querySelector('*')) {
        el.textContent = `${this.centers.length} centers to be included in agreement`;
      }
    });
    
    // Update states count
    if (this.centers.length > 0) {
      const states = [...new Set(this.centers.map(c => c.state).filter(Boolean))];
      const statesCountElements = document.querySelectorAll('.states-count');
      statesCountElements.forEach(el => {
        el.textContent = states.length.toString();
      });
    }
  }

  render() {
    const container = document.getElementById(this.config.elements.centersList) || 
                     document.querySelector('.centers-review-content');
    
    if (!container) return;

    // Clear loading state
    container.classList.remove('loading');
    
    // If no centers, show empty state
    if (this.centers.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No centers loaded. Please go back and add your imaging centers.</p>
        </div>
      `;
      return;
    }

    // Determine display mode based on center count
    const centerCount = this.centers.length;
    
    if (centerCount <= 5) {
      // Show all centers in detail
      this.renderDetailedView(container);
    } else if (centerCount <= 20) {
      // Show grid view
      this.renderGridView(container);
    } else {
      // Show summary view for large counts
      this.renderSummaryView(container);
    }
  }

  renderDetailedView(container) {
    const html = `
      <div class="centers-list detailed-view">
        ${this.centers.map((center, index) => `
          <div class="center-item">
            <div class="center-header">
              <span class="center-number">${index + 1}</span>
              <h4 class="center-name">${center.name || center.facilityName || 'Unnamed Center'}</h4>
              ${center.isPrimary ? '<span class="primary-badge">Primary</span>' : ''}
            </div>
            <div class="center-details">
              <p class="center-address">
                <span class="icon-location"></span>
                ${center.address}, ${center.city}, ${center.state} ${center.zipCode || center.zip_code}
              </p>
              ${center.phone ? `<p class="center-phone"><span class="icon-phone"></span> ${center.phone}</p>` : ''}
              ${center.administrator ? `
                <p class="center-admin">
                  <span class="icon-user"></span> 
                  ${center.administrator.name || 'TBD'} 
                  ${center.administrator.email ? `(${center.administrator.email})` : ''}
                </p>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.innerHTML = html;
  }

  renderGridView(container) {
    const html = `
      <div class="centers-summary-header">
        <h4>Your ${this.centers.length} Imaging Centers</h4>
        <p class="text-muted">Showing first 5 centers. View all in Exhibit B preview.</p>
      </div>
      <div class="centers-grid">
        ${this.centers.slice(0, 5).map((center, index) => `
          <div class="center-card">
            <div class="center-number">${index + 1}</div>
            <h5>${center.name || center.facilityName}</h5>
            <p>${center.city}, ${center.state}</p>
          </div>
        `).join('')}
      </div>
      ${this.centers.length > 5 ? `
        <div class="more-centers-notice">
          <p>+${this.centers.length - 5} more centers included in agreement</p>
        </div>
      ` : ''}
    `;
    container.innerHTML = html;
  }

  renderSummaryView(container) {
    // Group centers by state
    const centersByState = {};
    this.centers.forEach(center => {
      const state = center.state || 'Unknown';
      if (!centersByState[state]) {
        centersByState[state] = [];
      }
      centersByState[state].push(center);
    });

    const states = Object.keys(centersByState).sort();
    
    const html = `
      <div class="centers-summary large-count">
        <div class="summary-stats">
          <div class="stat-card">
            <h3>${this.centers.length}</h3>
            <p>Total Centers</p>
          </div>
          <div class="stat-card">
            <h3>${states.length}</h3>
            <p>States</p>
          </div>
          <div class="stat-card">
            <h3>${this.centers.filter(c => c.isPrimary).length}</h3>
            <p>Primary Locations</p>
          </div>
        </div>
        
        <div class="state-distribution">
          <h4>Geographic Distribution</h4>
          <div class="state-grid">
            ${states.slice(0, 6).map(state => `
              <div class="state-item">
                <span class="state-code">${state}</span>
                <span class="center-count">${centersByState[state].length} centers</span>
              </div>
            `).join('')}
            ${states.length > 6 ? `
              <div class="state-item more">
                <span>+${states.length - 6} more states</span>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="view-all-notice">
          <p><strong>All ${this.centers.length} centers are included in this agreement.</strong></p>
          <p class="text-muted">Click "Preview Exhibit B Format" below to view the complete facility list.</p>
        </div>
      </div>
    `;
    container.innerHTML = html;
  }
}

// Create instance
window.centersLoader = new CentersLoader();