// src/pages/api/track-popup.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Check for environment variables - using same names as subscribe-waitlist.js
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase only if credentials exist
let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('⚠️  Popup tracking: Supabase not configured - tracking disabled');
      // Return success so popup still works, but log warning
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: 'Tracking disabled - Supabase not configured' 
        }),
        { status: 200 }
      );
    }

    const { event } = await request.json();

    // Validate event type
    const validEvents = ['shown', 'closed', 'subscribed'];
    if (!validEvents.includes(event)) {
      return new Response(
        JSON.stringify({ error: 'Invalid event type' }),
        { status: 400 }
      );
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'unknown';
    
    // Generate session ID (you can enhance this later with actual session tracking)
    const sessionId = Math.random().toString(36).substring(7);

    // Insert tracking event
    const { data, error } = await supabase
      .from('popup_analytics')
      .insert({
        event_type: event,
        session_id: sessionId,
        page_url: referer,
        user_agent: userAgent,
        timestamp: new Date().toISOString()
      });

    if (error) {
      console.error('❌ Supabase tracking error:', error);
      
      // Return success anyway so popup doesn't break
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: 'Tracking failed but popup works',
          error: error.message 
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, event }),
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Track popup error:', error);
    
    // Return success anyway so popup doesn't break
    return new Response(
      JSON.stringify({ 
        success: true, 
        warning: 'Tracking error but popup works' 
      }),
      { status: 200 }
    );
  }
};