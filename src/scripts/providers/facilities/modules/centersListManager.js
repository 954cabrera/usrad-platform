// modules/centersListManager.js - Manages the centers list display
export class CentersListManager {
  constructor(state) {
    this.state = state;
    
    // Listen for updates
    document.addEventListener('centersUpdated', () => this.updateUI());
  }

  updateUI() {
    // Update stats
    document.getElementById("center-count").textContent = this.state.getCenterCount();
    document.getElementById("state-count").textContent = this.state.getUniqueStatesCount();

    // Show/hide sections
    if (this.state.getCenterCount() > 0) {
      document.getElementById("centers-list").style.display = "block";
      document.getElementById("continue-section").style.display = "block";
      document.getElementById("add-center-form").style.display = "none";
      document.getElementById("final-count").textContent = this.state.getCenterCount();

      // Render centers
      this.renderCenters();

      // Re-attach event listener to Add Another button
      setTimeout(() => {
        const addAnotherBtn = document.getElementById("add-another-btn");
        if (addAnotherBtn && !addAnotherBtn.hasAttribute('data-listener')) {
          addAnotherBtn.setAttribute('data-listener', 'true');
          addAnotherBtn.addEventListener("click", () => {
            document.getElementById("facility-form").dispatchEvent(
              new CustomEvent('showAddForm')
            );
          });
        }
      }, 100);
    } else {
      document.getElementById("centers-list").style.display = "none";
      document.getElementById("continue-section").style.display = "none";
      document.getElementById("add-center-form").style.display = "block";
    }
  }

  renderCenters() {
    const container = document.getElementById("centers-container");
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
    formHandler.dispatchEvent(new CustomEvent('showEditForm', { detail: { isEditing: true } }));

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
    document.querySelector("#add-center-form .section-title").textContent = "Edit Center";
    document.getElementById("submit-btn").textContent = "Save Changes";

    // Fill the form with center data
    this.fillFormWithCenterData(center);
  }

  fillFormWithCenterData(center) {
    const form = document.getElementById("facility-form");
    form.centerName.value = center.name;
    form.address.value = center.address;
    form.city.value = center.city;
    form.state.value = center.state;
    form.zipCode.value = center.zipCode;
    form.phone.value = center.phone;
    form.isPrimary.checked = center.isPrimary;
    form.adminName.value = center.administrator.name;
    form.adminTitle.value = center.administrator.title;
    form.adminEmail.value = center.administrator.email;
    form.adminPhone.value = center.administrator.phone;

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