// ===========================================
// src/scripts/search-engine.js
// Core search and API logic - FIXED to use your Medicare APIs
// ===========================================

class USRadSearchEngine {
    constructor() {
      this.cache = new Map();
      this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
      this.currentResults = [];
      this.currentPage = 1;
      this.pageSize = 20;
      this.totalResults = 0;
      this.searchParams = {};
      this.debounceTimer = null;
      
      // API base URL - automatically detects environment
      this.apiBase = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'http://localhost:3000';
    }
  
    // ===========================================
    // Core Search Functionality - FIXED
    // ===========================================
  
    async searchProviders(params = {}) {
      try {
        console.log("🔍 USRadSearchEngine.searchProviders called with:", params);
        
        // Validate required parameters
        if (!params.zipCode || params.zipCode.trim().length === 0) {
          throw new Error('ZIP code is required');
        }
  
        if (params.zipCode.length !== 5 || !/^\d{5}$/.test(params.zipCode)) {
          throw new Error('Please enter a valid 5-digit ZIP code');
        }
  
        // Update search parameters
        this.searchParams = {
          zipCode: params.zipCode.trim(),
          state: params.state || 'FL',
          procedure: params.procedure || '70551',
          city: params.city || '',
          modality: params.modality || '',
          ...params
        };
  
        // Check cache first
        const cacheKey = this.getCacheKey(this.searchParams);
        const cachedResult = this.getCachedResults(cacheKey);
        
        if (cachedResult) {
          console.log('🚀 Using cached results for:', cacheKey);
          this.currentResults = cachedResult.results;
          this.totalResults = cachedResult.total;
          return cachedResult;
        }
  
        // Show loading state
        this.showLoadingState();
  
        // Build API URL - SAME as your working search-test.astro
        const searchUrl = this.buildSearchUrl(this.searchParams);
        console.log('🔍 Calling Medicare API:', searchUrl);
  
        const searchStartTime = Date.now();
  
        // Make API request - EXACTLY like your working version
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('✅ Medicare API response:', data);
  
        // Calculate search time
        const searchTime = ((Date.now() - searchStartTime) / 1000).toFixed(2);
  
        // Process and cache results - SAME format as your working version
        const processedResults = this.processSearchResults(data, searchTime);
        this.setCachedResults(cacheKey, processedResults);
        
        this.currentResults = processedResults.results;
        this.totalResults = processedResults.total;
        
        return processedResults;
  
      } catch (error) {
        console.error('❌ Search error:', error);
        this.handleSearchError(error);
        throw error;
      }
    }
  
    // ===========================================
    // API URL Building - EXACT same as search-test.astro
    // ===========================================
  
    buildSearchUrl(params) {
      // Build URL exactly like your working search-test.astro
      const url = new URL(`${this.apiBase}/api/centers/search-with-pricing`);
      
      // Add search parameters - SAME as working version
      if (params.state) url.searchParams.set('state', params.state);
      if (params.procedure) url.searchParams.set('cptCode', params.procedure);
      if (params.zipCode) url.searchParams.set('zipCode', params.zipCode);
      if (params.city) url.searchParams.set('city', params.city);
      if (params.modality) url.searchParams.set('modality', params.modality);
  
      return url.toString();
    }
  
    // ===========================================
    // Response Processing - SAME format as working version
    // ===========================================
  
    processSearchResults(apiResponse, searchTime) {
      console.log('📊 Processing API response:', apiResponse);
      
      const results = apiResponse.results || [];
      
      // Normalize data to match your working search-test.astro format
      const normalizedResults = results.map(this.normalizeProviderData);
      
      return {
        results: normalizedResults,
        total: results.length,
        searchCriteria: apiResponse.search_criteria || {},
        timestamp: apiResponse.timestamp || new Date().toISOString(),
        searchTime: parseFloat(searchTime),
        averageSavings: this.calculateAverageSavings(normalizedResults),
        priceRange: this.calculatePriceRange(normalizedResults)
      };
    }
  
    // ===========================================
    // Data Normalization - Match your working format
    // ===========================================
  
    normalizeProviderData(provider) {
      // Normalize to match the exact format your working search-test.astro expects
      return {
        id: provider.id || provider.center_id,
        facility_name: provider.name || provider.facility_name,
        address: provider.address || `${provider.city || ''}, ${provider.state || ''}`,
        city: provider.city || provider.location?.city || '',
        state: provider.state || provider.location?.state || '',
        zip_code: provider.zip_code || '',
        phone: provider.phone || '',
        distance_miles: parseFloat(provider.distance_miles || provider.location?.distance_miles || 0),
        coordinates: {
          lat: parseFloat(provider.latitude || provider.coordinates?.lat || 0),
          lng: parseFloat(provider.longitude || provider.coordinates?.lng || 0)
        },
        // Pricing - EXACT same structure as your working version
        pricing: {
          medicare_rate: parseFloat(provider.medicare_rate || provider.pricing?.medicare_rate || 0),
          patient_price: parseFloat(provider.patient_price || provider.pricing?.patient_price || 0),
          hospital_estimate: parseFloat(provider.hospital_estimate || provider.pricing?.hospital_estimate || 0),
          patient_savings: parseFloat(provider.patient_savings || provider.pricing?.patient_savings || 0),
          savings_percentage: parseFloat(provider.savings_percentage || provider.pricing?.savings_percentage || 0)
        },
        availability: {
          available_slots: parseInt(provider.available_slots || provider.availability?.available_slots || 0),
          modality: provider.modality || provider.availability?.modality || '',
          next_available: provider.next_available || provider.availability?.next_available || null
        },
        features: provider.features || [],
        rating: provider.rating || 0,
        reviews_count: provider.reviews_count || 0
      };
    }
  
    // ===========================================
    // Debounced Search for Real-time Experience
    // ===========================================
  
    debouncedSearch(params, delay = 300) {
      clearTimeout(this.debounceTimer);
      
      this.debounceTimer = setTimeout(() => {
        this.searchProviders(params);
      }, delay);
    }
  
    // ===========================================
    // Pagination Support
    // ===========================================
  
    getPage(pageNumber, pageSize = 20) {
      this.currentPage = pageNumber;
      this.pageSize = pageSize;
      
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      
      return {
        results: this.currentResults.slice(startIndex, endIndex),
        currentPage: pageNumber,
        pageSize: pageSize,
        totalPages: Math.ceil(this.totalResults / pageSize),
        totalResults: this.totalResults,
        hasNextPage: endIndex < this.totalResults,
        hasPrevPage: pageNumber > 1
      };
    }
  
    nextPage() {
      if (this.hasNextPage()) {
        return this.getPage(this.currentPage + 1, this.pageSize);
      }
      return null;
    }
  
    prevPage() {
      if (this.hasPrevPage()) {
        return this.getPage(this.currentPage - 1, this.pageSize);
      }
      return null;
    }
  
    hasNextPage() {
      return (this.currentPage * this.pageSize) < this.totalResults;
    }
  
    hasPrevPage() {
      return this.currentPage > 1;
    }
  
    // ===========================================
    // Filtering and Sorting - SAME as working version
    // ===========================================
  
    applyFilters(filters = {}) {
      let filteredResults = [...this.currentResults];
  
      // Price range filter
      if (filters.maxPrice) {
        filteredResults = filteredResults.filter(
          provider => provider.pricing.patient_price <= filters.maxPrice
        );
      }
  
      if (filters.minPrice) {
        filteredResults = filteredResults.filter(
          provider => provider.pricing.patient_price >= filters.minPrice
        );
      }
  
      // Distance filter
      if (filters.maxDistance) {
        filteredResults = filteredResults.filter(
          provider => provider.distance_miles <= filters.maxDistance
        );
      }
  
      // Availability filter
      if (filters.availableToday) {
        filteredResults = filteredResults.filter(
          provider => provider.availability.available_slots > 0
        );
      }
  
      // Modality filter
      if (filters.modality) {
        filteredResults = filteredResults.filter(
          provider => provider.availability.modality === filters.modality
        );
      }
  
      return filteredResults;
    }
  
    sortResults(sortBy = 'distance') {
      const sortFunctions = {
        distance: (a, b) => a.distance_miles - b.distance_miles,
        price: (a, b) => a.pricing.patient_price - b.pricing.patient_price,
        'price_low': (a, b) => a.pricing.patient_price - b.pricing.patient_price,
        'price_high': (a, b) => b.pricing.patient_price - a.pricing.patient_price,
        savings: (a, b) => b.pricing.savings_percentage - a.pricing.savings_percentage,
        'savings_high': (a, b) => b.pricing.patient_savings - a.pricing.patient_savings,
        name: (a, b) => a.facility_name.localeCompare(b.facility_name),
        availability: (a, b) => b.availability.available_slots - a.availability.available_slots
      };
  
      if (sortFunctions[sortBy]) {
        this.currentResults.sort(sortFunctions[sortBy]);
      }
  
      return this.currentResults;
    }
  
    // ===========================================
    // Cache Management
    // ===========================================
  
    getCacheKey(params) {
      // Create a consistent cache key from search parameters
      const keyParts = [
        params.state || 'FL',
        params.zipCode || '',
        params.procedure || '70551',
        params.city || '',
        params.modality || ''
      ];
      return keyParts.join('|');
    }
  
    getCachedResults(key) {
      const cached = this.cache.get(key);
      
      if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
        return cached.data;
      }
      
      // Clean expired cache
      if (cached) {
        this.cache.delete(key);
      }
      
      return null;
    }
  
    setCachedResults(key, data) {
      this.cache.set(key, {
        data: data,
        timestamp: Date.now()
      });
  
      // Limit cache size to prevent memory issues
      if (this.cache.size > 50) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
    }
  
    clearCache() {
      this.cache.clear();
    }
  
    // ===========================================
    // Utility Functions
    // ===========================================
  
    calculateAverageSavings(results) {
      if (!results.length) return 0;
      
      const totalSavings = results.reduce((sum, provider) => 
        sum + (provider.pricing.savings_percentage || 0), 0
      );
      
      return Math.round(totalSavings / results.length);
    }
  
    calculatePriceRange(results) {
      if (!results.length) return { min: 0, max: 0 };
      
      const prices = results.map(p => p.pricing.patient_price || 0);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    }
  
    showLoadingState() {
      const loadingElement = document.getElementById('loadingState');
      const resultsElement = document.getElementById('resultsContainer');
      
      if (loadingElement) loadingElement.classList.remove('hidden');
      if (resultsElement) resultsElement.classList.add('hidden');
    }
  
    hideLoadingState() {
      const loadingElement = document.getElementById('loadingState');
      if (loadingElement) loadingElement.classList.add('hidden');
    }
  
    handleSearchError(error) {
      console.error('Search error:', error);
      this.hideLoadingState();
      
      // Show user-friendly error message
      this.showErrorMessage(
        error.message || 'Search temporarily unavailable. Please try again in a moment.'
      );
    }
  
    showErrorMessage(message) {
      // Create or update error display
      let errorDiv = document.getElementById('searchError');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'searchError';
        errorDiv.className = 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6';
        
        const container = document.getElementById('resultsContainer') || document.body;
        container.appendChild(errorDiv);
      }
      
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <div class="text-red-500 mr-3">⚠️</div>
          <div class="text-red-800">${message}</div>
        </div>
      `;
      
      errorDiv.classList.remove('hidden');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorDiv.classList.add('hidden');
      }, 5000);
    }
  
    // ===========================================
    // Public API for Components
    // ===========================================
  
    async search(params) {
      return await this.searchProviders(params);
    }
  
    getResults() {
      return this.currentResults;
    }
  
    getCurrentPage() {
      return this.getPage(this.currentPage, this.pageSize);
    }
  
    filter(filters) {
      return this.applyFilters(filters);
    }
  
    sort(sortBy) {
      return this.sortResults(sortBy);
    }
  
    reset() {
      this.currentResults = [];
      this.currentPage = 1;
      this.totalResults = 0;
      this.searchParams = {};
      this.clearCache();
    }
  }
  
  // Export for use in components
  export default USRadSearchEngine;
  
  // Also make available globally for Astro components
  if (typeof window !== 'undefined') {
    window.USRadSearchEngine = USRadSearchEngine;
  }