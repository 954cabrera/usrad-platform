// src/components/dashboard/PSASigningSystemAPI.jsx
// DocuSeal API-based implementation for unique submissions per user
// Updated with null-safe user data handling
import React, { useEffect, useRef, useState } from 'react';

const PSASigningSystemAPI = ({ providerData: fallbackData }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [realProviderData, setRealProviderData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataSource, setDataSource] = useState('loading');
  const [submissionUrl, setSubmissionUrl] = useState(null);
  const embedRef = useRef(null);
  const scrollTargetRef = useRef(null);

  // Load real user data from your existing USRadUser system
  const loadRealUserData = async () => {
    try {
      console.log('🔍 Loading real user data from your existing USRadUser system...');
      
      // Wait for your existing USRadUser system to be available
      let attempts = 0;
      while (attempts < 30) { // Wait up to 3 seconds
        if (typeof window !== 'undefined' && window.USRadUser?.user) {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (typeof window !== 'undefined' && window.USRadUser?.user) {
        const user = window.USRadUser.user;
        const profile = window.USRadUser.profile;
        const imagingCenter = window.USRadUser.imagingCenter;
        
        console.log('🔍 Debug - User from your system:', user);
        console.log('🔍 Debug - Profile from your system:', profile);
        console.log('🔍 Debug - Imaging Center from your system:', imagingCenter);
        
        if (user) {
          // Map your existing data to DocuSeal API format (use user data even if profile is null)
          const realData = {
            // Primary Contact Information
            primary_contact_name: profile?.first_name && profile?.last_name 
              ? `${profile.first_name} ${profile.last_name}` 
              : user.email.split('@')[0],
            primary_contact_phone: profile?.phone || '(555) 000-0000',
            primary_contact_email: user.email,
            
            // Provider Information - Use REAL user data or reasonable defaults
            provider_name: imagingCenter?.facility_name || profile?.facility_name || `${user.email.split('@')[0]} Imaging Center`,
            provider_phone: profile?.phone || imagingCenter?.phone_number || '(555) 000-0000',
            provider_email: user.email,
            
            // Signer Information
            signer_name: profile?.first_name && profile?.last_name 
              ? `${profile.first_name} ${profile.last_name}` 
              : user.email.split('@')[0],
            signer_title: profile?.title || 'Medical Director',
            
            // Business Information
            tax_id: profile?.tax_id || '00-0000000',
            total_locations: profile?.total_locations || '1',
            
            // Agreement Date (auto-filled with today's date)
            agreement_date: new Date().toLocaleDateString('en-US'),
            provider_date: new Date().toLocaleDateString('en-US'),
            
            // User identification for unique submissions
            user_id: user.id,
            submission_reference: `USRad_PSA_${user.id}_${Date.now()}`
          };
          
          console.log('✅ Real provider data mapped for DocuSeal API:', realData);
          setRealProviderData(realData);
          setDataSource('real');
          return realData;
        }
      } else {
        console.log('⚠️ USRadUser not ready, using fallback data');
        // Create enhanced fallback data with proper user ID
        const enhancedFallbackData = {
          ...fallbackData,
          user_id: 'fallback_user',
          submission_reference: `USRad_PSA_fallback_${Date.now()}`
        };
        setRealProviderData(enhancedFallbackData);
        setDataSource('fallback');
        return enhancedFallbackData;
      }
      
    } catch (error) {
      console.error('❌ Error loading real user data:', error);
      // Create enhanced fallback data with proper user ID
      const enhancedFallbackData = {
        ...fallbackData,
        user_id: 'fallback_user', 
        submission_reference: `USRad_PSA_fallback_${Date.now()}`
      };
      setRealProviderData(enhancedFallbackData);
      setDataSource('error');
      return enhancedFallbackData;
    } finally {
      setIsLoadingData(false);
    }
  };

  // Create unique DocuSeal submission via API
  const createDocuSealSubmission = async (userData) => {
    try {
      console.log('📋 Creating unique DocuSeal submission for user:', userData.user_id);
      
      const submissionData = {
        template_id: 1155842, // Your actual template ID
        send_email: false, // Don't send email, we'll embed directly
        submitters: [{
          role: 'Provider',
          name: userData.primary_contact_name || userData.contactName || userData.signer_name,
          email: userData.primary_contact_email || userData.email || userData.provider_email,
          
          // Pre-fill all form fields with real user data (back to object format)
          values: {
            // Primary Contact Fields
            primary_contact_name: userData.primary_contact_name || userData.contactName,
            primary_contact_phone: userData.primary_contact_phone || userData.contactPhone,
            primary_contact_email: userData.primary_contact_email || userData.contactEmail,
            
            // Provider Fields  
            provider_name: userData.provider_name || userData.facilityName,
            provider_phone: userData.provider_phone || userData.phone,
            provider_email: userData.provider_email || userData.email,
            
            // Signer Fields
            signer_name: userData.signer_name || userData.contactName,
            signer_title: userData.signer_title || userData.signerTitle,
            
            // Business Fields
            tax_id: userData.tax_id || userData.taxId,
            total_locations: userData.total_locations || userData.totalLocations,
            
            // Date Fields
            agreement_date: userData.agreement_date || new Date().toLocaleDateString('en-US'),
            provider_date: userData.provider_date || new Date().toLocaleDateString('en-US'),
            
            // USRad Company Fields
            usrad_company_name: 'U.S. RADIOLOGY OF FLORIDA, LLC',
            usrad_dba: 'USRad',
            usrad_date: new Date().toLocaleDateString('en-US')
          }
        }],
        
        // Metadata for tracking
        metadata: {
          user_id: userData.user_id,
          submission_reference: userData.submission_reference,
          created_via: 'USRad_Dashboard',
          facility_name: userData.provider_name || userData.facilityName
        }
      };
      
      console.log('📤 Sending submission data to DocuSeal API:', submissionData);
      
      // Call your backend API endpoint that talks to DocuSeal
      const response = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        throw new Error(`DocuSeal API error: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ DocuSeal submission created:', result);
      
      // Handle array response from DocuSeal
      const responseData = Array.isArray(result) ? result[0] : result;
      
      // Extract the signing URL for this specific user (handle different response formats)
      const signingUrl = responseData?.embed_src || responseData?.send_link_url || result.signing_url || result.embed_src;
      
      if (!signingUrl) {
        throw new Error('No signing URL returned from DocuSeal');
      }
      
      setSubmissionUrl(signingUrl);
      return signingUrl;
      
    } catch (error) {
      console.error('❌ Error creating DocuSeal submission:', error);
      setError(`Failed to create signing document: ${error.message}`);
      return null;
    }
  };

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
      // Use real provider data if available, otherwise use fallback
      const dataToUse = realProviderData || fallbackData;
      
      console.log('🔍 Data being used for embedding:', dataToUse);
      
      // Safety check - make sure we have data
      if (!dataToUse) {
        console.error('❌ No data available for embedding');
        setError('No provider data available. Please try refreshing the page.');
        return;
      }
      
      if (!submissionUrl) {
        console.log('📋 No submission URL available yet, creating one...');
        const newUrl = await createDocuSealSubmission(dataToUse);
        if (!newUrl) {
          throw new Error('Failed to create DocuSeal submission');
        }
        // Make sure we set the submission URL for the embedding
        setSubmissionUrl(newUrl);
        // Wait a moment for state to update
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const urlToUse = submissionUrl || (await createDocuSealSubmission(dataToUse));
      
      console.log('🚀 Embedding DocuSeal form with unique URL:', urlToUse);
      
      await loadScript();
      if (embedRef.current && urlToUse) {
        
        // Embed the unique submission form
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${urlToUse}"
            data-email="${dataToUse.primary_contact_email || dataToUse.email}"
            data-name="${dataToUse.primary_contact_name || dataToUse.contactName}">
          </docuseal-form>
          <div style="margin-top:1.5rem;text-align:center;color:#4B5563;font-size:0.95rem;">
            📋 <strong>Review your facility information above</strong> - All fields pre-filled from your profile<br />
            🏢 <strong>Facility:</strong> ${dataToUse.provider_name || dataToUse.facilityName}<br />
            ✍️ <strong>Your signature completes the agreement</strong> - USRad will counter-sign<br />
            📩 Once signed, click <strong>"Send Copy"</strong> or <strong>"Download"</strong><br />
            🚀 You will be redirected to your Dashboard with premium features unlocked
          </div>
        `;
        
        scrollToForm();

        // Your existing floating guide functionality
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
      console.error('❌ Error embedding form:', err);
      setError('❌ Failed to load signing document.');
    }
  };

  // Your existing floating guide implementation (unchanged)
  const createFloatingGuide = () => {
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

  // Your existing guide logic with enhanced completion detection
  const setupGuideLogic = () => {
    let currentStep = 1;
    let completionTriggered = false; // Prevent duplicate triggers

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
            instruction.innerHTML = '🎉 Signing completed! Redirecting to dashboard...';
            instruction.style.color = '#059669';
            instruction.style.fontWeight = '700';
            
            // Add manual redirect button as backup
            setTimeout(() => {
              if (instruction) {
                instruction.innerHTML = `
                  🎉 Signing completed! 
                  <br><br>
                  <button onclick="window.location.href='/dashboard?psa_completed=true'" 
                          style="background: #003087; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    → Continue to Dashboard
                  </button>
                `;
              }
            }, 3000);
            break;
        }
      }
      
      currentStep = step;
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 10 && currentStep === 1) {
        updateFloatingGuide(2);
      }
      if (scrollPercent > 60 && currentStep === 2) {
        updateFloatingGuide(3);
      }
    };

    const handleClick = (e) => {
      const clickedText = e.target.textContent || '';
      if (clickedText.toLowerCase().includes('sign') && currentStep <= 3) {
        updateFloatingGuide(4);
      }
    };

    // Enhanced completion detection
    const checkForCompletion = () => {
      const bodyText = document.body.innerText.toLowerCase();
      
      // More specific completion phrases that only appear after actual signing
      const completionPhrases = [
        'document has been signed',
        'successfully signed',
        'signature complete',
        'document completed',
        'form has been submitted'
      ];
      
      // Exclude phrases that appear during normal form display
      const excludePhrases = [
        'sign now',
        'review your facility',
        'your signature completes',
        'developer sandbox'
      ];
      
      const hasCompletionText = completionPhrases.some(phrase => 
        bodyText.includes(phrase)
      );
      
      const hasExcludeText = excludePhrases.some(phrase => 
        bodyText.includes(phrase)
      );
      
      // Only trigger completion if we have completion text AND no exclude text AND not already triggered
      if (hasCompletionText && !hasExcludeText && currentStep < 4 && !completionTriggered) {
        console.log('🎉 PSA completion detected! Triggering redirect...');
        completionTriggered = true; // Set flag to prevent duplicates
        updateFloatingGuide(4);
        
        setTimeout(() => {
          handleSigningCompletion({
            event: 'completion_detected',
            source: 'auto_detection'
          });
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    const completionChecker = setInterval(checkForCompletion, 1000);

    window.psaGuideCleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      clearInterval(completionChecker);
      const guide = document.getElementById('floating-progress-guide');
      if (guide) guide.remove();
    };
  };

  // Enhanced completion handler
  const handleSigningCompletion = async (data) => {
    console.log('🎉 PSA signing completed:', data);
    
    setStatus('completed');
    
    try {
      // Use your existing USRadUser.completePSA function
      if (window.USRadUser?.completePSA) {
        console.log('📝 Updating PSA status using your existing system...');
        const success = await window.USRadUser.completePSA(
          data?.document_url || null,
          data?.submission_id || data?.id || null
        );
        
        if (success) {
          console.log('✅ PSA status updated successfully');
        }
      }

      // Reload user data using your existing system
      if (window.USRadUser?.loadUserData) {
        await window.USRadUser.loadUserData();
      }

      // Redirect to dashboard with success parameter
      setTimeout(() => {
        window.location.href = '/dashboard?psa_completed=true';
      }, 1500);

    } catch (error) {
      console.error('❌ Error updating PSA status:', error);
      setTimeout(() => {
        window.location.href = '/dashboard?psa_completed=true';
      }, 1500);
    }
  };

  // Initialize component
  useEffect(() => {
    const initializeData = async () => {
      console.log('🔍 Initializing DocuSeal API PSA component...');
      setStatus('loading');
      
      // Load real user data
      await loadRealUserData();
      
      // Small delay to ensure data is properly set
      setTimeout(async () => {
        try {
          await embedForm();
          setStatus('embedded');
        } catch (error) {
          console.error('❌ Error in form embedding:', error);
          setStatus('error');
        }
      }, 500);
    };

    initializeData();

    return () => {
      if (window.psaGuideCleanup) {
        window.psaGuideCleanup();
        delete window.psaGuideCleanup;
      }
    };
  }, []);

  // Enhanced status messages
  const getDataStatusMessage = () => {
    switch (dataSource) {
      case 'real':
        return {
          type: 'success',
          title: 'Provider Service Agreement Ready',
          message: `PSA prepared for: ${realProviderData?.provider_name} • ${realProviderData?.primary_contact_name} • ${realProviderData?.primary_contact_email}`
        };
      case 'fallback':
        return {
          type: 'info',
          title: 'Provider Service Agreement Generated',
          message: 'Please review and update the provider information as needed before signing.'
        };
      default:
        return null;
    }
  };

  const statusMessage = getDataStatusMessage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div ref={scrollTargetRef} />
      <h1 className="text-3xl font-bold text-center text-usrad-navy mb-6 animate-fade-in">
        Provider Service Agreement
      </h1>

      {/* Data Loading Indicator */}
      {isLoadingData && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl text-center mb-6 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Preparing your Provider Service Agreement...</span>
          </div>
        </div>
      )}

      {/* API Status Indicator */}
      {status === 'loading' && submissionUrl && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl text-center mb-6 animate-fade-in">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Loading your Provider Service Agreement...</span>
          </div>
        </div>
      )}

      {/* Status Confirmation */}
      {statusMessage && !isLoadingData && (
        <div className={`border px-6 py-4 rounded-xl text-center mb-6 animate-fade-in ${
          statusMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-semibold">{statusMessage.title}</span>
          </div>
          <p className="text-sm">{statusMessage.message}</p>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center mb-4 animate-fade-in bg-red-50 border border-red-200 px-6 py-4 rounded-xl">
          ❌ {error}
        </div>
      )}

      {status === 'completed' && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl text-center mb-6 animate-bounce shadow">
          🎉 Your PSA has been signed! Redirecting to your Dashboard with premium features unlocked...
        </div>
      )}

      <div
        ref={embedRef}
        className="min-h-[700px] bg-white shadow-2xl rounded-xl p-6 border border-gray-100 transition-all duration-300 animate-fade-in"
      ></div>
    </div>
  );
};

export default PSASigningSystemAPI;