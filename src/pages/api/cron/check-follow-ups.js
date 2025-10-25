// src/pages/api/cron/check-follow-ups.js
// This endpoint should be called daily by Vercel Cron or similar service

export async function GET({ request }) {
  // Verify this is coming from a trusted source (Vercel Cron)
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${import.meta.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Redirect to the main check follow-ups endpoint
  const baseUrl = new URL(request.url).origin;
  const response = await fetch(`${baseUrl}/api/contact-manage?action=check_follow_ups`);
  
  const result = await response.json();
  
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}