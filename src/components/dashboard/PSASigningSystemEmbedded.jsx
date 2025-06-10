// src/components/dashboard/PSASigningSystemEmbedded.jsx
// FIXED: Using DocuSeal's Official React Integration
import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Shield,
  Award,
  Clock,
  AlertCircle,
  X,
  Eye,
  Phone,
  Mail,
  Building,
  User,
  Hash,
  MapPin
} from 'lucide-react';

// Enhanced Supabase client setup
const getSupabaseClient = () => {
  if (typeof window !== 'undefined') {
    if (window.USRadUser?.supabase) {
      console.log('✅ Found USRadUser Supabase client');
      return window.USRadUser.supabase;
    }
    
    if (window.supabase) {
      console.log('✅ Found global Supabase client');
      return window.supabase;
    }
    
    const supabaseUrl = document.querySelector('meta[name="supabase-url"]')?.content;
    const supabaseAnonKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;
    
    if (supabaseUrl && supabaseAnonKey) {
      import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
        .then(({ createClient }) => {
          const client = createClient(supabaseUrl, supabaseAnonKey);
          console.log('✅ Created Supabase client from meta tags');
          return client;
        });
    }
  }
  
  console.warn('⚠️ Supabase client not available');
  return null;
};

const PSASigningSystemEmbedded = ({ providerData }) => {
  const [psaStatus, setPsaStatus] = useState('review');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugLog, setDebugLog] = useState([]);
  const [showFallback, setShowFallback] = useState(false);
  const [docuSealLoaded, setDocuSealLoaded] = useState(false);
  const formRef = useRef(null);

  // Enhanced logging function
  const addDebugLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log('🔍 PSA Debug:', logEntry, data || '');
    setDebugLog(prev => [...prev, { message: logEntry, data }]);
  };

  // ✅ FIXED: DocuSeal React Integration (Official Method)
  const loadDocuSealReact = () => {
    addDebugLog('🚀 Loading DocuSeal React component');
    
    // Load DocuSeal React script
    const script = document.createElement('script');
    script.src = 'https://cdn.docuseal.com/js/react.js';
    script.type = 'module';
    
    script.onload = () => {
      addDebugLog('✅ DocuSeal React script loaded');
      setDocuSealLoaded(true);
      initializeDocuSealForm();
    };
    
    script.onerror = () => {
      addDebugLog('❌ Failed to load DocuSeal React script');
      setError('Failed to load DocuSeal React component');
      setShowFallback(true);
    };
    
    // Only add if not already present
    if (!document.querySelector('script[src="https://cdn.docuseal.com/js/react.js"]')) {
      document.head.appendChild(script);
    } else {
      setDocuSealLoaded(true);
      initializeDocuSealForm();
    }
  };

  // Initialize DocuSeal React Form
  const initializeDocuSealForm = () => {
    addDebugLog('📝 Initializing DocuSeal React form');
    
    // Wait for DocuSeal React to be available
    const checkDocuSeal = () => {
      if (typeof window !== 'undefined' && window.DocuSeal) {
        addDebugLog('✅ DocuSeal React component available');
        renderDocuSealForm();
      } else {
        setTimeout(checkDocuSeal, 100);
      }
    };
    
    checkDocuSeal();
  };

  // Render DocuSeal React Form
  const renderDocuSealForm = () => {
    if (!formRef.current || !window.DocuSeal) return;
    
    addDebugLog('🎨 Rendering DocuSeal React form');
    
    // DocuSeal React configuration
    const config = {
      src: "https://docuseal.com/d/LXvm6u76HPzVH3",
      email: providerData.email || providerData.contactEmail,
      name: providerData.contactName,
      // Event handlers
      onLoad: () => {
        addDebugLog('📄 DocuSeal form loaded successfully');
        setLoading(false);
        setError(null);
      },
      onComplete: (data) => {
        addDebugLog('🎉 DocuSeal form completed', data);
        handlePSACompletion(data);
      },
      onError: (error) => {
        addDebugLog('❌ DocuSeal form error', error);
        setError('Error loading the signing form');
        setShowFallback(true);
        setLoading(false);
      },
      onStart: () => {
        addDebugLog('✍️ User started signing');
        setLoading(false);
      }
    };
    
    // Create DocuSeal React element
    try {
      const DocuSealForm = window.DocuSeal.Form;
      
      // Use React to render the form
      if (typeof window !== 'undefined' && window.React && window.ReactDOM) {
        const element = window.React.createElement(DocuSealForm, config);
        window.ReactDOM.render(element, formRef.current);
        addDebugLog('✅ DocuSeal React form rendered');
      } else {
        // Fallback to vanilla JS if React not available
        addDebugLog('⚠️ React not available, using vanilla JS fallback');
        formRef.current.innerHTML = `
          <docuseal-form 
            data-src="${config.src}"
            data-email="${config.email}"
            data-name="${config.name}"
            style="width: 100%; height: 800px; border: none;">
          </docuseal-form>
        `;
        
        // Setup vanilla JS listeners
        const form = formRef.current.querySelector('docuseal-form');
        if (form) {
          form.addEventListener('loaded', config.onLoad);
          form.addEventListener('completed', (e) => config.onComplete(e.detail));
          form.addEventListener('error', (e) => config.onError(e.detail));
          form.addEventListener('started', config.onStart);
        }
      }
    } catch (err) {
      addDebugLog('❌ Error rendering DocuSeal form', err);
      setError('Failed to render signing form');
      setShowFallback(true);
    }
  };

  // ✅ ENHANCED: Handle PSA completion with USRadUser integration
  const handlePSACompletion = async (completionData) => {
    addDebugLog('🎉 PSA completion handler called', completionData);
    
    try {
      // Method 1: Use USRadUser system if available
      if (typeof window !== 'undefined' && window.USRadUser?.completePSA) {
        addDebugLog('📞 Calling USRadUser.completePSA()');
        const success = await window.USRadUser.completePSA(
          completionData.document_url,
          completionData.submission_id
        );
        
        if (success) {
          addDebugLog('✅ PSA completed via USRadUser system');
          setPsaStatus('completed');
          return;
        }
      }
      
      // Method 2: Direct Supabase update (fallback)
      const supabaseClient = getSupabaseClient();
      
      if (!supabaseClient) {
        addDebugLog('❌ No Supabase client available - using localStorage fallback');
        localStorage.setItem('usrad_psa_completed', 'true');
        localStorage.setItem('usrad_psa_completion_date', new Date().toISOString());
        setPsaStatus('completed');
        return;
      }
      
      // Get current user
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      
      if (userError || !user) {
        addDebugLog('❌ No user found in session', userError);
        return;
      }
      
      addDebugLog('✅ Found user', { id: user.id, email: user.email });
      
      // Update user profile
      const { error: updateError } = await supabaseClient
        .from('user_profiles')
        .update({
          psa_signed: true,
          psa_signed_at: new Date().toISOString(),
          psa_document_url: completionData.document_url,
          psa_submission_id: completionData.submission_id,
          onboarding_progress: 75,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (updateError) {
        addDebugLog('❌ Failed to update user profile', updateError);
      } else {
        addDebugLog('✅ User profile updated successfully!');
        setPsaStatus('completed');
        
        // Refresh USRadUser data if available
        if (window.USRadUser?.loadUserData) {
          await window.USRadUser.loadUserData();
        }
      }
    } catch (error) {
      addDebugLog('❌ Error in PSA completion handler', error);
    }
  };

  // Start PSA signing process
  const startPSASigning = () => {
    addDebugLog('🚀 Starting PSA signing process');
    setLoading(true);
    setPsaStatus('signing');
    setError(null);
    setShowFallback(false);
    
    // Load DocuSeal React component
    loadDocuSealReact();
  };

  // Navigate to dashboard after completion
  const continueToDashboard = () => {
    addDebugLog('🏠 Navigating to dashboard');
    window.location.href = '/dashboard?psa_completed=true';
  };

  // Manual completion trigger for testing
  const triggerManualCompletion = () => {
    addDebugLog('🧪 Manual completion triggered for testing');
    handlePSACompletion({ 
      manual: true, 
      test: true, 
      document_url: 'https://test.com/sample-psa.pdf',
      submission_id: 'test-submission-123'
    });
  };

  // Initialize on mount
  useEffect(() => {
    addDebugLog('🔧 Component mounted');
    
    return () => {
      addDebugLog('🔧 Component unmounting');
    };
  }, []);

  // Render debug panel in development
  const renderDebugPanel = () => {
    if (typeof window === 'undefined' || window.location.hostname === 'localhost') {
      return (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h4 className="font-bold mb-2 flex items-center space-x-2">
            <span>🔧 Debug Panel</span>
            <span className="text-xs bg-yellow-200 px-2 py-1 rounded">DEV MODE</span>
          </h4>
          <div className="text-xs space-y-1 max-h-40 overflow-y-auto mb-3">
            {debugLog.slice(-10).map((log, index) => (
              <div key={index} className="font-mono text-gray-700">
                {log.message}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={triggerManualCompletion}
              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
            >
              🧪 Test Completion
            </button>
            <button
              onClick={() => setDebugLog([])}
              className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
            >
              Clear Log
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  // Enhanced provider data display
  const renderProviderDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Building className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Facility Name</p>
            <p className="font-semibold text-gray-900">{providerData.facilityName}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Contact Person</p>
            <p className="font-semibold text-gray-900">{providerData.contactName}</p>
            <p className="text-sm text-gray-600">{providerData.signerTitle || 'Medical Director'}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Email Address</p>
            <p className="font-semibold text-gray-900">{providerData.email || providerData.contactEmail}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Hash className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Tax ID</p>
            <p className="font-semibold text-gray-900">{providerData.taxId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ DocuSeal Official Embedding Method with timeout
  const startEmbeddedSigning = () => {
    addDebugLog('🚀 Starting DocuSeal official embedding');
    
    // Set a timeout for loading
    const loadingTimeout = setTimeout(() => {
      addDebugLog('⏰ DocuSeal loading timeout - showing fallback');
      setError('DocuSeal is taking longer than expected to load');
      setShowFallback(true);
      setIframeLoading(false);
    }, 15000); // 15 second timeout
    
    // Load DocuSeal script first
    const script = document.createElement('script');
    script.src = 'https://cdn.docuseal.com/js/form.js';
    script.onload = () => {
      addDebugLog('✅ DocuSeal script loaded');
      clearTimeout(loadingTimeout);
      
      // Use your actual DocuSeal embedding URL
      const embedUrl = 'https://docuseal.com/d/LXvm6u76HPzVH3';
      
      addDebugLog('📄 Using DocuSeal embedding URL', embedUrl);
      setEmbeddingUrl(embedUrl);
      
      // Create DocuSeal form element
      if (embedRef.current) {
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${embedUrl}"
            data-email="${providerData.email || providerData.contactEmail}"
            data-name="${providerData.contactName}"
            style="width: 100%; height: 800px; border: none;">
          </docuseal-form>
        `;
        
        // Set a secondary timeout for form loading
        const formTimeout = setTimeout(() => {
          addDebugLog('⏰ DocuSeal form loading timeout');
          setError('Document is taking too long to load');
          setShowFallback(true);
          setIframeLoading(false);
        }, 10000); // 10 second timeout for form
        
        // Wait for custom element and setup listeners
        if (customElements.get('docuseal-form')) {
          setupFormListeners(formTimeout);
        } else {
          customElements.whenDefined('docuseal-form').then(() => {
            setupFormListeners(formTimeout);
          });
        }
      }
      
      setPsaStatus('signing');
    };
    
    script.onerror = () => {
      addDebugLog('❌ Failed to load DocuSeal script');
      clearTimeout(loadingTimeout);
      setError('Failed to load DocuSeal. Please use the direct link below.');
      setShowFallback(true);
      setIframeLoading(false);
    };
    
    // Only add script if not already present
    if (!document.querySelector('script[src="https://cdn.docuseal.com/js/form.js"]')) {
      document.head.appendChild(script);
    } else {
      // Script already loaded
      script.onload();
    }
  };

  // Setup form event listeners with timeout management
  const setupFormListeners = (formTimeout) => {
    const form = embedRef.current?.querySelector('docuseal-form');
    if (form) {
      addDebugLog('📋 Setting up DocuSeal form listeners');
      
      // Clear timeout when form loads successfully
      form.addEventListener('loaded', () => {
        addDebugLog('📄 DocuSeal form loaded successfully');
        clearTimeout(formTimeout);
        setIframeLoading(false);
        setError(null);
        setShowFallback(false);
      });
      
      form.addEventListener('completed', (event) => {
        addDebugLog('🎯 DocuSeal form completed', event.detail);
        clearTimeout(formTimeout);
        handlePSACompletion(event.detail || {});
      });
      
      form.addEventListener('error', (event) => {
        addDebugLog('❌ DocuSeal form error', event.detail);
        clearTimeout(formTimeout);
        setError('Error loading the signing form');
        setShowFallback(true);
        setIframeLoading(false);
      });
      
      // Additional events
      form.addEventListener('started', () => {
        addDebugLog('✍️ User started signing');
        clearTimeout(formTimeout);
        setIframeLoading(false);
      });
      
      form.addEventListener('signed', (event) => {
        addDebugLog('📝 Document signed', event.detail);
      });
    } else {
      addDebugLog('❌ DocuSeal form element not found');
      setError('Failed to initialize signing form');
      setShowFallback(true);
      setIframeLoading(false);
    }
  };

  // Handle iframe load success
  const handleIframeLoad = () => {
    addDebugLog('📄 DocuSeal iframe loaded successfully');
    setIframeLoading(false);
    setError(null);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    addDebugLog('❌ DocuSeal iframe failed to load');
    setIframeLoading(false);
    setError('Failed to load signing interface');
    setShowFallback(true);
  };

  // Listen for DocuSeal completion via postMessage
  useEffect(() => {
    const handleMessage = (event) => {
      // Security: Only accept messages from DocuSeal
      if (!event.origin.includes('docuseal.co')) return;
      
      addDebugLog('📨 PostMessage received from DocuSeal', event.data);
      
      if (event.data.type === 'document_completed' || 
          event.data.status === 'completed' ||
          event.data.event === 'completed') {
        addDebugLog('🎯 PSA completion detected via postMessage');
        handlePSACompletion(event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [submissionId]);

  // Navigate to dashboard after completion
  const continueToDashboard = () => {
    addDebugLog('🏠 Navigating to dashboard');
    window.location.href = '/dashboard?psa_completed=true';
  };

  // Manual completion trigger for testing
  const triggerManualCompletion = () => {
    addDebugLog('🧪 Manual completion triggered for testing');
    handlePSACompletion({ 
      manual: true, 
      test: true, 
      document_url: 'https://test.com/sample-psa.pdf' 
    });
  };

  // Render debug panel in development
  const renderDebugPanel = () => {
    if (typeof window === 'undefined' || window.location.hostname === 'localhost') {
      return (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h4 className="font-bold mb-2 flex items-center space-x-2">
            <span>🔧 Debug Panel</span>
            <span className="text-xs bg-yellow-200 px-2 py-1 rounded">DEV MODE</span>
          </h4>
          <div className="text-xs space-y-1 max-h-40 overflow-y-auto mb-3">
            {debugLog.slice(-10).map((log, index) => (
              <div key={index} className="font-mono text-gray-700">
                {log.message}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={triggerManualCompletion}
              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
            >
              🧪 Test Completion
            </button>
            <button
              onClick={() => setDebugLog([])}
              className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
            >
              Clear Log
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  // Enhanced provider data display
  const renderProviderDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Building className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Facility Name</p>
            <p className="font-semibold text-gray-900">{providerData.facilityName}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Contact Person</p>
            <p className="font-semibold text-gray-900">{providerData.contactName}</p>
            <p className="text-sm text-gray-600">{providerData.signerTitle || 'Medical Director'}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Email Address</p>
            <p className="font-semibold text-gray-900">{providerData.email || providerData.contactEmail}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Hash className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <p className="text-sm text-gray-600">Tax ID</p>
            <p className="font-semibold text-gray-900">{providerData.taxId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function based on status
  const renderContent = () => {
    switch (psaStatus) {
      case 'review':
        return (
          <div className="space-y-8">
            <style>{`
              .usrad-card {
                background: white;
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(0, 48, 135, 0.05);
                transition: all 0.4s ease;
              }
              .usrad-navy { color: #003087; }
              .usrad-gold { color: #cc9933; }
              .usrad-gradient-navy {
                background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
              }
              .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
              }
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Header */}
            <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold" style={{fontFamily: 'Manrope, sans-serif'}}>
                        Provider Service Agreement
                      </h1>
                      <p className="text-blue-100 text-lg">Ready for review and digital signature</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                    <p className="text-sm font-semibold">Est. 3-5 min</p>
                  </div>
                </div>

                {/* Benefits Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Award className="w-6 h-6 text-yellow-300 mb-2" />
                    <p className="text-sm font-semibold">100% Medicare Rates</p>
                    <p className="text-xs text-blue-100">Guaranteed reimbursement</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Shield className="w-6 h-6 text-green-300 mb-2" />
                    <p className="text-sm font-semibold">Premium Features</p>
                    <p className="text-xs text-blue-100">Analytics & intelligence</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-blue-300 mb-2" />
                    <p className="text-sm font-semibold">Instant Activation</p>
                    <p className="text-xs text-blue-100">Live within minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Details */}
            <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-bold usrad-navy mb-6" style={{fontFamily: 'Manrope, sans-serif'}}>
                Agreement Details
              </h2>
              {renderProviderDetails()}
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">What You're Signing</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• 100% Medicare reimbursement rates with no deductions</li>
                      <li>• Inclusion in USRad's 1,500+ center network</li>
                      <li>• Access to premium analytics and revenue optimization</li>
                      <li>• Direct support and training resources</li>
                      <li>• All {providerData.totalLocations || '1'} location(s) covered under this agreement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-center">
                <h3 className="text-xl font-bold usrad-navy mb-4">Ready to Join USRad Network?</h3>
                <p className="text-gray-600 mb-6">
                  By proceeding, you agree to electronically sign the Provider Service Agreement. 
                  The document will be embedded below for your review and signature.
                </p>
                
                <button
                  onClick={startEmbeddedSigning}
                  disabled={loading}
                  className="px-8 py-4 usrad-gradient-navy text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Preparing Document...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Review & Sign Agreement</span>
                    </span>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Secure digital signing powered by DocuSeal
                </p>
              </div>
            </div>

            {renderDebugPanel()}
          </div>
        );

      case 'signing':
        return (
          <div className="space-y-6">
            <style>{`
              .usrad-card {
                background: white;
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(0, 48, 135, 0.05);
              }
              .psa-iframe {
                border: none;
                width: 100%;
                border-radius: 16px;
                background: #f8fafc;
                transition: opacity 0.3s ease;
              }
            `}</style>

            {/* Signing Header */}
            <div className="usrad-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Provider Service Agreement</h2>
                    <p className="text-gray-600">Please review and sign the document below</p>
                  </div>
                </div>
                {iframeLoading && (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">Loading document...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Document Container */}
            <div className="usrad-card overflow-hidden relative">
              {/* Loading Overlay */}
              {iframeLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Your PSA Document</h3>
                    <p className="text-gray-600">Preparing your personalized Provider Service Agreement...</p>
                  </div>
                </div>
              )}

              {/* Enhanced Loading State */}
              <div 
                ref={embedRef}
                className="docuseal-container"
                style={{ 
                  minHeight: '800px',
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                {iframeLoading && (
                  <div className="flex items-center justify-center h-full text-gray-500 p-8" style={{ minHeight: '400px' }}>
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                      <p className="font-semibold">Loading Your PSA Document</p>
                      <p className="text-sm mt-2">Preparing your personalized Provider Service Agreement...</p>
                      <div className="mt-4">
                        <div className="flex justify-center space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">If this takes more than 15 seconds, we'll show you a direct link</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Immediate Fallback Option */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="text-center">
                  <h4 className="font-semibold text-blue-900 mb-2">Alternative: Direct Link</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    If the embedded form doesn't load, you can access your PSA directly:
                  </p>
                  <a 
                    href="https://docuseal.com/d/LXvm6u76HPzVH3"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open PSA Document</span>
                  </a>
                  <p className="text-xs text-blue-600 mt-2">
                    After signing, return here - your status will update automatically
                  </p>
                </div>
              </div>

              {/* Enhanced Error Fallback */}
              {showFallback && (
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl mt-4">
                  <div className="text-center">
                    <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Document Loading Issue</h4>
                    <p className="text-gray-600 mb-4">
                      {error || 'The embedded signing form is taking longer than expected to load.'}
                    </p>
                    <div className="space-y-3">
                      <a 
                        href="https://docuseal.com/d/LXvm6u76HPzVH3"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 usrad-gradient-navy text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Complete PSA in New Window</span>
                      </a>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setError(null);
                            setShowFallback(false);
                            setIframeLoading(true);
                            setPsaStatus('review');
                            setTimeout(() => startEmbeddedSigning(), 500);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline"
                        >
                          Try Embedded Form Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className="usrad-card p-6 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Digital Signing</h4>
                    <p className="text-sm text-gray-600">Enterprise-grade security powered by DocuSeal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Need help?</p>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {renderDebugPanel()}
          </div>
        );

      case 'completed':
        return (
          <div className="space-y-6">
            <style>{`
              .usrad-card {
                background: white;
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(0, 48, 135, 0.05);
              }
              .celebration-animation {
                animation: celebration 2s ease-in-out;
              }
              @keyframes celebration {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
            `}</style>

            {/* Success Header */}
            <div className="usrad-card p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white celebration-animation">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-bold mb-4" style={{fontFamily: 'Manrope, sans-serif'}}>
                  🎉 PSA Completed Successfully!
                </h1>
                <p className="text-green-100 text-xl">
                  Welcome to the USRad Network! Your premium features are now unlocked.
                </p>
              </div>
            </div>

            {/* Completion Details */}
            <div className="usrad-card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Document Processed</h3>
                    <p className="text-gray-600 text-sm">Your PSA has been signed and is legally binding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Confirmation</h3>
                    <p className="text-gray-600 text-sm">Copy sent to {providerData.email || providerData.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Premium Features</h3>
                    <p className="text-gray-600 text-sm">Analytics, intelligence, and VIP support unlocked</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Building className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Network Active</h3>
                    <p className="text-gray-600 text-sm">Access to 1,500+ imaging centers</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={continueToDashboard}
                  className="px-8 py-4 usrad-gradient-navy text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <Award className="w-6 h-6" />
                    <span>Access Your Premium Dashboard</span>
                  </span>
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  All premium features are now available in your dashboard
                </p>
              </div>
            </div>

            {renderDebugPanel()}
          </div>
        );

      case 'error':
        return (
          <div className="usrad-card p-8 border-red-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setError(null);
                    setPsaStatus('review');
                    setDebugLog([]);
                    setShowFallback(false);
                  }}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Try Again
                </button>
                <p className="text-sm text-gray-600">
                  If issues persist, please{' '}
                  <a href="mailto:support@usrad.com" className="text-blue-600 hover:underline">
                    contact support
                  </a>
                </p>
              </div>
            </div>
            {renderDebugPanel()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      {renderContent()}
    </div>
  );
};

export default PSASigningSystemEmbedded;