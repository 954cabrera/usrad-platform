// =============================================================================
// src/pages/api/procedures/search.js
// =============================================================================

// ✅ Load environment variables from .env in local dev (safe in production)
import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';
import { detectModality, keyToDbValue } from '@/lib/modality-router.js';

// =============================================================================
// SUPABASE INITIALIZATION
// =============================================================================

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('PUBLIC_SUPABASE_ANON_KEY:', !!supabaseAnonKey);
  throw new Error('Supabase configuration missing');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============================================================================
// UTILS
// =============================================================================
const normalize = (s = '') =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w]|_/g, '');

// =============================================================================
// ASTRO GET HANDLER
// =============================================================================
export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const modalityParam = url.searchParams.get('modality') || '';

    // Route by explicit modality first, then by text inference
    const modalKeyExplicit = modalityParam ? modalityParam.toUpperCase() : null;
    const modalKeyDetected = detectModality(q);
    const chosenModalityKey = modalKeyExplicit || modalKeyDetected || null;
    const dbModality = keyToDbValue(chosenModalityKey); // null = all

    // Base query
let query = supabase
  .from('procedure_master')
  .select(`
    id,
    old_id,
    cpt_code,
    official_name,
    modality,
    category,
    last_updated,
    is_active,
    procedure_options (
      option_name,
      typical_price,
      contrast_type,
      cpt_code
    )
  `)
  .limit(100);


// Modality filter
if (dbModality) query = query.ilike('modality', `%${dbModality}%`);

// Text search
if (q) {
  const n = normalize(q);
  query = query.or(
    `official_name.ilike.%${q}%,category.ilike.%${q}%`
  );
  if (/[ -]/.test(q) || n !== q) {
    query = query.or(
      `official_name.ilike.%${n}%,category.ilike.%${n}%`
    );
  }
}

const { data, error } = await query;
if (error) {
  console.error('❌ Supabase error:', error);
  return new Response(
    JSON.stringify({ error: error.message }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}

// Normalize for UI
const list = (data || []).map((item) => ({
  id: item.id,
  displayName: item.official_name || 'Unnamed',
  description: item.modality || '',
  badge: item.cpt_code ? `CPT ${item.cpt_code}` : null,
  category: item.category || '',
  is_active: item.is_active,
  last_updated: item.last_updated,
}));


    console.log(
      `✅ Search results: ${list.length} record(s) [modality=${chosenModalityKey || 'ALL'} | q="${q}"]`
    );

    return new Response(
      JSON.stringify({
        modalityKey: chosenModalityKey,
        results: list,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (e) {
    console.error('🔥 API failure:', e);
    return new Response(JSON.stringify({ error: 'search_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
