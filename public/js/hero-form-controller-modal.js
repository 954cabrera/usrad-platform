// hero-form-controller-modal-WITH-OPTIONS.js
// World-Class Modal with Expandable Procedure Options
// UPDATED: Expandable procedures with individual CPT code selection

console.log('✅ Hero form controller MODAL version initialized (with expandable options)');

// Track expanded procedures
let expandedProcedures = new Set();
let selectedModality = null;
let selectedContrast = null;
let selectedRegion = null;

// ═══════════════════════════════════════════════════════
// MODALITY DETECTION & CONTRAST CONFIGURATION
// ═══════════════════════════════════════════════════════

const MODALITY_ALIASES = {
  // MRI
  'mri': 'MRI',
  'mr': 'MRI', 
  'magnetic': 'MRI',
  'magnetic resonance': 'MRI',
  
  // CT
  'ct': 'CT',
  'cat': 'CT',
  'cat scan': 'CT',
  'computed tomography': 'CT',
  
  // X-Ray
  'xray': 'X-Ray',
  'x-ray': 'X-Ray',
  'xra': 'X-Ray',
  'x-ra': 'X-Ray',
  'radiograph': 'X-Ray',
  
  // Ultrasound
  'ultrasound': 'Ultrasound',
  'us': 'Ultrasound',
  'ultra': 'Ultrasound',
  'sono': 'Ultrasound',
  'sonogram': 'Ultrasound',
  
  // Mammography
  'mammo': 'Mammography',
  'mammogram': 'Mammography',
  'mammography': 'Mammography',
  
  // PET
  'pet': 'PET',
  'pet scan': 'PET',
  
  // Nuclear Medicine
  'nuclear': 'Nuclear Medicine',
  'nm': 'Nuclear Medicine',
  'nuclear medicine': 'Nuclear Medicine'
};

const CONTRAST_CONFIG = {
  'MRI': {
    hasContrast: true,
    options: [
      { id: 'without', label: 'Without Contrast', cptSuffix: '1' },
      { id: 'with', label: 'With Contrast', cptSuffix: '2' },
      { id: 'both', label: 'With & Without Contrast', cptSuffix: '3' }
    ]
  },
  'CT': {
    hasContrast: true,
    options: [
      { id: 'without', label: 'Without Contrast', cptSuffix: '0' },
      { id: 'with', label: 'With Contrast', cptSuffix: '0' },
      { id: 'both', label: 'With & Without Contrast', cptSuffix: '0' }
    ]
  },
  'X-Ray': { hasContrast: false },
  'Ultrasound': { hasContrast: false },
  'Mammography': { hasContrast: false },
  'PET': { hasContrast: false },
  'Nuclear Medicine': { hasContrast: false }
};

const REGION_BY_MODALITY = {
  'MRI': [
    { id: 'brain', label: 'Brain', icon: '🧠' },
    { id: 'cervical-spine', label: 'Cervical Spine', icon: '🦴' },
    { id: 'thoracic-spine', label: 'Thoracic Spine', icon: '🦴' },
    { id: 'lumbar-spine', label: 'Lumbar Spine', icon: '🦴' },
    { id: 'shoulder', label: 'Shoulder', icon: '💪' },
    { id: 'knee', label: 'Knee', icon: '🦵' },
    { id: 'upper-extremity', label: 'Upper Extremity', icon: '💪' },
    { id: 'lower-extremity', label: 'Lower Extremity', icon: '🦵' },
    { id: 'abdomen', label: 'Abdomen', icon: '🫁' },
    { id: 'pelvis', label: 'Pelvis', icon: '🦴' },
    { id: 'abdomen-pelvis', label: 'Abdomen & Pelvis', icon: '🫁' },
    { id: 'cardiac', label: 'Cardiac/Heart', icon: '❤️' },
    { id: 'breast', label: 'Breast', icon: '🎗️' }
  ],
  'CT': [
    { id: 'head', label: 'Head/Brain', icon: '🧠' },
    { id: 'chest', label: 'Chest', icon: '🫁' },
    { id: 'abdomen', label: 'Abdomen', icon: '🫁' },
    { id: 'pelvis', label: 'Pelvis', icon: '🦴' },
    { id: 'abdomen-pelvis', label: 'Abdomen & Pelvis', icon: '🫁' },
    { id: 'spine', label: 'Spine', icon: '🦴' },
    { id: 'sinuses', label: 'Sinuses', icon: '👃' },
    { id: 'neck', label: 'Neck', icon: '🦴' },
    { id: 'extremity', label: 'Extremity', icon: '💪' }
  ],
  'X-Ray': [
    { id: 'chest', label: 'Chest', icon: '🫁' },
    { id: 'spine', label: 'Spine', icon: '🦴' },
    { id: 'shoulder', label: 'Shoulder', icon: '💪' },
    { id: 'hand', label: 'Hand', icon: '✋' },
    { id: 'foot', label: 'Foot', icon: '🦶' },
    { id: 'knee', label: 'Knee', icon: '🦵' },
    { id: 'pelvis', label: 'Pelvis', icon: '🦴' },
    { id: 'abdomen', label: 'Abdomen', icon: '🫁' }
  ],
  'Ultrasound': [
    { id: 'abdomen', label: 'Abdomen', icon: '🫁' },
    { id: 'pelvis', label: 'Pelvis', icon: '🦴' },
    { id: 'ob', label: 'OB (Pregnancy)', icon: '👶' },
    { id: 'cardiac', label: 'Cardiac Echo', icon: '❤️' },
    { id: 'thyroid', label: 'Thyroid', icon: '🦴' },
    { id: 'carotid', label: 'Carotid', icon: '🫀' },
    { id: 'venous', label: 'Venous Doppler', icon: '🫀' },
    { id: 'renal', label: 'Renal/Kidney', icon: '🫁' }
  ],
  'Mammography': [
    { id: 'screening', label: 'Screening Mammogram', icon: '🎗️' },
    { id: 'diagnostic', label: 'Diagnostic Mammogram', icon: '🎗️' }
  ],
  'PET': [
    { id: 'whole-body', label: 'Whole Body PET', icon: '⚛️' },
    { id: 'brain', label: 'Brain PET', icon: '🧠' }
  ],
  'Nuclear Medicine': [
    { id: 'bone-scan', label: 'Bone Scan', icon: '🦴' },
    { id: 'cardiac', label: 'Cardiac Nuclear', icon: '❤️' },
    { id: 'thyroid', label: 'Thyroid Scan', icon: '🦴' }
  ]
};

function detectModality(userInput) {
  if (!userInput) return null;
  const normalized = userInput.toLowerCase().trim();
  return MODALITY_ALIASES[normalized] || null;
}

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
    
    // 🔥 ADD THESE LINES:
    selectedModality = null;
    selectedContrast = null;
    selectedRegion = null;
    
    // Clear the search input
    const modalInput = document.getElementById('modal-search-input');
    if (modalInput) {
      modalInput.value = '';
    }
  }, 300);
  
  console.log('✅ Modal closed and reset');
}

// ═══════════════════════════════════════════════════════
// SEARCH FUNCTIONS
// ═══════════════════════════════════════════════════════

let searchTimeout;
const SEARCH_DELAY = 300;

// =============================================================================
// PHASE 2 FUNCTIONS - UPDATED to use /api/procedures/search
// Replace your existing Phase 2 functions with these
// =============================================================================

/**
 * Display Mammography type selection (Screening vs Diagnostic vs 3D)
 */
function displayMammographyType() {
  console.log('📋 Displaying Mammography type selection');
  
  const modalResults = document.getElementById('modal-results');
  if (!modalResults) return;
  
  modalResults.innerHTML = `
    <div class="space-y-4 p-6">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Select Mammography Type
      </h3>
      
      <button
        type="button"
        data-mamm-cpt="77067"
        data-mamm-name="Screening Mammogram"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <span class="text-2xl">🎗️</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Screening Mammogram</div>
            <div class="text-sm text-gray-600">Routine annual screening for early detection</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 77067</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-mamm-cpt="77066"
        data-mamm-name="Diagnostic Mammogram"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <span class="text-2xl">🔍</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Diagnostic Mammogram</div>
            <div class="text-sm text-gray-600">Follow-up for symptoms or abnormal findings</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 77066</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-mamm-cpt="77063"
        data-mamm-name="3D Mammogram"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <span class="text-2xl">📊</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">3D Mammogram (Tomosynthesis)</div>
            <div class="text-sm text-gray-600">Advanced 3D imaging technology</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 77063</div>
          </div>
        </div>
      </button>
    </div>
  `;
  
  // Add click handlers
  modalResults.querySelectorAll('[data-mamm-cpt]').forEach(button => {
    button.addEventListener('click', function() {
      const cptCode = this.dataset.mammCpt;
      const displayName = this.dataset.mammName;
      console.log(`✅ Selected Mammography: ${displayName} [${cptCode}]`);
      handleDirectProcedureSelection(cptCode, displayName);
    });
  });
}

/**
 * Display Nuclear Medicine scan type selection
 */
function displayNuclearMedicineType() {
  console.log('📋 Displaying Nuclear Medicine scan type selection');
  
  const modalResults = document.getElementById('modal-results');
  if (!modalResults) return;
  
  modalResults.innerHTML = `
    <div class="space-y-4 p-6">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Select Nuclear Medicine Scan Type
      </h3>
      
      <button
        type="button"
        data-nm-cpt="78306"
        data-nm-name="Bone Scan"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span class="text-2xl">🦴</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Bone Scan (Whole Body)</div>
            <div class="text-sm text-gray-600">Detect bone abnormalities, fractures, or cancer</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78306</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-nm-cpt="78452"
        data-nm-name="Cardiac Stress Test"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <span class="text-2xl">❤️</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Cardiac Stress Test</div>
            <div class="text-sm text-gray-600">Evaluate heart blood flow and function</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78452</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-nm-cpt="78012"
        data-nm-name="Thyroid Scan"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <span class="text-2xl">🦋</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Thyroid Scan</div>
            <div class="text-sm text-gray-600">Evaluate thyroid function and nodules</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78012</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-nm-cpt="78072"
        data-nm-name="Parathyroid Scan"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <span class="text-2xl">🟢</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">Parathyroid Scan</div>
            <div class="text-sm text-gray-600">Locate overactive parathyroid glands</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78072</div>
          </div>
        </div>
      </button>
    </div>
  `;
  
  // Add click handlers
  modalResults.querySelectorAll('[data-nm-cpt]').forEach(button => {
    button.addEventListener('click', function() {
      const cptCode = this.dataset.nmCpt;
      const displayName = this.dataset.nmName;
      console.log(`✅ Selected Nuclear Medicine: ${displayName} [${cptCode}]`);
      handleDirectProcedureSelection(cptCode, displayName);
    });
  });
}

/**
 * Display PET scan type selection
 */
function displayPETType() {
  console.log('📋 Displaying PET scan type selection');
  
  const modalResults = document.getElementById('modal-results');
  if (!modalResults) return;
  
  modalResults.innerHTML = `
    <div class="space-y-4 p-6">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
        Select PET Scan Type
      </h3>
      
      <button
        type="button"
        data-pet-cpt="78815"
        data-pet-name="PET Scan Whole Body"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <span class="text-2xl">⚛️</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">PET Scan (Whole Body)</div>
            <div class="text-sm text-gray-600">Most common - full body cancer screening</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78815</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-pet-cpt="78608"
        data-pet-name="PET Brain Scan"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <span class="text-2xl">🧠</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">PET Brain Scan</div>
            <div class="text-sm text-gray-600">Brain-specific PET imaging</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78608</div>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        data-pet-cpt="78459"
        data-pet-name="PET Cardiac Scan"
        class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <span class="text-2xl">❤️</span>
          </div>
          <div class="flex-1">
            <div class="font-bold text-lg text-gray-900 mb-1">PET Cardiac Scan</div>
            <div class="text-sm text-gray-600">Heart-specific PET imaging</div>
            <div class="text-xs text-gray-500 mt-2">CPT: 78459</div>
          </div>
        </div>
      </button>
    </div>
  `;
  
  // Add click handlers
  modalResults.querySelectorAll('[data-pet-cpt]').forEach(button => {
    button.addEventListener('click', function() {
      const cptCode = this.dataset.petCpt;
      const displayName = this.dataset.petName;
      console.log(`✅ Selected PET: ${displayName} [${cptCode}]`);
      handleDirectProcedureSelection(cptCode, displayName);
    });
  });
}

/**
 * Handle direct procedure selection (bypasses API lookup)
 * This is used when we know the CPT code and don't need to fetch from API
 */
function handleDirectProcedureSelection(cptCode, displayName) {
  console.log(`🎯 Direct selection: ${displayName} [${cptCode}]`);
  
  // Format the display name to include CPT code
  const fullDisplayName = `${displayName} [${cptCode}]`;
  
  // Call your existing selectProcedure function
  selectProcedure(cptCode, fullDisplayName);
  
  // Close modal and transition to Step 2
  closeModal();
  transitionToStep2();
  
  console.log('✅ Procedure selected and transitioned to Step 2');
}

// =============================================================================
// END OF UPDATED PHASE 2 FUNCTIONS
// =============================================================================
  

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
  
  // 🎯 Check if user typed a modality
  const detectedModality = detectModality(query.trim());
  
  if (detectedModality) {
    console.log('✨ Detected modality:', detectedModality);
    selectedModality = detectedModality;
    
    // ⭐ PHASE 2: Special handling for Mammography
    if (detectedModality === 'Mammography') {
      console.log('🎗️ Showing mammography type selection');
      displayMammographyType();
      return;
    }
    
    // ⭐ PHASE 2: Special handling for Nuclear Medicine
    if (detectedModality === 'Nuclear Medicine') {
      console.log('☢️ Showing nuclear medicine scan types');
      displayNuclearMedicineType();
      return;
    }
    
    // ⭐ PHASE 2: Special handling for PET
    if (detectedModality === 'PET') {
      console.log('⚛️ Showing PET scan types');
      displayPETType();
      return;
    }
    
    // Check if this modality has contrast options (MRI/CT)
    const contrastConfig = CONTRAST_CONFIG[detectedModality];
    
    if (contrastConfig && contrastConfig.hasContrast) {
      console.log('💉 Showing contrast options for', detectedModality);
      displayContrastSelection(detectedModality);
      return;
    } else {
      console.log('➡️ No contrast needed for', detectedModality, '- showing region selection');
      displayRegionSelection(detectedModality, null);
      return;
    }
  }
  
  // 🔍 Not a modality - do regular search
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
    
    if (data.results && data.results.length > 0) {
      displayModalResults(data.results);
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
// CONTRAST SELECTION UI
// ═══════════════════════════════════════════════════════

function displayContrastSelection(modality) {
  const resultsContainer = document.getElementById('modal-results');
  const contrastOptions = CONTRAST_CONFIG[modality].options;
  
  const html = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          Select contrast type for <span class="text-[#003087] font-extrabold">${modality}</span>
        </h3>
        <p class="text-gray-600">Choose how you need the scan performed</p>
      </div>
      
      <!-- Contrast Buttons -->
      <div class="grid gap-4">
        ${contrastOptions.map(option => `
          <button
            type="button"
            class="contrast-option-button group p-6 rounded-xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 text-left"
            data-contrast-id="${option.id}"
            data-contrast-label="${option.label}"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
                  ${option.label}
                </p>
                <p class="text-sm text-gray-600 mt-1">
                  ${option.id === 'without' ? 'Standard MRI scan without injection' : 
                    option.id === 'with' ? 'Enhanced imaging with IV contrast injection' :
                    'Complete imaging with and without contrast'}
                </p>
              </div>
              <svg class="w-6 h-6 text-gray-400 group-hover:text-[#003087] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        `).join('')}
      </div>
      
      <!-- Back Button -->
      <div class="text-center pt-4">
        <button
          type="button"
          id="back-to-search"
          class="text-gray-600 hover:text-[#003087] font-medium transition-colors"
        >
          ← Back to search
        </button>
      </div>
    </div>
  `;
  
  resultsContainer.innerHTML = html;
  
  // Attach click handlers
  resultsContainer.querySelectorAll('.contrast-option-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const contrastId = btn.getAttribute('data-contrast-id');
      const contrastLabel = btn.getAttribute('data-contrast-label');
      
      console.log('✅ Selected contrast:', contrastLabel);
      selectedContrast = contrastId;
      
      // Add visual feedback
      btn.classList.add('border-[#cc9933]', 'bg-yellow-50');
      
      // TODO: Phase 3 - Show region selection
      setTimeout(() => {
        displayRegionSelection(selectedModality, selectedContrast);
      }, 300);
    });
  });
  
  // Back button
  const backBtn = resultsContainer.querySelector('#back-to-search');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      selectedModality = null;
      selectedContrast = null;
      const modalInput = document.getElementById('modal-search-input');
      if (modalInput) {
        modalInput.value = '';
        modalInput.focus();
      }
      resultsContainer.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <p class="text-lg font-medium">Start typing to search procedures</p>
        </div>
      `;
    });
  }
}

