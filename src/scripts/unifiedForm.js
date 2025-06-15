import { handleSaveOrgInfo } from '../utils/formHandlers.js';
import { debounce } from '../utils/debounce.js';

console.log("✅ unifiedForm.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save-org-info');
  const { user, supabase } = window.USRadUser || {};

  // 🔁 Debounced Save
  if (saveButton && user && supabase) {
    const debouncedSave = debounce(() => handleSaveOrgInfo(user, supabase), 800);
    saveButton.addEventListener('click', debouncedSave);
  }

  // 🧪 Input: EIN
  const taxField = document.getElementById('tax_id');
  if (taxField) {
    taxField.addEventListener('input', () => {
      let val = taxField.value.replace(/\D/g, '').slice(0, 9);
      if (val.length > 2) val = `${val.slice(0, 2)}-${val.slice(2)}`;
      taxField.value = val;
    });
  }

  // 🧪 Input: Phone
  const phoneField = document.getElementById('organization-phone');
  if (phoneField) {
    phoneField.addEventListener('input', () => {
      let val = phoneField.value.replace(/\D/g, '').slice(0, 10);
      if (val.length > 6) {
        val = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
      } else if (val.length > 3) {
        val = `(${val.slice(0, 3)}) ${val.slice(3)}`;
      } else if (val.length > 0) {
        val = `(${val}`;
      }
      phoneField.value = val;
    });
  }

  // 🧪 Input: Email Validation (on blur)
  const emailField = document.getElementById('organization-email');
  if (emailField) {
    emailField.addEventListener('blur', () => {
      const email = emailField.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid && email.length > 0) {
        emailField.classList.add('border-red-500');
        emailField.title = 'Invalid email address';
      } else {
        emailField.classList.remove('border-red-500');
        emailField.title = '';
      }
    });
  }
});
