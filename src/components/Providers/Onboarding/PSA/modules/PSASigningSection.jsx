// src/components/Providers/Onboarding/PSA/modules/PSASigningSection.jsx
import React, { useEffect, useState } from "react";

export default function PSASigningSection({ embedSrc }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!embedSrc) return;

    // Load DocuSeal script
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

  if (!embedSrc) return null;

  return (
    <div className="signing-container">
      <div className="signing-header">
        <div className="signing-instructions">
          <span className="instruction-icon">📝</span>
          <p>Please review and sign the agreement below</p>
        </div>
        {isMobile && (
          <div className="mobile-tip">
            💡 Tip: Rotate your device for better viewing
          </div>
        )}
      </div>

      <div
        className="docuseal-embed"
        dangerouslySetInnerHTML={{
          __html: `<docuseal-form data-src="${embedSrc}"></docuseal-form>`,
        }}
      />

      <style jsx>{`
        .signing-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          max-width: 1200px;
          margin: 0 auto;
        }

        .signing-header {
          margin-bottom: 1.5rem;
        }

        .signing-instructions {
          text-align: center;
          padding: 1rem;
          background: #eff6ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .instruction-icon {
          font-size: 1.5rem;
        }

        .signing-instructions p {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          color: #1e40af;
        }

        .mobile-tip {
          text-align: center;
          padding: 0.75rem;
          background: #fef3c7;
          border-radius: 6px;
          font-size: 0.875rem;
          color: #92400e;
          margin-top: 1rem;
          animation: fadeIn 0.5s ease-in;
        }

        .docuseal-embed {
          width: 100%;
          min-height: 800px;
          border-radius: 8px;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .signing-container {
            padding: 1rem;
            margin: 1rem;
            border-radius: 8px;
          }

          .signing-instructions {
            padding: 0.75rem;
            font-size: 0.875rem;
          }

          .instruction-icon {
            font-size: 1.25rem;
          }

          .docuseal-embed {
            min-height: 600px;
          }
        }

        @media (max-width: 480px) {
          .signing-container {
            margin: 0.5rem;
          }

          .docuseal-embed {
            min-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
