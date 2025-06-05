// /src/pages/patient-dashboard/components/SkeletonDashboardSystem.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Heart, TrendingUp, FileText, Users, Star, Trophy, BookOpen, MessageCircle } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
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
            <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="text-right">
              <div className="h-10 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Main Content Grid Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Health Journey Skeleton */}
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
                  <div className="h-3 bg-gray-200 rounded w-28 animate-pulse"></div>
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

        {/* Health Stats Skeleton */}
        <div className="usrad-card p-8">
          <div className="h-6 bg-gray-300 rounded w-40 mb-6 animate-pulse"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-3">
                  <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-300 h-3 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
    `}</style>
  </div>
);

const SkeletonDashboardSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1 second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-8">
      <style jsx>{`
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
      `}</style>

      {/* Welcome Hero Section */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">
            Good {
              new Date().getHours() < 12
                ? "Morning"
                : new Date().getHours() < 18
                  ? "Afternoon"
                  : "Evening"
            }, Sarah! 👋
          </h1>
          <p className="text-blue-100 text-xl mb-6">
            Welcome back to your health journey dashboard
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 font-medium">All systems healthy</span>
            </div>
            <div className="text-blue-100">
              Last updated: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Next Appointment */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">Dec 15</div>
              <div className="text-gray-600 font-medium">Next Scan</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-blue-50 px-3 py-2 rounded-full font-semibold usrad-navy">
              Brain MRI - 2:30 PM
            </span>
            <a href="/patient-dashboard/appointments" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Details →
            </a>
          </div>
        </div>

        {/* Total Savings */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">$2,340</div>
              <div className="text-gray-600 font-medium">Total Saved</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-full font-semibold">
              vs. Hospital Pricing
            </span>
            <a href="/patient-dashboard/billing" className="text-sm font-semibold usrad-gold hover:text-yellow-600 transition-colors">
              View Savings →
            </a>
          </div>
        </div>

        {/* Health Score */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white">
              <Heart className="w-8 h-8" />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">8.7</div>
              <div className="text-gray-600 font-medium">Health Score</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-yellow-50 px-3 py-2 rounded-full font-semibold usrad-gold">
              Excellent Progress
            </span>
            <a href="/patient-dashboard/profile" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Profile →
            </a>
          </div>
        </div>

        {/* Completed Scans */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-white">
              <FileText className="w-8 h-8" />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">12</div>
              <div className="text-gray-600 font-medium">Completed</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-purple-50 px-3 py-2 rounded-full font-semibold text-purple-700">
              All Reports Ready
            </span>
            <a href="/patient-dashboard/reports" className="text-sm font-semibold usrad-navy hover:text-blue-800 transition-colors">
              View Reports →
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Health Journey */}
        <div className="xl:col-span-2 usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold usrad-navy">Your Health Journey</h3>
              <p className="text-gray-600 mt-1">Recent appointments and upcoming care</p>
            </div>
            <a href="/patient-dashboard/appointments" className="px-6 py-3 usrad-gradient-gold text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              View All
            </a>
          </div>

          <div className="space-y-6">
            {/* Recent Appointment */}
            <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-transparent rounded-2xl border border-green-100">
              <div className="w-20 h-20 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-lg font-bold">✓</div>
                  <div className="text-xs opacity-80">Done</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Knee MRI Completed</h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">📍 Coral Gables Imaging</span>
                  <span className="flex items-center font-medium">💰 Saved $890</span>
                  <span className="flex items-center font-medium">📄 Report Ready</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Completed</span>
              </div>
            </div>

            {/* Upcoming Appointment */}
            <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl border border-blue-100">
              <div className="w-20 h-20 usrad-gradient-gold rounded-2xl flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-lg font-bold">Dec</div>
                  <div className="text-lg font-bold">15</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Brain MRI with Contrast</h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">📍 Miami Lakes Medical</span>
                  <span className="flex items-center font-medium">⏰ 2:30 PM</span>
                  <span className="flex items-center font-medium">💰 Save $1,200</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">Upcoming</span>
              </div>
            </div>

            {/* Referral Progress */}
            <div className="flex items-center p-6 bg-gradient-to-r from-purple-50 to-transparent rounded-2xl border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-lg font-bold">2/5</div>
                  <div className="text-xs opacity-80">Refs</div>
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Referral Rewards Progress</h4>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center font-medium">🎯 3 more for $100 credit</span>
                  <span className="flex items-center font-medium">⭐ Bronze Member</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h3 className="text-xl font-bold usrad-navy mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full usrad-gradient-navy text-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                <span className="flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  Book New Scan
                </span>
              </button>
              <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold">
                <FileText className="w-5 h-5 mr-3" />
                View Reports
              </button>
              <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 font-semibold">
                <Users className="w-5 h-5 mr-3" />
                Refer Friends
              </button>
            </div>
          </div>

          {/* Health Progress */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <h3 className="text-xl font-bold usrad-navy mb-6">Health Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Profile Completion</span>
                  <span className="font-bold text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Referral Progress</span>
                  <span className="font-bold text-gray-900">2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="usrad-gradient-gold h-3 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Health Score</span>
                  <span className="font-bold text-gray-900">8.7/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="usrad-gradient-navy h-3 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboardSystem;