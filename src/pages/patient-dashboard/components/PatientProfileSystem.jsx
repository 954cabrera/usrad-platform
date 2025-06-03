import React, { useState } from 'react';

const PatientProfileSystem = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock profile data
  const [formData, setFormData] = useState({
    personal: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(954) 555-0123',
      dateOfBirth: '1985-08-15',
      gender: 'Female',
      address: '123 Wellness Way, Miramar, FL 33025'
    },
    medical: {
      allergies: ['Penicillin', 'Shellfish', 'Latex'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      physicianName: 'Dr. Maria Rodriguez',
      physicianPhone: '(954) 555-0189',
      physicianEmail: 'mrodriguez@healthpartners.com'
    },
    insurance: {
      primary: {
        provider: 'Blue Cross Blue Shield',
        planName: 'PPO Plus',
        memberId: 'BC123456789',
        groupNumber: 'GRP001',
        copay: '$25',
        deductible: '$1,500'
      }
    },
    emergency: [
      {
        id: 1,
        name: 'Michael Johnson',
        relationship: 'Spouse',
        phone: '(954) 555-0124',
        email: 'michael.johnson@email.com'
      },
      {
        id: 2,
        name: 'Jennifer Martinez',
        relationship: 'Sister',
        phone: '(954) 555-0125',
        email: 'jennifer.martinez@email.com'
      }
    ],
    preferences: {
      appointmentReminders: true,
      healthTips: true,
      promotionalEmails: false,
      language: 'English',
      timezone: 'Eastern Time (EST)',
      communicationMethod: 'Email'
    }
  });

  const completionPercentage = 85;

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤', count: null },
    { id: 'medical', name: 'Medical History', icon: '❤️', count: null },
    { id: 'insurance', name: 'Insurance', icon: '🛡️', count: null },
    { id: 'emergency', name: 'Emergency Contacts', icon: '👥', count: formData.emergency?.length || 0 },
    { id: 'preferences', name: 'Preferences', icon: '⚙️', count: null }
  ];

  const toggleEditMode = (section) => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const saveSection = async (section) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEditMode(prev => ({ ...prev, [section]: false }));
    setIsLoading(false);
  };

  const getCompletionItems = () => {
    const items = [
      { name: 'Personal Information', completed: formData.personal?.firstName && formData.personal?.email },
      { name: 'Medical History', completed: formData.medical?.allergies?.length > 0 },
      { name: 'Insurance Information', completed: formData.insurance?.primary?.provider },
      { name: 'Emergency Contacts', completed: formData.emergency?.length > 0 },
      { name: 'Communication Preferences', completed: formData.preferences?.communicationMethod }
    ];
    return items;
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        <button
          onClick={() => editMode.personal ? saveSection('personal') : toggleEditMode('personal')}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          {editMode.personal ? (
            isLoading ? '⏳ Saving...' : '💾 Save Changes'
          ) : (
            '✏️ Edit'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">First Name</label>
            {editMode.personal ? (
              <input
                type="text"
                value={formData.personal?.firstName || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, firstName: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-900 text-lg">{formData.personal?.firstName}</p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Email Address</label>
            {editMode.personal ? (
              <input
                type="email"
                value={formData.personal?.email || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, email: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-900">{formData.personal?.email}</p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Phone Number</label>
            {editMode.personal ? (
              <input
                type="tel"
                value={formData.personal?.phone || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, phone: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-900">{formData.personal?.phone}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Date of Birth</label>
            {editMode.personal ? (
              <input
                type="date"
                value={formData.personal?.dateOfBirth || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, dateOfBirth: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold text-gray-900">{new Date(formData.personal?.dateOfBirth).toLocaleDateString()}</p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Gender</label>
            {editMode.personal ? (
              <select
                value={formData.personal?.gender || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, gender: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <p className="font-semibold text-gray-900">{formData.personal?.gender}</p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Address</label>
            {editMode.personal ? (
              <textarea
                value={formData.personal?.address || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, address: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
                rows={2}
              />
            ) : (
              <p className="font-semibold text-gray-900">{formData.personal?.address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Medical History</h3>
        <button
          onClick={() => editMode.medical ? saveSection('medical') : toggleEditMode('medical')}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          {editMode.medical ? (
            isLoading ? '⏳ Saving...' : '💾 Save Changes'
          ) : (
            '✏️ Edit'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="usrad-card p-6">
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-red-800 font-semibold mb-3">
              ⚠️ Allergies & Reactions
            </h4>
          </div>
          <div className="space-y-3">
            {formData.medical?.allergies?.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="font-medium text-red-900">{allergy}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Known</span>
              </div>
            ))}
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-blue-800 font-semibold mb-3">
              💊 Current Medications
            </h4>
          </div>
          <div className="space-y-3">
            {formData.medical?.medications?.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-900">{medication}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-yellow-800 font-semibold mb-3">
              📋 Medical Conditions
            </h4>
          </div>
          <div className="space-y-3">
            {formData.medical?.conditions?.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <span className="font-medium text-yellow-900">{condition}</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Current</span>
              </div>
            ))}
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-gray-800 font-semibold mb-3">
              👨‍⚕️ Primary Care Physician
            </h4>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="font-semibold text-gray-900">{formData.medical?.physicianName}</p>
              <p className="text-sm text-gray-600">{formData.medical?.physicianPhone}</p>
              <p className="text-sm text-gray-600">{formData.medical?.physicianEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsuranceInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Insurance Information</h3>
        <button
          onClick={() => editMode.insurance ? saveSection('insurance') : toggleEditMode('insurance')}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          {editMode.insurance ? (
            isLoading ? '⏳ Saving...' : '💾 Save Changes'
          ) : (
            '✏️ Edit'
          )}
        </button>
      </div>

      <div className="usrad-card p-6">
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="flex items-center text-green-800 font-semibold mb-3">
            💳 Primary Insurance
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Insurance Provider</label>
              <p className="font-semibold text-green-900 text-lg">{formData.insurance?.primary?.provider}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Plan Name</label>
              <p className="font-semibold text-green-900">{formData.insurance?.primary?.planName}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Member ID</label>
              <p className="font-semibold text-green-900">{formData.insurance?.primary?.memberId}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Group Number</label>
              <p className="font-semibold text-green-900">{formData.insurance?.primary?.groupNumber}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Copay</label>
              <p className="font-semibold text-green-900">{formData.insurance?.primary?.copay}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">Deductible</label>
              <p className="font-semibold text-green-900">{formData.insurance?.primary?.deductible}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            👥 Add Contact
          </button>
          <button
            onClick={() => editMode.emergency ? saveSection('emergency') : toggleEditMode('emergency')}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {editMode.emergency ? (
              isLoading ? '⏳ Saving...' : '💾 Save'
            ) : (
              '✏️ Edit'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.emergency?.map((contact, index) => (
          <div key={contact.id} className="usrad-card p-6">
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <h4 className="flex items-center text-orange-800 font-semibold mb-3">
                🚨 Contact {index + 1}
              </h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block mb-1">Name</label>
                <p className="font-semibold text-orange-900">{contact.name}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block mb-1">Relationship</label>
                <p className="font-semibold text-orange-900">{contact.relationship}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block mb-1">Phone</label>
                <p className="font-semibold text-orange-900">{contact.phone}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <label className="text-xs font-bold text-orange-700 uppercase tracking-wider block mb-1">Email</label>
                <p className="font-semibold text-orange-900">{contact.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Communication & Preferences</h3>
        <button
          onClick={() => editMode.preferences ? saveSection('preferences') : toggleEditMode('preferences')}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          {editMode.preferences ? (
            isLoading ? '⏳ Saving...' : '💾 Save Changes'
          ) : (
            '✏️ Edit'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="usrad-card p-6">
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-purple-800 font-semibold mb-3">
              🔔 Notification Preferences
            </h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
              <span className="font-medium text-purple-900">Appointment Reminders</span>
              <input type="checkbox" checked={formData.preferences?.appointmentReminders} readOnly className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
              <span className="font-medium text-purple-900">Health Tips</span>
              <input type="checkbox" checked={formData.preferences?.healthTips} readOnly className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
              <span className="font-medium text-purple-900">Promotional Emails</span>
              <input type="checkbox" checked={formData.preferences?.promotionalEmails} readOnly className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="usrad-card p-6">
          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="flex items-center text-indigo-800 font-semibold mb-3">
              🌐 Language & Regional
            </h4>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Preferred Language</label>
              <p className="font-semibold text-indigo-900">{formData.preferences?.language}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Timezone</label>
              <p className="font-semibold text-indigo-900">{formData.preferences?.timezone}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Communication Method</label>
              <p className="font-semibold text-indigo-900">{formData.preferences?.communicationMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Profile Completion Status */}
      <div className="usrad-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            ✅
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Profile Completion</h3>
            <p className="text-gray-600">Complete your profile to improve your USRad experience</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Overall completion</span>
            <span className="font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{width: `${completionPercentage}%`}}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getCompletionItems().map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className={`text-lg ${item.completed ? '✅' : '⚠️'}`}>
                  {item.completed ? '✅' : '⚠️'}
                </span>
                <span className={`text-sm ${item.completed ? 'text-green-700' : 'text-yellow-700'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.name}</span>
            {tab.count !== null && (
              <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="usrad-card p-8">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'medical' && renderMedicalHistory()}
        {activeTab === 'insurance' && renderInsuranceInfo()}
        {activeTab === 'emergency' && renderEmergencyContacts()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>
    </div>
  );
};

export default PatientProfileSystem;