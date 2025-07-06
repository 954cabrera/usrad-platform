// src/pages/api/medicare/price.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function GET({ url }) {
  const searchParams = new URLSearchParams(url.search);
  const zipCode = searchParams.get('zip');
  const cptCode = searchParams.get('cpt');

  if (!zipCode || !cptCode) {
    return new Response(JSON.stringify({ 
      error: 'Missing required parameters: zip and cpt'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Step 1: Get locality from ZIP code
    const { data: zipData, error: zipError } = await supabase
      .from('zip_to_locality')
      .select('locality_code, state')
      .eq('zip_code', zipCode)
      .single();

    if (zipError || !zipData) {
      return new Response(JSON.stringify({
        medicare_rate: null,
        usrad_price: null,
        hospital_estimate: null,
        savings: null,
        cpt_code: cptCode,
        zip_code: zipCode,
        error: `ZIP code ${zipCode} not found in database`
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const localityCode = zipData.locality_code;

    // Step 2: Try to get pre-calculated rate from medicare_rates table
    const { data: ratesData } = await supabase
      .from('medicare_rates')
      .select('global_rate, technical_component, professional_component')
      .eq('cpt_code', cptCode)
      .eq('locality_code', localityCode)
      .order('created_at', { ascending: false })
      .limit(1);

    let medicareRate = null;

    // If we have pre-calculated rates, use them
    if (ratesData && ratesData.length > 0) {
      const rate = ratesData[0];
      medicareRate = rate.global_rate || 
                    (rate.technical_component + rate.professional_component) || 
                    rate.technical_component;
    }

    // Step 3: If no pre-calculated rate, calculate manually using RVU data
    if (!medicareRate) {
      // Get RVU data for the procedure
      const { data: rvuData } = await supabase
        .from('cpt_rvus')
        .select('work_rvu, pe_rvu_facility, mp_rvu')
        .eq('cpt_code', cptCode)
        .eq('year', 2025)
        .limit(1);

      // Get GPCI data for the locality
      const { data: localityData } = await supabase
        .from('medicare_localities')
        .select('work_gpci, practice_expense_gpci, malpractice_gpci')
        .eq('locality_code', localityCode)
        .limit(1);

      // If we have both RVU and GPCI data, calculate manually
      if (rvuData && rvuData.length > 0 && localityData && localityData.length > 0) {
        const rvu = rvuData[0];
        const gpci = localityData[0];
        const conversionFactor = 32.74; // 2025 Medicare conversion factor

        const workComponent = rvu.work_rvu * gpci.work_gpci;
        const peComponent = rvu.pe_rvu_facility * gpci.practice_expense_gpci;
        const mpComponent = rvu.mp_rvu * gpci.malpractice_gpci;

        const totalRvu = workComponent + peComponent + mpComponent;
        medicareRate = totalRvu * conversionFactor;
      }
    }

    // Step 4: Calculate final pricing
    if (medicareRate && medicareRate > 0) {
      const usradPrice = medicareRate + 75;
      const hospitalEstimate = medicareRate * 3.8;
      const savings = hospitalEstimate - usradPrice;

      return new Response(JSON.stringify({
        medicare_rate: Math.round(medicareRate * 100) / 100,
        usrad_price: Math.round(usradPrice * 100) / 100,
        hospital_estimate: Math.round(hospitalEstimate * 100) / 100,
        savings: Math.round(savings * 100) / 100,
        cpt_code: cptCode,
        zip_code: zipCode,
        locality_code: localityCode,
        calculation_method: ratesData && ratesData.length > 0 ? 'pre_calculated' : 'rvu_manual',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 5: If we still don't have a rate, return null
    return new Response(JSON.stringify({
      medicare_rate: null,
      usrad_price: null,
      hospital_estimate: null,
      savings: null,
      cpt_code: cptCode,
      zip_code: zipCode,
      locality_code: localityCode,
      error: 'Unable to calculate Medicare rate - missing RVU or GPCI data'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Price calculation error:', error);
    
    return new Response(JSON.stringify({
      medicare_rate: null,
      usrad_price: null,
      hospital_estimate: null,
      savings: null,
      cpt_code: cptCode,
      zip_code: zipCode,
      error: `Internal server error: ${error.message}`
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}