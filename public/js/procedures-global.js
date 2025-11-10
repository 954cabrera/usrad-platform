/**
 * COMPREHENSIVE IMAGING PROCEDURE LIBRARY
 * ==========================================
 * Complete CPT reference - Global version for public folder
 * 
 * Usage: window.ProcedureLibrary.MRI.knee.procedures
 * 
 * Last Updated: November 3, 2025
 * Data Source: Medicare CPT codes + Clinical references
 * 
 * COMPLETE FIXED VERSION - Preserves all helper functions and CT data
 * Only simplifies redirect entries (lines 318-403) to fix search issues
 */

(function() {
  'use strict';

  // ============================================
// MRI PROCEDURES - COMPLETE REFERENCE (ENHANCED WITH matchKeywords)
// ============================================

const MRI_PROCEDURES = {
  brain: {
    category: "Brain",
    icon: "brain",
    matchKeywords: [
      "brain",
      "head",
      "stroke",
      "seizure",
      "headache",
      "migraine",
      "memory loss",
      "tumor",
      "ms",
      "multiple sclerosis",
      "dementia",
      "brain scan",
      "neurology"
    ],
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

  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "spine",
    matchKeywords: [
      "neck",
      "neck pain",
      "cervical spine",
      "c spine",
      "whiplash",
      "arm numbness",
      "neck injury",
      "pinched nerve",
      "herniated disc",
      "cervical stenosis",
      "spine mri"
    ],
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

  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "spine",
    matchKeywords: [
      "mid back",
      "upper back",
      "thoracic spine",
      "t spine",
      "back pain",
      "compression fracture",
      "scoliosis",
      "midback pain",
      "thoracic disc"
    ],
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

  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "spine",
    matchKeywords: [
      "low back",
      "lower back",
      "lumbar",
      "sciatica",
      "back pain",
      "herniated disc",
      "disc bulge",
      "degenerative disc disease",
      "spinal stenosis",
      "spine mri",
      "l spine"
    ],
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

  abdomen: {
    category: "Abdomen",
    icon: "abdomen",
    matchKeywords: [
      "abdomen",
      "liver",
      "kidney",
      "pancreas",
      "gallbladder",
      "abdominal pain",
      "liver lesion",
      "renal mass",
      "tumor staging",
      "cancer scan"
    ],
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
    icon: "pelvis",
    matchKeywords: [
      "pelvis",
      "bladder",
      "prostate",
      "uterus",
      "ovaries",
      "fibroids",
      "pelvic pain",
      "gynecology",
      "prostate cancer",
      "pelvic mass"
    ],
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

  breast: {
    category: "Breast",
    icon: "breast",
    matchKeywords: [
      "breast",
      "mammogram follow-up",
      "dense breasts",
      "implant",
      "brca",
      "breast cancer",
      "screening",
      "high risk",
      "breast mri"
    ],
    procedures: [
      {
        cpt: "77046",
        label: "MRI Breast - Unilateral",
        shortLabel: "Breast - One Side",
        description: "High-risk screening, problem-solving",
        duration: "30-45 min",
        prep: "Scheduled 7-14 days after period starts",
        useCase: "High-risk screening, implant evaluation"
      },
      {
        cpt: "77047",
        label: "MRI Breast - Bilateral",
        shortLabel: "Breast - Both Sides",
        description: "Comprehensive breast cancer screening",
        duration: "45-60 min",
        prep: "Scheduled 7-14 days after period starts",
        useCase: "BRCA positive, dense breasts, cancer staging"
      },
      {
        cpt: "77049",
        label: "MRI Breast - Bilateral With & Without Contrast",
        shortLabel: "Breast - Both Sides Enhanced",
        description: "Both breasts with complete contrast protocol",
        duration: "60-75 min",
        prep: "IV contrast, scheduled 7-14 days after period",
        useCase: "Comprehensive cancer screening, bilateral workup"
      }
    ]
  },

  cardiac: {
    category: "Cardiac",
    icon: "heart",
    matchKeywords: [
      "heart",
      "cardiac",
      "heart function",
      "valve disease",
      "myocarditis",
      "cardiomyopathy",
      "heart attack",
      "heart mri"
    ],
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
  },


    // ============================================
// VASCULAR IMAGING - MRA/MRV
// ============================================

mraBrain: {
  category: "MRA Brain",
  icon: "brain",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra brain",
    "brain vessels",
    "aneurysm",
    "stroke",
    "vascular malformation",
    "angiogram brain",
    "cerebral arteries"
  ],
  procedures: [
    {
      cpt: "70544",
      label: "MRA Brain - With Contrast",
      shortLabel: "MRA Brain",
      description: "Aneurysm or stenosis screening",
      duration: "30-45 min",
      prep: "IV contrast, kidney function check",
      useCase: "Aneurysm detection, stroke evaluation, vascular malformations"
    }
  ]
},

mrvHead: {
  category: "MRV Head (Venous)",
  icon: "brain",
  categoryGroup: "vascular",
  badge: "🩸 MRV",
  contrastMode: "optional",
  matchKeywords: [
    "mrv head",
    "venous thrombosis",
    "brain veins",
    "sinus thrombosis",
    "vascular malformation"
  ],
  procedures: [
    {
      cpt: "70545",
      label: "MRV Head - Without Contrast",
      shortLabel: "MRV Head - Without",
      description: "Venous thrombosis evaluation",
      duration: "30-45 min",
      prep: "Remove metal objects",
      useCase: "Venous sinus thrombosis, venous malformations"
    },
    {
      cpt: "70546",
      label: "MRV Head - With Contrast",
      shortLabel: "MRV Head - With",
      description: "Enhanced venous evaluation",
      duration: "45-60 min",
      prep: "IV contrast, kidney function check",
      useCase: "Detailed venous thrombosis assessment"
    }
  ]
},

mraNeck: {
  category: "MRA Neck (Carotid)",
  icon: "heart",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra neck",
    "carotid",
    "neck vessels",
    "stroke prevention",
    "dissection",
    "stenosis"
  ],
  procedures: [
    {
      cpt: "70547",
      label: "MRA Neck - With Contrast",
      shortLabel: "MRA Neck",
      description: "Carotid artery evaluation",
      duration: "30-45 min",
      prep: "IV contrast, kidney function check",
      useCase: "Carotid stenosis, dissection, stroke prevention"
    }
  ]
},

mraChest: {
  category: "MRA Chest / Aorta",
  icon: "heart",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra chest",
    "thoracic aorta",
    "aortic aneurysm",
    "dissection",
    "coarctation",
    "vascular chest"
  ],
  procedures: [
    {
      cpt: "71555",
      label: "MRA Chest - With Contrast",
      shortLabel: "MRA Chest",
      description: "Thoracic aorta evaluation",
      duration: "45-60 min",
      prep: "IV contrast, kidney function check",
      useCase: "Aortic aneurysm, dissection, coarctation"
    }
  ]
},

mraAbdomen: {
  category: "MRA Abdomen / Renal",
  icon: "abdomen",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra abdomen",
    "renal arteries",
    "abdominal aorta",
    "mesenteric ischemia",
    "aneurysm"
  ],
  procedures: [
    {
      cpt: "74185",
      label: "MRA Abdomen - With Contrast",
      shortLabel: "MRA Abdomen",
      description: "Renal artery stenosis evaluation",
      duration: "45-60 min",
      prep: "IV contrast, kidney function check",
      useCase: "Renal artery stenosis, mesenteric ischemia, abdominal aneurysm"
    }
  ]
},

mraPelvis: {
  category: "MRA Pelvis",
  icon: "bone",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra pelvis",
    "iliac artery",
    "pelvic vessels",
    "vascular malformation"
  ],
  procedures: [
    {
      cpt: "72198",
      label: "MRA Pelvis - With Contrast",
      shortLabel: "MRA Pelvis",
      description: "Iliac vessel evaluation",
      duration: "45-60 min",
      prep: "IV contrast, kidney function check",
      useCase: "Iliac artery stenosis, pelvic vascular malformations"
    }
  ]
},

mraRunoff: {
  category: "MRA Runoff (Legs)",
  icon: "leg",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra legs",
    "runoff",
    "peripheral artery disease",
    "claudication",
    "limb ischemia"
  ],
  procedures: [
    {
      cpt: "73725",
      label: "MRA Lower Extremities - With Contrast",
      shortLabel: "MRA Runoff",
      description: "Peripheral vascular disease evaluation",
      duration: "60-75 min",
      prep: "IV contrast, kidney function check",
      useCase: "Peripheral artery disease, claudication, limb ischemia"
    }
  ]
},

mraSpine: {
  category: "MRA Spine",
  icon: "spine",
  categoryGroup: "vascular",
  badge: "🧠 MRA",
  contrastMode: "auto",
  matchKeywords: [
    "mra spine",
    "spinal cord vessels",
    "avm",
    "dural fistula",
    "spinal vascular"
  ],
  procedures: [
    {
      cpt: "72159",
      label: "MRA Spine - With Contrast",
      shortLabel: "MRA Spine",
      description: "Spinal cord vascular evaluation",
      duration: "45-60 min",
      prep: "IV contrast, kidney function check",
      useCase: "Spinal vascular malformations, AVMs, dural fistulas"
    }
  ]
},

// ============================================
// SPECIALIZED MRI - ARTHROGRAMS
// ============================================

