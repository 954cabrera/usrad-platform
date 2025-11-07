/**
 * SLIM MODAL CONTROLLER - X-RAY ENHANCED
 * ========================================
 * Final orchestrator that coordinates all modules
 * Now includes X-Ray view selection support
 * 
 * Phase 1: Business Logic (imported)
 * Phase 2: UI Rendering (imported)
 * Phase 3: Orchestration (this file)
 * 
 * Usage: Automatically initializes on DOMContentLoaded
 */

// ============================================
// PHASE 1: BUSINESS LOGIC IMPORTS
// ============================================
import { 
  detectModality, 
  getContrastConfig, 
  hasContrastOptions,
  type Modality,
  type ContrastType
} from '@/lib/procedures/utils/modality-detector';

import { 
  searchAllProcedures, 
  searchByCPT 
} from '@/lib/procedures/utils/search-engine';

import { 
  SelectionFlow,
  handleMRISelection
} from '@/lib/procedures/controllers/selection-flow';

// ============================================
// PHASE 2: UI RENDERING IMPORTS
// ============================================
import { 
  renderLoadingState,
  renderEmptySearchState,
  renderNoResults
} from '@/lib/procedures/ui/renderer-core';

import { 
  renderContrastSelection 
} from '@/lib/procedures/ui/contrast-renderer';

import { 
  renderRegionSelection,
  renderGroupedRegionSelection,
  renderCTGroupedSelection
} from '@/lib/procedures/ui/region-renderer';

import { 
  renderSearchResults 
} from '@/lib/procedures/ui/search-results-renderer';

import { 
  renderMRIGroupedSelection 
} from '@/lib/procedures/ui/mri-region-renderer';

import {
  resetMRIState,
  showMRIGroupedSelection
} from './mri-modal-integration';

// ============================================
// X-RAY VIEW SELECTION IMPORT (NEW!)
// ============================================
import { 
  renderXRayViewSelection,
  type ViewOption
} from '@/lib/procedures/ui/xray-view-renderer';

// ============================================
// CONTROLLER STATE
// ============================================

let selectionFlow: SelectionFlow;
let searchTimeout: NodeJS.Timeout;

const SEARCH_DEBOUNCE_MS = 300;

// ============================================
// CT STATE MANAGEMENT (NEW!)
// ============================================

/**
 * CT-specific state for category groups and progressive disclosure
 */
interface CTModalState {
  expandedGroups: Set<string>;           // 'standard', 'vascular', 'screening'
  expandedRegionGroups: Set<string>;     // 'Head & Neck', 'Torso', 'Spine'
  showAllInGroup: Set<string>;           // Track which groups show all items
}

/**
 * Initialize CT state with defaults
 * Standard CT and Head & Neck expanded by default per spec
 */
let ctState: CTModalState = {
  expandedGroups: new Set(), // ✅ Start collapsed
  expandedRegionGroups: new Set(),
  showAllInGroup: new Set()
};

/**
 * Reset CT state to defaults
 */
function resetCTState(): void {
  ctState = {
    expandedGroups: new Set(), // ✅ Reset to collapsed
    expandedRegionGroups: new Set(),
    showAllInGroup: new Set()
  };
  console.log('🔄 CT state reset');
}

// ============================================
// MRI STATE MANAGEMENT (ADD THIS)
// ============================================

interface MRIModalState {
  expandedGroups: Set<string>;
  expandedRegionGroups: Set<string>;
  showAllInGroup: Set<string>;
}

let mriState: MRIModalState = {
  expandedGroups: new Set(),
  expandedRegionGroups: new Set(),
  showAllInGroup: new Set()
};


// DOM Elements (cached for performance)
let modalOverlay: HTMLElement | null = null;
let modalBackdrop: HTMLElement | null = null;
let modalContent: HTMLElement | null = null;
let modalResults: HTMLElement | null = null;
let modalSearchInput: HTMLInputElement | null = null;
let modalCloseButton: HTMLElement | null = null;

// Hero form elements
let heroSearchInput: HTMLInputElement | null = null;
let selectedProcedureInput: HTMLInputElement | null = null;
let selectedCptInput: HTMLInputElement | null = null;

// ============================================
// INITIALIZATION
// ============================================

export function initializeSlimController() {
  console.log('🎯 Initializing Slim Modal Controller (X-Ray Enhanced)...');
  
  // Wait for ProcedureLibrary to load
  if (!window.ProcedureLibrary) {
    console.error('❌ ProcedureLibrary not loaded!');
    return;
  }
  
  // Cache DOM elements
  cacheElements();
  
  // Initialize selection flow
  selectionFlow = new SelectionFlow();
  
  // Attach event listeners
  attachModalListeners();
  attachSearchListeners();
  attachFormListeners();
  attachCTEventListeners();
  attachMRIEventListeners();
  
  console.log('✅ Slim Modal Controller ready (with X-Ray support)!');
}

/**
 * Cache all DOM elements for performance
 */
function cacheElements(): void {
  // Modal elements
  modalOverlay = document.getElementById('modal-search-overlay');
  modalBackdrop = document.getElementById('modal-backdrop');
  modalContent = document.getElementById('modal-content');
  modalResults = document.getElementById('modal-results');
  modalSearchInput = document.getElementById('modal-search-input') as HTMLInputElement;
  modalCloseButton = document.getElementById('modal-close-button');
  
  // Hero form elements
  heroSearchInput = document.getElementById('hero-procedure-search') as HTMLInputElement;
  selectedProcedureInput = document.getElementById('hero-selected-procedure') as HTMLInputElement;
  selectedCptInput = document.getElementById('hero-selected-cpt') as HTMLInputElement;
  
  console.log('✅ DOM elements cached');
}

// ============================================
// MODAL CONTROL
// ============================================

function openModal(): void {
  if (!modalOverlay || !modalSearchInput) return;
  
  // Copy search text from hero input
  if (heroSearchInput && modalSearchInput) {
    modalSearchInput.value = heroSearchInput.value;
  }
  
  // Show modal
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Trigger opening animation
  setTimeout(() => {
    modalOverlay?.classList.add('modal-opening');
  }, 10);
  
  // Focus search input
  setTimeout(() => {
    modalSearchInput?.focus();
    
    // Trigger search if there's text
    if (modalSearchInput?.value && modalSearchInput.value.length >= 2) {
      handleSearch(modalSearchInput.value);
    }
  }, 300);
  
  console.log('✅ Modal opened');
}

function closeModal(): void {
  if (!modalOverlay) return;
  
  // Trigger closing animation
  modalOverlay.classList.remove('modal-opening');
  modalOverlay.classList.add('modal-closing');
  
  setTimeout(() => {
    modalOverlay?.classList.add('hidden');
    modalOverlay?.classList.remove('modal-closing');
    document.body.style.overflow = '';
    
    // Reset selection flow
    selectionFlow.reset();
    
    // 🆕 Reset all modal state (CT + MRI)
    resetAllModalState();
    
    // Clear search input
    if (modalSearchInput) {
      modalSearchInput.value = '';
    }
    
    console.log('✅ Modal closed');
  }, 300);
}

/**
 * Reset all modality-specific state
 * 🆕 ADDED FOR MRI SUPPORT
 */
function resetAllModalState(): void {
  resetCTState();
  resetMRIState();
}

// ============================================
// SEARCH HANDLING
// ============================================

function handleSearch(query: string): void {
  if (!modalResults) return;
  
  // Empty query - show empty state
  if (!query || query.trim().length < 2) {
    modalResults.innerHTML = renderEmptySearchState();
    return;
  }
  
  // Show loading
  modalResults.innerHTML = renderLoadingState('Searching...');
  
  // Clear previous timeout
  clearTimeout(searchTimeout);
  
  // Debounced search
  searchTimeout = setTimeout(() => {
    performSearch(query.trim());
  }, SEARCH_DEBOUNCE_MS);
}

function performSearch(query: string): void {
  if (!modalResults) return;
  
  console.log('🔍 Searching for:', query);
  
  // Step 1: Check if it's a modality
  const modality = detectModality(query);
  
  if (modality) {
  console.log('✅ Detected modality:', modality);
  selectionFlow.setModality(modality);
  
  // X-RAY PATH: Skip contrast, go straight to region
  if (modality === 'X-Ray') {
    console.log('🔬 X-Ray detected - skipping contrast selection');
    showRegionSelection(modality);
    return;
  }
  
  // 🆕 CT PATH: Skip contrast, show category groups (Standard/Vascular/Screening)
  if (modality === 'CT') {
    console.log('🩺 CT detected - showing category groups');
    showRegionSelection(modality);  // This now shows the 3-tier CT UI
    return;
  }
  
  // 🆕 MRI PATH: Skip contrast, show three-tier selection (Standard/Vascular/Specialized)
  if (modality === 'MRI') {
    console.log('🧲 MRI detected - showing three-tier selection');
    showRegionSelection(modality);  // This now shows the 3-tier MRI UI
    return;
  }
  
  // OTHER MODALITIES: Show contrast selection first
  if (hasContrastOptions(modality)) {
    showContrastSelection(modality);
  } else {
    showRegionSelection(modality);
  }
  return;
}
  
  // Step 2: Comprehensive search
  const results = searchAllProcedures(query);
  
  if (results.length === 0) {
    modalResults.innerHTML = renderNoResults(query, ['knee', 'spine', 'brain', 'breast']);
    attachSuggestionListeners();
    return;
  }
  
  // Display results
  modalResults.innerHTML = renderSearchResults(results, query);
  attachResultListeners();
}

// ============================================
// VIEW TRANSITIONS
// ============================================

function showContrastSelection(modality: Modality): void {
  
  if (!modalResults) {
    console.log('🔴 modalResults is null! Exiting.');
    return;
  }
  
  // Clear search input
  if (modalSearchInput) {
    modalSearchInput.value = '';
  }
  
  // Get the current region from selection flow
  const state = selectionFlow.getState();
  const regionKey = state.region;
  
  let regionLabel = regionKey || 'Region';
  
  // For MRI, format camelCase keys to human-readable labels
  if (modality === 'MRI' && regionKey) {
    const labels: Record<string, string> = {
      'thoracicSpine': 'Thoracic Spine (Mid Back)',
      'cervicalSpine': 'Cervical Spine (Neck)',
      'lumbarSpine': 'Lumbar Spine (Low Back)',
      'brain': 'Brain',
      'orbitFaceNeck': 'Orbit, Face & Neck',
      'tmj': 'TMJ',
      'chest': 'Chest',
      'abdomen': 'Abdomen',
      'pelvis': 'Pelvis',
      'abdomenPelvis': 'Abdomen & Pelvis',
      'shoulder': 'Shoulder',
      'elbow': 'Elbow',
      'wrist': 'Wrist',
      'hip': 'Hip',
      'knee': 'Knee',
      'ankle': 'Ankle',
      'breast': 'Breast',
      'mraBrain': 'MRA Brain',
      'mrvHead': 'MRV Head',
      'mraNeck': 'MRA Neck',
      'mraChest': 'MRA Chest',
      'mraAbdomen': 'MRA Abdomen',
      'mraPelvis': 'MRA Pelvis',
      'mraRunoff': 'MRA Runoff',
      'mraSpine': 'MRA Spine'
    };
    regionLabel = labels[regionKey] || regionKey;
  }
  
  
  const html = renderContrastSelection(modality, true, regionLabel);
  
  
  modalResults.innerHTML = html;
  
  
  attachContrastListeners();
  
}

function showRegionSelection(modality: Modality, contrast?: ContrastType): void {
  if (!modalResults) return;
  
  // 🆕 For CT, use the CT-specific renderer with state
  if (modality === 'CT') {
    const html = renderCTGroupedSelection(modality, contrast, true, ctState);
    modalResults.innerHTML = html;
    attachRegionListeners();
    // CT events are handled by global listeners
    return;
  }

  // ADD MRI-specific rendering HERE:
  if (modality === 'MRI') {
    const html = renderMRIGroupedSelection(modality, contrast, true, mriState);
    modalResults.innerHTML = html;
    attachRegionListeners();
    return;
  }
  
  // Use grouped layout for other modalities
  const html = renderGroupedRegionSelection(modality, contrast, true);
  modalResults.innerHTML = html;
  attachRegionListeners();
}

// ============================================
// X-RAY VIEW SELECTION (NEW!)
// ============================================

/**
 * Show X-Ray view selection screen
 * @param region - Selected body region (e.g., "Chest", "Knee")
 */
function showXRayViewSelection(region: string): void {
  if (!modalResults) return;
  
  console.log('📸 Showing X-Ray view selection for:', region);
  
  // Get view options from ProcedureHelpers
  const viewOptions = window.ProcedureHelpers?.getViewOptions('X-Ray', region);
  
  if (!viewOptions || viewOptions.length === 0) {
    console.error('❌ No view options found for region:', region);
    modalResults.innerHTML = renderNoResults(region, ['chest', 'knee', 'spine']);
    return;
  }
  
  // CRITICAL: Check for single-view auto-resolve
  if (viewOptions.length === 1) {
    console.log('⚡ Single view detected - auto-resolving:', viewOptions[0].cpt);
    handleXRayViewSelection(viewOptions[0]);
    return;
  }
  
  // Render view selection screen
  const html = renderXRayViewSelection(region, viewOptions, true);
  modalResults.innerHTML = html;
  attachXRayViewListeners();
}

/**
 * Handle X-Ray view selection and resolve to final procedure
 * @param viewOption - Selected view option
 */
function handleXRayViewSelection(viewOption: ViewOption): void {
  console.log('✅ X-Ray view selected:', viewOption.label);
  
  // Create resolved procedure object
  const procedure = {
    cpt_code: viewOption.cpt,
    label: viewOption.label,
    patient_label: `${viewOption.label}\nCPT ${viewOption.cpt}`,
    badge_label: `CPT ${viewOption.cpt}`,
    description: viewOption.description,
    duration: viewOption.duration,
    prep: viewOption.prep,
    useCase: viewOption.useCase,
    category: selectionFlow.getState().region || 'X-Ray',
    icon: '📸'
  };
  
  handleProcedureSelection(procedure);
}

// ============================================
// EVENT LISTENER ATTACHMENT
// ============================================

function attachModalListeners(): void {
  // Open modal when clicking hero search input
  heroSearchInput?.addEventListener('focus', openModal);
  
  // Close modal button
  modalCloseButton?.addEventListener('click', closeModal);
  
  // Close on backdrop click
  modalBackdrop?.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function attachSearchListeners(): void {
  modalSearchInput?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value;
    handleSearch(query);
  });
}

function attachFormListeners(): void {
  // "Change" button to reopen modal
  const changeButton = document.getElementById('change-procedure-button');
  changeButton?.addEventListener('click', () => {
    openModal();
    if (modalSearchInput) modalSearchInput.value = '';
    if (modalResults) modalResults.innerHTML = renderEmptySearchState();
  });
}

function attachContrastListeners(): void {
  document.querySelectorAll('.contrast-option-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const contrastId = target.dataset.contrastId as ContrastType;
      
      console.log('✅ Contrast selected:', contrastId);
      selectionFlow.setContrast(contrastId);
      
      const state = selectionFlow.getState();
      
      // 🆕 CT PATH: Region already selected, so resolve immediately
      if (state.modality === 'CT' && state.region) {
        console.log('🩺 CT: Region + Contrast selected - resolving procedure');
        const procedure = selectionFlow.resolve();
        if (procedure) {
          handleProcedureSelection(procedure);
        } else {
          console.error('❌ Failed to resolve CT procedure:', state);
        }
        return;
      }
      
      // 🆕 MRI PATH: Handle both scenarios
      if (state.modality === 'MRI') {
        if (state.region) {
          // MRI: Region already selected, resolve with contrast
          console.log('🧲 MRI: Region + Contrast selected - resolving procedure');
          const procedure = selectionFlow.resolve();
          if (procedure) {
            handleProcedureSelection(procedure);
          } else {
            console.error('❌ Failed to resolve MRI procedure:', state);
          }
        } else {
          // MRI: Contrast selected first, now show regions
          console.log('🧲 MRI: Contrast selected - showing region selection');
          showRegionSelection(state.modality, contrastId);
        }
        return;
      }
      
      // Fallback: Try to resolve or show region selection
      console.log('📋 Attempting to resolve procedure for', state.modality);
      const procedure = selectionFlow.resolve();
      if (procedure) {
        handleProcedureSelection(procedure);
      } else {
        console.warn('⚠️ Could not resolve procedure - showing region selection');
        showRegionSelection(state.modality!, contrastId);
      }
    });
  });
  
  // Back button
  document.getElementById('back-to-search')?.addEventListener('click', () => {
    selectionFlow.reset();
    resetCTState(); // 🆕 Also reset CT state
    if (modalSearchInput) modalSearchInput.value = '';
    if (modalResults) modalResults.innerHTML = renderEmptySearchState();
  });
  
  // 🆕 Back button for CT: Return to region selection
  document.getElementById('back-to-regions-ct')?.addEventListener('click', () => {
    selectionFlow.clearContrast();
    showRegionSelection('CT');
  });
}

/**
 * Attach event listeners to region selection buttons
 */
