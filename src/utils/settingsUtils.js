// Settings System Utilities - Helper functions for unified settings
import { supabase } from '@/lib/supabase';

export class SettingsManager {
  constructor() {
    this.cache = new Map();
    this.listeners = new Map();
  }

  // Format utilities
  static formatTaxId(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
  }

  static formatPhoneNumber(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  }

  static validateTaxId(taxId) {
    const numbers = taxId.replace(/\D/g, '');
    return numbers.length === 9;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhoneNumber(phone) {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10;
  }

  // Data loading functions
  async loadUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || {};
    } catch (error) {
      console.error('Error loading user profile:', error);
      return {};
    }
  }

  async loadCorporateData(userId) {
    try {
      const { data, error } = await supabase
        .from('corporate_entities')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || {};
    } catch (error) {
      console.error('Error loading corporate data:', error);
      return {};
    }
  }

  async loadFacilities(userId) {
    try {
      const { data, error } = await supabase
        .from('user_facilities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading facilities:', error);
      return [];
    }
  }

  async loadOnboardingProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('onboarding_progress, onboarding_step, onboarding_completed_steps, psa_signed, credentialing_complete, banking_setup, launch_ready')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || {};
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
      return {};
    }
  }

  // Save functions with validation
  async saveUserProfile(userId, profileData) {
    try {
      // Validate required fields
      const requiredFields = ['full_name', 'phone', 'center_name'];
      const missingFields = requiredFields.filter(field => !profileData[field]?.trim());
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate phone number
      if (!SettingsManager.validatePhoneNumber(profileData.phone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          ...profileData,
          phone: profileData.phone.replace(/\D/g, ''), // Store numbers only
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      
      // Clear cache and notify listeners
      this.cache.delete(`profile_${userId}`);
      this.notifyListeners('profile_updated', { userId, data: profileData });
      
      return { success: true };
    } catch (error) {
      console.error('Error saving user profile:', error);
      return { success: false, error: error.message };
    }
  }

  async saveCorporateData(userId, corporateData) {
    try {
      // Validate Tax ID if provided
      if (corporateData.tax_id && !SettingsManager.validateTaxId(corporateData.tax_id)) {
        throw new Error('Please enter a valid 9-digit Tax ID (EIN)');
      }

      // Validate email if provided
      if (corporateData.primary_contact_email && !SettingsManager.validateEmail(corporateData.primary_contact_email)) {
        throw new Error('Please enter a valid email address');
      }

      // Clean phone numbers
      const cleanData = {
        ...corporateData,
        tax_id: corporateData.tax_id ? corporateData.tax_id.replace(/\D/g, '') : null,
        phone: corporateData.phone ? corporateData.phone.replace(/\D/g, '') : null,
        primary_contact_phone: corporateData.primary_contact_phone ? corporateData.primary_contact_phone.replace(/\D/g, '') : null
      };

      const { error } = await supabase
        .from('corporate_entities')
        .upsert({
          user_id: userId,
          ...cleanData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      
      // Clear cache and notify listeners
      this.cache.delete(`corporate_${userId}`);
      this.notifyListeners('corporate_updated', { userId, data: corporateData });
      
      return { success: true };
    } catch (error) {
      console.error('Error saving corporate data:', error);
      return { success: false, error: error.message };
    }
  }

  async saveNotificationSettings(userId, notifications) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          notification_settings: notifications,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;
      
      this.notifyListeners('notifications_updated', { userId, data: notifications });
      
      return { success: true };
    } catch (error) {
      console.error('Error saving notification settings:', error);
      return { success: false, error: error.message };
    }
  }

  // Progress calculation
  calculateCompletion(profileData, corporateData, facilities) {
    // Profile completion
    const profileFields = ['full_name', 'phone', 'center_name'];
    const profileComplete = profileFields.filter(field => profileData[field]?.trim()).length;
    const profilePercentage = Math.round((profileComplete / profileFields.length) * 100);

    // Organization completion  
    const orgRequiredFields = ['corporate_name', 'tax_id', 'signer_name', 'primary_contact_email', 'corporate_address', 'corporate_city', 'corporate_state'];
    const orgComplete = orgRequiredFields.filter(field => corporateData[field]?.trim()).length;
    const orgPercentage = Math.round((orgComplete / orgRequiredFields.length) * 100);

    // Facilities completion
    const facilityPercentage = facilities && facilities.length > 0 ? 100 : 0;

    // Overall completion
    const overall = Math.round((profilePercentage + orgPercentage + facilityPercentage) / 3);

    return {
      profile: profilePercentage,
      organization: orgPercentage,
      facilities: facilityPercentage,
      overall
    };
  }

  // Onboarding steps definition
  getOnboardingSteps(progress = {}, facilities = []) {
    return [
      {
        id: 'account',
        name: 'Account Created',
        completed: true,
        icon: 'User',
        description: 'Account successfully created'
      },
      {
        id: 'profile',
        name: 'Profile Setup',
        completed: Boolean(progress.full_name && progress.phone && progress.center_name),
        icon: 'User',
        description: 'Complete your professional profile'
      },
      {
        id: 'organization',
        name: 'Organization Info',
        completed: Boolean(progress.corporate_name && progress.tax_id && progress.signer_name),
        icon: 'Building2',
        description: 'Add your organization details'
      },
      {
        id: 'facilities',
        name: 'Facilities Added',
        completed: facilities.length > 0,
        icon: 'Building2',
        description: 'Add your imaging facilities'
      },
      {
        id: 'psa',
        name: 'PSA Signed',
        completed: progress.psa_signed || false,
        icon: 'FileText',
        description: 'Sign Provider Services Agreement'
      },
      {
        id: 'credentialing',
        name: 'Credentialing',
        completed: progress.credentialing_complete || false,
        icon: 'Award',
        description: 'Complete credentialing process'
      },
      {
        id: 'banking',
        name: 'Banking Setup',
        completed: progress.banking_setup || false,
        icon: 'DollarSign',
        description: 'Set up payment information'
      },
      {
        id: 'launch',
        name: 'Launch Ready',
        completed: progress.launch_ready || false,
        icon: 'CheckCircle',
        description: 'Ready to start providing services'
      }
    ];
  }

  // Auto-population helpers
  async autoPopulateCorporateFromProfile(userId) {
    try {
      const profile = await this.loadUserProfile(userId);
      
      if (!profile.full_name || !profile.center_name) {
        throw new Error('Please complete your profile first');
      }

      return {
        corporate_name: profile.center_name,
        signer_name: profile.full_name,
        signer_title: profile.professional_title || 'Medical Director',
        primary_contact_name: profile.full_name,
        primary_contact_email: '', // Will need to be filled manually
        primary_contact_phone: profile.phone || ''
      };
    } catch (error) {
      console.error('Error auto-populating corporate data:', error);
      return null;
    }
  }

  // Event system for real-time updates
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
      }
    };
  }

  notifyListeners(event, data) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // Upload profile photo
  async uploadProfilePhoto(userId, file) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      // Update user profile with photo URL
      await this.saveUserProfile(userId, { profile_photo_url: data.publicUrl });

      return { success: true, url: data.publicUrl };
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      return { success: false, error: error.message };
    }
  }

  // Bulk data export
  async exportUserData(userId, format = 'json') {
    try {
      const [profile, corporate, facilities, progress] = await Promise.all([
        this.loadUserProfile(userId),
        this.loadCorporateData(userId),
        this.loadFacilities(userId),
        this.loadOnboardingProgress(userId)
      ]);

      const userData = {
        profile,
        corporate,
        facilities,
        progress,
        completion: this.calculateCompletion(profile, corporate, facilities),
        onboardingSteps: this.getOnboardingSteps(progress, facilities),
        exportDate: new Date().toISOString()
      };

      if (format === 'csv') {
        return this.convertToCSV(userData);
      }

      return userData;
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  }

  convertToCSV(userData) {
    const csvData = [];
    
    // Profile data
    csvData.push(['Section', 'Field', 'Value']);
    Object.entries(userData.profile).forEach(([key, value]) => {
      csvData.push(['Profile', key, value]);
    });
    
    // Corporate data
    Object.entries(userData.corporate).forEach(([key, value]) => {
      csvData.push(['Corporate', key, value]);
    });
    
    // Facilities data
    userData.facilities.forEach((facility, index) => {
      Object.entries(facility).forEach(([key, value]) => {
        csvData.push([`Facility ${index + 1}`, key, value]);
      });
    });

    return csvData.map(row => row.join(',')).join('\n');
  }
}

