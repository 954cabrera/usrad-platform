// Phone Formatter Module
// File: /src/scripts/providers/signup/phone-formatter.js

export class PhoneFormatter {
  format(value) {
    // Remove all non-digit characters
    const number = value.replace(/\D/g, '');
    
    // Format based on length
    if (number.length >= 6) {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (number.length >= 3) {
      return number.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    
    return value;
  }

  unformat(value) {
    // Return just the digits
    return value.replace(/\D/g, '');
  }

  isValid(value) {
    const digits = this.unformat(value);
    return digits.length === 10;
  }

  getE164Format(value) {
    const digits = this.unformat(value);
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    return null;
  }
}