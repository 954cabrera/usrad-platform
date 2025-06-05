// /src/pages/dashboard/components/ProviderDashboardSystem.jsx
import React from 'react';

const ProviderDashboardSystem = ({ user, imagingCenter, mockData, fullyOnboarded }) => {
  return (
    <div className="space-y-8">
      <style jsx>{`
        .usrad-gradient-bg {
          background: linear-gradient(135deg, #fcf9f0 0%, #f8f5e8 100%);
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(0, 48, 135, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(204, 153, 51, 0.03) 0%,
              transparent 50%
            );
          background-size:
            120px 120px,
            80px 80px;
        }

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

        .gradient-text {
          background: linear-gradient(135deg, #003087, #cc9933);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Welcome Hero Section */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
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
            {imagingCenter
              ? `Managing ${imagingCenter.name}`
              : "Welcome to your USRad dashboard"
            }
          </p>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-100 font-medium">All systems operational</span>
            </div>
            <div className="text-blue-100">
              Last updated: {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Banner */}
      {!fullyOnboarded && (
        <div className="usrad-card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-800">Complete your onboarding</h3>
                <p className="text-yellow-700 text-sm">Finish setting up your provider account to start receiving referrals</p>
              </div>
            </div>
            <a href="/dashboard/onboarding" className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors">
              Continue Setup →
            </a>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
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
                {mockData.todayAppointments}
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
                {mockData.totalAppointments}
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
                {mockData.completedScans}
              </div>
              <div className="text-gray-600 font-medium">Completed</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-blue-50 px-3 py-2 rounded-full font-semibold usrad-navy">
              {Math.round((mockData.completedScans / mockData.totalAppointments) * 100)}% completion rate
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
                ${(mockData.totalRevenue / 1000).toFixed(0)}K
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold usrad-navy" style={{fontFamily: 'Manrope, sans-serif'}}>
                Today's Schedule
              </h3>
              <p className="text-gray-600 mt-1">
                Managing {mockData.todayAppointments} appointments today
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
                  <span className="font-bold text-gray-900">{mockData.avgScanTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Patient Satisfaction</span>
                  <span className="font-bold text-gray-900">{mockData.patientSatisfaction}/5.0</span>
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
    </div>
  );
};

export default ProviderDashboardSystem;