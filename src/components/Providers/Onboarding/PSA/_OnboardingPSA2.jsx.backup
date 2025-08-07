// src/components/Providers/Onboarding/PSA/OnboardingPSA.jsx
import React, { useState, useEffect } from 'react';

export default function OnboardingPSA() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [psaData, setPsaData] = useState(null);
  const [psaStep, setPsaStep] = useState(1); // For tracking progress

  // Enhanced floating guide update function for completion
  const updateFloatingGuideToComplete = () => {
    const guide = document.getElementById("floating-progress-guide");
    if (guide) {
      const steps = [
        { id: "floating-step-1", text: "Step 1: Review Agreement" },
        { id: "floating-step-2", text: "Step 2: Scroll to Bottom" },
        { id: "floating-step-3", text: 'Step 3: Click "Sign Now"' },
        { id: "floating-step-4", text: "Step 4: Complete Signing" },
      ];

      // Mark all steps as complete
      steps.forEach((step, index) => {
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

      // Add celebration styling to the entire guide
      guide.style.background = "rgba(16, 185, 129, 0.1)";
      guide.style.borderColor = "#059669";
      guide.style.borderWidth = "3px";
      guide.style.animation = "pulse 2s infinite";

      // Add pulse animation if it doesn't exist
      if (!document.getElementById("pulse-animation")) {
        const style = document.createElement("style");
        style.id = "pulse-animation";
        style.textContent = `
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  // Enhanced PSA completion handler
  const handlePSACompletion = async () => {
    if (completed) return; // Prevent multiple triggers

    console.log("🎉 PSA Completion Handler Called!");
    setCompleted(true);
    setCurrentStep(3);
    setPsaStep(4);

    // Remove any helper buttons
    const greenButton = document.getElementById("signed-check-button");
    const redButton = document.getElementById("ready-to-continue-button");
    if (greenButton) greenButton.remove();
    if (redButton) redButton.remove();

    // Update floating guide immediately with all steps complete
    updateFloatingGuideToComplete();

    // TRIGGER ENHANCED CONFETTI! 🎉
    createEnhancedConfettiCelebration();

    // Save completion status
    localStorage.setItem("psa_signed", "true");
    localStorage.setItem("psa_signed_date", new Date().toISOString());

    // Show completion message with next steps
    showCompletionMessage();

    // Redirect to success or next step
    setTimeout(() => {
      console.log("🔄 Redirecting to success page...");
      window.location.href = "/providers/onboarding/success";
    }, 8000); // Changed from 4000ms to 8000ms
  }; // <-- ADD THIS LINE

  // Enhanced confetti celebration
  const createEnhancedConfettiCelebration = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      pointer-events: none !important;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 200;

    const colors = [
      "#003087", // USRad Navy
      "#059669", // Success Green
      "#3b82f6", // Blue
      "#f59e0b", // Gold
      "#ef4444", // Red
      "#8b5cf6", // Purple
      "#06b6d4", // Cyan
      "#10b981", // Emerald
    ];

    // Create confetti particles
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: Math.random() > 0.5 ? "square" : "circle",
        gravity: 0.15 + Math.random() * 0.1,
      });
    }

    // Animation
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        particle.vx *= 0.99;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
        }

        ctx.restore();

        if (particle.y > canvas.height + 100) {
          confetti.splice(i, 1);
        }
      }

      if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        document.body.removeChild(canvas);
      }
    }

    animateConfetti();

    // Cleanup
    setTimeout(() => {
      if (document.body.contains(canvas)) {
        canvas.style.transition = "opacity 1s ease-out";
        canvas.style.opacity = "0";
        setTimeout(() => {
          if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
          }
        }, 1000);
      }
    }, 6000);
  };

  // Show completion message overlay
  const showCompletionMessage = () => {
    const overlay = document.createElement("div");
    overlay.id = "completion-overlay";
    overlay.style.cssText = `
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 999998 !important;
    background: white !important;
    border: 3px solid #059669 !important;
    border-radius: 16px !important;
    padding: 32px !important;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
    text-align: center !important;
    min-width: 450px !important;
    animation: slideIn 0.5s ease-out !important;
  `;

    overlay.innerHTML = `
    <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
    <h2 style="color: #003087; font-size: 24px; font-weight: bold; margin-bottom: 12px;">
      PSA Completed Successfully!
    </h2>
    <p style="color: #6b7280; font-size: 16px; margin-bottom: 20px;">
      Welcome to the USRad Network! You're now ready to start serving patients.
    </p>
    
    <!-- Email Notification Section -->
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #3b82f6;">
      <p style="color: #1d4ed8; font-size: 15px; font-weight: 600; margin-bottom: 4px;">
        📧 Check Your Email!
      </p>
      <p style="color: #2563eb; font-size: 14px;">
        Your signed agreement has been sent to <strong>${psaData.signer.email || "your email"}</strong>
      </p>
    </div>
    
    <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
      <p style="color: #059669; font-size: 14px; font-weight: 600;">
        ✅ Provider Service Agreement Signed<br>
        ✅ Network Access Approved<br>
        ✅ Onboarding Complete
      </p>
    </div>
    <p style="color: #9ca3af; font-size: 14px;">
      Redirecting to complete your setup...
    </p>
  `;

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -60%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  `;
    document.head.appendChild(style);

    document.body.appendChild(overlay);

    // Remove overlay before redirect - EXTENDED TIME
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.style.transition = "opacity 0.5s ease-out";
        overlay.style.opacity = "0";
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 500);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 6000); // Changed from 3500ms to 6000ms
  };

  // Helper buttons for stuck users
  const showSignedCheckButton = () => {
    const existingGreen = document.getElementById("signed-check-button");
    const existingRed = document.getElementById("ready-to-continue-button");
    if (existingGreen) existingGreen.remove();
    if (existingRed) existingRed.remove();

    const greenButton = document.createElement("div");
    greenButton.id = "signed-check-button";
    greenButton.style.cssText = `
    position: fixed !important;
    bottom: 80px !important;
    right: 20px !important;
    z-index: 99999 !important;
    background: #f59e0b !important;
    color: white !important;
    padding: 20px 28px !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(245, 158, 11, 0.4) !important;
    cursor: pointer !important;
    font-family: system-ui, -apple-system, sans-serif !important;
    font-weight: 600 !important;
    text-align: center !important;
    border: none !important;
    transition: all 0.3s ease !important;
    max-width: 360px !important;
    animation: slideInUp 0.5s ease-out !important;
  `;

    greenButton.innerHTML = `
    <div style="font-size: 16px; margin-bottom: 6px;">📝 Have you signed the PSA?</div>
    <div style="font-size: 13px; margin-bottom: 8px; opacity: 0.9; line-height: 1.4;">
      DocuSeal may ask you to review each field.<br>
      After reviewing, click here:
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 700;">
      ✅ Yes, I've Signed & Reviewed
    </div>
  `;

    // Update the floating guide
    const guide = document.getElementById("floating-progress-guide");
    if (guide) {
      const instruction = document.getElementById("floating-instruction");
      if (instruction) {
        instruction.innerHTML =
          "📋 DocuSeal may prompt you to review fields. Click below when done.";
        instruction.style.color = "#f59e0b";
        instruction.style.fontWeight = "700";
      }
    }

    greenButton.addEventListener("click", () => {
      console.log("✅ User confirmed they have signed");
      greenButton.remove();
      showReadyToContinueButton();
    });

    greenButton.addEventListener("mouseenter", () => {
      greenButton.style.transform = "scale(1.05)";
      greenButton.style.background = "#d97706";
    });

    greenButton.addEventListener("mouseleave", () => {
      greenButton.style.transform = "scale(1)";
      greenButton.style.background = "#f59e0b";
    });

    // Add slide-in animation
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(100px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
    document.head.appendChild(style);

    document.body.appendChild(greenButton);
  };

  const showReadyToContinueButton = () => {
    const redButton = document.createElement("div");
    redButton.id = "ready-to-continue-button";
    redButton.style.cssText = `
    position: fixed !important;
    bottom: 80px !important;
    right: 20px !important;
    z-index: 99999 !important;
    background: #22c55e !important;
    color: white !important;
    padding: 20px 28px !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4) !important;
    cursor: pointer !important;
    font-family: system-ui, -apple-system, sans-serif !important;
    font-weight: 600 !important;
    text-align: center !important;
    border: none !important;
    transition: all 0.3s ease !important;
    max-width: 320px !important;
    animation: slideInUp 0.5s ease-out !important;
  `;

    redButton.innerHTML = `
    <div style="font-size: 16px; margin-bottom: 6px;">🎉 Ready to continue?</div>
    <div style="font-size: 13px; margin-bottom: 12px; opacity: 0.9;">
      Click below to complete your onboarding:
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 700;">
      🚀 Continue
    </div>
  `;

    redButton.addEventListener("click", () => {
      console.log("🎉 User ready to continue - triggering completion!");
      redButton.remove();
      handlePSACompletion();
    });

    redButton.addEventListener("mouseenter", () => {
      redButton.style.transform = "scale(1.05)";
      redButton.style.background = "#059669";
    });

    redButton.addEventListener("mouseleave", () => {
      redButton.style.transform = "scale(1)";
      redButton.style.background = "#22c55e";
    });

    document.body.appendChild(redButton);

    // Update floating guide
    const guide = document.getElementById("floating-progress-guide");
    if (guide) {
      const instruction = document.getElementById("floating-instruction");
      if (instruction) {
        instruction.innerHTML =
          "🎉 Ready? Click the green button to continue →";
        instruction.style.color = "#22c55e";
        instruction.style.fontWeight = "700";
      }
    }
  };

  // Create floating progress guide
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
      <div id="floating-step-1" style="color: #059669; font-weight: 600; font-size: 13px; margin-bottom: 4px;">✅ Step 1: Review Agreement</div>
      <div id="floating-step-2" style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">⏳ Step 2: Scroll to Bottom</div>
      <div id="floating-step-3" style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">⏳ Step 3: Click "Sign Now"</div>
      <div id="floating-step-4" style="color: #6b7280; font-size: 13px; margin-bottom: 8px;">⏳ Step 4: Complete Signing</div>
      <div id="floating-instruction" style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; text-align: center;">
        Review and sign your PSA →
      </div>
    `;

    document.body.appendChild(guideContainer);
    setupGuideLogic();
  };

  // Setup guide progress logic
  const setupGuideLogic = () => {
    let currentPsaStep = 1;

    const updateFloatingGuide = (step) => {
      if (step === currentPsaStep) return; // Don't update if same step

      currentPsaStep = step;
      setPsaStep(step);

      const stepElements = [
        { id: "floating-step-1", text: "Step 1: Review Agreement" },
        { id: "floating-step-2", text: "Step 2: Scroll to Bottom" },
        { id: "floating-step-3", text: 'Step 3: Click "Sign Now"' },
        { id: "floating-step-4", text: "Step 4: Complete Signing" },
      ];

      stepElements.forEach((step_info, index) => {
        const element = document.getElementById(step_info.id);
        if (element) {
          const stepNumber = index + 1;

          if (stepNumber < step) {
            element.style.color = "#059669";
            element.style.fontWeight = "600";
            element.innerHTML = `✅ ${step_info.text}`;
          } else if (stepNumber === step) {
            element.style.color = "#f59e0b";
            element.style.fontWeight = "700";
            element.innerHTML = `▶️ ${step_info.text}`;
          } else {
            element.style.color = "#9ca3af";
            element.style.fontWeight = "500";
            element.innerHTML = `⏳ ${step_info.text}`;
          }
        }
      });

      const instruction = document.getElementById("floating-instruction");
      if (instruction) {
        switch (step) {
          case 1:
            instruction.innerHTML = "Review and sign your PSA →";
            instruction.style.color = "#6b7280";
            break;
          case 2:
            instruction.innerHTML = 'Keep scrolling to find "Sign Now" →';
            instruction.style.color = "#f59e0b";
            instruction.style.fontWeight = "600";
            break;
          case 3:
            instruction.innerHTML = 'Click the "Sign Now" button!';
            instruction.style.color = "#dc2626";
            instruction.style.fontWeight = "700";
            break;
          case 4:
            instruction.innerHTML = "🎉 Signing completed!";
            instruction.style.color = "#059669";
            instruction.style.fontWeight = "700";
            break;
        }
      }
    };

    // More aggressive scroll detection
    let lastScrollY = 0;

    const checkScrollProgress = () => {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (currentScrollY / (docHeight - winHeight)) * 100;

      console.log(
        `Scroll: ${scrollPercent.toFixed(1)}%, Step: ${currentPsaStep}`
      );

      // Update to step 2 after minimal scrolling
      if (currentScrollY > 500 && currentPsaStep === 1) {
        updateFloatingGuide(2);
      }

      // Update to step 3 when near bottom (80% scrolled)
      if (scrollPercent > 80 && currentPsaStep === 2) {
        updateFloatingGuide(3);
      }

      // Alternative: Check if "Sign Now" button is visible
      const signButton = document.querySelector('button[type="submit"]');
      const docusealButton = document.querySelector(".docuseal-button");
      const anyButton = document.querySelector('[data-testid="sign-button"]');

      if ((signButton || docusealButton || anyButton) && currentPsaStep === 2) {
        updateFloatingGuide(3);
      }

      lastScrollY = currentScrollY;
    };

    // Check scroll every second
    const scrollInterval = setInterval(checkScrollProgress, 1000);

    // Also check on actual scroll events (throttled)
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;

      scrollTimeout = setTimeout(() => {
        checkScrollProgress();
        scrollTimeout = null;
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    // Force update to step 2 after 5 seconds if still on step 1
    setTimeout(() => {
      if (currentPsaStep === 1) {
        updateFloatingGuide(2);
      }
    }, 5000);

    // Force update to step 3 after 15 seconds if still on step 2
    setTimeout(() => {
      if (currentPsaStep === 2) {
        updateFloatingGuide(3);
      }
    }, 15000);

    // Cleanup
    window.addEventListener("beforeunload", () => {
      clearInterval(scrollInterval);
      window.removeEventListener("scroll", handleScroll);
    });

    return () => {
      clearInterval(scrollInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  };

  // Load data from localStorage (collected in previous steps)
  const loadOnboardingData = () => {
    try {
      console.log("Loading onboarding data from localStorage...");

      const orgDataStr = localStorage.getItem("provider_organization");
      console.log("Organization data string:", orgDataStr);
      const orgData = orgDataStr ? JSON.parse(orgDataStr) : {};

      const centersStr = localStorage.getItem("provider_centers");
      console.log("Centers data string:", centersStr);
      const centers = centersStr ? JSON.parse(centersStr) : [];

      const pricingStr = localStorage.getItem("selected_rate_strategy");
      console.log("Pricing data string:", pricingStr);
      const pricing = pricingStr ? JSON.parse(pricingStr) : {};

      const primaryCenter =
        centers.find((c) => c.isPrimary) || centers[0] || {};

      const data = {
        organization: orgData,
        centers: centers,
        primaryCenter: primaryCenter,
        pricing: pricing,
        signer: orgData.signer || {},
      };

      console.log("📊 Loaded onboarding data:", data);
      setPsaData(data);
      return data;
    } catch (error) {
      console.error("Error loading onboarding data:", error);
      setError("Failed to load onboarding data: " + error.message);
      return null;
    }
  };

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
        medicare_rate: psaData.pricing.percentage || "100", // New field!
      };

      console.log("📤 Submitter values:", submitterValues);

      const payload = {
        template_id: 1155842,
        send_email: false, // Prevents automatic email
        submitters: [
          {
            role: "Provider",
            name: psaData.signer.fullName || "Provider",
            email: psaData.signer.email || "",
            values: submitterValues,
          },
        ],
      };

      console.log("📤 DocuSeal payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("/api/docuseal/create-submission", {
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
        console.error("No signing URL found in response:", result);
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
    script.src = "https://cdn.docuseal.com/js/form.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [embedSrc]);

  // Create floating guide when PSA is embedded
  useEffect(() => {
    if (embedSrc && currentStep === 2) {
      setTimeout(() => createFloatingGuide(), 1000);
    }

    return () => {
      const guide = document.getElementById("floating-progress-guide");
      if (guide) guide.remove();
    };
  }, [embedSrc, currentStep]);

  // Listen for completion and show helper buttons
  useEffect(() => {
    if (!embedSrc) return;

    // Method 1: Try automatic detection first
    const handleMessage = (event) => {
      console.log("📡 DocuSeal Message:", event.data);
      console.log("📡 Message origin:", event.origin);

      if (
        event.data?.type === "docuseal:completed" ||
        event.data?.type === "submission:completed" ||
        event.data?.status === "completed" ||
        event.data?.action === "completed" ||
        event.data?.event === "completed"
      ) {
        console.log("✅ PSA completion detected automatically!");

        const floatingGuide = document.getElementById(
          "floating-progress-guide"
        );
        if (floatingGuide) {
          const instruction = document.getElementById("floating-instruction");
          if (instruction) {
            instruction.innerHTML =
              "📋 DocuSeal will now ask you to review each field. After reviewing, click the green button below.";
            instruction.style.color = "#f59e0b";
            instruction.style.fontWeight = "700";
            instruction.style.fontSize = "12px";
          }
        }

        setTimeout(() => {
          showSignedCheckButton();
        }, 1500);
      }
    };

    // Method 2: Check for completion text in document
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

          if (bodyText.length > 0) {
            console.log(
              "🔍 DocuSeal text preview:",
              bodyText.substring(0, 100)
            );
          }

          if (
            bodyText.includes("document has been signed") ||
            bodyText.includes("send copy via email") ||
            (bodyText.includes("download") && bodyText.includes("signed"))
          ) {
            console.log("✅ PSA completion detected via text!");

            const floatingGuide = document.getElementById(
              "floating-progress-guide"
            );
            if (floatingGuide) {
              const instruction = document.getElementById(
                "floating-instruction"
              );
              if (instruction) {
                instruction.innerHTML =
                  "📋 DocuSeal will now ask you to review each field. After reviewing, click the green button below.";
                instruction.style.color = "#f59e0b";
                instruction.style.fontWeight = "700";
                instruction.style.fontSize = "12px";
              }
            }

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

    // Method 3: Show green helper button after 15 seconds
    const showGreenHelper = setTimeout(() => {
      if (!completed) {
        console.log("⏰ 15 seconds elapsed, showing helper button");

        const floatingGuide = document.getElementById(
          "floating-progress-guide"
        );
        if (floatingGuide) {
          const instruction = document.getElementById("floating-instruction");
          if (instruction) {
            const step4Element = document.getElementById("floating-step-4");
            if (step4Element) {
              step4Element.style.color = "#f59e0b";
              step4Element.style.fontWeight = "700";
              step4Element.innerHTML = "▶️ Step 4: Complete Signing";
            }

            instruction.innerHTML =
              "📋 If you've signed, DocuSeal may ask you to review each field. Click the button below when ready.";
            instruction.style.color = "#f59e0b";
            instruction.style.fontWeight = "700";
            instruction.style.fontSize = "12px";
          }
        }
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
        <style jsx>{`
          .psa-onboarding-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
          }
          .loading-container {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
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
        <style jsx>{`
          .psa-onboarding-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
          }
          .error-container {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          }
          .error-container h3 {
            color: #dc2626;
            margin-bottom: 1rem;
          }
          .error-container p {
            color: #6b7280;
            margin-bottom: 1.5rem;
          }
          .error-container button {
            margin-top: 1rem;
            background: #ef4444;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
          .error-container button:hover {
            background: #dc2626;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="psa-onboarding-container">
      {/* Progress Steps */}
      <div className="psa-steps">
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
          <span className="step-number">1</span>
          <span className="step-label">Review Information</span>
        </div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
          <span className="step-number">2</span>
          <span className="step-label">Sign Agreement</span>
        </div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
          <span className="step-number">3</span>
          <span className="step-label">Complete</span>
        </div>
      </div>

      {psaData && !loading && !embedSrc && currentStep === 1 && (
        <div className="review-container">
          <h2>Review Your Information</h2>

          <div className="info-section">
            <h3>Organization</h3>
            <p>
              <strong>Name:</strong>{" "}
              {psaData.organization.legalName || "Not provided"}
            </p>
            <p>
              <strong>Tax ID:</strong>{" "}
              {psaData.organization.taxId || "Not provided"}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {psaData.organization.businessType || "Not provided"}
            </p>
          </div>

          <div className="info-section">
            <h3>Authorized Signer</h3>
            <p>
              <strong>Name:</strong> {psaData.signer.fullName || "Not provided"}
            </p>
            <p>
              <strong>Title:</strong> {psaData.signer.title || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {psaData.signer.email || "Not provided"}
            </p>
          </div>

          <div className="info-section">
            <h3>Centers & Pricing</h3>
            <p>
              <strong>Total Centers:</strong> {psaData.centers.length}
            </p>
            <p>
              <strong>Medicare Rate:</strong>{" "}
              {psaData.pricing.percentage || 100}%
            </p>
          </div>

          <button
            className="continue-btn"
            onClick={startSigning}
            disabled={loading}
          >
            {loading ? "Preparing..." : "Continue to Sign"}
          </button>
        </div>
      )}

      {embedSrc && currentStep >= 2 && !completed && (
        <div className="signing-container">
          <div className="signing-instructions">
            <p>📝 Please review and sign the agreement below</p>
          </div>

          <div
            className="docuseal-embed"
            dangerouslySetInnerHTML={{
              __html: `<docuseal-form data-src="${embedSrc}"></docuseal-form>`,
            }}
          />
        </div>
      )}

      {completed && (
        <div className="completion-container">
          <div className="success-icon">✅</div>
          <h2>Agreement Signed Successfully!</h2>
          <p>Your Provider Service Agreement has been completed.</p>
          <p className="redirect-message">
            Redirecting to complete your setup...
          </p>
        </div>
      )}

      <style jsx>{`
        .psa-onboarding-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
        }

        .psa-steps {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          gap: 2rem;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.5;
          transition: opacity 0.3s;
        }

        .step.active {
          opacity: 1;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .step.active .step-number {
          background: #3b82f6;
          color: white;
        }

        .loading-container,
        .error-container,
        .completion-container {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .review-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .info-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }

        .info-section h3 {
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .info-section p {
          margin: 0.25rem 0;
          color: #6b7280;
        }

        .continue-btn {
          background: #3b82f6;
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .continue-btn:hover:not(:disabled) {
          background: #2563eb;
        }

        .continue-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .signing-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .signing-instructions {
          text-align: center;
          margin-bottom: 1rem;
          padding: 1rem;
          background: #eff6ff;
          border-radius: 8px;
        }

        .docuseal-embed {
          width: 100%;
          min-height: 800px;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .redirect-message {
          color: #6b7280;
          font-style: italic;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}