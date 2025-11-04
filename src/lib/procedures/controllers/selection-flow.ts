/**
 * SELECTION FLOW STATE MANAGER
 * =============================
 * Manages the progressive disclosure flow for procedure selection
 * Tracks: Modality → Contrast → Region → Final Procedure
 * 
 * Usage:
 *   import { SelectionFlow } from './selection-flow';
 *   const flow = new SelectionFlow();
 *   flow.setModality('MRI');
 *   flow.setContrast('without');
 *   flow.setRegion('Knee');
 *   const procedure = flow.resolve();
 */

import type { Modality, ContrastType } from './modality-detector';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface SelectionState {
  modality: Modality | null;
  contrast: ContrastType | null;
  region: string | null;
}

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

export type SelectionStep = 'modality' | 'contrast' | 'region' | 'complete';

// ============================================
// SELECTION FLOW CLASS
// ============================================

export class SelectionFlow {
  private state: SelectionState;
  private history: SelectionState[];
  
  constructor() {
    this.state = {
      modality: null,
      contrast: null,
      region: null
    };
    this.history = [];
  }
  
  // ============================================
  // STATE SETTERS
  // ============================================
  
  /**
   * Set the selected modality
   * 
   * @param modality - The imaging modality (MRI, CT, etc.)
   */
  setModality(modality: Modality): void {
    this.saveToHistory();
    this.state.modality = modality;
    console.log('✅ Modality set:', modality);
  }
  
  /**
   * Set the selected contrast type
   * 
   * @param contrast - Contrast type (without, with, both)
   */
  setContrast(contrast: ContrastType): void {
    if (!this.state.modality) {
      throw new Error('Cannot set contrast before modality is selected');
    }
    
    this.saveToHistory();
    this.state.contrast = contrast;
    console.log('✅ Contrast set:', contrast);
  }
  
  /**
   * Set the selected body region
   * 
   * @param region - Body part or region name
   */
  setRegion(region: string): void {
    if (!this.state.modality) {
      throw new Error('Cannot set region before modality is selected');
    }
    
    this.saveToHistory();
    this.state.region = region;
    console.log('✅ Region set:', region);
  }
  
  // ============================================
  // STATE GETTERS
  // ============================================
  
  /**
   * Get current selection state
   * 
   * @returns Current state object
   */
  getState(): Readonly<SelectionState> {
    return { ...this.state };
  }
  
  /**
   * Get the current step in the selection flow
   * 
   * @returns Current step name
   */
  getCurrentStep(): SelectionStep {
    if (!this.state.modality) return 'modality';
    if (!this.state.contrast) return 'contrast';
    if (!this.state.region) return 'region';
    return 'complete';
  }
  
  /**
   * Check if selection is complete
   * 
   * @returns True if all required fields are set
   */
  isComplete(): boolean {
    return !!(
      this.state.modality &&
      this.state.contrast &&
      this.state.region
    );
  }
  
  /**
   * Get completion percentage (0-100)
   * 
   * @returns Percentage of completion
   */
  getCompletionPercentage(): number {
    let completed = 0;
    if (this.state.modality) completed++;
    if (this.state.contrast) completed++;
    if (this.state.region) completed++;
    return Math.round((completed / 3) * 100);
  }
  
  // ============================================
  // NAVIGATION
  // ============================================
  
  /**
   * Go back to previous state
   * 
   * @returns True if went back successfully
   */
  goBack(): boolean {
    if (this.history.length === 0) {
      return false;
    }
    
    this.state = this.history.pop()!;
    console.log('⬅️ Went back to previous state');
    return true;
  }
  
  /**
   * Clear the current region selection
   */
  clearRegion(): void {
    this.state.region = null;
  }
  
  /**
   * Clear contrast and region (go back to modality)
   */
  clearContrastAndRegion(): void {
    this.state.contrast = null;
    this.state.region = null;
  }
  
  /**
   * Reset entire selection flow
   */
  reset(): void {
    this.state = {
      modality: null,
      contrast: null,
      region: null
    };
    this.history = [];
    console.log('🔄 Selection flow reset');
  }
  
  // ============================================
  // RESOLUTION
  // ============================================
  
  /**
   * Resolve the final procedure based on current selections
   * 
   * @returns Resolved procedure object
   * @throws Error if selection is incomplete
   */
  resolve(): ResolvedProcedure | null {
    if (!this.isComplete()) {
      const missing = this.getMissingFields();
      throw new Error(`Incomplete selection. Missing: ${missing.join(', ')}`);
    }
    
    // Use the global ProcedureHelpers.resolveProcedure function
    if (typeof window !== 'undefined' && window.ProcedureHelpers) {
      const procedure = window.ProcedureHelpers.resolveProcedure(
        this.state.modality!,
        this.state.contrast!,
        this.state.region!
      );
      
      if (procedure) {
        console.log('✅ Procedure resolved:', procedure);
        return procedure;
      }
    }
    
    console.warn('⚠️ Could not resolve procedure');
    return null;
  }
  
  /**
   * Get list of missing required fields
   * 
   * @returns Array of missing field names
   */
  private getMissingFields(): string[] {
    const missing: string[] = [];
    if (!this.state.modality) missing.push('modality');
    if (!this.state.contrast) missing.push('contrast');
    if (!this.state.region) missing.push('region');
    return missing;
  }
  
  // ============================================
  // HISTORY MANAGEMENT
  // ============================================
  
  /**
   * Save current state to history before making changes
   */
  private saveToHistory(): void {
    this.history.push({ ...this.state });
    
    // Limit history to last 10 states
    if (this.history.length > 10) {
      this.history.shift();
    }
  }
  
  // ============================================
  // VALIDATION
  // ============================================
  
  /**
   * Check if a region is valid for the current modality
   * 
   * @param region - Region name to validate
   * @returns True if region is valid
   */
  canSelectRegion(region: string): boolean {
    if (!this.state.modality) return false;
    
    // Check if region exists in the procedure library for this modality
    if (typeof window !== 'undefined' && window.ProcedureHelpers) {
      const regionKey = window.ProcedureHelpers.normalizeRegionKey(
        region,
        this.state.modality
      );
      return regionKey !== null;
    }
    
    return false;
  }
  
  /**
   * Check if contrast selection is needed for current modality
   * 
   * @returns True if contrast selection is required
   */
  needsContrastSelection(): boolean {
    if (!this.state.modality) return false;
    
    const modalitiesWithContrast = ['MRI', 'CT'];
    return modalitiesWithContrast.includes(this.state.modality);
  }
  
  // ============================================
  // SERIALIZATION
  // ============================================
  
  /**
   * Export state as JSON string (for persistence)
   * 
   * @returns JSON string of current state
   */
  toJSON(): string {
    return JSON.stringify(this.state);
  }
  
  /**
   * Restore state from JSON string
   * 
   * @param json - JSON string to restore from
   */
  fromJSON(json: string): void {
    try {
      const state = JSON.parse(json);
      this.state = state;
      console.log('✅ State restored from JSON');
    } catch (error) {
      console.error('❌ Failed to restore state from JSON:', error);
    }
  }
  
  /**
   * Get URL-safe query string representation
   * 
   * @returns Query string (e.g., "modality=MRI&contrast=without&region=Knee")
   */
  toQueryString(): string {
    const params = new URLSearchParams();
    
    if (this.state.modality) params.set('modality', this.state.modality);
    if (this.state.contrast) params.set('contrast', this.state.contrast);
    if (this.state.region) params.set('region', this.state.region);
    
    return params.toString();
  }
  
  /**
   * Restore state from URL query string
   * 
   * @param queryString - Query string to parse
   */
  fromQueryString(queryString: string): void {
    const params = new URLSearchParams(queryString);
    
    const modality = params.get('modality') as Modality | null;
    const contrast = params.get('contrast') as ContrastType | null;
    const region = params.get('region');
    
    if (modality) this.state.modality = modality;
    if (contrast) this.state.contrast = contrast;
    if (region) this.state.region = region;
    
    console.log('✅ State restored from query string');
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a new selection flow instance
 * 
 * @returns New SelectionFlow instance
 */
export function createSelectionFlow(): SelectionFlow {
  return new SelectionFlow();
}

/**
 * Create a selection flow with pre-populated state
 * 
 * @param initialState - Initial state values
 * @returns New SelectionFlow instance with state
 */
export function createSelectionFlowWithState(initialState: Partial<SelectionState>): SelectionFlow {
  const flow = new SelectionFlow();
  
  if (initialState.modality) {
    flow.setModality(initialState.modality);
  }
  if (initialState.contrast) {
    flow.setContrast(initialState.contrast);
  }
  if (initialState.region) {
    flow.setRegion(initialState.region);
  }
  
  return flow;
}

console.log('✅ Selection Flow Manager loaded');