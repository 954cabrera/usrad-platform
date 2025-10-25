// /src/pages/test-api.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    message: 'Test API is working!' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};