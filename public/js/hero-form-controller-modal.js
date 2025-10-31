// =============================================================================
// hero-form-controller-modal.js
// USRad Patient Search - Modal Controller
// Complete rebuild: Primary Search + Browse Grid + Expandable Options
// =============================================================================

import { fetchAllProcedures } from '/src/lib/procedures.ts';


console.log('✅ Hero form controller MODAL version initialized (with expandable options) - VERSION 2.0 DIAGNOSTIC');

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

let expandedProcedures = new Set();
let browseMode = false;
let searchTimeout;
const SEARCH_DELAY = 300;

// =============================================================================
// CATEGORY CONFIGURATION
// =============================================================================

const CATEGORY_ICONS = {
  MRI: '🧠',
  CT: '🖼️',
  Ultrasound: '🩺',
  'X-Ray': '🦴',
  Mammography: '🎗️',
  PET: '⚛️',
  'Nuclear Medicine': '☢️',
  Other: '🧩',
  All: '🔎'
};

// 🧠 Modality-based emoji fallback (used when no icon field is available)
const MODALITY_EMOJI = {
  MRI: '🧠',
  CT: '🖼️',
  Ultrasound: '🩺',
  'X-Ray': '🦴',
  Mammography: '🎗️',
  PET: '⚛️',
  'Nuclear Medicine': '☢️',
  Other: '🧩'
};


const CATEGORY_ORDER = [
  'MRI',
  'CT',
  'Ultrasound',
  'X-Ray',
  'Mammography',
  'PET',
  'Nuclear Medicine',
  'Other',
  'All'
];

// =============================================================================
// MODALITY ROUTER (prefix-safe, synonym-aware)
// =============================================================================
const MODALITY_LABEL_BY_KEY = {
  MRI: 'MRI',
  CT: 'CT',
  US: 'Ultrasound',
  XR: 'X-Ray',
  MAM: 'Mammography',
  PET: 'PET',
  NM: 'Nuclear Medicine',
  OTHER: 'Other',
  ALL: 'All',
};

const normalizeMod = (s='') =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w]|_/g, '');

const SYNONYMS = {
  MRI: ['mri','magneticresonance'],
  CT: ['ct','cat','catscan','computedtomography'],
  US: ['us','ultrasound','sonogram','sonography'],
  XR: ['xr','xray','radiograph','plainfilm','xrayfilm'],
  MAM: ['mam','mamm','mammogram','mammography'],
  PET: ['pet','petscan','positronemissiontomography'],
  NM: ['nm','nuclear','nuclearmedicine','scintigraphy','nuclearscan'],
  OTHER: ['other','dexa','dexascan','bonedensity','fluoroscopy','arthrogram'],
  ALL: ['all','any'],
};

const ROUTE_PRIORITY = ['MRI','CT','US','XR','MAM','PET','NM','OTHER'];

function detectModalityKey(raw) {
  if (!raw) return null;
  const q = normalizeMod(raw);

  // exact token match
  for (const k of ROUTE_PRIORITY) if (SYNONYMS[k].includes(q)) return k;

  // short-prefix match (prevents “xra” → random)
  if (q.length <= 4) {
    for (const k of ROUTE_PRIORITY) {
      if (SYNONYMS[k].some(t => t.startsWith(q) || q.startsWith(t))) return k;
    }
  }
  return null;
}


// =============================================================================
// BROWSE MODE FUNCTIONS
// =============================================================================

function toggleBrowseMode(forceMode) {
  if (typeof forceMode === 'boolean') {
    browseMode = forceMode;
  } else {
    browseMode = !browseMode;
  }

  const searchbar = document.getElementById('modal-searchbar');
  const results = document.getElementById('modal-results');
  const browse = document.getElementById('modal-browse-view');
  const backBtn = document.getElementById('modal-back-to-search');

  if (browseMode) {
    if (searchbar) searchbar.classList.add('hidden');
    if (results) results.classList.add('hidden');
    if (browse) browse.classList.remove('hidden');
    if (backBtn) backBtn.classList.remove('hidden');
    renderCategoryGrid();
  } else {
    if (searchbar) searchbar.classList.remove('hidden');
    if (results) results.classList.remove('hidden');
    if (browse) browse.classList.add('hidden');
    if (backBtn) backBtn.classList.add('hidden');
    
    const modalInput = document.getElementById('modal-search-input');
    if (modalInput) {
      modalInput.value = '';
      modalInput.focus();
    }
  }

  console.log('✅ Browse mode:', browseMode ? 'ON' : 'OFF');
}

