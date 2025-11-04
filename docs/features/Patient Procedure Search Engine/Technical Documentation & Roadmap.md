November 4, 2025

Patient Procedure Engine (PPE) - Technical Documentation & Roadmap
Executive Summary
The Patient Procedure Engine (PPE) is a sophisticated, modular medical imaging procedure search and booking system designed to help patients find and select diagnostic imaging procedures (MRI, CT, X-Ray, Ultrasound, etc.) with intelligent search, progressive disclosure, and an intuitive user experience.
Originally built as a monolithic 2,553-line controller, the PPE was successfully refactored into a clean, maintainable architecture spanning 9 focused TypeScript modules, reducing complexity by 83% while adding full type safety and comprehensive test coverage.

Table of Contents

System Architecture
Core Components
Data Flow
Current Capabilities
Adding New Modalities
Visual Enhancements
Analytics & Reporting
Future Development Roadmap
Developer Onboarding


System Architecture
High-Level Overview
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                      │
│  (HeroSection.astro - Progressive 2-Step Form)              │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              ORCHESTRATION LAYER (Phase 3)                   │
│  • modal-controller.ts - Main orchestrator                  │
│  • Event handling, DOM manipulation, view transitions       │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
┌────────▼─────────┐  ┌─────▼────────────────────────────────┐
│ BUSINESS LOGIC   │  │    UI RENDERING LAYER (Phase 2)      │
│  (Phase 1)       │  │  • renderer-core.ts                  │
│                  │  │  • contrast-renderer.ts              │
│ • types.ts       │  │  • region-renderer.ts                │
│ • modality-      │  │  • search-results-renderer.ts        │
│   detector.ts    │  │                                      │
│ • search-        │  └──────────────────────────────────────┘
│   engine.ts      │
│ • selection-     │
│   flow.ts        │
└────────┬─────────┘
         │
┌────────▼──────────────────────────────────────────────────┐
│              DATA LAYER (Legacy JavaScript)                │
│  • procedures-global.js - CPT code library                │
│  • window.ProcedureLibrary - Procedure definitions        │
│  • window.ProcedureHelpers - Resolution utilities         │
└───────────────────────────────────────────────────────────┘

Core Components
Phase 1: Business Logic Layer (1,222 lines)
1. types.ts (159 lines)
Purpose: Central TypeScript definitions for the entire system
Key Types:
typescript- Modality: 'MRI' | 'CT' | 'X-Ray' | 'Ultrasound' | 'Mammography' | 'PET' | 'Nuclear Medicine'
- ContrastType: 'without' | 'with' | 'both'
- Region: Body part definitions with icons
- SearchResult: Procedure search results
- ProcedureResolution: Final selected procedure
Dependencies: None (foundation layer)

2. modality-detector.ts (238 lines)
Purpose: Intelligent modality detection from user input
Key Functions:
typescriptdetectModality(input: string): Modality | null
  - Maps user queries ("mri", "cat scan", "ultrasound") to modalities
  - Handles 30+ aliases and variations

getContrastConfig(modality: Modality): ContrastConfig
  - Returns available contrast options for modality
  - MRI/CT: 3 options (without/with/both)
  - X-Ray/Ultrasound: No contrast

hasContrastOptions(modality: Modality): boolean
  - Quick check if modality uses contrast
Example Usage:
typescriptconst modality = detectModality('cat scan'); // Returns 'CT'
const config = getContrastConfig('MRI');
// Returns: { hasContrast: true, options: [...] }
Dependencies: types.ts

3. search-engine.ts (459 lines)
Purpose: Comprehensive procedure search across all modalities
Key Functions:
typescriptsearchAllProcedures(query: string): SearchResult[]
  - Full-text search across all procedures
  - Searches by: body part, modality, description
  - Returns results grouped by modality

searchByCPT(cptCode: string): SearchResult[]
  - Direct CPT code lookup
  - Returns exact matches only

groupByModality(results: SearchResult[]): Record<Modality, SearchResult[]>
  - Organizes results by modality for display
Search Strategy:

Check if query is 5-digit CPT code
Search MRI library
Search CT library
Search special procedures (Mammography, PET, Nuclear)
Handle redirects (e.g., "Knee" → "Lower Extremity Joint")
Return deduplicated results

Dependencies: types.ts, window.ProcedureLibrary

4. selection-flow.ts (366 lines)
Purpose: State machine for user's procedure selection journey
State Management:
typescriptinterface SelectionState {
  modality: Modality | null;
  contrast: ContrastType | null;
  region: string | null;
  history: SelectionState[];
}
Key Methods:
typescriptsetModality(modality: Modality): void
  - Validates and sets modality
  - Records in history

setContrast(contrast: ContrastType): void
  - Validates contrast for current modality
  - Records in history

setRegion(region: string): void
  - Validates region for current modality
  - Records in history

resolve(): ProcedureResolution | null
  - Calls window.ProcedureHelpers.resolveProcedure()
  - Returns complete procedure with CPT code

goBack(): void
  - Restores previous state from history
  - Enables navigation

reset(): void
  - Clears all selections
  - Fresh start
Example Flow:
typescriptconst flow = new SelectionFlow();
flow.setModality('MRI');        // Step 1
flow.setContrast('without');    // Step 2
flow.setRegion('Knee');         // Step 3
const procedure = flow.resolve(); // Returns CPT 73721
Dependencies: types.ts, modality-detector.ts, window.ProcedureHelpers

Phase 2: UI Rendering Layer (1,273 lines)
5. renderer-core.ts (398 lines)
Purpose: Reusable UI component library
Core Components:
typescript// Loading & Empty States
renderLoadingState(message: string): string
renderEmptySearchState(): string
renderNoResults(query: string, suggestions?: string[]): string

// Buttons & Cards
renderButton(options): string
renderCardButton(options): string

// Layout Utilities
renderBreadcrumb(steps: string[], currentIndex: number): string
renderSectionHeader(title: string, subtitle?: string, icon?: string): string
renderInfoBox(type: 'info' | 'warning' | 'success' | 'error', ...): string
renderBackButton(text: string, id?: string): string
renderGrid(items: string[], columns: 1-4): string
wrapInContainer(content: string, className?: string): string
Security:

All functions use escapeHtml() to prevent XSS attacks
No user input rendered without sanitization

Dependencies: None (foundation UI layer)

6. contrast-renderer.ts (312 lines)
Purpose: Renders contrast selection screens
Main Function:
typescriptrenderContrastSelection(modality: Modality, showBreadcrumb?: boolean): string
Features:

Shows 3 options for MRI/CT (Without/With/Both)
Displays prep requirements (IV line, kidney function check)
Shows duration estimates
Highlights "Most Common" option
Educational info cards about contrast

Special Cases:
typescriptrenderContrastUnavailable(): string
  - Shows when contrast filter produces no results

renderCompactContrastSelector(): string
  - Inline compact version for other views

renderContrastInfoCard(): string
  - Educational content about contrast dye
Dependencies: types.ts, modality-detector.ts, renderer-core.ts

7. region-renderer.ts (298 lines)
Purpose: Renders body region selection screens
Main Functions:
typescriptrenderRegionSelection(modality, contrast?, showBreadcrumb?): string
  - Flat grid layout of body regions

renderGroupedRegionSelection(...): string
  - Grouped by category (Head/Neck, Spine, Extremities, Torso)
  - Better UX for 15+ regions
Region Organization:
typescriptMRI Regions (16):
  - Head & Neck: Brain, Orbit/Face/Neck, TMJ
  - Spine: Cervical, Thoracic, Lumbar
  - Upper Extremities: Shoulder, Elbow, Wrist/Hand
  - Lower Extremities: Hip, Knee, Ankle/Foot
  - Torso: Chest, Abdomen, Pelvis, Breast

CT Regions (16):
  - Head & Neck: Head/Brain, Sinuses, Neck
  - Spine: Cervical, Thoracic, Lumbar
  - Torso: Chest, Abdomen, Abdomen & Pelvis, Pelvis
  - Extremities: All joints and bones
Helper Functions:
typescriptgetRegionsForModality(modality, grouped?): Region[]
searchRegions(modality, keyword): Region[]
Dependencies: types.ts, modality-detector.ts, renderer-core.ts

8. search-results-renderer.ts (265 lines)
Purpose: Renders comprehensive search results
Main Function:
typescriptrenderSearchResults(
  results: SearchResult[],
  query: string,
  preSelectedContrast?: string
): string
Features:

Groups results by modality
Shows procedure cards with:

Icon
Full procedure name
Description
CPT code
Duration


Handles filtered results (when contrast pre-selected)
Special procedure types (Mammography, PET, Nuclear)

Additional Functions:
typescriptrenderCompactSearchResults(results, limit): string
  - Inline compact version (5 results max)

renderSpecialProcedures(config): string
  - Mammography (Screening/Diagnostic/3D)
  - Nuclear Medicine (Bone/Cardiac/Thyroid/Parathyroid)
  - PET (Whole Body/Brain/Cardiac)

highlightSearchTerms(text, query): string
  - Visual highlighting of search terms
Dependencies: types.ts, search-engine.ts, modality-detector.ts, renderer-core.ts

Phase 3: Orchestration Layer (421 lines)
9. modal-controller.ts (421 lines)
Purpose: Main orchestrator - coordinates all modules
Responsibilities:

DOM Management

Caches all DOM elements on initialization
Opens/closes modal with animations
Transitions between Step 1 (Procedure) and Step 2 (Location)


Search Orchestration

typescript   handleSearch(query: string): void
     - Debounced search (300ms)
     - Detects modality vs. comprehensive search
     - Routes to appropriate view

View Management

typescript   showContrastSelection(modality: Modality)
   showRegionSelection(modality: Modality, contrast?: ContrastType)

Event Coordination

typescript   attachModalListeners()      // Open/close modal
   attachSearchListeners()     // Search input
   attachContrastListeners()   // Contrast selection
   attachRegionListeners()     // Region selection
   attachResultListeners()     // Search results
   attachSuggestionListeners() // Search suggestions

Procedure Selection

typescript   handleProcedureSelection(procedure)
     - Updates hidden form fields
     - Renders selected procedure UI
     - Closes modal
     - Transitions to Step 2
Initialization:
typescriptinitializeSlimController()
  - Waits for window.ProcedureLibrary
  - Caches DOM elements
  - Creates SelectionFlow instance
  - Attaches all event listeners
Dependencies: All Phase 1 and Phase 2 modules

