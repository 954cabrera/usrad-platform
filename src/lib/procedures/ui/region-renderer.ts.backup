/**
 * REGION SELECTION RENDERER
 * ==========================
 * Renders body region/part selection UI
 * Supports both flat lists and grouped layouts
 * 
 * Usage:
 *   import { renderRegionSelection } from './region-renderer';
 */

import type { Modality, Region } from '../types';
import { getModalityIcon, getModalityColor } from '../utils/modality-detector';
import {
  renderSectionHeader,
  renderBreadcrumb,
  renderBackButton,
  renderGrid,
  wrapInContainer
} from './renderer-core';

// ============================================
// REGION CONFIGURATIONS
// ============================================

const REGION_BY_MODALITY: Record<string, Region[]> = {
  MRI: [
    { label: 'Brain', icon: '🧠' },
    { label: 'Cervical Spine (Neck)', icon: '🦴' },
    { label: 'Thoracic Spine (Mid Back)', icon: '🦴' },
    { label: 'Lumbar Spine (Low Back)', icon: '🦴' },
    { label: 'Shoulder', icon: '💪' },
    { label: 'Elbow', icon: '💪' },
    { label: 'Wrist / Hand', icon: '✋' },
    { label: 'Hip', icon: '🦴' },
    { label: 'Knee', icon: '🦵' },
    { label: 'Ankle / Foot', icon: '🦶' },
    { label: 'Abdomen', icon: '🫁' },
    { label: 'Pelvis', icon: '🫁' },
    { label: 'Chest', icon: '🫁' },
    { label: 'Breast', icon: '🎀' },
    { label: 'Orbit / Face / Neck', icon: '👁️' },
    { label: 'TMJ', icon: '🦴' }
  ],
  CT: [
    { label: 'Head / Brain', icon: '🧠' },
    { label: 'Chest', icon: '🫁' },
    { label: 'Abdomen', icon: '🫁' },
    { label: 'Abdomen & Pelvis', icon: '🫁' },
    { label: 'Pelvis', icon: '🫁' },
    { label: 'Cervical Spine (Neck)', icon: '🦴' },
    { label: 'Thoracic Spine (Mid Back)', icon: '🦴' },
    { label: 'Lumbar Spine (Low Back)', icon: '🦴' },
    { label: 'Sinuses', icon: '👃' },
    { label: 'Neck (Soft Tissue)', icon: '🫁' },
    { label: 'Shoulder', icon: '💪' },
    { label: 'Elbow', icon: '💪' },
    { label: 'Wrist / Hand', icon: '✋' },
    { label: 'Hip', icon: '🦴' },
    { label: 'Knee', icon: '🦵' },
    { label: 'Ankle / Foot', icon: '🦶' }
  ]
};

// Grouped version for better UX
const GROUPED_REGIONS: Record<string, { groupName: string; regions: Region[] }[]> = {
  MRI: [
    {
      groupName: 'Head & Neck',
      regions: [
        { label: 'Brain', icon: '🧠' },
        { label: 'Orbit / Face / Neck', icon: '👁️' },
        { label: 'TMJ', icon: '🦴' }
      ]
    },
    {
      groupName: 'Spine',
      regions: [
        { label: 'Cervical Spine (Neck)', icon: '🦴' },
        { label: 'Thoracic Spine (Mid Back)', icon: '🦴' },
        { label: 'Lumbar Spine (Low Back)', icon: '🦴' }
      ]
    },
    {
      groupName: 'Upper Extremities',
      regions: [
        { label: 'Shoulder', icon: '💪' },
        { label: 'Elbow', icon: '💪' },
        { label: 'Wrist / Hand', icon: '✋' }
      ]
    },
    {
      groupName: 'Lower Extremities',
      regions: [
        { label: 'Hip', icon: '🦴' },
        { label: 'Knee', icon: '🦵' },
        { label: 'Ankle / Foot', icon: '🦶' }
      ]
    },
    {
      groupName: 'Torso',
      regions: [
        { label: 'Chest', icon: '🫁' },
        { label: 'Abdomen', icon: '🫁' },
        { label: 'Pelvis', icon: '🫁' },
        { label: 'Breast', icon: '🎀' }
      ]
    }
  ],
  CT: [
    {
      groupName: 'Head & Neck',
      regions: [
        { label: 'Head / Brain', icon: '🧠' },
        { label: 'Sinuses', icon: '👃' },
        { label: 'Neck (Soft Tissue)', icon: '🫁' }
      ]
    },
    {
      groupName: 'Spine',
      regions: [
        { label: 'Cervical Spine (Neck)', icon: '🦴' },
        { label: 'Thoracic Spine (Mid Back)', icon: '🦴' },
        { label: 'Lumbar Spine (Low Back)', icon: '🦴' }
      ]
    },
    {
      groupName: 'Torso',
      regions: [
        { label: 'Chest', icon: '🫁' },
        { label: 'Abdomen', icon: '🫁' },
        { label: 'Abdomen & Pelvis', icon: '🫁' },
        { label: 'Pelvis', icon: '🫁' }
      ]
    },
    {
      groupName: 'Extremities',
      regions: [
        { label: 'Shoulder', icon: '💪' },
        { label: 'Elbow', icon: '💪' },
        { label: 'Wrist / Hand', icon: '✋' },
        { label: 'Hip', icon: '🦴' },
        { label: 'Knee', icon: '🦵' },
        { label: 'Ankle / Foot', icon: '🦶' }
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
    contrast ? '← Back to contrast selection' : '← Back to search',
    'back-to-contrast'
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
    contrast ? '← Back to contrast selection' : '← Back to search',
    'back-to-contrast-grouped'
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
      class="region-option-button p-4 rounded-xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
      data-region-label="${region.label}"
    >
      <div class="text-center">
        <div class="text-3xl mb-2">${region.icon}</div>
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

  const backButton = renderBackButton('← Back to search', 'back-to-search-no-regions');

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

console.log('✅ Region Selection Renderer loaded');