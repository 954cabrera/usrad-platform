const ENCODING_MAP: Record<string, string> = {
  '\xE2\x80\x93': '\u2013',
  '\xE2\x80\x94': '\u2014',
  '\xE2\x80\x9C': '\u201C',
  '\xE2\x80\x9D': '\u201D',
  '\xE2\x80\x98': '\u2018',
  '\xE2\x80\x99': '\u2019',
  '\xE2\x80\xA2': '\u2022',
  '\xC2\xA0': '\u00A0',
};

// Synonym mapping for common search variations
const SYNONYM_MAP: Record<string, string[]> = {
  'xray': ['x-ray', 'xray', 'x ray'],
  'x-ray': ['x-ray', 'xray', 'x ray'],
  'x ray': ['x-ray', 'xray', 'x ray'],
  'cat': ['ct', 'cat', 'cat scan'],
  'ct': ['ct', 'cat', 'cat scan'],
  'cat scan': ['ct', 'cat', 'cat scan'],
  'mri': ['mri', 'magnetic resonance'],
  'magnetic resonance': ['mri', 'magnetic resonance'],
};

export function fixCharacterEncoding(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let fixed = text;

  for (const [bad, good] of Object.entries(ENCODING_MAP)) {
    fixed = fixed.split(bad).join(good);
  }

  return fixed;
}

export function normalizeQuery(query: string): string {
  if (!query || typeof query !== 'string') {
    return '';
  }

  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Normalize text for search by removing punctuation and extra spaces
 * This allows "xray" to match "x-ray" and "ct" to match "c.t."
 */
function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')  // Replace punctuation with spaces
    .replace(/\s+/g, ' ')  // Normalize multiple spaces to single space
    .trim();
}

/**
 * Expand a word to include its synonyms
 * Example: "cat" → ["ct", "cat", "cat scan"]
 */
function expandSynonyms(word: string): string[] {
  const normalized = normalizeForSearch(word);
  return SYNONYM_MAP[normalized] || [word];
}

/**
 * Check if text contains query with flexible word order and synonym matching
 * 
 * Features:
 * - Flexible word order: "brain mri" = "mri brain" ✅
 * - Punctuation insensitive: "xray" = "x-ray" ✅
 * - Synonym matching: "cat" matches "CT" ✅
 * 
 * Examples:
 * - "xray" matches "X-Ray Chest" ✅
 * - "x-ray" matches "X-Ray Chest" ✅
 * - "cat" matches "CT Head" ✅
 * - "ct" matches "CT Head" ✅
 * - "brain mri" matches "MRI Brain" ✅
 */
export function textContainsQuery(text: string, query: string): boolean {
  if (!text || !query) {
    return false;
  }

  // Normalize text (remove punctuation, lowercase)
  const normalizedText = normalizeForSearch(text);
  const normalizedQuery = normalizeForSearch(query);

  // Split query into individual words
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
  
  if (queryWords.length === 0) {
    return false;
  }

  // For each query word, expand to include synonyms and check if ANY synonym matches
  return queryWords.every(word => {
    const synonyms = expandSynonyms(word);
    
    // Check if ANY synonym appears in the text
    return synonyms.some(synonym => {
      // Also normalize the synonym (remove punctuation)
      const normalizedSynonym = normalizeForSearch(synonym);
      return normalizedText.includes(normalizedSynonym);
    });
  });
}

export function cleanProcedureLabel(label: string): string {
  if (!label) {
    return label;
  }

  let cleaned = fixCharacterEncoding(label);
  cleaned = cleaned.trim().replace(/\s+/g, ' ');
  
  return cleaned;
}