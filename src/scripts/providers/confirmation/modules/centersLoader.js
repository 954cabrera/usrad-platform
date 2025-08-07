// src/scripts/providers/confirmation/modules/centersLoader.js
import { CONFIRMATION_CONFIG } from '../confirmation.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class CentersLoader {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
  }

  load() {
    // Use StorageHelpers.load instead of getItem
    const centers = StorageHelpers.load(this.config.storageKeys.centers, []);
    
    this.updateStats(centers);
    this.displayCenters(centers);
  }

  updateStats(centers) {
    const elements = this.config.elements;
    
    // Update counts
    document.getElementById(elements.totalCenters).textContent = centers.length;
    document.getElementById(elements.exhibitCount).textContent = centers.length;
    
    // Count unique states
    const states = new Set(centers.map(c => c.state));
    document.getElementById(elements.totalStates).textContent = states.size;
    
    // Count unique equipment types
    const equipment = new Set();
    centers.forEach(c => {
      if (c.equipment && Array.isArray(c.equipment)) {
        c.equipment.forEach(e => equipment.add(e));
      }
    });
    document.getElementById(elements.totalEquipment).textContent = equipment.size;
  }

  displayCenters(centers) {
    const centersList = document.getElementById(this.config.elements.centersList);
    
    if (!centers || centers.length === 0) {
      centersList.innerHTML = '<div class="empty-state">No centers added yet</div>';
      return;
    }
    
    centersList.innerHTML = centers.map((center, index) => `
      <div class="center-review-item ${center.isPrimary ? 'primary' : ''}">
        <div class="center-name">
          ${center.name} ${center.isPrimary ? 
            '<span style="color: #3B82F6; font-size: 0.75rem;">(Primary)</span>' : ''}
        </div>
        <div class="center-location">
          ${center.address}, ${center.city}, ${center.state} ${center.zipCode}
        </div>
        <div class="center-admin">
          Administrator: ${center.administrator.name} (${center.administrator.email})
        </div>
      </div>
    `).join('');
  }
}