✅ Here is the full content of PATIENT_PROCEDURE_ENGINE_REPORT.md:
# USRad Patient Procedure Engine  
### Engineering Handoff Report — v1.0  
_Date: 2025-11-01_

---

## 1. Overview & Purpose

This document contains the full technical context, architecture, file structure, implementation notes, and continuation roadmap for the **Patient Procedure Engine** powering the Hero Section of the USRad marketing site and onboarding flow.

The current scope includes:

- Patient-friendly search for MRI and CT scans  
- Progressive disclosure flow for modality → contrast → body region  
- Resolver logic for returning exact CPT code per clinical region  
- Supabase-backed mapping from patient search to clinical taxonomy  
- Persistent UI state between modal steps  
- Resilient UX design for procedure selection

This report is meant as both a historical artifact and a future-facing **continuity and onboarding tool** for developers resuming work on this feature.

---

## 2. Current System Architecture

### 2.1 Front-End State & UI Flow (Hero Modal)

The Hero Section modal is a progressive 3-step flow:



[Step 1] Procedure search → [Step 2] Zip code input → [Step 3] Provider results


Step 1 is driven by dynamic autocomplete, synonym matching, and a guided flow of:



Modality => Contrast => Body Region => Resolver => CPT Assigned


Depending on the input (free text or direct click), the modal logic either:
- Suggests matches via available tiles (ex: MRI → Knee → CPT)
- Falls back to free-text resolver suggestions using `REGION_SYNONYMS`

---

### 2.2 Resolver Architecture



hero-form-controller-modal.js (UI Controller)
↓
onRegionConfirmed() // Resolver wrapper
↓
/api/resolve.js // Backend logic
↓
Supabase view(s) // v_mri_patient_regions / v_ct_patient_regions
↓
Return {
cpt_code,
patient_label,
badge_label
}


**Resolver endpoint:** `src/pages/api/resolve.js`  
(See code in your repo for this resolver.)

---

## 3. Source Files & Responsibilities

| File | Purpose |
|------|---------|
| `public/js/hero-form-controller-modal.js` | Core patient search UX + modal controller + step logic + resolver integration. Handles UI updates, tile selection, and API calls. |
| `src/pages/api/resolve.js` | Main resolver logic. Converts `{ modality, contrast, region }` to `{ CPT, patient_label }`. Includes contrast logic. |
| `src/components/HeroSection.astro` | Hero UI wrapper. Defines the DOM structure for selected procedure display. |
| `progress toward patient procedure engine notes.pdf` | Today's detailed notes → decisions, bugs fixed, mapping issues, implementation session log. |

---

## 4. Work Completed (2025-11-01)

### 4.1 UI Locking Fix

- Issue: `selected-procedure-display` was being overwritten after Step 1 → 2 transition  
- Fix: Removed `.textContent = ...` in modal step change  
- Added "MutationObserver Guard" to restore view if overwritten elsewhere in future  
- Final output:



MRI Brain – With & Without Contrast
🔷 CPT 70553


---

### 4.2 Resolver Integration (End-to-End)

- Integrated FE → API → Supabase pipeline  
- `onRegionConfirmed()` now passes normalized region to resolver  
- Updated CT and MRI logic for multi-patient-region workflows  
- Tested via UI: MRI → With & Without → Brain → returns CPT `70553`  

---

### 4.3 CPT Data Corrections & Gaps Noted

- Found missing MRI “With Contrast” codes in Supabase (ex: `70552`)  
- Updated resolver contrast filter logic  
- Observed Supabase `v_mri_patient_regions` might need reconstruction to reflect 3rd contrast variant option (`both`)  

---

### 4.4 Added Patient-Side Region System

- `REGION_BY_MODALITY` (flat list)
- `REGION_BY_MODALITY_GROUPED` (for future grouping in UI tiles)
- `REGION_SYNONYMS` (flexible mapping for free-text input)
- `suggestRegions()` utility to surface fallback paths

---

## 5. Current Feature Status

| Feature | Status |
|---------|--------|
| MRI Flow | ✅ Complete |
| CT Flow | 🟡 Partial (region logic exists, resolver incomplete) |
| Synonym Fallback | ✅ Implemented |
| Supabase CPT Mapping | ✅ Working for MRI regions |
| UI Resilience | ✅ MutationObserver guard in place |
| Telemetry | ❌ Not yet capturing clickthroughs or resolver misses |

---

## 6. Known Issues & Edge Cases

| Issue | Example | Status |
|-------|----------|--------|
| “XRA” variation not resolved | `xra` still returns MRI instead of X-Ray | 🟡 Pending |
| Synonym logic incomplete | “Lower Back MRI”, “SI Joint”, etc. | 🟡 Needs alias table integration |
| CT data model incomplete | No test cases for “CT Sinuses w/contrast” | ⏳ Needs attention |
| Resolver ignores “No Contrast” MRI variants when name contains “&” | Ex: “w/o & w” bypass | 🛠️ Fix planned |

---

## 7. Remaining Work (P0 → P2)

| Priority | Task |
|----------|------|
| **P0** | Finish CT region flow and resolver logic |
| **P0** | Rebuild Supabase view with multi-contrast support |
| **P1** | Add fuzzy alias table lookup (`procedure_aliases`) |
| **P1** | Add loader UI during resolver fetch |
| **P2** | Convert `hero-form-controller-modal.js` into ES module |
| **P2** | Add error telemetry: log resolver misses |

---

## 8. How to Resume Development

### ✅ Start Here

1. Branch from: `feature/procedure-search-v2`  
2. Verify endpoint `/api/resolve` logs matching CPT for CT use-case  
3. Implement grouped tiles with `REGION_BY_MODALITY_GROUPED`  
4. Test free-text matches via `REGION_SYNONYMS`  
5. Apply Supabase update to views when CT resolver implemented  

---

## 9. Git Commit Log (Today)



feat(hero): lock 2-line selected procedure UI; remove textContent overwrite; add MutationObserver guard

feat(resolver): integrate region-based CPT resolver into Step 1 Modal

fix(supabase): add missing “with contrast” CPT codes for MRI brain, knee


_Current Branch: `feature/procedure-search-v2`_

---

## 10. Appendix

### 10.1 REGION_BY_MODALITY (MRI/CT)

```js
const REGION_BY_MODALITY = {
  MRI: [
    "Brain", "Cervical Spine (Neck)", "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)", "Shoulder", "Elbow", "Wrist / Hand",
    "Hip", "Knee", "Ankle / Foot", "Abdomen", "Pelvis", "Chest",
    "Breast", "Orbit / Face / Neck", "TMJ"
  ],
  CT: [
    "Head / Brain", "Chest", "Abdomen", "Abdomen & Pelvis", "Pelvis",
    "Cervical Spine (Neck)", "Thoracic Spine (Mid Back)",
    "Lumbar Spine (Low Back)", "Sinuses", "Neck (Soft Tissue)",
    "Extremity"
  ]
};

10.2 Supabase View – v_mri_patient_regions (concept)
patient_region	friendly_name	cpt_code
Brain	MRI Brain With & Without Contrast	70553
Brain	MRI Brain Without Contrast	70551
Brain	MRI Brain With Contrast	70552
Knee	MRI Knee Without Contrast	73721
10.3 Screenshot Placeholders

✅ “MRI Brain selected → Step 2 UI shown”

✅ “CT option shown with region tiles”

(To replace with actual UI screenshots)

10.4 Notes Doc Reference

See: progress toward patient procedure engine notes.pdf for the complete real-time mapping, thought flow, and fallback logic.

End of Report