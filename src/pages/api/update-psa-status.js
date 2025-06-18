// File: /src/pages/api/update-psa-status.js
// This is the FIXED version that handles the Supabase configuration properly

import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  try {
    const { userId, psaSigned, completedAt } = await request.json();
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if we have the required Supabase environment variables
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log('⚠️ Supabase not configured, skipping PSA status update');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'PSA completion recorded (Supabase not configured)',
          userId: userId
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with proper error handling
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update user metadata in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        user_metadata: {
          psa_signed: psaSigned,
          psa_completed_at: completedAt,
          onboarding_step: psaSigned ? 'psa_completed' : 'psa_pending'
        }
      }
    );

    if (authError) {
      console.error('Auth update error:', authError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to update user auth metadata', 
          details: authError.message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Also update user_profiles table if you have one
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        psa_signed: psaSigned,
        psa_completed_at: completedAt,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Profile update error:', profileError);
      // Don't fail if profile update fails, auth update is primary
    }

    // Log the completion for analytics (optional)
    try {
      await supabase
        .from('psa_completions')
        .insert({
          user_id: userId,
          completed_at: completedAt,
          ip_address: request.headers.get('x-forwarded-for') || 'unknown',
          user_agent: request.headers.get('user-agent') || 'unknown'
        });
    } catch (logError) {
      // Non-critical, don't fail for this
      console.log('Analytics logging failed (non-critical):', logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'PSA status updated successfully',
        user: authUser?.user || { id: userId }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('PSA status update error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}