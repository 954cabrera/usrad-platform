// src/components/Providers/Onboarding/PSA/PSASigningSection.jsx
import React from "react";

export default function PSASigningSection({ embedSrc }) {
  // Keep it simple like the original - no extra effects or styling
  return (
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
  );
}
