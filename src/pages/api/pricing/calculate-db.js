// src/pages/api/pricing/calculate-db.js
// Database-powered API endpoint (parallel to your existing calculate.js)

import { createClient } from '@supabase/supabase-js';

export async function GET({ url }) {
  console.log('🔍 Database API called:', url.search);
  
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
  
  const searchParams = new URLSearchParams(url.search);
  const cptCode = searchParams.get('cpt');
  const county = searchParams.get('county');
  const state = searchParams.get('state') || 'FL';
  
  console.log(`🏥 Looking up: CPT ${cptCode} in ${county}, ${state}`);
  
  // Validate required parameters
  if (!cptCode || !county) {
    return new Response(JSON.stringify({
      error: "Missing required parameters",
      message: "Both 'cpt' and 'county' parameters are required",
      example: "/api/pricing/calculate-db?cpt=72148&county=Miami-Dade&state=FL"
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Query your medicare_pricing table
    const startTime = Date.now();
    
    const { data, error } = await supabase
      .from('medicare_pricing')
      .select('*')
      .eq('state', state)
      .eq('county', county)
      .eq('cpt_code', cptCode)
      .single();
    
    const queryTime = Date.now() - startTime;
    console.log(`⚡ Database query took: ${queryTime}ms`);
    
    if (error) {
      console.error('❌ Database error:', error);
      return new Response(JSON.stringify({
        error: "Database query failed",
        message: error.message,
        details: error.details
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!data) {
      console.log(`❌ No data found for CPT ${cptCode} in ${county}, ${state}`);
      return new Response(JSON.stringify({
        error: "Pricing data not found",
        message: `No pricing data found for CPT ${cptCode} in ${county}, ${state}`,
        suggestions: [
          "Check CPT code spelling",
          "Verify county name matches exactly",
          "Try 'Other' for non-metro counties"
        ]
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`✅ Found pricing: $${data.medicare_rate} → $${data.usrad_price}`);
    
    // Return exact same format as your existing API
    const response = {
      procedure: {
        cpt_code: data.cpt_code,
        description: data.description,
        modality: data.modality
      },
      location: {
        state: data.state,
        county: data.county,
        locality_code: data.locality_code,
        locality_name: data.locality_name,
        locality_description: data.locality_description
      },
      pricing: {
        medicare_rate: data.medicare_rate,
        usrad_price: data.usrad_price,
        usrad_markup: data.usrad_markup,
        hospital_estimate: data.hospital_estimate,
        patient_savings: data.patient_savings,
        savings_percentage: data.savings_percentage
      },
      rvu_breakdown: {
        work_rvu: data.work_rvu,
        pe_rvu_facility: data.pe_rvu_facility,
        mp_rvu: data.mp_rvu,
        conversion_factor: data.conversion_factor
      },
      geographic_adjustments: {
        work_gpci: data.work_gpci,
        pe_gpci: data.pe_gpci,
        mp_gpci: data.mp_gpci
      },
      performance: {
        query_time_ms: queryTime,
        source: "database"
      },
      generated_at: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(JSON.stringify({
      error: "Internal server error",
      message: "An unexpected error occurred",
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}