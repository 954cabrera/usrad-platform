// PricingConfigurator.jsx - Complete pricing configuration component
import React, { useState, useEffect } from "react";

export default function PricingConfigurator() {
  const [facilities, setFacilities] = useState([]);
  const [pricingMode, setPricingMode] = useState("simple");
  const [finalPricing, setFinalPricing] = useState(null);
  const [step, setStep] = useState("configure");
  const [selectedRates, setSelectedRates] = useState({});

  useEffect(() => {
    // Load facilities from storage
    const storedFacilities = JSON.parse(
      localStorage.getItem("facilities") || "[]"
    );
    setFacilities(storedFacilities);
  }, []);

  // Get unique states
  const getUniqueStates = () => {
    const states = new Set(facilities.map((f) => f.state).filter(Boolean));
    return Array.from(states);
  };

  // Confirm simple rate
  const confirmSimpleRate = (rate) => {
    const pricing = {
      mode: "simple",
      uniformRate: rate,
      facilities: facilities.map((f) => ({
        ...f,
        rate: rate,
      })),
    };
    setFinalPricing(pricing);
    setStep("review");
  };

  // Apply suggestion
  const applySuggestion = (suggestion) => {
    setSelectedRates((prev) => ({
      ...prev,
      [suggestion.name]: {
        rate: suggestion.suggestedRate,
        facilities: suggestion.facilities,
      },
    }));
  };

  // Confirm smart pricing
  const confirmSmartPricing = () => {
    setStep("review");
  };

  // Calculate pricing summary
  const calculatePricingSummary = () => {
    let allRates = [];
    let breakdown = [];

    if (pricingMode === "simple" && finalPricing) {
      allRates = Array(facilities.length).fill(finalPricing.uniformRate);
      breakdown = [
        {
          rate: finalPricing.uniformRate,
          facilities: facilities,
        },
      ];
    } else if (pricingMode === "smart") {
      // Group facilities by rate
      const rateGroups = {};
      facilities.forEach((facility) => {
        const rate = getSmartRateForFacility(facility);
        if (!rateGroups[rate]) {
          rateGroups[rate] = [];
        }
        rateGroups[rate].push(facility);
        allRates.push(rate);
      });

      breakdown = Object.entries(rateGroups).map(([rate, facilities]) => ({
        rate: parseInt(rate),
        facilities,
      }));
    }

    const minRate = Math.min(...allRates);
    const maxRate = Math.max(...allRates);
    const averageRate = Math.round(
      allRates.reduce((a, b) => a + b, 0) / allRates.length
    );

    return {
      minRate,
      maxRate,
      averageRate,
      structure: pricingMode === "simple" ? "Uniform Rate" : "Variable Rates",
      breakdown: breakdown.sort((a, b) => a.rate - b.rate),
    };
  };

  // Get smart rate for facility
  const getSmartRateForFacility = (facility) => {
    // Check selected rates first
    for (const [groupName, groupData] of Object.entries(selectedRates)) {
      if (groupData.facilities.some((f) => f.name === facility.name)) {
        return groupData.rate;
      }
    }
    // Default rate
    return 100;
  };

  // Determine pricing structure
  const determinePricingStructure = () => {
    if (pricingMode === "simple") return "uniform";
    if (pricingMode === "smart") return "market-based";
    return "custom";
  };

  // Compile final rates
  const compileFinalRates = () => {
    const rates = {};
    facilities.forEach((facility) => {
      rates[facility.name] =
        pricingMode === "simple"
          ? finalPricing?.uniformRate || 100
          : getSmartRateForFacility(facility);
    });
    return rates;
  };

  // Simple one-rate-for-all
  const SimpleRateSelector = () => {
    const [rate, setRate] = useState(100);

    return (
      <div className="simple-rate-selector">
        <div className="rate-card">
          <h3>Set Your Rate</h3>
          <p>This rate will apply to all {facilities.length} facilities</p>

          <div className="rate-selector">
            <input
              type="range"
              min="80"
              max="150"
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
            />
            <div className="rate-display">
              <span className="big-number">{rate}%</span>
              <span className="label">of Medicare</span>
            </div>
          </div>

          <button
            className="confirm-button"
            onClick={() => confirmSimpleRate(rate)}
          >
            Use {rate}% for All Locations
          </button>
        </div>
      </div>
    );
  };

  // Smart suggestions based on markets
  const SmartPricingSuggestions = () => {
    const suggestions = generateSmartSuggestions();

    return (
      <div className="smart-pricing">
        <h3>Smart Pricing Recommendations</h3>
        <p>Based on your facility locations and local markets</p>

        <div className="suggestions-grid">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="suggestion-card">
              <h4>{suggestion.name}</h4>
              <div className="facilities-preview">
                {suggestion.facilities.slice(0, 3).map((f, i) => (
                  <div key={i} className="facility-tag">
                    {f.city}
                  </div>
                ))}
                {suggestion.facilities.length > 3 && (
                  <div className="more-tag">
                    +{suggestion.facilities.length - 3} more
                  </div>
                )}
              </div>
              <div className="suggested-rate">
                <span className="rate">{suggestion.suggestedRate}%</span>
                <span className="rationale">{suggestion.rationale}</span>
              </div>
              <button onClick={() => applySuggestion(suggestion)}>
                Apply This Rate
              </button>
            </div>
          ))}
        </div>

        <button
          className="confirm-button"
          onClick={() => confirmSmartPricing()}
        >
          Review Final Pricing →
        </button>
      </div>
    );
  };

  // Generate intelligent suggestions
  const generateSmartSuggestions = () => {
    const facilitiesByState = facilities.reduce((acc, f) => {
      const state = f.state;
      if (!acc[state]) acc[state] = [];
      acc[state].push(f);
      return acc;
    }, {});

    const suggestions = [];

    // Metro vs Rural suggestion
    const metroFacilities = facilities.filter((f) =>
      ["Miami", "Tampa", "Orlando", "Jacksonville"].some((city) =>
        f.city?.includes(city)
      )
    );

    if (metroFacilities.length > 0) {
      suggestions.push({
        name: "Major Metro Areas",
        facilities: metroFacilities,
        suggestedRate: 95,
        rationale: "Competitive rate for high-volume markets",
      });
    }

    // State-based suggestions
    Object.entries(facilitiesByState).forEach(([state, stateFacilities]) => {
      if (stateFacilities.length >= 3) {
        suggestions.push({
          name: `${state} Facilities`,
          facilities: stateFacilities,
          suggestedRate: state === "FL" ? 100 : 110,
          rationale:
            state === "FL"
              ? "Standard rate for Florida"
              : "Premium for expansion markets",
        });
      }
    });

    return suggestions;
  };

  // Custom Rate Builder placeholder
  const CustomRateBuilder = () => {
    return (
      <div className="custom-rate-builder">
        <h3>Custom Rate Configuration</h3>
        <p>Set individual rates for each facility</p>
        <p style={{ marginTop: "2rem", color: "#6b7280" }}>
          This feature will be available soon. For now, please use Simple or
          Smart pricing.
        </p>
      </div>
    );
  };

  // Review and finalize
  const PricingReview = () => {
    const summary = calculatePricingSummary();

    return (
      <div className="pricing-review">
        <h3>Pricing Summary</h3>

        <div className="summary-stats">
          <div className="stat">
            <label>Average Rate</label>
            <span>{summary.averageRate}%</span>
          </div>
          <div className="stat">
            <label>Rate Range</label>
            <span>
              {summary.minRate}% - {summary.maxRate}%
            </span>
          </div>
          <div className="stat">
            <label>Pricing Structure</label>
            <span>{summary.structure}</span>
          </div>
        </div>

        <div className="rate-breakdown">
          {summary.breakdown.map((group, idx) => (
            <div key={idx} className="rate-group">
              <div className="group-header">
                <span className="rate">{group.rate}% of Medicare</span>
                <span className="count">
                  {group.facilities.length} facilities
                </span>
              </div>
              <div className="facility-list">
                {group.facilities.map((f, i) => (
                  <div key={i} className="facility-item">
                    {f.name || f.facilityName} - {f.city}, {f.state}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={() => setStep("configure")} className="back-button">
            ← Adjust Pricing
          </button>
          <button onClick={finalizePricing} className="confirm-button">
            Confirm & Continue to Agreement →
          </button>
        </div>
      </div>
    );
  };

  // Save final pricing and redirect
  const finalizePricing = () => {
    const summary = calculatePricingSummary();

    const pricingData = {
      structure: determinePricingStructure(),
      displayStructure: summary.structure,
      displayRate: `${summary.averageRate}% average`,
      rates: compileFinalRates(),
      summary: summary,
      timestamp: new Date().toISOString(),
      // For Exhibit A
      exhibitData: {
        type: pricingMode === "simple" ? "uniform" : "variable",
        uniformRate:
          pricingMode === "simple" ? finalPricing?.uniformRate : null,
        averageRate: summary.averageRate,
        breakdown: summary.breakdown,
      },
    };

    // Store for PSA
    localStorage.setItem("provider_pricing", JSON.stringify(pricingData));

    // Mark pricing as complete
    localStorage.setItem("pricing_completed", "true");

    // Redirect to confirmation page
    window.location.href = "/providers/onboarding/confirmation";
  };

  return (
    <div className="pricing-configurator">
      <div className="configurator-header">
        <h2>Configure Your Pricing</h2>
        <p>
          {facilities.length} facilities across {getUniqueStates().length}{" "}
          states
        </p>
      </div>

      {step === "configure" && (
        <div className="pricing-modes">
          <div className="mode-selector">
            <label
              className={`mode-option ${pricingMode === "simple" ? "active" : ""}`}
            >
              <input
                type="radio"
                value="simple"
                checked={pricingMode === "simple"}
                onChange={(e) => setPricingMode(e.target.value)}
              />
              <div className="mode-content">
                <span className="mode-icon">🎯</span>
                <h4>Simple</h4>
                <p>One rate for all facilities</p>
              </div>
            </label>

            <label
              className={`mode-option ${pricingMode === "smart" ? "active" : ""}`}
            >
              <input
                type="radio"
                value="smart"
                checked={pricingMode === "smart"}
                onChange={(e) => setPricingMode(e.target.value)}
              />
              <div className="mode-content">
                <span className="mode-icon">🧠</span>
                <h4>Smart</h4>
                <p>AI-suggested rates by market</p>
              </div>
            </label>

            <label
              className={`mode-option ${pricingMode === "custom" ? "active" : ""}`}
            >
              <input
                type="radio"
                value="custom"
                checked={pricingMode === "custom"}
                onChange={(e) => setPricingMode(e.target.value)}
              />
              <div className="mode-content">
                <span className="mode-icon">⚙️</span>
                <h4>Custom</h4>
                <p>Set individual facility rates</p>
              </div>
            </label>
          </div>

          <div className="configurator-content">
            {pricingMode === "simple" && <SimpleRateSelector />}
            {pricingMode === "smart" && <SmartPricingSuggestions />}
            {pricingMode === "custom" && <CustomRateBuilder />}
          </div>
        </div>
      )}

      {step === "review" && <PricingReview />}
    </div>
  );
}
