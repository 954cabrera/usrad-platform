// src/pages/api/pricing/calculate.js
// Fixed API to handle both Florida and Georgia data formats
export const prerender = false;

export async function GET({ url }) {
  try {
    const searchParams = new URL(url).searchParams;
    const cptCode = searchParams.get('cpt')?.trim();
    const state = searchParams.get('state')?.trim()?.toUpperCase() || 'FL';
    const county = searchParams.get('county')?.trim();

    console.log(`🔍 API Request: CPT=${cptCode}, State=${state}, County=${county}`);

    if (!cptCode || !county) {
      return new Response(JSON.stringify({
        error: "Missing required parameters",
        message: "Both 'cpt' and 'county' parameters are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    let pricingData;
    let dataFound = false;

    // Handle Florida data (wrapped format with locality mapping)
    if (state === 'FL') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const dataPath = path.join(process.cwd(), 'public/data/processed/florida-medicare-pricing-complete.json');
        const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        // Florida data is wrapped in metadata structure
        const floridaData = rawData.pricing_data || rawData;
        console.log(`📊 Loaded Florida data: ${floridaData.length} procedures`);

        // Map county names to locality names for Florida
        const countyToLocality = {
          'Miami-Dade': 'MIAMI',
          'Broward': 'FORT LAUDERDALE',
          'Palm Beach': 'FORT LAUDERDALE', 
          'Lee': 'REST OF FLORIDA',
          'Collier': 'REST OF FLORIDA',
          'Martin': 'FORT LAUDERDALE',
          'Monroe': 'FORT LAUDERDALE',
          'St. Lucie': 'FORT LAUDERDALE',
          'Indian River': 'FORT LAUDERDALE',
          'Other': 'REST OF FLORIDA'
        };

        const targetLocality = countyToLocality[county];
        if (!targetLocality) {
          return new Response(JSON.stringify({
            error: "Invalid county",
            message: `County '${county}' not supported for Florida`,
            availableCounties: Object.keys(countyToLocality)
          }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        console.log(`🗺️ Mapping FL county '${county}' to locality '${targetLocality}'`);

        // Find the procedure in Florida data by locality_name
        const result = floridaData.find(item => 
          item.cpt_code === cptCode && 
          item.locality_name === targetLocality
        );

        if (result) {
          dataFound = true;
          // Transform Florida data to match Georgia format
          pricingData = {
            procedure: {
              cpt_code: result.cpt_code,
              description: result.description,
              modality: result.modality
            },
            location: {
              state: 'FL',
              county: county,
              locality_code: result.locality_code,
              locality_name: result.locality_name,
              locality_description: result.locality_description
            },
            pricing: {
              medicare_rate: result.medicare_rate,
              usrad_price: result.usrad_price,
              usrad_markup: result.usrad_markup,
              hospital_estimate: result.hospital_estimate,
              patient_savings: result.patient_savings,
              savings_percentage: result.savings_percentage
            },
            rvu_breakdown: {
              work_rvu: result.work_rvu,
              pe_rvu_facility: result.pe_rvu_facility,
              mp_rvu: result.mp_rvu,
              conversion_factor: 32.3465
            },
            geographic_adjustments: {
              work_gpci: result.work_gpci,
              pe_gpci: result.pe_gpci,
              mp_gpci: result.mp_gpci
            },
            generated_at: new Date().toISOString()
          };
        }
      } catch (error) {
        console.error('❌ Error loading Florida data:', error);
        return new Response(JSON.stringify({
          error: "Data loading error",
          message: "Failed to load Florida pricing data"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Handle Georgia data (direct array format with county field)
    else if (state === 'GA') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const dataPath = path.join(process.cwd(), 'public/data/processed/georgia-pricing.json');
        const georgiaData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        console.log(`📊 Loaded Georgia data: ${georgiaData.length} procedures`);

        // Find the procedure in Georgia data by county and cpt_code
        const result = georgiaData.find(item => 
          item.cpt_code === cptCode && 
          item.county === county
        );

        if (result) {
          dataFound = true;
          // Georgia data should already be in the correct format
          pricingData = {
            procedure: {
              cpt_code: result.cpt_code,
              description: result.description,
              modality: result.modality
            },
            location: {
              state: 'GA',
              county: result.county,
              locality_code: result.locality_code,
              locality_name: result.locality_name,
              locality_description: result.locality_description
            },
            pricing: {
              medicare_rate: result.medicare_rate,
              usrad_price: result.usrad_price,
              usrad_markup: result.usrad_markup,
              hospital_estimate: result.hospital_estimate,
              patient_savings: result.patient_savings,
              savings_percentage: result.savings_percentage
            },
            rvu_breakdown: {
              work_rvu: result.work_rvu,
              pe_rvu_facility: result.pe_rvu_facility,
              mp_rvu: result.mp_rvu,
              conversion_factor: result.conversion_factor || 32.3465
            },
            geographic_adjustments: {
              work_gpci: result.work_gpci,
              pe_gpci: result.pe_gpci,
              mp_gpci: result.mp_gpci
            },
            generated_at: new Date().toISOString()
          };
        }
      } catch (error) {
        console.error('❌ Error loading Georgia data:', error);
        return new Response(JSON.stringify({
          error: "Data loading error", 
          message: "Failed to load Georgia pricing data"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Handle other states (future expansion)
    else {
      return new Response(JSON.stringify({
        error: "State not supported",
        message: `State '${state}' is not currently supported`,
        supportedStates: ['FL', 'GA']
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Return results or error
    if (dataFound && pricingData) {
      console.log(`✅ Found pricing: ${pricingData.pricing.medicare_rate} for ${cptCode} in ${county}, ${state}`);
      return new Response(JSON.stringify(pricingData), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      // Provide helpful suggestions
      const suggestions = [];
      if (state === 'FL') {
        suggestions.push("Try selecting a different Florida county: Miami-Dade, Broward, Palm Beach, or Other");
      } else if (state === 'GA') {
        suggestions.push("Try selecting a different Georgia county: Fulton, DeKalb, Gwinnett, or Other");
      }
      suggestions.push("Verify the CPT code is correct and available in our database");

      return new Response(JSON.stringify({
        error: "Pricing data not found",
        message: `No pricing data found for CPT ${cptCode} in ${county}, ${state}`,
        suggestions: suggestions
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    return new Response(JSON.stringify({
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}