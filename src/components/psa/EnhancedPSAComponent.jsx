import React, { useEffect, useState } from 'react';

export default function EnhancedPSAComponent() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced floating guide update function for completion
  const updateFloatingGuideToComplete = () => {
    const guide = document.getElementById('floating-progress-guide');
    if (guide) {
      const steps = [
        { id: 'floating-step-1', text: 'Step 1: Review Agreement' },
        { id: 'floating-step-2', text: 'Step 2: Scroll to Bottom' }, 
        { id: 'floating-step-3', text: 'Step 3: Click "Sign Now"' },
        { id: 'floating-step-4', text: 'Step 4: Complete Signing' }
      ];

      // Mark all steps as complete
      steps.forEach((step, index) => {
        const element = document.getElementById(step.id);
        if (element) {
          element.style.color = '#059669';
          element.style.fontWeight = '700';
          element.innerHTML = `✅ ${step.text}`;
        }
      });
      
      const instruction = document.getElementById('floating-instruction');
      if (instruction) {
        instruction.innerHTML = '🎉 All steps completed! Redirecting...';
        instruction.style.color = '#059669';
        instruction.style.fontWeight = '700';
      }
      
      // Add celebration styling to the entire guide
      guide.style.background = 'rgba(16, 185, 129, 0.1)';
      guide.style.borderColor = '#059669';
      guide.style.borderWidth = '3px';
      
      // Add pulsing animation to celebrate
      guide.style.animation = 'pulse 2s infinite';
      
      // Add pulse animation if it doesn't exist
      if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
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

  // File: /src/components/psa/EnhancedPSAComponent.jsx
// Replace the handlePSACompletion function with this fixed version

// Enhanced PSA completion handler with better user experience - FIXED VERSION
const handlePSACompletion = async () => {
  if (completed) return; // Prevent multiple triggers
  
  console.log('🎉 PSA Completion Handler Called!');
  setCompleted(true);
  setCurrentStep(4);
  
  // Remove any manual completion button
  const manualButton = document.getElementById('manual-completion-button');
  if (manualButton) manualButton.remove();
  
  // Remove any completion overlays
  const completionOverlay = document.getElementById('completion-detection-overlay');
  if (completionOverlay) completionOverlay.style.display = 'none';
  
  const stuckHelp = document.getElementById('stuck-user-help');
  if (stuckHelp) stuckHelp.style.display = 'none';
  
  // Update floating guide immediately with all steps complete
  updateFloatingGuideToComplete();
  
  // TRIGGER ENHANCED CONFETTI! 🎉
  createEnhancedConfettiCelebration();
  
  // Update user state in Supabase - WITH ERROR HANDLING
  try {
    const user = window.USRadUser?.user;
    if (user && user.id) {
      console.log('🔄 Updating PSA status for user:', user.id);
      
      const response = await fetch('/api/update-psa-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          psaSigned: true,
          completedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ PSA status updated successfully:', result);
      } else {
        console.log('⚠️ PSA status update failed, but continuing with completion flow');
      }
    } else {
      console.log('⚠️ No user ID available for PSA status update');
    }
  } catch (error) {
    console.log('⚠️ Could not update PSA status (non-critical):', error.message);
    // Don't fail the completion flow for this error
  }
  
  // Show completion message with next steps
  showCompletionMessage();
  
  // Redirect to onboarding page instead of main dashboard
  setTimeout(() => {
    console.log('🔄 Redirecting to onboarding dashboard...');
    window.location.href = '/dashboard/onboarding?psa_completed=true&welcome=true';
  }, 4000);
};

  // Enhanced confetti with USRad branding
  const createEnhancedConfettiCelebration = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
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
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Enhanced confetti with USRad colors and shapes
    const confetti = [];
    const confettiCount = 200; // More particles
    
    // USRad brand colors + celebration colors
    const colors = [
      '#003087', // USRad Navy
      '#059669', // Success Green
      '#3b82f6', // Blue
      '#f59e0b', // Gold
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#10b981'  // Emerald
    ];
    
    // Create diverse confetti particles
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
        shape: Math.random() > 0.5 ? 'square' : 'circle',
        gravity: 0.15 + Math.random() * 0.1
      });
    }
    
    // Animation with enhanced effects
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        
        // Add air resistance
        particle.vx *= 0.99;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        
        // Draw different shapes
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        }
        
        ctx.restore();
        
        // Remove particles that fall off screen
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
    
    // Enhanced cleanup with fade effect
    setTimeout(() => {
      if (document.body.contains(canvas)) {
        // Fade out effect
        canvas.style.transition = 'opacity 1s ease-out';
        canvas.style.opacity = '0';
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
    const overlay = document.createElement('div');
    overlay.id = 'completion-overlay';
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
      min-width: 400px !important;
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
      <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #059669; font-size: 14px; font-weight: 600;">
          ✅ Provider Service Agreement Signed<br>
          ✅ Network Access Activated<br>
          ✅ Dashboard Features Unlocked
        </p>
      </div>
      <p style="color: #9ca3af; font-size: 14px;">
        Redirecting to your dashboard in a few seconds...
      </p>
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
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
    
    // Remove overlay before redirect
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        overlay.style.transition = 'opacity 0.5s ease-out';
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 500);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 3500);
  };

  // Add this new function to show manual completion option - FIXED VERSION
