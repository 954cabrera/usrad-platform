/**
 * COMPREHENSIVE IMAGING PROCEDURE LIBRARY
 * ==========================================
 * Complete CPT reference extracted from verified sources:
 * - Medicare/CMS CPT codes (cpt_rvus table)
 * - Centrelake Imaging reference materials
 * - RIS Imaging protocols
 * - Industry-standard imaging procedures
 * 
 * Last Updated: November 2, 2025
 * Data Source: Verified Medicare CPT codes + Clinical references
 */

// ============================================
// MRI PROCEDURES - COMPLETE REFERENCE
// ============================================

export const MRI_PROCEDURES = {
  
  // BRAIN & HEAD (705xx range)
  brain: {
    category: "Brain & Head",
    icon: "🧠",
    procedures: [
      {
        cpt: "70551",
        label: "MRI Brain - Without Contrast",
        shortLabel: "Brain - Without",
        description: "Evaluates stroke, tumors, MS, headaches",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Initial brain evaluation, stroke, seizures"
      },
      {
        cpt: "70552",
        label: "MRI Brain - With Contrast",
        shortLabel: "Brain - With",
        description: "Enhanced detail for tumors, infections, MS",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Tumor characterization, infection, MS lesions"
      },
      {
        cpt: "70553",
        label: "MRI Brain - With & Without Contrast",
        shortLabel: "Brain - Both",
        description: "Complete brain evaluation with comparison",
        duration: "60-90 min",
        prep: "IV contrast, kidney function check",
        useCase: "Comprehensive tumor staging, complex cases"
      }
    ]
  },

  // CERVICAL SPINE (721xx range)
  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72141",
        label: "MRI Cervical Spine - Without Contrast",
        shortLabel: "C-Spine - Without",
        description: "Neck pain, disc herniation, stenosis",
        duration: "30-45 min",
        prep: "Remove metal objects, jewelry",
        useCase: "Neck pain, numbness in arms, disc problems"
      },
      {
        cpt: "72142",
        label: "MRI Cervical Spine - With Contrast",
        shortLabel: "C-Spine - With",
        description: "Post-surgery, infection, tumor evaluation",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Post-surgical evaluation, infection, tumors"
      },
      {
        cpt: "72156",
        label: "MRI Cervical Spine - With & Without Contrast",
        shortLabel: "C-Spine - Both",
        description: "Complete cervical spine evaluation",
        duration: "60-75 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex cases, tumor staging"
      }
    ]
  },

  // THORACIC SPINE (721xx range)
  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72146",
        label: "MRI Thoracic Spine - Without Contrast",
        shortLabel: "T-Spine - Without",
        description: "Mid-back pain, compression fractures",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Mid-back pain, fractures, disc disease"
      },
      {
        cpt: "72147",
        label: "MRI Thoracic Spine - With Contrast",
        shortLabel: "T-Spine - With",
        description: "Infection, tumor, post-surgical changes",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Post-surgery, infection, metastases"
      },
      {
        cpt: "72157",
        label: "MRI Thoracic Spine - With & Without Contrast",
        shortLabel: "T-Spine - Both",
        description: "Complete thoracic evaluation",
        duration: "60-75 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex spine disorders, tumor staging"
      }
    ]
  },

  // LUMBAR SPINE (721xx range)
  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72148",
        label: "MRI Lumbar Spine - Without Contrast",
        shortLabel: "L-Spine - Without",
        description: "Low back pain, sciatica, disc herniation",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Back pain, sciatica, herniated disc"
      },
      {
        cpt: "72149",
        label: "MRI Lumbar Spine - With Contrast",
        shortLabel: "L-Spine - With",
        description: "Post-surgery evaluation, infection",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Failed back surgery, infection, tumors"
      },
      {
        cpt: "72158",
        label: "MRI Lumbar Spine - With & Without Contrast",
        shortLabel: "L-Spine - Both",
        description: "Complete lumbar evaluation",
        duration: "60-75 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex back problems, tumor staging"
      }
    ]
  },

  // SHOULDER (Upper Extremity - 732xx range)
  shoulder: {
    category: "Shoulder",
    icon: "💪",
    procedures: [
      {
        cpt: "73221",
        label: "MRI Shoulder - Without Contrast",
        shortLabel: "Shoulder - Without",
        description: "Rotator cuff tear, arthritis, impingement",
        duration: "30-45 min",
        prep: "Remove metal objects, jewelry",
        useCase: "Shoulder pain, rotator cuff, labral tears"
      },
      {
        cpt: "73222",
        label: "MRI Shoulder - With Contrast",
        shortLabel: "Shoulder - With",
        description: "Labral tears, infection, tumor",
        duration: "45-60 min",
        prep: "IV contrast or joint injection",
        useCase: "MR arthrogram, complex tears, infection"
      },
      {
        cpt: "73223",
        label: "MRI Shoulder - With & Without Contrast",
        shortLabel: "Shoulder - Both",
        description: "Complete shoulder evaluation",
        duration: "60-75 min",
        prep: "IV contrast, kidney function check",
        useCase: "Tumor staging, complex pathology"
      }
    ]
  },

  // KNEE (Lower Extremity - 737xx range)
  knee: {
    category: "Knee",
    icon: "🦵",
    procedures: [
      {
        cpt: "73721",
        label: "MRI Knee - Without Contrast",
        shortLabel: "Knee - Without",
        description: "Meniscus tear, ligament injury (ACL/MCL)",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Knee pain, meniscus tear, ACL/MCL injury"
      },
      {
        cpt: "73722",
        label: "MRI Knee - With Contrast",
        shortLabel: "Knee - With",
        description: "Infection, tumor, synovitis evaluation",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Infection, tumors, inflammatory arthritis"
      },
      {
        cpt: "73723",
        label: "MRI Knee - With & Without Contrast",
        shortLabel: "Knee - Both",
        description: "Complete knee evaluation",
        duration: "60-75 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex cases, tumor staging"
      }
    ]
  },

  // ADDITIONAL MRI BODY REGIONS
  
  elbow: {
    category: "Elbow",
    icon: "💪",
    procedures: [
      {
        cpt: "73221",
        label: "MRI Elbow - Without Contrast",
        shortLabel: "Elbow - Without",
        description: "Tennis elbow, ligament tears, arthritis",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Elbow pain, UCL tear, lateral epicondylitis"
      }
    ]
  },

  wrist: {
    category: "Wrist / Hand",
    icon: "✋",
    procedures: [
      {
        cpt: "73218",
        label: "MRI Wrist - Without Contrast",
        shortLabel: "Wrist - Without",
        description: "Carpal tunnel, ligament tears, fractures",
        duration: "30-45 min",
        prep: "Remove metal objects, jewelry",
        useCase: "Wrist pain, TFCC tear, carpal tunnel"
      }
    ]
  },

  hip: {
    category: "Hip",
    icon: "🦴",
    procedures: [
      {
        cpt: "73721",
        label: "MRI Hip - Without Contrast",
        shortLabel: "Hip - Without",
        description: "Hip pain, arthritis, labral tears",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Hip pain, avascular necrosis, labral tears"
      }
    ]
  },

  ankle: {
    category: "Ankle / Foot",
    icon: "🦶",
    procedures: [
      {
        cpt: "73718",
        label: "MRI Ankle - Without Contrast",
        shortLabel: "Ankle - Without",
        description: "Ankle sprains, Achilles tendon, fractures",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Ankle pain, ligament tears, Achilles tendon"
      }
    ]
  },

  abdomen: {
    category: "Abdomen",
    icon: "🫁",
    procedures: [
      {
        cpt: "74181",
        label: "MRI Abdomen - Without Contrast",
        shortLabel: "Abdomen - Without",
        description: "Liver, kidney, pancreas evaluation",
        duration: "30-45 min",
        prep: "Fasting 4-6 hours",
        useCase: "Abdominal pain, liver lesions, kidney masses"
      },
      {
        cpt: "74182",
        label: "MRI Abdomen - With Contrast",
        shortLabel: "Abdomen - With",
        description: "Tumor characterization, organ evaluation",
        duration: "45-60 min",
        prep: "Fasting, IV contrast",
        useCase: "Tumor staging, liver lesion characterization"
      },
      {
        cpt: "74183",
        label: "MRI Abdomen - With & Without Contrast",
        shortLabel: "Abdomen - Both",
        description: "Complete abdominal imaging",
        duration: "60-90 min",
        prep: "Fasting, IV contrast",
        useCase: "Comprehensive cancer staging"
      }
    ]
  },

  pelvis: {
    category: "Pelvis",
    icon: "🫁",
    procedures: [
      {
        cpt: "72195",
        label: "MRI Pelvis - Without Contrast",
        shortLabel: "Pelvis - Without",
        description: "Bladder, prostate, uterus, ovaries",
        duration: "30-45 min",
        prep: "Full bladder recommended",
        useCase: "Pelvic pain, prostate, gynecologic issues"
      },
      {
        cpt: "72196",
        label: "MRI Pelvis - With Contrast",
        shortLabel: "Pelvis - With",
        description: "Pelvic masses, cancer staging",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Pelvic mass evaluation, cancer staging"
      },
      {
        cpt: "72197",
        label: "MRI Pelvis - With & Without Contrast",
        shortLabel: "Pelvis - Both",
        description: "Complete pelvic evaluation",
        duration: "60-75 min",
        prep: "IV contrast, full bladder",
        useCase: "Comprehensive cancer evaluation"
      }
    ]
  },

  chest: {
    category: "Chest",
    icon: "🫁",
    procedures: [
      {
        cpt: "71550",
        label: "MRI Chest - Without Contrast",
        shortLabel: "Chest - Without",
        description: "Lung nodules, mediastinal masses",
        duration: "30-45 min",
        prep: "Remove metal objects",
        useCase: "Chest mass, staging, cardiac evaluation"
      },
      {
        cpt: "71551",
        label: "MRI Chest - With Contrast",
        shortLabel: "Chest - With",
        description: "Tumor evaluation, vascular assessment",
        duration: "45-60 min",
        prep: "IV contrast, kidney function check",
        useCase: "Lung cancer staging, mediastinal masses"
      },
      {
        cpt: "71552",
        label: "MRI Chest - With & Without Contrast",
        shortLabel: "Chest - Both",
        description: "Complete chest imaging",
        duration: "60-90 min",
        prep: "IV contrast, breath holding",
        useCase: "Comprehensive tumor evaluation"
      }
    ]
  },

  breast: {
    category: "Breast",
    icon: "🎀",
    procedures: [
      {
        cpt: "77046",
        label: "MRI Breast - Unilateral (One Side)",
        shortLabel: "Breast - One Side",
        description: "High-risk screening, problem-solving",
        duration: "30-45 min",
        prep: "Scheduled 7-14 days after period starts",
        useCase: "High-risk screening, implant evaluation"
      },
      {
        cpt: "77047",
        label: "MRI Breast - Bilateral (Both Sides)",
        shortLabel: "Breast - Both Sides",
        description: "Comprehensive breast cancer screening",
        duration: "45-60 min",
        prep: "Scheduled 7-14 days after period starts",
        useCase: "BRCA positive, dense breasts, cancer staging"
      }
    ]
  },

  cardiac: {
    category: "Cardiac (Heart)",
    icon: "❤️",
    procedures: [
      {
        cpt: "75557",
        label: "Cardiac MRI - Without Contrast",
        shortLabel: "Heart - Without",
        description: "Heart function, chamber size, valve disease",
        duration: "45-60 min",
        prep: "ECG monitoring during scan",
        useCase: "Cardiomyopathy, valve disease, congenital heart"
      },
      {
        cpt: "75561",
        label: "Cardiac MRI - With Contrast",
        shortLabel: "Heart - With",
        description: "Viability assessment, scarring, inflammation",
        duration: "60-90 min",
        prep: "IV contrast, ECG monitoring",
        useCase: "Heart attack evaluation, myocarditis, tumors"
      }
    ]
  }
};

// ============================================
// CT PROCEDURES - COMPLETE REFERENCE
// ============================================

export const CT_PROCEDURES = {
  
  // HEAD/BRAIN (704xx range)
  head: {
    category: "Head / Brain",
    icon: "🧠",
    procedures: [
      {
        cpt: "70450",
        label: "CT Head/Brain - Without Contrast",
        shortLabel: "Head - Without",
        description: "Stroke, bleeding, trauma, acute headache",
        duration: "10-15 min",
        prep: "Remove metal from head area",
        useCase: "Stroke workup, trauma, acute neurological changes"
      },
      {
        cpt: "70460",
        label: "CT Head/Brain - With Contrast",
        shortLabel: "Head - With",
        description: "Tumors, infections, MS evaluation",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Brain tumors, abscess, meningitis"
      },
      {
        cpt: "70470",
        label: "CT Head/Brain - With & Without Contrast",
        shortLabel: "Head - Both",
        description: "Complete brain evaluation",
        duration: "20-30 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex brain lesions, tumor staging"
      }
    ]
  },

  // CHEST (712xx range)
  chest: {
    category: "Chest",
    icon: "🫁",
    procedures: [
      {
        cpt: "71250",
        label: "CT Chest - Without Contrast",
        shortLabel: "Chest - Without",
        description: "Lung nodules, pneumonia, COVID-19",
        duration: "10-15 min",
        prep: "Breath holding practice",
        useCase: "Lung screening, pneumonia, interstitial lung disease"
      },
      {
        cpt: "71260",
        label: "CT Chest - With Contrast",
        shortLabel: "Chest - With",
        description: "Pulmonary embolism, lung cancer staging",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "PE evaluation, cancer staging, mediastinal masses"
      },
      {
        cpt: "71270",
        label: "CT Chest - With & Without Contrast",
        shortLabel: "Chest - Both",
        description: "Complete chest evaluation",
        duration: "20-30 min",
        prep: "IV contrast, breath holding",
        useCase: "Complex masses, tumor characterization"
      }
    ]
  },

  // ABDOMEN (741xx range)
  abdomen: {
    category: "Abdomen",
    icon: "🫁",
    procedures: [
      {
        cpt: "74150",
        label: "CT Abdomen - Without Contrast",
        shortLabel: "Abdomen - Without",
        description: "Kidney stones, appendicitis, acute pain",
        duration: "10-15 min",
        prep: "May require oral contrast",
        useCase: "Kidney stones, appendicitis, diverticulitis"
      },
      {
        cpt: "74160",
        label: "CT Abdomen - With Contrast",
        shortLabel: "Abdomen - With",
        description: "Infections, masses, organ evaluation",
        duration: "15-20 min",
        prep: "IV contrast, oral contrast, fasting",
        useCase: "Abdominal pain, infections, tumor staging"
      },
      {
        cpt: "74170",
        label: "CT Abdomen - With & Without Contrast",
        shortLabel: "Abdomen - Both",
        description: "Complete abdominal imaging",
        duration: "20-30 min",
        prep: "IV contrast, oral contrast",
        useCase: "Liver lesions, kidney masses, cancer staging"
      }
    ]
  },

  // PELVIS (721xx range)
  pelvis: {
    category: "Pelvis",
    icon: "🫁",
    procedures: [
      {
        cpt: "72192",
        label: "CT Pelvis - Without Contrast",
        shortLabel: "Pelvis - Without",
        description: "Pelvic pain, fractures, stones",
        duration: "10-15 min",
        prep: "Full bladder helpful",
        useCase: "Pelvic fractures, bladder stones, acute pain"
      },
      {
        cpt: "72193",
        label: "CT Pelvis - With Contrast",
        shortLabel: "Pelvis - With",
        description: "Pelvic masses, infections, cancer",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Pelvic abscess, tumors, diverticulitis"
      },
      {
        cpt: "72194",
        label: "CT Pelvis - With & Without Contrast",
        shortLabel: "Pelvis - Both",
        description: "Complete pelvic evaluation",
        duration: "20-30 min",
        prep: "IV contrast, full bladder",
        useCase: "Pelvic cancer staging, complex masses"
      }
    ]
  },

  // ABDOMEN & PELVIS COMBINED (741xx range)
  abdomenPelvis: {
    category: "Abdomen & Pelvis",
    icon: "🫁",
    procedures: [
      {
        cpt: "74176",
        label: "CT Abdomen & Pelvis - Without Contrast",
        shortLabel: "Abd/Pelvis - Without",
        description: "Kidney stones, bowel obstruction",
        duration: "15-20 min",
        prep: "May require oral contrast",
        useCase: "Acute abdominal/pelvic pain, stones"
      },
      {
        cpt: "74177",
        label: "CT Abdomen & Pelvis - With Contrast",
        shortLabel: "Abd/Pelvis - With",
        description: "Most common CT for abdominal complaints",
        duration: "20-25 min",
        prep: "IV & oral contrast, kidney function check",
        useCase: "Appendicitis, diverticulitis, infections, masses"
      },
      {
        cpt: "74178",
        label: "CT Abdomen & Pelvis - With & Without Contrast",
        shortLabel: "Abd/Pelvis - Both",
        description: "Complete abdominopelvic evaluation",
        duration: "30-40 min",
        prep: "IV & oral contrast",
        useCase: "Cancer staging, complex organ lesions"
      }
    ]
  },

  // CERVICAL SPINE (721xx range)
  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72125",
        label: "CT Cervical Spine - Without Contrast",
        shortLabel: "C-Spine - Without",
        description: "Neck trauma, fractures, bone detail",
        duration: "10-15 min",
        prep: "Remove neck jewelry",
        useCase: "Trauma, fractures, degenerative changes"
      },
      {
        cpt: "72126",
        label: "CT Cervical Spine - With Contrast",
        shortLabel: "C-Spine - With",
        description: "Post-surgical evaluation, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Tumors, infection, post-surgery"
      }
    ]
  },

  // THORACIC SPINE (721xx range)
  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72128",
        label: "CT Thoracic Spine - Without Contrast",
        shortLabel: "T-Spine - Without",
        description: "Compression fractures, bone detail",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Compression fractures, trauma, bone evaluation"
      },
      {
        cpt: "72129",
        label: "CT Thoracic Spine - With Contrast",
        shortLabel: "T-Spine - With",
        description: "Tumors, infections",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Metastases, infection, post-surgery"
      }
    ]
  },

  // LUMBAR SPINE (721xx range)
  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "🦴",
    procedures: [
      {
        cpt: "72131",
        label: "CT Lumbar Spine - Without Contrast",
        shortLabel: "L-Spine - Without",
        description: "Fractures, stenosis, bone density",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Fractures, spinal stenosis, scoliosis evaluation"
      },
      {
        cpt: "72132",
        label: "CT Lumbar Spine - With Contrast",
        shortLabel: "L-Spine - With",
        description: "Post-surgical changes, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Failed back surgery, infection, tumors"
      }
    ]
  },

  // SINUSES (704xx range)
  sinuses: {
    category: "Sinuses",
    icon: "👃",
    procedures: [
      {
        cpt: "70486",
        label: "CT Sinuses - Without Contrast",
        shortLabel: "Sinuses - Without",
        description: "Sinusitis, polyps, surgical planning",
        duration: "5-10 min",
        prep: "None required",
        useCase: "Chronic sinusitis, polyps, pre-surgical planning"
      }
    ]
  },

  // NECK SOFT TISSUE (704xx range)
  neckSoftTissue: {
    category: "Neck (Soft Tissue)",
    icon: "🫁",
    procedures: [
      {
        cpt: "70490",
        label: "CT Neck - Without Contrast",
        shortLabel: "Neck - Without",
        description: "Throat masses, airway evaluation",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Neck mass, airway obstruction, thyroid"
      },
      {
        cpt: "70491",
        label: "CT Neck - With Contrast",
        shortLabel: "Neck - With",
        description: "Lymph nodes, infections, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Lymphadenopathy, abscess, cancer staging"
      },
      {
        cpt: "70492",
        label: "CT Neck - With & Without Contrast",
        shortLabel: "Neck - Both",
        description: "Complete neck evaluation",
        duration: "20-30 min",
        prep: "IV contrast",
        useCase: "Neck cancer staging, complex masses"
      }
    ]
  },

  // CT ANGIOGRAPHY (CTA)
  ctaHead: {
    category: "CTA Head/Neck",
    icon: "🧠",
    procedures: [
      {
        cpt: "70496",
        label: "CTA Head (Brain Vessels)",
        shortLabel: "CTA Brain",
        description: "Aneurysm, stroke risk, vascular malformations",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Aneurysm screening, stroke workup, vascular disease"
      },
      {
        cpt: "70498",
        label: "CTA Neck (Carotid Arteries)",
        shortLabel: "CTA Neck",
        description: "Carotid stenosis, stroke risk evaluation",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Stroke prevention, carotid disease, TIA workup"
      }
    ]
  },

  ctaChest: {
    category: "CTA Chest",
    icon: "🫁",
    procedures: [
      {
        cpt: "71275",
        label: "CTA Chest (Pulmonary Arteries)",
        shortLabel: "CTA PE Protocol",
        description: "Pulmonary embolism, aortic aneurysm",
        duration: "15-20 min",
        prep: "IV contrast, breath holding",
        useCase: "Pulmonary embolism, aortic dissection, aneurysm"
      }
    ]
  },

  ctaAbdomen: {
    category: "CTA Abdomen",
    icon: "🫁",
    procedures: [
      {
        cpt: "74175",
        label: "CTA Abdomen & Pelvis",
        shortLabel: "CTA Abd/Pelvis",
        description: "Aortic aneurysm, renal artery stenosis",
        duration: "20-25 min",
        prep: "IV contrast, kidney function check",
        useCase: "AAA surveillance, renal artery stenosis, mesenteric ischemia"
      }
    ]
  },

  ctaExtremity: {
    category: "CTA Extremity",
    icon: "🦵",
    procedures: [
      {
        cpt: "73706",
        label: "CTA Lower Extremity (Runoff)",
        shortLabel: "CTA Legs",
        description: "Peripheral arterial disease, claudication",
        duration: "20-30 min",
        prep: "IV contrast",
        useCase: "PAD, claudication, pre-surgical planning"
      }
    ]
  }
};

