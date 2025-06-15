// Comprehensive Authentication Debugger for USRad Platform
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  User, 
  Database, 
  Shield, 
  RefreshCw, 
  LogOut,
  Settings,
  FileText,
  Users,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from 'lucide-react';

const AuthenticationDebugger = () => {
  // Authentication state from our hook
  const { user, loading, userDisplayName, signingOut, signOut, isAuthenticated } = useUSRadAuth();

  // Debug state
  const [debugData, setDebugData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [signOutTests, setSignOutTests] = useState({});

  useEffect(() => {
    collectDebugData();
  }, [user]);

  const collectDebugData = async () => {
    setRefreshing(true);
    try {
      const data = {
        timestamp: new Date().toISOString(),
        
        // Supabase Session Check
        supabaseSession: null,
        supabaseUser: null,
        supabaseError: null,
        
        // Window Objects
        windowUSRadUser: null,
        windowUserData: null,
        windowImageCenterData: null,
        
        // Database Records
        userProfile: null,
        corporateEntity: null,
        userFacilities: null,
        onboardingProgress: null,
        
        // Environment
        supabaseUrl: null,
        supabaseAnonKey: null,
        
        // URL and Route
        currentUrl: window.location.href,
        currentPath: window.location.pathname,
        
        // Authentication Hook Status
        hookUser: user,
        hookLoading: loading,
        hookDisplayName: userDisplayName,
        hookSigningOut: signingOut,
        hookAuthenticated: isAuthenticated()
      };

      // Check Supabase session
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        data.supabaseSession = sessionData?.session;
        data.supabaseUser = sessionData?.session?.user;
        data.supabaseError = error;
      } catch (err) {
        data.supabaseError = err.message;
      }

      // Check window objects
      data.windowUSRadUser = window.USRadUser || null;
      data.windowUserData = window.userData || null;
      data.windowImageCenterData = window.imagingCenterData || null;

      // Check environment variables
      data.supabaseUrl = document.querySelector('meta[name="supabase-url"]')?.content;
      data.supabaseAnonKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;

      // Load database records if we have a user
      if (data.supabaseUser) {
        try {
          // User profile
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', data.supabaseUser.id)
            .single();
          data.userProfile = profile;
          data.userProfileError = profileError;

          // Corporate entity
          const { data: corporate, error: corporateError } = await supabase
            .from('corporate_entities')
            .select('*')
            .eq('user_id', data.supabaseUser.id)
            .single();
          data.corporateEntity = corporate;
          data.corporateError = corporateError;

          // User facilities
          const { data: facilities, error: facilitiesError } = await supabase
            .from('user_facilities')
            .select('*')
            .eq('user_id', data.supabaseUser.id);
          data.userFacilities = facilities;
          data.facilitiesError = facilitiesError;

          // Onboarding progress
          const { data: progress, error: progressError } = await supabase
            .from('user_profiles')
            .select('onboarding_progress, onboarding_step, psa_signed, credentialing_complete, banking_setup, launch_ready')
            .eq('user_id', data.supabaseUser.id)
            .single();
          data.onboardingProgress = progress;
          data.progressError = progressError;

        } catch (err) {
          data.databaseError = err.message;
        }
      }

      setDebugData(data);
      await runAuthenticationTests(data);
    } catch (error) {
      console.error('Error collecting debug data:', error);
      setDebugData({ error: error.message });
    } finally {
      setRefreshing(false);
    }
  };

  const runAuthenticationTests = async (data) => {
    const tests = {
      supabaseConnection: false,
      sessionValid: false,
      userDataAvailable: false,
      profileComplete: false,
      windowObjectsValid: false,
      environmentConfigured: false,
      displayNameResolved: false,
      authHookWorking: false
    };

    // Test Supabase connection
    tests.supabaseConnection = !data.supabaseError && data.supabaseUrl && data.supabaseAnonKey;

    // Test session validity
    tests.sessionValid = data.supabaseSession && data.supabaseUser && !data.supabaseError;

    // Test user data availability
    tests.userDataAvailable = data.supabaseUser && (data.windowUSRadUser || data.windowUserData);

    // Test profile completeness
    tests.profileComplete = data.userProfile && data.userProfile.full_name;

    // Test window objects
    tests.windowObjectsValid = data.windowUSRadUser && data.windowUSRadUser.user;

    // Test environment configuration
    tests.environmentConfigured = data.supabaseUrl && data.supabaseAnonKey;

    // Test display name resolution
    tests.displayNameResolved = userDisplayName && userDisplayName !== 'User';

    // Test auth hook
    tests.authHookWorking = user && isAuthenticated() && !loading;

    setTestResults(tests);
  };

  const testSignOutFunctionality = async () => {
    const tests = {
      hookSignOut: { status: 'pending', message: '' },
      directSupabaseSignOut: { status: 'pending', message: '' },
      windowObjectCleanup: { status: 'pending', message: '' }
    };

    setSignOutTests({ ...tests });

    // Test 1: Hook sign out (without actually signing out)
    try {
      // We can't actually test sign out without logging out, so we'll check if the function exists
      if (typeof signOut === 'function') {
        tests.hookSignOut = { status: 'pass', message: 'Sign out function available' };
      } else {
        tests.hookSignOut = { status: 'fail', message: 'Sign out function not available' };
      }
    } catch (error) {
      tests.hookSignOut = { status: 'fail', message: error.message };
    }

    // Test 2: Direct Supabase sign out check
    try {
      if (supabase && supabase.auth && typeof supabase.auth.signOut === 'function') {
        tests.directSupabaseSignOut = { status: 'pass', message: 'Supabase signOut method available' };
      } else {
        tests.directSupabaseSignOut = { status: 'fail', message: 'Supabase signOut method not available' };
      }
    } catch (error) {
      tests.directSupabaseSignOut = { status: 'fail', message: error.message };
    }

    // Test 3: Window object presence (for cleanup)
    try {
      const hasWindowObjects = window.USRadUser || window.userData;
      if (hasWindowObjects) {
        tests.windowObjectCleanup = { status: 'pass', message: 'Window objects available for cleanup' };
      } else {
        tests.windowObjectCleanup = { status: 'warning', message: 'No window objects found to cleanup' };
      }
    } catch (error) {
      tests.windowObjectCleanup = { status: 'fail', message: error.message };
    }

    setSignOutTests(tests);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case true:
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case false:
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case true:
      case 'pass':
        return 'bg-green-50 border-green-200';
      case false:
      case 'fail':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const renderDataSection = (title, data, icon) => {
    if (!data && data !== false && data !== null) return null;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
            className="text-gray-400 hover:text-gray-600"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto max-h-40">
          {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Authentication Debugger</h1>
            <p className="text-gray-600 mt-1">Comprehensive authentication status and testing for USRad platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSensitive(!showSensitive)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showSensitive ? 'Hide' : 'Show'} Sensitive Data</span>
            </button>
            <button
              onClick={collectDebugData}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
        
        {/* Quick Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${getStatusColor(debugData.supabaseSession)}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon(!!debugData.supabaseSession)}
              <span className="font-medium">Supabase Session</span>
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${getStatusColor(debugData.windowUSRadUser)}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon(!!debugData.windowUSRadUser)}
              <span className="font-medium">USRad User Object</span>
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${getStatusColor(debugData.userProfile)}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon(!!debugData.userProfile)}
              <span className="font-medium">User Profile</span>
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${getStatusColor(debugData.hookAuthenticated)}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon(debugData.hookAuthenticated)}
              <span className="font-medium">Auth Hook Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Authentication Tests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Authentication Tests
          </h2>
          <div className="space-y-3">
            {Object.entries(testResults).map(([test, passed]) => (
              <div key={test} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                {getStatusIcon(passed)}
              </div>
            ))}
          </div>
        </div>

        {/* Sign-Out Tests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <LogOut className="w-5 h-5 mr-2 text-red-600" />
              Sign-Out Tests
            </h2>
            <button
              onClick={testSignOutFunctionality}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Run Tests
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(signOutTests).map(([test, result]) => (
              <div key={test} className="p-3 bg-gray-50 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                  {getStatusIcon(result.status)}
                </div>
                {result.message && (
                  <p className="text-xs text-gray-600">{result.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Testing Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ExternalLink className="w-5 h-5 mr-2 text-green-600" />
          Component Authentication Testing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/settings" className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Enhanced Settings</span>
            </div>
            <p className="text-sm text-gray-600">Test authentication in enhanced settings system</p>
          </a>
          
          <a href="/dashboard/onboarding/enhanced-psa" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="font-medium">Enhanced PSA</span>
            </div>
            <p className="text-sm text-gray-600">Test authentication in PSA system</p>
          </a>
          
          <a href="/dashboard/onboarding/market-education" className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Market Education</span>
            </div>
            <p className="text-sm text-gray-600">Test authentication in onboarding flow</p>
          </a>
        </div>
      </div>

      {/* Detailed Debug Data */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Detailed Debug Information</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderDataSection(
            'Supabase Session', 
            showSensitive ? debugData.supabaseSession : (debugData.supabaseSession ? '[Session Data Hidden]' : null),
            <Database className="w-5 h-5 text-blue-600" />
          )}
          
          {renderDataSection(
            'Window USRad User', 
            debugData.windowUSRadUser,
            <User className="w-5 h-5 text-green-600" />
          )}
          
          {renderDataSection(
            'User Profile', 
            debugData.userProfile,
            <User className="w-5 h-5 text-purple-600" />
          )}
          
          {renderDataSection(
            'Corporate Entity', 
            debugData.corporateEntity,
            <Users className="w-5 h-5 text-orange-600" />
          )}
          
          {renderDataSection(
            'User Facilities', 
            debugData.userFacilities,
            <Settings className="w-5 h-5 text-indigo-600" />
          )}
          
          {renderDataSection(
            'Onboarding Progress', 
            debugData.onboardingProgress,
            <FileText className="w-5 h-5 text-red-600" />
          )}
        </div>
        
        {/* Environment and System Info */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Current URL:</span> {debugData.currentUrl}
            </div>
            <div>
              <span className="font-medium">Current Path:</span> {debugData.currentPath}
            </div>
            <div>
              <span className="font-medium">Supabase URL:</span> {showSensitive ? debugData.supabaseUrl : '[Hidden]'}
            </div>
            <div>
              <span className="font-medium">Timestamp:</span> {debugData.timestamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationDebugger;