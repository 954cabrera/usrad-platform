// src/components/dashboard/PatientManagementSystem.jsx
// Fully populated with realistic hard-coded data for showcase

import { useState, useEffect } from 'react';

const PatientManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [reportStatusFilter, setReportStatusFilter] = useState('all');
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Enhanced pending requests with realistic data
  const pendingRequests = [
    {
      id: '001',
      patient: 'Sarah Johnson',
      procedure: 'MRI Lumbar Spine w/o contrast',
      priority: 'urgent',
      priorityScore: 95,
      timeframe: 'ASAP',
      waitingDays: 2,
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com',
      revenue: 485,
      prescriptionUploaded: true,
      submittedAt: '2025-06-28T10:30:00',
      source: 'Direct',
      age: 45,
      insurance: 'Self-Pay'
    },
    {
      id: '002',
      patient: 'Michael Chen',
      procedure: 'MRI Brain w/ contrast',
      priority: 'routine',
      priorityScore: 35,
      timeframe: 'Within 1 week',
      waitingDays: 1,
      phone: '(555) 987-6543',
      email: 'mchen@email.com',
      revenue: 725,
      prescriptionUploaded: true,
      submittedAt: '2025-06-29T14:15:00',
      source: 'Provider Referral',
      age: 52,
      insurance: 'Self-Pay'
    },
    {
      id: '003',
      patient: 'Emily Rodriguez',
      procedure: 'MRI Knee w/o contrast',
      priority: 'routine',
      priorityScore: 20,
      timeframe: 'Flexible',
      waitingDays: 3,
      phone: '(555) 456-7890',
      email: 'emily.r@email.com',
      revenue: 395,
      prescriptionUploaded: false,
      submittedAt: '2025-06-27T09:45:00',
      source: 'Web Search',
      age: 28,
      insurance: 'Self-Pay'
    },
    {
      id: '004',
      patient: 'James Wilson',
      procedure: 'MRI Shoulder w/ contrast',
      priority: 'urgent',
      priorityScore: 88,
      timeframe: 'Within 24 hours',
      waitingDays: 1,
      phone: '(555) 234-5678',
      email: 'james.w@email.com',
      revenue: 625,
      prescriptionUploaded: true,
      submittedAt: '2025-06-29T16:20:00',
      source: 'Emergency Referral',
      age: 34,
      insurance: 'Self-Pay'
    }
  ];

  // Comprehensive scheduled appointments
  const scheduledAppointments = [
    {
      id: 'S001',
      patient: 'David Williams',
      procedure: 'MRI Shoulder w/o contrast',
      date: '2025-07-02T10:00:00',
      facility: 'Miami Imaging Center',
      facilityAddress: '123 Biscayne Blvd, Miami, FL 33132',
      confirmationCode: 'USR-789456',
      amount: 445,
      canReschedule: true,
      canCancel: true,
      paymentStatus: 'Paid',
      facilityRating: 4.8,
      phone: '(555) 234-5678',
      email: 'david.w@email.com',
      checkedIn: false,
      reminderSent: true
    },
    {
      id: 'S002',
      patient: 'Lisa Thompson',
      procedure: 'MRI Cervical Spine w/ contrast',
      date: '2025-07-01T14:30:00',
      facility: 'Coral Gables Diagnostic',
      facilityAddress: '456 Coral Way, Coral Gables, FL 33134',
      confirmationCode: 'USR-123789',
      amount: 695,
      canReschedule: false,
      canCancel: false,
      paymentStatus: 'Paid',
      facilityRating: 4.6,
      phone: '(555) 345-6789',
      email: 'lisa.t@email.com',
      checkedIn: false,
      reminderSent: true
    },
    {
      id: 'S003',
      patient: 'Carlos Rodriguez',
      procedure: 'MRI Brain w/o contrast',
      date: '2025-07-03T09:15:00',
      facility: 'Aventura Medical Imaging',
      facilityAddress: '789 NE 167th St, Aventura, FL 33160',
      confirmationCode: 'USR-456123',
      amount: 525,
      canReschedule: true,
      canCancel: true,
      paymentStatus: 'Paid',
      facilityRating: 4.9,
      phone: '(555) 567-8901',
      email: 'carlos.r@email.com',
      checkedIn: false,
      reminderSent: false
    },
    {
      id: 'S004',
      patient: 'Angela Foster',
      procedure: 'MRI Knee w/ contrast',
      date: '2025-07-02T16:45:00',
      facility: 'Westside Radiology',
      facilityAddress: '321 SW 8th St, Miami, FL 33130',
      confirmationCode: 'USR-789012',
      amount: 485,
      canReschedule: true,
      canCancel: true,
      paymentStatus: 'Paid',
      facilityRating: 4.7,
      phone: '(555) 678-9012',
      email: 'angela.f@email.com',
      checkedIn: false,
      reminderSent: true
    },
    {
      id: 'S005',
      patient: 'Robert Kim',
      procedure: 'MRI Lumbar Spine w/ contrast',
      date: '2025-07-01T11:30:00',
      facility: 'Downtown Imaging',
      facilityAddress: '555 Flagler St, Miami, FL 33131',
      confirmationCode: 'USR-345678',
      amount: 695,
      canReschedule: false,
      canCancel: false,
      paymentStatus: 'Paid',
      facilityRating: 4.5,
      phone: '(555) 789-0123',
      email: 'robert.k@email.com',
      checkedIn: false,
      reminderSent: true
    }
  ];

  // Comprehensive awaiting reports data
  const awaitingReports = [
    {
      id: 'C001',
      patient: 'Robert Martinez',
      procedure: 'MRI Lumbar Spine w/ contrast',
      facility: 'Downtown Imaging',
      facilityAddress: '555 Flagler St, Miami, FL 33131',
      completedDate: '2025-06-28T09:00:00',
      hoursElapsed: 50,
      status: 'overdue',
      urgencyIcon: '🚨',
      facilityContact: '(555) 999-8888',
      escalationLevel: 2,
      amount: 695,
      confirmationCode: 'USR-111222',
      email: 'robert.m@email.com',
      phone: '(555) 111-2222'
    },
    {
      id: 'C002',
      patient: 'Jennifer Park',
      procedure: 'MRI Knee w/o contrast',
      facility: 'Westside Radiology',
      facilityAddress: '321 SW 8th St, Miami, FL 33130',
      completedDate: '2025-06-29T14:30:00',
      hoursElapsed: 26,
      status: 'due-soon',
      urgencyIcon: '⚠️',
      facilityContact: '(555) 888-7777',
      escalationLevel: 0,
      amount: 445,
      confirmationCode: 'USR-222333',
      email: 'jennifer.p@email.com',
      phone: '(555) 222-3333'
    },
    {
      id: 'C003',
      patient: 'Mark Thompson',
      procedure: 'MRI Brain w/o contrast',
      facility: 'Miami Imaging Center',
      facilityAddress: '123 Biscayne Blvd, Miami, FL 33132',
      completedDate: '2025-06-30T11:15:00',
      hoursElapsed: 6,
      status: 'recent',
      urgencyIcon: '🕐',
      facilityContact: '(555) 777-6666',
      escalationLevel: 0,
      amount: 525,
      confirmationCode: 'USR-333444',
      email: 'mark.t@email.com',
      phone: '(555) 333-4444'
    },
    {
      id: 'C004',
      patient: 'Susan Davis',
      procedure: 'MRI Shoulder w/ contrast',
      facility: 'Elite Diagnostics',
      facilityAddress: '888 Collins Ave, Miami Beach, FL 33139',
      completedDate: '2025-06-27T16:00:00',
      status: 'available',
      urgencyIcon: '✅',
      facilityContact: '(555) 666-5555',
      reportUploadedAt: '2025-06-28T14:30:00',
      patientNotified: true,
      amount: 615,
      confirmationCode: 'USR-444555',
      email: 'susan.d@email.com',
      phone: '(555) 444-5555'
    },
    {
      id: 'C005',
      patient: 'Kevin O\'Brien',
      procedure: 'MRI Cervical Spine w/o contrast',
      facility: 'Coral Gables Diagnostic',
      facilityAddress: '456 Coral Way, Coral Gables, FL 33134',
      completedDate: '2025-06-29T08:45:00',
      hoursElapsed: 32,
      status: 'due-soon',
      urgencyIcon: '⚠️',
      facilityContact: '(555) 555-4444',
      escalationLevel: 1,
      amount: 565,
      confirmationCode: 'USR-555666',
      email: 'kevin.o@email.com',
      phone: '(555) 555-6666'
    },
    {
      id: 'C006',
      patient: 'Maria Gonzalez',
      procedure: 'MRI Ankle w/o contrast',
      facility: 'Aventura Medical Imaging',
      facilityAddress: '789 NE 167th St, Aventura, FL 33160',
      completedDate: '2025-06-30T15:20:00',
      hoursElapsed: 2,
      status: 'recent',
      urgencyIcon: '🕐',
      facilityContact: '(555) 444-3333',
      escalationLevel: 0,
      amount: 425,
      confirmationCode: 'USR-666777',
      email: 'maria.g@email.com',
      phone: '(555) 666-7777'
    }
  ];

  // Comprehensive patient feedback data
  const patientFeedback = [
    {
      id: 'F001',
      patient: 'Susan Davis',
      procedure: 'MRI Shoulder w/ contrast',
      facility: 'Elite Diagnostics',
      completedDate: '2025-06-27T16:00:00',
      reportDeliveredDate: '2025-06-28T14:30:00',
      surveyStatus: 'received',
      overallRating: 5,
      ratings: {
        booking_experience: 5,
        facility_quality: 5,
        staff_friendliness: 5,
        wait_time: 4,
        communication: 5,
        value_for_money: 5
      },
      comments: 'Excellent service! The booking was so easy and the staff was very professional. Much better value than going through my insurance.',
      phone: '(555) 444-5555',
      email: 'susan.d@email.com',
      feedbackDate: '2025-06-29T09:15:00',
      remindersSent: 1,
      respondedAfterReminders: 1,
      actionRequired: false
    },
    {
      id: 'F002',
      patient: 'Michael Stevens',
      procedure: 'MRI Brain w/o contrast',
      facility: 'Miami Imaging Center',
      completedDate: '2025-06-25T11:00:00',
      reportDeliveredDate: '2025-06-26T13:20:00',
      surveyStatus: 'received',
      overallRating: 2,
      ratings: {
        booking_experience: 4,
        facility_quality: 2,
        staff_friendliness: 1,
        wait_time: 1,
        communication: 3,
        value_for_money: 4
      },
      comments: 'The booking process was fine, but I waited over an hour past my appointment time. The staff seemed overwhelmed and not very friendly. The price was good though.',
      phone: '(555) 333-4444',
      email: 'michael.s@email.com',
      feedbackDate: '2025-06-27T14:30:00',
      remindersSent: 2,
      respondedAfterReminders: 2,
      actionRequired: true,
      followUpStatus: 'pending'
    },
    {
      id: 'F003',
      patient: 'Robert Martinez',
      procedure: 'MRI Lumbar Spine w/ contrast',
      facility: 'Downtown Imaging',
      completedDate: '2025-06-28T09:00:00',
      reportDeliveredDate: '2025-06-29T16:45:00',
      surveyStatus: 'pending',
      phone: '(555) 111-2222',
      email: 'robert.m@email.com',
      remindersSent: 2,
      lastReminderSent: '2025-06-30T10:00:00',
      hoursElapsed: 18,
      actionRequired: false
    },
    {
      id: 'F004',
      patient: 'Jennifer Park',
      procedure: 'MRI Knee w/o contrast',
      facility: 'Westside Radiology',
      completedDate: '2025-06-29T14:30:00',
      reportDeliveredDate: '2025-06-30T08:15:00',
      surveyStatus: 'pending',
      phone: '(555) 222-3333',
      email: 'jennifer.p@email.com',
      remindersSent: 0,
      hoursElapsed: 8,
      actionRequired: false
    },
    {
      id: 'F005',
      patient: 'Angela Torres',
      procedure: 'MRI Cervical Spine w/ contrast',
      facility: 'Coral Gables Diagnostic',
      completedDate: '2025-06-26T13:15:00',
      reportDeliveredDate: '2025-06-27T10:30:00',
      surveyStatus: 'received',
      overallRating: 4,
      ratings: {
        booking_experience: 5,
        facility_quality: 4,
        staff_friendliness: 4,
        wait_time: 3,
        communication: 4,
        value_for_money: 5
      },
      comments: 'Great experience overall. The facility was clean and modern. Only minor complaint was waiting about 15 minutes past my appointment time.',
      phone: '(555) 777-8888',
      email: 'angela.t@email.com',
      feedbackDate: '2025-06-28T16:45:00',
      remindersSent: 1,
      respondedAfterReminders: 1,
      actionRequired: false
    },
    {
      id: 'F006',
      patient: 'David Chen',
      procedure: 'MRI Wrist w/o contrast',
      facility: 'Aventura Medical Imaging',
      completedDate: '2025-06-27T10:30:00',
      reportDeliveredDate: '2025-06-28T09:15:00',
      surveyStatus: 'received',
      overallRating: 5,
      ratings: {
        booking_experience: 5,
        facility_quality: 5,
        staff_friendliness: 5,
        wait_time: 5,
        communication: 5,
        value_for_money: 4
      },
      comments: 'Outstanding service from start to finish. The booking was seamless, the facility was top-notch, and I got my results quickly. Will definitely use USRad again!',
      phone: '(555) 888-9999',
      email: 'david.c@email.com',
      feedbackDate: '2025-06-29T11:20:00',
      remindersSent: 1,
      respondedAfterReminders: 1,
      actionRequired: false
    },
    {
      id: 'F007',
      patient: 'Lisa Wang',
      procedure: 'MRI Hip w/ contrast',
      facility: 'Elite Diagnostics',
      completedDate: '2025-06-24T14:45:00',
      reportDeliveredDate: '2025-06-25T16:20:00',
      surveyStatus: 'no-response',
      phone: '(555) 999-0000',
      email: 'lisa.w@email.com',
      remindersSent: 3,
      lastReminderSent: '2025-06-28T12:00:00',
      actionRequired: false
    },
    {
      id: 'F008',
      patient: 'Carlos Mendez',
      procedure: 'MRI Foot w/o contrast',
      facility: 'Miami Imaging Center',
      completedDate: '2025-06-28T16:30:00',
      reportDeliveredDate: '2025-06-29T11:45:00',
      surveyStatus: 'pending',
      phone: '(555) 000-1111',
      email: 'carlos.m@email.com',
      remindersSent: 1,
      lastReminderSent: '2025-06-30T09:30:00',
      hoursElapsed: 14,
      actionRequired: false
    }
  ];

  // Analytics data
  const analyticsData = {
    dailyRevenue: 12485,
    weeklyRevenue: 67890,
    monthlyRevenue: 285600,
    conversionRate: 87.3,
    avgResponseTime: '2.4 hours',
    topPerformingFacility: 'Elite Diagnostics',
    slaCompliance: 94.2,
    patientSatisfaction: 4.3,
    feedbackResponseRate: 73
  };

  // Enhanced business action handlers
  const handleBusinessAction = (action, patientName, details = '') => {
    const timestamp = new Date().toLocaleTimeString();
    
    const actions = {
      schedule: `🎯 SCHEDULING WORKFLOW INITIATED [${timestamp}]\n\nPatient: ${patientName}\n\n📋 Automated Process:\n• AI facility matching (location + availability)\n• Real-time slot confirmation\n• Secure payment processing ($${details})\n• Multi-channel confirmations sent\n• Provider notification dispatched\n• Quality score: 98.5%\n\n✅ Expected completion: 90 seconds\n💰 Revenue impact: +$${details}\n📊 Network utilization: Optimized`,
      
      contact: `📞 OMNICHANNEL COMMUNICATION CENTER [${timestamp}]\n\nPatient: ${patientName}\n\n🤖 Smart Engagement:\n• SMS (98% open rate) - Priority\n• Email (personalized template)\n• Voice call (click-to-dial ready)\n• In-app push notification\n\n📈 Historical Data:\n• Last contact: 2 days ago\n• Response rate: 95%\n• Preferred method: SMS (2:1 ratio)\n• Engagement score: High\n\n🎯 Recommended action: Send SMS reminder with booking link`,
      
      reschedule: `📅 INTELLIGENT RESCHEDULING SYSTEM [${timestamp}]\n\nPatient: ${patientName}\n\n🔄 Smart Rebooking:\n• AI-powered availability scanning\n• 15+ network facilities checked\n• Priority scoring maintained\n• Zero additional fees\n• Instant confirmations\n• Provider sync completed\n\n⚡ Performance Metrics:\n• Average rebooking time: 18 minutes\n• Customer satisfaction: 96.2%\n• Network efficiency: +12%\n\n✅ Recommended slots found: 3 options within 48 hours`,
      
      cancel: `❌ SMART CANCELLATION & REFUND PROCESSING [${timestamp}]\n\nPatient: ${patientName}\n\n💰 Automated Refund Protocol:\n• Full refund: $${details} (processed)\n• Payment gateway: 2-3 business days\n• Facility calendar updated instantly\n• Slot released to priority queue\n• Cancellation analytics logged\n\n📊 Impact Analysis:\n• Revenue protected through efficiency\n• Network capacity optimized\n• Patient retention strategy activated\n• Future booking probability: 78%`,
      
      followUp: `🏥 PROVIDER SLA ENFORCEMENT PROTOCOL [${timestamp}]\n\nPatient: ${patientName}\n\n⚡ Escalation Matrix Activated:\n• Level 1: Automated facility reminder\n• Level 2: Manager personal call\n• Level 3: Contract compliance review\n• Performance impact logged\n• Quality score adjustment\n\n📊 Provider Performance Dashboard:\n• Current response time: 18.5 hours\n• SLA compliance: 87% (below target)\n• Action required: Immediate improvement plan\n• Contract risk level: Medium\n\n🎯 Next step: Regional manager intervention within 2 hours`,
      
      sendReminder: `📬 AI-POWERED FEEDBACK COLLECTION [${timestamp}]\n\nPatient: ${patientName}\n\n🤖 Smart Survey Deployment:\n• Personalized 90-second survey\n• Mobile-first responsive design\n• Dynamic incentive: $10 credit\n• Multi-language support\n• Real-time sentiment analysis\n\n📈 Optimization Features:\n• Send time optimization (3:30 PM ideal)\n• A/B tested messaging\n• Progressive incentive scaling\n• Predictive response modeling\n\n🎯 Expected outcomes: 78% response probability`,
      
      addressIssues: `⚠️ ADVANCED SERVICE RECOVERY PROTOCOL [${timestamp}]\n\nPatient: ${patientName}\nRating: ${details}⭐\n\n🔧 Immediate Recovery Actions:\n• Executive team notification sent\n• Personal follow-up call within 2 hours\n• $75 future booking credit applied\n• Facility manager escalation initiated\n• Root cause analysis triggered\n\n📊 Recovery Success Metrics:\n• 91% patients improve satisfaction\n• 82% become repeat customers\n• Average resolution: 36 hours\n• Negative review prevention: 94%\n\n🎯 Goal: Transform dissatisfaction into loyalty`,
      
      sharePositive: `⭐ POSITIVE FEEDBACK AMPLIFICATION [${timestamp}]\n\nPatient: ${patientName}\nRating: ${details}⭐\n\n🎉 Excellence Recognition Program:\n• Testimonial added to facility profile\n• Staff recognition bonus triggered\n• Marketing case study approved\n• Provider performance bonus earned\n• Network quality score improved\n\n📈 Business Impact:\n• Facility reputation boost\n• Patient acquisition tool activated\n• Provider retention enhanced\n• Competitive advantage strengthened\n\n✅ Virtuous cycle: Quality → Recognition → More Quality`,

      viewReport: `📄 SECURE REPORT ACCESS PORTAL [${timestamp}]\n\nPatient: ${patientName}\n\n🔒 HIPAA-Compliant Viewer:\n• End-to-end encryption\n• Audit trail logging\n• Multi-format support (PDF, DICOM)\n• Mobile-optimized display\n• One-click physician sharing\n\n📊 Access Analytics:\n• Report views: 3\n• Downloads: 1\n• Shared: 0\n• Patient portal integration: Active\n\n✅ Report status: Available for download`,

      resendNotification: `📧 PATIENT NOTIFICATION SYSTEM [${timestamp}]\n\nPatient: ${patientName}\n\n📬 Multi-Channel Delivery:\n• SMS notification sent\n• Email with secure link\n• Patient portal alert\n• Mobile app push notification\n\n📈 Delivery Metrics:\n• SMS delivery rate: 99.2%\n• Email open rate: 87%\n• Portal login rate: 65%\n• Average view time: 4.2 minutes\n\n✅ Patient engagement: High probability`
    };

    alert(actions[action] || `Action: ${action} for ${patientName} [${timestamp}]`);
  };

  // Filter functions
  const filteredRequests = pendingRequests
    .filter(req => {
      const matchesSearch = req.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           req.procedure.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const filteredReports = awaitingReports.filter(report => {
    const matchesSearch = report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        report.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        report.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = reportStatusFilter === 'all' || report.status === reportStatusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (b.status === 'overdue' && a.status !== 'overdue') return 1;
    return (b.hoursElapsed || 0) - (a.hoursElapsed || 0);
  });

  const filteredFeedback = patientFeedback.filter(feedback => {
    const matchesSearch = feedback.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        feedback.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        feedback.facility.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (feedbackStatusFilter !== 'all') {
      switch(feedbackStatusFilter) {
        case 'pending':
          matchesStatus = feedback.surveyStatus === 'pending';
          break;
        case 'received':
          matchesStatus = feedback.surveyStatus === 'received' && !feedback.actionRequired;
          break;
        case 'no-response':
          matchesStatus = feedback.surveyStatus === 'no-response';
          break;
        case 'action-required':
          matchesStatus = feedback.actionRequired === true;
          break;
      }
    }
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (a.actionRequired && !b.actionRequired) return -1;
    if (b.actionRequired && !a.actionRequired) return 1;
    if (a.surveyStatus === 'pending' && b.surveyStatus !== 'pending') return -1;
    if (b.surveyStatus === 'pending' && a.surveyStatus !== 'pending') return 1;
    return new Date(b.feedbackDate || b.reportDeliveredDate) - new Date(a.feedbackDate || a.reportDeliveredDate);
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const getStatusInfo = (status) => {
    const statuses = {
      overdue: { class: 'bg-red-100 text-red-800', text: 'OVERDUE (48+ hrs)' },
      'due-soon': { class: 'bg-yellow-100 text-yellow-800', text: 'Due Soon (24+ hrs)' },
      recent: { class: 'bg-green-100 text-green-800', text: 'Recent (Under 24hrs)' },
      available: { class: 'bg-blue-100 text-blue-800', text: 'Report Available' }
    };
    return statuses[status] || { class: 'bg-gray-100 text-gray-800', text: status };
  };

  const getRatingDisplay = (rating) => {
    if (!rating) return null;
    if (rating >= 5) return <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium">{rating}⭐ Excellent</span>;
    if (rating >= 4) return <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-medium">{rating}⭐ Good</span>;
    if (rating >= 3) return <span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs font-medium">{rating}⭐ Fair</span>;
    return <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium">{rating}⭐ Poor</span>;
  };

  const getFeedbackStatusDisplay = (feedback) => {
    switch(feedback.surveyStatus) {
      case 'pending': 
        if (feedback.remindersSent >= 3) {
          return { class: 'bg-red-100 text-red-800', text: 'No Response (3 attempts)' };
        }
        return { class: 'bg-yellow-100 text-yellow-800', text: `Pending (${feedback.remindersSent} reminders sent)` };
      case 'received': 
        if (feedback.actionRequired) {
          return { class: 'bg-red-100 text-red-800', text: 'Action Required (Low Rating)' };
        }
        return { class: 'bg-green-100 text-green-800', text: 'Feedback Received' };
      case 'no-response': 
        return { class: 'bg-red-100 text-red-800', text: 'No Response (Gave Up)' };
      default: 
        return { class: 'bg-gray-100 text-gray-800', text: feedback.surveyStatus };
    }
  };

  return (
    <div>
      {/* Analytics Toggle */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Patient Lifecycle Management</h2>
          <p className="text-sm text-gray-600">Real-time operations dashboard</p>
        </div>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {showAnalytics ? '📊 Hide Analytics' : '📈 Show Analytics'}
        </button>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">📊 Real-Time Analytics Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${analyticsData.dailyRevenue.toLocaleString()}</div>
              <div className="text-sm text-green-800">Today's Revenue</div>
              <div className="text-xs text-green-600">+23% vs yesterday</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.conversionRate}%</div>
              <div className="text-sm text-blue-800">Conversion Rate</div>
              <div className="text-xs text-blue-600">+5.2% this month</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.avgResponseTime}</div>
              <div className="text-sm text-purple-800">Avg Response Time</div>
              <div className="text-xs text-purple-600">-15 min improvement</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{analyticsData.slaCompliance}%</div>
              <div className="text-sm text-yellow-800">SLA Compliance</div>
              <div className="text-xs text-yellow-600">Target: 95%</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'pending', label: 'Pending Requests', count: pendingRequests.length, icon: '⏳' },
            { key: 'scheduled', label: 'Scheduled Appointments', count: scheduledAppointments.length, icon: '📅' },
            { key: 'reports', label: 'Awaiting Reports', count: awaitingReports.length, icon: '📋' },
            { key: 'feedback', label: 'Patient Feedback', count: patientFeedback.length, icon: '⭐' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label} ({tab.count})</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Pending Requests Tab */}
      {activeTab === 'pending' && (
        <div>
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search patients, procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">🚨 Urgent Only</option>
              <option value="routine">✅ Routine Only</option>
            </select>
          </div>

          {/* Enhanced Requests List */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Pending MRI Requests</h2>
              <p className="text-sm text-gray-600">Smart priority scoring • AI-powered scheduling • Real-time optimization</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{request.patient}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {request.priority === 'urgent' ? '🚨 URGENT' : '✅ ROUTINE'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Score: {request.priorityScore}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Procedure</p>
                          <p className="text-sm text-gray-600">{request.procedure}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Timeframe</p>
                          <p className="text-sm text-gray-600">{request.timeframe}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Waiting</p>
                          <p className="text-sm text-gray-600">{request.waitingDays} day(s)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Source</p>
                          <p className="text-sm text-gray-600">{request.source}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>📞 {request.phone}</span>
                        <span>📧 {request.email}</span>
                        <span>💰 ${request.revenue}</span>
                        <span>👤 Age: {request.age}</span>
                        <span>
                          {request.prescriptionUploaded ? '✅' : '❌'} 
                          Prescription {request.prescriptionUploaded ? 'Uploaded' : 'Missing'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Submitted: {formatDate(request.submittedAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <button 
                        onClick={() => handleBusinessAction('schedule', request.patient, request.revenue)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        🎯 Schedule Now
                      </button>
                      <button 
                        onClick={() => handleBusinessAction('contact', request.patient)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        📞 Contact Patient
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Appointments Tab */}
      {activeTab === 'scheduled' && (
        <div>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">📅 Scheduled Appointments</h2>
              <p className="text-sm text-gray-600">Active bookings • Payment tracking • Facility coordination</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {scheduledAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{appointment.patient}</h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {appointment.paymentStatus}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {appointment.facilityRating}⭐ Facility
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Procedure</p>
                          <p className="text-sm text-gray-600">{appointment.procedure}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date & Time</p>
                          <p className="text-sm text-gray-600">{formatDate(appointment.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Facility</p>
                          <p className="text-sm text-gray-600">{appointment.facility}</p>
                          <p className="text-xs text-gray-500">{appointment.facilityAddress}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>📞 {appointment.phone}</span>
                        <span>📧 {appointment.email}</span>
                        <span>💰 ${appointment.amount} paid</span>
                        <span>🔑 {appointment.confirmationCode}</span>
                        <span>{appointment.reminderSent ? '✅ Reminder Sent' : '⏳ Reminder Pending'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <button 
                        className={`px-4 py-2 rounded-md transition-colors ${
                          appointment.canReschedule 
                            ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!appointment.canReschedule}
                        onClick={() => handleBusinessAction('reschedule', appointment.patient)}
                      >
                        {appointment.canReschedule ? '📅 Reschedule' : '🚫 Cannot Reschedule'}
                      </button>
                      <button 
                        className={`px-4 py-2 rounded-md transition-colors ${
                          appointment.canCancel 
                            ? 'border border-red-300 text-red-700 hover:bg-red-50' 
                            : 'border border-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!appointment.canCancel}
                        onClick={() => handleBusinessAction('cancel', appointment.patient, appointment.amount)}
                      >
                        {appointment.canCancel ? '❌ Cancel' : '🚫 Cannot Cancel'}
                      </button>
                      <button 
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => handleBusinessAction('contact', appointment.patient)}
                      >
                        📞 Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Awaiting Reports Tab */}
      {activeTab === 'reports' && (
        <div>
          {/* Filter Options */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search completed appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={reportStatusFilter}
              onChange={(e) => setReportStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="overdue">🚨 Overdue (48+ hours)</option>
              <option value="due-soon">⚠️ Due Soon (24+ hours)</option>
              <option value="recent">🕐 Recent (Under 24 hours)</option>
              <option value="available">✅ Report Available</option>
            </select>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">📋 SLA Report Tracking</h2>
              <p className="text-sm text-gray-600">Real-time monitoring • Provider escalation • Quality assurance (SLA: 24-48 hours)</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredReports.map((report) => {
                const statusInfo = getStatusInfo(report.status);
                return (
                  <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{report.patient}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
                            {statusInfo.text}
                          </span>
                          <span className="text-lg">{report.urgencyIcon}</span>
                          {report.hoursElapsed && (
                            <span className="text-sm text-gray-500">{report.hoursElapsed} hours elapsed</span>
                          )}
                          {report.escalationLevel > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              Escalation Level {report.escalationLevel}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Procedure</p>
                            <p className="text-sm text-gray-600">{report.procedure}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Completed Date</p>
                            <p className="text-sm text-gray-600">{formatDate(report.completedDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Facility</p>
                            <p className="text-sm text-gray-600">{report.facility}</p>
                            <p className="text-xs text-gray-500">{report.facilityAddress}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>📞 {report.phone}</span>
                          <span>📧 {report.email}</span>
                          <span>💰 ${report.amount} paid</span>
                          <span>🏥 Provider: {report.facilityContact}</span>
                          <span>🔑 {report.confirmationCode}</span>
                          {report.reportUploadedAt && (
                            <span>✅ Report uploaded: {formatDate(report.reportUploadedAt)}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {report.status === 'available' ? (
                          <>
                            <button 
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handleBusinessAction('viewReport', report.patient)}
                            >
                              📄 View Report
                            </button>
                            <button 
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                              onClick={() => handleBusinessAction('resendNotification', report.patient)}
                            >
                              📧 Resend to Patient
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                              onClick={() => handleBusinessAction('followUp', report.patient)}
                            >
                              🏥 Follow Up Provider
                            </button>
                            <button 
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                              onClick={() => handleBusinessAction('contact', report.patient)}
                            >
                              📞 Update Patient
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Patient Feedback Tab */}
      {activeTab === 'feedback' && (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3">📈</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Response Rate</h3>
                  <p className="text-2xl font-bold text-green-600">73%</p>
                  <p className="text-xs text-gray-600">Last 30 days</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3">⭐</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Average Rating</h3>
                  <p className="text-2xl font-bold text-blue-600">4.3⭐</p>
                  <p className="text-xs text-gray-600">Overall satisfaction</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3">📊</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Pending Reviews</h3>
                  <p className="text-2xl font-bold text-orange-600">{patientFeedback.filter(f => f.surveyStatus === 'pending').length}</p>
                  <p className="text-xs text-gray-600">Awaiting response</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="mr-3">⚠️</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Action Required</h3>
                  <p className="text-2xl font-bold text-red-600">{patientFeedback.filter(f => f.actionRequired).length}</p>
                  <p className="text-xs text-gray-600">Low ratings to address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search patients or facilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={feedbackStatusFilter}
              onChange={(e) => setFeedbackStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">📧 Pending Response</option>
              <option value="received">✅ Feedback Received</option>
              <option value="no-response">😞 No Response</option>
              <option value="action-required">⚠️ Action Required (≤3⭐)</option>
            </select>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">⭐ Patient Satisfaction Intelligence</h2>
              <p className="text-sm text-gray-600">AI-powered feedback • Service recovery • Quality optimization (Auto-send 24hrs after report delivery)</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredFeedback.map((feedback) => {
                const statusInfo = getFeedbackStatusDisplay(feedback);
                const ratingDisplay = getRatingDisplay(feedback.overallRating);
                
                return (
                  <div key={feedback.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{feedback.patient}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
                            {statusInfo.text}
                          </span>
                          {ratingDisplay}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Procedure & Facility</p>
                            <p className="text-sm text-gray-600">{feedback.procedure}</p>
                            <p className="text-xs text-gray-500">{feedback.facility}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Completed & Report Delivered</p>
                            <p className="text-sm text-gray-600">{formatDate(feedback.completedDate)}</p>
                            <p className="text-xs text-gray-500">Report: {formatDate(feedback.reportDeliveredDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Response Status</p>
                            <p className="text-sm text-gray-600">{feedback.remindersSent}/3 reminders sent</p>
                            {feedback.feedbackDate ? (
                              <p className="text-xs text-gray-500">Responded: {formatDate(feedback.feedbackDate)}</p>
                            ) : feedback.lastReminderSent ? (
                              <p className="text-xs text-gray-500">Last: {formatDate(feedback.lastReminderSent)}</p>
                            ) : (
                              <p className="text-xs text-gray-500">Survey sent: {formatDate(feedback.reportDeliveredDate)}</p>
                            )}
                          </div>
                        </div>
                        
                        {feedback.comments && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Patient Comments:</p>
                            <p className="text-sm text-gray-600 italic">"{feedback.comments}"</p>
                          </div>
                        )}
                        
                        {feedback.ratings && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Detailed Ratings:</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
                              <div>Booking: {feedback.ratings.booking_experience}⭐</div>
                              <div>Facility: {feedback.ratings.facility_quality}⭐</div>
                              <div>Staff: {feedback.ratings.staff_friendliness}⭐</div>
                              <div>Wait Time: {feedback.ratings.wait_time}⭐</div>
                              <div>Communication: {feedback.ratings.communication}⭐</div>
                              <div>Value: {feedback.ratings.value_for_money}⭐</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-6 text-sm text-gray-600">
                          <span>📞 {feedback.phone}</span>
                          <span>📧 {feedback.email}</span>
                          <span>🏥 {feedback.facility}</span>
                          {feedback.actionRequired && (
                            <span className="text-red-600 font-medium">⚠️ Action Required</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {feedback.surveyStatus === 'pending' ? (
                          feedback.remindersSent < 3 ? (
                            <button 
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handleBusinessAction('sendReminder', feedback.patient)}
                            >
                              📧 Send Reminder ({feedback.remindersSent + 1}/3)
                            </button>
                          ) : (
                            <button 
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                              onClick={() => handleBusinessAction('giveUp', feedback.patient)}
                            >
                              😞 Mark as No Response
                            </button>
                          )
                        ) : feedback.surveyStatus === 'received' ? (
                          feedback.actionRequired ? (
                            <>
                              <button 
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                onClick={() => handleBusinessAction('addressIssues', feedback.patient, feedback.overallRating)}
                              >
                                ⚠️ Address Issues
                              </button>
                              <button 
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                onClick={() => handleBusinessAction('contactProvider', feedback.patient, feedback.facility)}
                              >
                                🏥 Contact Provider
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                onClick={() => handleBusinessAction('viewFullFeedback', feedback.patient)}
                              >
                                📊 View Full Details
                              </button>
                              <button 
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                onClick={() => handleBusinessAction('sharePositive', feedback.patient, feedback.overallRating)}
                              >
                                ⭐ Share with Provider
                              </button>
                            </>
                          )
                        ) : (
                          <button 
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => handleBusinessAction('retryFeedback', feedback.patient)}
                          >
                            🔄 Retry Survey
                          </button>
                        )}
                        <button 
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          onClick={() => handleBusinessAction('contact', feedback.patient)}
                        >
                          📞 Contact Patient
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagementSystem;