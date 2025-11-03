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
  MRI: [
    "Brain",
    "Cervical Spine (Neck)",
    "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)",
    "Shoulder",
    "Elbow",
    "Wrist / Hand",
    "Hip",
    "Knee",
    "Ankle / Foot",
    "Abdomen",
    "Pelvis",
    "Chest",
    "Breast",
    "Orbit / Face / Neck",
    "TMJ"
  ],
  CT: [
    "Head / Brain",
    "Chest",
    "Abdomen",
    "Abdomen & Pelvis",
    "Pelvis",
    "Cervical Spine (Neck)",
    "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)",
    "Sinuses",
    "Neck (Soft Tissue)",
    "Extremity"
  ]
};

/**
 * Get medical icon for a body region
 * Uses Unicode escape sequences to avoid encoding issues
 * 
 * @param {string} regionLabel - e.g. "Knee", "Brain", "Lumbar Spine (Low Back)"
 * @param {string} modality - "MRI" or "CT"
 * @returns {string} - Emoji icon for the region
 */
function getIconForRegion(regionLabel, modality) {
  // Try to find icon from ProcedureLibrary
  if (window.ProcedureLibrary && window.ProcedureLibrary[modality]) {
    const library = window.ProcedureLibrary[modality];
    const normalizedKey = window.ProcedureHelpers?.normalizeRegionKey(regionLabel);
    
    if (normalizedKey && library[normalizedKey]) {
      return library[normalizedKey].icon || String.fromCodePoint(0x1FA7A);
    }
  }
  
  // Fallback icon mapping using Unicode code points
  const iconMap = {
    'Brain': String.fromCodePoint(0x1F9E0),                     // Brain
    'Head / Brain': String.fromCodePoint(0x1F9E0),              // Brain
    'Cervical Spine': String.fromCodePoint(0x1F9B4),            // Bone
    'Cervical Spine (Neck)': String.fromCodePoint(0x1F9B4),     // Bone
    'Thoracic Spine': String.fromCodePoint(0x1F9B4),            // Bone
    'Thoracic Spine (Mid Back)': String.fromCodePoint(0x1F9B4), // Bone
    'Lumbar Spine': String.fromCodePoint(0x1F9B4),              // Bone
    'Lumbar Spine (Low Back)': String.fromCodePoint(0x1F9B4),   // Bone
    'Shoulder': String.fromCodePoint(0x1F4AA),                   // Flexed Biceps
    'Elbow': String.fromCodePoint(0x1F4AA),                      // Flexed Biceps
    'Wrist / Hand': String.fromCodePoint(0x270B),                // Raised Hand
    'Hip': String.fromCodePoint(0x1F9B4),                        // Bone
    'Knee': String.fromCodePoint(0x1F9B5),                       // Leg
    'Ankle / Foot': String.fromCodePoint(0x1F9B6),               // Foot
    'Abdomen': String.fromCodePoint(0x1FAC1),                    // Lungs
    'Pelvis': String.fromCodePoint(0x1FAC1),                     // Lungs
    'Chest': String.fromCodePoint(0x1FAC1),                      // Lungs
    'Breast': String.fromCodePoint(0x1F380),                     // Ribbon
    'Cardiac': String.fromCodePoint(0x2764, 0xFE0F),             // Red Heart
    'Heart': String.fromCodePoint(0x2764, 0xFE0F),               // Red Heart
    'Orbit / Face / Neck': String.fromCodePoint(0x1F441, 0xFE0F), // Eye
    'TMJ': String.fromCodePoint(0x1F441, 0xFE0F),                // Eye
    'Sinuses': String.fromCodePoint(0x1F443),                    // Nose
    'Neck (Soft Tissue)': String.fromCodePoint(0x1FAC1),         // Lungs
    'Extremity': String.fromCodePoint(0x1F9B4),                  // Bone
    'Abdomen & Pelvis': String.fromCodePoint(0x1FAC1)            // Lungs
  };
  
  return iconMap[regionLabel] || String.fromCodePoint(0x1FA7A); // Stethoscope
}

const SPECIAL_MODALITY_CONFIGS = {
  Mammography: {
    title: 'Select Mammography Type',
    dataAttrPrefix: 'mamm',
    procedures: [
      { cpt: '77067', name: 'Screening Mammogram', description: 'Routine annual screening for early detection', icon: '🎗️', color: 'blue' },
      { cpt: '77066', name: 'Diagnostic Mammogram', description: 'Follow-up for symptoms or abnormal findings', icon: '🔍', color: 'purple' },
      { cpt: '77063', name: '3D Mammogram (Tomosynthesis)', description: 'Advanced 3D imaging technology', icon: '📊', color: 'green' }
    ]
  },
  'Nuclear Medicine': {
    title: 'Select Nuclear Medicine Scan Type',
    dataAttrPrefix: 'nm',
    procedures: [
      { cpt: '78306', name: 'Bone Scan (Whole Body)', description: 'Detect bone abnormalities, fractures, or cancer', icon: '🦴', color: 'gray' },
      { cpt: '78452', name: 'Cardiac Stress Test', description: 'Evaluate heart blood flow and function', icon: '❤️', color: 'red' },
      { cpt: '78012', name: 'Thyroid Scan', description: 'Evaluate thyroid function and nodules', icon: '🦋', color: 'blue' },
      { cpt: '78072', name: 'Parathyroid Scan', description: 'Locate overactive parathyroid glands', icon: '🟢', color: 'green' }
    ]
  },
  PET: {
    title: 'Select PET Scan Type',
    dataAttrPrefix: 'pet',
    procedures: [
      { cpt: '78815', name: 'PET Scan (Whole Body)', description: 'Most common - full body cancer screening', icon: '⚛️', color: 'purple' },
      { cpt: '78608', name: 'PET Brain Scan', description: 'Brain-specific PET imaging', icon: '🧠', color: 'blue' },
      { cpt: '78459', name: 'PET Cardiac Scan', description: 'Heart-specific PET imaging', icon: '❤️', color: 'red' }
    ]
  }
};

/**
 * Display special modality type selection
 * ONE function replaces: displayMammographyType, displayNuclearMedicineType, displayPETType
 */
function displaySpecialModalityType(config) {
  console.log(`📋 Displaying ${config.title}`);
  const modalResults = document.getElementById('modal-results');
  if (!modalResults) return;
  
  const proceduresHTML = config.procedures.map(proc => `
    <button type="button" data-${config.dataAttrPrefix}-cpt="${proc.cpt}" data-${config.dataAttrPrefix}-name="${proc.name}"
      class="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-full bg-${proc.color}-100 flex items-center justify-center group-hover:bg-${proc.color}-200 transition-colors">
          <span class="text-2xl">${proc.icon}</span>
        </div>
        <div class="flex-1">
          <div class="font-bold text-lg text-gray-900 mb-1">${proc.name}</div>
          <div class="text-sm text-gray-600">${proc.description}</div>
          <div class="text-xs text-gray-500 mt-2">CPT: ${proc.cpt}</div>
        </div>
      </div>
    </button>
  `).join('');
  
  modalResults.innerHTML = `<div class="space-y-4 p-6"><h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">${config.title}</h3>${proceduresHTML}</div>`;
  
  modalResults.querySelectorAll(`[data-${config.dataAttrPrefix}-cpt]`).forEach(button => {
    button.addEventListener('click', function() {
      const cptCode = this.dataset[`${config.dataAttrPrefix}Cpt`];
      const displayName = this.dataset[`${config.dataAttrPrefix}Name`];
      console.log(`✅ Selected: ${displayName} [${cptCode}]`);
      handleDirectProcedureSelection(cptCode, displayName);
    });
  });
}

/**
 * Convert region strings to objects with icons
 * Ensures every region has both a label and icon for UI display
 * 
 * @param {Array<string|object>} list - Region list from REGION_BY_MODALITY
 * @param {string} modality - "MRI" or "CT" 
 * @returns {Array<{label: string, icon: string}>}
 */
function normalizeRegionList(list, modality) {
  return (list || []).map(region => {
    if (typeof region === 'string') {
      return {
        label: region,
        icon: getIconForRegion(region, modality)
      };
    }
    return {
      label: region.label || region.id || 'Region',
      icon: region.icon || getIconForRegion(region.label, modality)
    };
  });
}


