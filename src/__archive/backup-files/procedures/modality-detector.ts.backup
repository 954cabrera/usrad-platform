/**
 * MODALITY DETECTION & CONFIGURATION
 * ===================================
 * Type-safe modality detection and contrast configuration
 * Extracted from hero-form-controller-modal.js lines 42-108
 * 
 * Usage:
 *   import { detectModality, getContrastConfig } from './modality-detector';
 *   const modality = detectModality('mri'); // Returns 'MRI'
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export type Modality = 
  | 'MRI' 
  | 'CT' 
  | 'X-Ray' 
  | 'Ultrasound' 
  | 'Mammography' 
  | 'PET' 
  | 'Nuclear Medicine';

export type ContrastType = 'without' | 'with' | 'both';

export interface ContrastOption {
  id: ContrastType;
  label: string;
  cptSuffix: string;
}

export interface ContrastConfiguration {
  hasContrast: boolean;
  options?: ContrastOption[];
}

// ============================================
// MODALITY ALIASES (User Input â†’ Standard Name)
// ============================================

const MODALITY_ALIASES: Record<string, Modality> = {
  // MRI
  'mri': 'MRI',
  'mr': 'MRI',
  'magnetic': 'MRI',
  'magnetic resonance': 'MRI',
  
  // CT
  'ct': 'CT',
  'cat': 'CT',
  'cat scan': 'CT',
  'computed tomography': 'CT',
  
  // X-Ray
  'xray': 'X-Ray',
  'x-ray': 'X-Ray',
  'x ray': 'X-Ray',
  'xra': 'X-Ray',
  'x-ra': 'X-Ray',
  'radiograph': 'X-Ray',
  
  // Ultrasound
  'ultrasound': 'Ultrasound',
  'us': 'Ultrasound',
  'ultra': 'Ultrasound',
  'sono': 'Ultrasound',
  'sonogram': 'Ultrasound',
  
  // Mammography
  'mammo': 'Mammography',
  'mammogram': 'Mammography',
  'mammography': 'Mammography',
  
  // PET
  'pet': 'PET',
  'pet scan': 'PET',
  
  // Nuclear Medicine
  'nuclear': 'Nuclear Medicine',
  'nm': 'Nuclear Medicine',
  'nuclear medicine': 'Nuclear Medicine'
};

// ============================================
// CONTRAST CONFIGURATIONS BY MODALITY
// ============================================

export const CONTRAST_CONFIG: Record<Modality, ContrastConfiguration> = {
  'MRI': {
    hasContrast: true,
    options: [
      { id: 'without', label: 'Without Contrast', cptSuffix: '1' },
      { id: 'with', label: 'With Contrast', cptSuffix: '2' },
      { id: 'both', label: 'With & Without Contrast', cptSuffix: '3' }
    ]
  },
  'CT': {
    hasContrast: true,
    options: [
      { id: 'without', label: 'Without Contrast', cptSuffix: '0' },
      { id: 'with', label: 'With Contrast', cptSuffix: '0' },
      { id: 'both', label: 'With & Without Contrast', cptSuffix: '0' }
    ]
  },
  'X-Ray': { 
    hasContrast: false 
  },
  'Ultrasound': { 
    hasContrast: false 
  },
  'Mammography': { 
    hasContrast: false 
  },
  'PET': { 
    hasContrast: false 
  },
  'Nuclear Medicine': { 
    hasContrast: false 
  }
};

// ============================================
// PUBLIC API
// ============================================

/**
 * Detect modality from user input
 * 
 * @param userInput - Raw user search string (e.g., "mri", "cat scan", "ultrasound")
 * @returns Normalized modality name or null if not recognized
 * 
 * @example
 * detectModality('mri') // Returns 'MRI'
 * detectModality('cat scan') // Returns 'CT'
 * detectModality('knee') // Returns null (not a modality)
 */
export function detectModality(userInput: string): Modality | null {
  if (!userInput) return null;
  
  const normalized = userInput.toLowerCase().trim();
  return MODALITY_ALIASES[normalized] || null;
}

/**
 * Get contrast configuration for a modality
 * 
 * @param modality - Standard modality name
 * @returns Contrast configuration object
 * 
 * @example
 * const config = getContrastConfig('MRI');
 * if (config.hasContrast) {
 *   console.log(config.options); // [{ id: 'without', label: '...', ... }, ...]
 * }
 */
export function getContrastConfig(modality: Modality): ContrastConfiguration {
  return CONTRAST_CONFIG[modality];
}

/**
 * Check if a modality requires contrast selection
 * 
 * @param modality - Standard modality name
 * @returns True if modality has contrast options
 * 
 * @example
 * hasContrastOptions('MRI') // true
 * hasContrastOptions('X-Ray') // false
 */
export function hasContrastOptions(modality: Modality): boolean {
  return CONTRAST_CONFIG[modality].hasContrast;
}

/**
 * Get user-friendly contrast label
 * 
 * @param contrastType - Contrast type ID
 * @returns Human-readable label
 * 
 * @example
 * getContrastLabel('without') // 'Without Contrast'
 * getContrastLabel('both') // 'With & Without Contrast'
 */
export function getContrastLabel(contrastType: ContrastType): string {
  const labels: Record<ContrastType, string> = {
    'without': 'Without Contrast',
    'with': 'With Contrast',
    'both': 'With & Without Contrast'
  };
  return labels[contrastType];
}

/**
 * Get all available modalities
 * 
 * @returns Array of all supported modality names
 */
export function getAllModalities(): Modality[] {
  return Object.keys(CONTRAST_CONFIG) as Modality[];
}

/**
 * Check if a string is a valid modality
 * 
 * @param value - String to check
 * @returns True if value is a valid modality
 */
export function isValidModality(value: string): value is Modality {
  return getAllModalities().includes(value as Modality);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get modality icon emoji
 * 
 * @param modality - Standard modality name
 * @returns Emoji icon for the modality
 */
export function getModalityIcon(modality: Modality): string {
  const icons: Record<Modality, string> = {
    'MRI': '🧲',
    'CT': '⚡',
    'X-Ray': '📸',
    'Ultrasound': '🔊',
    'Mammography': '🎗️',
    'PET': '☢️',
    'Nuclear Medicine': '⚛️'
  };
  return icons[modality] || '🩺';
}

/**
 * Get modality color for UI theming
 * 
 * @param modality - Standard modality name
 * @returns Hex color code
 */
export function getModalityColor(modality: Modality): string {
  const colors: Record<Modality, string> = {
    'MRI': '#003087',
    'CT': '#0052cc',
    'X-Ray': '#6b7280',
    'Ultrasound': '#3b82f6',
    'Mammography': '#ec4899',
    'PET': '#8b5cf6',
    'Nuclear Medicine': '#10b981'
  };
  return colors[modality] || '#003087';
}

console.log('âœ… Modality Detector loaded');