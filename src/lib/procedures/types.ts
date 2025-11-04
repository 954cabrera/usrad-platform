/**
 * SHARED TYPE DEFINITIONS
 * ========================
 * Central type definitions used across the procedure selection system
 * 
 * This file contains all interfaces, types, and enums used throughout
 * the modular procedure system.
 */

// ============================================
// MODALITY TYPES
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

// ============================================
// PROCEDURE DATA STRUCTURES
// ============================================

export interface Procedure {
  cpt: string;
  label: string;
  shortLabel: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
}

export interface ProcedureCategory {
  category: string;
  icon: string;
  procedures: Procedure[];
  includes?: string;
  clinicalUse?: string;
  contrastAvailability?: ContrastType[];
  matchKeywords?: string[];
  redirectTo?: string;
}

export interface ProcedureLibrary {
  [key: string]: ProcedureCategory;
}

// ============================================
// SEARCH RESULT TYPES
// ============================================

export interface SearchResult {
  modality: string;
  category: string;
  icon: string;
  cpt: string;
  label: string;
  shortLabel: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
}

export interface GroupedSearchResults {
  [modality: string]: SearchResult[];
}

// ============================================
// RESOLVED PROCEDURE
// ============================================

export interface ResolvedProcedure {
  cpt_code: string;
  label: string;
  patient_label: string;
  badge_label: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
  category: string;
  icon: string;
}

// ============================================
// CONTRAST CONFIGURATION
// ============================================

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
// SELECTION FLOW STATE
// ============================================

export interface SelectionState {
  modality: Modality | null;
  contrast: ContrastType | null;
  region: string | null;
}

export type SelectionStep = 'modality' | 'contrast' | 'region' | 'complete';

// ============================================
// UI STATE TYPES
// ============================================

export interface ModalState {
  isOpen: boolean;
  currentView: 'search' | 'contrast' | 'region' | 'results';
  searchQuery: string;
  isLoading: boolean;
}

export interface FormState {
  selectedProcedure: ResolvedProcedure | null;
  zip: string;
  location: string;
  isValid: boolean;
}

// ============================================
// REGION CONFIGURATION
// ============================================

export interface Region {
  label: string;
  icon: string;
}

export interface RegionGroup {
  groupName: string;
  regions: Region[];
}

export type RegionList = Region[];
export type GroupedRegionList = RegionGroup[];

// ============================================
// EVENT TYPES
// ============================================

export interface ProcedureSelectedEvent {
  type: 'procedure-selected';
  procedure: ResolvedProcedure;
  timestamp: number;
}

export interface ModalitySelectedEvent {
  type: 'modality-selected';
  modality: Modality;
  timestamp: number;
}

export interface ContrastSelectedEvent {
  type: 'contrast-selected';
  contrast: ContrastType;
  timestamp: number;
}

export interface RegionSelectedEvent {
  type: 'region-selected';
  region: string;
  timestamp: number;
}

export type SelectionEvent = 
  | ProcedureSelectedEvent 
  | ModalitySelectedEvent 
  | ContrastSelectedEvent 
  | RegionSelectedEvent;

// ============================================
// API TYPES (for future API integration)
// ============================================

export interface APISearchRequest {
  query: string;
  modality?: Modality;
  contrast?: ContrastType;
  limit?: number;
}

export interface APISearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

export interface APIResolveRequest {
  modality: Modality;
  contrast: ContrastType;
  region: string;
}

export interface APIResolveResponse {
  found: boolean;
  procedure?: ResolvedProcedure;
  error?: string;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface ZipCodeValidation extends ValidationResult {
  zip?: string;
  city?: string;
  state?: string;
}

// ============================================
// SPECIAL MODALITY TYPES
// ============================================

export interface SpecialProcedure {
  cpt: string;
  label: string;
  modality: string;
  icon: string;
  category: string;
  description: string;
  duration: string;
  prep: string;
  useCase: string;
}

export interface SpecialModalityConfig {
  title: string;
  dataAttrPrefix: string;
  procedures: Array<{
    cpt: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  }>;
}

// ============================================
// WINDOW INTERFACE EXTENSIONS
// ============================================

declare global {
  interface Window {
    ProcedureLibrary?: {
      MRI: ProcedureLibrary;
      CT: ProcedureLibrary;
    };
    ProcedureHelpers?: {
      resolveProcedure: (modality: string, contrast: string, region: string) => ResolvedProcedure | null;
      normalizeRegionKey: (region: string, modality?: string) => string | null;
      isAmbiguousBodyPart: (bodyPart: string, modality?: string) => boolean;
      getCategoriesForBodyPart: (bodyPart: string, modality?: string) => any[];
      filterByContrast: (category: any, contrast: string) => Procedure[];
    };
  }
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Makes all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties in T required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Extract keys from T that have values of type V
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export {};