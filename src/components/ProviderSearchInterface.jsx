import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Phone, Navigation, Filter, DollarSign } from 'lucide-react';

const ProviderSearchInterface = () => {
  const [searchParams, setSearchParams] = useState({
    zipCode: '',
    procedure: '70551',
    radius: 25
  });
  
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [hoveredProvider, setHoveredProvider] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 25.7617, lng: -80.1918 }); // Miami default

  const procedures = {
    '70551': 'MRI Brain without contrast',
    '72148': 'MRI Lumbar Spine without contrast', 
    '74177': 'CT Abdomen and Pelvis with contrast',
    '76700': 'Ultrasound Abdomen',
    '77067': 'Screening Mammography'
  };

  const searchProviders = async () => {
    if (!searchParams.zipCode) {
      alert('Please enter a ZIP code');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/centers/search-with-pricing?state=FL&cptCode=${searchParams.procedure}`);
      const data = await response.json();
      
      if (response.ok) {
        setProviders(data.results || []);
      } else {
        console.error('Search failed:', data.error);
        setProviders([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (miles) => {
    return miles ? `${miles.toFixed(1)} miles` : 'Distance unavailable';
  };

  const ProviderCard = ({ provider, isSelected, isHovered, onSelect, onHover }) => (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      } ${isHovered ? 'shadow-lg transform -translate-y-1' : ''}`}
      onClick={() => onSelect(provider)}
      onMouseEnter={() => onHover(provider)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{provider.location?.city}, {provider.location?.state}</span>
            <span className="mx-2">•</span>
            <span>{formatDistance(provider.location?.distance_miles)}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${provider.pricing?.patient_price}
          </div>
          <div className="text-sm text-gray-500">Medicare + $75</div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">You Save</div>
            <div className="text-xl font-bold text-green-600">
              ${provider.pricing?.patient_savings}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">vs Hospital</div>
            <div className="text-lg text-red-600 line-through">
              ${provider.pricing?.hospital_estimate}
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {provider.pricing?.savings_percentage}% off
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>Available slots: {provider.availability?.available_slots || 0}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Select Provider
        </button>
      </div>
    </div>
  );

  const MapPlaceholder = () => (
    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
      <div className="text-center">
        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
        <p className="text-gray-600 text-sm">
          Provider locations will be displayed here
          <br />
          {providers.length} centers found
        </p>
        {selectedProvider && (
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <div className="font-medium text-sm">{selectedProvider.name}</div>
            <div className="text-xs text-gray-600">{selectedProvider.location?.city}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">USRad</h1>
            <div className="text-sm text-gray-600">
              Showing {providers.length} imaging centers
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={searchParams.zipCode}
                  onChange={(e) => setSearchParams({...searchParams, zipCode: e.target.value})}
                  placeholder="33101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
                <select
                  value={searchParams.procedure}
                  onChange={(e) => setSearchParams({...searchParams, procedure: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(procedures).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
                <select
                  value={searchParams.radius}
                  onChange={(e) => setSearchParams({...searchParams, radius: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={10}>10 miles</option>
                  <option value={25}>25 miles</option>
                  <option value={50}>50 miles</option>
                  <option value={100}>100 miles</option>
                </select>
              </div>

              <div>
                <button
                  onClick={searchProviders}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Lowest Price</option>
                    <option>Closest Distance</option>
                    <option>Highest Savings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Any Price</option>
                    <option>Under $300</option>
                    <option>$300 - $500</option>
                    <option>Over $500</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Any Availability</option>
                    <option>This Week</option>
                    <option>Next Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          
          {/* Provider List */}
          <div className="lg:col-span-2 overflow-y-auto space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching for providers...</p>
              </div>
            ) : providers.length > 0 ? (
              providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedProvider?.id === provider.id}
                  isHovered={hoveredProvider?.id === provider.id}
                  onSelect={setSelectedProvider}
                  onHover={setHoveredProvider}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or expanding your radius.</p>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderSearchInterface;