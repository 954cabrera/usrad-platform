// Main signup functionality
import { SignupFormHandler } from './signup/form-handler.js';
import { ExitIntentHandler } from './signup/exit-intent.js';
import { SupabaseAuth } from './signup/supabase-auth.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Supabase
  const auth = new SupabaseAuth();
  await auth.initialize();

  // Initialize form handler
  const formHandler = new SignupFormHandler(auth);
  
  // Initialize exit intent
  const exitIntent = new ExitIntentHandler();

  // Check if already logged in
  const session = await auth.checkSession();
  if (session) {
    formHandler.showSuccess("You are already logged in. Redirecting to portal...");
    setTimeout(() => {
      window.location.href = "/providers/portal";
    }, 1500);
  }
});