function attachRegionListeners(): void {
  document.querySelectorAll('.region-option-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const regionLabel = target.dataset.regionLabel;
      const regionKey = target.dataset.regionKey;
      
      if (!regionLabel) return;
      
      console.log('✅ Region selected:', regionLabel, 'Key:', regionKey);
      
      const state = selectionFlow.getState();
      
      // X-RAY PATH
      if (state.modality === 'X-Ray') {
        console.log('🔬 X-Ray path - showing view selection');
        const keyToUse = regionKey || deriveRegionKey(regionLabel);
        showXRayViewSelection(keyToUse);
        return;
      }
      
      // CTA PATH
      if (state.modality === 'CT' && regionLabel.toUpperCase().includes('CTA')) {
        console.log('💓 CTA detected - resolving as direct procedure');
        
        const ctaProcedure = resolveCTAProcedure(regionLabel);
        
        console.log('🔍 CTA Procedure Object:', ctaProcedure);
        
        if (ctaProcedure) {
          handleProcedureSelection(ctaProcedure);
        } else {
          console.error('❌ Failed to resolve CTA procedure:', regionLabel);
        }
        return;
      }
      
// SCREENING PATH: Auto-resolve with pre-defined protocols
      if (state.modality === 'CT') {
        // Check if this is a screening procedure by explicit label/key matching
        const screeningLabels = [
          'Lung Cancer Screening',
          'Cardiac Calcium Score',
          'Virtual Colonoscopy',
          'Coronary CTA Screening',
          'Heart Screening',
          'screeningCoronary'  // ADD THIS - handle the key as well
        ];
        
        const isScreening = screeningLabels.some(label => regionLabel === label);
        
        if (isScreening) {
          console.log('Screening detected - resolving as direct procedure');
          const screeningProcedure = resolveScreeningProcedure(regionLabel);
          console.log('Screening Procedure Object:', screeningProcedure);
          if (screeningProcedure) {
            handleProcedureSelection(screeningProcedure);
          } else {
            console.error('Failed to resolve screening procedure:', regionLabel);
          }
          return;
        }
      }

      // CT (NON-CTA) PATH
      if (state.modality === 'CT') {
        console.log('🩺 CT (non-CTA) - setting region and showing contrast');
        selectionFlow.setRegion(regionLabel);
        showContrastSelection('CT');
        return;
      }
      
      // MRI PATH
      selectionFlow.setRegion(regionLabel);
      const procedure = selectionFlow.resolve();
      if (procedure) {
        handleProcedureSelection(procedure);
      }
    });
  });
  
  // ... rest of function
}

/**
 * Resolve CTA procedures directly by label
 */
function resolveCTAProcedure(label: string): any {
  console.log('🔍 Resolving CTA procedure:', label);
  
  const ctaMap: Record<string, { key: string; cpt: string }> = {
    'CTA Head & Neck': { key: 'ctaHeadNeck', cpt: '70496' },
    'CTA Chest': { key: 'ctaChest', cpt: '71275' },
    'CTA Coronary (Heart)': { key: 'ctaCoronary', cpt: '75574' },
    'CTA Abdomen': { key: 'ctaAbdomen', cpt: '74175' },
    'CTA Abdomen & Pelvis': { key: 'ctaAbdomen', cpt: '74175' },
    'CTA Extremities': { key: 'ctaExtremities', cpt: '73706' },
    'CTA Lower Extremity': { key: 'ctaExtremities', cpt: '73706' },
    'CTA Upper Extremity': { key: 'ctaExtremities', cpt: '73206' }
  };
  
  const ctaInfo = ctaMap[label];
  if (!ctaInfo) {
    console.error('❌ Unknown CTA procedure:', label);
    return null;
  }
  
  const ctProcedures = window.ProcedureLibrary?.CT;
  if (!ctProcedures) {
    console.error('❌ CT procedures not found in library');
    return null;
  }
  
  const ctaRegion = ctProcedures[ctaInfo.key];
  if (!ctaRegion || !ctaRegion.procedures) {
    console.error('❌ CTA region not found:', ctaInfo.key);
    return null;
  }
  
  const procedure = ctaRegion.procedures.find((p: any) => p.cpt === ctaInfo.cpt);
  if (!procedure) {
    console.error('❌ CTA procedure not found with CPT:', ctaInfo.cpt);
    return null;
  }
  
  console.log('✅ Resolved CTA procedure:', procedure.label, procedure.cpt);
  
  // 🆕 Return object matching handleProcedureSelection's expected format
  return {
    cpt_code: procedure.cpt,              // ✅ cpt_code (not cpt)
    patient_label: procedure.label,        // ✅ patient_label (not label)
    badge_label: `CPT ${procedure.cpt}`,   // ✅ badge_label (new)
    modality: 'CT',
    category: ctaRegion.category,
    icon: ctaRegion.icon,
    description: procedure.description || '',
    duration: procedure.duration || '',
    prep: procedure.prep || '',
    useCase: procedure.useCase || ''
  };
}

/**
 * Resolve CT Screening procedures directly by label
 * Screening procedures have pre-defined protocols, no contrast selection needed
 */
function resolveScreeningProcedure(label: string): any {
  console.log('Resolving screening procedure:', label);
  
  // Map screening labels to their procedure keys and CPT codes
  const screeningMap: Record<string, { key: string; cpt: string }> = {
    'Lung Cancer Screening': { key: 'screeningLung', cpt: '71271' },
    'Cardiac Calcium Score': { key: 'screeningCardiac', cpt: '75571' },
    'Virtual Colonoscopy': { key: 'screeningColon', cpt: '74263' },
    'Coronary CTA Screening': { key: 'screeningCoronary', cpt: '75574' },
    'Heart Screening': { key: 'screeningCoronary', cpt: '75574' },
    'screeningCoronary': { key: 'screeningCoronary', cpt: '75574' }
  };
  
  const screeningInfo = screeningMap[label];
  if (!screeningInfo) {
    console.error('Unknown screening procedure:', label);
    return null;
  }
  
  // Get the procedure from the library
  const ctProcedures = window.ProcedureLibrary?.CT;
  if (!ctProcedures) {
    console.error('CT procedures not found in library');
    return null;
  }
  
  const screeningRegion = ctProcedures[screeningInfo.key];
  if (!screeningRegion || !screeningRegion.procedures) {
    console.error('Screening region not found:', screeningInfo.key);
    return null;
  }
  
  // Find the specific procedure by CPT
  const procedure = screeningRegion.procedures.find((p: any) => p.cpt === screeningInfo.cpt);
  if (!procedure) {
    console.error('Screening procedure not found with CPT:', screeningInfo.cpt);
    return null;
  }
  
  console.log('Resolved screening procedure:', procedure.label, procedure.cpt);
  
  // Return object matching handleProcedureSelection's expected format
  return {
    cpt_code: procedure.cpt,
    patient_label: procedure.label,
    badge_label: `CPT ${procedure.cpt}`,
    modality: 'CT',
    category: screeningRegion.category,
    icon: screeningRegion.icon,
    description: procedure.description || '',
    duration: procedure.duration || '',
    prep: procedure.prep || '',
    useCase: procedure.useCase || ''
  };
}

// ============================================
// CT EVENT LISTENERS (NEW!)
// ============================================

/**
 * Attach CT-specific event listeners
 * These listen for custom events emitted by the CT UI components
 */
function attachCTEventListeners(): void {
  // Listen for category group toggle (Standard/Vascular/Screening)
  window.addEventListener('ct-toggle-group', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupId } = customEvent.detail;
    
    console.log('[CT] Toggle group event:', groupId);
    
    // ✅ ACCORDION BEHAVIOR: Only one tier open at a time
    if (ctState.expandedGroups.has(groupId)) {
      // If clicking the currently open group, close it
      ctState.expandedGroups.delete(groupId);
      console.log('[CT] Collapsed:', groupId);
    } else {
      // Close all other groups first, then open this one
      ctState.expandedGroups.clear();
      ctState.expandedGroups.add(groupId);
      console.log('[CT] Accordion - Closed all, Expanded:', groupId);
    }
    
    // Re-render with updated state
    const state = selectionFlow.getState();
    if (state.modality === 'CT') {
      showRegionSelection('CT', state.contrast || undefined);
    }
  });
  
  // Listen for region group toggle (Head & Neck, Torso, Spine)
  window.addEventListener('ct-toggle-region-group', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupName } = customEvent.detail;
    
    console.log('[CT] Toggle region group event:', groupName);
    
    // Toggle the region group in state
    if (ctState.expandedRegionGroups.has(groupName)) {
      ctState.expandedRegionGroups.delete(groupName);
    } else {
      ctState.expandedRegionGroups.add(groupName);
    }
    
    // Re-render with updated state
    const state = selectionFlow.getState();
    if (state.modality === 'CT') {
      showRegionSelection('CT', state.contrast || undefined);
    }
  });
  
  // Listen for "show more" button clicks (progressive disclosure)
  window.addEventListener('ct-show-more', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupName } = customEvent.detail;
    
    console.log('[CT] Show more event:', groupName);
    
    // Add to showAll set
    ctState.showAllInGroup.add(groupName);
    
    // Re-render with updated state
    const state = selectionFlow.getState();
    if (state.modality === 'CT') {
      showRegionSelection('CT', state.contrast || undefined);
    }
  });
  
  console.log('✅ CT event listeners attached');
}

// ============================================
// MRI EVENT LISTENERS (NEW!)
// ============================================

