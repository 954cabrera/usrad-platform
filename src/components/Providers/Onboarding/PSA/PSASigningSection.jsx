// src/components/Providers/Onboarding/PSA/PSASigningSection.jsx
import React, { useEffect, useRef } from "react";

export default function PSASigningSection({ embedSrc }) {
  const embedRef = useRef(null);

  useEffect(() => {
    if (embedRef.current) {
      // Add event listener to detect when DocuSeal needs to scroll
      const handleDocuSealScroll = () => {
        const iframe = embedRef.current.querySelector("iframe");
        if (iframe) {
          // Allow iframe to handle its own scrolling
          iframe.style.height = "calc(100vh - 200px)";
          iframe.style.maxHeight = "1200px";
          iframe.focus();
        }
      };

      // Check for iframe periodically
      const checkInterval = setInterval(() => {
        const iframe = embedRef.current?.querySelector("iframe");
        if (iframe) {
          handleDocuSealScroll();
          clearInterval(checkInterval);
        }
      }, 500);

      return () => clearInterval(checkInterval);
    }
  }, [embedSrc]);

  return (
    <div className="signing-container">
      <div className="signing-instructions">
        <p>📝 Please review and sign the agreement below</p>
      </div>

      <div
        ref={embedRef}
        className="docuseal-embed"
        dangerouslySetInnerHTML={{
          __html: `<docuseal-form 
            data-src="${embedSrc}"
            style="display: block; width: 100%; position: relative;"
          ></docuseal-form>`,
        }}
      />
    </div>
  );
}
