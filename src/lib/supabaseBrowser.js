// src/lib/supabaseBrowser.js
import { createClient } from '@supabase/supabase-js'

// ✅ Browser-safe client for Astro Islands (no process.env)
export const supabaseBrowser = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)
