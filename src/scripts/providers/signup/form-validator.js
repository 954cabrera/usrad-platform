// Form Validator Module
// File: /src/scripts/providers/signup/form-validator.js

export class FormValidator {
  validateSignupForm(data) {
    const { email, organizationName, phone, password, confirmPassword, terms } = data;

    // Check required fields
    if (!email || !organizationName || !phone || !password || !confirmPassword) {
      return {
        isValid: false,
        error: 'Please fill in all required fields',
        field: 'required'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address',
        field: 'email'
      };
    }

    // Check password match
    if (password !== confirmPassword) {
      return {
        isValid: false,
        error: 'Passwords do not match',
        field: 'password-match'
      };
    }

    // Check password length
    if (password.length < 6) {
      return {
        isValid: false,
        error: 'Password must be at least 6 characters',
        field: 'password-length'
      };
    }

    // Check terms acceptance
    if (!terms) {
      return {
        isValid: false,
        error: 'Please accept the terms to continue',
        field: 'terms'
      };
    }

    // Validate phone format (basic check)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return {
        isValid: false,
        error: 'Please enter a valid 10-digit phone number',
        field: 'phone'
      };
    }

    return {
      isValid: true,
      error: null,
      field: null
    };
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length === 10;
  }
}