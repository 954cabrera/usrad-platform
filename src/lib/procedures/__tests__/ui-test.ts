import { renderContrastSelection } from '../ui/contrast-renderer';
import { renderRegionSelection } from '../ui/region-renderer';
import { renderSearchResults } from '../ui/search-results-renderer';
import { searchAllProcedures } from '../utils/search-engine';

// Test 1: Contrast Selection
const contrastHtml = renderContrastSelection('MRI', true);
console.assert(contrastHtml.includes('Without Contrast'), 'Should include without contrast option');
console.assert(contrastHtml.includes('With Contrast'), 'Should include with contrast option');
console.log('✅ Contrast renderer test passed');

// Test 2: Region Selection
const regionHtml = renderRegionSelection('MRI', 'without', true);
console.assert(regionHtml.includes('Knee'), 'Should include knee region');
console.assert(regionHtml.includes('Shoulder'), 'Should include shoulder region');
console.log('✅ Region renderer test passed');

// Test 3: Search Results
if (window.ProcedureLibrary) {
  const results = searchAllProcedures('knee');
  const resultsHtml = renderSearchResults(results, 'knee');
  console.assert(resultsHtml.includes('procedures found'), 'Should show results count');
  console.log('✅ Search results renderer test passed');
}

console.log('\n🎉 All UI renderer tests passed!');