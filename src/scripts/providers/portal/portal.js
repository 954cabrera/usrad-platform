  // src/scripts/providers/portal/portal.js
// Simplified version that works with existing files

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

console.log('🚀 Portal initialization starting...');

// Initialize Supabase client
function initializeSupabase() {
  // Get credentials from window (set by pre-portal.astro)
  const supabaseUrl = window.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = window.PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase configuration missing!');
    return null;
  }
  
  console.log('🔌 Connecting to Supabase...');
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
}

// Load organization data from database
async function loadOrganizationData(supabase) {
  try {
    if (!supabase) {
      console.log('📦 Loading from cache (Supabase unavailable)');
      return loadFromCache();
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.warn('⚠️ User not authenticated');
      return loadFromCache();
    }
    
    console.log('📥 Loading organization from database...');
    const { data, error } = await supabase
      .from('corporate_entities')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('📝 No organization found for user');
      } else {
        console.error('❌ Error loading organization:', error);
      }
      return loadFromCache();
    }
    
    if (data) {
      console.log('✅ Loaded organization from database:', data.legal_name);
      
      // Prefill form
      prefillOrganizationForm(data);
      
      // Update cache
      localStorage.setItem('organization_form_data_v1', JSON.stringify({
        ...mapDbToForm(data),
        cached_at: Date.now(),
        source: 'database'
      }));
    }
    
    return data;
  } catch (error) {
    console.error('❌ Failed to load organization:', error);
    return loadFromCache();
  }
}

// Load from cache
function loadFromCache() {
  const cached = localStorage.getItem('organization_form_data_v1');
  if (cached) {
    const data = JSON.parse(cached);
    console.log('📦 Loaded from cache');
    prefillOrganizationForm(data);
    return data;
  }
  return null;
}

// Map database record to form format
function mapDbToForm(dbRecord) {
  const nameParts = (dbRecord.signer_name || '').split(' ');
  return {
    legalName: dbRecord.legal_name,
    taxId: dbRecord.tax_id,
    businessType: dbRecord.organization_type,
    website: dbRecord.website,
    address: {
      street: dbRecord.corporate_address,
      city: dbRecord.corporate_city,
      state: dbRecord.corporate_state,
      zip: dbRecord.corporate_zip
    },
    signer: {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      fullName: dbRecord.signer_name,
      title: dbRecord.signer_title,
      email: dbRecord.email,
      phone: dbRecord.phone
    }
  };
}

