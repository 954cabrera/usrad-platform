// dashboard-auth.js - Dashboard Authentication Logic
export class DashboardAuth {
    constructor() {
      this.user = null;
      this.profile = null;
      this.supabase = null;
    }
  
    async initializeAuth() {
      try {
        // Initialize Supabase client
        const { createClient } = await import('https://cdnjs.cloudflare.com/ajax/libs/supabase-js/2.39.0/index.js');
        this.supabase = createClient(
          window.SUPABASE_URL || 'your-supabase-url',
          window.SUPABASE_ANON_KEY || 'your-supabase-anon-key'
        );
  
        // Get current user
        const { data: { user }, error } = await this.supabase.auth.getUser();
        
        if (error) {
          console.error('Auth error:', error);
          return null;
        }
  
        this.user = user;
        
        if (user) {
          await this.loadUserProfile(user.id);
          this.updateGlobalUserObject();
        }
  
        return user;
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        return null;
      }
    }
  
    async loadUserProfile(userId) {
      try {
        const { data: profile, error } = await this.supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single();
  
        if (error && error.code !== 'PGRST116') {
          console.error('Profile fetch error:', error);
          return null;
        }
  
        this.profile = profile;
        return profile;
      } catch (error) {
        console.error('Error loading user profile:', error);
        return null;
      }
    }
  
    updateGlobalUserObject() {
      // Update global USRadUser object
      if (typeof window !== 'undefined') {
        window.USRadUser = {
          user: this.user,
          profile: this.profile,
          supabase: this.supabase,
          hasCompletedPSA: this.profile?.psa_signed || this.user?.user_metadata?.psa_signed || false,
          onboardingProgress: this.calculateOnboardingProgress(),
          loadUserData: () => this.initializeAuth()
        };
      }
    }
  
    calculateOnboardingProgress() {
      if (!this.profile) return 0;
      
      let progress = 0;
      
      // Basic profile completion
      if (this.profile.full_name) progress += 20;
      if (this.profile.phone) progress += 10;
      if (this.profile.company_name || this.profile.center_name) progress += 10;
      
      // Facility setup
      if (this.profile.onboarding_progress > 0) progress += 20;
      
      // PSA completion
      if (this.profile.psa_signed || this.user?.user_metadata?.psa_signed) progress += 40;
      
      return Math.min(progress, 100);
    }
  
    getUserDisplayName() {
      if (this.profile?.full_name) {
        return this.profile.full_name.split(' ')[0];
      }
      if (this.user?.email) {
        return this.user.email.split('@')[0];
      }
      return 'User';
    }
  
    async signOut() {
      try {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
        
        // Clear global objects
        if (typeof window !== 'undefined') {
          window.USRadUser = null;
        }
        
        // Redirect to login
        window.location.href = '/login';
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  }