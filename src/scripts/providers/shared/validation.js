// src/scripts/providers/shared/validation.js - Reusable validation utilities

export class ValidationHelpers {
  static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  static phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  static taxIdRegex = /^\d{2}-\d{7}$/;
  static zipRegex = /^\d{5}$/;

  // Email validation
  static validateEmail(email) {
    return this.emailRegex.test(email);
  }

  // Phone formatting
  static formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    
    if (digits.length <= 3) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  }

  // Tax ID formatting
  static formatTaxId(value) {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 9)}`;
    }
    return digits;
  }

  // ZIP code validation
  static validateZipCode(zip) {
    return this.zipRegex.test(zip);
  }

  // Add error message to input
  static showError(inputElement, message) {
    inputElement.classList.add("error");
    
    // Remove existing error if any
    const existingError = inputElement.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    
    // Add new error message
    const errorMsg = document.createElement("span");
    errorMsg.className = "error-message";
    errorMsg.textContent = message;
    inputElement.parentElement.appendChild(errorMsg);
  }

  // Clear error from input
  static clearError(inputElement) {
    inputElement.classList.remove("error");
    const errorMsg = inputElement.parentElement.querySelector(".error-message");
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  // Attach formatters to inputs
  static attachPhoneFormatter(inputElement) {
    inputElement.addEventListener("input", (e) => {
      e.target.value = this.formatPhoneNumber(e.target.value);
    });
  }

  static attachTaxIdFormatter(inputElement) {
    inputElement.addEventListener("input", (e) => {
      e.target.value = this.formatTaxId(e.target.value);
    });
  }

  // Attach validators
  static attachEmailValidator(inputElement) {
    inputElement.addEventListener("blur", (e) => {
      const email = e.target.value;
      if (email && !this.validateEmail(email)) {
        this.showError(e.target, "Please enter a valid email address");
      }
    });

    inputElement.addEventListener("input", (e) => {
      if (this.validateEmail(e.target.value)) {
        this.clearError(e.target);
      }
    });
  }
}