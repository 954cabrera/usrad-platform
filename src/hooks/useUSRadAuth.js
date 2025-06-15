// Shared authentication hook for USRad components
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useUSRadAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState('User');
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Check if USRad user is already loaded (priority)
      if (window.USRadUser && window.USRadUser.user) {
        console.log('✅ USRad user found:', window.USRadUser.user.email);
        setUser(window.USRadUser.user);
        
        // Set display name from various sources
        let displayName = window.USRadUser.user.email || 'User';
        
        if (window.USRadUser.profile?.full_name) {
          displayName = window.USRadUser.profile.full_name;
        } else if (window.USRadUser.user.user_metadata?.full_name) {
          displayName = window.USRadUser.user.user_metadata.full_name;
        }
        
        setUserDisplayName(displayName);
        setLoading(false);
        return;
      }

      // Fall back to Supabase auth
      console.log('🔄 Checking Supabase auth...');
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (!session) {
        console.log('❌ No session found, redirecting...');
        window.location.href = '/login/imaginglogin';
        return;
      }

      console.log('✅ Supabase session found:', session.user.email);
      setUser(session.user);
      
      // Set display name from user metadata or email
      let displayName = session.user.email || 'User';
      if (session.user.user_metadata?.full_name) {
        displayName = session.user.user_metadata.full_name;
      }
      
      setUserDisplayName(displayName);
    } catch (error) {
      console.error('❌ Auth initialization error:', error);
      window.location.href = '/login/imaginglogin';
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayName = (name) => {
    if (name && name.trim()) {
      setUserDisplayName(name);
    }
  };

  const signOut = async () => {
    if (signingOut) return false;
    
    try {
      setSigningOut(true);
      console.log('🔄 Signing out...');
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear USRad user data
      if (window.USRadUser) {
        window.USRadUser = null;
      }
      
      // Clear any cached data
      if (window.userData) {
        window.userData = null;
      }
      
      sessionStorage.setItem('logout_success', 'true');
      window.location.href = '/';
      return true;
    } catch (error) {
      console.error('❌ Sign out error:', error);
      return false;
    } finally {
      setSigningOut(false);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    userDisplayName,
    signingOut,
    updateDisplayName,
    signOut,
    isAuthenticated,
    refreshAuth: initializeAuth
  };
};