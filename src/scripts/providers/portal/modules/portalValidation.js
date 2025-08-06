// src/scripts/providers/portal/modules/portalValidation.js
import { ValidationHelpers } from '../../shared/validation.js';

export class PortalValidation {
  initialize() {
    // Email validation
    const emailInput = document.querySelector('input[name="signerEmail"]');
    if (emailInput) {
      ValidationHelpers.attachEmailValidator(emailInput);
    }

    // Phone formatting
    const phoneInput = document.querySelector('input[name="signerPhone"]');
    if (phoneInput) {
      ValidationHelpers.attachPhoneFormatter(phoneInput);
    }

    // Tax ID formatting
    const taxIdInput = document.querySelector('input[name="taxId"]');
    if (taxIdInput) {
      ValidationHelpers.attachTaxIdFormatter(taxIdInput);
    }
  }
}