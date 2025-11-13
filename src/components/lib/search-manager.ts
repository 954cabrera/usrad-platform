/**
 * search-manager.ts
 * 
 * Centralized state management for the hero search experience
 * 
 * This module provides a singleton SearchManager that:
 * 1. Manages all search-related state
 * 2. Provides reactive updates via subscribers
 * 3. Handles procedure search and selection
 * 4. Coordinates dropdown/modal visibility
 * 5. Manages step transitions (Step 1 ↔ Step 2)
 */

import { fixCharacterEncoding, normalizeQuery, textContainsQuery } from './search-utils';

/**
 * Procedure data structure
 */
export interface Procedure {
  label: string;
  cptCode?: string;
  cpt?: string;
  modality: string;
  bodyPart?: string;
  region?: string;
}

/**
 * Search state interface
 */
export interface SearchState {
  // Search query
  currentQuery: string;
  searchResults: Procedure[];
  
  // Selected procedure
  selectedProcedure: Procedure | null;
  
  // ZIP code
  zipCode: string;
  
  // UI state
  isDropdownOpen: boolean;
  currentStep: 1 | 2;
  
  // Procedure data
  popularProcedures: Procedure[];
}

/**
 * State change subscriber function type
 */
type Subscriber = (state: SearchState) => void;

/**
 * SearchManager - Centralized state management
 */
class SearchManager {
  private state: SearchState;
  private subscribers: Set<Subscriber>;
  private procedureData: {
    MRI: Record<string, any>;
    CT: Record<string, any>;
    XRay: Record<string, any>;
    Ultrasound: Record<string, any>;
  };
  private allProcedures: Procedure[];

  constructor() {
    // Initial state
    this.state = {
      currentQuery: '',
      searchResults: [],
      selectedProcedure: null,
      zipCode: '',
      isDropdownOpen: false,
      currentStep: 1,
      popularProcedures: [],
    };

    this.subscribers = new Set();
    this.procedureData = {
      MRI: {},
      CT: {},
      XRay: {},
      Ultrasound: {},
    };
    this.allProcedures = [];
  }

  /**
   * Initialize with procedure data
   */
  initialize(
    mriData: Record<string, any>,
    ctData: Record<string, any>,
    xrayData: Record<string, any>,
    ultrasoundData: Record<string, any>,
    popularProcedures: Procedure[]
  ): void {
    this.procedureData = {
      MRI: mriData,
      CT: ctData,
      XRay: xrayData,
      Ultrasound: ultrasoundData,
    };

    // Flatten all procedures for searching
    this.allProcedures = this.flattenProcedures();

    // Set popular procedures
    this.state.popularProcedures = popularProcedures.map(proc => ({
      ...proc,
      label: fixCharacterEncoding(proc.label),
    }));

    console.log('SearchManager: Initialized', {
      totalProcedures: this.allProcedures.length,
      popularCount: this.state.popularProcedures.length,
    });

    this.notify();
  }

  /**
   * Flatten procedure data into searchable array
   */
  private flattenProcedures(): Procedure[] {
    const procedures: Procedure[] = [];

    // Helper to extract procedures from modality data
    const extractFromModality = (modalityData: Record<string, any>, modalityName: string) => {
      for (const region in modalityData) {
        const entry = modalityData[region];
        const regionProcedures = entry.procedures || [];

        regionProcedures.forEach((proc: any) => {
          procedures.push({
            label: fixCharacterEncoding(proc.label),
            cptCode: proc.cpt || proc.cptCode,
            cpt: proc.cpt || proc.cptCode,
            modality: modalityName,
            bodyPart: region,
            region: region,
          });
        });
      }
    };

    // Extract from all modalities
    extractFromModality(this.procedureData.MRI, 'MRI');
    extractFromModality(this.procedureData.CT, 'CT');
    extractFromModality(this.procedureData.XRay, 'X-Ray');
    extractFromModality(this.procedureData.Ultrasound, 'Ultrasound');

    return procedures;
  }

  /**
   * Search for procedures
   */
  search(query: string): void {
    const normalizedQuery = normalizeQuery(query);

    this.state.currentQuery = query;

    if (!normalizedQuery || normalizedQuery.length < 2) {
      this.state.searchResults = [];
      this.notify();
      return;
    }

    // Search through all procedures
    const results = this.allProcedures.filter(proc => {
      const searchText = `${proc.label} ${proc.modality} ${proc.bodyPart || ''} ${proc.cptCode || ''}`;
      return textContainsQuery(searchText, normalizedQuery);
    });

    // Limit to top 20 results
    this.state.searchResults = results.slice(0, 20);

    console.log('SearchManager: Search', {
      query,
      resultsCount: this.state.searchResults.length,
    });

    this.notify();
  }

  /**
   * Select a procedure
   */
  selectProcedure(procedure: Procedure): void {
    this.state.selectedProcedure = {
      ...procedure,
      label: fixCharacterEncoding(procedure.label),
    };
    this.state.currentStep = 2;
    this.state.isDropdownOpen = false;

    console.log('SearchManager: Procedure selected', {
      label: procedure.label,
      cptCode: procedure.cptCode || procedure.cpt,
    });

    this.notify();
  }

  /**
   * Set ZIP code
   */
  setZipCode(zip: string): void {
    this.state.zipCode = zip;
    this.notify();
  }

  /**
   * Open dropdown
   */
  openDropdown(): void {
    this.state.isDropdownOpen = true;
    this.notify();
  }

  /**
   * Close dropdown
   */
  closeDropdown(): void {
    this.state.isDropdownOpen = false;
    this.notify();
  }

  /**
   * Go back to step 1
   */
  goToStep1(): void {
    this.state.currentStep = 1;
    this.state.selectedProcedure = null;
    this.state.currentQuery = '';
    this.state.searchResults = [];
    this.notify();
  }

  /**
   * Get current state
   */
  getState(): SearchState {
    return { ...this.state };
  }

  /**
   * Update state directly (use sparingly)
   */
  setState(updates: Partial<SearchState>): void {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(subscriber: Subscriber): () => void {
    this.subscribers.add(subscriber);

    // Immediately call with current state
    subscriber(this.getState());

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  /**
   * Notify all subscribers of state change
   */
  private notify(): void {
    const state = this.getState();
    this.subscribers.forEach(subscriber => {
      try {
        subscriber(state);
      } catch (error) {
        console.error('SearchManager: Subscriber error', error);
      }
    });
  }
}

// Export singleton instance
export const searchManager = new SearchManager();

// Also export the class for testing
export { SearchManager };

// Export for backwards compatibility
export function getSearchManager(): SearchManager {
  return searchManager;
}