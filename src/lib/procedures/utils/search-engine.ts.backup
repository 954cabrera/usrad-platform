/**
 * COMPREHENSIVE PROCEDURE SEARCH ENGINE
 * ======================================
 * Searches across all modalities (MRI, CT, Mammography, etc.)
 * Extracted from hero-form-controller-modal.js lines 650-850
 * 
 * Usage:
 *   import { searchAllProcedures, searchByCPT } from './search-engine';
 *   const results = searchAllProcedures('knee');
 */

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
  
  console.log(`🔍 CPT search results: ${results.length} found`);
  return results;
}

/**
 * Search all procedures by keyword (body part, modality, etc)
 * 
 * @param searchTerm - User's search query
 * @returns Array of matching procedure objects
 * 
 * @example
 * searchAllProcedures('knee') // Returns MRI/CT knee procedures
 * searchAllProcedures('breast') // Returns MRI + Mammography breast procedures
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
  
  // Search MRI library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.MRI) {
    searchInLibrary(window.ProcedureLibrary.MRI, 'MRI', term, results);
  }
  
  // Search CT library
  if (typeof window !== 'undefined' && window.ProcedureLibrary?.CT) {
    searchInLibrary(window.ProcedureLibrary.CT, 'CT', term, results);
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
  
  console.log(`✅ Found ${results.length} procedures matching "${term}"`);
  return results;
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
    
    if (matchesCategory || matchesKey || isCPTSearch) {
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
 * // { MRI: [...], CT: [...], Mammography: [...] }
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

console.log('✅ Search Engine loaded');