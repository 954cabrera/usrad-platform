// src/pages/api/test.js
export async function GET() {
    // Astro uses import.meta.env instead of process.env in API routes
    const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    
    return new Response(JSON.stringify({
      message: 'API is working!',
      supabase_url: supabaseUrl || 'NOT FOUND',
      supabase_key: supabaseKey ? 'EXISTS' : 'NOT FOUND',
      all_env_keys: Object.keys(import.meta.env).filter(key => key.includes('SUPABASE'))
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }