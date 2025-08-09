// SignupForm Web Component
class SignupForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Import the form-specific styles */
        @import '/src/styles/providers/signup-form.css';
      </style>

      <div class="form-side">
        <div class="signup-container">
          <!-- Progress Steps -->
          <div class="progress-steps">
            <div class="progress-step active">
              <div class="step-number">1</div>
              <div class="step-label">Account</div>
            </div>
            <div class="progress-step">
              <div class="step-number">2</div>
              <div class="step-label">Centers</div>
            </div>
            <div class="progress-step">
              <div class="step-number">3</div>
              <div class="step-label">Agreement</div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="form-content">
            <div class="form-header">
              <h2 class="form-title">Start receiving patients today</h2>
              <p class="form-subtitle">
                Be among the first imaging centers in our revolutionary network
              </p>
            </div>

            <!-- Messages -->
            <div id="error-message" class="message error hidden"></div>
            <div id="success-message" class="message success hidden"></div>

            <form id="provider-signup-form">
              ${this.renderFormFields()}
              ${this.renderSubmitSection()}
            </form>

            <div class="signin-link">
              Already in the network? <a href="/providers/login">Sign in here</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize form after render
    this.initializeForm();
    // Add mobile enhancements
    this.setupMobileEnhancements();
  }

  renderFormFields() {
    return `
      <!-- Email -->
      <div class="input-group">
        <label for="email" class="input-label">
          Work Email<span class="asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-input"
          required
          placeholder="admin@imagingcenter.com"
          autocomplete="email"
          inputmode="email"
        />
      </div>

      <!-- Organization Name -->
      <div class="input-group">
        <label for="organizationName" class="input-label">
          Organization Name<span class="asterisk">*</span>
        </label>
        <input
          type="text"
          id="organizationName"
          name="organizationName"
          class="form-input"
          required
          placeholder="Advanced Imaging Centers, LLC"
          autocomplete="organization"
          inputmode="text"
        />
        <p class="input-hint">
          Legal name or DBA your imaging centers operate under
        </p>
      </div>

      <!-- Phone -->
      <div class="input-group">
        <label for="phone" class="input-label">
          Phone Number<span class="asterisk">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          class="form-input"
          required
          placeholder="(555) 123-4567"
          autocomplete="tel"
          inputmode="tel"
        />
      </div>

      <!-- Password fields -->
      ${this.renderPasswordFields()}

      <!-- Terms -->
      <div class="terms-consent">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          class="terms-checkbox"
          required
        />
        <label for="terms">
          I agree to USRad's <a href="/terms" target="_blank">Terms</a> and
          understand I can review the full Provider Service Agreement before
          committing
        </label>
      </div>
    `;
  }

  renderPasswordFields() {
    return `
      <!-- Password -->
      <div class="input-group">
        <label for="password" class="input-label">
          Create Password<span class="asterisk">*</span>
        </label>
        <div class="password-input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            class="form-input"
            required
            minlength="6"
            placeholder="At least 6 characters"
            autocomplete="new-password"
            inputmode="text"
          />
          <button
            type="button"
            class="password-toggle"
            id="password-toggle"
            aria-label="Toggle password visibility"
          >
            ${this.getPasswordToggleIcons()}
          </button>
        </div>
        <div class="password-strength">
          <div id="password-strength-bar" class="password-strength-bar"></div>
        </div>
        <p class="input-hint">
          You'll use this to access your provider portal
        </p>
      </div>

      <!-- Confirm Password -->
      <div class="input-group">
        <label for="confirmPassword" class="input-label">
          Confirm Password<span class="asterisk">*</span>
        </label>
        <div class="password-input-wrapper">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            class="form-input"
            required
            minlength="6"
            placeholder="Re-enter your password"
            autocomplete="new-password"
            inputmode="text"
          />
          <button
            type="button"
            class="password-toggle"
            id="confirm-password-toggle"
            aria-label="Toggle confirm password visibility"
          >
            ${this.getPasswordToggleIcons()}
          </button>
        </div>
        <p class="input-hint" id="password-match-hint" style="display: none;">
          Passwords do not match
        </p>
      </div>
    `;
  }

  getPasswordToggleIcons() {
    return `
      <svg class="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      </svg>
      <svg class="eye-off-icon" style="display: none;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
      </svg>
    `;
  }

  renderSubmitSection() {
    return `
      <!-- Submit Button -->
      <button type="submit" class="submit-button" id="submit-button">
        <span id="button-text">Create Account & Continue</span>
        <span id="button-loading" style="display: none;">
          <span class="loading-spinner"></span> Creating account...
        </span>
      </button>

      <!-- Divider -->
      <div class="divider">
        <span>or continue with</span>
      </div>

      <!-- SSO Options -->
      <div class="sso-options">
        <button type="button" class="sso-button" onclick="signInWithGoogle()">
          ${this.getGoogleIcon()}
          Google
        </button>
        <button type="button" class="sso-button" onclick="signInWithMicrosoft()">
          ${this.getMicrosoftIcon()}
          Microsoft
        </button>
      </div>

      <!-- Value Props -->
      <div class="value-props">
        <div class="value-prop">
          <span class="icon">⏱️</span>
          <span>Takes less than 5 minutes</span>
        </div>
        <div class="value-prop">
          <span class="icon">🏥</span>
          <span>Early access benefits</span>
        </div>
        <div class="value-prop">
          <span class="icon">🚫</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    `;
  }

  getGoogleIcon() {
    return `
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
      </svg>
    `;
  }

  getMicrosoftIcon() {
    return `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0078d4">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
      </svg>
    `;
  }

  initializeForm() {
    // Dispatch event to let main script know the form is ready
    this.dispatchEvent(new CustomEvent('formReady', { 
      bubbles: true,
      detail: { 
        form: this.shadowRoot.getElementById('provider-signup-form') 
      }
    }));
  }

  // NEW MOBILE ENHANCEMENT METHODS
  setupMobileEnhancements() {
    // Detect if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
      // Add mobile class
      this.shadowRoot.querySelector('.form-side').classList.add('mobile');
      
      // Handle virtual keyboard
      this.handleVirtualKeyboard();
      
      // Add touch feedback
      this.addTouchFeedback();
      
      // Optimize input focus
      this.optimizeInputFocus();
      
      // Setup viewport height fix
      this.fixViewportHeight();
      
      // Handle orientation changes
      this.handleOrientationChange();
    }
  }

  handleVirtualKeyboard() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    let currentScrollY = 0;
    
    inputs.forEach(input => {
      // Store scroll position before focus
      input.addEventListener('touchstart', () => {
        currentScrollY = window.scrollY;
      });
      
      // Scroll input into view when focused
      input.addEventListener('focus', () => {
        // Add class for keyboard open state
        this.shadowRoot.querySelector('.form-side').classList.add('keyboard-open');
        
        setTimeout(() => {
          // Calculate optimal scroll position
          const inputRect = input.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const idealPosition = viewportHeight * 0.3; // Position input at 30% from top
          
          if (inputRect.top > idealPosition || inputRect.bottom > viewportHeight) {
            const scrollTarget = window.scrollY + inputRect.top - idealPosition;
            
            window.scrollTo({
              top: scrollTarget,
              behavior: 'smooth'
            });
          }
        }, 300); // Wait for keyboard to appear
      });
      
      // Handle keyboard dismiss
      input.addEventListener('blur', () => {
        // Remove keyboard open class
        this.shadowRoot.querySelector('.form-side').classList.remove('keyboard-open');
        
        // Only scroll to top if we're on the same form
        if (Math.abs(window.scrollY - currentScrollY) < 100) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  addTouchFeedback() {
    const interactiveElements = this.shadowRoot.querySelectorAll(
      'button, .sso-button, .terms-consent, input[type="checkbox"]'
    );
    
    interactiveElements.forEach(element => {
      let touchTimeout;
      
      element.addEventListener('touchstart', (e) => {
        // Add active class immediately
        element.classList.add('touch-active');
        
        // Add ripple effect for buttons
        if (element.tagName === 'BUTTON') {
          this.createRipple(element, e);
        }
        
        // Clear any existing timeout
        clearTimeout(touchTimeout);
      });
      
      element.addEventListener('touchend', () => {
        // Keep active state briefly for better feedback
        touchTimeout = setTimeout(() => {
          element.classList.remove('touch-active');
        }, 100);
      });
      
      element.addEventListener('touchcancel', () => {
        element.classList.remove('touch-active');
        clearTimeout(touchTimeout);
      });
    });
  }

  createRipple(button, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.touches[0].clientX - rect.left - size / 2;
    const y = event.touches[0].clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  optimizeInputFocus() {
    // Don't auto-focus on mobile if keyboard would cover most of screen
    const viewportHeight = window.innerHeight;
    const isSmallViewport = viewportHeight < 600;
    
    if (!isSmallViewport) {
      // Auto-focus first input after slight delay
      setTimeout(() => {
        const firstInput = this.shadowRoot.querySelector('#email');
        if (firstInput && window.innerWidth <= 768) {
          // Check if user hasn't already interacted
          if (!this.shadowRoot.querySelector('input:focus')) {
            firstInput.focus({ preventScroll: true });
          }
        }
      }, 800);
    }
  }

  fixViewportHeight() {
    // Fix for iOS viewport height issues
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Update form container height
      const formSide = this.shadowRoot.querySelector('.form-side');
      if (formSide) {
        formSide.style.minHeight = `${window.innerHeight}px`;
      }
    };
    
    // Set initially
    setViewportHeight();
    
    // Update on resize (but debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setViewportHeight, 100);
    });
  }

  handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      // Hide keyboard on orientation change
      const activeElement = this.shadowRoot.activeElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }
      
      // Adjust layout after orientation change
      setTimeout(() => {
        this.fixViewportHeight();
        window.scrollTo(0, 0);
      }, 300);
    });
  }
}

customElements.define('signup-form', SignupForm);