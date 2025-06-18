import React, { useEffect, useState } from 'react';

export default function EnhancedPSAComponent() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  // Confetti celebration function
  const createConfettiCelebration = () => {
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
    
    const confetti = [];
    const confettiCount = 150;
    const colors = ['#059669', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1;
        particle.rotation += particle.rotationSpeed;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
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
    
    setTimeout(() => {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }, 5000);
  };

  // Handle PSA completion
  const handlePSACompletion = () => {
    if (completed) return; // Prevent multiple triggers
    
    console.log('🎉 PSA Completion Handler Called!');
    setCompleted(true);
    setCurrentStep(4);
    
    // Trigger confetti
    createConfettiCelebration();
    
    // Update floating guide
    setTimeout(() => {
      const guide = document.getElementById('floating-progress-guide');
      if (guide) {
        const step4 = document.getElementById('floating-step-4');
        const instruction = document.getElementById('floating-instruction');
        if (step4) {
          step4.style.color = '#059669';
          step4.style.fontWeight = '700';
          step4.innerHTML = '✅ Step 4: Complete Signing';
        }
        if (instruction) {
          instruction.innerHTML = '🎉 Signing completed!';
          instruction.style.color = '#059669';
          instruction.style.fontWeight = '700';
        }
      }
    }, 100);
    
    // Update user state
    if (window.USRadUserData) {
      window.USRadUserData.psa_completed = true;
      window.USRadUserData.onboarding_step = 'credentialing';
    }
    
    // Redirect after confetti
    setTimeout(() => {
      window.location.href = '/dashboard/onboarding?psa_completed=true&next_step=credentialing';
    }, 3000);
  };

  // Load DocuSeal script
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

  // Simple completion detection
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'docuseal:completed' || 
          event.data?.event === 'completed' ||
          event.data?.status === 'completed') {
        handlePSACompletion();
      }
    };

    const checkCompletion = setInterval(() => {
      const pageText = document.body.innerText.toLowerCase();
      if (pageText.includes('document has been signed') || 
          pageText.includes('thank you for signing') ||
          pageText.includes('successfully signed')) {
        handlePSACompletion();
      }
    }, 2000);

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkCompletion);
    };
  }, [completed]);

  // Wait for user data
  useEffect(() => {
    const waitForUser = setInterval(() => {
      if (window.USRadUser?.user) {
        clearInterval(waitForUser);
        setTimeout(() => initializeEnhancedPSA(), 200);
      }
    }, 1000);

    return () => clearInterval(waitForUser);
  }, []);

  // Create floating guide
  useEffect(() => {
    if (embedSrc && currentStep === 3) {
      setTimeout(() => createFloatingGuide(), 1000);
    }
    
    return () => {
      const guide = document.getElementById('floating-progress-guide');
      if (guide) guide.remove();
    };
  }, [embedSrc, currentStep]);

  // Emergency button after 30 seconds
  useEffect(() => {
    if (!embedSrc || completed) return;

    const timer = setTimeout(() => {
      if (!completed) {
        const button = document.createElement('div');
        button.innerHTML = `
          <div style="text-align: center; cursor: pointer;">
            <div style="font-size: 20px; margin-bottom: 4px;">⚠️</div>
            <div style="font-size: 14px; margin-bottom: 4px;">Completed Signing?</div>
            <div style="font-size: 12px;">Click to Continue</div>
          </div>
        `;
        button.style.cssText = `
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 999999 !important;
          background: #f59e0b !important;
          color: white !important;
          padding: 16px 24px !important;
          border-radius: 12px !important;
          font-family: system-ui, sans-serif !important;
          font-weight: 600 !important;
          cursor: pointer !important;
        `;
        button.onclick = handlePSACompletion;
        document.body.appendChild(button);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [embedSrc, completed]);

  const createFloatingGuide = () => {
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
  
    // Simplified scroll detection
    const scrollWatcher = setInterval(() => {
      const scrolled = window.scrollY;
      
      if (scrolled > 1500 && psaStep === 1) {
        updateFloatingGuide(2);
      } else if (scrolled > 3000 && psaStep === 2) {
        updateFloatingGuide(3);
      }
    }, 2000);
  
    // Click detection for progression
    const handleClick = () => {
      setTimeout(() => {
        if (psaStep === 3) {
          const pageText = document.body.innerText.toLowerCase();
          if (pageText.includes('signature') || !pageText.includes('sign now')) {
            updateFloatingGuide(4);
          }
        }
      }, 1000);
    };

    document.addEventListener('click', handleClick);
  
    window.addEventListener('beforeunload', () => {
      clearInterval(scrollWatcher);
      document.removeEventListener('click', handleClick);
    });
  };
  
  const initializeEnhancedPSA = async () => {
    try {
      setCurrentStep(2);
  
      const user = window.USRadUser?.user || {};
      const profile = window.USRadUserData?.profile || {};
      const corporate = window.USRadUserData?.corporate || {};
      const facilities = window.USRadUserData?.facilities || [];
  
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
  
      const response = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error ${response.status}: ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
  
      if (data.success && data.embed_url) {
        setEmbedSrc(data.embed_url);
        setCurrentStep(3);
        setLoading(false);
      } else {
        throw new Error('No embed URL returned from DocuSeal');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhanced PSA Signing</h1>
          <p className="text-gray-600 mb-6">Welcome back, Malcom</p>

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
              <button
                onClick={handlePSACompletion}
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
              >
                🧪 Test Completion
              </button>
              
              <div 
                className="w-full h-[800px] border-0"
                dangerouslySetInnerHTML={{
                  __html: `<docuseal-form data-src="${embedSrc}"></docuseal-form>`
                }}
              />
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