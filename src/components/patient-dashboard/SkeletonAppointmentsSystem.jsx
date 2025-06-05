// /src/pages/patient-dashboard/components/SkeletonAppointmentsSystem.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Edit, Trash2, Plus, Filter, Search, Bell } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Section Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-300/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 bg-gray-300 rounded-lg w-72 mb-3 animate-pulse"></div>
            <div className="h-5 bg-gray-300 rounded-lg w-96 animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded-lg w-48 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-6 text-center">
          <div className="h-8 bg-gray-300 rounded w-12 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* Filters Skeleton */}
    <div className="usrad-card p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Appointments Tabs Skeleton */}
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      ))}
    </div>

    {/* Appointments List Skeleton */}
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
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

const SkeletonAppointmentsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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

  // Mock appointments data
  const appointments = {
    upcoming: [
      {
        id: 1,
        type: 'MRI',
        title: 'Brain MRI with Contrast',
        date: '2024-12-15',
        time: '2:30 PM',
        provider: 'Miami Lakes Medical Center',
        address: '15900 NW 67th Ave, Miami Lakes, FL 33014',
        phone: '(305) 558-8500',
        status: 'Confirmed',
        preparationRequired: true,
        estimatedDuration: '45 minutes'
      },
      {
        id: 2,
        type: 'CT',
        title: 'Abdominal CT Scan',
        date: '2024-12-22',
        time: '10:00 AM',
        provider: 'Coral Gables Imaging',
        address: '3661 S Miami Ave, Coral Gables, FL 33133',
        phone: '(305) 667-8989',
        status: 'Confirmed',
        preparationRequired: true,
        estimatedDuration: '30 minutes'
      }
    ],
    completed: [
      {
        id: 3,
        type: 'MRI',
        title: 'Knee MRI without Contrast',
        date: '2024-11-08',
        time: '11:30 AM',
        provider: 'South Beach Radiology',
        address: '1234 Ocean Dr, Miami Beach, FL 33139',
        phone: '(305) 674-2778',
        status: 'Completed',
        reportReady: true,
        savings: '$890'
      },
      {
        id: 4,
        type: 'X-Ray',
        title: 'Lower Back X-Ray Series',
        date: '2024-10-15',
        time: '3:00 PM',
        provider: 'Downtown Medical Imaging',
        address: '100 SE 2nd St, Miami, FL 33131',
        phone: '(305) 555-0123',
        status: 'Completed',
        reportReady: true,
        savings: '$320'
      }
    ],
    cancelled: [
      {
        id: 5,
        type: 'Ultrasound',
        title: 'Abdominal Ultrasound',
        date: '2024-10-01',
        time: '9:00 AM',
        provider: 'Kendall Imaging Center',
        status: 'Cancelled',
        reason: 'Patient request'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'MRI': return '🧠';
      case 'CT': return '🫁';
      case 'X-Ray': return '🦴';
      case 'Ultrasound': return '❤️';
      default: return '📅';
    }
  };

  const currentAppointments = appointments[activeTab] || [];

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
              <h1 className="text-4xl font-bold mb-3">Appointment Management</h1>
              <p className="text-blue-100 text-xl">Manage all your medical imaging appointments in one place</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Schedule New Scan
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-navy mb-2">{appointments.upcoming.length}</div>
          <div className="text-gray-700 font-medium mb-1">Upcoming</div>
          <div className="text-gray-500 text-sm">Scheduled appointments</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{appointments.completed.length}</div>
          <div className="text-gray-700 font-medium mb-1">Completed</div>
          <div className="text-gray-500 text-sm">Successful scans</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-gold mb-2">$1,210</div>
          <div className="text-gray-700 font-medium mb-1">Total Saved</div>
          <div className="text-gray-500 text-sm">vs. hospital pricing</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
          <div className="text-gray-700 font-medium mb-1">Avg Rating</div>
          <div className="text-gray-500 text-sm">Provider satisfaction</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="usrad-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments by type, provider, or date..."
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
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Reminders
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {['upcoming', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-white usrad-navy shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({appointments[tab].length})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {currentAppointments.map((appointment) => (
          <div key={appointment.id} className="usrad-card p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 usrad-gradient-navy rounded-2xl flex items-center justify-center text-white text-2xl">
                  {getTypeIcon(appointment.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{appointment.title}</h3>
                  <p className="text-gray-600">{appointment.provider}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                {activeTab === 'upcoming' && (
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
              </div>
              {appointment.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">{appointment.address}</span>
                </div>
              )}
              {appointment.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-600">{appointment.phone}</span>
                </div>
              )}
              {appointment.estimatedDuration && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-600">Duration: {appointment.estimatedDuration}</span>
                </div>
              )}
              {appointment.savings && (
                <div className="flex items-center space-x-3">
                  <span className="w-4 h-4 text-green-600">💰</span>
                  <span className="text-green-600 font-medium">Saved {appointment.savings}</span>
                </div>
              )}
              {appointment.preparationRequired && (
                <div className="flex items-center space-x-3">
                  <span className="w-4 h-4 text-yellow-600">⚠️</span>
                  <span className="text-yellow-600 font-medium">Preparation Required</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {activeTab === 'upcoming' && (
                <>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                    Get Directions
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                    Contact Provider
                  </button>
                </>
              )}
              {activeTab === 'completed' && (
                <>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    View Report
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                    Download Results
                  </button>
                  <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors">
                    Book Follow-up
                  </button>
                </>
              )}
            </div>

            {/* Preparation Instructions for Upcoming */}
            {activeTab === 'upcoming' && appointment.preparationRequired && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Preparation Instructions</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Fast for 4 hours before the scan (water is okay)</li>
                  <li>• Remove all metal objects and jewelry</li>
                  <li>• Arrive 15 minutes early for check-in</li>
                  <li>• Bring your ID and insurance card</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentAppointments.length === 0 && (
        <div className="usrad-card p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No {activeTab} appointments</h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming appointments. Schedule your next scan!" 
              : `No ${activeTab} appointments found.`}
          </p>
          {activeTab === 'upcoming' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Schedule New Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkeletonAppointmentsSystem;