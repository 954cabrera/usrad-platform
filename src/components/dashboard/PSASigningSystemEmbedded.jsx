// src/components/dashboard/PSASigningSystemEmbedded.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from "@/lib/supabase";
import { DocusealForm } from '@docuseal/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

function PSASigningCore() {
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [facilityValid, setFacilityValid] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Validate primary facility before loading PSA
  // In your component, find the validateFacilityBeforePSA function and replace it with:
const validateFacilityBeforePSA = async (userId) => {
  console.log('📋 Skipping facility validation for testing');
  return true; // Always return true for now
};

  useEffect(() => {
    const checkUser = () => {
      if (window.USRadUser && window.USRadUser.user) {
        console.log('✅ User found:', window.USRadUser.user.email);
        setUserReady(true);
        initializePSA();
      } else {
        console.log('⏳ Waiting for user...');
        setTimeout(checkUser, 100);
      }
    };

    checkUser();
  }, []);

  const initializePSA = async () => {
    const user = window.USRadUser.user;
    console.log('🚀 Starting PSA initialization for:', user.email);
    
    try {
      // Validate facility
      console.log('📋 Validating facility...');
      const isValid = await validateFacilityBeforePSA(user.id);
      setFacilityValid(isValid);
  
      if (!isValid) {
        console.log('❌ Facility validation failed');
        setLoading(false);
        return;
      }
  
      // Construct name/email with fallbacks
      const name = user.user_metadata?.full_name || user.user_metadata?.company_name || user.email || 'Provider';
      const email = user.email || user.user_metadata?.email || 'provider@usrad.com';
  
      console.log('📤 PSA Submitter Payload:', { name, email });
  
      const response = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: 1155842,
          submitters: [
            {
              role: 'Provider',
              name,
              email
            }
          ]
        }),
      });
  
      const data = await response.json();
      console.log('✅ DocuSeal response:', data);
      
      if (data.success && data.embed_url) {
        setEmbedSrc(data.embed_url);
        console.log('🎯 Embed URL set:', data.embed_url);
      } else {
        throw new Error(data.error || 'Failed to create DocuSeal submission');
      }
    } catch (err) {
      console.error('❌ PSA initialization error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePSACompletion = async () => {
    console.log('🎉 PSA completed!');
    setCompleted(true);
    
    const user = window.USRadUser.user;
    
    try {
      // Update progress to 50%
      await supabase
        .from('user_profiles')
        .update({ 
          onboarding_progress: 50,
          psa_signed: true 
        })
        .eq('user_id', user.id);

      // Dispatch progress update
      window.dispatchEvent(
        new CustomEvent('userProgressUpdate', {
          detail: { 
            onboarding_progress: 50, 
            step_completed: 'psa',
            psa_signed: true 
          },
        })
      );

      console.log('✅ Progress updated to 50%');
    } catch (error) {
      console.error('❌ Error updating progress:', error);
    }

    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div ref={containerRef} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Provider Services Agreement</h2>

      {!userReady && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          <span className="ml-2 text-blue-600">Loading user data...</span>
        </div>
      )}

      {userReady && loading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          <span className="ml-2 text-gray-600">Loading agreement...</span>
        </div>
      )}

      {userReady && !loading && facilityValid === false && (
        <div className="text-red-600 py-10 text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-lg font-semibold">Missing required facility data.</p>
          <p className="text-sm text-gray-600">Please complete your primary imaging center setup before signing the PSA.</p>
        </div>
      )}

      {userReady && !loading && facilityValid && !completed && embedSrc && (
        <div>
          <p className="text-green-600 mb-4">✅ Ready to sign PSA</p>
          <DocusealForm
            src={embedSrc}
            onCompleted={handlePSACompletion}
            style={{ width: '100%', height: '800px', border: 'none' }}
          />
        </div>
      )}

      {userReady && !loading && facilityValid && !completed && !embedSrc && (
        <div className="text-yellow-600 py-10 text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-lg font-semibold">Unable to load PSA form.</p>
          <p className="text-sm text-gray-600">Please check your DocuSeal configuration.</p>
        </div>
      )}

      {completed && (
        <div className="text-center py-10 text-green-600 animate-fade-in">
          <CheckCircle className="w-10 h-10 mx-auto mb-2" />
          <p className="text-lg font-semibold">Success! Agreement signed.</p>
          <p className="text-sm text-gray-600">Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  );
}

export default function PSASigningSystemEmbedded() {
  console.log('🔴 PSA Wrapper component mounting...');
  
  return (
    <BrowserRouter>
      <PSASigningCore />
    </BrowserRouter>
  );
}