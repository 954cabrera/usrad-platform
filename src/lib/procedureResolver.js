// src/pages/api/resolve.js
import { supabase } from '../../lib/supabase.js';
import {
  resolveProcedure,
  formatPatientLabel,
} from '../../lib/procedureResolver.js';

export const prerender = false;

/**
 * GET /api/resolve?modality=MRI&contrast=With+Contrast&region=Knee
 */
export async function GET({ request }) {
  try {
    const url = new URL(request.url);

    const modality = url.searchParams.get('modality')?.toUpperCase();
    const contrast = url.searchParams.get('contrast')?.trim();
    const region = url.searchParams.get('region')?.trim();

    // --- Basic validation ---
    if (!modality || !region) {
      return new Response(
        JSON.stringify({ found: false, error: 'Missing required parameters' }),
        { status: 400 }
      );
    }

    // --- Supported modalities ---
    if (!['MRI', 'CT'].includes(modality)) {
      return new Response(
        JSON.stringify({ found: false, error: 'Unsupported modality' }),
        { status: 400 }
      );
    }

    // --- Call shared resolver ---
    const { rows, error } = await resolveProcedure({
      supabase,
      modality,
      contrast,
      patientRegion: region,
    });

    if (error) {
      return new Response(
        JSON.stringify({ found: false, error }),
        { status: 404 }
      );
    }

    if (!rows?.length) {
      return new Response(
        JSON.stringify({ found: false, error: 'Procedure not found' }),
        { status: 404 }
      );
    }

    // --- Use first match (standard behavior) ---
    const match = rows[0];
    const patient_label = formatPatientLabel(
      match.friendly_name,
      match.cpt_code
    );

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
