// src/lib/db.ts
import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are required')
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)