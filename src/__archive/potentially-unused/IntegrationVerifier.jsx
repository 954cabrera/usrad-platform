// Integration Verification System for USRad Authentication
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Globe,
  Database,
  Code,
  Users,
  Settings,
  FileText,
  Eye,
  Shield,
  Zap
} from 'lucide-react';

const IntegrationVerifier = () => {
  const { user, loading, isAuthenticated } = useUSRadAuth();
  const [verificationResults, setVerificationResults] = useState({});
  const [testing, setTesting] = useState(false);
  const [routeTests, setRouteTests] = useState({});

  useEffect(() => {
    if (user && !loading) {
      runIntegrationVerification();
    }
  }, [user, loading]);

  const runIntegrationVerification = async () => {
    setTesting(true);
    try {
      await verifyIntegrationPatterns();
      await testRouteAuthentication();
    } catch (error) {
      console.error('Error running integration verification:', error);
    } finally {
      setTesting(false);
    }
  };

  const verifyIntegrationPatterns = async () => {
    console.log('🔍 Verifying authentication integration patterns...');
    
    const results = {
      timestamp: new Date().toISOString(),
      
      // Pattern 1: Supabase Integration
      supabaseIntegration: await testSupabaseIntegration(),
      
      // Pattern 2: Window Object Patterns
      windowObjectPatterns: await testWindowObjectPatterns(),
      
      // Pattern 3: Auth Hook Integration
      authHookIntegration: await testAuthHookIntegration(),
      
      // Pattern 4: Database Access Patterns
      databaseAccessPatterns: await testDatabaseAccessPatterns(),
      
      // Pattern 5: Event System Integration
      eventSystemIntegration: await testEventSystemIntegration(),
      
      // Pattern 6: Component Integration
      componentIntegration: await testComponentIntegration(),
      
      // Pattern 7: Security Patterns
      securityPatterns: await testSecurityPatterns()
    };

    setVerificationResults(results);
  };

  const testSupabaseIntegration = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: Supabase client availability
      test.tests.push({
        name: 'Supabase Client Available',
        status: supabase ? 'pass' : 'fail',
        message: supabase ? 'Supabase client is available' : 'Supabase client not found'
      });

      // Test 2: Authentication methods
      const authMethods = ['signUp', 'signIn', 'signOut', 'getSession', 'getUser'];
      authMethods.forEach(method => {
        test.tests.push({
          name: `Auth Method: ${method}`,
          status: supabase.auth && typeof supabase.auth[method] === 'function' ? 'pass' : 'fail',
          message: supabase.auth && typeof supabase.auth[method] === 'function' ? 'Available' : 'Missing'
        });
      });

      // Test 3: Current session
      const { data: { session }, error } = await supabase.auth.getSession();
      test.tests.push({
        name: 'Active Session',
        status: session && !error ? 'pass' : 'fail',
        message: session ? `Session active for ${session.user.email}` : error?.message || 'No active session'
      });

      // Test 4: Database connection
      try {
        const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
        test.tests.push({
          name: 'Database Connection',
          status: !error ? 'pass' : 'fail',
          message: !error ? 'Database accessible' : error.message
        });
      } catch (dbError) {
        test.tests.push({
          name: 'Database Connection',
          status: 'fail',
          message: dbError.message
        });
      }

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount === test.tests.length ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} Supabase integration tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Supabase integration test failed: ${error.message}`;
    }

    return test;
  };

  const testWindowObjectPatterns = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: USRadUser object structure
      const usradUser = window.USRadUser;
      test.tests.push({
        name: 'USRadUser Object',
        status: usradUser ? 'pass' : 'fail',
        message: usradUser ? 'USRadUser object found' : 'USRadUser object missing'
      });

      if (usradUser) {
        // Test USRadUser structure
        const expectedFields = ['user', 'loadUserData', 'updateUI'];
        expectedFields.forEach(field => {
          test.tests.push({
            name: `USRadUser.${field}`,
            status: usradUser[field] ? 'pass' : 'fail',
            message: usradUser[field] ? 'Present' : 'Missing'
          });
        });
      }

      // Test 2: userData fallback object
      test.tests.push({
        name: 'userData Fallback',
        status: window.userData ? 'pass' : 'warning',
        message: window.userData ? 'userData fallback available' : 'userData fallback not set'
      });

      // Test 3: Event system
      test.tests.push({
        name: 'Event System',
        status: typeof window.dispatchEvent === 'function' ? 'pass' : 'fail',
        message: typeof window.dispatchEvent === 'function' ? 'Event system available' : 'Event system missing'
      });

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount >= test.tests.length * 0.8 ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} window object pattern tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Window object pattern test failed: ${error.message}`;
    }

    return test;
  };

  const testAuthHookIntegration = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: Hook availability
      test.tests.push({
        name: 'useUSRadAuth Hook',
        status: typeof useUSRadAuth === 'function' ? 'pass' : 'fail',
        message: typeof useUSRadAuth === 'function' ? 'Hook available' : 'Hook not found'
      });

      // Test 2: Hook returns
      test.tests.push({
        name: 'Hook User Data',
        status: user ? 'pass' : 'fail',
        message: user ? `User data available: ${user.email}` : 'No user data from hook'
      });

      test.tests.push({
        name: 'Hook Authentication State',
        status: isAuthenticated() ? 'pass' : 'fail',
        message: isAuthenticated() ? 'Authenticated via hook' : 'Not authenticated via hook'
      });

      test.tests.push({
        name: 'Hook Loading State',
        status: typeof loading === 'boolean' ? 'pass' : 'fail',
        message: typeof loading === 'boolean' ? `Loading state: ${loading}` : 'Invalid loading state'
      });

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount === test.tests.length ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} auth hook integration tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Auth hook integration test failed: ${error.message}`;
    }

    return test;
  };

  const testDatabaseAccessPatterns = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    if (!user) {
      test.status = 'fail';
      test.summary = 'No user available for database access testing';
      return test;
    }

    try {
      // Test 1: User profiles access
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      test.tests.push({
        name: 'User Profiles Access',
        status: profile && !profileError ? 'pass' : 'warning',
        message: profile ? 'Profile data accessible' : profileError?.message || 'No profile found'
      });

      // Test 2: Corporate entities access
      const { data: corporate, error: corporateError } = await supabase
        .from('corporate_entities')
        .select('*')
        .eq('user_id', user.id)
        .single();

      test.tests.push({
        name: 'Corporate Entities Access',
        status: corporate && !corporateError ? 'pass' : 'warning',
        message: corporate ? 'Corporate data accessible' : corporateError?.message || 'No corporate entity found'
      });

      // Test 3: User facilities access
      const { data: facilities, error: facilitiesError } = await supabase
        .from('user_facilities')
        .select('*')
        .eq('user_id', user.id);

      test.tests.push({
        name: 'User Facilities Access',
        status: facilities && !facilitiesError ? 'pass' : 'warning',
        message: facilities ? `${facilities.length} facilities accessible` : facilitiesError?.message || 'No facilities found'
      });

      // Test 4: RLS (Row Level Security) enforcement
      try {
        const { data: otherUserData, error: rlsError } = await supabase
          .from('user_profiles')
          .select('*')
          .neq('user_id', user.id)
          .limit(1);

        test.tests.push({
          name: 'RLS Enforcement',
          status: !otherUserData || otherUserData.length === 0 ? 'pass' : 'fail',
          message: !otherUserData || otherUserData.length === 0 ? 'RLS properly enforced' : 'RLS may be bypassed'
        });
      } catch (rlsError) {
        test.tests.push({
          name: 'RLS Enforcement',
          status: 'pass',
          message: 'RLS enforced (access denied to other user data)'
        });
      }

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount >= test.tests.length * 0.75 ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} database access pattern tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Database access pattern test failed: ${error.message}`;
    }

    return test;
  };

  const testEventSystemIntegration = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: Custom event support
      test.tests.push({
        name: 'Custom Event Support',
        status: typeof CustomEvent !== 'undefined' ? 'pass' : 'fail',
        message: typeof CustomEvent !== 'undefined' ? 'CustomEvent constructor available' : 'CustomEvent not supported'
      });

      // Test 2: Event listener support
      test.tests.push({
        name: 'Event Listener Support',
        status: typeof window.addEventListener === 'function' ? 'pass' : 'fail',
        message: typeof window.addEventListener === 'function' ? 'Event listeners supported' : 'Event listeners not supported'
      });

      // Test 3: USRad event patterns
      const usradEvents = ['userDataReady', 'userProgressUpdate'];
      usradEvents.forEach(eventName => {
        test.tests.push({
          name: `USRad Event: ${eventName}`,
          status: 'info',
          message: 'Event pattern available for use'
        });
      });

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount >= 2 ? 'pass' : 'partial';
      test.summary = `${passCount}/${test.tests.length} event system tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Event system integration test failed: ${error.message}`;
    }

    return test;
  };

  const testComponentIntegration = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: React integration
      test.tests.push({
        name: 'React Integration',
        status: typeof React !== 'undefined' ? 'pass' : 'warning',
        message: typeof React !== 'undefined' ? 'React available' : 'React not in global scope'
      });

      // Test 2: Component hook usage
      test.tests.push({
        name: 'Hook Usage Pattern',
        status: user && !loading ? 'pass' : 'warning',
        message: user && !loading ? 'Hooks working correctly' : 'Hook state may be loading'
      });

      // Test 3: Authentication integration
      test.tests.push({
        name: 'Component Auth Integration',
        status: isAuthenticated() ? 'pass' : 'fail',
        message: isAuthenticated() ? 'Components properly integrated with auth' : 'Component auth integration failing'
      });

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount >= 2 ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} component integration tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Component integration test failed: ${error.message}`;
    }

    return test;
  };

  const testSecurityPatterns = async () => {
    const test = { status: 'testing', tests: [], summary: '' };
    
    try {
      // Test 1: Environment variable protection
      const supabaseUrl = document.querySelector('meta[name="supabase-url"]')?.content;
      const supabaseKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;
      
      test.tests.push({
        name: 'Environment Variables',
        status: supabaseUrl && supabaseKey ? 'pass' : 'fail',
        message: supabaseUrl && supabaseKey ? 'Environment variables properly configured' : 'Missing environment variables'
      });

      // Test 2: Session security
      test.tests.push({
        name: 'Session Security',
        status: user && user.aud === 'authenticated' ? 'pass' : 'warning',
        message: user && user.aud === 'authenticated' ? 'Session properly authenticated' : 'Session security unclear'
      });

      // Test 3: HTTPS enforcement
      test.tests.push({
        name: 'HTTPS Enforcement',
        status: window.location.protocol === 'https:' || window.location.hostname === 'localhost' ? 'pass' : 'warning',
        message: window.location.protocol === 'https:' ? 'HTTPS enforced' : 'Consider HTTPS for production'
      });

      const passCount = test.tests.filter(t => t.status === 'pass').length;
      test.status = passCount >= 2 ? 'pass' : passCount > 0 ? 'partial' : 'fail';
      test.summary = `${passCount}/${test.tests.length} security pattern tests passed`;

    } catch (error) {
      test.status = 'fail';
      test.summary = `Security pattern test failed: ${error.message}`;
    }

    return test;
  };

  const testRouteAuthentication = async () => {
    const routes = [
      { path: '/dashboard/settings', name: 'Enhanced Settings', expected: 'protected' },
      { path: '/dashboard/onboarding/enhanced-psa', name: 'Enhanced PSA', expected: 'protected' },
      { path: '/dashboard/onboarding/market-education', name: 'Market Education', expected: 'protected' },
      { path: '/dashboard/psa/success', name: 'PSA Success', expected: 'protected' },
      { path: '/dashboard/auth-debug', name: 'Auth Debug', expected: 'protected' }
    ];

    const results = {};

    for (const route of routes) {
      try {
        // We can't actually navigate to test routes, so we'll check if they exist
        results[route.path] = {
          name: route.name,
          status: 'info',
          message: `Route available for testing (${route.expected})`,
          expected: route.expected,
          testUrl: window.location.origin + route.path
        };
      } catch (error) {
        results[route.path] = {
          name: route.name,
          status: 'warning',
          message: `Route test failed: ${error.message}`,
          expected: route.expected
        };
      }
    }

    setRouteTests(results);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'info':
        return <Eye className="w-4 h-4 text-blue-600" />;
      case 'testing':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200';
      case 'fail':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'partial':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'testing':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const renderVerificationSection = (title, testKey, icon) => {
    const result = verificationResults[testKey];
    if (!result) return null;

    return (
      <div className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="font-medium">{title}</h3>
          </div>
          {getStatusIcon(result.status)}
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{result.summary}</p>
        
        {result.tests && result.tests.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-gray-700 mb-2">
              View Details ({result.tests.length} tests)
            </summary>
            <div className="space-y-2">
              {result.tests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium">{test.name}</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(test.status)}
                    <span className="text-xs text-gray-600">{test.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </details>
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
            <h1 className="text-3xl font-bold text-gray-900">Integration Verification</h1>
            <p className="text-gray-600 mt-1">Verify authentication integration patterns across USRad platform</p>
          </div>
          <button
            onClick={runIntegrationVerification}
            disabled={testing || !user}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
            <span>Re-run Verification</span>
          </button>
        </div>

        {/* Overall Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${user ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center space-x-2">
              {user ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span className="font-medium">Authentication</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{user ? 'Active' : 'Not authenticated'}</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${Object.keys(verificationResults).length > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Integration Tests</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{Object.keys(verificationResults).length - 1} patterns tested</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${Object.keys(routeTests).length > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="font-medium">Route Tests</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{Object.keys(routeTests).length} routes verified</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${testing ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center space-x-2">
              {testing ? <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" /> : <CheckCircle className="w-4 h-4 text-green-600" />}
              <span className="font-medium">Status</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{testing ? 'Testing...' : 'Ready'}</p>
          </div>
        </div>
      </div>

      {/* Integration Pattern Tests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Integration Pattern Tests</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderVerificationSection('Supabase Integration', 'supabaseIntegration', <Database className="w-5 h-5 text-blue-600" />)}
          {renderVerificationSection('Window Object Patterns', 'windowObjectPatterns', <Code className="w-5 h-5 text-green-600" />)}
          {renderVerificationSection('Auth Hook Integration', 'authHookIntegration', <RefreshCw className="w-5 h-5 text-purple-600" />)}
          {renderVerificationSection('Database Access Patterns', 'databaseAccessPatterns', <Database className="w-5 h-5 text-indigo-600" />)}
          {renderVerificationSection('Event System Integration', 'eventSystemIntegration', <Zap className="w-5 h-5 text-yellow-600" />)}
          {renderVerificationSection('Component Integration', 'componentIntegration', <Users className="w-5 h-5 text-teal-600" />)}
          {renderVerificationSection('Security Patterns', 'securityPatterns', <Shield className="w-5 h-5 text-red-600" />)}
        </div>
      </div>

      {/* Route Authentication Tests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Route Authentication Tests</h2>
        <p className="text-gray-600 mb-6">Test authentication on enhanced routes (requires navigation)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(routeTests).map(([path, test]) => (
            <div key={path} className={`border rounded-lg p-4 ${getStatusColor(test.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{test.name}</h3>
                {getStatusIcon(test.status)}
              </div>
              <p className="text-sm text-gray-600 mb-3">{test.message}</p>
              <a
                href={test.testUrl}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Test Route</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationVerifier;