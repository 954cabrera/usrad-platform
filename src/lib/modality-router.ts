// =============================================================================
// src/lib/modality-router.ts
// Enhanced Modality Router for USRad
// =============================================================================

// 🔍 Detects modality from free-text queries like "nuclear", "cat scan", etc.
export function detectModality(query: string = ''): string | null {
  const q = query.toLowerCase().trim();

  // MRI
  if (/(mri|magnetic|brain|spine|joint)/.test(q)) return 'MRI';

  // CT / CAT Scan
  if (/(ct|cat\s?scan|computed tomography)/.test(q)) return 'CT';

  // X-Ray
  if (/(x[\s-]?ray|xr)/.test(q)) return 'XR';

  // Ultrasound
  if (/(ultrasound|us|sono|sonogram|echo)/.test(q)) return 'US';

  // Mammogram
  if (/(mammo|mammogram)/.test(q)) return 'MAMMO';

  // PET & Nuclear Medicine
  if (/(pet|nuc(?!lear)|nuclear|spect|radioisotope|nuc med)/.test(q)) return 'NM';

  // Dexa / Bone Density
  if (/(dexa|bone density|bmd)/.test(q)) return 'DEXA';

  // Fluoroscopy
  if (/(fluoro|fluoroscopy)/.test(q)) return 'FLUORO';

  // Arthrogram
  if (/(arthrogram|arthrography)/.test(q)) return 'ARTHRO';

  // Angiography
  if (/(angio|angiogram|angiography)/.test(q)) return 'ANGIO';

  return null;
}

// Maps internal modality key (MRI, CT, etc.) to exact DB modality string
export function keyToDbValue(key: string | null): string | null {
  if (!key) return null;
  switch (key.toUpperCase()) {
    case 'MRI': return 'MRI';
    case 'CT': return 'CT';
    case 'XR': return 'X-Ray';
    case 'US': return 'Ultrasound';
    case 'MAMMO': return 'Mammogram';
    case 'NM': return 'Nuclear Medicine';
    case 'PET': return 'Nuclear Medicine';
    case 'DEXA': return 'Dexa';
    case 'FLUORO': return 'Fluoroscopy';
    case 'ARTHRO': return 'Arthrogram';
    case 'ANGIO': return 'Angiography';
    default: return null;
  }
}

// UI label mapping for category cards, grids, etc.
export const MODALITY_LABEL_BY_KEY: Record<string, string> = {
  MRI: 'MRI',
  CT: 'CT',
  XR: 'X-Ray',
  US: 'Ultrasound',
  MAMMO: 'Mammogram',
  NM: 'Nuclear Medicine / PET',
  DEXA: 'DEXA (Bone Density)',
  FLUORO: 'Fluoroscopy',
  ARTHRO: 'Arthrogram',
  ANGIO: 'Angiography',
  ALL: 'All Procedures',
};

// Optional debugging helper
export function debugModalityDetection(input: string): void {
  const detected = detectModality(input);
  const mapped = keyToDbValue(detected);
  console.log(`🔍 Detected: ${detected || 'none'} → DB: ${mapped || 'none'}`);
}
