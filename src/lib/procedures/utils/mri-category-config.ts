/**
 * MRI MODALITY CATEGORY CONFIGURATION
 * ====================================
 * Defines category groups, display order, icons, and UI behavior for MRI procedures
 * 
 * Three main category groups (mirroring CT structure):
 * 1. Standard MRI - Diagnostic imaging by body region (requires contrast selection)
 * 2. Vascular Imaging (MRA/MRV) - Angiography and Venography
 * 3. Specialized MRI - Advanced protocols (arthrograms, breast, spectroscopy, elastography)
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
  showFirst: number;
  alwaysShowAll: boolean;
  displayOrder: number;
}

export const MRI_CATEGORY_GROUPS: Record<string, CategoryGroupConfig> = {
  standard: {
    id: 'standard',
    label: 'Standard MRI',
    icon: 'mri',
    description: 'Diagnostic MRI scans by body region',
    defaultExpanded: true,
    showFirst: 3,
    alwaysShowAll: false,
    displayOrder: 1
  },
  vascular: {
    id: 'vascular',
    label: 'Vascular Imaging (MRA/MRV)',
    icon: 'heart',
    description: 'Artery and vein evaluation',
    defaultExpanded: false,
    showFirst: 3,
    alwaysShowAll: false,
    displayOrder: 2
  },
  specialized: {
    id: 'specialized',
    label: 'Specialized MRI',
    icon: 'diamond',
    description: 'Advanced protocols and specialty exams',
    defaultExpanded: false,
    showFirst: 4,
    alwaysShowAll: true,
    displayOrder: 3
  }
};

// ============================================
// REGION GROUPING (FOR STANDARD MRI)
// ============================================

export interface RegionGroup {
  groupName: string;
  groupIcon: string;
  regions: string[];
  defaultExpanded: boolean;
}

export const MRI_REGION_GROUPS: RegionGroup[] = [
  {
    groupName: 'Head & Spine',
    groupIcon: 'brain',
    regions: ['brain', 'cervicalSpine', 'thoracicSpine', 'lumbarSpine', 'orbitFaceNeck', 'tmj'],
    defaultExpanded: true
  },
  {
    groupName: 'Body',
    groupIcon: 'chest',
    regions: ['chest', 'abdomen', 'pelvis', 'abdomenPelvis'],
    defaultExpanded: false
  },
  {
    groupName: 'Extremities',
    groupIcon: 'shoulder',
    regions: ['shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle'],
    defaultExpanded: false
  },
  {
    groupName: 'Specialized',
    groupIcon: 'breast',
    regions: ['breast'],
    defaultExpanded: false
  }
];

// ============================================
// VASCULAR GROUPING (FOR MRA/MRV)
// ============================================

export const MRI_VASCULAR_GROUPS: RegionGroup[] = [
  {
    groupName: 'Brain Vessels',
    groupIcon: 'brain',
    regions: ['mraBrain', 'mrvHead'],
    defaultExpanded: true
  },
  {
    groupName: 'Neck & Chest',
    groupIcon: 'heart',
    regions: ['mraNeck', 'mraChest'],
    defaultExpanded: false
  },
  {
    groupName: 'Abdomen & Pelvis',
    groupIcon: 'abdomen',
    regions: ['mraAbdomen', 'mraPelvis'],
    defaultExpanded: false
  },
  {
    groupName: 'Extremities & Spine',
    groupIcon: 'leg',
    regions: ['mraRunoff', 'mraSpine'],
    defaultExpanded: false
  }
];

// ============================================
// SPECIALIZED ITEMS (ALWAYS VISIBLE)
// ============================================

export const MRI_SPECIALIZED_ITEMS = [
  'arthrograms',
  'breastMRI',
  'spectroscopy',
  'elastography'
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
  touchTargetSize: number;
  animationDuration: number;
  expandCollapseEasing: string;
  showBadges: boolean;
  showHelperText: boolean;
  useStickyHeaders: boolean;
}

export const MRI_DISPLAY_SETTINGS: DisplaySettings = {
  gridColumns: {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  touchTargetSize: 48,
  animationDuration: 300,
  expandCollapseEasing: 'ease-in-out',
  showBadges: true,
  showHelperText: true,
  useStickyHeaders: false
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
 * Get all categories for a specific group
 */
export function getCategoriesForGroup(groupId: string): string[] {
  switch (groupId) {
    case 'standard':
      return MRI_REGION_GROUPS.flatMap(group => group.regions);
    case 'vascular':
      return MRI_VASCULAR_GROUPS.flatMap(group => group.regions);
    case 'specialized':
      return MRI_SPECIALIZED_ITEMS;
    default:
      return [];
  }
}

/**
 * Get the group for a specific category
 */
export function getGroupForCategory(categoryKey: string): string | null {
  // Check standard
  if (MRI_REGION_GROUPS.some(group => group.regions.includes(categoryKey))) {
    return 'standard';
  }
  // Check vascular
  if (MRI_VASCULAR_GROUPS.some(group => group.regions.includes(categoryKey))) {
    return 'vascular';
  }
  // Check specialized
  if (MRI_SPECIALIZED_ITEMS.includes(categoryKey)) {
    return 'specialized';
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
  return [...MRI_REGION_GROUPS];
}

/**
 * Get vascular groups in display order
 */
export function getVascularGroupsInOrder(): RegionGroup[] {
  return [...MRI_VASCULAR_GROUPS];
}

/**
 * Check if a category should be expanded by default
 */
export function shouldExpandByDefault(categoryKey: string): boolean {
  const group = MRI_REGION_GROUPS.find(g => g.regions.includes(categoryKey));
  return group?.defaultExpanded || false;
}

/**
 * Get the number of items to show before collapsing
 */
export function getShowFirstCount(groupId: string): number {
  return MRI_CATEGORY_GROUPS[groupId]?.showFirst || 3;
}

/**
 * Check if a group should always show all items
 */
export function shouldAlwaysShowAll(groupId: string): boolean {
  return MRI_CATEGORY_GROUPS[groupId]?.alwaysShowAll || false;
}

// ============================================
// CONTRAST CONFIGURATION
// ============================================

/**
 * Contrast configuration for different MRI types
 */
export const MRI_CONTRAST_CONFIG = {
  // Standard MRI: User chooses contrast
  standard: {
    requiresSelection: true,
    options: ['Without Contrast', 'With Contrast', 'With and Without Contrast']
  },
  // MRA (Angiography): Always with contrast
  mra: {
    requiresSelection: false,
    autoContrast: 'With Contrast'
  },
  // MRV: Can be with or without depending on indication
  mrv: {
    requiresSelection: true,
    options: ['Without Contrast', 'With Contrast']
  },
  // Specialized: Varies by procedure type
  specialized: {
    arthrograms: { requiresSelection: false, autoContrast: 'With Contrast' },
    breastMRI: { requiresSelection: false, autoContrast: 'With Contrast' },
    spectroscopy: { requiresSelection: false, autoContrast: 'none' },
    elastography: { requiresSelection: false, autoContrast: 'none' }
  }
};

/**
 * Determine if a region requires contrast selection
 */
export function requiresContrastSelection(regionKey: string): boolean {
  // MRA regions (except MRV) don't require selection
  if (regionKey.startsWith('mra') && !regionKey.includes('mrv')) {
    return false;
  }
  
  // MRV requires selection
  if (regionKey.includes('mrv')) {
    return true;
  }
  
  // Check specialized items
  if (MRI_SPECIALIZED_ITEMS.includes(regionKey)) {
    return MRI_CONTRAST_CONFIG.specialized[regionKey]?.requiresSelection !== false;
  }
  
  // Standard MRI requires selection
  return true;
}

/**
 * Get auto-contrast for procedures that don't require selection
 */
export function getAutoContrast(regionKey: string): string | null {
  // MRA always with contrast
  if (regionKey.startsWith('mra') && !regionKey.includes('mrv')) {
    return 'With Contrast';
  }
  
  // Check specialized items
  if (MRI_SPECIALIZED_ITEMS.includes(regionKey)) {
    const config = MRI_CONTRAST_CONFIG.specialized[regionKey];
    return config?.autoContrast || null;
  }
  
  return null;
}

// Export complete MRI configuration to window
if (typeof window !== 'undefined') {
  (window as any).MRI_CATEGORY_CONFIG = {
    standard: {
      ...MRI_CATEGORY_GROUPS.standard,
      regionGroups: MRI_REGION_GROUPS
    },
    vascular: {
      ...MRI_CATEGORY_GROUPS.vascular,
      regionGroups: MRI_VASCULAR_GROUPS
    },
    specialized: {
      ...MRI_CATEGORY_GROUPS.specialized,
      items: MRI_SPECIALIZED_ITEMS
    }
  };
}

console.log('MRI Category Configuration loaded');