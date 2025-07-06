// src/pages/api/medicare/price-debug.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function GET({ url }) {
  const searchParams = new URLSearchParams(url.search);
  const zipCode = searchParams.get('zip');
  const cptCode = searchParams.get('cpt');

  console.log('🔍 Debug Medicare Price API called:', { zipCode, cptCode });

  if (!zipCode || !cptCode) {
    return new Response(JSON.stringify({ 
      error: 'Missing required parameters: zip and cpt',
      debug: { zipCode, cptCode }
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const debugInfo = {
    zipCode,
    cptCode,
    steps: [],
    errors: []
  };

  try {
    // Step 1: Check if ZIP code exists in zip_to_locality
    debugInfo.steps.push('Checking ZIP to locality mapping...');
    const { data: zipData, error: zipError } = await supabase
      .from('zip_to_locality')
      .select('locality_code, state')
      .eq('zip_code', zipCode)
      .single();

    if (zipError || !zipData) {
      debugInfo.errors.push(`ZIP ${zipCode} not found in zip_to_locality table: ${zipError?.message}`);
      
      // Try alternative: check if it's a Florida ZIP and use default locality
      if (zipCode.startsWith('33')) {
        debugInfo.steps.push('ZIP starts with 33 (Florida), trying default mapping...');
        // Broward County (33330) should map to locality 09102_03 (Fort Lauderdale)
        const testLocality = '09102_03';
        debugInfo.zipMapping = { locality_code: testLocality, state: 'FL', source: 'default_florida' };
      } else {
        return new Response(JSON.stringify({
          ...debugInfo,
          error: 'ZIP code not found in database'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      debugInfo.zipMapping = { ...zipData, source: 'database' };
    }

    const localityCode = debugInfo.zipMapping.locality_code;
    debugInfo.steps.push(`Using locality: ${localityCode}`);

    // Step 2: Check if procedure exists in medicare_rates
    debugInfo.steps.push('Checking medicare_rates table...');
    const { data: ratesData, error: ratesError } = await supabase
      .from('medicare_rates')
      .select('*')
      .eq('cpt_code', cptCode)
      .eq('locality_code', localityCode)
      .order('created_at', { ascending: false })
      .limit(5);

    if (ratesError) {
      debugInfo.errors.push(`Medicare rates query error: ${ratesError.message}`);
    }

    debugInfo.medicareRatesFound = ratesData?.length || 0;
    debugInfo.medicareRatesSample = ratesData?.slice(0, 2);

    // Step 3: Check if procedure exists at all (any locality)
    if (!ratesData || ratesData.length === 0) {
      debugInfo.steps.push('Checking if procedure exists in any locality...');
      const { data: anyRatesData, error: anyRatesError } = await supabase
        .from('medicare_rates')
        .select('cpt_code, locality_code, global_rate')
        .eq('cpt_code', cptCode)
        .limit(10);

      debugInfo.procedureInOtherLocalities = anyRatesData?.length || 0;
      debugInfo.otherLocalitiesSample = anyRatesData?.slice(0, 3);
    }

    // Step 4: Check cpt_rvus table for procedure info
    debugInfo.steps.push('Checking cpt_rvus table...');
    const { data: rvuData, error: rvuError } = await supabase
      .from('cpt_rvus')
      .select('cpt_code, description, work_rvu, pe_rvu_facility, mp_rvu')
      .eq('cpt_code', cptCode)
      .limit(1);

    if (rvuError) {
      debugInfo.errors.push(`RVU query error: ${rvuError.message}`);
    }

    debugInfo.rvuData = rvuData?.[0];

    // Step 5: Check medicare_localities for locality info
    debugInfo.steps.push('Checking medicare_localities table...');
    const { data: localityData, error: localityError } = await supabase
      .from('medicare_localities')
      .select('locality_code, locality_name, state, work_gpci, practice_expense_gpci, malpractice_gpci')
      .eq('locality_code', localityCode)
      .limit(1);

    if (localityError) {
      debugInfo.errors.push(`Locality query error: ${localityError.message}`);
    }

    debugInfo.localityData = localityData?.[0];

    // Step 6: Try manual calculation if we have RVU and GPCI data
    if (debugInfo.rvuData && debugInfo.localityData) {
      debugInfo.steps.push('Attempting manual calculation...');
      const conversionFactor = 32.74; // 2025 Medicare conversion factor
      
      const workComponent = debugInfo.rvuData.work_rvu * debugInfo.localityData.work_gpci;
      const peComponent = debugInfo.rvuData.pe_rvu_facility * debugInfo.localityData.practice_expense_gpci;
      const mpComponent = debugInfo.rvuData.mp_rvu * debugInfo.localityData.malpractice_gpci;
      
      const totalRvu = workComponent + peComponent + mpComponent;
      const medicareRate = totalRvu * conversionFactor;
      
      debugInfo.manualCalculation = {
        workComponent: workComponent.toFixed(3),
        peComponent: peComponent.toFixed(3),
        mpComponent: mpComponent.toFixed(3),
        totalRvu: totalRvu.toFixed(3),
        medicareRate: medicareRate.toFixed(2),
        usradPrice: (medicareRate + 75).toFixed(2),
        hospitalEstimate: (medicareRate * 3.8).toFixed(2),
        savings: ((medicareRate * 3.8) - (medicareRate + 75)).toFixed(2)
      };
    }

    // Step 7: Final recommendations
    debugInfo.steps.push('Analysis complete');
    debugInfo.recommendations = [];

    if (!debugInfo.zipMapping || debugInfo.zipMapping.source === 'default_florida') {
      debugInfo.recommendations.push('Add ZIP code 33330 to zip_to_locality table with locality_code 09102_03');
    }

    if (debugInfo.medicareRatesFound === 0 && debugInfo.rvuData && debugInfo.localityData) {
      debugInfo.recommendations.push('Consider pre-calculating rates for this procedure/locality combination');
    }

    if (debugInfo.procedureInOtherLocalities > 0 && debugInfo.medicareRatesFound === 0) {
      debugInfo.recommendations.push('Procedure exists in other localities but not this one - check rate calculation logic');
    }

    return new Response(JSON.stringify({
      success: true,
      debug: debugInfo,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    debugInfo.errors.push(`Unexpected error: ${error.message}`);
    
    return new Response(JSON.stringify({
      success: false,
      debug: debugInfo,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}