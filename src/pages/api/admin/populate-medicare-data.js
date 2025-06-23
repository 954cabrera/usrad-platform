// src/pages/api/admin/populate-medicare-data.js
import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    const body = await request.json();
    const { adminKey } = body;

    // Simple admin authentication
    if (adminKey !== 'usrad-admin-2025') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get facilities that need Medicare locality updates
    const { data: facilitiesNeedingUpdate, error: selectError } = await supabase
      .from('facilities')
      .select('id, city, state')
      .is('medicare_locality_code', null);

    if (selectError) {
      return new Response(JSON.stringify({ 
        error: 'Failed to get facilities',
        details: selectError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let updatedCount = 0;
    const updateResults = [];

    // Update each facility individually
    for (const facility of facilitiesNeedingUpdate || []) {
      try {
        // Get the locality for this facility
        const { data: localityResult, error: localityError } = await supabase
          .rpc('get_locality_from_address', {
            p_county_or_city: facility.city,
            p_state: facility.state
          });

        if (!localityError && localityResult) {
          // Update the facility with the locality
          const { error: updateError } = await supabase
            .from('facilities')
            .update({ medicare_locality_code: localityResult })
            .eq('id', facility.id);

          if (!updateError) {
            updatedCount++;
            updateResults.push({
              facility_id: facility.id,
              city: facility.city,
              state: facility.state,
              locality_assigned: localityResult
            });
          }
        }
      } catch (err) {
        console.error(`Error updating facility ${facility.id}:`, err);
      }
    }

    // Get final count of facilities with Medicare localities
    const { data: finalCounts } = await supabase
      .from('facilities')
      .select('state, medicare_locality_code')
      .not('medicare_locality_code', 'is', null);

    const response = {
      message: 'Medicare locality data populated successfully',
      facilities_processed: facilitiesNeedingUpdate?.length || 0,
      facilities_updated: updatedCount,
      total_with_localities: finalCounts?.length || 0,
      breakdown: finalCounts?.reduce((acc, facility) => {
        acc[facility.state] = (acc[facility.state] || 0) + 1;
        return acc;
      }, {}) || {},
      sample_updates: updateResults.slice(0, 5), // Show first 5 updates
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