arthrogramShoulder: {
  category: "MRI Shoulder Arthrogram",
  icon: "shoulder",
  categoryGroup: "specialized",
  badge: "💉 Arthrogram",
  contrastMode: "auto",
  matchKeywords: [
    "shoulder arthrogram",
    "labrum",
    "rotator cuff",
    "joint injection",
    "capsule injury"
  ],
  procedures: [
    {
      cpt: "73222",
      label: "MRI Shoulder Arthrogram - With Contrast",
      shortLabel: "Shoulder Arthrogram",
      description: "Fluoro-guided contrast injection into shoulder joint",
      duration: "45-60 min",
      prep: "Fluoroscopy-guided injection, then immediate MRI",
      useCase: "Labral tears, rotator cuff evaluation, capsular injury"
    }
  ]
},

arthrogramKnee: {
  category: "MRI Knee Arthrogram",
  icon: "knee",
  categoryGroup: "specialized",
  badge: "💉 Arthrogram",
  contrastMode: "auto",
  matchKeywords: [
    "knee arthrogram",
    "meniscus tear",
    "cartilage",
    "ligament",
    "joint injection"
  ],
  procedures: [
    {
      cpt: "73722",
      label: "MRI Knee Arthrogram - With Contrast",
      shortLabel: "Knee Arthrogram",
      description: "Fluoro-guided contrast injection into knee joint",
      duration: "45-60 min",
      prep: "Fluoroscopy-guided injection, then immediate MRI",
      useCase: "Meniscal tears, ligament evaluation, cartilage assessment"
    }
  ]
},

// ============================================
// SPECIALIZED MRI - BREAST
// ============================================

mriBreast: {
  category: "MRI Breast (CAD)",
  icon: "breast",
  categoryGroup: "specialized",
  badge: "🎗️ Breast MRI",
  contrastMode: "manual",
  matchKeywords: [
    "breast mri",
    "breast cancer",
    "implant",
    "dense breasts",
    "high risk screening"
  ],
  procedures: [
    {
      cpt: "77046",
      label: "MRI Breast - Without Contrast",
      shortLabel: "Breast - Without",
      description: "High-risk screening without contrast",
      duration: "30-45 min",
      prep: "No metal bra, avoid week before period",
      useCase: "Initial screening, contrast allergy"
    },
    {
      cpt: "77047",
      label: "MRI Breast - With Contrast",
      shortLabel: "Breast - With",
      description: "High-risk screening and cancer staging",
      duration: "45-60 min",
      prep: "IV contrast, no metal bra",
      useCase: "High-risk screening, cancer staging, implant evaluation"
    },
    {
      cpt: "77048",
      label: "MRI Breast - With & Without Contrast",
      shortLabel: "Breast - Both",
      description: "Comprehensive breast evaluation",
      duration: "60-75 min",
      prep: "IV contrast, no metal bra",
      useCase: "Complex cases, cancer staging, post-treatment surveillance"
    }
  ]
},

// ============================================
// SPECIALIZED MRI - FUNCTIONAL / METABOLIC
// ============================================

spectroscopy: {
  category: "MR Spectroscopy (MRS)",
  icon: "brain",
  categoryGroup: "specialized",
  badge: "🧪 MRS",
  contrastMode: "none",
  matchKeywords: [
    "mr spectroscopy",
    "metabolic",
    "brain chemistry",
    "tumor analysis",
    "dementia"
  ],
  procedures: [
    {
      cpt: "76390",
      label: "MR Spectroscopy - Without Contrast",
      shortLabel: "MR Spectroscopy",
      description: "Metabolic brain analysis (non-contrast)",
      duration: "45-60 min",
      prep: "Standard MRI prep, remove metal",
      useCase: "Brain tumor characterization, metabolic disorders, dementia evaluation"
    }
  ]
},

elastography: {
  category: "MR Elastography (MRE)",
  icon: "liver",
  categoryGroup: "specialized",
  badge: "🧪 MRE",
  contrastMode: "none",
  matchKeywords: [
    "mr elastography",
    "liver stiffness",
    "fibrosis",
    "cirrhosis",
    "mre"
  ],
  procedures: [
    {
      cpt: "76391",
      label: "MR Elastography - Without Contrast",
      shortLabel: "MR Elastography",
      description: "Liver fibrosis evaluation (non-contrast)",
      duration: "45-60 min",
      prep: "Fasting 4 hours, passive driver placed on abdomen",
      useCase: "Liver fibrosis staging, chronic liver disease, cirrhosis evaluation"
    }
  ]
}  // ✅ closes elastography entry
}; // ✅ closes MRI_PROCEDURES object


  // ============================================
// ENHANCED CT PROCEDURES - COMPLETE DATASET (with matchKeywords)
// ============================================

