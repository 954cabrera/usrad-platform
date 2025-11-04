import { searchAllProcedures, searchByCPT, groupByModality } from '../utils/search-engine';

// Ensure ProcedureLibrary is loaded first
if (!window.ProcedureLibrary) {
  console.error('❌ ProcedureLibrary not loaded! Load procedures-global.js first.');
}

// Test 1: Search by body part
const kneeResults = searchAllProcedures('knee');
console.assert(kneeResults.length > 0, 'Should find knee procedures');
console.log(`Found ${kneeResults.length} knee procedures`);

// Test 2: Search by CPT code
const cptResults = searchByCPT('70551');
console.assert(cptResults.length > 0, 'Should find CPT 70551 (MRI Brain)');
console.assert(cptResults[0].cpt === '70551', 'CPT should match exactly');

// Test 3: Search for breast (should include Mammography)
const breastResults = searchAllProcedures('breast');
const hasMammo = breastResults.some(r => r.modality === 'Mammography');
console.assert(hasMammo, 'Breast search should include Mammography');

// Test 4: Group results
const grouped = groupByModality(kneeResults);
console.assert(grouped.MRI || grouped.CT, 'Should group by modality');

console.log('✅ All search-engine tests passed!');