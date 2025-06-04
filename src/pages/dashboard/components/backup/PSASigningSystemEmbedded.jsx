// /src/pages/dashboard/components/PSASigningSystemEmbedded.jsx
// Direct DocuSeal call version (bypassing API endpoint issues)

import React, { useState, useRef } from 'react';

const PSASigningSystemEmbedded = ({ providerData }) => {
  const [psaStatus, setPsaStatus] = useState('review');
  const [embeddingUrl, setEmbeddingUrl] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const embedRef = useRef(null);

  // Create submission via API endpoint (to avoid CORS)
  const createSubmission = async () => {
    try {
      setLoading(true);
      setPsaStatus('creating');

      console.log('Making API call to backend...');

      const response = await fetch('/api/docuseal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: 1155842,
          providerData
        })
      });

      console.log('Backend response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API failed: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      console.log('Backend success:', result);
      
      const submitter = result.submitters?.[0];
      
      if (!submitter || !result.embed_src) {
        console.error('No embed_src in response:', result);
        throw new Error('No embed_src found in API response');
      }

      setSubmissionId(result.submission_id);
      setEmbeddingUrl(result.embed_src);
      setPsaStatus('signing');

      // Load DocuSeal embed
      loadDocuSealEmbed(result.embed_src);

    } catch (err) {
      console.error('Error creating submission:', err);
      setError('Failed to create submission: ' + err.message);
      setPsaStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Load DocuSeal embed using HTML/JS approach
  const loadDocuSealEmbed = (embedUrl) => {
    // Load DocuSeal script
    const script = document.createElement('script');
    script.src = 'https://cdn.docuseal.com/js/form.js';
    script.onload = () => {
      // Create embedded form
      if (embedRef.current) {
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${embedUrl}"
            data-email="${providerData.email}"
            data-name="${providerData.contactName}">
          </docuseal-form>
        `;

        // Listen for completion events
        const form = embedRef.current.querySelector('docuseal-form');
        if (form) {
          form.addEventListener('completed', handleSigningComplete);
          form.addEventListener('error', handleSigningError);
        }
      }
    };
    document.head.appendChild(script);
  };

  // Handle signing completion
  const handleSigningComplete = (data) => {
    console.log('PSA signing completed:', data);
    setPsaStatus('completed');
  };

  // Handle signing error
  const handleSigningError = (error) => {
    console.error('PSA signing error:', error);
    setError('Signing failed: ' + error.message);
    setPsaStatus('error');
  };

  // Start the PSA signing process
  const startPSASigning = async () => {
    await createSubmission();
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
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-red-800">Developer Note</p>
                    <p className="text-red-700 mt-1">
                      Before testing, replace "YOUR_TEST_API_KEY_HERE" with your actual DocuSeal test API key in the component code.
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
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Preparing Document...' : 'Review & Sign Agreement'}
                </button>
              </div>
            </div>
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
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Document signed and legally binding</p>
                <p>✓ Copy sent to your email</p>
                <p>✓ USRad team has been notified</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {/* Navigate to next step */}}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  Continue Onboarding
                </button>
              </div>
            </div>
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
                }}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
              >
                Try Again
              </button>
            </div>
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