// Export singleton instance
export const settingsManager = new SettingsManager();

// Utility functions for easy access
export const formatTaxId = SettingsManager.formatTaxId;
export const formatPhoneNumber = SettingsManager.formatPhoneNumber;
export const validateTaxId = SettingsManager.validateTaxId;
export const validateEmail = SettingsManager.validateEmail;
export const validatePhoneNumber = SettingsManager.validatePhoneNumber;

// React hook for settings management
export function useSettings(userId) {
  const [data, setData] = React.useState({
    profile: {},
    corporate: {},
    facilities: [],
    progress: {},
    loading: true
  });

  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      loadAllData();
    }
  }, [userId]);

  const loadAllData = async () => {
    try {
      const [profile, corporate, facilities, progress] = await Promise.all([
        settingsManager.loadUserProfile(userId),
        settingsManager.loadCorporateData(userId),
        settingsManager.loadFacilities(userId),
        settingsManager.loadOnboardingProgress(userId)
      ]);

      setData({
        profile,
        corporate,
        facilities,
        progress,
        loading: false
      });
    } catch (error) {
      console.error('Error loading settings data:', error);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  const saveProfile = async (profileData) => {
    setSaving(true);
    try {
      const result = await settingsManager.saveUserProfile(userId, profileData);
      if (result.success) {
        setData(prev => ({ ...prev, profile: { ...prev.profile, ...profileData } }));
      }
      return result;
    } finally {
      setSaving(false);
    }
  };

  const saveCorporate = async (corporateData) => {
    setSaving(true);
    try {
      const result = await settingsManager.saveCorporateData(userId, corporateData);
      if (result.success) {
        setData(prev => ({ ...prev, corporate: { ...prev.corporate, ...corporateData } }));
      }
      return result;
    } finally {
      setSaving(false);
    }
  };

  const completion = settingsManager.calculateCompletion(data.profile, data.corporate, data.facilities);
  const onboardingSteps = settingsManager.getOnboardingSteps(data.progress, data.facilities);

  return {
    ...data,
    saving,
    completion,
    onboardingSteps,
    saveProfile,
    saveCorporate,
    loadAllData,
    autoPopulate: () => settingsManager.autoPopulateCorporateFromProfile(userId)
  };
}