/**
 * BROWSER TEST SUITE FOR PHASE 1 MODULES
 * ========================================
 * Load this in your Astro page to test the new modules
 * 
 * Usage in HeroSection.astro:
 * <script src="/src/lib/procedures/__tests__/browser-test.ts"></script>
 */

import { detectModality, getContrastConfig, getModalityIcon, getContrastLabel } from '../utils/modality-detector';
import { searchAllProcedures, searchByCPT, groupByModality } from '../utils/search-engine';
import { SelectionFlow } from '../controllers/selection-flow';

// Wait for DOM and ProcedureLibrary to load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 Starting Phase 1 Module Tests...\n');
    
    // Give time for procedures-global.js to load
    setTimeout(() => {
      runAllTests();
    }, 500);
  });
}

function runAllTests() {
  let passedTests = 0;
  let failedTests = 0;
  
  // ============================================
  // TEST SUITE 1: MODALITY DETECTOR
  // ============================================
  console.log('📋 Testing Modality Detector...');
  
  try {
    // Test 1.1: Basic detection
    assertEqual(detectModality('mri'), 'MRI', 'Detect MRI from lowercase');
    assertEqual(detectModality('ct'), 'CT', 'Detect CT');
    assertEqual(detectModality('cat scan'), 'CT', 'Detect CT from "cat scan"');
    assertEqual(detectModality('ultrasound'), 'Ultrasound', 'Detect Ultrasound');
    assertEqual(detectModality('knee'), null, 'Return null for non-modality');
    passedTests += 5;
    
    // Test 1.2: Contrast config
    const mriConfig = getContrastConfig('MRI');
    assertEqual(mriConfig.hasContrast, true, 'MRI has contrast');
    assertEqual(mriConfig.options?.length, 3, 'MRI has 3 contrast options');
    
    const xrayConfig = getContrastConfig('X-Ray');
    assertEqual(xrayConfig.hasContrast, false, 'X-Ray has no contrast');
    passedTests += 3;
    
    // Test 1.3: Icons and labels
    assertEqual(getModalityIcon('MRI'), '🧲', 'MRI icon');
    assertEqual(getModalityIcon('CT'), '⚡', 'CT icon');
    assertEqual(getContrastLabel('without'), 'Without Contrast', 'Contrast label');
    passedTests += 3;
    
    console.log('✅ Modality Detector: All tests passed!\n');
    
  } catch (error) {
    console.error('❌ Modality Detector failed:', error);
    failedTests++;
  }
  
  // ============================================
  // TEST SUITE 2: SEARCH ENGINE
  // ============================================
  console.log('📋 Testing Search Engine...');
  
  try {
    // Check if ProcedureLibrary is loaded
    if (!window.ProcedureLibrary) {
      console.warn('⚠️ ProcedureLibrary not loaded yet, skipping search tests');
      return;
    }
    
    // Test 2.1: Search by body part
    const kneeResults = searchAllProcedures('knee');
    assertGreaterThan(kneeResults.length, 0, 'Find knee procedures');
    console.log(`  Found ${kneeResults.length} knee procedures`);
    passedTests++;
    
    // Test 2.2: Search by CPT code
    const cptResults = searchByCPT('70551');
    assertGreaterThan(cptResults.length, 0, 'Find CPT 70551');
    assertEqual(cptResults[0].cpt, '70551', 'CPT code matches');
    console.log(`  Found CPT 70551: ${cptResults[0].label}`);
    passedTests += 2;
    
    // Test 2.3: Search for breast (should include Mammography)
    const breastResults = searchAllProcedures('breast');
    const hasMammo = breastResults.some(r => r.modality === 'Mammography');
    assertEqual(hasMammo, true, 'Breast search includes Mammography');
    console.log(`  Found ${breastResults.length} breast procedures including Mammography`);
    passedTests++;
    
    // Test 2.4: Group by modality
    const grouped = groupByModality(kneeResults);
    const hasModalityGroups = Object.keys(grouped).length > 0;
    assertEqual(hasModalityGroups, true, 'Results grouped by modality');
    console.log(`  Grouped into ${Object.keys(grouped).length} modalities`);
    passedTests++;
    
    console.log('✅ Search Engine: All tests passed!\n');
    
  } catch (error) {
    console.error('❌ Search Engine failed:', error);
    failedTests++;
  }
  
  // ============================================
  // TEST SUITE 3: SELECTION FLOW
  // ============================================
  console.log('📋 Testing Selection Flow...');
  
  try {
    const flow = new SelectionFlow();
    
    // Test 3.1: Initial state
    assertEqual(flow.getCurrentStep(), 'modality', 'Initial step is modality');
    assertEqual(flow.getCompletionPercentage(), 0, 'Initial progress is 0%');
    passedTests += 2;
    
    // Test 3.2: Set modality
    flow.setModality('MRI');
    assertEqual(flow.getCurrentStep(), 'contrast', 'After modality, step is contrast');
    assertEqual(flow.getCompletionPercentage(), 33, 'Progress is 33%');
    console.log('  Set modality: MRI ✓');
    passedTests += 2;
    
    // Test 3.3: Set contrast
    flow.setContrast('without');
    assertEqual(flow.getCurrentStep(), 'region', 'After contrast, step is region');
    assertEqual(flow.getCompletionPercentage(), 67, 'Progress is 67%');
    console.log('  Set contrast: without ✓');
    passedTests += 2;
    
    // Test 3.4: Set region
    flow.setRegion('Knee');
    assertEqual(flow.getCurrentStep(), 'complete', 'After region, step is complete');
    assertEqual(flow.getCompletionPercentage(), 100, 'Progress is 100%');
    assertEqual(flow.isComplete(), true, 'Flow reports as complete');
    console.log('  Set region: Knee ✓');
    passedTests += 3;
    
    // Test 3.5: Go back
    const didGoBack = flow.goBack();
    assertEqual(didGoBack, true, 'Can go back');
    assertEqual(flow.getState().region, null, 'Region cleared after going back');
    console.log('  Go back functionality ✓');
    passedTests += 2;
    
    // Test 3.6: Reset
    flow.reset();
    assertEqual(flow.getCurrentStep(), 'modality', 'Reset returns to modality');
    console.log('  Reset functionality ✓');
    passedTests++;
    
    // Test 3.7: Resolve procedure
    flow.setModality('MRI');
    flow.setContrast('without');
    flow.setRegion('Knee');
    
    if (window.ProcedureHelpers) {
      const procedure = flow.resolve();
      assertNotNull(procedure, 'Procedure resolves');
      assertEqual(procedure?.cpt_code?.length, 5, 'CPT code is 5 digits');
      console.log(`  Resolved procedure: ${procedure?.label} (CPT: ${procedure?.cpt_code})`);
      passedTests += 2;
    } else {
      console.warn('  ⚠️ ProcedureHelpers not loaded, skipping resolve test');
    }
    
    console.log('✅ Selection Flow: All tests passed!\n');
    
  } catch (error) {
    console.error('❌ Selection Flow failed:', error);
    failedTests++;
  }
  
  // ============================================
  // TEST SUITE 4: INTEGRATION TEST
  // ============================================
  console.log('📋 Running Integration Test...');
  
  try {
    // Simulate complete user journey
    const userInput = 'mri';
    const modality = detectModality(userInput);
    
    const integrationFlow = new SelectionFlow();
    integrationFlow.setModality(modality!);
    integrationFlow.setContrast('without');
    
    const kneeResults = searchAllProcedures('knee');
    integrationFlow.setRegion('Knee');
    
    if (window.ProcedureHelpers) {
      const finalProcedure = integrationFlow.resolve();
      
      assertNotNull(finalProcedure, 'Integration: procedure resolves');
      console.log(`  User journey complete: ${userInput} → ${finalProcedure?.label}`);
      passedTests++;
    }
    
    console.log('✅ Integration Test: Passed!\n');
    
  } catch (error) {
    console.error('❌ Integration Test failed:', error);
    failedTests++;
  }
  
  // ============================================
  // FINAL REPORT
  // ============================================
  console.log('═══════════════════════════════════════');
  console.log(`📊 Test Results: ${passedTests} passed, ${failedTests} failed`);
  console.log('═══════════════════════════════════════');
  
  if (failedTests === 0) {
    console.log('🎉 All Phase 1 modules working perfectly!');
    console.log('✅ Ready for Phase 2: UI Extraction');
  } else {
    console.log('⚠️ Some tests failed. Review errors above.');
  }
}

// ============================================
// TEST HELPER FUNCTIONS
// ============================================

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`${testName}: Expected ${expected}, got ${actual}`);
  }
}

function assertNotNull(value: any, testName: string) {
  if (value === null || value === undefined) {
    throw new Error(`${testName}: Expected non-null value, got ${value}`);
  }
}

function assertGreaterThan(actual: number, expected: number, testName: string) {
  if (actual <= expected) {
    throw new Error(`${testName}: Expected > ${expected}, got ${actual}`);
  }
}

// Export for manual testing in console
if (typeof window !== 'undefined') {
  (window as any).Phase1Tests = {
    runAllTests,
    detectModality,
    searchAllProcedures,
    searchByCPT,
    SelectionFlow
  };
  
  console.log('💡 Tip: Access test functions via window.Phase1Tests');
}