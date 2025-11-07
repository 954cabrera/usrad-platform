/**
 * CONTRAST SELECTION RENDERER
 * ============================
 * Renders contrast selection UI (Without/With/With & Without)
 * Extracted from hero-form-controller-modal.js
 * 
 * Usage:
 *   import { renderContrastSelection } from './contrast-renderer';
 */

import type { Modality, ContrastOption } from '../types';
import { showProcedureCards } from './search-results-renderer';
import { getModalityIcon, getModalityColor, getContrastConfig } from '../utils/modality-detector';
import { 
  renderSectionHeader, 
  renderBreadcrumb, 
  renderBackButton, 
  wrapInContainer,
  renderInfoBox
} from './renderer-core';

// ============================================
// CONTRAST DESCRIPTIONS
// ============================================

const CONTRAST_DESCRIPTIONS: Record<string, string> = {
  'without': 'Standard scan without injection',
  'with': 'Enhanced imaging with IV contrast injection',
  'both': 'Complete imaging with and without contrast for comparison'
};

const CONTRAST_DETAILS: Record<string, { prep: string; duration: string; notes: string }> = {
  'without': {
    prep: 'No special preparation needed',
    duration: 'Typically 30-45 minutes',
    notes: 'Most common option for initial scans'
  },
  'with': {
    prep: 'IV line required, kidney function check',
    duration: 'Typically 45-60 minutes',
    notes: 'Provides enhanced detail for certain conditions'
  },
  'both': {
    prep: 'IV line required, kidney function check',
    duration: 'Typically 60-90 minutes',
    notes: 'Comprehensive evaluation, often for cancer staging'
  }
};

// ============================================
// MAIN RENDER FUNCTION
// ============================================

/**
 * Render contrast selection screen
 * 
 * @param modality - Selected imaging modality
 * @param showBreadcrumb - Whether to show breadcrumb navigation
 * @returns HTML string
 */
