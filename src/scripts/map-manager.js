// ===========================================
// src/scripts/map-manager.js
// Google Maps functionality extraction from monolithic search-test.astro
// Handles map initialization, markers, clustering, and user interactions
// ===========================================

class MapManager {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.map = null;
      this.markers = [];
      this.infoWindows = [];
      this.markerClusterer = null;
      this.currentInfoWindow = null;
      this.mapContainer = null;
      this.isMapLoaded = false;
      this.pendingMarkers = [];
      
      // Default map settings
      this.defaultCenter = { lat: 26.1224, lng: -80.1373 }; // Fort Lauderdale
      this.defaultZoom = 10;
      
      // Marker clustering settings
      this.clusteringEnabled = true;
      this.clusterThreshold = 10;
      
      // Event callbacks
      this.onMarkerClick = null;
      this.onMapClick = null;
      this.onBoundsChanged = null;
    }
  
    // ===========================================
    // Map Initialization
    // ===========================================
  
    async initialize(containerId, options = {}) {
      try {
        this.mapContainer = document.getElementById(containerId);
        
        if (!this.mapContainer) {
          throw new Error(`Map container '${containerId}' not found`);
        }
  
        // Load Google Maps API if not already loaded
        if (!window.google) {
          await this.loadGoogleMapsAPI();
        }
  
        // Wait for Google Maps to be fully ready
        await this.waitForGoogleMaps();
  
        // Initialize the map
        const mapOptions = {
          zoom: options.zoom || this.defaultZoom,
          center: options.center || this.defaultCenter,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: this.getMapStyles(),
          ...options
        };
  
        this.map = new google.maps.Map(this.mapContainer, mapOptions);
        this.isMapLoaded = true;
  
        // Set up event listeners
        this.setupMapEventListeners();
  
        // Process any pending markers
        if (this.pendingMarkers.length > 0) {
          this.addProviderMarkers(this.pendingMarkers);
          this.pendingMarkers = [];
        }
  
        console.log('✅ Map initialized successfully');
        return this.map;
  
      } catch (error) {
        console.error('❌ Map initialization failed:', error);
        this.showMapError(error.message);
        throw error;
      }
    }
  
    async loadGoogleMapsAPI() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }
  
        // Create script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
  
        // Set up global callback
        window.initGoogleMaps = () => {
          delete window.initGoogleMaps;
          resolve();
        };
  
        script.onerror = () => {
          delete window.initGoogleMaps;
          reject(new Error('Failed to load Google Maps API'));
        };
  
        document.head.appendChild(script);
      });
    }
  
    async waitForGoogleMaps() {
      let attempts = 0;
      const maxAttempts = 50;
      
      return new Promise((resolve, reject) => {
        const checkGoogleMaps = () => {
          attempts++;
          
          if (window.google && window.google.maps && window.google.maps.Map) {
            resolve();
          } else if (attempts >= maxAttempts) {
            reject(new Error('Google Maps API failed to load after maximum attempts'));
          } else {
            setTimeout(checkGoogleMaps, 100);
          }
        };
        
        checkGoogleMaps();
      });
    }
  
    // ===========================================
    // Marker Management
    // ===========================================
  
    addProviderMarkers(providers) {
      if (!this.isMapLoaded) {
        this.pendingMarkers = providers;
        return;
      }
  
      // Clear existing markers
      this.clearMarkers();
  
      if (!providers || providers.length === 0) {
        console.log('No providers to add to map');
        return;
      }
  
      // Create markers for each provider
      providers.forEach((provider, index) => {
        this.createProviderMarker(provider, index);
      });
  
      // Set up clustering if enabled and we have enough markers
      if (this.clusteringEnabled && this.markers.length >= this.clusterThreshold) {
        this.setupMarkerClustering();
      }
  
      // Fit map bounds to show all markers
      this.fitBoundsToMarkers();
  
      console.log(`✅ Added ${this.markers.length} provider markers to map`);
    }
  
    createProviderMarker(provider, index) {
      const position = {
        lat: parseFloat(provider.coordinates.lat),
        lng: parseFloat(provider.coordinates.lng)
      };
  
      // Validate coordinates
      if (isNaN(position.lat) || isNaN(position.lng)) {
        console.warn('Invalid coordinates for provider:', provider.facility_name);
        return null;
      }
  
      // Create custom marker icon
      const markerIcon = this.createMarkerIcon(provider, index);
  
      // Create marker
      const marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: provider.facility_name,
        icon: markerIcon,
        animation: google.maps.Animation.DROP,
        providerId: provider.id,
        providerIndex: index
      });
  
      // Create info window content
      const infoWindow = new google.maps.InfoWindow({
        content: this.createInfoWindowContent(provider)
      });
  
      // Add click listener
      marker.addListener('click', () => {
        this.handleMarkerClick(marker, infoWindow, provider, index);
      });
  
      // Store references
      this.markers.push(marker);
      this.infoWindows.push(infoWindow);
  
      return marker;
    }
  
    createMarkerIcon(provider, index) {
      const price = provider.pricing.patient_price;
      const priceDisplay = price ? `$${Math.round(price)}` : 'N/A';
      
      return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="56" height="36" rx="18" ry="18" 
                  fill="white" stroke="#2563eb" stroke-width="2"/>
            <text x="30" y="24" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#2563eb">
              ${priceDisplay}
            </text>
          </svg>
        `),
        scaledSize: new google.maps.Size(60, 40),
        anchor: new google.maps.Point(30, 40)
      };
    }
  
    createInfoWindowContent(provider) {
      const pricing = provider.pricing;
      const savings = pricing.patient_savings || 0;
      const savingsPercent = pricing.savings_percentage || 0;
  
      return `
        <div class="info-window-content" style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
              ${provider.facility_name}
            </h3>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">
              📍 ${provider.address}
            </p>
            ${provider.phone ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">📞 ${provider.phone}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 18px; font-weight: 700; color: #059669;">
                $${Math.round(pricing.patient_price)}
              </span>
              <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                Save $${Math.round(savings)}
              </span>
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              vs $${Math.round(pricing.hospital_estimate)} hospital estimate (${savingsPercent}% savings)
            </div>
          </div>
          
          ${provider.distance_miles ? `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="margin-right: 8px;">🚗</span>
              <span style="font-size: 14px; color: #374151;">
                ${provider.distance_miles.toFixed(1)} miles away
              </span>
            </div>
          ` : ''}
          
          ${provider.availability.available_slots > 0 ? `
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="margin-right: 8px;">📅</span>
              <span style="font-size: 14px; color: #059669; font-weight: 500;">
                ${provider.availability.available_slots} slots available
              </span>
            </div>
          ` : ''}
          
          <button 
            onclick="selectProvider('${provider.id}', ${provider.providerIndex || 0})"
            style="width: 100%; background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;"
          >
            Book Now & Save $${Math.round(savings)}
          </button>
        </div>
      `;
    }
  
    // ===========================================
    // Marker Interactions
    // ===========================================
  
    handleMarkerClick(marker, infoWindow, provider, index) {
      // Close any open info windows
      if (this.currentInfoWindow) {
        this.currentInfoWindow.close();
      }
  
      // Open this info window
      infoWindow.open(this.map, marker);
      this.currentInfoWindow = infoWindow;
  
      // Highlight corresponding provider card
      this.highlightProviderCard(index);
  
      // Call external callback if provided
      if (this.onMarkerClick) {
        this.onMarkerClick(provider, index, marker);
      }
  
      // Analytics tracking
      this.trackMarkerClick(provider);
    }
  
    highlightMarkerByIndex(index) {
      if (index >= 0 && index < this.markers.length) {
        const marker = this.markers[index];
        const infoWindow = this.infoWindows[index];
        
        // Simulate marker click
        google.maps.event.trigger(marker, 'click');
      }
    }
  
    highlightProviderCard(index) {
      // Remove existing highlights
      document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('ring-2', 'ring-blue-500', 'shadow-lg');
      });
  
      // Highlight the selected card
      const targetCard = document.querySelector(`[data-provider-index="${index}"]`);
      if (targetCard) {
        targetCard.classList.add('ring-2', 'ring-blue-500', 'shadow-lg');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  
    // ===========================================
    // Marker Clustering
    // ===========================================
  
    setupMarkerClustering() {
      if (!window.markerClusterer) {
        console.warn('Marker clusterer library not loaded');
        return;
      }
  
      const clusterOptions = {
        gridSize: 50,
        maxZoom: 15,
        styles: [{
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="2"/>
              <text x="20" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                CLUSTER_COUNT
              </text>
            </svg>
          `),
          height: 40,
          width: 40,
          textColor: 'white',
          textSize: 12
        }]
      };
  
      this.markerClusterer = new MarkerClusterer(this.map, this.markers, clusterOptions);
    }
  
    // ===========================================
    // Map Bounds and Centering
    // ===========================================
  
    fitBoundsToMarkers() {
      if (this.markers.length === 0) return;
  
      const bounds = new google.maps.LatLngBounds();
      
      this.markers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
  
      // Add padding to bounds
      this.map.fitBounds(bounds, {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      });
  
      // Ensure minimum zoom level
      google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        if (this.map.getZoom() > 15) {
          this.map.setZoom(15);
        }
      });
    }
  
    centerOnProvider(provider) {
      if (!provider.coordinates) return;
  
      const position = {
        lat: parseFloat(provider.coordinates.lat),
        lng: parseFloat(provider.coordinates.lng)
      };
  
      this.map.setCenter(position);
      this.map.setZoom(14);
    }
  
    centerOnLocation(lat, lng, zoom = 12) {
      this.map.setCenter({ lat, lng });
      this.map.setZoom(zoom);
    }
  
    // ===========================================
    // Cleanup and Management
    // ===========================================
  
    clearMarkers() {
      // Close any open info windows
      if (this.currentInfoWindow) {
        this.currentInfoWindow.close();
        this.currentInfoWindow = null;
      }
  
      // Remove markers from map
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
  
      // Clear marker clusterer
      if (this.markerClusterer) {
        this.markerClusterer.clearMarkers();
        this.markerClusterer = null;
      }
  
      // Clear arrays
      this.markers = [];
      this.infoWindows = [];
    }
  
    showMarkers() {
      this.markers.forEach(marker => {
        marker.setVisible(true);
      });
    }
  
    hideMarkers() {
      this.markers.forEach(marker => {
        marker.setVisible(false);
      });
    }
  
    // ===========================================
    // Event Handlers and Utilities
    // ===========================================
  
    setupMapEventListeners() {
      // Map click handler
      this.map.addListener('click', () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close();
          this.currentInfoWindow = null;
        }
        
        if (this.onMapClick) {
          this.onMapClick();
        }
      });
  
      // Bounds changed handler
      this.map.addListener('bounds_changed', () => {
        if (this.onBoundsChanged) {
          const bounds = this.map.getBounds();
          this.onBoundsChanged(bounds);
        }
      });
    }
  
    getMapStyles() {
      // Clean, professional map styling
      return [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ];
    }
  
    showMapError(message) {
      if (this.mapContainer) {
        this.mapContainer.innerHTML = `
          <div style="display: flex; items-center: justify-center; height: 400px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="text-align: center; color: #6b7280;">
              <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
              <div style="font-weight: 600; margin-bottom: 8px;">Map Unavailable</div>
              <div style="font-size: 14px;">${message}</div>
            </div>
          </div>
        `;
      }
    }
  
    trackMarkerClick(provider) {
      // Analytics tracking for marker interactions
      if (window.gtag) {
        window.gtag('event', 'map_marker_click', {
          provider_id: provider.id,
          provider_name: provider.facility_name,
          price: provider.pricing.patient_price
        });
      }
    }
  
    // ===========================================
    // Public API
    // ===========================================
  
    getMap() {
      return this.map;
    }
  
    getMarkers() {
      return this.markers;
    }
  
    isInitialized() {
      return this.isMapLoaded && this.map !== null;
    }
  
    destroy() {
      this.clearMarkers();
      this.map = null;
      this.isMapLoaded = false;
      this.mapContainer = null;
    }
  
    // Set callback functions
    setOnMarkerClick(callback) {
      this.onMarkerClick = callback;
    }
  
    setOnMapClick(callback) {
      this.onMapClick = callback;
    }
  
    setOnBoundsChanged(callback) {
      this.onBoundsChanged = callback;
    }
  }
  
  // Export for use in components
  export default MapManager;
  
  // Also make available globally for Astro components
  if (typeof window !== 'undefined') {
    window.MapManager = MapManager;
    
    // Global function for info window buttons
    window.selectProvider = function(providerId, providerIndex) {
      if (window.providerSelectionManager) {
        window.providerSelectionManager.selectProvider(providerId, providerIndex);
      }
    };
  }