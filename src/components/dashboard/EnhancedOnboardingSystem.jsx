// Enhanced Onboarding System with Smart Return Journey
import React, { useState, useEffect } from 'react';

const SmartReturnBanner = ({ currentStep, lastSaved, progressPercentage, onContinue }) => {
  if (!currentStep || progressPercentage >= 100) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 mb-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Continue Your Setup</h3>
            <p className="text-blue-100">
              {progressPercentage}% complete • Last saved {lastSaved}
            </p>
          </div>
        </div>
        <button 
          onClick={onContinue}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Continue Setup →
        </button>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const OnboardingCard = ({ 
  title, 
  description, 
  status, 
  completedDate, 
  estimatedTime, 
  requirements, 
  onClick, 
  isLocked, 
  icon,
  inProgress = false
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'in_progress': return 'bg-orange-500';
      case 'unlocked': return 'bg-gray-300';
      default: return 'bg-gray-200';
    }
  };

  const getStatusIcon = () => {
    if (status === 'completed') {
      return (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    if (inProgress) {
      return (
        <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }
    return icon;
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'
      } ${inProgress ? 'border-orange-300 bg-orange-50' : ''}`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-start">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getStatusColor()}`}>
          {getStatusIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {status === 'completed' && completedDate && (
              <span className="text-xs text-green-600 font-medium">
                Completed {completedDate.toLocaleDateString()}
              </span>
            )}
            {inProgress && (
              <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                In Progress
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          {estimatedTime && status !== 'completed' && (
            <div className="text-xs text-gray-500 mb-3">
              <span className="font-medium">Estimated time:</span> {estimatedTime}
            </div>
          )}
          
          {requirements && requirements.length > 0 && status !== 'completed' && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-700">Requirements:</div>
              <ul className="space-y-1">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-xs text-gray-600">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {!isLocked && status !== 'completed' && (
            <div className="mt-4 pt-4 border-t">
              <span className="text-blue-600 font-medium text-sm hover:text-blue-700">
                {inProgress ? 'Continue →' : 'Start →'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnhancedOnboardingSystem = () => {
  const [userProgress, setUserProgress] = useState({
    onboarding_progress: 0,
    facilities_configured: false,
    psa_signed: false,
    credentialing_completed: false,
    banking_completed: false,
    isLoading: true,
    lastSavedAt: null,
    currentStep: null,
    inProgressSteps: []
  });

  // Load user progress and determine current step
  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        if (!window.USRadUser?.user?.id) {
          setUserProgress(prev => ({ ...prev, isLoading: false }));
          return;
        }

        const user = window.USRadUser.user;
        const supabase = window.USRadUser.supabase;
        
        // Load user profile progress
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // Load facilities
        const { data: facilities } = await supabase
          .from('user_facilities')
          .select('*')
          .eq('user_id', user.id);

        // Load corporate entity
        const { data: corporateEntity } = await supabase
          .from('corporate_entities')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // Determine current progress
        const facilitiesConfigured = facilities && facilities.length > 0;
        const psaSigned = profile?.psa_signed || false;
        const onboardingProgress = profile?.onboarding_progress || 0;

        // Determine current step based on progress
        let currentStep = null;
        let inProgressSteps = [];

        if (!facilitiesConfigured) {
          currentStep = 'facilities';
          // Check if there's any saved facility data
          const savedFacilityData = localStorage.getItem('facility_configuration_progress');
          if (savedFacilityData) {
            inProgressSteps.push('facilities');
          }
        } else if (!psaSigned) {
          currentStep = 'contract';
          // Check if there's any saved contract data
          const savedContractData = localStorage.getItem('contract_terms_accepted');
          if (savedContractData) {
            inProgressSteps.push('contract');
          }
        } else if (onboardingProgress < 75) {
          currentStep = 'credentialing';
        } else if (onboardingProgress < 100) {
          currentStep = 'banking';
        }

        setUserProgress({
          onboarding_progress: onboardingProgress,
          facilities_configured: facilitiesConfigured,
          psa_signed: psaSigned,
          credentialing_completed: onboardingProgress >= 75,
          banking_completed: onboardingProgress >= 100,
          isLoading: false,
          lastSavedAt: profile?.updated_at ? new Date(profile.updated_at) : null,
          currentStep,
          inProgressSteps,
          facilityCount: facilities?.length || 0
        });

      } catch (error) {
        console.error('Error loading progress:', error);
        setUserProgress(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUserProgress();
  }, []);

  const handleContinueSetup = () => {
    const { currentStep } = userProgress;
    
    switch (currentStep) {
      case 'facilities':
        window.location.href = '/dashboard/onboarding/facilities';
        break;
      case 'contract':
        // Check if they were in the middle of contract flow
        const contractTerms = localStorage.getItem('contract_terms_accepted');
        const negotiationRequest = localStorage.getItem('contract_negotiation_request');
        const confirmationCompleted = localStorage.getItem('psa_confirmation_completed');
        
        if (confirmationCompleted) {
          window.location.href = '/dashboard/onboarding/psa';
        } else if (contractTerms || negotiationRequest) {
          window.location.href = '/dashboard/contract/confirmation';
        } else {
          window.location.href = '/dashboard/contract/market-education';
        }
        break;
      case 'credentialing':
        window.location.href = '/dashboard/credentialing';
        break;
      case 'banking':
        window.location.href = '/dashboard/settings/unified#billing';
        break;
      default:
        window.location.href = '/dashboard/onboarding/facilities';
    }
  };

  const getLastSavedText = () => {
    if (!userProgress.lastSavedAt) return 'just now';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - userProgress.lastSavedAt) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (userProgress.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const onboardingSteps = [
    {
      id: 'organization',
      title: 'Organization Setup',
      description: 'Configure your corporate information and organization details',
      status: userProgress.facilities_configured ? 'completed' : 'active',
      completedDate: userProgress.facilities_configured ? new Date() : null,
      estimatedTime: '5-10 minutes',
      requirements: ['Legal entity information', 'Tax ID (EIN)', 'Corporate address'],
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/dashboard/settings/unified#organization',
      inProgress: userProgress.inProgressSteps.includes('organization')
    },
    {
      id: 'facilities',
      title: 'Facility Configuration',
      description: `Add your imaging center locations to the USRad network ${userProgress.facilityCount > 0 ? `(${userProgress.facilityCount} configured)` : ''}`,
      status: userProgress.facilities_configured ? 'completed' : 'active',
      completedDate: userProgress.facilities_configured ? new Date() : null,
      estimatedTime: '10-15 minutes per facility',
      requirements: ['Facility addresses', 'Equipment details', 'Modalities offered', 'ACR accreditation info'],
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => {
        if (userProgress.facilityCount >= 25) {
          window.location.href = '/dashboard/contract/csv-upload';
        } else {
          window.location.href = '/dashboard/onboarding/facilities';
        }
      },
      inProgress: userProgress.inProgressSteps.includes('facilities')
    },
    {
      id: 'contract',
      title: 'Contract & PSA Signing',
      description: 'Review contract terms and complete digital signing of Provider Service Agreement',
      status: userProgress.psa_signed ? 'completed' : (userProgress.facilities_configured ? 'unlocked' : 'locked'),
      completedDate: userProgress.psa_signed ? new Date() : null,
      estimatedTime: '15-20 minutes',
      requirements: ['Review market education', 'Select contract terms', 'Digital signature authorization'],
      isLocked: !userProgress.facilities_configured,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/dashboard/contract/market-education',
      inProgress: userProgress.inProgressSteps.includes('contract')
    },
    {
      id: 'credentialing',
      title: 'Credentialing & Verification',
      description: 'Complete credentialing requirements and insurance verification',
      status: userProgress.credentialing_completed ? 'completed' : (userProgress.psa_signed ? 'unlocked' : 'locked'),
      completedDate: userProgress.credentialing_completed ? new Date() : null,
      estimatedTime: '30-45 minutes',
      requirements: ['Professional licenses', 'Insurance verification', 'CAQH profile', 'Background checks'],
      isLocked: !userProgress.psa_signed,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/dashboard/credentialing'
    },
    {
      id: 'banking',
      title: 'Banking & Payment Setup',
      description: 'Configure payment processing and banking information for direct deposits',
      status: userProgress.banking_completed ? 'completed' : (userProgress.credentialing_completed ? 'unlocked' : 'locked'),
      completedDate: userProgress.banking_completed ? new Date() : null,
      estimatedTime: '10-15 minutes',
      requirements: ['Bank account details', 'Routing information', 'Tax forms', 'Payment preferences'],
      isLocked: !userProgress.credentialing_completed,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/dashboard/settings/unified#billing'
    },
    {
      id: 'launch',
      title: 'Network Activation',
      description: 'Final review and activation of your USRad network access',
      status: userProgress.onboarding_progress >= 100 ? 'completed' : 'locked',
      completedDate: userProgress.onboarding_progress >= 100 ? new Date() : null,
      estimatedTime: '5 minutes',
      requirements: ['All previous steps completed', 'Final verification', 'Network integration'],
      isLocked: !userProgress.banking_completed,
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.location.href = '/dashboard/launch'
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.status === 'completed').length;
  const totalSteps = onboardingSteps.length;

  return (
    <div className="space-y-8">
      {/* Smart Return Journey Banner */}
      <SmartReturnBanner 
        currentStep={userProgress.currentStep}
        lastSaved={getLastSavedText()}
        progressPercentage={userProgress.onboarding_progress}
        onContinue={handleContinueSetup}
      />

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Welcome to USRad! 🎉</h1>
          <p className="text-blue-100 text-xl mb-6">
            Let's get you onboarded to start providing diagnostic imaging services in our network.
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-white/30 rounded-full"></div>
              <span className="text-blue-100">Enterprise-grade platform for imaging providers</span>
            </div>
            <span className="text-blue-200">Trusted by 500+ centers nationwide</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Onboarding Progress</h2>
            <p className="text-gray-600">Complete these steps to join the USRad network</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{userProgress.onboarding_progress}%</div>
            <div className="text-sm text-gray-500">{completedSteps} of {totalSteps} steps</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${userProgress.onboarding_progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-600">
          {userProgress.onboarding_progress < 100 
            ? `Continue with ${userProgress.currentStep || 'next step'} to advance your onboarding progress`
            : 'Congratulations! Your onboarding is complete and you\'re ready to receive patients.'
          }
        </p>
      </div>

      {/* Onboarding Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {onboardingSteps.map((step) => (
          <OnboardingCard key={step.id} {...step} />
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600">Our onboarding specialists are here to assist you every step of the way.</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Schedule Call
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnboardingSystem;