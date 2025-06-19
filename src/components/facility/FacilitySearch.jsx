import React from 'react';
import { Search, Clock, ArrowRight, CheckCircle, MapPin, Camera, Plus } from 'lucide-react';

const FacilitySearch = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  isSearching,
  selectedFacilities,
  onFacilitySelect,
  onShowManualEntry
}) => {
  const clearSearch = () => setSearchTerm('');

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 shadow-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Search className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Add Your Imaging Facilities</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search our exclusive database of 30,000+ ACR-accredited facilities or add your facilities manually. 
          Our intelligent system will help you build your network efficiently.
        </p>
      </div>

      {/* Enhanced Search Interface */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all shadow-lg hover:shadow-xl"
            placeholder="Search by facility name, city, state (minimum 3 characters)..."
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Status Messages */}
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <div className="mt-2 text-center">
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 inline-block">
              <Clock className="h-4 w-4 inline mr-1" />
              Type {3 - searchTerm.length} more character{3 - searchTerm.length !== 1 ? 's' : ''} to search
            </p>
          </div>
        )}

        {searchTerm.length >= 3 && !isSearching && searchResults.length === 0 && (
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 inline-block">
              <Search className="h-4 w-4 inline mr-1" />
              No facilities found for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Enhanced Search Results */}
        {(searchResults.length > 0 || isSearching) && (
          <div className="absolute z-20 w-full mt-4 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Searching ACR database...</p>
                <p className="text-sm text-gray-500 mt-1">Finding matches for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="p-2">
                {/* Results Header */}
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                  <p className="text-sm font-medium text-gray-700">
                    Found {searchResults.length} facilities matching "{searchTerm}"
                  </p>
                </div>
                
                {/* Results List */}
                {searchResults.map((facility) => (
                  <div
                    key={facility.id}
                    onClick={() => onFacilitySelect(facility)}
                    className="p-4 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0 rounded-xl transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                            {facility.name}
                          </h4>
                          {facility.accredited && (
                            <div className="ml-2 flex items-center">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="ml-1 text-xs text-emerald-600 font-medium">ACR</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mb-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {facility.address}, {facility.city}, {facility.state} {facility.zip}
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center">
                            <Camera className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="text-gray-500">
                              {facility.modalities ? facility.modalities.join(', ') : facility.modality}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        {selectedFacilities.find(f => f.id === facility.id) ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            <span className="text-sm font-medium">Added</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={() => onShowManualEntry(true)}
          className="flex items-center px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Manually
        </button>
      </div>
    </div>
  );
};

export default FacilitySearch;