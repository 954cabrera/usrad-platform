import React, { useState, useEffect } from 'react';
import { 
  User, Building, MapPin, Phone, Mail, Globe, Shield, Award, 
  CheckCircle, Clock, TrendingUp, Edit3, Save, X, AlertCircle,
  Building2, FileText, Users, Camera, Download, Eye, EyeOff,
  Star, Zap, ArrowRight, MoreVertical
} from 'lucide-react';
import { supabase } from '../../lib/supabase.js';
import { 
  formatPhoneNumber, 
  formatEIN, 
  validateEmail, 
  validateRequired,
  getCurrentUser,
  loadFacilityConfiguration
} from '../../lib/facilityManager.js';

const ProfileSettings = () => {
  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingCorporate, setIsEditingCorporate] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  // User Data State
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    createdAt: ''
  });
  
  // Profile Data State
  const [profileData, setProfileData] = useState({
    psaSigned: false,
    psaSignedAt: null,
    onboardingProgress: 40,
    networkAccessLevel: 'basic',
    centerName: '',
    companyName: ''
  });
  
  // Corporate Info State
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
  
  // Facilities State
  const [facilities, setFacilities] = useState([]);
  
  // Temporary Edit States
  const [editPersonal, setEditPersonal] = useState({});
  const [editCorporate, setEditCorporate] = useState({});
  
  // Show/Hide sensitive data
  const [showEIN, setShowEIN] = useState(false);

  // Load all user data on mount
  useEffect(() => {
    loadAllUserData();
  }, []);

  const loadAllUserData = async () => {
    setIsLoading(true);
    try {
      // Get current user with enhanced data
      const user = await getCurrentUser();
      if (!user) {
        console.error('No authenticated user');
        setIsLoading(false);
        return;
      }

      // Set basic user data
      setUserData({
        id: user.id,
        email: user.email || '',
        fullName: user.profile?.full_name || '',
        firstName: user.profile?.full_name?.split(' ')[0] || '',
        lastName: user.profile?.full_name?.split(' ').slice(1).join(' ') || '',
        phone: user.profile?.phone || '',
        role: user.profile?.role || 'imaging_center',
        createdAt: user.created_at || ''
      });

      // Set profile data
      setProfileData({
        psaSigned: user.profile?.psa_signed || false,
        psaSignedAt: user.profile?.psa_signed_at || null,
        onboardingProgress: user.profile?.onboarding_progress || 40,
        networkAccessLevel: user.profile?.network_access_level || 'basic',
        centerName: user.profile?.center_name || '',
        companyName: user.profile?.company_name || ''
      });

      // Load facility configuration
      const facilityConfig = await loadFacilityConfiguration(user.id);
      
      if (facilityConfig.success) {
        // Set corporate info if exists
        if (facilityConfig.corporateInfo) {
          setCorporateInfo({
            legalName: facilityConfig.corporateInfo.legal_name || '',
            legalEntityName: facilityConfig.corporateInfo.legal_entity_name || '',
            taxId: facilityConfig.corporateInfo.tax_id || '',
            signerName: facilityConfig.corporateInfo.signer_name || '',
            signerTitle: facilityConfig.corporateInfo.signer_title || '',
            email: facilityConfig.corporateInfo.email || '',
            phone: facilityConfig.corporateInfo.phone || '',
            corporateAddress: facilityConfig.corporateInfo.corporate_address || '',
            corporateCity: facilityConfig.corporateInfo.corporate_city || '',
            corporateState: facilityConfig.corporateInfo.corporate_state || '',
            corporateZip: facilityConfig.corporateInfo.corporate_zip || '',
            website: facilityConfig.corporateInfo.website || '',
            organizationType: facilityConfig.corporateInfo.organization_type || ''
          });
        }

        // Set facilities if exists
        if (facilityConfig.facilities && facilityConfig.facilities.length > 0) {
          setFacilities(facilityConfig.facilities);
        }
      }

      // Initialize edit states
      setEditPersonal({
        fullName: user.profile?.full_name || '',
        phone: user.profile?.phone || ''
      });

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save personal info
  const savePersonalInfo = async () => {
    setIsSaving(true);
    setSaveMessage('');
    setErrors({});

    try {
      // Validate
      const newErrors = {};
      if (!validateRequired(editPersonal.fullName)) {
        newErrors.fullName = 'Full name is required';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSaving(false);
        return;
      }

      // Update user profile
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: editPersonal.fullName,
          phone: editPersonal.phone,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userData.id);

      if (error) throw error;

      // Update local state
      setUserData(prev => ({
        ...prev,
        fullName: editPersonal.fullName,
        firstName: editPersonal.fullName.split(' ')[0] || '',
        lastName: editPersonal.fullName.split(' ').slice(1).join(' ') || '',
        phone: editPersonal.phone
      }));

      setIsEditingPersonal(false);
      setSaveMessage('✅ Personal information updated successfully!');
    } catch (error) {
      console.error('Error saving personal info:', error);
      setSaveMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Save corporate info
  const saveCorporateInfo = async () => {
    setIsSaving(true);
    setSaveMessage('');
    setErrors({});

    try {
      // Validate
      const newErrors = {};
      if (!validateRequired(editCorporate.legalName)) {
        newErrors.legalName = 'Legal name is required';
      }
      if (!validateRequired(editCorporate.taxId)) {
        newErrors.taxId = 'Tax ID is required';
      }
      if (editCorporate.email && !validateEmail(editCorporate.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSaving(false);
        return;
      }

      // Update corporate entity
      const { error } = await supabase
        .from('corporate_entities')
        .upsert({
          user_id: userData.id,
          legal_name: editCorporate.legalName,
          legal_entity_name: editCorporate.legalEntityName || editCorporate.legalName,
          tax_id: editCorporate.taxId,
          signer_name: editCorporate.signerName,
          signer_title: editCorporate.signerTitle,
          email: editCorporate.email,
          phone: editCorporate.phone,
          corporate_address: editCorporate.corporateAddress,
          corporate_city: editCorporate.corporateCity,
          corporate_state: editCorporate.corporateState,
          corporate_zip: editCorporate.corporateZip,
          website: editCorporate.website,
          organization_type: editCorporate.organizationType,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Update local state
      setCorporateInfo(editCorporate);
      setIsEditingCorporate(false);
      setSaveMessage('✅ Corporate information updated successfully!');
    } catch (error) {
      console.error('Error saving corporate info:', error);
      setSaveMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Cancel editing
  const cancelPersonalEdit = () => {
    setEditPersonal({
      fullName: userData.fullName,
      phone: userData.phone
    });
    setIsEditingPersonal(false);
    setErrors({});
  };

  const cancelCorporateEdit = () => {
    setEditCorporate(corporateInfo);
    setIsEditingCorporate(false);
    setErrors({});
  };

  // Get network status color and label
  const getNetworkStatus = () => {
    if (profileData.networkAccessLevel === 'enterprise') {
      return { color: 'purple', label: 'Enterprise', icon: Zap };
    } else if (profileData.networkAccessLevel === 'premium' || profileData.psaSigned) {
      return { color: 'green', label: 'Premium', icon: Star };
    }
    return { color: 'gray', label: 'Basic', icon: Shield };
  };

  const networkStatus = getNetworkStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600 text-lg">Manage your account and organization information</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Network Status Badge */}
              <div className={`flex items-center px-6 py-3 rounded-2xl bg-${networkStatus.color}-100 border-2 border-${networkStatus.color}-200`}>
                <networkStatus.icon className={`h-5 w-5 text-${networkStatus.color}-600 mr-2`} />
                <span className={`font-bold text-${networkStatus.color}-700`}>{networkStatus.label} Network</span>
              </div>
              
              {/* Progress Indicator */}
              <div className="text-center">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {profileData.onboardingProgress}%
                </div>
                <div className="text-xs text-gray-500 font-semibold">COMPLETE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 px-6 py-4 rounded-2xl text-center font-medium ${
            saveMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Personal & Status */}
          <div className="lg:col-span-1 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                </div>
                {!isEditingPersonal ? (
                  <button
                    onClick={() => {
                      setEditPersonal({
                        fullName: userData.fullName,
                        phone: userData.phone
                      });
                      setIsEditingPersonal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit3 className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={cancelPersonalEdit}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={savePersonalInfo}
                      disabled={isSaving}
                      className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {isEditingPersonal ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={editPersonal.fullName}
                        onChange={(e) => setEditPersonal({...editPersonal, fullName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editPersonal.phone}
                        onChange={(e) => setEditPersonal({...editPersonal, phone: formatPhoneNumber(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(XXX) XXX-XXXX"
                        maxLength={14}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-gray-900">{userData.fullName || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{userData.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-semibold text-gray-900 capitalize">{userData.role.replace('_', ' ')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Account Status</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-3 ${profileData.psaSigned ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="font-medium text-gray-700">PSA Agreement</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    profileData.psaSigned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {profileData.psaSigned ? 'Signed' : 'Pending'}
                  </span>
                </div>

                {profileData.psaSignedAt && (
                  <div className="text-sm text-gray-500">
                    Signed on {new Date(profileData.psaSignedAt).toLocaleDateString()}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Onboarding Progress</span>
                    <span className="text-sm font-bold text-gray-900">{profileData.onboardingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${profileData.onboardingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Corporate & Facilities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Corporate Information */}
            {corporateInfo.legalName && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Corporate Information</h2>
                      <p className="text-sm text-gray-600">
                        {corporateInfo.organizationType === 'single' ? 'Single Practice' : 'Multi-Location Corporate'}
                      </p>
                    </div>
                  </div>
                  {!isEditingCorporate ? (
                    <button
                      onClick={() => {
                        setEditCorporate(corporateInfo);
                        setIsEditingCorporate(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={cancelCorporateEdit}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <button
                        onClick={saveCorporateInfo}
                        disabled={isSaving}
                        className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {isEditingCorporate ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Legal Business Name *
                      </label>
                      <input
                        type="text"
                        value={editCorporate.legalName}
                        onChange={(e) => setEditCorporate({...editCorporate, legalName: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.legalName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.legalName && <p className="text-red-500 text-sm mt-1">{errors.legalName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        DBA Name
                      </label>
                      <input
                        type="text"
                        value={editCorporate.legalEntityName}
                        onChange={(e) => setEditCorporate({...editCorporate, legalEntityName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Federal Tax ID (EIN) *
                      </label>
                      <div className="relative">
                        <input
                          type={showEIN ? "text" : "password"}
                          value={editCorporate.taxId}
                          onChange={(e) => setEditCorporate({...editCorporate, taxId: formatEIN(e.target.value)})}
                          className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.taxId ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="XX-XXXXXXX"
                          maxLength={10}
                        />
                        <button
                          type="button"
                          onClick={() => setShowEIN(!showEIN)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showEIN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.taxId && <p className="text-red-500 text-sm mt-1">{errors.taxId}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Phone
                      </label>
                      <input
                        type="tel"
                        value={editCorporate.phone}
                        onChange={(e) => setEditCorporate({...editCorporate, phone: formatPhoneNumber(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(XXX) XXX-XXXX"
                        maxLength={14}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Email
                      </label>
                      <input
                        type="email"
                        value={editCorporate.email}
                        onChange={(e) => setEditCorporate({...editCorporate, email: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={editCorporate.website}
                        onChange={(e) => setEditCorporate({...editCorporate, website: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="www.yourwebsite.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Authorized Signer
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={editCorporate.signerName}
                          onChange={(e) => setEditCorporate({...editCorporate, signerName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Signer name"
                        />
                        <input
                          type="text"
                          value={editCorporate.signerTitle}
                          onChange={(e) => setEditCorporate({...editCorporate, signerTitle: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Title (e.g., CEO, President)"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Legal Name</p>
                      <p className="font-semibold text-gray-900">{corporateInfo.legalName}</p>
                    </div>
                    {corporateInfo.legalEntityName && corporateInfo.legalEntityName !== corporateInfo.legalName && (
                      <div>
                        <p className="text-sm text-gray-500">DBA Name</p>
                        <p className="font-semibold text-gray-900">{corporateInfo.legalEntityName}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Tax ID</p>
                      <p className="font-semibold text-gray-900">{corporateInfo.taxId || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Phone</p>
                      <p className="font-semibold text-gray-900">{corporateInfo.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Email</p>
                      <p className="font-semibold text-gray-900">{corporateInfo.email || 'Not set'}</p>
                    </div>
                    {corporateInfo.website && (
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="font-semibold text-gray-900">{corporateInfo.website}</p>
                      </div>
                    )}
                    {corporateInfo.signerName && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Authorized Signer</p>
                        <p className="font-semibold text-gray-900">
                          {corporateInfo.signerName}
                          {corporateInfo.signerTitle && ` - ${corporateInfo.signerTitle}`}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Facility Locations */}
            {facilities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Facility Locations</h2>
                      <p className="text-sm text-gray-600">{facilities.length} location{facilities.length > 1 ? 's' : ''} configured</p>
                    </div>
                  </div>
                  <a
                    href="/dashboard/onboarding/facilities"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Manage Facilities
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {facilities.map((facility, index) => (
                    <div
                      key={facility.id || index}
                      className={`p-6 rounded-xl border-2 ${
                        facility.is_primary 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900">{facility.facility_name}</h3>
                        <div className="flex items-center space-x-2">
                          {facility.is_acr_verified && (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="ml-1 text-xs text-green-600 font-medium">ACR</span>
                            </div>
                          )}
                          {facility.is_primary && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                              PRIMARY
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {facility.street_address}, {facility.city}, {facility.state} {facility.zip_code}
                        </p>
                        
                        {facility.phone_number && (
                          <p className="text-gray-600 flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {facility.phone_number}
                          </p>
                        )}

                        {facility.modalities && facility.modalities.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1">
                            {facility.modalities.map((modality) => (
                              <span key={modality} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {modality}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;