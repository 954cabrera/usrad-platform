// src/components/Providers/shared/data/equipmentData.js

export const EQUIPMENT_TYPES = [
  {
    value: "MRI",
    name: "MRI",
    icon: "/images/icons/mri-machine.svg"
  },
  {
    value: "CT",
    name: "CT Scan",
    icon: "/images/icons/ct-scan-1.svg"
  },
  {
    value: "X-Ray",
    name: "X-Ray",
    icon: "/images/icons/x-ray.svg"
  },
  {
    value: "Ultrasound",
    name: "Ultrasound",
    icon: "/images/icons/ultrasound (1).svg"
  },
  {
    value: "PET",
    name: "PET Scan",
    icon: "/images/icons/pet-scan.svg"
  },
  {
    value: "Mammography",
    name: "Mammography",
    icon: "/images/icons/screening.svg"
  }
];

export const EQUIPMENT_DETAILS = {
  MRI: {
    tesla: {
      label: "Tesla Strength",
      type: "radio",
      options: ["1.5T", "3T", "other"]
    },
    type: {
      label: "Type",
      type: "radio",
      options: ["open", "closed"]
    },
    manufacturer: {
      label: "Manufacturer",
      type: "radio",
      options: ["GE", "Siemens", "Philips", "Canon", "Hitachi", "other"]
    }
  },
  CT: {
    slices: {
      label: "Slice Count",
      type: "radio",
      options: ["16", "64", "128", "256", "320"]
    },
    cardiac: {
      label: "Cardiac Capable",
      type: "radio",
      options: ["yes", "no"]
    },
    manufacturer: {
      label: "Manufacturer",
      type: "radio",
      options: ["GE", "Siemens", "Philips", "Canon", "other"]
    }
  },
  "X-Ray": {
    type: {
      label: "Type",
      type: "radio",
      options: ["digital", "film"]
    },
    fluoroscopy: {
      label: "Fluoroscopy Capable",
      type: "radio",
      options: ["yes", "no"]
    }
  },
  Ultrasound: {
    capabilities: {
      label: "Capabilities",
      type: "checkbox",
      options: ["3D Capable", "4D Capable"]
    }
  },
  PET: {
    type: {
      label: "Type",
      type: "radio",
      options: ["pet-ct", "pet-only"]
    },
    pharmacy: {
      label: "Radiopharmacy On-site",
      type: "radio",
      options: ["yes", "no"]
    }
  },
  Mammography: {
    features: {
      label: "Features",
      type: "checkbox",
      options: ["3D Tomosynthesis", "CAD (Computer-Aided Detection)"]
    }
  }
};