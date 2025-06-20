// User Data Flow Testing Component for USRad Platform
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { 
  User, 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  Building2,
  FileText,
  Settings,
  Copy,
  Search
} from 'lucide-react';

const UserDataFlowTester = () => {
  const { user, loading, userDisplayName, updateDisplayName } = useUSRadAuth();
  const [dataFlowResults, setDataFlowResults] = useState({});
  const [testing, setTesting] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const [databaseData, setDatabaseData] = useState({});
  const [windowObjects, setWindowObjects] = useState({});
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    if (user && !loading) {
      runInitialDataFlowTest();
    }
  }, [user, loading]);

  const runInitialDataFlowTest = async () => {
    setTesting(true);
    try {
      await testUserDataFlow();
    } catch (error) {
      console.error('Error running initial data flow test:', error);
    } finally {
      setTesting(false);
    }
  };

  const testUserDataFlow = async () => {
    console.log('🧪 Testing user data flow across all sources...');
    
    const results = {
      timestamp: new Date().toISOString(),
      supabaseSession: { status: 'pending', data: null, error: null },
      windowUSRadUser: { status: 'pending', data: null, error: null },
      windowUserData: { status: 'pending', data: null, error: null },
      databaseProfile: { status: 'pending', data: null, error: null },
      databaseCorporate: { status: 'pending', data: null, error: null },
      databaseFacilities: { status: 'pending', data: null, error: null },
      authHookData: { status: 'pending', data: null, error: null },
      userDisplayTest: { status: 'pending', data: null, error: null }
    };

    // Test 1: Supabase Session
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      results.supabaseSession = {
        status: session ? 'success' : 'warning',
        data: session ? {
          userId: session.user.id,
          email: session.user.email,
          userMetadata: session.user.user_metadata,
          sessionId: session.access_token ? '[Present]' : null
        } : null,
        error: session ? null : 'No active session'
      };
    } catch (error) {
      results.supabaseSession = {
        status: 'error',
        data: null,
        error: error.message
      };
    }

    // Test 2: Window USRadUser Object
    try {
      const usradUser = window.USRadUser;
      results.windowUSRadUser = {
        status: usradUser ? 'success' : 'warning',
        data: usradUser ? {
          hasUser: !!usradUser.user,
          hasProfile: !!usradUser.profile,
          hasImagingCenter: !!usradUser.imagingCenter,
          userEmail: usradUser.user?.email,
          profileName: usradUser.profile?.full_name,
          centerName: usradUser.imagingCenter?.name
        } : null,
        error: usradUser ? null : 'USRadUser object not found'
      };
    } catch (error) {
      results.windowUSRadUser = {
        status: 'error',
        data: null,
        error: error.message
      };
    }

    // Test 3: Window userData Object (fallback)
    try {
      const userData = window.userData;
      results.windowUserData = {
        status: userData ? 'success' : 'warning',
        data: userData ? {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role
        } : null,
        error: userData ? null : 'userData object not found'
      };
    } catch (error) {
      results.windowUserData = {
        status: 'error',
        data: null,
        error: error.message
      };
    }

    // Test 4: Database User Profile
    if (user) {
      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        results.databaseProfile = {
          status: profile ? 'success' : 'warning',
          data: profile ? {
            fullName: profile.full_name,
            phone: profile.phone,
            centerName: profile.center_name,
            onboardingProgress: profile.onboarding_progress,
            psaSigned: profile.psa_signed
          } : null,
          error: error?.message || (profile ? null : 'No profile found')
        };

        setDatabaseData(prev => ({ ...prev, profile }));
      } catch (error) {
        results.databaseProfile = {
          status: 'error',
          data: null,
          error: error.message
        };
      }

      // Test 5: Database Corporate Entity
      try {
        const { data: corporate, error } = await supabase
          .from('corporate_entities')
          .select('*')
          .eq('user_id', user.id)
          .single();

        results.databaseCorporate = {
          status: corporate ? 'success' : 'warning',
          data: corporate ? {
            corporateName: corporate.corporate_name,
            taxId: corporate.tax_id,
            signerName: corporate.signer_name,
            email: corporate.email
          } : null,
          error: error?.message || (corporate ? null : 'No corporate entity found')
        };

        setDatabaseData(prev => ({ ...prev, corporate }));
      } catch (error) {
        results.databaseCorporate = {
          status: 'error',
          data: null,
          error: error.message
        };
      }

      // Test 6: Database User Facilities
      try {
        const { data: facilities, error } = await supabase
          .from('user_facilities')
          .select('*')
          .eq('user_id', user.id);

        results.databaseFacilities = {
          status: facilities && facilities.length > 0 ? 'success' : 'warning',
          data: facilities ? {
            count: facilities.length,
            facilities: facilities.map(f => ({
              name: f.facility_name,
              type: f.facility_type,
              isPrimary: f.is_primary
            }))
          } : null,
          error: error?.message || (facilities ? null : 'No facilities found')
        };

        setDatabaseData(prev => ({ ...prev, facilities }));
      } catch (error) {
        results.databaseFacilities = {
          status: 'error',
          data: null,
          error: error.message
        };
      }
    }

    // Test 7: Auth Hook Data
    try {
      results.authHookData = {
        status: user ? 'success' : 'warning',
        data: user ? {
          userId: user.id,
          email: user.email,
          displayName: userDisplayName,
          loading: loading
        } : null,
        error: user ? null : 'No user from auth hook'
      };
    } catch (error) {
      results.authHookData = {
        status: 'error',
        data: null,
        error: error.message
      };
    }

    // Test 8: User Display Name Resolution
    try {
      const sources = {
        authHook: userDisplayName,
        usradProfile: window.USRadUser?.profile?.full_name,
        userMetadata: user?.user_metadata?.full_name,
        databaseProfile: databaseData.profile?.full_name,
        email: user?.email
      };

      const resolvedName = sources.usradProfile || sources.userMetadata || sources.databaseProfile || sources.email || 'User';
      const isPlaceholder = resolvedName === 'User';

      results.userDisplayTest = {
        status: !isPlaceholder ? 'success' : 'warning',
        data: {
          resolved: resolvedName,
          sources: sources,
          isPlaceholder: isPlaceholder
        },
        error: isPlaceholder ? 'Display name not properly resolved' : null
      };
    } catch (error) {
      results.userDisplayTest = {
        status: 'error',
        data: null,
        error: error.message
      };
    }

    // Store current window objects
    setWindowObjects({
      USRadUser: window.USRadUser,
      userData: window.userData,
      imagingCenterData: window.imagingCenterData
    });

    setDataFlowResults(results);
    
    // Add to test history
    const testRecord = {
      timestamp: results.timestamp,
      summary: {
        totalTests: Object.keys(results).length - 1, // Exclude timestamp
        successCount: Object.values(results).filter(r => r?.status === 'success').length,
        warningCount: Object.values(results).filter(r => r?.status === 'warning').length,
        errorCount: Object.values(results).filter(r => r?.status === 'error').length
      },
      userEmail: user?.email
    };

    setTestHistory(prev => [testRecord, ...prev.slice(0, 4)]); // Keep last 5 tests
  };

  const testComponentDataFlow = async (componentName, componentUrl) => {
    // Store test context and navigate to component
    sessionStorage.setItem('data_flow_test_component', componentName);
    sessionStorage.setItem('data_flow_test_return_url', window.location.href);
    window.location.href = componentUrl;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'pending':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const renderDataFlowTest = (testName, testKey, icon) => {
    const result = dataFlowResults[testKey];
    if (!result) return null;

    return (
      <div className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="font-medium">{testName}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(result.status)}
            <button
              onClick={() => copyToClipboard(result)}
              className="text-gray-400 hover:text-gray-600"
              title="Copy test result"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {result.data && (
          <div className="mb-2">
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-gray-700 mb-1">
                View Data ({Object.keys(result.data).length} fields)
              </summary>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          </div>
        )}
        
        {result.error && (
          <p className="text-sm text-red-600">{result.error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Data Flow Tester</h1>
            <p className="text-gray-600 mt-1">Test user data loading and display across all USRad components</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {showRawData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showRawData ? 'Hide' : 'Show'} Raw Data</span>
            </button>
            <button
              onClick={testUserDataFlow}
              disabled={testing || !user}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
              <span>Re-test Data Flow</span>
            </button>
          </div>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${user ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center space-x-2">
              {user ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span className="font-medium">User Authentication</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{user ? user.email : 'Not authenticated'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${userDisplayName !== 'User' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center space-x-2">
              {userDisplayName !== 'User' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-yellow-600" />}
              <span className="font-medium">Display Name</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{userDisplayName}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${window.USRadUser ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center space-x-2">
              {window.USRadUser ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-yellow-600" />}
              <span className="font-medium">USRad User Object</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{window.USRadUser ? 'Available' : 'Missing'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${databaseData.profile ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center space-x-2">
              {databaseData.profile ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-yellow-600" />}
              <span className="font-medium">Database Profile</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{databaseData.profile?.full_name || 'Not loaded'}</p>
          </div>
        </div>
      </div>

      {/* Data Flow Test Results */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Flow Test Results</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderDataFlowTest('Supabase Session', 'supabaseSession', <Database className="w-5 h-5 text-blue-600" />)}
          {renderDataFlowTest('USRad User Object', 'windowUSRadUser', <User className="w-5 h-5 text-green-600" />)}
          {renderDataFlowTest('Window User Data', 'windowUserData', <User className="w-5 h-5 text-purple-600" />)}
          {renderDataFlowTest('Database Profile', 'databaseProfile', <User className="w-5 h-5 text-indigo-600" />)}
          {renderDataFlowTest('Corporate Entity', 'databaseCorporate', <Building2 className="w-5 h-5 text-orange-600" />)}
          {renderDataFlowTest('User Facilities', 'databaseFacilities', <Settings className="w-5 h-5 text-teal-600" />)}
          {renderDataFlowTest('Auth Hook Data', 'authHookData', <RefreshCw className="w-5 h-5 text-red-600" />)}
          {renderDataFlowTest('Display Name Resolution', 'userDisplayTest', <Eye className="w-5 h-5 text-pink-600" />)}
        </div>
      </div>

      {/* Component Testing */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Component Data Flow Testing</h2>
        <p className="text-gray-600 mb-6">Test how user data displays in enhanced components</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Enhanced Settings', url: '/dashboard/settings', icon: Settings },
            { name: 'Enhanced PSA', url: '/dashboard/onboarding/enhanced-psa', icon: FileText },
            { name: 'Market Education', url: '/dashboard/onboarding/market-education', icon: User },
            { name: 'PSA Success', url: '/dashboard/psa/success', icon: CheckCircle }
          ].map((component) => (
            <button
              key={component.name}
              onClick={() => testComponentDataFlow(component.name, component.url)}
              disabled={!user}
              className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-2 mb-2">
                <component.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{component.name}</span>
              </div>
              <p className="text-sm text-gray-600">Test user data display</p>
              <div className="flex items-center space-x-1 mt-2 text-blue-600">
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Navigate & Test</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Test History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test History</h2>
        {testHistory.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No tests have been run yet</p>
        ) : (
          <div className="space-y-3">
            {testHistory.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <div className="font-medium">Test #{testHistory.length - index}</div>
                    <div className="text-gray-600">
                      {test.summary.successCount}✅ {test.summary.warningCount}⚠️ {test.summary.errorCount}❌
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{new Date(test.timestamp).toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{test.userEmail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Raw Data Display */}
      {showRawData && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Raw Data Inspection</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Window Objects</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(windowObjects, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-3">Database Records</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                {JSON.stringify(databaseData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataFlowTester;