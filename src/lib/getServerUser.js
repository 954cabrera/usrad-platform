// src/lib/getServerUser.js
import { createServerClient } from '@supabase/ssr';
import { parse, serialize } from 'cookie';

export async function getUser(Astro) {
  const request = Astro.request;

  const cookies = parse(request.headers.get('cookie') || '');

  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      request,
      response: new Response(), // optional fallback
      cookies: {
        getAll: () => Object.entries(cookies).map(([key, value]) => ({ name: key, value })),
        setAll: (newCookies) => {
          newCookies.forEach((cookie) => {
            // You can enhance this if needed with Astro.cookies API
            // For SSR-only, this is sufficient
            Astro.cookies.set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  return { user: data.user ?? null };
}
