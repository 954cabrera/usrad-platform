// useGoogleMaps.jsx
// Custom hook for Google Maps API management

import { useEffect, useState, useCallback } from 'react';

const useGoogleMaps = (apiKey = null) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if Google Maps is already loaded
  const checkGoogleMaps = useCallback(() => {
    return !!(window.google && window.google.maps && window.google.maps.Map);
  }, []);

  // Load Google Maps API
  const loadGoogleMapsAPI = useCallback(() => {
    if (checkGoogleMaps()) {
      setIsLoaded(true);
      return Promise.resolve();
    }

    if (isLoading) {
      return Promise.resolve();
    }

    if (!apiKey) {
      const errorMsg = 'Google Maps API key is required';
      setError(errorMsg);
      console.error('❌', errorMsg);
      return Promise.reject(new Error(errorMsg));
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      // Check if script is already being loaded
      if (window.googleMapsLoading) {
        window.googleMapsCallbacks = window.googleMapsCallbacks || [];
        window.googleMapsCallbacks.push(resolve);
        return;
      }

      window.googleMapsLoading = true;
      window.googleMapsCallbacks = [resolve];

      // Create unique callback name
      const callbackName = 'initGoogleMaps_' + Date.now();

      window[callbackName] = () => {
        // Wait a bit for all libraries to fully load
        setTimeout(() => {
          setIsLoaded(true);
          setIsLoading(false);
          console.log('✅ Google Maps API loaded successfully');
          console.log('🔍 Available APIs:', {
            maps: !!window.google.maps,
            marker: !!(window.google.maps.marker),
            advancedMarker: !!(window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement)
          });
          
          // Call all waiting callbacks
          window.googleMapsCallbacks.forEach(callback => callback());
          window.googleMapsCallbacks = [];
          window.googleMapsLoading = false;
          
          // Cleanup
          delete window[callbackName];
        }, 100);
      };

      // Create and load script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        const errorMsg = 'Failed to load Google Maps API';
        setError(errorMsg);
        setIsLoading(false);
        window.googleMapsLoading = false;
        console.error('❌', errorMsg);
        reject(new Error(errorMsg));
      };

      document.head.appendChild(script);
    });
  }, [apiKey, isLoading, checkGoogleMaps]);

  // Initialize on mount
  useEffect(() => {
    if (checkGoogleMaps()) {
      setIsLoaded(true);
    } else if (apiKey) {
      loadGoogleMapsAPI().catch(console.error);
    }
  }, [apiKey, loadGoogleMapsAPI, checkGoogleMaps]);

  // Helper functions for creating map elements
  const createMap = useCallback((container, options = {}) => {
    if (!checkGoogleMaps()) {
      console.error('❌ Google Maps API not loaded');
      return null;
    }

    const defaultOptions = {
      zoom: 10,
      center: { lat: 26.1224, lng: -80.1373 }, // Default to South Florida
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      ...options
    };

    try {
      const map = new window.google.maps.Map(container, defaultOptions);
      console.log('✅ Google Map created successfully');
      return map;
    } catch (error) {
      console.error('❌ Error creating map:', error);
      return null;
    }
  }, [checkGoogleMaps]);

  const createMarker = useCallback((options = {}) => {
    if (!checkGoogleMaps()) {
      console.error('❌ Google Maps API not loaded');
      return null;
    }

    try {
      // For now, use legacy markers to avoid Map ID requirements
      // AdvancedMarkerElement requires a Map ID configured in Google Cloud Console
      console.log('📍 Using legacy Marker (more compatible)');
      const marker = new window.google.maps.Marker(options);
      return marker;
    } catch (error) {
      console.error('❌ Error creating marker:', error);
      return null;
    }
  }, [checkGoogleMaps]);

  const createInfoWindow = useCallback((options = {}) => {
    if (!checkGoogleMaps()) {
      console.error('❌ Google Maps API not loaded');
      return null;
    }

    try {
      const infoWindow = new window.google.maps.InfoWindow(options);
      return infoWindow;
    } catch (error) {
      console.error('❌ Error creating info window:', error);
      return null;
    }
  }, [checkGoogleMaps]);

  const geocodeAddress = useCallback((address) => {
    if (!checkGoogleMaps()) {
      console.error('❌ Google Maps API not loaded');
      return Promise.reject(new Error('Google Maps API not loaded'));
    }

    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }, [checkGoogleMaps]);

  return {
    isLoaded,
    isLoading,
    error,
    loadGoogleMapsAPI,
    createMap,
    createMarker,
    createInfoWindow,
    geocodeAddress,
    checkGoogleMaps
  };
};

export default useGoogleMaps;