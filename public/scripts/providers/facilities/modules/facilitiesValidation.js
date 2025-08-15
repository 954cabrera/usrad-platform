// modules/facilitiesValidation.js - Form validation for facilities
import { ValidationHelpers } from '../../shared/validation.js';

export class FormValidation {
  initialize() {
    // Phone number formatting
    const phoneInputs = document.querySelectorAll(
      'input[name="phone"], input[name="adminPhone"]'
    );
    phoneInputs.forEach((input) => {
      ValidationHelpers.attachPhoneFormatter(input);
    });

    // Email validation
    const emailInput = document.querySelector('input[name="adminEmail"]');
    if (emailInput) {
      ValidationHelpers.attachEmailValidator(emailInput);
    }
  }
}