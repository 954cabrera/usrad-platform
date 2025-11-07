/**
 * UI RENDERER CORE
 * =================
 * Core HTML generation utilities for modal UI
 * Clean, template-based rendering with no business logic
 * 
 * Usage:
 *   import { renderModal, renderButton } from './renderer-core';
 */

import type { Modality, ContrastType } from '../types';
import { getModalityIcon, getModalityColor } from '../utils/modality-detector';

// ============================================
// LOADING & EMPTY STATES
// ============================================

/**
 * Render loading spinner
 * 
 * @param message - Loading message to display
 * @returns HTML string
 */
export function renderLoadingState(message: string = 'Loading...'): string {
  return `
    <div class="text-center py-12">
      <svg class="w-12 h-12 mx-auto mb-4 text-[#003087] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Render empty search state
 * 
 * @returns HTML string
 */
export function renderEmptySearchState(): string {
  return `
    <div class="text-center py-12 text-gray-500">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <p class="text-lg font-medium">Start typing to search procedures</p>
      <p class="text-sm mt-1">Try "MRI", "CT Scan", or a body part like "knee"</p>
    </div>
  `;
}

/**
 * Render no results message
 * 
 * @param query - User's search query
 * @param suggestions - Optional suggested search terms
 * @returns HTML string
 */
export function renderNoResults(query: string, suggestions?: string[]): string {
  const suggestionChips = suggestions?.length ? `
    <div class="mt-6">
      <p class="text-sm text-gray-700 mb-2">Try searching for:</p>
      <div class="flex flex-wrap gap-2 justify-center">
        ${suggestions.map(term => `
          <button
            type="button"
            class="suggestion-chip px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#003087] hover:bg-blue-50 transition-all"
            data-suggest="${escapeHtml(term)}"
          >
            ${escapeHtml(term)}
          </button>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="text-center py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-lg font-medium text-gray-900 mb-2">No procedures found</p>
      <p class="text-sm text-gray-600">No results for "${escapeHtml(query)}"</p>
      ${suggestionChips}
    </div>
  `;
}

// ============================================
// BUTTON COMPONENTS
// ============================================

/**
 * Render a primary action button
 * 
 * @param options - Button configuration
 * @returns HTML string
 */
export function renderButton(options: {
  text: string;
  dataAttributes?: Record<string, string>;
  className?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}): string {
  const {
    text,
    dataAttributes = {},
    className = '',
    icon = '',
    variant = 'primary'
  } = options;

  const baseClasses = 'w-full p-4 text-left rounded-xl transition-all duration-200 group';
  const variantClasses = {
    primary: 'border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50',
    secondary: 'border border-gray-300 hover:border-[#003087] hover:bg-gray-50',
    ghost: 'hover:bg-gray-100'
  };

  const dataAttrs = Object.entries(dataAttributes)
    .map(([key, value]) => `data-${key}="${escapeHtml(value)}"`)
    .join(' ');

  return `
    <button
      type="button"
      class="${baseClasses} ${variantClasses[variant]} ${className}"
      ${dataAttrs}
    >
      <div class="flex items-start gap-4">
        ${icon ? `<div class="flex-shrink-0 text-3xl">${icon}</div>` : ''}
        <div class="flex-1 min-w-0">
          ${escapeHtml(text)}
        </div>
        <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </button>
  `;
}

/**
 * Render a card-style button with description
 * 
 * @param options - Card button configuration
 * @returns HTML string
 */
export function renderCardButton(options: {
  title: string;
  description: string;
  icon: string;
  dataAttributes?: Record<string, string>;
  badge?: string;
  metadata?: string;
}): string {
  const {
    title,
    description,
    icon,
    dataAttributes = {},
    badge,
    metadata
  } = options;

  const dataAttrs = Object.entries(dataAttributes)
    .map(([key, value]) => `data-${key}="${escapeHtml(value)}"`)
    .join(' ');

  return `
    <button
      type="button"
      class="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
      ${dataAttrs}
    >
      <div class="flex items-start gap-4">
        <!-- Icon -->
        <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#003087] to-[#0052cc] flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
          ${icon}
        </div>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <div class="font-bold text-lg text-gray-900 group-hover:text-[#003087] transition-colors">
              ${escapeHtml(title)}
            </div>
            ${badge ? `
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                ${escapeHtml(badge)}
              </span>
            ` : ''}
          </div>
          <div class="text-sm text-gray-600 mb-2">
            ${escapeHtml(description)}
          </div>
          ${metadata ? `
            <div class="text-xs text-gray-500">
              ${metadata}
            </div>
          ` : ''}
        </div>
        
        <!-- Arrow -->
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </button>
  `;
}

// ============================================
// BREADCRUMB COMPONENT
// ============================================

/**
 * Render progress breadcrumb
 * 
 * @param steps - Array of step labels
 * @param currentIndex - Current step index (0-based)
 * @returns HTML string
 */
export function renderBreadcrumb(steps: string[], currentIndex: number): string {
  return `
    <div class="flex items-center gap-2 text-sm mb-4">
      ${steps.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isPast = index < currentIndex;
        
        return `
          ${index > 0 ? `
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          ` : ''}
          <span class="${isCurrent ? 'font-semibold text-[#003087]' : isPast ? 'text-[#003087]' : 'text-gray-600'}">
            ${escapeHtml(step)}
          </span>
        `;
      }).join('')}
    </div>
  `;
}

// ============================================
// SECTION HEADER
// ============================================

/**
 * Render section header with title and subtitle
 * 
 * @param title - Main title
 * @param subtitle - Optional subtitle
 * @param icon - Optional icon
 * @returns HTML string
 */
export function renderSectionHeader(
  title: string,
  subtitle?: string,
  icon?: string
): string {
  return `
    <div class="text-center mb-6">
      ${icon ? `<div class="text-4xl mb-2">${icon}</div>` : ''}
      <h3 class="text-2xl font-bold text-gray-900 mb-2">
        ${escapeHtml(title)}
      </h3>
      ${subtitle ? `
        <p class="text-gray-600">${escapeHtml(subtitle)}</p>
      ` : ''}
    </div>
  `;
}

// ============================================
// INFO BOX COMPONENT
// ============================================

/**
 * Render info/warning/success box
 * 
 * @param options - Info box configuration
 * @returns HTML string
 */
export function renderInfoBox(options: {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  message: string;
  icon?: boolean;
}): string {
  const { type, title, message, icon = true } = options;

  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-600'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-600'
    }
  };

  const style = styles[type];

  return `
    <div class="px-4 py-3 ${style.bg} border ${style.border} rounded-lg">
      <div class="flex items-start gap-2">
        ${icon ? `
          <svg class="w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        ` : ''}
        <div class="flex-1">
          ${title ? `
            <p class="font-semibold ${style.text}">${escapeHtml(title)}</p>
          ` : ''}
          <p class="text-sm ${style.text} ${title ? 'mt-1' : ''}">
            ${escapeHtml(message)}
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// BACK BUTTON
// ============================================

/**
 * Render back/cancel button
 * 
 * @param text - Button text
 * @param id - Element ID
 * @returns HTML string
 */
export function renderBackButton(text: string = 'Back', id?: string): string {
  return `
    <div class="text-center pt-4 border-t border-gray-200">
      <button
        type="button"
        ${id ? `id="${id}"` : ''}
        class="region-back-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 6px;">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/>
        </svg>
        ${escapeHtml(text)}
      </button>
    </div>
  `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Escape HTML to prevent XSS
 * 
 * @param unsafe - Unsafe string
 * @returns Escaped string
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Wrap content in a container div
 * 
 * @param content - HTML content
 * @param className - Optional container class
 * @returns HTML string
 */
export function wrapInContainer(content: string, className: string = 'space-y-6 p-6'): string {
  return `<div class="${className}">${content}</div>`;
}

/**
 * Create a grid layout
 * 
 * @param items - Array of HTML items
 * @param columns - Number of columns (1-4)
 * @returns HTML string
 */
export function renderGrid(items: string[], columns: 1 | 2 | 3 | 4 = 2): string {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return `
    <div class="grid ${gridClasses[columns]} gap-3">
      ${items.join('')}
    </div>
  `;
}

console.log('✅ UI Renderer Core loaded');