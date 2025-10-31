// src/pages/api/procedures/resolve.js
// Resolves modality + contrast + region to exact CPT code

export async function GET({ url }) {
  try {
    const modality = url.searchParams.get('modality');
    const contrast = url.searchParams.get('contrast');
    const region = url.searchParams.get('region');
    
    console.log('🔍 Resolving CPT:', { modality, contrast, region });
    
    if (!modality || !region) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters',
          required: ['modality', 'region']
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Import Supabase client
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    // Map region IDs to database body_region values
    const regionMap = {
      'brain': 'Brain',
      'cervical-spine': 'Cervical Spine',
      'thoracic-spine': 'Thoracic Spine',
      'lumbar-spine': 'Lumbar Spine',
      'shoulder': 'Shoulder',
      'knee': 'Knee',
      'upper-extremity': 'Upper Extremity',
      'lower-extremity': 'Lower Extremity',
      'abdomen': 'Abdomen',
      'pelvis': 'Pelvis',
      'abdomen-pelvis': 'Abdomen/Pelvis',
      'cardiac': 'Cardiac',
      'breast': 'Breast',
      'head': 'Head',
      'chest': 'Chest',
      'spine': 'Spine',
      'sinuses': 'Sinuses',
      'neck': 'Neck',
      'extremity': 'Extremity',
      'hand': 'Hand',
      'foot': 'Foot',
      'ob': 'OB',
      'thyroid': 'Thyroid',
      'carotid': 'Carotid',
      'venous': 'Venous',
      'renal': 'Renal',
      'screening': 'Screening',
      'diagnostic': 'Diagnostic',
      'whole-body': 'Whole Body',
      'bone-scan': 'Bone Scan'
    };
    
    const bodyRegion = regionMap[region] || region;
    
    // Query procedure_aliases to find matching procedures
    let query = supabase
      .from('procedure_aliases')
      .select('cpt_code, friendly_name, cms_description')
      .eq('modality', modality)
      .eq('is_active', true);
    
    // Filter by body region (flexible matching)
    query = query.or(
      `body_region.eq.${bodyRegion},` +
      `body_region.ilike.%${bodyRegion}%,` +
      `friendly_name.ilike.%${bodyRegion}%`
    );
    
    const { data, error } = await query.limit(10);
    
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
    
    if (!data || data.length === 0) {
      console.log('⚠️ No CPT codes found for:', { modality, bodyRegion });
      return new Response(
        JSON.stringify({ 
          found: false,
          message: 'No matching procedure found',
          searchCriteria: { modality, region: bodyRegion, contrast }
        }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    console.log(`✅ Found ${data.length} matching procedures`);
    
    // For MRI/CT with contrast, try to pick the right CPT based on contrast type
    let selectedProcedure = data[0]; // Default to first match
    
    if (contrast && (modality === 'MRI' || modality === 'CT')) {
      // Try to find the specific contrast variant
      // MRI Brain: 70551 (without), 70552 (with), 70553 (both)
      // Last digit pattern: 1=without, 2=with, 3=both
      
      const contrastSuffixMap = {
        'without': '1',
        'with': '2',
        'both': '3'
      };
      
      const desiredSuffix = contrastSuffixMap[contrast];
      
      if (desiredSuffix) {
        const matchingContrast = data.find(proc => 
          proc.cpt_code.endsWith(desiredSuffix)
        );
        
        if (matchingContrast) {
          selectedProcedure = matchingContrast;
          console.log('✅ Found exact contrast match:', selectedProcedure.cpt_code);
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        found: true,
        procedure: {
          cpt_code: selectedProcedure.cpt_code,
          friendly_name: selectedProcedure.friendly_name,
          description: selectedProcedure.cms_description
        },
        allMatches: data.map(p => ({
          cpt_code: p.cpt_code,
          friendly_name: p.friendly_name
        }))
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Resolution API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}