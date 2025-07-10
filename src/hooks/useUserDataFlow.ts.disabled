import { useState, useEffect, useCallback } from 'react';
import { userDataFlowManager, CompleteUserData } from '@/services/userDataFlowManager';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function useUserDataFlow() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<CompleteUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user data on mount or user change
  useEffect(() => {
    if (user?.id) {
      loadUserData();

      // Subscribe to data changes
      const unsubscribe = userDataFlowManager.subscribe(
        `user-${user.id}`,
        (data) => {
          setUserData(data);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user?.id]);

  const loadUserData = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const data = await userDataFlowManager.loadUserData(user.id);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const saveProfile = useCallback(async (profileData: any) => {
    if (!user?.id) return false;
    
    setSaving(true);
    try {
      const success = await userDataFlowManager.saveUserProfile(user.id, profileData);
      if (success) {
        toast.success('Profile saved successfully');
      } else {
        toast.error('Failed to save profile');
      }
      return success;
    } finally {
      setSaving(false);
    }
  }, [user?.id]);

  const saveCorporateEntity = useCallback(async (corporateData: any) => {
    if (!user?.id) return false;
    
    setSaving(true);
    try {
      const success = await userDataFlowManager.saveCorporateEntity(user.id, corporateData);
      if (success) {
        toast.success('Organization saved successfully');
      } else {
        toast.error('Failed to save organization');
      }
      return success;
    } finally {
      setSaving(false);
    }
  }, [user?.id]);

  const saveFacility = useCallback(async (facilityData: any) => {
    if (!user?.id) return false;
    
    setSaving(true);
    try {
      const success = await userDataFlowManager.saveFacility(user.id, facilityData);
      if (success) {
        toast.success('Facility saved successfully');
      } else {
        toast.error('Failed to save facility');
      }
      return success;
    } finally {
      setSaving(false);
    }
  }, [user?.id]);

  const autoPopulateCorporateData = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      const data = await userDataFlowManager.autoPopulateCorporateData(user.id);
      return data;
    } catch (error) {
      console.error('Error auto-populating corporate data:', error);
      return null;
    }
  }, [user?.id]);

  const autoPopulateFacilityData = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      const data = await userDataFlowManager.autoPopulateFacilityData(user.id);
      return data;
    } catch (error) {
      console.error('Error auto-populating facility data:', error);
      return null;
    }
  }, [user?.id]);

  const getOnboardingProgress = useCallback(async () => {
    if (!user?.id) return null;
    
    try {
      const progress = await userDataFlowManager.getOnboardingProgress(user.id);
      return progress;
    } catch (error) {
      console.error('Error getting onboarding progress:', error);
      return null;
    }
  }, [user?.id]);

  const refreshData = useCallback(async () => {
    if (!user?.id) return;
    
    await userDataFlowManager.refreshUserData(user.id);
  }, [user?.id]);

  return {
    userData,
    loading,
    saving,
    saveProfile,
    saveCorporateEntity,
    saveFacility,
    autoPopulateCorporateData,
    autoPopulateFacilityData,
    getOnboardingProgress,
    refreshData,
    formatTaxId: userDataFlowManager.formatTaxId,
    formatPhoneNumber: userDataFlowManager.formatPhoneNumber
  };
}