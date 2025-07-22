// ProviderSearchSection.jsx
// Enhanced Search Component using Google Maps Hook

import { useEffect, useState, useRef } from 'react';
import useGoogleMaps from './useGoogleMaps';

const ProviderSearchSection = ({
  title = "Find Your Imaging Center. Save Hundreds.",
  subtitle = "Search our network of trusted, board-certified imaging centers. Transparent pricing, proven quality, guaranteed results.",
  badgeText = "Search powered by 10 years of imaging center partnerships",
  showHelpSection = true,
  googleMapsApiKey = null,
  // New props for auto-search
  initialZipCode = '',
  initialCptCode = '70551',
  initialState = 'FL',
  autoSearch = false
}) => {
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);
  const autoSearchTriggered = useRef(false);
  
  const { 
    isLoaded: mapsLoaded, 
    isLoading: mapsLoading, 
    error: mapsError,
    createMap, 
    createMarker, 
    createInfoWindow, 
    geocodeAddress 
  } = useGoogleMaps(googleMapsApiKey);

  const [searchResults, setSearchResults] = useState([]);
  const [allProviders, setAllProviders] = useState([]);
  const [autoSearching, setAutoSearching] = useState(false);

  // Debug effect to track map loading state
  useEffect(() => {
    console.log('🔍 Map loading state:', {
      mapsLoaded,
      mapsLoading,
      mapsError,
      hasMapRef: !!mapRef.current,
      hasMapInstance: !!mapInstanceRef.current,
      googleMapsApiKey: googleMapsApiKey ? 'Present' : 'Missing',
      hasGoogle: !!window.google,
      hasMaps: !!(window.google && window.google.maps),
      hasMarkerLib: !!(window.google && window.google.maps && window.google.maps.marker)
    });
  }, [mapsLoaded, mapsLoading, mapsError, googleMapsApiKey]);

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (mapsLoaded && mapRef.current && !mapInstanceRef.current) {
      console.log('🗺️ Initializing Google Map...');
      const mapOptions = {
        zoom: 10,
        center: { lat: 26.1224, lng: -80.1373 }, // South Florida default
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };
      
      mapInstanceRef.current = createMap(mapRef.current, mapOptions);
      
      if (mapInstanceRef.current) {
        console.log('✅ Map initialized successfully');
        // Hide map initially
        mapRef.current.style.display = 'none';
      } else {
        console.error('❌ Failed to initialize map');
      }
    }
  }, [mapsLoaded, createMap]);

  // Auto-search effect
  useEffect(() => {
    if (
      autoSearch &&
      initialZipCode &&
      !autoSearchTriggered.current
    ) {
      autoSearchTriggered.current = true;
      
      // Wait for component to mount and form elements to be ready
      setTimeout(() => {
        // Set initial form values
        const zipCodeInput = document.getElementById('zipCode');
        const procedureSelect = document.getElementById('procedure');
        const stateSelect = document.getElementById('state');
        
        if (zipCodeInput) zipCodeInput.value = initialZipCode;
        if (procedureSelect) procedureSelect.value = initialCptCode;
        if (stateSelect) stateSelect.value = initialState;
        
        // Trigger search
        console.log('🚀 Auto-search triggered with:', {
          zipCode: initialZipCode,
          cptCode: initialCptCode,
          state: initialState
        });
        
        setAutoSearching(true);
        searchProviders();
      }, 500); // Small delay to ensure DOM is ready
    }
  }, [autoSearch, initialZipCode, initialCptCode, initialState]);

  // Search providers function
  const searchProviders = async () => {
    const zipCode = document.getElementById('zipCode')?.value.trim() || initialZipCode;
    const procedure = document.getElementById('procedure')?.value || initialCptCode;
    const state = document.getElementById('state')?.value || initialState;

    console.log('🔍 Search params:', { zipCode, procedure, state });

    if (!zipCode || zipCode.length !== 5) {
      showError('Please enter a valid 5-digit ZIP code.');
      setAutoSearching(false);
      return;
    }

    // Show loading state
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const searchButton = document.getElementById('searchButton');

    if (buttonText) buttonText.classList.add('hidden');
    if (loadingSpinner) loadingSpinner.classList.remove('hidden');
    if (searchButton) searchButton.disabled = true;

    hideError();
    hideResults();

    try {
      const startTime = Date.now();
      const apiUrl = `/api/centers/search-with-pricing?state=${state}&cptCode=${procedure}&zipCode=${zipCode}`;
      console.log('🌐 API URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      const endTime = Date.now();
      const searchTime = ((endTime - startTime) / 1000).toFixed(1);

      console.log('📡 API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 API response data:', data);
      
      if (data.results && data.results.length > 0) {
        console.log('✅ Found', data.results.length, 'providers');
        setAllProviders(data.results);
        setSearchResults(data.results);
        
        // Show results
        showResults();
        updateSearchSummary(data.results, zipCode, searchTime);
        renderResults(data.results);
        
        // Add map markers if map is available
        if (mapInstanceRef.current && window.google && window.google.maps) {
          console.log('🗺️ About to add map markers...');
          await addMapMarkers(data.results, zipCode);
        } else {
          console.log('❌ Map not ready:', { 
            hasMapInstance: !!mapInstanceRef.current, 
            hasGoogle: !!window.google,
            hasMaps: !!(window.google && window.google.maps)
          });
        }
        
        // Force show map container for debugging
        if (mapRef.current) {
          console.log('🔧 Force showing map container...');
          mapRef.current.style.display = 'block';
          mapRef.current.style.opacity = '1';
        }
        
        // Scroll to results if auto-searching
        if (autoSearching) {
          setTimeout(() => {
            const resultsElement = document.getElementById('searchResults');
            if (resultsElement) {
              resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
        
      } else {
        console.log('❌ No results found');
        showError(`No imaging centers found for ZIP ${zipCode}. Try a different ZIP code like 33012 (Miami) or contact us for assistance.`);
      }

    } catch (error) {
      console.error('💥 Search error:', error);
      showError('Unable to search providers at this time. Please try again or contact us directly.');
    } finally {
      // Reset button state
      if (buttonText) buttonText.classList.remove('hidden');
      if (loadingSpinner) loadingSpinner.classList.add('hidden');
      if (searchButton) searchButton.disabled = false;
      setAutoSearching(false);
    }
  };

  // Add map markers function
  const addMapMarkers = async (providers, zipCode) => {
    console.log('🗺️ addMapMarkers called with:', providers.length, 'providers');
    
    if (!mapInstanceRef.current || !createMarker || !geocodeAddress) {
      console.log('❌ Map not ready for markers:', {
        hasMapInstance: !!mapInstanceRef.current,
        hasCreateMarker: !!createMarker,
        hasGeocodeAddress: !!geocodeAddress,
        hasGoogle: !!window.google
      });
      return;
    }

    try {
      // Clear existing markers
      clearMapMarkers();
      
      console.log('🗺️ Adding markers for', providers.length, 'providers');
      
      // Add user location marker
      try {
        const userLocation = await geocodeAddress(zipCode);
        userMarkerRef.current = createMarker({
          position: userLocation,
          map: mapInstanceRef.current,
          title: `Your ZIP: ${zipCode}`,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8,%3csvg fill='%23dc2626' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3e%3c/svg%3e",
            scaledSize: new window.google.maps.Size(30, 30)
          }
        });
      } catch (error) {
        console.log('⚠️ Could not geocode user location:', error);
      }
      
      // Add provider markers
      const bounds = new window.google.maps.LatLngBounds();
      const markers = [];
      
      providers.forEach((provider, index) => {
        const coordinates = getProviderCoordinates(provider);
        
        const pricing = provider.pricing || provider;
        const price = pricing.patient_price || pricing.price || 'N/A';
        const savings = pricing.savings || 'N/A';
        
        const marker = createMarker({
          position: coordinates,
          map: mapInstanceRef.current,
          title: provider.name || 'Imaging Center',
          icon: {
            url: "data:image/svg+xml;charset=UTF-8,%3csvg fill='%23059669' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3e%3c/svg%3e",
            scaledSize: new window.google.maps.Size(25, 25)
          }
        });
        
        // Create info window
        const infoWindow = createInfoWindow({
          content: `
            <div class="p-3">
              <h3 class="font-bold text-lg text-gray-900">${provider.name || 'Imaging Center'}</h3>
              <p class="text-gray-600 mb-2">${provider.address || 'Address not available'}</p>
              <div class="space-y-1">
                <p class="font-semibold text-[#cc9933]">Price: $${price}</p>
                ${savings !== 'N/A' ? `<p class="text-green-600">You save: $${savings}</p>` : ''}
              </div>
              <button class="mt-2 bg-[#003087] text-white px-4 py-2 rounded text-sm hover:bg-blue-800">
                Book Appointment
              </button>
            </div>
          `
        });
        
        if (marker) {
          // Use legacy marker event listener
          marker.addListener('click', () => {
            markers.forEach(m => m.infoWindow && m.infoWindow.close());
            infoWindow.open(mapInstanceRef.current, marker);
          });
          
          marker.infoWindow = infoWindow;
          markers.push(marker);
          bounds.extend(coordinates);
        }
      });
      
      markersRef.current = markers;
      
      // Fit map to show all markers
      if (bounds.isEmpty() === false) {
        mapInstanceRef.current.fitBounds(bounds);
        const zoom = mapInstanceRef.current.getZoom();
        if (zoom > 12) {
          mapInstanceRef.current.setZoom(12);
        }
      }
      
      // Show the map
      if (mapRef.current && providers.length > 0) {
        console.log('🎨 Showing map container...');
        mapRef.current.style.display = 'block';
        mapRef.current.style.opacity = '0';
        mapRef.current.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.style.opacity = '1';
            console.log('✅ Map container is now visible');
          }
        }, 50);
        
        // Update map status
        const mapStatus = document.getElementById('mapStatus');
        if (mapStatus) {
          mapStatus.textContent = `${providers.length} centers found`;
        }
      } else {
        console.log('❌ Map container not found or no providers');
      }
      
      console.log('✅ Added', markers.length, 'markers to map');
      
    } catch (error) {
      console.error('❌ Error adding map markers:', error);
    }
  };

  // Clear map markers
  const clearMapMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
  };

  // Get provider coordinates
  const getProviderCoordinates = (provider) => {
    const cityCoordinates = {
      'Miami': { lat: 25.7617, lng: -80.1918 },
      'Fort Lauderdale': { lat: 26.1224, lng: -80.1373 },
      'Tampa': { lat: 27.9506, lng: -82.4572 },
      'Orlando': { lat: 28.5383, lng: -81.3792 },
      'Jacksonville': { lat: 30.3322, lng: -81.6557 },
      'Vero Beach': { lat: 27.6386, lng: -80.3973 },
      'Ormond Beach': { lat: 29.2858, lng: -81.0659 },
      'Hialeah': { lat: 25.8576, lng: -80.2781 },
      'Port Richey': { lat: 28.2697, lng: -82.7193 },
      'Tallahassee': { lat: 30.4518, lng: -84.2807 },
      'Lakeland': { lat: 28.0395, lng: -81.9498 },
      'Atlanta': { lat: 33.749, lng: -84.388 },
      'Gainesville': { lat: 29.6516, lng: -82.3248 },
      'Pensacola': { lat: 30.4213, lng: -87.2169 },
      'Sarasota': { lat: 27.3364, lng: -82.5307 }
    };

    const city = provider.location?.city;
    const coords = cityCoordinates[city];

    if (coords) {
      return {
        lat: coords.lat + (Math.random() - 0.5) * 0.01,
        lng: coords.lng + (Math.random() - 0.5) * 0.01
      };
    }

    return { lat: 26.1224, lng: -80.1373 };
  };

  // Helper functions
  const showResults = () => {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.classList.remove('hidden');
    }
  };

  const hideResults = () => {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.classList.add('hidden');
    }
  };

  const showError = (message) => {
    const errorText = document.getElementById('errorText');
    const errorMessage = document.getElementById('errorMessage');
    if (errorText) errorText.textContent = message;
    if (errorMessage) {
      errorMessage.classList.remove('hidden');
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hideError = () => {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.classList.add('hidden');
    }
  };

  const updateSearchSummary = (providers, zipCode, searchTime) => {
    const avgSavings = providers.length > 0
      ? Math.round(providers.reduce((sum, p) => sum + (p.pricing?.savings_percentage || 0), 0) / providers.length)
      : 0;

    const bestSavings = providers.length > 0
      ? Math.max(...providers.map(p => p.pricing?.patient_savings || 0))
      : 0;

    const summaryText = document.getElementById('summaryText');
    const avgSavingsEl = document.getElementById('avgSavings');
    const totalSavingsEl = document.getElementById('totalSavings');
    const searchTimeEl = document.getElementById('searchTime');

    if (summaryText) summaryText.textContent = `Found ${providers.length} providers for MRI Brain without contrast near ${zipCode} • Searched in ${searchTime}s`;
    if (avgSavingsEl) avgSavingsEl.textContent = `${avgSavings}%`;
    if (totalSavingsEl) totalSavingsEl.textContent = `$${Math.round(bestSavings).toLocaleString()}`;
    if (searchTimeEl) searchTimeEl.textContent = `${searchTime}s`;
  };

  const renderResults = (providers) => {
    const container = document.getElementById('providerResults');
    const title = document.getElementById('resultsTitle');

    if (title) title.textContent = `Found ${providers.length} providers`;
    if (!container) return;

    if (providers.length === 0) {
      container.innerHTML = '<div class="text-center py-12"><p>No providers found</p></div>';
      return;
    }

    // Sort by price (low to high)
    const sortedProviders = [...providers].sort((a, b) => 
      (a.pricing?.patient_price || 0) - (b.pricing?.patient_price || 0)
    );

    container.innerHTML = sortedProviders.map((provider, index) => {
      const pricing = provider.pricing || {};
      const location = provider.location || {};
      
      const price = pricing.patient_price || 0;
      const savings = pricing.patient_savings || 0;
      const hospitalPrice = pricing.hospital_estimate || 0;
      const savingsPercent = pricing.savings_percentage || 0;
      
      const getBorderClass = (idx) => {
        if (idx === 0) return 'border-yellow-400';
        if (idx === 1) return 'border-green-400';
        if (idx === 2) return 'border-blue-400';
        return 'border-gray-200';
      };

      const getBadge = (idx) => {
        if (idx === 0) return '<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">🥇 Best Deal</span>';
        if (idx === 1) return '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">🥈 Great Value</span>';
        if (idx === 2) return '<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">🥉 Good Choice</span>';
        return '';
      };
      
      return `
        <div class="provider-card bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-xl transition-all duration-300 border-l-4 ${getBorderClass(index)}" 
             data-provider-index="${index}"
             onmouseenter="highlightMarker && highlightMarker(${index})" 
             onmouseleave="unhighlightMarker && unhighlightMarker(${index})">
          
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <h3 class="text-xl font-bold text-gray-900 mr-3">${provider.name}</h3>
                ${getBadge(index)}
              </div>
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-sm">${location.city}, ${location.state}</span>
              </div>
              <div class="flex items-center text-green-600 text-sm font-medium mb-2">
                ✅ Available for booking
              </div>
              <div class="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                📍 ${(Math.random() * 30 + 2).toFixed(1)} miles away
              </div>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold text-green-600 mb-1">$${price.toFixed(2)}</div>
              <div class="text-sm text-gray-500">Medicare + $75</div>
              <div class="text-xs text-green-600 font-medium mt-1">${savingsPercent}% OFF Hospital</div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-gray-600 mb-1">You Save</div>
                <div class="text-2xl font-bold text-green-600">$${savings.toFixed(2)}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">vs Hospital</div>
                <div class="text-lg text-red-500 line-through font-semibold">$${hospitalPrice.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-start mb-2">
            <a href="/book?facilityId=${provider.id}&procedure=MRI Brain without contrast&cptCode=70551&price=${price}"
               class="inline-flex items-center gap-2 bg-gradient-to-r from-[#cc9933] to-yellow-400 text-[#003087] font-semibold text-sm px-5 py-2.5 rounded-full shadow hover:scale-105 hover:shadow-xl transition-all duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M17 16l4-4m0 0l-4-4m4 4H3" />
              </svg>
              Book Now & Save
            </a>
          </div>
        </div>
      `;
    }).join('');
  };

  // Setup event listeners on mount
  useEffect(() => {
    const setupEventListeners = () => {
      const searchForm = document.getElementById('searchForm');
      const zipCodeInput = document.getElementById('zipCode');

      if (!searchForm) {
        setTimeout(setupEventListeners, 100);
        return;
      }

      console.log('✅ Search form initialized');

      // ZIP code validation
      zipCodeInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5);
        }
        e.target.value = value;
      });

      // Click handler for the search "form" div
      const searchButton = document.getElementById('searchButton');
      searchButton?.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📝 Search button clicked');
        searchProviders();
      });

      // Global marker highlighting functions
      window.highlightMarker = function(index) {
        if (markersRef.current[index] && window.google) {
          markersRef.current[index].setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            if (markersRef.current[index]) {
              markersRef.current[index].setAnimation(null);
            }
          }, 1500);
        }
      };

      window.unhighlightMarker = function(index) {
        if (markersRef.current[index]) {
          markersRef.current[index].setAnimation(null);
        }
      };
    };

    setupEventListeners();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#fefbf5] to-white py-20" id="search-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-[#cc9933]/10 text-[#cc9933] px-4 py-2 rounded-full text-sm font-semibold">
            {badgeText}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#003087] mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div id="searchForm" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* ZIP Code */}
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-[#003087] mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="Enter ZIP code"
                    required
                    pattern="[0-9]{5}"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
                  />
                </div>

                {/* Procedure */}
                <div>
                  <label htmlFor="procedure" className="block text-sm font-semibold text-[#003087] mb-2">
                    Procedure
                  </label>
                  <select
                    id="procedure"
                    name="procedure"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
                  >
                    <option value="70551">MRI Brain (without contrast)</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-[#003087] mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] focus:border-[#cc9933] transition-colors"
                  >
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  id="searchButton"
                  onClick={() => searchProviders()}
                  className="bg-gradient-to-r from-[#cc9933] to-yellow-400 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-[#b8862e] hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span id="buttonText">Search Providers</span>
                  <span id="loadingSpinner" className="hidden">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#cc9933] to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#003087] mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">Know exact costs upfront - no surprises, no hidden fees</p>
          </div>

          <div className="text-center p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#003087] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#003087] mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">Board-certified radiologists, proven by 400K+ patients</p>
          </div>

          <div className="text-center p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#003087] mb-2">Fast Appointments</h3>
            <p className="text-gray-600">Same-day to 48-hour scheduling at your convenience</p>
          </div>
        </div>

        {/* Results Section */}
        <div id="searchResults" className="hidden mt-16">
          {/* Search Summary */}
          <div id="searchSummary" className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-between flex-wrap">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Search Results</h3>
                <p id="summaryText" className="text-sm text-gray-600"></p>
              </div>
              <div id="networkBadge" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Part of 1,500+ center network
              </div>
            </div>

            {/* Enhanced Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="text-green-500 mr-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600" id="avgSavings">76%</div>
                    <div className="text-sm text-gray-600">Average Savings</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600" id="totalSavings">$1,027</div>
                    <div className="text-sm text-gray-600">Best Deal Found</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="text-purple-500 mr-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600" id="searchTime">1.0s</div>
                    <div className="text-sm text-gray-600">Search Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Provider Results (Left 2/3) */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 id="resultsTitle" className="text-xl font-semibold text-gray-900">Found 0 providers</h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label htmlFor="sortBy" className="text-sm text-gray-600 mr-2">Sort by:</label>
                      <select id="sortBy" className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="savings_high">Savings: High to Low</option>
                        <option value="distance">Distance</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  All prices include technical and professional components
                </p>
              </div>

              {/* Provider Cards Container */}
              <div id="providerResults">
                {/* Results will be inserted here */}
              </div>
            </div>

            {/* Map (Right 1/3) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Provider Locations</h3>
                  <p id="mapStatus" className="text-sm text-gray-600">Ready to search</p>
                </div>
                <div 
                  ref={mapRef}
                  id="map" 
                  className="h-96 bg-gray-100 relative"
                  style={{ minHeight: '384px' }}
                >
                  {/* Map will initialize here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-sm">Loading map...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div id="errorMessage" className="hidden mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-red-800">Search Error</h4>
              <p className="text-red-600" id="errorText">Something went wrong. Please try again.</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        {showHelpSection && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-[#003087] mb-4">Need Help Finding the Right Scan?</h3>
            <p className="text-gray-600 mb-6">
              Our expert team has guided 400,000+ patients through their imaging journey. Call us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-800-123-4567" className="bg-[#003087] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Call (800) 123-4567
              </a>
              <a href="/contact" className="border-2 border-[#cc9933] text-[#cc9933] px-8 py-3 rounded-lg font-semibold hover:bg-[#cc9933] hover:text-white transition-colors">
                Get Expert Guidance
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProviderSearchSection;