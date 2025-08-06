// modules/facilitiesFormHandler.js - Form submission and handling
import { EquipmentDetailsManager } from './equipmentDetailsManager.js';

export class FormHandler {
  constructor(state) {
    this.state = state;
    this.equipmentManager = new EquipmentDetailsManager();
  }

  initialize() {
    const form = document.getElementById("facility-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // Add Another Center button
    const addAnotherBtn = document.getElementById("add-another-btn");
    if (addAnotherBtn) {
      addAnotherBtn.addEventListener("click", () => this.showAddForm());
    }

    // Cancel button
    const cancelBtn = document.getElementById("cancel-add-center");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.cancelAddCenter());
    }
  }

  cancelAddCenter() {
    if (this.state.getCenterCount() > 0) {
      // Clear form
      document.getElementById("facility-form").reset();
      
      // Hide add form, show centers list
      document.getElementById("add-center-form").style.display = "none";
      document.getElementById("centers-list").style.display = "block";
      document.getElementById("continue-section").style.display = "block";
      
      // Clear editing state
      this.state.clearEditingIndex();
      
      // Update stats in case they changed
      document.dispatchEvent(new CustomEvent('centersUpdated'));
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Validate email before submission
    const emailInput = document.querySelector('input[name="adminEmail"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      emailInput.focus();
      // Trigger validation display
      emailInput.dispatchEvent(new Event('blur'));
      return;
    }

    const formData = new FormData(e.target);
    const center = this.collectFormData(formData);

    const editingIndex = this.state.getEditingIndex();
    if (editingIndex !== null) {
      // Update existing center
      this.state.updateCenter(editingIndex, center);
      this.state.clearEditingIndex();
    } else {
      // Add new center
      this.state.addCenter(center);
    }

    // Reset form and update UI
    e.target.reset();
    document.getElementById("submit-btn").textContent = "Add Center";
    
    // Update UI through centers manager
    document.dispatchEvent(new CustomEvent('centersUpdated'));
  }

  collectFormData(formData) {
    const equipment = [];
    formData.getAll("equipment").forEach((eq) => equipment.push(eq));

    // Collect equipment details
    const equipmentDetails = this.equipmentManager.collectEquipmentDetails();

    return {
      name: formData.get("centerName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      phone: formData.get("phone"),
      equipment: equipment,
      equipmentDetails: equipmentDetails,
      isPrimary: formData.get("isPrimary") === "on",
      administrator: {
        name: formData.get("adminName"),
        title: formData.get("adminTitle"),
        email: formData.get("adminEmail"),
        phone: formData.get("adminPhone"),
      },
    };
  }

  showAddForm(isEditing = false) {
    if (!isEditing) {
      // Only reset when adding new center, not editing
      document.getElementById("facility-form").reset();
      this.state.clearEditingIndex();

      // Update the section header and button for adding
      const sectionTitle = document.querySelector("#add-center-form .section-title");
      sectionTitle.textContent = "Add Another Center";

      const submitBtn = document.getElementById("submit-btn");
      submitBtn.textContent = "Add Center";

      // Show prepopulate section when adding
      const prepopSection = document.getElementById("prepopulate-section");
      if (prepopSection) {
        prepopSection.style.display = "block";
        document.getElementById("use-org-info").checked = false;
      }

      // Clear equipment details
      document.getElementById("equipment-details-section").style.display = "none";
      document.getElementById("equipment-details-container").innerHTML = "";
      
      // Show cancel button when adding additional centers
      const cancelBtn = document.getElementById("cancel-add-center");
      if (cancelBtn && this.state.getCenterCount() > 0) {
        cancelBtn.style.display = "flex";
      }
    }

    // Always show the form and scroll to it
    document.getElementById("add-center-form").style.display = "block";
    document.getElementById("add-center-form").scrollIntoView({ behavior: "smooth" });
  }

  continueToNext() {
    if (this.state.getCenterCount() === 0) {
      alert("Please add at least one imaging center before continuing.");
      return;
    }

    // Save completion status
    localStorage.setItem("facilities_completed", "true");

    // Navigate to market calculator
    window.location.href = "/providers/onboarding/market-calculator";
  }
}