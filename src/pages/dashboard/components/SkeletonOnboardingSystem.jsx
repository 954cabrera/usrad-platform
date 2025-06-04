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
  // Mock onboarding status
  const onboardingStatus = {
    facilities: { completed: false, completedDate: null, status: "pending" },
    psa: { completed: false, completedDate: null, status: "locked" },
    caqh: { completed: false, completedDate: null, status: "locked" },
    banking: { completed: false, completedDate: null, status: "locked" },
    welcome: { completed: false, completedDate: null, status: "locked" },
  };

  const steps = Object.values(onboardingStatus);
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

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
              <span className="text-blue-100 font-medium">Your onboarding is in progress</span>
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
          <div className="progress-bar h-4 rounded-full bg-gradient-to-r from-green-400 to-green-500" style={{width: `${progressPercentage}%`}}></div>
        </div>

        <div className="text-sm text-gray-600">
          {completedSteps === totalSteps
            ? "🎉 Congratulations! Your onboarding is complete."
            : `${totalSteps - completedSteps} step${totalSteps - completedSteps !== 1 ? "s" : ""} remaining`}
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Step 1: Facility Locations Setup */}
        <div 
          className="usrad-card p-8 step-card active animate-fade-in-up cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-300" 
          style={{animationDelay: '0.2s'}}
          onClick={() => window.location.href = '/dashboard/onboarding/facilities'}
        >
          <div className="flex items-start">
            <div className="step-number bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <span className="font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
                Facility Locations Setup
              </h3>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Bulk CSV upload available
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

        {/* Additional steps would be rendered here based on the original logic */}
        {/* Step 2: PSA - Locked until facilities complete */}
        <div className="usrad-card p-8 step-card locked animate-fade-in-up cursor-not-allowed" style={{animationDelay: '0.3s'}}>
          <div className="flex items-start">
            <div className="step-number bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <span className="font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
                Provider Service Agreement
              </h3>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Includes your facility locations
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Est. 5-10 minutes
                </div>
              </div>
              <div className="mt-4 text-sm opacity-60">
                🔒 Complete facility setup first
              </div>
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