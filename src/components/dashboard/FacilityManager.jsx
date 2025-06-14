import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Building, MapPin, Phone, Users, CheckCircle, Plus, Upload, Eye, EyeOff, 
  Star, Award, Clock, Calendar, ArrowRight, Shield, Zap, TrendingUp, Filter,
  Building2, Globe, Camera, FileText, Download, Edit3, Trash2, MoreVertical
} from 'lucide-react';

// Import enhanced Supabase functions
import { 
  searchAcrFacilities, 
  saveFacilityConfiguration, 
  loadFacilityConfiguration, 
  autoSaveProgress,
  formatPhoneNumber,
  formatEIN,
  validateEmail,
  validateRequired,
  getCurrentUser
} from '../../lib/facilityManager.js';
import { supabase } from '../../lib/supabase.js';

const FacilityManager = () => {
  // Enhanced State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationType, setOrganizationType] = useState('');
  const [corporateInfo, setCorporateInfo] = useState({
    legalName: '',
    legalEntityName: '',
    taxId: '',
    signerName: '',
    signerTitle: '',
    email: '',
    phone: '',
    corporateAddress: '',
    corporateCity: '',
    corporateState: '',
    corporateZip: '',
    website: '',
    organizationType: ''
  });
  
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filterBy, setFilterBy] = useState('all');
  
  const [manualFacility, setManualFacility] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    website: '',
    modalities: [],
    equipmentBrands: [],
    primaryContact: '',
    contactTitle: '',
    notes: '',
    isManualEntry: true
  });
  
  const [progress, setProgress] = useState(20);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEIN, setShowEIN] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState({});

  const searchTimeoutRef = useRef(null);

  // Enhanced function to get current user with profile data
  const getEnhancedCurrentUser = async () => {
    try {
      // First try to get user from Supabase auth
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('Auth error:', error);
        return null;
      }

      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Return basic user data if profile fetch fails
        return {
          id: user.id,
          email: user.email,
          profile: null
        };
      }

      // Combine auth user with profile data
      return {
        id: user.id,
        email: user.email,
        profile: profile,
        // Extract commonly used fields
        fullName: profile?.full_name || '',
        firstName: profile?.full_name?.split(' ')[0] || '',
        lastName: profile?.full_name?.split(' ').slice(1).join(' ') || '',
        centerName: profile?.center_name || profile?.company_name || '',
        phone: profile?.phone || '',
        businessPhone: profile?.business_phone || profile?.phone || ''
      };
    } catch (error) {
      console.error('Error getting enhanced user data:', error);
      return null;
    }
  };

  // Load existing data on component mount
  useEffect(() => {
    const loadExistingData = async () => {
      setIsLoading(true);
      try {
        // Get enhanced user data first
        const currentUser = await getEnhancedCurrentUser();
        if (!currentUser) {
          console.error('No authenticated user found');
          setIsLoading(false);
          return;
        }

        // Load facility configuration with user ID
        const result = await loadFacilityConfiguration(currentUser.id);
        
        if (result.success && result.hasExistingData) {
          if (result.corporateInfo) {
            setCorporateInfo({
              legalName: result.corporateInfo.legal_name || '',
              legalEntityName: result.corporateInfo.legal_entity_name || '',
              taxId: result.corporateInfo.tax_id || '',
              signerName: result.corporateInfo.signer_name || '',
              signerTitle: result.corporateInfo.signer_title || '',
              email: result.corporateInfo.email || '',
              phone: result.corporateInfo.phone || '',
              corporateAddress: result.corporateInfo.corporate_address || '',
              corporateCity: result.corporateInfo.corporate_city || '',
              corporateState: result.corporateInfo.corporate_state || '',
              corporateZip: result.corporateInfo.corporate_zip || '',
              website: result.corporateInfo.website || '',
              organizationType: result.corporateInfo.organization_type || ''
            });
            setOrganizationType(result.corporateInfo.organization_type || '');
          } else if (currentUser.profile) {
            // If no corporate info exists, pre-populate from user profile
            setCorporateInfo(prev => ({
              ...prev,
              legalName: currentUser.centerName || currentUser.profile.company_name || '',
              email: currentUser.email || '',
              phone: currentUser.businessPhone || currentUser.phone || '',
              signerName: currentUser.fullName || ''
            }));
          }
          
          if (result.facilities && result.facilities.length > 0) {
            const transformedFacilities = result.facilities.map(f => ({
              id: f.acr_facility_id ? `acr_${f.acr_facility_id}` : `manual_${f.id}`,
              acrId: f.acr_facility_id,
              name: f.facility_name,
              address: f.street_address,
              city: f.city,
              state: f.state,
              zip: f.zip_code,
              phone: f.phone_number,
              email: f.email,
              website: f.website,
              modalities: f.modalities || [],
              equipmentBrands: f.equipment_brands || [],
              primaryContact: f.primary_contact,
              contactTitle: f.contact_title,
              notes: f.notes,
              acrVerified: f.is_acr_verified,
              isManualEntry: f.is_manual_entry,
              isPrimary: f.is_primary,
              isEdited: f.is_edited,
              originalACRData: f.original_acr_data
            }));
            setSelectedFacilities(transformedFacilities);
          }
        } else if (currentUser.profile) {
          // No existing facility data, but we have user profile - pre-populate
          setCorporateInfo(prev => ({
            ...prev,
            legalName: currentUser.centerName || currentUser.profile.company_name || '',
            email: currentUser.email || '',
            phone: currentUser.businessPhone || currentUser.phone || '',
            signerName: currentUser.fullName || ''
          }));
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingData();
  }, []);

  // Enhanced search with real ACR database
  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchAcrFacilities(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Auto-populate corporate info for single practice
  useEffect(() => {
    const populateSinglePracticeInfo = async () => {
      if (organizationType === 'single') {
        try {
          // Get current user data from Supabase
          const currentUser = await getEnhancedCurrentUser();
          
          if (currentUser) {
            setCorporateInfo(prev => {
              // Only update if fields are empty to avoid overwriting user edits
              const updates = {
                ...prev,
                organizationType: 'single'
              };
              
              // Auto-populate empty fields with user data
              if (!prev.legalName) {
                updates.legalName = currentUser.centerName || 
                                  currentUser.profile?.company_name || 
                                  `${currentUser.fullName} Practice` || 
                                  'Practice';
              }
              
              if (!prev.legalEntityName) {
                updates.legalEntityName = updates.legalName;
              }
              
              if (!prev.email) {
                updates.email = currentUser.email || '';
              }
              
              if (!prev.phone) {
                updates.phone = currentUser.businessPhone || 
                              currentUser.phone || 
                              currentUser.profile?.phone || 
                              '';
              }
              
              if (!prev.signerName) {
                updates.signerName = currentUser.fullName || '';
              }
              
              return updates;
            });
          }
        } catch (error) {
          console.error('Error populating single practice info:', error);
        }
      } else {
        // Just update organization type for other types
        setCorporateInfo(prev => ({...prev, organizationType}));
      }
    };
    
    populateSinglePracticeInfo();
  }, [organizationType]);

  // Enhanced facility selection from ACR search
  const selectFacility = (facility) => {
    if (!selectedFacilities.find(f => f.id === facility.id)) {
      const newFacility = { 
        ...facility, 
        isPrimary: selectedFacilities.length === 0,
        addedDate: new Date().toISOString(),
        isManualEntry: false,
        acrVerified: true
      };
      setSelectedFacilities([...selectedFacilities, newFacility]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  // Enhanced facility management
  const removeFacility = (facilityId) => {
    const updatedFacilities = selectedFacilities.filter(f => f.id !== facilityId);
    if (updatedFacilities.length > 0 && !updatedFacilities.find(f => f.isPrimary)) {
      updatedFacilities[0].isPrimary = true;
    }
    setSelectedFacilities(updatedFacilities);
  };

  const setPrimaryFacility = (facilityId) => {
    setSelectedFacilities(selectedFacilities.map(f => ({
      ...f,
      isPrimary: f.id === facilityId
    })));
  };

  // Enhanced manual facility addition
  const addManualFacility = () => {
    const newErrors = {};
    
    if (!validateRequired(manualFacility.name)) newErrors.name = 'Facility name is required';
    if (!validateRequired(manualFacility.address)) newErrors.address = 'Address is required';
    if (!validateRequired(manualFacility.city)) newErrors.city = 'City is required';
    if (!validateRequired(manualFacility.state)) newErrors.state = 'State is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newFacility = {
      ...manualFacility,
      id: `manual_${Date.now()}`,
      acrVerified: false,
      isPrimary: selectedFacilities.length === 0,
      addedDate: new Date().toISOString(),
      isManualEntry: true
    };
    
    setSelectedFacilities([...selectedFacilities, newFacility]);
    setManualFacility({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      website: '',
      modalities: [],
      equipmentBrands: [],
      primaryContact: '',
      contactTitle: '',
      notes: '',
      isManualEntry: true
    });
    setShowManualEntry(false);
    setErrors({});
  };

  // Enhanced progress calculation
  useEffect(() => {
    let newProgress = 20; // Base progress
    
    if (organizationType) newProgress += 15;
    if (validateRequired(corporateInfo.legalName)) newProgress += 15;
    if (validateRequired(corporateInfo.taxId)) newProgress += 10;
    if (validateRequired(corporateInfo.signerName)) newProgress += 10;
    if (selectedFacilities.length > 0) newProgress += 20;
    if (selectedFacilities.length > 1) newProgress += 5;
    if (validateRequired(corporateInfo.website)) newProgress += 5;
    
    setProgress(newProgress);
  }, [organizationType, corporateInfo, selectedFacilities]);

  // Auto-save progress
  useEffect(() => {
    const autoSave = async () => {
      if (progress > 20) { // Only auto-save if there's actual progress
        try {
          const currentUser = await getEnhancedCurrentUser();
          if (currentUser) {
            await autoSaveProgress(currentUser.id, currentStep === 1 ? 'corporate_info' : 'facilities', {
              corporateInfo,
              facilities: selectedFacilities,
              organizationType
            }, progress);
          }
        } catch (error) {
          console.error('Auto-save error:', error);
        }
      }
    };

    const timeoutId = setTimeout(autoSave, 2000); // Auto-save after 2 seconds of inactivity
    return () => clearTimeout(timeoutId);
  }, [corporateInfo, selectedFacilities, organizationType, progress, currentStep]);

  // Enhanced save functionality with real Supabase integration
  const saveProgress = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Get current user
      const currentUser = await getEnhancedCurrentUser();
      if (!currentUser) {
        setSaveMessage('❌ Error: User not authenticated');
        setIsSaving(false);
        return;
      }
      
      const result = await saveFacilityConfiguration(currentUser.id, corporateInfo, selectedFacilities);
      
      if (result.success) {
        setSaveMessage('✅ Progress saved successfully!');
        // Update progress to PSA ready
        setProgress(75);
      } else {
        setSaveMessage(`❌ Error saving: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage(`❌ Save failed: ${error.message}`);
    } finally {
      setIsSaving(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Filter facilities
  const filteredFacilities = selectedFacilities.filter(facility => {
    if (filterBy === 'all') return true;
    if (filterBy === 'acr') return facility.acrVerified;
    if (filterBy === 'manual') return facility.isManualEntry;
    if (filterBy === 'primary') return facility.isPrimary;
    return true;
  });

  // Validation for step progression
  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return organizationType && 
             validateRequired(corporateInfo.legalName) && 
             validateRequired(corporateInfo.taxId) && 
             validateRequired(corporateInfo.signerName) &&
             validateEmail(corporateInfo.email);
    }
    if (currentStep === 2) {
      return selectedFacilities.length > 0;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Enhanced Organization Type Selection */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Organization Structure</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Choose your organization type to customize your onboarding experience and unlock the right tools for your business structure.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div 
                  className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    organizationType === 'single' 
                      ? 'border-blue-500 bg-blue-50 shadow-xl ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-lg'
                  }`}
                  onClick={() => setOrganizationType('single')}
                >
                  <div className="absolute -top-3 -right-3">
                    {organizationType === 'single' && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Single Practice</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Independent imaging center or single location practice. Perfect for individual facilities looking to join our network.
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>5-minute setup</span>
                    </div>
                  </div>
                </div>

                <div 
                  className={`group relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    organizationType === 'corporate' 
                      ? 'border-purple-500 bg-purple-50 shadow-xl ring-4 ring-purple-100' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 hover:shadow-lg'
                  }`}
                  onClick={() => setOrganizationType('corporate')}
                >
                  <div className="absolute -top-3 -right-3">
                    {organizationType === 'corporate' && (
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Multi-Location Corporate</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Corporate entity with multiple imaging facilities. Designed for imaging chains and large healthcare organizations.
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <TrendingUp className="h-4 w-4" />
                      <span>Enterprise tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Corporate Information Form */}
            {organizationType && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {organizationType === 'single' ? 'Practice Information' : 'Corporate Information'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {organizationType === 'single' 
                        ? 'Basic information about your imaging practice' 
                        : 'Legal entity information for your corporate structure'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Legal Business Name *
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.legalName}
                      onChange={(e) => setCorporateInfo({...corporateInfo, legalName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="Enter legal business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      DBA Name (if different)
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.legalEntityName}
                      onChange={(e) => setCorporateInfo({...corporateInfo, legalEntityName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="Doing business as..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Federal Tax ID (EIN) *
                    </label>
                    <div className="relative">
                      <input
                        type={showEIN ? "text" : "password"}
                        value={corporateInfo.taxId}
                        onChange={(e) => setCorporateInfo({...corporateInfo, taxId: formatEIN(e.target.value)})}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                        placeholder="XX-XXXXXXX"
                        maxLength={10}
                      />
                      <button
                        type="button"
                        onClick={() => setShowEIN(!showEIN)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showEIN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Phone *
                    </label>
                    <input
                      type="tel"
                      value={corporateInfo.phone}
                      onChange={(e) => setCorporateInfo({...corporateInfo, phone: formatPhoneNumber(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="(XXX) XXX-XXXX"
                      maxLength={14}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={corporateInfo.email}
                      onChange={(e) => setCorporateInfo({...corporateInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="contact@business.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="url"
                        value={corporateInfo.website}
                        onChange={(e) => setCorporateInfo({...corporateInfo, website: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                        placeholder="www.yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Authorized Signer *
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.signerName}
                      onChange={(e) => setCorporateInfo({...corporateInfo, signerName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="Full name of person authorized to sign PSA"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Enhanced Facility Search Header */}
            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Add Your Imaging Facilities</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Search our exclusive database of 30,000+ ACR-accredited facilities or add your facilities manually. 
                  Our intelligent system will help you build your network efficiently.
                </p>
              </div>

              {/* Enhanced Search Interface */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all shadow-lg hover:shadow-xl"
                    placeholder="Search by facility name, city, state, or equipment type..."
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Enhanced Search Results */}
                {(searchResults.length > 0 || isSearching) && (
                  <div className="absolute z-20 w-full mt-4 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Searching ACR database...</p>
                        <p className="text-sm text-gray-500 mt-1">Finding the best matches for you</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {searchResults.map((facility) => (
                          <div
                            key={facility.id}
                            onClick={() => selectFacility(facility)}
                            className="p-4 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0 rounded-xl transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{facility.name}</h4>
                                  {facility.accredited && (
                                    <div className="ml-2 flex items-center">
                                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                                      <span className="ml-1 text-xs text-emerald-600 font-medium">ACR</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 flex items-center mb-1">
                                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                  {facility.address}, {facility.city}, {facility.state} {facility.zip}
                                </p>
                                <div className="flex items-center space-x-4 text-xs">
                                  <div className="flex items-center">
                                    <Camera className="h-3 w-3 mr-1 text-gray-400" />
                                    <span className="text-gray-500">{facility.modalities ? facility.modalities.join(', ') : facility.modality}</span>
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setShowManualEntry(!showManualEntry)}
                  className="flex items-center px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Manually
                </button>
              </div>
            </div>

            {/* Enhanced Manual Entry Form */}
            {showManualEntry && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Edit3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Add Facility Manually</h4>
                      <p className="text-gray-600 text-sm">Enter facility details for non-ACR facilities</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowManualEntry(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Facility Name *
                    </label>
                    <input
                      type="text"
                      value={manualFacility.name}
                      onChange={(e) => setManualFacility({...manualFacility, name: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter facility name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={manualFacility.address}
                      onChange={(e) => setManualFacility({...manualFacility, address: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Street address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={manualFacility.city}
                      onChange={(e) => setManualFacility({...manualFacility, city: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="City"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      value={manualFacility.state}
                      onChange={(e) => setManualFacility({...manualFacility, state: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select state</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="AL">Alabama</option>
                      <option value="SC">South Carolina</option>
                      <option value="NC">North Carolina</option>
                    </select>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={manualFacility.zip}
                      onChange={(e) => setManualFacility({...manualFacility, zip: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="ZIP code"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={manualFacility.phone}
                      onChange={(e) => setManualFacility({...manualFacility, phone: formatPhoneNumber(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="(XXX) XXX-XXXX"
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => setShowManualEntry(false)}
                    className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addManualFacility}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl"
                  >
                    Add Facility
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Selected Facilities Management */}
            {selectedFacilities.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Selected Facilities ({selectedFacilities.length})
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Manage your network locations and set primary facility
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-gray-400" />
                      <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="all">All Facilities</option>
                        <option value="acr">ACR Accredited</option>
                        <option value="manual">Manual Entry</option>
                        <option value="primary">Primary Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredFacilities.map((facility) => (
                    <div
                      key={facility.id}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                        facility.isPrimary 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h5 className="font-bold text-gray-900 text-lg">{facility.name}</h5>
                            {facility.acrVerified && (
                              <div className="ml-2 flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="ml-1 text-xs text-green-600 font-medium">ACR</span>
                              </div>
                            )}
                            {facility.isPrimary && (
                              <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                PRIMARY
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {facility.address}, {facility.city}, {facility.state} {facility.zip}
                            </p>
                            
                            {facility.phone && (
                              <p className="text-sm text-gray-600 flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                {facility.phone}
                              </p>
                            )}
                          </div>
                          
                          {facility.modalities && facility.modalities.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {facility.modalities.map((modality) => (
                                <span key={modality} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  {modality}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3">
                          {!facility.isPrimary && selectedFacilities.length > 1 && (
                            <button
                              onClick={() => setPrimaryFacility(facility.id)}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                              Make Primary
                            </button>
                          )}
                        </div>
                        
                        <button
                          onClick={() => removeFacility(facility.id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Step {currentStep} Coming Soon</h3>
            <p className="text-gray-600">This step is being built with the same enterprise quality you've experienced.</p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your facility configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Enhanced Header with Progress */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">USRad Network Enrollment</h1>
                <p className="text-gray-600 text-lg">Complete your facility registration to join the premier imaging network</p>
              </div>
              <div className="text-right">
                <div className="relative">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {progress}%
                  </div>
                  <div className="text-sm text-gray-500 font-semibold">COMPLETE</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="absolute -top-2 transition-all duration-1000 ease-out" style={{ left: `calc(${progress}% - 12px)` }}>
                <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Step Navigation */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Organization', icon: Building2, color: 'blue' },
              { num: 2, label: 'Facilities', icon: Search, color: 'emerald' },
              { num: 3, label: 'Verification', icon: Shield, color: 'purple' },
              { num: 4, label: 'Integration', icon: Zap, color: 'orange' },
              { num: 5, label: 'Activation', icon: CheckCircle, color: 'green' }
            ].map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep >= step.num;
              const isCurrent = currentStep === step.num;
              
              return (
                <div key={step.num} className="flex items-center">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-lg ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  {index < 4 && (
                    <div className={`w-20 h-2 mx-3 rounded-full transition-all duration-500 ${
                      currentStep > step.num ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-between text-sm font-semibold text-gray-600">
            <span>Organization</span>
            <span>Facilities</span>
            <span>Verification</span>
            <span>Integration</span>
            <span>Activation</span>
          </div>
        </div>

        {/* Enhanced Step Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-8 min-h-[600px]">
          {renderStepContent()}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-between items-center bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center px-8 py-4 text-gray-700 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ArrowRight className="h-5 w-5 mr-2 transform rotate-180" />
            Previous
          </button>
          
          <div className="flex items-center space-x-4">
            {saveMessage && (
              <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                saveMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {saveMessage}
              </div>
            )}
            
            <button
              onClick={saveProgress}
              disabled={isSaving}
              className="flex items-center px-8 py-4 text-gray-700 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 transition-all font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Save Progress
                </>
              )}
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5 || !canProceedToNextStep()}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityManager;