import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  PenTool, 
  CheckCircle, 
  Clock, 
  Download, 
  Send, 
  User, 
  Mail, 
  Calendar,
  AlertCircle,
  Loader2,
  Eye,
  RefreshCw
} from 'lucide-react';

const PSASigningSystem = () => {
  const [currentStep, setCurrentStep] = useState('review');
  const [psaData, setPsaData] = useState({
    providerId: 'PROV-2025-001',
    providerName: 'Advanced Imaging Center',
    email: 'admin@advancedimaging.com',
    phone: '(954) 555-0123',
    npi: '1234567890',
    taxId: '12-3456789',
    specialty: 'Diagnostic Radiology',
    effectiveDate: '2025-06-01',
    psaVersion: 'USRad Standard Agreement v1.0',
    generatedDate: new Date().toISOString().split('T')[0],
    facilityName: 'Advanced Imaging Center of Davie',
    address: '123 Medical Plaza Dr, Davie, FL 33328'
  });
  
  const [signingStatus, setSigningStatus] = useState('pending');
  const [docuSealData, setDocuSealData] = useState({
    submissionId: null,
    documentUrl: null,
    signedDocumentUrl: null,
    templateId: 'template_12345',
    status: 'draft'
  });
  
  const [loading, setLoading] = useState(false);

  // Real USRad PSA contract terms
  const psaTerms = [
    {
      section: 'Compensation (Article IV)',
      content: 'Default rate: 100% of Medicare Allowable (Technical + Professional Components). Rates represent global fees including both professional and technical components, with USRad as sole payer.'
    },
    {
      section: 'Provider Responsibilities (Article II)',
      content: 'Maintain licenses, CAQH credentialing, professional liability insurance ($1M/$3M), general liability ($1M/$2M), and submit electronic claims within 60 days.'
    },
    {
      section: 'Payment Terms (Article IV)',
      content: 'Consumer services: 10 business days. Insurance-based services: 30 days after USRad receipt of payor funds. No balance billing permitted - USRad is sole payer.'
    },
    {
      section: 'Term & Termination (Article V)',
      content: 'Initial 1-year term with automatic renewal. 60-day notice for termination without cause, 30-day cure period for material breaches.'
    },
    {
      section: 'Service Requirements (Article II)',
      content: 'Complete imaging services including technical and professional components. Use Provider Portal for claims, credentialing, and communications.'
    }
  ];

  // DocuSeal API integration for self-hosted server
  const generatePSADocument = async () => {
    setLoading(true);
    
    try {
      // API call to your self-hosted DocuSeal server
      const response = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: 'usrad_psa_template', // Your PSA template ID
          submitters: [{
            role: 'Provider',
            name: psaData.providerName,
            email: psaData.email,
            redirect_url: `${window.location.origin}/dashboard/onboarding/psa-complete`,
            fields: {
              provider_name: psaData.providerName,
              provider_email: psaData.email,
              provider_phone: psaData.phone,
              tax_id: psaData.taxId,
              npi: psaData.npi,
              facility_name: psaData.facilityName,
              facility_address: psaData.address,
              effective_date: psaData.effectiveDate,
              provider_date: new Date().toISOString().split('T')[0],
              signer_name: psaData.providerName,
              signer_title: 'Provider'
            }
          }]
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setDocuSealData(prev => ({
          ...prev,
          submissionId: data.id,
          documentUrl: data.submitters[0].url,
          status: 'awaiting_signature'
        }));
        
        setCurrentStep('sign');
        setSigningStatus('ready_to_sign');
      } else {
        throw new Error(data.message || 'Failed to create PSA document');
      }
      
    } catch (error) {
      console.error('Error generating PSA:', error);
      alert('Failed to generate PSA document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToDocuSeal = () => {
    // Redirect to your self-hosted DocuSeal server for signing
    window.location.href = docuSealData.documentUrl;
  };

  const simulateSignature = async () => {
    setLoading(true);
    
    try {
      // Simulate signature completion
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const signedUrl = `https://app.docuseal.co/d/${docuSealData.submissionId}/signed.pdf`;
      
      setDocuSealData(prev => ({
        ...prev,
        signedDocumentUrl: signedUrl,
        status: 'completed'
      }));
      
      setSigningStatus('completed');
      setCurrentStep('completed');
      
    } catch (error) {
      console.error('Error completing signature:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkSigningStatus = async () => {
    setLoading(true);
    
    try {
      // Simulate status check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Random status update for demo
      const statuses = ['sent', 'viewed', 'completed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (randomStatus === 'completed') {
        setSigningStatus('completed');
        setCurrentStep('completed');
        setDocuSealData(prev => ({
          ...prev,
          signedDocumentUrl: `https://app.docuseal.co/d/${prev.submissionId}/signed.pdf`,
          status: 'completed'
        }));
      } else {
        setSigningStatus(randomStatus);
      }
      
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      ready_to_sign: { color: 'bg-blue-100 text-blue-800', icon: PenTool },
      sent: { color: 'bg-purple-100 text-purple-800', icon: Send },
      viewed: { color: 'bg-indigo-100 text-indigo-800', icon: Eye },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Provider Service Agreement</h3>
          <StatusBadge status={signingStatus} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>Provider: {psaData.providerName}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>Email: {psaData.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>Tax ID: {psaData.taxId}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>Facility: {psaData.facilityName}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Effective Date: {psaData.effectiveDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>PSA Version: {psaData.psaVersion}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Generated: {psaData.generatedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Key Terms & Conditions</h4>
          {psaTerms.map((term, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h5 className="font-medium text-gray-800">{term.section}</h5>
              <p className="text-sm text-gray-600 mt-1">{term.content}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">USRad Provider Service Agreement</p>
              <p className="text-blue-700 mt-1">
                This agreement establishes you as an independent contractor in the USRad network for diagnostic imaging services.
                Key highlights: 100% Medicare rates, no balance billing, streamlined credentialing through CAQH, and comprehensive insurance requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button 
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => window.print()}
        >
          <Download className="w-4 h-4 mr-2 inline" />
          Download PDF
        </button>
        <button 
          onClick={generatePSADocument}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PenTool className="w-4 h-4 mr-2" />
          )}
          Proceed to Sign
        </button>
      </div>
    </div>
  );

  const renderSignStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sign PSA Document</h3>
          <StatusBadge status={signingStatus} />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">PSA Document Ready for Signature</h4>
            <p className="text-sm text-gray-600 mb-4">
              Your PSA document has been generated and is ready for digital signature on your secure DocuSeal server.
            </p>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Document ID:</strong> {docuSealData.submissionId}</p>
              <p><strong>Signing Server:</strong> Your Self-Hosted DocuSeal</p>
              <p><strong>Return URL:</strong> Dashboard → PSA Complete</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">Redirect Flow</p>
              <p className="text-blue-700 mt-1">
                You'll be redirected to your secure DocuSeal server to complete the signature process. 
                After signing, you'll automatically return to this dashboard to continue onboarding.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={redirectToDocuSeal}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            <PenTool className="w-5 h-5 mr-3 inline" />
            Sign PSA Document
          </button>
        </div>
      </div>
    </div>
  );

  const renderPendingStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Signature Pending</h3>
          <StatusBadge status={signingStatus} />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Waiting for Signature</h4>
          <p className="text-gray-600 mb-4">
            The PSA document has been sent to <strong>{psaData.email}</strong> for digital signature.
          </p>
          <p className="text-sm text-gray-500">
            You should receive an email from DocuSeal with signing instructions.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Document Status</p>
              <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
            <button 
              onClick={checkSigningStatus}
              disabled={loading}
              className="flex items-center px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Check Status
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={simulateSignature}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
            ) : (
              <PenTool className="w-4 h-4 mr-2 inline" />
            )}
            Simulate Signature Complete
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompletedStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">PSA Signed Successfully</h3>
          <StatusBadge status={signingStatus} />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Agreement Completed!</h4>
          <p className="text-gray-600 mb-4">
            Your Provider Service Agreement has been successfully signed and executed.
          </p>
          <p className="text-sm text-gray-500">
            Signed on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-green-800">Next Steps</p>
              <p className="text-sm text-green-700 mt-1">
                Your onboarding will continue with CAQH credentialing and banking setup.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => window.open(docuSealData.signedDocumentUrl, '_blank')}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Signed PSA
          </button>
          <button 
            onClick={() => {
              setCurrentStep('review');
              setSigningStatus('pending');
              setDocuSealData(prev => ({ ...prev, submissionId: null, documentUrl: null, signedDocumentUrl: null, status: 'draft' }));
            }}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Start New PSA
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Service Agreement</h1>
          <p className="text-gray-600">Digital signing workflow with DocuSeal integration</p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[
              { key: 'review', label: 'Review Agreement', icon: FileText },
              { key: 'sign', label: 'Digital Signature', icon: PenTool },
              { key: 'pending', label: 'Awaiting Signature', icon: Clock },
              { key: 'completed', label: 'Completed', icon: CheckCircle }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isCompleted = ['review', 'sign', 'pending'].indexOf(step.key) < ['review', 'sign', 'pending'].indexOf(currentStep);
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-1 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Content */}
        {currentStep === 'review' && renderReviewStep()}
        {currentStep === 'sign' && renderSignStep()}
        {currentStep === 'pending' && renderPendingStep()}
        {currentStep === 'completed' && renderCompletedStep()}
      </div>
    </div>
  );
};

export default PSASigningSystem;