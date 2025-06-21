// src/lib/sessionManager.js
// Enhanced session management with complete user data isolation

import { supabase } from './supabase.js';

class UserSessionManager {
  constructor() {
    this.currentUserId = null;
    this.sessionCleanupHandlers = [];
    this.initialized = false;
  }

  // 🔒 SECURITY: Initialize the session manager
  async initialize() {
    if (this.initialized) return;
    
    try {
      // Check if user is already authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.currentUserId = session.user.id;
        console.log('✅ Session manager initialized for user:', this.currentUserId);
      }
      
      // Set up auth state monitoring
      this.initAuthStateMonitoring();
      this.initialized = true;
    } catch (error) {
      console.error('❌ Error initializing session manager:', error);
    }
  }

  // 🔒 SECURITY: Get current authenticated user with validation
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error('❌ Authentication failed:', error);
        await this.handleLogout();
        throw new Error('User not authenticated');
      }

      // Validate user session is still active
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        console.error('❌ No active session');
        await this.handleLogout();
        throw new Error('No active session');
      }

      this.currentUserId = user.id;
      console.log('✅ Current user validated:', user.id);
      return user;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      throw error;
    }
  }

  // 🔒 SECURITY: User-scoped localStorage keys
  getUserStorageKey(key, userId) {
    if (!userId) throw new Error('User ID required for storage key');
    return `usrad_${userId}_${key}`;
  }

  // 🔒 SECURITY: Get user-scoped data from localStorage
  getUserStorageItem(key, userId = null) {
    const targetUserId = userId || this.currentUserId;
    if (!targetUserId) return null;
    
    const storageKey = this.getUserStorageKey(key, targetUserId);
    return localStorage.getItem(storageKey);
  }

  // 🔒 SECURITY: Set user-scoped data in localStorage
  setUserStorageItem(key, value, userId = null) {
    const targetUserId = userId || this.currentUserId;
    if (!targetUserId) throw new Error('User ID required for storage');
    
    const storageKey = this.getUserStorageKey(key, targetUserId);
    localStorage.setItem(storageKey, value);
  }

  // 🔒 SECURITY: Clear ALL user data from storage
  clearUserStorage(userId = null) {
    const targetUserId = userId || this.currentUserId;
    
    console.log('🧹 Clearing user storage for:', targetUserId);
    
    // List of all possible keys used in your app
    const appKeys = [
      'organization_type',
      'corporate_info',
      'selected_facilities',
      'onboarding_progress',
      'facility_search_cache',
      'user_preferences',
      'dashboard_state',
      'psa_state',
      'current_step',
      'auto_save_data'
    ];

    // Clear user-scoped keys
    if (targetUserId) {
      appKeys.forEach(key => {
        const scopedKey = this.getUserStorageKey(key, targetUserId);
        localStorage.removeItem(scopedKey);
        sessionStorage.removeItem(scopedKey);
      });
    }

    // Clear any legacy non-scoped keys
    appKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Clear any keys starting with 'usrad_'
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('usrad_')) {
        localStorage.removeItem(key);
      }
    });

    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('usrad_')) {
        sessionStorage.removeItem(key);
      }
    });

    console.log('✅ User storage cleared');
  }

  // 🔒 SECURITY: Complete session cleanup on logout
  async handleLogout() {
    try {
      console.log('🧹 Starting complete session cleanup...');

      const currentUserId = this.currentUserId;
      
      // 1. Clear all localStorage/sessionStorage
      this.clearUserStorage(currentUserId);
      
      // 2. Clear global objects
      if (typeof window !== 'undefined') {
        window.USRadUser = null;
      }
      
      // 3. Run any registered cleanup handlers
      await this.runCleanupHandlers();
      
      // 4. Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Supabase logout error:', error);
      }
      
      // 5. Reset session manager state
      this.currentUserId = null;
      
      // 6. Force redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      console.log('✅ Complete session cleanup finished');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Force cleanup even if errors occur
      this.forceCleanup();
    }
  }

  // 🔒 SECURITY: Force cleanup in case of errors
  forceCleanup() {
    console.log('🚨 Force cleanup initiated');
    
    // Clear all storage without user ID
    this.clearUserStorage();
    
    // Clear global objects
    if (typeof window !== 'undefined') {
      window.USRadUser = null;
    }
    
    // Reset any global state
    this.currentUserId = null;
    
    // Force redirect
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  }

  // Register cleanup handlers for components
  registerCleanupHandler(handler) {
    if (typeof handler === 'function') {
      this.sessionCleanupHandlers.push(handler);
    }
  }

  // Run all registered cleanup handlers
  async runCleanupHandlers() {
    for (const handler of this.sessionCleanupHandlers) {
      try {
        await handler();
      } catch (error) {
        console.error('❌ Cleanup handler error:', error);
      }
    }
    this.sessionCleanupHandlers = [];
  }

  // 🔒 SECURITY: Validate user context for operations
  async validateUserContext(requiredUserId = null) {
    try {
      const user = await this.getCurrentUser();
      
      if (requiredUserId && user.id !== requiredUserId) {
        console.error('❌ User context mismatch:', { 
          current: user.id, 
          required: requiredUserId 
        });
        throw new Error('User context validation failed');
      }

      return user;
    } catch (error) {
      console.error('❌ User context validation failed:', error);
      await this.handleLogout();
      throw error;
    }
  }

  // 🔒 SECURITY: Handle user switching
  async handleUserSwitch(newUserId) {
    try {
      console.log('🔄 Handling user switch...');
      
      // Clear previous user's data
      if (this.currentUserId) {
        this.clearUserStorage(this.currentUserId);
      }
      
      // Update current user ID
      this.currentUserId = newUserId;
      
      // Validate new user
      await this.validateUserContext(newUserId);
      
      console.log('✅ User switch completed:', newUserId);
    } catch (error) {
      console.error('❌ User switch failed:', error);
      await this.handleLogout();
    }
  }

  // 🔒 SECURITY: Monitor authentication state changes
  initAuthStateMonitoring() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log('🚪 User signed out, cleaning up...');
        this.clearUserStorage(this.currentUserId);
        this.currentUserId = null;
        if (typeof window !== 'undefined') {
          window.USRadUser = null;
        }
      } else if (event === 'SIGNED_IN' && session?.user) {
        console.log('🚪 User signed in:', session.user.id);
        
        // Check for user switch
        if (this.currentUserId && this.currentUserId !== session.user.id) {
          await this.handleUserSwitch(session.user.id);
        } else {
          this.currentUserId = session.user.id;
        }
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed');
        // Validate user is still the same
        if (session?.user && this.currentUserId !== session.user.id) {
          console.error('❌ User ID changed during token refresh');
          await this.handleLogout();
        }
      }
    });
  }
}

// 🔒 Create and export global session manager instance
const sessionManager = new UserSessionManager();

// 🔒 Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  // Initialize session manager
  sessionManager.initialize();
  
  // Make available globally
  window.USRadSessionManager = sessionManager;
  
  // 🔒 Enhanced logout function for use in components
  window.handleSecureLogout = async () => {
    await sessionManager.handleLogout();
  };

  // 🔒 Enhanced user validation function for use in components
  window.validateUserSession = async (requiredUserId = null) => {
    return await sessionManager.validateUserContext(requiredUserId);
  };
}

export default sessionManager;