// src/pages/api/pricing/quote.js
// Direct pricing quote API - input ZIP code + procedure, get pricing
import { createClient } from '@supabase/supabase-js';

export async function GET({ url }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const searchParams = new URL(url).searchParams;
  const zipCode = searchParams.get('zipCode');
  const cptCode = searchParams.get('cptCode') || '70551';
  const state = searchParams.get('state');

  if (!zipCode && !state) {
    return new Response(JSON.stringify({ 
      error: 'Either zipCode or state is required' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Step 1: Determine locality from ZIP/state
    let localityCode;
    let locationInfo = {};

    if (zipCode) {
      // Get locality from ZIP code using new function
      const { data: locality, error: localityError } = await supabase
        .rpc('get_locality_from_zip', {
          p_zip_code: zipCode
        });

      if (localityError || !locality) {
        return new Response(JSON.stringify({ 
          error: 'Invalid ZIP code or unsupported area',
          details: `ZIP code ${zipCode} not found in supported areas (FL, GA)`
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      localityCode = locality;
      
      // Determine state from ZIP prefix for location info
      const zipToState = {
        '33': 'FL', '34': 'FL', '32': 'FL', '30': 'GA', '31': 'GA'
      };
      const zipPrefix = zipCode.substring(0, 2);
      const derivedState = zipToState[zipPrefix] || state;
      
      locationInfo = {
        zipCode,
        state: derivedState,
        source: 'zip_code'
      };
    } else {
      // State-only lookup - use default locality for state
      const stateDefaults = {
        'FL': '09102_99', // Rest of Florida
        'GA': '10212_99'  // Rest of Georgia  
      };
      
      localityCode = stateDefaults[state.toUpperCase()];
      locationInfo = {
        state: state.toUpperCase(),
        locality: localityCode,
        source: 'state_default'
      };
    }

    // Step 2: Get procedure information
    const { data: procedure, error: procError } = await supabase
      .from('imaging_procedures')
      .select('*')
      .eq('cpt_code', cptCode)
      .single();

    if (procError || !procedure) {
      return new Response(JSON.stringify({ 
        error: `Procedure ${cptCode} not found`,
        details: procError?.message 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 3: Get locality GPCI data
    const { data: localityData, error: localityError } = await supabase
      .from('medicare_localities')
      .select('*')
      .eq('locality_code', localityCode)
      .single();

    if (localityError || !localityData) {
      return new Response(JSON.stringify({ 
        error: 'Medicare locality data not found',
        details: localityError?.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 4: Calculate Medicare pricing
    const medicareRate = (
      (procedure.work_rvu * localityData.work_gpci) +
      (procedure.pe_rvu_facility * localityData.practice_expense_gpci) +
      (procedure.mp_rvu * localityData.malpractice_gpci)
    ) * procedure.conversion_factor;

    // Add professional component (35% additional for global billing)
    const globalMedicareRate = medicareRate * 1.35;

    // USRad pricing
    const usradPrice = globalMedicareRate + 75; // $75 markup
    const hospitalEstimate = globalMedicareRate * 5.5; // Hospital 5.5x Medicare
    const savings = hospitalEstimate - usradPrice;
    const savingsPercent = Math.round((savings / hospitalEstimate) * 100);

    // Step 5: Return comprehensive pricing quote
    const response = {
      procedure: {
        cpt_code: cptCode,
        description: procedure.description,
        modality: procedure.modality
      },
      location: {
        ...locationInfo,
        locality_code: localityCode,
        locality_name: localityData.locality_name
      },
      pricing: {
        medicare_base_rate: Math.round(medicareRate * 100) / 100,
        medicare_global_rate: Math.round(globalMedicareRate * 100) / 100,
        usrad_price: Math.round(usradPrice * 100) / 100,
        hospital_estimate: Math.round(hospitalEstimate * 100) / 100,
        patient_savings: Math.round(savings * 100) / 100,
        savings_percentage: savingsPercent
      },
      calculation_details: {
        work_rvu: procedure.work_rvu,
        pe_rvu_facility: procedure.pe_rvu_facility,
        mp_rvu: procedure.mp_rvu,
        conversion_factor: procedure.conversion_factor,
        work_gpci: localityData.work_gpci,
        practice_expense_gpci: localityData.practice_expense_gpci,
        malpractice_gpci: localityData.malpractice_gpci,
        professional_component_multiplier: 1.35,
        usrad_markup: 75,
        hospital_multiplier: 5.5
      },
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(response), {
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

// Example usage:
// GET /api/pricing/quote?zipCode=33101&cptCode=70551
// GET /api/pricing/quote?state=FL&cptCode=72148
// GET /api/pricing/quote?zipCode=30309&cptCode=74177