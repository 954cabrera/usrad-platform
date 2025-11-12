/**
 * MRI MODAL CONTROLLER INTEGRATION
 * =================================
 * Handles MRI-specific state management and UI interactions
 * Integrates with the main modal-controller.ts
 * 
 * This file provides:
 * 1. MRI state management (expanded groups, regions)
 * 2. Event handlers for MRI UI interactions
 * 3. Integration hooks for modal-controller.ts
 */

import {
  renderMRIGroupedSelection,
  getDefaultMRIState,
  type MRIRenderState
} from '../ui/mri-region-renderer';

import {
  requiresContrastSelection,
  getAutoContrast,
  MRI_CATEGORY_GROUPS
} from '../utils/mri-category-config';

// ============================================
// MRI STATE MANAGEMENT
// ============================================

/**
 * Global MRI state for modal interactions
 */
let mriState: MRIRenderState = getDefaultMRIState();

/**
 * Reset MRI state to defaults
 */
export function resetMRIState(): void {
  mriState = getDefaultMRIState();
}

/**
 * Get current MRI state
 */
export function getMRIState(): MRIRenderState {
  return mriState;
}

// ============================================
// WINDOW FUNCTIONS FOR MRI UI INTERACTIONS
// ============================================

/**
 * Toggle MRI category group (Standard, Vascular, Specialized)
 */
export function toggleMRIGroup(groupId: string): void {
  if (mriState.expandedGroups.has(groupId)) {
    mriState.expandedGroups.delete(groupId);
  } else {
    mriState.expandedGroups.add(groupId);
    
    // Auto-expand first region group when category group opens
    if (groupId === 'standard') {
      mriState.expandedRegionGroups.add('head-&-spine');
    } else if (groupId === 'vascular') {
      mriState.expandedRegionGroups.add('brain-vessels');
    }
  }
  
  // Re-render MRI grouped selection
  showMRIGroupedSelection();
}

/**
 * Toggle MRI region group (Head & Spine, Body, etc.)
 */
export function toggleMRIRegionGroup(groupKey: string): void {
  if (mriState.expandedRegionGroups.has(groupKey)) {
    mriState.expandedRegionGroups.delete(groupKey);
  } else {
    mriState.expandedRegionGroups.add(groupKey);
  }
  
  // Re-render MRI grouped selection
  showMRIGroupedSelection();
}

/**
 * Show all regions in a group
 */
export function showAllMRIRegions(groupKey: string): void {
  mriState.showAllInGroup.add(groupKey);
  
  // Re-render MRI grouped selection
  showMRIGroupedSelection();
}

/**
 * Handle MRI region selection
 */
export function selectMRIRegion(regionKey: string): void {
  // Check if this region requires contrast selection
  const needsContrast = requiresContrastSelection(regionKey);
  
  if (needsContrast) {
    // Show contrast selection UI
    // This will be handled by the main modal-controller
    dispatchMRIRegionSelected(regionKey, true);
  } else {
    // Auto-resolve with predetermined contrast
    const autoContrast = getAutoContrast(regionKey);
    dispatchMRIRegionSelected(regionKey, false, autoContrast || undefined);
  }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Show MRI grouped selection UI
 */
export function showMRIGroupedSelection(contrast?: string): void {
  const modalContent = document.getElementById('procedure-modal-content');
  if (!modalContent) return;
  
  const html = renderMRIGroupedSelection('MRI', contrast, true, mriState);
  modalContent.innerHTML = html;
}

// ============================================
// EVENT DISPATCHING
// ============================================

/**
 * Dispatch MRI region selected event
 */
function dispatchMRIRegionSelected(
  regionKey: string,
  needsContrast: boolean,
  autoContrast?: string
): void {
  const event = new CustomEvent('mri-region-selected', {
    detail: {
      regionKey,
      needsContrast,
      autoContrast
    }
  });
  window.dispatchEvent(event);
}


console.log('MRI Modal Controller Integration loaded');