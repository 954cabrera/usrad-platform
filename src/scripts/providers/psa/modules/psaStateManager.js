// src/scripts/providers/psa/modules/psaStateManager.js
import { PSA_CONFIG } from '../psa.config.js';
import { StorageHelpers } from '../../shared/storage.js';

export class PSAStateManager {
  constructor() {
    this.state = {
      currentStep: 1,
      psaStep: 1,
      completed: false,
      embedSrc: null,
      psaData: null
    };
  }

  // Enhanced: Load onboarding data with dynamic pricing integration
  loadOnboardingData() {
    try {
      console.log('Loading onboarding data from localStorage...');

      const orgData = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.ORGANIZATION) || {};
      const centers = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.CENTERS) || [];
      const pricing = StorageHelpers.getItem(PSA_CONFIG.STORAGE_KEYS.PRICING) || {};

      const primaryCenter = centers.find(c => c.isPrimary) || centers[0] || {};

      // Enhanced: Load dynamic pricing data
      const enhancedPricingData = this.loadEnhancedPricingData();

      const data = {
        organization: orgData,
        centers: centers,
        primaryCenter: primaryCenter,
        pricing: pricing,
        signer: orgData.signer || {},
        // Enhanced: Include dynamic pricing data
        enhancedPricing: enhancedPricingData
      };

      console.log('📊 Loaded onboarding data:', data);
      this.state.psaData = data;
      return data;
    } catch (error) {
      console.error('Error loading onboarding data:', error);
      return null;
    }
  }

  // New: Load enhanced pricing data from multi-center configuration
  loadEnhancedPricingData() {
    try {
      console.log('🎯 Loading enhanced pricing data...');

      // Get enhanced PSA data prepared by confirmation page
      const enhancedPSAData = StorageHelpers.getItem('enhanced_psa_data') || {};
      
      // Get multi-center pricing data
      const multiSelection = StorageHelpers.getItem('usrad_multi_selection') || {};
      const stateRates = StorageHelpers.getItem('usrad_state_rates') || {};
      const role = StorageHelpers.getItem('usrad_role') || 'center-admin';
      const marketRate = StorageHelpers.getItem('market_calculator_rate');
      const facilities = StorageHelpers.getItem('facilities') || [];

      // Determine pricing structure
      const pricingStructure = this.determinePricingStructure(multiSelection, stateRates, role, marketRate);
      
      // Generate Exhibit B content
      const exhibitBContent = this.generateExhibitB(pricingStructure, facilities);

      const enhancedPricing = {
        // Use enhanced PSA data if available, otherwise build from components
        ...enhancedPSAData,
        
        // Core pricing data
        pricingStructure: pricingStructure,
        stateRates: stateRates,
        multiSelection: multiSelection,
        role: role,
        marketRate: marketRate,
        
        // Generated content
        exhibitBContent: exhibitBContent,
        
        // Facility breakdown
        facilityBreakdown: this.generateFacilityBreakdown(facilities),
        totalFacilities: facilities.length,
        
        // Metadata
        generatedAt: new Date().toISOString(),
        hasMultiState: Object.keys(stateRates).length > 1
      };

      console.log('✅ Enhanced pricing data loaded:', enhancedPricing);
      return enhancedPricing;
    } catch (error) {
      console.error('❌ Error loading enhanced pricing data:', error);
      // Return fallback structure to prevent breaking
      return {
        pricingStructure: { type: 'uniform', rate: 100 },
        stateRates: {},
        exhibitBContent: 'EXHIBIT B: REIMBURSEMENT RATES\n\nStandard reimbursement at 100% of Medicare Allowable rates.',
        facilityBreakdown: {},
        totalFacilities: 0,
        hasMultiState: false
      };
    }
  }

  // New: Determine pricing structure from loaded data
  determinePricingStructure(multiSelection, stateRates, role, marketRate) {
    const states = Object.keys(stateRates);
    
    if (states.length > 1) {
      // Multi-state structure
      const centerCounts = multiSelection.centerCounts || {};
      const averageRate = this.calculateWeightedAverageRate(stateRates, centerCounts);
      
      return {
        type: 'multi-state',
        averageRate: averageRate,
        stateRates: stateRates,
        centerCounts: centerCounts,
        totalStates: states.length
      };
    } else if (states.length === 1) {
      // Single state
      const state = states[0];
      const rate = stateRates[state];
      
      return {
        type: 'single-state',
        state: state,
        rate: rate,
        averageRate: rate
      };
    } else {
      // Fallback to market calculator rate
      const rate = parseInt(marketRate) || 100;
      return {
        type: 'uniform',
        rate: rate,
        averageRate: rate
      };
    }
  }

  // New: Calculate weighted average rate based on facility counts
  calculateWeightedAverageRate(stateRates, centerCounts) {
    let totalWeightedRate = 0;
    let totalFacilities = 0;
    
    Object.entries(stateRates).forEach(([state, rate]) => {
      const facilityCount = centerCounts[state] || 1;
      totalWeightedRate += rate * facilityCount;
      totalFacilities += facilityCount;
    });
    
    return totalFacilities > 0 ? Math.round(totalWeightedRate / totalFacilities) : 100;
  }

  // New: Generate facility breakdown by state
  generateFacilityBreakdown(facilities) {
    const breakdown = {};
    
    facilities.forEach(facility => {
      const state = facility.state || facility.address_state || 'Unknown';
      if (!breakdown[state]) {
        breakdown[state] = 0;
      }
      breakdown[state]++;
    });
    
    return breakdown;
  }

  // New: Generate appropriate Exhibit B content
  generateExhibitB(pricingStructure, facilities) {
    const facilityBreakdown = this.generateFacilityBreakdown(facilities);
    const totalFacilities = facilities.length;
    
    switch (pricingStructure.type) {
      case 'multi-state':
        return this.generateMultiStateExhibitB(pricingStructure, facilityBreakdown, totalFacilities);
      
      case 'single-state':
        return this.generateSingleStateExhibitB(pricingStructure, facilityBreakdown, totalFacilities);
      
      case 'uniform':
      default:
        return this.generateUniformExhibitB(pricingStructure, totalFacilities);
    }
  }

  // New: Generate multi-state Exhibit B
  generateMultiStateExhibitB(pricingStructure, facilityBreakdown, totalFacilities) {
    const stateLines = Object.entries(pricingStructure.stateRates)
      .map(([state, rate]) => {
        const facilityCount = facilityBreakdown[state] || 1;
        const plural = facilityCount === 1 ? 'facility' : 'facilities';
        return `${state}: ${rate}% of Medicare Allowable (${facilityCount} ${plural})`;
      })
      .join('\n');
    
    return `EXHIBIT B: REIMBURSEMENT RATES

State-Based Reimbursement Structure:
${stateLines}

Total Authorized Locations: ${totalFacilities}
Portfolio Average Rate: ${pricingStructure.averageRate}% of Medicare Allowable

This rate structure reflects market-based pricing optimized for competitive positioning in each state.`;
  }

  // New: Generate single-state Exhibit B
  generateSingleStateExhibitB(pricingStructure, facilityBreakdown, totalFacilities) {
    const facilityCount = facilityBreakdown[pricingStructure.state] || totalFacilities;
    const plural = facilityCount === 1 ? 'facility' : 'facilities';
    
    return `EXHIBIT B: REIMBURSEMENT RATES

Reimbursement Rate: ${pricingStructure.rate}% of Medicare Allowable
State: ${pricingStructure.state} (${facilityCount} ${plural})
Total Authorized Locations: ${totalFacilities}

All Provider facilities will receive ${pricingStructure.rate}% of Medicare Allowable rates.`;
  }

  // New: Generate uniform Exhibit B
  generateUniformExhibitB(pricingStructure, totalFacilities) {
    return `EXHIBIT B: REIMBURSEMENT RATES

Standard reimbursement at ${pricingStructure.rate}% of Medicare Allowable rates.

Total Authorized Locations: ${totalFacilities}

All Provider facilities will receive ${pricingStructure.rate}% of Medicare Allowable rates.`;
  }

  // Enhanced: Get PSA data with dynamic pricing for DocuSeal submission
  getPSADataForSubmission() {
    const data = this.loadOnboardingData();
    if (!data) return null;

    const { organization, primaryCenter, enhancedPricing } = data;

    // Build comprehensive PSA payload
    const psaPayload = {
      // Organization information (existing)
      primary_facility_name: organization.organization_name || organization.name || 'Unknown Organization',
      provider_email: organization.email || primaryCenter.administrator?.email || '',
      provider_phone: organization.phone || primaryCenter.phone || '',
      tax_id: organization.tax_id || '',
      primary_contact_name: organization.primary_contact_name || organization.contact_name || '',
      primary_contact_email: organization.primary_contact_email || organization.email || '',
      primary_contact_phone: organization.primary_contact_phone || organization.phone || '',
      
      // Enhanced: Dynamic pricing information
      reimbursement_structure: enhancedPricing.pricingStructure.type,
      reimbursement_rate: enhancedPricing.pricingStructure.averageRate || enhancedPricing.pricingStructure.rate || 100,
      exhibit_b_content: enhancedPricing.exhibitBContent,
      
      // Enhanced: State-based rates (if applicable)
      ...(enhancedPricing.hasMultiState && {
        state_rates: JSON.stringify(enhancedPricing.stateRates),
        multi_state_structure: true,
        state_breakdown: JSON.stringify(enhancedPricing.facilityBreakdown)
      }),
      
      // Facility information
      total_facilities: enhancedPricing.totalFacilities || data.centers.length,
      
      // Agreement metadata
      agreement_date: new Date().toISOString().split('T')[0],
      role_type: enhancedPricing.role || 'center-admin',
      
      // Original fields for backwards compatibility
      provider_name: organization.organization_name || organization.name || 'Unknown Organization'
    };

    console.log('📋 PSA payload for DocuSeal submission:', psaPayload);
    return psaPayload;
  }

  // Update state (existing - unchanged)
  updateState(updates) {
    this.state = { ...this.state, ...updates };
    this.dispatchStateChange();
  }

  // Get current state (existing - unchanged)
  getState() {
    return { ...this.state };
  }

  // Save completion status (existing - unchanged but fixed storage helper call)
  saveCompletionStatus() {
    try {
      StorageHelpers.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED, true);
      StorageHelpers.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED_DATE, new Date().toISOString());
    } catch (error) {
      // Fallback to direct localStorage if StorageHelpers has issues
      console.warn('StorageHelpers not available, using direct localStorage:', error);
      localStorage.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED, 'true');
      localStorage.setItem(PSA_CONFIG.STORAGE_KEYS.PSA_SIGNED_DATE, new Date().toISOString());
    }
  }

  // Dispatch state change event (existing - unchanged)
  dispatchStateChange() {
    window.dispatchEvent(new CustomEvent('psa:state-change', {
      detail: this.state
    }));
  }
}