// Main signup script with all logic from joinb.astro
// File: /src/scripts/providers/signup-main.js

// Import helper modules
import { ExitIntentHandler } from './signup/exit-intent-handler.js';
import { FormValidator } from './signup/form-validator.js';
import { PasswordStrengthChecker } from './signup/password-strength.js';
import { PhoneFormatter } from './signup/phone-formatter.js';

// Global variables for exit intent - make them truly global
window.exitIntentShown = false;
window.formSubmitted = false;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Initializing signup form...');

  // Initialize exit intent
  const exitIntent = new ExitIntentHandler();
  
  // Get Supabase configuration
  const supabaseUrl = document.querySelector('meta[name="supabase-url"]')?.content;
  const supabaseAnonKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;

  // Check configuration
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase configuration');
    const errorMsg = document.getElementById('error-message');
    if (errorMsg) {
      errorMsg.textContent = 'Configuration error. Please contact support.';
      errorMsg.classList.remove('hidden');
    }
    return;
  }

  try {
    // Load Supabase
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Initialize form handler
    initializeForm(supabase);

    // Check if already logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      showSuccess('You are already logged in. Redirecting to portal...');
      setTimeout(() => {
        window.location.href = '/providers/portal';
      }, 1500);
    }

  } catch (error) {
    console.error('Failed to load Supabase:', error);
    const errorMsg = document.getElementById('error-message');
    if (errorMsg) {
      errorMsg.textContent = 'Failed to load authentication system. Please refresh the page.';
      errorMsg.classList.remove('hidden');
    }
  }
});

// Initialize form handling
function initializeForm(supabase) {
  // Form elements
  const form = document.getElementById('provider-signup-form');
  const submitButton = document.getElementById('submit-button');
  const buttonText = document.getElementById('button-text');
  const buttonLoading = document.getElementById('button-loading');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');

  // Progress persistence
  const STORAGE_KEY = 'usrad_provider_signup';

  // Initialize validators and formatters
  const validator = new FormValidator();
  const passwordChecker = new PasswordStrengthChecker();
  const phoneFormatter = new PhoneFormatter();

  // Load saved progress
  loadSavedProgress();

  // Save progress
  function saveProgress() {
    try {
      const data = {
        email: document.getElementById('email').value,
        organizationName: document.getElementById('organizationName').value,
        phone: document.getElementById('phone').value,
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
          if (data.email) document.getElementById('email').value = data.email;
          if (data.organizationName) document.getElementById('organizationName').value = data.organizationName;
          if (data.phone) document.getElementById('phone').value = data.phone;

          showSuccess('Welcome back! We saved your progress.');
          setTimeout(() => hideMessages(), 3000);
        }
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }

  // Clear saved progress
  function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // Show/hide messages
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

  // Password visibility toggle
  function setupPasswordToggle() {
    const passwordToggle = document.getElementById('password-toggle');
    const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    passwordToggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle icon
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

    confirmPasswordToggle.addEventListener('click', function() {
      const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPasswordInput.setAttribute('type', type);
      
      // Toggle icon
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

  // SSO handlers
  window.signInWithGoogle = async function() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/providers/portal`,
          scopes: 'email profile'
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google sign-in error:', error);
      showError('Google sign-in temporarily unavailable. Please use email signup.');
    }
  };

  window.signInWithMicrosoft = async function() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/providers/portal`,
          scopes: 'email profile'
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Microsoft sign-in error:', error);
      showError('Microsoft sign-in temporarily unavailable. Please use email signup.');
    }
  };

  // Form submission
  async function handleSignup(e) {
    e.preventDefault();
    hideMessages();

    // Get form values
    const email = document.getElementById('email').value.trim();
    const organizationName = document.getElementById('organizationName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Validate
    const validation = validator.validateSignupForm({
      email,
      organizationName,
      phone,
      password,
      confirmPassword,
      terms
    });

    if (!validation.isValid) {
      showError(validation.error);
      if (validation.field === 'password-match') {
        document.getElementById('password-match-hint').style.display = 'block';
        document.getElementById('password-match-hint').classList.add('error');
      }
      return;
    }

    // Show loading state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline-flex';

    try {
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/providers/verified`,
          data: {
            organization_name: organizationName,
            phone: phone,
            user_type: 'provider',
            onboarding_step: 'account_created',
            source: 'enhanced_join'
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        window.formSubmitted = true; // Set global variable
        window.exitIntentHandler?.setFormSubmitted(true);
        clearProgress();

        // Store email for verification page
        sessionStorage.setItem('signup_email', email);

        // Check if we're in development or testing mode
        const isDev = window.location.hostname === 'localhost';
        const isTestMode = new URLSearchParams(window.location.search).get('test') === 'true';
        
        if (data.session) {
          // Email confirmation is OFF - user was auto-signed in
          
          if (isDev || isTestMode) {
            // For testing: Sign them out and follow the email flow
            await supabase.auth.signOut();
            
            showSuccess('Account created! Simulating email verification flow...');
            
            setTimeout(() => {
              window.location.href = `/providers/check-email?email=${encodeURIComponent(email)}&dev=true`;
            }, 1500);
          } else {
            // Production with email OFF: Direct to portal
            showSuccess('Account created! Redirecting to portal...');
            
            setTimeout(() => {
              window.location.href = '/providers/portal';
            }, 1500);
          }
        } else {
          // Email confirmation is ON - normal flow
          showSuccess('Account created! Check your email for the verification link.');
          
          setTimeout(() => {
            window.location.href = `/providers/check-email?email=${encodeURIComponent(email)}`;
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.message?.includes('rate limit')) {
        showError('Too many signup attempts. Please try again in an hour or contact support@usrad.com');
        
        // Show alternative action
        const alternativeMsg = document.createElement('div');
        alternativeMsg.innerHTML = `
          <p style="margin-top: 10px; font-size: 0.875rem;">
            While you wait, you can:
            <a href="/providers" style="color: #667eea;">Learn more about USRad</a> or
            <a href="mailto:support@usrad.com" style="color: #667eea;">Email us directly</a>
          </p>
        `;
        errorMessage.appendChild(alternativeMsg);
      } else if (error.message?.includes('already registered')) {
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

  // Password match checking
  function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const hint = document.getElementById('password-match-hint');

    if (confirmPassword && password !== confirmPassword) {
      hint.style.display = 'block';
      hint.classList.add('error');
    } else {
      hint.style.display = 'none';
      hint.classList.remove('error');
    }
  }

  // Event listeners
  form.addEventListener('submit', handleSignup);

  // Password strength on input
  document.getElementById('password').addEventListener('input', (e) => {
    passwordChecker.checkStrength(e.target.value);
    
    // Check password match if confirm password has value
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword) {
      checkPasswordMatch();
    }
  });

  // Check password match on confirm password input
  document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
  document.getElementById('confirmPassword').addEventListener('blur', checkPasswordMatch);

  // Phone formatting
  document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = phoneFormatter.format(e.target.value);
  });

  // Save progress on input
  form.addEventListener('input', () => {
    saveProgress();
  });

  // Setup password visibility toggles
  setupPasswordToggle();

  // Make functions available globally
  window.showError = showError;
  window.showSuccess = showSuccess;
  window.hideMessages = hideMessages;
}

// Global exit modal functions
window.closeExitModal = function() {
  const modal = document.getElementById('exit-modal');
  if (modal) {
    modal.classList.remove('show');
    
    // Focus back on the first empty field
    setTimeout(() => {
      const email = document.getElementById('email');
      const orgName = document.getElementById('organizationName');
      const phone = document.getElementById('phone');
      const password = document.getElementById('password');
      
      if (email && !email.value) {
        email.focus();
      } else if (orgName && !orgName.value) {
        orgName.focus();
      } else if (phone && !phone.value) {
        phone.focus();
      } else if (password && !password.value) {
        password.focus();
      }
    }, 100);
  }
};

window.showExitIntent = function() {
  if (!window.exitIntentShown && !window.formSubmitted) {
    const email = document.getElementById('email')?.value || '';
    const orgName = document.getElementById('organizationName')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    
    const hasInput = email.length > 0 || orgName.length > 0 || phone.length > 0;
    
    if (hasInput) {
      window.exitIntentShown = true;
      const modal = document.getElementById('exit-modal');
      if (modal) {
        modal.classList.add('show');
        console.log('Exit intent modal shown');
      }
    }
  }
};