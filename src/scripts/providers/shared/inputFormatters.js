// src/scripts/providers/shared/inputFormatters.js
// Input formatting and validation utilities

export class InputFormatters {
  /**
   * Format phone number as user types
   * Formats: (555) 555-5555
   */
  static formatPhoneNumber(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.substring(0, 10);
    
    // Format based on length
    if (limited.length === 0) {
      return '';
    } else if (limited.length <= 3) {
      return `(${limited}`;
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6, 10)}`;
    }
  }

  /**
   * Format Tax ID (EIN) as user types
   * Format: 12-3456789
   */
  static formatTaxId(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 9 digits
    const limited = cleaned.substring(0, 9);
    
    // Format based on length
    if (limited.length === 0) {
      return '';
    } else if (limited.length <= 2) {
      return limited;
    } else {
      return `${limited.slice(0, 2)}-${limited.slice(2, 9)}`;
    }
  }

  /**
   * Format SSN as user types (if needed)
   * Format: 123-45-6789
   */
  static formatSSN(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 9 digits
    const limited = cleaned.substring(0, 9);
    
    // Format based on length
    if (limited.length === 0) {
      return '';
    } else if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 5) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 5)}-${limited.slice(5, 9)}`;
    }
  }

  /**
   * Format ZIP code as user types
   * Formats: 12345 or 12345-6789
   */
  static formatZipCode(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 9 digits (5 + 4 for ZIP+4)
    const limited = cleaned.substring(0, 9);
    
    // Format based on length
    if (limited.length === 0) {
      return '';
    } else if (limited.length <= 5) {
      return limited;
    } else {
      return `${limited.slice(0, 5)}-${limited.slice(5, 9)}`;
    }
  }

  /**
   * Validate phone number (checks for 10 digits)
   */
  static isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  }

  /**
   * Validate Tax ID (checks for 9 digits)
   */
  static isValidTaxId(taxId) {
    const cleaned = taxId.replace(/\D/g, '');
    return cleaned.length === 9;
  }

  /**
   * Validate ZIP code (5 or 9 digits)
   */
  static isValidZip(zip) {
    const cleaned = zip.replace(/\D/g, '');
    return cleaned.length === 5 || cleaned.length === 9;
  }

  /**
   * Format year (4 digits only)
   * Format: 2024
   */
  static formatYear(input) {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 4 digits
    const limited = cleaned.substring(0, 4);
    
    return limited;
  }

  /**
   * Validate year (reasonable business year)
   */
  static isValidYear(year) {
    const cleaned = year.replace(/\D/g, '');
    const yearNum = parseInt(cleaned);
    const currentYear = new Date().getFullYear();
    
    // Must be 4 digits, between 1800 and current year
    return cleaned.length === 4 && yearNum >= 1800 && yearNum <= currentYear;
  }

  /**
   * Validate email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Format email (lowercase, trim whitespace)
   */
  static formatEmail(input) {
    return input.toLowerCase().trim();
  }

  /**
   * Attach formatters to form inputs
   */
  static attachToForm(formId = 'organization-form') {
    const form = document.getElementById(formId);
    if (!form) return;

    // Phone number fields
    const phoneFields = form.querySelectorAll('input[type="tel"], input[name*="phone"], input[name*="Phone"]');
    phoneFields.forEach(field => {
      this.attachPhoneFormatter(field);
    });

    // Tax ID fields
    const taxFields = form.querySelectorAll('input[name*="tax"], input[name*="Tax"], input[name="taxId"], input[name="ein"]');
    taxFields.forEach(field => {
      this.attachTaxIdFormatter(field);
    });

    // ZIP code fields
    const zipFields = form.querySelectorAll('input[name*="zip"], input[name*="Zip"], input[name*="postal"]');
    zipFields.forEach(field => {
      this.attachZipFormatter(field);
    });

    // Year fields
    const yearFields = form.querySelectorAll('input[name*="year"], input[name*="Year"], input[name*="established"]');
    yearFields.forEach(field => {
      this.attachYearFormatter(field);
    });

    // Email fields
    const emailFields = form.querySelectorAll('input[type="email"], input[name*="email"], input[name*="Email"]');
    emailFields.forEach(field => {
      this.attachEmailValidator(field);
    });
  }

  /**
   * Attach phone formatter to a specific input
   */
  static attachPhoneFormatter(input) {
    if (!input) return;

    // Set placeholder
    input.placeholder = '(555) 555-5555';
    
    // Set max length to account for formatting
    input.maxLength = 14; // (555) 555-5555

    // Format on input
    input.addEventListener('input', (e) => {
      const formatted = this.formatPhoneNumber(e.target.value);
      e.target.value = formatted;
      
      // Add validation styling
      if (e.target.value && !this.isValidPhone(e.target.value)) {
        e.target.style.borderColor = '#fbbf24'; // Warning yellow
      } else if (e.target.value && this.isValidPhone(e.target.value)) {
        e.target.style.borderColor = '#10b981'; // Success green
      } else {
        e.target.style.borderColor = ''; // Default
      }
    });

    // Prevent non-numeric input
    input.addEventListener('keypress', (e) => {
      const char = String.fromCharCode(e.which);
      if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 46) {
        e.preventDefault();
      }
    });

    // Format on paste
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      e.target.value = this.formatPhoneNumber(pasted);
    });
  }

  /**
   * Attach Tax ID formatter to a specific input
   */
  static attachTaxIdFormatter(input) {
    if (!input) return;

    // Set placeholder
    input.placeholder = '12-3456789';
    
    // Set max length
    input.maxLength = 10; // 12-3456789

    // Format on input
    input.addEventListener('input', (e) => {
      const formatted = this.formatTaxId(e.target.value);
      e.target.value = formatted;
      
      // Add validation styling
      if (e.target.value && !this.isValidTaxId(e.target.value)) {
        e.target.style.borderColor = '#fbbf24'; // Warning yellow
      } else if (e.target.value && this.isValidTaxId(e.target.value)) {
        e.target.style.borderColor = '#10b981'; // Success green
      } else {
        e.target.style.borderColor = ''; // Default
      }
    });

    // Prevent non-numeric input
    input.addEventListener('keypress', (e) => {
      const char = String.fromCharCode(e.which);
      if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 46) {
        e.preventDefault();
      }
    });

    // Format on paste
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      e.target.value = this.formatTaxId(pasted);
    });
  }

  /**
   * Attach Year formatter to a specific input
   */
  static attachYearFormatter(input) {
    if (!input) return;

    // Set placeholder
    const currentYear = new Date().getFullYear();
    input.placeholder = currentYear.toString();
    
    // Set max length
    input.maxLength = 4;
    
    // Set input type to number if not already
    input.type = 'text'; // Use text to control formatting better
    input.inputMode = 'numeric'; // Mobile numeric keyboard
    input.pattern = '[0-9]{4}'; // HTML5 validation

    // Format on input
    input.addEventListener('input', (e) => {
      const formatted = this.formatYear(e.target.value);
      e.target.value = formatted;
      
      // Validation styling
      if (e.target.value && !this.isValidYear(e.target.value)) {
        e.target.style.borderColor = '#fbbf24'; // Warning yellow
        
        // Show helpful message if year is in future
        const yearNum = parseInt(e.target.value);
        if (yearNum > currentYear && e.target.value.length === 4) {
          this.showValidationMessage(e.target, `Year cannot be later than ${currentYear}`, 'error');
        } else if (yearNum < 1800 && e.target.value.length === 4) {
          this.showValidationMessage(e.target, 'Please enter a valid year', 'error');
        } else {
          this.showValidationMessage(e.target, '', 'error');
        }
      } else if (e.target.value && this.isValidYear(e.target.value)) {
        e.target.style.borderColor = '#10b981'; // Success green
        this.showValidationMessage(e.target, '', 'error');
      } else {
        e.target.style.borderColor = ''; // Default
        this.showValidationMessage(e.target, '', 'error');
      }
    });

    // Prevent non-numeric input
    input.addEventListener('keypress', (e) => {
      const char = String.fromCharCode(e.which);
      if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 46) {
        e.preventDefault();
      }
    });

    // Validate on blur
    input.addEventListener('blur', (e) => {
      if (e.target.value && !this.isValidYear(e.target.value)) {
        this.showValidationMessage(e.target, 'Please enter a valid 4-digit year', 'error');
        e.target.style.borderColor = '#ef4444'; // Error red
      }
    });
  }

  /**
   * Attach Email validator to a specific input
   */
  static attachEmailValidator(input) {
    if (!input) return;

    // Set attributes
    input.type = 'email';
    input.placeholder = 'email@example.com';
    input.autocomplete = 'email';
    input.spellcheck = false;
    input.autocapitalize = 'off';

    // Real-time validation
    input.addEventListener('input', (e) => {
      const value = e.target.value;
      
      // Don't validate while typing until @ is entered
      if (value && value.includes('@')) {
        if (!this.isValidEmail(value)) {
          e.target.style.borderColor = '#fbbf24'; // Warning yellow
        } else {
          e.target.style.borderColor = '#10b981'; // Success green
        }
      } else if (value) {
        e.target.style.borderColor = ''; // Default while typing
      } else {
        e.target.style.borderColor = ''; // Default when empty
      }
    });

    // Format on blur (lowercase, trim)
    input.addEventListener('blur', (e) => {
      if (e.target.value) {
        e.target.value = this.formatEmail(e.target.value);
        
        // Final validation
        if (!this.isValidEmail(e.target.value)) {
          this.showValidationMessage(e.target, 'Please enter a valid email address', 'error');
          e.target.style.borderColor = '#ef4444'; // Error red
        } else {
          this.showValidationMessage(e.target, '', 'error');
          e.target.style.borderColor = '#10b981'; // Success green
        }
      }
    });

    // Clear validation message on focus
    input.addEventListener('focus', (e) => {
      this.showValidationMessage(e.target, '', 'error');
    });

    // Prevent spaces in email
    input.addEventListener('keypress', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    });

    // Handle paste to clean up email
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      e.target.value = this.formatEmail(pasted);
    });
  }

  /**
   * Get clean digits only (for storing in database)
   */
  static getDigitsOnly(input) {
    return input.replace(/\D/g, '');
  }

// Make it available globally for non-module scripts
window.InputFormatters = InputFormatters;