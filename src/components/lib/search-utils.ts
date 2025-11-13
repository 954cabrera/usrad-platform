/**
 * search-utils.ts
 * 
 * Utility functions for search functionality
 */

const ENCODING_MAP: Record<string, string> = {
  '\u00E2\u0080\u0093': '–',
  '\u00E2\u0080\u0094': '—',
  '\u00E2\u0080\u009C': '"',
  '\u00E2\u0080\u009D': '"',
  '\u00E2\u0080\u0098': ''',
  '\u00E2\u0080\u0099': ''',
  '\u00E2\u0080\u00A2': '•',
  '\u00C2\u00A0': ' ',
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

export function textContainsQuery(text: string, query: string): boolean {
  if (!text || !query) {
    return false;
  }

  const normalizedText = normalizeQuery(text);
  const normalizedQuery = normalizeQuery(query);

  return normalizedText.includes(normalizedQuery);
}

export function cleanProcedureLabel(label: string): string {
  if (!label) {
    return label;
  }

  let cleaned = fixCharacterEncoding(label);
  cleaned = cleaned.trim().replace(/\s+/g, ' ');
  
  return cleaned;
}