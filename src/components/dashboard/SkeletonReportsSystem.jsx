// /src/pages/dashboard/components/SkeletonReportsSystem.jsx
import React, { useState, useEffect } from 'react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between mb-8 animate-pulse">
      <div>
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80"></div>
      </div>
      <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-48"></div>
    </div>

    {/* Quick Stats Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="usrad-card p-6 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Content Skeleton */}
      <div className="xl:col-span-2 space-y-8">
        {/* Generate New Report Skeleton */}
        <div className="usrad-card p-8 animate-pulse" style={{animationDelay: '0.5s'}}>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="report-card">
                <div className={`w-12 h-12 bg-gradient-to-r ${
                  i === 0 ? 'from-blue-200 to-blue-300' :
                  i === 1 ? 'from-yellow-200 to-yellow-300' :
                  i === 2 ? 'from-green-200 to-green-300' :
                  i === 3 ? 'from-purple-200 to-purple-300' :
                  i === 4 ? 'from-indigo-200 to-indigo-300' :
                  'from-pink-200 to-pink-300'
                } rounded-lg mb-4`}></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-4"></div>
                <div className="w-full h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports Table Skeleton */}
        <div className="usrad-card p-8 animate-pulse" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Report', 'Type', 'Period', 'Generated', 'Status', 'Actions'].map((header, i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-16"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg mr-4"></div>
                        <div>
                          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-1"></div>
                          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-5 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-12"></div>
                        <div className="h-4 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded w-8"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-10"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="space-y-8">
        {/* Report Templates Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.7s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${
                    i === 0 ? 'from-blue-200 to-blue-300' :
                    i === 1 ? 'from-yellow-200 to-yellow-300' :
                    'from-green-200 to-green-300'
                  } rounded-lg`}></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                </div>
                <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-6"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.8s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${
                    i === 0 ? 'bg-red-200' :
                    i === 1 ? 'bg-green-200' :
                    'bg-blue-200'
                  } rounded-lg`}></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                </div>
                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.9s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className={`w-2 h-2 ${
                  i === 0 ? 'bg-green-300' :
                  i === 1 ? 'bg-blue-300' :
                  i === 2 ? 'bg-yellow-300' :
                  'bg-purple-300'
                } rounded-full mt-2`}></div>
                <div className="flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReportsContent = () => {
  // Mock recent reports data
  const recentReports = [
    {
      id: 1,
      title: "Monthly Financial Report",
      type: "Financial",
      period: "May 2025",
      generatedDate: "2025-05-29",
      status: "completed",
      fileSize: "2.3 MB",
    },
    {
      id: 2,
      title: "Patient Satisfaction Survey",
      type: "Quality",
      period: "Q2 2025",
      generatedDate: "2025-05-28",
      status: "completed",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      title: "Equipment Utilization Analysis",
      type: "Operational",
      period: "Last 30 Days",
      generatedDate: "2025-05-27",
      status: "processing",
      fileSize: "Processing...",
    },
    {
      id: 4,
      title: "Appointment Statistics Report",
      type: "Analytics",
      period: "April 2025",
      generatedDate: "2025-05-01",
      status: "completed",
      fileSize: "3.1 MB",
    },
    {
      id: 5,
      title: "Compliance Audit Report",
      type: "Compliance",
      period: "Q1 2025",
      generatedDate: "2025-04-15",
      status: "completed",
      fileSize: "4.7 MB",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold usrad-navy mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
            Reports
          </h1>
          <p className="text-gray-600">
            Generate and download detailed reports for your imaging center
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold usrad-navy">47</p>
            </div>
            <div className="w-12 h-12 usrad-gradient-navy rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold usrad-navy">12</p>
            </div>
            <div className="w-12 h-12 usrad-gradient-gold rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold usrad-navy">3</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold usrad-navy">234</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Report Generation */}
        <div className="xl:col-span-2 space-y-8">
          {/* Generate New Report */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <h2 className="text-xl font-bold usrad-navy mb-6" style={{fontFamily: "'Manrope', sans-serif"}}>
              Generate New Report
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Financial Report */}
              <div className="report-card">
                <div className="w-12 h-12 usrad-gradient-navy rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Financial Report</h3>
                <p className="text-sm text-gray-600 mb-4">Revenue, expenses, and profitability analysis</p>
                <button className="w-full btn-primary text-sm">Generate</button>
              </div>

              {/* Operational Report */}
              <div className="report-card">
                <div className="w-12 h-12 usrad-gradient-gold rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Operational Report</h3>
                <p className="text-sm text-gray-600 mb-4">Equipment usage, efficiency metrics</p>
                <button className="w-full btn-secondary text-sm">Generate</button>
              </div>

              {/* Quality Report */}
              <div className="report-card">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quality Report</h3>
                <p className="text-sm text-gray-600 mb-4">Patient satisfaction, quality metrics</p>
                <button className="w-full btn-primary text-sm">Generate</button>
              </div>

              {/* Compliance Report */}
              <div className="report-card">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Compliance Report</h3>
                <p className="text-sm text-gray-600 mb-4">Regulatory compliance, audit trails</p>
                <button className="w-full btn-primary text-sm">Generate</button>
              </div>

              {/* Custom Report */}
              <div className="report-card">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v1z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Custom Report</h3>
                <p className="text-sm text-gray-600 mb-4">Build your own custom report</p>
                <button className="w-full btn-secondary text-sm">Create</button>
              </div>

              {/* Analytics Report */}
              <div className="report-card">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analytics Report</h3>
                <p className="text-sm text-gray-600 mb-4">Detailed analytics and insights</p>
                <button className="w-full btn-primary text-sm">Generate</button>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>
                Recent Reports
              </h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Filter
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Export All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 usrad-gradient-navy rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            <div className="text-sm text-gray-500">{report.fileSize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`status-badge status-${report.status}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {report.status === "completed" ? (
                          <>
                            <button className="text-blue-600 hover:text-blue-900">Download</button>
                            <button className="text-indigo-600 hover:text-indigo-900">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Share</button>
                          </>
                        ) : (
                          <button className="text-yellow-600 hover:text-yellow-900">View Status</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Report Templates */}
          <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
            <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>
              Report Templates
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 usrad-gradient-navy rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Monthly Summary</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-xs">Use</button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 usrad-gradient-gold rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Quarterly Review</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-xs">Use</button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Annual Report</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-xs">Use</button>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>
              Export Options
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PDF</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">PDF Format</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">XLS</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Excel Format</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CSV</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">CSV Format</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Financial report generated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Quality report downloaded</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Compliance report in progress</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Custom report shared</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonReportsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100); // 1.1 seconds for reports

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

        .btn-primary {
          background: linear-gradient(135deg, #003087, #0040a0);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Manrope", sans-serif;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 48, 135, 0.3);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #cc9933, #e6b84d);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Manrope", sans-serif;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(204, 153, 51, 0.3);
        }

        .report-card {
          background: white;
          border: 1px solid rgba(0, 48, 135, 0.1);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .report-card:hover {
          border-color: #003087;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 48, 135, 0.15);
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-completed {
          background: #d1fae5;
          color: #059669;
        }
        .status-processing {
          background: #fef3c7;
          color: #d97706;
        }
        .status-failed {
          background: #fee2e2;
          color: #dc2626;
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

      {isLoading ? <SkeletonLoader /> : <ReportsContent />}
    </div>
  );
};

export default SkeletonReportsSystem;