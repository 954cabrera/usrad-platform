// src/components/Providers/Onboarding/PSA/FloatingGuide.jsx
import React, { useEffect, useState } from "react";
import { PSA_CONFIG } from "../../../../scripts/providers/psa/psa.config";
import HelperButtons from "./HelperButtons";

export default function FloatingGuide({
  psaStep,
  setPsaStep,
  completed,
  onCompletion,
}) {
  const [showHelperButton, setShowHelperButton] = useState(false);
  const [helperButtonType, setHelperButtonType] = useState(null);

  useEffect(() => {
    if (completed) {
      updateFloatingGuideToComplete();
      return;
    }

    createFloatingGuide();
    setupGuideLogic();

    // Show helper button after delay
    const helperTimeout = setTimeout(() => {
      if (!completed && psaStep < 4) {
        setShowHelperButton(true);
        setHelperButtonType("signed-check");
      }
    }, PSA_CONFIG.TIMINGS.HELPER_BUTTON_DELAY);

    return () => {
      clearTimeout(helperTimeout);
      const guide = document.getElementById("floating-progress-guide");
      if (guide) guide.remove();
    };
  }, [psaStep, completed]);

  const createFloatingGuide = () => {
    const existingGuide = document.getElementById("floating-progress-guide");
    if (existingGuide) existingGuide.remove();

    const guideContainer = document.createElement("div");
    guideContainer.id = "floating-progress-guide";
    guideContainer.style.cssText = `
      position: fixed !important;
      top: 100px !important;
      right: 20px !important;
      z-index: 99999 !important;
      background: rgba(255, 255, 255, 0.95) !important;
      border: 2px solid #003087 !important;
      border-radius: 12px !important;
      padding: 16px !important;
      box-shadow: 0 8px 32px rgba(0,48,135,0.3) !important;
      max-width: 280px !important;
      min-width: 260px !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.3s ease !important;
      font-family: system-ui, -apple-system, sans-serif !important;
    `;

    guideContainer.innerHTML = `
      <div style="font-weight: bold; color: #003087; margin-bottom: 8px; font-size: 14px;">📋 PSA Signing Guide</div>
      ${PSA_CONFIG.PSA_STEPS.map(
        (step, index) => `
        <div id="${step.id}" style="color: ${index < psaStep - 1 ? "#059669" : index === psaStep - 1 ? "#f59e0b" : "#6b7280"}; font-weight: ${index === psaStep - 1 ? "700" : index < psaStep - 1 ? "600" : "500"}; font-size: 13px; margin-bottom: 4px;">
          ${index < psaStep - 1 ? "✅" : index === psaStep - 1 ? "▶️" : "⏳"} ${step.text}
        </div>
      `
      ).join("")}
      <div id="floating-instruction" style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; text-align: center;">
        ${getInstructionText(psaStep)}
      </div>
    `;

    document.body.appendChild(guideContainer);
  };

  const getInstructionText = (step) => {
    switch (step) {
      case 1:
        return "Review and sign your PSA →";
      case 2:
        return 'Keep scrolling to find "Sign Now" →';
      case 3:
        return 'Click the "Sign Now" button!';
      case 4:
        return "🎉 Signing completed!";
      default:
        return "Review and sign your PSA →";
    }
  };

  const updateFloatingGuideToComplete = () => {
    const guide = document.getElementById("floating-progress-guide");
    if (guide) {
      PSA_CONFIG.PSA_STEPS.forEach((step) => {
        const element = document.getElementById(step.id);
        if (element) {
          element.style.color = "#059669";
          element.style.fontWeight = "700";
          element.innerHTML = `✅ ${step.text}`;
        }
      });

      const instruction = document.getElementById("floating-instruction");
      if (instruction) {
        instruction.innerHTML = "🎉 All steps completed! Redirecting...";
        instruction.style.color = "#059669";
        instruction.style.fontWeight = "700";
      }

      guide.style.background = "rgba(16, 185, 129, 0.1)";
      guide.style.borderColor = "#059669";
      guide.style.borderWidth = "3px";
      guide.style.animation = "pulse 2s infinite";
    }
  };

  const setupGuideLogic = () => {
    // Don't set up scroll logic if we're already in the signing phase
    if (psaStep >= 3) return;

    let scrollTimeout;
    const handleScroll = () => {
      // Don't process scroll events if DocuSeal is navigating or if we're past step 2
      if (window.docusealNavigating || psaStep >= 3) return;

      if (scrollTimeout) return;

      scrollTimeout = setTimeout(() => {
        const scrollPercent =
          (window.pageYOffset /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;

        if (window.pageYOffset > 500 && psaStep === 1) {
          setPsaStep(2);
        }

        if (scrollPercent > 80 && psaStep === 2) {
          setPsaStep(3);
        }

        scrollTimeout = null;
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  };

  const handleButtonAction = (action) => {
    if (action === "signed") {
      setHelperButtonType("ready-continue");
    } else if (action === "continue") {
      setShowHelperButton(false);
      onCompletion();
    }
  };

  return (
    <>
      {showHelperButton && !completed && (
        <HelperButtons type={helperButtonType} onAction={handleButtonAction} />
      )}
    </>
  );
}
