// ======================================================
// SEARCH MANAGER CLIENT LOADER
// ======================================================
// This file is the bridge between Astro's build system and
// the browser. It bundles all search logic and exposes a
// global window.searchManager instance.
//
// Architecture:
// - Lives in /src/lib/search/ (gets bundled by Vite)
// - Loaded via <script src="..." client:load> in HeroSection
// - Exposes window.searchManager for all UI components
// - No direct imports needed in UI components
// ======================================================

import { searchManager } from './search-manager';
import type { SearchManager } from './search-manager';

// ======================================================
// GLOBAL INTERFACE DECLARATIONS
// ======================================================
declare global {
  interface Window {
    searchManager: SearchManager;
    isMobileViewport: () => boolean;
    ProcedureLibrary?: {
      MRI: Record<string, any>;
      CT: Record<string, any>;
      'X-Ray': Record<string, any>;
      Ultrasound: Record<string, any>;
      Popular: any[];
    };
  }
}

// ======================================================
// UTILITY: MOBILE VIEWPORT DETECTION
// ======================================================
function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

// ======================================================
// UTILITY: FLATTEN PROCEDURE GROUPS
// ======================================================
// Converts procedure-data.js nested structure into flat array
// Example: { brain: { procedures: [...] } } → [...]
function flattenProcedureGroups(groupObj: Record<string, any>): any[] {
  const output: any[] = [];
  for (const key in groupObj) {
    const group = groupObj[key];
    if (group && Array.isArray(group.procedures)) {
      output.push(...group.procedures);
    }
  }
  return output;
}

// ======================================================
// INITIALIZATION LOGIC
// ======================================================
function initializeSearchEngine(): void {
  const DEBUG = false;

  // Wait for ProcedureLibrary to load from /js/procedure-data.js
  if (typeof window.ProcedureLibrary === 'undefined') {
    if (DEBUG) console.log('[SearchClient] Waiting for ProcedureLibrary...');
    setTimeout(initializeSearchEngine, 70);
    return;
  }

  const lib = window.ProcedureLibrary;
  if (!lib) {
    console.error('❌ [SearchClient] ProcedureLibrary missing');
    return;
  }

  try {
    // Normalize popular procedures format (handles both array and object formats)
    let popularProcs = Array.isArray(lib.Popular)
      ? lib.Popular
      : Object.values(lib.Popular || {}).flatMap((group: any) => group.procedures || []);

    // Initialize SearchManager with flattened procedure data
    searchManager.initialize(
      flattenProcedureGroups(lib.MRI),
      flattenProcedureGroups(lib.CT),
      flattenProcedureGroups(lib['X-Ray']),
      flattenProcedureGroups(lib.Ultrasound),
      popularProcs
    );

    if (DEBUG) console.log('✅ [SearchClient] SearchManager initialized successfully');
  } catch (err) {
    console.error('❌ [SearchClient] Initialization error:', err);
  }
}

// ======================================================
// EXPOSE TO BROWSER WINDOW
// ======================================================
// Make searchManager available globally for all UI components
window.searchManager = searchManager;
window.isMobileViewport = isMobileViewport;

// ======================================================
// AUTO-INITIALIZE ON DOM READY
// ======================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearchEngine);
} else {
  initializeSearchEngine();
}

// Support Astro page transitions (if using View Transitions)
document.addEventListener('astro:page-load', initializeSearchEngine);

console.log('[SearchClient] Client loader initialized - waiting for ProcedureLibrary');