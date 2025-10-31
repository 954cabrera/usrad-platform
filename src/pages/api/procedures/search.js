// src/pages/api/procedures/search.js
// FINAL FIX - Handles null CPT codes and matches actual database structure

export async function GET({ url, locals }) {
  try {
    const query = url.searchParams.get('q')?.toLowerCase().trim() || '';
    const modality = url.searchParams.get('modality') || null;
    
    // Import Supabase client
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    let queryBuilder = supabase
      .from('procedure_search_index')
      .select('*')
      .eq('is_active', true);

    // Filter by modality if provided
    if (modality && modality !== 'ALL') {
      // Map from key to label
      const modalityMap = {
        'MRI': 'MRI',
        'CT': 'CT',
        'US': 'Ultrasound',
        'XR': 'X-Ray',
        'MAM': 'Mammography',
        'PET': 'PET',
        'NM': 'Nuclear Medicine'
      };
      const modalityLabel = modalityMap[modality] || modality;
      queryBuilder = queryBuilder.eq('modality', modalityLabel);
    }

    // Filter by search query if provided
    if (query) {
      queryBuilder = queryBuilder.or(
        `search_key.ilike.%${query}%,` +
        `display_name.ilike.%${query}%,` +
        `description.ilike.%${query}%,` +
        `modality.ilike.%${query}%,` +
        `region.ilike.%${query}%`
      );
    }

    // Execute query
    const { data, error } = await queryBuilder
      .order('sort_order', { ascending: true })
      .limit(20);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Database query failed',
          details: error.message 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // ✅ Transform data to match frontend expectations
    const results = (data || []).map(item => {
      // Create badge from available info
      let badge = null;
      if (item.cpt_code) {
        badge = `CPT ${item.cpt_code}`;
      } else if (item.popularity_badge) {
        badge = item.popularity_badge;
      }

      return {
        id: item.id,
        // Frontend expects camelCase displayName
        displayName: item.display_name || 'Unnamed Procedure',
        // Use description as the subtitle/modality text
        modality: item.description || item.modality || '',
        badge: badge,
        icon: item.icon || null,
        // Include raw data for debugging and future use
        cpt_code: item.cpt_code,
        region: item.region,
        search_key: item.search_key,
        // Frontend expects options array (empty for now)
        options: [],
        // Add these for your 2-step flow later
        _raw_modality: item.modality,
        _raw_region: item.region
      };
    });

    console.log(`✅ Search API: Returning ${results.length} procedures for query: "${query}"`);
    
    // Log first result for debugging
    if (results.length > 0) {
      console.log('First result:', JSON.stringify(results[0], null, 2));
    }

    // Return results
    return new Response(
      JSON.stringify({ 
        results: results,
        count: results.length
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Search API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}