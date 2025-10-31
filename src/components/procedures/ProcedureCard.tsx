// src/components/procedures/ProcedureCard.tsx
import type { ProcedureMaster } from '../../types/procedures';
import { variantLabel, money } from '../../lib/format';

export default function ProcedureCard({ item }: { item: ProcedureMaster }) {
  const variants = (item.procedure_options || [])
    .filter(v => v.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">{item.modality}</div>
          <div className="text-lg font-semibold text-gray-900">{item.official_name}</div>
          <div className="text-xs text-gray-500 mt-0.5">Base CPT: {item.cpt_code}</div>
        </div>
      </div>

      {variants.length > 0 && (
        <div className="mt-3 space-y-2">
          {variants.map(v => (
            <div key={v.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
              <div className="text-sm text-gray-800">
                {variantLabel(v)}
                {v.detail ? <span className="ml-2 text-xs text-gray-500">· {v.detail}</span> : null}
              </div>
              <div className="text-sm text-gray-700">
                {v.cpt_code} {v.typical_price ? <span className="ml-2">{money(v.typical_price)}</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {variants.length === 0 && (
        <div className="mt-2 text-sm text-gray-500">
          No variants (e.g., Ultrasound, X-Ray). Book as listed.
        </div>
      )}
    </div>
  );
}
