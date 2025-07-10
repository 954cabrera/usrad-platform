// Onboarding Detector - Client-side component for intelligent routing
// Automatically detects user state and guides through optimal onboarding sequence

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onboardingRouter } from '@/services/onboardingRouter';
import { X, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export default function OnboardingDetector({ userId, currentPath }) {
  const [nextStep, setNextStep] = useState(null);
  const [shouldShowPrompt, setShouldShowPrompt] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (userId) {
      initializeDetector();
    }
  }, [userId, currentPath]);

  const initializeDetector = async () => {
    try {
      setIsLoading(true);
      
      // Get user's next step and analytics
      const [nextStepData, analyticsData] = await Promise.all([
        onboardingRouter.getNextStep(userId),
        onboardingRouter.getOnboardingAnalytics(userId)
      ]);

      setNextStep(nextStepData);
      setAnalytics(analyticsData);

      // Determine if we should show the onboarding prompt
      const shouldShow = await shouldShowOnboardingPrompt(nextStepData);
      setShouldShowPrompt(shouldShow);

    } catch (error) {
      console.error('❌ Error initializing onboarding detector:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowOnboardingPrompt = async (nextStepData) => {
    // Don't show if no next step (onboarding complete)
    if (!nextStepData) return false;

    // Don't show if already on onboarding page
    if (currentPath.includes('/dashboard/onboarding/')) return false;

    // Don't show if user dismissed recently
    const dismissedTime = localStorage.getItem('onboarding-prompt-dismissed');
    if (dismissedTime) {
      const timeSince = Date.now() - parseInt(dismissedTime);
      if (timeSince < 30 * 60 * 1000) return false; // 30 minutes
    }

    // Show if user has been on dashboard for a while without progress
    const progress = await onboardingRouter.getUserProgress(userId);
    const skipCount = progress?.skipCount || 0;
    
    return skipCount >= 1; // Show after first skip
  };

  const handleStartOnboarding = () => {
    if (nextStep) {
      // Track that user started onboarding
      window.dispatchEvent(new CustomEvent('onboardingStarted', {
        detail: { userId, step: nextStep.id }
      }));
      
      window.location.href = nextStep.route;
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShouldShowPrompt(false);
    
    // Remember dismissal
    localStorage.setItem('onboarding-prompt-dismissed', Date.now().toString());
    
    // Track dismissal
    window.dispatchEvent(new CustomEvent('onboardingDismissed', {
      detail: { userId, step: nextStep?.id }
    }));
  };

  const handleSkipToNext = () => {
    if (nextStep) {
      // Navigate directly to next step
      window.location.href = nextStep.route;
    }
  };

  // Don't render if loading or no prompt needed
  if (isLoading || !shouldShowPrompt || dismissed) {
    return null;
  }

  // Main onboarding prompt
  return (
    <div className="fixed top-4 right-4 max-w-sm bg-white rounded-lg shadow-lg border border-blue-200 z-50 animate-fade-in">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Continue Setup</h3>
              <p className="text-xs text-gray-500">
                {analytics?.completionPercentage}% complete
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${analytics?.completionPercentage || 0}%` }}
            />
          </div>
        </div>

        {/* Next Step Info */}
        {nextStep && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Next: {nextStep.title}
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              {nextStep.description}
            </p>
            
            {/* Value Proposition */}
            <div className="bg-blue-50 rounded-md p-2 mb-3">
              <p className="text-xs text-blue-700">
                💡 {nextStep.valueProposition}
              </p>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{nextStep.estimatedTime}</span>
              {analytics?.estimatedTimeRemaining && (
                <span className="ml-2">
                  • {analytics.estimatedTimeRemaining} total remaining
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleStartOnboarding}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
          >
            Continue Setup
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
          
          <button
            onClick={handleDismiss}
            className="w-full text-gray-600 text-xs py-1 px-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}

// Progress indicator component for onboarding pages
export function OnboardingProgress({ currentStepId, userId }) {
  const [steps, setSteps] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadOnboardingData();
  }, [currentStepId, userId]);

  const loadOnboardingData = async () => {
    try {
      const [stepsData, analyticsData] = await Promise.all([
        onboardingRouter.getOnboardingSteps(),
        onboardingRouter.getOnboardingAnalytics(userId)
      ]);

      setSteps(stepsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('❌ Error loading onboarding data:', error);
    }
  };

  const handleStepClick = async (step) => {
    // Only allow clicking on completed steps or current step
    const progress = await onboardingRouter.getUserProgress(userId);
    const isCompleted = progress?.completedSteps.includes(step.id);
    const isCurrent = step.id === currentStepId;
    
    if (isCompleted || isCurrent) {
      window.location.href = step.route;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Provider Onboarding
        </h3>
        {analytics && (
          <div className="text-sm text-gray-500">
            {analytics.completedSteps} of {analytics.totalSteps} completed
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${analytics?.completionPercentage || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Progress</span>
          <span>{analytics?.completionPercentage || 0}%</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isCompleted = analytics?.completedSteps >= step.order;
          const isCurrent = step.id === currentStepId;
          const isClickable = isCompleted || isCurrent;

          return (
            <div
              key={step.id}
              className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-blue-50 border border-blue-200'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              } ${isClickable ? 'hover:bg-opacity-70' : 'cursor-not-allowed opacity-60'}`}
              onClick={() => isClickable && handleStepClick(step)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{step.order}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {step.estimatedTime}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${
                  isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Remaining */}
      {analytics?.estimatedTimeRemaining && analytics.remainingSteps > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Estimated time remaining:</span>
            <span className="font-medium text-gray-900">
              {analytics.estimatedTimeRemaining}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}