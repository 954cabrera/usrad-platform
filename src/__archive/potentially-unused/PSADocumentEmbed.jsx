// src/components/dashboard/PSADocumentEmbed.jsx
// USRad Enterprise PSA Document Integration Component
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Shield,
  Award,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

const PSADocumentEmbed = ({ 
  userEmail, 
  docusealTemplateId = "1155842",
  redirectUrl = "https://usrad-platform.vercel.app/dashboard?psa_completed=true",
  onPSAComplete = null 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [psaStatus, setPsaStatus] = useState('pending');
  const [showFallback, setShowFallback] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  // Check PSA status from USRadUser system
  useEffect(() => {
    const checkPSAStatus = () => {
      if (typeof window !== 'undefined' && window.USRadUser?.profile) {
        if (window.USRadUser.profile.psa_signed) {
          setPsaStatus('completed');
          return;
        }
      }
      setPsaStatus('pending');
    };

    checkPSAStatus();
    
    // Listen for USRadUser updates
    const interval = setInterval(checkPSAStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Construct DocuSeal embed URL with USRad branding
  const docusealParams = new URLSearchParams({
    template_id: docusealTemplateId,
    email: userEmail,
    redirect_url: redirectUrl,
    webhook_url: `https://usrad-platform.vercel.app/api/docuseal-webhook`,
    // Pre-fill USRad data
    'fields[email]': userEmail,
    'fields[company_name]': 'USRad Network Provider',
    'fields[date]': new Date().toLocaleDateString(),
    'fields[provider_name]': userEmail.split('@')[0], // Extract name from email
    // USRad specific fields
    'fields[network]': 'USRad National Imaging Network',
    'fields[agreement_type]': 'Provider Service Agreement'
  });

  const docusealEmbedUrl = `https://docuseal.co/s/${docusealTemplateId}?${docusealParams.toString()}`;

  // Handle iframe load success
  const handleIframeLoad = () => {
    setIsLoading(false);
    setEmbedError(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setIsLoading(false);
    setEmbedError(true);
    setShowFallback(true);
  };

  // Listen for DocuSeal completion via postMessage
  useEffect(() => {
    const handleMessage = (event) => {
      // Security: Only accept messages from DocuSeal
      if (!event.origin.includes('docuseal.co')) return;
      
      if (event.data.type === 'document_completed' || event.data.status === 'completed') {
        console.log('PSA completion detected via postMessage');
        setPsaStatus('completed');
        
        // Trigger callback if provided
        if (onPSAComplete) {
          onPSAComplete();
        }
        
        // Refresh USRadUser data
        if (typeof window !== 'undefined' && window.USRadUser?.loadUserData) {
          window.USRadUser.loadUserData();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onPSAComplete]);

  // If PSA is already completed, show success state
  if (psaStatus === 'completed') {
    return (
      <div className="usrad-card p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-2xl">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-green-800 mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
              🎉 PSA Completed Successfully!
            </h3>
            <p className="text-green-700 text-lg">
              Your Provider Service Agreement has been signed and processed. Welcome to the USRad Network!
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-semibold">Premium Features Unlocked</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-semibold">Full Network Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{`
        .usrad-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.05);
          transition: all 0.4s ease;
        }

        .psa-iframe {
          border: none;
          width: 100%;
          border-radius: 16px;
          background: #f8fafc;
          transition: opacity 0.3s ease;
        }

        .psa-iframe.loading {
          opacity: 0.7;
        }

        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .bg-usrad-navy { background-color: #003087; }
        .bg-usrad-gold { background-color: #cc9933; }

        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }

        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* PSA Header */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold" style={{fontFamily: 'Manrope, sans-serif'}}>
                  Provider Service Agreement
                </h2>
                <p className="text-blue-100 text-lg">
                  Complete your PSA to unlock full USRad Network access
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm font-semibold">Est. 3-5 minutes</p>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Award className="w-6 h-6 text-yellow-300 mb-2" />
              <p className="text-sm font-semibold">Premium Analytics</p>
              <p className="text-xs text-blue-100">Revenue optimization tools</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Shield className="w-6 h-6 text-green-300 mb-2" />
              <p className="text-sm font-semibold">Network Access</p>
              <p className="text-xs text-blue-100">1,500+ imaging centers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-blue-300 mb-2" />
              <p className="text-sm font-semibold">Instant Activation</p>
              <p className="text-xs text-blue-100">Live within minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* PSA Document Container */}
      <div className="usrad-card overflow-hidden relative">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Your PSA Document</h3>
              <p className="text-gray-600">Preparing your personalized Provider Service Agreement...</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full pulse-animation"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full pulse-animation" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full pulse-animation" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {embedError && (
          <div className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Document Loading Issue</h3>
            <p className="text-gray-600 mb-6">
              We're having trouble loading the embedded document. You can still complete your PSA using the direct link below.
            </p>
          </div>
        )}

        {/* DocuSeal Iframe Embed */}
        {!embedError && (
          <iframe 
            src={docusealEmbedUrl}
            width="100%" 
            height="800"
            className={`psa-iframe ${isLoading ? 'loading' : ''}`}
            title="USRad Provider Service Agreement - DocuSeal"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="camera; microphone; geolocation"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        )}

        {/* Fallback Button */}
        {(showFallback || embedError) && (
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Alternative Access</h4>
              <p className="text-gray-600 mb-4">
                If the embedded document isn't working, you can open it in a new window:
              </p>
              <a 
                href={docusealEmbedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-3 usrad-gradient-navy text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open PSA in New Window</span>
              </a>
              <p className="text-sm text-gray-500 mt-3">
                After signing, return to this page - your status will update automatically
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="usrad-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Secure Digital Signing</h4>
              <p className="text-sm text-gray-600">Powered by DocuSeal with enterprise-grade security</p>
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
    </div>
  );
};

export default PSADocumentEmbed;