import { createClient } from '@supabase/supabase-js';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const query = (url.searchParams.get('q') || '').trim().toLowerCase();
    
    if (query.length < 2) {
      return new Response(JSON.stringify({ procedures: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: procedures, error } = await supabase
    .from('procedure_search_index')
    .select(`
      *,
      options:procedure_options(*)
    `)
    .or(`display_name.ilike.%${query}%,modality.ilike.%${query}%,region.ilike.%${query}%`)
    .order('sort_order')
    .limit(6);

    if (error) {
      console.error('Search error:', error);
      return new Response(JSON.stringify({ procedures: [] }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formatted = (procedures || []).map(proc => ({
      id: proc.search_key,
      modality: proc.modality,
      region: proc.region,
      displayName: proc.display_name,
      description: proc.description,
      icon: proc.icon,
      badge: proc.popularity_badge,
      options: (proc.options || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(opt => ({
          cpt: opt.cpt_code,
          label: opt.label,
          detail: opt.detail,
          price: opt.price_range
        }))
    }));

    // Track zero-result searches (fire and forget - don't wait)
    if (formatted.length === 0) {
      supabase.from('search_analytics').insert({
        query: query,
        results_count: 0,
        user_agent: request.headers.get('user-agent')
      }).then(() => {}).catch(() => {}); // Ignore errors
    }

    return new Response(JSON.stringify({ procedures: formatted }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return new Response(JSON.stringify({ procedures: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}