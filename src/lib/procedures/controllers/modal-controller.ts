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
  SelectionFlow 
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
  renderGroupedRegionSelection 
} from '@/lib/procedures/ui/region-renderer';

import { 
  renderSearchResults 
} from '@/lib/procedures/ui/search-results-renderer';

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
    
    // Clear search input
    if (modalSearchInput) {
      modalSearchInput.value = '';
    }
    
    console.log('✅ Modal closed');
  }, 300);
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
    
    // MRI/CT PATH: Show contrast selection or skip to region
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
  if (!modalResults) return;
  
  const html = renderContrastSelection(modality, true);
  modalResults.innerHTML = html;
  attachContrastListeners();
}

function showRegionSelection(modality: Modality, contrast?: ContrastType): void {
  if (!modalResults) return;
  
  // Use grouped layout for better UX
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
      
      // Show region selection
      showRegionSelection(selectionFlow.getState().modality!, contrastId);
    });
  });
  
  // Back button
  document.getElementById('back-to-search')?.addEventListener('click', () => {
    selectionFlow.reset();
    if (modalSearchInput) modalSearchInput.value = '';
    if (modalResults) modalResults.innerHTML = renderEmptySearchState();
  });
}

function attachRegionListeners(): void {
  document.querySelectorAll('.region-option-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const regionLabel = target.dataset.regionLabel;
      const regionKey = target.dataset.regionKey; // NEW: Get the actual key
      
      if (!regionLabel) return;
      
      console.log('✅ Region selected:', regionLabel, 'Key:', regionKey);
      selectionFlow.setRegion(regionLabel);
      
      // X-RAY PATH: Show view selection instead of resolving
      const state = selectionFlow.getState();
      if (state.modality === 'X-Ray') {
        console.log('🔬 X-Ray path - showing view selection');
        // Use regionKey if available, otherwise try to derive it from label
        const keyToUse = regionKey || deriveRegionKey(regionLabel);
        showXRayViewSelection(keyToUse);
        return;
      }
      
      // MRI/CT PATH: Resolve procedure directly
      const procedure = selectionFlow.resolve();
      if (procedure) {
        handleProcedureSelection(procedure);
      }
    });
  });
  
  // Back buttons
  document.getElementById('back-to-contrast')?.addEventListener('click', () => {
    selectionFlow.clearRegion();
    showContrastSelection(selectionFlow.getState().modality!);
  });
  
  document.getElementById('back-to-contrast-grouped')?.addEventListener('click', () => {
    selectionFlow.clearRegion();
    showContrastSelection(selectionFlow.getState().modality!);
  });
  
  // X-RAY: Back to search (no contrast to go back to)
  document.getElementById('back-to-search-xray')?.addEventListener('click', () => {
    selectionFlow.reset();
    if (modalSearchInput) modalSearchInput.value = '';
    if (modalResults) modalResults.innerHTML = renderEmptySearchState();
  });
}

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