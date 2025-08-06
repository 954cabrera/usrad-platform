// facilities.js - Facilities page JavaScript

// Define equipment icon mappings
const equipmentIcons = {
  MRI: "/images/icons/mri-machine.svg",
  CT: "/images/icons/ct-scan-1.svg",
  "X-Ray": "/images/icons/x-ray.svg",
  Ultrasound: "/images/icons/ultrasound (1).svg",
  PET: "/images/icons/pet-scan.svg",
  Mammography: "/images/icons/screening.svg",
};

console.log("Facilities script loaded");

// State management - make these global
window.centers = [];
window.editingIndex = null;

// Define global functions immediately
window.editCenter = function (index) {
  // Set editing mode
  window.editingIndex = index;
  const center = window.centers[index];

  // Show form without resetting (pass true for isEditing)
  showAddForm(true);

  // Hide prepopulate toggle when editing
  const prepopSection = document.getElementById("prepopulate-section");
  if (prepopSection) {
    prepopSection.style.display = "none";
  }

  // Set title and button for editing
  document.querySelector("#add-center-form .section-title").textContent =
    "Edit Center";
  document.getElementById("submit-btn").textContent = "Save Changes";

  // Fill the form with center data
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
  document
    .querySelectorAll('input[name="equipment"]')
    .forEach((checkbox) => {
      checkbox.checked = center.equipment.includes(checkbox.value);
    });

  // Update equipment details display
  updateEquipmentDetails();

  // Load saved equipment details if they exist
  if (center.equipmentDetails) {
    loadEquipmentDetails(center.equipmentDetails);
  }
};

// Delete center
window.deleteCenter = function (index) {
  if (confirm("Are you sure you want to remove this center?")) {
    window.centers.splice(index, 1);
    localStorage.setItem(
      "provider_centers",
      JSON.stringify(window.centers)
    );
    updateUI();
  }
};

// Continue to next step
window.continueToNext = function () {
  if (window.centers.length === 0) {
    alert("Please add at least one imaging center before continuing.");
    return;
  }

  // Save completion status
  localStorage.setItem("facilities_completed", "true");

  // Navigate to market calculator
  window.location.href = "/providers/onboarding/market-calculator";
};

// Load saved centers and organization data on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedCenters = localStorage.getItem("provider_centers");
  if (savedCenters) {
    window.centers = JSON.parse(savedCenters);
    updateUI();
  }

  // Load organization data
  const orgData = JSON.parse(
    localStorage.getItem("provider_organization") || "{}"
  );
  setupPrepopulate(orgData);

  // Phone number formatting
  const phoneInputs = document.querySelectorAll(
    'input[name="phone"], input[name="adminPhone"]'
  );
  phoneInputs.forEach((input) => {
    input.addEventListener("input", formatPhoneNumber);
  });

  // Email validation
  const emailInput = document.querySelector('input[name="adminEmail"]');
  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", clearEmailError);

  // Add Another Center button - Add event listener after DOM loads
  const addAnotherBtn = document.getElementById("add-another-btn");
  if (addAnotherBtn) {
    addAnotherBtn.addEventListener("click", function () {
      showAddForm();
    });
  }

  // Equipment checkbox listeners
  document
    .querySelectorAll('input[name="equipment"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", updateEquipmentDetails);
    });
});

// Update equipment details section
function updateEquipmentDetails() {
  const selectedEquipment = [];
  document
    .querySelectorAll('input[name="equipment"]:checked')
    .forEach((checkbox) => {
      selectedEquipment.push(checkbox.value);
    });

  const detailsSection = document.getElementById(
    "equipment-details-section"
  );
  const detailsContainer = document.getElementById(
    "equipment-details-container"
  );

  if (selectedEquipment.length > 0) {
    detailsSection.style.display = "block";
    detailsContainer.innerHTML = "";

    selectedEquipment.forEach((equipment) => {
      const detailGroup = createEquipmentDetailGroup(equipment);
      if (detailGroup) {
        detailsContainer.appendChild(detailGroup);
      }
    });
  } else {
    detailsSection.style.display = "none";
  }
}

// Create equipment detail group
function createEquipmentDetailGroup(equipment) {
  const group = document.createElement("div");
  group.className = "equipment-detail-group";
  group.dataset.equipment = equipment;

  switch (equipment) {
    case "MRI":
      group.innerHTML = `
        <div class="equipment-detail-title">
          <img src="/images/icons/mri-machine.svg" alt="MRI" style="width: 16px; height: 16px; object-fit: contain;">
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
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="GE">
              <span>GE</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="Siemens">
              <span>Siemens</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="Philips">
              <span>Philips</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="Canon">
              <span>Canon</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="Hitachi">
              <span>Hitachi</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="mri-manufacturer" value="other">
              <span>Other</span>
            </label>
          </div>
          <input type="text" name="mri-manufacturer-other" class="other-input" placeholder="Enter manufacturer" style="display: none;">
        </div>
      `;
      break;

    case "CT":
      group.innerHTML = `
        <img src="/images/icons/ct-scan-1.svg" alt="CT" style="width: 16px; height: 16px; object-fit: contain;">
        <div class="detail-row">
          <label class="detail-label">Slice Count:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="ct-slices" value="16">
              <span>16-slice</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-slices" value="64">
              <span>64-slice</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-slices" value="128">
              <span>128-slice</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-slices" value="256">
              <span>256-slice</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-slices" value="320">
              <span>320-slice</span>
            </label>
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Cardiac Capable:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="ct-cardiac" value="yes">
              <span>Yes</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-cardiac" value="no">
              <span>No</span>
            </label>
          </div>
        </div>
        <div class="detail-row">
          <label class="detail-label">Manufacturer:</label>
          <div class="detail-options">
            <label class="detail-option">
              <input type="radio" name="ct-manufacturer" value="GE">
              <span>GE</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-manufacturer" value="Siemens">
              <span>Siemens</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-manufacturer" value="Philips">
              <span>Philips</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-manufacturer" value="Canon">
              <span>Canon</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="ct-manufacturer" value="other">
              <span>Other</span>
            </label>
          </div>
          <input type="text" name="ct-manufacturer-other" class="other-input" placeholder="Enter manufacturer" style="display: none;">
        </div>
      `;
      break;

    case "X-Ray":
      group.innerHTML = `
        <img src="/images/icons/x-ray.svg" alt="MRI" style="width: 16px; height: 16px; object-fit: contain;">
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
            <label class="detail-option">
              <input type="radio" name="xray-fluoroscopy" value="yes">
              <span>Yes</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="xray-fluoroscopy" value="no">
              <span>No</span>
            </label>
          </div>
        </div>
      `;
      break;

    case "Ultrasound":
      group.innerHTML = `
        <img src="/images/icons/ultrasound (1).svg" alt="MRI" style="width: 16px; height: 16px; object-fit: contain;">
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
      `;
      break;

    case "PET":
      group.innerHTML = `
        <img src="/images/icons/pet-scan.svg" alt="MRI" style="width: 16px; height: 16px; object-fit: contain;">
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
            <label class="detail-option">
              <input type="radio" name="pet-pharmacy" value="yes">
              <span>Yes</span>
            </label>
            <label class="detail-option">
              <input type="radio" name="pet-pharmacy" value="no">
              <span>No</span>
            </label>
          </div>
        </div>
      `;
      break;

    case "Mammography":
      group.innerHTML = `
        <img src="/images/icons/screening.svg" alt="MRI" style="width: 16px; height: 16px; object-fit: contain;">
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
      `;
      break;

    default:
      return null;
  }

  // Add event listeners for "Other" options
  group
    .querySelectorAll('input[type="radio"][value="other"]')
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        const otherInput = group.querySelector(
          `input[name="${this.name}-other"]`
        );
        if (otherInput) {
          otherInput.style.display = this.checked ? "block" : "none";
          if (this.checked) {
            otherInput.focus();
          }
        }
      });
    });

  // Hide other inputs when different option selected
  group
    .querySelectorAll('input[type="radio"]:not([value="other"])')
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.checked) {
          const otherInput = group.querySelector(
            `input[name="${this.name}-other"]`
          );
          if (otherInput) {
            otherInput.style.display = "none";
            otherInput.value = "";
          }
        }
      });
    });

  return group;
}

// Collect equipment details
function collectEquipmentDetails() {
  const details = {};
  const detailGroups = document.querySelectorAll(".equipment-detail-group");

  detailGroups.forEach((group) => {
    const equipment = group.dataset.equipment;
    const equipmentDetails = {};

    // Collect radio button values
    group
      .querySelectorAll('input[type="radio"]:checked')
      .forEach((radio) => {
        const name = radio.name;
        const value = radio.value;

        if (value === "other") {
          const otherInput = group.querySelector(
            `input[name="${name}-other"]`
          );
          equipmentDetails[name] = otherInput ? otherInput.value : value;
        } else {
          equipmentDetails[name] = value;
        }
      });

    // Collect checkbox values
    group
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        equipmentDetails[checkbox.name] = checkbox.value;
      });

    if (Object.keys(equipmentDetails).length > 0) {
      details[equipment] = equipmentDetails;
    }
  });

  return details;
}