const CT_PROCEDURES = {

  // ============================================
  // STANDARD CT - HEAD & NECK
  // ============================================

  head: {
    category: "Head / Brain",
    icon: "brain",
    categoryGroup: "standard",
    displayIn: ["head", "brain"],
    matchKeywords: [
      "brain",
      "head",
      "stroke",
      "bleeding",
      "trauma",
      "headache",
      "concussion",
      "seizure",
      "brain injury",
      "head ct",
      "ct brain"
    ],
    procedures: [
      {
        cpt: "70450",
        label: "CT Head/Brain - Without Contrast",
        shortLabel: "Head - Without",
        description: "Stroke, bleeding, trauma, acute headache",
        duration: "10-15 min",
        prep: "Remove metal from head area",
        useCase: "Stroke workup, trauma, acute neurological changes",
        clinicalIndication: "First-line evaluation for stroke, bleeding, trauma, and acute headaches"
      },
      {
        cpt: "70460",
        label: "CT Head/Brain - With Contrast",
        shortLabel: "Head - With",
        description: "Tumors, infections, MS evaluation",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Brain tumors, abscess, meningitis",
        clinicalIndication: "Enhanced imaging for tumors, infections, and inflammatory conditions"
      },
      {
        cpt: "70470",
        label: "CT Head/Brain - With & Without Contrast",
        shortLabel: "Head - Both",
        description: "Complete brain evaluation",
        duration: "20-30 min",
        prep: "IV contrast, kidney function check",
        useCase: "Complex brain lesions, tumor staging",
        clinicalIndication: "Comprehensive evaluation for complex lesions and tumor characterization"
      }
    ]
  },

  sinuses: {
    category: "Sinuses",
    icon: "sinuses",
    categoryGroup: "standard",
    displayIn: ["head"],
    matchKeywords: [
      "sinus",
      "sinusitis",
      "sinus infection",
      "nasal polyps",
      "sinus pressure",
      "facial pain",
      "sinus ct",
      "ct sinus"
    ],
    procedures: [
      {
        cpt: "70486",
        label: "CT Sinuses - Without Contrast",
        shortLabel: "Sinuses",
        description: "Sinusitis, polyps, surgical planning",
        duration: "5-10 min",
        prep: "None required",
        useCase: "Chronic sinusitis, polyps, pre-surgical planning",
        clinicalIndication: "Evaluation of chronic sinus infections, polyps, and pre-surgical anatomy"
      }
    ]
  },

  neckSoftTissue: {
    category: "Neck (Soft Tissue)",
    icon: "neck",
    categoryGroup: "standard",
    displayIn: ["head"],
    matchKeywords: [
      "neck",
      "throat",
      "lymph node",
      "neck mass",
      "thyroid",
      "airway",
      "neck ct",
      "soft tissue neck"
    ],
    procedures: [
      {
        cpt: "70490",
        label: "CT Neck - Without Contrast",
        shortLabel: "Neck - Without",
        description: "Throat masses, airway evaluation",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Neck mass, airway obstruction, thyroid",
        clinicalIndication: "Evaluation of neck masses, airway obstruction, and thyroid"
      },
      {
        cpt: "70491",
        label: "CT Neck - With Contrast",
        shortLabel: "Neck - With",
        description: "Lymph nodes, infections, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Lymphadenopathy, abscess, cancer staging",
        clinicalIndication: "Enhanced imaging of lymph nodes, infections, and tumors"
      }
    ]
  },

  // ============================================
  // STANDARD CT - TORSO
  // ============================================

  chest: {
    category: "Chest",
    icon: "chest",
    categoryGroup: "standard",
    displayIn: ["torso"],
    matchKeywords: [
      "chest",
      "lungs",
      "pneumonia",
      "covid",
      "pulmonary embolism",
      "lung cancer",
      "mediastinum",
      "chest pain",
      "shortness of breath",
      "ct chest",
      "lung ct"
    ],
    procedures: [
      {
        cpt: "71250",
        label: "CT Chest - Without Contrast",
        shortLabel: "Chest - Without",
        description: "Lung nodules, pneumonia, COVID-19",
        duration: "10-15 min",
        prep: "Breath holding practice",
        useCase: "Lung screening, pneumonia, interstitial lung disease",
        clinicalIndication: "Evaluation of lung nodules, infections, and inflammatory conditions"
      },
      {
        cpt: "71260",
        label: "CT Chest - With Contrast",
        shortLabel: "Chest - With",
        description: "Pulmonary embolism, lung cancer staging",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "PE evaluation, cancer staging, mediastinal masses",
        clinicalIndication: "Evaluation of pulmonary embolism, cancer staging, and mediastinal masses"
      },
      {
        cpt: "71270",
        label: "CT Chest - With & Without Contrast",
        shortLabel: "Chest - Both",
        description: "Complete chest evaluation",
        duration: "20-30 min",
        prep: "IV contrast, breath holding",
        useCase: "Complex masses, tumor characterization",
        clinicalIndication: "Comprehensive evaluation of complex chest masses and tumors"
      }
    ]
  },

  abdomen: {
    category: "Abdomen",
    icon: "abdomen",
    categoryGroup: "standard",
    displayIn: ["torso"],
    matchKeywords: [
      "abdomen",
      "stomach",
      "abdominal pain",
      "appendicitis",
      "kidney stones",
      "liver",
      "pancreas",
      "gallbladder",
      "appendix",
      "diverticulitis",
      "ct abdomen"
    ],
    procedures: [
      {
        cpt: "74150",
        label: "CT Abdomen - Without Contrast",
        shortLabel: "Abdomen - Without",
        description: "Kidney stones, appendicitis, acute pain",
        duration: "10-15 min",
        prep: "May require oral contrast",
        useCase: "Kidney stones, appendicitis, diverticulitis",
        clinicalIndication: "Evaluation of kidney stones, appendicitis, and acute abdominal pain"
      },
      {
        cpt: "74160",
        label: "CT Abdomen - With Contrast",
        shortLabel: "Abdomen - With",
        description: "Infections, masses, organ evaluation",
        duration: "15-20 min",
        prep: "IV contrast, oral contrast, fasting",
        useCase: "Abdominal pain, infections, tumor staging",
        clinicalIndication: "Enhanced imaging for infections, masses, and organ evaluation"
      },
      {
        cpt: "74170",
        label: "CT Abdomen - With & Without Contrast",
        shortLabel: "Abdomen - Both",
        description: "Complete abdominal imaging",
        duration: "20-30 min",
        prep: "IV contrast, oral contrast",
        useCase: "Liver lesions, kidney masses, cancer staging",
        clinicalIndication: "Comprehensive evaluation of liver and kidney lesions"
      }
    ]
  },

  pelvis: {
    category: "Pelvis",
    icon: "pelvis",
    categoryGroup: "standard",
    displayIn: ["torso"],
    matchKeywords: [
      "pelvis",
      "hip",
      "bladder",
      "ovaries",
      "uterus",
      "prostate",
      "pelvic pain",
      "stones",
      "pelvic fracture",
      "ct pelvis"
    ],
    procedures: [
      {
        cpt: "72192",
        label: "CT Pelvis - Without Contrast",
        shortLabel: "Pelvis - Without",
        description: "Pelvic pain, fractures, stones",
        duration: "10-15 min",
        prep: "Full bladder helpful",
        useCase: "Pelvic fractures, bladder stones, acute pain",
        clinicalIndication: "Evaluation of pelvic fractures, bladder stones, and acute pelvic pain"
      },
      {
        cpt: "72193",
        label: "CT Pelvis - With Contrast",
        shortLabel: "Pelvis - With",
        description: "Pelvic masses, infections, cancer",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Pelvic abscess, tumors, diverticulitis",
        clinicalIndication: "Enhanced imaging of pelvic masses, infections, and tumors"
      },
      {
        cpt: "72194",
        label: "CT Pelvis - With & Without Contrast",
        shortLabel: "Pelvis - Both",
        description: "Complete pelvic evaluation",
        duration: "20-30 min",
        prep: "IV contrast, full bladder",
        useCase: "Pelvic cancer staging, complex masses",
        clinicalIndication: "Comprehensive evaluation for cancer staging and complex pelvic masses"
      }
    ]
  },

  abdomenPelvis: {
    category: "Abdomen & Pelvis",
    icon: "abdomen",
    categoryGroup: "standard",
    displayIn: ["torso"],
    matchKeywords: [
      "abdomen",
      "pelvis",
      "kidney stones",
      "appendicitis",
      "bowel obstruction",
      "abdominal pain",
      "diverticulitis",
      "ct abdomen pelvis"
    ],
    procedures: [
      {
        cpt: "74176",
        label: "CT Abdomen & Pelvis - Without Contrast",
        shortLabel: "Abd/Pelvis - Without",
        description: "Kidney stones, bowel obstruction",
        duration: "15-20 min",
        prep: "May require oral contrast",
        useCase: "Acute abdominal/pelvic pain, stones",
        clinicalIndication: "Evaluation of kidney stones, bowel obstruction, and acute pain"
      },
      {
        cpt: "74177",
        label: "CT Abdomen & Pelvis - With Contrast",
        shortLabel: "Abd/Pelvis - With",
        description: "Most common CT for abdominal complaints",
        duration: "20-25 min",
        prep: "IV & oral contrast, kidney function check",
        useCase: "Appendicitis, diverticulitis, infections, masses",
        clinicalIndication: "Most common CT for appendicitis, diverticulitis, and abdominal infections"
      },
      {
        cpt: "74178",
        label: "CT Abdomen & Pelvis - With & Without Contrast",
        shortLabel: "Abd/Pelvis - Both",
        description: "Complete abdominopelvic evaluation",
        duration: "30-40 min",
        prep: "IV & oral contrast",
        useCase: "Cancer staging, complex organ lesions",
        clinicalIndication: "Comprehensive cancer staging and complex organ lesion evaluation"
      }
    ]
  },

  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "spine",
    categoryGroup: "standard",
    displayIn: ["spine"],
    matchKeywords: [
      "neck",
      "cervical spine",
      "whiplash",
      "fracture",
      "neck trauma",
      "c spine",
      "spine ct"
    ],
    procedures: [
      {
        cpt: "72125",
        label: "CT Cervical Spine - Without Contrast",
        shortLabel: "C-Spine - Without",
        description: "Neck trauma, fractures, bone detail",
        duration: "10-15 min",
        prep: "Remove neck jewelry",
        useCase: "Trauma, fractures, degenerative changes",
        clinicalIndication: "Evaluation of neck trauma, fractures, and bone detail"
      },
      {
        cpt: "72126",
        label: "CT Cervical Spine - With Contrast",
        shortLabel: "C-Spine - With",
        description: "Post-surgical evaluation, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Tumors, infection, post-surgery",
        clinicalIndication: "Enhanced imaging for post-surgical evaluation, tumors, and infections"
      }
    ]
  },

  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "spine",
    categoryGroup: "standard",
    displayIn: ["spine"],
    matchKeywords: [
      "thoracic spine",
      "mid back",
      "upper back",
      "compression fracture",
      "t spine",
      "spine fracture",
      "back ct"
    ],
    procedures: [
      {
        cpt: "72128",
        label: "CT Thoracic Spine - Without Contrast",
        shortLabel: "T-Spine - Without",
        description: "Compression fractures, bone detail",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Compression fractures, trauma, bone evaluation",
        clinicalIndication: "Evaluation of compression fractures, trauma, and bone density"
      },
      {
        cpt: "72129",
        label: "CT Thoracic Spine - With Contrast",
        shortLabel: "T-Spine - With",
        description: "Tumors, infections",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Metastases, infection, post-surgery",
        clinicalIndication: "Enhanced imaging for metastases, infections, and post-surgical evaluation"
      }
    ]
  },

  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "spine",
    categoryGroup: "standard",
    displayIn: ["spine"],
    matchKeywords: [
      "lumbar spine",
      "low back",
      "lower back",
      "back pain",
      "sciatica",
      "l spine",
      "spinal stenosis",
      "disc fracture",
      "spine ct"
    ],
    procedures: [
      {
        cpt: "72131",
        label: "CT Lumbar Spine - Without Contrast",
        shortLabel: "L-Spine - Without",
        description: "Fractures, stenosis, bone density",
        duration: "10-15 min",
        prep: "None required",
        useCase: "Fractures, spinal stenosis, scoliosis evaluation",
        clinicalIndication: "Evaluation of fractures, spinal stenosis, and bone structure"
      },
      {
        cpt: "72132",
        label: "CT Lumbar Spine - With Contrast",
        shortLabel: "L-Spine - With",
        description: "Post-surgical changes, tumors",
        duration: "15-20 min",
        prep: "IV contrast",
        useCase: "Failed back surgery, infection, tumors",
        clinicalIndication: "Enhanced imaging for post-surgical evaluation, infections, and tumors"
      }
    ]
  },


    // ============================================
  // CTA - VASCULAR IMAGING (HEAD & NECK)
  // ============================================

  ctaHeadNeck: {
    category: "CTA Head & Neck",
    icon: "brain",
    categoryGroup: "vascular",
    displayIn: ["head", "vascular"],
    isVascular: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "cta head",
      "cta neck",
      "brain vessels",
      "carotid artery",
      "stroke",
      "aneurysm",
      "vascular imaging",
      "angiogram head",
      "angiogram neck"
    ],
    procedures: [
      {
        cpt: "70496",
        label: "CTA Head - With Contrast",
        shortLabel: "CTA Head",
        description: "Brain aneurysm, stroke, vascular malformations",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Aneurysm detection, stroke evaluation, vascular abnormalities",
        clinicalIndication:
          "Angiography of brain blood vessels for aneurysm, stroke, and vascular malformations",
        tags: ["angiogram", "aneurysm", "stroke", "vascular", "brain vessels"]
      },
      {
        cpt: "70498",
        label: "CTA Neck - With Contrast",
        shortLabel: "CTA Neck",
        description: "Carotid artery stenosis, dissection",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Carotid stenosis, dissection, pre-stroke workup",
        clinicalIndication:
          "Angiography of neck blood vessels for carotid stenosis and dissection",
        tags: ["carotid", "angiogram", "stenosis", "dissection", "neck vessels"]
      }
    ]
  },

  // ============================================
  // CTA - VASCULAR IMAGING (CHEST)
  // ============================================

  ctaChest: {
    category: "CTA Chest",
    icon: "heart",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    isVascular: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "cta chest",
      "pulmonary embolism",
      "pe scan",
      "aortic dissection",
      "aneurysm",
      "lung arteries",
      "chest vessels"
    ],
    procedures: [
      {
        cpt: "71275",
        label: "CTA Chest - With Contrast",
        shortLabel: "CTA Chest",
        description: "Pulmonary embolism, aortic dissection",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check, breath holding",
        useCase: "Pulmonary embolism (PE), aortic dissection, aneurysm",
        clinicalIndication:
          "Angiography for pulmonary embolism detection and aortic evaluation",
        tags: ["pulmonary embolism", "PE", "aortic dissection", "aneurysm", "chest vessels"]
      }
    ]
  },

  ctaCoronary: {
    category: "CTA Coronary (Heart)",
    icon: "heart",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    isVascular: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "cta coronary",
      "heart scan",
      "cta heart",
      "coronary angiogram",
      "chest pain",
      "coronary arteries",
      "bypass graft"
    ],
    procedures: [
      {
        cpt: "75574",
        label: "CTA Coronary Arteries - With Contrast",
        shortLabel: "CTA Coronary",
        description: "Coronary artery disease evaluation",
        duration: "20-30 min",
        prep: "IV contrast, beta blockers, heart rate control",
        useCase: "Coronary artery disease, chest pain evaluation, bypass graft assessment",
        clinicalIndication:
          "Non-invasive angiography of coronary arteries for blockage detection",
        tags: ["coronary", "heart", "cardiac", "angiogram", "chest pain", "CAD"]
      }
    ]
  },

  // ============================================
  // CTA - VASCULAR IMAGING (ABDOMEN)
  // ============================================

  ctaAbdomen: {
    category: "CTA Abdomen",
    icon: "abdomen",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    isVascular: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "cta abdomen",
      "aortic aneurysm",
      "AAA",
      "mesenteric ischemia",
      "renal artery",
      "abdominal vessels"
    ],
    procedures: [
      {
        cpt: "74175",
        label: "CTA Abdomen & Pelvis - With Contrast",
        shortLabel: "CTA Abdomen",
        description: "Abdominal aortic aneurysm, mesenteric ischemia",
        duration: "20-25 min",
        prep: "IV contrast, kidney function check",
        useCase: "AAA evaluation, mesenteric ischemia, renal artery stenosis",
        clinicalIndication:
          "Angiography of abdominal vessels for aneurysm and vascular disease",
        tags: ["aortic aneurysm", "AAA", "mesenteric", "renal artery", "abdominal vessels"]
      }
    ]
  },

  // ============================================
  // CTA - VASCULAR IMAGING (EXTREMITIES)
  // ============================================

  ctaExtremities: {
    category: "CTA Extremities",
    icon: "leg",
    categoryGroup: "vascular",
    displayIn: ["extremities", "vascular"],
    isVascular: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "cta leg",
      "cta arm",
      "peripheral artery disease",
      "PAD",
      "claudication",
      "runoff",
      "vascular legs"
    ],
    procedures: [
      {
        cpt: "73706",
        label: "CTA Lower Extremity - With Contrast",
        shortLabel: "CTA Leg/Run-off",
        description: "Peripheral artery disease (PAD), claudication",
        duration: "20-30 min",
        prep: "IV contrast, kidney function check",
        useCase: "Peripheral artery disease, leg claudication, pre-surgical planning",
        clinicalIndication:
          "Angiography of leg arteries for peripheral artery disease evaluation",
        tags: ["peripheral artery disease", "PAD", "claudication", "leg vessels", "run-off"]
      },
      {
        cpt: "73206",
        label: "CTA Upper Extremity - With Contrast",
        shortLabel: "CTA Arm",
        description: "Upper extremity vascular evaluation",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Arm arterial disease, thoracic outlet syndrome, vascular malformations",
        clinicalIndication:
          "Angiography of arm arteries for vascular abnormalities",
        tags: ["arm vessels", "thoracic outlet", "upper extremity"]
      }
    ]
  },

  // ============================================
  // SPECIALIZED SCREENING
  // ============================================

  screeningLung: {
    category: "Lung Cancer Screening",
    icon: "lungs",
    categoryGroup: "screening",
    displayIn: ["screening", "torso"],
    isScreening: true,
    badge: "⭐ Screening",
    matchKeywords: [
      "lung screening",
      "low dose ct",
      "LDCT",
      "lung cancer",
      "preventive scan",
      "smoker screening",
      "annual scan"
    ],
    procedures: [
      {
        cpt: "71271",
        label: "CT Lung Cancer Screening - Low Dose",
        shortLabel: "Lung Screening",
        description: "Preventive lung cancer screening",
        duration: "5-10 min",
        prep: "None required - no contrast",
        useCase: "Annual lung cancer screening for high-risk patients",
        clinicalIndication:
          "Low-dose CT for early lung cancer detection in high-risk patients",
        helperText: "Annual screening for ages 50-80 with smoking history",
        tags: ["screening", "preventive", "lung cancer", "LDCT", "low dose"]
      }
    ]
  },

  screeningCardiac: {
    category: "Cardiac Calcium Scoring",
    icon: "heart",
    categoryGroup: "screening",
    displayIn: ["screening", "torso"],
    isScreening: true,
    badge: "⭐ Screening",
    matchKeywords: [
      "calcium score",
      "heart screening",
      "cardiac risk",
      "heart disease prevention",
      "coronary calcium",
      "preventive scan"
    ],
    procedures: [
      {
        cpt: "75571",
        label: "CT Cardiac Calcium Score - Without Contrast",
        shortLabel: "Calcium Score",
        description: "Coronary artery calcium scoring",
        duration: "10-15 min",
        prep: "None required - no contrast",
        useCase: "Cardiovascular risk assessment, preventive cardiology",
        clinicalIndication:
          "Quantifies coronary calcium to assess cardiovascular disease risk",
        helperText: "Risk assessment for heart disease - no contrast needed",
        tags: ["screening", "preventive", "calcium score", "heart disease", "cardiac risk"]
      }
    ]
  },

  screeningColon: {
    category: "Virtual Colonoscopy",
    icon: "intestine",
    categoryGroup: "screening",
    displayIn: ["screening", "torso"],
    isScreening: true,
    badge: "⭐ Screening",
    matchKeywords: [
      "colon screening",
      "colon cancer",
      "virtual colonoscopy",
      "colonography",
      "polyps",
      "ct colon"
    ],
    procedures: [
      {
        cpt: "74263",
        label: "CT Colonography (Virtual Colonoscopy) - Screening",
        shortLabel: "Virtual Colonoscopy",
        description: "Non-invasive colon cancer screening",
        duration: "20-30 min",
        prep: "Bowel preparation required, no sedation",
        useCase: "Colon cancer screening, alternative to optical colonoscopy",
        clinicalIndication:
          "Non-invasive colon imaging for polyp and cancer detection",
        helperText: "Colon cancer screening ages 45+ - no sedation required",
        tags: ["screening", "preventive", "colon cancer", "colonography", "polyps"]
      }
    ]
  },

  screeningCoronary: {
    category: "Coronary CTA Screening",
    icon: "heart",
    categoryGroup: "screening",
    displayIn: ["screening", "vascular"],
    isVascular: true,
    isScreening: true,
    badge: "🩸 CTA",
    matchKeywords: [
      "heart screening",
      "cta heart",
      "cta coronary",
      "coronary arteries",
      "heart scan",
      "chest pain"
    ],
    procedures: [
      {
        cpt: "75574",
        label: "CTA Coronary Arteries - Screening",
        shortLabel: "Heart CTA",
        description: "Non-invasive coronary artery evaluation",
        duration: "20-30 min",
        prep: "IV contrast required, heart rate control, beta blockers",
        useCase: "Chest pain evaluation, family history of heart disease",
        clinicalIndication: "Coronary CTA for non-invasive cardiac assessment",
        helperText: "Non-invasive heart evaluation",
        tags: ["coronary", "heart screening", "cta", "cardiac"]
      }
        ]
  }   // ← closes screeningCoronary
};    // ✅ closes CT_PROCEDURES object

// ============================================
// EXPORT / GLOBAL ATTACHMENT
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CT_PROCEDURES };
}


  // ============================================
// X-RAY PROCEDURES - COMPLETE REFERENCE (ENHANCED)
// ============================================

const XRAY_PROCEDURES = {
  chest: {
    category: "Chest",
    icon: "chest",
    matchKeywords: [
      "lungs",
      "pneumonia",
      "heart size",
      "chest pain",
      "cough",
      "shortness of breath",
      "covid",
      "rib fracture",
      "respiratory",
      "chest infection",
      "lung xray",
      "chest xray"
    ],
    viewOptions: [
      {
        views: "1",
        cpt: "71045",
        label: "X-Ray Chest – 1 View",
        shortLabel: "Chest – 1 View",
        description: "Single frontal chest X-ray.",
        duration: "5 min",
        prep: "Remove jewelry or metal objects from chest area.",
        useCase: "Basic chest screening, follow-up.",
        isCommon: false
      },
      {
        views: "2",
        cpt: "71046",
        label: "X-Ray Chest – 2 Views (PA & Lateral)",
        shortLabel: "Chest – 2 Views",
        description: "Standard two-view chest X-ray.",
        duration: "5–10 min",
        prep: "Remove jewelry or metal objects from chest area.",
        useCase: "Pneumonia, infection, or heart evaluation.",
        isCommon: true
      },
      {
        views: "apical",
        cpt: "71042",
        label: "X-Ray Chest – Apical Lordotic",
        shortLabel: "Chest – Apical Lordotic",
        description: "Special angled view of the lung apex.",
        duration: "10 min",
        prep: "Remove jewelry, metal objects.",
        useCase: "Lung apex evaluation or apical mass.",
        isCommon: false
      },
      {
        views: "3-4",
        cpt: "71047-71048",
        label: "X-Ray Chest – Oblique/Special Views",
        shortLabel: "Chest – Special Views",
        description: "Multiple angled chest views.",
        duration: "10–15 min",
        prep: "Remove jewelry, metal objects.",
        useCase: "Rib fractures or comprehensive chest assessment.",
        isCommon: false
      }
    ]
  },

  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "spine",
    matchKeywords: [
      "neck",
      "neck pain",
      "whiplash",
      "cervical spine",
      "c spine",
      "neck injury",
      "neck stiffness",
      "car accident",
      "neck fracture",
      "spine xray"
    ],
    viewOptions: [
      {
        views: "<4",
        cpt: "72040",
        label: "X-Ray Cervical Spine – Less Than 4 Views",
        shortLabel: "C-Spine – <4 Views",
        description: "Limited cervical spine series.",
        duration: "10 min",
        prep: "Remove neck jewelry or necklaces.",
        useCase: "Limited neck evaluation.",
        isCommon: false
      },
      {
        views: "4-5",
        cpt: "72050",
        label: "X-Ray Cervical Spine – 4–5 Views",
        shortLabel: "C-Spine – 4–5 Views",
        description: "Standard cervical spine series.",
        duration: "10–15 min",
        prep: "Remove neck jewelry or necklaces.",
        useCase: "Neck pain, injury, or whiplash.",
        isCommon: true
      },
      {
        views: "6+",
        cpt: "72052",
        label: "X-Ray Cervical Spine – 6+ Views (Flex/Ext)",
        shortLabel: "C-Spine – 6+ Views",
        description: "Complete cervical series with flexion/extension.",
        duration: "15–20 min",
        prep: "Remove neck jewelry or necklaces.",
        useCase: "Instability or post-injury motion study.",
        isCommon: false
      }
    ]
  },

  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "spine",
    matchKeywords: [
      "mid back",
      "thoracic spine",
      "t spine",
      "back pain",
      "compression fracture",
      "scoliosis",
      "midback pain",
      "thoracic injury"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "72070",
        label: "X-Ray Thoracic Spine – 2 Views",
        shortLabel: "T-Spine – 2 Views",
        description: "Two-view thoracic spine X-ray.",
        duration: "10 min",
        prep: "Remove clothing with metal fasteners.",
        useCase: "Mid-back pain or fracture assessment.",
        isCommon: true
      },
      {
        views: "3+",
        cpt: "72074",
        label: "X-Ray Thoracic Spine – 3+ Views",
        shortLabel: "T-Spine – 3+ Views",
        description: "Complete thoracic spine series.",
        duration: "15 min",
        prep: "Remove clothing with metal fasteners.",
        useCase: "Scoliosis or detailed spine evaluation.",
        isCommon: false
      }
    ]
  },

  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "spine",
    matchKeywords: [
      "lower back",
      "low back pain",
      "lumbar",
      "sciatica",
      "back pain",
      "spine",
      "lumbar fracture",
      "lumbar spondylosis",
      "l spine",
      "back injury"
    ],
    viewOptions: [
      {
        views: "<4",
        cpt: "72100",
        label: "X-Ray Lumbar Spine – Less Than 4 Views",
        shortLabel: "L-Spine – <4 Views",
        description: "Limited lumbar spine series.",
        duration: "10 min",
        prep: "Remove belt or clothing with metal.",
        useCase: "Limited low back evaluation.",
        isCommon: false
      },
      {
        views: "4",
        cpt: "72110",
        label: "X-Ray Lumbar Spine – 4 Views",
        shortLabel: "L-Spine – 4 Views",
        description: "Standard lumbar spine series.",
        duration: "10–15 min",
        prep: "Remove belt or pants with metal.",
        useCase: "Low back pain, sciatica, or disc issues.",
        isCommon: true
      },
      {
        views: "6",
        cpt: "72114",
        label: "X-Ray Lumbar Spine – 6 Views (Flex/Ext)",
        shortLabel: "L-Spine – 6 Views",
        description: "Complete lumbar series with bending views.",
        duration: "15–20 min",
        prep: "Remove belt or pants with metal.",
        useCase: "Instability or spondylolisthesis evaluation.",
        isCommon: false
      }
    ]
  },

  knee: {
    category: "Knee",
    icon: "knee",
    matchKeywords: [
      "knee pain",
      "arthritis",
      "meniscus tear",
      "knee injury",
      "fracture",
      "knee swelling",
      "joint pain",
      "patella",
      "kneecap",
      "knee xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73560",
        label: "X-Ray Knee – 2 Views",
        shortLabel: "Knee – 2 Views",
        description: "AP and lateral knee views.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Knee pain or injury evaluation.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73562",
        label: "X-Ray Knee – 3 Views",
        shortLabel: "Knee – 3 Views",
        description: "Comprehensive knee series.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Arthritis or detailed knee assessment.",
        isCommon: false,
        bilateral: true
      },
      {
        views: "4",
        cpt: "73564",
        label: "X-Ray Knee – 4 Views (Axial/Oblique)",
        shortLabel: "Knee – 4 Views",
        description: "Specialized knee series.",
        duration: "10–15 min",
        prep: "None required.",
        useCase: "Pre-surgical or complex knee evaluation.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  shoulder: {
    category: "Shoulder",
    icon: "shoulder",
    matchKeywords: [
      "shoulder pain",
      "rotator cuff",
      "dislocation",
      "shoulder injury",
      "fracture",
      "ac joint",
      "arthritis",
      "clavicle",
      "shoulder xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73020",
        label: "X-Ray Shoulder – 2 Views",
        shortLabel: "Shoulder – 2 Views",
        description: "AP and lateral shoulder views.",
        duration: "5–10 min",
        prep: "Remove clothing from shoulder area.",
        useCase: "Shoulder pain or trauma.",
        isCommon: false,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73030",
        label: "X-Ray Shoulder – 3 Views (Complete)",
        shortLabel: "Shoulder – 3 Views",
        description: "Complete shoulder series.",
        duration: "10–15 min",
        prep: "Remove clothing from shoulder area.",
        useCase: "Rotator cuff or dislocation evaluation.",
        isCommon: true,
        bilateral: true
      }
    ]
  },

  clavicle: {
    category: "Clavicle",
    icon: "clavicle",
    matchKeywords: [
      "collarbone",
      "clavicle fracture",
      "shoulder fracture",
      "broken collarbone",
      "shoulder pain",
      "ac joint"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73000",
        label: "X-Ray Clavicle – 2 Views (Complete)",
        shortLabel: "Clavicle – Complete",
        description: "Complete clavicle X-ray.",
        duration: "5 min",
        prep: "Remove clothing from shoulder/chest area.",
        useCase: "Clavicle fracture or injury.",
        isCommon: true
      }
    ]
  },

  abdomen: {
    category: "Abdomen (KUB)",
    icon: "abdomen",
    matchKeywords: [
      "kidney",
      "ureter",
      "bladder",
      "kub",
      "stones",
      "kidney stones",
      "constipation",
      "bowel obstruction",
      "abdominal pain",
      "stomach",
      "digestive",
      "abdomen xray"
    ],
    viewOptions: [
      {
        views: "1",
        cpt: "74018",
        label: "X-Ray Abdomen – 1 View (KUB)",
        shortLabel: "KUB – 1 View",
        description: "Single abdominal view (kidneys, ureters, bladder).",
        duration: "5 min",
        prep: "None required.",
        useCase: "Kidney stones, constipation, or abdominal pain.",
        isCommon: true
      },
      {
        views: "2",
        cpt: "74019",
        label: "X-Ray Abdomen – 2 Views",
        shortLabel: "Abdomen – 2 Views",
        description: "AP and additional abdominal view.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Bowel obstruction or abdominal pain.",
        isCommon: false
      },
      {
        views: "3+",
        cpt: "74021",
        label: "X-Ray Abdomen – 3+ Views (Acute Series)",
        shortLabel: "Abdomen – Acute Series",
        description: "Complete abdominal series with obliques.",
        duration: "10–15 min",
        prep: "None required.",
        useCase: "Acute abdomen or bowel obstruction evaluation.",
        isCommon: false
      }
    ]
  },

  pelvis: {
    category: "Pelvis",
    icon: "pelvis",
    matchKeywords: [
      "hip",
      "pelvic fracture",
      "hip pain",
      "hip injury",
      "pelvic pain",
      "sacroiliac",
      "si joint",
      "pelvis xray"
    ],
    viewOptions: [
      {
        views: "1-2",
        cpt: "72170",
        label: "X-Ray Pelvis – 1 or 2 Views",
        shortLabel: "Pelvis – 1–2 Views",
        description: "Standard pelvis X-ray.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Hip pain or pelvic trauma.",
        isCommon: true
      },
      {
        views: "3+",
        cpt: "72190",
        label: "X-Ray Pelvis – 3+ Views (Complete)",
        shortLabel: "Pelvis – Complete",
        description: "Complete pelvis series.",
        duration: "10–15 min",
        prep: "None required.",
        useCase: "Fracture or detailed pelvic evaluation.",
        isCommon: false
      }
    ]
  },

  ribs: {
    category: "Ribs",
    icon: "ribs",
    matchKeywords: [
      "rib fracture",
      "chest wall",
      "rib pain",
      "rib injury",
      "broken rib",
      "rib trauma",
      "rib xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "71100",
        label: "X-Ray Ribs – Unilateral 2 Views",
        shortLabel: "Ribs – 2 Views (One Side)",
        description: "Two views of one side of ribs.",
        duration: "10 min",
        prep: "Remove clothing from chest area.",
        useCase: "Rib fracture or localized chest pain.",
        isCommon: false
      },
      {
        views: "3",
        cpt: "71101",
        label: "X-Ray Ribs – Including Chest 3–4 Views",
        shortLabel: "Ribs – 3–4 Views",
        description: "Ribs with chest views.",
        duration: "10–15 min",
        prep: "Remove clothing from chest area.",
        useCase: "Comprehensive rib and lung evaluation.",
        isCommon: false
      },
      {
        views: "bilateral",
        cpt: "71110",
        label: "X-Ray Ribs – Bilateral (Both Sides)",
        shortLabel: "Ribs – Bilateral",
        description: "Both sides of ribs.",
        duration: "15 min",
        prep: "Remove clothing from chest area.",
        useCase: "Bilateral rib trauma.",
        isCommon: true
      }
    ]
  },

  ankle: {
    category: "Ankle",
    icon: "ankle",
    matchKeywords: [
      "ankle pain",
      "ankle sprain",
      "ankle fracture",
      "ankle injury",
      "twisted ankle",
      "broken ankle",
      "foot and ankle",
      "ankle swelling",
      "ankle xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73600",
        label: "X-Ray Ankle – 2 Views",
        shortLabel: "Ankle – 2 Views",
        description: "AP and lateral ankle views.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Ankle sprain or fracture evaluation.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73610",
        label: "X-Ray Ankle – 3 Views (Complete)",
        shortLabel: "Ankle – 3 Views",
        description: "Complete ankle series.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Comprehensive ankle assessment.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  foot: {
    category: "Foot",
    icon: "foot",
    matchKeywords: [
      "foot pain",
      "broken foot",
      "foot fracture",
      "toe",
      "metatarsal",
      "heel",
      "foot injury",
      "foot xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73620",
        label: "X-Ray Foot – 2 Views",
        shortLabel: "Foot – 2 Views",
        description: "AP and lateral foot.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Foot pain or fracture evaluation.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73630",
        label: "X-Ray Foot – 3 Views (Complete)",
        shortLabel: "Foot – 3 Views",
        description: "Complete foot series.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Comprehensive foot injury or deformity assessment.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  hand: {
    category: "Hand",
    icon: "hand",
    matchKeywords: [
      "hand pain",
      "hand fracture",
      "broken hand",
      "finger injury",
      "finger fracture",
      "metacarpal",
      "hand xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73120",
        label: "X-Ray Hand – 2 Views",
        shortLabel: "Hand – 2 Views",
        description: "AP and lateral hand.",
        duration: "5–10 min",
        prep: "Remove rings or jewelry.",
        useCase: "Hand injury or suspected fracture.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73130",
        label: "X-Ray Hand – 3 Views (Complete)",
        shortLabel: "Hand – 3 Views",
        description: "Complete hand series.",
        duration: "10 min",
        prep: "Remove rings or jewelry.",
        useCase: "Comprehensive hand evaluation.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  wrist: {
    category: "Wrist",
    icon: "wrist",
    matchKeywords: [
      "wrist pain",
      "wrist fracture",
      "scaphoid",
      "broken wrist",
      "wrist injury",
      "carpal",
      "wrist xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73100",
        label: "X-Ray Wrist – 2 Views",
        shortLabel: "Wrist – 2 Views",
        description: "AP and lateral wrist.",
        duration: "5–10 min",
        prep: "Remove watches or bracelets.",
        useCase: "Wrist pain or injury evaluation.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73110",
        label: "X-Ray Wrist – 3 Views (Complete)",
        shortLabel: "Wrist – 3 Views",
        description: "Complete wrist series.",
        duration: "10 min",
        prep: "Remove watches or bracelets.",
        useCase: "Comprehensive wrist or scaphoid evaluation.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  hip: {
    category: "Hip",
    icon: "hip",
    matchKeywords: [
      "hip pain",
      "hip fracture",
      "hip injury",
      "pelvis",
      "hip arthritis",
      "hip replacement",
      "hip xray"
    ],
    viewOptions: [
      {
        views: "2-3",
        cpt: "73521",
        label: "X-Ray Hip – Unilateral 2–3 Views",
        shortLabel: "Hip – 2–3 Views (One Side)",
        description: "One hip with multiple views.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Hip pain or fracture assessment.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "4+",
        cpt: "73522",
        label: "X-Ray Hip – Bilateral 3–4 Views",
        shortLabel: "Hip – Bilateral",
        description: "Both hips X-ray.",
        duration: "10–15 min",
        prep: "None required.",
        useCase: "Bilateral hip comparison or post-surgical follow-up.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  elbow: {
    category: "Elbow",
    icon: "elbow",
    matchKeywords: [
      "elbow pain",
      "elbow injury",
      "broken elbow",
      "tennis elbow",
      "olecranon",
      "elbow xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73070",
        label: "X-Ray Elbow – 2 Views",
        shortLabel: "Elbow – 2 Views",
        description: "AP and lateral elbow.",
        duration: "5–10 min",
        prep: "None required.",
        useCase: "Elbow pain or trauma.",
        isCommon: true,
        bilateral: true
      },
      {
        views: "3",
        cpt: "73080",
        label: "X-Ray Elbow – 3 Views (Complete)",
        shortLabel: "Elbow – 3 Views",
        description: "Complete elbow series.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Comprehensive elbow evaluation.",
        isCommon: false,
        bilateral: true
      }
    ]
  },

  femur: {
    category: "Femur (Thigh)",
    icon: "femur",
    matchKeywords: [
      "thigh",
      "femur",
      "broken leg",
      "femur fracture",
      "leg pain",
      "thigh pain",
      "femur xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73552",
        label: "X-Ray Femur – 2 Views",
        shortLabel: "Femur – 2 Views",
        description: "AP and lateral femur.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Thigh pain or femur fracture.",
        isCommon: true
      }
    ]
  },

  tibia: {
    category: "Tibia/Fibula (Lower Leg)",
    icon: "tibia",
    matchKeywords: [
      "shin",
      "lower leg pain",
      "tibia",
      "fibula",
      "leg fracture",
      "tibial fracture",
      "broken leg",
      "lower leg injury",
      "tibia xray"
    ],
    viewOptions: [
      {
        views: "2",
        cpt: "73590",
        label: "X-Ray Tibia/Fibula – 2 Views",
        shortLabel: "Lower Leg – 2 Views",
        description: "AP and lateral lower leg.",
        duration: "10 min",
        prep: "None required.",
        useCase: "Lower leg pain or fracture evaluation.",
        isCommon: true,
        bilateral: true
      }
    ]
  }
};


  // ============================================
// ULTRASOUND PROCEDURES - COMPLETE REFERENCE
// ============================================

const ULTRASOUND_PROCEDURES = {
  abdomen: {
    category: "Abdomen",
    icon: "abdomen",

    // ✅ Enhanced search awareness
    matchKeywords: [
      "liver",
      "gallbladder",
      "kidneys",
      "pancreas",
      "spleen",
      "stomach",
      "abdominal pain",
      "nausea",
      "stones",
      "gallstones",
      "kidney stones",
      "digestive",
      "upper abdomen",
      "ultrasound abdomen",
      "stomach scan",
      "liver ultrasound"
    ],

    procedures: [
      {
        cpt: "76700",
        label: "Ultrasound Abdomen – Complete",
        shortLabel: "Abdomen – Complete",
        description:
          "Evaluates liver, gallbladder, kidneys, pancreas, spleen, and abdominal aorta.",
        duration: "20–30 min",
        prep: "Fast for 6 hours before exam.",
        useCase:
          "Abdominal pain, gallstones, liver disease, or kidney stones."
      },
      {
        cpt: "76705",
        label: "Ultrasound Abdomen – Limited",
        shortLabel: "Abdomen – Limited",
        description:
          "Focused evaluation of a specific abdominal organ or region.",
        duration: "15–20 min",
        prep: "Fast for 6 hours before exam.",
        useCase:
          "Follow-up imaging or targeted evaluation of a known abnormality."
      },
      {
        cpt: "76706",
        label: "Ultrasound Aorta – Abdominal",
        shortLabel: "Aorta – Abdominal",
        description:
          "Evaluates the abdominal aorta for aneurysm or other vascular abnormalities.",
        duration: "15–20 min",
        prep: "Fast for 6 hours before exam.",
        useCase:
          "Screening for aortic aneurysm, vascular disease, or family history of aneurysm."
      }
    ]
  },

  pelvis: {
    category: "Pelvis",
    icon: "pelvis",

    matchKeywords: [
      "uterus",
      "ovaries",
      "bladder",
      "pelvic pain",
      "fibroids",
      "ovarian cysts",
      "menstrual issues",
      "infertility",
      "reproductive system",
      "pelvic scan",
      "pelvic ultrasound",
      "female ultrasound",
      "transvaginal",
      "gynecology"
    ],

    procedures: [
      {
        cpt: "76856",
        label: "Ultrasound Pelvis – Complete",
        shortLabel: "Pelvis – Complete",
        description:
          "Evaluates uterus, ovaries, and surrounding pelvic structures.",
        duration: "20–30 min",
        prep: "Full bladder required — drink 32 oz of water 1 hour before exam.",
        useCase:
          "Pelvic pain, abnormal bleeding, ovarian cysts, or uterine fibroids."
      },
      {
        cpt: "76857",
        label: "Ultrasound Pelvis – Limited",
        shortLabel: "Pelvis – Limited",
        description:
          "Focused evaluation of a specific pelvic structure or region.",
        duration: "15–20 min",
        prep: "Full bladder required — drink 32 oz of water 1 hour before exam.",
        useCase:
          "Follow-up of known findings or targeted pelvic evaluation."
      },
      {
        cpt: "76830",
        label: "Ultrasound Transvaginal",
        shortLabel: "Transvaginal",
        description:
          "Detailed internal evaluation of uterus and ovaries using a vaginal probe.",
        duration: "20–30 min",
        prep: "Empty bladder before exam.",
        useCase:
          "Pelvic pain, infertility, early pregnancy, or ovarian mass evaluation."
      }
    ]
  },

  obstetric: {
    category: "Pregnancy Ultrasound (OB)",
    icon: "pregnancy",

    matchKeywords: [
      "pregnancy",
      "baby",
      "ob",
      "obstetric",
      "prenatal",
      "fetus",
      "fetal",
      "expecting",
      "ultrasound for pregnancy",
      "baby ultrasound",
      "pregnancy scan",
      "prenatal ultrasound",
      "ultrasound baby check",
      "pregnant",
      "anatomy scan",
      "due date"
    ],

    procedures: [
      {
        cpt: "76801",
        label: "Ultrasound OB – First Trimester",
        shortLabel: "OB – First Trimester",
        description:
          "Evaluates early pregnancy, confirms viability, and estimates gestational age.",
        duration: "15–20 min",
        prep: "Full bladder may be helpful in early pregnancy.",
        useCase:
          "Confirm pregnancy, evaluate bleeding, or establish accurate dating."
      },
      {
        cpt: "76805",
        label: "Ultrasound OB – Second/Third Trimester",
        shortLabel: "OB – Complete",
        description:
          "Comprehensive evaluation of fetal anatomy, growth, and placental position.",
        duration: "30–45 min",
        prep: "No special preparation required.",
        useCase:
          "Routine prenatal care, anatomy survey at 18–20 weeks, or growth assessment."
      },
      {
        cpt: "76815",
        label: "Ultrasound OB – Limited",
        shortLabel: "OB – Limited",
        description:
          "Focused assessment of fetal position, heart rate, or amniotic fluid volume.",
        duration: "15–20 min",
        prep: "No special preparation required.",
        useCase:
          "Follow-up exam, fetal position check, or biophysical profile."
      }
    ]
  },

  vascular: {
    category: "Vascular / Blood Flow (Doppler)",
    icon: "heart",

    matchKeywords: [
      "carotid",
      "artery",
      "vein",
      "blood flow",
      "duplex",
      "doppler",
      "circulation",
      "blood clot",
      "deep vein thrombosis",
      "dvt",
      "stroke risk",
      "peripheral artery disease",
      "leg swelling",
      "poor circulation",
      "vascular scan"
    ],

    procedures: [
      {
        cpt: "93880",
        label: "Duplex Scan Carotid – Bilateral",
        shortLabel: "Carotid Duplex",
        description:
          "Evaluates blood flow through carotid arteries in the neck to assess stroke risk.",
        duration: "30–45 min",
        prep: "No special preparation required.",
        useCase: "Stroke risk, carotid stenosis, or vascular disease screening."
      },
      {
        cpt: "93970",
        label: "Duplex Scan Lower Extremity – Venous",
        shortLabel: "LE Venous Duplex",
        description:
          "Evaluates leg veins for blood clots or venous insufficiency.",
        duration: "30–45 min",
        prep: "No special preparation required.",
        useCase: "Leg swelling, suspected DVT, or varicose veins."
      },
      {
        cpt: "93925",
        label: "Duplex Scan Lower Extremity – Arterial",
        shortLabel: "LE Arterial Duplex",
        description:
          "Evaluates arterial blood flow to the legs to detect blockages or narrowing.",
        duration: "30–45 min",
        prep: "No special preparation required.",
        useCase:
          "Leg pain with walking, peripheral artery disease, or poor circulation."
      }
    ]
  },

  smallParts: {
    category: "Soft Tissue / Thyroid",
    icon: "thyroid",

    matchKeywords: [
      "thyroid",
      "neck lump",
      "nodule",
      "goiter",
      "lymph node",
      "soft tissue",
      "mass",
      "lump",
      "swelling",
      "salivary gland",
      "breast",
      "testicle",
      "scrotum",
      "ultrasound neck",
      "breast ultrasound",
      "thyroid ultrasound"
    ],

    procedures: [
      {
        cpt: "76536",
        label: "Ultrasound Soft Tissue – Head and Neck",
        shortLabel: "Soft Tissue – Head/Neck",
        description:
          "Evaluates superficial masses, lymph nodes, or soft tissue abnormalities in the head and neck.",
        duration: "15–20 min",
        prep: "No special preparation required.",
        useCase:
          "Neck lump, enlarged lymph nodes, or salivary gland evaluation."
      },
      {
        cpt: "76642",
        label: "Ultrasound Breast – Unilateral",
        shortLabel: "Breast – Unilateral",
        description:
          "Evaluates breast tissue for masses, cysts, or other abnormalities.",
        duration: "15–20 min",
        prep: "No special preparation required.",
        useCase:
          "Palpable lump, breast pain, or follow-up of mammogram findings."
      },
      {
        cpt: "76870",
        label: "Ultrasound Scrotum",
        shortLabel: "Scrotum",
        description:
          "Evaluates testicles, epididymis, and surrounding scrotal structures.",
        duration: "20–30 min",
        prep: "No special preparation required.",
        useCase:
          "Testicular pain, swelling, mass, trauma, or infertility evaluation."
      }
    ]
  },

  musculoskeletal: {
    category: "Joint / Tendon / Muscle",
    icon: "shoulder",

    matchKeywords: [
      "joint",
      "shoulder",
      "rotator cuff",
      "elbow",
      "knee",
      "ankle",
      "wrist",
      "muscle",
      "tendon",
      "ligament",
      "sports injury",
      "sprain",
      "tear",
      "strain",
      "ultrasound joint",
      "ultrasound shoulder",
      "musculoskeletal ultrasound"
    ],

    procedures: [
      {
        cpt: "76881",
        label: "Ultrasound Extremity – Complete",
        shortLabel: "Extremity – Complete",
        description:
          "Comprehensive evaluation of muscles, tendons, ligaments, and joints.",
        duration: "20–30 min",
        prep: "No special preparation required.",
        useCase:
          "Tendon tear, ligament injury, soft tissue mass, or joint effusion."
      },
      {
        cpt: "76882",
        label: "Ultrasound Extremity – Limited",
        shortLabel: "Extremity – Limited",
        description:
          "Focused evaluation of a specific tendon, muscle, or joint region.",
        duration: "15–20 min",
        prep: "No special preparation required.",
        useCase:
          "Targeted assessment of rotator cuff, Achilles tendon, or specific joint injury."
      },
      {
        cpt: "76942",
        label: "Ultrasound Guidance for Needle Placement",
        shortLabel: "US-Guided Procedure",
        description:
          "Real-time ultrasound guidance for injections, biopsies, or aspirations.",
        duration: "10–20 min",
        prep: "Varies based on specific procedure.",
        useCase:
          "Joint injections, fluid aspiration, or biopsy guidance."
      }
    ]
  }
};


  
  // ============================================
  // HELPER FUNCTIONS (ALL PRESERVED!)
  // ============================================

  function normalizeRegionKey(region, modality) {
    if (!region) return null;
    
    const normalized = region.toLowerCase().trim();
    
    const regionMap = {
      // Brain/Head
      'brain': 'brain',
      'head': 'head',
      'head / brain': 'head',
      'head/brain': 'head',
      
      // Spine
      'cervical spine': 'cervicalSpine',
      'cervical spine (neck)': 'cervicalSpine',
      'cervicalspine': 'cervicalSpine',     // âœ… ADD: Support camelCase from UI
      'c-spine': 'cervicalSpine',
      'neck': 'cervicalSpine',

      'thoracic spine': 'thoracicSpine',
      'thoracic spine (mid back)': 'thoracicSpine',
      'thoracicspine': 'thoracicSpine',     // âœ… ADD: Support camelCase from UI
      't-spine': 'thoracicSpine',
      'mid back': 'thoracicSpine',

      'lumbar spine': 'lumbarSpine',
      'lumbar spine (low back)': 'lumbarSpine',
      'lumbarspine': 'lumbarSpine',         // âœ… ADD: Support camelCase from UI
      'l-spine': 'lumbarSpine',
      'low back': 'lumbarSpine',
      'back': 'lumbarSpine',
      
      // Extremities
      'shoulder': 'shoulder',
      'elbow': 'elbow',
      'wrist': 'wrist',
      'wrist / hand': 'wrist',  // UI sends "Wrist / Hand", map to wrist
      'wrist/hand': 'wrist',
      'hand': 'hand',
      
      'hip': 'hip',
      'knee': 'knee',
      'ankle': 'ankle',
      'ankle / foot': 'ankle',  // UI sends "Ankle / Foot", map to ankle
      'ankle/foot': 'ankle',
      'foot': 'foot',
      
      // Torso
      'abdomen': 'abdomen',
      'pelvis': 'pelvis',
      'abdomen & pelvis': 'abdomenPelvis',
      'abdomen and pelvis': 'abdomenPelvis',
      'abdomen/pelvis': 'abdomenPelvis',
      'chest': 'chest',
      'breast': 'breast',
      
      // Other
      'cardiac': 'cardiac',
      'heart': 'cardiac',
      'orbit / face / neck': 'orbitFaceNeck',
      'orbit/face/neck': 'orbitFaceNeck',
      'tmj': 'tmj',
      'sinuses': 'sinuses',
      'neck (soft tissue)': 'neckSoftTissue',
      
      // MRA/MRV - Vascular Imaging
      'mrabrain': 'mraBrain',
      'mrvhead': 'mrvHead',
      'mraneck': 'mraNeck',
      'mrachest': 'mraChest',
      'mraabdomen': 'mraAbdomen',
      'mrapelvis': 'mraPelvis',
      'mrarunoff': 'mraRunoff',
      'mraspine': 'mraSpine',
      
      // Specialized MRI
      'arthrogramshoulder': 'arthrogramShoulder',
      'arthrogramknee': 'arthrogramKnee',
      'mribreast': 'mriBreast',
      'spectroscopy': 'spectroscopy',
      'elastography': 'elastography',
      
      // Ultrasound
      'obstetric / pregnancy': 'obstetric',
      'obstetric/pregnancy': 'obstetric',
      'obstetric': 'obstetric',
      'pregnancy': 'obstetric',
      'pregnancy ultrasound (ob)': 'obstetric',
      'ob': 'obstetric',
      'baby': 'obstetric',
      'fetal': 'obstetric',
      'prenatal': 'obstetric',
      
      'vascular / doppler': 'vascular',
      'vascular/doppler': 'vascular',
      'vascular': 'vascular',
      'doppler': 'vascular',
      'vascular / blood flow (doppler)': 'vascular',
      'blood flow': 'vascular',
      'vein': 'vascular',
      'arterial': 'vascular',
      'carotid': 'vascular',
      
      'small parts': 'smallParts',
      'smallparts': 'smallParts',
      'thyroid': 'smallParts',
      'soft tissue / thyroid': 'smallParts',
      'soft tissue': 'smallParts',
      'neck': 'smallParts',
      'lump': 'smallParts',
      'mass': 'smallParts',
      'scrotum': 'smallParts',
      'testicular': 'smallParts',
      'breast': 'smallParts',
      
      'musculoskeletal': 'musculoskeletal',
      'msk': 'musculoskeletal',
      'joint': 'musculoskeletal',
      'joint / tendon / muscle': 'musculoskeletal',
      'tendon': 'musculoskeletal',
      'ligament': 'musculoskeletal',
      'muscle': 'musculoskeletal',
      'extremity': 'musculoskeletal'
    };
    
    const baseKey = regionMap[normalized] || null;
    
    return baseKey;
  }

  /**
   * Check if a body part is ambiguous
   */
  function isAmbiguousBodyPart(bodyPart, modality = 'MRI') {
    const library = modality === 'MRI' ? MRI_PROCEDURES : CT_PROCEDURES;
    const normalized = normalizeRegionKey(bodyPart, modality);
    
    if (!normalized || !library[normalized]) return false;
    
    return library[normalized].ambiguous === true;
  }

  /**
   * Get all categories for an ambiguous body part
   */
  function getCategoriesForBodyPart(bodyPart, modality = 'MRI') {
    const library = modality === 'MRI' ? MRI_PROCEDURES : CT_PROCEDURES;
    const normalized = normalizeRegionKey(bodyPart, modality);
    
    if (!normalized || !library[normalized]) return [];
    
    const entry = library[normalized];
    
    if (!entry.ambiguous) {
      if (entry.redirectTo) {
        return [library[entry.redirectTo]];
      }
      return [entry];
    }
    
    return entry.multipleCategories.map(cat => ({
      ...cat,
      data: library[cat.key]
    }));
  }

  /**
   * Filter procedures by contrast availability
   */
  function filterByContrast(category, contrast) {
    if (!contrast) return category.procedures;
    
    const available = category.contrastAvailability || [];
    
    if (!available.includes(contrast)) {
      return [];
    }
    
    const contrastMap = {
      'without': 'Without Contrast',
      'with': 'With Contrast',
      'both': 'With & Without'
    };
    
    const searchLabel = contrastMap[contrast];
    
    return category.procedures.filter(proc => 
      proc.label.includes(searchLabel) || proc.shortLabel.includes(searchLabel)
    );
  }

  function resolveProcedure(modality, contrast, region) {
    console.log('🔍 [Procedure Library] Resolving:', { modality, contrast, region });
    // Normalize modality
    const modalityKey = modality.toUpperCase();
    let modalityData;
    
    if (modalityKey === 'MRI') {
      modalityData = MRI_PROCEDURES;
    } else if (modalityKey === 'CT') {
      modalityData = CT_PROCEDURES;
    } else if (modalityKey === 'X-RAY') {
      modalityData = XRAY_PROCEDURES;
    } else if (modalityKey === 'ULTRASOUND') {
      modalityData = ULTRASOUND_PROCEDURES;
    } else {
      console.warn('⚠️ Unsupported modality:', modality);
      return null;
    }
    
    // Find region
    const regionKey = normalizeRegionKey(region, modality);
    if (!regionKey) {
      console.warn('⚠️ Region not found:', region);
      return null;
    }
    
    const categoryData = modalityData[regionKey];
    if (!categoryData) {
      console.warn('Ã¢ÂÅ’ No data for region:', region);
      return null;
    }
    
    // Handle redirects
    if (categoryData.redirectTo) {
      console.log('Ã°Å¸â€â€ž Following redirect:', categoryData.redirectTo);
      const targetData = modalityData[categoryData.redirectTo];
      if (!targetData || !targetData.procedures) {
        console.warn('Ã¢ÂÅ’ Redirect target not found:', categoryData.redirectTo);
        return null;
      }
      
      // Find matching procedure
    let procedure;
    
    // For modalities without contrast (X-Ray, Ultrasound), just return first procedure
    if (!contrast || modalityKey === 'X-RAY' || modalityKey === 'ULTRASOUND') {
      procedure = categoryData.procedures[0];
    } else {
      // For MRI/CT, find by contrast type
      procedure = findProcedureByContrast(categoryData.procedures, contrast);
    }
    
    if (!procedure) {
      console.warn('⚠️ No matching procedure:', { region: region, contrast: contrast });
      return null;
    }
      
      return {
        cpt_code: procedure.cpt,
        label: procedure.label,
        patient_label: procedure.label,
        badge_label: 'CPT ' + procedure.cpt,
        description: procedure.description,
        duration: procedure.duration,
        prep: procedure.prep,
        useCase: procedure.useCase,
        category: categoryData.category, // Original name
        icon: categoryData.icon || targetData.icon
      };
    }
    
    // No redirect - use procedures directly
    if (!categoryData.procedures) {
      console.warn('⚠️ No procedures for region:', region);
      return null;
    }
    
    // Find matching procedure
    let procedure;
    
    // For modalities without contrast (X-Ray, Ultrasound), just return first procedure
    if (!contrast || modalityKey === 'X-RAY' || modalityKey === 'ULTRASOUND') {
      procedure = categoryData.procedures[0];
    } else {
      // For MRI/CT, find by contrast type
      procedure = findProcedureByContrast(categoryData.procedures, contrast);
    }
    
    if (!procedure) {
      console.warn('⚠️ No matching procedure:', { region: region, contrast: contrast });
      return null;
    }
    
    console.log('✅ [Procedure Library] Found:', procedure);
    
    return {
      cpt_code: procedure.cpt,
      label: procedure.label,
      patient_label: procedure.label,
      badge_label: 'CPT ' + procedure.cpt,
      description: procedure.description,
      duration: procedure.duration,
      prep: procedure.prep,
      useCase: procedure.useCase,
      category: categoryData.category,
      icon: categoryData.icon
    };
  }

  function findProcedureByContrast(procedures, contrast) {
    const contrastMap = {
      'without': 'Without Contrast',
      'with': 'With Contrast',
      'both': 'With & Without'
    };
    
    const contrastLabel = contrastMap[contrast.toLowerCase()] || contrast;
    
    return procedures.find(function(p) {
      return p.label.indexOf(contrastLabel) !== -1 || 
             p.shortLabel.indexOf(contrastLabel) !== -1;
    });
  }

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================

  window.ProcedureLibrary = {
     MRI: MRI_PROCEDURES,
     CT: CT_PROCEDURES,
     'X-Ray': XRAY_PROCEDURES,
     Ultrasound: ULTRASOUND_PROCEDURES,
     MRI_CATEGORY_CONFIG: window.MRI_CATEGORY_CONFIG  // Reference the global
   };

  window.ProcedureHelpers = {
    resolveProcedure: resolveProcedure,
    normalizeRegionKey: normalizeRegionKey,
    isAmbiguousBodyPart: isAmbiguousBodyPart,
    getCategoriesForBodyPart: getCategoriesForBodyPart,
    filterByContrast: filterByContrast,
    
    /**
     * Get view options for X-Ray procedures
     * Returns sorted array with most common views first
     * @param {string} modality - The modality (should be 'X-Ray')
     * @param {string} regionKey - The region key (e.g., 'chest', 'knee')
     * @returns {Array} Array of view options, or empty array if not found
     */
    getViewOptions: function(modality, regionKey) {
      if (!modality || !regionKey) return [];
      
      // Only works for X-Ray modality
      if (modality !== 'X-Ray') return [];
      
      const library = window.ProcedureLibrary['X-Ray'];
      if (!library) return [];
      
      // Try direct lookup first with original key (handles camelCase properly)
      let region = library[regionKey];
      
      // If not found, try lowercase normalization
      if (!region) {
        const normalizedKey = regionKey.toLowerCase().replace(/\s+/g, '');
        region = library[normalizedKey];
      }
      
      // If still not found, try common variations
      if (!region) {
        const normalizedKey = regionKey.toLowerCase().replace(/\s+/g, '');
        const regionMap = {
          'lumbarspine': 'lumbarSpine',
          'cervicalspine': 'cervicalSpine',
          'thoracicspine': 'thoracicSpine',
          'cspine': 'cervicalSpine',
          'tspine': 'thoracicSpine',
          'lspine': 'lumbarSpine',
          'kub': 'abdomen'
        };
        const mappedKey = regionMap[normalizedKey];
        if (mappedKey) {
          region = library[mappedKey];
        }
      }
      
      if (!region || !region.viewOptions) return [];
      
      // Sort to put common views first
      const sorted = region.viewOptions.slice().sort(function(a, b) {
        if (a.isCommon && !b.isCommon) return -1;
        if (!a.isCommon && b.isCommon) return 1;
        return 0;
      });
      
      return sorted;
    }
  };

  console.log('✓ Procedure Library loaded successfully!');
console.log('✓ Available:', Object.keys(window.ProcedureLibrary).join(', '));

})();