function displayRegionSelection(modality, contrast) {
  const resultsContainer = document.getElementById('modal-results');
  const regions = REGION_BY_MODALITY[modality] || [];
  
  if (regions.length === 0) {
    resultsContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-red-600">No regions configured for ${modality}</p>
      </div>
    `;
    return;
  }
  
  const html = `
    <div class="space-y-6">
      <!-- Progress Breadcrumb -->
      <div class="flex items-center gap-2 text-sm">
        <span class="text-[#003087] font-semibold">${modality}</span>
        ${contrast ? `
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-gray-600">${CONTRAST_CONFIG[modality].options.find(o => o.id === contrast)?.label || contrast}</span>
        ` : ''}
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="font-semibold text-[#003087]">Select Region</span>
      </div>
      
      <!-- Header -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          Which body part needs imaging?
        </h3>
        <p class="text-gray-600">Select the area to be scanned</p>
      </div>
      
      <!-- Region Grid -->
      <div class="grid grid-cols-2 gap-3">
        ${regions.map(region => `
          <button
            type="button"
            class="region-option-button group p-4 rounded-xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200"
            data-region-id="${region.id}"
            data-region-label="${region.label}"
          >
            <div class="text-center">
              <div class="text-3xl mb-2">${region.icon}</div>
              <p class="text-sm font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
                ${region.label}
              </p>
            </div>
          </button>
        `).join('')}
      </div>
      
      <!-- Back Button -->
      <div class="text-center pt-4">
        <button
          type="button"
          id="back-to-contrast"
          class="text-gray-600 hover:text-[#003087] font-medium transition-colors"
        >
          ← Back to contrast selection
        </button>
      </div>
    </div>
  `;
  
  resultsContainer.innerHTML = html;
  
  // Attach click handlers to region buttons
  resultsContainer.querySelectorAll('.region-option-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const regionId = btn.getAttribute('data-region-id');
      const regionLabel = btn.getAttribute('data-region-label');
      
      console.log('✅ Selected region:', regionLabel);
      selectedRegion = regionId;
      
      // Add visual feedback
      btn.classList.add('border-[#cc9933]', 'bg-yellow-50');
      
      // TODO: Phase 4 - Resolve to CPT code and show results
      setTimeout(() => {
        resolveProcedure(selectedModality, selectedContrast, selectedRegion);
      }, 300);
    });
  });
  
  // Back button
  const backBtn = resultsContainer.querySelector('#back-to-contrast');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      selectedRegion = null;
      if (CONTRAST_CONFIG[selectedModality]?.hasContrast) {
        displayContrastSelection(selectedModality);
      } else {
        // Reset to search
        selectedModality = null;
        const modalInput = document.getElementById('modal-search-input');
        if (modalInput) {
          modalInput.value = '';
          modalInput.focus();
        }
        resultsContainer.innerHTML = `
          <div class="text-center py-12 text-gray-500">
            <p class="text-lg font-medium">Start typing to search procedures</p>
          </div>
        `;
      }
    });
  }
}



// ═══════════════════════════════════════════════════════
// PROCEDURE RESOLUTION (Phase 4 - Coming Next)
// ═══════════════════════════════════════════════════════

async function resolveProcedure(modality, contrast, region) {
  const resultsContainer = document.getElementById('modal-results');
  
  console.log('🎯 Resolving procedure:', { modality, contrast, region });
  
  // Show loading state
  resultsContainer.innerHTML = `
    <div class="text-center py-12">
      <svg class="w-12 h-12 mx-auto mb-4 text-[#003087] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600">Finding your exact procedure...</p>
    </div>
  `;
  
  try {
    // Call the resolution API
    const url = new URL('/api/procedures/resolve', window.location.origin);
    url.searchParams.set('modality', modality);
    url.searchParams.set('region', region);
    if (contrast) url.searchParams.set('contrast', contrast);
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    console.log('✅ Resolution result:', data);
    
    if (!data.found) {
      // No procedure found
      resultsContainer.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <p class="text-xl font-bold text-gray-900 mb-4">Procedure Not Found</p>
          <p class="text-gray-600 mb-6">We couldn't find an exact match for this combination.</p>
          
          <button
            type="button"
            id="back-to-search-notfound"
            class="px-6 py-3 bg-[#003087] text-white rounded-lg hover:bg-[#002060] transition-colors"
          >
            Try Different Search
          </button>
        </div>
      `;
      
      document.getElementById('back-to-search-notfound')?.addEventListener('click', () => {
        selectedModality = null;
        selectedContrast = null;
        selectedRegion = null;
        const modalInput = document.getElementById('modal-search-input');
        if (modalInput) {
          modalInput.value = '';
          modalInput.focus();
        }
        resultsContainer.innerHTML = `
          <div class="text-center py-12 text-gray-500">
            <p class="text-lg font-medium">Start typing to search procedures</p>
          </div>
        `;
      });
      
      return;
    }
    
    // Success! Found the procedure
    const procedure = data.procedure;
    const cptCode = procedure.cpt_code;
    const procedureName = procedure.friendly_name;
    
    console.log('🎉 Found CPT code:', cptCode);
    
    // Close modal and populate the hero form
    selectProcedure(cptCode, procedureName, cptCode);
    
  } catch (error) {
    console.error('❌ Resolution error:', error);
    resultsContainer.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-xl font-bold text-gray-900 mb-4">Something Went Wrong</p>
        <p class="text-gray-600 mb-6">Please try again or use the regular search.</p>
        
        <button
          type="button"
          id="back-to-search-error"
          class="px-6 py-3 bg-[#003087] text-white rounded-lg hover:bg-[#002060] transition-colors"
        >
          Back to Search
        </button>
      </div>
    `;
    
    document.getElementById('back-to-search-error')?.addEventListener('click', () => {
      closeModal();
    });
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

// =============================================================================

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


  // ═══════════════════════════════════════════════════════
// DEBUG: Test modality detection
// ═══════════════════════════════════════════════════════
console.log('🧪 Testing modality detection:');
console.log('  "mri" →', detectModality('mri'));
console.log('  "ct" →', detectModality('ct'));
console.log('  "cat scan" →', detectModality('cat scan'));
console.log('  "xray" →', detectModality('xray'));
  
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
  
  // Handle "Change" button - reopen modal with clean state
  const changeButton = document.getElementById('change-procedure-button');
  if (changeButton) {
    changeButton.addEventListener('click', () => {
      console.log('🔄 Change button clicked - reopening modal');
      openModal();
      
      // Clear the modal input
      const modalInput = document.getElementById('modal-search-input');
      if (modalInput) {
        modalInput.value = '';
      }
      
      // Show initial "Start typing" state
      const modalResults = document.getElementById('modal-results');
      if (modalResults) {
        modalResults.innerHTML = `
          <div class="text-center py-12 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p class="text-lg font-medium">Start typing to search procedures</p>
            <p class="text-sm mt-1">Try "MRI", "CT Scan", or "Ultrasound"</p>
          </div>
        `;
      }
      
      // Focus the input
      setTimeout(() => {
        modalInput?.focus();
      }, 100);
    });
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