// src/scripts/providers/confirmation/modules/exhibitBManager.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class ExhibitBManager {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.modal = null;
    this.facilities = [];
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.searchTerm = '';
    this.filterState = 'all';
    this.modalOpen = false;
  }

  // Initialize the manager
  init() {
    this.attachEventListeners();
  }

  // Preview Exhibit B with enhanced features for large facility counts
  preview() {
    this.modalOpen = true;
    this.modal = document.getElementById(this.config.elements.exhibitModal);
    
    // Load facilities using StorageHelpers
    this.facilities = StorageHelpers.load(this.config.storageKeys.centers, []);
    
    // If no facilities in provider_centers, try facilities key
    if (this.facilities.length === 0) {
      this.facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
    }
    
    // If modal doesn't exist, create it
    if (!this.modal) {
      this.createModal();
      this.modal = document.getElementById(this.config.elements.exhibitModal);
    }
    
    this.renderPreview();
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Create the modal structure if it doesn't exist
  createModal() {
    const modalHtml = `
      <div id="${this.config.elements.exhibitModal}" class="modal-overlay">
        <div class="modal-container exhibit-b-container">
          <div class="modal-header">
            <h2>Exhibit B - Facility Details Preview</h2>
            <button class="close-modal" onclick="window.exhibitBManager.close()">
              <span>&times;</span>
            </button>
          </div>
          
          <div class="exhibit-b-content">
            <div id="${this.config.elements.exhibitCentersList}">
              <!-- Content will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // Render the preview based on facility count
  renderPreview() {
    const contentDiv = document.getElementById(this.config.elements.exhibitCentersList);
    if (!contentDiv) return;

    if (this.facilities.length <= 10) {
      this.renderSimplePreview(contentDiv);
    } else {
      this.renderEnhancedPreview(contentDiv);
    }
  }

  // Simple preview for small facility counts (original renderExhibit logic)
  renderSimplePreview(container) {
    if (!this.facilities || this.facilities.length === 0) {
      container.innerHTML = '<div class="empty-state">No centers to display</div>';
      return;
    }
    
    const html = `
      <div class="exhibit-header">
        <img src="/images/logo.svg" alt="U.S. Radiology" class="exhibit-logo">
        <h3>EXHIBIT B</h3>
        <p class="exhibit-subtitle">Provider Facility Information</p>
        <p class="facility-count-text">${this.facilities.length} Facilit${this.facilities.length === 1 ? 'y' : 'ies'} Listed</p>
      </div>
      
      <div class="exhibit-preview">
        <div class="exhibit-intro">
          The following facilities are included in this Provider Services Agreement:
        </div>
        ${this.facilities.map((center, index) => `
          <div class="exhibit-center">
            <div class="exhibit-center-header">
              CENTER ${index + 1}: ${center.name.toUpperCase()}
            </div>
            <div class="exhibit-center-detail">
              Address: ${center.address}, ${center.city}, ${center.state} ${center.zipCode}<br>
              Phone: ${center.phone || 'TBD'}<br>
              Administrator: ${center.administrator?.name || 'TBD'}<br>
              Contact: ${center.administrator?.email || 'TBD'} | ${center.administrator?.phone || 'TBD'}<br>
              ${center.equipment ? `Equipment: ${Array.isArray(center.equipment) ? center.equipment.join(', ') : center.equipment}<br>` : ''}
              ${center.isPrimary ? '<strong>PRIMARY LOCATION</strong>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary" onclick="window.exhibitBManager.close()">Close</button>
        <button class="btn-primary" onclick="window.exhibitBManager.download()">
          Download Facility List
        </button>
      </div>
    `;
    
    container.innerHTML = html;
  }

  // Enhanced preview for large facility counts
  renderEnhancedPreview(container) {
    const filteredFacilities = this.getFilteredFacilities();
    const paginatedFacilities = this.getPaginatedFacilities(filteredFacilities);
    const totalPages = Math.ceil(filteredFacilities.length / this.itemsPerPage);
    const states = [...new Set(this.facilities.map(f => f.state))].filter(Boolean).sort();

    const html = `
      <div class="exhibit-header">
        <img src="/images/logo.svg" alt="U.S. Radiology" class="exhibit-logo">
        <h3>EXHIBIT B</h3>
        <p class="exhibit-subtitle">Provider Facility Information</p>
        <p class="facility-count-text">${this.facilities.length} Total Facilit${this.facilities.length === 1 ? 'y' : 'ies'}</p>
      </div>
      
      <!-- Search and Filter Controls -->
      <div class="exhibit-controls">
        <div class="search-wrapper">
          <input type="text" 
                 id="exhibit-search" 
                 class="exhibit-search"
                 placeholder="Search facilities..." 
                 value="${this.searchTerm}">
        </div>
        
        <select id="exhibit-state-filter" class="exhibit-filter">
          <option value="all">All States (${states.length})</option>
          ${states.map(state => `
            <option value="${state}" ${this.filterState === state ? 'selected' : ''}>
              ${state} (${this.facilities.filter(f => f.state === state).length})
            </option>
          `).join('')}
        </select>
        
        <button class="btn-download" onclick="window.exhibitBManager.download()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download All
        </button>
      </div>
      
      <!-- Results Summary -->
      <div class="results-summary">
        ${this.searchTerm || this.filterState !== 'all' 
          ? `<p>Showing ${filteredFacilities.length} of ${this.facilities.length} facilities</p>` 
          : `<p>Showing ${((this.currentPage - 1) * this.itemsPerPage) + 1}-${Math.min(this.currentPage * this.itemsPerPage, filteredFacilities.length)} of ${filteredFacilities.length} facilities</p>`}
      </div>
      
      <!-- Facilities List -->
      <div class="exhibit-preview">
        <div class="exhibit-intro">
          The following facilities are included in this Provider Services Agreement:
        </div>
        ${paginatedFacilities.map((center, index) => `
          <div class="exhibit-center">
            <div class="exhibit-center-header">
              CENTER ${((this.currentPage - 1) * this.itemsPerPage) + index + 1}: ${center.name.toUpperCase()}
            </div>
            <div class="exhibit-center-detail">
              Address: ${center.address}, ${center.city}, ${center.state} ${center.zipCode}<br>
              Phone: ${center.phone || 'TBD'}<br>
              Administrator: ${center.administrator?.name || 'TBD'}<br>
              Contact: ${center.administrator?.email || 'TBD'} | ${center.administrator?.phone || 'TBD'}<br>
              ${center.equipment ? `Equipment: ${Array.isArray(center.equipment) ? center.equipment.join(', ') : center.equipment}<br>` : ''}
              ${center.isPrimary ? '<strong>PRIMARY LOCATION</strong>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Pagination -->
      ${totalPages > 1 ? this.renderPagination(totalPages, filteredFacilities.length) : ''}
      
      <div class="modal-footer">
        <button class="btn-secondary" onclick="window.exhibitBManager.close()">Close</button>
        <button class="btn-primary" onclick="window.exhibitBManager.confirmAll()">
          Confirm All ${this.facilities.length} Facilities
        </button>
      </div>
    `;
    
    container.innerHTML = html;
    this.attachSearchListeners();
  }

  // Get filtered facilities based on search and state filter
  getFilteredFacilities() {
    // Ensure facilities are loaded
    if (this.facilities.length === 0) {
      this.facilities = StorageHelpers.load(this.config.storageKeys.centers, []);
      if (this.facilities.length === 0) {
        this.facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
      }
    }
    
    let filtered = [...this.facilities];
    
    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(f => 
        (f.name || '').toLowerCase().includes(search) ||
        (f.address || '').toLowerCase().includes(search) ||
        (f.city || '').toLowerCase().includes(search) ||
        (f.state || '').toLowerCase().includes(search)
      );
    }
    
    // Apply state filter
    if (this.filterState !== 'all') {
      filtered = filtered.filter(f => f.state === this.filterState);
    }
    
    return filtered;
  }

  // Get paginated facilities
  getPaginatedFacilities(facilities) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return facilities.slice(start, end);
  }

  // Render pagination controls
  renderPagination(totalPages, totalItems) {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Add ellipsis if needed
    if (this.currentPage > 3) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(totalPages - 1, this.currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (this.currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return `
      <div class="pagination">
        <button 
          class="page-btn" 
          onclick="window.exhibitBManager.goToPage(${this.currentPage - 1})"
          ${this.currentPage === 1 ? 'disabled' : ''}>
          Previous
        </button>
        
        <div class="page-numbers">
          ${pages.map(page => 
            page === '...' 
              ? '<span class="page-ellipsis">...</span>'
              : `<button 
                   class="page-btn ${page === this.currentPage ? 'active' : ''}" 
                   onclick="window.exhibitBManager.goToPage(${page})">
                   ${page}
                 </button>`
          ).join('')}
        </div>
        
        <button 
          class="page-btn" 
          onclick="window.exhibitBManager.goToPage(${this.currentPage + 1})"
          ${this.currentPage === totalPages ? 'disabled' : ''}>
          Next
        </button>
      </div>
      
      <style>
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .page-numbers {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .page-btn {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
          min-width: 2.5rem;
        }
        
        .page-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }
        
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-btn.active {
          background: #1e40af;
          color: white;
          border-color: #1e40af;
        }
        
        .page-ellipsis {
          padding: 0 0.5rem;
          color: #9ca3af;
        }
      </style>
    `;
  }

  // Navigate to specific page
  goToPage(page) {
    // Ensure facilities are loaded
    if (this.facilities.length === 0) {
      this.facilities = StorageHelpers.load(this.config.storageKeys.centers, []);
      if (this.facilities.length === 0) {
        this.facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
      }
    }
    
    const filteredFacilities = this.getFilteredFacilities();
    const totalPages = Math.ceil(filteredFacilities.length / this.itemsPerPage);
    
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderPreview();
    }
  }

  // Attach search and filter listeners
  attachSearchListeners() {
    const searchInput = document.getElementById('exhibit-search');
    const stateFilter = document.getElementById('exhibit-state-filter');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.currentPage = 1; // Reset to first page
        this.renderPreview();
      });
    }
    
    if (stateFilter) {
      stateFilter.addEventListener('change', (e) => {
        this.filterState = e.target.value;
        this.currentPage = 1; // Reset to first page
        this.renderPreview();
      });
    }
  }

  // Download facility list
  download() {
    // Build CSV header
    const headers = ['Facility Name', 'Address', 'City', 'State', 'ZIP Code', 'Phone', 'Administrator Name', 'Administrator Email', 'Administrator Phone', 'Equipment', 'Primary Location'];
    const rows = [headers.join(',')];
    
    // Add each facility as a row
    this.facilities.forEach(facility => {
      const admin = facility.administrator || {};
      const row = [
        `"${facility.name || ''}"`,
        `"${facility.address || ''}"`,
        `"${facility.city || ''}"`,
        `"${facility.state || ''}"`,
        `"${facility.zipCode || ''}"`,
        `"${facility.phone || ''}"`,
        `"${admin.name || ''}"`,
        `"${admin.email || ''}"`,
        `"${admin.phone || ''}"`,
        `"${facility.equipment ? (Array.isArray(facility.equipment) ? facility.equipment.join(';') : facility.equipment) : ''}"`,
        `"${facility.isPrimary ? 'Yes' : 'No'}"`
      ];
      rows.push(row.join(','));
    });
    
    // Create CSV string
    const csv = rows.join('\n');
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `exhibit-b-facilities-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Confirm all facilities
  confirmAll() {
    // Ensure facilities are loaded
    if (this.facilities.length === 0) {
      this.facilities = StorageHelpers.load(this.config.storageKeys.centers, []);
      if (this.facilities.length === 0) {
        this.facilities = JSON.parse(localStorage.getItem('facilities') || '[]');
      }
    }
    
    alert(`All ${this.facilities.length} facilities have been confirmed for inclusion in Exhibit B.`);
    this.close();
  }

  // Close modal
  close() {
    // Try multiple ways to find and close the modal
    const modal = this.modal || document.getElementById(this.config.elements.exhibitModal) || document.querySelector('.modal-overlay');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    this.modalOpen = false;
    
    // Reset state
    this.currentPage = 1;
    this.searchTerm = '';
    this.filterState = 'all';
  }

  // Attach global event listeners
  attachEventListeners() {
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOpen) {
        this.close();
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.modal && e.target === this.modal) {
        this.close();
      }
    });
  }
}

// Create and initialize instance
const exhibitBManager = new ExhibitBManager();

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      exhibitBManager.init();
    });
  } else {
    // DOM is already ready
    exhibitBManager.init();
  }
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.exhibitBManager = exhibitBManager;
}