// Prefill the form with data
function prefillOrganizationForm(data) {
  if (!data) return;
  
  // Helper to safely set field value
  const setFieldValue = (name, value) => {
    const field = document.querySelector(`[name="${name}"]`);
    if (field && value !== undefined && value !== null) {
      field.value = value;
      
      // Trigger input event to format the value
      field.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
  
  // Helper to format phone for display
  const formatPhoneForDisplay = (phone) => {
    if (!phone) return '';
    const cleaned = phone.toString().replace(/\D/g, '');
    if (cleaned.length !== 10) return phone; // Return as-is if not 10 digits
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
  };
  
  // Helper to format Tax ID for display
  const formatTaxIdForDisplay = (taxId) => {
    if (!taxId) return '';
    const cleaned = taxId.toString().replace(/\D/g, '');
    if (cleaned.length !== 9) return taxId; // Return as-is if not 9 digits
    return `${cleaned.slice(0,2)}-${cleaned.slice(2,9)}`;
  };
  
  // Map your form field names here
  setFieldValue('legalName', data.legalName || data.legal_name);
  setFieldValue('taxId', formatTaxIdForDisplay(data.taxId || data.tax_id));
  setFieldValue('dba', data.dba);
  setFieldValue('businessType', data.businessType || data.organization_type);
  setFieldValue('yearEstablished', data.yearEstablished || data.year_established);
  setFieldValue('website', data.website);
  
  // Address fields
  if (data.address) {
    setFieldValue('corpAddress', data.address.street);
    setFieldValue('corpCity', data.address.city);
    setFieldValue('corpState', data.address.state);
    setFieldValue('corpZip', data.address.zip);
  } else {
    setFieldValue('corpAddress', data.corporate_address);
    setFieldValue('corpCity', data.corporate_city);
    setFieldValue('corpState', data.corporate_state);
    setFieldValue('corpZip', data.corporate_zip);
  }
  
  // Signer fields with formatted phone
  if (data.signer) {
    setFieldValue('signerFirstName', data.signer.firstName);
    setFieldValue('signerLastName', data.signer.lastName);
    setFieldValue('signerTitle', data.signer.title);
    setFieldValue('signerEmail', data.signer.email);
    setFieldValue('signerPhone', formatPhoneForDisplay(data.signer.phone));
  } else {
    setFieldValue('signerEmail', data.email);
    setFieldValue('signerPhone', formatPhoneForDisplay(data.phone));
    setFieldValue('signerTitle', data.signer_title);
    
    const nameParts = (data.signer_name || '').split(' ');
    setFieldValue('signerFirstName', nameParts[0]);
    setFieldValue('signerLastName', nameParts.slice(1).join(' '));
  }
  
  console.log('📝 Form prefilled with formatted values');
}

// Save organization to database
async function saveOrganization(supabase, formData) {
  try {
    if (!supabase) {
      console.log('📦 Saving to cache only (offline mode)');
      saveToCache(formData);
      return { success: true, offline: true };
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }
    
    // Clean phone numbers and tax ID before saving (remove formatting)
    const cleanPhone = (phone) => phone ? phone.replace(/\D/g, '') : null;
    const cleanTaxId = (taxId) => taxId ? taxId.replace(/\D/g, '') : null;
    
    // Prepare database record
    const dbRecord = {
      user_id: user.id,
      owner_user_id: user.id,  // Also populate this field
      legal_name: formData.legalName,
      tax_id: cleanTaxId(formData.taxId), // Store only digits
      organization_type: formData.businessType,
      corporate_address: formData.address?.street,
      corporate_city: formData.address?.city,
      corporate_state: formData.address?.state,
      corporate_zip: formData.address?.zip,
      phone: cleanPhone(formData.signer?.phone), // Store only digits
      email: formData.signer?.email,
      signer_name: formData.signer?.fullName,
      signer_title: formData.signer?.title,
      website: formData.website,
      is_active: true,
      schema_version: 1
    };
    
    console.log('💾 Saving to database...');
    
    const { data, error } = await supabase
      .from('corporate_entities')
      .upsert(dbRecord, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Database save failed:', error);
      throw error;
    }
    
    console.log('✅ Saved to database');
    
    // Also save to cache
    saveToCache(formData);
    
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Save error:', error);
    // Save to cache as fallback
    saveToCache(formData);
    return { success: false, error: error.message };
  }
}

// Save to cache
function saveToCache(formData) {
  localStorage.setItem('organization_form_data_v1', JSON.stringify({
    ...formData,
    cached_at: Date.now()
  }));
  console.log('📦 Saved to cache');
}

// Setup form submission
function setupFormSubmission(supabase) {
  const form = document.getElementById('organization-form');
  
  // Try multiple selectors if the first doesn't work
  const formElement = form || 
                      document.querySelector('form') || 
                      document.querySelector('.organization-form');
  
  if (!formElement) {
    console.warn('⚠️ Form not found for submission setup');
    return;
  }
  
  console.log('📝 Setting up form submission for:', formElement);
  
  // Find the continue button (might be a link styled as button)
  const continueBtn = document.getElementById('proceed-to-pricing') || 
                      document.querySelector('.btn-primary') ||
                      document.querySelector('a[href*="facilities"]');
  
  if (continueBtn) {
    console.log('✅ Continue button found:', continueBtn);
    
    continueBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('🔵 Continue button clicked');
      
      // Validate required fields first
      const requiredFields = formElement.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        }
      });
      
      if (!isValid) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Collect form data
      const formData = collectFormData();
      
      // Show loading state
      const originalText = continueBtn.textContent;
      continueBtn.textContent = 'Saving...';
      continueBtn.disabled = true;
      
      // Save to database
      const result = await saveOrganization(supabase, formData);
      
      if (result.success) {
        // Show success
        showToast('Organization information saved!', 'success');
        
        // Navigate after short delay
        setTimeout(() => {
          window.location.href = continueBtn.getAttribute('href') || '/providers/onboarding/facilities';
        }, 500);
      } else {
        // Show error but still allow navigation
        showToast('Saved locally. Will sync when online.', 'warning');
        continueBtn.textContent = originalText;
        continueBtn.disabled = false;
        
        // Still navigate if user clicks again
        setTimeout(() => {
          window.location.href = continueBtn.getAttribute('href') || '/providers/onboarding/facilities';
        }, 2000);
      }
    });
  } else {
    console.warn('⚠️ Continue button not found');
  }
  
  // Add auto-save on form change
  let saveTimeout;
  let lastSavedData = JSON.stringify(collectFormData());
  
  // Listen to all input changes in the form
  const allInputs = formElement.querySelectorAll('input, select, textarea');
  console.log(`📝 Monitoring ${allInputs.length} form fields for changes`);
  
  allInputs.forEach(input => {
    // Use multiple event types to catch all changes
    ['input', 'change', 'blur'].forEach(eventType => {
      input.addEventListener(eventType, () => {
        clearTimeout(saveTimeout);
        
        // Check if data actually changed
        const currentData = JSON.stringify(collectFormData());
        if (currentData === lastSavedData) {
          return; // No changes, don't save
        }
        
        // Show pending indicator
        showSaveIndicator('pending');
        
        saveTimeout = setTimeout(async () => {
          console.log('🔄 Auto-saving changes...');
          const formData = collectFormData();
          
          // Save to database
          const result = await saveOrganization(supabase, formData);
          
          if (result.success) {
            lastSavedData = JSON.stringify(formData);
            showSaveIndicator('saved');
            console.log('✅ Auto-save complete');
          } else {
            showSaveIndicator('error');
            console.log('⚠️ Auto-save failed, data in localStorage');
          }
        }, 2000); // Auto-save after 2 seconds of no typing
      });
    });
  });
  
  console.log('✅ Form submission and auto-save setup complete');
}

