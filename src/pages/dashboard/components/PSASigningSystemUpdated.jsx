// /src/pages/dashboard/components/PSASigningSystemUpdated.jsx
import { useState, useEffect } from 'react';
import { 
  PenTool, 
  CheckCircle, 
  Clock, 
  FileText, 
  User, 
  Calendar, 
  AlertCircle, 
  Download, 
  Shield, 
  Building, 
  Phone, 
  Mail 
} from 'lucide-react';

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { Progress } from "../../../components/ui/progress";

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    {/* Header Skeleton */}
    <div className="bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] text-white relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto p-8 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 bg-white/20 rounded-lg w-96 mb-2"></div>
            <div className="h-6 bg-white/15 rounded w-80"></div>
          </div>
          <div className="h-8 bg-white/20 rounded-full w-28"></div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto p-6 -mt-4 relative z-10">
      {/* Progress Section Skeleton */}
      <div className="mb-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none">
        <div className="p-6 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-6">
            <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-1/4"></div>
          </div>

          {/* Step Indicators Skeleton */}
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-16 h-16 rounded-full border-2 shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-blue-200 to-blue-300' : 'bg-gradient-to-r from-gray-200 to-gray-300'
                  }`}></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-2"></div>
                </div>
                {index < 3 && (
                  <div className="w-16 h-1 mx-4 rounded-full bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-8">
        {/* Provider Details Card Skeleton */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none">
          <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white p-6 rounded-t-xl">
            <div className="h-6 bg-white/20 rounded w-64 mb-2"></div>
            <div className="h-4 bg-white/15 rounded w-80"></div>
          </div>
          <div className="p-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-24 mb-1"></div>
                      <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-20 mb-1"></div>
                      <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Terms Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`border-l-4 ${
              i === 0 ? 'border-l-blue-500 bg-gradient-to-br from-blue-50 to-white' :
              i === 1 ? 'border-l-green-500 bg-gradient-to-br from-green-50 to-white' :
              i === 2 ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white' :
              'border-l-red-500 bg-gradient-to-br from-red-50 to-white'
            } shadow-xl rounded-xl animate-pulse`}>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 rounded-full mr-3 shadow-md ${
                    i === 0 ? 'bg-gradient-to-r from-blue-200 to-blue-300' :
                    i === 1 ? 'bg-gradient-to-r from-green-200 to-green-300' :
                    i === 2 ? 'bg-gradient-to-r from-yellow-200 to-yellow-300' :
                    'bg-gradient-to-r from-red-200 to-red-300'
                  }`}></div>
                  <div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DocuSeal Status Skeleton */}
        <div className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl border-2 rounded-xl animate-pulse">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-200 to-green-300 rounded mr-3"></div>
              <div className="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded w-48"></div>
              <div className="h-6 bg-gradient-to-r from-green-300 to-green-400 rounded-full w-16 ml-4"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-200 to-green-300 rounded mr-2"></div>
                  <div className="h-4 bg-gradient-to-r from-green-200 to-green-300 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-4">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
          <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>
  </div>
);

const PSASigningSystemUpdated = ({ providerData = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
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

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds for PSA complexity

    return () => clearTimeout(timer);
  }, []);

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

  // Show skeleton loading
  if (isLoading) {
    return (
      <div>
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .animate-pulse {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
            background-size: 200px;
          }
        `}</style>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Beautiful Header with Gradient Background */}
      <div className="bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-sm">
                Provider Service Agreement
              </h1>
              <p className="text-blue-100 text-lg">
                Complete your PSA signing process with <span className="font-bold text-white">{psaData.facilityName}</span>
              </p>
            </div>
            <Badge className="bg-yellow-500 text-yellow-900 font-semibold px-4 py-2">
              IN PROGRESS
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-4 relative z-10">
        {/* Progress Section with Beautiful Styling */}
        <Card className="mb-8 border-none shadow-xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-gray-700">Progress</span>
              </div>
              <span className="text-sm font-medium text-gray-600">25% Complete</span>
            </div>
            <Progress value={25} className="mb-6 h-2" />
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {['terms-review', 'review', 'sign', 'completed'].map((step, index) => {
                const status = getStepStatus(step);
                const stepLabels = {
                  'terms-review': 'Review Agreement',
                  'review': 'Provider Info',
                  'sign': 'Digital Signature', 
                  'completed': 'Completed'
                };
                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`
                        flex items-center justify-center w-16 h-16 rounded-full border-2 shadow-lg
                        ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                          status === 'current' ? 'bg-blue-600 border-blue-600 text-white' :
                          'bg-gray-200 border-gray-300 text-gray-500'}
                      `}>
                        {status === 'completed' ? 
                          <CheckCircle className="w-8 h-8" /> : 
                          getStepIcon(step)
                        }
                      </div>
                      <p className={`text-sm font-semibold mt-2 text-center ${
                        status === 'current' ? 'text-blue-600' :
                        status === 'completed' ? 'text-green-600' :
                        'text-gray-500'
                      }`}>
                        {stepLabels[step]}
                      </p>
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-1 mx-4 rounded-full ${
                        getStepStatus(['terms-review', 'review', 'sign', 'completed'][index + 1]) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Terms Review Step */}
        {currentStep === 'terms-review' && (
          <div className="space-y-8">
            {/* Provider Details with Enhanced Styling */}
            <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white">
                <CardTitle className="flex items-center text-xl">
                  <Building className="w-6 h-6 mr-3" />
                  Provider Service Agreement Details
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Complete healthcare partnership agreement for {psaData.facilityName}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Provider Name</label>
                        <p className="font-semibold text-gray-900 text-lg">{psaData.providerName}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Email</label>
                        <p className="font-semibold text-gray-900">{psaData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Tax ID</label>
                        <p className="font-semibold text-gray-900">{psaData.taxId}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Contact Person</label>
                        <p className="font-semibold text-gray-900">{psaData.contactName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Effective Date</label>
                        <p className="font-semibold text-gray-900">{psaData.effectiveDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">PSA Version</label>
                        <p className="font-semibold text-gray-900">{psaData.psaVersion}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Phone</label>
                        <p className="font-semibold text-gray-900">{psaData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Total Locations</label>
                        <p className="font-semibold text-gray-900">{psaData.totalLocations}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beautiful Color-Coded Key Terms Cards */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card className="border-l-4 border-l-red-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-red-50 to-white transform hover:-translate-y-1">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg text-red-900 flex items-center">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 shadow-md">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        Term & Termination
      </CardTitle>
      <p className="text-red-700 font-semibold">Article V</p>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700 leading-relaxed">
        Initial 1-year term with automatic renewal. 60-day notice for termination without cause. 
        30-day cure period for material breaches.
      </p>
    </CardContent>
  </Card>

  <Card className="border-l-4 border-l-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white transform hover:-translate-y-1">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg text-blue-900 flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
          <span className="text-white font-bold text-lg">$</span>
        </div>
        Compensation
      </CardTitle>
      <p className="text-blue-700 font-semibold">Article IV</p>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700 leading-relaxed">
        Default rate: 100% of Medicare Allowable (Technical + Professional Components). 
        Rates represent global fees including both professional and technical components, 
        with USRad as sole payer.
      </p>
    </CardContent>
  </Card>

  <Card className="border-l-4 border-l-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-white transform hover:-translate-y-1">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg text-green-900 flex items-center">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-md">
          <Shield className="w-5 h-5 text-white" />
        </div>
        Provider Responsibilities
      </CardTitle>
      <p className="text-green-700 font-semibold">Article II</p>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700 leading-relaxed">
        Maintain licenses, CAQH credentialing, professional liability insurance ($1M/$3M), 
        general liability ($1M/$2M), and submit electronic claims within 60 days.
      </p>
    </CardContent>
  </Card>

  <Card className="border-l-4 border-l-yellow-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-white transform hover:-translate-y-1">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg text-yellow-900 flex items-center">
        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-md">
          <Clock className="w-5 h-5 text-white" />
        </div>
        Payment Terms
      </CardTitle>
      <p className="text-yellow-700 font-semibold">Article IV</p>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700 leading-relaxed">
        Consumer services: 10 business days. Insurance-based services: 30 days after 
        USRad receipt of payor funds. No balance billing permitted - USRad is sole payer.
      </p>
    </CardContent>
  </Card>
</div>

            {/* Enhanced DocuSeal Integration Status */}
            <Card className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl border-2">
              <CardHeader>
                <CardTitle className="text-green-800 font-bold flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  DocuSeal Integration Status
                  <Badge className="ml-4 bg-green-500 text-white font-semibold">ACTIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
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
              <Button variant="outline" className="flex items-center hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Preview
              </Button>
              <Button 
                onClick={() => setCurrentStep('review')} 
                className="flex-1 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#1e3a8a] hover:to-[#2563eb] shadow-lg hover:shadow-xl transition-all duration-200 text-white"
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
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-900">Ready to Generate Your PSA?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">
                  This will create your Provider Service Agreement document using DocuSeal. 
                  Please review the information above before proceeding.
                </p>
                <Button
                  onClick={generatePSADocument}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Document...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-4 h-4 mr-2" />
                      Generate & Sign PSA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Signing Step */}
        {currentStep === 'sign' && (
          <div className="space-y-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Sign Your Document</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Please review and sign your PSA document below.
                {docuSealData.documentUrl && (
                  <span className="block text-sm mt-1">
                    Loading: {docuSealData.documentUrl}
                  </span>
                )}
              </AlertDescription>
            </Alert>
            
            {docuSealData.documentUrl ? (
              <Card className="shadow-xl">
                <CardHeader className="bg-gray-50">
                  <CardTitle>DocuSeal Signing Interface</CardTitle>
                  <CardDescription>Submission ID: {docuSealData.submissionId}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Ready to Sign Your PSA
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your Provider Service Agreement is ready for review and signature.
                    Click below to open the document in a new tab.
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <a
                      href={docuSealData.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      Open Document to Sign
                    </a>
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Opens in a new tab • Secure DocuSeal interface
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  No document URL received. Check console for details.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Completion Step */}
        {currentStep === 'completed' && (
          <div className="text-center space-y-6">
            <Card className="bg-green-50 border-green-200 shadow-xl">
              <CardContent className="p-8">
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
              </CardContent>
            </Card>

            {/* What's Next Section */}
            <Card className="bg-blue-50 border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-900">What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  window.location.href = '/dashboard/onboarding';
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Portal Setup
              </Button>
              <Button 
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
                variant="outline"
                className="w-full"
              >
                Return to Dashboard
              </Button>
              {docuSealData.signedDocumentUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={docuSealData.signedDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Signed Agreement
                  </a>
                </Button>
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
    </div>
  );
};


export default PSASigningSystemUpdated;