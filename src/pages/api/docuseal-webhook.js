// src/pages/api/docuseal-webhook.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST({ request }) {
  try {
    console.log('🔔 DocuSeal webhook triggered for USRad PSA completion')
    
    // Parse webhook payload
    const payload = await request.json()
    console.log('📄 DocuSeal webhook payload:', JSON.stringify(payload, null, 2))

    // Check if this is a completion event
    if (payload.event_type === 'form.completed' || 
        payload.status === 'completed' || 
        payload.data?.status === 'completed') {
      
      // Extract user information - DocuSeal may send different formats
      const userEmail = payload.submitter?.email || 
                       payload.data?.submitter?.email || 
                       payload.email ||
                       payload.data?.email
      
      const documentUrl = payload.documents?.[0]?.url || 
                         payload.data?.documents?.[0]?.url ||
                         payload.document_url ||
                         payload.data?.document_url
      
      const submissionId = payload.submission_uuid || 
                          payload.data?.submission_uuid ||
                          payload.id ||
                          payload.data?.id

      console.log('📧 Processing PSA completion for:', { userEmail, documentUrl, submissionId })

      if (!userEmail) {
        console.error('❌ No email found in DocuSeal webhook payload')
        return new Response(JSON.stringify({ error: 'Email required for PSA completion' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Create Supabase client with service role key
      const supabase = import { supabase } from '@/lib/supabase';
      // Find user by email in auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
      
      if (authError) {
        console.error('❌ Error fetching auth users:', authError)
        return new Response(JSON.stringify({ error: 'Auth lookup failed' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      const user = authUsers?.users?.find(u => u.email === userEmail)

      if (!user) {
        console.error('❌ User not found in auth.users:', userEmail)
        return new Response(JSON.stringify({ error: 'User not found in USRad system' }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      console.log('✅ Found USRad user:', user.id, user.email)

      // Update user_profiles table to mark PSA as completed
      const { data: updateData, error: updateError } = await supabase
        .from('user_profiles')
        .update({
          psa_signed: true,
          psa_signed_at: new Date().toISOString(),
          psa_document_url: documentUrl,
          psa_submission_id: submissionId,
          onboarding_progress: 75, // PSA completion = 75% progress
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('❌ Error updating user profile:', updateError)
        return new Response(JSON.stringify({ error: 'Profile update failed' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      console.log('🎉 PSA completion processed successfully for:', userEmail)
      console.log('📊 User progress updated to 75%')
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'PSA completed and processed successfully',
        user_id: user.id,
        progress: 75,
        next_step: 'CAQH Registration'
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // For other event types, just acknowledge
    console.log('📝 Non-completion event received:', payload.event_type || payload.status)
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Webhook received but not a completion event' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('💥 DocuSeal webhook error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error processing PSA webhook',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}