// Load equipment details when editing
function loadEquipmentDetails(savedDetails) {
  Object.entries(savedDetails).forEach(([equipment, details]) => {
    const group = document.querySelector(
      `.equipment-detail-group[data-equipment="${equipment}"]`
    );
    if (!group) return;

    Object.entries(details).forEach(([field, value]) => {
      // Handle radio buttons
      const radio = group.querySelector(
        `input[name="${field}"][value="${value}"]`
      );
      if (radio) {
        radio.checked = true;
      } else {
        // Handle "other" fields
        const otherRadio = group.querySelector(
          `input[name="${field}"][value="other"]`
        );
        if (otherRadio) {
          otherRadio.checked = true;
          const otherInput = group.querySelector(
            `input[name="${field}-other"]`
          );
          if (otherInput) {
            otherInput.style.display = "block";
            otherInput.value = value;
          }
        }
      }

      // Handle checkboxes
      const checkbox = group.querySelector(
        `input[name="${field}"][type="checkbox"]`
      );
      if (checkbox && value === "yes") {
        checkbox.checked = true;
      }
    });
  });
}

// Setup pre-populate functionality
function setupPrepopulate(orgData) {
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
    populateFromOrg(orgData);
  } else if (orgData.role === "executive") {
    prepopSection.style.display = "none";
  }

  // Handle toggle changes
  toggle.addEventListener("change", function () {
    if (this.checked) {
      populateFromOrg(orgData);
    } else {
      clearForm();
    }
  });
}

// Populate form from organization data
function populateFromOrg(orgData) {
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

// Clear form
function clearForm() {
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

// Email validation function
function validateEmail(e) {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    e.target.classList.add("error");
    // Check if error message already exists
    if (!e.target.parentElement.querySelector(".error-message")) {
      const errorMsg = document.createElement("span");
      errorMsg.className = "error-message";
      errorMsg.textContent = "Please enter a valid email address";
      e.target.parentElement.appendChild(errorMsg);
    }
  } else {
    clearEmailError(e);
  }
}

// Clear email error
function clearEmailError(e) {
  e.target.classList.remove("error");
  const errorMsg = e.target.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

// Form submission
document
  .getElementById("facility-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate email before submission
    const emailInput = document.querySelector('input[name="adminEmail"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      emailInput.focus();
      validateEmail({ target: emailInput });
      return;
    }

    const formData = new FormData(e.target);
    const equipment = [];
    formData.getAll("equipment").forEach((eq) => equipment.push(eq));

    // Collect equipment details
    const equipmentDetails = collectEquipmentDetails();

    const center = {
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

    // If marking as primary, unmark others
    if (center.isPrimary) {
      centers.forEach((c) => (c.isPrimary = false));
    }

    if (editingIndex !== null) {
      // Update existing center
      centers[editingIndex] = center;
      editingIndex = null;
    } else {
      // Add new center
      centers.push(center);
    }

    // Save to localStorage
    localStorage.setItem("provider_centers", JSON.stringify(centers));

    // Reset form and button
    e.target.reset();
    document.getElementById("submit-btn").textContent = "Add Center";

    // Update UI
    updateUI();
  });

// Update UI
function updateUI() {
  // Update stats
  document.getElementById("center-count").textContent =
    window.centers.length;

  // Count unique states
  const states = new Set(window.centers.map((c) => c.state));
  document.getElementById("state-count").textContent = states.size;

  // Show/hide sections
  if (window.centers.length > 0) {
    document.getElementById("centers-list").style.display = "block";
    document.getElementById("continue-section").style.display = "block";
    document.getElementById("add-center-form").style.display = "none";
    document.getElementById("final-count").textContent =
      window.centers.length;

    // Render centers
    renderCenters();

    // Add event listener to the Add Another Center button after rendering
    setTimeout(() => {
      const addAnotherBtn = document.getElementById("add-another-btn");
      if (addAnotherBtn) {
        addAnotherBtn.addEventListener("click", function () {
          showAddForm();
        });
      }
    }, 100);
  } else {
    document.getElementById("centers-list").style.display = "none";
    document.getElementById("continue-section").style.display = "none";
    document.getElementById("add-center-form").style.display = "block";
  }
}

// Render centers list
function renderCenters() {
  const container = document.getElementById("centers-container");
  container.innerHTML = "";

  window.centers.forEach((center, index) => {
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

// Show add form
function showAddForm(isEditing = false) {
  if (!isEditing) {
    // Only reset when adding new center, not editing
    document.getElementById("facility-form").reset();
    window.editingIndex = null;

    // Update the section header and button for adding
    const sectionTitle = document.querySelector(
      "#add-center-form .section-title"
    );
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
    document.getElementById("equipment-details-section").style.display =
      "none";
    document.getElementById("equipment-details-container").innerHTML = "";
  }

  // Always show the form and scroll to it
  document.getElementById("add-center-form").style.display = "block";
  document
    .getElementById("add-center-form")
    .scrollIntoView({ behavior: "smooth" });
}

// Phone number formatting
function formatPhoneNumber(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value.length <= 3) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
  }
  e.target.value = value;
}