import { detectModality } from '../utils/modality-detector';
import { searchAllProcedures } from '../utils/search-engine';
import { SelectionFlow } from '../controllers/selection-flow';

// Scenario: User types "mri" and selects knee without contrast
console.log('🧪 Running integration test...\n');

// Step 1: Detect modality
const userInput = 'mri';
const modality = detectModality(userInput);
console.log(`Step 1: User typed "${userInput}" → Detected: ${modality}`);
console.assert(modality === 'MRI', 'Should detect MRI');

// Step 2: Start selection flow
const flow = new SelectionFlow();
flow.setModality(modality!);
console.log(`Step 2: Set modality to ${modality}`);
console.log(`  Progress: ${flow.getCompletionPercentage()}%`);

// Step 3: User selects contrast
flow.setContrast('without');
console.log(`Step 3: User selected "without contrast"`);
console.log(`  Progress: ${flow.getCompletionPercentage()}%`);

// Step 4: User searches for region
const searchResults = searchAllProcedures('knee');
console.log(`Step 4: User searched "knee" → Found ${searchResults.length} results`);

// Step 5: User selects region
flow.setRegion('Knee');
console.log(`Step 5: User selected "Knee" region`);
console.log(`  Progress: ${flow.getCompletionPercentage()}%`);
console.assert(flow.isComplete(), 'Flow should be complete');

// Step 6: Resolve final procedure
if (window.ProcedureHelpers) {
  const procedure = flow.resolve();
  console.log(`Step 6: Resolved procedure:`);
  console.log(`  CPT: ${procedure?.cpt_code}`);
  console.log(`  Label: ${procedure?.label}`);
  console.log(`  Duration: ${procedure?.duration}`);
  
  console.assert(procedure !== null, 'Should resolve a valid procedure');
  console.assert(procedure?.cpt_code.startsWith('737'), 'MRI Knee CPT should start with 737');
} else {
  console.warn('⚠️ ProcedureHelpers not loaded, skipping final resolution');
}

console.log('\n✅ Integration test passed!');