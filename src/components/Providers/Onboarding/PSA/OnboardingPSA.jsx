// src/components/Providers/Onboarding/PSA/OnboardingPSA.jsx
import React, { useState, useEffect } from "react";
import PSASteps from "./PSASteps";
import PSAReviewSection from "./PSAReviewSection";
import PSASigningSection from "./PSASigningSection";
import PSACompletionSection from "./PSACompletionSection";
import FloatingGuide from "./FloatingGuide";
import { usePSAData } from "../../hooks/usePSAData";
import { usePSACompletion } from "../../hooks/usePSACompletion";
import { PSA_CONFIG } from "../../../../scripts/providers/psa/psa.config";

export default function OnboardingPSA() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [psaStep, setPsaStep] = useState(1);

  // Custom hooks for data and completion handling
  const { psaData, loadOnboardingData } = usePSAData();
  const { handlePSACompletion } = usePSACompletion(
    completed,
    setCompleted,
    setCurrentStep,
    setPsaStep,
    psaData
  );

  // Initialize PSA with onboarding data
  const initializePSA = async () => {
    console.log("🚀 Initializing PSA for onboarding...");

    try {
      const data = loadOnboardingData();
      if (!data) {
        throw new Error(
          "No onboarding data found. Please complete previous steps."
        );
      }

      setLoading(false);
      setCurrentStep(1);
    } catch (err) {
      console.error("❌ PSA initialization failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Start signing process
  const startSigning = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!psaData) {
        throw new Error("No data available for signing");
      }

      // Build submitter values from collected data
      const submitterValues = {
        primary_contact_name: psaData.signer.fullName || "",
        primary_contact_phone: psaData.signer.phone || "",
        primary_contact_email: psaData.signer.email || "",
        provider_name: psaData.organization.legalName || "",
        provider_email: psaData.signer.email || "",
        provider_phone: psaData.signer.phone || "",
        tax_id: psaData.organization.taxId || "",
        signer_name: psaData.signer.fullName || "",
        signer_title: psaData.signer.title || "",
        total_authorized_locations: psaData.centers.length.toString(),
        agreement_date: new Date().toLocaleDateString("en-US"),
        provider_date: new Date().toLocaleDateString("en-US"),
        medicare_rate: psaData.pricing.percentage || "100",
      };

      console.log("📤 Submitter values:", submitterValues);

      const payload = {
        template_id: PSA_CONFIG.TEMPLATE_ID,
        send_email: false,
        submitters: [
          {
            role: "Provider",
            name: psaData.signer.fullName || "Provider",
            email: psaData.signer.email || "",
            values: submitterValues,
          },
        ],
      };

      const response = await fetch(PSA_CONFIG.API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create submission");
      }

      const result = await response.json();
      console.log("✅ DocuSeal response:", result);

      const signingUrl = result.embed_url;

      if (signingUrl) {
        console.log("🎯 Got signing URL:", signingUrl);
        setEmbedSrc(signingUrl);
        setCurrentStep(2);
        setLoading(false);
      } else {
        throw new Error("No signing URL returned");
      }
    } catch (err) {
      console.error("❌ Signing start failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initializePSA();
  }, []);

  // Load DocuSeal script when we have embedSrc
  useEffect(() => {
    if (!embedSrc) return;

    const script = document.createElement("script");
    script.src = PSA_CONFIG.DOCUSEAL_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [embedSrc]);

  // Replace your diagnostic useEffect with this simpler version
  // Simple completion detection like the original
  useEffect(() => {
    if (!embedSrc) return;

    // Just listen for messages and check for completion
    const handleMessage = (event) => {
      console.log("📡 DocuSeal Message:", event.data);

      if (
        event.data?.type === "docuseal:completed" ||
        event.data?.type === "submission:completed" ||
        event.data?.status === "completed"
      ) {
        console.log("✅ PSA completion detected!");
        setTimeout(() => {
          showSignedCheckButton();
        }, 1500);
      }
    };

    // Simple polling like the original
    const pollForCompletion = setInterval(() => {
      if (completed) {
        clearInterval(pollForCompletion);
        return;
      }

      try {
        const iframe = document.querySelector("docuseal-form iframe");
        if (iframe?.contentDocument) {
          const bodyText =
            iframe.contentDocument.body?.textContent?.toLowerCase() || "";

          if (
            bodyText.includes("document has been signed") ||
            bodyText.includes("send copy via email") ||
            (bodyText.includes("download") && bodyText.includes("signed"))
          ) {
            console.log("✅ PSA completion detected via text!");

            setTimeout(() => {
              showSignedCheckButton();
            }, 1500);

            clearInterval(pollForCompletion);
            return;
          }
        }
      } catch (e) {
        // Cross-origin restrictions - expected
      }
    }, 3000);

    // Show helper button after 15 seconds like the original
    const showGreenHelper = setTimeout(() => {
      if (!completed) {
        console.log("⏰ 15 seconds elapsed, showing helper button");
        showSignedCheckButton();
      }
    }, 15000);

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(pollForCompletion);
      clearTimeout(showGreenHelper);
    };
  }, [embedSrc, completed]);

  // Render loading state
  if (loading && currentStep === 1) {
    return (
      <div className="psa-onboarding-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your information...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !embedSrc) {
    return (
      <div className="psa-onboarding-container">
        <div className="error-container">
          <h3>Unable to load agreement</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="psa-onboarding-container">
      <PSASteps currentStep={currentStep} />

      {psaData && !loading && !embedSrc && currentStep === 1 && (
        <PSAReviewSection
          psaData={psaData}
          onStartSigning={startSigning}
          loading={loading}
        />
      )}

      {embedSrc && currentStep >= 2 && !completed && (
        <>
          <PSASigningSection embedSrc={embedSrc} />
          <FloatingGuide
            psaStep={psaStep}
            setPsaStep={setPsaStep}
            completed={completed}
            onCompletion={handlePSACompletion}
          />
        </>
      )}

      {completed && <PSACompletionSection />}
    </div>
  );
}