import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Building, MapPin, Phone, Users, CheckCircle, Plus, Upload, Eye, EyeOff, 
  Star, Award, Clock, Calendar, ArrowRight, Shield, Zap, TrendingUp, Filter,
  Building2, Globe, Camera, FileText, Download, Edit3, Trash2, MoreVertical
} from 'lucide-react';

const EnterpriseModernFacilityManager = () => {
  // Enhanced State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationType, setOrganizationType] = useState('');
  const [corporateInfo, setCorporateInfo] = useState({
    legalName: '',
    dbaName: '',
    ein: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    authorizedSigner: '',
    signerTitle: '',
    website: '',
    businessType: 'imaging_center'
  });
  
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
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
    yearEstablished: '',
    equipmentBrands: []
  });
  
  const [progress, setProgress] = useState(20);
  const [isSaving, setIsSaving] = useState(false);
  const [showEIN, setShowEIN] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const searchTimeoutRef = useRef(null);

  // Mock data that would come from your Supabase
  const mockUser = {
    id: '09a5523c-accd-4a00-bbfb-a65c52c69831',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@advancedimaging.com',
    phone: '(954) 555-0123',
    centerName: 'Advanced Imaging Center of Davie'
  };

  // Enhanced ACR facility data with more realistic details
  const mockACRFacilities = [
    {
      id: 'acr_001',
      name: 'Advanced Imaging Center of Davie',
      address: '12345 University Dr',
      city: 'Davie',
      state: 'FL',
      zip: '33328',
      phone: '(954) 555-0123',
      website: 'www.advancedimaging.com',
      modalities: ['MRI', 'CT', 'Ultrasound', 'X-Ray'],
      equipmentBrands: ['GE', 'Siemens'],
      yearEstablished: '2010',
      accredited: true,
      rating: 4.8,
      reviews: 247,
      specialties: ['Cardiac Imaging', 'Neurological Imaging'],
      certifications: ['ACR', 'AIUM', 'ICAVL']
    },
    {
      id: 'acr_002',
      name: 'Broward Diagnostic Imaging',
      address: '5678 Commercial Blvd',
      city: 'Fort Lauderdale',
      state: 'FL',
      zip: '33309',
      phone: '(954) 555-0456',
      website: 'www.browarddiagnostic.com',
      modalities: ['MRI', 'CT', 'X-Ray', 'Mammography', 'Ultrasound'],
      equipmentBrands: ['Philips', 'GE'],
      yearEstablished: '2005',
      accredited: true,
      rating: 4.6,
      reviews: 189,
      specialties: ['Women\'s Imaging', 'Musculoskeletal'],
      certifications: ['ACR', 'FDA', 'MQSA']
    },
    {
      id: 'acr_003',
      name: 'South Florida Medical Imaging',
      address: '9012 Sunrise Blvd',
      city: 'Plantation',
      state: 'FL',
      zip: '33322',
      phone: '(954) 555-0789',
      website: 'www.sfmedicalimaging.com',
      modalities: ['MRI', 'CT', 'PET', 'Nuclear Medicine', 'DEXA'],
      equipmentBrands: ['Siemens', 'Canon'],
      yearEstablished: '1998',
      accredited: true,
      rating: 4.9,
      reviews: 312,
      specialties: ['Oncology Imaging', 'Cardiology'],
      certifications: ['ACR', 'SNM', 'ICANL']
    }
  ];

  // Equipment brands for dropdowns
  const equipmentBrands = ['GE', 'Siemens', 'Philips', 'Canon', 'Hologic', 'Fujifilm', 'Other'];
  const modalityOptions = ['MRI', 'CT', 'X-Ray', 'Ultrasound', 'Mammography', 'PET', 'Nuclear Medicine', 'DEXA', 'Fluoroscopy'];

  // Auto-populate from user data
  useEffect(() => {
    if (organizationType === 'single') {
      setCorporateInfo(prev => ({
        ...prev,
        legalName: mockUser.centerName,
        dbaName: mockUser.centerName,
        phone: mockUser.phone,
        email: mockUser.email,
        authorizedSigner: `${mockUser.firstName} ${mockUser.lastName}`
      }));
    }
  }, [organizationType]);

  // Enhanced search with debouncing
  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      searchTimeoutRef.current = setTimeout(() => {
        // Enhanced search logic
        const results = mockACRFacilities.filter(facility =>
          facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          facility.modalities.some(mod => mod.toLowerCase().includes(searchTerm.toLowerCase())) ||
          facility.equipmentBrands.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
        setIsSearching(false);
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

  // Enhanced formatting functions
  const formatEIN = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 2) return cleanValue;
    return `${cleanValue.slice(0, 2)}-${cleanValue.slice(2, 9)}`;
  };

  const formatPhone = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 3) return cleanValue;
    if (cleanValue.length <= 6) return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
    return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`;
  };

  // Enhanced facility selection
  const selectFacility = (facility) => {
    if (!selectedFacilities.find(f => f.id === facility.id)) {
      const newFacility = { 
        ...facility, 
        isPrimary: selectedFacilities.length === 0,
        addedDate: new Date().toISOString(),
        status: 'pending'
      };
      setSelectedFacilities([...selectedFacilities, newFacility]);
      setSearchTerm('');
      setSearchResults([]);
      
      // Trigger animation
      setAnimationStep(prev => prev + 1);
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
    if (manualFacility.name && manualFacility.address && manualFacility.city && manualFacility.state) {
      const newFacility = {
        ...manualFacility,
        id: `manual_${Date.now()}`,
        accredited: false,
        isPrimary: selectedFacilities.length === 0,
        addedDate: new Date().toISOString(),
        status: 'pending',
        rating: null,
        reviews: 0,
        specialties: [],
        certifications: []
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
        yearEstablished: '',
        equipmentBrands: []
      });
      setShowManualEntry(false);
    }
  };

  // Enhanced progress calculation
  useEffect(() => {
    let newProgress = 20; // Base progress
    
    if (organizationType) newProgress += 15;
    if (corporateInfo.legalName) newProgress += 10;
    if (corporateInfo.ein) newProgress += 10;
    if (corporateInfo.authorizedSigner) newProgress += 10;
    if (selectedFacilities.length > 0) newProgress += 20;
    if (selectedFacilities.length > 1) newProgress += 5;
    if (corporateInfo.website) newProgress += 5;
    if (manualFacility.modalities?.length > 0) newProgress += 5;
    
    setProgress(newProgress);
  }, [organizationType, corporateInfo, selectedFacilities, manualFacility]);

  // Enhanced save functionality
  const saveProgress = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API save with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your existing Supabase operations
      // 1. Update corporate_entities table
      // 2. Update user_facilities table
      // 3. Update user progress tracking via window.USRadUser
      
      // Trigger success animation
      setAnimationStep(prev => prev + 1);
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      successDiv.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Progress saved successfully!
        </div>
      `;
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        if (successDiv.parentNode) {
          successDiv.remove();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving progress. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter facilities
  const filteredFacilities = selectedFacilities.filter(facility => {
    if (filterBy === 'all') return true;
    if (filterBy === 'acr') return facility.accredited;
    if (filterBy === 'manual') return !facility.accredited;
    if (filterBy === 'primary') return facility.isPrimary;
    return true;
  });

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
                      value={corporateInfo.dbaName}
                      onChange={(e) => setCorporateInfo({...corporateInfo, dbaName: e.target.value})}
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
                        value={corporateInfo.ein}
                        onChange={(e) => setCorporateInfo({...corporateInfo, ein: formatEIN(e.target.value)})}
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
                      onChange={(e) => setCorporateInfo({...corporateInfo, phone: formatPhone(e.target.value)})}
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
                      value={corporateInfo.authorizedSigner}
                      onChange={(e) => setCorporateInfo({...corporateInfo, authorizedSigner: e.target.value})}
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
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                                  {facility.rating && (
                                    <div className="ml-2 flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="ml-1 text-xs text-gray-600 font-medium">{facility.rating}</span>
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
                                    <span className="text-gray-500">{facility.modalities.join(', ')}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Award className="h-3 w-3 mr-1 text-gray-400" />
                                    <span className="text-gray-500">{facility.equipmentBrands.join(', ')}</span>
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
                
                <button 
                  onClick={() => setShowBulkUpload(!showBulkUpload)}
                  className="flex items-center px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Bulk Upload
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
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="Enter facility name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={manualFacility.address}
                      onChange={(e) => setManualFacility({...manualFacility, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={manualFacility.city}
                      onChange={(e) => setManualFacility({...manualFacility, city: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      value={manualFacility.state}
                      onChange={(e) => setManualFacility({...manualFacility, state: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                    >
                      <option value="">Select state</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="AL">Alabama</option>
                      <option value="SC">South Carolina</option>
                      <option value="NC">North Carolina</option>
                    </select>
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
                      onChange={(e) => setManualFacility({...manualFacility, phone: formatPhone(e.target.value)})}
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
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        ⊞
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        ☰
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredFacilities.map((facility) => (
                    <div
                      key={facility.id}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                        facility.isPrimary 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute top-4 right-4">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h5 className="font-bold text-gray-900 text-lg">{facility.name}</h5>
                            {facility.accredited && (
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
                            
                            {facility.rating && (
                              <p className="text-sm text-gray-600 flex items-center">
                                <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                                {facility.rating} ({facility.reviews} reviews)
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
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-lg
                      ${isActive 
                        ? `bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 text-white shadow-${step.color}-200` 
                        : 'bg-gray-200 text-gray-600'
                      }
                      ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}
                    `}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  {index < 4 && (
                    <div className={`
                      w-20 h-2 mx-3 rounded-full transition-all duration-500
                      ${currentStep > step.num ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-200'}
                    `}></div>
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
          
          <div className="flex space-x-4">
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
              disabled={currentStep === 5}
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

export default EnterpriseModernFacilityManager;