// src/scripts/providers/confirmation/modules/exhibitBManager.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class ExhibitBManager {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.modal = null;
  }

  preview() {
    this.modal = document.getElementById(this.config.elements.exhibitModal);
    // Use StorageHelpers.load instead of getItem
    const centers = StorageHelpers.load(this.config.storageKeys.centers, []);
    
    this.renderExhibit(centers);
    this.modal.style.display = 'flex';
  }

  renderExhibit(centers) {
    const exhibitList = document.getElementById(this.config.elements.exhibitCentersList);
    
    if (!centers || centers.length === 0) {
      exhibitList.innerHTML = '<div class="empty-state">No centers to display</div>';
      return;
    }
    
    exhibitList.innerHTML = centers.map((center, index) => `
      <div class="exhibit-center">
        <div class="exhibit-center-header">
          CENTER ${index + 1}: ${center.name.toUpperCase()}
        </div>
        <div class="exhibit-center-detail">
          Address: ${center.address}, ${center.city}, ${center.state} ${center.zipCode}<br>
          Phone: ${center.phone}<br>
          Administrator: ${center.administrator.name}<br>
          Contact: ${center.administrator.email} | ${center.administrator.phone}<br>
          Equipment: ${center.equipment ? center.equipment.join(', ') : 'N/A'}<br>
          ${center.isPrimary ? 'PRIMARY LOCATION' : ''}
        </div>
      </div>
    `).join('');
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }
}