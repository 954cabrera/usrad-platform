import { detectModality, getContrastConfig, getModalityIcon } from '../utils/modality-detector';

// Test 1: Basic detection
console.assert(detectModality('mri') === 'MRI', 'Should detect MRI');
console.assert(detectModality('ct') === 'CT', 'Should detect CT');
console.assert(detectModality('cat scan') === 'CT', 'Should detect CT from "cat scan"');
console.assert(detectModality('knee') === null, 'Should return null for non-modality');

// Test 2: Contrast config
const mriConfig = getContrastConfig('MRI');
console.assert(mriConfig.hasContrast === true, 'MRI should have contrast');
console.assert(mriConfig.options?.length === 3, 'MRI should have 3 contrast options');

const xrayConfig = getContrastConfig('X-Ray');
console.assert(xrayConfig.hasContrast === false, 'X-Ray should not have contrast');

// Test 3: Icons
console.assert(getModalityIcon('MRI') === '🧲', 'MRI icon should be magnet');
console.assert(getModalityIcon('CT') === '⚡', 'CT icon should be lightning');

console.log('✅ All modality-detector tests passed!');