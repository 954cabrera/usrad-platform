// ======================================================
// UNIVERSAL SEARCH ENGINE
// ======================================================
// Smart search logic for MRI, CT, X-Ray, and Ultrasound
// ======================================================

import { buildUniversalIndex, type ProcedureIndexEntry, BODY_PART_ALIASES } from "./universal-search-index";

// ======================================================
// QUERY ALIAS EXPANSION
// ======================================================
// ======================================================
// QUERY ALIAS EXPANSION
// ======================================================
// Converts "elbow" -> "elbow upper extremity arm" before matching
// Also handles common variations like "xray" -> "xray x-ray x ray"
function expandQueryWithAliases(query: string): string {
  let q = query.toLowerCase();
  
  // Handle X-Ray variations - expand "xray" to include all forms
  if (q === 'xray' || q === 'x-ray' || q === 'x ray') {
    q = 'xray x-ray x ray';
  } else if (q.startsWith('xray ') || q.includes(' xray')) {
    q = q.replace(/\bxray\b/g, 'xray x-ray x ray');
  } else if (q.startsWith('x-ray ') || q.includes(' x-ray')) {
    q = q.replace(/\bx-ray\b/g, 'xray x-ray x ray');
  } else if (q.startsWith('x ray ') || q.includes(' x ray')) {
    q = q.replace(/\bx ray\b/g, 'xray x-ray x ray');
  }
  
  // Expand body part aliases
  for (const [key, aliases] of Object.entries(BODY_PART_ALIASES)) {
    if (q.includes(key)) return [q, ...aliases].join(" ");
  }
  return q;
}

function normalizeInput(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Detect if user entered CPT, Modality, or Body Part
function detectIntent(input: string): "cpt" | "modality" | "bodyPart" | "mixed" {
  const normalized = normalizeInput(input);
  
  // Exact CPT code (5 digits)
  if (/^\d{5}$/.test(normalized)) return "cpt";
  
  // Modality keywords
  if (/^(mri|ct|xray|x-ray|x ray|ultrasound|us)$/i.test(normalized)) return "modality";
  
  // Common body parts
  if (/^(brain|chest|abdomen|knee|shoulder|neck|leg|foot|spine|pelvis|head|heart|liver|kidney)$/i.test(normalized)) {
    return "bodyPart";
  }
  
  return "mixed";
}

function getMatchScore(entry: ProcedureIndexEntry, query: string): number {
  const q = normalizeInput(query);
  const s = entry.searchable;
  
  // Exact CPT match - highest priority
  if (entry.cpt === q) return 120;
  
  // Direct substring match in searchable text
  if (s.includes(q)) return 100;
  
  // Handle xray variations - check if normalized query matches
  const qNoHyphen = q.replace(/-/g, '').replace(/\s+/g, '');
  const sNoHyphen = s.replace(/-/g, '').replace(/\s+/g, '');
  if (sNoHyphen.includes(qNoHyphen)) return 95;
  
  // Tag match
  if (entry.tags.some(t => t.includes(q) || t.replace(/-/g, '').includes(qNoHyphen))) return 90;
  
  // Body part match
  if (entry.bodyPart.toLowerCase().includes(q)) return 80;
  
  // Modality match
  if (entry.modality.toLowerCase().includes(q)) return 70;
  
  // Partial word matches (split query into words)
  const queryWords = q.split(/\s+/);
  let partialScore = 0;
  for (const word of queryWords) {
    if (word.length < 2) continue; // Skip very short words
    if (s.includes(word)) partialScore += 30;
  }
  if (partialScore > 0) return partialScore;
  
  return 0;
}

export function searchUniversalProcedures(query: string, limit = 8): ProcedureIndexEntry[] {
  // Expand aliases and normalize input
  const q = normalizeInput(expandQueryWithAliases(query));
  if (q.length < 2) return [];

  // Build index fresh each time to ensure it has latest data
  const index = buildUniversalIndex();

  if (index.length === 0) {
    console.warn("⚠️ Universal index is empty");
    return [];
  }

  const intent = detectIntent(q);

  const results = index
    .map(entry => ({
      ...entry,
      score: getMatchScore(entry, q),
    }))
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return results;
}


// Optional: group by modality for display
export function groupResultsByModality(results: ProcedureIndexEntry[]): Record<string, ProcedureIndexEntry[]> {
  const groups: Record<string, ProcedureIndexEntry[]> = {};
  for (const item of results) {
    if (!groups[item.modality]) groups[item.modality] = [];
    groups[item.modality].push(item);
  }
  return groups;
}

// Expose globally for testing
declare global {
  interface Window {
    searchUniversalProcedures: typeof searchUniversalProcedures;
  }
}

if (typeof window !== 'undefined') {
  window.searchUniversalProcedures = searchUniversalProcedures;
  console.log("[OK] Universal Search Engine initialized.");
}