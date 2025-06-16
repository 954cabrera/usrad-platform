import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Building, MapPin, Phone, Users, CheckCircle, Plus, Upload, Eye, EyeOff, 
  Star, Award, Clock, Calendar, ArrowRight, Shield, Zap, TrendingUp, Filter,
  Building2, Globe, Camera, FileText, Download, Edit3, Trash2, MoreVertical,
  ChevronUp, ChevronDown, AlertTriangle
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
  const [showFullFacilityList, setShowFullFacilityList] = useState(false);
  
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
              legalEntityName: result.corporateInfo.legal_name || '',
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
            if (!localStorage.getItem('market_education_completed')) {
              window.location.href = '/dashboard/contract/market-education';
            }
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
    // Clear results if search term is too short
    if (searchTerm.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

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
                      placeholder="Search by facility name, city, state (minimum 3 characters)..."
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
  
                  {/* Search Status Messages */}
                  {searchTerm.length > 0 && searchTerm.length < 3 && (
                    <div className="mt-2 text-center">
                      <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Type {3 - searchTerm.length} more character{3 - searchTerm.length !== 1 ? 's' : ''} to search
                      </p>
                    </div>
                  )}
  
                  {searchTerm.length >= 3 && !isSearching && searchResults.length === 0 && (
                    <div className="mt-2 text-center">
                      <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 inline-block">
                        <Search className="h-4 w-4 inline mr-1" />
                        No facilities found for "{searchTerm}"
                      </p>
                    </div>
                  )}
  
                  {/* Enhanced Search Results */}
                  {(searchResults.length > 0 || isSearching) && (
                    <div className="absolute z-20 w-full mt-4 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                          <p className="text-gray-600 font-medium">Searching ACR database...</p>
                          <p className="text-sm text-gray-500 mt-1">Finding matches for "{searchTerm}"</p>
                        </div>
                      ) : (
                        <div className="p-2">
                          {/* Results Header */}
                          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                            <p className="text-sm font-medium text-gray-700">
                              Found {searchResults.length} facilities matching "{searchTerm}"
                            </p>
                          </div>
                          
                          {/* Results List */}
                          {searchResults.map((facility) => (
                            <div
                              key={facility.id}
                              onClick={() => selectFacility(facility)}
                              className="p-4 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0 rounded-xl transition-all group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                      {facility.name}
                                    </h4>
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
                                      <span className="text-gray-500">
                                        {facility.modalities ? facility.modalities.join(', ') : facility.modality}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="ml-4 flex items-center">
                                  {selectedFacilities.find(f => f.id === facility.id) ? (
                                    <div className="flex items-center text-green-600">
                                      <CheckCircle className="h-5 w-5 mr-1" />
                                      <span className="text-sm font-medium">Added</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
                                      <ArrowRight className="h-5 w-5" />
                                    </div>
                                  )}
                                </div>
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
  
              {/* Exhibit B Context Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      🏥 Facility Selection for Network Agreement
                    </h3>
                    <p className="text-blue-800 text-sm leading-relaxed mb-3">
                      Select all imaging facilities you want included in your USRad Provider Service Agreement. 
                      These locations will be added as <strong>"Exhibit B - Authorized Facilities"</strong> to your contract.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-blue-700">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Individual facilities supported</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Multiple locations under one agreement</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Add/remove facilities anytime</span>
                      </div>
                    </div>
                  </div>
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
            These facilities will be included in your PSA as Exhibit B
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Facility Count Badge */}
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-sm">
          {selectedFacilities.length} {selectedFacilities.length === 1 ? 'Facility' : 'Facilities'} Selected
        </div>
        
        {/* Filter Options */}
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

    {/* Facilities Summary Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">{selectedFacilities.length}</div>
          <div className="text-sm text-green-600">Total Facilities</div>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-700">
            {selectedFacilities.filter(f => f.acrVerified).length}
          </div>
          <div className="text-sm text-blue-600">ACR Accredited</div>
        </div>
      </div>
      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            {selectedFacilities.filter(f => f.isManualEntry).length}
          </div>
          <div className="text-sm text-purple-600">Manual Entries</div>
        </div>
      </div>
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-700">
            {selectedFacilities.filter(f => f.isPrimary).length}
          </div>
          <div className="text-sm text-orange-600">Primary Facility</div>
        </div>
      </div>
    </div>
    
    {/* Enhanced Facilities Grid */}
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
          {/* Facility Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h5 className="font-bold text-gray-900 text-lg">{facility.name}</h5>
                
                {/* Status Badges */}
                <div className="ml-2 flex items-center space-x-2">
                  {facility.acrVerified && (
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      ACR
                    </div>
                  )}
                  {facility.isPrimary && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                      PRIMARY
                    </span>
                  )}
                  {facility.isManualEntry && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      MANUAL
                    </span>
                  )}
                </div>
              </div>
              
              {/* Facility Details */}
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

                {/* Added Date */}
                {facility.addedDate && (
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Added {new Date(facility.addedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              {/* Modalities Tags */}
              {facility.modalities && facility.modalities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {facility.modalities.slice(0, 3).map((modality) => (
                    <span key={modality} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {modality}
                    </span>
                  ))}
                  {facility.modalities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{facility.modalities.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Facility Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              {!facility.isPrimary && selectedFacilities.length > 1 && (
                <button
                  onClick={() => setPrimaryFacility(facility.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Set as Primary
                </button>
              )}
            </div>
            
            <button
              onClick={() => removeFacility(facility.id)}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors flex items-center group"
              title="Remove from agreement"
            >
              <Trash2 className="h-4 w-4 mr-1 group-hover:animate-pulse" />
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Agreement Summary */}
    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h5 className="font-semibold text-gray-900 mb-3">Agreement Summary</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Total Facilities:</span>
          <span className="ml-2 font-semibold text-gray-900">{selectedFacilities.length}</span>
        </div>
        <div>
          <span className="text-gray-600">Primary Facility:</span>
          <span className="ml-2 font-semibold text-gray-900">
            {selectedFacilities.find(f => f.isPrimary)?.name || 'None selected'}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Agreement Type:</span>
          <span className="ml-2 font-semibold text-gray-900">
            {selectedFacilities.length === 1 ? 'Single Facility' : 'Multi-Facility'}
          </span>
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-900">
            Next: These {selectedFacilities.length} facilities will be automatically added to your PSA as Exhibit B
          </span>
        </div>
      </div>
    </div>
  </div>
)}
          </div>
        );

        case 3:
        return (
          <div className="space-y-8">
            {/* PSA Review Header */}
            <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 rounded-2xl border border-purple-100 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Provider Service Agreement (PSA) Review</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Review your information and digitally sign your Provider Service Agreement to join the USRad network. 
                  This will officially authorize your facilities to participate in our imaging network.
                </p>
              </div>

              {/* Agreement Status */}
              <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">USRad Provider Service Agreement</h4>
                      <p className="text-sm text-gray-600">Ready for your digital signature</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-600">Status: Ready to Sign</div>
                    <div className="text-xs text-gray-500">Agreement ID: PSA-{Date.now().toString().slice(-6)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                <h4 className="text-lg font-bold text-gray-900">Agreement Preview</h4>
                <p className="text-sm text-gray-600">Review the key terms that will be included in your PSA</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Provider Information Summary */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h5 className="font-bold text-blue-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Provider Information
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Legal Business Name:</span>
                      <span className="ml-2 font-semibold text-gray-900">{corporateInfo.legalName || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Federal Tax ID:</span>
                      <span className="ml-2 font-semibold text-gray-900">{corporateInfo.taxId || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Authorized Signer:</span>
                      <span className="ml-2 font-semibold text-gray-900">{corporateInfo.signerName || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Business Email:</span>
                      <span className="ml-2 font-semibold text-gray-900">{corporateInfo.email || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities Summary - Exhibit B - Fixed Version */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-green-900 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Exhibit B - Authorized Facilities ({selectedFacilities.length})
                    </h5>
                    
                    {/* View Toggle for Large Lists */}
                    {selectedFacilities.length > 5 && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowFullFacilityList(!showFullFacilityList)}
                          className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center"
                        >
                          {showFullFacilityList ? (
                            "▲ Show Summary"
                          ) : (
                            "▼ Show All Facilities"
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Summary Stats for Large Lists */}
                  {selectedFacilities.length > 5 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-700">{selectedFacilities.length}</div>
                          <div className="text-xs text-green-600">Total Facilities</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700">
                            {selectedFacilities.filter(f => f.acrVerified).length}
                          </div>
                          <div className="text-xs text-blue-600">ACR Accredited</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-700">
                            {new Set(selectedFacilities.map(f => f.state)).size}
                          </div>
                          <div className="text-xs text-purple-600">States</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-700">
                            {selectedFacilities.filter(f => f.isPrimary).length}
                          </div>
                          <div className="text-xs text-orange-600">Primary</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Facility List - Conditional Display */}
                  {selectedFacilities.length <= 5 || showFullFacilityList ? (
                    /* Full List View */
                    <div className="space-y-3">
                      {selectedFacilities.length > 10 && (
                        <div className="bg-white rounded-lg p-3 border border-green-200 mb-3">
                          <div className="text-sm text-gray-600 text-center">
                            Showing all {selectedFacilities.length} facilities
                            {selectedFacilities.length > 20 && (
                              <span className="ml-2 text-green-600 font-medium">
                                (Large facility network detected)
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className={`space-y-2 ${selectedFacilities.length > 15 ? 'max-h-96 overflow-y-auto' : ''}`}>
                        {selectedFacilities.map((facility, index) => (
                          <div key={facility.id} className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center mb-1">
                                  <span className="text-sm font-semibold text-gray-900 mr-2">
                                    {index + 1}. {facility.name}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    {facility.isPrimary && (
                                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                                        PRIMARY
                                      </span>
                                    )}
                                    {facility.acrVerified && (
                                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                        ACR
                                      </span>
                                    )}
                                    {facility.isManualEntry && (
                                      <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-medium">
                                        MANUAL
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 truncate">
                                  {facility.address}, {facility.city}, {facility.state} {facility.zip}
                                </p>
                                {facility.modalities && facility.modalities.length > 0 && (
                                  <p className="text-xs text-gray-500 mt-1 truncate">
                                    Services: {facility.modalities.slice(0, 3).join(', ')}
                                    {facility.modalities.length > 3 && ` +${facility.modalities.length - 3} more`}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedFacilities.length > 15 && (
                        <div className="text-center pt-2">
                          <span className="text-xs text-gray-500">
                            Scroll to view all facilities • {selectedFacilities.length} total
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Condensed Summary View */
                    <div className="space-y-3">
                      {/* Show Primary Facility */}
                      {selectedFacilities.find(f => f.isPrimary) && (
                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-gray-900 mr-2">
                              Primary: {selectedFacilities.find(f => f.isPrimary).name}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                              PRIMARY
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {selectedFacilities.find(f => f.isPrimary).city}, {selectedFacilities.find(f => f.isPrimary).state}
                          </p>
                        </div>
                      )}
                      
                      {/* Show First 3 Additional Facilities */}
                      {selectedFacilities.filter(f => !f.isPrimary).slice(0, 3).map((facility, index) => (
                        <div key={facility.id} className="bg-white rounded-lg p-3 border border-green-200">
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-gray-900 mr-2">
                              {facility.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              {facility.acrVerified && (
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                  ACR
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">
                            {facility.city}, {facility.state}
                          </p>
                        </div>
                      ))}
                      
                      {/* Show Remaining Count */}
                      {selectedFacilities.length > 4 && (
                        <div className="bg-white rounded-lg p-3 border border-green-200 border-dashed">
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-700">
                              + {selectedFacilities.length - 4} additional facilities
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              Located in: {[...new Set(selectedFacilities.slice(4).map(f => f.state))].join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-center pt-2">
                        <button
                          onClick={() => setShowFullFacilityList(true)}
                          className="text-sm text-green-700 hover:text-green-800 font-medium"
                        >
                          Click "▼ Show All Facilities" above to view complete list
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Download/Export Option for Large Lists */}
                  {selectedFacilities.length > 20 && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">
                          Large facility network detected ({selectedFacilities.length} locations)
                        </span>
                        <button
                          onClick={() => {
                            // Generate CSV export of facility list
                            const csvContent = selectedFacilities.map((f, i) => 
                              `${i + 1},"${f.name}","${f.address}","${f.city}","${f.state}","${f.zip || ''}","${f.isPrimary ? 'Primary' : ''}","${f.acrVerified ? 'ACR' : ''}"`
                            ).join('\n');
                            const header = 'Number,Facility Name,Address,City,State,ZIP,Primary,Accreditation\n';
                            const blob = new Blob([header + csvContent], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `USRad_Facilities_Exhibit_B_${new Date().toISOString().split('T')[0]}.csv`;
                            a.click();
                          }}
                          className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export List
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Agreement Terms */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-purple-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Key Agreement Terms
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Agreement Type:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {organizationType === 'single' ? 'Single Practice' : 'Multi-Location Corporate'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Network Participation:</span>
                        <span className="ml-2 font-semibold text-gray-900">USRad Imaging Network</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Effective Date:</span>
                        <span className="ml-2 font-semibold text-gray-900">Upon Execution</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Commission Structure:</span>
                        <span className="ml-2 font-semibold text-gray-900">Per Fee Schedule</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="ml-2 font-semibold text-gray-900">Net 30 Days</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Territory:</span>
                        <span className="ml-2 font-semibold text-gray-900">Authorized Facility Locations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notices */}
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h5 className="font-bold text-amber-900 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Important Information
                  </h5>
                  <div className="space-y-2 text-sm text-amber-800">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                      <span>By signing this agreement, you authorize all facilities listed in Exhibit B to participate in the USRad network</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                      <span>You can add or remove facilities from your agreement at any time through your dashboard</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                      <span>This agreement will be legally binding once both parties have provided digital signatures</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                      <span>You will receive a fully executed copy via email within 24 hours of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signing Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">Ready to Sign Your Agreement</h4>
                    <p className="text-blue-100">Click below to proceed to secure digital signing</p>
                  </div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Edit3 className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">Secure Process</h5>
                    <p className="text-sm text-gray-600">Bank-level encryption and legal compliance ensure your signature is protected</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">Quick Signing</h5>
                    <p className="text-sm text-gray-600">Digital signing typically takes less than 2 minutes to complete</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">Immediate Access</h5>
                    <p className="text-sm text-gray-600">Start receiving referrals as soon as both parties have signed</p>
                  </div>
                </div>

                {/* Signature Confirmation */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      id="signature-confirmation"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="signature-confirmation" className="text-sm text-gray-700 leading-relaxed">
                      I confirm that I have reviewed all information above and that I am authorized to sign this Provider Service Agreement on behalf of{' '}
                      <strong>{corporateInfo.legalName || 'the organization'}</strong>. I understand that this will create a legally binding agreement between my organization and USRad.
                    </label>
                  </div>
                </div>

                {/* Signing Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={async () => {
                      const checkbox = document.getElementById('signature-confirmation');
                      if (!checkbox?.checked) {
                        alert('Please confirm that you have reviewed the agreement and are authorized to sign.');
                        return;
                      }
                      
                      setIsSaving(true);
                      try {
                        // Here you would integrate with your existing DocuSeal PSA system
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        alert('PSA generated successfully! You would now be redirected to the signing interface.');
                      } catch (error) {
                        console.error('PSA generation error:', error);
                        alert('Error generating PSA. Please try again.');
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating PSA...
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-5 w-5 mr-3" />
                        Proceed to Digital Signing
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                  >
                    Back to Edit Facilities
                  </button>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Need help? Contact our support team at{' '}
                    <a href="mailto:support@usradiology.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      support@usradiology.com
                    </a>{' '}
                    or call{' '}
                    <a href="tel:+1-954-555-0123" className="text-blue-600 hover:text-blue-700 font-medium">
                      (954) 555-0123
                    </a>
                  </p>
                </div>
              </div>
            </div>
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
              { num: 3, label: 'PSA Review & Signing', icon: Shield, color: 'purple' },
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
            <span>PSA Review & Signing</span>
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
      onClick={() => {
        if (selectedFacilities.length > 0 && !localStorage.getItem('market_education_completed')) {
          window.location.href = '/dashboard/contract/market-education';
        } else {
          setCurrentStep(Math.min(5, currentStep + 1));
        }
      }}
      
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