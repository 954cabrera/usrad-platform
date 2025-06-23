// src/pages/api/provider/revenue-analysis.js
import { createClient } from '@supabase/supabase-js';

export async function GET({ url }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const searchParams = new URL(url).searchParams;
  const facilityId = searchParams.get('facilityId');

  if (!facilityId) {
    return new Response(JSON.stringify({ error: 'facilityId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

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

    // Common imaging procedures for revenue analysis
    const procedures = ['70551']; // We'll expand this as we add more procedures
    const revenueAnalysis = [];
    let totalMonthlyRevenue = 0;

    for (const cptCode of procedures) {
      try {
        const { data: pricing, error: pricingError } = await supabase
          .rpc('calculate_facility_pricing', {
            p_facility_id: facilityId,
            p_cpt_code: cptCode
          });

        if (!pricingError && pricing && pricing.length > 0) {
          const p = pricing[0];
          const estimatedVolume = 20; // Estimate 20 MRIs per month
          const monthlyRevenue = parseFloat(p.medicare_rate) * estimatedVolume;
          
          totalMonthlyRevenue += monthlyRevenue;

          revenueAnalysis.push({
            cpt_code: cptCode,
            description: 'MRI Brain without contrast',
            medicare_rate: parseFloat(p.medicare_rate),
            patient_price: parseFloat(p.patient_total),
            estimated_monthly_volume: estimatedVolume,
            estimated_monthly_revenue: monthlyRevenue,
            estimated_annual_revenue: monthlyRevenue * 12
          });
        }
      } catch (err) {
        console.error(`Error processing procedure ${cptCode}:`, err);
      }
    }

    const response = {
      facility: {
        id: facility.id,
        name: facility.name,
        location: `${facility.city}, ${facility.state}`,
        medicare_locality: facility.medicare_locality_code
      },
      revenue_analysis: {
        procedures: revenueAnalysis,
        summary: {
          total_procedures_analyzed: revenueAnalysis.length,
          estimated_monthly_revenue: totalMonthlyRevenue,
          estimated_annual_revenue: totalMonthlyRevenue * 12,
          average_procedure_revenue: revenueAnalysis.length > 0 ? 
            totalMonthlyRevenue / revenueAnalysis.length : 0
        }
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