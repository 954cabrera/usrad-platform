import { fixCharacterEncoding, normalizeQuery, textContainsQuery } from './search-utils';
import { USE_NEW_PROCEDURE_ENGINE, ENABLE_DEBUG_NEW_ENGINE } from './feature-flags';
import {
  searchProcedures as newEngineSearch,
  getProcedureByCPT,
  resolveCPTAndNameFromInput,
  loadCanonicalIndex
} from './procedure-resolver';

export interface Procedure {
  label: string;
  cptCode?: string;
  cpt?: string;
  modality: string;
  bodyPart?: string;
  region?: string;
  // Phase 1: Dual-identity support
  bodyPartKey?: string; // Body part identifier for dual-identity procedures
  displayLabelOverride?: string; // Patient-friendly label override
}

export interface SearchState {
  currentQuery: string;
  searchResults: Procedure[];
  selectedProcedure: Procedure | null;
  zipCode: string;
  isDropdownOpen: boolean;
  currentStep: 1 | 2;
  popularProcedures: Procedure[];
}

type Subscriber = (state: SearchState) => void;

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

  initialize(
    mriData: Record<string, any>,
    ctData: Record<string, any>,
    xrayData: Record<string, any>,
    ultrasoundData: Record<string, any>,
    popularProcedures: Procedure[]
  ): void {
    // Initialize New Engine canonical index if feature flag is enabled
    if (USE_NEW_PROCEDURE_ENGINE) {
      const loaded = loadCanonicalIndex();
      if (loaded && ENABLE_DEBUG_NEW_ENGINE) {
        console.log('[SearchManager] New Engine canonical index loaded');
      }
    }

    this.procedureData = {
      MRI: mriData,
      CT: ctData,
      XRay: xrayData,
      Ultrasound: ultrasoundData,
    };

    this.allProcedures = this.flattenProcedures();

    this.state.popularProcedures = popularProcedures.map(proc => ({
      ...proc,
      label: fixCharacterEncoding(proc.label),
    }));

    console.log('SearchManager: Initialized', {
      totalProcedures: this.allProcedures.length,
      popularCount: this.state.popularProcedures.length,
    });
  }

  private flattenProcedures(): Procedure[] {
    const procedures: Procedure[] = [];

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

    extractFromModality(this.procedureData.MRI, 'MRI');
    extractFromModality(this.procedureData.CT, 'CT');
    extractFromModality(this.procedureData.XRay, 'X-Ray');
    extractFromModality(this.procedureData.Ultrasound, 'Ultrasound');

    return procedures;
  }

  search(query: string): void {
    this.state.currentQuery = query;

    if (!query || query.trim().length < 2) {
      this.state.searchResults = [];
      this.notify();
      return;
    }

    // Determine which engine to use based on feature flags
    if (USE_NEW_PROCEDURE_ENGINE) {
      // New Engine is active
      const newEngineResults = this.performNewEngineSearch(query);
      
      // If debug mode is enabled, run legacy in parallel for comparison
      if (ENABLE_DEBUG_NEW_ENGINE) {
        const legacyResults = this.performLegacySearch(query);
        this.runComparisonLogging(query, newEngineResults, legacyResults);
      }
      
      // Use New Engine results for UI
      this.state.searchResults = newEngineResults.slice(0, 20);
    } else {
      // Legacy Engine is active
      const legacyResults = this.performLegacySearch(query);
      this.state.searchResults = legacyResults.slice(0, 20);
    }

    console.log('SearchManager: Search', {
      query,
      resultsCount: this.state.searchResults.length,
      engine: USE_NEW_PROCEDURE_ENGINE ? 'New Engine' : 'Legacy Engine',
    });

    this.notify();
  }

  private performNewEngineSearch(query: string): Procedure[] {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Call New Engine search
    const newEngineResults = newEngineSearch(query, 20);

    // Map New Engine ProcedureMetadata to UI Procedure shape
    return newEngineResults.map(proc => ({
      label: proc.name,
      cptCode: proc.cpt,
      cpt: proc.cpt,
      modality: proc.modality || 'Unknown',
      bodyPart: proc.bodyPart,
      region: proc.bodyPart,
    }));
  }

  private performLegacySearch(query: string): Procedure[] {
    if (!query || query.trim().length < 2) {
      return [];
    }

    return this.allProcedures.filter(proc => {
      const searchText = `${proc.label} ${proc.modality} ${proc.bodyPart || ''} ${proc.cptCode || ''}`;
      return textContainsQuery(searchText, query);
    });
  }

  private runComparisonLogging(query: string, newEngineResults: Procedure[], legacyResults: Procedure[]): void {
    try {
      console.group('🔬 Phase 1: Engine Comparison');
      console.log('Query:', query);

      const newEngineCPTs = new Set(newEngineResults.map(p => p.cpt).filter(Boolean));
      const legacyCPTs = new Set(legacyResults.map(p => p.cptCode || p.cpt).filter(Boolean));

      const onlyInLegacy = legacyResults.filter(p => {
        const cpt = p.cptCode || p.cpt;
        return cpt && !newEngineCPTs.has(cpt);
      });

      const onlyInNewEngine = newEngineResults.filter(p => {
        return p.cpt && !legacyCPTs.has(p.cpt);
      });

      const inBoth = newEngineResults.filter(p => {
        return p.cpt && legacyCPTs.has(p.cpt);
      });

      console.log('New Engine results:', newEngineResults.length);
      console.log('Legacy results:', legacyResults.length);
      console.log('In both engines:', inBoth.length);
      console.log('Only in Legacy:', onlyInLegacy.length, onlyInLegacy.slice(0, 5));
      console.log('Only in New Engine:', onlyInNewEngine.length, onlyInNewEngine.slice(0, 5));
      
      // Show top 3 from each for visual comparison
      console.log('Top 3 New Engine:', newEngineResults.slice(0, 3).map(p => ({ cpt: p.cpt, label: p.label })));
      console.log('Top 3 Legacy:', legacyResults.slice(0, 3).map(p => ({ cpt: p.cptCode || p.cpt, label: p.label })));
      
      console.groupEnd();
    } catch (error) {
      console.error('Engine comparison logging failed:', error);
    }
  }

  selectProcedure(procedure: Procedure): void {
    // Phase 1: Preserve ALL fields including bodyPartKey and displayLabelOverride
    this.state.selectedProcedure = {
      ...procedure,
      label: fixCharacterEncoding(procedure.label),
      // Ensure Phase 1 fields are preserved
      bodyPartKey: (procedure as any).bodyPartKey || undefined,
      displayLabelOverride: (procedure as any).displayLabelOverride || undefined,
    };
    this.state.currentStep = 2;
    this.state.isDropdownOpen = false;

    console.log('SearchManager: Procedure selected', {
      label: procedure.label,
      cptCode: procedure.cptCode || procedure.cpt,
      bodyPartKey: (procedure as any).bodyPartKey || '(none)',
      displayLabelOverride: (procedure as any).displayLabelOverride || '(none)',
    });

    this.notify();
  }

  setZipCode(zip: string): void {
    this.state.zipCode = zip;
    this.notify();
  }

  openDropdown(): void {
  console.log('[SearchManager] openDropdown called');
  
  this.state.isDropdownOpen = true;
  this.notify();
  
  // PRODUCTION FIX: Wait for hydration/render cycle before DOM manipulation
  // setTimeout(0) pushes to next tick, after Astro Islands finish hydrating
  setTimeout(() => {
    const dropdown = document.getElementById('search-dropdown');
    const resultsSection = document.getElementById('search-results-section');
    
    if (dropdown) {
      dropdown.classList.remove('hidden');
      console.log('[SearchManager] Dropdown visible');
    }
    
    if (resultsSection) {
      resultsSection.classList.remove('hidden');
      console.log('[SearchManager] Results section visible');
    }
  }, 0);
}

  closeDropdown(): void {
  console.log('[SearchManager] closeDropdown called');
  
  this.state.isDropdownOpen = false;
  this.notify();
  
  // Also hide the DOM elements
  const dropdown = document.getElementById('search-dropdown');
  const resultsSection = document.getElementById('search-results-section');
  
  if (dropdown) {
    dropdown.classList.add('hidden');
  }
  
  if (resultsSection) {
    resultsSection.classList.add('hidden');
  }
}

  goToStep1(): void {
    this.state.currentStep = 1;
    this.state.selectedProcedure = null;
    this.state.currentQuery = '';
    this.state.searchResults = [];
    this.notify();
  }

  getState(): SearchState {
    return { ...this.state };
  }

  setState(updates: Partial<SearchState>): void {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(subscriber: Subscriber): () => void {
    this.subscribers.add(subscriber);
    subscriber(this.getState());
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

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

export const searchManager = new SearchManager();
export { SearchManager };
export function getSearchManager(): SearchManager {
  return searchManager;
}