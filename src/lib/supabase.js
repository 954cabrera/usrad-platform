// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth utilities
export const auth = {
  // Sign up new user
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  },

  // Sign in existing user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Get current user
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Update user metadata
  async updateUser(updates) {
    const { data, error } = await supabase.auth.updateUser(updates)
    return { data, error }
  }
}

// Helper functions for user management and progressive disclosure
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error getting user profile:', error)
    return null
  }
  return data
}

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
  return data
}

export const completePSASigning = async (userId, documentUrl = null, submissionId = null) => {
  const { error } = await supabase.rpc('complete_psa_signing', {
    user_uuid: userId,
    document_url: documentUrl,
    submission_id: submissionId
  })
  
  if (error) {
    console.error('Error completing PSA signing:', error)
    throw error
  }
  
  // Refresh the user profile to get updated data
  return await getUserProfile(userId)
}

// Helper function to get user's imaging center
export const getImagingCenter = async (centerId) => {
  if (!centerId) return null
  
  const { data, error } = await supabase
    .from('imaging_centers')
    .select(`
      id,
      facility_name,
      street_1,
      city,
      state,
      zip_code,
      phone_number,
      modality,
      status,
      onboarding_status
    `)
    .eq('id', centerId)
    .single()
  
  if (error) {
    console.error('Error fetching imaging center:', error)
    return null
  }
  return data
}