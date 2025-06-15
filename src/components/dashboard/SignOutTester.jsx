// Comprehensive Sign-Out Testing Component for USRad Platform
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUSRadAuth } from '@/hooks/useUSRadAuth';
import { 
  LogOut, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  Play,
  Pause,
  Clock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const SignOutTester = () => {
  const { user, signOut, signingOut } = useUSRadAuth();
  const [testResults, setTestResults] = useState({});
  const [currentTest, setCurrentTest] = useState(null);
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    // Load test history from localStorage
    const savedHistory = localStorage.getItem('usrad_signout_test_history');
    if (savedHistory) {
      try {
        setTestHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading test history:', error);
      }
    }
  }, []);

  const saveTestResult = (testName, result) => {
    const testRecord = {
      timestamp: new Date().toISOString(),
      testName,
      result,
      userEmail: user?.email,
      url: window.location.href
    };

    const newHistory = [testRecord, ...testHistory.slice(0, 9)]; // Keep last 10 tests
    setTestHistory(newHistory);
    localStorage.setItem('usrad_signout_test_history', JSON.stringify(newHistory));
  };

  const testDirectSupabaseSignOut = async () => {
    setCurrentTest('direct-supabase');
    const testName = 'Direct Supabase Sign-Out';
    
    try {
      console.log('🧪 Testing direct Supabase sign-out...');
      
      // Test the sign-out function availability
      if (!supabase || !supabase.auth || typeof supabase.auth.signOut !== 'function') {
        throw new Error('Supabase auth.signOut method not available');
      }

      // Store pre-sign-out state
      const preState = {
        hasSession: !!user,
        windowUSRadUser: !!window.USRadUser,
        windowUserData: !!window.userData
      };

      console.log('Pre-sign-out state:', preState);

      // Perform sign-out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear window objects
      if (window.USRadUser) {
        window.USRadUser = null;
      }
      if (window.userData) {
        window.userData = null;
      }

      // Set success flag and redirect
      sessionStorage.setItem('logout_success', 'true');
      sessionStorage.setItem('logout_test_method', 'direct_supabase');

      const result = {
        status: 'success',
        message: 'Direct Supabase sign-out completed successfully',
        preState,
        method: 'direct_supabase'
      };

      saveTestResult(testName, result);
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      console.error('❌ Direct Supabase sign-out test failed:', error);
      
      const result = {
        status: 'failed',
        message: error.message,
        method: 'direct_supabase'
      };

      setTestResults(prev => ({ ...prev, 'direct-supabase': result }));
      saveTestResult(testName, result);
    } finally {
      setCurrentTest(null);
    }
  };

  const testHookSignOut = async () => {
    setCurrentTest('hook-signout');
    const testName = 'useUSRadAuth Hook Sign-Out';
    
    try {
      console.log('🧪 Testing useUSRadAuth hook sign-out...');
      
      if (typeof signOut !== 'function') {
        throw new Error('useUSRadAuth signOut function not available');
      }

      const preState = {
        hasSession: !!user,
        windowUSRadUser: !!window.USRadUser,
        windowUserData: !!window.userData,
        signingOut: signingOut
      };

      console.log('Pre-sign-out state:', preState);

      // Use the hook's sign-out method
      const success = await signOut();
      
      if (!success) {
        throw new Error('Hook sign-out returned false');
      }

      const result = {
        status: 'success',
        message: 'useUSRadAuth hook sign-out completed successfully',
        preState,
        method: 'hook_signout'
      };

      saveTestResult(testName, result);

      // The hook should handle redirect automatically
      
    } catch (error) {
      console.error('❌ Hook sign-out test failed:', error);
      
      const result = {
        status: 'failed',
        message: error.message,
        method: 'hook_signout'
      };

      setTestResults(prev => ({ ...prev, 'hook-signout': result }));
      saveTestResult(testName, result);
    } finally {
      setCurrentTest(null);
    }
  };

  const testDashboardLayoutSignOut = async () => {
    setCurrentTest('dashboard-layout');
    const testName = 'Dashboard Layout Sign-Out';
    
    try {
      console.log('🧪 Testing dashboard layout sign-out...');
      
      // Look for dashboard logout buttons
      const headerLogoutButton = document.getElementById('logout-button');
      const sidebarLogoutButton = document.getElementById('sidebar-logout-button');
      
      if (!headerLogoutButton && !sidebarLogoutButton) {
        throw new Error('No dashboard logout buttons found (IDs: logout-button, sidebar-logout-button)');
      }

      const preState = {
        hasSession: !!user,
        windowUSRadUser: !!window.USRadUser,
        windowUserData: !!window.userData,
        headerButton: !!headerLogoutButton,
        sidebarButton: !!sidebarLogoutButton
      };

      console.log('Pre-sign-out state:', preState);

      // Set test flag before clicking
      sessionStorage.setItem('logout_test_method', 'dashboard_layout');

      // Click the available button
      const buttonToClick = headerLogoutButton || sidebarLogoutButton;
      buttonToClick.click();

      const result = {
        status: 'initiated',
        message: 'Dashboard layout sign-out button clicked',
        preState,
        method: 'dashboard_layout',
        buttonUsed: headerLogoutButton ? 'header' : 'sidebar'
      };

      saveTestResult(testName, result);

    } catch (error) {
      console.error('❌ Dashboard layout sign-out test failed:', error);
      
      const result = {
        status: 'failed',
        message: error.message,
        method: 'dashboard_layout'
      };

      setTestResults(prev => ({ ...prev, 'dashboard-layout': result }));
      saveTestResult(testName, result);
    } finally {
      setCurrentTest(null);
    }
  };

  const testComponentSignOut = async (componentName, componentPath) => {
    const testId = `component-${componentName.toLowerCase()}`;
    setCurrentTest(testId);
    const testName = `${componentName} Component Sign-Out`;
    
    try {
      console.log(`🧪 Testing ${componentName} component sign-out...`);
      
      const result = {
        status: 'redirect',
        message: `Redirecting to ${componentName} for sign-out testing`,
        method: 'component_redirect',
        component: componentName,
        path: componentPath
      };

      saveTestResult(testName, result);

      // Store test context
      sessionStorage.setItem('signout_test_component', componentName);
      sessionStorage.setItem('signout_test_return_url', window.location.href);

      // Redirect to component
      window.location.href = componentPath;

    } catch (error) {
      console.error(`❌ ${componentName} component sign-out test failed:`, error);
      
      const result = {
        status: 'failed',
        message: error.message,
        method: 'component_redirect',
        component: componentName
      };

      setTestResults(prev => ({ ...prev, [testId]: result }));
      saveTestResult(testName, result);
    } finally {
      setCurrentTest(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'initiated':
      case 'redirect':
        return <ExternalLink className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'initiated':
      case 'redirect':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign-Out Testing System</h1>
        <p className="text-gray-600">Test sign-out functionality across all USRad authentication methods</p>
        
        {/* Warning Banner */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Important Testing Notes</h3>
              <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                <li>These tests will actually sign you out of the application</li>
                <li>Test one method at a time and re-authenticate between tests</li>
                <li>Use the auth debugger to verify authentication state before testing</li>
                <li>Test results are saved in localStorage for analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current User</span>
            {user ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {user ? user.email : 'Not authenticated'}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Active Tests</span>
            {currentTest ? <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" /> : <Pause className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {currentTest ? 'Testing in progress' : 'Ready to test'}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Test History</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {testHistory.length} tests recorded
          </p>
        </div>
      </div>

      {/* Core Sign-Out Tests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Core Sign-Out Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Direct Supabase Test */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Direct Supabase</h3>
              {testResults['direct-supabase'] && getStatusIcon(testResults['direct-supabase'].status)}
            </div>
            <p className="text-sm text-gray-600 mb-4">Tests raw supabase.auth.signOut() method</p>
            <button
              onClick={testDirectSupabaseSignOut}
              disabled={!user || currentTest || signingOut}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentTest === 'direct-supabase' ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </span>
              ) : (
                'Test Direct Sign-Out'
              )}
            </button>
            {testResults['direct-supabase'] && (
              <div className={`mt-2 p-2 rounded text-xs ${getStatusColor(testResults['direct-supabase'].status)}`}>
                {testResults['direct-supabase'].message}
              </div>
            )}
          </div>

          {/* Hook Sign-Out Test */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">useUSRadAuth Hook</h3>
              {testResults['hook-signout'] && getStatusIcon(testResults['hook-signout'].status)}
            </div>
            <p className="text-sm text-gray-600 mb-4">Tests shared authentication hook sign-out</p>
            <button
              onClick={testHookSignOut}
              disabled={!user || currentTest || signingOut}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentTest === 'hook-signout' ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </span>
              ) : (
                'Test Hook Sign-Out'
              )}
            </button>
            {testResults['hook-signout'] && (
              <div className={`mt-2 p-2 rounded text-xs ${getStatusColor(testResults['hook-signout'].status)}`}>
                {testResults['hook-signout'].message}
              </div>
            )}
          </div>

          {/* Dashboard Layout Test */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Dashboard Layout</h3>
              {testResults['dashboard-layout'] && getStatusIcon(testResults['dashboard-layout'].status)}
            </div>
            <p className="text-sm text-gray-600 mb-4">Tests existing dashboard logout buttons</p>
            <button
              onClick={testDashboardLayoutSignOut}
              disabled={!user || currentTest}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentTest === 'dashboard-layout' ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </span>
              ) : (
                'Test Dashboard Sign-Out'
              )}
            </button>
            {testResults['dashboard-layout'] && (
              <div className={`mt-2 p-2 rounded text-xs ${getStatusColor(testResults['dashboard-layout'].status)}`}>
                {testResults['dashboard-layout'].message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Component Sign-Out Tests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Enhanced Component Tests</h2>
        <p className="text-gray-600 mb-6">Test sign-out buttons in enhanced components (requires navigation)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Enhanced Settings', path: '/dashboard/settings' },
            { name: 'Enhanced PSA', path: '/dashboard/onboarding/enhanced-psa' },
            { name: 'Market Education', path: '/dashboard/onboarding/market-education' },
            { name: 'PSA Success', path: '/dashboard/psa/success' }
          ].map((component) => (
            <div key={component.name} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">{component.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Navigate and test sign-out</p>
              <button
                onClick={() => testComponentSignOut(component.name, component.path)}
                disabled={!user || currentTest}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Component
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Test History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Test History</h2>
          <button
            onClick={() => {
              setTestHistory([]);
              localStorage.removeItem('usrad_signout_test_history');
            }}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear History
          </button>
        </div>
        
        {testHistory.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No tests have been run yet</p>
        ) : (
          <div className="space-y-3">
            {testHistory.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.result.status)}
                  <div>
                    <span className="font-medium">{test.testName}</span>
                    <p className="text-sm text-gray-600">{test.result.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{new Date(test.timestamp).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{test.userEmail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignOutTester;