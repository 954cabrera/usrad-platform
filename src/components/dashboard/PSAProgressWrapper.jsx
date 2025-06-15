// PSA Progress Wrapper - Professional progress tracking for PSA signing process
// This component wraps around the existing PSA system without modifying core functionality
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, FileText, User, PenTool, Award, ArrowRight, Loader2 } from 'lucide-react';
import { useUserDataFlow } from '@/hooks/useUserDataFlow';

const PSAProgressWrapper = ({ children, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepProgress, setStepProgress] = useState(0);
  const [isObservingContent, setIsObservingContent] = useState(false);
  const contentRef = useRef(null);
  const { userData } = useUserDataFlow();

  // PSA Steps Configuration
  const psaSteps = [
    {
      id: 1,
      title: "Review Agreement",
      description: "Review terms and conditions",
      icon: FileText,
      color: "blue"
    },
    {
      id: 2,
      title: "Provider Information",
      description: "Verify your details",
      icon: User,
      color: "purple"
    },
    {
      id: 3,
      title: "Digital Signature",
      description: "Sign the agreement",
      icon: PenTool,
      color: "orange"
    },
    {
      id: 4,
      title: "Completed",
      description: "PSA successfully signed",
      icon: Award,
      color: "green"
    }
  ];

  // Safe DOM observation to track progress without interfering with DocuSeal
  useEffect(() => {
    if (!contentRef.current) return;

    const observeContent = () => {
      setIsObservingContent(true);
      
      // Create a mutation observer to watch for DOM changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            detectCurrentStep();
          }
        });
      });

      // Start observing
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });

      // Initial step detection
      detectCurrentStep();

      return () => {
        observer.disconnect();
        setIsObservingContent(false);
      };
    };

    // Delay observation to ensure DocuSeal is loaded
    const timer = setTimeout(observeContent, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Detect current step based on DOM content (safe, non-intrusive)
  const detectCurrentStep = () => {
    if (!contentRef.current) return;

    try {
      const content = contentRef.current;
      const textContent = content.textContent?.toLowerCase() || '';
      
      // Safe step detection based on visible content
      if (textContent.includes('sign') && textContent.includes('here')) {
        updateStep(3); // Digital Signature step
      } else if (textContent.includes('provider') || textContent.includes('information')) {
        updateStep(2); // Provider Information step
      } else if (textContent.includes('agreement') || textContent.includes('review')) {
        updateStep(1); // Review Agreement step
      } else if (textContent.includes('completed') || textContent.includes('success')) {
        updateStep(4); // Completed step
      }

      // Check for loading states
      if (textContent.includes('loading') || content.querySelector('.animate-spin')) {
        setStepProgress(25);
      } else {
        setStepProgress(100);
      }

    } catch (error) {
      console.log('Step detection error (non-critical):', error);
    }
  };

  // Update current step and track completion
  const updateStep = (stepNumber) => {
    if (stepNumber !== currentStep) {
      setCurrentStep(stepNumber);
      
      // Mark previous steps as completed
      const completed = [];
      for (let i = 1; i < stepNumber; i++) {
        completed.push(i);
      }
      setCompletedSteps(completed);

      // Notify parent component
      if (onStepChange) {
        onStepChange(stepNumber, completed);
      }

      console.log(`PSA Progress: Advanced to step ${stepNumber}`);
    }
  };

  // Get step status
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  // Calculate overall progress percentage
  const getOverallProgress = () => {
    const totalSteps = psaSteps.length;
    const progressPerStep = 100 / totalSteps;
    const completedProgress = completedSteps.length * progressPerStep;
    const currentStepProgress = (stepProgress / 100) * progressPerStep;
    return Math.min(100, completedProgress + currentStepProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Title and Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Provider Services Agreement</h1>
                  <p className="text-gray-600 mt-1">Complete your PSA to join the USRad network</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Overall Progress</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(getOverallProgress())}%
                  </div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getOverallProgress()}%` }}
                />
              </div>
            </div>

            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between">
              {psaSteps.map((step, index) => {
                const status = getStepStatus(step.id);
                const isLast = index === psaSteps.length - 1;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                        ${status === 'completed' 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : status === 'active'
                          ? `bg-${step.color}-500 border-${step.color}-500 text-white`
                          : 'bg-white border-gray-300 text-gray-400'
                        }
                      `}>
                        {status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : status === 'active' ? (
                          currentStep === 4 ? (
                            <step.icon className="w-6 h-6" />
                          ) : (
                            <div className="w-6 h-6 flex items-center justify-center">
                              {stepProgress < 100 ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <step.icon className="w-5 h-5" />
                              )}
                            </div>
                          )
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="mt-3 text-center">
                        <div className={`text-sm font-medium ${
                          status === 'active' ? 'text-gray-900' : 
                          status === 'completed' ? 'text-green-600' : 
                          'text-gray-500'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {step.description}
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {!isLast && (
                      <div className="flex-1 mx-4">
                        <div className={`h-0.5 transition-colors duration-300 ${
                          completedSteps.includes(step.id) || completedSteps.includes(step.id + 1)
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Step Context */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full bg-${psaSteps[currentStep - 1]?.color}-100 flex items-center justify-center mr-3`}>
                <psaSteps[currentStep - 1]?.icon className={`w-5 h-5 text-${psaSteps[currentStep - 1]?.color}-600`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Step {currentStep}: {psaSteps[currentStep - 1]?.title}
                </h3>
                <p className="text-gray-600">
                  {psaSteps[currentStep - 1]?.description}
                </p>
              </div>
              {isObservingContent && (
                <div className="ml-auto">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Monitoring progress
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PSA Content Container */}
        <div 
          ref={contentRef}
          className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          style={{ minHeight: '600px' }}
        >
          {children}
        </div>

        {/* Auto-populated Data Preview (if available) */}
        {userData && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Auto-populated Information Ready
                </h4>
                <p className="text-sm text-blue-700">
                  Your profile and organization data will be automatically filled in the PSA form.
                </p>
                {userData.profile?.full_name && (
                  <div className="mt-2 text-xs text-blue-600">
                    <span className="font-medium">Signer:</span> {userData.profile.full_name}
                    {userData.corporate?.corporate_name && (
                      <span className="ml-4">
                        <span className="font-medium">Organization:</span> {userData.corporate.corporate_name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <FileText className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Document Questions</p>
                <p className="text-xs text-gray-600">Contact legal@usrad.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <User className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Technical Support</p>
                <p className="text-xs text-gray-600">Contact support@usrad.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <PenTool className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Signing Issues</p>
                <p className="text-xs text-gray-600">Call (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSAProgressWrapper;