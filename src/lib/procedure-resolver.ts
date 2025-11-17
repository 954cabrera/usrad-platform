/**
 * Procedure Resolver - New Engine (Phase 0.5)
 * Canonical procedure resolution and search functions
 * 
 * This module provides a CPT-first, deterministic approach to procedure lookup
 * and search. It reads from the same procedure-data.js source used by the legacy engine.
 */

// Type definitions matching the structure in procedure-data.js
interface ProcedureMetadata {
  cpt: string;
  name: string;
  category?: string;
  bodyPart?: string;
  aliases?: string[];
  [key: string]: any;
}

interface ProcedureLibrary {
  procedures: ProcedureMetadata[];
  [key: string]: any;
}

/**
 * Access the global ProcedureLibrary loaded from procedure-data.js
 * Returns null if the library hasn't been loaded yet
 */
function getProcedureLibrary(): ProcedureLibrary | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return (window as any).ProcedureLibrary || null;
}

/**
 * Get a procedure by its CPT code
 * @param cpt - The CPT code to look up
 * @returns The procedure metadata or null if not found
 */
export function getProcedureByCPT(cpt: string): ProcedureMetadata | null {
  const library = getProcedureLibrary();
  if (!library || !library.procedures) {
    return null;
  }

  const normalizedCPT = cpt.trim();
  return library.procedures.find(p => p.cpt === normalizedCPT) || null;
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
  const library = getProcedureLibrary();
  if (!library || !library.procedures) {
    return [];
  }

  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = normalizeProcedureName(query);
  const queryTokens = normalizedQuery.split(' ').filter(t => t.length > 0);

  // Score each procedure based on match quality
  const scored = library.procedures.map(procedure => {
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
    }

    // Body part match
    if (procedure.bodyPart) {
      const normalizedBodyPart = normalizeProcedureName(procedure.bodyPart);
      if (normalizedBodyPart.includes(normalizedQuery)) {
        score += 100;
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