// Optional grouping for nicer sectioned UI (use or ignore):
const REGION_BY_MODALITY_GROUPED = {
  MRI: {
    "Head & Neck": [
      { label: "Brain" },
      { label: "Orbit / Face / Neck" },
      { label: "TMJ" }
    ],
    "Spine": [
      { label: "Cervical Spine (Neck)" },
      { label: "Thoracic Spine (Mid Back)" },
      { label: "Lumbar Spine (Low Back)" }
    ],
    "Extremities": [
      { label: "Shoulder" },
      { label: "Elbow" },
      { label: "Wrist / Hand" },
      { label: "Hip" },
      { label: "Knee" },
      { label: "Ankle / Foot" }
    ],
    "Torso": [
      { label: "Chest" },
      { label: "Abdomen" },
      { label: "Pelvis" },
      { label: "Breast" }
    ]
  },
  CT: {
    "Head & Neck": [
      { label: "Head / Brain" },
      { label: "Sinuses" },
      { label: "Neck (Soft Tissue)" }
    ],
    "Spine": [
      { label: "Cervical Spine (Neck)" },
      { label: "Thoracic Spine (Mid Back)" },
      { label: "Lumbar Spine (Low Back)" }
    ],
    "Torso": [
      { label: "Chest" },
      { label: "Abdomen" },
      { label: "Abdomen & Pelvis" },
      { label: "Pelvis" }
    ],
    "Extremities": [
      { label: "Extremity" }
    ]
  }
};

// Search synonyms → auto-map free-text into your tiles.
const REGION_SYNONYMS = {
  MRI: {
    "knee": "Knee",
    "ankle": "Ankle / Foot", "foot": "Ankle / Foot",
    "wrist": "Wrist / Hand", "hand": "Wrist / Hand",
    "shoulder": "Shoulder", "elbow": "Elbow", "hip": "Hip",
    "neck": "Cervical Spine (Neck)",
    "mid back": "Thoracic Spine (Mid Back)",
    "low back": "Lumbar Spine (Low Back)",
    "tmj": "TMJ",
    "breast": "Breast",
    "orbit": "Orbit / Face / Neck", "face": "Orbit / Face / Neck"
  },
  CT: {
    "head": "Head / Brain", "brain": "Head / Brain",
    "sinus": "Sinuses", "sinuses": "Sinuses",
    "neck": "Neck (Soft Tissue)",
    "abdomen pelvis": "Abdomen & Pelvis", "a/p": "Abdomen & Pelvis",
    "lumbar": "Lumbar Spine (Low Back)",
    "thoracic": "Thoracic Spine (Mid Back)",
    "cervical": "Cervical Spine (Neck)",
    "arm": "Extremity", "leg": "Extremity"
  }
};

// Fallback helper
function suggestRegions(input, regions) {
  const q = (input || "").toLowerCase().trim();
  if (!q) return [];
  return regions.filter(r => {
    const t = r.toLowerCase();
    return t.includes(q) || t.split(/[^\w]+/).some(w => q.includes(w));
  });
}




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
 * Handle direct procedure selection (bypasses API lookup)
 * This is used when we know the CPT code and don't need to fetch from API
 */
function handleDirectProcedureSelection(cptCode, displayName) {
  console.log(`🎯 Direct selection: ${displayName} [${cptCode}]`);
  
  // Format the display name with newline for 2-line display
  // Line 1: Procedure name
  // Line 2: CPT badge
  const formattedDisplayName = `${displayName}\nCPT ${cptCode}`;
  
  // Call selectProcedure with formatted name
  selectProcedure(cptCode, formattedDisplayName, cptCode);
  
  // Close modal and transition to Step 2
  closeModal();
  transitionToStep2();
  
  console.log('✅ Procedure selected and transitioned to Step 2');
}

/**
 * Search for a procedure by exact CPT code
 * @param {string} cptCode - 5-digit CPT code
 * @returns {Array} - Array of matching procedures
 */
function searchByCPT(cptCode) {
  console.log('🔢 Searching for CPT code:', cptCode);
  const results = [];
  
  // Search MRI library
  Object.keys(window.ProcedureLibrary.MRI).forEach(regionKey => {
    const region = window.ProcedureLibrary.MRI[regionKey];
    region.procedures.forEach(proc => {
      if (proc.cpt === cptCode) {
        results.push({
          cpt: proc.cpt,
          label: proc.label,
          modality: 'MRI',
          icon: region.icon || '🧲',
          category: region.category,
          description: proc.description,
          duration: proc.duration,
          prep: proc.prep,
          useCase: proc.useCase
        });
      }
    });
  });
  
  // Search CT library
  Object.keys(window.ProcedureLibrary.CT).forEach(regionKey => {
    const region = window.ProcedureLibrary.CT[regionKey];
    region.procedures.forEach(proc => {
      if (proc.cpt === cptCode) {
        results.push({
          cpt: proc.cpt,
          label: proc.label,
          modality: 'CT',
          icon: region.icon || '⚡',
          category: region.category,
          description: proc.description,
          duration: proc.duration,
          prep: proc.prep,
          useCase: proc.useCase
        });
      }
    });
  });
  
  // Special cases: Mammography
  const mammoMap = {
    '77067': { label: 'Screening Mammogram', desc: 'Routine annual screening for early detection' },
    '77066': { label: 'Diagnostic Mammogram', desc: 'Follow-up for symptoms or abnormal findings' },
    '77063': { label: '3D Mammogram (Tomosynthesis)', desc: 'Advanced 3D imaging technology' }
  };
  
  if (mammoMap[cptCode]) {
    results.push({
      cpt: cptCode,
      label: mammoMap[cptCode].label,
      modality: 'Mammography',
      icon: '🎀',
      category: 'Breast',
      description: mammoMap[cptCode].desc,
      duration: '15-30 min',
      prep: 'None',
      useCase: 'Breast cancer screening'
    });
  }
  
  // Special cases: Nuclear Medicine
  const nuclearMap = {
    '78306': { label: 'Bone Scan (Whole Body)', desc: 'Detect bone abnormalities, fractures, or cancer' },
    '78452': { label: 'Cardiac Stress Test', desc: 'Evaluate heart blood flow and function' },
    '78012': { label: 'Thyroid Scan', desc: 'Evaluate thyroid function and nodules' },
    '78072': { label: 'Parathyroid Scan', desc: 'Locate overactive parathyroid glands' }
  };
  
  if (nuclearMap[cptCode]) {
    results.push({
      cpt: cptCode,
      label: nuclearMap[cptCode].label,
      modality: 'Nuclear Medicine',
      icon: '☢️',
      category: 'Nuclear Medicine',
      description: nuclearMap[cptCode].desc,
      duration: '30-60 min',
      prep: 'Fasting may be required',
      useCase: 'Specialized imaging'
    });
  }
  
  // Special cases: PET
  const petMap = {
    '78815': { label: 'PET Scan (Whole Body)', desc: 'Full body cancer screening' },
    '78608': { label: 'PET Brain Scan', desc: 'Brain-specific PET imaging' },
    '78459': { label: 'PET Cardiac Scan', desc: 'Heart-specific PET imaging' }
  };
  
  if (petMap[cptCode]) {
    results.push({
      cpt: cptCode,
      label: petMap[cptCode].label,
      modality: 'PET',
      icon: '⚛️',
      category: 'PET Scan',
      description: petMap[cptCode].desc,
      duration: '45-90 min',
      prep: 'Fasting required',
      useCase: 'Cancer detection and staging'
    });
  }
  
  console.log('🔍 CPT search results:', results);
  return results;
}


/**
 * COMPREHENSIVE SEARCH SYSTEM
 * ============================
 * Allows users to search by body part and see ALL available procedures
 * across all modalities (MRI, CT, Mammography, etc.)
 * 
 * Example: User types "breast" → sees MRI, Mammography, Ultrasound options
 * Example: User types "spine" → sees all MRI/CT spine options
 */

/**
 * Search all procedures by keyword (body part, modality, etc)
 * Returns flat list of ALL matching procedures across all modalities
 * 
 * @param {string} searchTerm - User's search query
 * @returns {Array} - Array of matching procedure objects
 */
function searchAllProcedures(searchTerm) {
  const results = [];
  const term = searchTerm.toLowerCase().trim();
  
// 🔢 NEW: Check if it's a CPT code search (5-digit number)
  if (/^\d{5}$/.test(term)) {
    console.log('🔢 CPT code detected:', term);
    return searchByCPT(term);
  }

  console.log('🔍 Searching all procedures for:', term);
  
  // Search through MRI library
  const mriLibrary = window.ProcedureLibrary?.MRI;
  if (mriLibrary) {
    Object.keys(mriLibrary).forEach(regionKey => {
      const region = mriLibrary[regionKey];
      
      // Check if search term matches category
      const categoryLower = region.category.toLowerCase();
      const matchesCategory = categoryLower.includes(term);
      
      // Also check if search term is in the regionKey itself
      const matchesKey = regionKey.toLowerCase().includes(term);
      
      if (matchesCategory || matchesKey) {
        // Add ALL procedures from this region
        region.procedures.forEach(proc => {
          results.push({
            modality: 'MRI',
            category: region.category,
            icon: region.icon,
            cpt: proc.cpt,
            label: proc.label,
            shortLabel: proc.shortLabel,
            description: proc.description,
            duration: proc.duration,
            prep: proc.prep,
            useCase: proc.useCase
          });
        });
      }
    });
  }
  
  // Search through CT library
  const ctLibrary = window.ProcedureLibrary?.CT;
  if (ctLibrary) {
    Object.keys(ctLibrary).forEach(regionKey => {
      const region = ctLibrary[regionKey];
      
      const categoryLower = region.category.toLowerCase();
      const matchesCategory = categoryLower.includes(term);
      const matchesKey = regionKey.toLowerCase().includes(term);
      
      if (matchesCategory || matchesKey) {
        region.procedures.forEach(proc => {
          results.push({
            modality: 'CT',
            category: region.category,
            icon: region.icon,
            cpt: proc.cpt,
            label: proc.label,
            shortLabel: proc.shortLabel,
            description: proc.description,
            duration: proc.duration,
            prep: proc.prep,
            useCase: proc.useCase
          });
        });
      }
    });
  }
  
  // Special case: Add Mammography if searching for "breast"
  if (term.includes('breast') || term === 'mammo' || term === 'mammogram') {
    results.push(
      {
        modality: 'Mammography',
        category: 'Breast',
        icon: String.fromCodePoint(0x1F397), // Medal ribbon
        cpt: '77067',
        label: 'Screening Mammogram',
        shortLabel: 'Screening',
        description: 'Routine annual screening for early detection',
        duration: '15-20 min',
        prep: 'No deodorant or powder',
        useCase: 'Annual screening, preventive care'
      },
      {
        modality: 'Mammography',
        category: 'Breast',
        icon: String.fromCodePoint(0x1F397),
        cpt: '77066',
        label: 'Diagnostic Mammogram',
        shortLabel: 'Diagnostic',
        description: 'Follow-up for symptoms or abnormal findings',
        duration: '20-30 min',
        prep: 'No deodorant or powder',
        useCase: 'Lump, pain, or callback from screening'
      },
      {
        modality: 'Mammography',
        category: 'Breast',
        icon: String.fromCodePoint(0x1F397),
        cpt: '77063',
        label: '3D Mammogram (Tomosynthesis)',
        shortLabel: '3D',
        description: 'Advanced 3D imaging technology',
        duration: '20-30 min',
        prep: 'No deodorant or powder',
        useCase: 'Dense breasts, detailed imaging'
      }
    );
  }
  
  console.log(`✅ Found ${results.length} procedures matching "${term}"`);
  return results;
}

/**
 * Display comprehensive search results grouped by modality
 * 
 * @param {string} query - User's search query
 */
function displayComprehensiveSearch(query) {
  const results = searchAllProcedures(query);
  const modalResults = document.getElementById('modal-results');
  
  if (!modalResults) {
    console.error('❌ modal-results element not found');
    return;
  }
  
  if (results.length === 0) {
    modalResults.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-lg font-medium text-gray-900 mb-2">No procedures found for "${query}"</p>
        <p class="text-sm text-gray-600">Try searching by body part</p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button class="suggestion-chip" data-suggest="knee">Knee</button>
          <button class="suggestion-chip" data-suggest="spine">Spine</button>
          <button class="suggestion-chip" data-suggest="brain">Brain</button>
          <button class="suggestion-chip" data-suggest="breast">Breast</button>
        </div>
      </div>
    `;
    
    // Add suggestion click handlers
    modalResults.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        const suggestion = this.dataset.suggest;
        const modalInput = document.getElementById('modal-search-input');
        if (modalInput) {
          modalInput.value = suggestion;
          displayComprehensiveSearch(suggestion);
        }
      });
    });
    return;
  }
  
  // Group results by modality
  const grouped = {};
  results.forEach(proc => {
    if (!grouped[proc.modality]) grouped[proc.modality] = [];
    grouped[proc.modality].push(proc);
  });
  
  // Build HTML
  let html = `
    <div class="space-y-6 p-6">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900">
          ${results.length} ${results.length === 1 ? 'procedure' : 'procedures'} found for "${query}"
        </h3>
        <p class="text-gray-600 mt-2">Select the procedure you need</p>
      </div>
  `;
  
  // Display grouped by modality
  Object.keys(grouped).sort().forEach(modality => {
    const procedures = grouped[modality];
    
    // Determine modality color
    let modalityColor = '#003087'; // Default blue
    if (modality === 'CT') modalityColor = '#0052cc';
    if (modality === 'Mammography') modalityColor = '#ec4899'; // Pink
    
    html += `
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-3 pb-2 border-b-2 flex items-center gap-2" style="color: ${modalityColor}; border-color: ${modalityColor};">
          <span class="text-2xl">${getModalityIcon(modality)}</span>
          <span>${modality}</span>
          <span class="text-sm font-normal text-gray-500">(${procedures.length})</span>
        </h4>
        <div class="space-y-2">
    `;
    
    procedures.forEach(proc => {
      const iconDisplay = typeof proc.icon === 'string' && proc.icon.includes('fromCodePoint') 
        ? eval(proc.icon) 
        : proc.icon || '🩺';
      
      html += `
        <button
          type="button"
          class="comprehensive-result-button w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group"
          data-comprehensive-cpt="${proc.cpt}"
          data-comprehensive-label="${proc.label}"
        >
          <div class="flex items-start gap-3">
            <span class="text-2xl flex-shrink-0">${iconDisplay}</span>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-900 group-hover:text-[#003087] transition-colors">
                ${proc.label}
              </div>
              <div class="text-sm text-gray-600 mt-1 line-clamp-2">${proc.description}</div>
              <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">CPT: ${proc.cpt}</span>
                <span>⏱️ ${proc.duration}</span>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-[#003087] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </button>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  // Add back button
  html += `
      <div class="text-center pt-4 border-t border-gray-200">
        <button
          type="button"
          id="back-to-empty-search"
          class="text-gray-600 hover:text-[#003087] font-medium transition-colors"
        >
          ← Clear search and start over
        </button>
      </div>
    </div>
  `;
  
  modalResults.innerHTML = html;
  
  // Add click handlers for results
  modalResults.querySelectorAll('.comprehensive-result-button').forEach(button => {
    button.addEventListener('click', function() {
      const cpt = this.dataset.comprehensiveCpt;
      const label = this.dataset.comprehensiveLabel;
      console.log(`✅ Selected via comprehensive search: ${label} [${cpt}]`);
      handleDirectProcedureSelection(cpt, label);
    });
  });
  
  // Add back button handler
  const backBtn = modalResults.querySelector('#back-to-empty-search');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const modalInput = document.getElementById('modal-search-input');
      if (modalInput) {
        modalInput.value = '';
        modalInput.focus();
      }
      
      modalResults.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <p class="text-lg font-medium">Start typing to search procedures</p>
          <p class="text-sm mt-1">Try "MRI", "CT Scan", or a body part like "knee"</p>
        </div>
      `;
    });
  }
}

/**
 * Get icon for modality
 */
function getModalityIcon(modality) {
  const icons = {
    'MRI': '🧲',
    'CT': '⚡',
    'Mammography': '🎀',
    'Ultrasound': '🔊',
    'X-Ray': '📸',
    'PET': '☢️',
    'Nuclear Medicine': '⚛️'
  };
  return icons[modality] || '🩺';
}

console.log('✅ Comprehensive search system loaded');

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
    
    // ⭐ PHASE 2: Special modalities (Mammography, Nuclear Medicine, PET)
    if (SPECIAL_MODALITY_CONFIGS[detectedModality]) {
      displaySpecialModalityType(SPECIAL_MODALITY_CONFIGS[detectedModality]);
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
  
  // 🔍 NOT a modality - Use comprehensive search!
  console.log('🔍 Not a modality - triggering comprehensive search');
  displayComprehensiveSearch(query);
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
          Select contrast type for <span class="text-amber-600 font-extrabold">${modality}</span>
        </h3>
        <p class="text-gray-600">Choose how you need the scan performed</p>
      </div>
      
      <!-- Contrast Buttons -->
      <div class="grid gap-4">
        ${contrastOptions.map(option => `
          <button
            type="button"
            class="contrast-option-button group p-6 rounded-xl border-2 border-gray-200 hover:border-[#CC9933] hover:bg-amber-50 transition-all duration-200 text-left"
            data-contrast-id="${option.id}"
            data-contrast-label="${option.label}"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-900 group-hover:text-[#CC9933] transition-colors">
                  ${option.label}
                </p>
                <p class="text-sm text-gray-600 mt-1">
                  ${option.id === 'without' ? `Standard ${modality} scan without injection` : 
                    option.id === 'with' ? `Enhanced ${modality} imaging with IV contrast injection` :
                    `Complete ${modality} imaging with and without contrast`}
                </p>
              </div>
              <svg class="w-6 h-6 text-gray-400 group-hover:text-[#CC9933] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          class="font-medium transition-colors"
          style="color: #6B7280;"
          onmouseover="this.style.color='#CC9933'"
          onmouseout="this.style.color='#6B7280'"
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
  const regions = normalizeRegionList(REGION_BY_MODALITY[modality], modality) || [];
  const resultsContainer = document.getElementById('modal-results');

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
        <span class="text-[#CC9933] font-semibold">${modality}</span>
        ${contrast ? `
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-gray-600">${CONTRAST_CONFIG[modality].options.find(o => o.id === contrast)?.label || contrast}</span>
        ` : ''}
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="font-semibold text-[#CC9933]">Select Region</span>
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
    const regionLabel = btn.getAttribute('data-region-label');

    console.log('✅ Selected region:', regionLabel);
    selectedRegion = regionLabel;

    // Visual feedback
    btn.classList.add('border-[#cc9933]', 'bg-yellow-50');

    // Call resolver with selected values
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
// PROCEDURE RESOLUTION (MRI + CT Supported)
// ═══════════════════════════════════════════════════════

async function resolveProcedure(modality, contrast, region) {
  const resultsContainer = document.getElementById('modal-results');
  console.log('🎯 Resolving procedure:', { modality, contrast, region });

  // Loading UI (keep existing - it's good!)
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
    // ✨ NEW: Use simple library instead of API call
    const procedure = window.ProcedureHelpers.resolveProcedure(modality, contrast, region);
    
    // Simulate a tiny delay so users see the loading (optional - feels more natural)
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!procedure) {
      // Handle not found - keep your existing "not found" UI
      const suggestions = suggestRegions(region, REGION_BY_MODALITY[modality] || []).slice(0, 5);

      let suggestHtml = '';
      if (suggestions.length > 0) {
        suggestHtml = `
          <div class="mt-6">
            <p class="text-sm text-gray-700 mb-2">Did you mean:</p>
            <div class="flex flex-wrap gap-2 justify-center">
              ${suggestions.map(s => `
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-full border border-gray-300 hover:border-[#003087] hover:bg-blue-50 text-sm"
                  data-suggest-region="${s}"
                >${s}</button>
              `).join('')}
            </div>
          </div>
        `;
      }

      resultsContainer.innerHTML = `
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <p class="text-xl font-bold text-gray-900 mb-4">Procedure Not Found</p>
          <p class="text-gray-600 mb-6">We couldn't find an exact match for this combination.</p>
          ${suggestHtml}
          <button
            type="button"
            id="back-to-search-notfound"
            class="mt-6 px-6 py-3 bg-[#003087] text-white rounded-lg hover:bg-[#002060] transition-colors"
          >
            Try Different Search
          </button>
        </div>
      `;

      resultsContainer.querySelectorAll('[data-suggest-region]').forEach(btn => {
        btn.addEventListener('click', () => {
          const suggested = btn.getAttribute('data-suggest-region');
          resolveProcedure(modality, contrast, suggested);
        });
      });

      document.getElementById('back-to-search-notfound')?.addEventListener('click', () => {
        resetSearchFlow();
      });

      return;
    }

    // ✨ Format as data object matching old API structure
    const data = {
      found: true,
      procedure: {
        cpt_code: procedure.cpt_code,
        patient_label: procedure.patient_label,
        badge_label: procedure.badge_label
      }
    };

    console.log('✅ Resolution result:', data);

    // ✅ Success path
    const { cpt_code, patient_label, badge_label } = data.procedure;
    selectProcedure(cpt_code, `${patient_label}\n${badge_label}`, cpt_code);

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
      <div class="mb-3" data-procedure-id="${proc.id}" data-cpt-code="${proc.cpt_code || ''}">
        <!-- Main procedure card -->
        <button
          type="button"
          class="procedure-header w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50 transition-all duration-200 group ${isExpanded ? 'border-[#003087] bg-blue-50' : ''}"
          data-procedure-id="${proc.id}"
          data-has-options="${hasMultipleOptions}"
          data-cpt-code="${proc.cpt_code || ''}"
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
        let displayName = header.querySelector('h4').textContent.trim();
        
        // Try to get CPT code from data attribute first
        let cptCode = header.getAttribute('data-cpt-code') || proc.getAttribute('data-cpt-code');
        
        // Fallback to option buttons if available
        if (!cptCode) {
          const optionButtons = proc.querySelectorAll('.option-button');
          if (optionButtons.length === 1) {
            cptCode = optionButtons[0].getAttribute('data-cpt-code');
          }
        }
        
        // Format display name with CPT code on newline for 2-line display
        if (cptCode) {
          displayName = `${displayName}\nCPT ${cptCode}`;
        }
        
        selectProcedure(procedureId, displayName, cptCode);
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
      
      // Format displayName with CPT code on newline for 2-line display
      const formattedDisplayName = `${displayName}\nCPT ${cptCode}`;
      
      selectProcedure(procedureId, formattedDisplayName, cptCode);
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
// Renders the 2-line Selected Procedure UI (Blue diamond badge)
function renderSelectedProcedure(label, badgeText) {
  const el = document.getElementById('selected-procedure-display');
  if (!el) return;

  el.dataset.label = label;
  el.dataset.badge = badgeText;
  el.dataset.locked = '1';

  el.innerHTML = `
    <div class="font-semibold text-gray-900 leading-tight">
      ${label}
    </div>
    <div class="text-xs font-semibold text-[#003087] flex items-center gap-1.5 mt-0.5 cpt-badge">
      <span class="text-sm leading-none opacity-90" style="transform: translateY(1px);">🔷</span>
      <span class="tracking-wide">${badgeText}</span>
    </div>
  `;
}





function selectProcedure(procedureId, displayName, cptCode) {
  console.log('✅ Procedure selected:', { procedureId, displayName, cptCode });

  const hiddenProcedure = document.getElementById('hero-selected-procedure');
  const hiddenCpt = document.getElementById('hero-selected-cpt');

  // Hidden form fields used by your ZIP search
  if (hiddenProcedure) hiddenProcedure.value = procedureId;
  if (hiddenCpt && cptCode) hiddenCpt.value = cptCode;

  // Expect "Line1\nLine2" from resolver
  const [label, badge] = displayName.split('\n');  // e.g., "MRI Brain – With & Without Contrast", "CPT 70553"

  // 🔒 Render and lock the 2-line UI
  renderSelectedProcedure(label, badge);

  // Continue your existing flow
  closeModal();
  transitionToStep2(label);
}




// ═══════════════════════════════════════════════════════
// STEP TRANSITIONS
// ═══════════════════════════════════════════════════════

function transitionToStep2() {
  const step1Container = document.getElementById('step-1-container');
  const step2Container = document.getElementById('step-2-container');
  const selectedDisplay = document.getElementById('selected-procedure-display');
  const progressFill = document.getElementById('progress-fill');

  // Keep the selected procedure UI as-is (2-line locked)
  // If you need to re-render, always call:
  // renderSelectedProcedure(el.dataset.label, el.dataset.badge)

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

  // 🔒 UI Guard: Keep selected-procedure-display in 2-line locked format
  (function initSelectedProcedureGuard() {
    const el = document.getElementById('selected-procedure-display');
    if (!el) return;

    let guarding = false;

    const mo = new MutationObserver(() => {
      if (guarding) return;
      if (el.dataset.locked === '1') {
        const label = el.dataset.label;
        const badge = el.dataset.badge;
        if (!label || !badge) return;

        // If the DOM no longer matches our template, restore it
        const hasBadge = el.textContent?.includes(badge);
        if (!hasBadge) {
          guarding = true;
          renderSelectedProcedure(label, badge);
          guarding = false;
        }
      }
    });

    mo.observe(el, { childList: true, subtree: true, characterData: true });
  })();

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