function attachMRIEventListeners(): void {
  // Listener 1: Toggle group
  window.addEventListener('mri-toggle-group', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupId } = customEvent.detail;
    
    console.log('🎯 [MRI] Toggle group event received:', groupId);
    console.log('🎯 [MRI] Current state before toggle:', mriState);
    
    // ✅ ACCORDION BEHAVIOR: Only one tier open at a time
    if (mriState.expandedGroups.has(groupId)) {
      // If clicking the currently open group, close it
      mriState.expandedGroups.delete(groupId);
      console.log('🎯 [MRI] Collapsed:', groupId);
    } else {
      // Close all other groups first, then open this one
      mriState.expandedGroups.clear();
      mriState.expandedGroups.add(groupId);
      console.log('🎯 [MRI] Accordion - Closed all, Expanded:', groupId);
    }
    
    console.log('🎯 [MRI] Current state after toggle:', mriState);
    
    const state = selectionFlow.getState();
    if (state.modality === 'MRI') {
      console.log('🎯 [MRI] Re-rendering with modality:', state.modality);
      showRegionSelection('MRI', state.contrast || undefined);
    }
  });
  
  // Listener 2: Toggle region group (with accordion behavior)
  window.addEventListener('mri-toggle-region-group', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupKey } = customEvent.detail;
    
    console.log('[MRI] Toggle region group event:', groupKey);
    
    // Accordion behavior: Close all other region groups, open only this one
    if (mriState.expandedRegionGroups.has(groupKey)) {
      // If clicking the already-open group, close it
      mriState.expandedRegionGroups.delete(groupKey);
      console.log('[MRI] Collapsed region group:', groupKey);
    } else {
      // Close all other region groups and open this one
      mriState.expandedRegionGroups.clear();
      mriState.expandedRegionGroups.add(groupKey);
      console.log('[MRI] Accordion - Closed all region groups, Expanded:', groupKey);
    }
    
    const state = selectionFlow.getState();
    if (state.modality === 'MRI') {
      showRegionSelection('MRI', state.contrast || undefined);
    }
  });
  
  // Listener 3: Show all regions
  window.addEventListener('mri-show-all-regions', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { groupKey } = customEvent.detail;
    
    console.log('[MRI] Show all regions event:', groupKey);
    
    mriState.showAllInGroup.add(groupKey);
    
    const state = selectionFlow.getState();
    if (state.modality === 'MRI') {
      showRegionSelection('MRI', state.contrast || undefined);
    }
  });
  
  // Listener 4: Region selected
  window.addEventListener('mri-region-selected', (e: Event) => {
    const customEvent = e as CustomEvent;
    const { regionKey, needsContrast, autoContrast } = customEvent.detail;
    
    console.log('[MRI] Region selected:', regionKey, 'needsContrast:', needsContrast);
    
    if (needsContrast) {
      selectionFlow.setModality('MRI');
      selectionFlow.setRegion(regionKey);
      showContrastSelection('MRI');
    } else {
      selectionFlow.setModality('MRI');
      selectionFlow.setRegion(regionKey);
      if (autoContrast) {
        selectionFlow.setContrast(autoContrast);
      }
      const result = selectionFlow.resolve();
      if (result) {
        handleProcedureSelection(result);
      }
    }
  });
  
  console.log('✅ MRI event listeners attached');  // ← ONLY ONE, AT THE VERY END
}  // ← ONLY ONE CLOSING BRACE

// ============================================
// X-RAY VIEW LISTENERS (NEW!)
// ============================================

/**
 * Derive region key from display label
 * Handles cases like "Lumbar Spine (Low Back)" → "lumbarSpine"
 */
function deriveRegionKey(label: string): string {
  // Remove parentheses content
  let clean = label.replace(/\([^)]*\)/g, '').trim();
  
  // Split into words
  const words = clean.split(/\s+/);
  
  // Convert to camelCase
  let camelCase = words[0].toLowerCase(); // First word lowercase
  for (let i = 1; i < words.length; i++) {
    // Capitalize first letter of each subsequent word
    camelCase += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  console.log('🔑 Derived key from "' + label + '" → "' + camelCase + '"');
  return camelCase;
}

/**
 * Attach event listeners to X-Ray view selection buttons
 */
function attachXRayViewListeners(): void {
  document.querySelectorAll('.xray-view-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const cpt = target.dataset.viewCpt;
      const label = target.dataset.viewLabel;
      
      if (!cpt || !label) {
        console.error('❌ Missing CPT or label on view button');
        return;
      }
      
      // Find the full view option from the library
      const region = selectionFlow.getState().region;
      if (!region) {
        console.error('❌ No region in state');
        return;
      }
      
      const viewOptions = window.ProcedureHelpers?.getViewOptions('X-Ray', region);
      const selectedView = viewOptions?.find(opt => opt.cpt === cpt);
      
      if (!selectedView) {
        console.error('❌ Could not find view option for CPT:', cpt);
        return;
      }
      
      handleXRayViewSelection(selectedView);
    });
  });
  
  // Back button (back to regions)
  document.getElementById('back-to-region')?.addEventListener('click', () => {
    selectionFlow.clearRegion();
    showRegionSelection('X-Ray');
  });
  
  document.getElementById('back-to-region-single')?.addEventListener('click', () => {
    selectionFlow.clearRegion();
    showRegionSelection('X-Ray');
  });
}

