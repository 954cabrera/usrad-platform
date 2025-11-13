import { fixCharacterEncoding, normalizeQuery, textContainsQuery } from './search-utils';

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

    this.notify();
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
    const normalizedQuery = normalizeQuery(query);

    this.state.currentQuery = query;

    if (!normalizedQuery || normalizedQuery.length < 2) {
      this.state.searchResults = [];
      this.notify();
      return;
    }

    const results = this.allProcedures.filter(proc => {
      const searchText = `${proc.label} ${proc.modality} ${proc.bodyPart || ''} ${proc.cptCode || ''}`;
      return textContainsQuery(searchText, normalizedQuery);
    });

    this.state.searchResults = results.slice(0, 20);

    console.log('SearchManager: Search', {
      query,
      resultsCount: this.state.searchResults.length,
    });

    this.notify();
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
