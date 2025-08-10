// Exit Intent Handler Module
// File: /src/scripts/providers/signup/exit-intent-handler.js

export class ExitIntentHandler {
  constructor() {
    // Use window global variables
    window.exitIntentShown = window.exitIntentShown || false;
    window.formSubmitted = window.formSubmitted || false;
    
    // Make this instance available globally
    window.exitIntentHandler = this;
    
    this.initialize();
  }

  initialize() {
    console.log('Setting up exit intent detection...');

    // Desktop: Mouse leaves viewport
    document.addEventListener('mouseleave', (e) => {
      console.log('Mouse leave detected', e.clientY);
      if (e.clientY <= 0) {
        window.showExitIntent();
      }
    });

    // Desktop: Mouse moves to top
    document.addEventListener('mousemove', (e) => {
      if (e.clientY <= 10) {
        console.log('Mouse near top detected');
        window.showExitIntent();
      }
    });

    // Mobile: Quick scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If scrolling up quickly near top
      if (currentScrollTop < lastScrollTop && currentScrollTop < 100) {
        console.log('Quick scroll up detected');
        window.showExitIntent();
      }
      
      lastScrollTop = currentScrollTop;
    });

    // Tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Tab hidden detected');
        window.showExitIntent();
      }
    });

    // Test function
    window.testExitIntent = () => {
      console.log('Testing exit intent...');
      window.exitIntentShown = false;
      window.showExitIntent();
    };

    console.log('Exit intent detection ready. Test with: testExitIntent()');
  }

  setFormSubmitted(value) {
    window.formSubmitted = value;
  }

  reset() {
    window.exitIntentShown = false;
    window.formSubmitted = false;
  }
}