// ============================================
// X-RAY PROCEDURES - COMMON STUDIES
// ============================================

export const XRAY_PROCEDURES = {
  chest: {
    category: "Chest X-Ray",
    icon: "🫁",
    procedures: [
      {
        cpt: "71045",
        label: "Chest X-Ray - 1 View",
        shortLabel: "Chest - 1 View",
        description: "Pneumonia, heart size, lung screening",
        duration: "5-10 min",
        prep: "Remove jewelry, clothing from waist up",
        useCase: "Cough, shortness of breath, chest pain"
      },
      {
        cpt: "71046",
        label: "Chest X-Ray - 2 Views",
        shortLabel: "Chest - 2 Views",
        description: "More detailed lung/heart evaluation",
        duration: "10-15 min",
        prep: "Remove jewelry, clothing from waist up",
        useCase: "Pneumonia, heart failure, lung nodules"
      }
    ]
  },

  spine: {
    category: "Spine X-Ray",
    icon: "🦴",
    procedures: [
      {
        cpt: "72040",
        label: "Cervical Spine X-Ray",
        shortLabel: "C-Spine X-Ray",
        description: "Neck alignment, arthritis, fractures",
        duration: "10-15 min",
        prep: "Remove neck jewelry",
        useCase: "Neck pain, trauma, arthritis"
      },
      {
        cpt: "72100",
        label: "Lumbar Spine X-Ray",
        shortLabel: "L-Spine X-Ray",
        description: "Back alignment, degenerative changes",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Back pain, scoliosis, arthritis"
      }
    ]
  },

  extremities: {
    category: "Extremity X-Rays",
    icon: "🦵",
    procedures: [
      {
        cpt: "73000",
        label: "Shoulder X-Ray",
        shortLabel: "Shoulder",
        description: "Fractures, arthritis, dislocations",
        duration: "10-15 min",
        prep: "Remove clothing/jewelry from area",
        useCase: "Shoulder pain, trauma, arthritis"
      },
      {
        cpt: "73600",
        label: "Ankle X-Ray",
        shortLabel: "Ankle",
        description: "Fractures, sprains, arthritis",
        duration: "10-15 min",
        prep: "Remove shoes and socks",
        useCase: "Ankle injury, pain, swelling"
      }
    ]
  }
};

