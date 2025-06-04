import React, { useState } from 'react';

const PatientAppointmentsSystem = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock appointment data
  const mockAppointments = {
    upcoming: [
      {
        id: 1,
        type: 'Brain MRI',
        icon: '🧠',
        date: '2025-06-05',
        time: '2:30 PM',
        provider: 'Advanced Imaging Center of Davie',
        address: '4350 Sheridan St, Davie, FL 33314',
        phone: '(954) 555-0123',
        status: 'confirmed',
        price: '$450',
        savings: '$1,200',
        contrast: true,
        prepTime: '45 mins before',
        notes: 'Please arrive 30 minutes early for prep. No metal objects.',
        doctor: 'Dr. Maria Rodriguez',
        equipment: '3T Siemens Prisma'
      },
      {
        id: 2,
        type: 'Knee MRI',
        icon: '🦵',
        date: '2025-06-12',
        time: '10:00 AM',
        provider: 'Precision Imaging Coral Springs',
        address: '2855 Coral Hills Dr, Coral Springs, FL 33065',
        phone: '(954) 555-0189',
        status: 'confirmed',
        price: '$380',
        savings: '$950',
        contrast: false,
        prepTime: '30 mins before',
        notes: 'Wear comfortable clothing. No preparation required.',
        doctor: 'Dr. James Thompson',
        equipment: 'Wide Bore MRI'
      }
    ],
    completed: [
      {
        id: 3,
        type: 'Chest CT',
        icon: '🫁',
        date: '2025-05-15',
        time: '1:00 PM',
        provider: 'South Florida Diagnostic Center',
        address: '7800 W Oakland Park Blvd, Sunrise, FL 33351',
        phone: '(954) 555-0167',
        status: 'completed',
        price: '$320',
        savings: '$850',
        contrast: true,
        reportAvailable: true,
        rating: 5,
        doctor: 'Dr. Sarah Kim',
        equipment: '64-slice CT Scanner'
      },
      {
        id: 4,
        type: 'Spine MRI',
        icon: '🦴',
        date: '2025-04-20',
        time: '3:15 PM',
        provider: 'Advanced Imaging Center of Davie',
        address: '4350 Sheridan St, Davie, FL 33314',
        phone: '(954) 555-0123',
        status: 'completed',
        price: '$520',
        savings: '$1,480',
        contrast: true,
        reportAvailable: true,
        rating: 5,
        doctor: 'Dr. Maria Rodriguez',
        equipment: '3T Siemens Prisma'
      }
    ],
    cancelled: [
      {
        id: 5,
        type: 'Abdominal CT',
        icon: '🫄',
        date: '2025-05-28',
        time: '11:30 AM',
        provider: 'Precision Imaging Coral Springs',
        address: '2855 Coral Hills Dr, Coral Springs, FL 33065',
        phone: '(954) 555-0189',
        status: 'cancelled',
        price: '$280',
        reason: 'Cancelled by patient',
        cancelledDate: '2025-05-25'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'completed': return '✓';
      case 'cancelled': return '✕';
      default: return '?';
    }
  };

  const filteredAppointments = mockAppointments[activeTab] || [];

  const appointmentStats = {
    total: mockAppointments.upcoming.length + mockAppointments.completed.length,
    completed: mockAppointments.completed.length,
    upcoming: mockAppointments.upcoming.length,
    totalSavings: mockAppointments.completed.reduce((sum, apt) => 
      sum + parseInt(apt.savings.replace(/[$,]/g, '')), 0
    )
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="usrad-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{appointmentStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{appointmentStats.upcoming}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{appointmentStats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Saved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">${appointmentStats.totalSavings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="usrad-card">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { key: 'upcoming', label: 'Upcoming', count: mockAppointments.upcoming.length },
              { key: 'completed', label: 'Completed', count: mockAppointments.completed.length },
              { key: 'cancelled', label: 'Cancelled', count: mockAppointments.cancelled.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} appointments</h3>
              <p className="text-gray-500">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming appointments. Book your next imaging scan today!"
                  : `No ${activeTab} appointments found.`
                }
              </p>
              {activeTab === 'upcoming' && (
                <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Book New Appointment
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                        {appointment.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{appointment.type}</h3>
                        <p className="text-gray-600">{appointment.provider}</p>
                        <p className="text-sm text-gray-500">{appointment.address}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)} {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Appointment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{appointment.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Medical Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{appointment.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{appointment.equipment}</span>
                        </div>
                        {appointment.contrast !== undefined && (
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <span>{appointment.contrast ? 'With Contrast' : 'No Contrast'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Pricing & Savings</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Your Price:</span>
                          <span className="font-semibold text-green-600">{appointment.price}</span>
                        </div>
                        {appointment.savings && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">You Saved:</span>
                            <span className="font-semibold text-green-600">{appointment.savings}</span>
                          </div>
                        )}
                        {appointment.status === 'completed' && appointment.rating && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < appointment.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Preparation Notes</h5>
                      <p className="text-blue-800 text-sm">{appointment.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {appointment.status === 'upcoming' && (
                      <>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          View Prep Instructions
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <>
                        {appointment.reportAvailable && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            Download Report
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Share with Doctor
                        </button>
                        <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          Book Follow-up
                        </button>
                      </>
                    )}

                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Contact Provider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="usrad-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Book New Appointment</h4>
                <p className="text-sm text-gray-500">Schedule your next imaging scan</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">View All Reports</h4>
                <p className="text-sm text-gray-500">Access your medical reports</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Contact Support</h4>
                <p className="text-sm text-gray-500">Get help with your appointments</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentsSystem;