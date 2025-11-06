/**
 * COMPREHENSIVE PROCEDURE SEARCH ENGINE
 * ======================================
 * Searches across all modalities (MRI, CT, X-Ray, Mammography, etc.)
 * NOW WITH: X-Ray view token detection and intelligent search
 * ENHANCED WITH: CT intent-based search (CTA, Screening)  // <-- ADD THIS
 * 
 * Usage:
 *   import { searchAllProcedures, searchByCPT } from './search-engine';
 *   const results = searchAllProcedures('chest xray 2 view');
 *   const results = searchAllProcedures('heart angiogram');  // <-- ADD THIS
 */

// ============================================
// IMPORTS - ADD THESE AT THE TOP
// ============================================

// Import CT search configuration
import {
  detectSearchIntent,
  searchCategories,
  CT_ALL_KEYWORDS,
  CT_VASCULAR_KEYWORDS,
  CT_SCREENING_KEYWORDS,
  INTENT_TRIGGERS,
  expandQueryWithSynonyms
} from './ct-search-config';

import type { SearchIntent, SearchMatch } from './ct-search-config';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface SearchResult {
  modality: string;
  category: string;
  icon: string;
  cpt: string;
  label: string;
  shortLabel: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
}

export interface SpecialProcedure {
  cpt: string;
  label: string;
  modality: string;
  icon: string;
  category: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
}

// ============================================
// X-RAY VIEW TOKEN CONFIGURATION
// ============================================

/**
 * View tokens for X-Ray search intelligence
 * Maps user input to view identifiers in the data
 */
const XRAY_VIEW_TOKENS = {
  // Numeric views
  '1v': '1',
  '1view': '1',
  '1-view': '1',
  '2v': '2',
  '2view': '2',
  '2-view': '2',
  '3v': '3',
  '3view': '3',
  '3-view': '3',
  '4v': '4',
  '4view': '4',
  '4-view': '4',
  '5v': '5',
  '5view': '5',
  '5-view': '5',
  '6v': '6',
  '6view': '6',
  '6-view': '6',
  
  // Special view types
  'lordotic': 'lordotic',
  'apical': 'lordotic',
  'oblique': 'oblique',
  'flexion': 'flexion',
  'flex': 'flexion',
  'extension': 'extension',
  'ext': 'extension',
  'standing': 'standing',
  'weightbearing': 'standing',
  'weight-bearing': 'standing',
  'complete': 'complete',
  'comprehensive': 'complete',
  
  // Medical terminology
  'pa': 'PA',
  'ap': 'AP',
  'lateral': 'lateral',
  'lat': 'lateral'
};

/**
 * Region synonyms for better X-Ray search
 */
const XRAY_REGION_SYNONYMS: Record<string, string[]> = {
  'chest': ['chest', 'cxr', 'thorax', 'lungs', 'ribs'],
  'cervicalSpine': ['cervical', 'c-spine', 'cspine', 'neck', 'cervical spine'],
  'thoracicSpine': ['thoracic', 't-spine', 'tspine', 'thoracic spine', 'mid back'],
  'lumbarSpine': ['lumbar', 'l-spine', 'lspine', 'lumbar spine', 'lower back', 'low back'],
  'knee': ['knee', 'knees'],
  'shoulder': ['shoulder', 'shoulders'],
  'ankle': ['ankle', 'ankles'],
  'foot': ['foot', 'feet'],
  'hand': ['hand', 'hands'],
  'wrist': ['wrist', 'wrists'],
  'hip': ['hip', 'hips'],
  'elbow': ['elbow', 'elbows'],
  'pelvis': ['pelvis', 'pelvic'],
  'abdomen': ['abdomen', 'kub', 'belly'],
  'clavicle': ['clavicle', 'collar bone', 'collarbone'],
  'femur': ['femur', 'thigh bone', 'thigh'],
  'tibia': ['tibia', 'shin', 'shin bone'],
  'ribs': ['ribs', 'rib']
};

// ============================================
// CT SEARCH KEYWORDS (NEW!)
// ============================================

/**
 * CT-specific keyword mappings
 * Imported from ct-search-config.ts for consistency
 */
const CT_KEYWORDS = CT_ALL_KEYWORDS;

/**
 * Quick lookup for CT vascular (CTA) keywords
 */
const CT_VASCULAR_TERMS = [
  'angiogram', 'angio', 'cta', 'vessels', 'arteries', 'aneurysm',
  'blood vessels', 'vascular', 'circulation', 'blockage', 'stenosis',
  'carotid', 'coronary', 'cardiac ct', 'run-off', 'runoff'
];

/**
 * Quick lookup for CT screening keywords
 */
const CT_SCREENING_TERMS = [
  'screening', 'preventive', 'wellness', 'early detection',
  'cancer screening', 'calcium score', 'lung screening', 'ldct',
  'virtual colonoscopy', 'colonography'
];

/**
 * Enhanced region synonyms including CT-specific terms
 */
const CT_REGION_SYNONYMS: Record<string, string[]> = {
  'head': ['head', 'brain', 'skull', 'cranial', 'cerebral'],
  'chest': ['chest', 'thorax', 'lungs', 'lung', 'pulmonary'],
  'heart': ['heart', 'cardiac', 'coronary', 'cardiovascular'],
  'abdomen': ['abdomen', 'belly', 'stomach', 'abdominal', 'liver', 'kidney'],
  'pelvis': ['pelvis', 'pelvic', 'hip'],
  'neck': ['neck', 'cervical', 'carotid', 'throat'],
  'spine': ['spine', 'back', 'vertebrae', 'spinal'],
  'vessels': ['vessels', 'arteries', 'veins', 'vascular', 'blood vessels']
};


// ============================================
// SPECIAL PROCEDURES (Non-MRI/CT)
// ============================================

const MAMMOGRAPHY_PROCEDURES: Record<string, SpecialProcedure> = {
  '77067': {
    cpt: '77067',
    label: 'Screening Mammogram',
    modality: 'Mammography',
    icon: '🎗️',
    category: 'Breast',
    description: 'Routine annual screening for early detection',
    duration: '15-30 min',
    prep: 'No deodorant or powder',
    useCase: 'Annual screening, preventive care'
  },
  '77066': {
    cpt: '77066',
    label: 'Diagnostic Mammogram',
    modality: 'Mammography',
    icon: '🎗️',
    category: 'Breast',
    description: 'Follow-up for symptoms or abnormal findings',
    duration: '20-30 min',
    prep: 'No deodorant or powder',
    useCase: 'Lump, pain, or callback from screening'
  },
  '77063': {
    cpt: '77063',
    label: '3D Mammogram (Tomosynthesis)',
    modality: 'Mammography',
    icon: '🎗️',
    category: 'Breast',
    description: 'Advanced 3D imaging technology',
    duration: '20-30 min',
    prep: 'No deodorant or powder',
    useCase: 'Dense breasts, detailed imaging'
  }
};

const NUCLEAR_MEDICINE_PROCEDURES: Record<string, SpecialProcedure> = {
  '78306': {
    cpt: '78306',
    label: 'Bone Scan (Whole Body)',
    modality: 'Nuclear Medicine',
    icon: '☢️',
    category: 'Nuclear Medicine',
    description: 'Detect bone abnormalities, fractures, or cancer',
    duration: '30-60 min',
    prep: 'Fasting may be required',
    useCase: 'Bone metastases, stress fractures'
  },
  '78452': {
    cpt: '78452',
    label: 'Cardiac Stress Test',
    modality: 'Nuclear Medicine',
    icon: '☢️',
    category: 'Nuclear Medicine',
    description: 'Evaluate heart blood flow and function',
    duration: '30-60 min',
    prep: 'Fasting may be required',
    useCase: 'Coronary artery disease evaluation'
  },
  '78012': {
    cpt: '78012',
    label: 'Thyroid Scan',
    modality: 'Nuclear Medicine',
    icon: '☢️',
    category: 'Nuclear Medicine',
    description: 'Evaluate thyroid function and nodules',
    duration: '30-60 min',
    prep: 'Fasting may be required',
    useCase: 'Thyroid nodules, hyperthyroidism'
  },
  '78072': {
    cpt: '78072',
    label: 'Parathyroid Scan',
    modality: 'Nuclear Medicine',
    icon: '☢️',
    category: 'Nuclear Medicine',
    description: 'Locate overactive parathyroid glands',
    duration: '30-60 min',
    prep: 'Fasting may be required',
    useCase: 'Hyperparathyroidism workup'
  }
};

const PET_PROCEDURES: Record<string, SpecialProcedure> = {
  '78815': {
    cpt: '78815',
    label: 'PET Scan (Whole Body)',
    modality: 'PET',
    icon: '⚛️',
    category: 'PET Scan',
    description: 'Full body cancer screening',
    duration: '45-90 min',
    prep: 'Fasting required',
    useCase: 'Cancer detection and staging'
  },
  '78608': {
    cpt: '78608',
    label: 'PET Brain Scan',
    modality: 'PET',
    icon: '⚛️',
    category: 'PET Scan',
    description: 'Brain-specific PET imaging',
    duration: '45-90 min',
    prep: 'Fasting required',
    useCase: 'Brain tumor evaluation'
  },
  '78459': {
    cpt: '78459',
    label: 'PET Cardiac Scan',
    modality: 'PET',
    icon: '⚛️',
    category: 'PET Scan',
    description: 'Heart-specific PET imaging',
    duration: '45-90 min',
    prep: 'Fasting required',
    useCase: 'Cardiac viability assessment'
  }
};

// ============================================
// SEARCH INTELLIGENCE FUNCTIONS
// ============================================

/**
 * Parse search query to extract modality, region, and view tokens
 * Example: "chest xray 2 view" → { modality: 'X-Ray', region: 'chest', viewToken: '2' }
 */
function parseSearchQuery(searchTerm: string): {
  modality: string | null;
  region: string | null;
  viewToken: string | null;
  originalQuery: string;
} {
  const term = searchTerm.toLowerCase().trim();
  const tokens = term.split(/\s+/);
  
  let modality: string | null = null;
  let region: string | null = null;
  let viewToken: string | null = null;
  
  // Detect modality
  const modalityTokens = ['xray', 'x-ray', 'mri', 'ct', 'mammo', 'mammogram'];
  const modalityMatch = tokens.find(t => modalityTokens.includes(t));
  if (modalityMatch === 'xray' || modalityMatch === 'x-ray') {
    modality = 'X-Ray';
  }
  
  // Detect region using synonyms (check both exact match and contains)
  // BUT: Skip if the entire query is just modality keywords
  const isOnlyModalityQuery = tokens.every(t => modalityTokens.includes(t) || t === 'x' || t === 'ray');
  
  if (!isOnlyModalityQuery) {
    for (const [regionKey, synonyms] of Object.entries(XRAY_REGION_SYNONYMS)) {
      for (const token of tokens) {
        // Skip modality tokens
        if (modalityTokens.includes(token) || token === 'x' || token === 'ray') {
          continue;
        }
        
        // Check if any synonym matches the token exactly, or if the token contains the synonym
        const matches = synonyms.some(syn => {
          const synLower = syn.toLowerCase();
          const tokenLower = token.toLowerCase();
          return tokenLower === synLower || tokenLower.includes(synLower) || synLower.includes(tokenLower);
        });
        
        if (matches) {
          region = regionKey;
          break;
        }
      }
      if (region) break;
    }
  }
  
  // If we detected a region but no modality, infer X-Ray modality
  if (region && !modality) {
    modality = 'X-Ray';
    console.log('🧠 Inferred X-Ray modality from region detection');
  }
  
  // Detect view token - check ALL tokens, not just when modality is X-Ray
  // This allows "c-spine 4v" to work even before we know it's X-Ray
  for (const token of tokens) {
    // Check direct match in XRAY_VIEW_TOKENS
    if (XRAY_VIEW_TOKENS[token]) {
      viewToken = XRAY_VIEW_TOKENS[token];
      if (!modality) modality = 'X-Ray'; // Infer X-Ray from view token
      break;
    }
    
    // Handle "2 view", "3 view" format (separate tokens)
    if (/^\d+$/.test(token) && tokens.includes('view')) {
      viewToken = token;
      if (!modality) modality = 'X-Ray'; // Infer X-Ray from numeric view
      break;
    }
  }
  
  return { modality, region, viewToken, originalQuery: term };
}

/**
 * Detect CT-specific search intent
 * Determines if user is looking for Standard CT, CTA, or Screening
 * 
 * @param searchTerm - User's search query
 * @returns Intent type and confidence
 * 
 * @example
 * detectCTIntent('angiogram') → { intent: 'vascular', confidence: 1.0 }
 * detectCTIntent('lung screening') → { intent: 'screening', confidence: 1.0 }
 * detectCTIntent('brain ct') → { intent: 'standard', confidence: 0.8 }
 */
function detectCTIntent(searchTerm: string): {
  intent: SearchIntent;
  confidence: number;
} {
  const term = searchTerm.toLowerCase().trim();
  
  // Check for vascular/CTA intent
  for (const vascularTerm of CT_VASCULAR_TERMS) {
    if (term.includes(vascularTerm)) {
      return { intent: 'vascular', confidence: 1.0 };
    }
  }
  
  // Check for screening intent
  for (const screeningTerm of CT_SCREENING_TERMS) {
    if (term.includes(screeningTerm)) {
      return { intent: 'screening', confidence: 1.0 };
    }
  }
  
  // Default to standard CT with lower confidence
  return { intent: 'standard', confidence: 0.8 };
}

/**
 * Expand search term with CT synonyms
 * 
 * @param searchTerm - Original search term
 * @returns Array of expanded terms
 * 
 * @example
 * expandCTSearchTerm('heart') → ['heart', 'cardiac', 'coronary']
 */
function expandCTSearchTerm(searchTerm: string): string[] {
  const terms = [searchTerm];
  const term = searchTerm.toLowerCase().trim();
  
  // Check each synonym group
  for (const [key, synonyms] of Object.entries(CT_REGION_SYNONYMS)) {
    if (term.includes(key)) {
      terms.push(...synonyms);
    }
  }
  
  return [...new Set(terms)]; // Remove duplicates
}

/**
 * Filter X-Ray results by view token
 * Example: Filter "Chest" results to only show "2 Views"
 */
function filterXRayByView(results: SearchResult[], viewToken: string): SearchResult[] {
  return results.filter(result => {
    const labelLower = result.label.toLowerCase();
    
    // Match numeric views (1, 2, 3, etc.)
    if (/^\d+$/.test(viewToken)) {
      const patterns = [
        `${viewToken} view`,
        `${viewToken}-view`,
        `${viewToken}v`
      ];
      return patterns.some(pattern => labelLower.includes(pattern));
    }
    
    // Match special views (lordotic, oblique, etc.)
    return labelLower.includes(viewToken.toLowerCase());
  });
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

/**
 * Search for procedures by CPT code
 * 
 * @param cptCode - 5-digit CPT code
 * @returns Array of matching procedures
 * 
 * @example
 * searchByCPT('70551') // Returns MRI Brain - Without Contrast
 * searchByCPT('71046') // Returns X-Ray Chest - 2 Views
 */
export function searchByCPT(cptCode: string): SearchResult[] {
  console.log('🔢 Searching for CPT code:', cptCode);
  const results: SearchResult[] = [];
  
  // Validate CPT format
  if (!/^\d{5}$/.test(cptCode)) {
    return results;
  }
  
  // Check special procedures first
  if (MAMMOGRAPHY_PROCEDURES[cptCode]) {
    const proc = MAMMOGRAPHY_PROCEDURES[cptCode];
    results.push(convertToSearchResult(proc));
  }
  
  if (NUCLEAR_MEDICINE_PROCEDURES[cptCode]) {
    const proc = NUCLEAR_MEDICINE_PROCEDURES[cptCode];
    results.push(convertToSearchResult(proc));
  }
  
  if (PET_PROCEDURES[cptCode]) {
    const proc = PET_PROCEDURES[cptCode];
    results.push(convertToSearchResult(proc));
  }
  
  // Search MRI library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.MRI) {
    searchInLibrary(window.ProcedureLibrary.MRI, 'MRI', cptCode, results, true);
  }
  
  // Search CT library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.CT) {
    searchInLibrary(window.ProcedureLibrary.CT, 'CT', cptCode, results, true);
  }
  
  // Search X-Ray library (NEW!)
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.['X-Ray']) {
    searchInXRayLibrary(window.ProcedureLibrary['X-Ray'], cptCode, results, true);
  }
  
  console.log(`🔍 CPT search results: ${results.length} found`);
  return results;
}

/**
 * Search all procedures by keyword (body part, modality, etc)
 * NOW WITH: Intelligent X-Ray view token detection
 * 
 * @param searchTerm - User's search query
 * @returns Array of matching procedure objects
 * 
 * @example
 * searchAllProcedures('knee') // Returns MRI/CT/X-Ray knee procedures
 * searchAllProcedures('chest xray 2 view') // Returns ONLY Chest X-Ray 2 Views
 * searchAllProcedures('c-spine 4v') // Returns Cervical Spine 4-5 Views
 */
