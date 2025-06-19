import React from 'react';
import { 
  Shield, Filter, CheckCircle, MapPin, Phone, Calendar, Star, Trash2, ArrowRight
} from 'lucide-react';

const SelectedFacilitiesList = ({
  selectedFacilities,
  filterBy,
  setFilterBy,
  onSetPrimary,
  onRemoveFacility
}) => {
  // Filter facilities based on current filter
  const filteredFacilities = selectedFacilities.filter(facility => {
    if (filterBy === 'all') return true;
    if (filterBy === 'acr') return facility.acrVerified;
    if (filterBy === 'manual') return facility.isManualEntry;
    if (filterBy === 'primary') return facility.isPrimary;
    return true;
  });

  if (selectedFacilities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900">
              Selected Facilities ({selectedFacilities.length})
            </h4>
            <p className="text-gray-600 text-sm">
              These facilities will be included in your PSA as Exhibit B
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Facility Count Badge */}
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-sm">
            {selectedFacilities.length} {selectedFacilities.length === 1 ? 'Facility' : 'Facilities'} Selected
          </div>
          
          {/* Filter Options */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Facilities</option>
              <option value="acr">ACR Accredited</option>
              <option value="manual">Manual Entry</option>
              <option value="primary">Primary Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{selectedFacilities.length}</div>
            <div className="text-sm text-green-600">Total Facilities</div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">
              {selectedFacilities.filter(f => f.acrVerified).length}
            </div>
            <div className="text-sm text-blue-600">ACR Accredited</div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">
              {selectedFacilities.filter(f => f.isManualEntry).length}
            </div>
            <div className="text-sm text-purple-600">Manual Entries</div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">
              {selectedFacilities.filter(f => f.isPrimary).length}
            </div>
            <div className="text-sm text-orange-600">Primary Facility</div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Facilities Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
              facility.isPrimary 
                ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Facility Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h5 className="font-bold text-gray-900 text-lg">{facility.name}</h5>
                  
                  {/* Status Badges */}
                  <div className="ml-2 flex items-center space-x-2">
                    {facility.acrVerified && (
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        ACR
                      </div>
                    )}
                    {facility.isPrimary && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                        PRIMARY
                      </span>
                    )}
                    {facility.isManualEntry && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        MANUAL
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Facility Details */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {facility.address}, {facility.city}, {facility.state} {facility.zip}
                  </p>
                  
                  {facility.phone && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {facility.phone}
                    </p>
                  )}

                  {/* Added Date */}
                  {facility.addedDate && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Added {new Date(facility.addedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                {/* Modalities Tags */}
                {facility.modalities && facility.modalities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {facility.modalities.slice(0, 3).map((modality) => (
                      <span key={modality} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {modality}
                      </span>
                    ))}
                    {facility.modalities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{facility.modalities.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Facility Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                {!facility.isPrimary && selectedFacilities.length > 1 && (
                  <button
                    onClick={() => onSetPrimary(facility.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Set as Primary
                  </button>
                )}
              </div>
              
              <button
                onClick={() => onRemoveFacility(facility.id)}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors flex items-center group"
                title="Remove from agreement"
              >
                <Trash2 className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Agreement Summary */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h5 className="font-semibold text-gray-900 mb-3">Agreement Summary</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Facilities:</span>
            <span className="ml-2 font-semibold text-gray-900">{selectedFacilities.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Primary Facility:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {selectedFacilities.find(f => f.isPrimary)?.name || 'None selected'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Agreement Type:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {selectedFacilities.length === 1 ? 'Single Facility' : 'Multi-Facility'}
            </span>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <ArrowRight className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">
              Next: These {selectedFacilities.length} facilities will be automatically added to your PSA as Exhibit B
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedFacilitiesList;