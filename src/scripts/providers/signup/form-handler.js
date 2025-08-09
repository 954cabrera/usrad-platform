export class SignupFormHandler {
  constructor(auth) {
    this.auth = auth;
    this.STORAGE_KEY = "usrad_provider_signup";
    this.exitIntentHandler = null;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.initializeForm();
  }

  initializeForm() {
    // Wait for form component to be ready
    document.addEventListener('formReady', (e) => {
      this.form = e.detail.form;
      this.formComponent = document.querySelector('signup-form');
      this.setupEventListeners();
      this.loadSavedProgress();
      this.setupFormEnhancements();
    });
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSignup(e));
    
    // Password strength
    const passwordInput = this.form.querySelector('#password');
    passwordInput.addEventListener('input', (e) => {
      this.checkPasswordStrength(e.target.value);
      this.checkPasswordMatch();
    });

    // Password match
    const confirmPasswordInput = this.form.querySelector('#confirmPassword');
    confirmPasswordInput.addEventListener('input', () => this.checkPasswordMatch());
    confirmPasswordInput.addEventListener('blur', () => this.checkPasswordMatch());

    // Phone formatting with better mobile support
    const phoneInput = this.form.querySelector('#phone');
    phoneInput.addEventListener('input', (e) => {
      const formatted = this.formatPhone(e.target.value);
      if (formatted !== e.target.value) {
        const cursorPosition = e.target.selectionStart;
        e.target.value = formatted;
        
        // Maintain cursor position on mobile
        if (this.isMobile) {
          const newPosition = this.calculateNewCursorPosition(e.target.value, cursorPosition);
          e.target.setSelectionRange(newPosition, newPosition);
        }
      }
    });

    // Save progress on input with debouncing
    let saveTimeout;
    this.form.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => this.saveProgress(), 500);
    });

    // Password toggles
    this.setupPasswordToggles();

    // Enter key handling for better mobile experience
    this.setupEnterKeyHandling();

    // Field validation on blur
    this.setupFieldValidation();
  }

  setupFormEnhancements() {
    // Add form-level enhancements
    if (this.isMobile) {
      // Prevent zoom on input focus (iOS)
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }

      // Add touch-friendly classes
      this.form.classList.add('touch-optimized');
    }

    // Setup real-time validation indicators
    this.setupValidationIndicators();
  }

  setupEnterKeyHandling() {
    const inputs = this.form.querySelectorAll('input:not([type="submit"])');
    
    inputs.forEach((input, index) => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          
          // Move to next field or submit
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          } else {
            // Check if form is valid before submitting
            const formData = this.getFormData();
            if (this.validateForm(formData, false)) { // false = no UI messages
              this.form.dispatchEvent(new Event('submit'));
            }
          }
        }
      });
    });
  }

  setupFieldValidation() {
    // Email validation
    const emailInput = this.form.querySelector('#email');
    emailInput.addEventListener('blur', () => {
      if (emailInput.value && !this.isValidEmail(emailInput.value)) {
        this.showFieldError(emailInput, 'Please enter a valid email address');
      } else {
        this.clearFieldError(emailInput);
      }
    });

    // Phone validation
    const phoneInput = this.form.querySelector('#phone');
    phoneInput.addEventListener('blur', () => {
      const cleaned = phoneInput.value.replace(/\D/g, '');
      if (phoneInput.value && cleaned.length !== 10) {
        this.showFieldError(phoneInput, 'Please enter a 10-digit phone number');
      } else {
        this.clearFieldError(phoneInput);
      }
    });
  }

  setupValidationIndicators() {
    const inputs = this.form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      // Add validation state classes
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          input.classList.add('touched');
        }
      });

      // Live validation feedback
      input.addEventListener('input', () => {
        if (input.classList.contains('touched')) {
          this.validateField(input);
        }
      });
    });
  }

  validateField(input) {
    const isValid = input.checkValidity();
    
    if (isValid && input.value.trim()) {
      input.classList.add('valid');
      input.classList.remove('invalid');
    } else if (!isValid && input.value.trim()) {
      input.classList.add('invalid');
      input.classList.remove('valid');
    } else {
      input.classList.remove('valid', 'invalid');
    }
  }

  showFieldError(input, message) {
    const group = input.closest('.input-group');
    let errorElement = group.querySelector('.field-error');
    
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.className = 'field-error input-hint error';
      group.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
  }

  clearFieldError(input) {
    const group = input.closest('.input-group');
    const errorElement = group.querySelector('.field-error');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.classList.remove('error');
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  calculateNewCursorPosition(formattedValue, oldPosition) {
    // Calculate where cursor should be after phone formatting
    const numbers = formattedValue.replace(/\D/g, '');
    let newPosition = oldPosition;
    
    // Adjust for added formatting characters
    if (oldPosition <= 3) {
      newPosition = oldPosition;
    } else if (oldPosition <= 6) {
      newPosition = oldPosition + 2; // After "("
    } else if (oldPosition <= 9) {
      newPosition = oldPosition + 4; // After ") "
    } else {
      newPosition = oldPosition + 5; // After "-"
    }
    
    return Math.min(newPosition, formattedValue.length);
  }

  async handleSignup(e) {
    e.preventDefault();
    this.hideMessages();

    // Get form values
    const formData = this.getFormData();

    // Validate
    if (!this.validateForm(formData, true)) return;

    // Vibrate on mobile for feedback
    this.vibrate([10]);

    // Show loading state
    this.setLoadingState(true);

    // Notify exit intent handler
    if (window.exitIntentHandler) {
      window.exitIntentHandler.setFormSubmitted(true);
    }

    try {
      const result = await this.auth.signUp(formData);
      
      if (result.user) {
        this.clearProgress();
        sessionStorage.setItem("signup_email", formData.email);
        
        this.showSuccess("Account created! Check your email for the verification link.");
        this.vibrate([10, 50, 10]); // Success pattern
        
        setTimeout(() => {
          window.location.href = `/providers/check-email?email=${encodeURIComponent(formData.email)}`;
        }, 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      this.vibrate([10, 100, 10]); // Error pattern
      
      if (error.message.includes("already registered")) {
        this.showError("An account with this email already exists. Please sign in.");
      } else if (error.message.includes("rate limit")) {
        this.showError("Too many attempts. Please try again in a few minutes.");
      } else if (error.message.includes("network")) {
        this.showError("Network error. Please check your connection and try again.");
      } else {
        this.showError(error.message || "Signup failed. Please try again.");
      }
    } finally {
      this.setLoadingState(false);
    }
  }

  getFormData() {
    // Shadow DOM query helper
    const getValue = (selector) => {
      const element = this.formComponent?.shadowRoot?.querySelector(selector) || this.form.querySelector(selector);
      return element?.value?.trim() || '';
    };

    const isChecked = (selector) => {
      const element = this.formComponent?.shadowRoot?.querySelector(selector) || this.form.querySelector(selector);
      return element?.checked || false;
    };

    return {
      email: getValue('#email'),
      organizationName: getValue('#organizationName'),
      phone: getValue('#phone'),
      password: getValue('#password'),
      confirmPassword: getValue('#confirmPassword'),
      terms: isChecked('#terms')
    };
  }

  validateForm(data, showMessages = true) {
    // Clear any existing field errors
    this.form.querySelectorAll('.field-error').forEach(error => error.remove());

    if (!data.email || !data.organizationName || !data.phone || !data.password || !data.confirmPassword) {
      if (showMessages) {
        this.showError("Please fill in all required fields");
        this.highlightEmptyFields();
      }
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      if (showMessages) {
        this.showError("Please enter a valid email address");
        this.form.querySelector('#email')?.focus();
      }
      return false;
    }

    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      if (showMessages) {
        this.showError("Please enter a valid 10-digit phone number");
        this.form.querySelector('#phone')?.focus();
      }
      return false;
    }

    if (data.password !== data.confirmPassword) {
      if (showMessages) {
        this.showError("Passwords do not match");
        const hint = this.form.querySelector('#password-match-hint');
        if (hint) {
          hint.style.display = "block";
          hint.classList.add("error");
        }
        this.form.querySelector('#confirmPassword')?.focus();
      }
      return false;
    }

    if (!data.terms) {
      if (showMessages) {
        this.showError("Please accept the terms to continue");
        // Highlight terms checkbox
        const termsGroup = this.form.querySelector('.terms-consent');
        if (termsGroup) {
          termsGroup.classList.add('error-highlight');
          setTimeout(() => termsGroup.classList.remove('error-highlight'), 3000);
        }
      }
      return false;
    }

    if (data.password.length < 6) {
      if (showMessages) {
        this.showError("Password must be at least 6 characters");
        this.form.querySelector('#password')?.focus();
      }
      return false;
    }

    return true;
  }

  highlightEmptyFields() {
    const requiredFields = ['#email', '#organizationName', '#phone', '#password', '#confirmPassword'];
    
    requiredFields.forEach(selector => {
      const field = this.form.querySelector(selector);
      if (field && !field.value.trim()) {
        field.classList.add('error-highlight');
        setTimeout(() => field.classList.remove('error-highlight'), 3000);
      }
    });
  }

  checkPasswordStrength(password) {
    const strengthBar = this.form.querySelector('#password-strength-bar');
    if (!strengthBar) return;

    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;

    // Update strength bar
    strengthBar.className = "password-strength-bar";
    if (strength <= 2) {
      strengthBar.classList.add("weak");
    } else if (strength <= 3) {
      strengthBar.classList.add("medium");
    } else {
      strengthBar.classList.add("strong");
    }

    // Update aria-label for accessibility
    const strengthText = strength <= 2 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong';
    strengthBar.setAttribute('aria-label', `Password strength: ${strengthText}`);
  }

  checkPasswordMatch() {
    const password = this.form.querySelector('#password')?.value || '';
    const confirmPassword = this.form.querySelector('#confirmPassword')?.value || '';
    const hint = this.form.querySelector('#password-match-hint');

    if (!hint) return;

    if (confirmPassword && password !== confirmPassword) {
      hint.style.display = "block";
      hint.classList.add("error");
      hint.textContent = "Passwords do not match";
    } else if (confirmPassword && password === confirmPassword) {
      hint.style.display = "block";
      hint.classList.remove("error");
      hint.classList.add("success");
      hint.textContent = "Passwords match";
      setTimeout(() => {
        hint.style.display = "none";
      }, 2000);
    } else {
      hint.style.display = "none";
      hint.classList.remove("error", "success");
    }
  }

  formatPhone(value) {
    const number = value.replace(/\D/g, "");
    const length = number.length;

    if (length >= 10) {
      return number.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (length >= 6) {
      return number.replace(/(\d{3})(\d{3})/, "($1) $2-");
    } else if (length >= 3) {
      return number.replace(/(\d{3})/, "($1) ");
    }
    return number;
  }

  setupPasswordToggles() {
    const toggleButtons = this.form.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const input = button.parentElement.querySelector('input');
        const eyeIcon = button.querySelector('.eye-icon');
        const eyeOffIcon = button.querySelector('.eye-off-icon');
        
        if (input.type === 'password') {
          input.type = 'text';
          eyeIcon.style.display = 'none';
          eyeOffIcon.style.display = 'block';
          button.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          eyeIcon.style.display = 'block';
          eyeOffIcon.style.display = 'none';
          button.setAttribute('aria-label', 'Show password');
        }

        // Refocus input on mobile to maintain keyboard
        if (this.isMobile) {
          input.focus();
        }
      });
    });
  }

  saveProgress() {
    try {
      const data = {
        email: this.form.querySelector('#email')?.value || '',
        organizationName: this.form.querySelector('#organizationName')?.value || '',
        phone: this.form.querySelector('#phone')?.value || '',
        timestamp: Date.now(),
      };
      
      // Only save if there's actual data
      if (data.email || data.organizationName || data.phone) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }

  loadSavedProgress() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        // Only load if less than 7 days old
        if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
          let fieldsRestored = false;

          // Pre-fill form
          if (data.email && this.form.querySelector('#email')) {
            this.form.querySelector('#email').value = data.email;
            fieldsRestored = true;
          }
          if (data.organizationName && this.form.querySelector('#organizationName')) {
            this.form.querySelector('#organizationName').value = data.organizationName;
            fieldsRestored = true;
          }
          if (data.phone && this.form.querySelector('#phone')) {
            this.form.querySelector('#phone').value = data.phone;
            fieldsRestored = true;
          }

          // Show welcome back message only if fields were restored
          if (fieldsRestored) {
            this.showSuccess("Welcome back! We saved your progress.");
            setTimeout(() => this.hideMessages(), 3000);
          }
        } else {
          // Clear old saved data
          this.clearProgress();
        }
      }
    } catch (error) {
      console.error("Error loading saved progress:", error);
    }
  }

  clearProgress() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  showError(message) {
    const errorMessage = this.form.querySelector('#error-message');
    const successMessage = this.form.querySelector('#success-message');
    
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("hidden");
      
      // Announce to screen readers
      errorMessage.setAttribute('role', 'alert');
      errorMessage.setAttribute('aria-live', 'assertive');
    }
    
    if (successMessage) {
      successMessage.classList.add("hidden");
    }

    // Scroll to message on mobile
    if (this.isMobile && errorMessage) {
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Vibrate for error feedback
    this.vibrate([10, 100, 10]);
  }

  showSuccess(message) {
    const successMessage = this.form.querySelector('#success-message');
    const errorMessage = this.form.querySelector('#error-message');
    
    if (successMessage) {
      successMessage.textContent = message;
      successMessage.classList.remove("hidden");
      
      // Announce to screen readers
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
    }
    
    if (errorMessage) {
      errorMessage.classList.add("hidden");
    }

    // Vibrate for success feedback
    this.vibrate([10, 50, 10]);
  }

  hideMessages() {
    const errorMessage = this.form.querySelector('#error-message');
    const successMessage = this.form.querySelector('#success-message');
    
    if (errorMessage) {
      errorMessage.classList.add("hidden");
    }
    
    if (successMessage) {
      successMessage.classList.add("hidden");
    }
  }

  setLoadingState(loading) {
    const submitButton = this.form.querySelector('#submit-button');
    const buttonText = this.form.querySelector('#button-text');
    const buttonLoading = this.form.querySelector('#button-loading');
    
    if (submitButton) {
      submitButton.disabled = loading;
      submitButton.setAttribute('aria-busy', loading);
    }
    
    if (buttonText) {
      buttonText.style.display = loading ? "none" : "inline";
    }
    
    if (buttonLoading) {
      buttonLoading.style.display = loading ? "inline-flex" : "none";
    }

    // Prevent form resubmission
    if (loading) {
      this.form.addEventListener('submit', this.preventResubmit);
    } else {
      this.form.removeEventListener('submit', this.preventResubmit);
    }
  }

  preventResubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Haptic feedback helper
  vibrate(pattern = [10]) {
    if ('vibrate' in navigator && this.isMobile) {
      navigator.vibrate(pattern);
    }
  }

  // Set exit intent handler reference
  setExitIntentHandler(handler) {
    this.exitIntentHandler = handler;
  }
}