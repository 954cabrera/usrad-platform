// search-transition.js
// Handles the transition from Astro search form to Remix results page
// Shows loading overlay IMMEDIATELY when user clicks "Find Centers"

(function() {
  'use strict';

  const DEBUG = false;

  /**
   * Initialize search transition handling
   */
  function initSearchTransition() {
    if (DEBUG) console.log('[SearchTransition] Initializing...');

    // Find all search form submit buttons/links
    hookIntoSearchForms();
    
    // Also handle direct navigation links to pbs/search
    hookIntoSearchLinks();

    if (DEBUG) console.log('[SearchTransition] Ready');
  }

  /**
   * Hook into search form submissions
   */
  function hookIntoSearchForms() {
    // Hook into SearchStep2's "Find Centers" button click
    document.addEventListener('click', function(e) {
      const target = e.target.closest('[data-search-submit], #find-centers-btn, .find-centers-trigger');
      
      if (target) {
        handleSearchSubmit(e, target);
      }
    }, true);

    // Also intercept form submissions
    document.addEventListener('submit', function(e) {
      const form = e.target.closest('form[data-search-form]');
      
      if (form) {
        handleFormSubmit(e, form);
      }
    }, true);
  }

  /**
   * Hook into direct links to search results
   */
  function hookIntoSearchLinks() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href*="/pbs/search"]');
      
      if (link && !link.hasAttribute('data-no-loading')) {
        const href = link.getAttribute('href');
        
        // Extract procedure info from URL
        const url = new URL(href, window.location.origin);
        const procedureName = url.searchParams.get('procedureName') || 
                             url.searchParams.get('procedure') || 
                             'your procedure';
        
        showLoadingOverlay(procedureName);
      }
    });
  }

  /**
   * Handle search button click
   */
  function handleSearchSubmit(e, button) {
    // Get search context from SearchManager or data attributes
    const searchManager = window.searchManager;
    
    let procedureName = 'MRI';
    let radius = '25';
    
    if (searchManager) {
      const state = searchManager.getState ? searchManager.getState() : searchManager.state;
      if (state?.selectedProcedure) {
        procedureName = state.selectedProcedure.label || state.selectedProcedure.name || 'MRI';
      }
    }
    
    // Try to get from DOM
    const procedureInput = document.getElementById('hero-search-input');
    if (procedureInput && procedureInput.value) {
      procedureName = procedureInput.value;
    }
    
    const radiusSelect = document.getElementById('radius-select');
    if (radiusSelect && radiusSelect.value) {
      radius = radiusSelect.value;
    }

    if (DEBUG) console.log('[SearchTransition] Search submitted:', { procedureName, radius });

    showLoadingOverlay(procedureName, radius);
  }

  /**
   * Handle form submission
   */
  function handleFormSubmit(e, form) {
    const formData = new FormData(form);
    const procedureName = formData.get('procedure') || formData.get('procedureName') || 'MRI';
    const radius = formData.get('radius') || '25';

    showLoadingOverlay(procedureName, radius);
  }

  /**
   * Show the loading overlay
   */
  function showLoadingOverlay(procedureName = 'MRI', radius = '25') {
    if (window.SearchLoadingOverlay) {
      window.SearchLoadingOverlay.show(procedureName, radius);
    } else {
      // Fallback: Create simple overlay if component not loaded
      createFallbackOverlay(procedureName);
    }
  }

  /**
   * Fallback overlay if SearchLoadingOverlay component not available
   */
  function createFallbackOverlay(procedureName) {
    const existing = document.getElementById('search-loading-fallback');
    if (existing) {
      existing.classList.remove('hidden');
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'search-loading-fallback';
    overlay.className = 'fixed inset-0 z-[999999] flex items-center justify-center bg-white/95 backdrop-blur-sm';
    overlay.innerHTML = `
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-[#003087] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Finding imaging centers...</h2>
        <p class="text-gray-600">Searching for ${procedureName} near you</p>
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchTransition);
  } else {
    initSearchTransition();
  }

  // Re-initialize on Astro page transitions
  document.addEventListener('astro:page-load', initSearchTransition);

  // Expose for debugging
  window.SearchTransition = {
    showLoading: showLoadingOverlay,
    init: initSearchTransition
  };

})();