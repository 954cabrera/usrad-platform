/**
 * CT MODALITY CATEGORY CONFIGURATION
 * ===================================
 * Defines category groups, display order, icons, and UI behavior for CT procedures
 * 
 * Three main category groups:
 * 1. Standard CT - Diagnostic imaging by body region
 * 2. Vascular Imaging (CTA) - Blood vessel evaluation
 * 3. Specialized Screening - Preventive and wellness scans
 */

import { getIcon } from './icon-map';

// ============================================
// CATEGORY GROUP DEFINITIONS
// ============================================

export interface CategoryGroupConfig {
  id: string;
  label: string;
  icon: string;
  description: string;
  defaultExpanded: boolean;
  showFirst: number; // Number of items to show before collapse
  alwaysShowAll: boolean; // If true, never collapse
  displayOrder: number;
}

export const CT_CATEGORY_GROUPS: Record<string, CategoryGroupConfig> = {
  standard: {
    id: 'standard',
    label: '🧍 Standard CT',
    icon: '⚡',
    description: 'Diagnostic CT scans by body region',
    defaultExpanded: true, // Head & Neck expanded by default
    showFirst: 3,
    alwaysShowAll: false,
    displayOrder: 1
  },
  vascular: {
    id: 'vascular',
    label: '💓 Vascular Imaging (CTA)',
    icon: '❤️',
    description: 'Blood vessel and heart evaluation',
    defaultExpanded: false,
    showFirst: 3,
    alwaysShowAll: false,
    displayOrder: 2
  },
  screening: {
    id: 'screening',
    label: '⭐ Specialized Screening',
    icon: '🎗️',
    description: 'Preventive and wellness scans',
    defaultExpanded: false,
    showFirst: 4, // Always show all 4 screening items
    alwaysShowAll: true, // Never collapse screening
    displayOrder: 3
  }
};

// ============================================
// REGION GROUPING (FOR STANDARD CT)
// ============================================

export interface RegionGroup {
  groupName: string;
  groupIcon: string;
  regions: string[];
  defaultExpanded: boolean;
}

export const CT_REGION_GROUPS: RegionGroup[] = [
  {
    groupName: 'Head & Neck',
    groupIcon: '🧠',
    regions: ['head', 'sinuses', 'neckSoftTissue'],
    defaultExpanded: true // Expanded by default per spec
  },
  {
    groupName: 'Torso',
    groupIcon: '🫁',
    regions: ['chest', 'abdomen', 'pelvis', 'abdomenPelvis'],
    defaultExpanded: false
  },
  {
    groupName: 'Spine',
    groupIcon: '🦴',
    regions: ['cervicalSpine', 'thoracicSpine', 'lumbarSpine'],
    defaultExpanded: false
  }
];

// ============================================
// VASCULAR GROUPING (FOR CTA)
// ============================================

export const CT_VASCULAR_GROUPS: RegionGroup[] = [
  {
    groupName: 'Head & Neck Vessels',
    groupIcon: '🧠',
    regions: ['ctaHeadNeck'],
    defaultExpanded: false
  },
  {
    groupName: 'Heart & Chest',
    groupIcon: '❤️',
    regions: ['ctaChest', 'ctaCoronary'],
    defaultExpanded: false
  },
  {
    groupName: 'Abdominal Vessels',
    groupIcon: '🫀',
    regions: ['ctaAbdomen'],
    defaultExpanded: false
  },
  {
    groupName: 'Leg & Arm Vessels',
    groupIcon: '🦵',
    regions: ['ctaExtremities'],
    defaultExpanded: false
  }
];

// ============================================
// SCREENING ITEMS (ALWAYS VISIBLE)
// ============================================

export const CT_SCREENING_ITEMS = [
  'screeningLung',
  'screeningCardiac',
  'screeningColon',
  'screeningCoronary'
];

// ============================================
// DISPLAY SETTINGS
// ============================================

export interface DisplaySettings {
  gridColumns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  touchTargetSize: number; // in pixels
  animationDuration: number; // in milliseconds
  expandCollapseEasing: string;
  showBadges: boolean;
  showHelperText: boolean;
  useStickyHeaders: boolean;
}

export const CT_DISPLAY_SETTINGS: DisplaySettings = {
  gridColumns: {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  touchTargetSize: 48, // Minimum 48px for accessibility
  animationDuration: 300, // 300ms for smooth animations
  expandCollapseEasing: 'ease-in-out',
  showBadges: true, // Show "CTA" and "Screening" badges
  showHelperText: true, // Show educational helper text for screening
  useStickyHeaders: false // No sticky headers per spec
};

// ============================================
// CATEGORY METADATA
// ============================================

export interface CategoryMetadata {
  categoryKey: string;
  categoryGroup: string;
  displayName: string;
  icon: string;
  badge?: string;
  helperText?: string;
  searchKeywords: string[];
}

/**
 * Get metadata for a specific category
 */
export function getCategoryMetadata(categoryKey: string): CategoryMetadata | null {
  // This would be populated from procedures-global.js
  // For now, return a placeholder
  return null;
}

/**
 * Get all categories for a specific group
 */
export function getCategoriesForGroup(groupId: string): string[] {
  switch (groupId) {
    case 'standard':
      return CT_REGION_GROUPS.flatMap(group => group.regions);
    case 'vascular':
      return CT_VASCULAR_GROUPS.flatMap(group => group.regions);
    case 'screening':
      return CT_SCREENING_ITEMS;
    default:
      return [];
  }
}

/**
 * Get the group for a specific category
 */
export function getGroupForCategory(categoryKey: string): string | null {
  // Check standard
  if (CT_REGION_GROUPS.some(group => group.regions.includes(categoryKey))) {
    return 'standard';
  }
  // Check vascular
  if (CT_VASCULAR_GROUPS.some(group => group.regions.includes(categoryKey))) {
    return 'vascular';
  }
  // Check screening
  if (CT_SCREENING_ITEMS.includes(categoryKey)) {
    return 'screening';
  }
  return null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get region groups in display order
 */
export function getRegionGroupsInOrder(): RegionGroup[] {
  return [...CT_REGION_GROUPS];
}

/**
 * Get vascular groups in display order
 */
export function getVascularGroupsInOrder(): RegionGroup[] {
  return [...CT_VASCULAR_GROUPS];
}

/**
 * Check if a category should be expanded by default
 */
export function shouldExpandByDefault(categoryKey: string): boolean {
  const group = CT_REGION_GROUPS.find(g => g.regions.includes(categoryKey));
  return group?.defaultExpanded || false;
}

/**
 * Get the number of items to show before collapsing
 */
export function getShowFirstCount(groupId: string): number {
  return CT_CATEGORY_GROUPS[groupId]?.showFirst || 3;
}

/**
 * Check if a group should always show all items
 */
export function shouldAlwaysShowAll(groupId: string): boolean {
  return CT_CATEGORY_GROUPS[groupId]?.alwaysShowAll || false;
}

console.log('✅ CT Category Configuration loaded');