// Show save indicator
function showSaveIndicator(status) {
  // Remove existing indicator
  let indicator = document.getElementById('save-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'save-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      z-index: 1000;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(indicator);
  }
  
  const configs = {
    pending: { text: '○ Saving...', bg: '#6b7280', color: 'white' },
    saved: { text: '✓ Saved', bg: '#10b981', color: 'white' },
    error: { text: '⚠ Save failed', bg: '#ef4444', color: 'white' }
  };
  
  const config = configs[status];
  indicator.textContent = config.text;
  indicator.style.backgroundColor = config.bg;
  indicator.style.color = config.color;
  indicator.style.display = 'block';
  
  // Auto-hide for saved status
  if (status === 'saved') {
    setTimeout(() => {
      indicator.style.opacity = '0';
      setTimeout(() => {
        indicator.style.display = 'none';
        indicator.style.opacity = '1';
      }, 300);
    }, 2000);
  }
}

// Collect form data
function collectFormData() {
  const form = document.getElementById('organization-form');
  if (!form) return {};
  
  const formData = new FormData(form);
  
  return {
    legalName: formData.get('legalName'),
    taxId: formData.get('taxId'),
    businessType: formData.get('businessType'),
    yearEstablished: formData.get('yearEstablished'),
    dba: formData.get('dba'),
    website: formData.get('website'),
    address: {
      street: formData.get('corpAddress'),
      city: formData.get('corpCity'),
      state: formData.get('corpState'),
      zip: formData.get('corpZip')
    },
    signer: {
      firstName: formData.get('signerFirstName'),
      lastName: formData.get('signerLastName'),
      fullName: `${formData.get('signerFirstName')} ${formData.get('signerLastName')}`,
      title: formData.get('signerTitle'),
      email: formData.get('signerEmail'),
      phone: formData.get('signerPhone')
    },
    schemaVersion: 1
  };
}

// Show toast notification
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    max-width: 400px;
    z-index: 9999;
    animation: slideUp 0.3s ease;
  `;
  
  const colors = {
    success: { bg: '#10b981', color: 'white' },
    error: { bg: '#ef4444', color: 'white' },
    warning: { bg: '#f59e0b', color: 'white' },
    info: { bg: '#3b82f6', color: 'white' }
  };
  
  const config = colors[type] || colors.info;
  toast.style.backgroundColor = config.bg;
  toast.style.color = config.color;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Initialize when DOM is ready
async function initialize() {
  // Wait a bit for window variables to be set
  setTimeout(async () => {
    try {
      console.log('🎬 Starting portal initialization...');
      
      // Initialize Supabase
      const supabase = initializeSupabase();
      
      if (supabase) {
        console.log('✅ Supabase initialized');
        
        // Load organization data
        await loadOrganizationData(supabase);
        
        // Setup form submission
        setupFormSubmission(supabase);
      } else {
        console.log('⚠️ Running in offline mode');
        
        // Load from cache
        loadFromCache();
        
        // Setup form submission without DB
        setupFormSubmission(null);
      }
      
      // Attach input formatters
      setupInputFormatters();
      
      console.log('✅ Portal ready');
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
    }
  }, 100);
}

// Setup input formatters for phone, tax ID, ZIP
function setupInputFormatters() {
  console.log('📝 Setting up input formatters...');
  
  // Load the formatters script if available
  if (window.InputFormatters) {
    window.InputFormatters.attachToForm('organization-form');
    console.log('✅ Input formatters attached');
  } else {
    // Inline simple formatters if script not loaded
    setupBasicFormatters();
  }
}

// Basic inline formatters as fallback
function setupBasicFormatters() {
  // Format phone numbers
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name*="phone"], input[name*="Phone"]');
  phoneInputs.forEach(input => {
    input.placeholder = '(555) 555-5555';
    input.maxLength = 14;
    
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.substring(0, 10);
      
      if (value.length > 6) {
        value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
      } else if (value.length > 3) {
        value = `(${value.slice(0,3)}) ${value.slice(3)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      
      e.target.value = value;
    });
  });
  
  // Format Tax ID
  const taxInputs = document.querySelectorAll('input[name*="tax"], input[name*="Tax"], input[name="taxId"]');
  taxInputs.forEach(input => {
    input.placeholder = '12-3456789';
    input.maxLength = 10;
    
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 9) value = value.substring(0, 9);
      
      if (value.length > 2) {
        value = `${value.slice(0,2)}-${value.slice(2)}`;
      }
      
      e.target.value = value;
    });
  });
  
  // Format ZIP codes
  const zipInputs = document.querySelectorAll('input[name*="zip"], input[name*="Zip"]');
  zipInputs.forEach(input => {
    input.placeholder = '12345';
    input.maxLength = 10;
    
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 9) value = value.substring(0, 9);
      
      if (value.length > 5) {
        value = `${value.slice(0,5)}-${value.slice(5)}`;
      }
      
      e.target.value = value;
    });
  });
  
  // Format Year Established
  const yearInputs = document.querySelectorAll('input[name*="year"], input[name*="Year"], input[name*="established"]');
  yearInputs.forEach(input => {
    const currentYear = new Date().getFullYear();
    input.placeholder = currentYear.toString();
    input.maxLength = 4;
    input.inputMode = 'numeric';
    
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) value = value.substring(0, 4);
      e.target.value = value;
      
      // Visual feedback
      const yearNum = parseInt(value);
      if (value.length === 4) {
        if (yearNum >= 1800 && yearNum <= currentYear) {
          e.target.style.borderColor = '#10b981'; // Green
        } else {
          e.target.style.borderColor = '#ef4444'; // Red
        }
      } else if (value.length > 0) {
        e.target.style.borderColor = '#fbbf24'; // Yellow
      } else {
        e.target.style.borderColor = '';
      }
    });
    
    // Only allow numbers
    input.addEventListener('keypress', (e) => {
      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
        e.preventDefault();
      }
    });
  });
  
  // Validate emails
  const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[name*="Email"]');
  emailInputs.forEach(input => {
    input.type = 'email';
    input.placeholder = 'email@example.com';
    input.spellcheck = false;
    input.autocapitalize = 'off';
    
    // Real-time validation
    input.addEventListener('input', (e) => {
      const value = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (value && value.includes('@')) {
        if (emailRegex.test(value)) {
          e.target.style.borderColor = '#10b981'; // Green
        } else {
          e.target.style.borderColor = '#fbbf24'; // Yellow
        }
      } else {
        e.target.style.borderColor = '';
      }
    });
    
    // Clean up on blur
    input.addEventListener('blur', (e) => {
      e.target.value = e.target.value.toLowerCase().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (e.target.value && !emailRegex.test(e.target.value)) {
        e.target.style.borderColor = '#ef4444'; // Red
      }
    });
    
    // Prevent spaces
    input.addEventListener('keypress', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    });
  });
  
  console.log('✅ Basic formatters attached');
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);