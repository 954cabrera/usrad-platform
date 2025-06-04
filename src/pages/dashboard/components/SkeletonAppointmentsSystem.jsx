// /src/pages/dashboard/components/SkeletonAppointmentsSystem.jsx
import React, { useState, useEffect } from 'react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between mb-8 animate-pulse">
      <div>
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-2"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64"></div>
      </div>
      <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-40"></div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="usrad-card p-6 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"></div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Filters Skeleton */}
    <div className="usrad-card p-6 mb-8 animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-36"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-16"></div>
        </div>
      </div>
    </div>

    {/* Appointments Table Skeleton */}
    <div className="usrad-card animate-pulse">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Patient', 'Scan Type', 'Date & Time', 'Duration', 'Status', 'Actions'].map((header, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-10"></div>
                    <div className="h-4 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded w-8"></div>
                    <div className="h-4 bg-gradient-to-r from-red-200 to-red-300 rounded w-12"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48"></div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppointmentsContent = ({ appointments }) => (
  <div className="space-y-8">
    {/* Page Header */}
    <div className="flex items-center justify-between mb-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold usrad-navy mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>
          Appointments
        </h1>
        <p className="text-gray-600">Manage your imaging appointments and schedule</p>
      </div>
      <button className="btn-primary flex items-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>New Appointment</span>
      </button>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Today</p>
            <p className="text-2xl font-bold usrad-navy">8</p>
          </div>
          <div className="w-12 h-12 usrad-gradient-navy rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Week</p>
            <p className="text-2xl font-bold usrad-navy">32</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold usrad-navy">98</p>
          </div>
          <div className="w-12 h-12 usrad-gradient-gold rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-bold usrad-navy">$47K</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Filters and Search */}
    <div className="usrad-card p-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>In Progress</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Scan Types</option>
            <option>Brain MRI</option>
            <option>Spine MRI</option>
            <option>Knee MRI</option>
            <option>Shoulder MRI</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Print
          </button>
        </div>
      </div>
    </div>

    {/* Appointments List */}
    <div className="usrad-card animate-fade-in-up" style={{animationDelay: '0.6s'}}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>
          All Appointments
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scan Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gray-50 transition-colors" style={{animationDelay: `${0.7 + index * 0.1}s`}}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 usrad-gradient-navy rounded-full flex items-center justify-center text-white font-semibold">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                      <div className="text-sm text-gray-500">{appointment.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{appointment.scanType}</div>
                  <div className="text-sm text-gray-500">
                    {appointment.withContrast ? 'With Contrast' : 'No Contrast'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(appointment.scheduledDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500">{appointment.scheduledTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.duration} mins
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`status-badge status-${appointment.status}`}>
                    {appointment.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">25</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-2 usrad-gradient-navy text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonAppointmentsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      scanType: "Brain MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "09:30",
      duration: 45,
      status: "confirmed",
      withContrast: true,
      phone: "(555) 123-4567",
      email: "sarah.j@email.com",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      scanType: "Knee MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "11:15",
      duration: 30,
      status: "in_progress",
      withContrast: false,
      phone: "(555) 234-5678",
      email: "m.chen@email.com",
    },
    {
      id: 3,
      patientName: "Emma Rodriguez",
      scanType: "Spine MRI",
      scheduledDate: "2025-05-30",
      scheduledTime: "14:00",
      duration: 60,
      status: "upcoming",
      withContrast: true,
      phone: "(555) 345-6789",
      email: "emma.r@email.com",
    },
    {
      id: 4,
      patientName: "David Park",
      scanType: "Shoulder MRI",
      scheduledDate: "2025-05-31",
      scheduledTime: "10:00",
      duration: 40,
      status: "confirmed",
      withContrast: false,
      phone: "(555) 456-7890",
      email: "d.park@email.com",
    },
    {
      id: 5,
      patientName: "Lisa Williams",
      scanType: "Abdominal MRI",
      scheduledDate: "2025-05-31",
      scheduledTime: "13:30",
      duration: 45,
      status: "completed",
      withContrast: true,
      phone: "(555) 567-8901",
      email: "l.williams@email.com",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading time

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

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-confirmed {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-in_progress {
          background: #fef3c7;
          color: #d97706;
        }
        .status-upcoming {
          background: #e0e7ff;
          color: #6366f1;
        }
        .status-completed {
          background: #d1fae5;
          color: #059669;
        }
        .status-cancelled {
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

      {isLoading ? <SkeletonLoader /> : <AppointmentsContent appointments={appointments} />}
    </div>
  );
};

export default SkeletonAppointmentsSystem;