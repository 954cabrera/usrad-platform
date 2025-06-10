// src/components/dashboard/PSASigningSystemEmbedded.jsx
import React, { useEffect, useRef, useState } from 'react';

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
        embedRef.current.innerHTML = `
          <docuseal-form 
            data-src="${PUBLIC_DOCUSEAL_FORM_URL}"
            data-email="${providerData.email}"
            data-name="${providerData.contactName}">
          </docuseal-form>
          <div style="margin-top:1.5rem;text-align:center;color:#4B5563;font-size:0.95rem;">
            📩 Once you’re done signing, click <strong>“Send Copy”</strong> or <strong>“Download”</strong> — then return here.<br />
            🚀 You will be redirected to your Dashboard automatically.
          </div>
        `;
        scrollToForm();

        const handleMessage = (event) => {
          if (event.data?.type === 'docuseal:completed' || event.data?.event === 'completed') {
            setStatus('completed');
            if (window.USRadUser?.loadUserData) window.USRadUser.loadUserData();
            if (window.showToast) window.showToast('✅ PSA completed successfully.', 'success');

            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 4000);
          }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }
    } catch (err) {
      setError('❌ Failed to load DocuSeal form script.');
    }
  };

  useEffect(() => {
    setStatus('loading');
    embedForm().then(() => setStatus('embedded')).catch(() => setStatus('error'));
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
