// Main signup initialization script
// File: /src/scripts/providers/signup.js

import { setupFormHandlers } from './signup/form-handler.js';
import { ExitIntentHandler } from './signup/exit-intent.js';
import { SupabaseAuth } from './signup/supabase-auth.js';

// Wait for both DOM and Web Components
async function init() {
  try {
    // Initialize Supabase
    const supabaseAuth = new SupabaseAuth();
    await supabaseAuth.initialize();
    
    // Wait for signup form to be ready
    const waitForForm = () => {
      return new Promise((resolve) => {
        const checkForm = () => {
          const formElement = document.querySelector('signup-form');
          if (formElement && formElement.shadowRoot) {
            resolve();
          } else {
            setTimeout(checkForm, 100);
          }
        };
        
        // Also listen for the ready event
        window.addEventListener('signup-form-ready', () => resolve(), { once: true });
        checkForm();
      });
    };
    
    await waitForForm();
    
    // Setup handlers
    setupFormHandlers(supabaseAuth);
    
    // Setup exit intent
    const exitIntentHandler = new ExitIntentHandler();
    
    // Make exit intent handler available globally if needed
    window.exitIntentHandler = exitIntentHandler;
    
  } catch (error) {
    console.error('Failed to initialize signup:', error);
  }
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}