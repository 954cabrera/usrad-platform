// src/pages/api/centers/[facilityId]/pricing.js
import { createClient } from '@supabase/supabase-js';

export async function GET({ params, url }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { facilityId } = params;
  const searchParams = new URL(url).searchParams;
  const cptCode = searchParams.get('cptCode') || '70551';

  try {
    // Get facility details
    const { data: facility, error: facilityError } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', facilityId)
      .single();

    if (facilityError || !facility) {
      return new Response(JSON.stringify({ error: 'Facility not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get pricing calculation
    const { data: pricing, error: pricingError } = await supabase
      .rpc('calculate_facility_pricing', {
        p_facility_id: facilityId,
        p_cpt_code: cptCode
      });

    if (pricingError || !pricing || pricing.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Pricing calculation failed',
        details: pricingError?.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const p = pricing[0];

    const response = {
      facility: {
        id: facility.id,
        name: facility.name,
        address: {
          city: facility.city,
          state: facility.state,
          zip_code: facility.zip_code
        },
        contact: {
          phone: facility.phone
        },
        medicare_locality: facility.medicare_locality_code,
        contract_terms: {
          medicare_percentage: facility.contract_medicare_percentage || 100,
          usrad_markup: facility.usrad_markup_amount || 75
        }
      },
      procedure: {
        cpt_code: cptCode,
        description: cptCode === '70551' ? 'MRI Brain without contrast' : 'Imaging procedure'
      },
      pricing: {
        medicare_rate: parseFloat(p.medicare_rate),
        patient_total: parseFloat(p.patient_total),
        hospital_estimate: parseFloat(p.hospital_estimate),
        patient_savings: parseFloat(p.patient_savings),
        savings_percentage: p.hospital_estimate > 0 ? 
          Math.round((p.patient_savings / p.hospital_estimate) * 100) : 0
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