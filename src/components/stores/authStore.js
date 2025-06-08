// src/stores/authStore.js
import { atom } from 'nanostores'
import { auth } from '../../lib/supabase.js'

// Auth state atoms
export const $user = atom(null)
export const $session = atom(null)
export const $loading = atom(true)

// Initialize auth state
export async function initializeAuth() {
  try {
    $loading.set(true)
    
    // Get current session
    const session = await auth.getSession()
    $session.set(session)
    
    // Get current user
    const user = await auth.getUser()
    $user.set(user)
    
    // Listen for auth changes
    auth.onAuthStateChange((event, session) => {
      $session.set(session)
      $user.set(session?.user ?? null)
      
      // Redirect based on auth state
      if (event === 'SIGNED_IN') {
        // Redirect to dashboard after successful login
        window.location.href = '/dashboard'
      } else if (event === 'SIGNED_OUT') {
        // Redirect to home after logout
        window.location.href = '/'
      }
    })
  } catch (error) {
    console.error('Error initializing auth:', error)
  } finally {
    $loading.set(false)
  }
}

// Auth actions
export const authActions = {
  async signUp(email, password, metadata = {}) {
    $loading.set(true)
    try {
      const { data, error } = await auth.signUp(email, password, {
        center_name: metadata.centerName,
        center_type: metadata.centerType || 'imaging_center',
        onboarding_step: 'profile_setup',
        psa_signed: false
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  },

  async signIn(email, password) {
    $loading.set(true)
    try {
      const { data, error } = await auth.signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  },

  async signOut() {
    $loading.set(true)
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  }
}

// Helper functions
export function isAuthenticated() {
  const user = $user.get()
  return !!user
}

export function getUserMetadata() {
  const user = $user.get()
  return user?.user_metadata || {}
}

export function hasCompletedPSA() {
  const metadata = getUserMetadata()
  return metadata.psa_signed === true
}// src/stores/authStore.js
import { atom } from 'nanostores'
import { auth } from '../lib/supabase.js'

// Auth state atoms
export const $user = atom(null)
export const $session = atom(null)
export const $loading = atom(true)

// Initialize auth state
export async function initializeAuth() {
  try {
    $loading.set(true)
    
    // Get current session
    const session = await auth.getSession()
    $session.set(session)
    
    // Get current user
    const user = await auth.getUser()
    $user.set(user)
    
    // Listen for auth changes
    auth.onAuthStateChange((event, session) => {
      $session.set(session)
      $user.set(session?.user ?? null)
      
      // Redirect based on auth state
      if (event === 'SIGNED_IN') {
        // Redirect to dashboard after successful login
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard'
        }
      } else if (event === 'SIGNED_OUT') {
        // Redirect to home after logout
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      }
    })
  } catch (error) {
    console.error('Error initializing auth:', error)
  } finally {
    $loading.set(false)
  }
}

// Auth actions
export const authActions = {
  async signUp(email, password, metadata = {}) {
    $loading.set(true)
    try {
      const { data, error } = await auth.signUp(email, password, {
        center_name: metadata.centerName,
        center_type: metadata.centerType || 'imaging_center',
        contact_name: metadata.contactName,
        phone: metadata.phone,
        user_type: 'imaging_center',
        onboarding_step: 'email_verification',
        psa_signed: false,
        profile_complete: false
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  },

  async signIn(email, password) {
    $loading.set(true)
    try {
      const { data, error } = await auth.signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  },

  async signOut() {
    $loading.set(true)
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      
      // Clear local state immediately
      $user.set(null)
      $session.set(null)
      
      // Redirect to homepage with success message
      if (typeof window !== 'undefined') {
        // Add a temporary success flag for homepage toast
        sessionStorage.setItem('logout_success', 'true')
        window.location.href = '/'
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      $loading.set(false)
    }
  },

  // Update user metadata (for progressive disclosure)
  async updateUserMetadata(updates) {
    try {
      const { data, error } = await auth.updateUser({
        data: updates
      })
      
      if (error) throw error
      
      // Update local state
      const currentUser = $user.get()
      if (currentUser) {
        $user.set({
          ...currentUser,
          user_metadata: {
            ...currentUser.user_metadata,
            ...updates
          }
        })
      }
      
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Helper functions for progressive disclosure
export function isAuthenticated() {
  const user = $user.get()
  return !!user
}

export function getUserMetadata() {
  const user = $user.get()
  return user?.user_metadata || {}
}

export function hasCompletedPSA() {
  const metadata = getUserMetadata()
  return metadata.psa_signed === true
}

export function getOnboardingStep() {
  const metadata = getUserMetadata()
  return metadata.onboarding_step || 'profile_setup'
}

export function isProfileComplete() {
  const metadata = getUserMetadata()
  return metadata.profile_complete === true
}

// Progressive disclosure permissions
export function canAccessNetworkResources() {
  return isAuthenticated() // Basic network info available immediately
}

export function canAccessRevenueAnalytics() {
  return hasCompletedPSA() // Premium analytics only after PSA
}

export function canAccessAdvancedTraining() {
  return hasCompletedPSA() // Full training materials after PSA
}

export function canAccessDirectSupport() {
  return hasCompletedPSA() // Direct contact only after commitment
}

// Onboarding progress calculation
export function getOnboardingProgress() {
  if (!isAuthenticated()) return 0
  
  const metadata = getUserMetadata()
  let progress = 20 // 20% for account creation
  
  if (metadata.profile_complete) progress += 20 // 40% total
  if (metadata.psa_signed) progress += 40 // 80% total
  if (metadata.onboarding_complete) progress += 20 // 100% total
  
  return Math.min(progress, 100)
}