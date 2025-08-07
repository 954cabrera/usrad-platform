// src/components/Providers/hooks/usePSACompletion.js
import { useCallback } from 'react';
import { PSA_CONFIG } from '../../../scripts/providers/psa/psa.config';

export function usePSACompletion(completed, setCompleted, setCurrentStep, setPsaStep, psaData) {
  const handlePSACompletion = useCallback(async () => {
    if (completed) return; // Prevent multiple triggers

    console.log("🎉 PSA Completion Handler Called!");
    setCompleted(true);
    setCurrentStep(3);
    setPsaStep(4);

    // Dispatch completion event for other modules
    window.dispatchEvent(new CustomEvent('psa:completion', {
      detail: {
        psaData,
        completedAt: new Date().toISOString()
      }
    }));

    // Save completion status
    localStorage.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED, "true");
    localStorage.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED_DATE, new Date().toISOString());

    // Redirect to success page
    setTimeout(() => {
      console.log("🔄 Redirecting to success page...");
      window.location.href = PSA_CONFIG.ROUTES.SUCCESS;
    }, PSA_CONFIG.TIMINGS.REDIRECT_DELAY);
  }, [completed, setCompleted, setCurrentStep, setPsaStep, psaData]);

  return { handlePSACompletion };
}