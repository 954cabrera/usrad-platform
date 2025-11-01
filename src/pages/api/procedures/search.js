// src/pages/api/procedures/search.js
// ENHANCED - Uses procedure_aliases (562 procedures) with CPT code search

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

    // 🔢 Detect if query is a CPT code (5 digits)
    const isCPTCode = /^\d{5}$/.test(query);

    let queryBuilder = supabase
      .from('procedure_aliases')  // ← Changed from procedure_search_index
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
      if (isCPTCode) {
        // 🎯 Exact CPT code search
        queryBuilder = queryBuilder.eq('cpt_code', query);
        console.log(`🔢 Searching by CPT code: ${query}`);
      } else {
        // 📝 Text search across multiple fields
        queryBuilder = queryBuilder.or(
          `friendly_name.ilike.%${query}%,` +
          `modality.ilike.%${query}%,` +
          `body_region.ilike.%${query}%,` +
          `cpt_code.ilike.%${query}%`
        );
      }
    }

    // Execute query
    const { data, error } = await queryBuilder
      .order('cpt_code', { ascending: true })
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
      // 🧹 Extract clean display name from friendly_name
      // "MRI Brain - With & Without Contrast [70553]" → "MRI Brain - With & Without Contrast"
      let displayName = item.friendly_name || 'Unnamed Procedure';
      let extractedCPT = item.cpt_code;
      
      // Remove CPT code from friendly_name if present
      const cptMatch = displayName.match(/\[(\d{5})\]$/);
      if (cptMatch) {
        extractedCPT = cptMatch[1];
        displayName = displayName.replace(/\s*\[\d{5}\]$/, '').trim();
      }

      // Create badge
      let badge = null;
      if (extractedCPT) {
        badge = `CPT ${extractedCPT}`;
      }

      // Create description from modality and region
      const description = item.body_region 
        ? `${item.modality} - ${item.body_region}`
        : item.modality || '';

      return {
        id: item.id,
        // Clean display name without CPT code
        displayName: displayName,
        // Subtitle showing modality and region
        modality: description,
        badge: badge,
        icon: null, // procedure_aliases doesn't have icons
        // Include raw data for debugging and future use
        cpt_code: extractedCPT,
        region: item.body_region,
        contrast: item.contrast_type,
        // Frontend expects options array (empty for now)
        options: [],
        // Add these for your 2-step flow
        _raw_modality: item.modality,
        _raw_region: item.body_region,
        _raw_contrast: item.contrast_type
      };
    });

    console.log(`✅ Search API: Returning ${results.length} procedures for query: "${query}"${isCPTCode ? ' (CPT code search)' : ''}`);
    
    // Log first result for debugging
    if (results.length > 0) {
      console.log('First result:', JSON.stringify(results[0], null, 2));
    }

    // Return results with BOTH formats for backwards compatibility
    return new Response(
      JSON.stringify({ 
        results: results,           // ← For hero-form-controller-modal.js
        procedures: results,        // ← For BrowseAllModal.astro
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