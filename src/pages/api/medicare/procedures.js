// src/pages/api/medicare/procedures.js
// Endpoint to retrieve available Medicare procedures (with alias integration)

import { createClient } from '@supabase/supabase-js';

export async function GET({ request }) {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    // Parse query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const search = url.searchParams.get('search') || '';
    const modality = url.searchParams.get('modality') || '';
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const actualLimit = Math.min(limit, 100);

    let procedures = [];
    let totalCount = 0;

    // ==========================================================
    // 🔹 Primary Source: imaging_procedures + alias join
    // ==========================================================
    try {
      let query = supabase
        .from('imaging_procedures')
        .select(`
          cpt_code,
          modality,
          description,
          procedure_aliases!left(friendly_name, cms_description, body_region, short_label)
        `)
        .order('cpt_code')
        .range(offset, offset + actualLimit - 1);

      // 🔸 Search filter
      if (search) {
        query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%,procedure_aliases.friendly_name.ilike.%${search}%`);
      }

      // 🔸 Modality filter
      if (modality && modality !== 'All') {
        const modalityMap = {
          MRI: ['MRI'],
          CT: ['CT'],
          Ultrasound: ['Ultrasound'],
          'X-Ray': ['X-Ray', 'Fluoroscopy', 'Mammography'],
          Mammography: ['X-Ray', 'Fluoroscopy'],
          PET: ['PET', 'Nuclear Medicine'],
          'Nuclear Medicine': ['Nuclear Medicine', 'PET'],
          Other: ['Other']
        };
        const aliases = modalityMap[modality] || [modality];
        query = query.or(aliases.map(a => `modality.ilike.%${a}%`).join(','));
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        procedures = data.map(row => ({
          cpt_code: row.cpt_code,
          modality: row.modality,
          description:
            row.procedure_aliases?.friendly_name ||
            row.procedure_aliases?.cms_description ||
            row.description ||
            'No description'
        }));
        totalCount = procedures.length;
        console.log(`✅ Found ${totalCount} aliased procedures (modality: ${modality || 'All'})`);
      } else {
        console.log(`⚠️ No results found in imaging_procedures (modality: ${modality || 'All'})`);
      }
    } catch (err) {
      console.error('imaging_procedures join query failed:', err.message);
    }

    // ==========================================================
    // 🔹 Fallback: cpt_rvus (if no modality-specific data)
    // ==========================================================
    if (procedures.length === 0) {
      try {
        let query = supabase
          .from('cpt_rvus')
          .select('cpt_code, description')
          .order('cpt_code')
          .range(offset, offset + actualLimit - 1);

        if (search) {
          query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          console.log(`ℹ️ Using cpt_rvus fallback with ${data.length} results`);
          procedures = data.map(p => ({ ...p, modality: 'General' }));
          totalCount = procedures.length;
        }
      } catch (err) {
        console.error('cpt_rvus query failed:', err.message);
      }
    }

    // ==========================================================
    // 🔹 Hardcoded fallback (last resort)
    // ==========================================================
    if (procedures.length === 0) {
      console.log('⚠️ Using hardcoded fallback procedures');
      procedures = [
        { cpt_code: '70551', description: 'MRI brain without contrast', modality: 'MRI' },
        { cpt_code: '72148', description: 'MRI lumbar spine without contrast', modality: 'MRI' },
        { cpt_code: '71046', description: 'Chest X-ray, 2 views', modality: 'X-Ray' },
        { cpt_code: '74177', description: 'CT abdomen & pelvis with contrast', modality: 'CT' },
        { cpt_code: '76700', description: 'Ultrasound, abdominal, complete', modality: 'Ultrasound' },
        { cpt_code: '77067', description: 'Mammography, bilateral', modality: 'Mammography' }
      ];
      totalCount = procedures.length;
    }

    // ==========================================================
    // 🔹 Response payload
    // ==========================================================
    return new Response(
      JSON.stringify({
        procedures,
        count: procedures.length,
        total: totalCount,
        pagination: {
          offset,
          limit: actualLimit,
          next: offset + actualLimit < totalCount ? offset + actualLimit : null
        },
        filters: { search, modality, limit: actualLimit }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Procedures API error:', error);
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
