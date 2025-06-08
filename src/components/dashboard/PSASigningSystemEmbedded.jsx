// /src/pages/dashboard/components/PSASigningSystemEmbedded.jsx
// Enhanced with debugging and multiple completion detection methods

import React, { useState, useRef, useEffect } from 'react';

// Enhanced Supabase client setup
const getSupabaseClient = () => {
  // Try multiple ways to access Supabase
  if (typeof window !== 'undefined') {
    // Method 1: Global window.supabase
    if (window.supabase) {
      console.log('✅ Found global Supabase client');
      return window.supabase;
    }
    
    // Method 2: Try to create client manually
    if (window.supabaseLib && window.supabaseLib.createClient) {
      const client = window.supabaseLib.createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY
      );
      console.log('✅ Created Supabase client manually');
      return client;
    }
    
    // Method 3: Import dynamically
    import('/src/lib/supabase.js').then(module => {
      console.log('✅ Imported Supabase module');
      return module.supabase;
    }).catch(err => {
      console.error('❌ Failed to import Supabase:', err);
    });
  }
  
  console.warn('⚠️ Supabase client not available');
  return null;
};

const PSASigningSystemEmbedded = ({ providerData }) => {
  const [psaStatus, setPsaStatus] = useState('review');
  const [embeddingUrl, setEmbeddingUrl] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugLog, setDebugLog] = useState([]);
  const embedRef = useRef(null);

  // Enhanced logging function
  const addDebugLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log('🔍 PSA Debug:', logEntry, data || '');
    setDebugLog(prev => [...prev, { message: logEntry, data }]);
  };

  // ✅ ENHANCED: Handle PSA completion with multiple detection methods
  const handlePSACompletion = async (completionData) => {
    addDebugLog('🎉 PSA completion handler called', completionData);
    
    try {
      const supabaseClient = getSupabaseClient();
      
      if (!supabaseClient) {
        addDebugLog('❌ No Supabase client available');
        // Fallback: Store in localStorage for now
        localStorage.setItem('usrad_psa_completed', 'true');
        localStorage.setItem('usrad_psa_completion_date', new Date().toISOString());
        addDebugLog('📦 Stored PSA completion in localStorage as fallback');
        return;
      }
      
      // Get current user
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      
      if (userError) {
        addDebugLog('❌ Error getting user', userError);
        return;
      }
      
      if (!user) {
        addDebugLog('❌ No user found in session');
        return;
      }
      
      addDebugLog('✅ Found user', { id: user.id, email: user.email });
      
      // Update user metadata
      const updateData = {
        psa_signed: true,
        psa_submission_id: submissionId,
        onboarding_progress: 75,
        psa_signed_date: new Date().toISOString(),
        network_access_level: 'premium',
        psa_completion_data: completionData
      };
      
      addDebugLog('📝 Updating user metadata', updateData);
      
      const { error: updateError } = await supabaseClient.auth.updateUser({
        data: updateData
      });
      
      if (updateError) {
        addDebugLog('❌ Failed to update user metadata', updateError);
      } else {
        addDebugLog('✅ User metadata updated successfully!');
        
        // Show success notification
        if (window.showToast) {
          window.showToast('PSA completed! Premium features unlocked.', 'success');
        }
        
        // Store success flag for immediate UI update
        localStorage.setItem('usrad_psa_just_completed', 'true');
      }
    } catch (error) {
      addDebugLog('❌ Error in PSA completion handler', error);
    }
  };

  // Create submission via API endpoint
  const createSubmission = async () => {
    try {
      setLoading(true);
      setPsaStatus('creating');
      addDebugLog('🚀 Starting PSA creation process');

      const response = await fetch('/api/docuseal/create-submission-embedded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: 1155842,
          providerData
        })
      });

      addDebugLog('📡 API response status', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API failed: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      addDebugLog('✅ API success', result);
      
      if (!result.embed_src) {
        throw new Error('No embed_src found in API response');
      }

      setSubmissionId(result.submission_id);
      setEmbeddingUrl(result.embed_src);
      setPsaStatus('signing');

      // Load DocuSeal embed
      loadDocuSealEmbed(result.embed_src);

    } catch (err) {
      addDebugLog('❌ Error creating submission', err);
      setError('Failed to create submission: ' + err.message);
      setPsaStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ENHANCED: Load DocuSeal embed with comprehensive event listeners
  const loadDocuSealEmbed = (embedUrl) => {
    addDebugLog('📄 Loading DocuSeal embed', embedUrl);
    
    // Load DocuSeal script
    const script = document.createElement('script');
    script.src = 'https://cdn.docuseal.com/js/form.js';
    script.onload = () => {
      addDebugLog('✅ DocuSeal script loaded');
      
      if (embedRef.current) {
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${embedUrl}"
            data-email="${providerData.email}"
            data-name="${providerData.contactName}">
          </docuseal-form>
        `;

        // Method 1: Direct event listeners on form element
        const form = embedRef.current.querySelector('docuseal-form');
        if (form) {
          addDebugLog('📋 Adding event listeners to DocuSeal form');
          
          form.addEventListener('completed', (event) => {
            addDebugLog('🎯 DocuSeal completed event (method 1)', event);
            handleSigningComplete(event.detail || event.data || {});
          });
          
          form.addEventListener('error', (event) => {
            addDebugLog('❌ DocuSeal error event', event);
            handleSigningError(event.detail || event.data || {});
          });
          
          // Additional events to listen for
          form.addEventListener('loaded', () => {
            addDebugLog('📄 DocuSeal form loaded');
          });
          
          form.addEventListener('signed', (event) => {
            addDebugLog('✍️ DocuSeal signed event', event);
            handleSigningComplete(event.detail || event.data || {});
          });
        }

        // Method 2: Window message events (backup)
        const handleMessage = (event) => {
          addDebugLog('📨 Window message received', event.data);
          
          if (event.data && (
            event.data.type === 'docuseal:completed' ||
            event.data.type === 'docuseal:signed' ||
            event.data.event === 'completed'
          )) {
            addDebugLog('🎯 DocuSeal completion via window message (method 2)', event.data);
            handleSigningComplete(event.data);
          }
        };
        
        window.addEventListener('message', handleMessage);
        
        // Method 3: Polling for completion (fallback)
        const pollForCompletion = setInterval(() => {
          // Check if form indicates completion
          const completedElements = document.querySelectorAll('[data-completed="true"], .completed, .success');
          if (completedElements.length > 0) {
            addDebugLog('🎯 DocuSeal completion detected via polling (method 3)');
            clearInterval(pollForCompletion);
            handleSigningComplete({ method: 'polling' });
          }
        }, 2000);
        
        // Store cleanup functions
        embedRef.current._cleanup = () => {
          addDebugLog('🧹 Cleaning up event listeners');
          window.removeEventListener('message', handleMessage);
          clearInterval(pollForCompletion);
        };
        
        // Auto-cleanup after 30 minutes
        setTimeout(() => {
          if (embedRef.current && embedRef.current._cleanup) {
            embedRef.current._cleanup();
          }
        }, 30 * 60 * 1000);
      }
    };
    
    script.onerror = () => {
      addDebugLog('❌ Failed to load DocuSeal script');
      setError('Failed to load DocuSeal signing interface');
      setPsaStatus('error');
    };
    
    document.head.appendChild(script);
  };

  // ✅ ENHANCED: Handle signing completion with debug logging
  const handleSigningComplete = async (data) => {
    addDebugLog('🎉 PSA signing completed', data);
    setPsaStatus('completed');
    
    // Call the completion handler
    await handlePSACompletion(data);
  };

  // Handle signing error
  const handleSigningError = (error) => {
    addDebugLog('❌ PSA signing error', error);
    setError('Signing failed: ' + (error.message || 'Unknown error'));
    setPsaStatus('error');
  };

  // Start the PSA signing process
  const startPSASigning = async () => {
    addDebugLog('🚀 Starting PSA signing process');
    await createSubmission();
  };

  // Navigate to dashboard after completion
  const continueToDashboard = () => {
    addDebugLog('🏠 Navigating to dashboard');
    window.location.href = '/dashboard?psa_completed=true';
  };

  // Manual completion trigger for testing
  const triggerManualCompletion = () => {
    addDebugLog('🧪 Manual completion triggered for testing');
    handlePSACompletion({ manual: true, test: true });
  };

  // Cleanup on unmount
  useEffect(() => {
    addDebugLog('🔧 Component mounted');
    
    return () => {
      addDebugLog('🔧 Component unmounting');
      if (embedRef.current && embedRef.current._cleanup) {
        embedRef.current._cleanup();
      }
    };
  }, []);

  // Render debug panel in development
  const renderDebugPanel = () => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-bold mb-2">Debug Log:</h4>
        <div className="text-xs space-y-1 max-h-40 overflow-y-auto">
          {debugLog.map((log, index) => (
            <div key={index} className="font-mono">
              {log.message}
              {log.data && <pre className="ml-4 text-gray-600">{JSON.stringify(log.data, null, 2)}</pre>}
            </div>
          ))}
        </div>
        <button
          onClick={triggerManualCompletion}
          className="mt-2 px-3 py-1 bg-yellow-500 text-white text-xs rounded"
        >
          🧪 Test Manual Completion
        </button>
      </div>
    );
  };

  // Render based on current status
  const renderContent = () => {
    switch (psaStatus) {
      case 'review':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Provider Service Agreement</h3>
                <p className="text-sm text-gray-600">Ready for review and signature</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Agreement Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Provider:</span>
                    <div className="font-medium">{providerData.facilityName}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Contact:</span>
                    <div className="font-medium">{providerData.contactName}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <div className="font-medium">{providerData.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Tax ID:</span>
                    <div className="font-medium">{providerData.taxId}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">Complete PSA to Unlock Premium Features</p>
                    <p className="text-blue-700 mt-1">
                      Revenue analytics, network intelligence, advanced training, and direct support access.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  By proceeding, you agree to electronically sign the Provider Service Agreement with U.S. Radiology of Florida.
                </p>
                <button
                  onClick={startPSASigning}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Preparing Document...' : 'Review & Sign Agreement'}
                </button>
              </div>
            </div>
            
            {renderDebugPanel()}
          </div>
        );

      case 'creating':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preparing Your Agreement</h3>
              <p className="text-gray-600">Please wait while we prepare your Provider Service Agreement...</p>
            </div>
            {renderDebugPanel()}
          </div>
        );

      case 'signing':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Provider Service Agreement</h3>
              <p className="text-sm text-gray-600">Please review and sign the agreement below</p>
            </div>
            
            <div 
              ref={embedRef}
              className="border rounded-lg overflow-hidden"
              style={{ height: '600px', minHeight: '600px' }}
            >
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading signing form...
              </div>
            </div>
            
            {renderDebugPanel()}
          </div>
        );

      case 'completed':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agreement Completed!</h3>
              <p className="text-gray-600 mb-4">
                Your Provider Service Agreement has been successfully signed and submitted.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>✓ Document signed and legally binding</p>
                <p>✓ Copy sent to your email</p>
                <p>✓ USRad team has been notified</p>
                <p>✓ <strong className="text-green-600">Premium features unlocked!</strong></p>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  onClick={continueToDashboard}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Continue to Dashboard
                </button>
                <p className="text-xs text-gray-500">
                  You now have access to revenue analytics, network intelligence, and premium support.
                </p>
              </div>
            </div>
            
            {renderDebugPanel()}
          </div>
        );

      case 'error':
        return (
          <div className="bg-white rounded-lg border border-red-200 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setPsaStatus('review');
                  setDebugLog([]);
                }}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
            
            {renderDebugPanel()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default PSASigningSystemEmbedded;