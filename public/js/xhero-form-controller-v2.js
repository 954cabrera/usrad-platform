// hero-form-controller-PREMIUM.js - Professional backdrop overlay version
// Enhanced with smooth animations, backdrop overlay, and premium UX

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  
  const CONFIG = {
    apiBaseUrl: getApiBaseUrl(),
    debounceDelay: 300,
    minSearchLength: 2,
    maxResults: 6,
    animationDuration: 300
  };

  // Smart API base URL detection
  function getApiBaseUrl() {
    const origin = window.location.origin;
    
    if (origin.includes('localhost:5173') || origin.includes(':5173')) {
      console.warn('⚠️ Detected Remix port, switching to Astro');
      return 'http://localhost:3000';
    }
    
    console.log('✅ Using API base URL:', origin);
    return origin;
  }

  console.log('🔗 API Base URL:', CONFIG.apiBaseUrl);

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const state = {
    selectedProcedure: null,
    searchDebounceTimer: null,
    currentSearchTerm: '',
    keyboardNavIndex: -1,
    isDropdownVisible: false
  };

  // ============================================================================
  // DOM ELEMENTS
  // ============================================================================
  
  const elements = {
    form: null,
    procedureInput: null,
    procedureDropdown: null,
    locationInput: null,
    zipInput: null,
    searchButton: null,
    step1Container: null,
    step2Container: null,
    step1Indicator: null,
    step2Indicator: null,
    step1Label: null,
    step2Label: null,
    progressFill: null,
    selectedProcedureDisplay: null,
    backButton: null,
    searchIcon: null,
    searchLoading: null,
    selectedProcedureField: null,
    searchHelper: null,
    locationHelper: null,
    detectLocationButton: null,
    locationIcon: null,
    locationLoading: null,
    backdrop: null // NEW: Backdrop overlay element
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  
  function init() {
    initializeElements();
    
    if (!validateElements()) {
      console.error('❌ Required form elements not found');
      return;
    }

    attachEventListeners();
    setupKeyboardNavigation();
    setupBackdropBehavior(); // NEW: Setup backdrop interactions
    
    console.log('✅ Hero form controller v2 initialized (PREMIUM)');
  }

  function initializeElements() {
    elements.form = document.getElementById('hero-search-form');
    elements.procedureInput = document.getElementById('hero-procedure-search');
    elements.procedureDropdown = document.getElementById('hero-procedure-dropdown');
    elements.locationInput = document.getElementById('hero-location');
    elements.zipInput = document.getElementById('hero-zip');
    elements.searchButton = document.getElementById('hero-search-button');
    elements.step1Container = document.getElementById('step-1-container');
    elements.step2Container = document.getElementById('step-2-container');
    elements.step1Indicator = document.getElementById('step-1-indicator');
    elements.step2Indicator = document.getElementById('step-2-indicator');
    elements.step1Label = document.getElementById('step-1-label');
    elements.step2Label = document.getElementById('step-2-label');
    elements.progressFill = document.getElementById('progress-fill');
    elements.selectedProcedureDisplay = document.getElementById('selected-procedure-display');
    elements.backButton = document.getElementById('back-to-step-1');
    elements.searchIcon = document.getElementById('search-icon');
    elements.searchLoading = document.getElementById('search-loading');
    elements.selectedProcedureField = document.getElementById('hero-selected-procedure');
    elements.searchHelper = document.getElementById('search-helper');
    elements.locationHelper = document.getElementById('location-helper');
    elements.detectLocationButton = document.getElementById('hero-detect-location');
    elements.locationIcon = document.getElementById('location-icon');
    elements.locationLoading = document.getElementById('location-loading');
    elements.backdrop = document.getElementById('search-backdrop'); // NEW: Get backdrop element
  }

  function validateElements() {
    return elements.form && 
           elements.procedureInput && 
           elements.procedureDropdown && 
           elements.locationInput &&
           elements.backdrop; // NEW: Validate backdrop exists
  }

  // ============================================================================
  // BACKDROP OVERLAY FUNCTIONALITY (NEW)
  // ============================================================================
  
  function setupBackdropBehavior() {
    if (!elements.backdrop) return;

    // Close dropdown when backdrop is clicked
    elements.backdrop.addEventListener('click', () => {
      hideDropdown();
    });

    // Prevent scroll on body when dropdown is open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isVisible = !elements.backdrop.classList.contains('hidden');
          if (isVisible) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        }
      });
    });

    observer.observe(elements.backdrop, { attributes: true });
  }

  function showBackdrop() {
    if (!elements.backdrop) return;
    
    elements.backdrop.classList.remove('hidden');
    // Force reflow for animation
    elements.backdrop.offsetHeight;
    elements.backdrop.classList.add('backdrop-visible');
  }

  function hideBackdrop() {
    if (!elements.backdrop) return;
    
    elements.backdrop.classList.remove('backdrop-visible');
    setTimeout(() => {
      elements.backdrop.classList.add('hidden');
    }, CONFIG.animationDuration);
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================
  
  function attachEventListeners() {
    // Step 1: Procedure search
    elements.procedureInput.addEventListener('input', handleProcedureInput);
    elements.procedureInput.addEventListener('focus', handleProcedureFocus);
    
    // Step 2: Location
    elements.locationInput.addEventListener('input', handleLocationInput);
    elements.locationInput.addEventListener('focus', showLocationHelper);
    
    if (elements.detectLocationButton) {
      elements.detectLocationButton.addEventListener('click', detectLocation);
    }
    
    // Back button
    if (elements.backButton) {
      elements.backButton.addEventListener('click', goBackToStep1);
    }
    
    // Form submission
    elements.form.addEventListener('submit', handleFormSubmit);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // ESC key to close dropdown
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isDropdownVisible) {
        hideDropdown();
      }
    });
  }

  // ============================================================================
  // PROCEDURE SEARCH
  // ============================================================================
  
  function handleProcedureInput(e) {
    const query = e.target.value.trim();
    state.currentSearchTerm = query;
    
    clearTimeout(state.searchDebounceTimer);
    
    if (query.length < CONFIG.minSearchLength) {
      hideDropdown();
      showSearchHelper();
      return;
    }
    
    hideSearchHelper();
    showSearchLoading();
    
    state.searchDebounceTimer = setTimeout(() => {
      searchProcedures(query);
    }, CONFIG.debounceDelay);
  }

  function handleProcedureFocus() {
    if (state.currentSearchTerm.length >= CONFIG.minSearchLength) {
      searchProcedures(state.currentSearchTerm);
    } else {
      showSearchHelper();
    }
  }

  async function searchProcedures(query) {
    try {
      const response = await fetch(
        `${CONFIG.apiBaseUrl}/api/procedures/search?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      hideSearchLoading();
      
      if (data.procedures && data.procedures.length > 0) {
        renderProcedureDropdown(data.procedures);
      } else {
        renderNoResults(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      hideSearchLoading();
      hideDropdown();
    }
  }

  // ============================================================================
  // DROPDOWN RENDERING - WITH SMART GROUPING
  // ============================================================================
  
  function renderProcedureDropdown(procedures) {
    if (!elements.procedureDropdown) return;
    
    // Group procedures by badge
    const grouped = groupProcedures(procedures);
    
    elements.procedureDropdown.innerHTML = '';
    
    // Render groups in priority order
    const groupOrder = [
      { key: 'most_requested', label: '🔥 MOST REQUESTED', class: 'bg-red-50 text-red-700' },
      { key: 'popular', label: '⭐ POPULAR', class: 'bg-yellow-50 text-yellow-700' },
      { key: 'common', label: '⭐ COMMON', class: 'bg-blue-50 text-blue-700' },
      { key: 'other', label: '', class: '' }
    ];
    
    groupOrder.forEach(group => {
      if (grouped[group.key] && grouped[group.key].length > 0) {
        if (group.label) {
          const header = createGroupHeader(group.label, group.class);
          elements.procedureDropdown.appendChild(header);
        }
        
        grouped[group.key].forEach(proc => {
          const card = createProcedureCard(proc);
          elements.procedureDropdown.appendChild(card);
        });
      }
    });
    
    // Add "Browse All" link at bottom
    const browseAll = createBrowseAllLink();
    elements.procedureDropdown.appendChild(browseAll);
    
    showDropdown();
  }

  function groupProcedures(procedures) {
    const grouped = {
      most_requested: [],
      popular: [],
      common: [],
      other: []
    };
    
    procedures.forEach(proc => {
      const badge = proc.badge || '';
      if (badge === 'most_requested') {
        grouped.most_requested.push(proc);
      } else if (badge === 'popular') {
        grouped.popular.push(proc);
      } else if (badge === 'common') {
        grouped.common.push(proc);
      } else {
        grouped.other.push(proc);
      }
    });
    
    return grouped;
  }

  function createGroupHeader(label, className) {
    const header = document.createElement('div');
    header.className = `px-4 py-2 text-xs font-bold uppercase tracking-wider border-b border-gray-200 ${className} sticky top-0 z-10`;
    header.textContent = label;
    return header;
  }

  function createProcedureCard(procedure) {
    const card = document.createElement('div');
    card.className = 'keyboard-nav-item px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 group';
    card.setAttribute('role', 'option');
    card.setAttribute('data-procedure-id', procedure.id);
    
    const hasOptions = procedure.options && procedure.options.length > 0;
    
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <span class="text-2xl flex-shrink-0 mt-0.5">${procedure.icon || '🏥'}</span>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-900 group-hover:text-[#003087] transition-colors leading-tight">
              ${procedure.displayName}
            </div>
            ${procedure.description ? `
              <div class="text-sm text-gray-600 mt-1 leading-snug">
                ${procedure.description}
              </div>
            ` : ''}
            ${hasOptions ? `
              <div class="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                ${procedure.options.length} option${procedure.options.length > 1 ? 's' : ''} available
              </div>
            ` : ''}
          </div>
        </div>
        ${hasOptions ? `
          <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] transition-colors flex-shrink-0 mt-1" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        ` : ''}
      </div>
    `;
    
    card.addEventListener('click', () => {
      if (hasOptions) {
        expandProcedureOptions(card, procedure);
      } else {
        selectProcedure(procedure, procedure.options[0]);
      }
    });
    
    return card;
  }

  function expandProcedureOptions(parentCard, procedure) {
    // Remove any existing expanded views
    const existing = elements.procedureDropdown.querySelector('.expanded-options');
    if (existing) existing.remove();
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'expanded-options bg-gray-50 border-t border-b border-gray-200';
    
    const optionsHTML = procedure.options.map(option => `
      <div class="option-item px-6 py-3 hover:bg-white cursor-pointer transition-all duration-200 border-b border-gray-200 last:border-b-0"
           data-cpt="${option.cpt}">
        <div class="flex items-center justify-between gap-3">
          <div class="flex-1">
            <div class="font-medium text-gray-900">${option.label}</div>
            ${option.detail ? `<div class="text-sm text-gray-600 mt-1">${option.detail}</div>` : ''}
          </div>
          ${option.price ? `<div class="text-sm font-semibold text-[#cc9933] whitespace-nowrap">${option.price}</div>` : ''}
        </div>
      </div>
    `).join('');
    
    optionsContainer.innerHTML = `
      <div class="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 border-b border-gray-200">
        SELECT SPECIFIC TYPE:
      </div>
      ${optionsHTML}
    `;
    
    parentCard.after(optionsContainer);
    
    // Smooth scroll to show options
    optionsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add click handlers to options
    optionsContainer.querySelectorAll('.option-item').forEach(optionEl => {
      optionEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const cpt = optionEl.getAttribute('data-cpt');
        const option = procedure.options.find(opt => opt.cpt === cpt);
        selectProcedure(procedure, option);
      });
    });
  }

  function createBrowseAllLink() {
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'block w-full px-4 py-3 text-center bg-gray-50 hover:bg-gray-100 transition-colors border-t-2 border-gray-200 text-sm font-medium text-gray-700 hover:text-[#003087] mb-3';
    link.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <span>Browse All Procedures</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    `;
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `${CONFIG.apiBaseUrl}/procedures`;
    });
    
    return link;
  }

  function renderNoResults(query) {
    if (!elements.procedureDropdown) return;
    
    elements.procedureDropdown.innerHTML = `
      <div class="px-6 py-8 text-center">
        <div class="text-4xl mb-3">🔍</div>
        <div class="text-gray-900 font-semibold mb-2">No results for "${query}"</div>
        <div class="text-sm text-gray-600 mb-4">
          Try searching for: MRI, CT Scan, Ultrasound, X-Ray, or Mammogram
        </div>
        <a href="${CONFIG.apiBaseUrl}/procedures" 
           class="inline-block px-4 py-2 bg-[#003087] text-white rounded-lg hover:bg-[#002066] transition-colors text-sm font-medium">
          Browse All Procedures
        </a>
      </div>
    `;
    
    showDropdown();
  }

  // ============================================================================
  // PROCEDURE SELECTION
  // ============================================================================
  
  function selectProcedure(procedure, option) {
    state.selectedProcedure = { procedure, option };
    
    // Store in hidden form field
    if (elements.selectedProcedureField) {
      elements.selectedProcedureField.value = option ? option.cpt : procedure.id;
    }
    
    // Clear and hide dropdown
    hideDropdown();
    elements.procedureInput.value = '';
    
    // Animate to step 2
    transitionToStep2(procedure, option);
  }

  function transitionToStep2(procedure, option) {
    // Update display text
    const displayText = option ? option.label : procedure.displayName;
    if (elements.selectedProcedureDisplay) {
      elements.selectedProcedureDisplay.textContent = displayText;
    }
    
    // Animate step 1 out
    if (elements.step1Container) {
      elements.step1Container.classList.add('step-fade-out');
    }
    
    // Update progress indicators
    updateProgressIndicators(true);
    
    setTimeout(() => {
      // Hide step 1
      if (elements.step1Container) {
        elements.step1Container.classList.add('hidden');
      }
      
      // Show step 2 with animation
      if (elements.step2Container) {
        elements.step2Container.classList.remove('hidden');
        elements.step2Container.classList.add('step-fade-in');
        
        // Focus location input
        setTimeout(() => {
          if (elements.locationInput) {
            elements.locationInput.focus();
            showLocationHelper();
          }
        }, 100);
      }
    }, CONFIG.animationDuration);
  }

  function updateProgressIndicators(isStep2Active) {
    if (isStep2Active) {
      // Step 1 completed
      if (elements.step1Indicator) {
        elements.step1Indicator.classList.remove('bg-[#003087]', 'text-white');
        elements.step1Indicator.classList.add('bg-green-500', 'text-white');
        elements.step1Indicator.innerHTML = `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        `;
        elements.step1Indicator.classList.add('celebrate');
      }
      
      if (elements.step1Label) {
        elements.step1Label.classList.add('text-green-500');
      }
      
      // Animate progress bar
      if (elements.progressFill) {
        elements.progressFill.style.width = '100%';
      }
      
      // Step 2 active
      if (elements.step2Indicator) {
        elements.step2Indicator.classList.remove('bg-white/20', 'text-white/50');
        elements.step2Indicator.classList.add('bg-[#003087]', 'text-white', 'shadow-lg');
      }
      
      if (elements.step2Label) {
        elements.step2Label.classList.remove('text-white/50');
        elements.step2Label.classList.add('text-white', 'font-semibold');
      }
    } else {
      // Reset to step 1
      if (elements.step1Indicator) {
        elements.step1Indicator.classList.remove('bg-green-500', 'celebrate');
        elements.step1Indicator.classList.add('bg-[#003087]', 'text-white');
        elements.step1Indicator.textContent = '1';
      }
      
      if (elements.step1Label) {
        elements.step1Label.classList.remove('text-green-500');
      }
      
      if (elements.progressFill) {
        elements.progressFill.style.width = '0%';
      }
      
      if (elements.step2Indicator) {
        elements.step2Indicator.classList.remove('bg-[#003087]', 'shadow-lg');
        elements.step2Indicator.classList.add('bg-white/20', 'text-white/50');
      }
      
      if (elements.step2Label) {
        elements.step2Label.classList.remove('font-semibold');
        elements.step2Label.classList.add('text-white/50');
      }
    }
  }

  function goBackToStep1() {
    // Fade out step 2
    if (elements.step2Container) {
      elements.step2Container.classList.add('step-fade-out');
    }
    
    // Reset progress indicators
    updateProgressIndicators(false);
    
    setTimeout(() => {
      // Hide step 2
      if (elements.step2Container) {
        elements.step2Container.classList.add('hidden');
        elements.step2Container.classList.remove('step-fade-out', 'step-fade-in');
      }
      
      // Show step 1
      if (elements.step1Container) {
        elements.step1Container.classList.remove('hidden', 'step-fade-out');
        elements.step1Container.classList.add('step-fade-in');
        
        // Focus procedure input
        setTimeout(() => {
          if (elements.procedureInput) {
            elements.procedureInput.focus();
          }
        }, 100);
      }
      
      // Clear location
      if (elements.locationInput) {
        elements.locationInput.value = '';
      }
      if (elements.zipInput) {
        elements.zipInput.value = '';
      }
      
      // Disable search button
      if (elements.searchButton) {
        elements.searchButton.disabled = true;
      }
    }, CONFIG.animationDuration);
  }

  // ============================================================================
  // LOCATION HANDLING
  // ============================================================================
  
  function handleLocationInput(e) {
    const zip = e.target.value.replace(/\D/g, '').slice(0, 5);
    e.target.value = zip;
    
    if (elements.zipInput) {
      elements.zipInput.value = zip;
    }
    
    // Enable/disable search button
    if (elements.searchButton) {
      elements.searchButton.disabled = zip.length !== 5;
    }
    
    // Hide helper once user starts typing
    if (zip.length > 0) {
      hideLocationHelper();
    }
  }

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    showLocationLoading();
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `${CONFIG.apiBaseUrl}/api/geo/reverse?lat=${latitude}&lon=${longitude}`
          );
          
          if (!response.ok) throw new Error('Geolocation failed');
          
          const data = await response.json();
          
          if (data.zipCode && elements.locationInput) {
            elements.locationInput.value = data.zipCode;
            
            if (elements.zipInput) {
              elements.zipInput.value = data.zipCode;
            }
            
            if (elements.searchButton) {
              elements.searchButton.disabled = false;
            }
          }
          
          hideLocationLoading();
        } catch (error) {
          console.error('Geolocation error:', error);
          hideLocationLoading();
          alert('Could not determine your location. Please enter your ZIP code manually.');
        }
      },
      (error) => {
        hideLocationLoading();
        console.error('Geolocation error:', error);
        alert('Location access denied. Please enter your ZIP code manually.');
      }
    );
  }

  // ============================================================================
  // UI HELPERS
  // ============================================================================
  
  function showDropdown() {
    if (!elements.procedureDropdown) return;
    
    elements.procedureDropdown.classList.remove('hidden');
    elements.procedureDropdown.setAttribute('aria-expanded', 'true');
    state.isDropdownVisible = true;
    state.keyboardNavIndex = -1;
    
    // Show backdrop with smooth animation
    showBackdrop();
  }

  function hideDropdown() {
    if (!elements.procedureDropdown) return;
    
    elements.procedureDropdown.classList.add('hidden');
    elements.procedureDropdown.setAttribute('aria-expanded', 'false');
    elements.procedureDropdown.innerHTML = '';
    state.isDropdownVisible = false;
    state.keyboardNavIndex = -1;
    
    // Hide backdrop with smooth animation
    hideBackdrop();
  }

  function showSearchLoading() {
    if (elements.searchIcon) elements.searchIcon.classList.add('hidden');
    if (elements.searchLoading) elements.searchLoading.classList.remove('hidden');
  }

  function hideSearchLoading() {
    if (elements.searchLoading) elements.searchLoading.classList.add('hidden');
    if (elements.searchIcon) elements.searchIcon.classList.remove('hidden');
  }

  function showSearchHelper() {
    if (elements.searchHelper) {
      elements.searchHelper.style.opacity = '1';
    }
  }

  function hideSearchHelper() {
    if (elements.searchHelper) {
      elements.searchHelper.style.opacity = '0';
    }
  }

  function showLocationHelper() {
    if (elements.locationHelper) {
      elements.locationHelper.style.opacity = '1';
    }
  }

  function hideLocationHelper() {
    if (elements.locationHelper) {
      elements.locationHelper.style.opacity = '0';
    }
  }

  function showLocationLoading() {
    if (elements.locationIcon) elements.locationIcon.classList.add('hidden');
    if (elements.locationLoading) elements.locationLoading.classList.remove('hidden');
  }

  function hideLocationLoading() {
    if (elements.locationLoading) elements.locationLoading.classList.add('hidden');
    if (elements.locationIcon) elements.locationIcon.classList.remove('hidden');
  }

  function handleOutsideClick(e) {
    if (!state.isDropdownVisible) return;
    
    const isClickInsideInput = elements.procedureInput && elements.procedureInput.contains(e.target);
    const isClickInsideDropdown = elements.procedureDropdown && elements.procedureDropdown.contains(e.target);
    
    if (!isClickInsideInput && !isClickInsideDropdown) {
      hideDropdown();
    }
  }

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================
  
  function setupKeyboardNavigation() {
    if (!elements.procedureInput) return;
    
    elements.procedureInput.addEventListener('keydown', handleKeyboardNav);
  }

  function handleKeyboardNav(e) {
    if (!state.isDropdownVisible) return;
    
    const items = elements.procedureDropdown.querySelectorAll('.keyboard-nav-item');
    if (items.length === 0) return;
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        state.keyboardNavIndex = Math.min(state.keyboardNavIndex + 1, items.length - 1);
        updateKeyboardHighlight(items);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        state.keyboardNavIndex = Math.max(state.keyboardNavIndex - 1, 0);
        updateKeyboardHighlight(items);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (state.keyboardNavIndex >= 0) {
          items[state.keyboardNavIndex].click();
        }
        break;
        
      case 'Escape':
        hideDropdown();
        break;
    }
  }

  function updateKeyboardHighlight(items) {
    items.forEach((item, index) => {
      if (index === state.keyboardNavIndex) {
        item.classList.add('bg-blue-100');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('bg-blue-100');
      }
    });
  }

  // ============================================================================
  // FORM SUBMISSION
  // ============================================================================
  
  function handleFormSubmit(e) {
    if (elements.searchButton && elements.searchButton.disabled) {
      e.preventDefault();
      return;
    }
    
    // Form will submit naturally with all hidden fields populated
  }

  // ============================================================================
  // START APPLICATION
  // ============================================================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();