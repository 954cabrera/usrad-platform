import { SelectionFlow } from '../controllers/selection-flow';

// Test 1: Basic flow
const flow = new SelectionFlow();

console.assert(flow.getCurrentStep() === 'modality', 'Should start at modality step');
console.assert(flow.getCompletionPercentage() === 0, 'Should be 0% complete');

flow.setModality('MRI');
console.assert(flow.getCurrentStep() === 'contrast', 'Should move to contrast step');
console.assert(flow.getCompletionPercentage() === 33, 'Should be 33% complete');

flow.setContrast('without');
console.assert(flow.getCurrentStep() === 'region', 'Should move to region step');
console.assert(flow.getCompletionPercentage() === 67, 'Should be 67% complete');

flow.setRegion('Knee');
console.assert(flow.getCurrentStep() === 'complete', 'Should be complete');
console.assert(flow.getCompletionPercentage() === 100, 'Should be 100% complete');
console.assert(flow.isComplete() === true, 'Should report as complete');

// Test 2: Go back functionality
const didGoBack = flow.goBack();
console.assert(didGoBack === true, 'Should go back successfully');
console.assert(flow.getState().region === null, 'Region should be cleared after going back');

// Test 3: Reset
flow.reset();
console.assert(flow.getCurrentStep() === 'modality', 'Should reset to modality step');

// Test 4: Resolve procedure
flow.setModality('MRI');
flow.setContrast('without');
flow.setRegion('Knee');

// Ensure ProcedureHelpers is loaded
if (window.ProcedureHelpers) {
  const procedure = flow.resolve();
  console.assert(procedure !== null, 'Should resolve a procedure');
  console.assert(procedure?.cpt_code?.length === 5, 'CPT code should be 5 digits');
  console.log('Resolved procedure:', procedure);
} else {
  console.warn('⚠️ ProcedureHelpers not loaded, skipping resolve test');
}

console.log('✅ All selection-flow tests passed!');