export function searchAllProcedures(searchTerm: string): SearchResult[] {
  const results: SearchResult[] = [];
  const term = searchTerm.toLowerCase().trim();
  
  // 🔢 Check if it's a CPT code search (5-digit number)
  if (/^\d{5}$/.test(term)) {
    console.log('🔢 CPT code detected:', term);
    return searchByCPT(term);
  }

  console.log('🔍 Searching all procedures for:', term);
  
  // 🧠 Parse query for intelligent routing
  const parsed = parseSearchQuery(term);
  console.log('🧠 Parsed query:', parsed);
  
  // 🆕 Detect CT-specific intent
  const ctIntent = detectCTIntent(term);
  console.log('💓 CT Intent detected:', ctIntent);
  
  // 🆕 Expand search with synonyms for CT
  const expandedTerms = expandCTSearchTerm(term);
  console.log('📚 Expanded search terms:', expandedTerms);
  
  // Search MRI library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.MRI) {
    searchInLibrary(window.ProcedureLibrary.MRI, 'MRI', term, results);
  }
  
  // Search CT library with enhanced matching
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.CT) {
    const ctResultsBefore = results.length;
    
    // Search with original term
    searchInLibrary(window.ProcedureLibrary.CT, 'CT', term, results);
    
    // 🆕 If few results, try expanded terms
    if (results.length - ctResultsBefore < 3 && expandedTerms.length > 1) {
      for (const expandedTerm of expandedTerms) {
        if (expandedTerm !== term) {
          searchInLibrary(window.ProcedureLibrary.CT, 'CT', expandedTerm, results);
        }
      }
    }
    
    console.log(`🔍 CT search: ${results.length - ctResultsBefore} results found`);
  }
  
  // Search X-Ray library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.['X-Ray']) {
    searchInXRayLibrary(window.ProcedureLibrary['X-Ray'], term, results, false);
  }
  
  // 🎯 Apply intelligent filtering for X-Ray + view token queries
  if (parsed.modality === 'X-Ray' && parsed.viewToken) {
    console.log(`🎯 Applying view filter: ${parsed.viewToken}`);
    const filteredResults = filterXRayByView(results, parsed.viewToken);
    
    if (filteredResults.length > 0) {
      console.log(`✨ Smart filter: ${results.length} → ${filteredResults.length} results`);
      results.length = 0;
      results.push(...filteredResults);
    }
  }
  
  // Special case: Add Mammography if searching for "breast"
  if (term.includes('breast') || term === 'mammo' || term === 'mammogram') {
    Object.values(MAMMOGRAPHY_PROCEDURES).forEach(proc => {
      results.push(convertToSearchResult(proc));
    });
  }
  
  // Special case: Nuclear Medicine
  if (term.includes('nuclear') || term.includes('bone scan') || term.includes('thyroid')) {
    Object.values(NUCLEAR_MEDICINE_PROCEDURES).forEach(proc => {
      if (proc.label.toLowerCase().includes(term) || proc.description.toLowerCase().includes(term)) {
        results.push(convertToSearchResult(proc));
      }
    });
  }
  
  // Special case: PET scan
  if (term.includes('pet')) {
    Object.values(PET_PROCEDURES).forEach(proc => {
      results.push(convertToSearchResult(proc));
    });
  }
  
  // 🆕 Sort CT results by intent match
  if (ctIntent.intent !== 'standard' && results.some(r => r.modality === 'CT')) {
    console.log(`🎯 Prioritizing ${ctIntent.intent} CT procedures`);
    
    results.sort((a, b) => {
      // Keep non-CT results in original order
      if (a.modality !== 'CT' && b.modality !== 'CT') return 0;
      
      // Prioritize CT results that match intent
      const aIsVascular = a.label.toLowerCase().includes('cta') || 
                         a.description.toLowerCase().includes('angiogram');
      const bIsVascular = b.label.toLowerCase().includes('cta') || 
                         b.description.toLowerCase().includes('angiogram');
      
      const aIsScreening = a.label.toLowerCase().includes('screening') ||
                          a.description.toLowerCase().includes('screening');
      const bIsScreening = b.label.toLowerCase().includes('screening') ||
                          b.description.toLowerCase().includes('screening');
      
      // Vascular intent: prioritize CTA
      if (ctIntent.intent === 'vascular') {
        if (aIsVascular && !bIsVascular) return -1;
        if (!aIsVascular && bIsVascular) return 1;
      }
      
      // Screening intent: prioritize screening
      if (ctIntent.intent === 'screening') {
        if (aIsScreening && !bIsScreening) return -1;
        if (!aIsScreening && bIsScreening) return 1;
      }
      
      return 0;
    });
  }
  
  console.log(`✅ Found ${results.length} procedures matching "${term}"`);
  return results;
}

/**
 * Search within X-Ray library with view options
 * Handles flat structure where each region has viewOptions array
 */
function searchInXRayLibrary(
  library: any,
  term: string,
  results: SearchResult[],
  isCPTSearch: boolean = false
): void {
  Object.keys(library).forEach(regionKey => {
    const region = library[regionKey];
    
    // Skip if no view options
    if (!region.viewOptions || region.viewOptions.length === 0) {
      return;
    }
    
    // Check if search term matches category or region key
    const categoryLower = region.category.toLowerCase();
    const matchesCategory = categoryLower.includes(term);
    const matchesKey = regionKey.toLowerCase().includes(term);
    
    // Also check synonyms for better matching (bidirectional)
    let matchesSynonym = false;
    const synonyms = XRAY_REGION_SYNONYMS[regionKey] || [];
    for (const syn of synonyms) {
      const synLower = syn.toLowerCase();
      if (term.includes(synLower) || synLower.includes(term) || term === synLower) {
        matchesSynonym = true;
        break;
      }
    }
    
    // For generic "xray" search, match ALL regions
    const isGenericXraySearch = (term === 'xray' || term === 'x-ray' || term === 'x ray');
    
    if (matchesCategory || matchesKey || matchesSynonym || isCPTSearch || isGenericXraySearch) {
      // Add ALL view options from this region
      region.viewOptions.forEach((viewOpt: any) => {
        if (isCPTSearch && viewOpt.cpt !== term) {
          return; // Skip if CPT doesn't match
        }
        
        results.push({
          modality: 'X-Ray',
          category: region.category,
          icon: region.icon,
          cpt: viewOpt.cpt,
          label: viewOpt.label,
          shortLabel: viewOpt.shortLabel,
          description: viewOpt.description,
          duration: viewOpt.duration,
          prep: viewOpt.prep,
          useCase: viewOpt.useCase
        });
      });
    }
  });
}

/**
 * Search within a specific library (MRI or CT)
 * 
 * @param library - Procedure library object
 * @param modality - Modality name ('MRI' or 'CT')
 * @param term - Search term
 * @param results - Results array to populate
 * @param isCPTSearch - True if searching by CPT code
 */
function searchInLibrary(
  library: any, 
  modality: string, 
  term: string, 
  results: SearchResult[],
  isCPTSearch: boolean = false
): void {
  Object.keys(library).forEach(regionKey => {
    const region = library[regionKey];
    
    // 🔥 Handle redirects (for shoulder, elbow, hip, etc.)
    if (region.redirectTo) {
      const targetRegion = library[region.redirectTo];
      if (targetRegion && targetRegion.procedures) {
        const categoryLower = region.category.toLowerCase();
        const matchesCategory = categoryLower.includes(term);
        const matchesKey = regionKey.toLowerCase().includes(term);
        
        if (matchesCategory || matchesKey || isCPTSearch) {
          targetRegion.procedures.forEach((proc: any) => {
            if (isCPTSearch && proc.cpt === term) {
              results.push({
                modality,
                category: region.category, // Use original name (e.g., "Shoulder")
                icon: region.icon || targetRegion.icon,
                cpt: proc.cpt,
                label: proc.label,
                shortLabel: proc.shortLabel,
                description: proc.description,
                duration: proc.duration,
                prep: proc.prep,
                useCase: proc.useCase
              });
            } else if (!isCPTSearch) {
              results.push({
                modality,
                category: region.category,
                icon: region.icon || targetRegion.icon,
                cpt: proc.cpt,
                label: proc.label,
                shortLabel: proc.shortLabel,
                description: proc.description,
                duration: proc.duration,
                prep: proc.prep,
                useCase: proc.useCase
              });
            }
          });
        }
      }
      return; // Skip further processing for redirects
    }
    
    // Skip if no procedures
    if (!region.procedures || region.procedures.length === 0) {
      return;
    }
    
    // Check if search term matches category
    const categoryLower = region.category.toLowerCase();
    const matchesCategory = categoryLower.includes(term);
    
    // Also check if search term is in the regionKey itself
    const matchesKey = regionKey.toLowerCase().includes(term);
    
    // 🆕 CT ENHANCEMENT: Check additional metadata fields
    let matchesMetadata = false;
    if (modality === 'CT' && region) {
      // Check tags
      if (region.tags && Array.isArray(region.tags)) {
        matchesMetadata = region.tags.some((tag: string) => 
          tag.toLowerCase().includes(term) || term.includes(tag.toLowerCase())
        );
      }
      
      // Check clinical indication
      if (!matchesMetadata && region.clinicalIndication) {
        matchesMetadata = region.clinicalIndication.toLowerCase().includes(term);
      }
      
      // Check if it's a vascular/screening procedure
      if (!matchesMetadata) {
        if (region.isVascular && CT_VASCULAR_TERMS.some(t => term.includes(t))) {
          matchesMetadata = true;
        }
        if (region.isScreening && CT_SCREENING_TERMS.some(t => term.includes(t))) {
          matchesMetadata = true;
        }
      }
      
      // Check displayIn array
      if (!matchesMetadata && region.displayIn && Array.isArray(region.displayIn)) {
        matchesMetadata = region.displayIn.some((display: string) =>
          display.toLowerCase().includes(term) || term.includes(display.toLowerCase())
        );
      }
    }
    
    // Use ALL matching criteria (FIXED: was duplicate if statement)
    if (matchesCategory || matchesKey || matchesMetadata || isCPTSearch) {
      // Add ALL procedures from this region
      region.procedures.forEach((proc: any) => {
        if (isCPTSearch && proc.cpt !== term) {
          return; // Skip if CPT doesn't match
        }
        
        results.push({
          modality,
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

/**
 * Convert special procedure to search result format
 */
function convertToSearchResult(proc: SpecialProcedure): SearchResult {
  return {
    modality: proc.modality,
    category: proc.category,
    icon: proc.icon,
    cpt: proc.cpt,
    label: proc.label,
    shortLabel: proc.label,
    description: proc.description,
    duration: proc.duration,
    prep: proc.prep,
    useCase: proc.useCase
  };
}

/**
 * Group search results by modality
 * 
 * @param results - Array of search results
 * @returns Object with results grouped by modality
 * 
 * @example
 * const grouped = groupByModality(results);
 * // { MRI: [...], CT: [...], 'X-Ray': [...], Mammography: [...] }
 */
export function groupByModality(results: SearchResult[]): Record<string, SearchResult[]> {
  const grouped: Record<string, SearchResult[]> = {};
  
  results.forEach(result => {
    if (!grouped[result.modality]) {
      grouped[result.modality] = [];
    }
    grouped[result.modality].push(result);
  });
  
  return grouped;
}

/**
 * Filter results by contrast availability
 * 
 * @param results - Search results to filter
 * @param contrast - Desired contrast type
 * @returns Filtered results that support the contrast type
 */
export function filterByContrast(results: SearchResult[], contrast: string): SearchResult[] {
  return results.filter(proc => {
    // Check if this procedure's label matches the contrast
    const labelLower = proc.label.toLowerCase();
    const contrastLower = contrast.toLowerCase();
    
    if (contrastLower === 'without') {
      return labelLower.includes('without contrast');
    } else if (contrastLower === 'with') {
      return labelLower.includes('with contrast') && !labelLower.includes('without');
    } else if (contrastLower === 'both') {
      return labelLower.includes('with & without') || labelLower.includes('with and without');
    }
    
    return false;
  });
}

console.log('✅ Search Engine loaded (with X-Ray intelligence)');

// ============================================
// EXPOSE TO WINDOW FOR TESTING
// ============================================

if (typeof window !== 'undefined') {
  window.searchAllProcedures = searchAllProcedures;
  window.searchByCPT = searchByCPT;
  console.log('🧪 Search functions exposed: window.searchAllProcedures(), window.searchByCPT()');
}