// src/pages/api/centers/search-with-pricing.js
import { createClient } from '@supabase/supabase-js';

export async function GET({ url }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Get query parameters
  const searchParams = new URL(url).searchParams;
  const state = searchParams.get('state');
  const cptCode = searchParams.get('cptCode') || '70551';
  const city = searchParams.get('city');

  try {
    // Get facilities with Medicare pricing
    let query = supabase
      .from('facilities')
      .select('id, name, city, state, medicare_locality_code');

    if (state) {
      query = query.eq('state', state.toUpperCase());
    }

    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    const { data: facilities, error } = await query.limit(10);

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'Database error', 
        details: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate pricing for each facility
    const results = [];
    for (const facility of facilities || []) {
      try {
        const { data: pricing, error: pricingError } = await supabase
          .rpc('calculate_facility_pricing', {
            p_facility_id: facility.id,
            p_cpt_code: cptCode
          });

        if (!pricingError && pricing && pricing.length > 0) {
          const p = pricing[0];
          results.push({
            id: facility.id,
            name: facility.name,
            location: {
              city: facility.city,
              state: facility.state
            },
            pricing: {
              medicare_rate: parseFloat(p.medicare_rate) || 0,
              patient_price: parseFloat(p.patient_total) || 0,
              hospital_estimate: parseFloat(p.hospital_estimate) || 0,
              patient_savings: parseFloat(p.patient_savings) || 0,
              savings_percentage: p.hospital_estimate > 0 ? 
                Math.round((p.patient_savings / p.hospital_estimate) * 100) : 0
            },
            medicare_locality: facility.medicare_locality_code
          });
        }
      } catch (pricingErr) {
        console.error(`Pricing error for facility ${facility.id}:`, pricingErr);
      }
    }

    return new Response(JSON.stringify({
      results,
      search_criteria: { state, city, cptCode },
      total_centers: results.length,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}