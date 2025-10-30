// hero-form-controller-modal-WITH-OPTIONS.js
// World-Class Modal with Expandable Procedure Options
// UPDATED: Expandable procedures with individual CPT code selection

console.log('✅ Hero form controller MODAL version initialized (with expandable options)');

// Track expanded procedures
let expandedProcedures = new Set();

// ═══════════════════════════════════════════════════════
// MODAL CONTROL FUNCTIONS
// ═══════════════════════════════════════════════════════

function openModal() {
  const modal = document.getElementById('modal-search-overlay');
  const modalInput = document.getElementById('modal-search-input');
  const heroInput = document.getElementById('hero-procedure-search');
  
  if (heroInput && modalInput) {
    modalInput.value = heroInput.value;
  }
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    modal.classList.add('modal-opening');
  }, 10);
  
  setTimeout(() => {
    modalInput?.focus();
  }, 300);
  
  if (modalInput?.value.trim().length >= 2) {
    handleModalSearch(modalInput.value);
  }
  
  console.log('✅ Modal opened');
}

function closeModal() {
  const modal = document.getElementById('modal-search-overlay');
  
  modal.classList.remove('modal-opening');
  modal.classList.add('modal-closing');
  
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('modal-closing');
    document.body.style.overflow = '';
    
    // Reset expanded procedures
    expandedProcedures.clear();
  }, 300);
  
  console.log('✅ Modal closed');
}

// ═══════════════════════════════════════════════════════
// SEARCH FUNCTIONS
// ═══════════════════════════════════════════════════════

let searchTimeout;
const SEARCH_DELAY = 300;

async function handleModalSearch(query) {
  const resultsContainer = document.getElementById('modal-results');
  
  if (!query || query.trim().length < 2) {
    resultsContainer.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <p class="text-lg font-medium">Start typing to search procedures</p>
        <p class="text-sm mt-1">Try "MRI", "CT Scan", or "Ultrasound"</p>
      </div>
    `;
    return;
  }
  
  resultsContainer.innerHTML = `
    <div class="text-center py-12">
      <svg class="w-12 h-12 mx-auto mb-4 text-[#003087] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600">Searching...</p>
    </div>
  `;
  
  try {
    console.log('🔍 Calling API: /api/procedures/search?q=' + query);
    const response = await fetch(`/api/procedures/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API Response:', data);
    
    if (data.procedures && data.procedures.length > 0) {
      displayModalResults(data.procedures);
    } else {
      resultsContainer.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium text-gray-900 mb-2">No procedures found</p>
          <p class="text-sm text-gray-600">Try a different search term or browse all procedures</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('❌ Search error:', error);
    resultsContainer.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-lg font-medium text-gray-900 mb-2">Something went wrong</p>
        <p class="text-sm text-gray-600">Please try again</p>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════
// DISPLAY RESULTS WITH EXPANDABLE OPTIONS
// ═══════════════════════════════════════════════════════

function displayModalResults(procedures) {
  const resultsContainer = document.getElementById('modal-results');
  
  const html = procedures.map(proc => {
    const isExpanded = expandedProcedures.has(proc.id);
    const hasMultipleOptions = proc.options && proc.options.length > 1;
    
    return `
      <div class="mb-3" data-procedure-id="${proc.id}">
        <!-- Main procedure card -->
        <button
          type="button"
          class="procedure-header w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group ${isExpanded ? 'border-[#003087] bg-blue-50' : ''}"
          data-procedure-id="${proc.id}"
          data-has-options="${hasMultipleOptions}"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#003087] to-[#0052cc] flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
              ${proc.icon || '🔬'}
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-gray-900 group-hover:text-[#003087] transition-colors">
                  ${proc.displayName}
                </h4>
                ${proc.badge ? `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-white">${proc.badge}</span>` : ''}
              </div>
              ${proc.description ? `<p class="text-sm text-gray-600">${proc.description}</p>` : ''}
              
              ${!hasMultipleOptions && proc.options && proc.options.length === 1 ? `
                <p class="text-sm font-medium text-gray-700 mt-2">
                  ${proc.options[0].price || 'Price available upon request'}
                </p>
              ` : ''}
            </div>
            
            <!-- Arrow (expand/collapse or select) -->
            <div class="flex-shrink-0">
              ${hasMultipleOptions ? `
                <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] transition-all ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              ` : `
                <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              `}
            </div>
          </div>
        </button>
        
        <!-- Expandable options (if multiple) -->
        ${hasMultipleOptions ? `
          <div class="procedure-options mt-2 ml-4 space-y-2 ${isExpanded ? '' : 'hidden'}">
            ${proc.options.map(opt => `
              <button
                type="button"
                class="option-button w-full text-left p-3 pl-16 rounded-lg border border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
                data-procedure-id="${proc.id}"
                data-cpt-code="${opt.cpt || ''}"
                data-option-label="${opt.label || opt.detail}"
                data-display-name="${proc.displayName} - ${opt.label || opt.detail}"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900 group-hover:text-[#003087] mb-0.5">
                      ${(opt.label || opt.detail).replace('With & without', 'With & without contrast')}
                    </p>
                    <div class="flex items-center gap-3 text-xs text-gray-600">
                      ${opt.cpt ? `<span class="font-mono bg-gray-100 px-2 py-0.5 rounded">CPT: ${opt.cpt}</span>` : ''}
                      ${opt.price ? `<span class="font-semibold text-[#003087]">${opt.price}</span>` : ''}
                    </div>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
  
  resultsContainer.innerHTML = html;
  attachEventListeners();
}

function attachEventListeners() {
  // Main procedure headers
  document.querySelectorAll('.procedure-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const procedureId = header.getAttribute('data-procedure-id');
      const hasOptions = header.getAttribute('data-has-options') === 'true';
      
      if (hasOptions) {
        // Toggle expansion
        toggleProcedure(procedureId);
      } else {
        // Single option - select immediately
        const proc = header.closest('[data-procedure-id]');
        const displayName = header.querySelector('h4').textContent.trim();
        const optionButtons = proc.querySelectorAll('.option-button');
        
        if (optionButtons.length === 1) {
          const cptCode = optionButtons[0].getAttribute('data-cpt-code');
          selectProcedure(procedureId, displayName, cptCode);
        } else {
          selectProcedure(procedureId, displayName, null);
        }
      }
    });
  });
  
  // Individual option buttons
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const procedureId = button.getAttribute('data-procedure-id');
      const cptCode = button.getAttribute('data-cpt-code');
      const displayName = button.getAttribute('data-display-name');
      
      selectProcedure(procedureId, displayName, cptCode);
    });
  });
}

function toggleProcedure(procedureId) {
  const proc = document.querySelector(`[data-procedure-id="${procedureId}"]`);
  const optionsDiv = proc.querySelector('.procedure-options');
  const header = proc.querySelector('.procedure-header');
  
  if (expandedProcedures.has(procedureId)) {
    // Collapse
    expandedProcedures.delete(procedureId);
    optionsDiv.classList.add('hidden');
    header.classList.remove('border-[#003087]', 'bg-blue-50');
  } else {
    // Expand
    expandedProcedures.add(procedureId);
    optionsDiv.classList.remove('hidden');
    header.classList.add('border-[#003087]', 'bg-blue-50');
  }
  
  console.log('✅ Toggled procedure:', procedureId, expandedProcedures.has(procedureId) ? 'expanded' : 'collapsed');
}

function selectProcedure(procedureId, displayName, cptCode) {
  console.log('✅ Procedure selected:', { procedureId, displayName, cptCode });
  
  // Set hidden form fields
  const hiddenProcedure = document.getElementById('hero-selected-procedure');
  const hiddenCpt = document.getElementById('hero-selected-cpt');
  
  if (hiddenProcedure) {
    hiddenProcedure.value = procedureId;
  }
  
  if (hiddenCpt && cptCode) {
    hiddenCpt.value = cptCode;
  }
  
  closeModal();
  transitionToStep2(displayName);
}

// ═══════════════════════════════════════════════════════
// STEP TRANSITIONS
// ═══════════════════════════════════════════════════════

function transitionToStep2(procedureDisplayName) {
  const step1Container = document.getElementById('step-1-container');
  const step2Container = document.getElementById('step-2-container');
  const selectedDisplay = document.getElementById('selected-procedure-display');
  const progressFill = document.getElementById('progress-fill');
  
  if (selectedDisplay) {
    selectedDisplay.textContent = procedureDisplayName;
  }
  
  step1Container.classList.add('step-fade-out');
  
  setTimeout(() => {
    step1Container.classList.add('hidden');
    step2Container.classList.remove('hidden');
    step2Container.classList.add('step-fade-in');
    
    document.getElementById('step-1-indicator').classList.remove('bg-[#003087]');
    document.getElementById('step-1-indicator').classList.add('bg-green-500');
    document.getElementById('step-2-indicator').classList.remove('bg-white/20', 'text-white/50');
    document.getElementById('step-2-indicator').classList.add('bg-[#003087]', 'text-white');
    document.getElementById('step-2-label').classList.remove('text-white/50');
    document.getElementById('step-2-label').classList.add('text-white');
    
    if (progressFill) {
      progressFill.style.width = '100%';
    }
    
    setTimeout(() => {
      const locationInput = document.getElementById('hero-location');
      locationInput?.focus();
      
      const helper = document.getElementById('location-helper');
      if (helper) {
        helper.style.opacity = '1';
      }
    }, 100);
  }, 250);
  
  console.log('✅ Transitioned to Step 2');
}

