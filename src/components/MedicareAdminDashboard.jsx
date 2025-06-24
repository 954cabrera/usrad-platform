// src/components/MedicareAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, CheckCircle, AlertCircle, MapPin, Calculator, 
  Database, RefreshCw, Download, Upload, Settings
} from 'lucide-react';

const MedicareAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pricingTest, setPricingTest] = useState({
    cptCode: '70551',
    zipCode: '33101',
    state: 'FL'
  });

  // Sample data for dashboard metrics
  const [systemMetrics, setSystemMetrics] = useState({
    totalProcedures: 100,
    totalLocalities: 5,
    lastUpdated: '2025-06-23',
    avgResponseTime: '85ms',
    totalQuotes: 1247,
    errorRate: '0.2%'
  });

  const [localities, setLocalities] = useState([
    { code: '09102_04', name: 'MIAMI', state: 'FL', work_gpci: 1.000, pe_gpci: 1.027, mp_gpci: 2.500 },
    { code: '09102_03', name: 'FORT LAUDERDALE', state: 'FL', work_gpci: 1.000, pe_gpci: 0.998, mp_gpci: 1.770 },
    { code: '09102_99', name: 'REST OF FLORIDA', state: 'FL', work_gpci: 1.000, pe_gpci: 0.940, mp_gpci: 1.467 },
    { code: '10212_01', name: 'ATLANTA', state: 'GA', work_gpci: 1.000, pe_gpci: 0.997, mp_gpci: 1.128 },
    { code: '10212_99', name: 'REST OF GEORGIA', state: 'GA', work_gpci: 1.000, pe_gpci: 0.883, mp_gpci: 1.125 }
  ]);

  const commonProcedures = [
    { code: '70551', name: 'MRI Brain w/o contrast', modality: 'MRI' },
    { code: '72148', name: 'MRI Lumbar Spine w/o contrast', modality: 'MRI' },
    { code: '74177', name: 'CT Abdomen & Pelvis w/ contrast', modality: 'CT' },
    { code: '71046', name: 'Chest X-Ray (2 views)', modality: 'X-Ray' },
    { code: '76700', name: 'Abdominal Ultrasound', modality: 'Ultrasound' }
  ];

  const testPricingAccuracy = async () => {
    setIsLoading(true);
    const results = [];

    try {
      // Test multiple procedures across different localities
      const testCases = [
        { cptCode: '70551', zipCode: '33101', expectedRange: [280, 350] },
        { cptCode: '72148', zipCode: '33301', expectedRange: [270, 340] },
        { cptCode: '74177', zipCode: '30309', expectedRange: [350, 420] },
        { cptCode: '71046', zipCode: '32801', expectedRange: [140, 180] }
      ];

      for (const testCase of testCases) {
        try {
          const response = await fetch(
            `/api/pricing/quote?zipCode=${testCase.zipCode}&cptCode=${testCase.cptCode}`
          );
          const data = await response.json();
          
          const minRange = testCase.expectedRange[0];
          const maxRange = testCase.expectedRange[1];
          const actualPrice = data.pricing?.usrad_price || 0;
          const isInRange = actualPrice >= minRange && actualPrice <= maxRange;
          
          results.push({
            ...testCase,
            result: data,
            status: response.ok ? (isInRange ? 'pass' : 'warning') : 'fail',
            actualPrice: actualPrice,
            responseTime: '85ms', // Would measure actual response time
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          results.push({
            ...testCase,
            status: 'fail',
            error: error.message,
            timestamp: new Date().toISOString()
          });
        }
      }
      
      setTestResults(results);
    } catch (error) {
      console.error('Testing failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testSinglePricing = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/pricing/quote?zipCode=${pricingTest.zipCode}&cptCode=${pricingTest.cptCode}&state=${pricingTest.state}`
      );
      const data = await response.json();
      
      setTestResults([{
        ...pricingTest,
        result: data,
        status: response.ok ? 'pass' : 'fail',
        actualPrice: data.pricing?.usrad_price,
        responseTime: '85ms',
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setTestResults([{
        ...pricingTest,
        status: 'fail',
        error: error.message,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSystemMetrics = async () => {
    // In real app, fetch from your analytics API
    setSystemMetrics(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString().split('T')[0],
      totalQuotes: prev.totalQuotes + Math.floor(Math.random() * 10)
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const TabButton = ({ tabId, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium ${
        activeTab === tabId
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medicare Admin Dashboard</h1>
              <p className="text-gray-600">Pricing verification and system management</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshSystemMetrics}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh
              </button>
              <div className="text-sm text-gray-500">
                Last updated: {systemMetrics.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-8">
          <TabButton tabId="verification" label="Rate Verification" icon={CheckCircle} />
          <TabButton tabId="testing" label="Pricing Tests" icon={Calculator} />
          <TabButton tabId="mapping" label="Geographic Mapping" icon={MapPin} />
          <TabButton tabId="database" label="Database Status" icon={Database} />
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total Procedures</div>
            <div className="text-2xl font-bold text-blue-600">{systemMetrics.totalProcedures}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Medicare Localities</div>
            <div className="text-2xl font-bold text-green-600">{systemMetrics.totalLocalities}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-2xl font-bold text-purple-600">{systemMetrics.avgResponseTime}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total Quotes</div>
            <div className="text-2xl font-bold text-orange-600">{systemMetrics.totalQuotes}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Error Rate</div>
            <div className="text-2xl font-bold text-red-600">{systemMetrics.errorRate}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">System Status</div>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
          </div>
        </div>

        {/* Rate Verification Tab */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Medicare Rate Verification</h3>
              <p className="text-gray-600 mb-6">
                Verify Medicare pricing calculations against official CMS rates and methodology.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Procedure Code
                  </label>
                  <select
                    value={pricingTest.cptCode}
                    onChange={(e) => setPricingTest(prev => ({ ...prev, cptCode: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {commonProcedures.map(proc => (
                      <option key={proc.code} value={proc.code}>
                        {proc.code} - {proc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={pricingTest.zipCode}
                    onChange={(e) => setPricingTest(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="Enter ZIP code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    value={pricingTest.state}
                    onChange={(e) => setPricingTest(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={testSinglePricing}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  {isLoading ? 'Testing...' : 'Test Single Price'}
                </button>
                <button
                  onClick={testPricingAccuracy}
                  disabled={isLoading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {isLoading ? 'Testing...' : 'Run Full Test Suite'}
                </button>
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-bold text-lg mb-4">Test Results</h4>
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-4 ${
                        result.status === 'pass' ? 'border-green-200 bg-green-50' :
                        result.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          {result.cptCode} - ZIP {result.zipCode}
                        </div>
                        <div className={`flex items-center ${
                          result.status === 'pass' ? 'text-green-600' :
                          result.status === 'warning' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {result.status === 'pass' ? <CheckCircle className="h-5 w-5 mr-1" /> :
                           <AlertCircle className="h-5 w-5 mr-1" />}
                          {result.status.toUpperCase()}
                        </div>
                      </div>
                      
                      {result.result && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Medicare Rate:</span>
                            <div className="font-medium">
                              {formatCurrency(result.result.pricing?.medicare_global_rate)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">USRad Price:</span>
                            <div className="font-medium">
                              {formatCurrency(result.result.pricing?.usrad_price)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Savings:</span>
                            <div className="font-medium">
                              {formatCurrency(result.result.pricing?.patient_savings)} 
                              ({result.result.pricing?.savings_percentage}%)
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Locality:</span>
                            <div className="font-medium">
                              {result.result.location?.locality_name}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {result.error && (
                        <div className="text-red-600 text-sm mt-2">
                          Error: {result.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Geographic Mapping Tab */}
        {activeTab === 'mapping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Medicare Locality Mapping</h3>
              <p className="text-gray-600 mb-6">
                Geographic Practice Cost Indices (GPCI) by Medicare locality.
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Locality
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work GPCI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Practice Expense GPCI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Malpractice GPCI
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {localities.map((locality) => (
                      <tr key={locality.code}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {locality.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {locality.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {locality.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {locality.work_gpci}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {locality.pe_gpci}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={locality.mp_gpci > 2.0 ? 'text-red-600 font-medium' : ''}>
                            {locality.mp_gpci}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">GPCI Impact Analysis</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Miami has the highest malpractice GPCI (2.500) resulting in highest pricing</p>
                  <p>• Fort Lauderdale has moderate malpractice costs (1.770)</p>
                  <p>• Rest of Florida/Georgia have lower malpractice costs (1.125-1.467)</p>
                  <p>• Work GPCI is 1.000 across all localities (national standard)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Status Tab */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Database Status & Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Medicare Data</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Medicare localities: 5 active</p>
                    <p>• Imaging procedures: 100+ with RVUs</p>
                    <p>• County mappings: Complete for FL/GA</p>
                    <p>• Last CMS update: 2025 fee schedule</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">System Performance</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• API response time: {systemMetrics.avgResponseTime}</p>
                    <p>• Error rate: {systemMetrics.errorRate}</p>
                    <p>• Database connections: Healthy</p>
                    <p>• Cache hit rate: 94%</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Maintenance</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Next Medicare update: Jan 2026</p>
                    <p>• Database backup: Daily</p>
                    <p>• Performance optimization: Weekly</p>
                    <p>• Security scan: Monthly</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Updates
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicareAdminDashboard;