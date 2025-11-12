/**
 * ⚠️  CRITICAL: DUAL-FILE SYSTEM - READ BEFORE EDITING ⚠️
 * =========================================================
 * 
 * THIS FILE EXISTS IN TWO LOCATIONS:
 * 
 * 1. src/lib/procedures/data/procedure-data.js  ← YOU ARE HERE (SOURCE OF TRUTH)
 * 2. public/js/procedure-data.js                 ← MUST BE KEPT IN SYNC
 * 
 * WHY TWO COPIES?
 * ---------------
 * • This file (src/lib/) = Used by TypeScript at BUILD TIME
 *   - Imported by universal-search-index.ts for search algorithm
 *   - Enables ES6 imports and type checking
 *   - Cannot be accessed by browser directly
 * 
 * • Public copy (public/js/) = Used by browser at RUNTIME
 *   - Loaded by HeroSection.astro for window.ProcedureLibrary
 *   - Enables popular procedures dropdown
 *   - Required for backward compatibility
 * 
 * ⚠️  WHEN YOU EDIT THIS FILE, YOU MUST:
 * -------------------------------------
 * 1. Make your changes here (src/lib/procedures/data/procedure-data.js)
 * 2. Copy to public folder:
 *    
 *    cp src/lib/procedures/data/procedure-data.js public/js/procedure-data.js
 * 
 * 3. Test locally:
 *    npm run dev
 *    - Open browser console
 *    - Check for "✓ Procedure Library loaded successfully"
 *    - Test search functionality
 * 
 * 4. Commit BOTH files:
 *    git add src/lib/procedures/data/procedure-data.js public/js/procedure-data.js
 *    git commit -m "feat: Update procedure data - [describe changes]"
 * 
 * ⚠️  FAILURE TO UPDATE BOTH FILES WILL CAUSE:
 * ------------------------------------------
 * • TypeScript errors (if only public/ updated)
 * • Search not finding new procedures (if only src/ updated)
 * • Popular procedures not showing (if only src/ updated)
 * • Build failures in production
 * • Inconsistent behavior between search and display
 * 
 * 📚 FOR MORE INFO:
 * ----------------
 * See: USRad_Procedure_Library_System_Architecture_COMPLETE.md
 * Section: "The Dual-Import System Explained"
 * 
 * COMPREHENSIVE IMAGING PROCEDURE LIBRARY
 * =======================================
 * Complete CPT reference with ES6 module exports
 * 
 * Last Updated: November 12, 2025
 * Data Source: Medicare CPT codes + Clinical references
 * Architecture: Modern ES6 module with backward compatibility
 */


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

    knee: {
    category: "Knee",
    icon: "knee",
    matchKeywords: [
      "knee",
      "knee pain",
      "meniscus",
      "ligament",
      "acl",
      "mcl",
      "patella",
      "cartilage",
      "joint",
      "mri knee"
    ],
    procedures: [
      {
        cpt: "73721",
        label: "MRI Knee - Without Contrast",
        shortLabel: "Knee - Without",
        description: "Meniscus tear, ligament injury, cartilage damage",
        duration: "30-45 min",
        prep: "Remove metal objects, wear loose clothing",
        useCase: "Meniscal tear, ligament injury, arthritis, cartilage damage"
      },
      {
        cpt: "73722",
        label: "MRI Knee - With Contrast",
        shortLabel: "Knee - With",
        description: "Post-surgical or tumor evaluation",
        duration: "45-60 min",
        prep: "IV contrast required",
        useCase: "Post-surgical evaluation, mass characterization, infection"
      },
      {
        cpt: "73723",
        label: "MRI Knee - With & Without Contrast",
        shortLabel: "Knee - Both",
        description: "Comprehensive knee evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal objects",
        useCase: "Comprehensive ligament, tendon, and cartilage evaluation"
      }
    ]
  },

shoulder: {
    category: "Shoulder",
    icon: "shoulder",
    matchKeywords: [
      "shoulder",
      "rotator cuff",
      "labrum",
      "bursitis",
      "impingement",
      "shoulder pain",
      "mri shoulder"
    ],
    procedures: [
      {
        cpt: "73221",
        label: "MRI Shoulder - Without Contrast",
        shortLabel: "Shoulder - Without",
        description: "Rotator cuff tear, bursitis, impingement",
        duration: "30â€“45 min",
        prep: "Remove metal objects, wear loose clothing",
        useCase: "Rotator cuff tear, bursitis, labral injury"
      },
      {
        cpt: "73222",
        label: "MRI Shoulder - With Contrast",
        shortLabel: "Shoulder - With",
        description: "Arthrogram or post-surgical evaluation",
        duration: "45â€“60 min",
        prep: "IV contrast or joint injection if ordered",
        useCase: "Labral tears, post-surgical changes, tumor or infection"
      },
      {
        cpt: "73223",
        label: "MRI Shoulder - With & Without Contrast",
        shortLabel: "Shoulder - Both",
        description: "Complete shoulder joint evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal objects",
        useCase: "Comprehensive soft tissue and joint assessment"
      }
    ]
  },

  elbow: {
    category: "Elbow",
    icon: "elbow",
    matchKeywords: [
      "elbow",
      "tennis elbow",
      "golfer's elbow",
      "ligament",
      "tendon",
      "elbow pain",
      "mri elbow"
    ],
    procedures: [
      {
        cpt: "73218",
        label: "MRI Elbow - Without Contrast",
        shortLabel: "Elbow - Without",
        description: "Tendon or ligament injury, bursitis, arthritis",
        duration: "30â€“45 min",
        prep: "Remove metal objects",
        useCase: "Tendon tear, ligament sprain, joint effusion"
      },
      {
        cpt: "73219",
        label: "MRI Elbow - With Contrast",
        shortLabel: "Elbow - With",
        description: "Post-surgical or mass evaluation",
        duration: "45â€“60 min",
        prep: "IV contrast required",
        useCase: "Mass, infection, post-surgical changes"
      },
      {
        cpt: "73220",
        label: "MRI Elbow - With & Without Contrast",
        shortLabel: "Elbow - Both",
        description: "Full joint and soft tissue evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal",
        useCase: "Comprehensive tendon and joint evaluation"
      }
    ]
  },

  wrist: {
    category: "Wrist",
    icon: "wrist",
    matchKeywords: [
      "wrist",
      "carpal tunnel",
      "tfcc",
      "ligament",
      "tendon",
      "mri wrist"
    ],
    procedures: [
      {
        cpt: "73221",
        label: "MRI Wrist - Without Contrast",
        shortLabel: "Wrist - Without",
        description: "Ligament, tendon, or cartilage injury",
        duration: "30â€“45 min",
        prep: "Remove jewelry or watches",
        useCase: "TFCC tear, ligament injury, carpal tunnel evaluation"
      },
      {
        cpt: "73222",
        label: "MRI Wrist - With Contrast",
        shortLabel: "Wrist - With",
        description: "Arthrogram or post-surgical evaluation",
        duration: "45â€“60 min",
        prep: "IV contrast required",
        useCase: "Post-surgical changes, tumor, or infection"
      },
      {
        cpt: "73223",
        label: "MRI Wrist - With & Without Contrast",
        shortLabel: "Wrist - Both",
        description: "Comprehensive wrist evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal",
        useCase: "Complete evaluation of wrist tendons and ligaments"
      }
    ]
  },

  hip: {
    category: "Hip",
    icon: "hip",
    matchKeywords: [
      "hip",
      "labral tear",
      "hip pain",
      "bursitis",
      "arthritis",
      "groin pain",
      "mri hip"
    ],
    procedures: [
      {
        cpt: "73721",
        label: "MRI Hip - Without Contrast",
        shortLabel: "Hip - Without",
        description: "Labral tear, arthritis, bursitis",
        duration: "30â€“45 min",
        prep: "Remove metal objects, wear loose clothing",
        useCase: "Labral tear, avascular necrosis, bursitis, arthritis"
      },
      {
        cpt: "73722",
        label: "MRI Hip - With Contrast",
        shortLabel: "Hip - With",
        description: "Arthrogram or post-surgical evaluation",
        duration: "45â€“60 min",
        prep: "IV contrast or joint injection",
        useCase: "Labral tear, infection, tumor, post-surgical changes"
      },
      {
        cpt: "73723",
        label: "MRI Hip - With & Without Contrast",
        shortLabel: "Hip - Both",
        description: "Comprehensive hip joint evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal",
        useCase: "Comprehensive labral and cartilage evaluation"
      }
    ]
  },

  ankle: {
    category: "Ankle",
    icon: "ankle",
    matchKeywords: [
      "ankle",
      "sprain",
      "ligament",
      "tendon",
      "achilles",
      "ankle pain",
      "mri ankle"
    ],
    procedures: [
      {
        cpt: "73718",
        label: "MRI Ankle - Without Contrast",
        shortLabel: "Ankle - Without",
        description: "Ligament or tendon injury, sprain, arthritis",
        duration: "30â€“45 min",
        prep: "Remove metal objects, wear loose clothing",
        useCase: "Sprain, ligament tear, tendonitis, arthritis"
      },
      {
        cpt: "73719",
        label: "MRI Ankle - With Contrast",
        shortLabel: "Ankle - With",
        description: "Post-surgical or infection evaluation",
        duration: "45â€“60 min",
        prep: "IV contrast required",
        useCase: "Post-surgical assessment, infection, tumor"
      },
      {
        cpt: "73720",
        label: "MRI Ankle - With & Without Contrast",
        shortLabel: "Ankle - Both",
        description: "Comprehensive ankle evaluation",
        duration: "60 min",
        prep: "IV contrast, remove metal",
        useCase: "Comprehensive ligament, tendon, and joint evaluation"
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

prostate: {
    category: "Prostate (Pelvis)",
    icon: "prostate",
    categoryGroup: "standard",
    displayIn: ["pelvis"],
    matchKeywords: [
      "prostate",
      "prostate gland",
      "prostate cancer",
      "multiparametric",
      "mpmri",
      "pelvic prostate",
      "prostate screening",
      "prostate staging",
      "mri prostate"
    ],
    procedures: [
      {
        cpt: "72197",
        label: "MRI Prostate - With & Without Contrast",
        shortLabel: "Prostate - W/ & W/O",
        description: "Comprehensive multiparametric MRI (mpMRI) for prostate evaluation, combining T2, diffusion, and dynamic contrast sequences.",
        duration: "45â€“60 min",
        prep: "Full bladder preferred; light meal only 4 hours before exam.",
        useCase: "Prostate cancer detection, staging, and active surveillance.",
        clinicalIndication: "Evaluation of prostate cancer, elevated PSA, or abnormal digital rectal exam findings."
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ©¸ MRV",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ§  MRA",
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
  badge: "ðŸ’‰ Arthrogram",
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
  badge: "ðŸ’‰ Arthrogram",
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
  badge: "ðŸŽ—ï¸ Breast MRI",
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
  badge: "ðŸ§ª MRS",
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
  badge: "ðŸ§ª MRE",
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
}  // âœ… closes elastography entry
}; // âœ… closes MRI_PROCEDURES object


  // ============================================
// ENHANCED CT PROCEDURES - COMPLETE DATASET
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
      "brain","head","stroke","bleeding","trauma","headache","concussion","seizure",
      "brain injury","head ct","ct brain"
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

  // Sinuses
  sinuses: {
    category: "Sinuses",
    icon: "sinuses",
    categoryGroup: "standard",
    displayIn: ["head", "face"],
    matchKeywords: [
      "sinus","sinuses","sinusitis","sinus infection","nasal polyps","sinus pressure",
      "facial pain","sinus ct","ct sinus","ct sinuses"
    ],
    procedures: [
      {
        cpt: "70486",
        label: "CT Sinuses - Without Contrast",
        shortLabel: "Sinuses - Without",
        description: "Sinusitis, infection, congestion",
        duration: "5-10 min",
        prep: "None required",
        useCase: "Chronic sinusitis, polyps, pre-surgical planning",
        clinicalIndication: "Evaluation of chronic sinus infections, polyps, and pre-surgical anatomy"
      },
      {
        cpt: "70487",
        label: "CT Sinuses - With Contrast",
        shortLabel: "Sinuses - With",
        description: "Evaluation of infection or tumor",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Infection, tumor, sinus obstruction",
        clinicalIndication: "Enhanced imaging for infection, tumor, or obstruction"
      },
      {
        cpt: "70488",
        label: "CT Sinuses - With & Without Contrast",
        shortLabel: "Sinuses - Both",
        description: "Comprehensive sinus evaluation",
        duration: "20-25 min",
        prep: "IV contrast, remove metal objects",
        useCase: "Full sinus workup for chronic or recurrent sinusitis",
        clinicalIndication: "Comprehensive evaluation for chronic/recurrent sinus disease"
      }
    ]
  },

  // Face / Orbits / Temporal Bone
  orbitsFace: {
    category: "Orbits / Face / Temporal Bone",
    icon: "face",
    categoryGroup: "standard",
    displayIn: ["head", "face"],
    matchKeywords: [
      "orbit","orbits","eye socket","temporal bone","facial bones","maxillofacial",
      "ct orbit","ct face","ct temporal bone","zygoma","blowout fracture"
    ],
    procedures: [
      {
        cpt: "70480",
        label: "CT Orbits / Temporal Bone - Without Contrast",
        shortLabel: "Orbits/Temporal - Without",
        description: "Facial fractures, sinus disease, or trauma assessment",
        duration: "10â€“15 min",
        prep: "Remove metal near head or face",
        useCase: "Fracture, infection, sinusitis, orbital trauma, temporal bone pathology",
        clinicalIndication: "Evaluation of facial/orbital fractures and temporal bone pathology"
      },
      {
        cpt: "70481",
        label: "CT Orbits / Temporal Bone - With Contrast",
        shortLabel: "Orbits/Temporal - With",
        description: "Evaluation of infection, tumors, or inflammatory disease",
        duration: "15â€“20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Infection, tumor, inflammatory disease of orbit or temporal bone",
        clinicalIndication: "Enhanced imaging for infection, tumor, or inflammation"
      },
      {
        cpt: "70482",
        label: "CT Orbits / Temporal Bone - With & Without Contrast",
        shortLabel: "Orbits/Temporal - Both",
        description: "Comprehensive orbital and temporal bone evaluation",
        duration: "20â€“25 min",
        prep: "IV contrast required, remove metal objects",
        useCase: "Comprehensive assessment of orbital and facial structures",
        clinicalIndication: "Full evaluation of orbital/facial structures with and without contrast"
      }
    ]
  },

  neckSoftTissue: {
    category: "Neck (Soft Tissue)",
    icon: "neck",
    categoryGroup: "standard",
    displayIn: ["head"],
    matchKeywords: [
      "neck","throat","lymph node","neck mass","thyroid","airway",
      "neck ct","soft tissue neck","ct neck"
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
      "chest","lungs","pneumonia","covid","pulmonary embolism","lung cancer",
      "mediastinum","chest pain","shortness of breath","ct chest","lung ct"
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
      "abdomen","stomach","abdominal pain","appendicitis","kidney stones","liver",
      "pancreas","gallbladder","appendix","diverticulitis","ct abdomen"
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
      "pelvis","hip","bladder","ovaries","uterus","prostate","pelvic pain",
      "stones","pelvic fracture","ct pelvis"
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
      "abdomen","pelvis","kidney stones","appendicitis","bowel obstruction",
      "abdominal pain","diverticulitis","ct abdomen pelvis","a/p ct"
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

  // ============================================
  // STANDARD CT - SPINE
  // ============================================
  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "spine",
    categoryGroup: "standard",
    displayIn: ["spine"],
    matchKeywords: [
      "neck","cervical spine","whiplash","fracture","neck trauma","c spine","spine ct"
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
      "thoracic spine","mid back","upper back","compression fracture","t spine",
      "spine fracture","back ct"
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
      "lumbar spine","low back","lower back","back pain","sciatica","l spine",
      "spinal stenosis","disc fracture","spine ct"
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
  // CT EXTREMITIES â€” DETAILED BODY PARTS
  // ============================================

  ctShoulder: {
    category: "Shoulder",
    icon: "shoulder",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "shoulder", "rotator cuff", "labrum", "bursitis", "fracture", "ct shoulder"
    ],
    procedures: [
      {
        cpt: "73200",
        label: "CT Shoulder - Without Contrast",
        shortLabel: "Shoulder - Without",
        description: "Evaluates bone injury, fracture, or arthritis in shoulder joint.",
        duration: "10â€“15 min",
        prep: "Remove jewelry or metal near shoulder.",
        useCase: "Fractures, degenerative changes, joint evaluation.",
        clinicalIndication: "Evaluation of bone injury, fracture, or arthritis in shoulder joint"
      },
      {
        cpt: "73201",
        label: "CT Shoulder - With Contrast",
        shortLabel: "Shoulder - With",
        description: "Evaluates tumor, infection, or soft tissue abnormalities.",
        duration: "15â€“20 min",
        prep: "IV contrast required; kidney function check recommended.",
        useCase: "Tumors, infections, post-surgical complications.",
        clinicalIndication: "Enhanced evaluation of tumor, infection, or soft tissue abnormalities"
      },
      {
        cpt: "73202",
        label: "CT Shoulder - With & Without Contrast",
        shortLabel: "Shoulder - Both",
        description: "Comprehensive evaluation of shoulder joint.",
        duration: "20â€“25 min",
        prep: "IV contrast, remove metal near shoulder.",
        useCase: "Comprehensive joint or mass evaluation.",
        clinicalIndication: "Comprehensive evaluation of shoulder joint"
      }
    ]
  },

  ctElbow: {
    category: "Elbow",
    icon: "elbow",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "elbow", "fracture", "olecranon", "radius", "ulna", "joint", "pain", "ct elbow"
    ],
    procedures: [
      {
        cpt: "73206",
        label: "CT Elbow - Without Contrast",
        shortLabel: "Elbow - Without",
        description: "Evaluates fractures, arthritis, or bone deformities in the elbow.",
        duration: "10â€“15 min",
        prep: "Remove jewelry or watches.",
        useCase: "Trauma, arthritis, bone lesion evaluation.",
        clinicalIndication: "Evaluation of fractures, arthritis, or bone deformities"
      },
      {
        cpt: "73207",
        label: "CT Elbow - With Contrast",
        shortLabel: "Elbow - With",
        description: "Evaluates infection, mass, or post-surgical complications.",
        duration: "15â€“20 min",
        prep: "IV contrast required.",
        useCase: "Mass, infection, tumor, or post-surgical follow-up.",
        clinicalIndication: "Enhanced evaluation for infection, mass, or post-surgical complications"
      },
      {
        cpt: "73208",
        label: "CT Elbow - With & Without Contrast",
        shortLabel: "Elbow - Both",
        description: "Comprehensive elbow joint evaluation.",
        duration: "20â€“25 min",
        prep: "IV contrast, kidney function check.",
        useCase: "Comprehensive bone and joint analysis.",
        clinicalIndication: "Comprehensive evaluation of elbow joint"
      }
    ]
  },

  ctWrist: {
    category: "Wrist / Hand",
    icon: "wrist",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "wrist", "hand", "fracture", "carpal", "scaphoid", "ct wrist", "ct hand"
    ],
    procedures: [
      {
        cpt: "73200",
        label: "CT Wrist / Hand - Without Contrast",
        shortLabel: "Wrist - Without",
        description: "Evaluates fractures, arthritis, or bone deformities.",
        duration: "10â€“15 min",
        prep: "Remove jewelry or watches.",
        useCase: "Trauma, arthritis, bone lesion evaluation.",
        clinicalIndication: "Evaluation of fractures, arthritis, or bone deformities"
      },
      {
        cpt: "73201",
        label: "CT Wrist / Hand - With Contrast",
        shortLabel: "Wrist - With",
        description: "Evaluates infection, mass, or post-surgical complications.",
        duration: "15â€“20 min",
        prep: "IV contrast required.",
        useCase: "Mass, infection, tumor, or post-surgical follow-up.",
        clinicalIndication: "Enhanced evaluation for infection, mass, or post-surgical complications"
      }
    ]
  },

  ctHip: {
    category: "Hip",
    icon: "hip",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "hip", "acetabulum", "fracture", "arthroplasty", "arthritis", "ct hip"
    ],
    procedures: [
      {
        cpt: "73700",
        label: "CT Hip - Without Contrast",
        shortLabel: "Hip - Without",
        description: "Evaluates fracture, arthritis, or prosthesis alignment.",
        duration: "10â€“15 min",
        prep: "Remove metal near hip area.",
        useCase: "Fractures, arthritis, prosthesis evaluation.",
        clinicalIndication: "Evaluation of fracture, arthritis, or prosthesis alignment"
      },
      {
        cpt: "73701",
        label: "CT Hip - With Contrast",
        shortLabel: "Hip - With",
        description: "Evaluates infection, tumor, or vascular involvement.",
        duration: "15â€“20 min",
        prep: "IV contrast required.",
        useCase: "Infection, mass, or tumor evaluation.",
        clinicalIndication: "Enhanced evaluation for infection, tumor, or vascular involvement"
      },
      {
        cpt: "73702",
        label: "CT Hip - With & Without Contrast",
        shortLabel: "Hip - Both",
        description: "Comprehensive hip evaluation.",
        duration: "20â€“25 min",
        prep: "IV contrast; kidney function check recommended.",
        useCase: "Comprehensive evaluation for complex hip conditions.",
        clinicalIndication: "Comprehensive hip evaluation"
      }
    ]
  },

  ctKnee: {
    category: "Knee",
    icon: "knee",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "knee", "leg", "patella", "acl", "pcl", "arthritis", "fracture", "ct knee"
    ],
    procedures: [
      {
        cpt: "73700",
        label: "CT Knee - Without Contrast",
        shortLabel: "Knee - Without",
        description: "Evaluates fractures, bone lesions, or arthritis in the knee joint.",
        duration: "10â€“15 min",
        prep: "Remove metal clothing or jewelry.",
        useCase: "Trauma, arthritis, bone lesion evaluation.",
        clinicalIndication: "Evaluation of fractures, bone lesions, or arthritis"
      },
      {
        cpt: "73701",
        label: "CT Knee - With Contrast",
        shortLabel: "Knee - With",
        description: "Evaluates infection, tumor, or post-surgical changes.",
        duration: "15â€“20 min",
        prep: "IV contrast required.",
        useCase: "Infection, tumor, post-operative evaluation.",
        clinicalIndication: "Enhanced evaluation for infection, tumor, or post-surgical changes"
      },
      {
        cpt: "73702",
        label: "CT Knee - With & Without Contrast",
        shortLabel: "Knee - Both",
        description: "Comprehensive knee evaluation.",
        duration: "20â€“25 min",
        prep: "IV contrast required; kidney function check.",
        useCase: "Complex cases needing soft-tissue and bone detail.",
        clinicalIndication: "Comprehensive knee evaluation"
      }
    ]
  },

  ctAnkle: {
    category: "Ankle / Foot",
    icon: "ankle",
    categoryGroup: "detailed",
    displayIn: ["extremities"],
    matchKeywords: [
      "ankle", "foot", "calcaneus", "tibia", "fibula", "heel", "ct ankle", "ct foot"
    ],
    procedures: [
      {
        cpt: "73700",
        label: "CT Ankle / Foot - Without Contrast",
        shortLabel: "Ankle - Without",
        description: "Evaluates fractures, arthritis, or bone abnormalities.",
        duration: "10â€“15 min",
        prep: "Remove metal or shoes.",
        useCase: "Fractures, arthritis, bone lesions, deformities.",
        clinicalIndication: "Evaluation of fractures, arthritis, or bone abnormalities"
      },
      {
        cpt: "73701",
        label: "CT Ankle / Foot - With Contrast",
        shortLabel: "Ankle - With",
        description: "Evaluates infection, tumor, or vascular involvement.",
        duration: "15â€“20 min",
        prep: "IV contrast required.",
        useCase: "Infection, tumor, or complex trauma.",
        clinicalIndication: "Enhanced evaluation for infection, tumor, or vascular involvement"
      },
      {
        cpt: "73702",
        label: "CT Ankle / Foot - With & Without Contrast",
        shortLabel: "Ankle - Both",
        description: "Comprehensive ankle/foot evaluation.",
        duration: "20â€“25 min",
        prep: "IV contrast; kidney function check recommended.",
        useCase: "Detailed bone and soft-tissue evaluation.",
        clinicalIndication: "Comprehensive ankle/foot evaluation"
      }
    ]
  },


  // ============================================
  // CTA - VASCULAR IMAGING
  // ============================================
  ctaHeadNeck: {
    category: "CTA Head & Neck",
    icon: "brain",
    categoryGroup: "vascular",
    displayIn: ["head", "vascular"],
    matchKeywords: [
      "cta","angiography","head vessels","neck vessels","carotid","aneurysm",
      "dissection","stroke","ct angiography head","ct angiography neck"
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
        clinicalIndication: "Angiography of brain blood vessels for aneurysm, stroke, and vascular malformations"
      },
      {
        cpt: "70498",
        label: "CTA Neck - With Contrast",
        shortLabel: "CTA Neck",
        description: "Carotid artery stenosis, dissection",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Carotid stenosis, dissection, pre-stroke workup",
        clinicalIndication: "Angiography of neck blood vessels for carotid stenosis and dissection"
      }
    ]
  },

  ctaChest: {
    category: "CTA Chest",
    icon: "heart",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    matchKeywords: [
      "cta chest","pulmonary embolism","pe","aortic dissection","aneurysm",
      "ct angiography chest","pulmonary arteries"
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
        clinicalIndication: "Angiography for pulmonary embolism detection and aortic evaluation"
      }
    ]
  },

  ctaCoronary: {
    category: "CTA Coronary (Heart)",
    icon: "heart",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    matchKeywords: [
      "cta coronary","coronary ct angiography","ccta","heart arteries","cad","chest pain"
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
        clinicalIndication: "Non-invasive angiography of coronary arteries for blockage detection"
      }
    ]
  },

  ctaAbdomen: {
    category: "CTA Abdomen",
    icon: "abdomen",
    categoryGroup: "vascular",
    displayIn: ["torso", "vascular"],
    matchKeywords: [
      "cta abdomen","abdominal aortic aneurysm","aaa","mesenteric ischemia",
      "renal artery stenosis","ct angiography abdomen"
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
        clinicalIndication: "Angiography of abdominal vessels for aneurysm and vascular disease"
      }
    ]
  },

  ctaExtremities: {
    category: "CTA Extremities",
    icon: "leg",
    categoryGroup: "vascular",
    displayIn: ["extremities", "vascular"],
    matchKeywords: [
      "cta leg","runoff","pad","peripheral artery disease","cta arm","cta extremity",
      "ct angiography legs","claudication"
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
        clinicalIndication: "Angiography of leg arteries for peripheral artery disease evaluation"
      },
      {
        cpt: "73206",
        label: "CTA Upper Extremity - With Contrast",
        shortLabel: "CTA Arm",
        description: "Upper extremity vascular evaluation",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Arm arterial disease, thoracic outlet syndrome, vascular malformations",
        clinicalIndication: "Angiography of arm arteries for vascular abnormalities"
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
    matchKeywords: [
      "lung screening","ldct","low dose","smoker","screening lung","lung cancer screen"
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
        clinicalIndication: "Low-dose CT for early lung cancer detection in high-risk patients"
      }
    ]
  },

  screeningCardiac: {
    category: "Cardiac Calcium Scoring",
    icon: "heart",
    categoryGroup: "screening",
    displayIn: ["screening", "torso"],
    matchKeywords: [
      "calcium score","cardiac screening","heart scan","cac","preventive cardiology"
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
        clinicalIndication: "Quantifies coronary calcium to assess cardiovascular disease risk"
      }
    ]
  },

  screeningColon: {
    category: "Virtual Colonoscopy",
    icon: "intestine",
    categoryGroup: "screening",
    displayIn: ["screening", "torso"],
    matchKeywords: [
      "virtual colonoscopy","colonography","colon cancer screening","ctc","polyps"
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
        clinicalIndication: "Non-invasive colon imaging for polyp and cancer detection"
      }
    ]
  },

  screeningCoronary: {
    category: "Coronary CTA Screening",
    icon: "heart",
    categoryGroup: "screening",
    displayIn: ["screening", "vascular"],
    matchKeywords: [
      "cta coronary screening","heart cta screening","noninvasive heart evaluation"
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
        clinicalIndication: "Coronary CTA for non-invasive cardiac assessment"
      }
    ]
  }
};
    // âœ… closes CT_PROCEDURES object

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
    categoryGroup: "standard",
    displayIn: ["chest", "torso"],
    matchKeywords: [
      "chest","lungs","pneumonia","heart","rib","respiratory","cough",
      "shortness of breath","covid","chest pain","lung xray","chest xray"
    ],
    procedures: [
      { cpt: "71045", label: "X-Ray Chest â€“ 1 View", shortLabel: "Chest â€“ 1 View",
        description: "Single frontal chest X-ray.", duration: "5 min",
        prep: "Remove jewelry or metal objects from chest area.",
        useCase: "Basic chest screening, follow-up." },
      { cpt: "71046", label: "X-Ray Chest â€“ 2 Views (PA & Lateral)", shortLabel: "Chest â€“ 2 Views",
        description: "Standard two-view chest X-ray.", duration: "5â€“10 min",
        prep: "Remove jewelry or metal objects from chest area.",
        useCase: "Pneumonia, infection, or heart evaluation." },
      { cpt: "71042", label: "X-Ray Chest â€“ Apical Lordotic", shortLabel: "Chest â€“ Apical Lordotic",
        description: "Special angled view of the lung apex.", duration: "10 min",
        prep: "Remove jewelry, metal objects.",
        useCase: "Lung apex evaluation or apical mass." },
      { cpt: "71047-71048", label: "X-Ray Chest â€“ Oblique/Special Views", shortLabel: "Chest â€“ Special Views",
        description: "Multiple angled chest views.", duration: "10â€“15 min",
        prep: "Remove jewelry, metal objects.",
        useCase: "Rib fractures or comprehensive chest assessment." }
    ]
  },

  cervicalSpine: {
    category: "Cervical Spine (Neck)",
    icon: "spine",
    categoryGroup: "spine",
    displayIn: ["spine","neck"],
    matchKeywords: ["neck","whiplash","cervical spine","c spine","neck fracture","spine xray"],
    procedures: [
      { cpt: "72040", label: "X-Ray Cervical Spine â€“ <4 Views", shortLabel: "C-Spine â€“ <4 Views",
        description: "Limited cervical spine series.", duration: "10 min",
        prep: "Remove neck jewelry.", useCase: "Limited neck evaluation." },
      { cpt: "72050", label: "X-Ray Cervical Spine â€“ 4â€“5 Views", shortLabel: "C-Spine â€“ 4â€“5 Views",
        description: "Standard cervical spine series.", duration: "10â€“15 min",
        prep: "Remove neck jewelry.", useCase: "Neck pain, injury, or whiplash." },
      { cpt: "72052", label: "X-Ray Cervical Spine â€“ 6+ Views (Flex/Ext)", shortLabel: "C-Spine â€“ 6+ Views",
        description: "Complete cervical series with flexion/extension.", duration: "15â€“20 min",
        prep: "Remove neck jewelry.", useCase: "Instability or post-injury motion study." }
    ]
  },

  thoracicSpine: {
    category: "Thoracic Spine (Mid Back)",
    icon: "spine",
    categoryGroup: "spine",
    displayIn: ["spine","back"],
    matchKeywords: ["mid back","thoracic spine","t spine","compression fracture","scoliosis","back pain"],
    procedures: [
      { cpt: "72070", label: "X-Ray Thoracic Spine â€“ 2 Views", shortLabel: "T-Spine â€“ 2 Views",
        description: "Two-view thoracic spine X-ray.", duration: "10 min",
        prep: "Remove clothing with metal fasteners.", useCase: "Mid-back pain or fracture assessment." },
      { cpt: "72074", label: "X-Ray Thoracic Spine â€“ 3+ Views", shortLabel: "T-Spine â€“ 3+ Views",
        description: "Complete thoracic spine series.", duration: "15 min",
        prep: "Remove clothing with metal fasteners.", useCase: "Scoliosis or detailed spine evaluation." }
    ]
  },

  lumbarSpine: {
    category: "Lumbar Spine (Low Back)",
    icon: "spine",
    categoryGroup: "spine",
    displayIn: ["spine","back"],
    matchKeywords: ["low back","lumbar","sciatica","spinal","lumbar fracture","back pain"],
    procedures: [
      { cpt: "72100", label: "X-Ray Lumbar Spine â€“ <4 Views", shortLabel: "L-Spine â€“ <4 Views",
        description: "Limited lumbar spine series.", duration: "10 min",
        prep: "Remove belt or metal clothing.", useCase: "Limited low back evaluation." },
      { cpt: "72110", label: "X-Ray Lumbar Spine â€“ 4 Views", shortLabel: "L-Spine â€“ 4 Views",
        description: "Standard lumbar spine series.", duration: "10â€“15 min",
        prep: "Remove belt or metal pants.", useCase: "Low back pain, sciatica, or disc issues." },
      { cpt: "72114", label: "X-Ray Lumbar Spine â€“ 6 Views (Flex/Ext)", shortLabel: "L-Spine â€“ 6 Views",
        description: "Complete lumbar series with bending views.", duration: "15â€“20 min",
        prep: "Remove belt or metal pants.", useCase: "Instability or spondylolisthesis evaluation." }
    ]
  },

  knee: {
    category: "Knee",
    icon: "knee",
    categoryGroup: "extremities",
    displayIn: ["leg","extremities"],
    matchKeywords: ["knee","arthritis","knee injury","fracture","patella","kneecap","knee xray"],
    procedures: [
      { cpt: "73560", label: "X-Ray Knee â€“ 2 Views", shortLabel: "Knee â€“ 2 Views",
        description: "AP and lateral knee views.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Knee pain or injury evaluation." },
      { cpt: "73562", label: "X-Ray Knee â€“ 3 Views", shortLabel: "Knee â€“ 3 Views",
        description: "Comprehensive knee series.", duration: "10 min",
        prep: "None required.", useCase: "Arthritis or detailed knee assessment." },
      { cpt: "73564", label: "X-Ray Knee â€“ 4 Views (Axial/Oblique)", shortLabel: "Knee â€“ 4 Views",
        description: "Specialized knee series.", duration: "10â€“15 min",
        prep: "None required.", useCase: "Pre-surgical or complex knee evaluation." }
    ]
  },

  shoulder: {
    category: "Shoulder",
    icon: "shoulder",
    categoryGroup: "extremities",
    displayIn: ["upper","extremities"],
    matchKeywords: ["shoulder","rotator cuff","dislocation","fracture","ac joint","clavicle","shoulder xray"],
    procedures: [
      { cpt: "73020", label: "X-Ray Shoulder â€“ 2 Views", shortLabel: "Shoulder â€“ 2 Views",
        description: "AP and lateral shoulder views.", duration: "5â€“10 min",
        prep: "Remove clothing from shoulder area.", useCase: "Shoulder pain or trauma." },
      { cpt: "73030", label: "X-Ray Shoulder â€“ 3 Views (Complete)", shortLabel: "Shoulder â€“ 3 Views",
        description: "Complete shoulder series.", duration: "10â€“15 min",
        prep: "Remove clothing from shoulder area.", useCase: "Rotator cuff or dislocation evaluation." }
    ]
  },

  clavicle: {
    category: "Clavicle",
    icon: "clavicle",
    categoryGroup: "extremities",
    displayIn: ["upper","shoulder"],
    matchKeywords: ["collarbone","clavicle fracture","shoulder fracture","ac joint","broken collarbone"],
    procedures: [
      { cpt: "73000", label: "X-Ray Clavicle â€“ 2 Views (Complete)", shortLabel: "Clavicle â€“ Complete",
        description: "Complete clavicle X-ray.", duration: "5 min",
        prep: "Remove clothing from shoulder/chest area.",
        useCase: "Clavicle fracture or injury." }
    ]
  },

  abdomen: {
    category: "Abdomen (KUB)",
    icon: "abdomen",
    categoryGroup: "standard",
    displayIn: ["torso","abdomen"],
    matchKeywords: ["abdomen","kidney","stones","kub","bowel obstruction","stomach","abdomen xray"],
    procedures: [
      { cpt: "74018", label: "X-Ray Abdomen â€“ 1 View (KUB)", shortLabel: "KUB â€“ 1 View",
        description: "Single abdominal view (kidneys, ureters, bladder).", duration: "5 min",
        prep: "None required.", useCase: "Kidney stones, constipation, or abdominal pain." },
      { cpt: "74019", label: "X-Ray Abdomen â€“ 2 Views", shortLabel: "Abdomen â€“ 2 Views",
        description: "AP and additional abdominal view.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Bowel obstruction or abdominal pain." },
      { cpt: "74021", label: "X-Ray Abdomen â€“ 3+ Views (Acute Series)", shortLabel: "Abdomen â€“ Acute Series",
        description: "Complete abdominal series with obliques.", duration: "10â€“15 min",
        prep: "None required.", useCase: "Acute abdomen or bowel obstruction evaluation." }
    ]
  },

  pelvis: {
    category: "Pelvis",
    icon: "pelvis",
    categoryGroup: "standard",
    displayIn: ["pelvis","hip"],
    matchKeywords: ["pelvis","hip pain","pelvic fracture","si joint","pelvis xray"],
    procedures: [
      { cpt: "72170", label: "X-Ray Pelvis â€“ 1 or 2 Views", shortLabel: "Pelvis â€“ 1â€“2 Views",
        description: "Standard pelvis X-ray.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Hip pain or pelvic trauma." },
      { cpt: "72190", label: "X-Ray Pelvis â€“ 3+ Views (Complete)", shortLabel: "Pelvis â€“ Complete",
        description: "Complete pelvis series.", duration: "10â€“15 min",
        prep: "None required.", useCase: "Fracture or detailed pelvic evaluation." }
    ]
  },

  ribs: {
    category: "Ribs",
    icon: "ribs",
    categoryGroup: "standard",
    displayIn: ["chest"],
    matchKeywords: ["rib","rib fracture","rib pain","chest wall","broken rib","rib xray"],
    procedures: [
      { cpt: "71100", label: "X-Ray Ribs â€“ Unilateral 2 Views", shortLabel: "Ribs â€“ 2 Views (One Side)",
        description: "Two views of one side of ribs.", duration: "10 min",
        prep: "Remove clothing from chest area.", useCase: "Rib fracture or localized chest pain." },
      { cpt: "71101", label: "X-Ray Ribs â€“ Including Chest 3â€“4 Views", shortLabel: "Ribs â€“ 3â€“4 Views",
        description: "Ribs with chest views.", duration: "10â€“15 min",
        prep: "Remove clothing from chest area.", useCase: "Comprehensive rib and lung evaluation." },
      { cpt: "71110", label: "X-Ray Ribs â€“ Bilateral (Both Sides)", shortLabel: "Ribs â€“ Bilateral",
        description: "Both sides of ribs.", duration: "15 min",
        prep: "Remove clothing from chest area.", useCase: "Bilateral rib trauma." }
    ]
  },

  ankle: {
    category: "Ankle",
    icon: "ankle",
    categoryGroup: "extremities",
    displayIn: ["leg"],
    matchKeywords: ["ankle","sprain","fracture","twisted ankle","foot and ankle","ankle xray"],
    procedures: [
      { cpt: "73600", label: "X-Ray Ankle â€“ 2 Views", shortLabel: "Ankle â€“ 2 Views",
        description: "AP and lateral ankle views.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Ankle sprain or fracture evaluation." },
      { cpt: "73610", label: "X-Ray Ankle â€“ 3 Views (Complete)", shortLabel: "Ankle â€“ 3 Views",
        description: "Complete ankle series.", duration: "10 min",
        prep: "None required.", useCase: "Comprehensive ankle assessment." }
    ]
  },

  foot: {
    category: "Foot",
    icon: "foot",
    categoryGroup: "extremities",
    displayIn: ["leg","foot"],
    matchKeywords: ["foot","broken foot","metatarsal","heel","toe","foot xray"],
    procedures: [
      { cpt: "73620", label: "X-Ray Foot â€“ 2 Views", shortLabel: "Foot â€“ 2 Views",
        description: "AP and lateral foot.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Foot pain or fracture evaluation." },
      { cpt: "73630", label: "X-Ray Foot â€“ 3 Views (Complete)", shortLabel: "Foot â€“ 3 Views",
        description: "Complete foot series.", duration: "10 min",
        prep: "None required.", useCase: "Comprehensive foot injury or deformity assessment." }
    ]
  },

  hand: {
    category: "Hand",
    icon: "hand",
    categoryGroup: "extremities",
    displayIn: ["upper"],
    matchKeywords: ["hand","finger","metacarpal","hand pain","broken hand","hand xray"],
    procedures: [
      { cpt: "73120", label: "X-Ray Hand â€“ 2 Views", shortLabel: "Hand â€“ 2 Views",
        description: "AP and lateral hand.", duration: "5â€“10 min",
        prep: "Remove rings or jewelry.", useCase: "Hand injury or suspected fracture." },
      { cpt: "73130", label: "X-Ray Hand â€“ 3 Views (Complete)", shortLabel: "Hand â€“ 3 Views",
        description: "Complete hand series.", duration: "10 min",
        prep: "Remove rings or jewelry.", useCase: "Comprehensive hand evaluation." }
    ]
  },

  wrist: {
    category: "Wrist",
    icon: "wrist",
    categoryGroup: "extremities",
    displayIn: ["upper"],
    matchKeywords: ["wrist","carpal","scaphoid","broken wrist","wrist xray"],
    procedures: [
      { cpt: "73100", label: "X-Ray Wrist â€“ 2 Views", shortLabel: "Wrist â€“ 2 Views",
        description: "AP and lateral wrist.", duration: "5â€“10 min",
        prep: "Remove watches or bracelets.", useCase: "Wrist pain or injury evaluation." },
      { cpt: "73110", label: "X-Ray Wrist â€“ 3 Views (Complete)", shortLabel: "Wrist â€“ 3 Views",
        description: "Complete wrist series.", duration: "10 min",
        prep: "Remove watches or bracelets.", useCase: "Comprehensive wrist or scaphoid evaluation." }
    ]
  },

  hip: {
    category: "Hip",
    icon: "hip",
    categoryGroup: "extremities",
    displayIn: ["pelvis","hip"],
    matchKeywords: ["hip","hip fracture","hip pain","hip replacement","hip arthritis","hip xray"],
    procedures: [
      { cpt: "73521", label: "X-Ray Hip â€“ Unilateral 2â€“3 Views", shortLabel: "Hip â€“ 2â€“3 Views (One Side)",
        description: "One hip with multiple views.", duration: "10 min",
        prep: "None required.", useCase: "Hip pain or fracture assessment." },
      { cpt: "73522", label: "X-Ray Hip â€“ Bilateral 3â€“4 Views", shortLabel: "Hip â€“ Bilateral",
        description: "Both hips X-ray.", duration: "10â€“15 min",
        prep: "None required.", useCase: "Bilateral hip comparison or post-surgical follow-up." }
    ]
  },

  elbow: {
    category: "Elbow",
    icon: "elbow",
    categoryGroup: "extremities",
    displayIn: ["upper"],
    matchKeywords: ["elbow","tennis elbow","olecranon","elbow fracture","elbow xray"],
    procedures: [
      { cpt: "73070", label: "X-Ray Elbow â€“ 2 Views", shortLabel: "Elbow â€“ 2 Views",
        description: "AP and lateral elbow.", duration: "5â€“10 min",
        prep: "None required.", useCase: "Elbow pain or trauma." },
      { cpt: "73080", label: "X-Ray Elbow â€“ 3 Views (Complete)", shortLabel: "Elbow â€“ 3 Views",
        description: "Complete elbow series.", duration: "10 min",
        prep: "None required.", useCase: "Comprehensive elbow evaluation." }
    ]
  },

  femur: {
    category: "Femur (Thigh)",
    icon: "femur",
    categoryGroup: "extremities",
    displayIn: ["leg"],
    matchKeywords: ["thigh","femur","leg fracture","broken leg","femur xray"],
    procedures: [
      { cpt: "73552", label: "X-Ray Femur â€“ 2 Views", shortLabel: "Femur â€“ 2 Views",
        description: "AP and lateral femur.", duration: "10 min",
        prep: "None required.", useCase: "Thigh pain or femur fracture." }
    ]
  },

  tibia: {
    category: "Tibia/Fibula (Lower Leg)",
    icon: "tibia",
    categoryGroup: "extremities",
    displayIn: ["leg"],
    matchKeywords: ["shin","tibia","fibula","lower leg pain","leg fracture","tibia xray"],
    procedures: [
      { cpt: "73590", label: "X-Ray Tibia/Fibula â€“ 2 Views", shortLabel: "Lower Leg â€“ 2 Views",
        description: "AP and lateral lower leg.", duration: "10 min",
        prep: "None required.", useCase: "Lower leg pain or fracture evaluation." }
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

    // âœ… Enhanced search awareness
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
        label: "Ultrasound Abdomen â€“ Complete",
        shortLabel: "Abdomen â€“ Complete",
        description:
          "Evaluates liver, gallbladder, kidneys, pancreas, spleen, and abdominal aorta.",
        duration: "20â€“30 min",
        prep: "Fast for 6 hours before exam.",
        useCase:
          "Abdominal pain, gallstones, liver disease, or kidney stones."
      },
      {
        cpt: "76705",
        label: "Ultrasound Abdomen â€“ Limited",
        shortLabel: "Abdomen â€“ Limited",
        description:
          "Focused evaluation of a specific abdominal organ or region.",
        duration: "15â€“20 min",
        prep: "Fast for 6 hours before exam.",
        useCase:
          "Follow-up imaging or targeted evaluation of a known abnormality."
      },
      {
        cpt: "76706",
        label: "Ultrasound Aorta â€“ Abdominal",
        shortLabel: "Aorta â€“ Abdominal",
        description:
          "Evaluates the abdominal aorta for aneurysm or other vascular abnormalities.",
        duration: "15â€“20 min",
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
        label: "Ultrasound Pelvis â€“ Complete",
        shortLabel: "Pelvis â€“ Complete",
        description:
          "Evaluates uterus, ovaries, and surrounding pelvic structures.",
        duration: "20â€“30 min",
        prep: "Full bladder required â€” drink 32 oz of water 1 hour before exam.",
        useCase:
          "Pelvic pain, abnormal bleeding, ovarian cysts, or uterine fibroids."
      },
      {
        cpt: "76857",
        label: "Ultrasound Pelvis â€“ Limited",
        shortLabel: "Pelvis â€“ Limited",
        description:
          "Focused evaluation of a specific pelvic structure or region.",
        duration: "15â€“20 min",
        prep: "Full bladder required â€” drink 32 oz of water 1 hour before exam.",
        useCase:
          "Follow-up of known findings or targeted pelvic evaluation."
      },
      {
        cpt: "76830",
        label: "Ultrasound Transvaginal",
        shortLabel: "Transvaginal",
        description:
          "Detailed internal evaluation of uterus and ovaries using a vaginal probe.",
        duration: "20â€“30 min",
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
        label: "Ultrasound OB â€“ First Trimester",
        shortLabel: "OB â€“ First Trimester",
        description:
          "Evaluates early pregnancy, confirms viability, and estimates gestational age.",
        duration: "15â€“20 min",
        prep: "Full bladder may be helpful in early pregnancy.",
        useCase:
          "Confirm pregnancy, evaluate bleeding, or establish accurate dating."
      },
      {
        cpt: "76805",
        label: "Ultrasound OB â€“ Second/Third Trimester",
        shortLabel: "OB â€“ Complete",
        description:
          "Comprehensive evaluation of fetal anatomy, growth, and placental position.",
        duration: "30â€“45 min",
        prep: "No special preparation required.",
        useCase:
          "Routine prenatal care, anatomy survey at 18â€“20 weeks, or growth assessment."
      },
      {
        cpt: "76815",
        label: "Ultrasound OB â€“ Limited",
        shortLabel: "OB â€“ Limited",
        description:
          "Focused assessment of fetal position, heart rate, or amniotic fluid volume.",
        duration: "15â€“20 min",
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
        label: "Duplex Scan Carotid â€“ Bilateral",
        shortLabel: "Carotid Duplex",
        description:
          "Evaluates blood flow through carotid arteries in the neck to assess stroke risk.",
        duration: "30â€“45 min",
        prep: "No special preparation required.",
        useCase: "Stroke risk, carotid stenosis, or vascular disease screening."
      },
      {
        cpt: "93970",
        label: "Duplex Scan Lower Extremity â€“ Venous",
        shortLabel: "LE Venous Duplex",
        description:
          "Evaluates leg veins for blood clots or venous insufficiency.",
        duration: "30â€“45 min",
        prep: "No special preparation required.",
        useCase: "Leg swelling, suspected DVT, or varicose veins."
      },
      {
        cpt: "93925",
        label: "Duplex Scan Lower Extremity â€“ Arterial",
        shortLabel: "LE Arterial Duplex",
        description:
          "Evaluates arterial blood flow to the legs to detect blockages or narrowing.",
        duration: "30â€“45 min",
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
        label: "Ultrasound Soft Tissue â€“ Head and Neck",
        shortLabel: "Soft Tissue â€“ Head/Neck",
        description:
          "Evaluates superficial masses, lymph nodes, or soft tissue abnormalities in the head and neck.",
        duration: "15â€“20 min",
        prep: "No special preparation required.",
        useCase:
          "Neck lump, enlarged lymph nodes, or salivary gland evaluation."
      },
      {
        cpt: "76642",
        label: "Ultrasound Breast â€“ Unilateral",
        shortLabel: "Breast â€“ Unilateral",
        description:
          "Evaluates breast tissue for masses, cysts, or other abnormalities.",
        duration: "15â€“20 min",
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
        duration: "20â€“30 min",
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
        label: "Ultrasound Extremity â€“ Complete",
        shortLabel: "Extremity â€“ Complete",
        description:
          "Comprehensive evaluation of muscles, tendons, ligaments, and joints.",
        duration: "20â€“30 min",
        prep: "No special preparation required.",
        useCase:
          "Tendon tear, ligament injury, soft tissue mass, or joint effusion."
      },
      {
        cpt: "76882",
        label: "Ultrasound Extremity â€“ Limited",
        shortLabel: "Extremity â€“ Limited",
        description:
          "Focused evaluation of a specific tendon, muscle, or joint region.",
        duration: "15â€“20 min",
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
        duration: "10â€“20 min",
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
      'cervicalspine': 'cervicalSpine',     // Ã¢Å“â€¦ ADD: Support camelCase from UI
      'c-spine': 'cervicalSpine',
      'neck': 'cervicalSpine',

      'thoracic spine': 'thoracicSpine',
      'thoracic spine (mid back)': 'thoracicSpine',
      'thoracicspine': 'thoracicSpine',     // Ã¢Å“â€¦ ADD: Support camelCase from UI
      't-spine': 'thoracicSpine',
      'mid back': 'thoracicSpine',

      'lumbar spine': 'lumbarSpine',
      'lumbar spine (low back)': 'lumbarSpine',
      'lumbarspine': 'lumbarSpine',         // Ã¢Å“â€¦ ADD: Support camelCase from UI
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
    console.log('ðŸ” [Procedure Library] Resolving:', { modality, contrast, region });
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
      console.warn('âš ï¸ Unsupported modality:', modality);
      return null;
    }
    
    // Find region
    const regionKey = normalizeRegionKey(region, modality);
    if (!regionKey) {
      console.warn('âš ï¸ Region not found:', region);
      return null;
    }
    
    const categoryData = modalityData[regionKey];
    if (!categoryData) {
      console.warn('ÃƒÂ¢Ã‚ÂÃ…â€™ No data for region:', region);
      return null;
    }
    
    // Handle redirects
    if (categoryData.redirectTo) {
      console.log('ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ Following redirect:', categoryData.redirectTo);
      const targetData = modalityData[categoryData.redirectTo];
      if (!targetData || !targetData.procedures) {
        console.warn('ÃƒÂ¢Ã‚ÂÃ…â€™ Redirect target not found:', categoryData.redirectTo);
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
      console.warn('âš ï¸ No matching procedure:', { region: region, contrast: contrast });
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
      console.warn('âš ï¸ No procedures for region:', region);
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
      console.warn('âš ï¸ No matching procedure:', { region: region, contrast: contrast });
      return null;
    }
    
    console.log('âœ… [Procedure Library] Found:', procedure);
    
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
// MOST POPULAR PROCEDURES (HYBRID SEARCH PRELOAD)
// ============================================

// ============================================
// POPULAR PROCEDURES - CROSS-MODALITY TOP 22
// ============================================

const POPULAR_PROCEDURES = [
  // ===== MRI (8) =====
  { modality: "MRI", cpt: "70551", label: "MRI Brain - Without Contrast" },
  { modality: "MRI", cpt: "73721", label: "MRI Knee - Without Contrast" },
  { modality: "MRI", cpt: "72148", label: "MRI Lumbar Spine - Without Contrast" },
  { modality: "MRI", cpt: "72146", label: "MRI Cervical Spine - Without Contrast" },
  { modality: "MRI", cpt: "73221", label: "MRI Shoulder - Without Contrast" },
  { modality: "MRI", cpt: "72156", label: "MRI Thoracic Spine - Without Contrast" },
  { modality: "MRI", cpt: "70553", label: "MRI Brain - With & Without Contrast" },
  { modality: "MRI", cpt: "74181", label: "MRI Abdomen - Without Contrast" },

  // ===== CT (8) =====
  { modality: "CT", cpt: "70450", label: "CT Head/Brain - Without Contrast" },
  { modality: "CT", cpt: "74177", label: "CT Abdomen & Pelvis - With Contrast" },
  { modality: "CT", cpt: "74176", label: "CT Abdomen & Pelvis - Without Contrast" },
  { modality: "CT", cpt: "71250", label: "CT Chest - Without Contrast" },
  { modality: "CT", cpt: "72125", label: "CT Cervical Spine - Without Contrast" },
  { modality: "CT", cpt: "72132", label: "CT Lumbar Spine - With Contrast" },
  { modality: "CT", cpt: "71260", label: "CT Chest - With Contrast" },
  { modality: "CT", cpt: "70486", label: "CT Sinuses - Without Contrast" },

  // ===== X-Ray (3) =====
  { modality: "X-Ray", cpt: "71046", label: "X-Ray Chest - 2 Views (PA & Lateral)" },
  { modality: "X-Ray", cpt: "73560", label: "X-Ray Knee - 3 Views" },
  { modality: "X-Ray", cpt: "73030", label: "X-Ray Shoulder - 2 Views" },

  // ===== Ultrasound (3) =====
  { modality: "Ultrasound", cpt: "76805", label: "Ultrasound OB - Second/Third Trimester (Anatomy Scan)" },
  { modality: "Ultrasound", cpt: "76700", label: "Ultrasound Abdomen - Complete" },
  { modality: "Ultrasound", cpt: "76856", label: "Ultrasound Pelvis - Complete" }
];


// ============================================
// === PATCH: CT + MRI Extremity Alias Enhancements ===
// ============================================

// --- PATCH START ---

// CT Extremity Aliases
["ctShoulder", "ctElbow", "ctWrist", "ctHip", "ctKnee", "ctAnkle"].forEach(region => {
  const section = CT_PROCEDURES[region];
  if (section && section.procedures) {
    section.procedures.forEach(proc => {
      if (!proc.aliases) proc.aliases = [];
      const base = section.category.toLowerCase().replace(/\s*\/\s*/g, " "); // "Wrist / Hand" -> "wrist hand"
      const modality = "ct";
      const label = `${base} ${modality}`;
      const reverse = `${modality} ${base}`;
      proc.aliases.push(label, reverse, `${label} with contrast`, `${reverse} with contrast`);
    });
  }
});

// MRI Extremity Aliases
["knee", "shoulder", "elbow", "wrist", "hip", "ankle", "prostate"].forEach(region => {
  const section = MRI_PROCEDURES[region];
  if (section && section.procedures) {
    section.procedures.forEach(proc => {
      if (!proc.aliases) proc.aliases = [];
      const base = region.toLowerCase();
      const modality = "mri";
      const label = `${base} ${modality}`;
      const reverse = `${modality} ${base}`;
      proc.aliases.push(label, reverse, `${label} with contrast`, `${reverse} with contrast`);
    });
  }
});
// --- PATCH END ---


// ============================================
// EXPORTS - ES6 MODULE
// ============================================

// Main procedure library export
export const ProcedureLibrary = {
  MRI: MRI_PROCEDURES,
  CT: CT_PROCEDURES,
  'X-Ray': XRAY_PROCEDURES,
  Ultrasound: ULTRASOUND_PROCEDURES,
  Popular: POPULAR_PROCEDURES,
  MRI_CATEGORY_CONFIG: typeof window !== 'undefined' ? window.MRI_CATEGORY_CONFIG : undefined
};

// Helper functions export
export const ProcedureHelpers = {
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
      
      const library = ProcedureLibrary['X-Ray'];
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



// ============================================
// BACKWARD COMPATIBILITY
// ============================================
// Maintain window.ProcedureLibrary for backward compatibility
// This allows existing code that uses window.ProcedureLibrary to continue working
if (typeof window !== 'undefined') {
  window.ProcedureLibrary = ProcedureLibrary;
  window.ProcedureHelpers = ProcedureHelpers;
  console.log('✓ Procedure Library loaded successfully (ES6 module)!');
  console.log('✓ Available:', Object.keys(ProcedureLibrary).join(', '));
}

// ============================================
// DEFAULT EXPORT (optional convenience)
// ============================================
export default ProcedureLibrary;