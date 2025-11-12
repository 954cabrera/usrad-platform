#!/bin/bash
# system-detection-audit.sh
# Determines if PPE (Patient Procedure Engine) is still active or deprecated

echo "============================================================"
echo "SYSTEM DETECTION AUDIT"
echo "Determining if PPE is still active in your application"
echo "============================================================"
echo ""

PPE_ACTIVE=0

echo "1️⃣  Finding pages that use ProcedureSearchModal..."
echo "-----------------------------------------------------------"
MODAL_PAGES=$(find src/pages -name "*.astro" -exec grep -l "ProcedureSearchModal" {} \; 2>/dev/null)
if [ -z "$MODAL_PAGES" ]; then
    echo "✅ No pages use ProcedureSearchModal"
else
    echo "⚠️  Found pages using ProcedureSearchModal:"
    echo "$MODAL_PAGES"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "2️⃣  Finding pages that use CarbonLayout..."
echo "-----------------------------------------------------------"
CARBON_PAGES=$(find src/pages -name "*.astro" -exec grep -l "CarbonLayout" {} \; 2>/dev/null)
if [ -z "$CARBON_PAGES" ]; then
    echo "✅ No pages use CarbonLayout"
else
    echo "⚠️  Found pages using CarbonLayout:"
    echo "$CARBON_PAGES"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "3️⃣  Finding where modal-controller is initialized..."
echo "-----------------------------------------------------------"
MODAL_INIT=$(grep -r "initializeSlimController\|modal-controller" --include="*.astro" --include="*.html" src/ 2>/dev/null | head -10)
if [ -z "$MODAL_INIT" ]; then
    echo "✅ modal-controller not initialized anywhere"
else
    echo "⚠️  Found modal-controller initialization:"
    echo "$MODAL_INIT"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "4️⃣  Finding modal trigger buttons..."
echo "-----------------------------------------------------------"
MODAL_TRIGGERS=$(grep -r "hero-procedure-search\|data-modal-open\|openProcedureModal" --include="*.astro" src/pages 2>/dev/null | head -10)
if [ -z "$MODAL_TRIGGERS" ]; then
    echo "✅ No modal trigger buttons found"
else
    echo "⚠️  Found modal trigger buttons:"
    echo "$MODAL_TRIGGERS"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "5️⃣  Checking if PPE TypeScript modules are imported..."
echo "-----------------------------------------------------------"
PPE_IMPORTS=$(grep -r "from.*selection-flow\|from.*modal-controller\|from.*search-engine" --include="*.astro" --include="*.ts" src/ 2>/dev/null | grep -v "__tests__" | grep -v "node_modules" | head -10)
if [ -z "$PPE_IMPORTS" ]; then
    echo "✅ No PPE module imports found in production code"
else
    echo "⚠️  Found PPE module imports:"
    echo "$PPE_IMPORTS"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "6️⃣  Checking for X-Ray view rendering (uses ProcedureHelpers)..."
echo "-----------------------------------------------------------"
XRAY_USAGE=$(grep -r "getViewOptions\|viewOptions" --include="*.astro" --include="*.ts" src/lib 2>/dev/null | grep -v "__tests__" | head -5)
if [ -z "$XRAY_USAGE" ]; then
    echo "✅ No X-Ray view rendering found"
else
    echo "⚠️  Found X-Ray view rendering (needs ProcedureHelpers):"
    echo "$XRAY_USAGE"
    PPE_ACTIVE=$((PPE_ACTIVE + 1))
fi
echo ""

echo "7️⃣  Checking where procedures-global.js is loaded..."
echo "-----------------------------------------------------------"
GLOBAL_LOADS=$(grep -r '<script.*procedures-global' --include="*.astro" --include="*.html" src/ public/ 2>/dev/null)
echo "Found in:"
echo "$GLOBAL_LOADS"
echo ""

echo "8️⃣  Checking HeroSection usage..."
echo "-----------------------------------------------------------"
HERO_USAGE=$(grep -r "HeroSection" --include="*.astro" src/pages 2>/dev/null)
if [ -z "$HERO_USAGE" ]; then
    echo "⚠️  HeroSection not found in pages!"
