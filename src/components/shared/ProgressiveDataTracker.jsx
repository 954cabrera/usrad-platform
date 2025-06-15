// Progressive Data Enhancement Tracker for USRad Platform
import React, { useState, useEffect } from 'react';
import { useUserDataFlow } from '@/hooks/useUserDataFlow';
import { CheckCircle, AlertCircle, Clock, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';

const ProgressiveDataTracker = ({ 
  isOpen = false, 
  onClose = () => {}, 
  showFloatingIndicator = true 
}) => {
  const { userData, getOnboardingProgress } = useUserDataFlow();
  const [progress, setProgress] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isDismissed, setIsDismissed] = useState(false);

  // Load progress data
  useEffect(() => {
    const loadProgress = async () => {
      const progressData = await getOnboardingProgress();
      setProgress(progressData);
      
      if (progressData && userData) {
        generateSuggestions(progressData, userData);
      }
    };

    if (userData) {
      loadProgress();
    }
  }, [userData, getOnboardingProgress]);

  // Generate personalized suggestions
  const generateSuggestions = (progressData, userData) => {
    const suggestions = [];
    
    // Profile suggestions
    if (!userData.profile?.full_name) {
      suggestions.push({
        id: 'add-name',
        category: 'profile',
        title: 'Add Your Full Name',
        description: 'Complete your profile for better personalization',
        priority: 'high',
        action: () => navigateToSettings('profile'),
        icon: '👤'
      });
    }

    if (!userData.profile?.phone) {
      suggestions.push({
        id: 'add-phone',
        category: 'profile',
        title: 'Add Phone Number',
        description: 'Required for account verification and support',
        priority: 'high',
        action: () => navigateToSettings('profile'),
        icon: '📞'
      });
    }

    if (!userData.profile?.center_name) {
      suggestions.push({
        id: 'add-center-name',
        category: 'profile',
        title: 'Add Practice/Center Name',
        description: 'This will auto-populate in other forms',
        priority: 'medium',
        action: () => navigateToSettings('profile'),
        icon: '🏥'
      });
    }

    // Organization suggestions
    if (!userData.corporate?.tax_id) {
      suggestions.push({
        id: 'add-tax-id',
        category: 'organization',
        title: 'Add Tax ID (EIN)',
        description: 'Required for PSA and billing setup',
        priority: 'high',
        action: () => navigateToSettings('organization'),
        icon: '🏛️'
      });
    }

    if (!userData.corporate?.corporate_address) {
      suggestions.push({
        id: 'add-address',
        category: 'organization',
        title: 'Add Corporate Address',
        description: 'Required for legal documentation',
        priority: 'medium',
        action: () => navigateToSettings('organization'),
        icon: '📍'
      });
    }

    if (!userData.corporate?.signer_name) {
      suggestions.push({
        id: 'add-signer',
        category: 'organization',
        title: 'Add Authorized Signer',
        description: 'Required for contract execution',
        priority: 'high',
        action: () => navigateToSettings('organization'),
        icon: '✍️'
      });
    }

    // Facility suggestions
    if (!userData.facilities || userData.facilities.length === 0) {
      suggestions.push({
        id: 'add-facility',
        category: 'facility',
        title: 'Add Your First Facility',
        description: 'Set up facility information for network access',
        priority: 'high',
        action: () => navigateToFacilities(),
        icon: '🏢'
      });
    }

    if (userData.facilities && userData.facilities.length > 0) {
      const incompleteFacilities = userData.facilities.filter(f => !f.setup_complete);
      if (incompleteFacilities.length > 0) {
        suggestions.push({
          id: 'complete-facilities',
          category: 'facility',
          title: `Complete ${incompleteFacilities.length} Facility Setup${incompleteFacilities.length > 1 ? 's' : ''}`,
          description: 'Finish setting up equipment and staff information',
          priority: 'medium',
          action: () => navigateToFacilities(),
          icon: '🔧'
        });
      }
    }

    // PSA suggestions
    if (!userData.profile?.psa_signed) {
      const isReadyForPSA = userData.corporate?.tax_id && 
                          userData.corporate?.signer_name && 
                          userData.facilities?.length > 0;
      
      if (isReadyForPSA) {
        suggestions.push({
          id: 'sign-psa',
          category: 'psa',
          title: 'Sign PSA Agreement',
          description: 'Complete your network onboarding',
          priority: 'high',
          action: () => navigateToPSA(),
          icon: '📋'
        });
      }
    }

    // Sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    suggestions.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    setSuggestions(suggestions.slice(0, 5)); // Show top 5 suggestions
  };

  // Navigation helpers
  const navigateToSettings = (tab) => {
    window.location.href = `/dashboard/settings?tab=${tab}`;
  };

  const navigateToFacilities = () => {
    window.location.href = '/dashboard/facility-management';
  };

  const navigateToPSA = () => {
    window.location.href = '/dashboard/psa';
  };

  // Dismiss suggestion
  const dismissSuggestion = (suggestionId) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    toast.info('Suggestion dismissed');
  };

  // Calculate overall completion
  const getCompletionPercentage = () => {
    if (!progress) return 0;
    return progress.percentComplete;
  };

  // Get next step
  const getNextStep = () => {
    if (!suggestions.length) return null;
    return suggestions[0];
  };

  // Floating indicator component
  const FloatingIndicator = () => {
    const completionPercentage = getCompletionPercentage();
    const nextStep = getNextStep();

    if (isDismissed || completionPercentage >= 90 || !nextStep) return null;

    return (
      <div className="fixed bottom-20 right-4 z-40 max-w-sm">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">{Math.round(completionPercentage)}%</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Setup Progress</p>
                <p className="text-xs text-gray-500">{100 - Math.round(completionPercentage)}% remaining</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDismissed(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Next: {nextStep.title}
            </p>
            <p className="text-xs text-gray-600">{nextStep.description}</p>
          </div>

          <button
            onClick={nextStep.action}
            className="w-full bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center"
          >
            Continue Setup
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  // Main progress modal
  const ProgressModal = () => {
    if (!isOpen) return null;

    const completionPercentage = getCompletionPercentage();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Setup Progress</h2>
                <p className="text-gray-600 mt-1">Complete your profile for the best experience</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Overall Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Completion</span>
                <span className="text-sm font-medium text-blue-600">{Math.round(completionPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Progress Steps */}
            {progress && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Completion Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    {progress.completedSteps.includes('profile') ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <span className={`${progress.completedSteps.includes('profile') ? 'text-gray-900' : 'text-gray-500'}`}>
                      Profile Information
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    {progress.completedSteps.includes('organization') ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <span className={`${progress.completedSteps.includes('organization') ? 'text-gray-900' : 'text-gray-500'}`}>
                      Organization Setup
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    {progress.completedSteps.includes('facility') ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <span className={`${progress.completedSteps.includes('facility') ? 'text-gray-900' : 'text-gray-500'}`}>
                      Facility Configuration
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    {progress.completedSteps.includes('psa') ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <span className={`${progress.completedSteps.includes('psa') ? 'text-gray-900' : 'text-gray-500'}`}>
                      PSA Agreement
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recommended Next Steps</h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="text-2xl mr-3">{suggestion.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                suggestion.priority === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : suggestion.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {suggestion.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          <button
                            onClick={suggestion.action}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 mr-2"
                          >
                            Fix Now
                          </button>
                          <button
                            onClick={() => dismissSuggestion(suggestion.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Message */}
            {completionPercentage >= 90 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-900 mb-1">
                  Setup Almost Complete!
                </h3>
                <p className="text-green-700">
                  You're ready to start using the USRad network.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showFloatingIndicator && <FloatingIndicator />}
      <ProgressModal />
    </>
  );
};

export default ProgressiveDataTracker;