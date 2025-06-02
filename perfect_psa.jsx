import { useState, useEffect } from 'react';
import { PenTool, CheckCircle, Clock, FileText, User, Calendar, AlertCircle, Download, ExternalLink, Shield, Building, Phone, Mail } from 'lucide-react';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

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

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const steps = ['terms-review', 'review', 'sign', 'completed'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

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
      }, 10000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Medical Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[url('/images/neural-network-top-right.svg')] bg-no-repeat bg-contain"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[url('/images/neural-network-bottom-left.svg')] bg-no-repeat bg-contain"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with USRad Branding */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#003087] to-[#0052cc] p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Provider Service Agreement</h1>
              <p className="text-blue-100 text-lg">
                Complete your PSA signing process with <span className="font-semibold text-white">{psaData.facilityName}</span>
              </p>
            </div>
            <div className="text-right">
              <Badge 
                variant={currentStep === 'completed' ? 'default' : 'secondary'} 
                className={`text-sm px-4 py-2 ${
                  currentStep === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-500 text-yellow-900'
                }`}
              >
                {currentStep === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
              </Badge>
            </div>
          </div>
          {/* Decorative medical plus pattern */}
          <div className="absolute -top-4 -right-4 w-24 h-24 text-white/20">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#003087] rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-[#003087]">Progress</h3>
                </div>
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              <Progress 
                value={getProgressPercentage()} 
                className="h-3 bg-gray-100"
                style={{
                  background: 'linear-gradient(to right, #003087 0%, #0052cc 100%)'
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Progress Steps */}
        <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
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
                      relative flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300
                      ${status === 'completed' ? 'bg-green-100 border-green-500 text-green-600 shadow-lg shadow-green-200' :
                        status === 'current' ? 'bg-[#003087] border-[#003087] text-white shadow-lg shadow-blue-300 scale-110' :
                        'bg-gray-50 border-gray-300 text-gray-400'}
                    `}>
                      {getStepIcon(step)}
                      {status === 'completed' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className={`text-sm font-semibold ${
                        status === 'current' ? 'text-[#003087]' :
                        status === 'completed' ? 'text-green-600' :
                        'text-gray-500'
                      }`}>
                        {stepLabels[step]}
                      </p>
                      {status === 'current' && (
                        <div className="w-2 h-2 bg-[#003087] rounded-full animate-pulse mt-1"></div>
                      )}
                    </div>
                    {index < 3 && (
                      <div className={`w-24 h-1 mx-6 rounded-full transition-all duration-500 ${
                        status === 'completed' ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Error Display with Medical Alert Styling */}
        {error && (
          <Alert variant="destructive" className="border-red-300 bg-red-50 shadow-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-red-800 font-semibold">Critical Error</AlertTitle>
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Terms Review Step */}
        {currentStep === 'terms-review' && (
          <div className="space-y-8">
            {/* Provider Details with Medical Styling */}
            <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-xl text-[#003087]">
                  <Building className="w-6 h-6 mr-3 text-[#003087]" />
                  Provider Service Agreement Details
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Complete healthcare partnership agreement for {psaData.facilityName}
                </CardDescription>
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

            {/* Key Terms with Vibrant Medical Colors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-900 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">$</span>
                    </div>
                    Compensation
                  </CardTitle>
                  <CardDescription className="text-blue-700 font-medium">Article IV</CardDescription>
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
                  <CardDescription className="text-green-700 font-medium">Article II</CardDescription>
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
                  <CardDescription className="text-yellow-700 font-medium">Article IV</CardDescription>
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
                  <CardDescription className="text-red-700 font-medium">Article V</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Initial 1-year term with automatic renewal. 60-day notice for termination without cause. 
                    30-day cure period for material breaches.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* DocuSeal Status with Medical Checkmarks */}
            <Alert className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-bold flex items-center">
                DocuSeal Integration Ready
                <Badge className="ml-3 bg-green-500 text-white">ACTIVE</Badge>
              </AlertTitle>
              <AlertDescription className="text-green-700 mt-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>✓ Template ID: {docuSealData.templateId}</div>
                  <div>✓ API configured</div>
                  <div>✓ Field mapping complete</div>
                  <div>✓ Ready for signing workflow</div>
                </div>
              </AlertDescription>
            </Alert>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex items-center border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Preview
              </Button>
              <Button 
                onClick={() => setCurrentStep('review')} 
                className="flex-1 bg-gradient-to-r from-[#003087] to-[#0052cc] hover:from-[#002060] hover:to-[#003d99] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <PenTool className="w-5 h-5 mr-2" />
                Proceed to Sign Agreement
              </Button>
            </div>
          </div>
        )}

        {/* Continue with other steps but maintain the enhanced visual styling... */}
        {/* Provider Info Review Step */}
        {currentStep === 'review' && (
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-xl text-[#003087]">
                  <User className="w-6 h-6 mr-3" />
                  Provider Information Review
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please verify your information before generating the PSA document
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Provider Name</label>
                      <p className="font-semibold text-gray-900">{psaData.providerName}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Email</label>
                      <p className="font-semibold text-gray-900">{psaData.email}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                      <p className="font-semibold text-gray-900">{psaData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tax ID</label>
                      <p className="font-semibold text-gray-900">{psaData.taxId}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Authorized Signer</label>
                      <p className="font-semibold text-gray-900">{psaData.contactName} - {psaData.signerTitle}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Effective Date</label>
                      <p className="font-semibold text-gray-900">{psaData.effectiveDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-800 font-bold">Ready to Generate Your PSA</AlertTitle>
              <AlertDescription className="text-blue-700 mt-2">
                This will create your Provider Service Agreement document using DocuSeal. 
                Please review the information above before proceeding.
              </AlertDescription>
            </Alert>

            <Button
              onClick={generatePSADocument}
              disabled={loading}
              size="lg"
              className="w-full bg-gradient-to-r from-[#003087] to-[#0052cc] hover:from-[#002060] hover:to-[#003d99] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-4"
            >
              {loading ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Generating Document...
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5 mr-2" />
                  Generate & Sign PSA
                </>
              )}
            </Button>
          </div>
        )}

        {/* Signing Step */}
        {currentStep === 'sign' && (
          <div className="space-y-6">
            <Alert className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-lg">
              <PenTool className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800 font-bold">Document Ready for Signature</AlertTitle>
              <AlertDescription className="text-yellow-700 mt-2">
                Your Provider Service Agreement is ready for review and signature.
                {docuSealData.submissionId && (
                  <span className="block mt-1 text-xs">
                    Submission ID: {docuSealData.submissionId}
                  </span>
                )}
              </AlertDescription>
            </Alert>
            
            {docuSealData.documentUrl ? (
              <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <CardTitle className="text-xl text-[#003087]">DocuSeal Signing Interface</CardTitle>
                  <CardDescription>
                    Click below to open your PSA document for review and signature
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6 p-8">
                  <FileText className="w-20 h-20 text-[#003087] mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ready to Sign Your PSA</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Your Provider Service Agreement is ready for review and signature.
                    Click below to open the document in a new tab.
                  </p>
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-[#003087] to-[#0052cc] hover:from-[#002060] hover:to-[#003d99] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <a
                      href={docuSealData.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Open Document to Sign
                    </a>
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Opens in a new tab • Secure DocuSeal interface
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Alert variant="destructive" className="shadow-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Document Error</AlertTitle>
                <AlertDescription>
                  No document URL received. Please check the console for details or contact support.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Completion Step */}
        {currentStep === 'completed' && (
          <div className="space-y-8">
            <Card className="text-center border-none shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="pt-12 pb-8">
                <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
                <CardTitle className="text-4xl mb-4 text-green-900">PSA Completed Successfully!</CardTitle>
                <CardDescription className="text-xl mb-8 text-green-700">
                  Your Provider Service Agreement has been signed and processed.
                </CardDescription>
                
                <Card className="max-w-md mx-auto border-green-200 bg-white/80">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">Agreement Details:</p>
                    <p className="font-bold text-lg text-gray-900">{psaData.psaVersion}</p>
                    <p className="text-sm text-gray-500">
                      Signed on {new Date().toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#003087]">What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">PSA Signed</p>
                      <Badge className="bg-green-500 text-white">Complete</Badge>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="w-8 h-8 text-[#003087]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Portal Setup</p>
                      <Badge variant="secondary">Next Step</Badge>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Start Receiving</p>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/dashboard/onboarding'}
                size="lg"
                className="w-full bg-gradient-to-r from-[#003087] to-[#0052cc] hover:from-[#002060] hover:to-[#003d99] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-4"
              >
                Continue to Portal Setup
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white"
                size="lg"
              >
                Return to Dashboard
              </Button>
              {docuSealData.signedDocumentUrl && (
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full border-green-500 text-green-700 hover:bg-green-500 hover:text-white"
                  size="lg"
                >
                  <a
                    href={docuSealData.signedDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Signed Agreement
                  </a>
                </Button>
              )}
            </div>

            {/* Support Contact */}
            <Card className="border-none shadow-lg bg-blue-50/50">
              <CardContent className="pt-6 text-center">
                <p className="text-gray-600">
                  Questions about your setup? 
                  <a href="mailto:support@usrad.com" className="text-[#003087] hover:underline font-medium ml-1">
                    Contact Support
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PSASigningSystemUpdated;