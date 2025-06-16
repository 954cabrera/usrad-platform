import React, { useEffect, useState } from 'react';

export default function EnhancedPSAComponent() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    initializeEnhancedPSA();
  }, []);

  const initializeEnhancedPSA = async () => {
    try {
      const corporate = window.USRadUserData?.corporate;
      const facilities = window.USRadUserData?.facilities || [];
      const primary = facilities.find(f => f.is_primary);

      const payload = {
        template_id: 1,
        email: window.USRadUser?.user?.email || '',
        name: window.USRadUser?.user?.user_metadata?.full_name || '',
        values: {
          legal_business_name: corporate?.legal_name || '',
          federal_tax_id: corporate?.tax_id || '',
          signer_name: window.USRadUser?.user?.user_metadata?.full_name || '',
          business_email: window.USRadUser?.user?.email || '',
          business_phone: corporate?.phone || '',
          total_facilities: facilities.length,
          primary_facility: primary?.name || '',
          facility_list: facilities.map(f => `${f.name}, ${f.city}, ${f.state}`).join("\n")
        }
      };

      const res = await fetch("/api/docuseal/create-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.embed_url) {
        setEmbedSrc(data.embed_url);
        setCurrentStep(3);
      } else {
        throw new Error(data.error || 'DocuSeal submission failed');
      }
    } catch (err) {
      console.error("❌ PSA Load Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePSACompletion = async () => {
    setCompleted(true);
    setCurrentStep(4);
    try {
      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      const supabase = createClient(
        document.querySelector('meta[name="supabase-url"]').content,
        document.querySelector('meta[name="supabase-anon-key"]').content
      );

      await supabase.from("user_profiles")
        .update({ onboarding_progress: 50, psa_signed: true })
        .eq("user_id", window.USRadUser.user.id);

      setTimeout(() => {
        window.location.href = '/dashboard/psa/success';
      }, 2000);
    } catch (err) {
      console.error("❌ Error updating progress:", err);
    }
  };

  const steps = [
    { id: 1, title: "Review Agreement", icon: "📄" },
    { id: 2, title: "Provider Info", icon: "👤" },
    { id: 3, title: "Sign PSA", icon: "✍️" },
    { id: 4, title: "Completed", icon: "🏆" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Provider Services Agreement</h1>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                currentStep >= step.id ? 'bg-emerald-500' : 'bg-gray-300'
              }`}>{currentStep > step.id ? '✓' : step.icon}</div>
              <div className={`mt-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
              }`}>{step.title}</div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-500">Initializing PSA agreement...</div>
        )}

        {!loading && completed && (
          <div className="text-center py-12 text-green-600">
            <h2 className="text-2xl font-semibold">🎉 PSA Completed Successfully!</h2>
            <p className="mt-2 text-gray-600">Redirecting shortly...</p>
          </div>
        )}

        {!loading && embedSrc && !completed && (
          <iframe
            src={embedSrc}
            className="w-full h-[800px] rounded-lg border"
            onLoad={() => {
              window.addEventListener('message', (event) => {
                if (event.data?.type === 'docuseal:completed') {
                  handlePSACompletion();
                }
              });
            }}
          />
        )}

        {!loading && !embedSrc && !completed && (
          <div className="text-center text-red-600 py-10">
            <h2 className="text-lg font-semibold">⚠️ Unable to load PSA form</h2>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
              onClick={() => window.location.href = '/dashboard/onboarding/psa'}
            >Try Basic PSA</button>
          </div>
        )}
      </div>
    </div>
  );
}
