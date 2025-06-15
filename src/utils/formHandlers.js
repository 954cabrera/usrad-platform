// src/utils/formHandlers.js
import { showToast } from './toastService.js';
import { formatEIN, formatPhone, isValidEmail } from './validators.js';
import { saveCorporateEntity } from './supabaseService.js';

const get = id => document.getElementById(id)?.value.trim();


console.log("🧪 Fetched values:", {
    tax_id: get("tax_id"),
    phone: get("organization-phone"),
    email: get("organization-email"),
  });
  

  export async function handleSaveOrgInfo(user, supabase) {
    const saveBtn = document.getElementById("save-org-info");
    if (saveBtn.disabled) return; // prevent rapid re-click
  
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";
  
    try {
      const get = id => document.getElementById(id)?.value.trim();
  
      const orgData = {
        user_id: user.id,
        legal_name: get('legal_name'),
        tax_id: formatEIN(get('tax_id')),
        organization_type: get('organization-type'),
        corporate_address: get('corporate-street'),
        corporate_city: get('corporate-city'),
        corporate_state: get('corporate-state')?.toUpperCase(),
        corporate_zip: get('corporate-zip'),
        phone: formatPhone(get('organization-phone')),
        email: get('organization-email'),
        signer_name: get('signer_name'),
        signer_title: get('signer_title'),
      };
  
      // Validate email
      const emailInput = document.getElementById("organization-email");

    if (!isValidEmail(orgData.email)) {
    emailInput.classList.add("input-error");
    emailInput.focus();
    showToast("❌ Invalid email format", "error");
    return;
    } else {
    emailInput.classList.remove("input-error");
    }

  
      const { error } = await saveCorporateEntity(supabase, orgData);
      if (error) {
        showToast(`❌ Failed to save: ${error.message}`, "error");
      } else {
        showToast("✅ Organization information saved");
      }
  
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Progress";
    }
  }
  