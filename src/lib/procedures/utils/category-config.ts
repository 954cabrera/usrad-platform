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

// ============================================
// MRI CATEGORY CONFIGURATION
// ============================================

/**
 * MRI three-tier configuration structure
 * Tier 1: Standard MRI (requires contrast selection UI)
 * Tier 2: Vascular Imaging - MRA (auto with-contrast) and MRV (2 options)
 * Tier 3: Specialized MRI (auto or skip contrast)
 */

export const MRI_CATEGORY_CONFIG = {
  label: "MRI",
  description: "Magnetic Resonance Imaging - soft tissue, brain, spine, joints, and vascular studies.",
  tiers: [
    {
      id: "standard",
      name: "Standard MRI",
      icon: "mri",
      description: "General MRI scans for brain, spine, joints, and internal organs.",
      defaultExpanded: true,
      contrastOptions: [
        "Without Contrast",
        "With Contrast",
        "With and Without Contrast"
      ],
      regions: [
        {
          id: "brain",
          label: "Brain / Head",
          cptRange: ["70551", "70553"],
          notes: "Commonly used for headaches, dizziness, tumors, or stroke follow-up."
        },
        {
          id: "spine",
          label: "Spine (Cervical / Thoracic / Lumbar)",
          cptRange: ["72141", "72158"],
          notes: "Detects herniated discs, nerve compression, and spinal abnormalities."
        },
        {
          id: "abdomenPelvis",
          label: "Abdomen / Pelvis",
          cptRange: ["74181", "72197"],
          notes: "Evaluates liver, kidneys, uterus, prostate, and pelvic organs."
        },
        {
          id: "upperExtremity",
          label: "Upper Extremity (Shoulder, Elbow, Wrist)",
          cptRange: ["73218", "73223"],
          notes: "Assesses soft tissue injuries, tendons, or post-surgical changes."
        },
        {
          id: "lowerExtremity",
          label: "Lower Extremity (Hip, Knee, Ankle, Foot)",
          cptRange: ["73718", "73723"],
          notes: "Detects ligament tears, arthritis, or sports-related injuries."
        }
      ]
    },
    {
      id: "vascular",
      name: "Vascular Imaging (MRA / MRV)",
      icon: "vascular",
      description: "MRI studies focused on arteries (MRA) and veins (MRV).",
      categoryGroup: "vascular",
      regions: [
        {
          id: "mraBrain",
          label: "MRA Brain (Arterial)",
          cptRange: ["70544", "70546"],
          contrastMode: "auto",
          notes: "Evaluates cerebral arteries for aneurysm, stenosis, or stroke."
        },
        {
          id: "mraNeck",
          label: "MRA Neck (Carotid Arteries)",
          cptRange: ["70547", "70549"],
          contrastMode: "auto",
          notes: "Assesses carotid or vertebral arteries for narrowing or blockage."
        },
        {
          id: "mraChest",
          label: "MRA Chest / Aorta",
          cptRange: ["71555"],
          contrastMode: "auto",
          notes: "Examines thoracic aorta for aneurysm, dissection, or congenital defects."
        },
        {
          id: "mraAbdomen",
          label: "MRA Abdomen / Renal",
          cptRange: ["74185"],
          contrastMode: "auto",
          notes: "Visualizes abdominal and renal arteries for stenosis or aneurysm."
        },
        {
          id: "mraPelvis",
          label: "MRA Pelvis / Iliac Vessels",
          cptRange: ["72198"],
          contrastMode: "auto",
          notes: "Evaluates iliac or pelvic arterial flow and vascular abnormalities."
        },
        {
          id: "mraRunoff",
          label: "MRA Runoff (Lower Extremities)",
          cptRange: ["74185", "73725"],
          contrastMode: "auto",
          notes: "Abdominal aorta and bilateral leg arteries for peripheral vascular disease."
        },
        {
          id: "mraSpine",
          label: "MRA Spine",
          cptRange: ["72159"],
          contrastMode: "auto",
          notes: "Assesses spinal canal vasculature for arteriovenous malformations."
        },
        {
          id: "mrvHead",
          label: "MRV Head (Venous)",
          cptRange: ["70544", "70546"],
          contrastMode: "optional",
          notes: "Evaluates cerebral venous drainage or thrombosis. Contrast may be used depending on indication."
        }
      ]
    },
    {
      id: "specialized",
      name: "Specialized MRI",
      icon: "specialized",
      description: "Advanced MRI exams requiring specialized protocols or injections.",
      defaultExpanded: false,
      regions: [
        {
          id: "arthrograms",
          label: "Joint Arthrograms (Fluoro-guided)",
          badge: "arthrogram",
          cptRange: ["73222", "73723"],
          contrastMode: "auto",
          notes: "Performed with contrast injection under fluoroscopy. Common for shoulder, hip, and knee."
        },
        {
          id: "breastMRI",
          label: "Breast MRI (CAD)",
          cptRange: ["77046", "77049"],
          contrastMode: "auto",
          notes: "High-resolution MRI for breast cancer screening or surgical follow-up."
        },
        {
          id: "spectroscopy",
          label: "MR Spectroscopy (MRS)",
          cptRange: ["76390"],
          contrastMode: "none",
          notes: "Analyzes metabolic activity in brain or other tissues (no contrast)."
        },
        {
          id: "elastography",
          label: "MR Elastography (MRE)",
          cptRange: ["76391"],
          contrastMode: "none",
          notes: "Assesses tissue stiffness, often used to evaluate liver fibrosis."
        }
      ]
    }
  ]
} as const;

console.log('✅ CT Category Configuration loaded');

