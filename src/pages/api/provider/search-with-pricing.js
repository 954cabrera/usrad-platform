// src/pages/api/providers/search-with-pricing.js

import { createClient } from '@supabase/supabase-js';
import { calculatePricing, withRetry } from '../../../utils/medicare-pricing';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { zipCode, cptCode, radius = 25 } = body;
    
    if (!zipCode || !cptCode) {
      return new Response(JSON.stringify({ 
        error: 'Missing required parameters: zipCode and cptCode'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get the user's coordinates from ZIP code
    const { data: zipData, error: zipError } = await supabase
      .from('zip_to_locality')
      .select('latitude, longitude')
      .eq('zip_code', zipCode)
      .single();
      
    if (zipError || !zipData || !zipData.latitude || !zipData.longitude) {
      return new Response(JSON.stringify({ 
        error: 'Unable to determine location from ZIP code'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const userLat = zipData.latitude;
    const userLng = zipData.longitude;
    
    // Find providers within radius
    // Note: This is a simplified distance calculation
    const { data: providers, error: providersError } = await supabase
      .from('imaging_centers')
      .select('*')
      .filter('status', 'eq', 'active')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);
      
    if (providersError) {
      throw providersError;
    }
    
    // Calculate distance and filter by radius
    const providersWithDistance = providers
      .map(provider => {
        // Simple distance calculation (Haversine formula would be more accurate)
        const latDiff = provider.latitude - userLat;
        const lngDiff = provider.longitude - userLng;
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Rough miles conversion
        
        return {
          ...provider,
          distance
        };
      })
      .filter(provider => provider.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
    
    // Calculate pricing for each provider
    const providersWithPricing = await Promise.all(
      providersWithDistance.map(async (provider) => {
        try {
          const pricing = await withRetry(() => 
            calculatePricing(cptCode, zipCode, provider.id)
          );
          
          return {
            id: provider.id,
            name: provider.facility_name,
            address: {
              street: provider.street_1,
              city: provider.city,
              state: provider.state,
              zip: provider.zip_code
            },
            distance: provider.distance,
            phone: provider.phone_number,
            email: provider.email,
            website: provider.website_url,
            pricing: {
              medicare_rate: pricing.medicare_rate,
              provider_rate: pricing.provider_rate,
              patient_price: pricing.patient_price,
              hospital_estimate: pricing.hospital_estimate,
              patient_savings: pricing.patient_savings,
              savings_percentage: pricing.savings_percentage,
              contract: pricing.contract
            }
          };
        } catch (error) {
          console.error(`Error calculating pricing for provider ${provider.id}:`, error);
          
          // Return provider without pricing
          return {
            id: provider.id,
            name: provider.facility_name,
            address: {
              street: provider.street_1,
              city: provider.city,
              state: provider.state,
              zip: provider.zip_code
            },
            distance: provider.distance,
            phone: provider.phone_number,
            email: provider.email,
            website: provider.website_url,
            pricing_error: error.message
          };
        }
      })
    );
    
    return new Response(JSON.stringify({
      providers: providersWithPricing,
      count: providersWithPricing.length,
      zip_code: zipCode,
      cpt_code: cptCode,
      radius: radius,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
