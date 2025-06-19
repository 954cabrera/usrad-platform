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
    signerName: ''
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

  // Enhanced function to get current user with profile data
  const getEnhancedCurrentUser = async () => {
    try {
      // First try to use the global USRadUser if available
      if (window.USRadUser?.user) {
        console.log('Using global USRadUser:', window.USRadUser);
        return {
          id: window.USRadUser.user.id,
          email: window.USRadUser.user.email,
          profile: window.USRadUser.profile || null,
          full_name: window.USRadUser.profile?.full_name || '',
          center_name: window.USRadUser.profile?.center_name || window.USRadUser.profile?.company_name || '',
          phone: window.USRadUser.profile?.phone || '',
          business_phone: window.USRadUser.profile?.business_phone || window.USRadUser.profile?.phone || ''
        };
      }

      // Fallback to direct Supabase call
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('Auth error:', error);
        return null;
      }

      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
      }

      // Return user data even if profile doesn't exist
      return {
        id: user.id,
        email: user.email,
        profile: profile || null,
        full_name: profile?.full_name || '',
        center_name: profile?.center_name || profile?.company_name || '',
        phone: profile?.phone || '',
        business_phone: profile?.business_phone || profile?.phone || ''
      };
    } catch (error) {
      console.error('Error getting enhanced user data:', error);
      return null;
    }
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

  // Load saved data
  const loadSavedData = async () => {
    try {
      const user = await getEnhancedCurrentUser();
      console.log('Loading saved data for user:', user);
      
      if (user) {
        // Load saved organization type
        const savedOrgType = localStorage.getItem('organization_type');
        console.log('Saved organization type:', savedOrgType);
        if (savedOrgType) {
          setOrganizationType(savedOrgType);
        }

        // Load saved corporate info
        const savedCorporateInfo = localStorage.getItem('corporate_info');
        console.log('Saved corporate info:', savedCorporateInfo);
        if (savedCorporateInfo) {
          setCorporateInfo(JSON.parse(savedCorporateInfo));
        } else {
          // If no saved corporate info, auto-populate from user profile
          console.log('No saved corporate info, checking for auto-population');
          autoPopulateCorporateInfo();
        }

        // Load saved facilities
        const savedFacilities = localStorage.getItem('selected_facilities');
        console.log('Saved facilities:', savedFacilities);
        if (savedFacilities) {
          setSelectedFacilities(JSON.parse(savedFacilities));
        }

        // Load saved progress
        const savedProgress = localStorage.getItem('onboarding_progress');
        console.log('Saved progress:', savedProgress);
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress);
          setProgress(progressData);
          setCurrentStep(progressData.step || 1);
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  // Auto-populate corporate info for single practice
  const autoPopulateCorporateInfo = async () => {
    try {
      const user = await getEnhancedCurrentUser();
      console.log('Auto-populating corporate info for user:', user);
      
      if (user) {
        // Get user profile info
        const fullName = user.full_name || '';
        const centerName = user.center_name || '';
        const email = user.email || '';
        const phone = user.phone || user.business_phone || '';
        
        console.log('Auto-populate data:', {
          fullName,
          centerName,
          email,
          phone,
          organizationType
        });

        // Auto-populate empty fields only
        setCorporateInfo(prev => ({
          ...prev,
          legalName: prev.legalName || centerName || `${fullName} Practice` || 'Practice',
          email: prev.email || email || '',
          phone: prev.phone || phone || '',
          signerName: prev.signerName || fullName || ''
        }));
      }
    } catch (error) {
      console.error('Error auto-populating corporate info:', error);
    }
  };

  // Facility search using your existing ACR search function
  const performFacilitySearch = async (term) => {
    if (!term || term.length < 3) return;

    setIsSearching(true);
    try {
      // Try to use your existing searchAcrFacilities function
      if (window.searchAcrFacilities) {
        const results = await window.searchAcrFacilities(term);
        setSearchResults(results || []);
      } else {
        // Fallback to import and use the function directly
        const { searchAcrFacilities } = await import('../lib/facilityManager.js');
        const results = await searchAcrFacilities(term);
        setSearchResults(results || []);
      }
    } catch (error) {
      console.error('Error searching facilities:', error);
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
      
      // If we removed the primary facility, make the first remaining one primary
      if (filtered.length > 0 && !filtered.some(f => f.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      
      return filtered;
    });
  };

  // Save progress using your existing save functions
  const saveProgress = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage first
      localStorage.setItem('organization_type', organizationType);
      localStorage.setItem('corporate_info', JSON.stringify(corporateInfo));
      localStorage.setItem('selected_facilities', JSON.stringify(selectedFacilities));
      
      const progressData = {
        step: currentStep,
        completionPercentage: Math.min(100, (currentStep / 5) * 100),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('onboarding_progress', JSON.stringify(progressData));
      setProgress(progressData);

      // Save to Supabase using your existing functions
      const user = await getEnhancedCurrentUser();
      if (user) {
        try {
          // Try to use your existing save functions
          const { saveFacilityConfiguration } = await import('../lib/facilityManager.js');
          const result = await saveFacilityConfiguration(user.id, corporateInfo, selectedFacilities);
          
          if (result && result.success) {
            console.log('✅ Supabase save successful');
          } else {
            console.warn('⚠️ Supabase save had issues:', result?.error);
          }
        } catch (saveError) {
          console.warn('⚠️ Could not save to Supabase:', saveError);
          // Continue anyway since localStorage save worked
        }
      }

      setSaveMessage('✅ Progress saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setSaveMessage('❌ Error saving progress');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
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
    performFacilitySearch
  };
};