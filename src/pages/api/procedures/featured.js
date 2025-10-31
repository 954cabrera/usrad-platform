import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

// Curated list: pull from your existing `procedure_search_index`
export async function get() {
  const { data, error } = await supabase
    .from('procedure_search_index')
    .select('id, display_name, modality, icon, cpt_code, popularity_badge, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(12);

  if (error) {
    console.error('featured error', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify(data || []), { status: 200 });
}
