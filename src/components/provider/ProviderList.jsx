import React, { useState, useMemo, useEffect } from 'react';

const OptimizedProviderList = ({ initialResults = [] }) => {
  // Debug function to check data structure
  useEffect(() => {
    console.log('🔧 React: OptimizedProviderList mounted with initialResults:', initialResults);
    console.log('🔧 React: initialResults type:', typeof initialResults);
    console.log('🔧 React: initialResults is array?', Array.isArray(initialResults));
    
    // Add global debug function
    window.debugProviderList = () => {
      console.log('🔧 Current providers state:', providers);
      console.log('🔧 Current loading state:', loading);
      console.log('🔧 Current sortBy:', sortBy);
      console.log('🔧 Current priceFilter:', priceFilter);
    };
  }, []);

  const [providers, setProviders] = useState(Array.isArray(initialResults) ? initialResults : []);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('price_low_high');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Listen for search events from main controller
  useEffect(() => {
    const handleProviderUpdate = (event) => {
      console.log('🎯 React: Received provider update event:', event.detail);
      const newProviders = event.detail;
      
      // Ensure we always have an array
      if (Array.isArray(newProviders)) {
        console.log('✅ React: Setting providers array:', newProviders.length);
        setProviders(newProviders);
      } else if (newProviders && Array.isArray(newProviders.results)) {
        console.log('✅ React: Setting providers from results property:', newProviders.results.length);
        setProviders(newProviders.results);
      } else {
        console.log('⚠️ React: No valid providers data, setting empty array');
        setProviders([]);
      }
      setLoading(false);
    };

    const handleSearchStart = () => {
      console.log('🔄 React: Search started, showing loading state');
      setLoading(true);
    };

    window.addEventListener('updateProviderResults', handleProviderUpdate);
    window.addEventListener('searchStarted', handleSearchStart);

    return () => {
      window.removeEventListener('updateProviderResults', handleProviderUpdate);
      window.removeEventListener('searchStarted', handleSearchStart);
    };
  }, []);

  // Optimized provider card - compact, scannable design
  const OptimizedProviderCard = ({ provider, index }) => {
    // Handle different data structures from API
    const pricing = provider.pricing || {
      patient_price: provider.patient_price || 0,
      medicare_rate: provider.medicare_rate || 0,
      hospital_estimate: provider.hospital_estimate || 0,
      patient_savings: provider.patient_savings || 0,
      savings_percentage: provider.savings_percentage || 0
    };
    
    const savings = Math.round(pricing.patient_savings);
    const savingsPercent = Math.round(pricing.savings_percentage);
    
    // USRad signature colors
    const borderColors = [
      'border-l-[#003087]', 'border-l-[#cc9933]', 'border-l-blue-500',
      'border-l-green-500', 'border-l-purple-500', 'border-l-red-500',
      'border-l-yellow-500', 'border-l-pink-500'
    ];

    const badges = [
      { text: 'Best Deal', color: 'bg-[#cc9933] text-white', icon: '⭐' },
      { text: 'Premium', color: 'bg-[#003087] text-white', icon: '💎' },
      { text: 'Popular', color: 'bg-green-500 text-white', icon: '🔥' },
      { text: 'Fastest', color: 'bg-blue-500 text-white', icon: '⚡' },
      { text: 'Great Value', color: 'bg-purple-500 text-white', icon: '💰' },
      { text: 'Top Rated', color: 'bg-red-500 text-white', icon: '⭐' },
      { text: 'Convenient', color: 'bg-yellow-500 text-white', icon: '📍' },
      { text: 'Recommended', color: 'bg-pink-500 text-white', icon: '👍' }
    ];

    const badge = badges[index % badges.length];
    const borderColor = borderColors[index % borderColors.length];
    const distance = (Math.random() * 15 + 2).toFixed(1);

    return (
      <div className={`bg-white rounded-lg border-l-4 ${borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group`}>
        
        {/* Compact Header - 60px height */}
        <div className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
                {provider.facility_name || provider.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <span className="text-blue-500 mr-1">📍</span>
                <span className="truncate">{provider.city}, {provider.state}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-[#003087] font-medium">{distance} mi</span>
              </div>
            </div>
            
            {/* Compact Badge */}
            <div className={`${badge.color} px-2 py-1 rounded-full flex items-center text-xs font-medium whitespace-nowrap ml-2`}>
              <span className="mr-1">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          </div>
        </div>

        {/* Compact Pricing Section - 80px height */}
        <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#003087]">
                ${Math.round(pricing.patient_price)}
              </span>
              <span className="text-sm text-gray-500 ml-1">.{String(pricing.patient_price.toFixed(2)).split('.')[1]}</span>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                Save ${savings}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {savingsPercent}% off hospital
              </div>
            </div>
          </div>

          {/* Compact Price Breakdown */}
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Medicare Rate:</span>
              <span className="font-medium">${Math.round(pricing.medicare_rate)}</span>
            </div>
            <div className="flex justify-between">
              <span>USRad Fee:</span>
              <span className="font-medium text-[#cc9933]">$75</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>vs Hospital:</span>
              <span className="line-through">${Math.round(pricing.hospital_estimate)}</span>
            </div>
          </div>
        </div>

        {/* Compact Features - 30px height */}
        <div className="px-4 pb-2">
          <div className="flex items-center text-xs text-gray-600 space-x-4">
            <div className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              <span>Quick booking</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              <span>Board-certified</span>
            </div>
            {provider.medicare_locality && (
              <div className="flex items-center text-[#003087]">
                <span className="mr-1">📋</span>
                <span>Medicare {provider.medicare_locality.slice(-2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Compact CTA Button - 50px height */}
        <div className="px-4 pb-4">
          <button
            onClick={() => window.selectProvider && window.selectProvider(provider.id || provider.name, index)}
            className="w-full bg-gradient-to-r from-[#cc9933] to-[#e6b84d] text-white py-2.5 rounded-lg font-semibold text-sm hover:from-[#b8862e] hover:to-[#cc9933] transition-all duration-200 hover:scale-105 hover:shadow-md group-hover:shadow-lg"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">💰</span>
              Book Now & Save ${savings}
            </span>
          </button>
        </div>
      </div>
    );
  };

  // Filtering and sorting logic with safety checks
  const filteredAndSortedProviders = useMemo(() => {
    console.log('🔄 React: Processing providers for filtering/sorting:', providers);
    
    // Safety check - ensure providers is always an array
    if (!Array.isArray(providers)) {
      console.log('⚠️ React: providers is not an array, returning empty array');
      return [];
    }

    let filtered = [...providers];
    console.log('✅ React: Starting with', filtered.length, 'providers');

    // Price filtering
    if (priceFilter !== 'all') {
      filtered = filtered.filter(provider => {
        const price = provider.pricing?.patient_price || provider.patient_price || 0;
        switch (priceFilter) {
          case 'under_300': return price < 300;
          case '300_400': return price >= 300 && price <= 400;
          case 'over_400': return price > 400;
          default: return true;
        }
      });
      console.log('🔍 React: After price filtering:', filtered.length, 'providers');
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low_high':
          const priceA = a.pricing?.patient_price || a.patient_price || 0;
          const priceB = b.pricing?.patient_price || b.patient_price || 0;
          return priceA - priceB;
        case 'price_high_low':
          const priceHighA = a.pricing?.patient_price || a.patient_price || 0;
          const priceHighB = b.pricing?.patient_price || b.patient_price || 0;
          return priceHighB - priceHighA;
        case 'savings_high_low':
          const savingsA = a.pricing?.patient_savings || a.patient_savings || 0;
          const savingsB = b.pricing?.patient_savings || b.patient_savings || 0;
          return savingsB - savingsA;
        case 'distance':
          return (Math.random() * 15 + 2) - (Math.random() * 15 + 2); // Random for demo
        default:
          return 0;
      }
    });

    console.log('✅ React: Final filtered and sorted providers:', filtered.length);
    return filtered;
  }, [providers, sortBy, priceFilter]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
          <span className="ml-3 text-[#003087] font-medium">Finding best deals...</span>
        </div>
        {/* Compact Loading Skeletons */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="provider-results-container">
      
      {/* Enhanced Search Summary with Smart Paging */}
      {providers.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#003087] to-[#004ba8] rounded-lg text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{Math.round(providers.reduce((acc, p) => acc + (p.pricing?.savings_percentage || 0), 0) / providers.length)}%</div>
              <div className="text-sm opacity-90">Avg Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold">${Math.round(Math.min(...providers.map(p => p.pricing?.patient_price || 999)))}</div>
              <div className="text-sm opacity-90">Best Price</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{providers.length}</div>
              <div className="text-sm opacity-90">Centers Found</div>
            </div>
          </div>
          
          {/* Smart pagination info */}
          {providers.length > 6 && (
            <div className="mt-3 text-center text-sm opacity-90">
              Showing top 6 matches • <button className="underline hover:text-[#cc9933]" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show fewer' : `View all ${providers.length} centers`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Compact Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Sort:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-[#003087] focus:border-transparent"
          >
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
            <option value="savings_high_low">Highest Savings</option>
            <option value="distance">Distance</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Price:</span>
          <select 
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-[#003087] focus:border-transparent"
          >
            <option value="all">All Prices</option>
            <option value="under_300">Under $300</option>
            <option value="300_400">$300 - $400</option>
            <option value="over_400">Over $400</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {filteredAndSortedProviders.length} of {providers.length} centers
        </div>
      </div>

      {/* Optimized Provider Grid - Premium Single Column */}
      {filteredAndSortedProviders.length > 0 ? (
        <div className="space-y-4">
          <div className="space-y-4">
            {(showAll ? filteredAndSortedProviders : filteredAndSortedProviders.slice(0, 6)).map((provider, index) => (
              <OptimizedProviderCard 
                key={provider.id || provider.name || index} 
                provider={provider} 
                index={index}
              />
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {filteredAndSortedProviders.length > 6 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-[#003087] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004ba8] transition-all duration-200 hover:shadow-md"
              >
                {showAll ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">Show Top 6 Results</span>
                    <span>↑</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">View All {filteredAndSortedProviders.length} Centers</span>
                    <span>↓</span>
                  </span>
                )}
              </button>
              <div className="text-sm text-gray-600 mt-2">
                {showAll ? 'Showing all results' : 'Showing top 6 best matches'}
              </div>
            </div>
          )}
        </div>
      ) : providers.length > 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="text-gray-500 mb-2">No providers match your filters</div>
          <button 
            onClick={() => {setPriceFilter('all'); setSortBy('price_low_high');}}
            className="text-[#003087] hover:text-[#cc9933] font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500">No providers found. Try adjusting your search criteria.</div>
        </div>
      )}

      {/* Removed traditional pagination - replaced with show more/less */}
    </div>
  );
};

export default OptimizedProviderList;