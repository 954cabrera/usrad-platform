// /src/pages/dashboard/components/SkeletonAnalyticsSystem.jsx
import React, { useState, useEffect } from 'react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between mb-8 animate-pulse">
      <div>
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80"></div>
      </div>
      <div className="flex space-x-3">
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
        <div className="h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32"></div>
      </div>
    </div>

    {/* KPI Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="usrad-card p-6 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl"></div>
            <div className="h-5 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-12"></div>
          </div>
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-1"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-2"></div>
        </div>
      ))}
    </div>

    {/* Charts Section Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="usrad-card p-6 animate-pulse" style={{animationDelay: `${0.5 + i * 0.1}s`}}>
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-16"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
            </div>
          </div>
          <div className="chart-container">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mx-auto mb-2"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Detailed Metrics Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Scan Type Breakdown Skeleton */}
      <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.7s'}}>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="metric-item">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`bg-gradient-to-r ${i === 0 ? 'from-blue-200 to-blue-300' : i === 1 ? 'from-yellow-200 to-yellow-300' : i === 2 ? 'from-green-200 to-green-300' : 'from-purple-200 to-purple-300'} h-2 rounded-full`} style={{width: `${Math.random() * 60 + 20}%`}}></div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics Skeleton */}
      <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.8s'}}>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6"></div>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className={`bg-gradient-to-r ${i === 0 ? 'from-green-200 to-green-300' : i === 1 ? 'from-blue-200 to-blue-300' : i === 2 ? 'from-yellow-200 to-yellow-300' : 'from-orange-200 to-orange-300'} h-3 rounded-full`} style={{width: `${Math.random() * 60 + 30}%`}}></div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary Skeleton */}
      <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.9s'}}>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 mb-6"></div>
        <div className="space-y-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-12 mx-auto mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mx-auto mb-1"></div>
            <div className="h-3 bg-gradient-to-r from-green-200 to-green-300 rounded w-20 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded w-8 mx-auto mb-1"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mx-auto"></div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="h-6 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded w-6 mx-auto mb-1"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mx-auto"></div>
            </div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div className="space-y-8">
    {/* Page Header */}
    <div className="flex items-center justify-between mb-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold usrad-navy mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
          Analytics
        </h1>
        <p className="text-gray-600">
          Detailed insights and performance metrics for your imaging center
        </p>
      </div>
      <div className="flex space-x-3">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
        <button className="px-4 py-2 usrad-gradient-navy text-white rounded-lg hover:shadow-lg transition-all duration-300">
          Export Report
        </button>
      </div>
    </div>

    {/* Key Performance Indicators */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 usrad-gradient-navy rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">+23%</span>
        </div>
        <h3 className="text-2xl font-bold usrad-navy mb-1">124</h3>
        <p className="text-gray-600 text-sm">Total Appointments</p>
        <p className="text-xs text-gray-500 mt-2">vs last month</p>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 usrad-gradient-gold rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">+15%</span>
        </div>
        <h3 className="text-2xl font-bold usrad-navy mb-1">$47,500</h3>
        <p className="text-gray-600 text-sm">Revenue</p>
        <p className="text-xs text-gray-500 mt-2">vs last month</p>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">+5%</span>
        </div>
        <h3 className="text-2xl font-bold usrad-navy mb-1">96%</h3>
        <p className="text-gray-600 text-sm">Completion Rate</p>
        <p className="text-xs text-gray-500 mt-2">vs last month</p>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">+0.2</span>
        </div>
        <h3 className="text-2xl font-bold usrad-navy mb-1">4.8</h3>
        <p className="text-gray-600 text-sm">Patient Satisfaction</p>
        <p className="text-xs text-gray-500 mt-2">out of 5.0</p>
      </div>
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      {/* Revenue Chart */}
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>
            Revenue Trend
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Monthly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Weekly</button>
          </div>
        </div>
        <div className="chart-container">
          <div className="text-center">
            <div className="w-16 h-16 usrad-gradient-navy rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Interactive Revenue Chart</p>
            <p className="text-sm text-gray-500 mt-2">Chart.js integration coming soon</p>
          </div>
        </div>
      </div>

      {/* Appointment Trends */}
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>
            Appointment Trends
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Daily</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Weekly</button>
          </div>
        </div>
        <div className="chart-container">
          <div className="text-center">
            <div className="w-16 h-16 usrad-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Appointment Trend Analysis</p>
            <p className="text-sm text-gray-500 mt-2">Real-time data visualization</p>
          </div>
        </div>
      </div>
    </div>

    {/* Detailed Metrics */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Scan Type Breakdown */}
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
        <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: "'Manrope', sans-serif"}}>
          Scan Type Breakdown
        </h3>
        <div className="space-y-4">
          <div className="metric-item">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Brain MRI</span>
              <span className="font-bold usrad-navy">32%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="usrad-gradient-navy h-2 rounded-full" style={{width: '32%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">40 scans this month</p>
          </div>

          <div className="metric-item">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Spine MRI</span>
              <span className="font-bold usrad-navy">28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="usrad-gradient-gold h-2 rounded-full" style={{width: '28%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">35 scans this month</p>
          </div>

          <div className="metric-item">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Knee MRI</span>
              <span className="font-bold usrad-navy">22%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '22%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">27 scans this month</p>
          </div>

          <div className="metric-item">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Other</span>
              <span className="font-bold usrad-navy">18%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{width: '18%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">22 scans this month</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: "'Manrope', sans-serif"}}>
          Performance Metrics
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Average Scan Time</span>
              <span className="font-bold usrad-navy">28 min</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 30 min</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Equipment Utilization</span>
              <span className="font-bold usrad-navy">84%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="usrad-gradient-navy h-3 rounded-full" style={{width: '84%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Optimal range: 80-90%</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Patient Wait Time</span>
              <span className="font-bold usrad-navy">12 min</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="usrad-gradient-gold h-3 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: &lt; 15 min</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">No-Show Rate</span>
              <span className="font-bold usrad-navy">8%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{width: '8%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Industry avg: 12%</p>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
        <h3 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: "'Manrope', sans-serif"}}>
          Monthly Summary
        </h3>
        <div className="space-y-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <h4 className="text-2xl font-bold usrad-navy">124</h4>
            <p className="text-gray-600">Total Appointments</p>
            <p className="text-xs text-green-600 mt-1">↑ 23% from last month</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <h5 className="text-lg font-bold text-green-700">96%</h5>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <h5 className="text-lg font-bold text-yellow-700">4%</h5>
              <p className="text-xs text-gray-600">Cancelled</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Best Day</span>
              <span className="font-semibold text-gray-900">Wednesday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Peak Hours</span>
              <span className="font-semibold text-gray-900">10 AM - 2 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Avg Revenue/Day</span>
              <span className="font-semibold text-gray-900">$1,583</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonAnalyticsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds for analytics (slightly longer due to complexity)

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

        .chart-container {
          height: 400px;
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #cbd5e1;
        }

        .metric-item {
          padding: 20px;
          border-radius: 12px;
          background: white;
          border: 1px solid rgba(0, 48, 135, 0.05);
          transition: all 0.3s ease;
        }

        .metric-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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

      {isLoading ? <SkeletonLoader /> : <AnalyticsContent />}
    </div>
  );
};

export default SkeletonAnalyticsSystem;