Legacy Data Layer
10. procedures-global.js (1,115 lines - Legacy JavaScript)
Purpose: Complete CPT code procedure library
Structure:
javascriptwindow.ProcedureLibrary = {
  MRI: {
    brain: {
      category: "Brain",
      icon: "🧠",
      procedures: [
        { cpt: "70551", label: "MRI Brain - Without Contrast", ... },
        { cpt: "70552", label: "MRI Brain - With Contrast", ... },
        { cpt: "70553", label: "MRI Brain - With & Without Contrast", ... }
      ]
    },
    // ... 15 more MRI regions
  },
  CT: {
    head: { ... },
    // ... 15 more CT regions
  }
}

window.ProcedureHelpers = {
  resolveProcedure(modality, contrast, region),
  normalizeRegionKey(region),
  isAmbiguousBodyPart(bodyPart),
  getCategoriesForBodyPart(bodyPart),
  filterByContrast(category, contrast)
}
```

**Current Coverage:**
- **MRI:** 16 regions, 48 procedures
- **CT:** 16 regions, 48 procedures
- **Mammography:** 3 procedures
- **Nuclear Medicine:** 4 procedures
- **PET:** 3 procedures

**Total:** ~106 procedures across 5 modalities

---

## Data Flow

### User Journey: "I need an MRI of my knee"
```
1. USER TYPES "mri" in search box
   └─> modal-controller.ts: handleSearch()
       └─> modality-detector.ts: detectModality('mri')
           └─> Returns: 'MRI'
       └─> selection-flow.ts: setModality('MRI')
       └─> modal-controller.ts: showContrastSelection('MRI')
           └─> contrast-renderer.ts: renderContrastSelection('MRI')
               └─> Returns: HTML with 3 contrast options

2. USER CLICKS "Without Contrast"
   └─> modal-controller.ts: attachContrastListeners()
       └─> selection-flow.ts: setContrast('without')
       └─> modal-controller.ts: showRegionSelection('MRI', 'without')
           └─> region-renderer.ts: renderGroupedRegionSelection()
               └─> Returns: HTML with 16 body regions

3. USER CLICKS "Knee"
   └─> modal-controller.ts: attachRegionListeners()
       └─> selection-flow.ts: setRegion('Knee')
       └─> selection-flow.ts: resolve()
           └─> procedures-global.js: resolveProcedure('MRI', 'without', 'Knee')
               └─> Returns: { cpt_code: "73721", label: "MRI Lower Extremity (Joint) - Without Contrast", ... }
       └─> modal-controller.ts: handleProcedureSelection()
           └─> Updates form fields
           └─> Renders selected procedure
           └─> Closes modal
           └─> Transitions to Step 2 (Location)

4. USER ENTERS ZIP CODE
   └─> Form submits to /pbs/search
       └─> Search for imaging centers near ZIP
```

### Alternative Journey: Comprehensive Search
```
1. USER TYPES "knee"
   └─> modal-controller.ts: handleSearch()
       └─> modality-detector.ts: detectModality('knee')
           └─> Returns: null (not a modality)
       └─> search-engine.ts: searchAllProcedures('knee')
           └─> Searches MRI library → Finds 3 results
           └─> Searches CT library → Finds 0 results
           └─> Returns: [
                 { cpt: "73721", label: "MRI Lower Extremity (Joint) - Without Contrast", ... },
                 { cpt: "73722", label: "MRI Lower Extremity (Joint) - With Contrast", ... },
                 { cpt: "73723", label: "MRI Lower Extremity (Joint) - With & Without Contrast", ... }
               ]
       └─> search-results-renderer.ts: renderSearchResults()
           └─> Returns: HTML grouped by modality

2. USER CLICKS A RESULT
   └─> modal-controller.ts: attachResultListeners()
       └─> modal-controller.ts: handleDirectProcedureSelection()
           └─> Skips modality/contrast/region steps
           └─> Goes directly to Step 2

Current Capabilities
✅ Supported Modalities
ModalityRegionsProceduresContrast OptionsMRI16483 (Without/With/Both)CT16483 (Without/With/Both)Mammography1 (Breast)4N/ANuclear Medicine44N/APET33N/AX-Ray00N/A (Planned)Ultrasound00N/A (Planned)
✅ Current Features

Intelligent Search

Modality detection (30+ aliases)
Body part search
CPT code lookup
Fuzzy matching


Progressive Disclosure

Step 1: Select Procedure (modal)
Step 2: Enter Location (inline)
Clean, non-overwhelming UX


Visual Feedback

Loading states
Empty states
No results with suggestions
Smooth animations


Accessibility

ARIA labels
Keyboard navigation
Screen reader support


Mobile Responsive

Touch-optimized
Adaptive layouts
Gesture support




Adding New Modalities
📋 Step-by-Step Process
Based on the CPT reference sheets provided, here's how to add X-Ray, Ultrasound, and other modalities:

Example: Adding X-Ray Support
Step 1: Update procedures-global.js
Add X-Ray procedures to the data library:
javascript// In procedures-global.js

const XRAY_PROCEDURES = {
  chest: {
    category: "Chest",
    icon: "🫁",
    procedures: [
      {
        cpt: "71045",
        label: "X-Ray Chest - 1 View",
        shortLabel: "Chest - 1 View",
        description: "Single chest radiograph",
        duration: "5-10 min",
        prep: "Remove metal jewelry",
        useCase: "Quick chest screening"
      },
      {
        cpt: "71046",
        label: "X-Ray Chest - 2 Views",
        shortLabel: "Chest - 2 Views",
        description: "PA and lateral chest X-ray",
        duration: "5-10 min",
        prep: "Remove metal jewelry",
        useCase: "Standard chest X-ray, pneumonia, COVID"
      }
    ]
  },
  
  abdomen: {
    category: "Abdomen",
    icon: "🫁",
    procedures: [
      {
        cpt: "74018",
        label: "X-Ray Abdomen - KUB 1 View",
        shortLabel: "Abdomen - 1 View",
        description: "Kidneys, ureters, bladder",
        duration: "5-10 min",
        prep: "None",
        useCase: "Kidney stones, constipation"
      },
      {
        cpt: "74019",
        label: "X-Ray Abdomen - 2 Views",
        shortLabel: "Abdomen - 2 Views",
        description: "AP and additional view",
        duration: "5-10 min",
        prep: "None",
        useCase: "Abdominal pain, bowel obstruction"
      }
    ]
  },

  spine: {
    category: "Spine",
    icon: "🦴",
    procedures: [
      {
        cpt: "72040",
        label: "X-Ray Cervical Spine - < 4 Views",
        shortLabel: "C-Spine - < 4 Views",
        description: "Neck spine radiograph",
        duration: "10-15 min",
        prep: "None",
        useCase: "Neck pain, whiplash"
      },
      {
        cpt: "72050",
        label: "X-Ray Cervical Spine - 4-5 Views",
        shortLabel: "C-Spine - 4-5 Views",
        description: "Complete cervical spine series",
        duration: "10-15 min",
        prep: "None",
        useCase: "Comprehensive neck evaluation"
      },
      {
        cpt: "72100",
        label: "X-Ray Lumbar Spine - < 4 Views",
        shortLabel: "L-Spine - < 4 Views",
        description: "Lower back radiograph",
        duration: "10-15 min",
        prep: "None",
        useCase: "Lower back pain"
      },
      {
        cpt: "72110",
        label: "X-Ray Lumbar Spine - 4 Views",
        shortLabel: "L-Spine - 4 Views",
        description: "Complete lumbar series",
        duration: "10-15 min",
        prep: "None",
        useCase: "Comprehensive back evaluation"
      }
    ]
  },

  extremities: {
    category: "Extremities",
    icon: "🦴",
    procedures: [
      {
        cpt: "73560",
        label: "X-Ray Knee - 2 Views",
        shortLabel: "Knee - 2 Views",
        description: "AP and lateral knee",
        duration: "5-10 min",
        prep: "None",
        useCase: "Knee pain, injury"
      },
      {
        cpt: "73562",
        label: "X-Ray Knee - 3 Views",
        shortLabel: "Knee - 3 Views",
        description: "Complete knee series",
        duration: "5-10 min",
        prep: "None",
        useCase: "Comprehensive knee evaluation"
      },
      {
        cpt: "73030",
        label: "X-Ray Shoulder - 3 Views",
        shortLabel: "Shoulder - 3 Views",
        description: "Complete shoulder series",
        duration: "5-10 min",
        prep: "None",
        useCase: "Shoulder pain, injury"
      },
      {
        cpt: "73100",
        label: "X-Ray Wrist - 2 Views",
        shortLabel: "Wrist - 2 Views",
        description: "AP and lateral wrist",
        duration: "5-10 min",
        prep: "None",
        useCase: "Wrist pain, fracture"
      }
    ]
  }
};

// Add to main library
window.ProcedureLibrary = {
  MRI: MRI_PROCEDURES,
  CT: CT_PROCEDURES,
  'X-Ray': XRAY_PROCEDURES  // ← NEW
};
Step 2: Update modality-detector.ts
Add X-Ray aliases:
typescript// Already done! X-Ray aliases exist:
const MODALITY_ALIASES = {
  // ... existing ...
  'xray': 'X-Ray',
  'x-ray': 'X-Ray',
  'xra': 'X-Ray',
  'x-ra': 'X-Ray',
  'radiograph': 'X-Ray',
  // ... etc
};

// Add contrast config
const CONTRAST_CONFIG = {
  // ... existing ...
  'X-Ray': { 
    hasContrast: false  // X-Ray doesn't use IV contrast
  }
};
Step 3: Update search-engine.ts
Add X-Ray to search:
typescript// Already done! searchAllProcedures() automatically 
// searches all modalities in window.ProcedureLibrary
Step 4: Update region-renderer.ts
Add X-Ray regions:
typescriptconst REGION_BY_MODALITY: Record<string, Region[]> = {
  // ... existing MRI and CT ...
  
  'X-Ray': [
    { label: 'Chest', icon: '🫁' },
    { label: 'Abdomen', icon: '🫁' },
    { label: 'Cervical Spine (Neck)', icon: '🦴' },
    { label: 'Thoracic Spine (Mid Back)', icon: '🦴' },
    { label: 'Lumbar Spine (Low Back)', icon: '🦴' },
    { label: 'Shoulder', icon: '💪' },
    { label: 'Elbow', icon: '💪' },
    { label: 'Wrist / Hand', icon: '✋' },
    { label: 'Hip', icon: '🦴' },
    { label: 'Knee', icon: '🦵' },
    { label: 'Ankle / Foot', icon: '🦶' },
    { label: 'Skull', icon: '💀' },
    { label: 'Sinuses', icon: '👃' },
    { label: 'Pelvis', icon: '🦴' },
    { label: 'Ribs', icon: '🦴' }
  ]
};
```

#### Step 5: Test!
```
1. Type "x-ray" in search → Shows X-Ray regions
2. Type "chest x-ray" → Shows chest X-Ray procedures
3. Type "73560" (CPT) → Shows Knee X-Ray