function transitionToStep1() {
  const step1Container = document.getElementById('step-1-container');
  const step2Container = document.getElementById('step-2-container');
  const progressFill = document.getElementById('progress-fill');
  const searchButton = document.getElementById('hero-search-button');
  
  step2Container.classList.add('step-fade-out');
  
  setTimeout(() => {
    step2Container.classList.add('hidden');
    step1Container.classList.remove('hidden');
    step1Container.classList.remove('step-fade-out');
    step1Container.classList.add('step-fade-in');
    
    document.getElementById('step-1-indicator').classList.add('bg-[#003087]');
    document.getElementById('step-1-indicator').classList.remove('bg-green-500');
    document.getElementById('step-2-indicator').classList.add('bg-white/20', 'text-white/50');
    document.getElementById('step-2-indicator').classList.remove('bg-[#003087]', 'text-white');
    document.getElementById('step-2-label').classList.add('text-white/50');
    document.getElementById('step-2-label').classList.remove('text-white');
    
    if (progressFill) {
      progressFill.style.width = '0%';
    }
    
    document.getElementById('hero-selected-procedure').value = '';
    const hiddenCpt = document.getElementById('hero-selected-cpt');
    if (hiddenCpt) hiddenCpt.value = '';
    document.getElementById('hero-location').value = '';
    document.getElementById('hero-zip').value = '';
    
    if (searchButton) {
      searchButton.disabled = true;
    }
    
    setTimeout(() => {
      document.getElementById('hero-procedure-search')?.focus();
    }, 100);
  }, 250);
  
  console.log('✅ Returned to Step 1');
}

function validateZipCode(zip) {
  return /^\d{5}$/.test(zip);
}

async function detectLocation() {
  const detectButton = document.getElementById('hero-detect-location');
  const locationIcon = document.getElementById('location-icon');
  const locationLoading = document.getElementById('location-loading');
  const locationInput = document.getElementById('hero-location');
  
  locationIcon.classList.add('hidden');
  locationLoading.classList.remove('hidden');
  detectButton.disabled = true;
  
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    console.log('✅ Location detected:', lat, lon);
    locationInput.focus();
    
  } catch (error) {
    console.error('Location detection failed:', error);
    alert('Unable to detect location. Please enter your ZIP code manually.');
  } finally {
    locationIcon.classList.remove('hidden');
    locationLoading.classList.add('hidden');
    detectButton.disabled = false;
  }
}

// ═══════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded - initializing modal version with expandable options');
  
  const heroInput = document.getElementById('hero-procedure-search');
  if (heroInput) {
    heroInput.addEventListener('focus', () => {
      openModal();
    });
    
    heroInput.addEventListener('input', () => {
      if (heroInput.value.trim().length >= 1) {
        openModal();
      }
    });
  }
  
  const modalInput = document.getElementById('modal-search-input');
  if (modalInput) {
    modalInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        handleModalSearch(e.target.value);
      }, SEARCH_DELAY);
    });
  }
  
  const modalCloseButton = document.getElementById('modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
  }
  
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('modal-search-overlay');
      if (modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    }
  });
  
  const backButton = document.getElementById('back-to-step-1');
  if (backButton) {
    backButton.addEventListener('click', transitionToStep1);
  }
  
  const locationInput = document.getElementById('hero-location');
  const searchButton = document.getElementById('hero-search-button');
  const zipField = document.getElementById('hero-zip');
  
  if (locationInput) {
    locationInput.addEventListener('input', (e) => {
      const value = e.target.value.replace(/\D/g, '').substring(0, 5);
      e.target.value = value;
      
      if (validateZipCode(value)) {
        zipField.value = value;
        searchButton.disabled = false;
      } else {
        zipField.value = '';
        searchButton.disabled = true;
      }
    });
  }
  
  const detectButton = document.getElementById('hero-detect-location');
  if (detectButton) {
    detectButton.addEventListener('click', detectLocation);
  }
  
  const form = document.getElementById('hero-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const procedureValue = document.getElementById('hero-selected-procedure').value;
      const zipValue = document.getElementById('hero-zip').value;
      
      if (!procedureValue || !validateZipCode(zipValue)) {
        e.preventDefault();
        alert('Please select a procedure and enter a valid ZIP code');
        return false;
      }
      
      console.log('✅ Form submitted:', { procedure: procedureValue, zip: zipValue });
    });
  }
  
  console.log('✅ Modal version ready with expandable options!');
});