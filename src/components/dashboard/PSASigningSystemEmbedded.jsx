// src/components/dashboard/PSASigningSystemEmbedded.jsx
// CORRECTED: Using DocuSeal's Official React Package
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Shield,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Import DocuSeal React component
import { DocusealForm } from '@docuseal/react';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function PSASigningSystemEmbedded() {
  const [psaStatus, setPsaStatus] = useState('ready'); // ready, signing, completed, error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugLogs, setDebugLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showFallback, setShowFallback] = useState(false);

  // Mock provider data (you can fetch this from Supabase)
  const providerData = {
    facilityName: "Advanced Imaging Center of Davie",
    contactName: "Dr. John Smith",
    contactEmail: "admin@advancedimaging.com",
    contactPhone: "(954) 555-0124",
    taxId: "12-3456789",
    signerTitle: "Medical Director",
    address: "123 Medical Plaza, Davie, FL 33328"
  };

  // Debug logging function
  const addDebugLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log('🔍 PSA Debug:', logEntry);
    setDebugLogs(prev => [...prev.slice(-9), logEntry]);
  };

  // Get authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      addDebugLog('🔧 Component mounted, user: ' + (user?.email || 'none'));
    };
    getUser();
  }, []);

  // DocuSeal form URL - using your existing template
  const docusealFormSrc = `https://docuseal.com/d/LXvm6u76HPzVH3?email=${encodeURIComponent(providerData.contactEmail)}&name=${encodeURIComponent(providerData.contactName)}`;

  // Handle PSA completion
  const handlePSACompletion = async (details) => {
    addDebugLog('🎉 PSA completion handler triggered');
    setPsaStatus('completed');
    setLoading(false);

    try {
      if (user) {
        // Update user profile in Supabase
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            has_completed_psa: true,
            psa_completed_at: new Date().toISOString(),
            onboarding_progress: 60,
            psa_details: details || {}
          })
          .eq('id', user.id);

        if (updateError) {
          addDebugLog('❌ Error updating PSA status: ' + updateError.message);
          throw updateError;
        }

        addDebugLog('✅ PSA status updated in database');

        // Show success message
        showCompletionSuccess();
        
        // Navigate to facilities after delay
        setTimeout(() => {
          addDebugLog('🏥 Navigating to facilities page');
          window.location.href = '/dashboard/facilities?psa_completed=true';
        }, 2000);

      } else {
        throw new Error('No authenticated user found');
      }
    } catch (error) {
      addDebugLog('❌ PSA completion error: ' + error.message);
      setError('Completion processing failed: ' + error.message);
    }
  };

  // Show completion success notification
  const showCompletionSuccess = () => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        animation: slideInRight 0.5s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 24px;">🎉</div>
          <div>
            <div style="font-weight: 600; font-size: 16px;">PSA Completed!</div>
            <div style="font-size: 14px; opacity: 0.9;">Redirecting to facilities...</div>
          </div>
        </div>
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  };

  // Start PSA signing process
  const startPSASigning = () => {
    addDebugLog('🚀 Starting PSA signing process');
    setLoading(false); // Let DocuSeal handle its own loading
    setPsaStatus('signing');
    setError(null);
    setShowFallback(false);
  };

  // Manual completion for testing
  const triggerManualCompletion = () => {
    addDebugLog('🧪 Manual completion triggered for testing');
    handlePSACompletion({ manual: true, timestamp: new Date().toISOString() });
  };

  // USRad custom CSS theme for DocuSeal
  const customDocusealCSS = `
    /* USRad Professional Theme */
    .form-container {
      background-color: #ffffff;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .template-title {
      color: #1f2937;
      font-family: 'Inter', system-ui, sans-serif;
      font-weight: 600;
    }
    
    .submit-form-button {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: 0;
      border-radius: 12px;
      color: #ffffff;
      font-weight: 600;
      padding: 12px 24px;
      transition: all 0.2s ease;
    }
    
    .submit-form-button:hover {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
    
    .field-area {
      background-color: rgba(59, 130, 246, 0.1);
      border-color: #3b82f6;
      border-radius: 8px;
    }
    
    .steps-form input, .steps-form textarea, .steps-form select {
      border-radius: 8px;
      border: 1px solid #d1d5db;
      font-family: 'Inter', system-ui, sans-serif;
    }
    
    .steps-form input:focus, .steps-form textarea:focus, .steps-form select:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style>{`
        .usrad-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
        }
        .usrad-gradient-text {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold usrad-gradient-text">
                Provider Service Agreement
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete your PSA digitally with enterprise-grade security. Join the USRad network 
              and start offering 60%+ discounted imaging to patients immediately.
            </p>
          </div>

          {/* Debug Panel (Development Only) */}
          {import.meta.env.DEV && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Debug Information</h3>
              <div className="space-y-1 text-sm font-mono">
                {debugLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
              <button 
                onClick={triggerManualCompletion}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs"
              >
                Test Manual Completion
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="usrad-card p-8">
            {psaStatus === 'ready' && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-10 h-10 text-blue-600" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Sign Your PSA</h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-left max-w-lg mx-auto">
                    <h4 className="font-semibold text-gray-900 mb-3">Facility Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><strong>Facility:</strong> {providerData.facilityName}</div>
                      <div><strong>Contact:</strong> {providerData.contactName}</div>
                      <div><strong>Email:</strong> {providerData.contactEmail}</div>
                      <div><strong>Phone:</strong> {providerData.contactPhone}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startPSASigning}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  Begin PSA Signing
                </button>
              </div>
            )}

            {psaStatus === 'signing' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Your PSA</h3>
                  <p className="text-gray-600">Sign your Provider Service Agreement below</p>
                </div>

                {!showFallback ? (
                  <div className="relative">
                    {loading && (
                      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                          <span className="font-medium text-gray-700">Loading DocuSeal Form...</span>
                        </div>
                      </div>
                    )}
                    
                    {/* DocuSeal React Component */}
                    <div className="rounded-xl overflow-hidden border border-gray-200" style={{ minHeight: '600px' }}>
                      <DocusealForm 
                        src={docusealFormSrc}
                        email={providerData.contactEmail}
                        customCss={customDocusealCSS}
                        onCompleted={(details) => {
                          addDebugLog('✅ DocuSeal form completed via onCompleted callback');
                          handlePSACompletion(details);
                        }}
                        onLoad={() => {
                          addDebugLog('✅ DocuSeal form loaded successfully');
                          setLoading(false);
                        }}
                        onError={(error) => {
                          addDebugLog('❌ DocuSeal form error: ' + JSON.stringify(error));
                          setError('Form loading failed: ' + (error?.message || 'Unknown error'));
                          setShowFallback(true);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Form Loading Issue</h4>
                      <p className="text-gray-600 mb-4">
                        {error || 'The embedded form is having trouble loading.'}
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => {
                            setShowFallback(false);
                            setError(null);
                            setLoading(true);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Try Again
                        </button>
                        <a
                          href={docusealFormSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open in New Tab
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Enterprise-grade security powered by DocuSeal
                  </p>
                </div>
              </div>
            )}

            {psaStatus === 'completed' && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">PSA Completed Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Your Provider Service Agreement has been signed and processed. 
                    You're now part of the USRad network!
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-green-800 text-sm">
                    🎉 <strong>Welcome to USRad!</strong><br />
                    Redirecting to facilities setup...
                  </p>
                </div>
              </div>
            )}

            {error && psaStatus !== 'completed' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Questions? Contact our support team at{' '}
              <a href="mailto:support@usrad.com" className="text-blue-600 hover:underline">
                support@usrad.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}