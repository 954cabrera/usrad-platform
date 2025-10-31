// src/lib/format.ts
import type { ProcedureOption } from '../types/procedures';

export function variantLabel(o: ProcedureOption) {
  // Prefer explicit label (from your table), else fallback to option_name / contrast_type
  if (o.label && o.label.trim()) return o.label.trim();
  if (o.option_name && o.option_name.trim()) return o.option_name.trim();

  switch (o.contrast_type) {
    case 'none': return 'Without contrast';
    case 'with': return 'With contrast';
    case 'both': return 'With & without contrast';
    default:     return 'Standard';
  }
}

export function money(n?: number | null) {
  if (n === null || n === undefined) return '';
  return `$${Math.round(n).toLocaleString()}`;
}
