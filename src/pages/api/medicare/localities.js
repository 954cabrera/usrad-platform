// src/pages/api/medicare/localities.js
// Endpoint to retrieve Medicare localities

import { createClient } from '@supabase/supabase-js';

export async function GET({ request }) {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Get query parameters
    const url = new URL(request.url);
    const state = url.searchParams.get('state') || '';
    
    // Try to get localities
    let localities = [];
    
    try {
      let query = supabase
        .from("medicare_localities")
        .select("*")
        .order("state, locality_name");
        
      // Filter by state if provided
      if (state) {
        query = query.eq("state", state.toUpperCase());
      }
      
      const { data, error } = await query;
      
      if (!error && data && data.length > 0) {
        console.log(`Found ${data.length} localities`);
        localities = data;
      }
    } catch (error) {
      console.error("medicare_localities query failed:", error.message);
    }
    
    // Fallback to hardcoded data if query fails
    if (localities.length === 0) {
      console.log("Using hardcoded fallback localities");
      localities = [
        { locality_code: "09102_03", state: "FL", locality_name: "FORT LAUDERDALE" },
        { locality_code: "09102_04", state: "FL", locality_name: "MIAMI" },
        { locality_code: "09102_99", state: "FL", locality_name: "REST OF FLORIDA" },
        { locality_code: "10212_01", state: "GA", locality_name: "ATLANTA" },
        { locality_code: "10212_99", state: "GA", locality_name: "REST OF GEORGIA" }
      ];
      
      // Filter by state if provided
      if (state) {
        localities = localities.filter(loc => loc.state === state.toUpperCase());
      }
    }
    
    // Return successful response
    return new Response(
      JSON.stringify({
        localities: localities,
        count: localities.length,
        states: [...new Set(localities.map(l => l.state))]
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Localities API error:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        status: 'error', 
        message: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}