else
    echo "✅ HeroSection is being used:"
    echo "$HERO_USAGE"
fi
echo ""

echo "============================================================"
echo "AUDIT RESULTS"
echo "============================================================"
echo ""
echo "PPE Activity Score: $PPE_ACTIVE / 6"
echo ""

if [ $PPE_ACTIVE -eq 0 ]; then
    echo "✅ ✅ ✅  VERDICT: PPE IS DEPRECATED"
    echo ""
    echo "Evidence:"
    echo "- No pages use ProcedureSearchModal"
    echo "- No pages use CarbonLayout"
    echo "- No modal initialization found"
    echo "- No modal triggers found"
    echo "- No PPE module imports in production code"
    echo "- No X-Ray rendering (which needs ProcedureHelpers)"
    echo ""
    echo "RECOMMENDATION:"
    echo "✅ Safe to do MINIMAL refactoring"
    echo "✅ Only need to preserve window.ProcedureLibrary (data)"
    echo "✅ Can remove window.ProcedureHelpers (not used)"
    echo "✅ Can delete all TypeScript PPE modules"
    echo "✅ Only update HeroSection.astro"
    echo ""
    echo "Refactoring Strategy: SIMPLE"
    echo "1. Extract data to procedure-data.js"
    echo "2. Update HeroSection to import it"
    echo "3. Delete helper functions"
    echo "4. Delete all TypeScript modules"
    echo "5. Update admin tools"
    echo ""
elif [ $PPE_ACTIVE -le 2 ]; then
    echo "⚠️  ⚠️  VERDICT: PPE IS PARTIALLY ACTIVE"
    echo ""
    echo "Evidence:"
    echo "- Some PPE components are still referenced"
    echo "- System is in transition state"
    echo ""
    echo "RECOMMENDATION:"
    echo "⚠️  MODERATE risk refactoring"
    echo "⚠️  Must preserve window.ProcedureHelpers"
    echo "⚠️  Check which components are actually used"
    echo ""
    echo "Refactoring Strategy: CONSERVATIVE"
    echo "1. Extract data to procedure-data.js"
    echo "2. Extract helpers to procedure-helpers.js"
    echo "3. Keep both window.ProcedureLibrary and window.ProcedureHelpers"
    echo "4. Update incrementally"
    echo "5. Test thoroughly"
    echo ""
else
    echo "🚨 🚨 🚨  VERDICT: PPE IS FULLY ACTIVE"
    echo ""
    echo "Evidence:"
    echo "- Multiple PPE components are in use"
    echo "- Modal system is active"
    echo "- TypeScript modules are imported"
    echo ""
    echo "RECOMMENDATION:"
    echo "🚨 HIGH risk if you break ProcedureHelpers"
    echo "🚨 Must preserve entire PPE architecture"
    echo "🚨 Cannot delete any TypeScript modules"
    echo ""
    echo "Refactoring Strategy: PHASED APPROACH (like ChatGPT suggested)"
    echo "1. Phase 1: Extract helper functions to separate file"
    echo "2. Phase 2: Extract data to separate file"
    echo "3. Phase 3: Add TypeScript types"
    echo "4. Phase 4: Create module exports"
    echo "5. Phase 5: Gradually migrate away from window globals"
    echo ""
    echo "DO NOT:"
    echo "❌ Remove window.ProcedureHelpers (critical)"
    echo "❌ Delete any TypeScript modules"
    echo "❌ Change data structure format"
    echo ""
fi

echo "============================================================"
echo "NEXT STEPS"
echo "============================================================"
echo ""
echo "1. Review the findings above"
echo "2. Check the specific files mentioned"
echo "3. Decide if PPE is truly needed or can be deprecated"
echo "4. Choose appropriate refactoring strategy"
echo "5. Run backup before making any changes"
echo ""
echo "Save this output for reference:"
echo "  ./system-detection-audit.sh > audit-results.txt"
echo ""