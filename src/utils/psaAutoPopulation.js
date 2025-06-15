// PSA Auto-Population Helper - Safe, non-intrusive form assistance
// CRITICAL: Does NOT modify DocuSeal core functionality or API calls

export class PSAAutoPopulationHelper {
  constructor() {
    this.isEnabled = true;
    this.autoPopData = null;
    this.formObserver = null;
    this.retryCount = 0;
    this.maxRetries = 5;
  }

  // Initialize auto-population helper
  initialize(userData) {
    console.log('🔧 Initializing PSA auto-population helper');
    
    try {
      this.prepareAutoPopulationData(userData);
      this.setupSafeFormObserver();
      this.setupEventListeners();
    } catch (error) {
      console.error('❌ Auto-population helper initialization error:', error);
      this.isEnabled = false;
    }
  }

  // Prepare data for auto-population (safe data transformation)
  prepareAutoPopulationData(userData) {
    if (!userData) {
      console.log('⚠️ No user data available for auto-population');
      return;
    }

    this.autoPopData = {
      // Provider Information
      'full_name': userData.profile?.full_name || '',
      'provider_name': userData.profile?.full_name || '',
      'signer_name': userData.corporate?.signer_name || userData.profile?.full_name || '',
      'name': userData.profile?.full_name || '',
      
      // Contact Information
      'email': userData.corporate?.email || userData.corporate?.primary_contact_email || '',
      'phone': userData.profile?.phone || userData.corporate?.phone || '',
      'phone_number': userData.profile?.phone || userData.corporate?.phone || '',
      'contact_phone': userData.corporate?.primary_contact_phone || userData.profile?.phone || '',
      
      // Organization Information
      'organization_name': userData.corporate?.corporate_name || userData.profile?.center_name || '',
      'company_name': userData.corporate?.corporate_name || userData.profile?.center_name || '',
      'corporate_name': userData.corporate?.corporate_name || '',
      'business_name': userData.corporate?.corporate_name || userData.profile?.center_name || '',
      'legal_name': userData.corporate?.legal_name || userData.corporate?.corporate_name || '',
      
      // Tax and Legal Information
      'tax_id': userData.corporate?.tax_id || '',
      'ein': userData.corporate?.tax_id || '',
      'federal_tax_id': userData.corporate?.tax_id || '',
      
      // Address Information
      'address': userData.corporate?.corporate_address || '',
      'street_address': userData.corporate?.corporate_address || '',
      'corporate_address': userData.corporate?.corporate_address || '',
      'city': userData.corporate?.corporate_city || '',
      'state': userData.corporate?.corporate_state || '',
      'zip_code': userData.corporate?.corporate_zip || '',
      'zip': userData.corporate?.corporate_zip || '',
      'postal_code': userData.corporate?.corporate_zip || '',
      
      // Signer Information
      'signer_title': userData.corporate?.signer_title || 'Medical Director',
      'title': userData.corporate?.signer_title || 'Medical Director',
      
      // Organization Type
      'organization_type': userData.corporate?.organization_type || '',
      'business_type': userData.corporate?.organization_type || '',
      
      // Website
      'website': userData.corporate?.website || '',
      'company_website': userData.corporate?.website || '',
      
      // Additional Contact Info
      'primary_contact_name': userData.corporate?.primary_contact_name || userData.profile?.full_name || '',
      'primary_contact_email': userData.corporate?.primary_contact_email || '',
      'primary_contact_phone': userData.corporate?.primary_contact_phone || ''
    };

    // Filter out empty values
    this.autoPopData = Object.fromEntries(
      Object.entries(this.autoPopData).filter(([key, value]) => value && value.trim() !== '')
    );

    console.log('✅ Auto-population data prepared:', Object.keys(this.autoPopData));
  }

  // Setup safe form observer (non-intrusive)
  setupSafeFormObserver() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Wait for DocuSeal to load
    const checkForDocuSealForm = () => {
      const docusealIframe = document.querySelector('iframe[src*="docuseal"]');
      const docusealForm = document.querySelector('[data-docuseal-form]');
      
      if (docusealIframe || docusealForm) {
        console.log('🎯 DocuSeal form detected, setting up safe observer');
        this.startSafeFormAssistance();
      } else if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(checkForDocuSealForm, 2000); // Check every 2 seconds
      } else {
        console.log('⚠️ DocuSeal form not found after maximum retries');
      }
    };

    // Start checking after initial delay
    setTimeout(checkForDocuSealForm, 1000);
  }

  // Setup event listeners for safe auto-population
  setupEventListeners() {
    if (typeof window === 'undefined') return;

    // Listen for custom auto-population events
    window.addEventListener('PSAAutoPopulationReady', (event) => {
      console.log('🔄 PSA auto-population event received');
      this.handleAutoPopulationRequest(event.detail);
    });

    // Listen for DocuSeal form ready events (if available)
    window.addEventListener('docuseal:form:ready', () => {
      console.log('🎯 DocuSeal form ready event received');
      this.startSafeFormAssistance();
    });

    // Listen for field focus events for contextual help
    document.addEventListener('focusin', (event) => {
      this.handleFieldFocus(event);
    });
  }

  // Start safe form assistance (non-intrusive)
  startSafeFormAssistance() {
    if (!this.autoPopData || !this.isEnabled) return;

    console.log('🤝 Starting safe form assistance');

    // Create a data layer for potential form integration
    window.PSAFormAssistance = {
      available: true,
      data: this.autoPopData,
      getSuggestion: (fieldName) => this.getSuggestionForField(fieldName),
      getAllSuggestions: () => this.autoPopData
    };

    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('PSAFormAssistanceReady', {
      detail: {
        available: true,
        fieldCount: Object.keys(this.autoPopData).length
      }
    }));

    console.log('✅ PSA form assistance layer created');
  }

  // Handle auto-population requests
  handleAutoPopulationRequest(requestData) {
    console.log('📝 Handling auto-population request:', requestData);
    
    // This method provides data but doesn't force population
    // Integration code can use this data safely
  }

  // Handle field focus for contextual help
  handleFieldFocus(event) {
    if (!this.autoPopData || !this.isEnabled) return;

    const field = event.target;
    if (!field || field.tagName !== 'INPUT') return;

    const fieldName = this.identifyFieldName(field);
    if (fieldName && this.autoPopData[fieldName]) {
      this.showFieldSuggestion(field, fieldName);
    }
  }

  // Identify field name from element attributes
  identifyFieldName(field) {
    const possibleNames = [
      field.name,
      field.id,
      field.getAttribute('data-field'),
      field.getAttribute('placeholder')?.toLowerCase(),
      field.getAttribute('aria-label')?.toLowerCase()
    ].filter(Boolean);

    // Try to match with our auto-pop data keys
    for (const name of possibleNames) {
      const normalizedName = name.toLowerCase().replace(/[^a-z]/g, '_');
      if (this.autoPopData[normalizedName]) {
        return normalizedName;
      }
    }

    // Try partial matches
    for (const [key] of Object.entries(this.autoPopData)) {
      if (possibleNames.some(name => 
        name.toLowerCase().includes(key.split('_')[0]) ||
        key.includes(name.toLowerCase().replace(/[^a-z]/g, ''))
      )) {
        return key;
      }
    }

    return null;
  }

  // Show field suggestion (non-intrusive)
  showFieldSuggestion(field, fieldName) {
    const suggestion = this.autoPopData[fieldName];
    if (!suggestion) return;

    // Create suggestion tooltip (non-intrusive)
    const tooltip = this.createSuggestionTooltip(suggestion);
    this.positionTooltip(tooltip, field);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 5000);
  }

  // Create suggestion tooltip
  createSuggestionTooltip(suggestion) {
    const tooltip = document.createElement('div');
    tooltip.className = 'psa-auto-pop-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: #1e40af;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    tooltip.innerHTML = `
      <div style="font-weight: 500; margin-bottom: 2px;">Suggested:</div>
      <div>${suggestion}</div>
      <div style="font-size: 10px; opacity: 0.8; margin-top: 2px;">Click to use suggestion</div>
    `;

    document.body.appendChild(tooltip);
    
    // Fade in
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 100);

    // Make clickable to auto-fill (if user wants)
    tooltip.style.pointerEvents = 'auto';
    tooltip.style.cursor = 'pointer';
    tooltip.addEventListener('click', () => {
      // Only fill if user explicitly clicks the suggestion
      const field = document.activeElement;
      if (field && field.tagName === 'INPUT') {
        field.value = suggestion;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
      tooltip.remove();
    });

    return tooltip;
  }

  // Position tooltip near field
  positionTooltip(tooltip, field) {
    const rect = field.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    tooltip.style.left = `${rect.left + scrollLeft}px`;
    tooltip.style.top = `${rect.bottom + scrollTop + 5}px`;
  }

  // Get suggestion for specific field
  getSuggestionForField(fieldName) {
    const normalizedName = fieldName.toLowerCase().replace(/[^a-z]/g, '_');
    return this.autoPopData[normalizedName] || null;
  }

  // Cleanup
  destroy() {
    if (this.formObserver) {
      this.formObserver.disconnect();
    }
    
    if (typeof window !== 'undefined') {
      delete window.PSAFormAssistance;
      
      // Remove tooltips
      const tooltips = document.querySelectorAll('.psa-auto-pop-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    }
    
    this.isEnabled = false;
    console.log('🧹 PSA auto-population helper cleaned up');
  }
}

// Export singleton instance
export const psaAutoPopHelper = new PSAAutoPopulationHelper();

// Safe initialization function
export function initializePSAAutoPopulation(userData) {
  try {
    psaAutoPopHelper.initialize(userData);
    return true;
  } catch (error) {
    console.error('❌ PSA auto-population initialization failed:', error);
    return false;
  }
}

// Cleanup function
export function cleanupPSAAutoPopulation() {
  psaAutoPopHelper.destroy();
}