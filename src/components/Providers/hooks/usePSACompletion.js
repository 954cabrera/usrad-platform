// src/components/Providers/hooks/usePSACompletion.js
import { useCallback } from 'react';
import { PSA_CONFIG } from '../../../scripts/providers/psa/psa.config';
import { supabase } from '../../../lib/supabase';

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

    // Save the signed PSA document to Supabase
    try {
      console.log("📄 Saving PSA document record...");
      
      // Get the current user and provider
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: provider } = await supabase
          .from('providers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (provider) {
          // Create a record for the PSA document
          // The actual PDF will be uploaded via the API after DocuSeal processing
          const { data: docRecord, error } = await supabase
            .from('provider_documents')
            .insert({
              provider_id: provider.id,
              document_type: 'PSA',
              storage_path: `${provider.id}/psa-pending-${Date.now()}.pdf`,
              signed_date: new Date(),
              status: 'pending', // Will be updated to 'active' when PDF is uploaded
              docuseal_submission_id: psaData?.submissionId || null
            })
            .select()
            .single();

          if (error) {
            console.error("Failed to create document record:", error);
          } else {
            console.log("✅ PSA document record created:", docRecord.id);
            
            // Store document ID for later reference
            localStorage.setItem('pending_psa_doc_id', docRecord.id);
          }

          // Log activity
          await supabase
            .from('provider_activity_logs')
            .insert({
              provider_id: provider.id,
              action: 'PSA_SIGNED',
              resource: 'provider_documents',
              resource_id: docRecord?.id,
              details: {
                document_type: 'PSA',
                signed_at: new Date().toISOString(),
                organization: psaData?.organization?.legalName
              }
            });
        }
      }
    } catch (error) {
      console.error("Failed to save PSA document:", error);
      // Don't block the completion flow if document save fails
    }

    // Redirect to success page
    setTimeout(() => {
      console.log("🔄 Redirecting to success page...");
      window.location.href = PSA_CONFIG.ROUTES.SUCCESS;
    }, PSA_CONFIG.TIMINGS.REDIRECT_DELAY);
  }, [completed, setCompleted, setCurrentStep, setPsaStep, psaData]);

  return { handlePSACompletion };
}