export function renderContrastSelection(
  modality: Modality,
  showBreadcrumb: boolean = true,
  region?: string
): string {
  const config = getContrastConfig(modality);
  const icon = getModalityIcon(modality);
  const color = getModalityColor(modality);

  if (!config.hasContrast || !config.options) {
    return renderNoContrastNeeded(modality);
  }

  // Build breadcrumb based on whether we have a region
  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb([
        modality,
        region || 'Region',
        'Select Contrast',
        'Complete'
      ], 2)
    : '';

  const header = renderSectionHeader(
    `Select contrast type for ${modality}`,
    'Choose how you need the scan performed',
    icon
  );

  const contrastButtons = config.options.map(option => 
    renderContrastOption(option, color)
  ).join('');

  const backButton = renderBackButton('← Back to search', 'back-to-search');

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    <div class="space-y-3">
      ${contrastButtons}
    </div>
    ${backButton}
  `);
}

/**
 * Render a single contrast option button
 * 
 * @param option - Contrast option configuration
 * @param accentColor - Brand color for hover states
 * @returns HTML string
 */
function renderContrastOption(option: ContrastOption, accentColor: string): string {
  const description = CONTRAST_DESCRIPTIONS[option.id] || '';
  const details = CONTRAST_DETAILS[option.id];

  return `
    <button
      type="button"
      class="contrast-option-button w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
      data-contrast-id="${option.id}"
      data-contrast-label="${option.label}"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <!-- Title -->
          <div class="flex items-center gap-2 mb-2">
            <p class="text-lg font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
              ${option.label}
            </p>
            ${option.id === 'without' ? `
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Most Common
              </span>
            ` : ''}
          </div>
          
          <!-- Description -->
          <p class="text-sm text-gray-600 mb-3">
            ${description}
          </p>
          
          <!-- Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>⏱️ ${details.duration}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span>${details.prep}</span>
            </div>
          </div>
          
          <!-- Additional Notes -->
          ${details.notes ? `
            <p class="text-xs text-gray-500 mt-2 italic">
              💡 ${details.notes}
            </p>
          ` : ''}
        </div>
        
        <!-- Arrow -->
        <svg class="w-6 h-6 text-gray-400 group-hover:text-[#003087] transition-colors flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </button>
  `;
}

/**
 * Render message for modalities that don't need contrast
 * 
 * @param modality - Modality that doesn't use contrast
 * @returns HTML string
 */
function renderNoContrastNeeded(modality: Modality): string {
  const icon = getModalityIcon(modality);
  
  const header = renderSectionHeader(
    `${modality} - No contrast needed`,
    'This imaging modality does not use contrast',
    icon
  );

  const infoBox = renderInfoBox({
    type: 'info',
    title: 'Contrast not applicable',
    message: `${modality} procedures do not use contrast injection. Proceeding to region selection.`
  });

  const backButton = renderBackButton('← Back to search', 'back-to-search-no-contrast');

  return wrapInContainer(`
    ${header}
    ${infoBox}
    ${backButton}
  `);
}

// ============================================
// CONTRAST AVAILABILITY WARNING
// ============================================

/**
 * Render warning when selected contrast is not available
 * 
 * @param modality - Selected modality
 * @param requestedContrast - Contrast type that was requested
 * @param availableContrasts - Available contrast options
 * @returns HTML string
 */
export function renderContrastUnavailable(
  modality: Modality,
  requestedContrast: string,
  availableContrasts: string[]
): string {
  const header = renderSectionHeader(
    'Limited Availability',
    `"${requestedContrast}" is not available for ${modality}`
  );

  const warning = renderInfoBox({
    type: 'warning',
    title: 'Contrast option not available',
    message: `This body part requires different contrast options. Available options: ${availableContrasts.join(', ')}`
  });

  const backButton = renderBackButton('Show All Available Options', 'clear-contrast-filter');

  return wrapInContainer(`
    ${header}
    ${warning}
    ${backButton}
  `);
}

// ============================================
// COMPACT CONTRAST SELECTOR (for inline use)
// ============================================

/**
 * Render compact contrast selector (for use in other views)
 * 
 * @param modality - Selected modality
 * @param selectedContrast - Currently selected contrast (optional)
 * @returns HTML string
 */
export function renderCompactContrastSelector(
  modality: Modality,
  selectedContrast?: string
): string {
  const config = getContrastConfig(modality);

  if (!config.hasContrast || !config.options) {
    return '';
  }

  return `
    <div class="flex flex-wrap gap-2">
      ${config.options.map(option => `
        <button
          type="button"
          class="compact-contrast-btn px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedContrast === option.id
              ? 'bg-[#003087] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }"
          data-contrast-id="${option.id}"
        >
          ${option.label}
        </button>
      `).join('')}
    </div>
  `;
}

// ============================================
// CONTRAST INFO CARD (for help/education)
// ============================================

/**
 * Render educational info card about contrast
 * 
 * @returns HTML string
 */
export function renderContrastInfoCard(): string {
  return `
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
      <h4 class="font-semibold text-blue-900 mb-2 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        About Contrast
      </h4>
      <p class="text-blue-800 mb-2">
        Contrast (also called "dye") is a special liquid injected into your vein to help certain tissues show up more clearly on the scan.
      </p>
      <ul class="text-blue-700 space-y-1 ml-5 list-disc">
        <li><strong>Without Contrast:</strong> Most common option, no injection needed</li>
        <li><strong>With Contrast:</strong> Provides enhanced detail, requires IV line</li>
        <li><strong>Both:</strong> Combines both methods for comprehensive evaluation</li>
      </ul>
      <p class="text-blue-800 mt-3 text-xs">
        💡 Not sure which to choose? Check your doctor's prescription or imaging order.
      </p>
    </div>
  `;
}

// ============================================
// MRI-AWARE CONTRAST HANDLER
// ============================================

/**
 * Show contrast options UI with MRI-aware logic
 * Routes to appropriate UI or auto-advances based on MRI tier configuration
 * 
 * @param params - Configuration object
 * @param params.modality - Imaging modality (MRI, CT, etc.)
 * @param params.region - Selected body region label
 * @param params.cptRange - CPT code range for the procedure
 * @param params.contrastOptions - Available contrast options (optional)
 */
export function showContrastOptions({
  modality,
  region,
  cptRange,
  contrastOptions
}: {
  modality: string;
  region: string;
  cptRange: string[];
  contrastOptions?: string[];
}): void {
  // MRI-specific logic
  if (modality === 'MRI') {
    const regionMeta = findMRIRegionMeta(region);
    const contrastMode = regionMeta?.contrastMode || 'manual';

    // Auto mode: Skip UI, proceed directly to procedure cards
    if (contrastMode === 'auto') {
      showProcedureCards({
        modality: 'MRI',
        region,
        cptRange,
        contrast: 'With Contrast'
      });
      return;
    }

    // Optional mode: Show 2 options (Without, With)
    if (contrastMode === 'optional') {
      renderContrastUI(region, ['Without Contrast', 'With Contrast'], cptRange);
      return;
    }

    // Manual/default mode: Show all 3 options
    renderContrastUI(
      region,
      contrastOptions || ['Without Contrast', 'With Contrast', 'With and Without Contrast'],
      cptRange
    );
    return;
  }

  // CT and other modalities: Standard contrast UI
  renderContrastUI(region, contrastOptions || ['Without Contrast', 'With Contrast', 'With and Without Contrast'], cptRange);
}

/**
 * Find MRI region metadata from category config
 * 
 * @param regionLabel - Region label to search for
 * @returns Region metadata or null
 */
function findMRIRegionMeta(regionLabel: string): any {
  // Dynamic import to avoid circular dependency
  try {
    const categoryConfig = require('../utils/category-config');
    const MRI_CONFIG = categoryConfig.MRI_CATEGORY_CONFIG;
    
    for (const tier of MRI_CONFIG.tiers) {
      for (const r of tier.regions) {
        if (r.label === regionLabel) return r;
      }
    }
  } catch (error) {
    console.warn('Could not load MRI config:', error);
  }
  
  return null;
}

/**
 * Render contrast selection UI in the DOM
 * 
 * @param region - Body region label
 * @param options - Array of contrast option labels
 * @param cptRange - CPT code range
 */
function renderContrastUI(region: string, options: string[], cptRange: string[]): void {
  const container = document.getElementById('contrast-options-container');
  if (!container) {
    console.warn('Contrast options container not found in DOM');
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Select Contrast Option</h3>
        <p class="text-gray-600">${region}</p>
      </div>
      <div class="grid grid-cols-1 gap-3">
        ${options.map(option => `
          <button
            type="button"
            class="contrast-option-btn bg-white border-2 border-gray-300 rounded-lg px-6 py-4 text-gray-900 hover:bg-blue-50 hover:border-[#003087] transition-all w-full text-left font-medium"
            data-contrast="${option}"
            data-region="${region}"
            data-cpt-range="${cptRange.join(',')}"
          >
            <div class="flex items-center justify-between">
              <span>${option}</span>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Attach click handlers
  container.querySelectorAll('.contrast-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const contrast = target.dataset.contrast || '';
      const regionLabel = target.dataset.region || '';
      const cptRangeStr = target.dataset.cptRange || '';
      const cptRangeArray = cptRangeStr.split(',').filter(Boolean);

      showProcedureCards({
        modality: 'MRI',
        region: regionLabel,
        cptRange: cptRangeArray,
        contrast
      });
    });
  });
}


console.log('âœ… Contrast Selection Renderer loaded');