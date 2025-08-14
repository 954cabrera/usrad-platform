// src/components/Providers/Onboarding/PSA/OnboardingPSA.jsx
// Enhanced with multi-center support and FIXED auto-completion issue
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

  // Multi-center specific state
  const [multiCenterConfig, setMultiCenterConfig] = useState(null);
  const [reimbursementStructure, setReimbursementStructure] = useState(null);

  // Custom hooks for data and completion handling
  const { psaData, loadOnboardingData } = usePSAData();
  const { handlePSACompletion } = usePSACompletion(
    completed,
    setCompleted,
    setCurrentStep,
    setPsaStep,
    psaData
  );

  // Load multi-center configuration
  const loadMultiCenterConfig = () => {
    try {
      // Load role
      const role = localStorage.getItem("usrad_role") || "center-admin";

      // Load multi-center selection
      const multiSelection = localStorage.getItem("usrad_multi_selection");
      const parsedMultiSelection = multiSelection
        ? JSON.parse(multiSelection)
        : null;

      // Load state rates (legacy support)
      const stateRates = localStorage.getItem("usrad_state_rates");
      const parsedStateRates = stateRates ? JSON.parse(stateRates) : {};

      const config = {
        role,
        multiSelection: parsedMultiSelection,
        stateRates: parsedStateRates,
      };

      setMultiCenterConfig(config);

      // Generate reimbursement structure
      const structure = generateReimbursementStructure(config);
      setReimbursementStructure(structure);

      console.log("📊 Multi-center config loaded:", config);
      console.log("💰 Reimbursement structure:", structure);

      return config;
    } catch (error) {
      console.error("Error loading multi-center config:", error);
      return { role: "center-admin", multiSelection: null, stateRates: {} };
    }
  };

  // Generate reimbursement structure based on configuration
  const generateReimbursementStructure = (config) => {
    const { multiSelection, stateRates } = config;

    // Check multi-selection first (new format)
    if (
      multiSelection &&
      multiSelection.stateRates &&
      Object.keys(multiSelection.stateRates).length > 0
    ) {
      const states = Object.keys(multiSelection.stateRates).sort();

      if (states.length === 1) {
        const state = states[0];
        const rate = multiSelection.stateRates[state];
        return {
          type: "single-state",
          display: `${rate}% of Medicare Allowable for all ${state} facilities`,
          rate,
          state,
          stateRates: multiSelection.stateRates,
        };
      }

      return {
        type: "multi-state",
        display: `State-based rates across ${states.length} states`,
        stateRates: multiSelection.stateRates,
        states,
        summary: `${states.length} states with customized rates`,
      };
    }

    // Check legacy state rates
    if (stateRates && Object.keys(stateRates).length > 0) {
      const states = Object.keys(stateRates).sort();
      return {
        type: "multi-state",
        display: `State-based rates across ${states.length} states`,
        stateRates,
        states,
        summary: `${states.length} states with customized rates`,
      };
    }

    // Default uniform rate
    return {
      type: "uniform",
      display: "100% of Medicare Allowable for all facilities",
      rate: 100,
    };
  };

  // UPDATED: Generate complete Exhibit A content (rates + standard language) - WITHOUT heading
  const generateExhibitA = (structure, facilities = []) => {
    const facilitiesCount = facilities.length || 1;

    // Standard language that appears after rates for all agreements
    const standardLanguage = `

These rates apply to all payor sources routed through USRad (consumer, insurance, workers' comp, auto, etc.) and represent payment in full.

**Alternate Rates:** Provider may request different reimbursement rates in writing. USRad approval required. Provider acknowledges that higher rates may reduce patient volume on the USRad marketplace platform.

**Payment Terms:** Rates constitute payment in full. No additional billing to patients or third parties permitted.`;

    if (structure.type === "uniform") {
      return `**Agreed Reimbursement Rate:** ${structure.rate}% of Medicare Allowable (Technical + Professional Components)

Total Authorized Locations: ${facilitiesCount}${standardLanguage}`;
    }

    if (structure.type === "single-state") {
      return `**Agreed Reimbursement Rate:** ${structure.rate}% of Medicare Allowable (Technical + Professional Components)
**State:** ${structure.state} (${facilitiesCount} ${facilitiesCount === 1 ? "facility" : "facilities"})${standardLanguage}`;
    }

    if (structure.type === "multi-state") {
      const { stateRates } = structure;

      // Calculate weighted average
      let totalWeightedRate = 0;
      let totalFacilities = 0;

      const stateEntries = Object.entries(stateRates)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([state, rate]) => {
          const stateFacilities = facilities.filter((f) => f.state === state);
          const facilityCount = stateFacilities.length;

          // Add to weighted average calculation
          totalWeightedRate += rate * facilityCount;
          totalFacilities += facilityCount;

          return `${state}: ${rate}% of Medicare Allowable (${facilityCount} ${facilityCount === 1 ? "facility" : "facilities"})`;
        })
        .join("\n");

      const portfolioAverage =
        totalFacilities > 0
          ? Math.round(totalWeightedRate / totalFacilities)
          : 100;

      return `**State-Based Reimbursement Rates (Technical + Professional Components):**
${stateEntries}

**Agreed Reimbursement Rate:** ${portfolioAverage}% of Medicare Allowable (Portfolio Average)
Total Authorized Locations: ${facilitiesCount}

This rate structure reflects market-based pricing optimized for competitive positioning in each state.${standardLanguage}`;
    }

    // Fallback
    return `**Agreed Reimbursement Rate:** 100% of Medicare Allowable (Technical + Professional Components)

Total Authorized Locations: ${facilitiesCount}${standardLanguage}`;
  };

  const generateExhibitB = (structure, facilities = []) => {
    const facilitiesCount = facilities.length || 1;

    if (structure.type === "uniform") {
      return `EXHIBIT B: REIMBURSEMENT RATES

All Provider facilities will receive ${structure.rate}% of Medicare Allowable rates for all services performed under this Agreement.

Total Authorized Locations: ${facilitiesCount}

Payment Terms: Net 10 days from receipt of completed claim.`;
    }

    if (structure.type === "single-state") {
      return `EXHIBIT B: REIMBURSEMENT RATES

All Provider facilities in ${structure.state} will receive ${structure.rate}% of Medicare Allowable rates for all services performed under this Agreement.

Total Authorized Locations: ${facilitiesCount}

Payment Terms: Net 10 days from receipt of completed claim.`;
    }

    if (structure.type === "multi-state") {
      const { stateRates } = structure;
      const stateEntries = Object.entries(stateRates)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([state, rate]) => {
          const stateFacilities = facilities.filter((f) => f.state === state);
          return `${state}: ${rate}% of Medicare Allowable (${stateFacilities.length} facilities)`;
        })
        .join("\n");

      return `EXHIBIT B: REIMBURSEMENT RATES

State-Based Reimbursement Structure:
${stateEntries}

Total Authorized Locations: ${facilitiesCount}

This rate structure reflects market-based pricing optimized for competitive positioning in each state.

Payment Terms: Net 10 days from receipt of completed claim.`;
    }

    return `EXHIBIT B: REIMBURSEMENT RATES

Standard reimbursement at 100% of Medicare Allowable rates.

Total Authorized Locations: ${facilitiesCount}

Payment Terms: Net 10 days from receipt of completed claim.`;
  };

  // Initialize PSA with onboarding data
  const initializePSA = async () => {
    console.log("🚀 Initializing PSA for onboarding...");

    try {
      // Load multi-center configuration first
      const multiConfig = loadMultiCenterConfig();

      // Load standard onboarding data
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

  // Create a helper function for consistent date formatting
  const formatDateUS = (date = new Date()) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Enhanced start signing process with multi-center support
  const startSigning = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!psaData) {
        throw new Error("No data available for signing");
      }

      if (!reimbursementStructure) {
        throw new Error("No reimbursement structure configured");
      }

      // Build enhanced submitter values with multi-center support
      const submitterValues = {
        // Basic provider information
        primary_contact_name: psaData.signer.fullName || "",
        primary_contact_phone: psaData.signer.phone || "",
        primary_contact_email: psaData.signer.email || "",
        provider_name: psaData.organization.legalName || "",
        provider_email: psaData.signer.email || "",
        provider_phone: psaData.signer.phone || "",
        tax_id: psaData.organization.taxId || "",
        signer_name: psaData.signer.fullName || "",
        signer_title: psaData.signer.title || "",

        // Facility information
        total_authorized_locations: psaData.centers.length.toString(),
        primary_facility_name:
          psaData.centers[0]?.name || psaData.organization.legalName || "",

        // Date information
        agreement_date: formatDateUS(),
        provider_date: formatDateUS(),
        effective_date: formatDateUS(),

        // Reimbursement structure
        reimbursement_structure: reimbursementStructure.type,
        reimbursement_display: reimbursementStructure.display,

        // Legacy medicare_rate for backward compatibility
        medicare_rate: reimbursementStructure.rate || "100",

        // Generate exhibit content - UPDATED to use new format
        exhibit_a_rates: generateExhibitA(
          reimbursementStructure,
          psaData.centers
        ),
        exhibit_b_content: generateExhibitB(
          reimbursementStructure,
          psaData.centers
        ),
      };

      // Add multi-state specific fields if applicable
      if (reimbursementStructure.type === "multi-state") {
        submitterValues.state_rates_json = JSON.stringify(
          reimbursementStructure.stateRates
        );
        submitterValues.states_list = reimbursementStructure.states.join(", ");
        submitterValues.multi_state_summary = reimbursementStructure.summary;
      }

      // Add role information
      if (multiCenterConfig) {
        submitterValues.provider_role = multiCenterConfig.role;
        submitterValues.provider_type = multiCenterConfig.role
          .replace("-", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }

      console.log("📤 Enhanced submitter values:", submitterValues);

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

      console.log("📋 Full PSA payload:", payload);

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

  // FIXED: Completion detection without auto-completion timer
  useEffect(() => {
    if (!embedSrc) return;

    const handleMessage = (event) => {
      console.log("📡 DocuSeal Message:", event.data);

      if (
        event.data?.type === "docuseal:completed" ||
        event.data?.type === "submission:completed" ||
        event.data?.status === "completed"
      ) {
        console.log("✅ PSA completion detected via message!");
        setTimeout(() => {
          showSignedCheckButton();
        }, 1500);
      }
    };

    // Enhanced polling for completion detection
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
            (bodyText.includes("download") && bodyText.includes("signed")) ||
            bodyText.includes("document completed") ||
            bodyText.includes("successfully signed")
          ) {
            console.log("✅ PSA completion detected via polling!");
            console.log(
              "📊 Agreement type:",
              reimbursementStructure?.type || "uniform"
            );
            console.log("🏢 Facilities:", psaData?.centers?.length || 0);

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

    // REMOVED: The problematic 15-second auto-completion timer
    // This was causing automatic completion without actual signing

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(pollForCompletion);
    };
  }, [embedSrc, completed, reimbursementStructure, psaData]);

  // Helper function for completion detection (only called when actually completed)
  const showSignedCheckButton = () => {
    if (!completed) {
      console.log("🎉 Triggering PSA completion...");
      handlePSACompletion();
    }
  };

  // Render loading state
  if (loading && currentStep === 1) {
    return (
      <div className="psa-onboarding-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your information...</p>
          {multiCenterConfig?.role !== "center-admin" && (
            <p className="loading-detail">
              Preparing multi-center agreement...
            </p>
          )}
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

  // Enhanced PSA data for review section
  const enhancedPSAData = psaData
    ? {
        ...psaData,
        reimbursementStructure,
        multiCenterConfig,
        // Add revenue projections if available
        projections: multiCenterConfig?.multiSelection?.projections || null,
      }
    : null;

  return (
    <div className="psa-onboarding-container">
      <PSASteps currentStep={currentStep} />

      {enhancedPSAData && !loading && !embedSrc && currentStep === 1 && (
        <PSAReviewSection
          psaData={enhancedPSAData}
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
