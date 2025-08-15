// src/scripts/providers/psa/modules/psaCompletionHandler.js
import { PSA_CONFIG } from '../psa.config.js';
import { CompletionOverlayManager } from './completionOverlayManager.js';

export class PSACompletionHandler {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.overlayManager = new CompletionOverlayManager();
  }

  async handleCompletion(detail) {  // ADD async here
    console.log('🎉 Handling PSA completion:', detail);
    
    // Update state
    this.stateManager.updateState({
      completed: true,
      currentStep: 3,
      psaStep: 4
    });

    // Save completion status
    this.stateManager.saveCompletionStatus();

    // ADD THIS: Update Supabase onboarding status
    await this.updateOnboardingStatus();

    // Remove any helper buttons
    this.removeHelperButtons();

    // Show completion overlay
    this.overlayManager.showCompletionMessage(detail.psaData);

    // Schedule redirect
    this.scheduleRedirect();
  }

  // ADD THIS NEW METHOD:
  async updateOnboardingStatus() {
    try {
      // Import Supabase dynamically
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      
      const supabase = createClient(
        window.PUBLIC_SUPABASE_URL,
        window.PUBLIC_SUPABASE_ANON_KEY
      );
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('User not authenticated for PSA update');
        return;
      }
      
      console.log('📝 Updating onboarding status after PSA signing...');
      
      // Update corporate_entities with completion status
      const { data, error } = await supabase
        .from('corporate_entities')
        .update({
          onboarding_completed: true,
          agreement_signed_at: new Date().toISOString(),
          portal_access_granted: true
        })
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Failed to update onboarding status:', error);
      } else {
        console.log('✅ Onboarding completed! Portal access granted.');
        
        // Also set in localStorage as backup
        localStorage.setItem('psa_signed', 'true');
        localStorage.setItem('onboarding_completed', 'true');
        localStorage.setItem('psa_signed_at', new Date().toISOString());
      }
      
    } catch (error) {
      console.error('Error updating PSA status:', error);
      // Don't block completion if update fails
    }
  }

  removeHelperButtons() {
    const buttonIds = ['signed-check-button', 'ready-to-continue-button'];
    buttonIds.forEach(id => {
      const button = document.getElementById(id);
      if (button) button.remove();
    });
  }

  scheduleRedirect() {
    setTimeout(() => {
      console.log('🔄 Redirecting to portal dashboard...');
      // CHANGE THIS: Redirect to portal instead of success page
      window.location.href = '/providers/portal';
    }, PSA_CONFIG.TIMINGS.REDIRECT_DELAY);
  }
}