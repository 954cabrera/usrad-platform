// ======================================================
// UNIVERSAL SEARCH INDEX
// ======================================================
// Collects all modality data into a single standardized
// search index for the PPE (Patient Procedure Engine).
// ======================================================

// Import procedure data from ES6 module
import { ProcedureLibrary } from '../data/procedure-data.js';


// ======================================================
// SEMANTIC ALIAS DICTIONARY
// ======================================================
// Expands natural body-part terms like "elbow" Ã¢â€ â€™ "upper extremity"
// so that patient-friendly searches match grouped radiology regions.
// ======================================================

export const BODY_PART_ALIASES: Record<string, string[]> = {
  brain: ["head", "skull"],
  chest: ["thorax", "lung"],
  abdomen: ["belly", "stomach"],
  pelvis: ["hip", "pelvic"],
  shoulder: ["rotator cuff", "upper arm", "joint"],
  elbow: ["forearm", "upper extremity"],
  wrist: ["hand", "carpal"],
  hip: ["acetabulum", "pelvis", "joint"],
  knee: ["leg", "patella", "joint"],
  ankle: ["foot", "heel", "lower leg"],
  neck: ["cervical spine", "spine", "head and neck"],
  spine: ["cervical", "thoracic", "lumbar"],
  prostate: ["prostate gland", "pelvic prostate", "multiparametric", "mpmri"],
  "upper extremity": ["shoulder", "elbow", "wrist", "arm", "hand", "forearm"],
  "lower extremity": ["hip", "knee", "ankle", "leg", "foot", "thigh", "calf"],
};

// Helper to build alias strings
function getAliasString(category: string): string {
  const aliases = BODY_PART_ALIASES[category?.toLowerCase()] || [];
  return aliases.join(" ");
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

// Function to build the index (now uses imported ProcedureLibrary)
export function buildUniversalIndex(): ProcedureIndexEntry[] {
  const index: ProcedureIndexEntry[] = [];
  
  
  // Use imported ProcedureLibrary directly (no window dependency)
  const MRI_PROCEDURES = ProcedureLibrary.MRI;
  const CT_PROCEDURES = ProcedureLibrary.CT;
  const XRAY_PROCEDURES = ProcedureLibrary['X-Ray'];
  const ULTRASOUND_PROCEDURES = ProcedureLibrary.Ultrasound;

  if (!MRI_PROCEDURES || !CT_PROCEDURES || !XRAY_PROCEDURES || !ULTRASOUND_PROCEDURES) {
    console.warn('⚠️ ProcedureLibrary incomplete');
    return index;
  }

  // ------------------------------------------------------
  // MRI
  // ------------------------------------------------------
  for (const key in MRI_PROCEDURES) {
    const item = MRI_PROCEDURES[key];
    if (!item?.procedures) continue;

    item.procedures.forEach((proc: any) => {
      // Include body-part aliases in searchable text
      const aliasString = getAliasString(item.category);
      const matchKeywordsString = (item.matchKeywords || []).join(" ");
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
          `mri ${item.category} ${aliasString} ${matchKeywordsString} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
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
      const matchKeywordsString = (item.matchKeywords || []).join(" ");
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
          `ct ${item.category} ${aliasString} ${matchKeywordsString} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
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

// Build the index immediately on module load
export const UniversalProcedureIndex = buildUniversalIndex();