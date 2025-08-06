// portal.js - Extracted and organized JavaScript
import { 
  STORAGE_KEYS, 
  VALIDATION_RULES, 
  PROVIDER_ROUTES 
} from '../../components/Providers/shared/config/providers.config.js';
import { 
  formatProviderData, 
  validateProviderForm, 
  saveProviderData,
  formatPhoneNumber as utilFormatPhone,
  formatTaxId as utilFormatTaxId
} from '../../components/Providers/shared/utils/providerHelpers.js';

// ========== Form Validation Module ==========
const FormValidation = {
  // Email validation
  initEmailValidation() {
    const emailInput = document.querySelector('input[name="signerEmail"]');
    if (emailInput) {
      emailInput.addEventListener("blur", this.validateEmail);
      emailInput.addEventListener("input", this.clearEmailError);
    }
  },

  validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      e.target.classList.add("error");
      if (!e.target.parentElement.querySelector(".error-message")) {
        const errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Please enter a valid email address";
        e.target.parentElement.appendChild(errorMsg);
      }
    } else {
      FormValidation.clearEmailError(e);
    }
  },

  clearEmailError(e) {
    e.target.classList.remove("error");
    const errorMsg = e.target.parentElement.querySelector(".error-message");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
};

// ========== Form Formatting Module ==========
const FormFormatting = {
  // Phone number formatting
  initPhoneFormatting() {
    const phoneInput = document.querySelector('input[name="signerPhone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", this.formatPhoneNumber);
    }
  },

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    e.target.value = value;
  },

  // Tax ID formatting
  initTaxIdFormatting() {
    const taxIdInput = document.querySelector('input[name="taxId"]');
    if (taxIdInput) {
      taxIdInput.addEventListener("input", this.formatTaxId);
    }
  },

  formatTaxId(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "-" + value.slice(2, 9);
    }
    e.target.value = value;
  }
};

// ========== Form Submission Module ==========
const FormSubmission = {
  init() {
    const form = document.getElementById("organization-form");
    if (form) {
      form.addEventListener("submit", this.handleSubmit);
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validate form
    const validation = validateProviderForm(data);
    if (!validation.isValid) {
      // Show first error
      const firstError = Object.keys(validation.errors)[0];
      const input = document.querySelector(`[name="${firstError}"]`);
      if (input) {
        input.focus();
        if (firstError === 'signerEmail') {
          FormValidation.validateEmail({ target: input });
        }
      }
      return;
    }

    // Format and save data
    const formattedData = formatProviderData(data);
    
    // Save to localStorage using storage keys
    saveProviderData(STORAGE_KEYS.PROVIDER_ORGANIZATION, formattedData);
    
    // Update provider signup data
    const signupData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROVIDER_SIGNUP_DATA) || "{}");
    signupData.organizationName = formattedData.organization.legalName;
    signupData.fullName = formattedData.signer.fullName;
    saveProviderData(STORAGE_KEYS.PROVIDER_SIGNUP_DATA, signupData);

    // Navigate to facilities
    window.location.href = PROVIDER_ROUTES.ONBOARDING_FACILITIES;
  }
};

// ========== Initialize Everything ==========
document.addEventListener("DOMContentLoaded", function () {
  FormValidation.initEmailValidation();
  FormFormatting.initPhoneFormatting();
  FormFormatting.initTaxIdFormatting();
  FormSubmission.init();
});