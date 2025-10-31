import { supabase } from './supabaseClient'

// Base procedure type
export interface ProcedureMaster {
  id: string
  official_name: string
  modality: string
  cpt_code: string
  procedure_options?: ProcedureOption[]
}

export interface ProcedureOption {
  id: string
  option_name: string
  contrast_type: string | null
  typical_price: number | null
  is_active: boolean
}

// ─────────────────────────────────────────────
// Fetch top (popular) procedures – limited
// ─────────────────────────────────────────────
export async function fetchPopularProcedures(limit = 20): Promise<ProcedureMaster[]> {
  const { data, error } = await supabase
    .from('procedure_master')
    .select(`
      id,
      official_name,
      modality,
      cpt_code,
      procedure_options (
        id,
        option_name,
        contrast_type,
        typical_price,
        is_active
      )
    `)
    .eq('is_active', true)
    .order('modality', { ascending: true })
    .order('official_name', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Supabase fetchPopularProcedures error:', error.message)
    return []
  }

  return data || []
}

// ─────────────────────────────────────────────
// Fetch all procedures (for “Browse all” modal)
// ─────────────────────────────────────────────
export async function fetchAllProcedures(): Promise<ProcedureMaster[]> {
  const { data, error } = await supabase
    .from('procedure_master')
    .select(`
      id,
      official_name,
      modality,
      cpt_code,
      procedure_options (
        id,
        option_name,
        contrast_type,
        typical_price,
        is_active
      )
    `)
    .eq('is_active', true)
    .order('modality', { ascending: true })
    .order('official_name', { ascending: true })

  if (error) {
    console.error('Supabase fetchAllProcedures error:', error.message)
    return []
  }

  return data || []
}

// ─────────────────────────────────────────────
// Utility: group procedures by modality
// (useful for admin QA dashboards)
// ─────────────────────────────────────────────
export function groupByModality(procedures: ProcedureMaster[]): Record<string, ProcedureMaster[]> {
  return procedures.reduce((acc, proc) => {
    const key = proc.modality || 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(proc)
    return acc
  }, {} as Record<string, ProcedureMaster[]>)
}
