// src/lib/procedureResolver.js
// ==========================================================
// PHASE 2: Universal Resolver for MRI / CT / X-Ray / Ultrasound / PET / NM
// ==========================================================

import { logUnknownRegion } from "./resolverAudit.js";


// Map modalities to their view/table names
const TABLE_MAP = {
  MRI: 'v_mri_patient_regions',
  CT: 'v_ct_patient_regions',
  XRAY: 'v_xray_patient_regions',
  'X-RAY': 'v_xray_patient_regions',
  ULTRASOUND: 'v_ultrasound_patient_regions',
  MAMMOGRAPHY: 'v_mammography_patient_regions',
  'NUCLEAR MEDICINE': 'v_nm_patient_regions',
  NM: 'v_nm_patient_regions',
  PET: 'v_pet_patient_regions',
};

/**
 * Modality normalization dictionary
 * Maps patient slang and common abbreviations to standardized modality keys.
 */
const MODALITY_ALIASES = {
  MRI: ['MRI', 'MR', 'MAGNETIC RESONANCE'],
  CT: ['CT', 'CAT SCAN', 'CAT', 'CT SCAN', 'COMPUTED TOMOGRAPHY'],
  'X-RAY': ['X-RAY', 'XRAY', 'X RAY', 'XR', 'RADIOGRAPH'],
  ULTRASOUND: ['ULTRASOUND', 'US', 'SONO', 'SONOGRAM'],
  MAMMOGRAPHY: ['MAMMOGRAPHY', 'MAMMO'],
  'NUCLEAR MEDICINE': ['NUCLEAR MEDICINE', 'NM', 'NUC MED', 'NUCLEAR'],
  PET: ['PET', 'PET SCAN', 'PET/CT', 'POSITRON EMISSION TOMOGRAPHY'],
};

/**
 * Region normalization dictionary
 * Maps patient or colloquial terms to the standardized region
 * names used in Supabase (v_*_patient_regions views).
 */
const REGION_ALIASES = {
  // ---- MRI-style canonical labels ----
  'Lumbar Spine (Low Back)': ['low back', 'lumbar', 'l-spine', 'lumbar spine', 'back'],
  'Cervical Spine (Neck)': ['neck', 'c-spine', 'cervical', 'cervical spine'],
  'Thoracic Spine (Mid Back)': ['mid back', 't-spine', 'thoracic', 'thoracic spine'],
  'Shoulder': ['shoulder', 'upper extremity', 'arm'],
  'Knee': ['knee', 'lower extremity', 'leg', 'thigh'],
  'Hip': ['hip', 'pelvis'],
  'Chest': ['chest', 'thorax', 'lung', 'lungs'],
  'Abdomen': ['abdomen', 'belly'],
  'Abdomen/Pelvis': ['abdomen pelvis', 'abd/pelvis', 'abdomen and pelvis'],
  'Brain': ['brain', 'head', 'head/brain', 'cranium'],
  'Breast': ['breast', 'mammo', 'mammogram'],
  'Heart': ['cardiac', 'heart', 'coronary'],
  'Bone': ['bone', 'skeletal'],
  'Vascular': ['artery', 'vein', 'vascular'],
  'Orbit/Face/Neck': ['face', 'orbit', 'sinus', 'eye socket'],
};




/**
 * Normalize any user-entered modality term into a standard key
 * (e.g., "cat scan" → "CT", "xray" → "X-RAY").
 */
function normalizeModality(input) {
  if (!input) return null;
  const upper = input.toUpperCase().trim();
  for (const [canonical, aliases] of Object.entries(MODALITY_ALIASES)) {
    if (aliases.includes(upper)) return canonical;
  }
  return upper; // fallback if no alias found
}

/**
 * Normalize region into the closest patient_region label,
 * using modality-specific preferences when needed.
 */
function normalizeRegion(input, modality) {
  if (!input) return null;
  const cleaned = input.toLowerCase().replace(/\s+/g, ' ').trim();

  // 🧠 Fallback: map common head synonyms to Brain
  if (cleaned.match(/\b(head|cranium|skull)\b/)) {
    return 'Brain';
  }

  // 1️⃣  Try full alias match
  for (const [canonical, aliases] of Object.entries(REGION_ALIASES)) {
    for (const alias of aliases) {
      const aliasClean = alias.toLowerCase().replace(/\s+/g, ' ').trim();
      if (cleaned === aliasClean) {
        // 2️⃣  Simplify if CT prefers shorter region names
        if (modality && modality.toUpperCase() === 'CT') {
          if (canonical === 'Cervical Spine (Neck)') return 'Neck';
          if (canonical === 'Lumbar Spine (Low Back)') return 'Lumbar Spine (Low Back)';
          if (canonical === 'Thoracic Spine (Mid Back)') return 'Thoracic Spine (Mid Back)';
          if (canonical === 'Brain') return 'Brain'; // ✅ use Brain not Head
        }
        return canonical;
      }
    }
  }

  // 3️⃣  Fallback to input if no match
  console.warn(`⚠️ [Resolver] Region alias not found for "${input}" (modality ${modality})`);
  logUnknownRegion(input, modality, null, false)
    .catch(err => console.error("❌ [Resolver] Audit log error:", err.message));
  return input;
}






// Contrast label sets used to match friendly_name patterns
/**
 * Expanded synonym map for all contrast variations.
 * This normalizes real-world phrasing and shorthand (e.g., W/WO, W & W/O, w/contrast, no contrast).
 */
const CONTRAST_FILTERS = {
  'WITHOUT CONTRAST': [
    'WITHOUT CONTRAST',
    'W/O CONTRAST',
    'NO CONTRAST',
    'NON-CONTRAST',
    'NON CONTRAST',
    'WO CONTRAST',
  ],
  'WITH CONTRAST': [
    'WITH CONTRAST',
    'W/ CONTRAST',
    'W CONTRAST',
    'W. CONTRAST',
  ],
  'WITH & WITHOUT CONTRAST': [
    'WITH & WITHOUT CONTRAST',
    'WITH AND WITHOUT CONTRAST',
    'W/WO CONTRAST',
    'W & W/O CONTRAST',
    'W + W/O CONTRAST',
    'W+W/O CONTRAST',
  ],
};


/**
 * Universal resolver for any supported modality
 * Automatically maps to the proper view and applies contrast filters.
 */
export async function resolveProcedureUniversal({
  supabase,
  modality,
  contrast,
  patientRegion,
}) {
  console.log('🧭 [Resolver] Incoming request:', {
  modality,
  contrast,
  patientRegion,
});

// ✅ Normalize the modality first (handles "cat scan", "xray", "sonogram", etc.)
const normalizedModality = normalizeModality(modality);
const key = (normalizedModality || '').toUpperCase();
const table = TABLE_MAP[key];

// ✅ Normalize region as well (handles "low back", "abd/pelvis", etc.)
const normalizedRegion = normalizeRegion(patientRegion, normalizedModality);
console.log(`🧠 [Resolver] Region normalized: "${patientRegion}" → "${normalizedRegion}"`);


if (!table) {
  console.warn(`⚠️ Unsupported modality: "${modality}" normalized to "${normalizedModality}"`);
  return { rows: [], error: `Unsupported modality: ${modality}` };
}

console.log(`🧠 [Resolver] Normalized modality: "${modality}" → "${normalizedModality}"`);


  const contrastKey = (contrast || '').toUpperCase().trim();
  const contrastKeys = CONTRAST_FILTERS[contrastKey] ?? [];

  if (!contrastKeys.length && !contrastKey) {
    // Treat missing or unspecified contrast as "Without Contrast" for fallback
    contrastKeys.push('WITHOUT CONTRAST');
  }


  const contrastClause =
    contrastKeys.length > 0
      ? contrastKeys.map((k) => `friendly_name.ilike.%${k}%`).join(',')
      : null;

  try {
    const filters = [`patient_region.ilike.%${normalizedRegion}%`];
    if (contrastClause) filters.push(contrastClause);

    const { data, error } = await supabase
      .from(table)
      .select('cpt_code, friendly_name, body_region, patient_region')
      .or(filters.join(','));

    if (error) return { rows: [], error: error.message };
    if (!data?.length) return { rows: [], error: 'Procedure not found.' };

    console.log('✅ [Resolver] Query executed:', {
      table,
      rowCount: data?.length || 0,
      sample: data?.[0] ? data[0] : 'No results',
    });

    return { rows: data, error: null };
  } catch (e) {
    console.error('❌ [Resolver] Exception:', e);
    return { rows: [], error: e.message };
  }
}


/**
 * Compatibility wrapper for legacy calls
 */
export async function resolveProcedure(params) {
  return resolveProcedureUniversal(params);
}

/**
 * Consistent two-line patient label for UI
 */
export function formatPatientLabel(friendlyName, cptCode) {
  let label = friendlyName.replace(/\s*\[\d+\]$/, '').trim();
  if (label.endsWith('With & Without')) label += ' Contrast';
  if (label.endsWith('With')) label += ' Contrast';
  if (label.endsWith('Without')) label += ' Contrast';
  return `${label}\nCPT ${cptCode}`;
}
