// src/components/Providers/Onboarding/PSA/PSAReviewSection.jsx
// Enhanced with multi-center support
import React from "react";

export default function PSAReviewSection({ psaData, onStartSigning, loading }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const renderOrganizationInfo = () => (
    <div className="review-section">
      <h3 className="section-title">
        <span className="section-icon">🏢</span>
        Organization Information
      </h3>
      <div className="info-grid">
        <div className="info-item">
          <label>Organization Name</label>
          <span>{psaData.organization?.legalName || "Not provided"}</span>
        </div>
        <div className="info-item">
          <label>Tax ID</label>
          <span>{psaData.organization?.taxId || "Not provided"}</span>
        </div>
        <div className="info-item">
          <label>Primary Contact</label>
          <span>{psaData.signer?.fullName || "Not provided"}</span>
        </div>
        <div className="info-item">
          <label>Email Address</label>
          <span>{psaData.signer?.email || "Not provided"}</span>
        </div>
        <div className="info-item">
          <label>Phone Number</label>
          <span>{psaData.signer?.phone || "Not provided"}</span>
        </div>
        <div className="info-item">
          <label>Provider Type</label>
          <span>
            {psaData.multiCenterConfig?.role
              ?.replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()) ||
              "Center Administrator"}
          </span>
        </div>
      </div>
    </div>
  );

  const renderFacilitiesInfo = () => {
    const facilities = psaData.centers || [];

    return (
      <div className="review-section">
        <h3 className="section-title">
          <span className="section-icon">📍</span>
          Authorized Facilities ({facilities.length})
        </h3>
        <div className="facilities-container">
          {facilities.length === 0 ? (
            <div className="facilities-summary">
              No facilities configured yet
            </div>
          ) : facilities.length <= 5 ? (
            // Show individual facilities for small lists
            facilities.map((facility, index) => (
              <div key={index} className="facility-item">
                <div>
                  <div className="facility-name">{facility.name}</div>
                  <div className="facility-location">
                    {facility.city}, {facility.state} {facility.zipCode}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show summary for large lists
            <>
              {facilities.slice(0, 3).map((facility, index) => (
                <div key={index} className="facility-item">
                  <div>
                    <div className="facility-name">{facility.name}</div>
                    <div className="facility-location">
                      {facility.city}, {facility.state} {facility.zipCode}
                    </div>
                  </div>
                </div>
              ))}
              <div className="facilities-summary">
                + {facilities.length - 3} additional facilities across multiple
                states
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderReimbursementStructure = () => {
    const structure = psaData.reimbursementStructure;

    if (!structure) {
      return null;
    }

    return (
      <div className="review-section highlight-section">
        <h3 className="section-title">
          <span className="section-icon">💰</span>
          Reimbursement Structure
        </h3>
        <div className="reimbursement-container">
          {structure.type === "uniform" && (
            <div className="uniform-rate-display">
              <div className="rate-display-large">{structure.rate}%</div>
              <div className="rate-subtitle">
                of Medicare Allowable for all facilities
              </div>
            </div>
          )}

          {structure.type === "single-state" && (
            <div className="uniform-rate-display">
              <div className="rate-display-large">{structure.rate}%</div>
              <div className="rate-subtitle">
                of Medicare Allowable for all {structure.state} facilities
              </div>
            </div>
          )}

          {structure.type === "multi-state" && (
            <div className="multi-state-display">
              <div className="structure-summary">{structure.summary}</div>
              <div className="state-rates-grid">
                {Object.entries(structure.stateRates).map(([state, rate]) => (
                  <div key={state} className="state-rate-card">
                    <div className="state-name">{state}</div>
                    <div className="state-rate">{rate}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRevenueProjections = () => {
    const projections = psaData.projections;

    if (!projections || !projections.projections) {
      return null;
    }

    const { projections: proj } = projections;
    const config = psaData.multiCenterConfig?.multiSelection?.config || {};

    return (
      <div className="review-section">
        <h3 className="section-title">
          <span className="section-icon">📈</span>
          Partnership Value
        </h3>
        <div className="projection-summary">
          <div className="projection-item">
            <label>Annual Portfolio Revenue</label>
            <span className="projection-value">
              {formatCurrency(proj.one.total)}
            </span>
          </div>
          <div className="projection-item">
            <label>5-Year Partnership Value</label>
            <span className="projection-value highlight">
              {formatCurrency(proj.five.total)}
            </span>
          </div>
          {config.centers > 1 && (
            <div className="projection-item">
              <label>Average Per Center (Annual)</label>
              <span className="projection-value">
                {formatCurrency(proj.one.perCenter)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderKeyTerms = () => {
    const facilities = psaData.centers || [];
    const states = [...new Set(facilities.map((f) => f.state))];

    return (
      <div className="review-section">
        <h3 className="section-title">
          <span className="section-icon">📋</span>
          Key Agreement Terms
        </h3>
        <div className="terms-grid">
          <div className="term-item">
            <div className="term-label">Payment Terms</div>
            <div className="term-value">Net 10 Days</div>
          </div>
          <div className="term-item">
            <div className="term-label">Agreement Type</div>
            <div className="term-value">Provider Service Agreement</div>
          </div>
          <div className="term-item">
            <div className="term-label">Effective Date</div>
            <div className="term-value">Upon Execution</div>
          </div>
          <div className="term-item">
            <div className="term-label">Territory</div>
            <div className="term-value">
              {states.length > 1
                ? `${states.join(", ")} (${facilities.length} facilities)`
                : `${states[0] || "As Listed"} (${facilities.length} facilities)`}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="psa-review-container">
      <div className="review-header">
        <h2>Provider Service Agreement Review</h2>
        <p>
          Please review your information before proceeding to digital signature
        </p>
      </div>

      <div className="review-content">
        {renderOrganizationInfo()}
        {renderFacilitiesInfo()}
        {renderReimbursementStructure()}
        {renderRevenueProjections()}
        {renderKeyTerms()}
      </div>

      <div className="review-actions">
        <button
          onClick={onStartSigning}
          disabled={loading}
          className="sign-button"
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Preparing Document...
            </>
          ) : (
            <>
              <span className="btn-icon">✍️</span>
              <span>Proceed to Digital Signature</span>
            </>
          )}
        </button>

        <div className="legal-notice">
          <p>
            <strong>Important:</strong> By proceeding with digital signature,
            you agree to all terms and conditions outlined in the Provider
            Service Agreement. This creates a legally binding contract between
            your organization and U.S. Radiology of Florida.
          </p>
          <p>
            You will be redirected to DocuSeal, our secure signing platform, to
            complete your signature. After signing, you'll receive a copy via
            email and can access it anytime in your provider portal.
          </p>
        </div>
      </div>
    </div>
  );
}
