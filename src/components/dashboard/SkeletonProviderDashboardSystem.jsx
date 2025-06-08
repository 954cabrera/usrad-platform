// /src/components/dashboard/SkeletonProviderDashboardSystem.jsx
// Enhanced version with spectacular demo mode - PSA system fully preserved
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
  Download,
  Eye,
  Sparkles,
  Shield,
  BarChart3,
  Crown,
  Zap,
  ArrowRight,
  Play,
  Calendar,
  Users,
  DollarSign,
  Activity,
  Unlock
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

// ✨ SPECTACULAR VALUE PREVIEW MODAL
const SpectacularValueModal = ({ feature, onClose }) => {
  if (!feature) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                  <p className="text-blue-100 text-lg">{feature.description}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <Zap className="w-8 h-8 text-yellow-300" />
                <div>
                  <p className="text-2xl font-bold text-white">{feature.value}</p>
                  <p className="text-blue-100">Potential Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Real-Time Insights</h3>
              <p className="text-gray-600 text-sm">Live data updates every 60 seconds</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Industry Benchmarks</h3>
              <p className="text-gray-600 text-sm">Compare against 1,500+ centers</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Secure & Compliant</h3>
              <p className="text-gray-600 text-sm">HIPAA-compliant enterprise security</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span>What You'll Get Access To:</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.preview.split(', ').map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.location.href = '/dashboard/onboarding/psa'}
              className="bg-gradient-to-r from-[#003087] to-[#0040a0] text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <span>Complete PSA to Unlock</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-gray-500 text-sm mt-4">Takes 3 minutes • Instant access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✨ SPECTACULAR METRIC CARD
const SpectacularMetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  trend, 
  premium = false, 
  onPreview,
  hasCompletedPSA = false,
  isAnimating = false 
}) => (
  <div className={`relative group ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-all duration-1000`}>
    <div className={`usrad-card p-8 hover:shadow-2xl transition-all duration-500 ${premium ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
      {premium && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 p-2 rounded-full shadow-lg">
          <Crown className="w-5 h-5" />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div className={`p-4 rounded-2xl ${premium ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-gradient-to-br from-blue-100 to-blue-200'}`}>
          <Icon className={`w-8 h-8 ${premium ? 'text-yellow-700' : 'text-blue-700'}`} />
        </div>
        {premium && !hasCompletedPSA && (
          <button 
            onClick={onPreview}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Preview</span>
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2 font-mono">
          {premium && !hasCompletedPSA ? '•••' : value}
        </div>
        <div className="text-gray-600 font-medium">{title}</div>
      </div>
      
      <div className="flex items-center justify-between">
        {trend && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600 font-semibold text-sm">{trend}</span>
          </div>
        )}
        <div className="text-gray-500 text-sm">{subtitle}</div>
      </div>
      
      {premium && !hasCompletedPSA && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-2xl backdrop-blur-sm">
          <div className="text-center p-6">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-semibold">Premium Analytics</p>
            <p className="text-gray-500 text-sm">Complete PSA to unlock</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

const SkeletonProviderDashboardSystem = ({ user, imagingCenter, mockData, fullyOnboarded }) => {
  // DEBUG: Add console logs to see what's being received
  console.log('🔍 Debug - mockData received:', mockData);
  console.log('🔍 Debug - hasCompletedPSA:', mockData?.hasCompletedPSA);
  console.log('🔍 Debug - onboardingProgress:', mockData?.onboardingProgress);

  const [isLoading, setIsLoading] = useState(true);
  const [showNetworkResources, setShowNetworkResources] = useState(false);
  const [activeResourcePanel, setActiveResourcePanel] = useState(null);
  const [showValuePreview, setShowValuePreview] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Extract progressive disclosure data from mockData
  const hasCompletedPSA = mockData?.hasCompletedPSA || false;
  const onboardingProgress = mockData?.onboardingProgress || 40;

  console.log('🔍 Debug - hasCompletedPSA extracted:', hasCompletedPSA);
  console.log('🔍 Debug - onboardingProgress extracted:', onboardingProgress);

  // ✨ ENHANCED DEMO DATA with premium features
  const enhancedDemoData = {
    ...mockData,
    isDemo: !hasCompletedPSA,
    
    premiumFeatures: {
      revenueAnalytics: {
        title: "Advanced Revenue Analytics",
        description: "AI-powered revenue optimization with market intelligence",
        value: "$127K potential monthly increase",
        preview: "Real-time market rates, competitor analysis, pricing optimization, ROI calculator",
        locked: !hasCompletedPSA
      },
      networkIntelligence: {
        title: "Network Intelligence Hub", 
        description: "Exclusive insights from 1,500+ imaging centers",
        value: "25% efficiency improvement",
        preview: "Performance benchmarks, best practices, growth opportunities, capacity planning",
        locked: !hasCompletedPSA
      },
      vipSupport: {
        title: "VIP Support & Training",
        description: "Direct access to USRad specialists and priority support",
        value: "24/7 premium support",
        preview: "Dedicated account manager, live training, priority troubleshooting, implementation assistance",
        locked: !hasCompletedPSA
      }
    }
  };

  // Progressive disclosure helper functions
  const canAccessNetworkResources = () => true;
  const canAccessRevenueAnalytics = () => hasCompletedPSA;
  const canAccessAdvancedTraining = () => hasCompletedPSA;
  const canAccessDirectSupport = () => hasCompletedPSA;

  useEffect(() => {
    console.log('🔍 Debug - useEffect running, setting loading to false in 1 second');
    const timer = setTimeout(() => {
      console.log('🔍 Debug - Loading complete, should show main dashboard now');
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  console.log('🔍 Debug - isLoading:', isLoading);

  if (isLoading) {
    console.log('🔍 Debug - Showing skeleton loader');
    return <SkeletonLoader />;
  }

  console.log('🔍 Debug - Showing main dashboard content');

  // ✨ SPECTACULAR DEMO BANNER - ENTERPRISE LEVEL
  const SpectacularDemoBanner = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#003087] via-blue-700 to-blue-800 rounded-2xl p-8 mb-8 shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-white">You're Experiencing Demo Mode</h3>
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>PREVIEW</span>
              </div>
            </div>
            <p className="text-blue-100 text-lg">
              This sophisticated dashboard showcases what your imaging center's data will look like
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2 text-blue-100">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Real-Time Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Crown className="w-5 h-5" />
                <span className="font-medium">Premium Intelligence</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <button 
            onClick={() => window.location.href = '/dashboard/onboarding/psa'}
            className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
          >
            <span>Unlock Your Real Data</span>
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          <p className="text-blue-200 text-sm mt-2">Complete PSA • Takes 3 minutes</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <style>{`
        .usrad-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.05);
          transition: all 0.4s ease;
        }

        .usrad-card:hover {
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
          transform: translateY(-8px);
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.25);
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

      {/* ✨ SPECTACULAR DEMO BANNER - Only show if PSA not completed */}
      {!hasCompletedPSA && <SpectacularDemoBanner />}

      {/* Success Message for PSA Completion */}
      {hasCompletedPSA && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mb-8 float-animation">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">🎉 Welcome to USRad Premium!</h3>
              <p className="text-green-100 text-lg">Your PSA is complete! All premium features are now unlocked.</p>
            </div>
          </div>
        </div>
      )}

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

      {/* ✨ SPECTACULAR METRICS GRID with Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Today's Appointments */}
        <SpectacularMetricCard 
          icon={Calendar}
          title="Today's Scans"
          value={enhancedDemoData?.todayAppointments || 8}
          subtitle="Scheduled today"
          trend="+12% vs yesterday"
          hasCompletedPSA={hasCompletedPSA}
          isAnimating={isAnimating}
        />

        {/* Premium Revenue Analytics */}
        <SpectacularMetricCard 
          icon={DollarSign}
          title="Monthly Revenue"
          value={`$${((enhancedDemoData?.totalRevenue || 47500) / 1000).toFixed(0)}K`}
          subtitle="This month"
          trend="+8% vs last month"
          premium={true}
          hasCompletedPSA={hasCompletedPSA}
          isAnimating={isAnimating}
          onPreview={() => setShowValuePreview(enhancedDemoData.premiumFeatures.revenueAnalytics)}
        />

        {/* Patient Satisfaction */}
        <SpectacularMetricCard 
          icon={Star}
          title="Patient Satisfaction"
          value={enhancedDemoData?.patientSatisfaction || 4.8}
          subtitle="Average rating"
          trend="Excellent"
          hasCompletedPSA={hasCompletedPSA}
          isAnimating={isAnimating}
        />

        {/* Equipment Status */}
        <SpectacularMetricCard 
          icon={Activity}
          title="Equipment Status"
          value="Optimal"
          subtitle={enhancedDemoData?.equipmentStatus || "Operational"}
          trend="99.9% uptime"
          hasCompletedPSA={hasCompletedPSA}
          isAnimating={isAnimating}
        />
      </div>

      {/* Progressive Disclosure - Network Resources Section */}
      <div className={`network-resources-content ${showNetworkResources ? 'expanded' : ''}`}>
        {showNetworkResources && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Network Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(enhancedDemoData.premiumFeatures).map(([key, feature], index) => (
                <div 
                  key={key}
                  className={`usrad-card p-6 cursor-pointer transition-all duration-300 ${
                    !feature.locked ? 'hover:transform hover:-translate-y-1' : 'opacity-75'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => feature.locked ? setShowValuePreview(feature) : null}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${!feature.locked ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Crown className={`w-6 h-6 ${!feature.locked ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      {!feature.locked ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold usrad-navy mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      !feature.locked 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {!feature.locked ? 'Available' : 'PSA Required'}
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
                  onClick={() => hasCompletedPSA ? null : setShowValuePreview(enhancedDemoData.premiumFeatures.revenueAnalytics)}
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
                  onClick={() => hasCompletedPSA ? null : setShowValuePreview(enhancedDemoData.premiumFeatures.vipSupport)}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-300 ${
                    hasCompletedPSA 
                      ? 'border-blue-300 hover:bg-blue-50 text-blue-600' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <GraduationCap className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">VIP Support</span>
                  {!hasCompletedPSA && <Lock className="w-3 h-3 mt-1" />}
                </button>
                
                <button 
                  className="flex flex-col items-center p-4 border border-blue-300 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-300"
                >
                  <Building className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Implementation</span>
                </button>
                
                <button 
                  onClick={() => hasCompletedPSA ? null : setShowValuePreview(enhancedDemoData.premiumFeatures.networkIntelligence)}
                  className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-300 ${
                    hasCompletedPSA 
                      ? 'border-blue-300 hover:bg-blue-50 text-blue-600' 
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Headphones className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Network Intelligence</span>
                  {!hasCompletedPSA && <Lock className="w-3 h-3 mt-1" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Network Resources Toggle Button */}
      <div className="text-center">
        <button 
          onClick={() => {
            console.log('🔍 Debug - Toggle button clicked, current state:', showNetworkResources);
            setShowNetworkResources(!showNetworkResources);
          }}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#003087] to-[#0040a0] text-white rounded-2xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold network-resources-toggle"
        >
          <Crown className="w-6 h-6 text-yellow-300" />
          <span>{showNetworkResources ? 'Hide' : 'Show'} Network Resources</span>
          {showNetworkResources ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Your Existing Dashboard Content - Key Metrics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold usrad-navy" style={{fontFamily: 'Manrope, sans-serif'}}>
                Today's Schedule
              </h3>
              <p className="text-gray-600 mt-1">
                Managing {enhancedDemoData?.todayAppointments || 8} appointments today
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
                  <span className="font-bold text-gray-900">{enhancedDemoData?.avgScanTime || "28 min"}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Patient Satisfaction</span>
                  <span className="font-bold text-gray-900">{enhancedDemoData?.patientSatisfaction || "4.8"}/5.0</span>
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

      {/* ✨ SPECTACULAR VALUE PREVIEW MODAL */}
      <SpectacularValueModal 
        feature={showValuePreview}
        onClose={() => setShowValuePreview(null)}
      />
    </div>
  );
};

export default SkeletonProviderDashboardSystem;