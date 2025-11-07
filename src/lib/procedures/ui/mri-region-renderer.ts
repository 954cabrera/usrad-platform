/**
 * MRI REGION SELECTION RENDERER
 * ==============================
 * Renders MRI-specific three-tier selection UI
 * Follows the same architecture as CT module
 * 
 * Three Tiers:
 * 1. Standard MRI - requires contrast selection
 * 2. Vascular (MRA/MRV) - MRA auto-contrast, MRV has options
 * 3. Specialized - advanced protocols
 */

import type { Modality } from '../types';
import { getModalityIcon } from '../utils/modality-detector';
import { getIcon } from '../utils/icon-map';
import {
  renderSectionHeader,
  renderBreadcrumb,
  renderBackButton,
  renderGrid,
  wrapInContainer
} from './renderer-core';

import {
  MRI_CATEGORY_GROUPS,
  MRI_REGION_GROUPS,
  MRI_VASCULAR_GROUPS,
  MRI_SPECIALIZED_GROUPS,
  MRI_SPECIALIZED_ITEMS,
  MRI_DISPLAY_SETTINGS,
  requiresContrastSelection,
  getAutoContrast
} from '../utils/mri-category-config';

// ============================================
// MRI-SPECIFIC STATE INTERFACE
// ============================================

/**
 * State for MRI category groups and expansion
 */
export interface MRIRenderState {
  expandedGroups: Set<string>;
  expandedRegionGroups: Set<string>;
  showAllInGroup: Set<string>;
}

/**
 * Initialize default MRI state
 * Standard MRI and Head & Spine expanded by default
 */
export function getDefaultMRIState(): MRIRenderState {
  return {
    expandedGroups: new Set(),
    expandedRegionGroups: new Set(),
    showAllInGroup: new Set()
  };
}

// ============================================
// MAIN MRI GROUPED SELECTION RENDERER
// ============================================

/**
 * Render MRI-specific grouped selection with category groups
 * Supports Standard MRI, Vascular (MRA/MRV), and Specialized
 */
export function renderMRIGroupedSelection(
  modality: Modality,
  contrast?: string,
  showBreadcrumb: boolean = true,
  state?: MRIRenderState
): string {
  const renderState = state || getDefaultMRIState();
  const icon = getModalityIcon(modality);

  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb([
        modality,
        'Select Region',
        contrast || 'Contrast',
        'Complete'
      ], 1)
    : '';

  const header = renderSectionHeader(
    'Select MRI Scan Type',
    'Choose your scan category below',
    icon
  );

  const categoryGroupsHTML = renderMRICategoryGroups(renderState);

  const backButton = renderBackButton(
    contrast ? 'Back to contrast selection' : 'Back to search',
    contrast ? 'back-to-contrast-mri' : 'back-to-search-mri'
  );

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    <div class="mri-categories-container space-y-4">
      ${categoryGroupsHTML}
    </div>
    ${backButton}
  `);
}

// ============================================
// CATEGORY GROUPS RENDERER
// ============================================

/**
 * Render MRI category groups (Standard, Vascular, Specialized)
 */
function renderMRICategoryGroups(state: MRIRenderState): string {
  const html: string[] = [];
  const groupOrder = ['standard', 'vascular', 'specialized'];

  for (const groupId of groupOrder) {
    const groupConfig = MRI_CATEGORY_GROUPS[groupId];
    if (!groupConfig) continue;

    const isExpanded = state.expandedGroups.has(groupId);
    const groupIcon = getIcon(groupConfig.icon);

    html.push(`
      <div class="mri-category-group border-2 ${isExpanded ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} rounded-xl overflow-hidden transition-all duration-200 hover:border-blue-300 hover:shadow-md">
        <button
          type="button"
          class="mri-group-header w-full p-4 ${isExpanded ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'} transition-colors flex items-center justify-between group"
          data-group-id="${groupId}"
          onclick="window.toggleMRIGroup('${groupId}')"
          aria-expanded="${isExpanded}"
          aria-controls="mri-group-${groupId}-content"
        >
          <div class="flex items-center gap-3 flex-1">
            <span class="text-2xl">${groupIcon}</span>
            <div class="text-left flex-1">
              <h4 class="text-base font-semibold text-gray-900">${groupConfig.label}</h4>
              <p class="text-xs text-gray-500">${groupConfig.description}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            ${!isExpanded ? `
              <span class="hidden sm:inline text-xs text-gray-400 group-hover:text-blue-600 transition-colors ct-expand-hint">
                Tap to expand
              </span>
            ` : ''}
            <span class="text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${isExpanded ? 'rotate-90' : 'animate-expand-hint'}">
              ▶
            </span>
          </div>
        </button>
        
        ${isExpanded ? `
          <div id="mri-group-${groupId}-content" class="mri-group-content animate-fade-in-ct">
            ${renderMRIGroupContent(groupId, state)}
          </div>
        ` : ''}
      </div>
    `);
  }

  return html.join('\n');
}

// ============================================
// GROUP CONTENT RENDERERS
// ============================================

/**
 * Render content for a specific MRI category group
 */
function renderMRIGroupContent(groupId: string, state: MRIRenderState): string {
  if (groupId === 'standard') {
    return renderStandardMRIContent(state);
  } else if (groupId === 'vascular') {
    return renderVascularMRAContent(state);
  } else if (groupId === 'specialized') {
    return renderSpecializedContent(state);
  }
  return '';
}

// ============================================
// STANDARD MRI CONTENT
// ============================================

/**
 * Render Standard MRI content with region groups
 */
function renderStandardMRIContent(state: MRIRenderState): string {
  const html: string[] = [];

  for (const regionGroup of MRI_REGION_GROUPS) {
    const groupKey = regionGroup.groupName.toLowerCase().replace(/\s+/g, '-');
    const isExpanded = state.expandedRegionGroups.has(groupKey);
    const showAll = state.showAllInGroup.has(groupKey);
    const groupIcon = getIcon(regionGroup.groupIcon);

    const visibleRegions = showAll ? regionGroup.regions : regionGroup.regions.slice(0, 3);
    const hasMore = regionGroup.regions.length > 3;

    html.push(`
      <div class="mri-region-group border-t border-gray-200">
        <button
          type="button"
          class="mri-region-header w-full p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
          data-region-group="${groupKey}"
          onclick="window.toggleMRIRegionGroup('${groupKey}')"
          aria-expanded="${isExpanded}"
        >
          <div class="flex items-center gap-2">
            <span class="text-xl">${groupIcon}</span>
            <span class="font-medium text-gray-900">${regionGroup.groupName}</span>
          </div>
          <span class="text-gray-400 transition-all duration-200 ${isExpanded ? 'rotate-90' : 'animate-expand-hint'}">
          ▶
        </span>
        </button>

        ${isExpanded ? `
          <div class="mri-region-content p-4 animate-fade-in-ct">
            ${renderRegionButtons(visibleRegions, 'standard')}
            ${hasMore && !showAll ? `
              <button
                type="button"
                class="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                onclick="window.showAllMRIRegions('${groupKey}')"
              >
                [+${regionGroup.regions.length - 3} more]
              </button>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `);
  }

  return html.join('\n');
}

// ============================================
// VASCULAR MRA/MRV CONTENT
// ============================================

/**
 * Render Vascular MRA/MRV content with region groups
 */
function renderVascularMRAContent(state: MRIRenderState): string {
  const html: string[] = [];

  for (const vascularGroup of MRI_VASCULAR_GROUPS) {
    const groupKey = vascularGroup.groupName.toLowerCase().replace(/\s+/g, '-');
    const isExpanded = state.expandedRegionGroups.has(groupKey);
    const showAll = state.showAllInGroup.has(groupKey);
    const groupIcon = getIcon(vascularGroup.groupIcon);

    const visibleRegions = showAll ? vascularGroup.regions : vascularGroup.regions.slice(0, 3);
    const hasMore = vascularGroup.regions.length > 3;

    html.push(`
      <div class="mri-region-group border-t border-gray-200">
        <button
          type="button"
          class="mri-region-header w-full p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
          data-region-group="${groupKey}"
          onclick="window.toggleMRIRegionGroup('${groupKey}')"
          aria-expanded="${isExpanded}"
        >
          <div class="flex items-center gap-2">
            <span class="text-xl">${groupIcon}</span>
            <span class="font-medium text-gray-900">${vascularGroup.groupName}</span>
          </div>
          <span class="text-gray-400 transition-all duration-200 ${isExpanded ? 'rotate-90' : 'animate-expand-hint'}">
          ▶
        </span>
        </button>

        ${isExpanded ? `
          <div class="mri-region-content p-4 animate-fade-in-ct">
            ${renderRegionButtons(visibleRegions, 'vascular')}
            ${hasMore && !showAll ? `
              <button
                type="button"
                class="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                onclick="window.showAllMRIRegions('${groupKey}')"
              >
                [+${vascularGroup.regions.length - 3} more]
              </button>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `);
  }

  return html.join('\n');
}

// ============================================
// SPECIALIZED CONTENT
// ============================================

/**
 * Render Specialized MRI content (always show all)
 */
function renderSpecializedContent(state: MRIRenderState): string {
  return `
    <div class="mri-specialized-content p-4">
      ${renderRegionButtons(MRI_SPECIALIZED_ITEMS, 'specialized')}
    </div>
  `;
}

// ============================================
// REGION BUTTONS RENDERER
// ============================================

/**
 * Render region selection buttons
 */
function renderRegionButtons(regions: string[], groupType: string): string {
  const buttons = regions.map(regionKey => {
    const regionData = getRegionData(regionKey);
    const regionIcon = getIcon(regionData.icon);
    const badge = regionData.badge ? `<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">${regionData.badge}</span>` : '';

    return `
      <button
        type="button"
        class="mri-region-btn w-full p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left flex items-center gap-3"
        data-region="${regionKey}"
        data-group-type="${groupType}"
        onclick="window.selectMRIRegion('${regionKey}')"
      >
        <span class="text-2xl">${regionIcon}</span>
        <div class="flex-1">
          <div class="font-medium text-gray-900">${regionData.label}</div>
          ${regionData.helperText ? `<div class="text-xs text-gray-500 mt-0.5">${regionData.helperText}</div>` : ''}
        </div>
        ${badge}
      </button>
    `;
  }).join('');

  return `<div class="grid grid-cols-1 gap-2">${buttons}</div>`;
}