const showManualCompletionButton = () => {
  // Remove any existing manual button
  const existingButton = document.getElementById('manual-completion-button');
  if (existingButton) existingButton.remove();

  const manualButton = document.createElement('div');
  manualButton.id = 'manual-completion-button';
  manualButton.style.cssText = `
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    z-index: 99999 !important;
    background: #ef4444 !important;
    color: white !important;
    padding: 16px 24px !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3) !important;
    cursor: pointer !important;
    font-family: system-ui, -apple-system, sans-serif !important;
    font-weight: 600 !important;
    text-align: center !important;
    border: none !important;
    transition: all 0.3s ease !important;
    max-width: 280px !important;
  `;
  
  manualButton.innerHTML = `
    <div style="font-size: 14px; margin-bottom: 4px;">✅ Finished signing?</div>
    <div style="font-size: 12px; margin-bottom: 8px; opacity: 0.9;">If you've completed the PSA, click here:</div>
    <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 13px;">
      Continue to Dashboard →
    </div>
  `;
  
  manualButton.addEventListener('click', () => {
    console.log('📋 Manual completion triggered by user');
    manualButton.remove();
    handlePSACompletion();
  });

  manualButton.addEventListener('mouseenter', () => {
    manualButton.style.transform = 'scale(1.05)';
    manualButton.style.background = '#dc2626';
  });

  manualButton.addEventListener('mouseleave', () => {
    manualButton.style.transform = 'scale(1)';
    manualButton.style.background = '#ef4444';
  });
  
  document.body.appendChild(manualButton);

  // Also update the floating guide to show manual option
  const guide = document.getElementById('floating-progress-guide');
  if (guide) {
    const instruction = document.getElementById('floating-instruction');
    if (instruction) {
      instruction.innerHTML = '✅ Signed? Click the red button below →';
      instruction.style.color = '#ef4444';
      instruction.style.fontWeight = '700';
    }
  }
};

  const createFloatingGuide = () => {
    // Remove any existing guide
    const existingGuide = document.getElementById('floating-progress-guide');
    if (existingGuide) existingGuide.remove();

    const guideContainer = document.createElement('div');
    guideContainer.id = 'floating-progress-guide';
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

  const setupGuideLogic = () => {
    let psaStep = 1;
  
    const updateFloatingGuide = (step) => {
      const stepElements = [
        { id: 'floating-step-1', text: 'Step 1: Review Agreement' },
        { id: 'floating-step-2', text: 'Step 2: Scroll to Bottom' },
        { id: 'floating-step-3', text: 'Step 3: Click "Sign Now"' },
        { id: 'floating-step-4', text: 'Step 4: Complete Signing' }
      ];
  
      stepElements.forEach((step_info, index) => {
        const element = document.getElementById(step_info.id);
        if (element) {
          const stepNumber = index + 1;
  
          if (stepNumber < step) {
            element.style.color = '#059669';
            element.style.fontWeight = '600';
            element.innerHTML = `✅ ${step_info.text}`;
          } else if (stepNumber === step) {
            element.style.color = '#f59e0b';
            element.style.fontWeight = '700';
            element.innerHTML = `▶️ ${step_info.text}`;
          } else {
            element.style.color = '#9ca3af';
            element.style.fontWeight = '500';
            element.innerHTML = `⏳ ${step_info.text}`;
          }
        }
      });
  
      const instruction = document.getElementById('floating-instruction');
      if (instruction) {
        switch(step) {
          case 1:
            instruction.innerHTML = 'Review and sign your PSA →';
            instruction.style.color = '#6b7280';
            break;
          case 2:
            instruction.innerHTML = 'Keep scrolling to find "Sign Now" →';
            instruction.style.color = '#f59e0b';
            instruction.style.fontWeight = '600';
            break;
          case 3:
            instruction.innerHTML = 'Click the "Sign Now" button!';
            instruction.style.color = '#dc2626';
            instruction.style.fontWeight = '700';
            break;
          case 4:
            instruction.innerHTML = '🎉 Signing completed!';
            instruction.style.color = '#059669';
            instruction.style.fontWeight = '700';
            break;
        }
      }
  
      psaStep = step;
    };
  
    // Clean scroll detection without debugging
    const scrollWatcher = setInterval(() => {
      const docusealForm = document.querySelector('docuseal-form');
      if (!docusealForm) return;
  
      const iframe = docusealForm.querySelector('iframe');
      if (!iframe) return;
  
      try {
        const rect = iframe.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
  
        // Conservative triggers for step progression
        if (scrollY > 1000 && rect.top < -200 && psaStep === 1) {
          updateFloatingGuide(2);
          return;
        }
  
        if (rect.bottom <= windowHeight + 50 && rect.bottom > 0 && psaStep === 2) {
          updateFloatingGuide(3);
          return;
        }
  
      } catch (error) {
        // Silent error handling
      }
    }, 3000);
  
    // Conservative scroll listener
    const conservativeScrollHandler = () => {
      if (psaStep >= 3) return;
  
      const scrolled = window.scrollY;
  
      if (scrolled > 1500 && psaStep === 1) {
        updateFloatingGuide(2);
      } else if (scrolled > 3000 && psaStep === 2) {
        updateFloatingGuide(3);
      }
    };
  
    // Throttled scroll listener
    let scrollTimeout;
    const throttledScrollHandler = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = setTimeout(() => {
        conservativeScrollHandler();
        scrollTimeout = null;
      }, 1000);
    };
  
    window.addEventListener('scroll', throttledScrollHandler);
  
    // Clean up
    window.addEventListener('beforeunload', () => {
      clearInterval(scrollWatcher);
      window.removeEventListener('scroll', throttledScrollHandler);
    });
  };
  
  const initializeEnhancedPSA = async () => {
    console.log('🚀 initializeEnhancedPSA called!');
  
    try {
      setCurrentStep(2); // Move to "Provider Info" step
  
      // Pull in stored user data
      const user = window.USRadUser?.user || {};
      const profile = window.USRadUserData?.profile || {};
      const corporate = window.USRadUserData?.corporate || {};
      const facilities = window.USRadUserData?.facilities || [];
  
      console.log('🔍 Available data:', {
        user: !!user?.id,
        profile: !!profile?.id,
        corporate: !!corporate?.user_id,
        facilities: facilities.length
      });
  
      // Extract and fallback critical fields
      const name =
        corporate?.legal_name?.trim() ||
        profile?.company_name?.trim() ||
        user?.user_metadata?.company_name?.trim() ||
        user?.full_name?.trim() ||
        `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim() ||
        user?.email?.split('@')[0] ||
        'USRad Provider';

      const email =
        user?.email?.trim() ||
        user?.user_metadata?.email?.trim() ||
        'provider@usrad.com';

      console.log("✅ Resolved submitter name/email:", { name, email });
  
      const phone =
        profile.phone ||
        corporate.phone ||
        user.user_metadata?.phone ||
        '000-000-0000';
  
      const taxId =
        corporate.tax_id ||
        '00-0000000';
  
      // Construct payload
      const payload = {
        template_id: 1155842,
        submitters: [
          {
            role: 'Provider',
            name,
            email,
            values: {
              primary_contact_name: profile?.full_name || name,
              primary_contact_phone: profile?.phone || corporate?.phone || '(000) 000-0000',
              primary_contact_email: user?.email,
      
              total_locations: facilities?.length?.toString() || '1',
              agreement_date: new Date().toLocaleDateString('en-US'),
      
              provider_name: corporate?.legal_name || profile?.company_name || 'USRad Provider',
              signer_name: profile?.full_name || name,
              signer_title: profile?.signer_title || 'President',
      
              provider_date: new Date().toLocaleDateString('en-US'),
              tax_id: corporate?.tax_id || '00-0000000',
              provider_email: user?.email,
              provider_phone: profile?.phone || corporate?.phone || '(000) 000-0000'
            }
          }
        ]
      };
      
      console.log('📤 Final PSA Payload:', JSON.stringify(payload, null, 2));
  
      // API Call
      const response = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      console.log('📡 API Response status:', response.status, response.statusText);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('❌ API Error response:', JSON.stringify(errorData));
        throw new Error(`API Error ${response.status}: ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      console.log('📥 DocuSeal API Success:', data);
  
      if (data.success && data.embed_url) {
        setEmbedSrc(data.embed_url);
        setCurrentStep(3);
        setLoading(false);
        console.log('✅ PSA embedded successfully');

        const checkIframeReady = setInterval(() => {
          const iframe = document.querySelector('docuseal-form iframe');
          if (iframe?.contentWindow?.document?.body) {
            clearInterval(checkIframeReady);
            console.log("✅ PSA iframe detected. Starting guide logic.");
          }
        }, 1000);

      } else {
        throw new Error('No embed URL returned from DocuSeal');
      }
    } catch (err) {
      console.log('❌ PSA Load Failed:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Load DocuSeal script for embedded forms
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.docuseal.com/js/form.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Enhanced completion detection with multiple detection methods and fallbacks
  useEffect(() => {
    if (!embedSrc) return;

    let completionDetected = false;

    // Method 1: PostMessage listener (primary)
    const handleDocuSealMessage = (event) => {
      console.log('📡 DocuSeal Message:', event.data);
      
      if (completionDetected) return;
      
      // Check for various completion event types
      if (
        event.data?.type === 'docuseal:completed' || 
        event.data?.type === 'submission:completed' ||
        event.data?.type === 'form:completed' ||
        event.data?.event === 'completed' ||
        event.data?.status === 'completed' ||
        event.data?.action === 'completed' ||
        (event.data?.message && event.data.message.includes('completed'))
      ) {
        console.log('✅ PSA completion detected via PostMessage!');
        completionDetected = true;
        handlePSACompletion();
      }
    };

    // Method 2: Text-based detection for "Document has been signed!" message
    const checkForCompletionText = () => {
      if (completionDetected) return;
      
      const iframe = document.querySelector('docuseal-form iframe');
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const bodyText = iframeDoc.body?.textContent?.toLowerCase() || '';
            
            // Look for specific completion text patterns
            if (
              bodyText.includes('document has been signed') ||
              bodyText.includes('signing completed') ||
              bodyText.includes('successfully signed') ||
              bodyText.includes('send copy via email') ||
              (bodyText.includes('download') && bodyText.includes('signed'))
            ) {
              console.log('✅ PSA completion detected via text content!');
              completionDetected = true;
              handlePSACompletion();
            }
          }
        } catch (e) {
          // Cross-origin restrictions - expected
        }
      }
    };

    // Method 3: Button-based detection (looking for download/email buttons)
    const checkForCompletionButtons = () => {
      if (completionDetected) return;
      
      const iframe = document.querySelector('docuseal-form iframe');
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Look for completion buttons (more flexible approach)
            const buttons = Array.from(iframeDoc.querySelectorAll('button'));
            const hasCompletionButton = buttons.some(button => {
              const text = button.textContent?.toLowerCase() || '';
              return text.includes('download') || text.includes('send copy') || text.includes('email');
            });

            if (hasCompletionButton) {
              console.log('✅ PSA completion detected via completion buttons!');
              completionDetected = true;
              handlePSACompletion();
            }
          }
        } catch (e) {
          // Cross-origin restrictions - expected
        }
      }
    };

    // Method 4: Aggressive polling with multiple checks
    const pollForCompletion = setInterval(() => {
      if (completed || completionDetected) {
        clearInterval(pollForCompletion);
        return;
      }

      // Run all detection methods
      checkForCompletionText();
      checkForCompletionButtons();

      // Additional checks
      const iframe = document.querySelector('docuseal-form iframe');
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // Check for success indicators in classes or IDs
            const successElements = iframeDoc.querySelectorAll('[class*="success"], [class*="complete"], [id*="success"], [id*="complete"]');
            
            if (successElements.length > 0) {
              console.log('✅ PSA completion detected via success elements!');
              completionDetected = true;
              handlePSACompletion();
            }

            // Check for green checkmark or completion icons
            const checkmarkElements = iframeDoc.querySelectorAll('svg[class*="check"], .fa-check, [class*="checkmark"]');
            if (checkmarkElements.length > 0) {
              console.log('✅ PSA completion detected via checkmark elements!');
              completionDetected = true;
              handlePSACompletion();
            }
          }
        } catch (e) {
          // Cross-origin restrictions - expected
        }
      }
    }, 1500); // Check every 1.5 seconds

    // Method 5: Fallback manual detection button after 30 seconds
    const showFallbackOption = setTimeout(() => {
      if (!completed && !completionDetected) {
        console.log('⚠️ Completion not automatically detected, showing manual option');
        showManualCompletionButton();
      }
    }, 30000); // After 30 seconds

    // Set up all detection methods
    window.addEventListener('message', handleDocuSealMessage);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleDocuSealMessage);
      clearInterval(pollForCompletion);
      clearTimeout(showFallbackOption);
    };
  }, [embedSrc, completed]);

  useEffect(() => {
    console.log('🔍 Component mounted, waiting for user data...');
    
    const waitForUser = setInterval(() => {
      console.log('🔍 Checking for user data:', {
        hasUSRadUser: !!window.USRadUser?.user,
        hasUSRadUserData: !!window.USRadUserData,
        hasCorporate: !!window.USRadUserData?.corporate,
        userDataKeys: window.USRadUserData ? Object.keys(window.USRadUserData) : 'undefined'
      });
      
      // Simplified check - just need user, don't require corporate data
      if (window.USRadUser?.user) {
        console.log('✅ User found, initializing PSA...');
        clearInterval(waitForUser);
        setTimeout(() => initializeEnhancedPSA(), 200);
      }
    }, 1000); // Check every second for debugging

    return () => clearInterval(waitForUser);
  }, []);

  // Create floating guide when PSA is embedded
  useEffect(() => {
    if (embedSrc && currentStep === 3) {
      setTimeout(() => createFloatingGuide(), 1000);
    }
    
    return () => {
      // Cleanup floating guide
      const guide = document.getElementById('floating-progress-guide');
      if (guide) guide.remove();
    };
  }, [embedSrc, currentStep]);

  // Add completion detection overlay after delays
  useEffect(() => {
    if (!embedSrc || completed) return;

    // Show completion detection overlay after 60 seconds
    const showCompletionOverlay = setTimeout(() => {
      const overlay = document.getElementById('completion-detection-overlay');
      if (overlay && !completed) {
        overlay.style.display = 'block';
      }
    }, 60000);

    // Show stuck user help after 2 minutes
    const showStuckHelp = setTimeout(() => {
      const helpSection = document.getElementById('stuck-user-help');
      if (helpSection && !completed) {
        helpSection.style.display = 'block';
      }
    }, 120000);

    return () => {
      clearTimeout(showCompletionOverlay);
      clearTimeout(showStuckHelp);
    };
  }, [embedSrc, completed]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhanced PSA Signing</h1>
          <p className="text-gray-600 mb-6">Welcome back, Malcom</p>

          {/* PSA Signing Guide */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-medium">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium text-green-700">Step 1: Review Agreement</span>
              </div>

              <div className="flex items-center">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-800'
                }`}>
                  {currentStep >= 2 ? '✓' : '⚠'}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 2 ? 'text-green-700' : 'text-yellow-600'
                }`}>Step 2: Scroll to Bottom</span>
              </div>

              <div className="flex items-center">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep >= 3 ? '▶' : '⏳'}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'
                }`}>Step 3: Click "Sign Now"</span>
              </div>

              <div className="flex items-center">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  currentStep >= 4 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep >= 4 ? '✓' : '⏳'}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 4 ? 'text-green-700' : 'text-gray-500'
                }`}>Step 4: Complete Signing</span>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-sm text-blue-700">
                {currentStep === 1 && "📄 Review and sign your Provider Service Agreement"}
                {currentStep === 2 && "📄 Click the 'Sign Now' button!"}
                {currentStep === 3 && "📝 Step 3 of 4"}
                {currentStep === 4 && "🎉 PSA Completed Successfully!"}
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Initializing PSA agreement...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Unable to load PSA form</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => window.location.href = '/dashboard/onboarding/psa'}
                        className="bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Use Basic PSA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {embedSrc && (
            <div className="space-y-4">
              {/* DEBUG: Manual completion button for testing */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-center py-2">
                  <button
                    onClick={handlePSACompletion}
                    className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                  >
                    🧪 Test Completion (Dev Only)
                  </button>
                </div>
              )}
              
              <div 
                className="w-full h-[800px] border-0"
                dangerouslySetInnerHTML={{
                  __html: `<docuseal-form data-src="${embedSrc}"></docuseal-form>`
                }}
              />

              {/* Enhanced completion detection and manual fallback */}
              {!completed && (
                <>
                  {/* Completion Detection Overlay - Shows after 60 seconds */}
                  <div id="completion-detection-overlay" style={{ display: 'none' }}>
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="text-lg font-medium text-amber-800 mb-2">
                            Finished signing your PSA?
                          </h3>
                          <p className="text-sm text-amber-700 mb-4">
                            If you've completed the signing process and see "Document has been signed!" or download/email buttons above, click the button below to continue.
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                console.log('📋 Manual completion triggered by user');
                                document.getElementById('completion-detection-overlay').style.display = 'none';
                                handlePSACompletion();
                              }}
                              className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                              ✅ Yes, I've Completed Signing
                            </button>
                            <button
                              onClick={() => {
                                document.getElementById('completion-detection-overlay').style.display = 'none';
                                // Reset the timer for another check
                                setTimeout(() => {
                                  if (!completed && document.getElementById('completion-detection-overlay')) {
                                    document.getElementById('completion-detection-overlay').style.display = 'block';
                                  }
                                }, 60000); // Show again in 1 minute
                              }}
                              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                              Not Yet, Still Signing
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stuck User Help - Shows after 2 minutes */}
                  <div id="stuck-user-help" style={{ display: 'none' }}>
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="text-lg font-medium text-red-800 mb-2">
                            Need help with the signing process?
                          </h3>
                          <p className="text-sm text-red-700 mb-4">
                            If you're having trouble with the PSA signing, here are your options:
                          </p>
                          <div className="space-y-3">
                            <div className="bg-white p-4 rounded border border-red-200">
                              <h4 className="font-medium text-red-800 mb-2">✅ If you've already signed:</h4>
                              <p className="text-sm text-red-700 mb-3">
                                Look for "Document has been signed!" message above, then click:
                              </p>
                              <button
                                onClick={() => {
                                  console.log('📋 Manual completion from help section');
                                  document.getElementById('stuck-user-help').style.display = 'none';
                                  handlePSACompletion();
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
                              >
                                Continue to Dashboard
                              </button>
                            </div>
                            
                            <div className="bg-white p-4 rounded border border-red-200">
                              <h4 className="font-medium text-red-800 mb-2">🔄 Having technical issues?</h4>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => window.location.reload()}
                                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                                >
                                  Refresh Page
                                </button>
                                <button
                                  onClick={() => window.location.href = '/dashboard/onboarding/psa'}
                                  className="bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700"
                                >
                                  Try Basic PSA
                                </button>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded border border-red-200">
                              <h4 className="font-medium text-red-800 mb-2">📞 Need personal assistance?</h4>
                              <p className="text-sm text-red-700 mb-2">
                                Contact our onboarding team:
                              </p>
                              <div className="text-sm">
                                <p className="text-red-800 font-medium">📧 onboarding@usrad.com</p>
                                <p className="text-red-800 font-medium">📱 (954) 555-0123</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {completed && (
            <div className="text-center py-8">
              <div className="inline-block w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">PSA Completed Successfully!</h3>
              <p className="text-gray-600 mb-4">Redirecting you to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}