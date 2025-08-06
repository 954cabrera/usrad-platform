// modules/equipmentDetailsManager.js - Manages equipment details forms
export class EquipmentDetailsManager {
  constructor() {
    this.equipmentIcons = {
      MRI: "/images/icons/mri-machine.svg",
      CT: "/images/icons/ct-scan-1.svg",
      "X-Ray": "/images/icons/x-ray.svg",
      Ultrasound: "/images/icons/ultrasound (1).svg",
      PET: "/images/icons/pet-scan.svg",
      Mammography: "/images/icons/screening.svg",
    };
  }

  initialize() {
    // Equipment checkbox listeners
    document.querySelectorAll('input[name="equipment"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => this.updateEquipmentDetails());
    });

    // Listen for custom events
    document.addEventListener('updateEquipmentDetails', () => this.updateEquipmentDetails());
    document.addEventListener('loadEquipmentDetails', (e) => {
      this.loadEquipmentDetails(e.detail.equipmentDetails);
    });
  }

  updateEquipmentDetails() {
    const selectedEquipment = [];
    document.querySelectorAll('input[name="equipment"]:checked').forEach((checkbox) => {
      selectedEquipment.push(checkbox.value);
    });

    const detailsSection = document.getElementById("equipment-details-section");
    const detailsContainer = document.getElementById("equipment-details-container");

    if (selectedEquipment.length > 0) {
      detailsSection.style.display = "block";
      detailsContainer.innerHTML = "";

      selectedEquipment.forEach((equipment) => {
        const detailGroup = this.createEquipmentDetailGroup(equipment);
        if (detailGroup) {
          detailsContainer.appendChild(detailGroup);
        }
      });
    } else {
      detailsSection.style.display = "none";
    }
  }

  createEquipmentDetailGroup(equipment) {
    const group = document.createElement("div");
    group.className = "equipment-detail-group";
    group.dataset.equipment = equipment;

    const detailsConfig = this.getEquipmentDetailsConfig(equipment);
    if (!detailsConfig) return null;

    group.innerHTML = detailsConfig;
    this.attachEventListeners(group);
    
    return group;
  }

  getEquipmentDetailsConfig(equipment) {
    const configs = {
      MRI: `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons.MRI}" alt="MRI" class="detail-title-icon">
          MRI Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Tesla Strength:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="mri-tesla" value="1.5T">
              <span>1.5T</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-tesla" value="3T">
              <span>3T</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-tesla" value="other">
              <span>Other</span>
            </label>
          </div>
          <input type="text" name="mri-tesla-other" class="other-input" placeholder="Enter tesla strength" style="display: none;">
        </div>
        <div class="detail-row">
          <label class="detail-label">Type:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="mri-type" value="open">
              <span>Open</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-type" value="closed">
              <span>Closed</span>
            </label>
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Manufacturer:</label>
          <div class="detail-options">
            ${this.createManufacturerOptions('mri', ['GE', 'Siemens', 'Philips', 'Canon', 'Hitachi'])}
          </div>
          <input type="text" name="mri-manufacturer-other" class="other-input" placeholder="Enter manufacturer" style="display: none;">
        </div>
      `,

      CT: `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons.CT}" alt="CT" class="detail-title-icon">
          CT Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Slice Count:</label>
          <div class="detail-options">
            ${this.createSliceOptions()}
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Cardiac Capable:</label>
          <div class="detail-options">
            ${this.createYesNoOptions('ct-cardiac')}
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Manufacturer:</label>
          <div class="detail-options">
            ${this.createManufacturerOptions('ct', ['GE', 'Siemens', 'Philips', 'Canon'])}
          </div>
          <input type="text" name="ct-manufacturer-other" class="other-input" placeholder="Enter manufacturer" style="display: none;">
        </div>
      `,

      "X-Ray": `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons["X-Ray"]}" alt="X-Ray" class="detail-title-icon">
          X-Ray Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Type:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="xray-type" value="digital">
              <span>Digital</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="xray-type" value="film">
              <span>Film</span>
            </label>
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Fluoroscopy Capable:</label>
          <div class="detail-options">
            ${this.createYesNoOptions('xray-fluoroscopy')}
          </div>
        </div>
      `,

      Ultrasound: `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons.Ultrasound}" alt="Ultrasound" class="detail-title-icon">
          Ultrasound Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Capabilities:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="checkbox" name="ultrasound-3d" value="yes">
              <span>3D Capable</span>
            </label>
            <label class="detail-option">
              <input type="checkbox" name="ultrasound-4d" value="yes">
              <span>4D Capable</span>
            </label>
          </div>
        </div>
      `,

      PET: `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons.PET}" alt="PET" class="detail-title-icon">
          PET Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Type:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="pet-type" value="pet-ct">
              <span>PET/CT Combo</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="pet-type" value="pet-only">
              <span>PET Only</span>
            </label>
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Radiopharmacy On-site:</label>
          <div class="detail-options">
            ${this.createYesNoOptions('pet-pharmacy')}
          </div>
        </div>
      `,

      Mammography: `
        <div class="equipment-detail-title">
          <img src="${this.equipmentIcons.Mammography}" alt="Mammography" class="detail-title-icon">
          Mammography Details
        </div>
        <div class="detail-row">
          <label class="detail-label">Features:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="checkbox" name="mammo-3d" value="yes">
              <span>3D Tomosynthesis</span>
            </label>
            <label class="detail-option">
              <input type="checkbox" name="mammo-cad" value="yes">
              <span>CAD (Computer-Aided Detection)</span>
            </label>
          </div>
        </div>
      `
    };

    return configs[equipment] || null;
  }

  // Helper methods to create common option patterns
  createManufacturerOptions(prefix, manufacturers) {
    return manufacturers.map(mfr => `
      <label class="detail-option">
        <input type="radio" name="${prefix}-manufacturer" value="${mfr}">
        <span>${mfr}</span>
      </label>
    `).join('') + `
      <label class="detail-option">
        <input type="radio" name="${prefix}-manufacturer" value="other">
        <span>Other</span>
      </label>
    `;
  }

  createSliceOptions() {
    const slices = ['16', '64', '128', '256', '320'];
    return slices.map(slice => `
      <label class="detail-option">
        <input type="radio" name="ct-slices" value="${slice}">
        <span>${slice}-slice</span>
      </label>
    `).join('');
  }

  createYesNoOptions(name) {
    return `
      <label class="detail-option">
        <input type="radio" name="${name}" value="yes">
        <span>Yes</span>
      </label>
      <label class="detail-option">
        <input type="radio" name="${name}" value="no">
        <span>No</span>
      </label>
    `;
  }

  attachEventListeners(group) {
    // Add event listeners for "Other" options
    group.querySelectorAll('input[type="radio"][value="other"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        const otherInput = group.querySelector(`input[name="${this.name}-other"]`);
        if (otherInput) {
          otherInput.style.display = this.checked ? "block" : "none";
          if (this.checked) {
            otherInput.focus();
          }
        }
      });
    });

    // Hide other inputs when different option selected
    group.querySelectorAll('input[type="radio"]:not([value="other"])').forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.checked) {
          const otherInput = group.querySelector(`input[name="${this.name}-other"]`);
          if (otherInput) {
            otherInput.style.display = "none";
            otherInput.value = "";
          }
        }
      });
    });
  }

  collectEquipmentDetails() {
    const details = {};
    const detailGroups = document.querySelectorAll(".equipment-detail-group");

    detailGroups.forEach((group) => {
      const equipment = group.dataset.equipment;
      const equipmentDetails = {};

      // Collect radio button values
      group.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
        const name = radio.name;
        const value = radio.value;

        if (value === "other") {
          const otherInput = group.querySelector(`input[name="${name}-other"]`);
          equipmentDetails[name] = otherInput ? otherInput.value : value;
        } else {
          equipmentDetails[name] = value;
        }
      });

      // Collect checkbox values
      group.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        equipmentDetails[checkbox.name] = checkbox.value;
      });

      if (Object.keys(equipmentDetails).length > 0) {
        details[equipment] = equipmentDetails;
      }
    });

    return details;
  }

  loadEquipmentDetails(savedDetails) {
    if (!savedDetails) return;

    Object.entries(savedDetails).forEach(([equipment, details]) => {
      const group = document.querySelector(`.equipment-detail-group[data-equipment="${equipment}"]`);
      if (!group) return;

      Object.entries(details).forEach(([field, value]) => {
        // Handle radio buttons
        const radio = group.querySelector(`input[name="${field}"][value="${value}"]`);
        if (radio) {
          radio.checked = true;
        } else {
          // Handle "other" fields
          const otherRadio = group.querySelector(`input[name="${field}"][value="other"]`);
          if (otherRadio) {
            otherRadio.checked = true;
            const otherInput = group.querySelector(`input[name="${field}-other"]`);
            if (otherInput) {
              otherInput.style.display = "block";
              otherInput.value = value;
            }
          }
        }

        // Handle checkboxes
        const checkbox = group.querySelector(`input[name="${field}"][type="checkbox"]`);
        if (checkbox && value === "yes") {
          checkbox.checked = true;
        }
      });
    });
  }
}