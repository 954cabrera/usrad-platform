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
  // Core anatomical aliases
  brain: ["head", "skull", "cranium"],
  chest: ["thorax", "lung", "lungs", "rib", "thoracic cavity"],
  abdomen: ["belly", "stomach", "abdominal"],
  pelvis: ["hip", "pelvic", "groin", "bladder", "uterus", "prostate"],

  // Extremities (mapped across modalities)
  shoulder: [
    "upper extremity",
    "arm",
    "humerus",
    "rotator cuff",
    "ac joint",
    "ct shoulder",
    "mri shoulder",
    "xray shoulder",
  ],
  elbow: [
    "upper extremity",
    "arm",
    "forearm",
    "radius",
    "ulna",
    "ct elbow",
    "mri elbow",
    "xray elbow",
  ],
  wrist: [
    "hand",
    "upper extremity",
    "carpal",
    "metacarpal",
    "ct wrist",
    "mri wrist",
    "xray wrist",
  ],
  knee: [
    "lower extremity",
    "leg",
    "patella",
    "meniscus",
    "acl",
    "pcl",
    "ct knee",
    "mri knee",
    "xray knee",
  ],
  ankle: [
    "foot",
    "lower extremity",
    "tibia",
    "fibula",
    "heel",
    "ct ankle",
    "mri ankle",
    "xray ankle",
  ],
  foot: [
    "toe",
    "metatarsal",
    "heel",
    "plantar",
    "lower extremity",
    "ct foot",
    "mri foot",
    "xray foot",
  ],

  // Spine regions
  neck: ["cervical spine", "spine", "head and neck", "c-spine"],
  spine: ["cervical", "thoracic", "lumbar", "l-spine", "t-spine", "spinal"],

  // Additional combined mappings
  leg: ["lower extremity", "thigh", "shin", "calf"],
  arm: ["upper extremity", "forearm", "humerus"],
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

  // ✅ Skip hidden categories (like upperExtremity / lowerExtremity)
  // ✅ Ensure hidden categories never index (CT Upper/Lower Extremity)
if (item.hiddenFromSearch === true || key.toLowerCase().includes("extremity")) {
  console.log(`[Universal Index] Skipping hidden CT group: ${key}`);
  continue;
}


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