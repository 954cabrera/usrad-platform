// ===========================================
// src/utils/formatting.js
// Price and data formatting utilities
// ===========================================

class FormattingUtils {
    // ===========================================
    // Price Formatting
    // ===========================================
  
    static formatPrice(price, options = {}) {
      if (typeof price !== 'number' || isNaN(price)) {
        return options.fallback || 'N/A';
      }
  
      const currency = options.currency || 'USD';
      const locale = options.locale || 'en-US';
      const showCents = options.showCents !== false;
  
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: showCents ? 2 : 0,
        maximumFractionDigits: showCents ? 2 : 0
      }).format(price);
    }
  
    static formatSavings(savings, options = {}) {
      if (typeof savings !== 'number' || isNaN(savings)) {
        return options.fallback || '$0';
      }
  
      const formatted = this.formatPrice(savings, { showCents: false, ...options });
      return options.showPrefix !== false ? `Save ${formatted}` : formatted;
    }
  
    static formatPercentage(percentage, options = {}) {
      if (typeof percentage !== 'number' || isNaN(percentage)) {
        return options.fallback || '0%';
      }
  
      const decimals = options.decimals || 0;
      return `${percentage.toFixed(decimals)}%`;
    }
  
    // ===========================================
    // Distance and Location
    // ===========================================
  
    static formatDistance(miles, options = {}) {
      if (typeof miles !== 'number' || isNaN(miles)) {
        return options.fallback || 'N/A';
      }
  
      const unit = options.unit || 'miles';
      const decimals = options.decimals !== undefined ? options.decimals : 1;
      
      if (unit === 'km') {
        const km = miles * 1.60934;
        return `${km.toFixed(decimals)} km`;
      }
      
      return `${miles.toFixed(decimals)} ${miles === 1 ? 'mile' : 'miles'}`;
    }
  
    static formatAddress(address, options = {}) {
      if (!address || typeof address !== 'object') {
        return typeof address === 'string' ? address : 'Address not available';
      }
  
      const parts = [];
      
      if (address.street) parts.push(address.street);
      if (address.city) parts.push(address.city);
      if (address.state) parts.push(address.state);
      if (address.zipCode) parts.push(address.zipCode);
      
      if (options.format === 'short') {
        return `${address.city || ''}, ${address.state || ''}`.replace(/^,\s*|,\s*$/g, '');
      }
      
      return parts.join(', ');
    }
  
    // ===========================================
    // Time and Date Formatting
    // ===========================================
  
    static formatDate(date, options = {}) {
      if (!date) return options.fallback || 'Date not available';
      
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(dateObj.getTime())) {
        return options.fallback || 'Invalid date';
      }
  
      const format = options.format || 'short';
      const locale = options.locale || 'en-US';
      
      const formatOptions = {
        short: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
        time: { hour: 'numeric', minute: '2-digit', hour12: true },
        datetime: { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }
      };
      
      return dateObj.toLocaleDateString(locale, formatOptions[format]);
    }
  
    static formatRelativeTime(date, options = {}) {
      if (!date) return options.fallback || 'Unknown time';
      
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const diffMs = now - dateObj;
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffMinutes < 1) return 'just now';
      if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      
      return this.formatDate(dateObj, { format: 'short' });
    }
  
    // ===========================================
    // Provider Data Formatting
    // ===========================================
  
    static formatProviderName(name, options = {}) {
      if (!name) return options.fallback || 'Provider';
      
      const maxLength = options.maxLength || 50;
      
      if (name.length <= maxLength) {
        return name;
      }
      
      return name.substring(0, maxLength - 3) + '...';
    }
  
    static formatPhone(phone, options = {}) {
      if (!phone) return options.fallback || 'Phone not available';
      
      // Remove all non-digits
      const digits = phone.replace(/\D/g, '');
      
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      
      if (digits.length === 11 && digits[0] === '1') {
        return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
      }
      
      return phone; // Return original if can't format
    }
  
    // ===========================================
    // Data Validation Helpers
    // ===========================================
  
    static isValidPrice(price) {
      return typeof price === 'number' && !isNaN(price) && price >= 0;
    }
  
    static isValidPercentage(percentage) {
      return typeof percentage === 'number' && !isNaN(percentage) && percentage >= 0 && percentage <= 100;
    }
  
    static isValidDistance(distance) {
      return typeof distance === 'number' && !isNaN(distance) && distance >= 0;
    }
  }