🔄 Standardized Process for Any Modality
Template for adding new modalities:
javascript// 1. Define procedure structure
const [MODALITY]_PROCEDURES = {
  [region_key]: {
    category: "[Display Name]",
    icon: "[Emoji]",
    procedures: [
      {
        cpt: "[5-digit code]",
        label: "[Full procedure name]",
        shortLabel: "[Short display name]",
        description: "[What it evaluates]",
        duration: "[Time estimate]",
        prep: "[Preparation needed]",
        useCase: "[When to use]"
      }
    ]
  }
};

// 2. Add to main library
window.ProcedureLibrary.[MODALITY] = [MODALITY]_PROCEDURES;

// 3. Add aliases to modality-detector.ts
const MODALITY_ALIASES = {
  '[alias1]': '[MODALITY]',
  '[alias2]': '[MODALITY]'
};

// 4. Add contrast config
const CONTRAST_CONFIG = {
  '[MODALITY]': { hasContrast: [true|false] }
};

// 5. Add regions to region-renderer.ts
const REGION_BY_MODALITY = {
  '[MODALITY]': [{ label: '...', icon: '...' }]
};

📊 CPT Code Reference Integration
Based on the provided CPT sheets, here's the expansion plan:
Ultrasound (from URG0010_CPT_Chart_WEB.pdf)
Regions to Add:

Abdomen Complete (76700)
Abdomen Limited (76705)
Breast (76641/76642)
Pelvis Non-OB (76856/76857)
Pelvis Transvaginal (76830)
Thyroid/Neck (76536)
Renal (76770)
Testicular (76870)
Extremity Non-Vascular (76881/76882)
OB First Trimester (76801)
OB Second/Third Trimester (76805)

Total: ~11 regions, ~30 procedures
X-Ray (from cl-cpt-diag-rad-2025-rev-2_13_25.pdf)
Regions to Add:

Chest (71045/71046/71047)
Abdomen (74018/74019/74021)
Spine: Cervical (72040/72050), Thoracic (72070/72072), Lumbar (72100/72110)
Extremities: Shoulder (73030), Elbow (73070/73080), Wrist (73100/73110), Hand (73120/73130)
Lower: Hip (73501-73523), Knee (73560/73562), Ankle (73600/73610), Foot (73620/73630)
Skull/Face: Skull (70260), Sinuses (70210/70220), Facial Bones (70150)
Pelvis (72170/72190)
Ribs (71100/71101/71110)

Total: ~15 regions, ~60 procedures
Nuclear Medicine (from cpt-code-2024.pdf)
Already Partially Added:

Bone Scan (78306) ✅
Cardiac Stress Test (78452) ✅
Thyroid (78012/78014) ✅
Parathyroid (78070/78071) ✅

To Add:

Hepatobiliary/HIDA (78226/78227)
Liver/Spleen (78215)
Renal (78707/78708)
MUGA (78472)
Gallium Scan (78800)

Total: ~9 scan types
PET/CT (from cpt-code-2024.pdf)
Already Partially Added:

Whole Body (78815) ✅
Brain (78608) ✅
Cardiac (78459) ✅

To Add:

Specialized tracers:

PSMA (Prostate) - 78815
Neuroendocrine - 78815
Melanoma - 78816
Breast CA - 78815



Fluoroscopy (from CPT-Codes.pdf)
New Category:

Barium Enema (74270/74280)
Esophagus (74220)
Upper GI (74241/74245/74247)
Small Bowel (74250)
IVP (74400)

Total: ~5 procedures
DEXA Bone Density (from cpt-code-2024.pdf)
New Category:

Standard DEXA (77080)
DEXA with FRAX (77085)
DEXA with TBS (77089)


Visual Enhancements
🎨 Anatomical Body Diagrams
Based on the Mountain Medical body diagrams (see uploaded images), here's how to enhance the PPE with visual procedure selection:
Implementation Strategy
Step 1: Create SVG Body Diagram Component
typescript// New file: src/lib/procedures/ui/body-diagram-renderer.ts

export function renderInteractiveBodyDiagram(
  modality: Modality
): string {
  return `
    <div class="body-diagram-container">
      <!-- SVG body outline -->
      <svg viewBox="0 0 400 800" class="body-diagram">
        <!-- Head region -->
        <g id="region-head" class="clickable-region">
          <circle cx="200" cy="100" r="50" />
          <text x="200" y="105">🧠</text>
        </g>
        
        <!-- Chest region -->
        <g id="region-chest" class="clickable-region">
          <ellipse cx="200" cy="250" rx="80" ry="100" />
          <text x="200" y="255">🫁</text>
        </g>
        
        <!-- ... more regions -->
      </svg>
      
      <!-- Region labels -->
      <div class="region-labels">
        <button data-region="Brain">Brain</button>
        <button data-region="Chest">Chest</button>
        <!-- ... -->
      </div>
    </div>
  `;
}
Step 2: Add Interactive Hotspots
typescript// Features:
- Hover highlights region
- Click selects region
- Shows available procedures on hover
- Color-codes by procedure availability

Example:
- Green: All contrast options available
- Yellow: Limited contrast options
- Gray: Not available for this modality
Step 3: Integration Points
typescript// In modal-controller.ts

function showRegionSelection(modality, contrast) {
  // Option A: Replace region list with diagram
  const html = renderInteractiveBodyDiagram(modality);
  
  // Option B: Show both (tabs)
  const html = `
    <div class="region-selection-tabs">
      <button data-view="list">List View</button>
      <button data-view="diagram">Body Diagram</button>
    </div>
    <div id="list-view">${renderGroupedRegionSelection()}</div>
    <div id="diagram-view">${renderInteractiveBodyDiagram()}</div>
  `;
  
  modalResults.innerHTML = html;
  attachBodyDiagramListeners();
}
Visual Design Elements
1. Color Coding
css.region-available-all { fill: #10b981; } /* Green */
.region-available-limited { fill: #fbbf24; } /* Yellow */
.region-unavailable { fill: #d1d5db; } /* Gray */
.region-hover { fill: #3b82f6; stroke: #1e40af; } /* Blue highlight */
2. Animation
css.clickable-region {
  transition: all 0.2s ease;
  cursor: pointer;
}

.clickable-region:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}
3. Tooltip on Hover
html<div class="region-tooltip">
  <strong>Knee</strong><br>
  Available procedures:<br>
  • Without Contrast (73721)<br>
  • With Contrast (73722)<br>
  • Both (73723)
</div>
Procedure Preview Images
Step 4: Add Procedure Images
typescript// Procedure image library
const PROCEDURE_IMAGES = {
  'MRI': {
    'Brain': '/images/procedures/mri-brain.jpg',
    'Knee': '/images/procedures/mri-knee.jpg',
    // ...
  },
  'CT': {
    'Chest': '/images/procedures/ct-chest.jpg',
    // ...
  }
};

// In search-results-renderer.ts
function renderProcedureCard(procedure: SearchResult): string {
  const imageUrl = PROCEDURE_IMAGES[procedure.modality]?.[procedure.region];
  
  return `
    <div class="procedure-card-with-image">
      ${imageUrl ? `
        <img 
          src="${imageUrl}" 
          alt="${procedure.label}"
          class="procedure-preview-image"
        />
      ` : ''}
      <div class="procedure-details">
        <!-- existing card content -->
      </div>
    </div>
  `;
}
Educational Modality Icons
Step 5: Modality Comparison View
typescript// Show user what each modality does
export function renderModalityComparison(): string {
  return `
    <div class="modality-grid">
      <div class="modality-card">
        <img src="/images/modalities/mri-machine.jpg" />
        <h3>🧲 MRI</h3>
        <p>Best for: Soft tissue, brain, joints</p>
        <p>No radiation • Takes 30-60 min</p>
      </div>
      
      <div class="modality-card">
        <img src="/images/modalities/ct-machine.jpg" />
        <h3>⚡ CT Scan</h3>
        <p>Best for: Bones, chest, abdomen</p>
        <p>Quick scan • 5-15 min</p>
      </div>
      
      <div class="modality-card">
        <img src="/images/modalities/xray-machine.jpg" />
        <h3>📸 X-Ray</h3>
        <p>Best for: Bones, chest</p>
        <p>Fastest • 5-10 min</p>
      </div>
      
      <div class="modality-card">
        <img src="/images/modalities/ultrasound-machine.jpg" />
        <h3>📊 Ultrasound</h3>
        <p>Best for: Pregnancy, organs</p>
        <p>No radiation • Real-time</p>
      </div>
    </div>
  `;
}

Analytics & Reporting
📊 User Behavior Tracking
Implementation Strategy
Step 1: Create Analytics Module
typescript// New file: src/lib/procedures/analytics/analytics-tracker.ts

interface AnalyticsEvent {
  eventType: 'search' | 'selection' | 'navigation' | 'error';
  timestamp: Date;
  userId?: string;
  sessionId: string;
  data: Record<string, any>;
}

class PPEAnalytics {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  
  constructor() {
    this.sessionId = this.generateSessionId();
  }
  
  // Track search queries
  trackSearch(query: string, resultsCount: number): void {
    this.track({
      eventType: 'search',
      data: {
        query: query.toLowerCase(),
        resultsCount,
        queryLength: query.length,
        containsCPT: /^\d{5}$/.test(query)
      }
    });
  }
  
  // Track procedure selections
  trackSelection(procedure: ProcedureResolution, selectionMethod: string): void {
    this.track({
      eventType: 'selection',
      data: {
        cptCode: procedure.cpt_code,
        modality: procedure.modality,
        region: procedure.region,
        contrast: procedure.contrast,
        selectionMethod // 'direct_search' | 'guided_flow' | 'cpt_lookup'
      }
    });
  }
  
  // Track navigation paths
  trackNavigation(from: string, to: string): void {
    this.track({
      eventType: 'navigation',
      data: { from, to }
    });
  }
  
  // Track errors
  trackError(errorType: string, errorMessage: string): void {
    this.track({
      eventType: 'error',
      data: { errorType, errorMessage }
    });
  }
  
  private track(event: Partial<AnalyticsEvent>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
      sessionId: this.sessionId,
      eventType: event.eventType!,
      data: event.data || {}
    };
    
    this.events.push(fullEvent);
    
    // Send to backend
    this.sendToBackend(fullEvent);
    
    // Store in localStorage for offline support
    this.storeLocally(fullEvent);
  }
  
  private sendToBackend(event: AnalyticsEvent): void {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(err => console.error('Analytics error:', err));
  }
}

export const analytics = new PPEAnalytics();
Step 2: Integration Points
typescript// In modal-controller.ts

function performSearch(query: string): void {
  const results = searchAllProcedures(query);
  
  // Track search
  analytics.trackSearch(query, results.length);
  
  // ... rest of search logic
}

function handleProcedureSelection(procedure: any): void {
  // Track selection
  analytics.trackSelection(procedure, 'guided_flow');
  
  // ... rest of selection logic
}

function handleDirectProcedureSelection(cptCode: string, label: string): void {
  // Track direct selection
  analytics.trackSelection({ cpt_code: cptCode, ... }, 'direct_search');
  
  // ... rest of selection logic
}
Key Metrics to Track
Search Behavior:

Most searched terms
Search query length distribution
Zero-result searches
CPT code searches vs. natural language
Search abandonment rate

Selection Patterns:

Most selected procedures (by CPT)
Most selected modalities
Most selected body regions
Selection method distribution (guided vs. direct)
Average time to selection

User Journey:

Modal open rate
Steps to completion
Back button usage
Search refinements
Drop-off points

Performance:

Search response time
Modal load time
Time to first interaction
Session duration


📈 Analytics Dashboard
Dashboard Components
1. Real-Time Metrics
typescript// Dashboard shows:
- Active sessions now
- Searches in last hour
- Selections in last hour
- Average time to selection
2. Search Analytics
typescript// Top searches widget
interface SearchAnalytics {
  topSearchTerms: Array<{
    term: string;
    count: number;
    avgResultsCount: number;
  }>;
  
  zeroResultSearches: Array<{
    term: string;
    count: number;
  }>;
  
  searchTrends: Array<{
    date: string;
    searchCount: number;
  }>;
}
3. Procedure Popularity
typescript// Most selected procedures
interface ProcedurePopularity {
  topProcedures: Array<{
    cptCode: string;
    label: string;
    count: number;
    percentage: number;
  }>;
  
  modalityDistribution: Record<Modality, number>;
  
  regionDistribution: Record<string, number>;
}
```

**4. User Journey Funnel**
```
Modal Opened: 1000 (100%)
  ↓
Searched: 950 (95%)
  ↓
Viewed Results: 920 (92%)
  ↓
Selected Procedure: 850 (85%)
  ↓
Completed to Step 2: 800 (80%)
  ↓
Submitted Form: 750 (75%)
5. Performance Metrics
typescriptinterface PerformanceMetrics {
  avgSearchTime: number; // ms
  avgModalLoadTime: number; // ms
  avgTimeToSelection: number; // seconds
  
  slowSearches: Array<{
    query: string;
    duration: number;
  }>;
}
```

#### Reports

**Weekly Summary Report**
```
PPE Weekly Summary (Jan 1-7, 2025)

📊 Overview:
- Total Searches: 5,240 (+12% vs. last week)
- Total Selections: 4,180 (+8% vs. last week)
- Conversion Rate: 79.8% (-3.2% vs. last week)

🔍 Top Searches:
1. "mri knee" - 1,240 searches
2. "ct scan" - 890 searches
3. "x-ray chest" - 650 searches

🏆 Most Selected Procedures:
1. MRI Knee Without Contrast (73721) - 980 selections
2. CT Chest With Contrast (71260) - 720 selections
3. X-Ray Chest 2 Views (71046) - 540 selections

⚠️ Issues:
- 124 searches with zero results
- Top zero-result: "full body scan"
- Avg time to selection increased by 5 seconds

💡 Recommendations:
- Add synonym for "full body scan" → "PET Scan"
- Consider adding quick links for top 5 procedures
- Optimize search for body part + modality queries
```

---

## Future Development Roadmap

### 🎯 Short-Term Enhancements (0-3 months)

#### 1. Complete Modality Coverage
**Priority:** High  
**Effort:** Medium

- Add X-Ray (60 procedures)
- Add Ultrasound (30 procedures)
- Add remaining Nuclear Medicine procedures (5 procedures)
- Add Fluoroscopy (5 procedures)

**Estimated Total:** +100 procedures

#### 2. Visual Body Diagram
**Priority:** High  
**Effort:** High

- Create interactive SVG body diagrams
- Add hover tooltips
- Color-code by availability
- Responsive mobile version

#### 3. Analytics Implementation
**Priority:** High  
**Effort:** Medium

- Implement analytics tracker
- Create backend API endpoint
- Build basic dashboard
- Set up automated reports

#### 4. Search Enhancements
**Priority:** Medium  
**Effort:** Low

- Add "Did you mean?" suggestions
- Implement search history
- Add popular searches widget
- Improve synonym matching

---

### 🚀 Mid-Term Features (3-6 months)

#### 5. Procedure Comparison Tool
**Priority:** Medium  
**Effort:** Medium

Allow users to compare procedures side-by-side:
```
MRI Knee vs. X-Ray Knee

| Feature | MRI | X-Ray |
|---------|-----|-------|
| Radiation | None | Minimal |
| Duration | 45 min | 10 min |
| Cost | $$$$ | $ |
| Best For | Soft tissue | Bones |
6. Price Transparency
Priority: High
Effort: High

Add pricing data to procedure library
Show estimated costs
Compare facility prices
Insurance coverage indicators

7. Appointment Scheduling
Priority: High
Effort: High

Integrate with facility calendars
Show available time slots
Allow direct booking
Send appointment confirmations

8. Multi-Language Support
Priority: Medium
Effort: Medium

Spanish translation
Interface localization
CPT descriptions in multiple languages


🌟 Long-Term Vision (6-12 months)
9. AI-Powered Procedure Recommendations
Priority: High
Effort: Very High
typescript// Example: Symptom-based recommendations
User: "I have knee pain when walking"
AI: "Based on your symptoms, you may need:
     1. X-Ray Knee (rule out fracture)
     2. MRI Knee (evaluate soft tissue)
     Consider starting with X-Ray if pain is recent."
10. Integration with Electronic Health Records (EHR)
Priority: High
Effort: Very High

Pull patient history
Show prior imaging
Prefill forms with patient data
Send orders to PACS

11. Telehealth Consultation
Priority: Medium
Effort: Very High

Video consultation before imaging
Radiologist review scheduling
Results discussion appointments

12. Mobile App
Priority: Medium
Effort: Very High

Native iOS/Android apps
Push notifications for appointments
Mobile-optimized experience
Offline procedure browsing


Developer Onboarding
🎓 New Developer Checklist
Week 1: Understanding the System

 Clone repository
 Read this documentation (all sections)
 Review Phase 1, 2, 3 completion docs
 Run test suites
 Explore code in VS Code

Week 2: Making Your First Change

 Add one new X-Ray procedure
 Test in browser
 Submit PR with tests
 Review with senior developer

Week 3: Feature Development

 Pick a task from roadmap
 Create feature branch
 Implement with tests
 Submit PR


🛠️ Development Workflow
Local Development
bash# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
# http://localhost:4321

# 4. Make changes
# Changes auto-reload via Vite HMR

# 5. Run tests
npm test

# 6. Commit changes
git add .
git commit -m "feat: add X-Ray chest procedures"
git push origin feature/xray-procedures
Testing Strategy
typescript// Unit tests for each module
describe('modality-detector', () => {
  test('detects MRI correctly', () => {
    expect(detectModality('mri')).toBe('MRI');
  });
});

// Integration tests
describe('full procedure selection', () => {
  test('MRI knee without contrast', () => {
    const flow = new SelectionFlow();
    flow.setModality('MRI');
    flow.setContrast('without');
    flow.setRegion('Knee');
    const result = flow.resolve();
    expect(result.cpt_code).toBe('73721');
  });
});

// E2E tests
describe('user journey', () => {
  test('search and select procedure', async () => {
    await page.goto('/');
    await page.click('#hero-procedure-search');
    await page.type('#modal-search-input', 'mri knee');
    // ... continue testing flow
  });
});

📚 Key Resources
Documentation:

PHASE_1_COMPLETE.md - Business logic
PHASE_2_COMPLETE.md - UI rendering
PHASE_3_COMPLETE.md - Orchestration

Code Style:

TypeScript strict mode
Functional components
ESLint + Prettier
100% JSDoc comments

Git Workflow:

Feature branches from main
Conventional commits (feat:, fix:, docs:)
PR reviews required
Squash and merge


🐛 Common Issues & Solutions
Issue: Modal doesn't open
typescript// Solution: Check if ProcedureLibrary loaded
console.log(window.ProcedureLibrary); // Should be object

// If null, check procedures-global.js is loaded
// in HeroSection.astro BEFORE modal-controller.ts
Issue: Search returns no results
typescript// Solution: Verify procedure exists in library
console.log(window.ProcedureLibrary.MRI.knee);

// Check if region key matches
// Use normalizeRegionKey() to see mapping
Issue: CPT resolution fails
typescript// Solution: Check redirect handling
// Some regions like "Knee" redirect to "lowerExtremityJoint"
// Verify redirectTo property exists in procedure library

Conclusion
The Patient Procedure Engine represents a best-in-class medical imaging search system with:
✅ Clean Architecture - 9 focused modules
✅ Type Safety - 100% TypeScript coverage
✅ Testability - Comprehensive test suites
✅ Scalability - Easy to add modalities
✅ User Experience - Intelligent, intuitive interface
✅ Performance - Optimized, tree-shakeable code
Next Steps:

Complete remaining modalities (X-Ray, Ultrasound)
Implement analytics dashboard
Add visual body diagrams
Expand to pricing and scheduling

This system is production-ready and positioned for continuous enhancement to serve thousands of patients searching for medical imaging procedures.

Document Version: 1.0
Last Updated: November 4, 2025
Maintained By: Development Team
Questions? Contact: dev-team@usradiology.com

This documentation is a living document and should be updated with each major feature release.