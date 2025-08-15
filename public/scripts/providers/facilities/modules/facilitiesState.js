// modules/facilitiesState.js - State management for facilities
import { StorageHelpers } from '../../shared/storage.js';

export class FacilitiesState {
  constructor() {
    this.centers = [];
    this.editingIndex = null;
  }

  loadFromStorage() {
    this.centers = StorageHelpers.getCentersData();
  }

  saveToStorage() {
    StorageHelpers.save(StorageHelpers.KEYS.PROVIDER_CENTERS, this.centers);
  }

  addCenter(center) {
    // If marking as primary, unmark others
    if (center.isPrimary) {
      this.centers.forEach((c) => (c.isPrimary = false));
    }
    this.centers.push(center);
    this.saveToStorage();
  }

  updateCenter(index, center) {
    // If marking as primary, unmark others
    if (center.isPrimary) {
      this.centers.forEach((c, i) => {
        if (i !== index) c.isPrimary = false;
      });
    }
    this.centers[index] = center;
    this.saveToStorage();
  }

  deleteCenter(index) {
    this.centers.splice(index, 1);
    this.saveToStorage();
  }

  getCenters() {
    return this.centers;
  }

  getCenter(index) {
    return this.centers[index];
  }

  getCenterCount() {
    return this.centers.length;
  }

  getUniqueStatesCount() {
    const states = new Set(this.centers.map((c) => c.state));
    return states.size;
  }

  setEditingIndex(index) {
    this.editingIndex = index;
  }

  getEditingIndex() {
    return this.editingIndex;
  }

  clearEditingIndex() {
    this.editingIndex = null;
  }
}