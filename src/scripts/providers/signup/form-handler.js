// Form handler module
// File: /src/scripts/providers/signup/form-handler.js

export function setupFormHandlers(supabaseAuth) {
  // Wait for form to be available
  const formComponent = document.querySelector('signup-form');
  if (!formComponent || !formComponent.shadowRoot) {
    console.error('Form component not found');
    return;
  }

  const shadowRoot = formComponent.shadowRoot;
  const form = shadowRoot.getElementById('provider-signup-form');
  
  if (!form) {
    console.error('Form not found in shadow DOM');
    return;
  }

  // Form elements
  const submitButton = shadowRoot.getElementById('submit-button');
  const buttonText = shadowRoot.getElementById('button-text');
  const buttonLoading = shadowRoot.getElementById('button-loading');
  const errorMessage = shadowRoot.getElementById('error-message');
  const successMessage = shadowRoot.getElementById('success-message');

  // Progress persistence
  const STORAGE_KEY = 'usrad_provider_signup';

  // Helper functions
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
  }

  function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function hideMessages() {
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
  }

  // Password strength checker
  function checkPasswordStrength(password) {
    const strengthBar = shadowRoot.getElementById('password-strength-bar');
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthBar.className = 'password-strength-bar';
    if (strength <= 2) {
      strengthBar.classList.add('weak');
    } else if (strength <= 3) {
      strengthBar.classList.add('medium');
    } else {
      strengthBar.classList.add('strong');
    }
  }

  // Phone formatting
  function formatPhone(value) {
    const number = value.replace(/\D/g, '');
    if (number.length >= 6) {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (number.length >= 3) {
      return number.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    return value;
  }

  // Form submission handler
  async function handleSignup(e) {
    e.preventDefault();
    hideMessages();

    // Get form values
    const email = shadowRoot.getElementById('email').value.trim();
    const organizationName = shadowRoot.getElementById('organizationName').value.trim();
    const phone = shadowRoot.getElementById('phone').value.trim();
    const password = shadowRoot.getElementById('password').value;
    const confirmPassword = shadowRoot.getElementById('confirmPassword').value;
    const terms = shadowRoot.getElementById('terms').checked;

    // Validate
    if (!email || !organizationName || !phone || !password || !confirmPassword) {
      showError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (!terms) {
      showError('Please accept the terms to continue');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    // Show loading state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline-flex';

    try {
      const data = await supabaseAuth.signUp({
        email,
        password,
        organizationName,
        phone
      });

      if (data.user) {
        // Clear saved progress
        localStorage.removeItem(STORAGE_KEY);
        
        // Store email for verification page
        sessionStorage.setItem('signup_email', email);

        // Mark form as submitted for exit intent
        if (window.exitIntentHandler) {
          window.exitIntentHandler.setFormSubmitted(true);
        }

        showSuccess('Account created! Check your email for the verification link.');

        // Redirect after delay
        setTimeout(() => {
          window.location.href = `/providers/check-email?email=${encodeURIComponent(email)}`;
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.message?.includes('already registered')) {
        showError('An account with this email already exists. Please sign in.');
      } else {
        showError(error.message || 'Signup failed. Please try again.');
      }
    } finally {
      submitButton.disabled = false;
      buttonText.style.display = 'inline';
      buttonLoading.style.display = 'none';
    }
  }

  // Setup password visibility toggles
  function setupPasswordToggles() {
    const passwordToggle = shadowRoot.getElementById('password-toggle');
    const confirmPasswordToggle = shadowRoot.getElementById('confirm-password-toggle');
    const passwordInput = shadowRoot.getElementById('password');
    const confirmPasswordInput = shadowRoot.getElementById('confirmPassword');

    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const eyeIcon = this.querySelector('.eye-icon');
        const eyeOffIcon = this.querySelector('.eye-off-icon');
        
        if (type === 'password') {
          eyeIcon.style.display = 'block';
          eyeOffIcon.style.display = 'none';
        } else {
          eyeIcon.style.display = 'none';
          eyeOffIcon.style.display = 'block';
        }
      });
    }

    if (confirmPasswordToggle && confirmPasswordInput) {
      confirmPasswordToggle.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        
        const eyeIcon = this.querySelector('.eye-icon');
        const eyeOffIcon = this.querySelector('.eye-off-icon');
        
        if (type === 'password') {
          eyeIcon.style.display = 'block';
          eyeOffIcon.style.display = 'none';
        } else {
          eyeIcon.style.display = 'none';
          eyeOffIcon.style.display = 'block';
        }
      });
    }
  }

  // Save progress
  function saveProgress() {
    try {
      const data = {
        email: shadowRoot.getElementById('email').value,
        organizationName: shadowRoot.getElementById('organizationName').value,
        phone: shadowRoot.getElementById('phone').value,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Load saved progress
  function loadSavedProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        // Only load if less than 7 days old
        if (Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
          // Pre-fill form
          if (data.email) shadowRoot.getElementById('email').value = data.email;
          if (data.organizationName) shadowRoot.getElementById('organizationName').value = data.organizationName;
          if (data.phone) shadowRoot.getElementById('phone').value = data.phone;

          showSuccess('Welcome back! We saved your progress.');
          setTimeout(() => hideMessages(), 3000);
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }

  // Set up event listeners
  form.addEventListener('submit', handleSignup);

  // Password strength
  const passwordInput = shadowRoot.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      checkPasswordStrength(e.target.value);
    });
  }

  // Phone formatting
  const phoneInput = shadowRoot.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  }

  // Save progress on input
  form.addEventListener('input', saveProgress);

  // Setup password toggles
  setupPasswordToggles();

  // Load saved progress
  loadSavedProgress();

  // Check for existing session
  supabaseAuth.checkSession().then(session => {
    if (session) {
      showSuccess('You are already logged in. Redirecting to portal...');
      setTimeout(() => {
        window.location.href = '/providers/portal';
      }, 1500);
    }
  });
}