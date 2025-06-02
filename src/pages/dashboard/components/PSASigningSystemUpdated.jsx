import { useState, useEffect } from 'react';
import { PenTool, CheckCircle, Clock, FileText, User, Calendar, AlertCircle, Download, ExternalLink, Shield, Building, Phone, Mail } from 'lucide-react';

// shadcn/ui components
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

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
  const [currentStep, setCurrentStep] = useState('terms-review');
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
      case 'terms-review': return <FileText className={iconClass} />;
      case 'review': return <User className={iconClass} />;
      case 'sign': return <PenTool className={iconClass} />;
      case 'completed': return <CheckCircle className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  const getStepStatus = (step) => {
    const steps = ['terms-review', 'review', 'sign', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
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
          {['terms-review', 'review', 'sign', 'completed'].map((step, index) => {
            const status = getStepStatus(step);
            const stepLabels = {
              'terms-review': 'Review Agreement',
              'review': 'Provider Info',
              'sign': 'Digital Signature', 
              'completed': 'Completed'
            };
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
                    {stepLabels[step]}
                  </p>
                </div>
                {index < 3 && (
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

      {/* Terms Review Step */}
{currentStep === 'terms-review' && (
  <div className="space-y-8">
    {/* Provider Details with Beautiful Styling */}
    <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-xl text-[#003087]">
          <Building className="w-6 h-6 mr-3 text-[#003087]" />
          Provider Service Agreement Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Building className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Provider Name</label>
                <p className="font-semibold text-gray-900">{psaData.providerName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</label>
                <p className="font-semibold text-gray-900">{psaData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tax ID</label>
                <p className="font-semibold text-gray-900">{psaData.taxId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Person</label>
                <p className="font-semibold text-gray-900">{psaData.contactName}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Effective Date</label>
                <p className="font-semibold text-gray-900">{psaData.effectiveDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">PSA Version</label>
                <p className="font-semibold text-gray-900">{psaData.psaVersion}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                <p className="font-semibold text-gray-900">{psaData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Building className="w-5 h-5 text-[#003087]" />
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Locations</label>
                <p className="font-semibold text-gray-900">{psaData.totalLocations}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Beautiful Color-Coded Key Terms Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-900 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">$</span>
            </div>
            Compensation
          </CardTitle>
          <p className="text-blue-700 font-medium">Article IV</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">
            Default rate: 100% of Medicare Allowable (Technical + Professional Components). 
            Rates represent global fees including both professional and technical components, 
            with USRad as sole payer.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-900 flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <Shield className="w-4 h-4 text-white" />
            </div>
            Provider Responsibilities
          </CardTitle>
          <p className="text-green-700 font-medium">Article II</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">
            Maintain licenses, CAQH credentialing, professional liability insurance ($1M/$3M), 
            general liability ($1M/$2M), and submit electronic claims within 60 days.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-yellow-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-yellow-900 flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <Clock className="w-4 h-4 text-white" />
            </div>
            Payment Terms
          </CardTitle>
          <p className="text-yellow-700 font-medium">Article IV</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">
            Consumer services: 10 business days. Insurance-based services: 30 days after 
            USRad receipt of payor funds. No balance billing permitted - USRad is sole payer.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-red-900 flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            Term & Termination
          </CardTitle>
          <p className="text-red-700 font-medium">Article V</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">
            Initial 1-year term with automatic renewal. 60-day notice for termination without cause. 
            30-day cure period for material breaches.
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Enhanced DocuSeal Integration Status */}
    <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-800 font-bold flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          DocuSeal Integration Ready
          <span className="ml-3 bg-green-500 text-white text-xs px-2 py-1 rounded">ACTIVE</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>Template ID: {docuSealData.templateId}</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>API configured</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>Field mapping complete</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>Ready for signing workflow</span>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Action Buttons */}
    <div className="flex gap-4">
      <Button variant="outline" className="flex items-center">
        <Download className="w-4 h-4 mr-2" />
        Download PDF Preview
      </Button>
      <Button 
        onClick={() => setCurrentStep('review')} 
        className="flex-1 bg-gradient-to-r from-[#003087] to-[#0052cc] hover:from-[#002060] hover:to-[#003d99]"
      >
        <PenTool className="w-4 h-4 mr-2" />
        Proceed to Sign Agreement
      </Button>
    </div>
  </div>
)}

      {/* Provider Info Review Step */}
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