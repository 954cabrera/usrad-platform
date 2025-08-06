// src/scripts/providers/portal/modules/portalFormHandler.js
import { StorageHelpers } from '../../shared/storage.js';
import { ValidationHelpers } from '../../shared/validation.js';

export class PortalFormHandler {
  constructor(config) {
    this.config = config;
  }

  initialize() {
    const form = document.getElementById("organization-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Validate email before submission
    const emailInput = document.querySelector(`input[name="${this.config.FORM_FIELDS.SIGNER_EMAIL}"]`);
    if (!ValidationHelpers.validateEmail(emailInput.value)) {
      emailInput.focus();
      ValidationHelpers.showError(emailInput, this.config.VALIDATION_MESSAGES.INVALID_EMAIL);
      return;
    }

    const formData = new FormData(e.target);
    const organization = this.collectFormData(formData);

    // Save to localStorage using storage helper
    StorageHelpers.save(StorageHelpers.KEYS.PROVIDER_ORGANIZATION, organization);

    // Update provider signup data
    const signupData = StorageHelpers.load(StorageHelpers.KEYS.PROVIDER_SIGNUP_DATA, {});
    signupData.organizationName = organization.legalName;
    signupData.fullName = organization.signer.fullName;
    StorageHelpers.save(StorageHelpers.KEYS.PROVIDER_SIGNUP_DATA, signupData);

    // Navigate to facilities
    window.location.href = this.config.ROUTES.NEXT_STEP;
  }

  collectFormData(formData) {
    const fields = this.config.FORM_FIELDS;
    
    return {
      role: formData.get(fields.ROLE),
      legalName: formData.get(fields.LEGAL_NAME),
      dba: formData.get(fields.DBA),
      taxId: formData.get(fields.TAX_ID),
      businessType: formData.get(fields.BUSINESS_TYPE),
      yearEstablished: formData.get(fields.YEAR_ESTABLISHED),
      address: {
        street: formData.get(fields.CORP_ADDRESS),
        city: formData.get(fields.CORP_CITY),
        state: formData.get(fields.CORP_STATE),
        zip: formData.get(fields.CORP_ZIP),
      },
      signer: {
        firstName: formData.get(fields.SIGNER_FIRST_NAME),
        lastName: formData.get(fields.SIGNER_LAST_NAME),
        fullName: `${formData.get(fields.SIGNER_FIRST_NAME)} ${formData.get(fields.SIGNER_LAST_NAME)}`,
        title: formData.get(fields.SIGNER_TITLE),
        email: formData.get(fields.SIGNER_EMAIL),
        phone: formData.get(fields.SIGNER_PHONE),
      },
    };
  }
}