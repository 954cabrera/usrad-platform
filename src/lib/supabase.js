// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

/* ===========================================================
   1️⃣  Public (Browser) Client — Safe for Frontend Auth
   =========================================================== */
const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL

const supabaseAnonKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY

// Used by UI components, patient flows, sign-in/out, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

/* ===========================================================
   2️⃣  Server (Service Role) Client — Safe for Server-Side Use
   =========================================================== */
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  { auth: { persistSession: false } }
)

/* ===========================================================
   3️⃣  Auth Utilities (Frontend-Side Only)
   =========================================================== */
export const auth = {
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })
    return { data, error }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  },

  async getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  async updateUser(updates) {
    const { data, error } = await supabase.auth.updateUser(updates)
    return { data, error }
  },
}

/* ===========================================================
   4️⃣  User & Profile Helpers
   =========================================================== */
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.message?.includes('406') || error.code === '406') {
        console.error('❌ 406 error fetching profile:', error)
        return null
      }
      console.error('Error getting user profile:', error)
      return null
    }

    console.log('✅ Loaded user profile for userId:', userId)
    return data
  } catch (err) {
    console.error('Unexpected error in getUserProfile:', err)
    return null
  }
}

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
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

/* ===========================================================
   5️⃣  PSA & Imaging Center Helpers
   =========================================================== */
export const completePSASigning = async (
  userId,
  documentUrl = null,
  submissionId = null
) => {
  const { error } = await supabase.rpc('complete_psa_signing', {
    user_uuid: userId,
    document_url: documentUrl,
    submission_id: submissionId,
  })

  if (error) {
    console.error('Error completing PSA signing:', error)
    throw error
  }

  // Refresh profile
  return await getUserProfile(userId)
}

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
