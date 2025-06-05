import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Download, 
  MapPin, 
  Phone, 
  Clock, 
  Building, 
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Users
} from 'lucide-react';

const FacilityManager = () => {
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Advanced Imaging Center of Davie',
      address: '123 Medical Plaza Dr, Davie, FL 33328',
      phone: '(954) 555-0123',
      isPrimary: true
    }
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [step, setStep] = useState('manage'); // manage, preview, complete

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const addFacility = () => {
    if (formData.name && formData.address && formData.phone) {
      const newFacility = {
        id: Date.now(),
        ...formData,
        isPrimary: facilities.length === 0
      };
      setFacilities([...facilities, newFacility]);
      setFormData({ name: '', address: '', phone: '' });
    }
  };

  const updateFacility = (id, updatedData) => {
    setFacilities(facilities.map(f => 
      f.id === id ? { ...f, ...updatedData } : f
    ));
    setEditingId(null);
  };

  const deleteFacility = (id) => {
    const facilityToDelete = facilities.find(f => f.id === id);
    if (facilityToDelete?.isPrimary && facilities.length > 1) {
      // If deleting primary, make the first remaining facility primary
      const remaining = facilities.filter(f => f.id !== id);
      remaining[0].isPrimary = true;
      setFacilities(remaining);
    } else {
      setFacilities(facilities.filter(f => f.id !== id));
    }
  };

  const setPrimary = (id) => {
    setFacilities(facilities.map(f => ({
      ...f,
      isPrimary: f.id === id
    })));
  };

  const processBulkUpload = () => {
    const lines = csvData.trim().split('\n');
    const newFacilities = lines.map((line, index) => {
      const [name, address, phone] = line.split(',').map(s => s.trim());
      return {
        id: Date.now() + index,
        name: name || `Facility ${index + 1}`,
        address: address || '',
        phone: phone || '',
        isPrimary: false
      };
    }).filter(f => f.name && f.address);

    if (newFacilities.length > 0) {
      setFacilities([...facilities, ...newFacilities]);
      setCsvData('');
      setShowBulkUpload(false);
    }
  };

  const downloadTemplate = () => {
    const template = `Facility Name,Address,Phone
Example Imaging Center,123 Main St City ST 12345,(555) 123-4567
Another Location,456 Oak Ave City ST 12345,(555) 234-5678`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'facility_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateExhibitB = () => {
    const primaryFacility = facilities.find(f => f.isPrimary);
    const allFacilities = facilities.filter(f => !f.isPrimary);
    
    return {
      primaryContact: primaryFacility,
      totalLocations: facilities.length,
      facilitiesList: facilities,
      generatedDate: new Date().toISOString().split('T')[0]
    };
  };

  if (step === 'preview') {
    const exhibitData = generateExhibitB();
    const primaryFacility = exhibitData.primaryContact;
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PSA Exhibit B Preview</h1>
          <p className="text-gray-600">Review how your facilities will appear in the Provider Service Agreement</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">EXHIBIT B: PROVIDER LOCATIONS</h2>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Primary Contact:</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium">{primaryFacility?.name}</p>
              <p className="text-sm text-gray-600">Phone: {primaryFacility?.phone}</p>
              <p className="text-sm text-gray-600">Address: {primaryFacility?.address}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Authorized Facilities:</h3>
            <div className="space-y-2">
              {exhibitData.facilitiesList.map((facility, index) => (
                <div key={facility.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 mr-3 min-w-[30px]">{index + 1}.</span>
                  <div className="flex-1">
                    <span className="font-medium">{facility.name}</span>
                    {facility.isPrimary && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                    <br />
                    <span className="text-sm text-gray-600">{facility.address}</span>
                    <span className="text-sm text-gray-600 ml-4">Phone: {facility.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 text-sm text-gray-600">
            <p><strong>Total Authorized Locations:</strong> {exhibitData.totalLocations}</p>
            <p><strong>Generated:</strong> {exhibitData.generatedDate}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={() => setStep('manage')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Edit
          </button>
          <button 
            onClick={() => setStep('complete')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Approve & Continue to PSA →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Facilities Configured!</h2>
          <p className="text-gray-600 mb-6">
            Your {facilities.length} location{facilities.length !== 1 ? 's' : ''} have been added to your PSA. 
            You can now proceed to review and sign your Provider Service Agreement.
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard/onboarding/psa'}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue to PSA Signing →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Facility Locations Setup</h1>
        <p className="text-gray-600">Add all locations that will be included in your Provider Service Agreement</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{facilities.length}</p>
              <p className="text-blue-700 text-sm">Total Locations</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">1</p>
              <p className="text-green-700 text-sm">Primary Contact</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-purple-900">Ready</p>
              <p className="text-purple-700 text-sm">For PSA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Facility */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Advanced Imaging Center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Medical Dr, City, ST 12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
        <button 
          onClick={addFacility}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </button>
      </div>

      {/* Bulk Upload Option */}
      {facilities.length >= 5 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800">Have many locations?</h4>
              <p className="text-yellow-700 text-sm mt-1">
                Save time by uploading a CSV file with all your facility information.
              </p>
              <div className="mt-3 space-x-3">
                <button 
                  onClick={() => setShowBulkUpload(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                >
                  <Upload className="w-4 h-4 mr-2 inline" />
                  Bulk Upload
                </button>
                <button 
                  onClick={downloadTemplate}
                  className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors text-sm"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Upload Facilities</h3>
              <button 
                onClick={() => setShowBulkUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Paste CSV data with format: Name, Address, Phone (one per line)
            </p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
              placeholder="Facility Name,123 Main St City ST 12345,(555) 123-4567"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button 
                onClick={() => setShowBulkUpload(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={processBulkUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload {csvData.trim().split('\n').length} Locations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facilities List */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Locations</h3>
          <span className="text-sm text-gray-500">{facilities.length} location{facilities.length !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="space-y-3">
          {facilities.map((facility) => (
            <div key={facility.id} className={`p-4 rounded-lg border ${facility.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              {editingId === facility.id ? (
                <EditFacilityForm 
                  facility={facility} 
                  onSave={(data) => updateFacility(facility.id, data)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium text-gray-900">{facility.name}</h4>
                      {facility.isPrimary && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Primary Contact
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      {facility.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {facility.phone}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!facility.isPrimary && (
                      <button 
                        onClick={() => setPrimary(facility.id)}
                        className="px-3 py-1 text-xs border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        Make Primary
                      </button>
                    )}
                    <button 
                      onClick={() => setEditingId(facility.id)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {facilities.length > 1 && (
                      <button 
                        onClick={() => deleteFacility(facility.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setStep('preview')}
          disabled={facilities.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Preview PSA Exhibit B →
        </button>
      </div>
    </div>
  );
};

const EditFacilityForm = ({ facility, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: facility.name,
    address: facility.address,
    phone: facility.phone
  });

  const handleSave = () => {
    if (formData.name && formData.address && formData.phone) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Facility Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Address"
        />
      </div>
      <div>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          <X className="w-4 h-4 mr-1 inline" />
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-1 inline" />
          Save
        </button>
      </div>
    </div>
  );
};

export default FacilityManager;