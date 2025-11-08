// ======================================================
// UNIVERSAL SEARCH INDEX
// ======================================================
// Collects all modality data into a single standardized
// search index for the PPE (Patient Procedure Engine).
// ======================================================

// ======================================================
// SEMANTIC ALIAS DICTIONARY
// ======================================================
// Expands natural body-part terms like "elbow" → "upper extremity"
// so that patient-friendly searches match grouped radiology regions.
// ======================================================

export const BODY_PART_ALIASES: Record<string, string[]> = {
  brain: ["head", "skull"],
  chest: ["thorax", "lung"],
  abdomen: ["belly", "stomach"],
  pelvis: ["hip", "pelvic"],
  elbow: ["upper extremity", "arm"],
  wrist: ["hand", "upper extremity"],
  knee: ["lower extremity", "leg"],
  ankle: ["foot", "lower extremity"],
  shoulder: ["upper extremity", "arm"],
  neck: ["cervical spine", "spine", "head and neck"],
  spine: ["cervical", "thoracic", "lumbar"],
};

// Helper to build alias strings
function getAliasString(category: string): string {
  const aliases = BODY_PART_ALIASES[category?.toLowerCase()] || [];
  return aliases.join(" ");
}

// Import from procedures-global.js (loaded globally)
declare global {
  interface Window {
    ProcedureLibrary: {
      MRI: any;
      CT: any;
      'X-Ray': any;
      Ultrasound: any;
    };
  }
}

export interface ProcedureIndexEntry {
  modality: string;            // "MRI" | "CT" | "X-Ray" | "Ultrasound"
  bodyPart: string;
  cpt: string;
  label: string;
  shortLabel?: string;
  tags: string[];
  searchable: string;
  icon?: string;
  categoryGroup?: string;
  isVascular?: boolean;
  isScreening?: boolean;
  contrastMode?: string;
}

// Utility: build normalized text
function normalizeText(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Function to build the index (called after procedures-global.js loads)
export function buildUniversalIndex(): ProcedureIndexEntry[] {
  const index: ProcedureIndexEntry[] = [];
  
  if (typeof window === 'undefined' || !window.ProcedureLibrary) {
    console.warn('âš ï¸ ProcedureLibrary not loaded yet');
    return index;
  }

  const MRI_PROCEDURES = window.ProcedureLibrary.MRI;
  const CT_PROCEDURES = window.ProcedureLibrary.CT;
  const XRAY_PROCEDURES = window.ProcedureLibrary['X-Ray'];
  const ULTRASOUND_PROCEDURES = window.ProcedureLibrary.Ultrasound;

  // ------------------------------------------------------
  // MRI
  // ------------------------------------------------------
  for (const key in MRI_PROCEDURES) {
    const item = MRI_PROCEDURES[key];
    if (!item?.procedures) continue;

    item.procedures.forEach((proc: any) => {
      // Include body-part aliases in searchable text
      const aliasString = getAliasString(item.category);
      index.push({
        modality: "MRI",
        bodyPart: item.category,
        cpt: proc.cpt,
        label: proc.label,
        shortLabel: proc.shortLabel,
        tags: [
          "mri",
          item.category.toLowerCase(),
          ...(proc.useCase?.toLowerCase().split(" ") || [])
        ],
        searchable: normalizeText(
          `mri ${item.category} ${aliasString} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
        ),
        icon: item.icon,
        categoryGroup: item.categoryGroup,
        contrastMode: item.contrastMode,
      });
    });
  }

  // ------------------------------------------------------
  // CT
  // ------------------------------------------------------
  for (const key in CT_PROCEDURES) {
    const item = CT_PROCEDURES[key];
    if (!item?.procedures) continue;

    item.procedures.forEach((proc: any) => {
      // Include body-part aliases in searchable text
      const aliasString = getAliasString(item.category);
      index.push({
        modality: "CT",
        bodyPart: item.category,
        cpt: proc.cpt,
        label: proc.label,
        shortLabel: proc.shortLabel,
        tags: [
          "ct",
          ...(item.displayIn || []),
          ...(proc.tags || [])
        ].map(t => t.toLowerCase()),
        searchable: normalizeText(
          `ct ${item.category} ${aliasString} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
        ),
        icon: item.icon,
        categoryGroup: item.categoryGroup,
        isVascular: item.isVascular,
        isScreening: item.isScreening,
      });
    });
  }

  // ------------------------------------------------------
  // X-RAY
  // ------------------------------------------------------
  for (const key in XRAY_PROCEDURES) {
    const item = XRAY_PROCEDURES[key];
    if (!item?.viewOptions) continue;

    item.viewOptions.forEach((view: any) => {
      // Include body-part aliases in searchable text
      const aliasString = getAliasString(item.category);
      index.push({
        modality: "X-Ray",
        bodyPart: item.category,
        cpt: view.cpt,
        label: view.label,
        shortLabel: view.shortLabel,
        tags: [
          "xray",
          "x-ray",
          item.category.toLowerCase(),
          `${view.views} view`
        ],
        searchable: normalizeText(
          `xray x-ray ${item.category} ${aliasString} ${view.label} ${view.cpt}`
        ),
        icon: item.icon,
      });
    });
  }

  // ------------------------------------------------------
  // ULTRASOUND
  // ------------------------------------------------------
  for (const key in ULTRASOUND_PROCEDURES) {
    const item = ULTRASOUND_PROCEDURES[key];
    if (!item?.procedures) continue;

    item.procedures.forEach((proc: any) => {
      // Include body-part aliases in searchable text
      const aliasString = getAliasString(item.category);
      index.push({
        modality: "Ultrasound",
        bodyPart: item.category,
        cpt: proc.cpt,
        label: proc.label,
        shortLabel: proc.shortLabel,
        tags: [
          "ultrasound",
          "us",
          item.category.toLowerCase()
        ],
        searchable: normalizeText(
          `ultrasound us ${item.category} ${aliasString} ${proc.label} ${proc.cpt}`
        ),
        icon: item.icon,
      });
    });
  }

  console.log(`[OK] Universal Procedure Index built: ${index.length} items`);
  return index;
}

// Build immediately if window is available
export const UniversalProcedureIndex = buildUniversalIndex();