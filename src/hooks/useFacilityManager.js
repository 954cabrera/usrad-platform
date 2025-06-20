import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase.js';

export const useFacilityManager = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationType, setOrganizationType] = useState('');
  const [corporateInfo, setCorporateInfo] = useState({
    legalName: '',
    legalEntityName: '',
    taxId: '',
    phone: '',
    email: '',
    website: '',
    signerName: '',
    signerTitle: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [showEIN, setShowEIN] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualFacility, setManualFacility] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    modality: 'MRI',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [filterBy, setFilterBy] = useState('all');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [progress, setProgress] = useState({ step: 1, completionPercentage: 20 });

  const searchTimeoutRef = useRef(null);

  // 🔒 SECURITY: Enhanced user validation function
  const getEnhancedCurrentUser = async () => {
    try {
      // Always get fresh user from Supabase Auth - never trust localStorage/global
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('❌ Auth error:', error);
        throw new Error('User not authenticated');
      }

      console.log('✅ Authenticated user:', user.id);

      // Get user profile data with explicit user_id filtering
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id) // 🔒 CRITICAL: Always filter by authenticated user ID
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('❌ Profile fetch error:', profileError);
      }

      const enhancedUser = {
        id: user.id,
        email: user.email,
        profile: profile || null,
        full_name: profile?.full_name || '',
        center_name: profile?.center_name || profile?.company_name || '',
        phone: profile?.phone || '',
        business_phone: profile?.business_phone || profile?.phone || ''
      };

      console.log('✅ Enhanced user data loaded:', enhancedUser.id);
      return enhancedUser;
    } catch (error) {
      console.error('❌ Error getting enhanced user data:', error);
      throw error; // Re-throw to force proper error handling
    }
  };

  // 🔒 SECURITY: User-scoped localStorage keys
  const getUserStorageKey = (key, userId) => {
    if (!userId) throw new Error('User ID required for storage key');
    return `usrad_${userId}_${key}`;
  };

  // 🔒 SECURITY: Clear ALL user data from storage
  const clearUserStorage = (userId) => {
    if (!userId) return;
    
    const keysToClean = [
      'organization_type',
      'corporate_info', 
      'selected_facilities',
      'onboarding_progress'
    ];

    keysToClean.forEach(key => {
      const storageKey = getUserStorageKey(key, userId);
      localStorage.removeItem(storageKey);
      sessionStorage.removeItem(storageKey);
    });

    // Also clear any non-scoped keys (legacy cleanup)
    keysToClean.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    console.log('✅ User storage cleared for user:', userId);
  };

  // 🔒 SECURITY: Get user-scoped data from localStorage
  const getUserStorageItem = (key, userId = null) => {
    const targetUserId = userId || (window.USRadSessionManager?.currentUserId);
    if (!targetUserId) return null;
    
    const storageKey = getUserStorageKey(key, targetUserId);
    return localStorage.getItem(storageKey);
  };

  // 🔒 SECURITY: Set user-scoped data in localStorage
  const setUserStorageItem = (key, value, userId = null) => {
    const targetUserId = userId || (window.USRadSessionManager?.currentUserId);
    if (!targetUserId) throw new Error('User ID required for storage');
    
    const storageKey = getUserStorageKey(key, targetUserId);
    localStorage.setItem(storageKey, value);
  };

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Auto-populate corporate info for single practice
  useEffect(() => {
    if (organizationType === 'single') {
      autoPopulateCorporateInfo();
    }
  }, [organizationType]);

  // Debounced search effect
  useEffect(() => {
    if (searchTerm.length >= 3) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      searchTimeoutRef.current = setTimeout(() => {
        performFacilitySearch(searchTerm);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // 🔒 SECURITY: Load saved data with user validation
  const loadSavedData = async () => {
    try {
      const user = await getEnhancedCurrentUser();
      if (!user) {
        throw new Error('User authentication required');
      }

      console.log('🔐 Loading saved data for user:', user.id);
      
      // Clear any legacy non-scoped data first
      clearUserStorage(user.id);

      // Load user-scoped data only
      const savedOrgType = getUserStorageItem('organization_type', user.id);
      if (savedOrgType) {
        setOrganizationType(savedOrgType);
        console.log('✅ Loaded organization type:', savedOrgType);
      }

      const savedCorporateInfo = getUserStorageItem('corporate_info', user.id);
      if (savedCorporateInfo) {
        setCorporateInfo(JSON.parse(savedCorporateInfo));
        console.log('✅ Loaded corporate info');
      } else {
        console.log('ℹ️ No saved corporate info, will auto-populate');
        autoPopulateCorporateInfo();
      }

      const savedFacilities = getUserStorageItem('selected_facilities', user.id);
      if (savedFacilities) {
        setSelectedFacilities(JSON.parse(savedFacilities));
        console.log('✅ Loaded facilities');
      }

      const savedProgress = getUserStorageItem('onboarding_progress', user.id);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        setProgress(progressData);
        setCurrentStep(progressData.step || 1);
        console.log('✅ Loaded progress');
      }

      // 🔒 CRITICAL: Load data from database with user_id filtering
      await loadCorporateEntityFromDatabase(user.id);
      await loadFacilitiesFromDatabase(user.id);

    } catch (error) {
      console.error('❌ Error loading saved data:', error);
      // Clear all state if user validation fails
      resetAllState();
    }
  };

  // 🔒 SECURITY: Load corporate entity from database with user isolation - FIXED VERSION
  const loadCorporateEntityFromDatabase = async (userId) => {
    if (!userId) throw new Error('User ID required');

    try {
      const { data, error } = await supabase
        .from('corporate_entities')
        .select('*')
        .eq('user_id', userId) // 🔒 CRITICAL: Always filter by user_id
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Database load error:', error);
        return;
      }

      if (data) {
        console.log('✅ Loaded corporate entity from DB:', data.legal_name);
        
        // ✅ FIXED: Map database columns to state correctly
        setCorporateInfo({
          legalName: data.legal_name || '',
          legalEntityName: '', // Your DB doesn't have this field
          taxId: data.tax_id || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          signerName: data.signer_name || '',
          signerTitle: data.signer_title || '',
          address: data.corporate_address || '',
          city: data.corporate_city || '',
          state: data.corporate_state || '',
          zipCode: data.corporate_zip || ''
        });
        
        setOrganizationType(data.organization_type || '');
      }
    } catch (error) {
      console.error('❌ Error loading corporate entity:', error);
    }
  };

  // 🔒 SECURITY: Load facilities from database with user isolation
  const loadFacilitiesFromDatabase = async (userId) => {
    if (!userId) throw new Error('User ID required');

    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .eq('user_id', userId) // 🔒 CRITICAL: Always filter by user_id
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Database facilities load error:', error);
        return;
      }

      if (data && data.length > 0) {
        console.log(`✅ Loaded ${data.length} facilities from DB`);
        const facilities = data.map(facility => ({
          id: facility.id,
          name: facility.name,
          address: facility.address,
          city: facility.city,
          state: facility.state,
          zipCode: facility.zip_code,
          phone: facility.phone,
          modality: facility.modality,
          isPrimary: facility.is_primary || false,
          source: facility.source || 'database'
        }));
        setSelectedFacilities(facilities);
      }
    } catch (error) {
      console.error('❌ Error loading facilities:', error);
    }
  };

  // Reset all state (used when user validation fails)
  const resetAllState = () => {
    setCurrentStep(1);
    setOrganizationType('');
    setCorporateInfo({
      legalName: '',
      legalEntityName: '',
      taxId: '',
      phone: '',
      email: '',
      website: '',
      signerName: '',
      signerTitle: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setSelectedFacilities([]);
    setProgress({ step: 1, completionPercentage: 20 });
    console.log('✅ All state reset');
  };

  // Auto-populate corporate info for single practice with user validation
  const autoPopulateCorporateInfo = async () => {
    try {
      const user = await getEnhancedCurrentUser();
      if (!user) return;
      
      console.log('🔄 Auto-populating corporate info for user:', user.id);
      
      const fullName = user.full_name || '';
      const centerName = user.center_name || '';
      const email = user.email || '';
      const phone = user.phone || user.business_phone || '';
      
      // Only auto-populate empty fields
      setCorporateInfo(prev => ({
        ...prev,
        legalName: prev.legalName || centerName || `${fullName} Practice` || 'Practice',
        email: prev.email || email || '',
        phone: prev.phone || phone || '',
        signerName: prev.signerName || fullName || ''
      }));
    } catch (error) {
      console.error('❌ Error auto-populating corporate info:', error);
    }
  };

  // Facility search using your existing ACR search function
  const performFacilitySearch = async (term) => {
    if (!term || term.length < 3) return;

    setIsSearching(true);
    try {
      // Verify user is authenticated before search
      const user = await getEnhancedCurrentUser();
      if (!user) {
        throw new Error('User authentication required for search');
      }

      if (window.searchAcrFacilities) {
        const results = await window.searchAcrFacilities(term);
        setSearchResults(results || []);
      } else {
        const { searchAcrFacilities } = await import('../lib/facilityManager.js');
        const results = await searchAcrFacilities(term);
        setSearchResults(results || []);
      }
    } catch (error) {
      console.error('❌ Error searching facilities:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Select facility from search results
  const selectFacility = (facility) => {
    const facilityWithId = {
      ...facility,
      id: facility.acr_number || `acr_${Date.now()}`,
      isPrimary: selectedFacilities.length === 0,
      source: 'acr'
    };

    if (!selectedFacilities.find(f => f.id === facilityWithId.id)) {
      setSelectedFacilities(prev => [...prev, facilityWithId]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  // Add manual facility
  const addManualFacility = () => {
    // Validation
    const newErrors = {};
    if (!manualFacility.name.trim()) newErrors.name = 'Facility name is required';
    if (!manualFacility.address.trim()) newErrors.address = 'Address is required';
    if (!manualFacility.city.trim()) newErrors.city = 'City is required';
    if (!manualFacility.state.trim()) newErrors.state = 'State is required';
    if (!manualFacility.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const facilityWithId = {
      ...manualFacility,
      id: `manual_${Date.now()}`,
      isPrimary: selectedFacilities.length === 0,
      source: 'manual'
    };

    setSelectedFacilities(prev => [...prev, facilityWithId]);
    setShowManualEntry(false);
    setManualFacility({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      modality: 'MRI',
      notes: ''
    });
    setErrors({});
  };

  // Set primary facility
  const setPrimaryFacility = (facilityId) => {
    setSelectedFacilities(prev =>
      prev.map(facility => ({
        ...facility,
        isPrimary: facility.id === facilityId
      }))
    );
  };

  // Remove facility
  const removeFacility = (facilityId) => {
    setSelectedFacilities(prev => {
      const filtered = prev.filter(f => f.id !== facilityId);
      
      if (filtered.length > 0 && !filtered.some(f => f.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      
      return filtered;
    });
  };

  // 🔒 SECURITY: Save progress with user isolation
  const saveProgress = async () => {
    setIsSaving(true);
    try {
      const user = await getEnhancedCurrentUser();
      if (!user) {
        throw new Error('User authentication required for save');
      }

      console.log('💾 Saving progress for user:', user.id);

      // Save to user-scoped localStorage
      setUserStorageItem('organization_type', organizationType, user.id);
      setUserStorageItem('corporate_info', JSON.stringify(corporateInfo), user.id);
      setUserStorageItem('selected_facilities', JSON.stringify(selectedFacilities), user.id);
      
      const progressData = {
        step: currentStep,
        completionPercentage: Math.min(100, (currentStep / 5) * 100),
        lastUpdated: new Date().toISOString()
      };
      setUserStorageItem('onboarding_progress', JSON.stringify(progressData), user.id);
      setProgress(progressData);

      // 🔒 CRITICAL: Save to Supabase with user_id filtering
      await saveCorporateEntityToDatabase(user.id);
      await saveFacilitiesToDatabase(user.id);

      setSaveMessage('✅ Progress saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      setSaveMessage('❌ Error saving progress');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // 🔒 SECURITY: Save corporate entity with user isolation - FIXED VERSION
  const saveCorporateEntityToDatabase = async (userId) => {
    if (!userId) throw new Error('User ID required');

    try {
      console.log('💾 Attempting to save corporate entity for user:', userId);
      console.log('📋 Corporate info to save:', corporateInfo);

      // ✅ FIXED: Updated entity data to match your ACTUAL database columns
      const entityData = {
        user_id: userId, // 🔒 CRITICAL: Always include user_id
        legal_name: corporateInfo.legalName,
        tax_id: corporateInfo.taxId,
        organization_type: organizationType,
        corporate_address: corporateInfo.address || '', // Map address fields
        phone: corporateInfo.phone,
        email: corporateInfo.email,
        website: corporateInfo.website,
        signer_name: corporateInfo.signerName,
        signer_title: corporateInfo.signerTitle || '', // Add signer title
        corporate_city: corporateInfo.city || '',
        corporate_state: corporateInfo.state || '',
        corporate_zip: corporateInfo.zipCode || '',
        updated_at: new Date().toISOString()
      };

      console.log('🔄 Sending data to database:', entityData);

      // Try the save operation
      const { data, error } = await supabase
        .from('corporate_entities')
        .upsert(entityData, { 
          onConflict: 'user_id',
          returning: 'minimal'
        });

      if (error) {
        console.error('❌ Database save error:', error);
        throw error;
      }

      console.log('✅ Corporate entity saved to database successfully');
    } catch (error) {
      console.error('❌ Error saving corporate entity:', error);
      throw error;
    }
  };

  // 🔒 SECURITY: Save facilities with user isolation  
  const saveFacilitiesToDatabase = async (userId) => {
    if (!userId) throw new Error('User ID required');

    try {
      // First, delete existing facilities for this user
      await supabase
        .from('facilities')
        .delete()
        .eq('user_id', userId); // 🔒 CRITICAL: Only delete user's facilities

      // Then insert new facilities
      // Then insert new facilities
const facilitiesData = selectedFacilities.map(facility => {
  // 🔍 DEBUG: Log the source facility data
  console.log('🔍 Source facility data:', {
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: facility.state,
    zipCode: facility.zipCode,  // ← Check this value
    phone: facility.phone,
    modality: facility.modality
  });

  return {
    user_id: userId, // 🔒 CRITICAL: Always include user_id
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: facility.state,
    zip_code: facility.zipCode,
    phone: facility.phone,
    modality: facility.modality,
    is_primary: facility.isPrimary,
    source: facility.source,
    created_at: new Date().toISOString()
  };
});

      if (facilitiesData.length > 0) {
        const { error } = await supabase
          .from('facilities')
          .insert(facilitiesData);

        if (error) {
          console.error('❌ Database facilities save error:', error);
          throw error;
        }

        console.log(`✅ ${facilitiesData.length} facilities saved to database`);
      }
    } catch (error) {
      console.error('❌ Error saving facilities:', error);
      throw error;
    }
  };

  // Check if can proceed to next step
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return organizationType && corporateInfo.legalName && corporateInfo.taxId && 
               corporateInfo.phone && corporateInfo.email && corporateInfo.signerName;
      case 2:
        return selectedFacilities.length > 0;
      case 3:
        return true; // PSA review step
      default:
        return true;
    }
  };

  return {
    // State
    currentStep,
    setCurrentStep,
    organizationType,
    setOrganizationType,
    corporateInfo,
    setCorporateInfo,
    showEIN,
    setShowEIN,
    selectedFacilities,
    setSelectedFacilities,
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showManualEntry,
    setShowManualEntry,
    manualFacility,
    setManualFacility,
    errors,
    setErrors,
    filterBy,
    setFilterBy,
    isSaving,
    saveMessage,
    progress,

    // Actions
    selectFacility,
    addManualFacility,
    setPrimaryFacility,
    removeFacility,
    saveProgress,
    canProceedToNextStep,
    loadSavedData,
    performFacilitySearch,
    
    // 🔒 SECURITY: New isolation functions
    clearUserStorage,
    resetAllState,
    getEnhancedCurrentUser
  };
};