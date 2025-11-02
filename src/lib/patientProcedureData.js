// src/lib/patientProcedureData.js
// -------------------------------------------------------------
// Centralized constants for all modality → region mappings,
// synonyms, and UI helpers used by the Patient Procedure Engine.
// -------------------------------------------------------------

// --------------------
// 1. Region Lists (UI)
// --------------------
export const REGION_BY_MODALITY = {
  MRI: [
    "Brain",
    "Cervical Spine (Neck)",
    "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)",
    "Shoulder",
    "Elbow",
    "Wrist / Hand",
    "Hip",
    "Knee",
    "Ankle / Foot",
    "Abdomen",
    "Pelvis",
    "Chest",
    "Breast",
    "Orbit / Face / Neck",
    "TMJ",
  ],
  CT: [
    "Head / Brain",
    "Chest",
    "Abdomen",
    "Abdomen & Pelvis",
    "Pelvis",
    "Cervical Spine (Neck)",
    "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)",
    "Sinuses",
    "Neck (Soft Tissue)",
    "Extremity",
  ],
};

// ---------------------------
// 2. Grouped Region Structure
// ---------------------------
export const REGION_BY_MODALITY_GROUPED = {
  MRI: {
    "Head & Neck": [
      { label: "Brain" },
      { label: "Orbit / Face / Neck" },
      { label: "TMJ" },
    ],
    Spine: [
      { label: "Cervical Spine (Neck)" },
      { label: "Thoracic Spine (Mid Back)" },
      { label: "Lumbar Spine (Low Back)" },
    ],
    Extremities: [
      { label: "Shoulder" },
      { label: "Elbow" },
      { label: "Wrist / Hand" },
      { label: "Hip" },
      { label: "Knee" },
      { label: "Ankle / Foot" },
    ],
    Torso: [
      { label: "Chest" },
      { label: "Abdomen" },
      { label: "Pelvis" },
      { label: "Breast" },
    ],
  },
  CT: {
    "Head & Neck": [
      { label: "Head / Brain" },
      { label: "Sinuses" },
      { label: "Neck (Soft Tissue)" },
    ],
    Spine: [
      { label: "Cervical Spine (Neck)" },
      { label: "Thoracic Spine (Mid Back)" },
      { label: "Lumbar Spine (Low Back)" },
    ],
    Torso: [
      { label: "Chest" },
      { label: "Abdomen" },
      { label: "Abdomen & Pelvis" },
      { label: "Pelvis" },
    ],
    Extremities: [{ label: "Extremity" }],
  },
};

// -------------------
// 3. Synonym Mappings
// -------------------
export const REGION_SYNONYMS = {
  MRI: {
    knee: "Knee",
    ankle: "Ankle / Foot",
    foot: "Ankle / Foot",
    wrist: "Wrist / Hand",
    hand: "Wrist / Hand",
    shoulder: "Shoulder",
    elbow: "Elbow",
    hip: "Hip",
    neck: "Cervical Spine (Neck)",
    "mid back": "Thoracic Spine (Mid Back)",
    "low back": "Lumbar Spine (Low Back)",
    tmj: "TMJ",
    breast: "Breast",
    orbit: "Orbit / Face / Neck",
    face: "Orbit / Face / Neck",
  },
  CT: {
    head: "Head / Brain",
    brain: "Head / Brain",
    sinus: "Sinuses",
    sinuses: "Sinuses",
    neck: "Neck (Soft Tissue)",
    "abdomen pelvis": "Abdomen & Pelvis",
    "a/p": "Abdomen & Pelvis",
    lumbar: "Lumbar Spine (Low Back)",
    thoracic: "Thoracic Spine (Mid Back)",
    cervical: "Cervical Spine (Neck)",
    arm: "Extremity",
    leg: "Extremity",
  },
};

// ---------------------
// 4. Fallback Suggestor
// ---------------------
export function suggestRegions(input, regions) {
  const q = (input || "").toLowerCase().trim();
  if (!q) return [];
  return regions.filter((r) => {
    const t = r.toLowerCase();
    return t.includes(q) || t.split(/[^\w]+/).some((w) => q.includes(w));
  });
}