// ============================================
// REGION DATA HELPER
// ============================================

/**
 * Get display data for a region key
 */
function getRegionData(regionKey: string): { label: string; icon: string; badge?: string; helperText?: string } {
  const regionMap: Record<string, { label: string; icon: string; badge?: string; helperText?: string }> = {
    // Standard MRI regions
    brain: { label: 'Brain / Head', icon: 'brain', helperText: 'Headaches, dizziness, tumors, stroke follow-up' },
    cervicalSpine: { label: 'Cervical Spine (Neck)', icon: 'spine', helperText: 'Neck pain, disc herniation' },
    thoracicSpine: { label: 'Thoracic Spine (Mid Back)', icon: 'spine', helperText: 'Mid-back pain, compression' },
    lumbarSpine: { label: 'Lumbar Spine (Low Back)', icon: 'spine', helperText: 'Low back pain, sciatica' },
    orbitFaceNeck: { label: 'Orbit / Face / Neck', icon: 'eye', helperText: 'Facial or orbital lesions' },
    tmj: { label: 'TMJ', icon: 'tmj', helperText: 'Jaw pain or dysfunction' },
    chest: { label: 'Chest', icon: 'chest', helperText: 'Cardiac or mediastinal evaluation' },
    abdomen: { label: 'Abdomen', icon: 'abdomen', helperText: 'Liver, kidneys, pancreas' },
    pelvis: { label: 'Pelvis', icon: 'pelvis', helperText: 'Prostate, uterus, ovaries' },
    abdomenPelvis: { label: 'Abdomen & Pelvis', icon: 'abdomen', helperText: 'Combined study' },
    shoulder: { label: 'Shoulder', icon: 'shoulder', helperText: 'Rotator cuff, labrum tears' },
    elbow: { label: 'Elbow', icon: 'elbow', helperText: 'Tendon or ligament injury' },
    wrist: { label: 'Wrist / Hand', icon: 'wrist', helperText: 'Carpal tunnel, fractures' },
    hip: { label: 'Hip', icon: 'hip', helperText: 'Joint pain, labral tears' },
    knee: { label: 'Knee', icon: 'knee', helperText: 'Ligament tears, meniscus' },
    ankle: { label: 'Ankle / Foot', icon: 'ankle', helperText: 'Ligament injuries, arthritis' },
    breast: { label: 'Breast', icon: 'breast', helperText: 'High-risk screening' },

    // Vascular regions (MRA/MRV)
    mraBrain: { label: 'MRA Brain', icon: 'brain', badge: 'MRA', helperText: 'Aneurysm, stenosis screening' },
    mraNeck: { label: 'MRA Neck (Carotid)', icon: 'neck', badge: 'MRA', helperText: 'Carotid artery evaluation' },
    mraChest: { label: 'MRA Chest / Aorta', icon: 'heart', badge: 'MRA', helperText: 'Thoracic aorta evaluation' },
    mraAbdomen: { label: 'MRA Abdomen / Renal', icon: 'abdomen', badge: 'MRA', helperText: 'Renal artery stenosis' },
    mraPelvis: { label: 'MRA Pelvis', icon: 'bone', badge: 'MRA', helperText: 'Iliac vessel evaluation' },
    mraRunoff: { label: 'MRA Runoff (Legs)', icon: 'leg', badge: 'MRA', helperText: 'Peripheral vascular disease' },
    mraSpine: { label: 'MRA Spine', icon: 'spine', badge: 'MRA', helperText: 'Spinal vascular malformations' },
    mrvHead: { label: 'MRV Head (Venous)', icon: 'brain', badge: 'MRV', helperText: 'Venous thrombosis evaluation' },

    // Specialized regions
    arthrogramShoulder: { label: 'MRI Shoulder Arthrogram', icon: 'shoulder', badge: 'Arthrogram', helperText: 'Fluoro-guided injection' },
    arthrogramKnee: { label: 'MRI Knee Arthrogram', icon: 'knee', badge: 'Arthrogram', helperText: 'Fluoro-guided injection' },
    mriBreast: { label: 'MRI Breast (CAD)', icon: 'breast', badge: 'Specialized', helperText: 'High-risk screening' },
    spectroscopy: { label: 'MR Spectroscopy (MRS)', icon: 'brain', badge: 'MRS', helperText: 'Metabolic brain analysis' },
    elastography: { label: 'MR Elastography (MRE)', icon: 'liver', badge: 'MRE', helperText: 'Liver fibrosis evaluation' }
  };

  return regionMap[regionKey] || { label: regionKey, icon: 'medical' };
}

// ============================================
// WINDOW FUNCTIONS FOR MRI INTERACTIVITY
// ============================================

/**
 * Make MRI toggle functions available globally
 * These are called from onclick handlers in the rendered HTML
 */
if (typeof window !== 'undefined') {
  (window as any).toggleMRIGroup = (groupId: string) => {
    console.log('[MRI] Toggle group:', groupId);
    window.dispatchEvent(new CustomEvent('mri-toggle-group', { detail: { groupId } }));
  };

  (window as any).toggleMRIRegionGroup = (groupKey: string) => {
    console.log('[MRI] Toggle region group:', groupKey);
    window.dispatchEvent(new CustomEvent('mri-toggle-region-group', { detail: { groupKey } }));
  };

  (window as any).showAllMRIRegions = (groupKey: string) => {
    console.log('[MRI] Show all regions:', groupKey);
    window.dispatchEvent(new CustomEvent('mri-show-all-regions', { detail: { groupKey } }));
  };

  (window as any).selectMRIRegion = (regionKey: string) => {
    console.log('[MRI] Region selected:', regionKey);
    
    // Check if this region has auto-contrast mode (MRA procedures)
    const procedureData = (window as any).ProcedureLibrary?.MRI?.[regionKey];
    const contrastMode = procedureData?.contrastMode;
    
    let needsContrast = true;
    let autoContrast = undefined;
    
    if (contrastMode === 'auto') {
      // MRA & Arthrograms: Skip contrast selection, auto-set "with contrast"
      needsContrast = false;
      autoContrast = 'with';
      console.log('[MRI] Auto-contrast mode detected (with), skipping contrast selection');
    } else if (contrastMode === 'none') {
      // MRS & MRE: Skip contrast selection, auto-set "without contrast"
      needsContrast = false;
      autoContrast = 'without';
      console.log('[MRI] No-contrast mode detected (without), skipping contrast selection');
    } else if (contrastMode === 'optional') {
      // MRV: Show contrast selection (2 options)
      needsContrast = true;
      console.log('[MRI] Optional contrast mode detected, showing contrast selection');
    } else if (contrastMode === 'manual') {
      // Breast MRI: Show standard contrast selection (3 options)
      needsContrast = true;
      console.log('[MRI] Manual contrast mode detected, showing 3-option contrast selection');
    } else {
      // Standard MRI: Show contrast selection (3 options)
      needsContrast = true;
    }
    
    window.dispatchEvent(new CustomEvent('mri-region-selected', { 
      detail: { 
        regionKey,
        needsContrast,
        autoContrast,
        contrastMode
      } 
    }));
  };
}

console.log('âœ… MRI window functions attached');
console.log('MRI Region Renderer loaded');