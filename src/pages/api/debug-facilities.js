// src/pages/api/debug-facilities.js
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Check your facilities table instead
    const { data: facilities, error } = await supabase
      .from('facilities')
      .select('id, name, city, state, zip_code')
      .limit(10);

    const { count } = await supabase
      .from('facilities')
      .select('*', { count: 'exact', head: true });

    return new Response(JSON.stringify({
      total_facilities: count,
      sample_facilities: facilities,
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