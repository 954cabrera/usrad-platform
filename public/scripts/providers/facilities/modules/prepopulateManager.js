// modules/prepopulateManager.js - Handles form prepopulation
export class PrepopulateManager {
  setup(orgData) {
    const toggle = document.getElementById("use-org-info");
    const prepopSection = document.getElementById("prepopulate-section");

    // Only show toggle if we have organization data
    if (!orgData.legalName) {
      prepopSection.style.display = "none";
      return;
    }

    // Determine default state based on role
    if (orgData.role === "single-admin") {
      toggle.checked = true;
      this.populateFromOrg(orgData);
    } else if (orgData.role === "executive") {
      prepopSection.style.display = "none";
    }

    // Handle toggle changes
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        this.populateFromOrg(orgData);
      } else {
        this.clearForm();
      }
    });
  }

  populateFromOrg(orgData) {
    const form = document.getElementById("facility-form");

    // Center name from organization name or DBA
    form.centerName.value = orgData.dba || orgData.legalName || "";

    // Address information
    if (orgData.address) {
      form.address.value = orgData.address.street || "";
      form.city.value = orgData.address.city || "";
      form.state.value = orgData.address.state || "";
      form.zipCode.value = orgData.address.zip || "";
    }

    // Use main phone for center phone (user can change if different)
    const signupData = JSON.parse(
      localStorage.getItem("provider_signup_data") || "{}"
    );
    form.phone.value = signupData.phone || "";

    // Administrator from authorized signer
    if (orgData.signer) {
      form.adminName.value = orgData.signer.fullName || "";
      form.adminTitle.value = orgData.signer.title || "";
      form.adminEmail.value = orgData.signer.email || "";
      form.adminPhone.value = orgData.signer.phone || "";
    }
  }

  clearForm() {
    const form = document.getElementById("facility-form");
    // Only clear text inputs, not checkboxes or equipment
    const textInputs = form.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="tel"], select'
    );
    textInputs.forEach((input) => {
      if (input.name !== "isPrimary") {
        input.value = "";
      }
    });
  }
}