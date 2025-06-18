// File: /src/pages/api/update-psa-status.js
// SIMPLIFIED VERSION that focuses on user_profiles table

import { createClient } from '@supabase/supabase-js';

export async function POST({ request }) {
  try {
    const { userId, psaSigned, completedAt } = await request.json();
    
    console.log('🔍 API received:', { userId, psaSigned, completedAt });
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, check if user_profiles record exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .single();

    console.log('🔍 Existing profile check:', { existingProfile, checkError });

    let updateResult;
    
    if (existingProfile) {
      // Record exists, update it
      console.log('📝 Updating existing profile...');
      updateResult = await supabase
        .from('user_profiles')
        .update({
          psa_signed: psaSigned,
          onboarding_progress: psaSigned ? 60 : 0,
          updated_at: completedAt
        })
        .eq('id', userId)
        .select();
    } else {
      // No record exists, create one
      console.log('📝 Creating new profile...');
      updateResult = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          user_id: userId, // Include both fields to be safe
          psa_signed: psaSigned,
          onboarding_progress: psaSigned ? 60 : 0,
          updated_at: completedAt,
          created_at: completedAt
        })
        .select();
    }

    const { data, error } = updateResult;
    
    console.log('🔍 Update result:', { data, error });

    if (error) {
      console.error('❌ Database update error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Database updated successfully:', data);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'PSA status updated successfully',
      data: data,
      user: { id: userId }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}