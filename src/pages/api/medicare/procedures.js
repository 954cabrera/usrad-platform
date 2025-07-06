// src/pages/api/medicare/procedures.js
// Endpoint to retrieve available Medicare procedures

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
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const search = url.searchParams.get('search') || '';
    const modality = url.searchParams.get('modality') || '';
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Choose a smaller limit for performance
    const actualLimit = Math.min(limit, 100); // Cap at 100 to avoid timeouts
    
    // Try to get procedures from different tables
    let procedures = [];
    let totalCount = 0;
    
    // Approach 1: Try cpt_rvus table first
    try {
      // First get the count for pagination
      if (!search && !modality) {
        const { count, error: countError } = await supabase
          .from("cpt_rvus")
          .select("*", { count: "exact", head: true });
          
        if (!countError) {
          totalCount = count || 0;
        }
      }
      
      // Now get the actual data
      let query = supabase
        .from("cpt_rvus")
        .select("cpt_code, description")
        .order("cpt_code")
        .range(offset, offset + actualLimit - 1);
        
      // Add filters if provided
      if (search) {
        query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%`);
      }
      
      const { data, error } = await query;
      
      if (!error && data && data.length > 0) {
        console.log(`Found ${data.length} procedures in cpt_rvus`);
        procedures = data;
      }
    } catch (error) {
      console.error("cpt_rvus query failed:", error.message);
    }
    
    // Approach 2: Try imaging_procedures if first approach failed
    if (procedures.length === 0) {
      try {
        // First get the count for pagination
        if (!search && !modality) {
          const { count, error: countError } = await supabase
            .from("imaging_procedures")
            .select("*", { count: "exact", head: true });
            
          if (!countError) {
            totalCount = count || 0;
          }
        }
        
        // Now get the actual data
        let query = supabase
          .from("imaging_procedures")
          .select("cpt_code, description")
          .order("cpt_code")
          .range(offset, offset + actualLimit - 1);
          
        // Add filters if provided
        if (search) {
          query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%`);
        }
        
        if (modality) {
          query = query.eq("modality", modality);
        }
        
        const { data, error } = await query;
        
        if (!error && data && data.length > 0) {
          console.log(`Found ${data.length} procedures in imaging_procedures`);
          procedures = data;
        }
      } catch (error) {
        console.error("imaging_procedures query failed:", error.message);
      }
    }
    
    // Fallback to common procedures if all queries failed
    if (procedures.length === 0) {
      console.log("Using hardcoded fallback procedures");
      procedures = [
        { cpt_code: "70551", description: "MRI brain without contrast" },
        { cpt_code: "72148", description: "MRI lumbar spine without contrast" },
        { cpt_code: "71046", description: "Chest X-ray, 2 views" },
        { cpt_code: "74177", description: "CT abdomen & pelvis with contrast" },
        { cpt_code: "76700", description: "Ultrasound, abdominal, complete" },
        { cpt_code: "77067", description: "Mammography, bilateral" }
      ];
      
      totalCount = procedures.length;
    }
    
    // Return successful response
    return new Response(
      JSON.stringify({
        procedures: procedures,
        count: procedures.length,
        total: totalCount,
        pagination: {
          offset: offset,
          limit: actualLimit,
          next: offset + actualLimit < totalCount ? offset + actualLimit : null
        },
        filters: { search, modality, limit: actualLimit }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Procedures API error:', error);
    
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