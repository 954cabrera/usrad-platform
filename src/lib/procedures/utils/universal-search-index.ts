// ======================================================
// UNIVERSAL SEARCH INDEX
// ======================================================
// Collects all modality data into a single standardized
// search index for the PPE (Patient Procedure Engine).
// ======================================================

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

// Base array
export const UniversalProcedureIndex: ProcedureIndexEntry[] = [];

// Wait for procedures-global.js to load
if (typeof window !== 'undefined' && window.ProcedureLibrary) {
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
      UniversalProcedureIndex.push({
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
          `mri ${item.category} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
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
      UniversalProcedureIndex.push({
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
          `ct ${item.category} ${proc.label} ${proc.cpt} ${proc.useCase || ""}`
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
      UniversalProcedureIndex.push({
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
          `xray x-ray ${item.category} ${view.label} ${view.cpt}`
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
      UniversalProcedureIndex.push({
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
          `ultrasound us ${item.category} ${proc.label} ${proc.cpt}`
        ),
        icon: item.icon,
      });
    });
  }

  console.log(`✅ Universal Procedure Index built: ${UniversalProcedureIndex.length} items`);
}