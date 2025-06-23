// src/pages/api/debug-data.js
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Get all imaging centers to see what's actually in the database
    const { data: allCenters, error } = await supabase
      .from('imaging_centers')
      .select('id, facility_name, city, state, medicare_locality_code')
      .limit(10);

    // Also get a count of total records
    const { count } = await supabase
      .from('imaging_centers')
      .select('*', { count: 'exact', head: true });

    return new Response(JSON.stringify({
      total_centers: count,
      sample_centers: allCenters,
      error: error?.message || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Debug failed',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}