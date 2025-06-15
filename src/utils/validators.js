// src/utils/validators.js
export function formatEIN(raw) {
    const digits = raw.replace(/\D/g, '');
    return digits.length === 9 ? `${digits.slice(0, 2)}-${digits.slice(2)}` : raw;
  }
  
  export function formatPhone(raw) {
    const digits = raw.replace(/\D/g, '');
    return digits.length === 10
      ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      : raw;
  }
  
  export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  