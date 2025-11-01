// /lib/procedureResolver.js

// Contrast labels to match your friendly_name patterns.
// Adjust if your naming differs.
const CONTRAST_FILTERS = {
  "Without Contrast": ["Without Contrast", "W/O Contrast"],
  "With Contrast": ["With Contrast"],
  "With & Without Contrast": ["With & Without", "W & W/O"]
};

/**
 * MRI resolver using v_mri_patient_regions (already created earlier).
 */
export async function resolveMriCpt({ supabase, contrast, patientRegion }) {
  const contrastKeys = CONTRAST_FILTERS[contrast] ?? [];
  if (!contrastKeys.length) return { rows: [], error: `Unsupported contrast type: ${contrast}` };

  const { data, error } = await supabase
    .from("v_mri_patient_regions")
    .select("cpt_code, friendly_name, body_region, patient_region")
    .ilike("patient_region", patientRegion)
    .or(contrastKeys.map(k => `friendly_name.ilike.%${k}%`).join(","));

  if (error) return { rows: [], error: error.message };
  if (!data?.length) return { rows: [], error: "Procedure not found." };
  return { rows: data, error: null };
}

/**
 * CT resolver using v_ct_patient_regions (this message includes the SQL for it).
 */
export async function resolveCtCpt({ supabase, contrast, patientRegion }) {
  const contrastKeys = CONTRAST_FILTERS[contrast] ?? [];
  if (!contrastKeys.length) return { rows: [], error: `Unsupported contrast type: ${contrast}` };

  const { data, error } = await supabase
    .from("v_ct_patient_regions")
    .select("cpt_code, friendly_name, body_region, patient_region")
    .ilike("patient_region", patientRegion)
    .or(contrastKeys.map(k => `friendly_name.ilike.%${k}%`).join(","));

  if (error) return { rows: [], error: error.message };
  if (!data?.length) return { rows: [], error: "Procedure not found." };
  return { rows: data, error: null };
}

/**
 * Unified resolver: extend as we add CTA, X-Ray, etc.
 */
export async function resolveProcedure({ supabase, modality, contrast, patientRegion }) {
  switch (modality) {
    case "MRI":
      return resolveMriCpt({ supabase, contrast, patientRegion });
    case "CT":
      return resolveCtCpt({ supabase, contrast, patientRegion });
    default:
      return { rows: [], error: `Unsupported modality: ${modality}` };
  }
}
