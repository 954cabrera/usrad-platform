// /src/pages/dashboard/components/SkeletonProviderDashboardSystem.jsx
// Fixed version - removes jsx styles and ensures progressive disclosure shows
import React, { useState, useEffect } from 'react';
import { 
  Building, 
  FileText, 
  TrendingUp, 
  GraduationCap, 
  Headphones,
  Lock, 
  CheckCircle, 
  Award, 
  ChevronRight, 
  X, 
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
  BookOpen,
  Download
} from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    <style>{`
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }

      .usrad-card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 48, 135, 0.08);
        transition: all 0.3s ease;
      }
    `}</style>

    {/* Hero Section Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-300/20 rounded-full translate-y-24 -translate-x-24"></div>
      <div className="relative z-10">
        <div className="h-10 bg-gray-300 rounded-lg w-2/3 mb-3 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded-lg w-1/2 mb-6 animate-pulse"></div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Key Metrics Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-15 h-15 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="text-right">
              <div className="h-10 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Main Content Grid Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Schedule Skeleton */}
      <div className="xl:col-span-2 usrad-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded-lg w-24 animate-pulse"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="ml-6 flex-1">
                <div className="h-5 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="space-y-8">
        {/* Quick Actions Skeleton */}
        <div className="usrad-card p-8">
          <div className="h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* System Status Skeleton */}
        <div className="usrad-card p-8">
          <div className="h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Progressive Disclosure Resource Panel Component
const ResourcePanel = ({ panel, onClose, hasCompletedPSA }) => {
  if (!panel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Panel Header */}
        <div className={`p-6 ${panel.premium ? 'bg-gradient-to-r from-[#003087] to-[#0040a0]' : 'bg-gradient-to-r from-gray-600 to-gray-700'} text-white relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <panel.icon className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">{panel.title}</h2>
              <p className="text-blue-100">{panel.description}</p>
            </div>
          </div>
          {panel.premium && (
            <div className="mt-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-yellow-300 font-semibold">Premium Content</span>
            </div>
          )}
        </div>

        {/* Panel Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {panel.available ? (
            <div className="space-y-6">
              {panel.content.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className={`p-4 ${section.status === 'available' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">{section.title}</h3>
                      <div className="flex items-center space-x-2">
                        {section.status === 'available' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-sm font-semibold ${section.status === 'available' ? 'text-green-600' : 'text-gray-400'}`}>
                          {section.status === 'available' ? 'Available' : 'Locked'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={`p-3 rounded-lg border ${section.status === 'available' ? 'bg-white border-gray-200 hover:border-blue-300 cursor-pointer' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                          <div className="flex items-center space-x-2">
                            {section.status === 'available' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Complete PSA to Unlock</h3>
              <p className="text-gray-600 mb-6">
                This premium content becomes available after completing your Provider Service Agreement.
              </p>
              <button 
                onClick={() => window.location.href = '/dashboard/onboarding/psa'}
                className="px-6 py-3 bg-gradient-to-r from-[#003087] to-[#0040a0] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Complete PSA Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SkeletonProviderDashboardSystem = ({ user, imagingCenter, mockData, fullyOnboarded }) => {
  // DEBUG: Add console logs to see what's being received
  console.log('🔍 Debug - mockData received:', mockData);
  console.log('🔍 Debug - hasCompletedPSA:', mockData?.hasCompletedPSA);
  console.log('🔍 Debug - onboardingProgress:', mockData?.onboardingProgress);

  const [isLoading, setIsLoading] = useState(true);
  const [showNetworkResources, setShowNetworkResources] = useState(false);
  const [activeResourcePanel, setActiveResourcePanel] = useState(null);

  // Extract progressive disclosure data from mockData
  const hasCompletedPSA = mockData?.hasCompletedPSA || false;
  const onboardingProgress = mockData?.onboardingProgress || 40;

  console.log('🔍 Debug - hasCompletedPSA extracted:', hasCompletedPSA);
  console.log('🔍 Debug - onboardingProgress extracted:', onboardingProgress);

  // Progressive disclosure helper functions
  const canAccessNetworkResources = () => true;
  const canAccessRevenueAnalytics = () => hasCompletedPSA;
  const canAccessAdvancedTraining = () => hasCompletedPSA;
  const canAccessDirectSupport = () => hasCompletedPSA;

  // Resource panels configuration
  const resourcePanels = {
    implementation: {
      title: 'Implementation Guide',
      icon: Building,
      description: 'Step-by-step setup process',
      available: canAccessNetworkResources(),
      premium: false,
      content: {
        sections: [
          { title: 'System Integration', status: 'available', items: ['PACS Connection', 'Network Setup', 'Security Config'] },
          { title: 'Staff Training', status: 'available', items: ['Basic Training', 'Workflow Overview', 'Support Contacts'] },
          { title: 'Go-Live Checklist', status: 'available', items: ['Pre-launch Tests', 'Staff Readiness', 'Support Setup'] }
        ]
      }
    },
    analytics: {
      title: 'Revenue Analytics',
      icon: TrendingUp,
      description: 'Advanced revenue insights and market intelligence',
      available: canAccessRevenueAnalytics(),
      premium: true,
      content: {
        sections: [
          { title: 'Revenue Dashboard', status: hasCompletedPSA ? 'available' : 'locked', items: ['Real-time Revenue', 'Monthly Trends', 'Forecasting'] },
          { title: 'Market Intelligence', status: hasCompletedPSA ? 'available' : 'locked', items: ['Competitive Analysis', 'Market Rates', 'Opportunity Mapping'] },
          { title: 'Performance Optimization', status: hasCompletedPSA ? 'available' : 'locked', items: ['Efficiency Metrics', 'Cost Analysis', 'ROI Calculator'] }
        ]
      }
    },
    training: {
      title: 'Training Center',
      icon: GraduationCap,
      description: 'Complete training curriculum and certification',
      available: canAccessAdvancedTraining(),
      premium: true,
      content: {
        sections: [
          { title: 'Basic Training', status: hasCompletedPSA ? 'available' : 'locked', items: ['Platform Overview', 'Basic Operations', 'Safety Protocols'] },
          { title: 'Advanced Modules', status: hasCompletedPSA ? 'available' : 'locked', items: ['Revenue Optimization', 'Quality Management', 'Compliance'] },
          { title: 'Certification', status: hasCompletedPSA ? 'available' : 'locked', items: ['Final Assessment', 'Certificate', 'Continuing Education'] }
        ]
      }
    },
    support: {
      title: 'Network Support',
      icon: Headphones,
      description: 'Direct access to USRad support team',
      available: canAccessDirectSupport(),
      premium: true,
      content: {
        sections: [
          { title: 'Direct Support', status: hasCompletedPSA ? 'available' : 'locked', items: ['Priority Phone Line', 'Email Support', 'Live Chat'] },
          { title: 'Account Management', status: hasCompletedPSA ? 'available' : 'locked', items: ['Dedicated Rep', 'Quarterly Reviews', 'Growth Planning'] },
          { title: 'Technical Support', status: hasCompletedPSA ? 'available' : 'locked', items: ['24/7 Tech Line', 'Remote Assistance', 'Emergency Support'] }
        ]
      }
    }
  };

  useEffect(() => {
    console.log('🔍 Debug - useEffect running, setting loading to false in 1 second');
    const timer = setTimeout(() => {
      console.log('🔍 Debug - Loading complete, should show main dashboard now');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  console.log('🔍 Debug - isLoading:', isLoading);

  if (isLoading) {
    console.log('🔍 Debug - Showing skeleton loader');
    return <SkeletonLoader />;
  }

  console.log('🔍 Debug - Showing main dashboard content');

  return (
    <div className="space-y-8">
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
          transform: translateY(-4px);
        }

        .usrad-navy {
          color: #003087;
        }
        .usrad-gold {
          color: #cc9933;
        }
        .bg-usrad-navy {
          background-color: #003087;
        }
        .bg-usrad-gold {
          background-color: #cc9933;
        }

        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }

        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
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

        .network-resources-toggle {
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .network-resources-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .network-resources-content.expanded {
          max-height: 2000px;
        }

        .progress-bar {
          transition: width 2s ease-out;
        }
      `}</style>

      {/* Enhanced Welcome Hero Section */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3" style={{fontFamily: 'Manrope, sans-serif'}}>
                Good {
                  new Date().getHours() < 12
                    ? "Morning"
                    : new Date().getHours() < 18
                      ? "Afternoon"
                      : "Evening"
                },
                {user?.firstName || "Doctor"}! 👋
              </h1>
              <p className="text-blue-100 text-xl mb-6" style={{fontFamily: 'Manrope, sans-serif'}}>
                {hasCompletedPSA 
                  ? "Your network access is fully activated. Explore all premium features below." 
                  : "Complete your PSA to unlock premium network resources and analytics."
                }
              </p>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${hasCompletedPSA ? 'bg-green-400' : 'bg-yellow-400'} rounded-full animate-pulse`}></div>
                  <span className="text-blue-100 font-medium">
                    {hasCompletedPSA ? 'Full network access active' : 'Onboarding in progress'}
                  </span>
                </div>
                <div className="text-blue-100">
                  Onboarding: {onboardingProgress}% complete
                </div>
              </div>
            </div>
            
            {/* Network Resources Toggle - THIS SHOULD BE VISIBLE */}
            <div className="text-right">
              <div className="text-4xl font-bold">{onboardingProgress}%</div>
              <div className="text-blue-100 mb-3">Complete</div>
              <button 
                onClick={() => {
                  console.log('🔍 Debug - Toggle button clicked, current state:', showNetworkResources);
                  setShowNetworkResources(!showNetworkResources);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm font-semibold network-resources-toggle"
              >
                <span>{showNetworkResources ? 'Hide' : 'Show'} Network Resources</span>
                {showNetworkResources ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure - Network Resources Section */}
      <div className={`network-resources-content ${showNetworkResources ? 'expanded' : ''}`}>
        {showNetworkResources && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Network Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(resourcePanels).map(([key, panel], index) => (
                <div 
                  key={key}
                  className={`usrad-card p-6 cursor-pointer transition-all duration-300 ${
                    panel.available ? 'hover:transform hover:-translate-y-1' : 'opacity-75'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveResourcePanel(key)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${panel.available ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <panel.icon className={`w-6 h-6 ${panel.available ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      {panel.premium && <Award className="w-4 h-4 text-yellow-500" />}
                      {panel.available ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold usrad-navy mb-2">{panel.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{panel.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      panel.available 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {panel.available ? 'Available' : 'PSA Required'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Network Tools Quick Access */}
            <div className="usrad-card p-6">
              <h3 className="text-xl font-bold usrad-navy mb-4">Network Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => hasCompletedPSA ? setActiveResourcePanel('analytics') : alert('Complete PSA to access revenue analytics')}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-300 ${
                    hasCompletedPSA 
                      ? 'border-blue-300 hover:bg-blue-50 text-blue-600' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Revenue Analytics</span>
                  {!hasCompletedPSA && <Lock className="w-3 h-3 mt-1" />}
                </button>
                
                <button 
                  onClick={() => hasCompletedPSA ? setActiveResourcePanel('training') : alert('Complete PSA to access training center')}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-300 ${
                    hasCompletedPSA 
                      ? 'border-blue-300 hover:bg-blue-50 text-blue-600' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <GraduationCap className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Training Center</span>
                  {!hasCompletedPSA && <Lock className="w-3 h-3 mt-1" />}
                </button>
                
                <button 
                  onClick={() => setActiveResourcePanel('implementation')}
                  className="flex flex-col items-center p-4 border border-blue-300 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-300"
                >
                  <Building className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Implementation</span>
                </button>
                
                <button 
                  onClick={() => hasCompletedPSA ? setActiveResourcePanel('support') : alert('Complete PSA to access direct support')}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-300 ${
                    hasCompletedPSA 
                      ? 'border-blue-300 hover:bg-blue-50 text-blue-600' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Headphones className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Direct Support</span>
                  {!hasCompletedPSA && <Lock className="w-3 h-3 mt-1" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Onboarding Banner */}
      {!fullyOnboarded && !hasCompletedPSA && (
        <div className="usrad-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-800">Complete your PSA to unlock premium features</h3>
                <p className="text-yellow-700 text-sm">Gain access to revenue analytics, advanced training, and direct support</p>
              </div>
            </div>
            <a href="/dashboard/onboarding/psa" className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors">
              Complete PSA →
            </a>
          </div>
        </div>
      )}

      {/* Your Existing Dashboard Content - Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Today's Appointments */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="stat-icon usrad-gradient-navy">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900" style={{fontFamily: 'Manrope, sans-serif'}}>
                {mockData?.todayAppointments || 8}
              </div>
              <div className="text-gray-600 font-medium">Today's Scans</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold">
              +12% vs yesterday
            </span>
            <a href="/dashboard/appointments" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Schedule →
            </a>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="stat-icon" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900" style={{fontFamily: 'Manrope, sans-serif'}}>
                {mockData?.totalAppointments || 124}
              </div>
              <div className="text-gray-600 font-medium">This Month</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold">
              +18% vs last month
            </span>
            <a href="/dashboard/analytics" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Trends →
            </a>
          </div>
        </div>

        {/* Completed Scans */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="stat-icon usrad-gradient-gold">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900" style={{fontFamily: 'Manrope, sans-serif'}}>
                {mockData?.completedScans || 98}
              </div>
              <div className="text-gray-600 font-medium">Completed</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-blue-50 px-3 py-2 rounded-full font-semibold usrad-navy">
              {Math.round(((mockData?.completedScans || 98) / (mockData?.totalAppointments || 124)) * 100)}% completion rate
            </span>
            <a href="/dashboard/reports" className="text-sm font-semibold usrad-gold hover:text-yellow-600 transition-colors">
              View Reports →
            </a>
          </div>
        </div>

        {/* Revenue */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="stat-icon" style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '28px', height: '28px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900" style={{fontFamily: 'Manrope, sans-serif'}}>
                ${((mockData?.totalRevenue || 47500) / 1000).toFixed(0)}K
              </div>
              <div className="text-gray-600 font-medium">This Month</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold">
              +8% vs last month
            </span>
            <a href="/dashboard/analytics" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Details →
            </a>
          </div>
        </div>
      </div>

      {/* Your Existing Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold usrad-navy" style={{fontFamily: 'Manrope, sans-serif'}}>
                Today's Schedule
              </h3>
              <p className="text-gray-600 mt-1">
                Managing {mockData?.todayAppointments || 8} appointments today
              </p>
            </div>
            <a href="/dashboard/appointments" className="px-6 py-3 usrad-gradient-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" style={{fontFamily: 'Manrope, sans-serif'}}>
              View All
            </a>
          </div>

          <div className="space-y-6">
            {/* Sample Appointments */}
            <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-20 h-20 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                <div className="text-center" style={{fontFamily: 'Manrope, sans-serif'}}>
                  <div className="text-lg font-bold">9:30</div>
                  <div className="text-xs opacity-80">AM</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
                  Sarah Johnson
                </h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Brain MRI
                  </span>
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    45 mins
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    With Contrast
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="flex items-center p-6 bg-gradient-to-r from-purple-50 to-transparent rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg" style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
                <div className="text-center" style={{fontFamily: 'Manrope, sans-serif'}}>
                  <div className="text-lg font-bold">11:15</div>
                  <div className="text-xs opacity-80">AM</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
                  Michael Chen
                </h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Knee MRI
                  </span>
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30 mins
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                    No Contrast
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  In Progress
                </span>
              </div>
            </div>

            <div className="flex items-center p-6 bg-gradient-to-r from-yellow-50 to-transparent rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-20 h-20 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                <div className="text-center" style={{fontFamily: 'Manrope, sans-serif'}}>
                  <div className="text-lg font-bold">2:00</div>
                  <div className="text-xs opacity-80">PM</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
                  Emma Rodriguez
                </h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Spine MRI
                  </span>
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    60 mins
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    With Contrast
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: 'Manrope, sans-serif'}}>
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => window.location.href='/dashboard/appointments'}
                className="w-full usrad-gradient-navy text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                <span className="flex items-center justify-center" style={{fontFamily: 'Manrope, sans-serif'}}>
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Schedule Appointment
                </span>
              </button>
              <button
                onClick={() => window.location.href='/dashboard/patients'}
                className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span style={{fontFamily: 'Manrope, sans-serif'}}>Add New Patient</span>
              </button>
              <button
                onClick={() => window.location.href='/dashboard/reports'}
                className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span style={{fontFamily: 'Manrope, sans-serif'}}>Generate Report</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: 'Manrope, sans-serif'}}>
              System Status
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-700" style={{fontFamily: 'Manrope, sans-serif'}}>MRI Scanner</span>
                </div>
                <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-700" style={{fontFamily: 'Manrope, sans-serif'}}>PACS System</span>
                </div>
                <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-700" style={{fontFamily: 'Manrope, sans-serif'}}>Backup System</span>
                </div>
                <span className="text-yellow-600 font-semibold bg-yellow-50 px-3 py-1 rounded-full text-sm">
                  Syncing
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: 'Manrope, sans-serif'}}>
              Today's Performance
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Average Scan Time</span>
                  <span className="font-bold text-gray-900">{mockData?.avgScanTime || "28 min"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Patient Satisfaction</span>
                  <span className="font-bold text-gray-900">{mockData?.patientSatisfaction || "4.8"}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="usrad-gradient-gold h-3 rounded-full transition-all duration-1000" style={{width: '96%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Equipment Utilization</span>
                  <span className="font-bold text-gray-900">84%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="usrad-gradient-navy h-3 rounded-full transition-all duration-1000" style={{width: '84%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Panel Modals */}
      {activeResourcePanel && (
        <ResourcePanel 
          panel={resourcePanels[activeResourcePanel]}
          onClose={() => setActiveResourcePanel(null)}
          hasCompletedPSA={hasCompletedPSA}
        />
      )}
    </div>
  );
};

export default SkeletonProviderDashboardSystem;