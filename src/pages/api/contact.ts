import type { APIRoute } from 'astro';

const REMIX_URL = import.meta.env.PUBLIC_REMIX_URL || 'https://usrad-portal.vercel.app';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const response = await fetch(`${REMIX_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: result.error || 'Failed to send message' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};