// Enhanced Settings System with Auto-Population and Data Flow
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserDataFlow } from '@/hooks/useUserDataFlow';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { toast } from 'sonner';
import { LogOut, User as UserIcon } from 'lucide-react';

const EnhancedSettingsSystem = ({ initialUser, initialImagingCenter }) => {
  // Use shared authentication hook
  const { user, loading: authLoading, userDisplayName, signingOut, signOut, updateDisplayName } = useUSRadAuth();
  
  // Use our data flow manager
  const {
    userData,
    loading,
    saving,
    saveProfile,
    saveCorporateEntity,
    saveFacility,
    autoPopulateCorporateData,
    autoPopulateFacilityData,
    formatTaxId,
    formatPhoneNumber
  } = useUserDataFlow();

  // Tab management
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    center_name: ''
  });

  const [organizationForm, setOrganizationForm] = useState({
    corporate_name: '',
    legal_name: '',
    legal_entity_name: '',
    tax_id: '',
    signer_name: '',
    signer_title: '',
    email: '',
    phone: '',
    corporate_address: '',
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
    email: initialUser?.email || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    sms_alerts: false,
    appointment_reminders: true,
    system_updates: true
  });


  // Initialize forms with user data
  useEffect(() => {
    if (userData) {
      // Update profile form
      setProfileForm({
        full_name: userData.profile?.full_name || '',
        phone: userData.profile?.phone || '',
        center_name: userData.profile?.center_name || ''
      });

      // Update organization form
      setOrganizationForm(prev => ({
        ...prev,
        ...userData.corporate,
        tax_id: formatTaxId(userData.corporate?.tax_id || '')
      }));
      
      // Update display name if available
      if (userData.profile?.full_name) {
        updateDisplayName(userData.profile.full_name);
      }
    }
  }, [userData]);

  // Handle sign out
  const handleSignOut = async () => {
    const success = await signOut();
    if (!success) {
      toast.error('Failed to sign out. Please try again.');
    }
  };

  // Auto-save for profile
  const { triggerAutoSave: autoSaveProfile } = useAutoSave({
    onSave: async (data) => {
      return await saveProfile(data);
    },
    enabled: activeTab === 'profile'
  });

  // Auto-save for organization
  const { triggerAutoSave: autoSaveOrganization } = useAutoSave({
    onSave: async (data) => {
      return await saveCorporateEntity(data);
    },
    enabled: activeTab === 'organization'
  });

  // Handle profile form changes
  const handleProfileChange = (field, value) => {
    const updatedForm = { ...profileForm, [field]: value };
    setProfileForm(updatedForm);
    autoSaveProfile(updatedForm);
  };

  // Handle organization form changes
  const handleOrganizationChange = (field, value) => {
    // Special formatting for certain fields
    if (field === 'tax_id') {
      value = formatTaxId(value);
    } else if (field === 'phone' || field === 'primary_contact_phone') {
      value = formatPhoneNumber(value);
    }

    const updatedForm = { ...organizationForm, [field]: value };
    setOrganizationForm(updatedForm);
    autoSaveOrganization(updatedForm);
  };

  // Auto-populate organization data
  const handleAutoPopulateOrganization = async () => {
    const autoData = await autoPopulateCorporateData();
    if (autoData) {
      setOrganizationForm(prev => ({
        ...prev,
        ...autoData
      }));
      toast.success('Organization data auto-populated from your profile');
    }
  };

  // Save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const success = await saveProfile(profileForm);
    if (success) {
      // Data will auto-flow to other components via the data flow manager
    }
  };

  // Save organization
  const handleSaveOrganization = async (e) => {
    e.preventDefault();
    const success = await saveCorporateEntity(organizationForm);
    if (success) {
      // Data will auto-flow to facility management
    }
  };

  // Save account settings
  const handleSaveAccount = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (accountForm.new_password) {
      if (accountForm.new_password !== accountForm.confirm_password) {
        toast.error('New passwords do not match');
        return;
      }
      
      if (accountForm.new_password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    try {
      // Update email if changed
      if (accountForm.email !== initialUser?.email) {
        const { error } = await supabase.auth.updateUser({
          email: accountForm.email
        });
        
        if (error) throw error;
        toast.success('Email update initiated. Please check your email to confirm.');
      }

      // Update password if provided
      if (accountForm.new_password) {
        const { error } = await supabase.auth.updateUser({
          password: accountForm.new_password
        });
        
        if (error) throw error;
        toast.success('Password updated successfully');
        
        // Clear password fields
        setAccountForm(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: ''
        }));
      }
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error(error.message || 'Failed to update account settings');
    }
  };

  // Save notification settings
  const handleSaveNotifications = async () => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          notification_settings: notificationSettings
        })
        .eq('user_id', initialUser?.id);

      if (error) throw error;
      toast.success('Notification settings updated');
    } catch (error) {
      console.error('Error saving notifications:', error);
      toast.error('Failed to save notification settings');
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const profileFields = ['full_name', 'phone', 'center_name'];
    const profileComplete = profileFields.every(field => profileForm[field]);
    
    const orgRequiredFields = ['corporate_name', 'tax_id', 'signer_name', 'email', 'corporate_address'];
    const orgFieldsFilled = orgRequiredFields.filter(field => organizationForm[field]).length;
    const orgComplete = (orgFieldsFilled / orgRequiredFields.length) * 100;

    return {
      profile: profileComplete ? 100 : 50,
      organization: Math.round(orgComplete),
      overall: Math.round((profileComplete ? 50 : 25) + (orgComplete / 2))
    };
  };

  const completion = calculateCompletion();

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
          <div className="flex items-center space-x-6">
            {/* User Welcome */}
            <div className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-gray-600" />
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

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completion.overall}%` }}
          />
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', completion: completion.profile },
            { id: 'organization', label: 'Organization', completion: completion.organization },
            { id: 'account', label: 'Account' },
            { id: 'notifications', label: 'Notifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors relative
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.completion !== undefined && tab.completion < 100 && (
                <span className="ml-2 text-xs text-orange-600">
                  {tab.completion}%
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile}>
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => handleProfileChange('full_name', e.target.value)}
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
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(123) 456-7890"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Practice/Center Name *
                </label>
                <input
                  type="text"
                  value={profileForm.center_name}
                  onChange={(e) => handleProfileChange('center_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your practice or center name"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {saving ? 'Saving...' : 'Changes are auto-saved'}
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}

        {/* Organization Tab */}
        {activeTab === 'organization' && (
          <form onSubmit={handleSaveOrganization}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Organization Information</h2>
              <button
                type="button"
                onClick={handleAutoPopulateOrganization}
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Auto-populate from profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corporate Name *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_name}
                  onChange={(e) => handleOrganizationChange('corporate_name', e.target.value)}
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
                  value={organizationForm.legal_entity_name}
                  onChange={(e) => handleOrganizationChange('legal_entity_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID (EIN) *
                </label>
                <input
                  type="text"
                  value={organizationForm.tax_id}
                  onChange={(e) => handleOrganizationChange('tax_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="XX-XXXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type
                </label>
                <select
                  value={organizationForm.organization_type}
                  onChange={(e) => handleOrganizationChange('organization_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="hospital">Hospital</option>
                  <option value="imaging_center">Imaging Center</option>
                  <option value="clinic">Clinic</option>
                  <option value="private_practice">Private Practice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Signer Name *
                </label>
                <input
                  type="text"
                  value={organizationForm.signer_name}
                  onChange={(e) => handleOrganizationChange('signer_name', e.target.value)}
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
                  onChange={(e) => handleOrganizationChange('signer_title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Corporate Address</h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_address}
                  onChange={(e) => handleOrganizationChange('corporate_address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_city}
                  onChange={(e) => handleOrganizationChange('corporate_city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_state}
                  onChange={(e) => handleOrganizationChange('corporate_state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={organizationForm.corporate_zip}
                  onChange={(e) => handleOrganizationChange('corporate_zip', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Email *
                </label>
                <input
                  type="email"
                  value={organizationForm.primary_contact_email}
                  onChange={(e) => handleOrganizationChange('primary_contact_email', e.target.value)}
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
                  onChange={(e) => handleOrganizationChange('primary_contact_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {saving ? 'Saving...' : 'Changes are auto-saved'}
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Save Organization
              </button>
            </div>
          </form>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <form onSubmit={handleSaveAccount}>
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

            <div className="space-y-6">
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

              <h3 className="text-lg font-medium">Change Password</h3>

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
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Account
              </button>
            </div>
          </form>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              {Object.entries({
                email_notifications: 'Email Notifications',
                sms_alerts: 'SMS Alerts',
                appointment_reminders: 'Appointment Reminders',
                system_updates: 'System Updates'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <span className="text-gray-700">{label}</span>
                  <input
                    type="checkbox"
                    checked={notificationSettings[key]}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSaveNotifications}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data flow indicator */}
      {userData && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-blue-800">
              Your data automatically flows to Facility Management and PSA systems
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSettingsSystem;