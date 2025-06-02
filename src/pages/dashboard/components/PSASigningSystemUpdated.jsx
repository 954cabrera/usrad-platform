import { useState, useEffect } from 'react';
import { PenTool, CheckCircle, Clock, FileText, User, Calendar } from 'lucide-react';

const PSASigningSystemUpdated = ({ providerData = {} }) => {
  const [psaData] = useState({
    providerId: 'PROV-2025-001',
    providerName: providerData?.facilityName || 'Advanced Imaging Center',
    email: providerData?.email || 'admin@advancedimaging.com',
    phone: providerData?.phone || '(954) 555-0123',
    taxId: providerData?.taxId || '12-3456789',
    effectiveDate: new Date().toISOString().split('T')[0],
    psaVersion: 'USRad Standard Agreement v1.0',
    generatedDate: new Date().toISOString().split('T')[0],
    facilityName: providerData?.facilityName || 'Advanced Imaging Center of Davie',
    totalLocations: providerData?.totalLocations || '1',
    contactName: providerData?.contactName || 'Dr. John Smith',
    signerTitle: providerData?.signerTitle || 'Medical Director'
  });

  const [docuSealData, setDocuSealData] = useState({
    submissionId: null,
    documentUrl: null,
    signedDocumentUrl: null,
    templateId: '1155842',
    status: 'draft'
  });

  const [signingStatus, setSigningStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('review');
  const [error, setError] = useState(null);

  // Real DocuSeal API integration
  const generatePSADocument = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Starting PSA generation...');
      const response = await fetch('/api/docuseal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: docuSealData.templateId,
          providerData: psaData
        })
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Result:', result);
      
      const embedUrl = result.embed_src || result.submitters?.[0]?.embed_src;
      console.log('🔗 Embed URL:', embedUrl);
      
      setDocuSealData({
        ...docuSealData,
        submissionId: result.id,
        documentUrl: embedUrl,
        status: 'awaiting_signature'
      });
      
      setCurrentStep('sign');
      setSigningStatus('signing');
      
      console.log('✅ Successfully set up signing step with URL:', embedUrl);
    } catch (error) {
      console.error('Error generating PSA:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen for DocuSeal completion events and poll for status
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'docuseal:completed') {
        setSigningStatus('completed');
        setCurrentStep('completed');
        setDocuSealData(prev => ({
          ...prev,
          status: 'completed',
          signedDocumentUrl: event.data.documentUrl
        }));
      }
    };

    // Poll for completion status while in signing state
    let pollInterval;
    if (currentStep === 'sign' && docuSealData.submissionId) {
      pollInterval = setInterval(async () => {
        try {
          // Check if document has been completed via webhook/database
          const response = await fetch(`/api/check-psa-status?submissionId=${docuSealData.submissionId}`);
          if (response.ok) {
            const result = await response.json();
            if (result.status === 'completed') {
              setSigningStatus('completed');
              setCurrentStep('completed');
              console.log('✅ PSA completion detected via polling');
            }
          }
        } catch (error) {
          console.error('Error polling PSA status:', error);
        }
      }, 10000); // Check every 10 seconds
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [currentStep, docuSealData.submissionId]);

  const getStepIcon = (step) => {
    const iconClass = "w-6 h-6";
    switch (step) {
      case 'review': return <FileText className={iconClass} />;
      case 'sign': return <PenTool className={iconClass} />;
      case 'completed': return <CheckCircle className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  const getStepStatus = (step) => {
    if (currentStep === step) return 'current';
    if (
      (step === 'review' && ['sign', 'completed'].includes(currentStep)) ||
      (step === 'sign' && currentStep === 'completed')
    ) return 'completed';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Provider Service Agreement
        </h1>
        <p className="text-gray-600">
          Complete your PSA signing process with {psaData.facilityName}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['review', 'sign', 'completed'].map((step, index) => {
            const status = getStepStatus(step);
            return (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 
                  ${status === 'completed' ? 'bg-green-100 border-green-500 text-green-600' :
                    status === 'current' ? 'bg-blue-100 border-blue-500 text-blue-600' :
                    'bg-gray-100 border-gray-300 text-gray-400'}
                `}>
                  {getStepIcon(step)}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-blue-600' :
                    status === 'completed' ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </p>
                </div>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Review Step */}
      {currentStep === 'review' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Provider Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                <p className="text-gray-900">{psaData.providerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <p className="text-gray-900">{psaData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{psaData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <p className="text-gray-900">{psaData.taxId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Signer</label>
                <p className="text-gray-900">{psaData.contactName} - {psaData.signerTitle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                <p className="text-gray-900">{psaData.effectiveDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Ready to Generate Your PSA?
            </h3>
            <p className="text-blue-700 mb-4">
              This will create your Provider Service Agreement document using DocuSeal. 
              Please review the information above before proceeding.
            </p>
            <button
              onClick={generatePSADocument}
              disabled={loading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                } text-white
              `}
            >
              {loading ? (
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Generating Document...
                </span>
              ) : (
                <span className="flex items-center">
                  <PenTool className="w-4 h-4 mr-2" />
                  Generate & Sign PSA
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Signing Step */}
      {currentStep === 'sign' && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Sign Your Document:</strong> Please review and sign your PSA document below.
            </p>
            {docuSealData.documentUrl && (
              <p className="text-sm text-yellow-600 mt-1">
                Loading: {docuSealData.documentUrl}
              </p>
            )}
          </div>
          
          {docuSealData.documentUrl ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-medium">DocuSeal Signing Interface</h3>
                <p className="text-sm text-gray-600">Submission ID: {docuSealData.submissionId}</p>
              </div>
              <div className="relative">
                {/* Primary action: Open in new tab (works reliably) */}
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Ready to Sign Your PSA
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your Provider Service Agreement is ready for review and signature.
                    Click below to open the document in a new tab.
                  </p>
                  <a
                    href={docuSealData.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <PenTool className="w-5 h-5 mr-2" />
                    Open Document to Sign
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    Opens in a new tab • Secure DocuSeal interface
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">
                No document URL received. Check console for details.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Completion Step */}
      {currentStep === 'completed' && (
        <div className="text-center space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              PSA Completed Successfully!
            </h2>
            <p className="text-green-700 mb-4">
              Your Provider Service Agreement has been signed and processed.
            </p>
            <div className="bg-white rounded border p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600">Agreement Details:</p>
              <p className="font-medium">{psaData.psaVersion}</p>
              <p className="text-sm text-gray-500">
                Signed on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="font-medium text-green-800">PSA Signed</p>
                <p className="text-green-600">Complete ✓</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <p className="font-medium text-blue-800">Portal Setup</p>
                <p className="text-blue-600">Next Step</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <p className="font-medium text-gray-700">Start Receiving</p>
                <p className="text-gray-500">Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                // Navigate to portal setup - you can customize this URL
                window.location.href = '/dashboard/onboarding';
              }}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to Portal Setup
            </button>
            <button 
              onClick={() => {
                // Navigate back to main dashboard
                window.location.href = '/dashboard';
              }}
              className="w-full py-2 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Return to Dashboard
            </button>
            {docuSealData.signedDocumentUrl && (
              <a
                href={docuSealData.signedDocumentUrl}
                className="block w-full py-2 px-6 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Signed Agreement
              </a>
            )}
          </div>

          {/* Support Contact */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions about your setup? 
              <a href="mailto:support@usrad.com" className="text-blue-600 hover:text-blue-500 ml-1">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PSASigningSystemUpdated;