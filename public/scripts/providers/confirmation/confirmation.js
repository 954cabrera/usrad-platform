// public/scripts/providers/confirmation/confirmation.js
import { CONFIRMATION_CONFIG } from './confirmation.config.js';
import { 
  OrganizationLoader, 
  CentersLoader, 
  PricingLoader,
  ChecklistManager,
  NavigationManager,
  ExhibitBManager
} from './modules/index.js';

class EnhancedConfirmationPage {
  constructor() {
    this.config = CONFIRMATION_CONFIG;
    this.organizationLoader = new OrganizationLoader();
    this.centersLoader = new CentersLoader();
    this.pricingLoader = new PricingLoader();
    this.checklistManager = new ChecklistManager();
    this.navigationManager = new NavigationManager();
    this.exhibitBManager = new ExhibitBManager();

    // Enhanced dynamic pricing support
    this.dynamicPricingManager = new DynamicPricingManager();
  }

  init() {
    this.loadAllData();
    this.setupEventListeners();
    this.initializeDynamicPricing();
    this.exposeGlobalFunctions();
  }

  async loadAllData() {
    await this.organizationLoader.load();
    this.centersLoader.load();
    this.pricingLoader.load();
  }

  initializeDynamicPricing() {
    // Initialize dynamic pricing display
    this.dynamicPricingManager.init();
  }

  setupEventListeners() {
    this.checklistManager.init();
  }

  exposeGlobalFunctions() {
    // Expose navigation functions globally
    window.editOrganization = () => this.navigationManager.editOrganization();
    window.editCenters = () => this.navigationManager.editCenters();
    window.editPricing = () => this.navigationManager.editPricing();
    window.goBack = () => this.navigationManager.goBack();
    window.proceedToSign = () => this.navigationManager.proceedToSign();
    
    // Expose modal functions
    window.previewExhibitB = () => this.exhibitBManager.preview();
    window.closeModal = () => this.exhibitBManager.close();
  }
}

// Dynamic Pricing Manager Class
class DynamicPricingManager {
  constructor() {
    this.multiSelection = {};
    this.stateRates = {};
    this.role = "";
    this.marketRate = "";
  }

  init() {
    console.log("🎯 Loading dynamic pricing strategy...");

    // Load pricing data from localStorage
    this.loadPricingData();

    // Determine pricing strategy
    const pricingStrategy = this.determinePricingStrategy();

    // Update displays
    this.updatePricingStrategyDisplay(pricingStrategy);
    this.updateExpectedVolumeAndRevenue(pricingStrategy);

    // Prepare enhanced PSA data
    this.prepareEnhancedPSAData(pricingStrategy);
  }

  loadPricingData() {
    this.multiSelection = JSON.parse(
      localStorage.getItem("usrad_multi_selection") || "{}"
    );
    this.stateRates = JSON.parse(
      localStorage.getItem("usrad_state_rates") || "{}"
    );
    this.role = localStorage.getItem("usrad_role") || "center-admin";
    this.marketRate = localStorage.getItem("market_calculator_rate");

    console.log("Pricing data loaded:", {
      multiSelection: this.multiSelection,
      stateRates: this.stateRates,
      role: this.role,
      marketRate: this.marketRate,
    });
  }

  determinePricingStrategy() {
    const hasMultiState = Object.keys(this.stateRates).length > 1;
    const states = Object.keys(this.stateRates);

    if (hasMultiState) {
      // Multi-state pricing strategy
      return {
        type: "multi-state",
        states: states,
        stateRates: this.stateRates,
        averageRate: this.calculateAverageRate(),
        displayType: "state-based",
        facilities: this.multiSelection.projections?.totalFacilities || 21,
      };
    } else if (states.length === 1) {
      // Single state, potentially multiple facilities
      const singleState = states[0];
      const rate = this.stateRates[singleState];
      return {
        type: "single-state",
        state: singleState,
        rate: rate,
        displayType: rate === 100 ? "uniform" : "custom",
        facilities: this.multiSelection.projections?.totalFacilities || 1,
      };
    } else {
      // Fallback to market calculator rate
      const rate = parseInt(this.marketRate) || 100;
      return {
        type: "uniform",
        rate: rate,
        displayType: "uniform",
        facilities: 1,
      };
    }
  }

  calculateAverageRate() {
    const rates = Object.values(this.stateRates);
    const centerCounts = this.multiSelection.centerCounts || {};

    // Weighted average based on facility counts per state
    let totalWeightedRate = 0;
    let totalFacilities = 0;

    Object.entries(this.stateRates).forEach(([state, rate]) => {
      const facilityCount = centerCounts[state] || 1;
      totalWeightedRate += rate * facilityCount;
      totalFacilities += facilityCount;
    });

    return totalFacilities > 0
      ? Math.round(totalWeightedRate / totalFacilities)
      : 100;
  }

  updatePricingStrategyDisplay(strategy) {
    const pricingSection = document.querySelector(
      '.pricing-strategy, [class*="pricing"]'
    );
    if (!pricingSection) {
      console.warn("Pricing strategy section not found");
      return;
    }

    // Find the rate display element (look for common patterns)
    const rateDisplay = pricingSection.querySelector(
      '.rate-percentage, [class*="rate"], h2, .display-rate, .pricing-rate'
    );
    const descriptionElement = pricingSection.querySelector(
      ".rate-description, p, .description, .pricing-description"
    );

    let displayHTML = "";
    let descriptionHTML = "";

    switch (strategy.type) {
      case "multi-state":
        displayHTML = this.generateMultiStateDisplay(strategy);
        descriptionHTML = `State-based Medicare rates across ${strategy.states.length} states`;
        break;

      case "single-state":
        displayHTML = `${strategy.rate}%`;
        descriptionHTML = `${strategy.rate}% of Medicare Rates in ${strategy.state}`;
        break;

      case "uniform":
      default:
        displayHTML = `${strategy.rate}%`;
        descriptionHTML = `${strategy.rate}% of Medicare Rates`;
        break;
    }

    // Update the display
    if (rateDisplay) {
      if (strategy.type === "multi-state") {
        rateDisplay.innerHTML = displayHTML;
      } else {
        rateDisplay.textContent = displayHTML;
      }
    }

    if (descriptionElement) {
      descriptionElement.textContent = descriptionHTML;
    }

    console.log("✅ Updated pricing strategy display:", strategy.type);
  }

  generateMultiStateDisplay(strategy) {
    const stateRatesList = Object.entries(strategy.stateRates)
      .map(([state, rate]) => `${state}: ${rate}%`)
      .join(", ");

    if (Object.entries(strategy.stateRates).length <= 3) {
      // Show all states if 3 or fewer
      return `
        <div class="multi-state-rates">
          <div class="average-rate">${strategy.averageRate}% avg</div>
          <div class="state-breakdown">${stateRatesList}</div>
        </div>
      `;
    } else {
      // Show average with expandable details if more than 3 states
      return `
        <div class="multi-state-rates">
          <div class="average-rate">${strategy.averageRate}% avg</div>
          <div class="state-summary">${strategy.states.length} states configured</div>
        </div>
      `;
    }
  }

  updateExpectedVolumeAndRevenue(strategy) {
    // Update expected volume based on average rate
    const volumeElement = document.querySelector(
      '.expected-volume, [class*="volume"]'
    );
    const revenueElement = document.querySelector(
      '.projected-revenue, [class*="revenue"]'
    );

    const effectiveRate = strategy.averageRate || strategy.rate || 100;

    // Volume calculation (inverse relationship with rate)
    let volumeLevel, volumeRange, annualRevenue;

    if (effectiveRate <= 100) {
      volumeLevel = "High";
      volumeRange = "15-20 patients/week";
      annualRevenue = (212000 * (effectiveRate / 100) * 17.5 * 52) / 52;
    } else if (effectiveRate <= 110) {
      volumeLevel = "Good";
      volumeRange = "10-15 patients/week";
      annualRevenue = (212000 * (effectiveRate / 100) * 12.5 * 52) / 52;
    } else if (effectiveRate <= 120) {
      volumeLevel = "Moderate";
      volumeRange = "6-10 patients/week";
      annualRevenue = (212000 * (effectiveRate / 100) * 8 * 52) / 52;
    } else {
      volumeLevel = "Lower";
      volumeRange = "4-8 patients/week";
      annualRevenue = (212000 * (effectiveRate / 100) * 6 * 52) / 52;
    }

    // Update volume display
    if (volumeElement) {
      const volumeText =
        volumeElement.querySelector(".volume-text") || volumeElement;
      volumeText.textContent = `${volumeLevel} (${volumeRange})`;
    }

    // Update revenue display
    if (revenueElement) {
      const revenueText =
        revenueElement.querySelector(".revenue-amount") || revenueElement;
      const formattedRevenue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(annualRevenue);

      revenueText.textContent = formattedRevenue;
    }

    console.log(
      "✅ Updated volume and revenue projections for",
      effectiveRate + "%"
    );
  }

  prepareEnhancedPSAData(strategy) {
    const facilities = JSON.parse(
      localStorage.getItem("facilities") || "[]"
    );
    const orgData = JSON.parse(
      localStorage.getItem("organization_form_data") || "{}"
    );

    // Generate appropriate Exhibit B content
    const exhibitBContent = this.generateExhibitB(strategy, facilities);

    // Create comprehensive PSA payload
    const psaPayload = {
      // Organization information
      provider_name:
        orgData.organization_name || orgData.name || "Provider",
      provider_email: orgData.email || "",
      provider_phone: orgData.phone || "",
      tax_id: orgData.tax_id || "",
      primary_contact_name: orgData.primary_contact_name || "",
      primary_contact_email: orgData.primary_contact_email || "",
      primary_contact_phone: orgData.primary_contact_phone || "",

      // Facility information
      total_facilities: facilities.length,
      facility_count_breakdown: this.generateFacilityBreakdown(facilities),

      // Pricing information
      pricing_structure: strategy.type,
      reimbursement_rates: JSON.stringify(this.stateRates),
      average_reimbursement_rate: strategy.averageRate || strategy.rate,
      exhibit_b_content: exhibitBContent,

      // Agreement metadata
      agreement_date: new Date().toISOString().split("T")[0],
      role_type: this.role,

      // State-specific data (if applicable)
      ...(strategy.type === "multi-state" && {
        state_breakdown: JSON.stringify(strategy.stateRates),
        multi_state_structure: true,
      }),
    };

    // Store for PSA generation
    localStorage.setItem("enhanced_psa_data", JSON.stringify(psaPayload));
    console.log("✅ Enhanced PSA data prepared:", psaPayload);
  }

  generateExhibitB(strategy, facilities) {
    const facilityBreakdown = this.generateFacilityBreakdown(facilities);
    const totalFacilities = facilities.length;

    switch (strategy.type) {
      case "multi-state":
        return this.generateMultiStateExhibitB(
          strategy,
          facilityBreakdown,
          totalFacilities
        );

      case "single-state":
        return this.generateSingleStateExhibitB(
          strategy,
          facilityBreakdown,
          totalFacilities
        );

      case "uniform":
      default:
        return this.generateUniformExhibitB(strategy, totalFacilities);
    }
  }

  generateFacilityBreakdown(facilities) {
    const breakdown = {};

    facilities.forEach((facility) => {
      const state = facility.state || facility.address_state || "Unknown";
      if (!breakdown[state]) {
        breakdown[state] = 0;
      }
      breakdown[state]++;
    });

    return breakdown;
  }

  generateMultiStateExhibitB(strategy, facilityBreakdown, totalFacilities) {
    const stateLines = Object.entries(strategy.stateRates)
      .map(([state, rate]) => {
        const facilityCount = facilityBreakdown[state] || 1;
        const plural = facilityCount === 1 ? "facility" : "facilities";
        return `${state}: ${rate}% of Medicare Allowable (${facilityCount} ${plural})`;
      })
      .join("\n");

    return `EXHIBIT B: REIMBURSEMENT RATES

State-Based Reimbursement Structure:
${stateLines}

Total Authorized Locations: ${totalFacilities}
Portfolio Average Rate: ${strategy.averageRate}% of Medicare Allowable

This rate structure reflects market-based pricing optimized for competitive positioning in each state.`;
  }

  generateSingleStateExhibitB(
    strategy,
    facilityBreakdown,
    totalFacilities
  ) {
    const facilityCount =
      facilityBreakdown[strategy.state] || totalFacilities;
    const plural = facilityCount === 1 ? "facility" : "facilities";

    return `EXHIBIT B: REIMBURSEMENT RATES

Reimbursement Rate: ${strategy.rate}% of Medicare Allowable
State: ${strategy.state} (${facilityCount} ${plural})
Total Authorized Locations: ${totalFacilities}

All Provider facilities will receive ${strategy.rate}% of Medicare Allowable rates.`;
  }

  generateUniformExhibitB(strategy, totalFacilities) {
    return `EXHIBIT B: REIMBURSEMENT RATES

Standard reimbursement at ${strategy.rate}% of Medicare Allowable rates.

Total Authorized Locations: ${totalFacilities}

All Provider facilities will receive ${strategy.rate}% of Medicare Allowable rates.`;
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const confirmationPage = new EnhancedConfirmationPage();
  confirmationPage.init();
});