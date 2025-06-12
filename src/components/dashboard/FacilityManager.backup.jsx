import React, { useState, useEffect } from 'react';
import { 
  Search,
  Plus, 
  Trash2, 
  Upload, 
  Download, 
  MapPin, 
  Phone, 
  Building2, 
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Shield,
  Clock,
  Star,
  Building,
  Zap
} from 'lucide-react';

// Import our Supabase facility management functions
import { 
  searchAcrFacilities, 
  saveFacilitySelection, 
  loadFacilitySelection,
  formatPhoneNumber,
  validateCorporateInfo
} from '../../lib/facilityManager.js';

const FacilityManager = () => {
  // State management
  const [facilities, setFacilities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [corporateInfo, setCorporateInfo] = useState({
    corporateName: '',
    legalEntityName: '',
    taxId: '',
    primaryContactName: '',
    primaryContactTitle: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    signingAuthority: '',
    organizationType: 'single' // single, corporation
  });
  const [showCorporateForm, setShowCorporateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState('search'); // search, preview, complete
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showSinglePracticeCompletion, setShowSinglePracticeCompletion] = useState(false);
  const [manualFormData, setManualFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    modality: ''
  });

  // Auto-save functionality for data protection (disabled for now to avoid conflicts)
  // useEffect(() => {
  //   const autoSave = async () => {
  //     if (selectedFacilities.length > 0 && validateCorporateInfoSmart(corporateInfo)) {
  //       await saveFacilityData();
  //     }
  //   };

  //   // Auto-save every 30 seconds if there's meaningful data
  //   const autoSaveInterval = setInterval(autoSave, 30000);
    
  //   return () => clearInterval(autoSaveInterval);
  // }, [selectedFacilities, corporateInfo]);

  // Load existing data when component mounts
  useEffect(() => {
    loadExistingData();
  }, []);

  // Load existing facility selection for current user
  const loadExistingData = async () => {
    if (typeof window !== 'undefined' && window.USRadUser?.user?.id) {
      try {
        const { corporateInfo, facilities } = await loadFacilitySelection(window.USRadUser.user.id);
        if (corporateInfo.corporateName) {
          setCorporateInfo(corporateInfo);
        }
        if (facilities.length > 0) {
          setSelectedFacilities(facilities);
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      }
    }
  };

  // Format EIN number (XX-XXXXXXX)
  const formatEIN = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Limit to 9 digits
    const limited = cleaned.slice(0, 9);
    
    // Add hyphen after 2nd digit if we have enough digits
    if (limited.length >= 3) {
      return `${limited.slice(0, 2)}-${limited.slice(2)}`;
    }
    return limited;
  };

  // Format phone number (XXX) XXX-XXXX  
  const formatPhoneInput = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (limited.length >= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length >= 3) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    }
    return limited;
  };
  const searchAcrDatabase = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const results = await searchAcrFacilities(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching ACR database:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input changes
  useEffect(() => {
    searchAcrDatabase(searchTerm);
  }, [searchTerm]);

  // Enhanced facility addition with smart corporate completion
  const addFromAcr = (acrFacility) => {
    const newFacility = {
      id: Date.now(),
      name: acrFacility.facility_name,
      address: `${acrFacility.street_1}, ${acrFacility.city}, ${acrFacility.state} ${acrFacility.zip_code}`,
      phone: formatPhoneNumber(acrFacility.phone_number),
      modality: acrFacility.modality,
      acrVerified: true,
      acrId: acrFacility.id,
      isPrimary: selectedFacilities.length === 0
    };
    
    // Auto-populate corporate info for single practice
    if (corporateInfo.organizationType === 'single') {
      const updatedCorporateInfo = {
        ...corporateInfo,
        corporateName: acrFacility.facility_name,
        legalEntityName: corporateInfo.legalEntityName || `${acrFacility.facility_name}, LLC`,
        billingAddress: corporateInfo.billingAddress || acrFacility.street_1,
        billingCity: corporateInfo.billingCity || acrFacility.city,
        billingState: corporateInfo.billingState || acrFacility.state,
        billingZip: corporateInfo.billingZip || acrFacility.zip_code,
        primaryContactPhone: corporateInfo.primaryContactPhone || formatPhoneNumber(acrFacility.phone_number)
      };
      setCorporateInfo(updatedCorporateInfo);
      
      // Show completion modal for single practice
      setShowSinglePracticeCompletion(true);
    }
    
    setSelectedFacilities([...selectedFacilities, newFacility]);
    setSearchTerm('');
    setSearchResults([]);
  };

  // Add manual facility
  const addManualFacility = () => {
    if (manualFormData.name && manualFormData.address && manualFormData.phone) {
      const newFacility = {
        id: Date.now(),
        name: manualFormData.name,
        address: `${manualFormData.address}, ${manualFormData.city}, ${manualFormData.state} ${manualFormData.zipCode}`,
        phone: formatPhoneNumber(manualFormData.phone),
        modality: manualFormData.modality || 'Not specified',
        acrVerified: false,
        isManual: true,
        isPrimary: selectedFacilities.length === 0
      };
      
      setSelectedFacilities([...selectedFacilities, newFacility]);
      setManualFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        modality: ''
      });
      setShowManualEntry(false);
    }
  };

  // Delete facility
  const deleteFacility = (id) => {
    const facilityToDelete = selectedFacilities.find(f => f.id === id);
    if (facilityToDelete?.isPrimary && selectedFacilities.length > 1) {
      const remaining = selectedFacilities.filter(f => f.id !== id);
      remaining[0].isPrimary = true;
      setSelectedFacilities(remaining);
    } else {
      setSelectedFacilities(selectedFacilities.filter(f => f.id !== id));
    }
  };

  // Set primary facility
  const setPrimary = (id) => {
    setSelectedFacilities(selectedFacilities.map(f => ({
      ...f,
      isPrimary: f.id === id
    })));
  };

  // Enhanced validation for corporate info based on organization type
  const validateCorporateInfoSmart = (corporateInfo) => {
    if (corporateInfo.organizationType === 'single') {
      // For single practice, we need minimal info
      const required = [
        'corporateName',
        'primaryContactName',
        'primaryContactEmail',
        'taxId'
      ];
      return required.every(field => 
        corporateInfo[field] && corporateInfo[field].trim() !== '' && corporateInfo[field] !== 'Pending Facility Selection'
      );
    } else {
      // For multi-location, we need complete info
      const required = [
        'corporateName',
        'legalEntityName', 
        'taxId',
        'primaryContactName',
        'primaryContactEmail',
        'organizationType'
      ];
      return required.every(field => 
        corporateInfo[field] && corporateInfo[field].trim() !== ''
      );
    }
  };
  const saveFacilityData = async () => {
    if (!window.USRadUser?.user?.id) {
      alert('Please log in to save your facility selection.');
      return false;
    }

    if (!validateCorporateInfo(corporateInfo)) {
      alert('Please complete all required corporate information.');
      return false;
    }

    if (selectedFacilities.length === 0) {
      alert('Please select at least one facility.');
      return false;
    }

    try {
      const success = await saveFacilitySelection(
        window.USRadUser.user.id,
        corporateInfo,
        selectedFacilities
      );

      if (success) {
        // Update user progress in window.USRadUser if available
        if (window.USRadUser?.updateUserMetadata) {
          await window.USRadUser.updateUserMetadata({
            facilities_configured: true,
            onboarding_progress: 60
          });
        }
        return true;
      } else {
        alert('Error saving facility data. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error saving facility data:', error);
      alert('Error saving facility data. Please try again.');
      return false;
    }
  };

  // Bulk upload processing
  const processBulkUpload = () => {
    const lines = csvData.trim().split('\n');
    const newFacilities = lines.map((line, index) => {
      const [name, address, phone] = line.split(',').map(s => s.trim());
      return {
        id: Date.now() + index,
        name: name || `Facility ${index + 1}`,
        address: address || '',
        phone: phone || '',
        modality: 'Unknown',
        acrVerified: false,
        isPrimary: false
      };
    }).filter(f => f.name && f.address);

    if (newFacilities.length > 0) {
      setSelectedFacilities([...selectedFacilities, ...newFacilities]);
      setCsvData('');
      setShowBulkUpload(false);
    }
  };

  // Download CSV template
  const downloadTemplate = () => {
    const template = `Facility Name,Address,Phone
Example Imaging Center,123 Main St City ST 12345,(555) 123-4567
Another Location,456 Oak Ave City ST 12345,(555) 234-5678`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'facility_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // PSA Preview Step
  if (step === 'preview') {
    const primaryFacility = selectedFacilities.find(f => f.isPrimary);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PSA Exhibit B Preview</h1>
          <p className="text-gray-600">Review how your facilities will appear in the Provider Service Agreement</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">EXHIBIT B: PROVIDER LOCATIONS</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Corporate Entity:</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-medium text-blue-900 mb-2">{corporateInfo.corporateName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <div>
                  <p className="text-blue-700 mb-1"><strong>Legal Entity:</strong> {corporateInfo.legalEntityName}</p>
                  <p className="text-blue-700 mb-1"><strong>Tax ID:</strong> {corporateInfo.taxId}</p>
                  <p className="text-blue-700"><strong>Organization Type:</strong> {corporateInfo.organizationType.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-blue-700 mb-1"><strong>Authorized Signer:</strong> {corporateInfo.primaryContactName}</p>
                  <p className="text-blue-700 mb-1"><strong>Title:</strong> {corporateInfo.primaryContactTitle}</p>
                  <p className="text-blue-700 mb-1"><strong>Email:</strong> {corporateInfo.primaryContactEmail}</p>
                  <p className="text-blue-700"><strong>Phone:</strong> {corporateInfo.primaryContactPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Contact Facility:</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <p className="text-lg font-medium">{primaryFacility?.name}</p>
                {primaryFacility?.acrVerified && (
                  <div className="ml-3 flex items-center bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    <Shield className="w-4 h-4 mr-1" />
                    ACR Verified
                  </div>
                )}
              </div>
              <p className="text-base text-gray-600 mb-1">Phone: {primaryFacility?.phone}</p>
              <p className="text-base text-gray-600 mb-1">Address: {primaryFacility?.address}</p>
              {primaryFacility?.modality && (
                <p className="text-base text-gray-600">Modality: {primaryFacility.modality}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Authorized Facilities:</h3>
            <div className="space-y-3">
              {selectedFacilities.map((facility, index) => (
                <div key={facility.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg font-medium text-gray-700 mr-4 min-w-[40px]">{index + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-medium">{facility.name}</span>
                      {facility.isPrimary && (
                        <span className="ml-3 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                      {facility.acrVerified && (
                        <div className="ml-3 flex items-center bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                          <Shield className="w-4 h-4 mr-1" />
                          ACR
                        </div>
                      )}
                      {facility.isManual && (
                        <div className="ml-3 flex items-center bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full">
                          <Edit3 className="w-4 h-4 mr-1" />
                          Manual Entry
                        </div>
                      )}
                    </div>
                    <p className="text-base text-gray-600 mb-1">{facility.address}</p>
                    <p className="text-base text-gray-600 mb-1">Phone: {facility.phone}</p>
                    {facility.modality && facility.modality !== 'Unknown' && (
                      <p className="text-base text-gray-600">Modality: {facility.modality}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 text-base text-gray-600 space-y-1">
            <p><strong>Corporate Entity:</strong> {corporateInfo.corporateName}</p>
            <p><strong>Legal Entity Name:</strong> {corporateInfo.legalEntityName}</p>
            <p><strong>Tax ID:</strong> {corporateInfo.taxId}</p>
            <p><strong>Total Authorized Locations:</strong> {selectedFacilities.length}</p>
            <p><strong>ACR Verified Facilities:</strong> {selectedFacilities.filter(f => f.acrVerified).length}</p>
            <p><strong>Generated:</strong> {new Date().toISOString().split('T')[0]}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={() => setStep('search')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Edit
          </button>
          <button 
            onClick={async () => {
              const saved = await saveFacilityData();
              if (saved) {
                setStep('complete');
              }
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save & Continue to PSA →
          </button>
        </div>
      </div>
    );
  }

  // Completion Step with improved UX
  if (step === 'complete') {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Facilities Configured!</h2>
          <p className="text-lg text-gray-600 mb-2">
            Your {selectedFacilities.length} location{selectedFacilities.length !== 1 ? 's' : ''} have been added to your PSA.
          </p>
          <p className="text-base text-gray-500 mb-8">
            {selectedFacilities.filter(f => f.acrVerified).length} facilities are ACR-verified and pre-validated.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={async () => {
                // Save with user feedback and wait for completion
                const saved = await saveFacilityData(true);
                if (saved) {
                  // Add a small delay to ensure save is complete
                  setTimeout(() => {
                    window.location.href = '/dashboard';
                  }, 500);
                }
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Save & Continue Later
            </button>
            <button 
              onClick={async () => {
                // Save with user feedback and wait for completion
                const saved = await saveFacilityData(true);
                if (saved) {
                  // Add a small delay to ensure save is complete
                  setTimeout(() => {
                    window.location.href = '/dashboard/onboarding/psa';
                  }, 500);
                }
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to PSA Signing →
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Your progress is automatically saved.</strong> You can return anytime to review or modify your facility setup before signing the PSA.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Search & Management Interface
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization & Facility Setup</h1>
        <p className="text-gray-600">
          Configure your corporate entity and search our database of <span className="font-semibold text-blue-600">30,000+ ACR-accredited</span> imaging centers
        </p>
      </div>

      {/* Corporate Information Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Corporate Information</h3>
            <p className="text-sm text-gray-600">Legal entity that will sign the Provider Service Agreement</p>
          </div>
          <button
            onClick={() => setShowCorporateForm(true)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              corporateInfo.corporateName 
                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {corporateInfo.corporateName ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1 inline" />
                Edit Corporate Info
              </>
            ) : (
              <>
                <Building className="w-4 h-4 mr-1 inline" />
                Add Corporate Info
              </>
            )}
          </button>
        </div>

        {corporateInfo.corporateName ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{corporateInfo.corporateName}</h4>
                <p className="text-sm text-gray-600">Legal Entity: {corporateInfo.legalEntityName}</p>
                <p className="text-sm text-gray-600">Tax ID: {corporateInfo.taxId}</p>
                <p className="text-sm text-gray-600">Type: {corporateInfo.organizationType.toUpperCase()}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Primary Contact</h5>
                <p className="text-sm text-gray-600">{corporateInfo.primaryContactName}</p>
                <p className="text-sm text-gray-600">{corporateInfo.primaryContactTitle}</p>
                <p className="text-sm text-gray-600">{corporateInfo.primaryContactEmail}</p>
                <p className="text-sm text-gray-600">{corporateInfo.primaryContactPhone}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="mb-2">Corporate information required</p>
            <p className="text-sm">Add your organization details to proceed with facility setup</p>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{selectedFacilities.length}</p>
              <p className="text-blue-700 text-sm">Selected Locations</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">{corporateInfo.corporateName ? '1' : '0'}</p>
              <p className="text-green-700 text-sm">Corporate Entity</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">
                {selectedFacilities.filter(f => f.acrVerified).length}
              </p>
              <p className="text-green-700 text-sm">ACR Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-orange-900">
                {selectedFacilities.length > 0 && corporateInfo.corporateName ? 'Ready' : 'Pending'}
              </p>
              <p className="text-orange-700 text-sm">For PSA</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACR Search Interface - Show if corporate info OR single practice with pending info */}
      {(corporateInfo.corporateName && corporateInfo.corporateName !== 'Pending Facility Selection') || 
       (corporateInfo.organizationType === 'single' && corporateInfo.corporateName === 'Pending Facility Selection') ? (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Search ACR Database</h3>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recommended</span>
            </div>
            <button
              onClick={() => setShowManualEntry(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-1 inline" />
              Add Manually
            </button>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              placeholder="Start typing facility name, city, or state..."
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
            {isSearching && (
              <div className="absolute right-3 top-4">
                <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Found {searchResults.length} ACR-accredited facilities:
              </h4>
              {searchResults.map((facility) => (
                <div 
                  key={facility.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => addFromAcr(facility)}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h5 className="font-medium text-gray-900">{facility.facility_name}</h5>
                      <div className="ml-2 flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        <Shield className="w-3 h-3 mr-1" />
                        ACR Verified
                      </div>
                      {facility.modality && (
                        <div className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {facility.modality}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {facility.street_1}, {facility.city}, {facility.state} {facility.zip_code}
                      <Phone className="w-4 h-4 ml-4 mr-1" />
                      {formatPhoneNumber(facility.phone_number)}
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Plus className="w-4 h-4 mr-1 inline" />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchTerm && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No facilities found for "{searchTerm}"</p>
              <p className="text-sm mb-4">Try searching by facility name, city, or state</p>
              <button
                onClick={() => {
                  setShowManualEntry(true);
                  setManualFormData({
                    ...manualFormData,
                    name: searchTerm
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1 inline" />
                Add "{searchTerm}" Manually
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Corporate Information Required</h3>
          <p className="text-yellow-700 mb-4">
            Please complete your corporate information before adding facilities.
          </p>
          <button
            onClick={() => setShowCorporateForm(true)}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Building className="w-4 h-4 mr-1 inline" />
            Add Corporate Information
          </button>
        </div>
      )}

      {/* Bulk Upload Option */}
      {selectedFacilities.length >= 3 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800">Have many locations?</h4>
              <p className="text-yellow-700 text-sm mt-1">
                Save time by uploading a CSV file with all your facility information.
              </p>
              <div className="mt-3 space-x-3">
                <button 
                  onClick={() => setShowBulkUpload(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                >
                  <Upload className="w-4 h-4 mr-2 inline" />
                  Bulk Upload
                </button>
                <button 
                  onClick={downloadTemplate}
                  className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors text-sm"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Facilities List */}
      {selectedFacilities.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Selected Locations</h3>
            <span className="text-sm text-gray-500">
              {selectedFacilities.length} location{selectedFacilities.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-3">
            {selectedFacilities.map((facility) => (
              <div key={facility.id} className={`p-4 rounded-lg border ${facility.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium text-gray-900">{facility.name}</h4>
                      {facility.isPrimary && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Primary Contact
                        </span>
                      )}
                      {facility.acrVerified && (
                        <div className="ml-2 flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          <Shield className="w-3 h-3 mr-1" />
                          ACR Verified
                        </div>
                      )}
                      {facility.isManual && (
                        <div className="ml-2 flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          <Edit3 className="w-3 h-3 mr-1" />
                          Manual Entry
                        </div>
                      )}
                      {facility.modality && facility.modality !== 'Unknown' && (
                        <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {facility.modality}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      {facility.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {facility.phone}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!facility.isPrimary && (
                      <button 
                        onClick={() => setPrimary(facility.id)}
                        className="px-3 py-1 text-xs border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        Make Primary
                      </button>
                    )}
                    <button 
                      onClick={() => deleteFacility(facility.id)}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Practice Quick Completion Modal */}
      {showSinglePracticeCompletion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-xl font-semibold">Great! Your Facility is Added</h3>
                <p className="text-sm text-gray-600">Just need a few more details to complete your setup</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Auto-Populated from ACR Database:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700"><strong>Business Name:</strong> {corporateInfo.corporateName}</p>
                  <p className="text-blue-700"><strong>Address:</strong> {corporateInfo.billingAddress}, {corporateInfo.billingCity}, {corporateInfo.billingState}</p>
                </div>
                <div>
                  <p className="text-blue-700"><strong>Phone:</strong> {corporateInfo.primaryContactPhone}</p>
                  <p className="text-blue-700"><strong>Legal Entity:</strong> {corporateInfo.legalEntityName}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={corporateInfo.primaryContactName}
                  onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dr. John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={corporateInfo.primaryContactTitle}
                  onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Owner, Medical Director"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={corporateInfo.primaryContactEmail}
                  onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., john@yourfacility.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Federal Tax ID (EIN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={corporateInfo.taxId}
                  onChange={(e) => setCorporateInfo({...corporateInfo, taxId: formatEIN(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 12-3456789"
                  maxLength="10"
                />
                <p className="text-xs text-gray-500 mt-1">9 digits required</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Entity Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={corporateInfo.legalEntityName}
                onChange={(e) => setCorporateInfo({...corporateInfo, legalEntityName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Your Facility Name, LLC"
              />
              <p className="text-xs text-gray-500 mt-1">Exact legal name as it appears on tax documents (can be different from business name)</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowSinglePracticeCompletion(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                I'll Complete This Later
              </button>
              <button 
                onClick={() => {
                  setShowSinglePracticeCompletion(false);
                  // Optionally auto-navigate to preview if everything is complete
                  if (validateCorporateInfoSmart(corporateInfo)) {
                    setTimeout(() => setStep('preview'), 500);
                  }
                }}
                disabled={!validateCorporateInfoSmart(corporateInfo)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4 mr-1 inline" />
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Information Form Modal */}
      {showCorporateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Corporate Information</h3>
                <p className="text-sm text-gray-600">Legal entity information for Provider Service Agreement</p>
              </div>
              <button 
                onClick={() => setShowCorporateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Organization Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Organization Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    value: 'single', 
                    label: 'Single Practice', 
                    desc: 'Independent facility - you are both the owner and operator',
                    icon: '🏥',
                    subtext: 'Corporate entity = Operating facility'
                  },
                  { 
                    value: 'corporation', 
                    label: 'Multi-Location', 
                    desc: 'Corporate entity with multiple imaging centers',
                    icon: '🏢',
                    subtext: 'Separate corporate office + facilities'
                  }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setCorporateInfo({...corporateInfo, organizationType: type.value})}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      corporateInfo.organizationType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <div className="font-medium">{type.label}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{type.desc}</div>
                    <div className="text-xs text-gray-500 font-medium">{type.subtext}</div>
                  </button>
                ))}
              </div>
              
              {corporateInfo.organizationType === 'single' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">Single Practice Setup</h4>
                      <p className="text-green-700 text-sm">
                        For single practices, you can either fill out this corporate information first, OR skip this and go directly to facility selection. When you add your facility from our ACR database, it will auto-populate most of this information for you.
                      </p>
                      <button
                        onClick={() => {
                          setShowCorporateForm(false);
                          // Set minimal info to allow facility search
                          setCorporateInfo({
                            ...corporateInfo,
                            organizationType: 'single',
                            corporateName: 'Pending Facility Selection'
                          });
                        }}
                        className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Skip & Go to Facility Selection →
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {corporateInfo.organizationType === 'corporation' && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <Building className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Multi-Location Corporate Setup</h4>
                      <p className="text-blue-700 text-sm">
                        You'll first enter your corporate headquarters information (legal entity, CEO, billing address), then add each of your imaging facility locations. The corporate entity will sign the PSA on behalf of all facilities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Corporate Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Corporate Details</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {corporateInfo.organizationType === 'single' ? 'Practice/Business Name' : 'Corporate/Business Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.corporateName}
                    onChange={(e) => setCorporateInfo({...corporateInfo, corporateName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={corporateInfo.organizationType === 'single' ? 'e.g., Smith Imaging Center' : 'e.g., Advanced Imaging Network LLC'}
                  />
                  {corporateInfo.organizationType === 'single' && (
                    <p className="text-xs text-gray-500 mt-1">This will be both your business name and facility name</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Entity Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.legalEntityName}
                    onChange={(e) => setCorporateInfo({...corporateInfo, legalEntityName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={corporateInfo.organizationType === 'single' ? 'e.g., Smith Imaging Center, LLC' : 'e.g., Advanced Imaging Network, LLC'}
                  />
                  <p className="text-xs text-gray-500 mt-1">Exact legal name as it appears on tax documents</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Federal Tax ID (EIN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.taxId}
                    onChange={(e) => setCorporateInfo({...corporateInfo, taxId: formatEIN(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 12-3456789"
                    maxLength="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">9 digits required (XX-XXXXXXX format)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signing Authority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={corporateInfo.signingAuthority}
                    onChange={(e) => setCorporateInfo({...corporateInfo, signingAuthority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select signing authority</option>
                    <option value="owner">Owner</option>
                    <option value="ceo">CEO</option>
                    <option value="president">President</option>
                    <option value="coo">COO</option>
                    <option value="managing_partner">Managing Partner</option>
                    <option value="authorized_representative">Authorized Representative</option>
                  </select>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  {corporateInfo.organizationType === 'single' ? 'Owner/Practice Contact' : 'Corporate Executive / Authorized Signer'}
                </h4>
                {corporateInfo.organizationType === 'single' && (
                  <p className="text-sm text-gray-600">As the practice owner, you will sign the PSA and be the primary contact.</p>
                )}
                {corporateInfo.organizationType === 'corporation' && (
                  <p className="text-sm text-gray-600">Corporate executive authorized to sign agreements on behalf of all facilities.</p>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.primaryContactName}
                    onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.primaryContactTitle}
                    onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., CEO, Medical Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={corporateInfo.primaryContactEmail}
                    onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., john.smith@advancedimaging.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.primaryContactPhone}
                    onChange={(e) => setCorporateInfo({...corporateInfo, primaryContactPhone: formatPhoneInput(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                    maxLength="14"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">
                {corporateInfo.organizationType === 'single' ? 'Business Address' : 'Corporate Headquarters Address'}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {corporateInfo.organizationType === 'single' 
                  ? 'Your practice address (can be the same as your facility address)' 
                  : 'Corporate billing and administrative address'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.billingAddress}
                    onChange={(e) => setCorporateInfo({...corporateInfo, billingAddress: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Corporate Plaza"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.billingCity}
                    onChange={(e) => setCorporateInfo({...corporateInfo, billingCity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Miami"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={corporateInfo.billingState}
                    onChange={(e) => setCorporateInfo({...corporateInfo, billingState: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="NY">New York</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={corporateInfo.billingZip}
                    onChange={(e) => setCorporateInfo({...corporateInfo, billingZip: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="33101"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button 
                onClick={() => setShowCorporateForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowCorporateForm(false)}
                disabled={!corporateInfo.corporateName || !corporateInfo.legalEntityName || !corporateInfo.taxId || !corporateInfo.primaryContactName || !corporateInfo.primaryContactEmail}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-1 inline" />
                Save Corporate Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Add Facility Manually</h3>
                <p className="text-sm text-gray-600">For facilities not in our ACR database</p>
              </div>
              <button 
                onClick={() => setShowManualEntry(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Manual Entry Notice</h4>
                  <p className="text-yellow-700 text-sm">
                    This facility will not have ACR verification. We recommend ensuring the facility meets your quality standards before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facility Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualFormData.name}
                  onChange={(e) => setManualFormData({...manualFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Springfield Imaging Center"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualFormData.address}
                  onChange={(e) => setManualFormData({...manualFormData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 123 Medical Plaza Drive"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualFormData.city}
                  onChange={(e) => setManualFormData({...manualFormData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Springfield"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={manualFormData.state}
                  onChange={(e) => setManualFormData({...manualFormData, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  <option value="FL">Florida</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="NY">New York</option>
                  <option value="GA">Georgia</option>
                  <option value="NC">North Carolina</option>
                  <option value="SC">South Carolina</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualFormData.zipCode}
                  onChange={(e) => setManualFormData({...manualFormData, zipCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={manualFormData.phone}
                  onChange={(e) => setManualFormData({...manualFormData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Modality (Optional)
                </label>
                <select
                  value={manualFormData.modality}
                  onChange={(e) => setManualFormData({...manualFormData, modality: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Primary Modality</option>
                  <option value="MRI">MRI</option>
                  <option value="CT">CT Scan</option>
                  <option value="X-RAY">X-Ray</option>
                  <option value="ULTRASOUND">Ultrasound</option>
                  <option value="MAMMOGRAPHY">Mammography</option>
                  <option value="PET">PET Scan</option>
                  <option value="NUCLEAR">Nuclear Medicine</option>
                  <option value="MULTIPLE">Multiple Modalities</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowManualEntry(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={addManualFacility}
                disabled={!manualFormData.name || !manualFormData.address || !manualFormData.city || !manualFormData.state || !manualFormData.zipCode || !manualFormData.phone}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 mr-1 inline" />
                Add Facility
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Upload Facilities</h3>
              <button 
                onClick={() => setShowBulkUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Paste CSV data with format: Name, Address, Phone (one per line)
            </p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
              placeholder="Facility Name,123 Main St City ST 12345,(555) 123-4567"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button 
                onClick={() => setShowBulkUpload(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={processBulkUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload {csvData.trim().split('\n').length} Locations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <button 
          onClick={async () => {
            const saved = await saveFacilityData();
            if (saved) {
              setStep('preview');
            }
          }}
          disabled={selectedFacilities.length === 0 || !validateCorporateInfoSmart(corporateInfo)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Preview PSA Exhibit B →
        </button>
      </div>
    </div>
  );
};

export default FacilityManager;