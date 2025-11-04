/**
 * SEARCH RESULTS RENDERER
 * ========================
 * Renders comprehensive search results grouped by modality
 * Extracted from comprehensive search display logic
 * 
 * Usage:
 *   import { renderSearchResults } from './search-results-renderer';
 */

import type { SearchResult } from '../types';
import { getModalityIcon, getModalityColor } from '../utils/modality-detector';
import { groupByModality } from '../utils/search-engine';
import {
  renderSectionHeader,
  renderBackButton,
  renderNoResults,
  wrapInContainer,
  renderInfoBox
} from './renderer-core';

// ============================================
// MAIN RENDER FUNCTION
// ============================================

/**
 * Render comprehensive search results
 * 
 * @param results - Array of search results
 * @param query - User's search query
 * @param preSelectedContrast - Optional pre-selected contrast filter
 * @returns HTML string
 */
export function renderSearchResults(
  results: SearchResult[],
  query: string,
  preSelectedContrast?: string
): string {
  if (results.length === 0) {
    return renderNoResults(query, ['knee', 'spine', 'brain', 'breast']);
  }

  const grouped = groupByModality(results);

  const header = renderSectionHeader(
    `${results.length} ${results.length === 1 ? 'procedure' : 'procedures'} found for "${query}"`,
    'Select the procedure you need'
  );

  const filterInfo = preSelectedContrast
    ? renderInfoBox({
        type: 'info',
        message: `Filtered for: ${preSelectedContrast}`,
        icon: true
      })
    : '';

  const modalityGroups = Object.keys(grouped)
    .sort()
    .map(modality => renderModalityGroup(modality, grouped[modality]))
    .join('');

  const backButton = renderBackButton('← Clear search and start over', 'back-to-empty-search');

  return wrapInContainer(`
    ${header}
    ${filterInfo}
    <div class="space-y-6">
      ${modalityGroups}
    </div>
    ${backButton}
  `);
}

/**
 * Render a group of results for one modality
 * 
 * @param modality - Modality name (MRI, CT, etc.)
 * @param procedures - Array of procedures for this modality
 * @returns HTML string
 */
function renderModalityGroup(modality: string, procedures: SearchResult[]): string {
  const icon = getModalityIcon(modality as any);
  const color = getModalityColor(modality as any);

  const procedureCards = procedures
    .map(proc => renderProcedureCard(proc))
    .join('');

  return `
    <div class="modality-group">
      <h4 class="text-lg font-bold mb-3 pb-2 border-b-2 flex items-center gap-2" style="color: ${color}; border-color: ${color};">
        <span class="text-2xl">${icon}</span>
        <span>${modality}</span>
        <span class="text-sm font-normal text-gray-500">(${procedures.length})</span>
      </h4>
      <div class="space-y-2">
        ${procedureCards}
      </div>
    </div>
  `;
}

/**
 * Render a single procedure result card
 * 
 * @param procedure - Procedure result
 * @returns HTML string
 */
function renderProcedureCard(procedure: SearchResult): string {
  return `
    <button
      type="button"
      class="comprehensive-result-button w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
      data-comprehensive-cpt="${procedure.cpt}"
      data-comprehensive-label="${procedure.label}"
    >
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <span class="text-2xl flex-shrink-0">${procedure.icon}</span>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- Title -->
          <div class="font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
            ${procedure.label}
          </div>
          
          <!-- Description -->
          <div class="text-sm text-gray-600 mt-1 line-clamp-2">
            ${procedure.description}
          </div>
          
          <!-- Metadata -->
          <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
            <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">CPT: ${procedure.cpt}</span>
            <span>⏱️ ${procedure.duration}</span>
          </div>
        </div>
        
        <!-- Arrow -->
        <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </button>
  `;
}

// ============================================
// FILTERED RESULTS (when contrast filter applied)
// ============================================

/**
 * Render filtered results with option to clear filter
 * 
 * @param results - Filtered search results
 * @param query - User's search query
 * @param contrast - Applied contrast filter
 * @returns HTML string
 */
export function renderFilteredResults(
  results: SearchResult[],
  query: string,
  contrast: string
): string {
  if (results.length === 0) {
    return renderNoFilteredResults(query, contrast);
  }

  return renderSearchResults(results, query, contrast);
}

/**
 * Render message when filter produces no results
 * 
 * @param query - User's search query
 * @param contrast - Applied contrast filter
 * @returns HTML string
 */
function renderNoFilteredResults(query: string, contrast: string): string {
  const header = renderSectionHeader(
    'Limited Availability',
    `No "${query}" procedures with "${contrast}"`
  );

  const warning = renderInfoBox({
    type: 'warning',
    title: 'Contrast option not available',
    message: `This body part may not support "${contrast}" contrast. Try viewing all available options.`
  });

  const actionButton = `
    <div class="text-center">
      <button
        type="button"
        id="show-all-contrast-options"
        class="px-6 py-3 bg-[#003087] text-white rounded-lg hover:bg-[#002060] transition-colors font-medium"
      >
        Show All Contrast Options
      </button>
    </div>
  `;

  return wrapInContainer(`
    ${header}
    ${warning}
    ${actionButton}
  `);
}

// ============================================
// COMPACT SEARCH RESULTS (for inline display)
// ============================================

/**
 * Render compact search results (fewer details)
 * 
 * @param results - Array of search results
 * @param limit - Maximum results to show
 * @returns HTML string
 */
export function renderCompactSearchResults(
  results: SearchResult[],
  limit: number = 5
): string {
  const limitedResults = results.slice(0, limit);

  const cards = limitedResults.map(proc => `
    <button
      type="button"
      class="compact-result-btn w-full p-3 text-left border border-gray-200 rounded-lg hover:border-[#003087] hover:bg-blue-50 transition-all group"
      data-cpt="${proc.cpt}"
      data-label="${proc.label}"
    >
      <div class="flex items-center gap-2">
        <span class="text-xl">${proc.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-900 group-hover:text-[#003087] truncate">
            ${proc.label}
          </div>
          <div class="text-xs text-gray-500">CPT: ${proc.cpt}</div>
        </div>
        <svg class="w-4 h-4 text-gray-400 group-hover:text-[#003087] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </button>
  `).join('');

  const showMore = results.length > limit ? `
    <button
      type="button"
      class="w-full p-2 text-sm text-gray-600 hover:text-[#003087] font-medium transition-colors"
      id="show-all-results"
    >
      Show ${results.length - limit} more results
    </button>
  ` : '';

  return `
    <div class="space-y-2">
      ${cards}
      ${showMore}
    </div>
  `;
}

// ============================================
// SPECIAL PROCEDURE TYPES
// ============================================

/**
 * Render special procedure selector (Mammography, Nuclear Medicine, PET)
 * 
 * @param config - Special procedure configuration
 * @returns HTML string
 */
export function renderSpecialProcedures(config: {
  title: string;
  procedures: Array<{
    cpt: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  }>;
}): string {
  const header = renderSectionHeader(config.title);

  const procedureCards = config.procedures.map(proc => `
    <button
      type="button"
      data-special-cpt="${proc.cpt}"
      data-special-name="${proc.name}"
      class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
    >
      <div class="flex items-start gap-4">
        <!-- Icon -->
        <div class="flex-shrink-0 w-12 h-12 rounded-full bg-${proc.color}-100 flex items-center justify-center group-hover:bg-${proc.color}-200 transition-colors">
          <span class="text-2xl">${proc.icon}</span>
        </div>
        
        <!-- Content -->
        <div class="flex-1">
          <div class="font-bold text-lg text-gray-900 mb-1">${proc.name}</div>
          <div class="text-sm text-gray-600">${proc.description}</div>
          <div class="text-xs text-gray-500 mt-2">CPT: ${proc.cpt}</div>
        </div>
      </div>
    </button>
  `).join('');

  return wrapInContainer(`
    ${header}
    <div class="space-y-4">
      ${procedureCards}
    </div>
  `);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Highlight search terms in text
 * 
 * @param text - Text to highlight in
 * @param query - Search query
 * @returns HTML string with highlights
 */
export function highlightSearchTerms(text: string, query: string): string {
  if (!query) return text;

  const terms = query.toLowerCase().split(' ');
  let result = text;

  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });

  return result;
}

console.log('✅ Search Results Renderer loaded');