// ============================================
// ULTRASOUND PROCEDURES
// ============================================

export const ULTRASOUND_PROCEDURES = {
  abdomen: {
    category: "Abdominal Ultrasound",
    icon: "🫁",
    procedures: [
      {
        cpt: "76700",
        label: "Ultrasound Abdomen - Complete",
        shortLabel: "Abd US - Complete",
        description: "Liver, gallbladder, kidneys, spleen, pancreas",
        duration: "30-45 min",
        prep: "Fasting 6-8 hours",
        useCase: "Abdominal pain, gallstones, liver disease"
      },
      {
        cpt: "76705",
        label: "Ultrasound Abdomen - Limited",
        shortLabel: "Abd US - Limited",
        description: "Focused on specific organ",
        duration: "15-20 min",
        prep: "May require fasting",
        useCase: "Follow-up specific finding"
      }
    ]
  },

  pelvis: {
    category: "Pelvic Ultrasound",
    icon: "🫁",
    procedures: [
      {
        cpt: "76856",
        label: "Pelvic Ultrasound - Complete",
        shortLabel: "Pelvis US",
        description: "Uterus, ovaries, bladder evaluation",
        duration: "30-45 min",
        prep: "Full bladder required",
        useCase: "Pelvic pain, menstrual irregularities, masses"
      }
    ]
  },

  ob: {
    category: "OB Ultrasound",
    icon: "👶",
    procedures: [
      {
        cpt: "76801",
        label: "OB Ultrasound - First Trimester",
        shortLabel: "OB - 1st Trimester",
        description: "Dating, viability, early anatomy",
        duration: "20-30 min",
        prep: "Full bladder helpful early pregnancy",
        useCase: "Confirm pregnancy, dating, complications"
      },
      {
        cpt: "76805",
        label: "OB Ultrasound - Detailed Anatomy",
        shortLabel: "OB - Anatomy",
        description: "Complete fetal anatomic survey",
        duration: "45-60 min",
        prep: "None required",
        useCase: "18-20 week anatomy scan"
      }
    ]
  },

  vascular: {
    category: "Vascular Ultrasound",
    icon: "❤️",
    procedures: [
      {
        cpt: "93880",
        label: "Carotid Ultrasound",
        shortLabel: "Carotid US",
        description: "Stroke risk, carotid stenosis evaluation",
        duration: "30-45 min",
        prep: "None required",
        useCase: "Stroke prevention, TIA, carotid disease"
      },
      {
        cpt: "93970",
        label: "Venous Doppler - Lower Extremity",
        shortLabel: "Venous Doppler",
        description: "DVT (blood clot) evaluation",
        duration: "30-45 min",
        prep: "None required",
        useCase: "Leg swelling, DVT screening, pain"
      }
    ]
  }
};

// ============================================
// MAMMOGRAPHY
// ============================================

export const MAMMOGRAPHY_PROCEDURES = {
  screening: {
    category: "Mammography - Screening",
    icon: "🎀",
    procedures: [
      {
        cpt: "77067",
        label: "Screening Mammogram - Bilateral",
        shortLabel: "Screening Mammo",
        description: "Annual breast cancer screening",
        duration: "15-20 min",
        prep: "No deodorant, powder, or lotion",
        useCase: "Annual screening for women 40+, high risk"
      }
    ]
  },

  diagnostic: {
    category: "Mammography - Diagnostic",
    icon: "🎀",
    procedures: [
      {
        cpt: "77065",
        label: "Diagnostic Mammogram - Unilateral",
        shortLabel: "Diagnostic - One Side",
        description: "Problem-solving mammography",
        duration: "20-30 min",
        prep: "No deodorant, powder, or lotion",
        useCase: "Lump, pain, nipple discharge, follow-up"
      },
      {
        cpt: "77066",
        label: "Diagnostic Mammogram - Bilateral",
        shortLabel: "Diagnostic - Both Sides",
        description: "Comprehensive breast evaluation",
        duration: "30-40 min",
        prep: "No deodorant, powder, or lotion",
        useCase: "Bilateral symptoms, cancer staging"
      }
    ]
  }
};

// ============================================
// NUCLEAR MEDICINE
// ============================================

export const NUCLEAR_MEDICINE_PROCEDURES = {
  bone: {
    category: "Bone Scan",
    icon: "🦴",
    procedures: [
      {
        cpt: "78306",
        label: "Bone Scan - Whole Body",
        shortLabel: "Bone Scan",
        description: "Metastases, fractures, infection detection",
        duration: "3-4 hours (injection + scan)",
        prep: "Hydrate well before and after",
        useCase: "Cancer staging, unexplained bone pain, fractures"
      }
    ]
  },

  cardiac: {
    category: "Nuclear Cardiac Studies",
    icon: "❤️",
    procedures: [
      {
        cpt: "78452",
        label: "Myocardial Perfusion - Rest/Stress",
        shortLabel: "Nuclear Stress Test",
        description: "Coronary artery disease evaluation",
        duration: "3-4 hours",
        prep: "Fasting, no caffeine 24 hours",
        useCase: "Chest pain, CAD evaluation, risk stratification"
      }
    ]
  },

  thyroid: {
    category: "Thyroid Scans",
    icon: "🫁",
    procedures: [
      {
        cpt: "78012",
        label: "Thyroid Uptake & Scan",
        shortLabel: "Thyroid Scan",
        description: "Thyroid function and nodule evaluation",
        duration: "2 days (uptake measurements)",
        prep: "Stop thyroid meds as directed",
        useCase: "Hyperthyroidism, thyroid nodules"
      }
    ]
  }
};

// ============================================
// PET SCANS
// ============================================

export const PET_PROCEDURES = {
  body: {
    category: "PET/CT Scans",
    icon: "🔬",
    procedures: [
      {
        cpt: "78815",
        label: "PET/CT - Whole Body",
        shortLabel: "PET/CT",
        description: "Cancer detection, staging, and monitoring",
        duration: "2-3 hours",
        prep: "Fasting 6 hours, no strenuous exercise 24 hrs",
        useCase: "Cancer staging, recurrence detection, treatment response"
      },
      {
        cpt: "78608",
        label: "PET Brain",
        shortLabel: "Brain PET",
        description: "Alzheimer's, dementia, brain tumor evaluation",
        duration: "2-3 hours",
        prep: "Fasting, avoid stimulants",
        useCase: "Dementia workup, brain tumor, seizure evaluation"
      }
    ]
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all procedures for a specific modality
 */
export function getProceduresByModality(modality) {
  const modalityMap = {
    'MRI': MRI_PROCEDURES,
    'CT': CT_PROCEDURES,
    'X-RAY': XRAY_PROCEDURES,
    'XRAY': XRAY_PROCEDURES,
    'ULTRASOUND': ULTRASOUND_PROCEDURES,
    'MAMMOGRAPHY': MAMMOGRAPHY_PROCEDURES,
    'NUCLEAR MEDICINE': NUCLEAR_MEDICINE_PROCEDURES,
    'NM': NUCLEAR_MEDICINE_PROCEDURES,
    'PET': PET_PROCEDURES
  };
  
  return modalityMap[modality.toUpperCase()] || null;
}

/**
 * Search procedures by CPT code
 */
export function findProcedureByCPT(cptCode) {
  const allModalities = [
    MRI_PROCEDURES,
    CT_PROCEDURES,
    XRAY_PROCEDURES,
    ULTRASOUND_PROCEDURES,
    MAMMOGRAPHY_PROCEDURES,
    NUCLEAR_MEDICINE_PROCEDURES,
    PET_PROCEDURES
  ];
  
  for (const modality of allModalities) {
    for (const category of Object.values(modality)) {
      for (const proc of category.procedures) {
        if (proc.cpt === cptCode) {
          return {
            ...proc,
            category: category.category,
            icon: category.icon
          };
        }
      }
    }
  }
  
  return null;
}

/**
 * Get procedures by body region (patient-friendly name)
 */
export function getProceduresByRegion(modality, region) {
  const procedures = getProceduresByModality(modality);
  if (!procedures) return [];
  
  // Normalize region name
  const normalizedRegion = region.toLowerCase().trim();
  
  // Find matching category
  for (const [key, value] of Object.entries(procedures)) {
    const categoryName = value.category.toLowerCase();
    if (categoryName.includes(normalizedRegion) || normalizedRegion.includes(categoryName)) {
      return value.procedures;
    }
  }
  
  return [];
}

/**
 * Get flat list of all procedures for dropdown/search
 */
export function getAllProceduresFlat() {
  const allProcedures = [];
  const allModalities = {
    'MRI': MRI_PROCEDURES,
    'CT': CT_PROCEDURES,
    'X-Ray': XRAY_PROCEDURES,
    'Ultrasound': ULTRASOUND_PROCEDURES,
    'Mammography': MAMMOGRAPHY_PROCEDURES,
    'Nuclear Medicine': NUCLEAR_MEDICINE_PROCEDURES,
    'PET': PET_PROCEDURES
  };
  
  for (const [modalityName, modality] of Object.entries(allModalities)) {
    for (const category of Object.values(modality)) {
      for (const proc of category.procedures) {
        allProcedures.push({
          ...proc,
          modality: modalityName,
          category: category.category,
          icon: category.icon,
          searchText: `${proc.label} ${proc.cpt} ${proc.description} ${category.category}`.toLowerCase()
        });
      }
    }
  }
  
  return allProcedures;
}

/**
 * Search procedures by keyword
 */
export function searchProcedures(query) {
  const allProcs = getAllProceduresFlat();
  const searchTerm = query.toLowerCase().trim();
  
  return allProcs.filter(proc => proc.searchText.includes(searchTerm));
}

// ============================================
// EXPORT DEFAULT LIBRARY
// ============================================

export default {
  MRI: MRI_PROCEDURES,
  CT: CT_PROCEDURES,
  XRAY: XRAY_PROCEDURES,
  ULTRASOUND: ULTRASOUND_PROCEDURES,
  MAMMOGRAPHY: MAMMOGRAPHY_PROCEDURES,
  NUCLEAR_MEDICINE: NUCLEAR_MEDICINE_PROCEDURES,
  PET: PET_PROCEDURES,
  // Helper functions
  getProceduresByModality,
  findProcedureByCPT,
  getProceduresByRegion,
  getAllProceduresFlat,
  searchProcedures
};