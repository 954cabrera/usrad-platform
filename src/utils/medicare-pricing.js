// src/utils/medicare-pricing.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Get Medicare locality code from ZIP code with fallback mechanisms
 * @param {string} zipCode - Patient ZIP code
 * @returns {Promise<Object>} - Locality information
 */
export async function getLocalityFromZip(zipCode) {
  // Try direct ZIP lookup first
  const { data: zipData, error: zipError } = await supabase
    .from('zip_to_locality')
    .select('locality_code, state')
    .eq('zip_code', zipCode)
    .single();
    
  if (!zipError && zipData) {
    return {
      locality_code: zipData.locality_code,
      state: zipData.state,
      source: 'zip_direct'
    };
  }
  
  // Try county-based lookup if direct lookup fails
  // Extract first 3 digits of ZIP for county approximation
  const zipPrefix = zipCode.substring(0, 3);
  const { data: countyData, error: countyError } = await supabase
    .from('medicare_county_mapping')
    .select('locality_code, state')
    .like('zip_ranges', `%${zipPrefix}%`)
    .limit(1);
    
  if (!countyError && countyData && countyData.length > 0) {
    return {
      locality_code: countyData[0].locality_code,
      state: countyData[0].state,
      source: 'county_mapping'
    };
  }
  
  // Final fallback for Florida ZIPs
  if (zipCode.startsWith('33')) {
    return { 
      locality_code: '09102_03', // Fort Lauderdale
      state: 'FL',
      source: 'florida_fallback'
    };
  }
  
  throw new Error(`Unable to determine Medicare locality for ZIP code ${zipCode}`);
}

/**
 * Get Medicare rate for a procedure in a specific locality
 * @param {string} cptCode - CPT procedure code
 * @param {string} localityCode - Medicare locality code
 * @param {number} year - Year for rates (defaults to current year)
 * @returns {Promise<number>} - Medicare rate
 */
export async function getMedicareRate(cptCode, localityCode, year = new Date().getFullYear()) {
  // Try to get pre-calculated rate from medicare_rates table
  const { data: ratesData, error: ratesError } = await supabase
    .from('medicare_rates')
    .select('global_rate, technical_component, professional_component')
    .eq('cpt_code', cptCode)
    .eq('locality_code', localityCode)
    .eq('year', year)
    .order('created_at', { ascending: false })
    .limit(1);

  // If we have pre-calculated rates, use them
  if (!ratesError && ratesData && ratesData.length > 0) {
    const rate = ratesData[0];
    return rate.global_rate || 
           (rate.technical_component + rate.professional_component) || 
           rate.technical_component;
  }

  // If no pre-calculated rate, calculate manually using RVU data
  const { data: rvuData, error: rvuError } = await supabase
    .from('cpt_rvus')
    .select('work_rvu, pe_rvu_facility, mp_rvu')
    .eq('cpt_code', cptCode)
    .eq('year', year)
    .limit(1);

  // Get GPCI data for the locality
  const { data: localityData, error: localityError } = await supabase
    .from('medicare_localities')
    .select('work_gpci, practice_expense_gpci, malpractice_gpci')
    .eq('locality_code', localityCode)
    .limit(1);

  // If we have both RVU and GPCI data, calculate manually
  if (!rvuError && rvuData && rvuData.length > 0 && 
      !localityError && localityData && localityData.length > 0) {
    const rvu = rvuData[0];
    const gpci = localityData[0];
    const conversionFactor = 32.74; // 2025 Medicare conversion factor

    const workComponent = rvu.work_rvu * gpci.work_gpci;
    const peComponent = rvu.pe_rvu_facility * gpci.practice_expense_gpci;
    const mpComponent = rvu.mp_rvu * gpci.malpractice_gpci;

    const totalRvu = workComponent + peComponent + mpComponent;
    return totalRvu * conversionFactor;
  }

  throw new Error(`Unable to calculate Medicare rate for CPT ${cptCode} in locality ${localityCode}`);
}

/**
 * Get provider's contracted rate for a procedure
 * @param {number} centerId - Imaging center ID (bigint)
 * @param {string} cptCode - CPT procedure code
 * @param {number} medicareRate - Base Medicare rate
 * @returns {Promise<Object>} - Provider rate and contract details
 */
export async function getProviderRate(centerId, cptCode, medicareRate) {
  if (!centerId) {
    return {
      provider_rate: medicareRate,
      contract: {
        model: 'medicare_percentage',
        value: 100,
        display: '100% of Medicare'
      }
    };
  }

  // First try to get a procedure-specific contract
  const { data: contractData, error: contractError } = await supabase
    .from('provider_contracts')
    .select('pricing_model, medicare_percentage, fixed_rate')
    .eq('center_id', centerId)
    .eq('cpt_code', cptCode)
    .lte('effective_date', new Date().toISOString())
    .is('expiration_date', null)
    .order('effective_date', { ascending: false })
    .limit(1);
    
  let finalContractData = null;
    
  // If no specific contract for this CPT, try to get default contract
  if ((!contractData || contractData.length === 0) && cptCode) {
    const { data: defaultContractData } = await supabase
      .from('provider_contracts')
      .select('pricing_model, medicare_percentage, fixed_rate')
      .eq('center_id', centerId)
      .is('cpt_code', null) // NULL cpt_code means default contract
      .lte('effective_date', new Date().toISOString())
      .is('expiration_date', null)
      .order('effective_date', { ascending: false })
      .limit(1);
      
    if (defaultContractData && defaultContractData.length > 0) {
      finalContractData = defaultContractData[0];
    } else {
      // If no contract in provider_contracts, check the legacy fields in imaging_centers
      const { data: centerData } = await supabase
        .from('imaging_centers')
        .select('contract_pricing_model, contract_medicare_percentage')
        .eq('id', centerId)
        .single();
        
      if (centerData && centerData.contract_medicare_percentage) {
        return {
          provider_rate: medicareRate * (centerData.contract_medicare_percentage / 100),
          contract: {
            model: centerData.contract_pricing_model || 'medicare_percentage',
            value: centerData.contract_medicare_percentage,
            display: `${centerData.contract_medicare_percentage}% of Medicare (Legacy)`
          }
        };
      }
    }
  } else if (contractData && contractData.length > 0) {
    finalContractData = contractData[0];
  }
    
  // If we found a contract, calculate the rate
  if (finalContractData) {
    if (finalContractData.pricing_model === 'medicare_percentage') {
      return {
        provider_rate: medicareRate * (finalContractData.medicare_percentage / 100),
        contract: {
          model: 'medicare_percentage',
          value: finalContractData.medicare_percentage,
          display: `${finalContractData.medicare_percentage}% of Medicare`
        }
      };
    } else if (finalContractData.pricing_model === 'fixed_rate') {
      return {
        provider_rate: finalContractData.fixed_rate,
        contract: {
          model: 'fixed_rate',
          value: finalContractData.fixed_rate,
          display: `$${finalContractData.fixed_rate.toFixed(2)} Fixed Rate`
        }
      };
    }
  }
  
  // Default to 100% Medicare if no contract found
  return {
    provider_rate: medicareRate,
    contract: {
      model: 'medicare_percentage',
      value: 100,
      display: '100% of Medicare (Default)'
    }
  };
}

/**
 * Calculate complete pricing for a procedure
 * @param {string} cptCode - CPT procedure code
 * @param {string} zipCode - Patient ZIP code
 * @param {string|number} centerId - Optional imaging center ID
 * @returns {Promise<Object>} - Complete pricing information
 */
export async function calculatePricing(cptCode, zipCode, centerId = null) {
  try {
    // Step 1: Get locality from ZIP
    const locality = await getLocalityFromZip(zipCode);
    
    // Step 2: Get Medicare base rate
    const medicareRate = await getMedicareRate(cptCode, locality.locality_code);
    
    // Step 3: Get provider's contracted rate
    const { provider_rate, contract } = await getProviderRate(centerId, cptCode, medicareRate);
    
    // Step 4: Calculate final pricing
    const usradMarkup = 75;
    const patientPrice = provider_rate + usradMarkup;
    const hospitalEstimate = medicareRate * 3.8;
    const savings = hospitalEstimate - patientPrice;
    
    // Step 5: Get procedure description
    const { data: procedureData } = await supabase
      .from('cpt_rvus')
      .select('description')
      .eq('cpt_code', cptCode)
      .limit(1);
      
    const description = procedureData && procedureData.length > 0 
      ? procedureData[0].description 
      : `Procedure ${cptCode}`;
    
    // Return complete pricing information
    return {
      medicare_rate: parseFloat(medicareRate.toFixed(2)),
      provider_rate: parseFloat(provider_rate.toFixed(2)),
      usrad_markup: usradMarkup,
      patient_price: parseFloat(patientPrice.toFixed(2)),
      hospital_estimate: parseFloat(hospitalEstimate.toFixed(2)),
      patient_savings: parseFloat(savings.toFixed(2)),
      savings_percentage: parseFloat((savings / hospitalEstimate * 100).toFixed(1)),
      cpt_code: cptCode,
      procedure_description: description,
      zip_code: zipCode,
      locality_code: locality.locality_code,
      state: locality.state,
      center_id: centerId,
      contract: contract,
      calculation_method: locality.source,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Pricing calculation failed: ${error.message}`);
  }
}

/**
 * Error handling utility for Medicare pricing operations
 * @param {Function} operation - Async function to execute
 * @param {number} maxRetries - Maximum number of retry attempts
 * @returns {Promise<any>} - Result of the operation
 */
export async function withRetry(operation, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 100)
      );
    }
  }
  
  throw lastError;
}
