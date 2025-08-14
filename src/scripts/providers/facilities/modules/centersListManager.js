// modules/centersListManager.js - Manages the centers list display
export class CentersListManager {
  constructor(state) {
    this.state = state;
    
    // Listen for updates
    document.addEventListener('centersUpdated', () => this.updateUI());
  }

  updateUI() {
    // Update stats with correct selectors and null checks
    const centerCountEl = document.getElementById("center-count");
    const stateCountEl = document.getElementById("state-count");
    
    if (centerCountEl) {
      centerCountEl.textContent = this.state.getCenterCount();
      console.log('✅ Updated center count to:', this.state.getCenterCount());
    } else {
      console.log('❌ center-count element not found');
    }
    
    if (stateCountEl) {
      stateCountEl.textContent = this.state.getUniqueStatesCount();
      console.log('✅ Updated state count to:', this.state.getUniqueStatesCount());
    } else {
      console.log('❌ state-count element not found');
    }

    // Show/hide sections with null checks
    const centersList = document.getElementById("centers-list");
    const continueSection = document.getElementById("continue-section");
    const addCenterSection = document.getElementById("add-center-section"); // Correct ID
    const finalCountEl = document.getElementById("final-count");

    if (this.state.getCenterCount() > 0) {
      // Show centers list if it exists
      if (centersList) {
        centersList.style.display = "block";
      }
      
      // Show continue section if it exists
      if (continueSection) {
        continueSection.style.display = "block";
      }
      
      // Hide add center form if it exists
      if (addCenterSection) {
        addCenterSection.style.display = "none";
      }
      
      // Update final count if it exists
      if (finalCountEl) {
        finalCountEl.textContent = this.state.getCenterCount();
      }

      // Render centers
      this.renderCenters();

      // Re-attach event listener to Add Another button
      setTimeout(() => {
        const addAnotherBtn = document.getElementById("add-another-btn");
        if (addAnotherBtn && !addAnotherBtn.hasAttribute('data-listener')) {
          addAnotherBtn.setAttribute('data-listener', 'true');
          addAnotherBtn.addEventListener("click", () => {
            const facilityForm = document.getElementById("facility-form");
            if (facilityForm) {
              facilityForm.dispatchEvent(new CustomEvent('showAddForm'));
            }
          });
        }
      }, 100);
    } else {
      // Hide sections when no centers
      if (centersList) {
        centersList.style.display = "none";
      }
      
      if (continueSection) {
        continueSection.style.display = "none";
      }
      
      if (addCenterSection) {
        addCenterSection.style.display = "block";
      }
    }
  }

  renderCenters() {
    const container = document.getElementById("centers-container");
    
    // Add null check for container
    if (!container) {
      console.log('❌ centers-container element not found');
      return;
    }
    
    container.innerHTML = "";

    this.state.getCenters().forEach((center, index) => {
      const centerCard = document.createElement("div");
      centerCard.className = `center-card ${center.isPrimary ? "primary" : ""}`;

      centerCard.innerHTML = `
        <div class="center-info">
          <h3>${center.name}</h3>
          <div class="center-address">
            ${center.address}, ${center.city}, ${center.state} ${center.zipCode}
          </div>
          <div class="center-phone">📞 ${center.phone}</div>
          <div class="center-admin">
            👤 ${center.administrator.name} - ${center.administrator.title}
            <br>
            <span class="admin-contact">📧 ${center.administrator.email} | 📱 ${center.administrator.phone}</span>
          </div>
          <div class="center-equipment">
            ${center.equipment.map((eq) => `<span class="equipment-tag">${eq}</span>`).join("")}
          </div>
          ${center.isPrimary ? '<span class="primary-badge">Primary Location</span>' : ""}
        </div>
        <div class="center-actions">
          <button class="btn-icon" onclick="editCenter(${index})" title="Edit">
            ✏️
          </button>
          <button class="btn-icon delete" onclick="deleteCenter(${index})" title="Delete">
            🗑️
          </button>
        </div>
      `;

      container.appendChild(centerCard);
    });
  }

  editCenter(index) {
    // Set editing mode
    this.state.setEditingIndex(index);
    const center = this.state.getCenter(index);

    // Show form without resetting
    const formHandler = document.getElementById("facility-form");
    if (formHandler) {
      formHandler.dispatchEvent(new CustomEvent('showEditForm', { detail: { isEditing: true } }));
    }

    // Hide prepopulate toggle when editing
    const prepopSection = document.getElementById("prepopulate-section");
    if (prepopSection) {
      prepopSection.style.display = "none";
    }

    // Hide cancel button when editing
    const cancelBtn = document.getElementById("cancel-add-center");
    if (cancelBtn) {
      cancelBtn.style.display = "none";
    }

    // Set title and button for editing
    const sectionTitle = document.querySelector("#add-center-section .section-title");
    if (sectionTitle) {
      sectionTitle.textContent = "Edit Center";
    }
    
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
      submitBtn.textContent = "Save Changes";
    }

    // Fill the form with center data
    this.fillFormWithCenterData(center);
  }

  fillFormWithCenterData(center) {
    const form = document.getElementById("facility-form");
    if (!form) {
      console.log('❌ facility-form not found');
      return;
    }

    // Safely fill form fields
    if (form.centerName) form.centerName.value = center.name;
    if (form.address) form.address.value = center.address;
    if (form.city) form.city.value = center.city;
    if (form.state) form.state.value = center.state;
    if (form.zipCode) form.zipCode.value = center.zipCode;
    if (form.phone) form.phone.value = center.phone;
    if (form.isPrimary) form.isPrimary.checked = center.isPrimary;
    if (form.adminName) form.adminName.value = center.administrator.name;
    if (form.adminTitle) form.adminTitle.value = center.administrator.title;
    if (form.adminEmail) form.adminEmail.value = center.administrator.email;
    if (form.adminPhone) form.adminPhone.value = center.administrator.phone;

    // Check equipment boxes
    document.querySelectorAll('input[name="equipment"]').forEach((checkbox) => {
      checkbox.checked = center.equipment.includes(checkbox.value);
    });

    // Trigger equipment details update
    document.dispatchEvent(new CustomEvent('updateEquipmentDetails'));

    // Load saved equipment details if they exist
    if (center.equipmentDetails) {
      document.dispatchEvent(new CustomEvent('loadEquipmentDetails', { 
        detail: { equipmentDetails: center.equipmentDetails } 
      }));
    }
  }

  deleteCenter(index) {
    if (confirm("Are you sure you want to remove this center?")) {
      this.state.deleteCenter(index);
      this.updateUI();
    }
  }
}