function renderCategoryGrid() {
  const grid = document.getElementById('browse-category-grid');
  if (!grid) return;

  // Build category buttons with canonical modality keys
  const html = CATEGORY_ORDER.map(name => `
    <button
      type="button"
      class="magnetic-hover p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#003087] hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-3 group"
      data-modality-key="${
        Object.entries(MODALITY_LABEL_BY_KEY)
          .find(([, label]) => label === name)?.[0] || 'ALL'
      }"
    >
      <span class="text-4xl group-hover:scale-110 transition-transform">
        ${CATEGORY_ICONS[name]}
      </span>
      <span class="font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
        ${name}
      </span>
    </button>
  `).join('');

  grid.innerHTML = html;

  // Attach hover + click handlers
  grid.querySelectorAll('button').forEach(card => {
    // Magnetic hover
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 5;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -5;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.4s ease';
    });

    // Click handler
    card.addEventListener('click', () => {
      // Visual feedback
      card.classList.add('modality-selected');
      setTimeout(() => card.classList.remove('modality-selected'), 800);

      const modalityKey = card.getAttribute('data-modality-key');
      loadCategoryByKey(modalityKey);
    });
  });

  console.log('✅ Category grid rendered');
}


async function loadCategoryByKey(modalityKey) {
  const list = document.getElementById('browse-category-results');
  if (!list) return;

  const label = MODALITY_LABEL_BY_KEY[modalityKey] || 'All';

  // Loading state
  list.innerHTML = `
    <div class="text-center py-8">
      <svg class="w-12 h-12 mx-auto mb-4 text-[#003087] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
                 c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600">Loading ${label === 'All' ? 'all' : label} procedures…</p>
    </div>
  `;

  try {
    const url = new URL('/api/procedures/search', window.location.origin);
    url.searchParams.set('modality', modalityKey);

    const resp = await fetch(url.toString());
    if (!resp.ok) throw new Error(`API ${resp.status}`);

    const json = await resp.json();
    const items = Array.isArray(json?.results) ? json.results : [];

    if (!items.length) {
      list.innerHTML = `
        <div class="text-center py-8 text-gray-600">
          <p>No procedures found for ${label}.</p>
        </div>`;
      return;
    }

    // Map to the UI shape used by displayModalResults
    const normalized = items.map(item => ({
      id: item.id,
      displayName: item.displayName || item.official_name || 'Unnamed',
      modality: item.description || item.modality || '',
      badge: item.badge || (item.cpt_code ? `CPT ${item.cpt_code}` : null),
      icon: null,
      options: [],
    }));

    // Reuse the same renderer the search uses
    const resultsContainer = document.getElementById('modal-results');
    if (resultsContainer) {
      // switch to Results view to reuse the list renderer
      toggleBrowseMode(false);
      displayModalResults(normalized);
    } else {
      // or render directly into the browse list if you prefer:
      list.innerHTML = normalized.map(proc => `
        <div class="border-b border-gray-100 pb-3 mb-3" data-procedure-id="${proc.id}">
          <p class="font-semibold text-gray-900">${proc.displayName}</p>
          <p class="text-sm text-gray-600">${proc.modality || ''}</p>
        </div>
      `).join('');
    }

    console.log(`✅ Loaded ${normalized.length} ${label} procedures from API`);
  } catch (err) {
    console.error('❌ Error loading category:', err);
    list.innerHTML = `
      <div class="text-center py-8 text-red-600">
        <p class="font-semibold mb-2">Failed to load procedures</p>
        <p class="text-sm">Please try again</p>
      </div>
    `;
  }
}


// =============================================================================
// MODAL CONTROL FUNCTIONS
// =============================================================================

function openModal() {
  const modal = document.getElementById('modal-search-overlay');
  const modalInput = document.getElementById('modal-search-input');
  const heroInput = document.getElementById('hero-procedure-search');
  
  if (!modal) return;

  // Copy search value from hero input if exists
  if (heroInput && modalInput) {
    modalInput.value = heroInput.value;
  }
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Trigger opening animation
  setTimeout(function() {
    modal.classList.add('modal-opening');
  }, 10);
  
  // Focus input after animation
  setTimeout(function() {
    if (modalInput) modalInput.focus();
  }, 300);
  
  // Trigger search if there's existing text
  if (modalInput && modalInput.value.trim().length >= 2) {
    handleModalSearch(modalInput.value);
  }
  
  console.log('✅ Modal opened');
}

function closeModal() {
  const modal = document.getElementById('modal-search-overlay');
  if (!modal) return;

  // Trigger closing animation
  modal.classList.add('modal-closing');
  modal.classList.remove('modal-opening');
  
  setTimeout(function() {
    modal.classList.add('hidden');
    modal.classList.remove('modal-closing');
    document.body.style.overflow = '';
  }, 300);
  
  console.log('✅ Modal closed');
}

// =============================================================================
// PRIMARY SEARCH FUNCTIONS
// =============================================================================

async function handleModalSearch(query) {
  const resultsContainer = document.getElementById('modal-results');
  if (!resultsContainer) return;

  // Empty or short query - show starter state
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

  // Loading state
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
  // Determine which endpoint to use
  const trimmed = (query || '').trim();
  const url = trimmed
    ? `/api/procedures/search?q=${encodeURIComponent(trimmed)}`
    : `/api/procedures/featured`;

  console.log('🔍 Calling API:', url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  const data = await response.json();
  console.log('✅ API Response:', data);

  // 🧠 Normalize API response to UI format (new API shape)
const rawItems = Array.isArray(data?.results)
  ? data.results
  : (Array.isArray(data) ? data : []);

const normalized = rawItems.map(item => ({
  id: item.id,
  displayName: item.displayName || item.official_name || 'Unnamed',
  modality: item.description || item.modality || '',
  badge: item.badge || (item.cpt_code ? `CPT ${item.cpt_code}` : null),
  icon: null,
  // accept either `options` (already normalized) or raw `procedure_options`
  options: item.options || item.procedure_options || [],
}));




    if (normalized.length > 0) {
      displayModalResults(normalized);
      return;
    }

    // Zero results - show smart suggestions
    resultsContainer.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-lg font-medium text-gray-900 mb-2">No procedures found</p>
        <p class="text-sm text-gray-600 mb-4">Try a different term or explore all options</p>
        
        <div class="flex flex-col items-center gap-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-gray-300 hover:border-[#003087] hover:bg-blue-50 font-medium" data-suggestion="MRI">
            Show all MRI procedures
          </button>
          <button type="button" class="px-4 py-2 rounded-lg border border-gray-300 hover:border-[#003087] hover:bg-blue-50 font-medium" data-suggestion="All">
            Browse all procedures
          </button>
        </div>
      </div>
    `;

    // Wire suggestion buttons
    resultsContainer.querySelectorAll('[data-suggestion]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const suggestion = btn.getAttribute('data-suggestion'); // e.g., "MRI" or "All"
    const key = Object.entries(MODALITY_LABEL_BY_KEY)
      .find(([k, v]) => v === suggestion)?.[0] || 'ALL';
    toggleBrowseMode(true);
    loadCategoryByKey(key);
  });
});


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

function displayModalResults(procedures) {
  const resultsContainer = document.getElementById('modal-results');
  if (!resultsContainer) return;

  const html = procedures.map(proc => {
    // Build variant rows (buttons)
    const variantRows = (proc.options && proc.options.length)
      ? proc.options.map(v => {
          const label = v.option_name || v.label || 'Standard';
          const price = (v.typical_price != null)
            ? `<span class="text-sm text-gray-500">$${Number(v.typical_price).toFixed(0)}</span>`
            : '';
          // Prefer v.cpt_code, then v.cpt, otherwise blank
          const cpt = v.cpt_code || v.cpt || '';
          return `
            <button
              type="button"
              class="option-button flex w-full justify-between items-center px-3 py-2 border border-gray-100 rounded-lg mb-1 hover:bg-blue-50 transition"
              data-procedure-id="${proc.id}"
              data-display-name="${proc.displayName}"
              data-cpt-code="${cpt}"
            >
              <span class="text-sm text-gray-700">${label}</span>
              ${price}
            </button>
          `;
        }).join('')
      : (() => {
          // Fallback: allow immediate selection if no variants
          // Try to parse CPT from the badge "CPT 70551"
          const cptFromBadge = (proc.badge && proc.badge.startsWith('CPT '))
            ? proc.badge.slice(4)
            : '';
          return `
            <button
              type="button"
              class="select-procedure px-3 py-2 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
              data-procedure-id="${proc.id}"
              data-display-name="${proc.displayName}"
              data-cpt-code="${cptFromBadge}"
            >
              Select
            </button>
          `;
        })();

    return `
      <div class="border-b border-gray-100 pb-3 mb-3" data-procedure-id="${proc.id}">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold text-gray-900">${proc.displayName}</p>
            <p class="text-sm text-gray-600">${proc.modality || ''}</p>
          </div>
          ${proc.badge ? `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">${proc.badge}</span>` : ''}
        </div>
        <div class="mt-2">${variantRows}</div>
      </div>
    `;
  }).join('');

  resultsContainer.innerHTML = html;

  // Bind selection for variants and single-select fallback
  resultsContainer.querySelectorAll('.option-button, .select-procedure').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const procId = btn.getAttribute('data-procedure-id');
      const name = btn.getAttribute('data-display-name');
      const cpt = btn.getAttribute('data-cpt-code') || '';
      selectProcedure(procId, name, cpt);
    });
  });
}


function attachEventListeners() {
  // Main procedure headers
  document.querySelectorAll('.procedure-header').forEach(function(header) {
    header.addEventListener('click', function(e) {
      e.preventDefault();
      const procedureId = header.getAttribute('data-procedure-id');
      const hasOptions = header.getAttribute('data-has-options') === 'true';
      
      if (hasOptions) {
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
  document.querySelectorAll('.option-button').forEach(function(button) {
    button.addEventListener('click', function(e) {
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
  if (!proc) return;
  
  const optionsDiv = proc.querySelector('.procedure-options');
  const header = proc.querySelector('.procedure-header');
  
  if (expandedProcedures.has(procedureId)) {
    // Collapse
    expandedProcedures.delete(procedureId);
    if (optionsDiv) optionsDiv.classList.add('hidden');
    if (header) {
      header.classList.remove('border-[#003087]', 'bg-blue-50');
    }
  } else {
    // Expand
    expandedProcedures.add(procedureId);
    if (optionsDiv) optionsDiv.classList.remove('hidden');
    if (header) {
      header.classList.add('border-[#003087]', 'bg-blue-50');
    }
  }
  
  console.log('✅ Toggled procedure:', procedureId, expandedProcedures.has(procedureId) ? 'expanded' : 'collapsed');
}

function selectProcedure(procedureId, displayName, cptCode) {
  console.log('🚨🚨🚨 SELECT PROCEDURE FUNCTION CALLED - START 🚨🚨🚨');
  console.log('✅ Procedure selected:', { procedureId: procedureId, displayName: displayName, cptCode: cptCode });
  
  // Set hidden form fields
  const hiddenProcedure = document.getElementById('hero-selected-procedure');
  const hiddenCpt = document.getElementById('hero-selected-cpt');
  
  console.log('🔍 Hidden fields found:', { 
    hiddenProcedure: !!hiddenProcedure, 
    hiddenCpt: !!hiddenCpt 
  });
  
  if (hiddenProcedure) {
    hiddenProcedure.value = procedureId;
    console.log('✅ Set hidden procedure field to:', procedureId);
  } else {
    console.error('❌ Could not find hero-selected-procedure element');
  }
  
  if (hiddenCpt && cptCode) {
    hiddenCpt.value = cptCode;
    console.log('✅ Set hidden CPT field to:', cptCode);
  }
  
  console.log('🔍 About to close modal and transition to Step 2...');
  closeModal();
  transitionToStep2(displayName);
}

// =============================================================================
// STEP TRANSITION FUNCTIONS
// =============================================================================

function transitionToStep2(procedureDisplayName) {
  console.log('🔍 transitionToStep2 called with:', procedureDisplayName);
  
  const step1 = document.getElementById('step-1-container');
  const step2 = document.getElementById('step-2-container');
  const step1Indicator = document.getElementById('step-1-indicator');
  const step2Indicator = document.getElementById('step-2-indicator');
  const step1Label = document.getElementById('step-1-label');
  const step2Label = document.getElementById('step-2-label');
  const progressFill = document.getElementById('progress-fill');
  const selectedProcedureDisplay = document.getElementById('selected-procedure-display');

  console.log('🔍 Step containers found:', {
    step1: !!step1,
    step2: !!step2,
    step1Indicator: !!step1Indicator,
    step2Indicator: !!step2Indicator,
    selectedProcedureDisplay: !!selectedProcedureDisplay
  });

  if (!step1 || !step2) {
    console.error('❌ Could not find step containers! step1:', step1, 'step2:', step2);
    return;
  }

  // Update progress indicators
  if (step1Indicator) {
    step1Indicator.classList.remove('bg-[#003087]', 'shadow-lg');
    step1Indicator.classList.add('bg-white', 'text-[#003087]', 'border-2', 'border-[#003087]');
  }
  
  if (step2Indicator) {
    step2Indicator.classList.remove('bg-white/20', 'text-white/50');
    step2Indicator.classList.add('bg-[#003087]', 'text-white', 'shadow-lg');
  }
  
  if (step1Label) {
    step1Label.classList.remove('text-white');
    step1Label.classList.add('text-white/70');
  }
  
  if (step2Label) {
    step2Label.classList.remove('text-white/50');
    step2Label.classList.add('text-white', 'font-semibold');
  }
  
  if (progressFill) {
    progressFill.style.width = '100%';
  }

  // Display selected procedure
  if (selectedProcedureDisplay) {
    selectedProcedureDisplay.textContent = procedureDisplayName;
    console.log('✅ Set selected procedure display to:', procedureDisplayName);
  } else {
    console.error('❌ Could not find selected-procedure-display element');
  }

  // Animate transition
  console.log('🔍 Starting step transition animation...');
  step1.classList.add('step-fade-out');
  
  setTimeout(function() {
    step1.classList.add('hidden');
    step1.classList.remove('step-fade-out');
    step2.classList.remove('hidden');
    step2.classList.add('step-fade-in');
    
    console.log('✅ Step 2 is now visible!');
    
    const locationInput = document.getElementById('hero-location');
    if (locationInput) {
      setTimeout(function() {
        locationInput.focus();
        console.log('✅ Location input focused');
      }, 100);
    }
  }, 250);

  console.log('✅ Transitioned to Step 2');
}

function transitionToStep1() {
  const step1 = document.getElementById('step-1-container');
  const step2 = document.getElementById('step-2-container');
  const step1Indicator = document.getElementById('step-1-indicator');
  const step2Indicator = document.getElementById('step-2-indicator');
  const step1Label = document.getElementById('step-1-label');
  const step2Label = document.getElementById('step-2-label');
  const progressFill = document.getElementById('progress-fill');

  if (!step1 || !step2) return;

  // Reset progress indicators
  if (step1Indicator) {
    step1Indicator.classList.remove('bg-white', 'text-[#003087]', 'border-2', 'border-[#003087]');
    step1Indicator.classList.add('bg-[#003087]', 'shadow-lg');
  }
  
  if (step2Indicator) {
    step2Indicator.classList.remove('bg-[#003087]', 'text-white', 'shadow-lg');
    step2Indicator.classList.add('bg-white/20', 'text-white/50');
  }
  
  if (step1Label) {
    step1Label.classList.remove('text-white/70');
    step1Label.classList.add('text-white', 'font-semibold');
  }
  
  if (step2Label) {
    step2Label.classList.remove('text-white', 'font-semibold');
    step2Label.classList.add('text-white/50', 'font-medium');
  }
  
  if (progressFill) {
    progressFill.style.width = '0%';
  }

  // Clear form fields
  const hiddenProcedure = document.getElementById('hero-selected-procedure');
  const hiddenCpt = document.getElementById('hero-selected-cpt');
  const locationInput = document.getElementById('hero-location');
  const zipField = document.getElementById('hero-zip');
  
  if (hiddenProcedure) hiddenProcedure.value = '';
  if (hiddenCpt) hiddenCpt.value = '';
  if (locationInput) locationInput.value = '';
  if (zipField) zipField.value = '';

  // Animate transition
  step2.classList.add('step-fade-out');
  
  setTimeout(function() {
    step2.classList.add('hidden');
    step2.classList.remove('step-fade-out');
    step1.classList.remove('hidden');
    step1.classList.add('step-fade-in');
    
    setTimeout(function() {
      step1.classList.remove('step-fade-in');
    }, 400);
  }, 250);

  console.log('✅ Returned to Step 1');
}

// =============================================================================
// VALIDATION & LOCATION FUNCTIONS
// =============================================================================

function validateZipCode(zip) {
  return /^\d{5}$/.test(zip);
}

async function detectLocation() {
  const detectButton = document.getElementById('hero-detect-location');
  const locationIcon = document.getElementById('location-icon');
  const locationLoading = document.getElementById('location-loading');
  const locationInput = document.getElementById('hero-location');
  
  if (!detectButton || !locationIcon || !locationLoading || !locationInput) return;
  
  locationIcon.classList.add('hidden');
  locationLoading.classList.remove('hidden');
  detectButton.disabled = true;
  
  try {
    const position = await new Promise(function(resolve, reject) {
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

// =============================================================================
// INITIALIZATION - DOM CONTENT LOADED
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM loaded - initializing modal version with expandable options');

  // Hero input opens modal
  const heroInput = document.getElementById('hero-procedure-search');
  if (heroInput) {
    heroInput.addEventListener('focus', function() {
      openModal();
    });
    
    heroInput.addEventListener('input', function() {
      if (heroInput.value.trim().length >= 1) {
        openModal();
      }
    });
  }

  // Modal search input with debounce
  const modalInput = document.getElementById('modal-search-input');
  if (modalInput) {
    modalInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        handleModalSearch(e.target.value);
      }, SEARCH_DELAY);
    });
  }

  // Modal close button
  const modalCloseButton = document.getElementById('modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
  }

  // Modal backdrop click
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Reset modal to Search view whenever it opens
  const originalOpenModal = openModal;
  window.openModal = function() {
    browseMode = false;
    toggleBrowseMode(false);
    originalOpenModal();
  };

  // Browse all procedures button
  const browseLink = document.getElementById('browse-all-procedures');
  if (browseLink) {
    browseLink.addEventListener('click', function(e) {
      e.preventDefault();
      toggleBrowseMode(true);
    });
  }

  // Back to search button
  const backBtn = document.getElementById('modal-back-to-search');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      toggleBrowseMode(false);
    });
  }

  // ESC key closes modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('modal-search-overlay');
      if (modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    }
  });

  // Back to step 1 button
  const backButton = document.getElementById('back-to-step-1');
  if (backButton) {
    backButton.addEventListener('click', transitionToStep1);
  }

  // Location input validation
  const locationInput = document.getElementById('hero-location');
  const searchButton = document.getElementById('hero-search-button');
  const zipField = document.getElementById('hero-zip');

  if (locationInput && searchButton && zipField) {
    locationInput.addEventListener('input', function(e) {
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

  // Detect location button
  const detectButton = document.getElementById('hero-detect-location');
  if (detectButton) {
    detectButton.addEventListener('click', detectLocation);
  }

  // Form submission
  const form = document.getElementById('hero-search-form');
  if (form) {
    form.addEventListener('submit', function(e) {
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