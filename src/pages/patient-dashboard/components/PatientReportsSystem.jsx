import React, { useState } from 'react';

const PatientReportsSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [shareEmail, setShareEmail] = useState('');

  // Mock reports data
  const mockReportsData = {
    reports: [
      {
        id: 1,
        type: "Brain MRI",
        date: "2025-05-15",
        provider: "Advanced Imaging Center of Davie",
        radiologist: "Dr. Maria Rodriguez, MD",
        status: "Final",
        findings: "Normal",
        reportUrl: "/api/reports/download/brain-mri-20250515.pdf",
        imageUrl: "/api/reports/images/brain-mri-20250515",
        fileSize: "4.2 MB",
        studyDate: "2025-05-15",
        studyTime: "2:30 PM",
        modality: "MRI",
        bodyPart: "Brain",
        contrast: true,
        technique: "Multiplanar multisequence imaging with gadolinium",
        impression: "Normal brain parenchyma. No acute intracranial abnormalities.",
        recommendations: "No immediate follow-up required.",
        shared: true,
        sharedWith: ["Dr. Michael Rodriguez"],
        downloadCount: 8,
        lastAccessed: "2025-05-20"
      },
      {
        id: 2,
        type: "Knee MRI",
        date: "2025-04-20",
        provider: "Precision Imaging Coral Springs",
        radiologist: "Dr. James Thompson, MD",
        status: "Final",
        findings: "Normal",
        reportUrl: "/api/reports/download/knee-mri-20250420.pdf",
        imageUrl: "/api/reports/images/knee-mri-20250420",
        fileSize: "3.1 MB",
        studyDate: "2025-04-20",
        studyTime: "10:00 AM",
        modality: "MRI",
        bodyPart: "Knee",
        contrast: false,
        technique: "Multiplanar multisequence imaging",
        impression: "No acute abnormalities. Normal knee joint structures.",
        recommendations: "Routine follow-up as clinically indicated.",
        shared: false,
        downloadCount: 5,
        lastAccessed: "2025-04-25"
      },
      {
        id: 3,
        type: "Chest CT",
        date: "2025-03-15",
        provider: "South Florida Diagnostic Center",
        radiologist: "Dr. Sarah Kim, MD",
        status: "Final",
        findings: "Normal",
        reportUrl: "/api/reports/download/chest-ct-20250315.pdf",
        imageUrl: "/api/reports/images/chest-ct-20250315",
        fileSize: "2.8 MB",
        studyDate: "2025-03-15",
        studyTime: "1:00 PM",
        modality: "CT",
        bodyPart: "Chest",
        contrast: true,
        technique: "Helical CT with IV contrast",
        impression: "Clear lungs. Normal heart size. No acute abnormalities.",
        recommendations: "No further imaging needed at this time.",
        shared: true,
        sharedWith: ["Dr. Michael Rodriguez", "Dr. Lisa Thompson"],
        downloadCount: 12,
        lastAccessed: "2025-03-22"
      },
      {
        id: 4,
        type: "Abdominal Ultrasound",
        date: "2025-02-10",
        provider: "Advanced Imaging Center of Davie",
        radiologist: "Dr. Amanda Wilson, MD",
        status: "Final",
        findings: "Normal",
        reportUrl: "/api/reports/download/abdominal-us-20250210.pdf",
        imageUrl: "/api/reports/images/abdominal-us-20250210",
        fileSize: "1.9 MB",
        studyDate: "2025-02-10",
        studyTime: "9:45 AM",
        modality: "Ultrasound",
        bodyPart: "Abdomen",
        contrast: false,
        technique: "Real-time ultrasound imaging",
        impression: "Normal liver, gallbladder, kidneys, and pancreas.",
        recommendations: "Routine follow-up per clinical indication.",
        shared: false,
        downloadCount: 3,
        lastAccessed: "2025-02-15"
      }
    ],
    summary: {
      totalReports: 4,
      normalFindings: 4,
      abnormalFindings: 0,
      pendingReports: 0,
      totalDownloads: 28,
      totalShared: 2,
      averageReportTime: "2 hours",
      lastReportDate: "2025-05-15"
    },
    sharedAccess: [
      {
        id: 1,
        physicianName: "Dr. Michael Rodriguez",
        physicianEmail: "mrodriguez@miamimed.com",
        accessGranted: "2025-04-02",
        accessExpires: "2025-10-02",
        reportsShared: 3,
        lastAccessed: "2025-05-10",
        permissions: ["view", "download"]
      },
      {
        id: 2,
        physicianName: "Dr. Lisa Thompson",
        physicianEmail: "lthompson@neurocenter.com",
        accessGranted: "2025-02-10",
        accessExpires: "2025-08-10",
        reportsShared: 1,
        lastAccessed: "2025-03-22",
        permissions: ["view"]
      }
    ]
  };

  const reportCategories = [
    { id: 'all', name: "All Reports", count: mockReportsData.reports.length, icon: '📊' },
    { id: 'mri', name: "MRI", count: mockReportsData.reports.filter(r => r.modality === 'MRI').length, icon: '🧠' },
    { id: 'ct', name: "CT", count: mockReportsData.reports.filter(r => r.modality === 'CT').length, icon: '🫁' },
    { id: 'ultrasound', name: "Ultrasound", count: mockReportsData.reports.filter(r => r.modality === 'Ultrasound').length, icon: '📱' },
    { id: 'shared', name: "Shared", count: mockReportsData.reports.filter(r => r.shared).length, icon: '🔗' }
  ];

  const filteredReports = mockReportsData.reports.filter(report => {
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'shared' && report.shared) ||
                           report.modality.toLowerCase() === activeCategory;
    const matchesSearch = report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.radiologist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (report) => {
    alert(`Downloading ${report.type} report from ${report.date}`);
  };

  const handleShare = (report) => {
    setSelectedReport(report);
    setShareModalOpen(true);
  };

  const handleShareSubmit = () => {
    if (shareEmail && selectedReport) {
      alert(`Report shared with ${shareEmail}! They will receive secure access via email.`);
      setShareModalOpen(false);
      setShareEmail('');
      setSelectedReport(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'final': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preliminary': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFindingsColor = (findings) => {
    switch (findings.toLowerCase()) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'abnormal': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Reports Header */}
      <div className="usrad-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Reports & Imaging</h1>
            <p className="text-gray-600 text-lg">Secure access to your complete imaging history</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Instant Downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Easy Sharing</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{mockReportsData.summary.totalReports}</div>
              <div className="text-gray-600 text-sm">Total Reports</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{mockReportsData.summary.totalShared}</div>
              <div className="text-gray-600 text-sm">Shared Reports</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="usrad-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports by type, provider, or radiologist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {reportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="xl:col-span-2 space-y-6">
          {filteredReports.length === 0 ? (
            <div className="usrad-card p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms' : 'No reports match the selected category'}
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="usrad-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">
                        {report.modality === 'MRI' ? '🧠' : 
                         report.modality === 'CT' ? '🫁' : 
                         report.modality === 'Ultrasound' ? '📱' : '📊'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{report.type}</h3>
                      <p className="text-gray-600">{report.provider}</p>
                      <p className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getFindingsColor(report.findings)}`}>
                      {report.findings}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Study Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Study Date:</span>
                        <span className="font-medium">{new Date(report.studyDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Study Time:</span>
                        <span className="font-medium">{report.studyTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modality:</span>
                        <span className="font-medium">{report.modality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Body Part:</span>
                        <span className="font-medium">{report.bodyPart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contrast:</span>
                        <span className="font-medium">{report.contrast ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Report Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Radiologist:</span>
                        <span className="font-medium">{report.radiologist}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">File Size:</span>
                        <span className="font-medium">{report.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Downloads:</span>
                        <span className="font-medium">{report.downloadCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Accessed:</span>
                        <span className="font-medium">{new Date(report.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      {report.shared && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shared with:</span>
                          <span className="font-medium text-blue-600">{report.sharedWith?.length || 0} doctors</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Clinical Information */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Clinical Impression</h5>
                  <p className="text-gray-700 text-sm mb-3">{report.impression}</p>
                  <h5 className="font-medium text-gray-900 mb-2">Recommendations</h5>
                  <p className="text-gray-700 text-sm">{report.recommendations}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownload(report)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📥 Download Report
                  </button>
                  <button
                    onClick={() => alert('Opening image viewer...')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    🖼️ View Images
                  </button>
                  <button
                    onClick={() => handleShare(report)}
                    className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    🔗 Share with Doctor
                  </button>
                  <button
                    onClick={() => alert('Printing report...')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    🖨️ Print
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                📑 Download All Reports
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                📧 Email Reports to Doctor
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                🔍 Request Report Explanation
              </button>
            </div>
          </div>

          {/* Shared Access */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shared Access</h3>
            <div className="space-y-4">
              {mockReportsData.sharedAccess.map((access) => (
                <div key={access.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">{access.physicianName}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {access.reportsShared} reports
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">{access.physicianEmail}</p>
                  <div className="text-xs text-blue-600">
                    <p>Access expires: {new Date(access.accessExpires).toLocaleDateString()}</p>
                    <p>Last accessed: {new Date(access.lastAccessed).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Summary */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Reports:</span>
                <span className="font-semibold text-gray-900">{mockReportsData.summary.totalReports}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Normal Findings:</span>
                <span className="font-semibold text-green-600">{mockReportsData.summary.normalFindings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Downloads:</span>
                <span className="font-semibold text-gray-900">{mockReportsData.summary.totalDownloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Report Time:</span>
                <span className="font-semibold text-gray-900">{mockReportsData.summary.averageReportTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Report</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Sharing: <span className="font-medium">{selectedReport?.type}</span>
              </p>
              <p className="text-xs text-gray-500">
                The recipient will receive secure access to view and download this report.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor's Email Address
              </label>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="doctor@example.com"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleShareSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Share Report
              </button>
              <button
                onClick={() => setShareModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReportsSystem;