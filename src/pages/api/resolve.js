// src/pages/api/resolve.js
import { supabase } from '../../lib/supabase.js';
import {
  resolveProcedureUniversal,
  formatPatientLabel,
} from '../../lib/procedureResolver.js';

export const prerender = false;

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const modality = url.searchParams.get('modality')?.toUpperCase();
    const contrast = url.searchParams.get('contrast')?.trim();
    const region = url.searchParams.get('region')?.trim();

    // --- Validation ---
    if (!modality || !region) {
      return new Response(
        JSON.stringify({ found: false, error: 'Missing required parameters' }),
        { status: 400 }
      );
    }

    // --- Call the universal resolver ---
const { rows: dataRows, error: resolverError } = await resolveProcedureUniversal({
  supabase,
  modality,
  contrast,
  patientRegion: region,
});

// --- Handle resolver errors or no matches ---
if (resolverError || !dataRows?.length) {
  return new Response(
    JSON.stringify({ found: false, error: resolverError || 'Procedure not found' }),
    { status: 404 }
  );
}

// --- Format first result for UI ---
const match = dataRows[0];
const patient_label = formatPatientLabel(match.friendly_name, match.cpt_code);

return new Response(
  JSON.stringify({
    found: true,
    procedure: {
      cpt_code: match.cpt_code,
      patient_label,
      badge_label: `CPT ${match.cpt_code}`,
    },
  }),
  { status: 200 }
);

  } catch (e) {
    console.error('❌ Resolver Error', e);
    return new Response(
      JSON.stringify({
        found: false,
        error: 'Server error',
        details: e.message,
      }),
      { status: 500 }
    );
  }
}
