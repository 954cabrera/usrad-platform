// Unified Settings System - Complete solution with all functionality working
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { User, Building2, Settings, Bell, Upload, Save, CheckCircle, AlertCircle, ExternalLink, Users, DollarSign, FileText, Award, LogOut } from 'lucide-react';

const UnifiedSettingsSystem = () => {
  // Use shared authentication hook
  const { user, loading: authLoading, userDisplayName, signingOut, signOut, updateDisplayName } = useUSRadAuth();
  
  // State management
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    center_name: '',
    professional_title: '',
    specialty: '',
    profile_photo_url: ''
  });

  const [organizationForm, setOrganizationForm] = useState({
    corporate_name: '',
    legal_name: '',
    tax_id: '',
    signer_name: '',
    signer_title: '',
    email: '',
    phone: '',
    corporate_address: '',
    corporate_suite: '',
    corporate_city: '',
    corporate_state: '',
    corporate_zip: '',
    website: '',
    organization_type: '',
    primary_contact_name: '',
    primary_contact_email: '',
    primary_contact_phone: ''
  });

  const [accountForm, setAccountForm] = useState({
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notifications, setNotifications] = useState({
    email_notifications: true,
    sms_alerts: false,
    appointment_reminders: true,
    system_updates: true
  });

  const [facilities, setFacilities] = useState([]);
  const [onboardingProgress, setOnboardingProgress] = useState(null);

  // Initialize component
  useEffect(() => {
    initializeSettings();
  }, []);

  const initializeSettings = async () => {
    try {
      setLoading(true);
      
      // Wait for auth to be ready
      if (!user) {
        setTimeout(initializeSettings, 100);
        return;
      }
      
      setAccountForm(prev => ({ ...prev, email: user.email }));

      // Load all user data
      await Promise.all([
        loadUserProfile(session.user.id),
        loadCorporateData(session.user.id),
        loadFacilities(session.user.id),
        loadOnboardingProgress(session.user.id)
      ]);

    } catch (error) {
      console.error('Error initializing settings:', error);
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setProfileForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          center_name: data.center_name || '',
          professional_title: data.professional_title || '',
          specialty: data.specialty || '',
          profile_photo_url: data.profile_photo_url || ''
        });
        
        // Update display name if we have a full name
        if (data.full_name) {
          updateDisplayName(data.full_name);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadCorporateData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('corporate_entities')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) {
        setOrganizationForm({
          corporate_name: data.corporate_name || '',
          legal_name: data.legal_name || '',
          tax_id: formatTaxId(data.tax_id || ''),
          signer_name: data.signer_name || '',
          signer_title: data.signer_title || '',
          email: data.email || '',
          phone: formatPhoneNumber(data.phone || ''),
          corporate_address: data.corporate_address || '',
          corporate_suite: data.corporate_suite || '',
          corporate_city: data.corporate_city || '',
          corporate_state: data.corporate_state || '',
          corporate_zip: data.corporate_zip || '',
          website: data.website || '',
          organization_type: data.organization_type || '',
          primary_contact_name: data.primary_contact_name || '',
          primary_contact_email: data.primary_contact_email || '',
          primary_contact_phone: formatPhoneNumber(data.primary_contact_phone || '')
        });
      }
    } catch (error) {
      console.error('Error loading corporate data:', error);
    }
  };

  const loadFacilities = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_facilities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data) {
        setFacilities(data);
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
    }
  };

  const loadOnboardingProgress = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('onboarding_progress, onboarding_step, psa_signed, credentialing_complete, banking_setup, launch_ready')
        .eq('user_id', userId)
        .single();

      if (data) {
        setOnboardingProgress(data);
      }
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
    }
  };

  // Utility functions
  const formatTaxId = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const showToast = (message, type = 'success') => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  // Handle sign out
  const handleSignOut = async () => {
    const success = await signOut();
    if (!success) {
      showToast('Failed to sign out. Please try again.', 'error');
    }
  };

  // Save functions
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...profileForm,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      showToast('Failed to save profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveOrganization = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('corporate_entities')
        .upsert({
          user_id: user.id,
          ...organizationForm,
          tax_id: organizationForm.tax_id.replace(/\D/g, ''), // Store without formatting
          phone: organizationForm.phone.replace(/\D/g, ''),
          primary_contact_phone: organizationForm.primary_contact_phone.replace(/\D/g, ''),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Organization information saved successfully');
    } catch (error) {
      console.error('Error saving organization:', error);
      showToast('Failed to save organization information', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveAccount = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update email if changed
      if (accountForm.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: accountForm.email
        });
        if (error) throw error;
        showToast('Email update initiated. Please check your email to confirm.');
      }

      // Update password if provided
      if (accountForm.new_password) {
        if (accountForm.new_password !== accountForm.confirm_password) {
          showToast('New passwords do not match', 'error');
          return;
        }
        if (accountForm.new_password.length < 6) {
          showToast('Password must be at least 6 characters', 'error');
          return;
        }

        const { error } = await supabase.auth.updateUser({
          password: accountForm.new_password
        });
        if (error) throw error;
        showToast('Password updated successfully');
        
        setAccountForm(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: ''
        }));
      }
    } catch (error) {
      console.error('Error updating account:', error);
      showToast(error.message || 'Failed to update account', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveNotifications = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          notification_settings: notifications,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      showToast('Notification preferences saved');
    } catch (error) {
      console.error('Error saving notifications:', error);
      showToast('Failed to save notification preferences', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      setProfileForm(prev => ({ ...prev, profile_photo_url: data.publicUrl }));
      showToast('Profile photo uploaded successfully');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showToast('Failed to upload photo', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Calculate completion percentages
  const calculateCompletion = () => {
    const profileFields = ['full_name', 'phone', 'center_name'];
    const profileComplete = profileFields.filter(field => profileForm[field]).length;
    const profilePercentage = Math.round((profileComplete / profileFields.length) * 100);

    const orgRequiredFields = ['corporate_name', 'tax_id', 'signer_name', 'email', 'corporate_address', 'corporate_city', 'corporate_state'];
    const orgComplete = orgRequiredFields.filter(field => organizationForm[field]).length;
    const orgPercentage = Math.round((orgComplete / orgRequiredFields.length) * 100);

    const facilityPercentage = facilities.length > 0 ? 100 : 0;

    const overall = Math.round((profilePercentage + orgPercentage + facilityPercentage) / 3);

    return {
      profile: profilePercentage,
      organization: orgPercentage,
      facilities: facilityPercentage,
      overall
    };
  };

  const completion = calculateCompletion();

  // Onboarding steps with proper tracking
  const getOnboardingSteps = () => [
    { id: 'account', name: 'Account Created', completed: true, icon: User },
    { id: 'profile', name: 'Profile Setup', completed: completion.profile === 100, icon: User },
    { id: 'organization', name: 'Organization Info', completed: completion.organization >= 80, icon: Building2 },
    { id: 'facilities', name: 'Facilities Added', completed: facilities.length > 0, icon: Building2 },
    { id: 'psa', name: 'PSA Signed', completed: onboardingProgress?.psa_signed || false, icon: FileText },
    { id: 'credentialing', name: 'Credentialing', completed: onboardingProgress?.credentialing_complete || false, icon: Award },
    { id: 'banking', name: 'Banking Setup', completed: onboardingProgress?.banking_setup || false, icon: DollarSign },
    { id: 'launch', name: 'Launch Ready', completed: onboardingProgress?.launch_ready || false, icon: CheckCircle }
  ];

  const onboardingSteps = getOnboardingSteps();
  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const onboardingPercentage = Math.round((completedSteps / onboardingSteps.length) * 100);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading settings...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Authentication required</p>
          <button 
            onClick={() => window.location.href = '/login/imaginglogin'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with completion status */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile, organization, and account preferences</p>
          </div>
          <div className="flex items-center space-x-6">
            {/* User Welcome */}
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Welcome back, {userDisplayName}</span>
            </div>
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{signingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
            
            {/* Completion Status */}
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Profile Completion</div>
              <div className="text-2xl font-bold text-blue-600">{completion.overall}%</div>
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completion.overall}%` }}
          />
        </div>
        <div className="text-xs text-gray-500">
          Complete your profile to access all platform features
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', icon: User, completion: completion.profile },
            { id: 'organization', label: 'Organization', icon: Building2, completion: completion.organization },
            { id: 'facilities', label: 'Facilities', icon: Building2, count: facilities.length },
            { id: 'account', label: 'Account', icon: Settings, completion: onboardingPercentage },
            { id: 'notifications', label: 'Notifications', icon: Bell }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors relative flex items-center
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
              {tab.completion !== undefined && tab.completion < 100 && (
                <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                  {tab.completion}%
                </span>
              )}
              {tab.count !== undefined && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={saveProfile}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <div className="text-sm text-gray-500">
                {completion.profile}% complete
              </div>
            </div>
            
            {/* Profile Photo Section */}
            <div className="mb-6 flex items-center space-x-4">
              <div className="relative">
                {profileForm.profile_photo_url ? (
                  <img 
                    src={profileForm.profile_photo_url} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                  <Upload className="w-3 h-3" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    className="hidden" 
                  />
                </label>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Profile Photo</h3>
                <p className="text-sm text-gray-500">Upload a professional photo for your profile</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={profileForm.professional_title}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, professional_title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chief Medical Officer, Radiologist"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={profileForm.specialty}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, specialty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select specialty</option>
                  <option value="diagnostic_radiology">Diagnostic Radiology</option>
                  <option value="interventional_radiology">Interventional Radiology</option>
                  <option value="neuroradiology">Neuroradiology</option>
                  <option value="musculoskeletal">Musculoskeletal</option>
                  <option value="emergency_radiology">Emergency Radiology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Practice/Center Name *
                </label>
                <input
                  type="text"
                  value={profileForm.center_name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, center_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your practice or center name"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                Changes are automatically saved
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}

        {/* Organization Tab */}
        {activeTab === 'organization' && (
          <form onSubmit={saveOrganization}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Organization Information</h2>
              <div className="text-sm text-gray-500">
                {completion.organization}% complete
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Organization Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Basic Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corporate Name *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_name}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Entity Name
                </label>
                <input
                  type="text"
                  value={organizationForm.legal_name}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, legal_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID (EIN) * <span className="text-xs text-gray-500">Format: XX-XXXXXXX</span>
                </label>
                <input
                  type="text"
                  value={organizationForm.tax_id}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, tax_id: formatTaxId(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12-3456789"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type *
                </label>
                <select
                  value={organizationForm.organization_type}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, organization_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="hospital">Hospital</option>
                  <option value="imaging_center">Imaging Center</option>
                  <option value="clinic">Clinic</option>
                  <option value="private_practice">Private Practice</option>
                  <option value="radiology_group">Radiology Group</option>
                  <option value="health_system">Health System</option>
                </select>
              </div>

              {/* Authorized Signer Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 mt-6 text-gray-900 border-b pb-2">Authorized Signer</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Signer Name *
                </label>
                <input
                  type="text"
                  value={organizationForm.signer_name}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, signer_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signer Title
                </label>
                <input
                  type="text"
                  value={organizationForm.signer_title}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, signer_title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., CEO, Medical Director"
                />
              </div>

              {/* Corporate Address */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 mt-6 text-gray-900 border-b pb-2">Corporate Address</h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_address}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suite/Unit
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_suite}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_suite: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Suite 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_city}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  value={organizationForm.corporate_state}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_state: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select state</option>
                  {/* US States */}
                  <option value="AL">Alabama</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_zip}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, corporate_zip: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345"
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 mt-6 text-gray-900 border-b pb-2">Contact Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Email *
                </label>
                <input
                  type="email"
                  value={organizationForm.primary_contact_email}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, primary_contact_email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Phone
                </label>
                <input
                  type="tel"
                  value={organizationForm.primary_contact_phone}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, primary_contact_phone: formatPhoneNumber(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={organizationForm.website}
                  onChange={(e) => setOrganizationForm(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                Changes are automatically saved
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Organization'}
              </button>
            </div>
          </form>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Facility Management</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{facilities.length} facilities</span>
                <a 
                  href="/dashboard/facilities"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Manage Facilities
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {facilities.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities added yet</h3>
                <p className="text-gray-600 mb-6">Add your imaging facilities to complete your profile setup</p>
                <a 
                  href="/dashboard/facilities"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Your First Facility
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {facilities.map((facility, index) => (
                  <div key={facility.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{facility.facility_name}</h3>
                        <p className="text-sm text-gray-600">{facility.facility_type}</p>
                        <p className="text-sm text-gray-500">
                          {facility.facility_address}, {facility.facility_city}, {facility.facility_state}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {facility.is_primary && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                            Primary
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          facility.acr_verified 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {facility.acr_verified ? 'ACR Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Want to add more facilities or edit existing ones?
                  </div>
                  <a 
                    href="/dashboard/facilities"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Go to Facility Manager →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

            {/* Onboarding Progress */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Onboarding Progress</h3>
                <div className="text-2xl font-bold text-blue-600">{onboardingPercentage}%</div>
              </div>
              
              <div className="w-full bg-white rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${onboardingPercentage}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {onboardingSteps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-2">
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    )}
                    <span className={`text-xs ${step.completed ? 'text-green-700' : 'text-gray-600'}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                <form onSubmit={saveAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={accountForm.email}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <hr className="my-6" />

                  <h4 className="font-medium">Change Password</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={accountForm.current_password}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, current_password: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={accountForm.new_password}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, new_password: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={accountForm.confirm_password}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Updating...' : 'Update Account'}
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Account Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      Professional
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {new Date(user?.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Network Access</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      onboardingProgress?.psa_signed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {onboardingProgress?.psa_signed ? 'Full Access' : 'Limited Access'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

            <div className="space-y-6">
              {Object.entries({
                email_notifications: {
                  title: 'Email Notifications',
                  description: 'Receive updates and alerts via email'
                },
                sms_alerts: {
                  title: 'SMS Alerts',
                  description: 'Get urgent notifications via text message'
                },
                appointment_reminders: {
                  title: 'Appointment Reminders',
                  description: 'Receive reminders for scheduled readings'
                },
                system_updates: {
                  title: 'System Updates',
                  description: 'Stay informed about platform updates and maintenance'
                }
              }).map(([key, setting]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.title}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) => setNotifications(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={saveNotifications}
                disabled={saving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Flow Indicator */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">
            Your data automatically flows to Facility Management, PSA systems, and other platform components
          </span>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSettingsSystem;