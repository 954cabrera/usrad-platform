import { fixCharacterEncoding, normalizeQuery, textContainsQuery } from './search-utils';
import { USE_NEW_PROCEDURE_ENGINE, ENABLE_DEBUG_NEW_ENGINE } from './feature-flags';
import {
  searchProcedures as newEngineSearch,
  getProcedureByCPT,
  resolveCPTAndNameFromInput
} from './procedure-resolver';

export interface Procedure {
  label: string;
  cptCode?: string;
  cpt?: string;
  modality: string;
  bodyPart?: string;
  region?: string;
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

// Removed this.notify() - subscribers already get initial state on subscribe()
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
    const legacyResults = this.performLegacySearch(query);

    if (!query || query.trim().length < 2) {
      this.state.searchResults = [];
      this.notify();
      return;
    }

    // Shadow-mode: Run new engine if flag is enabled
    if (USE_NEW_PROCEDURE_ENGINE && ENABLE_DEBUG_NEW_ENGINE) {
      this.runShadowModeComparison(query, legacyResults);
    }

    // Always use legacy results for UI
    this.state.searchResults = legacyResults.slice(0, 20);

    console.log('SearchManager: Search', {
      query,
      resultsCount: this.state.searchResults.length,
    });

    this.notify();
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

  private runShadowModeComparison(query: string, legacyResults: Procedure[]): void {
    try {
      // Run new engine search
      const newEngineResults = newEngineSearch(query, 20);

      // Map new engine results to legacy format for comparison
      const mappedNewResults = newEngineResults.map(proc => ({
        label: proc.name,
        cptCode: proc.cpt,
        cpt: proc.cpt,
        modality: this.inferModalityFromProcedure(proc),
        bodyPart: proc.bodyPart,
        region: proc.bodyPart,
      }));

      // Compare results
      const legacyCPTs = new Set(legacyResults.map(p => p.cptCode || p.cpt).filter(Boolean));
      const newEngineCPTs = new Set(mappedNewResults.map(p => p.cpt).filter(Boolean));

      const onlyInLegacy = legacyResults.filter(p => {
        const cpt = p.cptCode || p.cpt;
        return cpt && !newEngineCPTs.has(cpt);
      });

      const onlyInNewEngine = mappedNewResults.filter(p => {
        return p.cpt && !legacyCPTs.has(p.cpt);
      });

      console.group('🔬 Shadow Mode: Engine Comparison');
      console.log('Query:', query);
      console.log('Legacy results:', legacyResults.length);
      console.log('New Engine results:', newEngineResults.length);
      console.log('Only in Legacy:', onlyInLegacy.length, onlyInLegacy.slice(0, 5));
      console.log('Only in New Engine:', onlyInNewEngine.length, onlyInNewEngine.slice(0, 5));
      console.groupEnd();
    } catch (error) {
      console.error('Shadow mode comparison failed:', error);
    }
  }

  private inferModalityFromProcedure(proc: any): string {
    // Simple heuristic: infer from category or name
    const text = `${proc.category || ''} ${proc.name || ''}`.toLowerCase();
    if (text.includes('mri')) return 'MRI';
    if (text.includes('ct') || text.includes('computed tomography')) return 'CT';
    if (text.includes('ultrasound') || text.includes('sonography')) return 'Ultrasound';
    if (text.includes('x-ray') || text.includes('xray') || text.includes('radiograph')) return 'X-Ray';
    return 'Unknown';
  }

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

  setZipCode(zip: string): void {
    this.state.zipCode = zip;
    this.notify();
  }

  openDropdown(): void {
    this.state.isDropdownOpen = true;
    this.notify();
  }

  closeDropdown(): void {
    this.state.isDropdownOpen = false;
    this.notify();
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