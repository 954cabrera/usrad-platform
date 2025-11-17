/**
 * Procedure Resolver - New Engine (Phase 1)
 * Canonical procedure resolution and search functions
 * 
 * This module provides a CPT-first, deterministic approach to procedure lookup
 * and search. It reads from the same procedure-data.js source used by the legacy engine.
 * 
 * Phase 1 Features:
 * - Canonical flattened procedure index
 * - CPT-first resolution
 * - Enhanced search with scoring
 * - Modality and body part inference
 * - Alias matching
 * - Memory-cached index for performance
 */

// Type definitions matching the structure in procedure-data.js
interface ProcedureMetadata {
  cpt: string;
  name: string;
  category?: string;
  bodyPart?: string;
  modality?: string;
  aliases?: string[];
  label?: string;
  shortLabel?: string;
  description?: string;
  duration?: string;
  prep?: string;
  useCase?: string;
  [key: string]: any;
}

interface CanonicalIndex {
  procedures: ProcedureMetadata[];
  proceduresByCPT: Map<string, ProcedureMetadata>;
  proceduresByModality: Map<string, ProcedureMetadata[]>;
  isLoaded: boolean;
}

// Global canonical index cache
let canonicalIndex: CanonicalIndex | null = null;

/**
 * Access the global ProcedureLibrary loaded from procedure-data.js
 * Returns null if the library hasn't been loaded yet
 */
function getProcedureLibrary(): any | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return (window as any).ProcedureLibrary || null;
}

/**
 * Build canonical flattened procedure index from nested metadata
 * Traverses MRI, CT, X-Ray, Ultrasound structures and extracts all procedures
 * 
 * @param library - The ProcedureLibrary object from window
 * @returns Canonical index with flattened procedures
 */
function buildCanonicalIndex(library: any): CanonicalIndex {
  const procedures: ProcedureMetadata[] = [];
  const proceduresByCPT = new Map<string, ProcedureMetadata>();
  const proceduresByModality = new Map<string, ProcedureMetadata[]>();

  if (!library) {
    return {
      procedures: [],
      proceduresByCPT,
      proceduresByModality,
      isLoaded: false
    };
  }

  // Helper to extract procedures from a modality object
  const extractFromModality = (modalityData: any, modalityName: string) => {
    if (!modalityData || typeof modalityData !== 'object') {
      return;
    }

    // Iterate through regions/categories
    for (const regionKey in modalityData) {
      const regionData = modalityData[regionKey];
      
      // Skip if not a valid region object
      if (!regionData || typeof regionData !== 'object') {
        continue;
      }

      // Extract metadata
      const category = regionData.category || regionKey;
      const bodyPart = regionData.category || regionKey;
      const proceduresList = regionData.procedures || [];

      // Process each procedure in this region
      proceduresList.forEach((proc: any) => {
        if (!proc || !proc.cpt) {
          return; // Skip invalid procedures
        }

        // Build canonical procedure object
        const canonical: ProcedureMetadata = {
          cpt: proc.cpt,
          name: proc.label || proc.name || `${modalityName} ${category}`,
          category: category,
          bodyPart: bodyPart,
          modality: modalityName,
          aliases: proc.aliases || [],
          label: proc.label,
          shortLabel: proc.shortLabel,
          description: proc.description,
          duration: proc.duration,
          prep: proc.prep,
          useCase: proc.useCase
        };

        // Add to main array
        procedures.push(canonical);

        // Index by CPT
        proceduresByCPT.set(proc.cpt, canonical);

        // Index by modality
        if (!proceduresByModality.has(modalityName)) {
          proceduresByModality.set(modalityName, []);
        }
        proceduresByModality.get(modalityName)!.push(canonical);
      });
    }
  };

  // Extract from all modalities
  if (library.MRI) {
    extractFromModality(library.MRI, 'MRI');
  }
  if (library.CT) {
    extractFromModality(library.CT, 'CT');
  }
  if (library['X-Ray']) {
    extractFromModality(library['X-Ray'], 'X-Ray');
  }
  if (library.Ultrasound) {
    extractFromModality(library.Ultrasound, 'Ultrasound');
  }

  return {
    procedures,
    proceduresByCPT,
    proceduresByModality,
    isLoaded: true
  };
}

/**
 * Load and cache the canonical index
 * This should be called once at application startup when the feature flag is enabled
 * 
 * @returns true if index was loaded successfully, false otherwise
 */
export function loadCanonicalIndex(): boolean {
  // Return cached index if already loaded
  if (canonicalIndex && canonicalIndex.isLoaded) {
    return true;
  }

  const library = getProcedureLibrary();
  if (!library) {
    console.warn('[New Engine] ProcedureLibrary not available yet');
    return false;
  }

  canonicalIndex = buildCanonicalIndex(library);

  if (canonicalIndex.isLoaded) {
    console.log('[New Engine] Canonical index loaded', {
      totalProcedures: canonicalIndex.procedures.length,
      modalities: Array.from(canonicalIndex.proceduresByModality.keys()),
      cptCount: canonicalIndex.proceduresByCPT.size
    });
  }

  return canonicalIndex.isLoaded;
}

/**
 * Get the canonical index, loading it if necessary
 * @returns The canonical index or null if not available
 */
function getCanonicalIndex(): CanonicalIndex | null {
  if (!canonicalIndex || !canonicalIndex.isLoaded) {
    loadCanonicalIndex();
  }
  return canonicalIndex && canonicalIndex.isLoaded ? canonicalIndex : null;
}

/**
 * Get a procedure by its CPT code
 * @param cpt - The CPT code to look up
 * @returns The procedure metadata or null if not found
 */
export function getProcedureByCPT(cpt: string): ProcedureMetadata | null {
  const index = getCanonicalIndex();
  if (!index) {
    return null;
  }

  const normalizedCPT = cpt.trim();
  return index.proceduresByCPT.get(normalizedCPT) || null;
}

/**
 * Normalize a procedure name for comparison
 * - Converts to lowercase
 * - Removes extra whitespace
 * - Removes common punctuation
 */
export function normalizeProcedureName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

/**
 * Search procedures by query string
 * Searches across CPT codes, names, categories, body parts, and aliases
 * 
 * @param query - The search query
 * @param limit - Maximum number of results to return (default: 10)
 * @returns Array of matching procedures, sorted by relevance
 */
export function searchProcedures(query: string, limit: number = 10): ProcedureMetadata[] {
  const index = getCanonicalIndex();
  if (!index) {
    return [];
  }

  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = normalizeProcedureName(query);
  const queryTokens = normalizedQuery.split(' ').filter(t => t.length > 0);

  // Score each procedure based on match quality
  const scored = index.procedures.map(procedure => {
    let score = 0;

    // Exact CPT match (highest priority)
    if (procedure.cpt === query.trim()) {
      score += 1000;
    }

    // Partial CPT match
    if (procedure.cpt.includes(query.trim())) {
      score += 500;
    }

    const normalizedName = normalizeProcedureName(procedure.name);

    // Exact name match
    if (normalizedName === normalizedQuery) {
      score += 800;
    }

    // Name starts with query
    if (normalizedName.startsWith(normalizedQuery)) {
      score += 400;
    }

    // All query tokens present in name
    const allTokensInName = queryTokens.every(token => normalizedName.includes(token));
    if (allTokensInName && queryTokens.length > 0) {
      score += 300;
    }

    // Individual token matches in name
    queryTokens.forEach(token => {
      if (normalizedName.includes(token)) {
        score += 50;
      }
    });

    // Category match
    if (procedure.category) {
      const normalizedCategory = normalizeProcedureName(procedure.category);
      if (normalizedCategory.includes(normalizedQuery)) {
        score += 100;
      }
      queryTokens.forEach(token => {
        if (normalizedCategory.includes(token)) {
          score += 25;
        }
      });
    }

    // Body part match
    if (procedure.bodyPart) {
      const normalizedBodyPart = normalizeProcedureName(procedure.bodyPart);
      if (normalizedBodyPart.includes(normalizedQuery)) {
        score += 100;
      }
      queryTokens.forEach(token => {
        if (normalizedBodyPart.includes(token)) {
          score += 25;
        }
      });
    }

    // Modality match
    if (procedure.modality) {
      const normalizedModality = normalizeProcedureName(procedure.modality);
      if (normalizedModality.includes(normalizedQuery)) {
        score += 150;
      }
    }

    // Alias matches
    if (procedure.aliases && Array.isArray(procedure.aliases)) {
      procedure.aliases.forEach(alias => {
        const normalizedAlias = normalizeProcedureName(alias);
        if (normalizedAlias === normalizedQuery) {
          score += 600;
        } else if (normalizedAlias.includes(normalizedQuery)) {
          score += 200;
        }
        queryTokens.forEach(token => {
          if (normalizedAlias.includes(token)) {
            score += 30;
          }
        });
      });
    }

    // Use case and description matches (lower priority)
    if (procedure.useCase) {
      const normalizedUseCase = normalizeProcedureName(procedure.useCase);
      queryTokens.forEach(token => {
        if (normalizedUseCase.includes(token)) {
          score += 10;
        }
      });
    }

    if (procedure.description) {
      const normalizedDescription = normalizeProcedureName(procedure.description);
      queryTokens.forEach(token => {
        if (normalizedDescription.includes(token)) {
          score += 5;
        }
      });
    }

    return { procedure, score };
  });

  // Filter to only scored items and sort by score descending
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.procedure);
}

/**
 * Resolve CPT code and canonical name from user input
 * Handles cases where input might be:
 * - A CPT code directly
 * - A procedure name
 * - A partial match
 * 
 * @param input - User input string
 * @returns Object with cpt and name, or null if no match found
 */
export function resolveCPTAndNameFromInput(
  input: string
): { cpt: string; name: string } | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const trimmedInput = input.trim();

  // Try direct CPT lookup first
  const directMatch = getProcedureByCPT(trimmedInput);
  if (directMatch) {
    return {
      cpt: directMatch.cpt,
      name: directMatch.name
    };
  }

  // Try searching for the best match
  const searchResults = searchProcedures(trimmedInput, 1);
  if (searchResults.length > 0) {
    return {
      cpt: searchResults[0].cpt,
      name: searchResults[0].name
    };
  }

  return null;
}

/**
 * Get all procedures for a specific modality
 * @param modality - The modality name (MRI, CT, X-Ray, Ultrasound)
 * @returns Array of procedures for that modality
 */
export function getProceduresByModality(modality: string): ProcedureMetadata[] {
  const index = getCanonicalIndex();
  if (!index) {
    return [];
  }

  return index.proceduresByModality.get(modality) || [];
}

/**
 * Get index statistics (for debugging)
 * @returns Object with index statistics
 */
export function getIndexStats(): {
  isLoaded: boolean;
  totalProcedures: number;
  modalities: string[];
  cptCount: number;
} {
  const index = getCanonicalIndex();
  
  if (!index) {
    return {
      isLoaded: false,
      totalProcedures: 0,
      modalities: [],
      cptCount: 0
    };
  }

  return {
    isLoaded: index.isLoaded,
    totalProcedures: index.procedures.length,
    modalities: Array.from(index.proceduresByModality.keys()),
    cptCount: index.proceduresByCPT.size
  };
}