function attachResultListeners(): void {
  document.querySelectorAll('.comprehensive-result-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const cpt = target.dataset.comprehensiveCpt;
      const label = target.dataset.comprehensiveLabel;
      
      if (!cpt || !label) return;
      
      console.log('✅ Procedure selected from search:', label);
      handleDirectProcedureSelection(cpt, label);
    });
  });
  
  // Back button
  document.getElementById('back-to-empty-search')?.addEventListener('click', () => {
    selectionFlow.reset();
    if (modalSearchInput) modalSearchInput.value = '';
    if (modalResults) modalResults.innerHTML = renderEmptySearchState();
  });
}

function attachSuggestionListeners(): void {
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const suggestion = target.dataset.suggest;
      
      if (!suggestion || !modalSearchInput) return;
      
      modalSearchInput.value = suggestion;
      handleSearch(suggestion);
    });
  });
}



// ============================================
// PROCEDURE SELECTION
// ============================================

function handleProcedureSelection(procedure: any): void {
  const { cpt_code, patient_label, badge_label } = procedure;
  
  // Update hidden form fields
  if (selectedProcedureInput) selectedProcedureInput.value = cpt_code;
  if (selectedCptInput) selectedCptInput.value = cpt_code;
  
  // Update display
  renderSelectedProcedure(patient_label, badge_label);
  
  // Close modal and transition to Step 2
  closeModal();
  transitionToStep2();
  
  console.log('✅ Procedure selected:', patient_label);
}

function handleDirectProcedureSelection(cptCode: string, label: string): void {
  // Format: "Procedure Name\nCPT 12345"
  const [procedureName, cptBadge] = label.includes('\n') 
    ? label.split('\n') 
    : [label, `CPT ${cptCode}`];
  
  // Update hidden form fields
  if (selectedProcedureInput) selectedProcedureInput.value = cptCode;
  if (selectedCptInput) selectedCptInput.value = cptCode;
  
  // Update display
  renderSelectedProcedure(procedureName, cptBadge);
  
  // Close modal and transition to Step 2
  closeModal();
  transitionToStep2();
  
  console.log('✅ Direct selection:', label);
}

function renderSelectedProcedure(label: string, badgeText: string): void {
  const displayElement = document.getElementById('selected-procedure-display');
  if (!displayElement) return;
  
  displayElement.dataset.label = label;
  displayElement.dataset.badge = badgeText;
  displayElement.dataset.locked = '1';
  
  displayElement.innerHTML = `
    <div class="font-semibold text-gray-900 leading-tight">
      ${label}
    </div>
    <div class="text-xs font-semibold text-[#003087] flex items-center gap-1.5 mt-0.5 cpt-badge">
      <span class="text-sm leading-none opacity-90" style="transform: translateY(1px);">💎</span>
      <span class="tracking-wide">${badgeText}</span>
    </div>
  `;
}

// ============================================
// STEP TRANSITIONS
// ============================================

function transitionToStep2(): void {
  const step1Container = document.getElementById('step-1-container');
  const step2Container = document.getElementById('step-2-container');
  const progressFill = document.getElementById('progress-fill');
  
  if (!step1Container || !step2Container) return;
  
  step1Container.classList.add('step-fade-out');
  
  setTimeout(() => {
    step1Container.classList.add('hidden');
    step2Container.classList.remove('hidden');
    step2Container.classList.add('step-fade-in');
    
    // Update progress indicators
    document.getElementById('step-1-indicator')?.classList.remove('bg-[#003087]');
    document.getElementById('step-1-indicator')?.classList.add('bg-green-500');
    document.getElementById('step-2-indicator')?.classList.remove('bg-white/20', 'text-white/50');
    document.getElementById('step-2-indicator')?.classList.add('bg-[#003087]', 'text-white');
    document.getElementById('step-2-label')?.classList.remove('text-white/50');
    document.getElementById('step-2-label')?.classList.add('text-white');
    
    if (progressFill) {
      progressFill.style.width = '100%';
    }
    
    // Focus location input
    setTimeout(() => {
      const locationInput = document.getElementById('hero-location') as HTMLInputElement;
      locationInput?.focus();
    }, 100);
  }, 250);
  
  console.log('✅ Transitioned to Step 2');
}

// ============================================
// AUTO-INITIALIZATION
// ============================================

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Wait for ProcedureLibrary
    setTimeout(() => {
      initializeSlimController();
    }, 100);
  });
}

console.log('✅ Slim Modal Controller loaded (X-Ray Enhanced)');