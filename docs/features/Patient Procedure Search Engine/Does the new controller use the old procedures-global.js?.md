nov 4, 2025

does the new PPE use the old /public/js/procedures-global.js file anymore?

Great Question! 🎯
Short Answer: YES ✅
The new PPE still uses the old procedures-global.js file, but only as a data source.

What Changed vs. What Stayed
What CHANGED ❌
Old monolithic controller (hero-form-controller-modal.js - 2,553 lines) → DELETED
Business logic is now in TypeScript modules (Phase 1)
UI rendering is now in TypeScript modules (Phase 2)
Orchestration is now in TypeScript (Phase 3)
What STAYED ✅
procedures-global.js → STILL USED as the procedure data library
window.ProcedureLibrary → Still provides CPT codes and procedure definitions
window.ProcedureHelpers → Still provides resolution utilities
Why We Kept procedures-global.js
Reason 1: It's Pure Data
javascript
// procedures-global.js is essentially a JSON database
window.ProcedureLibrary = {
  MRI: { /* 48 procedures */ },
  CT: { /* 48 procedures */ }
};
This is good separation:

Data stays in JavaScript (easy to edit)
Logic stays in TypeScript (type-safe, testable)
Reason 2: No Breaking Changes
The refactor was 100% non-breaking. By keeping the data layer untouched, we ensured:

Same CPT codes
Same procedure structure
Same resolution logic
Reason 3: Easy to Update
Medical staff can update CPT codes in procedures-global.js without touching TypeScript:

javascript
// Just edit this file - no compilation needed
procedures: [
  {
    cpt: "70551",
    label: "MRI Brain - Without Contrast",
    // ... easy to update
  }
]
How the New PPE Uses It
Loading Order (in HeroSection.astro)
astro
<!-- 1️⃣ Load data library FIRST -->
<script is:inline src="/js/procedures-global.js"></script>

<!-- 2️⃣ Then load new TypeScript controller -->
<script>
  import '@/lib/procedures/controllers/modal-controller.ts';
</script>
TypeScript Modules Access It
typescript
// In search-engine.ts
export function searchAllProcedures(query: string): SearchResult[] {
  const mriLibrary = window.ProcedureLibrary?.MRI;  // ← Accesses the old file
  const ctLibrary = window.ProcedureLibrary?.CT;    // ← Accesses the old file
  
  // ... search logic
}

// In selection-flow.ts
resolve(): ProcedureResolution | null {
  return window.ProcedureHelpers.resolveProcedure(  // ← Uses old helper
    this.state.modality,
    this.state.contrast,
    this.state.region
  );
}
Future: Migrate to TypeScript? 🤔
Option A: Keep as-is (Recommended for now)
Pros:

Works perfectly
Easy for non-developers to update
No migration risk
Clear separation of data and logic
Cons:

No type safety for procedure data
Can't tree-shake unused procedures
Option B: Migrate to TypeScript
Pros:

Full type safety
Better tree-shaking
Can validate CPT codes at build time
Cons:

Requires migration effort
Medical staff needs TypeScript knowledge
Must rebuild after CPT changes
Recommended Approach: Hybrid 🎯
Best of both worlds:

Keep procedures-global.js for now as the source of truth
Create a TypeScript interface to ensure type safety:
typescript
// src/lib/procedures/types/procedure-library.d.ts

declare global {
  interface Window {
    ProcedureLibrary: {
      MRI: Record<string, ProcedureCategory>;
      CT: Record<string, ProcedureCategory>;
      // Add more as needed
    };
    
    ProcedureHelpers: {
      resolveProcedure(
        modality: string,
        contrast: string,
        region: string
      ): ProcedureResolution | null;
      
      normalizeRegionKey(region: string, modality?: string): string | null;
      // ... other methods
    };
  }
  
  interface ProcedureCategory {
    category: string;
    icon: string;
    procedures: Procedure[];
    redirectTo?: string;
    includes?: string;
    contrastAvailability?: string[];
  }
  
  interface Procedure {
    cpt: string;
    label: string;
    shortLabel: string;
    description: string;
    duration: string;
    prep: string;
    useCase: string;
  }
}

export {};
Eventually migrate when you add 100+ new procedures:
typescript
// Future: src/lib/procedures/data/procedure-library.ts

export const MRI_PROCEDURES: Record<string, ProcedureCategory> = {
  brain: {
    category: "Brain",
    icon: "🧠",
    procedures: [
      {
        cpt: "70551",
        label: "MRI Brain - Without Contrast",
        // ... TypeScript auto-complete here!
      }
    ]
  }
};
Summary
Aspect	Status
Still uses procedures-global.js?	✅ YES
Loaded in HeroSection.astro?	✅ YES
Accessed by TypeScript modules?	✅ YES
Will break if removed?	❌ YES (would break everything)
Should we migrate it?	🤔 Eventually, but not urgent
Action Items
Immediate (Now)
 Keep using procedures-global.js as-is
 Document the dependency clearly (this doc!)
 Add TypeScript declaration file for type safety (optional)
Short-term (Next 3 months)
 Add type checking for procedure data
 Validate CPT codes at build time
 Create migration plan document
Long-term (Next 6-12 months)
 Migrate to TypeScript when adding 100+ procedures
 Build CPT code editor UI for medical staff
 Consider database backend for procedures
TL;DR: Yes, the new PPE still uses procedures-global.js and will continue to do so. It's a good design decision that separates data from logic. Don't delete it! 🚨