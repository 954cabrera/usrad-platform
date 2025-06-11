// /src/pages/dashboard/components/SkeletonOnboardingSystem.jsx
import React, { useState, useEffect } from 'react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Welcome Header Skeleton */}
    <div className="usrad-card p-8 usrad-gradient-navy relative overflow-hidden animate-pulse">
      <div className="relative z-10">
        <div className="h-10 bg-white/20 rounded-lg w-64 mb-3"></div>
        <div className="h-6 bg-white/15 rounded w-96 mb-6"></div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="h-4 bg-white/15 rounded w-48"></div>
          </div>
          <div className="h-4 bg-white/15 rounded w-32"></div>
        </div>
      </div>
    </div>

    {/* Progress Overview Skeleton */}
    <div className="usrad-card p-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64"></div>
        </div>
        <div className="text-right">
          <div className="h-10 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-gradient-to-r from-green-200 to-green-300 h-4 rounded-full w-1/5"></div>
      </div>

      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
    </div>

    {/* Onboarding Steps Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="usrad-card p-8 animate-pulse" style={{animationDelay: `${0.2 + i * 0.1}s`}}>
          <div className="flex items-start">
            <div className={`w-10 h-10 rounded-full mr-4 ${
              i === 0 ? 'bg-gradient-to-r from-green-200 to-green-300' :
              i === 1 ? 'bg-gradient-to-r from-blue-200 to-blue-300' :
              'bg-gradient-to-r from-gray-200 to-gray-300'
            }`}></div>
            <div className="flex-1">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2"></div>
              <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mr-2"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Support Section Skeleton */}
    <div className="usrad-card p-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32"></div>
          <div className="h-12 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

const OnboardingContent = () => {
  // STATE: Real progress tracking (not mock data)
  const [userProgress, setUserProgress] = useState({
    onboarding_progress: 25,
    facilities_configured: true,
    psa_signed: false,
    caqh_completed: false,
    banking_completed: false,
    isLoading: false
  });

  // LOAD REAL PROGRESS from database
  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        if (!window.USRadUser?.user?.id) {
          setUserProgress(prev => ({ ...prev, isLoading: false }));
          return;
        }

        // Import supabase dynamically or use existing client
        const { supabase } = await import('../../lib/supabase.js');
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('onboarding_progress, facilities_configured, psa_signed, company_name')
          .eq('id', window.USRadUser.user.id)
          .single();

        if (error) {
          console.error('Error loading user progress:', error);
          setUserProgress(prev => ({ ...prev, isLoading: false }));
          return;
        }

        if (data) {
          console.log('📊 Loaded user progress:', data);
          setUserProgress({
            onboarding_progress: data.onboarding_progress || 0,
            facilities_configured: data.facilities_configured || false,
            psa_signed: data.psa_signed || false,
            caqh_completed: false, // Add these fields to your DB later
            banking_completed: false, // Add these fields to your DB later
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        setUserProgress(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUserProgress();
  }, []);

  // REAL onboarding status based on database data
  const onboardingStatus = {
    facilities: { 
      completed: userProgress.facilities_configured, 
      completedDate: userProgress.facilities_configured ? new Date() : null, 
      status: userProgress.facilities_configured ? "completed" : "active",
      progress: userProgress.facilities_configured ? 25 : 0
    },
    psa: { 
      completed: userProgress.psa_signed, 
      completedDate: userProgress.psa_signed ? new Date() : null, 
      status: userProgress.facilities_configured ? (userProgress.psa_signed ? "completed" : "unlocked") : "locked",
      progress: userProgress.psa_signed ? 50 : 0
    },
    caqh: { 
      completed: userProgress.caqh_completed, 
      completedDate: userProgress.caqh_completed ? new Date() : null, 
      status: userProgress.psa_signed ? (userProgress.caqh_completed ? "completed" : "unlocked") : "locked",
      progress: userProgress.caqh_completed ? 75 : 0
    },
    banking: { 
      completed: userProgress.banking_completed, 
      completedDate: userProgress.banking_completed ? new Date() : null, 
      status: userProgress.caqh_completed ? (userProgress.banking_completed ? "completed" : "unlocked") : "locked",
      progress: userProgress.banking_completed ? 100 : 0
    },
    welcome: { 
      completed: userProgress.onboarding_progress >= 100, 
      completedDate: userProgress.onboarding_progress >= 100 ? new Date() : null, 
      status: userProgress.onboarding_progress >= 100 ? "completed" : "locked",
      progress: userProgress.onboarding_progress >= 100 ? 100 : 0
    }
  };

  const steps = Object.values(onboardingStatus);
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = userProgress.onboarding_progress; // Use real progress, not calculated

  if (userProgress.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3" style={{fontFamily: "'Manrope', sans-serif"}}>
            Welcome to USRad! 🎉
          </h1>
          <p className="text-blue-100 text-xl mb-6" style={{fontFamily: "'Manrope', sans-serif"}}>
            Let's get you onboarded to start providing diagnostic imaging services in our network.
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 font-medium">
                {progressPercentage >= 100 ? "Onboarding complete!" : "Your onboarding is in progress"}
              </span>
            </div>
            <div className="text-blue-100">
              {completedSteps} of {totalSteps} steps completed
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>
              Onboarding Progress
            </h2>
            <p className="text-gray-600 mt-1">
              Complete all steps to activate your provider account
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold usrad-gold" style={{fontFamily: "'Manrope', sans-serif"}}>
              {progressPercentage}%
            </div>
            <div className="text-gray-600 font-medium">Complete</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="progress-bar h-4 rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>

        <div className="text-sm text-gray-600">
          {progressPercentage >= 100
            ? "🎉 Congratulations! Your onboarding is complete."
            : `${totalSteps - completedSteps} step${totalSteps - completedSteps !== 1 ? "s" : ""} remaining`}
        </div>
      </div>

      {/* ALL 5 Onboarding Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Step 1: Facility Locations Setup */}
        <div 
          className={`usrad-card p-8 step-card ${onboardingStatus.facilities.status === 'completed' ? 'completed' : 'active'} animate-fade-in-up cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-300`}
          style={{animationDelay: '0.2s'}}
          onClick={() => window.location.href = '/dashboard/onboarding/facilities'}
        >
          <div className="flex items-start">
            <div className={`step-number ${onboardingStatus.facilities.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'} w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white`}>
              {onboardingStatus.facilities.completed ? '✓' : '1'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{fontFamily: "'Manrope', sans-serif"}}>
                  Facility Locations Setup
                </h3>
                {onboardingStatus.facilities.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✅ COMPLETED
                  </span>
                )}
              </div>
              <p className="mb-4 opacity-90">
                Add all imaging center locations that will be included in your Provider Service Agreement.
              </p>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Support for 1 to 1000+ locations
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Est. 5-15 minutes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Provider Service Agreement */}
        <div 
          className={`usrad-card p-8 step-card ${onboardingStatus.psa.status} animate-fade-in-up ${onboardingStatus.psa.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:transform hover:-translate-y-1'} transition-all duration-300`}
          style={{animationDelay: '0.3s'}}
          onClick={() => onboardingStatus.psa.status !== 'locked' && (window.location.href = '/dashboard/onboarding/psa')}
        >
          <div className="flex items-start">
            <div className={`step-number ${onboardingStatus.psa.completed ? 'bg-green-500' : onboardingStatus.psa.status === 'unlocked' ? 'bg-blue-500' : 'bg-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white`}>
              {onboardingStatus.psa.completed ? '✓' : '2'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{fontFamily: "'Manrope', sans-serif"}}>
                  Provider Service Agreement
                </h3>
                {onboardingStatus.psa.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✅ COMPLETED
                  </span>
                )}
                {onboardingStatus.psa.status === 'unlocked' && !onboardingStatus.psa.completed && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    🔓 READY
                  </span>
                )}
              </div>
              <p className="mb-4 opacity-90">
                Review and digitally sign your PSA with all facility locations included.
              </p>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  100% Medicare rates
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Est. 5-10 minutes
                </div>
              </div>
              {onboardingStatus.psa.status === 'locked' && (
                <div className="mt-4 text-sm opacity-60">
                  🔒 Complete facility setup first
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: CAQH Credentialing */}
        <div 
          className={`usrad-card p-8 step-card ${onboardingStatus.caqh.status} animate-fade-in-up ${onboardingStatus.caqh.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:transform hover:-translate-y-1'} transition-all duration-300`}
          style={{animationDelay: '0.4s'}}
          onClick={() => onboardingStatus.caqh.status !== 'locked' && (window.location.href = '/dashboard/onboarding/caqh')}
        >
          <div className="flex items-start">
            <div className={`step-number ${onboardingStatus.caqh.completed ? 'bg-green-500' : onboardingStatus.caqh.status === 'unlocked' ? 'bg-blue-500' : 'bg-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white`}>
              {onboardingStatus.caqh.completed ? '✓' : '3'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{fontFamily: "'Manrope', sans-serif"}}>
                  CAQH Credentialing
                </h3>
                {onboardingStatus.caqh.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✅ COMPLETED
                  </span>
                )}
                {onboardingStatus.caqh.status === 'unlocked' && !onboardingStatus.caqh.completed && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    🔓 READY
                  </span>
                )}
              </div>
              <p className="mb-4 opacity-90">
                Complete provider credentialing through CAQH ProView for network participation.
              </p>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Provider verification
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Est. 15-30 minutes
                </div>
              </div>
              {onboardingStatus.caqh.status === 'locked' && (
                <div className="mt-4 text-sm opacity-60">
                  🔒 Complete PSA signing first
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 4: Banking Setup */}
        <div 
          className={`usrad-card p-8 step-card ${onboardingStatus.banking.status} animate-fade-in-up ${onboardingStatus.banking.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:transform hover:-translate-y-1'} transition-all duration-300`}
          style={{animationDelay: '0.5s'}}
          onClick={() => onboardingStatus.banking.status !== 'locked' && (window.location.href = '/dashboard/onboarding/banking')}
        >
          <div className="flex items-start">
            <div className={`step-number ${onboardingStatus.banking.completed ? 'bg-green-500' : onboardingStatus.banking.status === 'unlocked' ? 'bg-blue-500' : 'bg-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white`}>
              {onboardingStatus.banking.completed ? '✓' : '4'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{fontFamily: "'Manrope', sans-serif"}}>
                  Banking Information
                </h3>
                {onboardingStatus.banking.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✅ COMPLETED
                  </span>
                )}
                {onboardingStatus.banking.status === 'unlocked' && !onboardingStatus.banking.completed && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    🔓 READY
                  </span>
                )}
              </div>
              <p className="mb-4 opacity-90">
                Set up banking details for payment processing and revenue distribution.
              </p>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  ACH setup for payments
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Est. 5-10 minutes
                </div>
              </div>
              {onboardingStatus.banking.status === 'locked' && (
                <div className="mt-4 text-sm opacity-60">
                  🔒 Complete CAQH credentialing first
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 5: Welcome / Go Live */}
        <div 
          className={`usrad-card p-8 step-card ${onboardingStatus.welcome.status} animate-fade-in-up md:col-span-2 ${onboardingStatus.welcome.status === 'locked' ? 'cursor-not-allowed opacity-60' : onboardingStatus.welcome.completed ? 'cursor-pointer' : 'cursor-default'} transition-all duration-300`}
          style={{animationDelay: '0.6s'}}
        >
          <div className="flex items-start">
            <div className={`step-number ${onboardingStatus.welcome.completed ? 'bg-green-500' : 'bg-gray-400'} w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white`}>
              {onboardingStatus.welcome.completed ? '🎉' : '5'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{fontFamily: "'Manrope', sans-serif"}}>
                  {onboardingStatus.welcome.completed ? 'Welcome to USRad Network!' : 'Network Activation'}
                </h3>
                {onboardingStatus.welcome.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    🎉 LIVE
                  </span>
                )}
              </div>
              <p className="mb-4 opacity-90">
                {onboardingStatus.welcome.completed 
                  ? "Congratulations! You're now live on the USRad network and ready to serve patients."
                  : "Final activation and welcome to the USRad provider network."
                }
              </p>
              {onboardingStatus.welcome.completed ? (
                <div className="space-y-2 text-sm opacity-80">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Access to patient referrals
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Full platform features unlocked
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-sm opacity-60">
                  🔒 Complete banking setup first
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold usrad-navy mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
              Need Help?
            </h3>
            <p className="text-gray-600">
              Our onboarding team is here to assist you every step of the way.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 usrad-gradient-navy text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Email Support
            </button>
            <button className="px-6 py-3 border-2 border-usrad-gold text-usrad-gold font-semibold rounded-lg hover:bg-usrad-gold hover:text-white transition-all duration-300">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonOnboardingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300); // 1.3 seconds for onboarding complexity

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{`
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }

        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .bg-usrad-navy { background-color: #003087; }
        .bg-usrad-gold { background-color: #cc9933; }

        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }

        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
        }

        .step-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .step-card.completed {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .step-card.active {
          background: linear-gradient(135deg, #003087, #001a4d);
          color: white;
        }

        .step-card.locked {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .step-card.locked:hover {
          transform: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

      {isLoading ? <SkeletonLoader /> : <OnboardingContent />}
    </div>
  );
};

export default SkeletonOnboardingSystem;