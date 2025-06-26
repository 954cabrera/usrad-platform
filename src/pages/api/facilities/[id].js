// src/pages/api/facilities/[id].js
import { createClient } from '@supabase/supabase-js';

export async function GET({ params }) {
  try {
    // Get env vars with fallbacks
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ 
        error: 'Supabase configuration missing',
        debug: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const facilityId = params.id;
    
    const { data: facility, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', facilityId)
      .single();

    if (error) {
      return new Response(JSON.stringify({ 
        error: 'Facility not found',
        details: error.message 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(facility), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Facility fetch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}