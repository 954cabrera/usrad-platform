// src/pages/api/test-functions.js
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test 1: Check if we can get basic imaging centers
    const { data: centers, error: centersError } = await supabase
      .from('imaging_centers')
      .select('id, facility_name, city, state, medicare_locality_code')
      .eq('state', 'FL')
      .limit(5);

    // Test 2: Check if we can call the pricing function directly
    const { data: pricing, error: pricingError } = await supabase
      .rpc('calculate_imaging_center_pricing', {
        p_center_id: 1,
        p_cpt_code: '70551'
      });

    return new Response(JSON.stringify({
      test_results: {
        centers_query: {
          success: !centersError,
          error: centersError?.message,
          data: centers,
          count: centers?.length || 0
        },
        pricing_function: {
          success: !pricingError,
          error: pricingError?.message,
          data: pricing
        }
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Test failed',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}