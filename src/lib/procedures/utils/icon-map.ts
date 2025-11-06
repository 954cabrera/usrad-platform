/**
 * CENTRALIZED ICON MAP
 * ====================
 * Single source of truth for all icons used in the PPE system
 * Prevents emoji encoding corruption across different systems
 * 
 * Usage:
 *   import { ICON_MAP, getIcon } from './icon-map';
 *   const icon = getIcon('brain'); // Returns '🧠'
 * 
 * Benefits:
 * - Prevents Unicode corruption when copying/pasting code
 * - Makes icon updates trivial (change once, updates everywhere)
 * - Easy to swap emoji for SVG/Font Awesome later
 * - Separates UI concerns from data/logic
 */

// ============================================
// ICON MAP - ALL ICONS IN ONE PLACE
// ============================================

export const ICON_MAP: Record<string, string> = {
  // Modalities
  'mri': '🧲',
  'ct': '⚡',
  'xray': '📸',
  'ultrasound': '📊',
  'mammography': '🎗️',
  'pet': '☢️',
  'nuclear-medicine': '⚛️',
  
// MRI-Specific Icons
  'vascular': 'Activity',
  'specialized': 'Star',
  'arthrogram': 'Droplet',
  'spectroscopy': 'FlaskRound',
  'elastography': 'Waves',
  'breastMRI': 'Heart',
  
  // Contrast Icons
  'contrast': 'Droplet',
  'withoutContrast': 'CircleSlash',
  'withContrast': 'Droplet',
  'withAndWithoutContrast': 'Droplets',
  
  // Additional Utility Icons
  'bodyPart': 'ScanLine',
  'procedure': 'ClipboardList',
  'search': 'Search',
  'success': 'CheckCircle',
  'error': 'XCircle',
  'expand': 'ChevronDown',
  'collapse': 'ChevronUp',

  // Head & Brain
  'brain': '🧠',
  'head': '🧠',
  'eye': '👁️',
  'orbit': '👁️',
  'face': '👁️',
  'nose': '👃',
  'sinuses': '👃',
  
  // Spine & Bones
  'spine': '🦴',
  'bone': '🦴',
  'cervical-spine': '🦴',
  'thoracic-spine': '🦴',
  'lumbar-spine': '🦴',
  'tmj': '🦴',
  'clavicle': '🦴',
  'ribs': '🦴',
  'pelvis': '🦴',
  'hip': '🦴',
  'femur': '🦴',
  
  // Upper Extremities
  'arm': '💪',
  'shoulder': '💪',
  'elbow': '💪',
  'hand': '✋',
  'wrist': '✋',
  'finger': '✋',
  
  // Lower Extremities
  'leg': '🦵',
  'knee': '🦵',
  'tibia': '🦵',
  'fibula': '🦵',
  'foot': '🦶',
  'ankle': '🦶',
  'toe': '🦶',
  
  // Torso & Organs
  'chest': '🫁',
  'lungs': '🫁',
  'heart': '❤️',
  'abdomen': '🫀',
  'liver': '🫀',
  'kidney': '🫀',
  'stomach': '🫀',
  'intestine': '🫀',
  'neck': '🫀',
  
  // Breast
  'breast': '🎀',
  
  // Generic/Utility Icons
  'medical': '🩺',
  'diamond': '💎',
  'warning': '⚠️',
  'info': '💡',
  'clock': '⏱️',
  'clipboard': '📋',
  'camera': '📸',
  'magnify': '🔍',
  'check': '✓',
  'x': '✗'
};

// ============================================
// FALLBACK ICON
// ============================================

/**
 * Icon to display when a key is not found in the map
 * Warning icon makes missing mappings very obvious
 */
export const FALLBACK_ICON = '⚠️';

// ============================================
// HELPER FUNCTION
// ============================================

/**
 * Get an icon by key with fallback
 * 
 * @param key - Icon key (e.g., 'brain', 'mri', 'knee')
 * @returns The emoji icon or fallback warning icon
 * 
 * @example
 * getIcon('brain') // Returns '🧠'
 * getIcon('unknown-key') // Returns '⚠️' (fallback)
 */
export function getIcon(key: string): string {
  // Normalize the key (lowercase, trim)
  const normalizedKey = key.toLowerCase().trim();
  
  // Return the icon or fallback
  return ICON_MAP[normalizedKey] || FALLBACK_ICON;
}

/**
 * Check if an icon key exists in the map
 * 
 * @param key - Icon key to check
 * @returns True if the key exists
 */
export function hasIcon(key: string): boolean {
  const normalizedKey = key.toLowerCase().trim();
  return normalizedKey in ICON_MAP;
}

/**
 * Get all available icon keys
 * 
 * @returns Array of all icon keys
 */
export function getAllIconKeys(): string[] {
  return Object.keys(ICON_MAP);
}

console.log('✅ Icon Map loaded');