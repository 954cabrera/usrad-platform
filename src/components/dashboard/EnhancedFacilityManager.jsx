import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Building, MapPin, Phone, Users, CheckCircle, Plus, Upload, Eye, EyeOff, 
  Star, Award, Clock, Calendar, ArrowRight, Shield, Zap, TrendingUp, Filter,
  Building2, Globe, Camera, FileText, Download, Edit3, Trash2, MoreVertical,
  RefreshCw
} from 'lucide-react';
import { useUserDataFlow } from '@/hooks/useUserDataFlow';
import { useAutoSave } from '@/hooks/useAutoSave';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
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
} from '@/lib/facilityManager.js';

const EnhancedFacilityManager = () => {
  // Use our enhanced data flow system
  const { 
    userData, 
    loading: dataLoading, 
    saveCorporateEntity, 
    saveFacility,
    autoPopulateCorporateData,
    autoPopulateFacilityData,
    formatTaxId,
    formatPhoneNumber: formatPhone
  } = useUserDataFlow();

  // State Management
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
  const [showEIN, setShowEIN] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasAutoPopulated, setHasAutoPopulated] = useState(false);

  const searchTimeoutRef = useRef(null);

  // Auto-populate corporate info when user data is loaded
  useEffect(() => {
    if (userData && !hasAutoPopulated) {
      autoPopulateFromUserData();
    }
  }, [userData, hasAutoPopulated]);

  // Auto-populate function
  const autoPopulateFromUserData = async () => {
    if (!userData) return;

    const { profile, corporate } = userData;
    
    // If corporate data exists, use it
    if (corporate && Object.keys(corporate).length > 0) {
      setCorporateInfo({
        legalName: corporate.legal_name || '',
        legalEntityName: corporate.legal_entity_name || '',
        taxId: formatTaxId(corporate.tax_id || ''),
        signerName: corporate.signer_name || profile?.full_name || '',
        signerTitle: corporate.signer_title || '',
        email: corporate.email || corporate.primary_contact_email || '',
        phone: formatPhone(corporate.phone || profile?.phone || ''),
        corporateAddress: corporate.corporate_address || '',
        corporateCity: corporate.corporate_city || '',
        corporateState: corporate.corporate_state || '',
        corporateZip: corporate.corporate_zip || '',
        website: corporate.website || '',
        organizationType: corporate.organization_type || ''
      });
      
      // Set organization type if available
      if (corporate.organization_type) {
        setOrganizationType(corporate.organization_type);
      }
    } else {
      // Auto-populate from profile data with business_name priority
      const autoData = await autoPopulateCorporateData();
      if (autoData) {
        setCorporateInfo({
          legalName: autoData.corporate_name || profile?.business_name || profile?.center_name || '',
          legalEntityName: '',
          taxId: '',
          signerName: autoData.signer_name || profile?.full_name || '',
          signerTitle: '',
          email: autoData.email || '',
          phone: formatPhone(autoData.phone || profile?.phone || ''),
          corporateAddress: '',
          corporateCity: '',
          corporateState: '',
          corporateZip: '',
          website: '',
          organizationType: ''
        });
      }
    }

    // Auto-populate facilities if they exist
    if (userData.facilities && userData.facilities.length > 0) {
      const formattedFacilities = userData.facilities.map(facility => ({
        ...facility,
        phone: formatPhone(facility.phone || ''),
        isSelected: true,
        isSaved: true
      }));
      setSelectedFacilities(formattedFacilities);
    }

    setHasAutoPopulated(true);
    toast.success('Data auto-populated from your profile');
  };

  // Manual auto-populate trigger
  const handleManualAutoPopulate = async () => {
    await autoPopulateFromUserData();
    toast.success('Data refreshed from your profile');
  };

  // Auto-save for corporate info
  const { triggerAutoSave: autoSaveCorporate } = useAutoSave({
    onSave: async (data) => {
      const corporateData = {
        corporate_name: data.legalName,
        legal_name: data.legalName,
        legal_entity_name: data.legalEntityName,
        tax_id: data.taxId,
        signer_name: data.signerName,
        signer_title: data.signerTitle,
        email: data.email,
        phone: data.phone,
        corporate_address: data.corporateAddress,
        corporate_city: data.corporateCity,
        corporate_state: data.corporateState,
        corporate_zip: data.corporateZip,
        website: data.website,
        organization_type: data.organizationType || organizationType
      };
      
      return await saveCorporateEntity(corporateData);
    },
    enabled: currentStep === 2
  });

  // Handle corporate info changes
  const handleCorporateInfoChange = (field, value) => {
    // Format special fields
    if (field === 'taxId') {
      value = formatTaxId(value);
    } else if (field === 'phone') {
      value = formatPhone(value);
    }

    const updatedInfo = { ...corporateInfo, [field]: value };
    setCorporateInfo(updatedInfo);
    
    // Clear errors for this field
    setErrors(prev => ({ ...prev, [field]: null }));
    
    // Trigger auto-save
    autoSaveCorporate(updatedInfo);
  };

  // Calculate progress based on completion
  useEffect(() => {
    let newProgress = 20;
    
    // Step 1: Organization type selected
    if (organizationType) newProgress = 40;
    
    // Step 2: Corporate info filled
    if (currentStep >= 2) {
      const requiredFields = ['legalName', 'taxId', 'signerName', 'email'];
      const filledFields = requiredFields.filter(field => corporateInfo[field]).length;
      newProgress = 40 + (filledFields / requiredFields.length) * 20;
    }
    
    // Step 3: Facilities added
    if (currentStep === 3 && selectedFacilities.length > 0) {
      newProgress = 80;
    }
    
    // Step 4: Review complete
    if (currentStep === 4) {
      newProgress = 100;
    }
    
    setProgress(newProgress);
  }, [currentStep, organizationType, corporateInfo, selectedFacilities]);

  // Search facilities
  const handleFacilitySearch = async (term) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const results = await searchAcrFacilities(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search facilities');
    } finally {
      setIsSearching(false);
    }
  };

  // Add facility to selected list
  const addFacility = (facility) => {
    const newFacility = {
      ...facility,
      id: facility.id || Date.now(),
      isSelected: true,
      phone: formatPhone(facility.phone || '')
    };
    
    setSelectedFacilities([...selectedFacilities, newFacility]);
    setSearchResults([]);
    setSearchTerm('');
    
    // Auto-save facility
    saveFacility({
      acr_facility_id: facility.acrId,
      facility_name: facility.name,
      street_address: facility.address,
      city: facility.city,
      state: facility.state,
      zip_code: facility.zip,
      is_primary: selectedFacilities.length === 0,
      modalities: facility.modalities ? JSON.stringify(facility.modalities) : null,
      equipment_brands: facility.equipmentBrands ? JSON.stringify(facility.equipmentBrands) : null
    });
    
    toast.success(`${facility.name} added successfully`);
  };

  // Remove facility
  const removeFacility = (facilityId) => {
    setSelectedFacilities(selectedFacilities.filter(f => f.id !== facilityId));
    toast.info('Facility removed');
  };

  // Validate corporate info
  const validateCorporateInfo = () => {
    const newErrors = {};
    
    if (!corporateInfo.legalName) newErrors.legalName = 'Legal name is required';
    if (!corporateInfo.taxId) newErrors.taxId = 'Tax ID is required';
    if (!validateEIN(corporateInfo.taxId)) newErrors.taxId = 'Invalid Tax ID format';
    if (!corporateInfo.signerName) newErrors.signerName = 'Signer name is required';
    if (!corporateInfo.email) newErrors.email = 'Email is required';
    if (!validateEmail(corporateInfo.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const handleNext = async () => {
    if (currentStep === 2 && !validateCorporateInfo()) {
      toast.error('Please fix the errors before continuing');
      return;
    }
    
    if (currentStep === 3 && selectedFacilities.length === 0) {
      toast.error('Please add at least one facility');
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Final save and complete
  const handleComplete = async () => {
    setIsSaving(true);
    
    try {
      // Save final configuration
      const configuration = {
        organizationType,
        corporateInfo,
        facilities: selectedFacilities,
        completedAt: new Date().toISOString()
      };
      
      await saveFacilityConfiguration(configuration);
      
      toast.success('Facility setup completed successfully!');
      
      // Navigate to next step (PSA or dashboard)
      setTimeout(() => {
        window.location.href = '/dashboard/psa';
      }, 1500);
      
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to complete setup. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Facility Management Setup</h1>
            <button
              onClick={handleManualAutoPopulate}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
              title="Refresh data from profile"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh from Profile
            </button>
          </div>
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-600">Step {currentStep} of 4</span>
              <span className="text-xs text-gray-600">{progress}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Organization Type */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Select Your Organization Type</h2>
            <p className="text-gray-600 mb-8">
              Choose the type that best describes your organization
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: 'single',
                  title: 'Single Facility',
                  description: 'Individual imaging center or practice',
                  icon: Building2,
                  color: 'blue'
                },
                {
                  id: 'multi',
                  title: 'Multi-Facility Organization',
                  description: 'Multiple locations under one organization',
                  icon: Building,
                  color: 'green'
                },
                {
                  id: 'hospital',
                  title: 'Hospital System',
                  description: 'Hospital with imaging departments',
                  icon: Shield,
                  color: 'purple'
                },
                {
                  id: 'network',
                  title: 'Imaging Network',
                  description: 'Network of affiliated centers',
                  icon: Globe,
                  color: 'orange'
                }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    setOrganizationType(type.id);
                    handleCorporateInfoChange('organizationType', type.id);
                    setTimeout(() => handleNext(), 300);
                  }}
                  className={`
                    p-6 rounded-lg border-2 text-left transition-all
                    ${organizationType === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <type.icon className={`w-8 h-8 mb-4 text-${type.color}-600`} />
                  <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Corporate Information */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">Corporate Information</h2>
                <p className="text-gray-600 mt-1">
                  Enter your organization's legal information
                </p>
              </div>
              {userData && (
                <div className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Auto-populated from profile
                </div>
              )}
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Name *
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.legalName}
                    onChange={(e) => handleCorporateInfoChange('legalName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.legalName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ABC Imaging Center, LLC"
                  />
                  {errors.legalName && (
                    <p className="mt-1 text-sm text-red-600">{errors.legalName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.legalEntityName}
                    onChange={(e) => handleCorporateInfoChange('legalEntityName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="DBA Name (if different)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax ID (EIN) *
                  </label>
                  <div className="relative">
                    <input
                      type={showEIN ? 'text' : 'password'}
                      value={corporateInfo.taxId}
                      onChange={(e) => handleCorporateInfoChange('taxId', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.taxId ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XX-XXXXXXX"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEIN(!showEIN)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showEIN ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.taxId && (
                    <p className="mt-1 text-sm text-red-600">{errors.taxId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={corporateInfo.website}
                    onChange={(e) => handleCorporateInfoChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Authorized Signer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.signerName}
                      onChange={(e) => handleCorporateInfoChange('signerName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.signerName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.signerName && (
                      <p className="mt-1 text-sm text-red-600">{errors.signerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.signerTitle}
                      onChange={(e) => handleCorporateInfoChange('signerTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="CEO, President, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={corporateInfo.email}
                      onChange={(e) => handleCorporateInfoChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={corporateInfo.phone}
                      onChange={(e) => handleCorporateInfoChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Corporate Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.corporateAddress}
                      onChange={(e) => handleCorporateInfoChange('corporateAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={corporateInfo.corporateCity}
                      onChange={(e) => handleCorporateInfoChange('corporateCity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={corporateInfo.corporateState}
                        onChange={(e) => handleCorporateInfoChange('corporateState', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP
                      </label>
                      <input
                        type="text"
                        value={corporateInfo.corporateZip}
                        onChange={(e) => handleCorporateInfoChange('corporateZip', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Facility Selection */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Add Your Facilities</h2>
            <p className="text-gray-600 mb-8">
              Search for ACR-accredited facilities or add them manually
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    clearTimeout(searchTimeoutRef.current);
                    searchTimeoutRef.current = setTimeout(() => {
                      handleFacilitySearch(e.target.value);
                    }, 500);
                  }}
                  placeholder="Search by facility name, city, or ACR ID..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {searchResults.map((facility, index) => (
                    <button
                      key={index}
                      onClick={() => addFacility(facility)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{facility.name}</p>
                          <p className="text-sm text-gray-600">
                            {facility.address}, {facility.city}, {facility.state} {facility.zip}
                          </p>
                          {facility.acrId && (
                            <p className="text-xs text-blue-600 mt-1">ACR ID: {facility.acrId}</p>
                          )}
                        </div>
                        <Plus className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Manual Entry Option */}
            <div className="mb-8">
              <button
                onClick={() => setShowManualEntry(!showManualEntry)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add facility manually
              </button>

              {showManualEntry && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Manual Facility Entry</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Facility Name"
                      value={manualFacility.name}
                      onChange={(e) => setManualFacility({ ...manualFacility, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={manualFacility.phone}
                      onChange={(e) => setManualFacility({ ...manualFacility, phone: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={manualFacility.address}
                      onChange={(e) => setManualFacility({ ...manualFacility, address: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={manualFacility.city}
                      onChange={(e) => setManualFacility({ ...manualFacility, city: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="State"
                        value={manualFacility.state}
                        onChange={(e) => setManualFacility({ ...manualFacility, state: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="2"
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={manualFacility.zip}
                        onChange={(e) => setManualFacility({ ...manualFacility, zip: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (manualFacility.name && manualFacility.address) {
                        addFacility(manualFacility);
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
                      } else {
                        toast.error('Please fill in at least the facility name and address');
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Facility
                  </button>
                </div>
              )}
            </div>

            {/* Selected Facilities */}
            {selectedFacilities.length > 0 && (
              <div>
                <h3 className="font-medium mb-4">Selected Facilities ({selectedFacilities.length})</h3>
                <div className="space-y-4">
                  {selectedFacilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="p-4 bg-gray-50 rounded-lg flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-start">
                          <Building className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">{facility.name}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {facility.address}, {facility.city}, {facility.state} {facility.zip}
                            </p>
                            {facility.phone && (
                              <p className="text-sm text-gray-600 mt-1">
                                <Phone className="w-3 h-3 inline mr-1" />
                                {facility.phone}
                              </p>
                            )}
                            {facility.acrId && (
                              <p className="text-xs text-blue-600 mt-1">ACR ID: {facility.acrId}</p>
                            )}
                            {facility.isPrimary && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                                Primary Facility
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFacility(facility.id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={selectedFacilities.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Complete */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Review & Complete Setup</h2>
            <p className="text-gray-600 mb-8">
              Please review your information before completing the setup
            </p>

            {/* Organization Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Organization Information</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Organization Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">
                      {organizationType.replace('_', ' ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{corporateInfo.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tax ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{corporateInfo.taxId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Authorized Signer</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {corporateInfo.signerName} {corporateInfo.signerTitle && `(${corporateInfo.signerTitle})`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{corporateInfo.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{corporateInfo.phone || 'Not provided'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Facilities Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Facilities ({selectedFacilities.length})
              </h3>
              <div className="space-y-3">
                {selectedFacilities.map((facility, index) => (
                  <div key={facility.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                        <Building className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{facility.name}</p>
                        <p className="text-sm text-gray-600">
                          {facility.address}, {facility.city}, {facility.state} {facility.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Your facility configuration will be saved</li>
                <li>You'll be redirected to complete the PSA agreement</li>
                <li>Once approved, you'll have full access to the USRad network</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={isSaving}
                className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Auto-save indicator */}
        {(currentStep === 2 || currentStep === 3) && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
            Changes are automatically saved
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedFacilityManager;