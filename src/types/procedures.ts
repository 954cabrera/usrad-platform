// src/types/procedures.ts
export type ProcedureOption = {
  id: string;
  cpt_code: string;
  option_name: string | null;
  contrast_type: 'none' | 'with' | 'both' | null;
  typical_price: number | null;
  sort_order: number | null;
  is_active: boolean;
  label?: string | null;   // present in your schema
  detail?: string | null;  // present in your schema
};

export type ProcedureMaster = {
  id: string;
  modality: string;
  official_name: string;
  cpt_code: string;
  procedure_options?: ProcedureOption[];
};
