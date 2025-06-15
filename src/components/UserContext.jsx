// src/components/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, getCurrentUser, getUserProfile, getImagingCenter } from '../lib/supabase'

const UserContext = createContext({})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [imagingCenter, setImagingCenter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Derived state for PSA completion
  const hasCompletedPSA = profile?.psa_signed || false
  const onboardingProgress = profile?.onboarding_progress || 40
  const networkAccessLevel = profile?.network_access_level || 'basic'

  // Helper function to check if user can access premium features
  const canAccessPremiumFeatures = () => {
    return hasCompletedPSA && networkAccessLevel === 'premium'
  }

  // Load user and profile data
  const loadUserData = async (authUser = null) => {
    try {
      setLoading(true)
      setError(null)

      // Get current user if not provided
      const currentUser = authUser || await getCurrentUser()
      setUser(currentUser)

      if (currentUser) {
        // Get user profile
        const userProfile = await getUserProfile(currentUser.id)
        
        if (!userProfile) {
          console.warn('⚠️ No user profile found for userId:', currentUser.id)
          // You might want to create a default profile here
          // or redirect to profile creation
        }
        
        setProfile(userProfile)

        // Get imaging center if profile has one
        if (userProfile?.imaging_center_id) {
          const center = await getImagingCenter(userProfile.imaging_center_id)
          setImagingCenter(center)
        }
      } else {
        setProfile(null)
        setImagingCenter(null)
      }
    } catch (err) {
      console.error('Error loading user data:', err)
      
      // Check if it's a 406 error
      if (err.message?.includes('406')) {
        setError('Database connection error. Please refresh the page.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Refresh profile data (useful after PSA completion)
  const refreshProfile = async () => {
    if (!user) return
    
    try {
      const updatedProfile = await getUserProfile(user.id)
      setProfile(updatedProfile)

      // Refresh imaging center data too
      if (updatedProfile?.imaging_center_id) {
        const center = await getImagingCenter(updatedProfile.imaging_center_id)
        setImagingCenter(center)
      }
    } catch (err) {
      console.error('Error refreshing profile:', err)
      setError(err.message)
    }
  }

  // Handle PSA completion
  const handlePSACompletion = async (documentUrl = null, submissionId = null) => {
    if (!user) return

    try {
      const { error } = await supabase.rpc('complete_psa_signing', {
        user_uuid: user.id,
        document_url: documentUrl,
        submission_id: submissionId
      })

      if (error) throw error

      // Refresh profile to show updated status
      await refreshProfile()
      
      return true
    } catch (err) {
      console.error('Error completing PSA:', err)
      setError(err.message)
      return false
    }
  }

  // Set up auth state listener
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUserData(session?.user || null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        await loadUserData(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Set up real-time profile updates
  useEffect(() => {
    if (!user) return

    const subscription = supabase
      .channel(`user-profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log('Profile updated:', payload.new)
          setProfile(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user])

  const value = {
    // Core user data
    user,
    profile,
    imagingCenter,
    loading,
    error,

    // Derived state
    hasCompletedPSA,
    onboardingProgress,
    networkAccessLevel,

    // Helper functions
    canAccessPremiumFeatures,
    refreshProfile,
    handlePSACompletion,

    // Auth functions
    signOut: () => supabase.auth.signOut(),
    
    // For backward compatibility with your existing components
    isAuthenticated: !!user,
    userEmail: user?.email || '',
    userFullName: profile?.full_name || '',
    companyName: profile?.company_name || ''
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}