/**
 * CT SEARCH ENGINE CONFIGURATION
 * ================================
 * Intent-based keyword mapping for CT procedures
 * Maps patient language to medical procedures
 * 
 * Supports:
 * - Standard CT searches (by body part)
 * - CTA/Angiogram searches (by vascular region)
 * - Screening searches (by purpose)
 */

// ============================================
// SEARCH KEYWORD MAPPINGS
// ============================================

/**
 * Standard CT keyword mappings
 * Maps common patient terms to CT procedure categories
 */
export const CT_STANDARD_KEYWORDS: Record<string, string[]> = {
  head: [
    'head', 'brain', 'skull', 'cranial', 'headache',
    'stroke', 'bleeding', 'trauma', 'concussion'
  ],
  sinuses: [
    'sinus', 'sinuses', 'sinusitis', 'nose', 'nasal',
    'polyps', 'facial pain', 'congestion'
  ],
  neckSoftTissue: [
    'neck', 'throat', 'thyroid', 'neck mass', 'neck pain',
    'lymph nodes', 'swollen glands'
  ],
  chest: [
    'chest', 'lungs', 'thorax', 'breathing', 'cough',
    'pneumonia', 'nodule', 'lung', 'ribs'
  ],
  abdomen: [
    'abdomen', 'stomach', 'belly', 'liver', 'kidney',
    'abdominal pain', 'stones', 'appendix'
  ],
  pelvis: [
    'pelvis', 'pelvic', 'bladder', 'hip', 'groin',
    'pelvic pain', 'reproductive'
  ],
  abdomenPelvis: [
    'abdomen pelvis', 'abd pelvis', 'abdominopelvic',
    'stomach and pelvis', 'full abdomen'
  ],
  cervicalSpine: [
    'cervical spine', 'c-spine', 'cspine', 'neck spine',
    'neck bones', 'whiplash'
  ],
  thoracicSpine: [
    'thoracic spine', 't-spine', 'tspine', 'mid back',
    'upper back', 'back pain'
  ],
  lumbarSpine: [
    'lumbar spine', 'l-spine', 'lspine', 'lower back',
    'low back', 'back pain', 'sciatica'
  ]
};

/**
 * CTA/Vascular keyword mappings
 * Maps angiogram and vascular terms to CTA procedures
 */
export const CT_VASCULAR_KEYWORDS: Record<string, string[]> = {
  ctaHeadNeck: [
    'brain angiogram', 'head angiogram', 'brain vessels', 'aneurysm',
    'carotid', 'neck vessels', 'stroke vessels', 'cerebral angiogram',
    'neck angiogram', 'carotid artery', 'carotid stenosis'
  ],
  ctaChest: [
    'chest angiogram', 'pulmonary embolism', 'PE', 'blood clot lung',
    'aorta', 'aortic dissection', 'chest vessels', 'lung vessels'
  ],
  ctaCoronary: [
    'coronary', 'heart angiogram', 'cardiac angiogram', 'heart vessels',
    'coronary arteries', 'heart blockage', 'CAD', 'coronary artery disease',
    'chest pain vessels', 'cardiac CT'
  ],
  ctaAbdomen: [
    'abdominal angiogram', 'aortic aneurysm', 'AAA', 'abdominal aorta',
    'mesenteric', 'kidney vessels', 'renal artery', 'abdominal vessels'
  ],
  ctaExtremities: [
    'leg angiogram', 'arm angiogram', 'peripheral artery disease', 'PAD',
    'claudication', 'leg vessels', 'arm vessels', 'run-off', 'runoff',
    'extremity vessels', 'limb vessels'
  ]
};

/**
 * Screening keyword mappings
 * Maps preventive/wellness terms to screening procedures
 */
export const CT_SCREENING_KEYWORDS: Record<string, string[]> = {
  screeningLung: [
    'lung screening', 'lung cancer screening', 'LDCT', 'low dose CT',
    'preventive lung', 'smoking screening', 'early detection lung'
  ],
  screeningCardiac: [
    'calcium score', 'cardiac calcium', 'coronary calcium', 'calcium scoring',
    'heart calcium', 'heart screening', 'cardiac screening', 'heart risk'
  ],
  screeningColon: [
    'virtual colonoscopy', 'colonography', 'colon screening', 'colon cancer screening',
    'polyp screening', 'colonoscopy alternative', 'non-invasive colonoscopy'
  ],
  screeningCoronaryCalcium: [
    'heart screening', 'cardiac structure', 'heart evaluation',
    'coronary evaluation', 'heart health'
  ]
};

/**
 * Combined keyword map for all CT procedures
 */
export const CT_ALL_KEYWORDS: Record<string, string[]> = {
  ...CT_STANDARD_KEYWORDS,
  ...CT_VASCULAR_KEYWORDS,
  ...CT_SCREENING_KEYWORDS
};

// ============================================
// INTENT DETECTION
// ============================================

export type SearchIntent = 'standard' | 'vascular' | 'screening' | 'unknown';

/**
 * Intent-triggering terms
 * These words indicate specific search intents
 */
export const INTENT_TRIGGERS = {
  vascular: [
    'angiogram', 'angio', 'cta', 'vessels', 'arteries', 'aneurysm',
    'blood vessels', 'vascular', 'circulation', 'blockage', 'stenosis'
  ],
  screening: [
    'screening', 'preventive', 'wellness', 'early detection',
    'cancer screening', 'health check', 'calcium score'
  ]
};

/**
 * Detect search intent from query
 * @param query - User search query
 * @returns Detected intent type
 */
export function detectSearchIntent(query: string): SearchIntent {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for vascular intent
  if (INTENT_TRIGGERS.vascular.some(term => normalizedQuery.includes(term))) {
    return 'vascular';
  }
  
  // Check for screening intent
  if (INTENT_TRIGGERS.screening.some(term => normalizedQuery.includes(term))) {
    return 'screening';
  }
  
  // Default to standard CT
  return 'standard';
}

/**
 * Get relevant categories based on search intent
 * @param intent - Detected search intent
 * @returns Array of category keys to prioritize
 */
export function getCategoriesForIntent(intent: SearchIntent): string[] {
  switch (intent) {
    case 'vascular':
      return Object.keys(CT_VASCULAR_KEYWORDS);
    case 'screening':
      return Object.keys(CT_SCREENING_KEYWORDS);
    case 'standard':
      return Object.keys(CT_STANDARD_KEYWORDS);
    default:
      return Object.keys(CT_ALL_KEYWORDS);
  }
}

// ============================================
// SEARCH SCORING
// ============================================

export interface SearchMatch {
  categoryKey: string;
  score: number;
  matchedKeywords: string[];
  intent: SearchIntent;
}

/**
 * Score a category against a search query
 * @param categoryKey - Category to score
 * @param query - User search query
 * @returns Match score (higher is better)
 */
export function scoreCategoryMatch(categoryKey: string, query: string): SearchMatch {
  const normalizedQuery = query.toLowerCase().trim();
  const keywords = CT_ALL_KEYWORDS[categoryKey] || [];
  
  let score = 0;
  const matchedKeywords: string[] = [];
  
  // Exact category name match (highest priority)
  if (normalizedQuery === categoryKey.toLowerCase()) {
    score += 100;
    matchedKeywords.push(categoryKey);
  }
  
  // Check each keyword
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();
    
    // Exact keyword match
    if (normalizedQuery === normalizedKeyword) {
      score += 50;
      matchedKeywords.push(keyword);
    }
    // Query contains keyword
    else if (normalizedQuery.includes(normalizedKeyword)) {
      score += 30;
      matchedKeywords.push(keyword);
    }
    // Keyword contains query (partial match)
    else if (normalizedKeyword.includes(normalizedQuery)) {
      score += 10;
      matchedKeywords.push(keyword);
    }
  }
  
  // Detect intent for context
  const intent = detectSearchIntent(query);
  
  // Boost score if intent matches category group
  if (intent === 'vascular' && CT_VASCULAR_KEYWORDS[categoryKey]) {
    score *= 1.5;
  } else if (intent === 'screening' && CT_SCREENING_KEYWORDS[categoryKey]) {
    score *= 1.5;
  }
  
  return {
    categoryKey,
    score,
    matchedKeywords,
    intent
  };
}

/**
 * Search for matching categories
 * @param query - User search query
 * @param limit - Maximum number of results
 * @returns Sorted array of matches (best first)
 */
export function searchCategories(query: string, limit = 10): SearchMatch[] {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  // Score all categories
  const matches = Object.keys(CT_ALL_KEYWORDS)
    .map(categoryKey => scoreCategoryMatch(categoryKey, query))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return matches;
}

// ============================================
// SYNONYM EXPANSION
// ============================================

/**
 * Common medical term synonyms for query expansion
 */
export const CT_SYNONYMS: Record<string, string[]> = {
  'ct': ['cat scan', 'computed tomography', 'ct scan'],
  'angiogram': ['angio', 'angiography', 'cta', 'vascular imaging'],
  'heart': ['cardiac', 'coronary', 'cardiovascular'],
  'lung': ['pulmonary', 'respiratory', 'chest'],
  'brain': ['head', 'cranial', 'cerebral'],
  'vessel': ['artery', 'vein', 'vascular', 'circulation'],
  'screening': ['preventive', 'wellness', 'early detection']
};

/**
 * Expand query with synonyms
 * @param query - Original search query
 * @returns Expanded query with synonyms
 */
export function expandQueryWithSynonyms(query: string): string[] {
  const queries = [query];
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check each synonym group
  for (const [term, synonyms] of Object.entries(CT_SYNONYMS)) {
    if (normalizedQuery.includes(term)) {
      // Add queries with each synonym
      synonyms.forEach(synonym => {
        queries.push(normalizedQuery.replace(term, synonym));
      });
    }
  }
  
  return queries;
}

console.log('✅ CT Search Configuration loaded');