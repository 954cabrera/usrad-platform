// src/components/dashboard/PSASigningSystemEmbedded.jsx
import React, { useEffect, useRef, useState } from 'react';

// Use your working public form URL
const PUBLIC_DOCUSEAL_FORM_URL = 'https://docuseal.com/d/LXvm6u76HPzVH3';

const PSASigningSystemEmbedded = ({ providerData }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const embedRef = useRef(null);
  const scrollTargetRef = useRef(null);

  const scrollToForm = () => {
    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://cdn.docuseal.com/js/form.js"]')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.docuseal.com/js/form.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const embedForm = async () => {
    try {
      await loadScript();
      if (embedRef.current) {
        // YOUR ORIGINAL WORKING APPROACH - EXACTLY AS IT WAS
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${PUBLIC_DOCUSEAL_FORM_URL}"
            data-email="${providerData.email}"
            data-name="${providerData.contactName}">
          </docuseal-form>
          <div style="margin-top:1.5rem;text-align:center;color:#4B5563;font-size:0.95rem;">
            📩 Once you're done signing, click <strong>"Send Copy"</strong> or <strong>"Download"</strong> — then return here.<br />
            🚀 You will be redirected to your Dashboard automatically.
          </div>
        `;
        
        scrollToForm();

        // Add floating guide AFTER the original form loads
        setTimeout(() => {
          createFloatingGuide();
        }, 1000);

        const handleMessage = (event) => {
          if (event.data?.type === 'docuseal:completed' || event.data?.event === 'completed') {
            handleSigningCompletion(event.data);
          }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }
    } catch (err) {
      setError('❌ Failed to load DocuSeal form script.');
    }
  };

  // Create floating guide
  const createFloatingGuide = () => {
    // Remove any existing guide
    const existingGuide = document.getElementById('floating-progress-guide');
    if (existingGuide) {
      existingGuide.remove();
    }

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
        Scroll down to continue →
      </div>
    `;
    
    document.body.appendChild(guideContainer);
    setupGuideLogic();
  };

  // Setup the guide progression logic
  const setupGuideLogic = () => {
    let currentStep = 1;

    const updateFloatingGuide = (step) => {
      console.log(`🚀 Updating floating guide to Step ${step}`);
      
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
            instruction.innerHTML = 'Scroll down to continue →';
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
            instruction.innerHTML = '🎉 Signing completed! Return to dashboard.';
            instruction.style.color = '#059669';
            instruction.style.fontWeight = '700';
            break;
        }
      }
      
      currentStep = step;
    };

    // Scroll monitoring
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 10 && currentStep === 1) {
        updateFloatingGuide(2);
      }
      if (scrollPercent > 60 && currentStep === 2) {
        updateFloatingGuide(3);
      }
    };

    // Click monitoring
    const handleClick = (e) => {
      const clickedText = e.target.textContent || '';
      if (clickedText.toLowerCase().includes('sign') && currentStep <= 3) {
        updateFloatingGuide(4);
      }
    };

    // Completion detection
    const checkForCompletion = () => {
      const bodyText = document.body.innerText.toLowerCase();
      const completionPhrases = [
        'document has been signed',
        'successfully signed',
        'send copy via email',
        'download'
      ];
      
      const hasCompletionText = completionPhrases.some(phrase => 
        bodyText.includes(phrase)
      );
      
      if (hasCompletionText && currentStep < 4) {
        updateFloatingGuide(4);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    const completionChecker = setInterval(checkForCompletion, 2000);

    // Store cleanup function
    window.psaGuideCleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      clearInterval(completionChecker);
      const guide = document.getElementById('floating-progress-guide');
      if (guide) guide.remove();
    };
  };

  const handleSigningCompletion = async (data) => {
    console.log('🎉 PSA signing completed:', data);
    
    setStatus('completed');
    
    try {
      if (window.USRadUser?.completePSA) {
        await window.USRadUser.completePSA(
          data?.document_url || null,
          data?.submission_id || data?.id || null
        );
      }

      if (window.USRadUser?.loadUserData) {
        await window.USRadUser.loadUserData();
      }

      setTimeout(() => {
        window.location.href = '/dashboard?psa_completed=true';
      }, 1500);

    } catch (error) {
      console.error('Error updating PSA status:', error);
      setTimeout(() => {
        window.location.href = '/dashboard?psa_completed=true';
      }, 1500);
    }
  };

  useEffect(() => {
    setStatus('loading');
    embedForm().then(() => setStatus('embedded')).catch(() => setStatus('error'));

    // Cleanup on unmount
    return () => {
      if (window.psaGuideCleanup) {
        window.psaGuideCleanup();
        delete window.psaGuideCleanup;
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div ref={scrollTargetRef} />
      <h1 className="text-3xl font-bold text-center text-usrad-navy mb-6 animate-fade-in">
        Provider Service Agreement
      </h1>

      {error && (
        <div className="text-red-600 text-center mb-4 animate-fade-in">
          ❌ {error}
        </div>
      )}

      {status === 'loading' && (
        <div className="flex justify-center items-center py-8 animate-fade-in">
          <svg className="animate-spin h-8 w-8 text-usrad-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span className="ml-4 text-gray-600 text-lg">Preparing your PSA form...</span>
        </div>
      )}

      {status === 'completed' && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl text-center mb-6 animate-bounce shadow">
          🎉 Your PSA has been signed! Redirecting to your Dashboard...
        </div>
      )}

      <div
        ref={embedRef}
        className="min-h-[700px] bg-white shadow-2xl rounded-xl p-6 border border-gray-100 transition-all duration-300 animate-fade-in"
      ></div>
    </div>
  );
};

export default PSASigningSystemEmbedded;