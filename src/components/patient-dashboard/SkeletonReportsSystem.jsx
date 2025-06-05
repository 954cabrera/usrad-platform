// /src/pages/patient-dashboard/components/SkeletonReportsSystem.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Download, Share, Eye, Calendar, Shield, Star, Filter, Search } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Section Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 bg-gray-300 rounded-lg w-64 mb-3 animate-pulse"></div>
            <div className="h-5 bg-gray-300 rounded-lg w-80 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded-lg w-40 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-6 text-center">
          <div className="h-8 bg-gray-300 rounded w-12 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* Filters and Search Skeleton */}
    <div className="usrad-card p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Reports List Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div>
                <div className="h-5 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-18 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
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

const SkeletonReportsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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

  // Mock reports data
  const reports = [
    {
      id: 1,
      type: 'MRI',
      title: 'Brain MRI with Contrast',
      date: '2024-11-28',
      provider: 'Miami Lakes Medical Center',
      status: 'Ready',
      size: '2.4 MB',
      shared: false,
      downloadCount: 2
    },
    {
      id: 2,
      type: 'CT',
      title: 'Chest CT Scan',
      date: '2024-11-15',
      provider: 'Coral Gables Imaging',
      status: 'Ready',
      size: '1.8 MB',
      shared: true,
      downloadCount: 5
    },
    {
      id: 3,
      type: 'MRI',
      title: 'Knee MRI without Contrast',
      date: '2024-10-22',
      provider: 'South Beach Radiology',
      status: 'Ready',
      size: '3.1 MB',
      shared: true,
      downloadCount: 3
    },
    {
      id: 4,
      type: 'X-Ray',
      title: 'Lower Back X-Ray Series',
      date: '2024-10-08',
      provider: 'Downtown Medical Imaging',
      status: 'Ready',
      size: '890 KB',
      shared: false,
      downloadCount: 1
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'MRI': return '🧠';
      case 'CT': return '🫁';
      case 'X-Ray': return '🦴';
      case 'Ultrasound': return '❤️';
      default: return '📄';
    }
  };

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
      `}</style>

      {/* Header Section */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Medical Reports & Imaging</h1>
              <p className="text-blue-100 text-xl">Secure access to all your medical imaging reports and results</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
              <Share className="w-5 h-5 mr-2" />
              Share Reports
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-navy mb-2">12</div>
          <div className="text-gray-700 font-medium mb-1">Total Reports</div>
          <div className="text-gray-500 text-sm">All imaging results</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">11</div>
          <div className="text-gray-700 font-medium mb-1">Ready</div>
          <div className="text-gray-500 text-sm">Available for download</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-gold mb-2">3</div>
          <div className="text-gray-700 font-medium mb-1">Shared</div>
          <div className="text-gray-500 text-sm">With healthcare providers</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">8.2</div>
          <div className="text-gray-700 font-medium mb-1">MB Total</div>
          <div className="text-gray-500 text-sm">Storage used</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="usrad-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports by type, provider, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="all">All Types</option>
              <option value="mri">MRI</option>
              <option value="ct">CT Scan</option>
              <option value="xray">X-Ray</option>
              <option value="ultrasound">Ultrasound</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="date">Latest First</option>
              <option value="type">By Type</option>
              <option value="provider">By Provider</option>
              <option value="status">By Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="usrad-card p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 usrad-gradient-navy rounded-xl flex items-center justify-center text-white text-xl">
                  {getTypeIcon(report.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{report.title}</h3>
                  <p className="text-gray-600">{report.provider}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{new Date(report.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="font-medium">{report.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Downloads:</span>
                <span className="font-medium">{report.downloadCount} times</span>
              </div>
              <div className="flex justify-between">
                <span>Shared:</span>
                <span className={`font-medium ${report.shared ? 'text-green-600' : 'text-gray-500'}`}>
                  {report.shared ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Share className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* HIPAA Compliance Notice */}
      <div className="usrad-card p-6 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">HIPAA Compliant & Secure</h3>
            <p className="text-blue-700 text-sm">
              All medical reports are stored with enterprise-grade encryption and are fully HIPAA compliant. 
              Your medical information is protected with the highest security standards, and access is logged for your safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReportsSystem;