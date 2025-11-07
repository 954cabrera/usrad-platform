/**
 * REGION SELECTION RENDERER - X-RAY ENHANCED
 * ============================================
 * Renders body region/part selection UI
 * Supports both flat lists and grouped layouts
 * Now includes X-Ray regions
 * 
 * Usage:
 *   import { renderRegionSelection } from './region-renderer';
 */

import type { Modality, Region } from '../types';
import { getModalityIcon, getModalityColor } from '../utils/modality-detector';
import { getIcon } from '../utils/icon-map';
import {
  renderSectionHeader,
  renderBreadcrumb,
  renderBackButton,
  renderGrid,
  wrapInContainer
} from './renderer-core';

// ADD THESE IMPORTS
import {
  CT_CATEGORY_GROUPS,
  CT_REGION_GROUPS,
  CT_VASCULAR_GROUPS,
  CT_SCREENING_ITEMS,
  CT_DISPLAY_SETTINGS
} from '../utils/category-config';

import { renderMRIGroupedSelection } from './mri-region-renderer';

// ============================================
// REGION CONFIGURATIONS
// ============================================

// ============================================
// CT-SPECIFIC STATE INTERFACE
// ============================================

/**
 * State for CT category groups and expansion
 */
interface CTRenderState {
  expandedGroups: Set<string>;
  expandedRegionGroups: Set<string>;
  showAllInGroup: Set<string>;
}

/**
 * Initialize default CT state
 * Head & Neck expanded by default per spec
 */
function getDefaultCTState(): CTRenderState {
  return {
    expandedGroups: new Set(), // Ã¢Å“â€¦ All collapsed - user chooses
    expandedRegionGroups: new Set(), // Ã¢Å“â€¦ All collapsed
    showAllInGroup: new Set()
  };
}

const REGION_BY_MODALITY: Record<string, Region[]> = {
  MRI: [
    { label: 'Brain', icon: 'brain' },
    { label: 'Cervical Spine (Neck)', icon: 'spine' },
    { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
    { label: 'Lumbar Spine (Low Back)', icon: 'spine' },
    { label: 'Shoulder', icon: 'shoulder' },
    { label: 'Elbow', icon: 'elbow' },
    { label: 'Wrist / Hand', icon: 'hand' },
    { label: 'Hip', icon: 'hip' },
    { label: 'Knee', icon: 'knee' },
    { label: 'Ankle / Foot', icon: 'foot' },
    { label: 'Abdomen', icon: 'abdomen' },
    { label: 'Pelvis', icon: 'pelvis' },
    { label: 'Chest', icon: 'chest' },
    { label: 'Breast', icon: 'breast' },
    { label: 'Orbit / Face / Neck', icon: 'eye' },
    { label: 'TMJ', icon: 'tmj' }
  ],
  CT: [
    { label: 'Head / Brain', icon: 'brain' },
    { label: 'Chest', icon: 'chest' },
    { label: 'Abdomen', icon: 'abdomen' },
    { label: 'Abdomen & Pelvis', icon: 'abdomen' },
    { label: 'Pelvis', icon: 'pelvis' },
    { label: 'Cervical Spine (Neck)', icon: 'spine' },
    { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
    { label: 'Lumbar Spine (Low Back)', icon: 'spine' },
    { label: 'Sinuses', icon: 'sinuses' },
    { label: 'Neck (Soft Tissue)', icon: 'neck' },
    { label: 'Shoulder', icon: 'shoulder' },
    { label: 'Elbow', icon: 'elbow' },
    { label: 'Wrist / Hand', icon: 'hand' },
    { label: 'Hip', icon: 'hip' },
    { label: 'Knee', icon: 'knee' },
    { label: 'Ankle / Foot', icon: 'foot' }
  ],
  'X-Ray': [
    { label: 'Chest', icon: 'chest' },
    { label: 'Cervical Spine (Neck)', icon: 'spine' },
    { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
    { label: 'Lumbar Spine (Low Back)', icon: 'spine' },
    { label: 'Knee', icon: 'knee' },
    { label: 'Shoulder', icon: 'shoulder' },
    { label: 'Clavicle', icon: 'clavicle' },
    { label: 'Abdomen (KUB)', icon: 'abdomen' },
    { label: 'Pelvis', icon: 'pelvis' },
    { label: 'Ribs', icon: 'ribs' },
    { label: 'Ankle', icon: 'ankle' },
    { label: 'Foot', icon: 'foot' },
    { label: 'Hand', icon: 'hand' },
    { label: 'Wrist', icon: 'wrist' },
    { label: 'Hip', icon: 'hip' },
    { label: 'Elbow', icon: 'elbow' },
    { label: 'Femur (Thigh)', icon: 'femur' },
    { label: 'Tibia/Fibula (Lower Leg)', icon: 'tibia' }
  ],
  'Ultrasound': [
    { label: 'Abdomen', icon: 'abdomen' },
    { label: 'Pelvis', icon: 'pelvis' },
    { label: 'Obstetric / Pregnancy', icon: 'pregnancy' },
    { label: 'Vascular / Doppler', icon: 'heart' },
    { label: 'Small Parts', icon: 'thyroid' },
    { label: 'Musculoskeletal', icon: 'shoulder' }
  ]
};

// Grouped version for better UX
const GROUPED_REGIONS: Record<string, { groupName: string; regions: Region[] }[]> = {
  MRI: [
    {
      groupName: 'Head & Neck',
      regions: [
        { label: 'Brain', icon: 'brain' },
        { label: 'Orbit / Face / Neck', icon: 'eye' },
        { label: 'TMJ', icon: 'tmj' }
      ]
    },
    {
      groupName: 'Spine',
      regions: [
        { label: 'Cervical Spine (Neck)', icon: 'spine' },
        { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
        { label: 'Lumbar Spine (Low Back)', icon: 'spine' }
      ]
    },
    {
      groupName: 'Upper Extremities',
      regions: [
        { label: 'Shoulder', icon: 'shoulder' },
        { label: 'Elbow', icon: 'elbow' },
        { label: 'Wrist / Hand', icon: 'hand' }
      ]
    },
    {
      groupName: 'Lower Extremities',
      regions: [
        { label: 'Hip', icon: 'hip' },
        { label: 'Knee', icon: 'knee' },
        { label: 'Ankle / Foot', icon: 'foot' }
      ]
    },
    {
      groupName: 'Torso',
      regions: [
        { label: 'Chest', icon: 'chest' },
        { label: 'Abdomen', icon: 'abdomen' },
        { label: 'Pelvis', icon: 'pelvis' },
        { label: 'Breast', icon: 'breast' }
      ]
    }
  ],
  CT: [
  {
    groupName: 'Head & Neck',
    regions: [
      { label: 'Head / Brain', icon: 'brain' },
      { label: 'Sinuses', icon: 'sinuses' },
      { label: 'Neck (Soft Tissue)', icon: 'neck' }
    ]
  },
  {
    groupName: 'Torso',
    regions: [
      { label: 'Chest', icon: 'chest' },
      { label: 'Abdomen', icon: 'abdomen' },
      { label: 'Abdomen & Pelvis', icon: 'abdomen' },
      { label: 'Pelvis', icon: 'pelvis' }
    ]
  },
  {
    groupName: 'Spine',
    regions: [
      { label: 'Cervical Spine (Neck)', icon: 'spine' },
      { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
      { label: 'Lumbar Spine (Low Back)', icon: 'spine' }
    ]
  },
  {
    groupName: 'Vascular Imaging (CTA)',
    regions: [
      { label: 'CTA Head & Neck', icon: 'brain' },
      { label: 'CTA Chest', icon: 'heart' },
      { label: 'CTA Coronary (Heart)', icon: 'heart' },
      { label: 'CTA Abdomen', icon: 'abdomen' },
      { label: 'CTA Extremities', icon: 'leg' }
    ]
  },
  {
    groupName: 'Specialized Screening',
    regions: [
      { label: 'Lung Cancer Screening', icon: 'lungs' },
      { label: 'Cardiac Calcium Score', icon: 'heart' },
      { label: 'Virtual Colonoscopy', icon: 'intestine' },
      { label: 'Heart Screening', icon: 'heart' }
    ]
  }
],
  'X-Ray': [
    {
      groupName: 'Spine & Chest',
      regions: [
        { label: 'Chest', icon: 'chest' },
        { label: 'Cervical Spine (Neck)', icon: 'spine' },
        { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
        { label: 'Lumbar Spine (Low Back)', icon: 'spine' },
        { label: 'Ribs', icon: 'ribs' },
        { label: 'Clavicle', icon: 'clavicle' }
      ]
    },
    {
      groupName: 'Upper Extremities',
      regions: [
        { label: 'Shoulder', icon: 'shoulder' },
        { label: 'Elbow', icon: 'elbow' },
        { label: 'Wrist', icon: 'wrist' },
        { label: 'Hand', icon: 'hand' }
      ]
    },
    {
      groupName: 'Lower Extremities',
      regions: [
        { label: 'Hip', icon: 'hip' },
        { label: 'Knee', icon: 'knee' },
        { label: 'Ankle', icon: 'ankle' },
        { label: 'Foot', icon: 'foot' },
        { label: 'Femur (Thigh)', icon: 'femur' },
        { label: 'Tibia/Fibula (Lower Leg)', icon: 'tibia' }
      ]
    },
    {
      groupName: 'Abdomen & Pelvis',
      regions: [
        { label: 'Abdomen (KUB)', icon: 'abdomen' },
        { label: 'Pelvis', icon: 'pelvis' }
      ]
    }
  ],
  'Ultrasound': [
    {
      groupName: 'Abdomen & Pelvis',
      regions: [
        { label: 'Abdomen', icon: 'abdomen' },
        { label: 'Pelvis', icon: 'pelvis' }
      ]
    },
    {
      groupName: 'Pregnancy & Vascular',
      regions: [
        { label: 'Obstetric / Pregnancy', icon: 'pregnancy' },
        { label: 'Vascular / Doppler', icon: 'heart' }
      ]
    },
    {
      groupName: 'Specialized Imaging',
      regions: [
        { label: 'Small Parts', icon: 'thyroid' },
        { label: 'Musculoskeletal', icon: 'shoulder' }
      ]
    }
  ]
};

// ============================================
// MAIN RENDER FUNCTIONS
// ============================================

/**
 * Render region selection screen (flat grid layout)
 * 
 * @param modality - Selected modality
 * @param contrast - Selected contrast (optional, for breadcrumb)
 * @param showBreadcrumb - Whether to show breadcrumb
 * @returns HTML string
 */
export function renderRegionSelection(
  modality: Modality,
  contrast?: string,
  showBreadcrumb: boolean = true
): string {
  const regions = REGION_BY_MODALITY[modality] || [];
  const icon = getModalityIcon(modality);

  if (regions.length === 0) {
    return renderNoRegionsAvailable(modality);
  }

  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb([
        modality,
        contrast || 'Contrast',
        'Select Region',
        'Complete'
      ], 2)
    : '';

  const header = renderSectionHeader(
    'Which body part needs imaging?',
    'Select the area to be scanned',
    icon
  );

  const regionButtons = regions.map(region =>
    renderRegionButton(region, modality)
  );

  const grid = renderGrid(regionButtons, 2);

  const backButton = renderBackButton(
    contrast ? 'Ã¢â€ Â Back to contrast selection' : 'Ã¢â€ Â Back to search',
    contrast ? 'back-to-contrast' : 'back-to-search-xray'
  );

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    ${grid}
    ${backButton}
  `);
}

/**
 * Render region selection with grouped layout
 * 
 * @param modality - Selected modality
 * @param contrast - Selected contrast (optional)
 * @param showBreadcrumb - Whether to show breadcrumb
 * @returns HTML string
 */
export function renderGroupedRegionSelection(
  modality: Modality,
  contrast?: string,
  showBreadcrumb: boolean = true
): string {
  // Use CT-specific renderer for CT modality
  if (modality === 'CT') {
    return renderCTGroupedSelection(modality, contrast, showBreadcrumb);
  }

  // Use MRI-specific renderer for MRI modality
  if (modality === 'MRI') {
    return renderMRIGroupedSelection(modality, contrast, showBreadcrumb);
  }

  // Original code for other modalities
  const groups = GROUPED_REGIONS[modality] || [];
  const icon = getModalityIcon(modality);

  if (groups.length === 0) {
    return renderRegionSelection(modality, contrast, showBreadcrumb);
  }

  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb([
        modality,
        contrast || 'Contrast',
        'Select Region',
        'Complete'
      ], 2)
    : '';

  const header = renderSectionHeader(
    'Which body part needs imaging?',
    'Select the area to be scanned',
    icon
  );

  const groupSections = groups.map(group => renderRegionGroup(group, modality)).join('');

  const backButton = renderBackButton(
    contrast ? 'Ã¢â€ Â Back to contrast selection' : 'Ã¢â€ Â Back to search',
    contrast ? 'back-to-contrast-grouped' : 'back-to-search-xray'
  );

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    <div class="space-y-6">
      ${groupSections}
    </div>
    ${backButton}
  `);
}

/**
 * Render CT-specific grouped selection with category groups
 * Supports Standard CT, Vascular (CTA), and Screening
 * 
 * @param modality - Should be 'CT'
 * @param contrast - Selected contrast (optional)
 * @param showBreadcrumb - Whether to show breadcrumb
 * @param state - CT render state (optional)
 * @returns HTML string
 */
export function renderCTGroupedSelection(
  modality: Modality,
  contrast?: string,
  showBreadcrumb: boolean = true,
  state?: CTRenderState
): string {
  const renderState = state || getDefaultCTState();
  const icon = getModalityIcon(modality);

  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb([
        modality,
        contrast || 'Contrast',
        'Select Region',
        'Complete'
      ], 2)
    : '';

  const header = renderSectionHeader(
    'Select CT Scan Type',
    'Choose your scan category below',
    icon
  );

  // Render the three main category groups
  const categoryGroupsHTML = renderCTCategoryGroups(renderState);

  const backButton = renderBackButton(
    contrast ? 'Ã¢â€ Â Back to contrast selection' : 'Ã¢â€ Â Back to search',
    contrast ? 'back-to-contrast-ct' : 'back-to-search-ct'
  );

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    <div class="ct-categories-container space-y-4">
      ${categoryGroupsHTML}
    </div>
    ${backButton}
  `);
}

/**
 * Render CT category groups (Standard, Vascular, Screening)
 */
/**
 * Render CT category groups (Standard, Vascular, Screening)
 * Enhanced with visual cues for better UX
 */
function renderCTCategoryGroups(state: CTRenderState): string {
  const html: string[] = [];
  const groupOrder = ['standard', 'vascular', 'screening'];

  for (const groupId of groupOrder) {
    const groupConfig = CT_CATEGORY_GROUPS[groupId];
    if (!groupConfig) continue;

    const isExpanded = state.expandedGroups.has(groupId);

    html.push(`
      <div class="ct-category-group border-2 ${isExpanded ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} rounded-xl overflow-hidden transition-all duration-200 hover:border-blue-300 hover:shadow-md">
        <button
          type="button"
          class="ct-group-header w-full p-4 ${isExpanded ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'} transition-colors flex items-center justify-between group"
          data-group-id="${groupId}"
          onclick="window.toggleCTGroup('${groupId}')"
          aria-expanded="${isExpanded}"
          aria-controls="ct-group-${groupId}-content"
        >
          <div class="flex items-center gap-3 flex-1">
            <span class="text-2xl">${groupConfig.icon}</span>
            <div class="text-left flex-1">
              <h4 class="text-base font-semibold text-gray-900">${groupConfig.label}</h4>
              <p class="text-xs text-gray-500">${groupConfig.description}</p>
            </div>
          </div>
          
          <!-- VISUAL CUES -->
          <div class="flex items-center gap-2">
            ${!isExpanded ? `
              <span class="hidden sm:inline text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                Tap to expand
              </span>
            ` : ''}
            <span class="text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${isExpanded ? 'rotate-90' : 'animate-expand-hint'}">
  â–¶
</span>
          </div>
        </button>
        
        ${isExpanded ? `
          <div id="ct-group-${groupId}-content" class="ct-group-content animate-fade-in">
            ${renderCTGroupContent(groupId, state)}
          </div>
        ` : ''}
      </div>
    `);
  }

  return html.join('\n');
}

/**
 * Render content for a specific CT category group
 */
function renderCTGroupContent(groupId: string, state: CTRenderState): string {
  if (groupId === 'standard') {
    return renderStandardCTContent(state);
  } else if (groupId === 'vascular') {
    return renderVascularCTAContent(state);
  } else if (groupId === 'screening') {
    return renderScreeningContent(state);
  }
  return '';
}

/**
 * Render Standard CT content with region groups
 */
function renderStandardCTContent(state: CTRenderState): string {
  const html: string[] = [];

  html.push('<div class="p-4 space-y-4">');

  for (const regionGroup of CT_REGION_GROUPS) {
    const isExpanded = state.expandedRegionGroups.has(regionGroup.groupName) || 
                       regionGroup.defaultExpanded;
    const showAll = state.showAllInGroup.has(regionGroup.groupName);

    html.push(`
      <div class="ct-region-group">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onclick="window.toggleCTRegionGroup('${regionGroup.groupName}')"
        >
          <div class="flex items-center gap-2">
            <span class="text-xl">${regionGroup.groupIcon}</span>
            <span class="font-medium text-gray-900">${regionGroup.groupName}</span>
          </div>
          <span class="text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${isExpanded ? 'rotate-90' : 'animate-expand-hint'}">
  â–¶
</span>
        </button>
        ${isExpanded ? renderCTRegionGroupItems(regionGroup, showAll) : ''}
      </div>
    `);
  }

  html.push('</div>');
  return html.join('\n');
}

/**
 * Render items within a region group with progressive disclosure
 */
function renderCTRegionGroupItems(
  regionGroup: { groupName: string; groupIcon: string; regions: string[] },
  showAll: boolean
): string {
  const regions = regionGroup.regions;
  const showFirst = 3;
  const visibleRegions = showAll ? regions : regions.slice(0, showFirst);
  const hasMore = regions.length > showFirst;

  const regionButtons = visibleRegions.map(regionKey => {
    // Get region label from procedures-global.js
    const region = getRegionFromKey(regionKey);
    return renderCTRegionCard(region);
  });

  const grid = `
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
      ${regionButtons.join('\n')}
    </div>
  `;

  let showMoreButton = '';
  if (hasMore && !showAll) {
    const remainingCount = regions.length - showFirst;
    showMoreButton = `
      <div class="text-center mt-3">
        <button
          type="button"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium"
          onclick="window.showMoreCTRegions('${regionGroup.groupName}')"
        >
          [+${remainingCount} more Ã¢â€“Â¼]
        </button>
      </div>
    `;
  }

  return `
    <div class="mt-2">
      ${grid}
      ${showMoreButton}
    </div>
  `;
}

/**
 * Render Vascular/CTA content
 */
function renderVascularCTAContent(state: CTRenderState): string {
  const html: string[] = [];

  html.push('<div class="p-4">');
  html.push('<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">');

  for (const vascularGroup of CT_VASCULAR_GROUPS) {
    for (const regionKey of vascularGroup.regions) {
      const region = getRegionFromKey(regionKey);
      html.push(renderCTRegionCard(region, true)); // true = show CTA badge
    }
  }

  html.push('</div>');
  html.push('</div>');
  return html.join('\n');
}

/**
 * Render Screening content (always show all 4 items)
 */
function renderScreeningContent(state: CTRenderState): string {
  const html: string[] = [];

  html.push('<div class="p-4">');
  html.push('<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">');

  for (const screeningKey of CT_SCREENING_ITEMS) {
    const region = getRegionFromKey(screeningKey);
    html.push(renderCTRegionCard(region, false, true)); // true = is screening
  }

  html.push('</div>');
  html.push('</div>');
  return html.join('\n');
}

/**
 * Render a CT region card
 */
function renderCTRegionCard(
  region: { label: string; icon: string; helperText?: string },
  isVascular: boolean = false,
  isScreening: boolean = false
): string {
  const badge = isVascular ? 'CTA' : isScreening ? 'Screening' : '';
  const helperText = isScreening && region.helperText ? region.helperText : '';

  return `
    <button
      type="button"
      class="region-option-button card hover-lift active-scale transition-all duration-200 border border-gray-100 bg-white/90 hover:bg-white rounded-xl shadow-soft p-4 accent-hover focus-accent relative min-h-[48px]"
      data-region-label="${region.label}"
    >
      ${badge ? `<div class="absolute top-2 right-2 text-xs bg-[#003087]/10 text-[#003087] px-2 py-1 rounded-full font-semibold">${badge}</div>` : ''}
      <div class="text-center">
        <div class="icon-container bg-[#003087]/10 p-3 rounded-lg inline-flex items-center justify-center mb-2 transition-colors duration-200">
          <span class="text-2xl">${getIcon(region.icon)}</span>
        </div>
        <p class="text-sm font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
          ${region.label}
        </p>
        ${helperText ? `<p class="text-xs text-gray-500 mt-1 leading-snug">${helperText}</p>` : ''}
      </div>
    </button>
  `;
}

/**
 * Helper to get region details from region key
 * This would ideally pull from procedures-global.js
 */
function getRegionFromKey(regionKey: string): { label: string; icon: string; helperText?: string } {
  // Map of region keys to display info
  const regionMap: Record<string, { label: string; icon: string; helperText?: string }> = {
    'head': { label: 'Head / Brain', icon: 'brain' },
    'sinuses': { label: 'Sinuses', icon: 'sinuses' },
    'neckSoftTissue': { label: 'Neck (Soft Tissue)', icon: 'neck' },
    'chest': { label: 'Chest', icon: 'chest' },
    'abdomen': { label: 'Abdomen', icon: 'abdomen' },
    'pelvis': { label: 'Pelvis', icon: 'pelvis' },
    'abdomenPelvis': { label: 'Abdomen & Pelvis', icon: 'abdomen' },
    'cervicalSpine': { label: 'Cervical Spine (Neck)', icon: 'spine' },
    'thoracicSpine': { label: 'Thoracic Spine (Mid Back)', icon: 'spine' },
    'lumbarSpine': { label: 'Lumbar Spine (Low Back)', icon: 'spine' },
    'ctaHeadNeck': { label: 'CTA Head & Neck', icon: 'brain' },
    'ctaChest': { label: 'CTA Chest', icon: 'heart' },
    'ctaCoronary': { label: 'CTA Coronary (Heart)', icon: 'heart' },
    'ctaAbdomen': { label: 'CTA Abdomen', icon: 'abdomen' },
    'ctaExtremities': { label: 'CTA Extremities', icon: 'leg' },
    'screeningLung': { 
      label: 'Lung Cancer Screening', 
      icon: 'lungs',
      helperText: 'Annual screening ages 50-80 with smoking history'
    },
    'screeningCardiac': { 
      label: 'Cardiac Calcium Score', 
      icon: 'heart',
      helperText: 'Risk assessment for heart disease - no contrast'
    },
    'screeningColon': { 
      label: 'Virtual Colonoscopy', 
      icon: 'intestine',
      helperText: 'Colon cancer screening ages 45+ - no sedation'
    },
    'screeningCoronary': {   // Ã¢Å“â€¦ NEW NAME (matches procedures-global.js)
  label: 'Heart Screening', 
  icon: 'heart',
  helperText: 'Non-invasive heart evaluation'
}
  };

  return regionMap[regionKey] || { label: regionKey, icon: 'medical' };
}


/**
 * Render a single region button
 * 
 * @param region - Region configuration
 * @param modality - Parent modality (for color)
 * @returns HTML string
 */
function renderRegionButton(region: Region, modality: Modality): string {
  const color = getModalityColor(modality);

  return `
    <button
      type="button"
      class="region-option-button card hover-lift active-scale transition-all duration-200 border border-gray-100 bg-white/90 hover:bg-white rounded-xl shadow-soft p-4 accent-hover focus-accent"
      data-region-label="${region.label}"
    >
      <div class="text-center">
        <div class="icon-container bg-[#003087]/10 p-3 rounded-lg inline-flex items-center justify-center mb-2 transition-colors duration-200">
          <span class="text-2xl">${getIcon(region.icon)}</span>
        </div>
        <p class="text-sm font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
          ${region.label}
        </p>
      </div>
    </button>
  `;
}

/**
 * Render a group of regions
 * 
 * @param group - Region group configuration
 * @param modality - Parent modality
 * @returns HTML string
 */
function renderRegionGroup(
  group: { groupName: string; regions: Region[] },
  modality: Modality
): string {
  const color = getModalityColor(modality);

  const regionButtons = group.regions.map(region =>
    renderRegionButton(region, modality)
  );

  const grid = renderGrid(regionButtons, 3);

  return `
    <div class="region-group">
      <h4 class="text-md font-bold text-gray-700 mb-3 pb-2 border-b border-gray-200">
        ${group.groupName}
      </h4>
      ${grid}
    </div>
  `;
}

/**
 * Render message when no regions available
 * 
 * @param modality - Modality with no regions
 * @returns HTML string
 */
function renderNoRegionsAvailable(modality: Modality): string {
  const header = renderSectionHeader(
    'No regions configured',
    `No body regions configured for ${modality}`
  );

  const backButton = renderBackButton('Back to search', 'back-to-search-no-regions');

  return wrapInContainer(`
    ${header}
    <div class="text-center py-8">
      <p class="text-red-600 font-medium">Configuration Error</p>
      <p class="text-gray-600 text-sm mt-2">Please contact support</p>
    </div>
    ${backButton}
  `);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get regions for a modality
 * 
 * @param modality - Modality name
 * @param grouped - Whether to return grouped format
 * @returns Array of regions or groups
 */
export function getRegionsForModality(
  modality: string,
  grouped: boolean = false
): Region[] | { groupName: string; regions: Region[] }[] {
  if (grouped) {
    return GROUPED_REGIONS[modality] || [];
  }
  return REGION_BY_MODALITY[modality] || [];
}

/**
 * Search regions by keyword
 * 
 * @param modality - Modality to search within
 * @param keyword - Search keyword
 * @returns Filtered regions
 */
export function searchRegions(modality: string, keyword: string): Region[] {
  const regions = REGION_BY_MODALITY[modality] || [];
  const term = keyword.toLowerCase();

  return regions.filter(region =>
    region.label.toLowerCase().includes(term)
  );
}

// ============================================
// WINDOW FUNCTIONS FOR CT INTERACTIVITY
// ============================================

/**
 * Make CT toggle functions available globally
 * These are called from onclick handlers in the rendered HTML
 */
if (typeof window !== 'undefined') {
  (window as any).toggleCTGroup = (groupId: string) => {
    console.log('[CT] Toggle group:', groupId);
    // Emit custom event that modal-controller can listen to
    window.dispatchEvent(new CustomEvent('ct-toggle-group', { detail: { groupId } }));
  };

  (window as any).toggleCTRegionGroup = (groupName: string) => {
    console.log('[CT] Toggle region group:', groupName);
    window.dispatchEvent(new CustomEvent('ct-toggle-region-group', { detail: { groupName } }));
  };

  (window as any).showMoreCTRegions = (groupName: string) => {
    console.log('[CT] Show more regions:', groupName);
    window.dispatchEvent(new CustomEvent('ct-show-more', { detail: { groupName } }));
  };
}

console.log('Ã¢Å“â€¦ Region Selection Renderer loaded (X-Ray Enhanced + CT Enhanced)');