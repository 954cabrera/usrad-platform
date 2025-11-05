/**
 * X-RAY VIEW SELECTION RENDERER
 * ==============================
 * Renders X-Ray "number of views" selection screen
 * Mirrors contrast-renderer.ts structure for consistency
 * 
 * Usage:
 *   import { renderXRayViewSelection } from './xray-view-renderer';
 */

import { 
  renderSectionHeader, 
  renderBreadcrumb, 
  renderBackButton, 
  wrapInContainer,
  renderInfoBox
} from './renderer-core';

// ============================================
// X-RAY VIEW OPTION TYPE
// ============================================

export interface ViewOption {
  views: string;
  cpt: string;
  label: string;
  shortLabel: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
  isCommon?: boolean;
  bilateral?: boolean;
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================

/**
 * Render X-Ray view selection screen
 * Groups standard and specialized views for better UX
 * 
 * @param region - Selected body region (e.g., "Chest", "Knee")
 * @param options - Array of view configurations for that region
 * @param showBreadcrumb - Whether to show breadcrumb navigation
 * @returns HTML string
 */
export function renderXRayViewSelection(
  region: string,
  options: ViewOption[],
  showBreadcrumb: boolean = true
): string {
  if (!options || options.length === 0) {
    return renderNoViewsAvailable(region);
  }

  // Single view = auto-resolve (shouldn't render this screen)
  if (options.length === 1) {
    return renderSingleViewInfo(region, options[0]);
  }

  // Separate standard and specialized views
  const standard = options.filter(
    opt => !isSpecializedView(opt.label)
  );
  const specialized = options.filter(
    opt => isSpecializedView(opt.label)
  );

  const breadcrumb = showBreadcrumb
    ? renderBreadcrumb(['X-Ray', region, 'Select Views', 'Complete'], 2)
    : '';

  const header = renderSectionHeader(
    `Select views for ${region} X-Ray`,
    'Choose the number of X-ray views or specialized projections',
    '📸'
  );

  const standardSection = standard.length > 0
    ? renderViewGroup('Standard Views', standard, '📋')
    : '';

  const specializedSection = specialized.length > 0
    ? renderViewGroup('Specialized Views', specialized, '🔬')
    : '';

  const helpText = renderHelpText();
  const backButton = renderBackButton('← Back to regions', 'back-to-region');

  return wrapInContainer(`
    ${breadcrumb}
    ${header}
    <div class="space-y-6">
      ${standardSection}
      ${specializedSection}
    </div>
    ${helpText}
    ${backButton}
  `);
}

/**
 * Render a group of view options
 * 
 * @param title - Group title (e.g., "Standard Views")
 * @param options - View options in this group
 * @param icon - Icon for the group
 * @returns HTML string
 */
function renderViewGroup(
  title: string,
  options: ViewOption[],
  icon: string
): string {
  if (options.length === 0) return '';

  const viewButtons = options.map(option => 
    renderViewOption(option)
  ).join('');

  return `
    <div class="view-group">
      <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span>${icon}</span>
        <span>${title}</span>
      </h3>
      <div class="space-y-3">
        ${viewButtons}
      </div>
    </div>
  `;
}

/**
 * Render a single view option button
 * 
 * @param option - View option configuration
 * @returns HTML string
 */
function renderViewOption(option: ViewOption): string {
  const isCommon = option.isCommon === true;
  const isBilateral = option.bilateral === true;

  return `
    <button
      type="button"
      class="xray-view-button w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
      data-view-cpt="${escapeAttr(option.cpt)}"
      data-view-label="${escapeAttr(option.label)}"
      data-view-count="${escapeAttr(option.views)}"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <!-- Title with Badges -->
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <p class="text-lg font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
              ${escapeHtml(option.shortLabel)}
            </p>
            ${isCommon ? `
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Most Common
              </span>
            ` : ''}
            ${isBilateral ? `
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                L/R Available
              </span>
            ` : ''}
          </div>
          
          <!-- Description -->
          <p class="text-sm text-gray-600 mb-3">
            ${escapeHtml(option.description)}
          </p>
          
          <!-- CPT Code Badge -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#003087] text-white rounded-full text-xs font-mono font-bold">
            <span>💎</span>
            <span>CPT ${escapeHtml(option.cpt)}</span>
          </div>
          
          <!-- Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-gray-500">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>⏱️ ${escapeHtml(option.duration)}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span>${escapeHtml(option.prep)}</span>
            </div>
          </div>
          
          <!-- Use Case -->
          <p class="text-xs text-gray-500 mt-2 italic">
            💡 ${escapeHtml(option.useCase)}
          </p>
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
 * Render help text at bottom of view selection
 * 
 * @returns HTML string
 */
function renderHelpText(): string {
  return `
    <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
      <p class="text-blue-900 font-medium mb-2 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        Not sure which view to choose?
      </p>
      <p class="text-blue-800 text-xs">
        Check your physician's imaging order or prescription. The "Most Common" option is typically ordered for routine evaluations. Specialized views are used for specific diagnostic needs.
      </p>
    </div>
  `;
}

/**
 * Render message when no views are available (error state)
 * 
 * @param region - Region name
 * @returns HTML string
 */
function renderNoViewsAvailable(region: string): string {
  const header = renderSectionHeader(
    'No views available',
    `No X-Ray view options found for ${region}`,
    '⚠️'
  );

  const warning = renderInfoBox({
    type: 'warning',
    title: 'Configuration error',
    message: 'No view options are configured for this body region. Please contact support.'
  });

  const backButton = renderBackButton('← Back to search', 'back-to-search-error');

  return wrapInContainer(`
    ${header}
    ${warning}
    ${backButton}
  `);
}

/**
 * Render info screen for single-view regions
 * This shouldn't typically display as single views should auto-resolve
 * 
 * @param region - Region name
 * @param option - The single view option
 * @returns HTML string
 */
function renderSingleViewInfo(region: string, option: ViewOption): string {
  const header = renderSectionHeader(
    `${region} X-Ray`,
    'Only one view option available',
    '📸'
  );

  const info = `
    <div class="bg-green-50 border border-green-200 rounded-xl p-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-green-900 mb-2">
            ${escapeHtml(option.label)}
          </h3>
          <p class="text-sm text-green-800 mb-3">
            ${escapeHtml(option.description)}
          </p>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003087] text-white rounded-full text-sm font-mono font-bold">
            <span>💎</span>
            <span>CPT ${escapeHtml(option.cpt)}</span>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-3 text-xs text-green-700">
            <div>⏱️ ${escapeHtml(option.duration)}</div>
            <div>📋 ${escapeHtml(option.prep)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const continueButton = `
    <div class="mt-6">
      <button
        type="button"
        class="xray-view-button w-full py-4 px-6 bg-[#003087] text-white rounded-xl hover:bg-[#002060] transition-all font-semibold text-lg"
        data-view-cpt="${escapeAttr(option.cpt)}"
        data-view-label="${escapeAttr(option.label)}"
      >
        Continue with this procedure →
      </button>
    </div>
  `;

  const backButton = renderBackButton('← Back to regions', 'back-to-region-single');

  return wrapInContainer(`
    ${header}
    ${info}
    ${continueButton}
    ${backButton}
  `);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Determine if a view is specialized (non-standard)
 * 
 * @param label - View label
 * @returns True if specialized view
 */
function isSpecializedView(label: string): boolean {
  const specializedKeywords = [
    'lordotic',
    'oblique',
    'special',
    'flex',
    'extension',
    'swimmer',
    'tangential',
    'bilateral',
    'merchant',
    'sunrise',
    'tunnel'
  ];
  
  const lowerLabel = label.toLowerCase();
  return specializedKeywords.some(keyword => lowerLabel.includes(keyword));
}

/**
 * Escape HTML to prevent XSS
 * 
 * @param text - Text to escape
 * @returns Escaped text
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Escape attribute value
 * 
 * @param text - Text to escape
 * @returns Escaped text
 */
function escapeAttr(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

console.log('✅ X-Ray View Selection Renderer loaded');