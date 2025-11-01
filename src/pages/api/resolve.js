// src/pages/api/resolve.js
import { supabase } from '../../lib/supabase.js';

export const prerender = false;

export async function GET({ request }) {
  try {
    const url = new URL(request.url);

    const modality = url.searchParams.get('modality')?.toUpperCase();
    const contrast = url.searchParams.get('contrast')?.toLowerCase();
    const region = url.searchParams.get('region');

    if (!modality || !region) {
      return new Response(
        JSON.stringify({ found: false, error: 'Missing required parameters' }),
        { status: 400 }
      );
    }

    if (!['MRI', 'CT'].includes(modality)) {
      return new Response(
        JSON.stringify({ found: false, error: 'Unsupported modality' }),
        { status: 400 }
      );
    }

    const tableName = modality === 'MRI' 
      ? 'v_mri_patient_regions' 
      : 'v_ct_patient_regions';

    // Step 1: Query by region only
    const { data: rows, error } = await supabase
      .from(tableName)
      .select('cpt_code, friendly_name, patient_region');

    if (error) throw new Error(error.message);

    // Step 2: Filter locally by region and contrast
    const filtered = (rows || []).filter(row => {
      const fn = row.friendly_name.toLowerCase();

      if (row.patient_region !== region) return false;

      if (contrast === 'without') return fn.includes('without contrast') && !fn.includes('&');
      if (contrast === 'with') return fn.includes('with contrast') && !fn.includes('&');
      if (contrast === 'both') return fn.includes('with & without contrast');

      return false;
    });

    if (!filtered.length) {
      return new Response(
        JSON.stringify({ found: false, error: 'Procedure not found' }),
        { status: 404 }
      );
    }

    const match = filtered[0];
    const patient_label = formatPatientLabel(match.friendly_name);
    const badge_label = `CPT ${match.cpt_code}`;

    return new Response(
      JSON.stringify({
        found: true,
        procedure: {
          cpt_code: match.cpt_code,
          patient_label,
          badge_label
        }
      }),
      { status: 200 }
    );

  } catch (e) {
    console.error('❌ Resolver Error', e);
    return new Response(
      JSON.stringify({
        found: false,
        error: 'Server error',
        details: e.message
      }),
      { status: 500 }
    );
  }
}

// ---------- Helpers -----------

function formatPatientLabel(friendlyName) {
  let label = friendlyName.replace(/\s*\[\d+\]$/, '').trim();
  // Ensure "Contrast" is always appended when relevant
  if (label.endsWith('With & Without')) label += ' Contrast';
  if (label.endsWith('With')) label += ' Contrast';
  if (label.endsWith('Without')) label += ' Contrast';
  return label;
}
