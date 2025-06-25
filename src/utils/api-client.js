// ===========================================
// src/utils/api-client.js
// Centralized API calls with error handling and retry logic
// ===========================================

class APIClient {
    constructor() {
      this.baseURL = this.getBaseURL();
      this.defaultHeaders = {
        'Content-Type': 'application/json',
      };
      this.retryAttempts = 3;
      this.retryDelay = 1000;
      this.timeout = 30000; // 30 seconds
    }
  
    getBaseURL() {
      if (typeof window !== 'undefined') {
        return window.location.origin;
      }
      return process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000';
    }
  
    async request(endpoint, options = {}) {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'GET',
        headers: { ...this.defaultHeaders, ...options.headers },
        ...options
      };
  
      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      config.signal = controller.signal;
  
      try {
        const response = await this.executeWithRetry(() => 
          fetch(url, config), this.retryAttempts
        );
  
        clearTimeout(timeoutId);
  
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        return { success: true, data, response };
  
      } catch (error) {
        clearTimeout(timeoutId);
        console.error(`API request failed: ${endpoint}`, error);
        
        return {
          success: false,
          error: error.message,
          isNetworkError: error.name === 'TypeError' || error.name === 'AbortError'
        };
      }
    }
  
    async executeWithRetry(operation, maxAttempts) {
      let lastError;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await operation();
        } catch (error) {
          lastError = error;
          
          if (attempt === maxAttempts) {
            throw error;
          }
          
          // Only retry on network errors or 5xx status codes
          if (this.shouldRetry(error)) {
            await this.delay(this.retryDelay * attempt);
          } else {
            throw error;
          }
        }
      }
      
      throw lastError;
    }
  
    shouldRetry(error) {
      // Retry on network errors
      if (error.name === 'TypeError' || error.name === 'AbortError') {
        return true;
      }
      
      // Retry on 5xx server errors
      if (error.message.includes('HTTP 5')) {
        return true;
      }
      
      return false;
    }
  
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    // ===========================================
    // Provider Search APIs
    // ===========================================
  
    async searchProviders(params) {
      const queryString = new URLSearchParams(params).toString();
      return await this.request(`/api/centers/search-with-pricing?${queryString}`);
    }
  
    async getProviderPricing(facilityId, cptCode) {
      return await this.request(`/api/centers/${facilityId}/pricing?cptCode=${cptCode}`);
    }
  
    async getProviderRevenue(facilityId) {
      return await this.request(`/api/provider/revenue-analysis?facilityId=${facilityId}`);
    }
  
    // ===========================================
    // Booking APIs
    // ===========================================
  
    async createBooking(bookingData) {
      return await this.request('/api/bookings/create', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
    }
  
    async updateBooking(bookingId, updates) {
      return await this.request(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
    }
  
    async getBookingStatus(bookingId) {
      return await this.request(`/api/bookings/${bookingId}/status`);
    }
  
    // ===========================================
    // Payment APIs
    // ===========================================
  
    async createPaymentIntent(amount, bookingData) {
      return await this.request('/api/payments/create-intent', {
        method: 'POST',
        body: JSON.stringify({ amount, bookingData })
      });
    }
  
    async confirmPayment(paymentIntentId) {
      return await this.request(`/api/payments/${paymentIntentId}/confirm`, {
        method: 'POST'
      });
    }
  }