// src/pages/api/medicare/utils/function-exists.js
// Helper to check if a Postgres function exists

import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Parse request body
    const body = await request.json();
    const functionName = body.function_name;
    
    // Validate request
    if (!functionName) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Missing required parameter: function_name'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Query to check if function exists
    const { data, error } = await supabase
      .from('pg_proc')
      .select('proname')
      .eq('proname', functionName)
      .limit(1);
      
    // Return result
    return new Response(
      JSON.stringify({
        exists: !error && data && data.length > 0,
        function_name: functionName
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Function check error:', error);
    
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