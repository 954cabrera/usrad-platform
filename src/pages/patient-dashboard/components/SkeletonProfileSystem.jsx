// /src/pages/patient-dashboard/components/SkeletonProfileSystem.jsx
import React, { useState, useEffect } from 'react';
import { User, Heart, Shield, Users, Settings, Save, Edit, Plus, Trash2, Camera } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
        <div>
          <div className="h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="ml-auto">
          <div className="h-10 bg-gray-300 rounded-lg w-32 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Progress Bar Skeleton */}
    <div className="usrad-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-gray-300 h-3 rounded-full w-4/5 animate-pulse"></div>
      </div>
    </div>

    {/* Tabs Skeleton */}
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex-1 h-12 bg-gray-200 rounded-md animate-pulse"></div>
      ))}
    </div>

    {/* Form Content Skeleton */}
    <div className="usrad-card p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <div className="h-10 bg-gray-300 rounded-lg w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
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

const SkeletonProfileSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical History', icon: Heart },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'emergency', label: 'Emergency Contacts', icon: Users },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

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
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
        .usrad-gradient-gold { background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%); }
      `}</style>

      {/* Profile Header */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Sarah Johnson</h1>
              <p className="text-blue-100">Patient ID: USR-2024-001234</p>
            </div>
            <div className="ml-auto">
              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="usrad-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold usrad-navy">Profile Completion</h3>
          <span className="text-2xl font-bold usrad-gold">85%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="usrad-gradient-gold h-3 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Complete your emergency contacts to reach 100%</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max py-3 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === tab.id
                  ? 'bg-white usrad-navy shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="usrad-card p-8">
        {activeTab === 'personal' && (
          <div>
            <h2 className="text-2xl font-bold usrad-navy mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" defaultValue="Sarah" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" defaultValue="Johnson" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" defaultValue="1985-06-15" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" defaultValue="(305) 555-0123" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue="sarah.johnson@email.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" defaultValue="1234 Ocean Drive, Miami Beach, FL 33139" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div>
            <h2 className="text-2xl font-bold usrad-navy mb-6">Medical History</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Penicillin</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Shellfish</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Allergy</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Lisinopril 10mg - Daily</span>
                    <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Vitamin D3 2000 IU - Daily</span>
                    <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Medication</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Hypertension</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Vitamin D Deficiency</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Add Condition</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insurance' && (
          <div>
            <h2 className="text-2xl font-bold usrad-navy mb-6">Insurance Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Primary Insurance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                    <input type="text" defaultValue="Blue Cross Blue Shield" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                    <input type="text" defaultValue="BCBS123456789" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                    <input type="text" defaultValue="GRP001234" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member ID</label>
                    <input type="text" defaultValue="MEM987654321" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div>
            <h2 className="text-2xl font-bold usrad-navy mb-6">Emergency Contacts</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Michael Johnson</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Primary</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><strong>Relationship:</strong> Spouse</div>
                  <div><strong>Phone:</strong> (305) 555-0456</div>
                  <div><strong>Email:</strong> michael.johnson@email.com</div>
                </div>
              </div>
              <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                <Plus className="w-6 h-6 mx-auto mb-2" />
                Add Emergency Contact
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div>
            <h2 className="text-2xl font-bold usrad-navy mb-6">Communication Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    'Appointment reminders',
                    'Report availability notifications',
                    'Referral program updates',
                    'Health tips and educational content',
                    'Promotional offers and discounts'
                  ].map((item, index) => (
                    <label key={index} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked={index < 3} className="w-5 h-5 text-blue-600 rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferred Contact Method</h3>
                <div className="space-y-2">
                  {['Email', 'SMS Text', 'Phone Call', 'In-App Notifications'].map((method) => (
                    <label key={method} className="flex items-center space-x-3">
                      <input type="radio" name="contact" defaultChecked={method === 'Email'} className="w-5 h-5 text-blue-600" />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileSystem;