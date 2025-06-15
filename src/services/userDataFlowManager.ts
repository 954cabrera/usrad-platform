import { supabase } from '@/lib/supabase';

export interface UserProfileData {
  id?: number;
  user_id?: number;
  full_name?: string;
  phone?: string;
  center_name?: string;
  business_name?: string;
  psa_signed?: boolean;
  onboarding_progress?: number;
  onboarding_current_step?: number;
  onboarding_completed?: boolean;
  profile_complete?: boolean;
  organization_complete?: boolean;
  facility_complete?: boolean;
  auto_populate_enabled?: boolean;
  last_synced_at?: string;
}

export interface CorporateEntityData {
  id?: number;
  user_id?: number;
  corporate_name?: string;
  legal_name?: string;
  legal_entity_name?: string;
  tax_id?: string;
  signer_name?: string;
  signer_title?: string;
  email?: string;
  phone?: string;
  corporate_address?: string;
  corporate_city?: string;
  corporate_state?: string;
  corporate_zip?: string;
  website?: string;
  organization_type?: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
  billing_email?: string;
  billing_phone?: string;
  status?: string;
  completion_percentage?: number;
}

export interface FacilityData {
  id?: number;
  user_id?: number;
  acr_facility_id?: string;
  facility_name?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  is_primary?: boolean;
  is_acr_verified?: boolean;
  modalities?: string;
  equipment_brands?: string;
  setup_progress?: number;
  setup_complete?: boolean;
}

export interface CompleteUserData {
  profile: UserProfileData;
  corporate: CorporateEntityData;
  facilities: FacilityData[];
}

class UserDataFlowManager {
  private static instance: UserDataFlowManager;
  private cache: Map<number, CompleteUserData> = new Map();
  private listeners: Map<string, Set<(data: CompleteUserData) => void>> = new Map();

  private constructor() {}

  static getInstance(): UserDataFlowManager {
    if (!UserDataFlowManager.instance) {
      UserDataFlowManager.instance = new UserDataFlowManager();
    }
    return UserDataFlowManager.instance;
  }

  // Subscribe to data changes
  subscribe(key: string, callback: (data: CompleteUserData) => void) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }

  // Notify all listeners of data changes
  private notifyListeners(data: CompleteUserData) {
    this.listeners.forEach((callbacks) => {
      callbacks.forEach((callback) => callback(data));
    });
  }

  // Format Tax ID to XX-XXXXXXX format
  formatTaxId(taxId: string): string {
    const cleaned = taxId.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 9)}`;
    }
    return cleaned;
  }

  // Format phone number
  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  // Load complete user data from Supabase
  async loadUserData(userId: number): Promise<CompleteUserData | null> {
    try {
      // Check cache first
      if (this.cache.has(userId)) {
        return this.cache.get(userId)!;
      }

      // Load all user data in parallel with proper error handling
      const [profileResult, corporateResult, facilitiesResult] = await Promise.all([
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single(),
        supabase
          .from('corporate_entities')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle(), // Use maybeSingle() to avoid errors if no data exists
        supabase
          .from('user_facilities')
          .select('*')
          .eq('user_id', userId)
      ]);

      // Check for 406 errors specifically
      if (profileResult.error?.message?.includes('406')) {
        console.error('406 Not Acceptable error for user profile:', profileResult.error);
        throw new Error('Database returned 406 error. Check Accept headers.');
      }

      const userData: CompleteUserData = {
        profile: profileResult.data || {},
        corporate: corporateResult.data || {},
        facilities: facilitiesResult.data || []
      };

      // Log successful data load
      console.log('✅ Loaded user data for userId:', userId, {
        hasProfile: !!profileResult.data,
        hasCorporate: !!corporateResult.data,
        facilitiesCount: facilitiesResult.data?.length || 0
      });

      // Cache the data
      this.cache.set(userId, userData);

      return userData;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  }

  // Save user profile data
  async saveUserProfile(userId: number, data: UserProfileData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          ...data,
          user_id: userId,
          last_synced_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Update cache and notify listeners
      await this.refreshUserData(userId);
      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      return false;
    }
  }

  // Save corporate entity data
  async saveCorporateEntity(userId: number, data: CorporateEntityData): Promise<boolean> {
    try {
      // Clean data to avoid null constraint violations
      const cleanData = { ...data };
      
      // Ensure corporate_name is set if legal_name is provided
      if (!cleanData.corporate_name && cleanData.legal_name) {
        cleanData.corporate_name = cleanData.legal_name;
      }
      
      // Set default values for required fields to avoid constraint errors
      cleanData.user_id = userId;
      cleanData.status = cleanData.status || 'draft';
      
      // Calculate completion percentage
      const completionPercentage = this.calculateCorporateCompletion(cleanData);

      const { error } = await supabase
        .from('corporate_entities')
        .upsert({
          ...cleanData,
          completion_percentage: completionPercentage,
          last_saved_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      // Update profile organization_complete flag
      if (completionPercentage >= 80) { // Lowered threshold for partial completion
        await this.updateProfileFlag(userId, 'organization_complete', true);
      }

      // Update cache and notify listeners
      await this.refreshUserData(userId);
      return true;
    } catch (error) {
      console.error('Error saving corporate entity:', error);
      return false;
    }
  }

  // Save facility data
  async saveFacility(userId: number, facility: FacilityData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_facilities')
        .upsert({
          ...facility,
          user_id: userId
        });

      if (error) throw error;

      // Check if all facilities are complete
      await this.checkFacilityCompletion(userId);

      // Update cache and notify listeners
      await this.refreshUserData(userId);
      return true;
    } catch (error) {
      console.error('Error saving facility:', error);
      return false;
    }
  }

  // Auto-populate facility data from user profile and corporate entity
  async autoPopulateFacilityData(userId: number): Promise<FacilityData> {
    const userData = await this.loadUserData(userId);
    
    if (!userData) {
      return {};
    }

    const { profile, corporate } = userData;

    // Create auto-populated facility data with business_name priority
    const facilityData: FacilityData = {
      user_id: userId,
      facility_name: corporate.corporate_name || profile.business_name || profile.center_name || '',
      street_address: corporate.corporate_address || '',
      city: corporate.corporate_city || '',
      state: corporate.corporate_state || '',
      zip_code: corporate.corporate_zip || '',
      is_primary: true
    };

    return facilityData;
  }

  // Auto-populate corporate data from user profile
  async autoPopulateCorporateData(userId: number): Promise<CorporateEntityData> {
    const userData = await this.loadUserData(userId);
    
    if (!userData) {
      return {};
    }

    const { profile } = userData;

    // Get user email from auth
    const { data: { user } } = await supabase.auth.getUser();

    // Create auto-populated corporate data with proper business name mapping
    const corporateData: CorporateEntityData = {
      user_id: userId,
      corporate_name: profile.business_name || profile.center_name || '',
      legal_name: profile.business_name || profile.center_name || '',
      signer_name: profile.full_name || '',
      email: user?.email || '',
      phone: profile.phone || '',
      primary_contact_name: profile.full_name || '',
      primary_contact_email: user?.email || '',
      primary_contact_phone: profile.phone || '',
      status: 'draft'
    };

    return corporateData;
  }

  // Calculate corporate entity completion percentage
  private calculateCorporateCompletion(data: CorporateEntityData): number {
    const requiredFields = [
      'corporate_name',
      'legal_name',
      'tax_id',
      'signer_name',
      'signer_title',
      'email',
      'phone',
      'corporate_address',
      'corporate_city',
      'corporate_state',
      'corporate_zip'
    ];

    let filledFields = 0;
    requiredFields.forEach(field => {
      if (data[field as keyof CorporateEntityData]) {
        filledFields++;
      }
    });

    return Math.round((filledFields / requiredFields.length) * 100);
  }

  // Update profile completion flags
  private async updateProfileFlag(userId: number, flag: string, value: boolean): Promise<void> {
    try {
      await supabase
        .from('user_profiles')
        .update({ [flag]: value })
        .eq('user_id', userId);
    } catch (error) {
      console.error(`Error updating profile flag ${flag}:`, error);
    }
  }

  // Check if all facilities are complete
  private async checkFacilityCompletion(userId: number): Promise<void> {
    const { data: facilities } = await supabase
      .from('user_facilities')
      .select('setup_complete')
      .eq('user_id', userId);

    const allComplete = facilities?.every(f => f.setup_complete) || false;
    
    if (allComplete && facilities && facilities.length > 0) {
      await this.updateProfileFlag(userId, 'facility_complete', true);
    }
  }

  // Refresh user data in cache and notify listeners
  async refreshUserData(userId: number): Promise<void> {
    this.cache.delete(userId);
    const userData = await this.loadUserData(userId);
    
    if (userData) {
      this.notifyListeners(userData);
    }
  }

  // Get onboarding progress
  async getOnboardingProgress(userId: number): Promise<{
    currentStep: number;
    totalSteps: number;
    completedSteps: string[];
    percentComplete: number;
  }> {
    const userData = await this.loadUserData(userId);
    
    if (!userData) {
      return {
        currentStep: 0,
        totalSteps: 5,
        completedSteps: [],
        percentComplete: 0
      };
    }

    const completedSteps: string[] = [];
    
    if (userData.profile.profile_complete) completedSteps.push('profile');
    if (userData.profile.organization_complete) completedSteps.push('organization');
    if (userData.profile.facility_complete) completedSteps.push('facility');
    if (userData.profile.psa_signed) completedSteps.push('psa');

    const percentComplete = (completedSteps.length / 4) * 100;

    return {
      currentStep: userData.profile.onboarding_current_step || 0,
      totalSteps: 4,
      completedSteps,
      percentComplete
    };
  }

  // Clear cache for a user
  clearUserCache(userId: number): void {
    this.cache.delete(userId);
  }

  // Clear all cache
  clearAllCache(): void {
    this.cache.clear();
  }
}

export const userDataFlowManager = UserDataFlowManager.getInstance();