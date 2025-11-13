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
