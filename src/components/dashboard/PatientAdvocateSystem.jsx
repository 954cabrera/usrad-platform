// src/components/dashboard/PatientAdvocateSystem.jsx
// Patient Advocate System - Frontline customer service and patient support tools

import { useState, useEffect } from 'react';

const PatientAdvocateSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all');
  const [callStatus, setCallStatus] = useState('available');

  // Comprehensive patient database for lookup
  const patientDatabase = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com',
      dateOfBirth: '1978-03-15',
      address: '123 Oak Street, Miami, FL 33131',
      insurance: 'Self-Pay',
      preferredContact: 'SMS',
      status: 'Active',
      lastContact: '2025-06-30T09:15:00',
      totalVisits: 3,
      totalSpent: 1455,
      appointments: [
        {
          id: 'A001',
          date: '2025-07-02T10:00:00',
          procedure: 'MRI Lumbar Spine w/o contrast',
          facility: 'Miami Imaging Center',
          status: 'Scheduled',
          amount: 485,
          confirmationCode: 'USR-789456'
        }
      ],
      communications: [
        {
          id: 'C001',
          date: '2025-06-30T09:15:00',
          type: 'SMS',
          direction: 'Outbound',
          content: 'Appointment reminder: Tomorrow at 10:00 AM - Miami Imaging Center',
          agent: 'System'
        },
        {
          id: 'C002',
          date: '2025-06-29T14:30:00',
          type: 'Phone',
          direction: 'Inbound',
          content: 'Patient called to confirm appointment details and parking information',
          agent: 'Lisa M.',
          duration: '5:30'
        }
      ],
      payments: [
        {
          id: 'PAY001',
          date: '2025-06-28T16:20:00',
          amount: 485,
          method: 'Credit Card',
          status: 'Completed',
          appointmentId: 'A001'
        }
      ],
      notes: [
        {
          id: 'N001',
          date: '2025-06-29T14:35:00',
          agent: 'Lisa M.',
          content: 'Patient very satisfied with previous MRI experience. Prefers morning appointments. Has mobility concerns - requested ground floor facility.',
          type: 'Service Note'
        }
      ],
      issues: [],
      satisfaction: 5,
      riskLevel: 'Low'
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'mchen@email.com',
      dateOfBirth: '1971-08-22',
      address: '456 Palm Avenue, Coral Gables, FL 33134',
      insurance: 'Self-Pay',
      preferredContact: 'Email',
      status: 'Active',
      lastContact: '2025-06-30T11:45:00',
      totalVisits: 1,
      totalSpent: 725,
      appointments: [
        {
          id: 'A002',
          date: '2025-07-03T14:30:00',
          procedure: 'MRI Brain w/ contrast',
          facility: 'Coral Gables Diagnostic',
          status: 'Scheduled',
          amount: 725,
          confirmationCode: 'USR-456789'
        }
      ],
      communications: [
        {
          id: 'C003',
          date: '2025-06-30T11:45:00',
          type: 'Email',
          direction: 'Outbound',
          content: 'Pre-appointment instructions and contrast preparation guidelines sent',
          agent: 'System'
        }
      ],
      payments: [
        {
          id: 'PAY002',
          date: '2025-06-29T10:15:00',
          amount: 725,
          method: 'Credit Card',
          status: 'Completed',
          appointmentId: 'A002'
        }
      ],
      notes: [
        {
          id: 'N002',
          date: '2025-06-29T16:20:00',
          agent: 'Carlos R.',
          content: 'First-time patient, very thorough questions about procedure. Engineering background, appreciates detailed explanations.',
          type: 'Service Note'
        }
      ],
      issues: [],
      satisfaction: 4,
      riskLevel: 'Low'
    },
    {
      id: 'P003',
      name: 'Emily Rodriguez',
      phone: '(555) 456-7890',
      email: 'emily.r@email.com',
      dateOfBirth: '1995-11-30',
      address: '789 Sunset Drive, Miami Beach, FL 33139',
      insurance: 'Self-Pay',
      preferredContact: 'Phone',
      status: 'Active',
      lastContact: '2025-06-30T08:30:00',
      totalVisits: 2,
      totalSpent: 820,
      appointments: [
        {
          id: 'A003',
          date: '2025-07-01T16:00:00',
          procedure: 'MRI Knee w/o contrast',
          facility: 'Elite Diagnostics',
          status: 'Pending',
          amount: 395,
          confirmationCode: 'USR-123456',
          issues: ['Prescription Missing']
        }
      ],
      communications: [
        {
          id: 'C004',
          date: '2025-06-30T08:30:00',
          type: 'Phone',
          direction: 'Outbound',
          content: 'Called regarding missing prescription - patient will contact physician today',
          agent: 'Maria S.',
          duration: '8:15'
        }
      ],
      payments: [],
      notes: [
        {
          id: 'N003',
          date: '2025-06-30T08:35:00',
          agent: 'Maria S.',
          content: 'Patient sports injury from soccer. Very cooperative, understands prescription requirement. Will follow up end of day.',
          type: 'Service Note'
        }
      ],
      issues: [
        {
          id: 'I001',
          date: '2025-06-30T08:30:00',
          type: 'Documentation',
          priority: 'Medium',
          description: 'Missing prescription - patient contacted physician',
          status: 'In Progress',
          agent: 'Maria S.'
        }
      ],
      satisfaction: 4,
      riskLevel: 'Medium'
    },
    {
      id: 'P004',
      name: 'Robert Martinez',
      phone: '(555) 111-2222',
      email: 'robert.m@email.com',
      dateOfBirth: '1962-05-10',
      address: '321 Bay Road, Miami, FL 33132',
      insurance: 'Self-Pay',
      preferredContact: 'Phone',
      status: 'Escalated',
      lastContact: '2025-06-30T13:20:00',
      totalVisits: 4,
      totalSpent: 2190,
      appointments: [
        {
          id: 'A004',
          date: '2025-06-28T09:00:00',
          procedure: 'MRI Lumbar Spine w/ contrast',
          facility: 'Downtown Imaging',
          status: 'Completed',
          amount: 695,
          confirmationCode: 'USR-888999',
          issues: ['Report Overdue']
        }
      ],
      communications: [
        {
          id: 'C005',
          date: '2025-06-30T13:20:00',
          type: 'Phone',
          direction: 'Inbound',
          content: 'Patient frustrated about delayed report - 2 days overdue. Escalated to supervisor.',
          agent: 'David L.',
          duration: '12:45'
        },
        {
          id: 'C006',
          date: '2025-06-29T16:00:00',
          type: 'Phone',
          direction: 'Outbound',
          content: 'Follow-up call about report status - facility confirmed delivery by tomorrow',
          agent: 'David L.',
          duration: '6:20'
        }
      ],
      payments: [
        {
          id: 'PAY003',
          date: '2025-06-27T14:30:00',
          amount: 695,
          method: 'Credit Card',
          status: 'Completed',
          appointmentId: 'A004'
        }
      ],
      notes: [
        {
          id: 'N004',
          date: '2025-06-30T13:25:00',
          agent: 'David L.',
          content: 'Patient satisfaction at risk. Offered $100 credit for next appointment due to report delay. Manager approval received.',
          type: 'Escalation Note'
        }
      ],
      issues: [
        {
          id: 'I002',
          date: '2025-06-30T13:20:00',
          type: 'Service',
          priority: 'High',
          description: 'Patient complaint - Report delivery 2 days overdue, patient satisfaction at risk',
          status: 'Escalated',
          agent: 'David L.'
        }
      ],
      satisfaction: 2,
      riskLevel: 'High'
    }
  ];

  // Active service tasks
  const serviceTasks = [
    {
      id: 'T001',
      patient: 'Emily Rodriguez',
      priority: 'Medium',
      type: 'Follow-up',
      description: 'Check on prescription status - patient contacting physician',
      dueTime: '2025-06-30T17:00:00',
      status: 'In Progress',
      assignedTo: 'Maria S.'
    },
    {
      id: 'T002',
      patient: 'Robert Martinez',
      priority: 'High',
      type: 'Escalation',
      description: 'Manager follow-up required - report delay complaint',
      dueTime: '2025-06-30T15:00:00',
      status: 'Urgent',
      assignedTo: 'David L.'
    },
    {
      id: 'T003',
      patient: 'Jennifer Park',
      priority: 'Low',
      type: 'Survey',
      description: 'Send patient satisfaction survey - appointment completed',
      dueTime: '2025-06-30T18:00:00',
      status: 'Pending',
      assignedTo: 'System'
    },
    {
      id: 'T004',
      patient: 'Carlos Mendez',
      priority: 'Medium',
      type: 'Payment',
      description: 'Process refund - appointment cancelled >24 hours',
      dueTime: '2025-06-30T16:30:00',
      status: 'New',
      assignedTo: 'Unassigned'
    }
  ];

  // Current calls in queue
  const activeCalls = [
    {
      id: 'CALL001',
      patient: 'Sarah Johnson',
      phone: '(555) 123-4567',
      waitTime: '2:15',
      priority: 'Normal',
      reason: 'Appointment confirmation',
      line: 1
    },
    {
      id: 'CALL002',
      patient: 'Unknown Caller',
      phone: '(555) 999-8888',
      waitTime: '0:45',
      priority: 'Normal',
      reason: 'New inquiry',
      line: 2
    },
    {
      id: 'CALL003',
      patient: 'Michael Stevens',
      phone: '(555) 333-4444',
      waitTime: '4:30',
      priority: 'High',
      reason: 'Complaint follow-up',
      line: 3
    }
  ];

  // Service action handlers
  const handleServiceAction = (action, patientName, details = '') => {
    const timestamp = new Date().toLocaleTimeString();
    
    const actions = {
      viewProfile: `👤 PATIENT PROFILE ACCESS [${timestamp}]\n\nPatient: ${patientName}\n\n📊 Complete Account View:\n• Personal information and contact preferences\n• Complete appointment history (${details} visits)\n• Payment history and methods\n• Communication log and notes\n• Current issues and satisfaction score\n• Risk assessment and service alerts\n\n🔍 Quick Actions Available:\n• Schedule new appointment\n• Process payment/refund\n• Send communication\n• Add service note\n• Escalate issue`,
      
      takeCall: `📞 CALL CONNECTION INITIATED [${timestamp}]\n\nCaller: ${patientName}\nLine: ${details}\n\n🎧 Call Features Active:\n• Screen pop with patient history\n• Real-time note taking\n• Quick action buttons\n• Escalation options\n• Call recording (with consent)\n• CRM integration\n\n📋 Suggested Script:\n"Hello, this is [Your Name] with USRad patient services. I can see you're calling about [reason]. How can I help you today?"\n\n⚡ Call tools ready: Schedule, Payment, Transfer, Notes`,
      
      scheduleAppointment: `📅 APPOINTMENT SCHEDULING [${timestamp}]\n\nPatient: ${patientName}\n\n🎯 Smart Scheduling Features:\n• Real-time facility availability\n• Patient preference matching\n• Insurance verification\n• Automated confirmations\n• Calendar integration\n• Payment processing\n\n📊 Available Options:\n• 15+ Miami area facilities\n• Same-day availability\n• Evening and weekend slots\n• Specialized equipment options\n\n✅ Next Steps: Select procedure → Choose facility → Confirm time → Process payment`,
      
      processPayment: `💳 PAYMENT PROCESSING CENTER [${timestamp}]\n\nPatient: ${patientName}\nAmount: $${details}\n\n💰 Payment Options:\n• Credit/Debit card processing\n• Payment plan setup\n• Refund processing\n• Partial payment handling\n• Failed payment retry\n• Receipt generation\n\n🔒 Security Features:\n• PCI compliant processing\n• Tokenized card storage\n• Fraud detection\n• 3D Secure authentication\n\n📊 Account Status: Ready for immediate processing`,
      
      sendCommunication: `📧 COMMUNICATION DISPATCH [${timestamp}]\n\nPatient: ${patientName}\n\n📬 Multi-Channel Options:\n• SMS (preferred by 65% of patients)\n• Email with rich formatting\n• Phone call with script\n• Patient portal notification\n• Automated voice message\n\n📝 Message Templates:\n• Appointment reminders\n• Payment confirmations\n• Report notifications\n• Satisfaction surveys\n• Service recovery\n\n🎯 Personalized messaging with patient preferences applied`,
      
      escalateIssue: `⬆️ ISSUE ESCALATION PROTOCOL [${timestamp}]\n\nPatient: ${patientName}\nIssue: ${details}\n\n🚨 Escalation Path:\n• Immediate supervisor notification\n• Patient satisfaction team alert\n• Service recovery protocol activation\n• Manager intervention scheduled\n• Compensation authorization\n\n📊 Escalation Tracking:\n• Issue severity assessment\n• Resolution timeline\n• Patient communication log\n• Outcome measurement\n• Feedback loop closure\n\n✅ Supervisor notified - Response within 15 minutes`,
      
      addNote: `📝 SERVICE NOTE ADDED [${timestamp}]\n\nPatient: ${patientName}\n\n📋 Note Categories:\n• Service interaction\n• Patient preference\n• Issue resolution\n• Follow-up required\n• Satisfaction feedback\n\n🔍 Note Features:\n• Searchable content\n• Agent identification\n• Timestamp tracking\n• Issue linking\n• Alert triggers\n\n✅ Note saved to patient profile - Visible to all team members`,
      
      assignTask: `✅ TASK ASSIGNMENT [${timestamp}]\n\nPatient: ${patientName}\nTask: ${details}\n\n📋 Task Management:\n• Priority level assignment\n• Due date scheduling\n• Agent allocation\n• Progress tracking\n• Completion verification\n\n🔄 Workflow Integration:\n• Automatic reminders\n• Escalation triggers\n• Performance tracking\n• Outcome measurement\n\n⚡ Task created and assigned - Tracking initiated`,

      refundPayment: `💰 REFUND PROCESSING [${timestamp}]\n\nPatient: ${patientName}\nRefund Amount: $${details}\n\n🔄 Refund Process:\n• Automatic eligibility check\n• Original payment method refund\n• Processing time: 3-5 business days\n• Confirmation email sent\n• Account credit option available\n\n📋 Refund Details:\n• Full amount: $${details}\n• Reason: [As specified]\n• Authorization: Approved\n• Reference: REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}\n\n✅ Refund initiated - Patient notification sent`,

      rescheduleAppointment: `📅 APPOINTMENT RESCHEDULING [${timestamp}]\n\nPatient: ${patientName}\n\n🔄 Rescheduling Options:\n• Same facility, different time\n• Different facility, preferred time\n• Urgent priority placement\n• No additional fees\n• Automatic confirmations\n\n📊 Available Slots:\n• Next 7 days: 23 options\n• Same week: 8 options\n• Preferred facility: 5 options\n\n✅ Rescheduling interface ready - Patient preferences applied`
    };

    alert(actions[action] || `Service Action: ${action} for ${patientName} [${timestamp}]`);
  };

  // Filter patients based on search
  const filteredPatients = patientDatabase.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tasks
  const filteredTasks = serviceTasks.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'urgent') return task.priority === 'High' || task.status === 'Urgent';
    if (taskFilter === 'my') return task.assignedTo !== 'System' && task.assignedTo !== 'Unassigned';
    return task.status === taskFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const getPatientRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTaskPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      {/* Service Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'dashboard', label: 'Service Overview', icon: '🎧', count: null },
            { key: 'search', label: 'Patient Lookup', icon: '🔍', count: null },
            { key: 'calls', label: 'Active Calls', icon: '📞', count: activeCalls.length },
            { key: 'tasks', label: 'My Tasks', icon: '✅', count: serviceTasks.filter(t => t.status !== 'Completed').length },
            { key: 'urgent', label: 'Urgent Issues', icon: '🚨', count: serviceTasks.filter(t => t.priority === 'High').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label} {tab.count !== null && `(${tab.count})`}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Service Overview Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">📞</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Calls Today</h3>
                  <p className="text-2xl font-bold text-emerald-600">47</p>
                  <p className="text-xs text-gray-600">Avg: 5.2 min</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">✅</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Issues Resolved</h3>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                  <p className="text-xs text-gray-600">12 pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">⭐</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Satisfaction</h3>
                  <p className="text-2xl font-bold text-purple-600">4.8⭐</p>
                  <p className="text-xs text-gray-600">This week</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">⚡</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Response Time</h3>
                  <p className="text-2xl font-bold text-orange-600">2.3min</p>
                  <p className="text-xs text-gray-600">Target: 3min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Alerts */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">🚨 Priority Alerts</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">🚨</span>
                    <div>
                      <div className="font-medium text-red-800">Robert Martinez - Service Escalation</div>
                      <div className="text-sm text-red-600">Report delay complaint - Manager intervention required</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleServiceAction('escalateIssue', 'Robert Martinez', 'Report Delay')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                  >
                    Handle Now
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-3">⚠️</span>
                    <div>
                      <div className="font-medium text-yellow-800">Emily Rodriguez - Missing Documentation</div>
                      <div className="text-sm text-yellow-600">Prescription required before appointment tomorrow</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleServiceAction('assignTask', 'Emily Rodriguez', 'Follow-up on prescription')}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm"
                  >
                    Follow Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Lookup Tab */}
      {activeTab === 'search' && (
        <div>
          {/* Advanced Search */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">🔍 Patient Account Lookup</h3>
              <p className="text-sm text-gray-600">Search by name, phone, email, or confirmation code</p>
            </div>
            <div className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter patient name, phone, email, or confirmation code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 font-medium">
                  🔍 Search
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Search Results ({filteredPatients.length})</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPatientRiskColor(patient.riskLevel)}`}>
                            {patient.riskLevel} Risk
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {patient.totalVisits} visits
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Contact Info</p>
                            <p className="text-sm text-gray-600">{patient.phone}</p>
                            <p className="text-sm text-gray-600">{patient.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Status</p>
                            <p className="text-sm text-gray-600">{patient.status}</p>
                            <p className="text-sm text-gray-600">Satisfaction: {patient.satisfaction}⭐</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Last Contact</p>
                            <p className="text-sm text-gray-600">{formatDate(patient.lastContact)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Lifetime Value</p>
                            <p className="text-sm text-gray-600">${patient.totalSpent}</p>
                          </div>
                        </div>
                        
                        {patient.issues.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Active Issues:</p>
                            {patient.issues.map(issue => (
                              <div key={issue.id} className="text-sm text-red-600 bg-red-50 p-2 rounded mt-1">
                                {issue.description} - {issue.status}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <button 
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowPatientModal(true);
                          }}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
                        >
                          👤 View Profile
                        </button>
                        <button 
                          onClick={() => handleServiceAction('takeCall', patient.name, patient.totalVisits)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          📞 Call Patient
                        </button>
                        <button 
                          onClick={() => handleServiceAction('sendCommunication', patient.name)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          📧 Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Calls Tab */}
      {activeTab === 'calls' && (
        <div>
          {/* Call Queue Status */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">📞 Active Call Queue</h3>
                  <p className="text-sm text-gray-600">Manage incoming and active calls</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    callStatus === 'available' ? 'bg-green-100 text-green-800' : 
                    callStatus === 'busy' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      callStatus === 'available' ? 'bg-green-500' : 
                      callStatus === 'busy' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm font-medium">
                      {callStatus === 'available' ? 'Available' : callStatus === 'busy' ? 'On Call' : 'Away'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setCallStatus(callStatus === 'available' ? 'away' : 'available')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm"
                  >
                    {callStatus === 'available' ? '⏸️ Go Away' : '▶️ Go Available'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {activeCalls.map((call) => (
                  <div key={call.id} className={`border rounded-lg p-4 ${
                    call.priority === 'High' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{call.patient}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            call.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            Line {call.line}
                          </span>
                          <span className="text-sm text-gray-600">Wait: {call.waitTime}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>📞 {call.phone}</span>
                          <span className="ml-4">📋 {call.reason}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleServiceAction('takeCall', call.patient, call.line)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                        >
                          📞 Answer
                        </button>
                        <button 
                          onClick={() => handleServiceAction('transferCall', call.patient, 'Manager')}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm"
                        >
                          ➡️ Transfer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div>
          {/* Task Filter */}
          <div className="mb-6 flex gap-4">
            <select
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="urgent">Urgent Only</option>
              <option value="my">My Tasks</option>
              <option value="New">New Tasks</option>
              <option value="In Progress">In Progress</option>
            </select>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              ➕ New Task
            </button>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">✅ Service Tasks ({filteredTasks.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{task.patient}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTaskPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {task.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>⏰ Due: {formatDate(task.dueTime)}</span>
                        <span>👤 {task.assignedTo}</span>
                        <span>📊 {task.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button 
                        onClick={() => handleServiceAction('assignTask', task.patient, task.description)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
                      >
                        ✅ Work Task
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm">
                        ➡️ Reassign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Urgent Issues Tab */}
      {activeTab === 'urgent' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">🚨 Urgent Issues Requiring Immediate Attention</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {patientDatabase.filter(p => p.riskLevel === 'High' || p.issues.some(i => i.priority === 'High')).map((patient) => (
                  <div key={patient.id} className="border border-red-300 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-red-900">{patient.name}</h4>
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            HIGH PRIORITY
                          </span>
                        </div>
                        {patient.issues.map(issue => (
                          <div key={issue.id} className="text-sm text-red-700 mb-2">
                            <strong>{issue.type}:</strong> {issue.description}
                          </div>
                        ))}
                        <div className="text-sm text-red-600">
                          <span>📞 {patient.phone}</span>
                          <span className="ml-4">📊 Satisfaction: {patient.satisfaction}⭐</span>
                          <span className="ml-4">⏰ Last Contact: {formatDate(patient.lastContact)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button 
                          onClick={() => handleServiceAction('escalateIssue', patient.name, 'High Priority Issue')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                          🚨 Escalate Now
                        </button>
                        <button 
                          onClick={() => handleServiceAction('takeCall', patient.name)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
                        >
                          📞 Call Patient
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Profile Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-gray-600">Complete Patient Profile</p>
                </div>
                <button 
                  onClick={() => setShowPatientModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Patient Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">📋 Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>ID:</strong> {selectedPatient.id}</div>
                    <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                    <div><strong>Email:</strong> {selectedPatient.email}</div>
                    <div><strong>DOB:</strong> {selectedPatient.dateOfBirth}</div>
                    <div><strong>Address:</strong> {selectedPatient.address}</div>
                    <div><strong>Preferred Contact:</strong> {selectedPatient.preferredContact}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">📊 Account Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getPatientRiskColor(selectedPatient.riskLevel)}`}>{selectedPatient.status}</span></div>
                    <div><strong>Risk Level:</strong> {selectedPatient.riskLevel}</div>
                    <div><strong>Total Visits:</strong> {selectedPatient.totalVisits}</div>
                    <div><strong>Lifetime Value:</strong> ${selectedPatient.totalSpent}</div>
                    <div><strong>Satisfaction:</strong> {selectedPatient.satisfaction}⭐</div>
                    <div><strong>Last Contact:</strong> {formatDate(selectedPatient.lastContact)}</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">⚡ Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button 
                    onClick={() => handleServiceAction('scheduleAppointment', selectedPatient.name)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    📅 Schedule
                  </button>
                  <button 
                    onClick={() => handleServiceAction('processPayment', selectedPatient.name, '485')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                  >
                    💳 Payment
                  </button>
                  <button 
                    onClick={() => handleServiceAction('sendCommunication', selectedPatient.name)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm"
                  >
                    📧 Message
                  </button>
                  <button 
                    onClick={() => handleServiceAction('addNote', selectedPatient.name)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm"
                  >
                    📝 Add Note
                  </button>
                </div>
              </div>

              {/* Appointments */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">📅 Appointments</h3>
                <div className="space-y-3">
                  {selectedPatient.appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{appointment.procedure}</div>
                          <div className="text-sm text-gray-600">{formatDate(appointment.date)}</div>
                          <div className="text-sm text-gray-600">{appointment.facility}</div>
                          <div className="text-sm text-gray-600">Amount: ${appointment.amount} • {appointment.confirmationCode}</div>
                        </div>
                        <div className="flex gap-2">
                          {appointment.status === 'Scheduled' && (
                            <>
                              <button 
                                onClick={() => handleServiceAction('rescheduleAppointment', selectedPatient.name)}
                                className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700"
                              >
                                📅 Reschedule
                              </button>
                              <button 
                                onClick={() => handleServiceAction('refundPayment', selectedPatient.name, appointment.amount)}
                                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                              >
                                ❌ Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication History */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">💬 Communication History</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedPatient.communications.map((comm) => (
                    <div key={comm.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-sm">{comm.type} - {comm.direction}</div>
                        <div className="text-xs text-gray-500">{formatDate(comm.date)}</div>
                      </div>
                      <div className="text-sm text-gray-600">{comm.content}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Agent: {comm.agent} {comm.duration && `• Duration: ${comm.duration}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Notes */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">📝 Service Notes</h3>
                <div className="space-y-3">
                  {selectedPatient.notes.map((note) => (
                    <div key={note.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-sm">{note.type}</div>
                        <div className="text-xs text-gray-500">{formatDate(note.date)}</div>
                      </div>
                      <div className="text-sm text-gray-600">{note.content}</div>
                      <div className="text-xs text-gray-500 mt-1">By: {note.agent}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAdvocateSystem;