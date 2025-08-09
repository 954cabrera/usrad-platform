export class ExitIntentHandler {
  constructor() {
    this.exitIntentShown = false;
    this.formSubmitted = false;
    this.modal = document.querySelector('exit-intent-modal');
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.setupExitIntent();
  }

  setupExitIntent() {
    console.log("Setting up exit intent detection...");
    
    if (this.isMobile) {
      this.setupMobileExitIntent();
    } else {
      this.setupDesktopExitIntent();
    }

    // Common setup for both mobile and desktop
    this.setupCommonListeners();

    // Test function
    window.testExitIntent = () => {
      console.log("Testing exit intent...");
      this.exitIntentShown = false;
      this.showExitIntent();
    };

    console.log("Exit intent detection ready. Test with: testExitIntent()");
  }

  setupDesktopExitIntent() {
    // Desktop: Mouse leaves viewport
    document.addEventListener("mouseleave", (e) => {
      console.log("Mouse leave detected", e.clientY);
      this.showExitIntent();
    });

    // Desktop: Mouse moves to top
    document.addEventListener("mousemove", (e) => {
      if (e.clientY <= 10) {
        console.log("Mouse near top detected");
        this.showExitIntent();
      }
    });
  }

  setupMobileExitIntent() {
    let touchStartY = 0;
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let lastScrollTime = Date.now();
    
    // Touch-based exit detection
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const scrollTop = window.pageYOffset;
      
      // Detect pull-down refresh gesture at top
      if (scrollTop <= 50 && touchY > touchStartY + 100) {
        console.log("Pull-down gesture detected");
        this.showExitIntent();
      }
    }, { passive: true });
    
    // Improved scroll detection
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      
      // Calculate scroll velocity
      if (timeDiff > 0) {
        scrollVelocity = Math.abs(currentScrollTop - lastScrollTop) / timeDiff;
      }
      
      // Detect rapid upward scroll near top
      if (currentScrollTop < lastScrollTop && // Scrolling up
          currentScrollTop < 200 && // Near top of page
          scrollVelocity > 0.5) { // Fast scroll
        console.log("Quick scroll up detected");
        this.showExitIntent();
      }
      
      lastScrollTop = currentScrollTop;
      lastScrollTime = currentTime;
    }, { passive: true });
    
    // Handle browser back button (Android)
    this.setupBackButtonHandler();
    
    // Detect app switching/tab hiding with delay
    let wasHidden = false;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        wasHidden = true;
        // Delay to avoid showing on legitimate actions
        setTimeout(() => {
          if (wasHidden && this.checkForInput()) {
            console.log("App switch detected with form input");
            this.showExitIntent();
          }
        }, 100);
      } else {
        wasHidden = false;
      }
    });
  }

  setupBackButtonHandler() {
    // Push a state to detect back button
    if (window.history && window.history.pushState) {
      // Add a dummy state
      window.history.pushState({ exitIntent: true }, '');
      
      window.addEventListener('popstate', (e) => {
        if (this.checkForInput() && !this.exitIntentShown) {
          console.log("Back button pressed with form input");
          
          // Prevent actual navigation
          window.history.pushState({ exitIntent: true }, '');
          
          // Show exit intent
          this.showExitIntent();
        }
      });
    }
  }

  setupCommonListeners() {
    // Listen for modal close
    this.modal.addEventListener('modalClosed', () => {
      this.focusFirstEmptyField();
    });

    // Tab visibility change (works for both mobile and desktop)
    let hiddenTime = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        hiddenTime = Date.now();
      } else {
        // Only show if tab was hidden for more than 2 seconds
        const hiddenDuration = Date.now() - hiddenTime;
        if (hiddenDuration > 2000 && this.checkForInput()) {
          console.log("Tab reactivated after being hidden");
          this.showExitIntent();
        }
      }
    });

    // Listen for page unload (closing tab/window)
    window.addEventListener('beforeunload', (e) => {
      if (this.checkForInput() && !this.exitIntentShown && !this.formSubmitted) {
        // Note: Modern browsers limit what we can do here
        // but we can try to show the browser's default confirmation
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  showExitIntent() {
    if (!this.exitIntentShown && !this.formSubmitted) {
      const hasInput = this.checkForInput();

      if (hasInput) {
        this.exitIntentShown = true;
        
        // Add slight delay on mobile to prevent accidental triggers
        const delay = this.isMobile ? 300 : 0;
        
        setTimeout(() => {
          this.modal.dispatchEvent(new Event('show'));
          console.log("Exit intent modal shown");
          
          // Haptic feedback on mobile if available
          if (this.isMobile && navigator.vibrate) {
            navigator.vibrate([10, 50, 10]);
          }
        }, delay);
      }
    }
  }

  checkForInput() {
    const form = document.querySelector('signup-form');
    if (!form || !form.shadowRoot) return false;

    const email = form.shadowRoot.querySelector('#email')?.value || "";
    const orgName = form.shadowRoot.querySelector('#organizationName')?.value || "";
    const phone = form.shadowRoot.querySelector('#phone')?.value || "";

    // Check if any field has meaningful input (more than 2 characters)
    return email.length > 2 || orgName.length > 2 || phone.length > 2;
  }

  focusFirstEmptyField() {
    // Focus back on the first empty field
    setTimeout(() => {
      const form = document.querySelector('signup-form');
      if (!form || !form.shadowRoot) return;

      // Don't focus on mobile if keyboard would cover too much
      if (this.isMobile && window.innerHeight < 500) {
        return;
      }

      const fields = [
        form.shadowRoot.querySelector('#email'),
        form.shadowRoot.querySelector('#organizationName'),
        form.shadowRoot.querySelector('#phone'),
        form.shadowRoot.querySelector('#password')
      ];

      // Find first empty field
      const emptyField = fields.find(field => field && !field.value);
      
      if (emptyField) {
        emptyField.focus({ preventScroll: this.isMobile });
        
        // On mobile, scroll to field after a delay
        if (this.isMobile) {
          setTimeout(() => {
            emptyField.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 300);
        }
      }
    }, 100);
  }

  setFormSubmitted(submitted) {
    this.formSubmitted = submitted;
    
    // If form is submitted, remove the back button handler
    if (submitted && window.history && window.history.state && window.history.state.exitIntent) {
      window.history.back();
    }
  }

  // Allow external code to temporarily disable exit intent
  disable() {
    this.exitIntentShown = true;
  }

  // Re-enable exit intent
  enable() {
    this.exitIntentShown = false;
  }
}