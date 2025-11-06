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
  // MRI PROCEDURES - COMPLETE REFERENCE
  // ============================================

  const MRI_PROCEDURES = {
    
    brain: {
      category: "Brain",
      icon: "brain",
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

    // ============================================
    // UPPER EXTREMITY - MAIN ENTRIES
    // ============================================
    
    upperExtremityJoint: {
      category: "Upper Extremity - Any Joint",
      includes: "Shoulder, Elbow, or Wrist joint",
      clinicalUse: "Rotator cuff tears, labral tears, ligament injuries, joint effusions",
      icon: "shoulder",
      contrastAvailability: ["without", "with", "both"],
      matchKeywords: ["shoulder", "elbow", "wrist"],
      procedures: [
        {
          cpt: "73221",
          label: "MRI Upper Extremity (Joint) - Without Contrast",
          shortLabel: "Without Contrast",
          description: "Joint imaging without IV contrast injection",
          duration: "30-45 min",
          prep: "Remove metal objects, jewelry",
          useCase: "Rotator cuff tears, ligament injuries, meniscal tears"
        },
        {
          cpt: "73222",
          label: "MRI Upper Extremity (Joint) - With Contrast",
          shortLabel: "With Contrast",
          description: "Enhanced joint imaging with IV contrast",
          duration: "45-60 min",
          prep: "IV contrast, kidney function check",
          useCase: "Infection, tumor evaluation, synovitis"
        },
        {
          cpt: "73223",
          label: "MRI Upper Extremity (Joint) - With & Without Contrast",
          shortLabel: "With & Without Contrast",
          description: "Complete joint evaluation with comparison",
          duration: "60-75 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex joint pathology, tumor staging"
        }
      ]
    },

    upperExtremityNonJoint: {
      category: "Upper Extremity - Other Than Joint",
      includes: "Hand, Forearm, or Arm bones/soft tissue (radius, ulna, humerus)",
      clinicalUse: "Fractures, bone tumors, soft tissue masses, osteomyelitis",
      icon: "hand",
      contrastAvailability: ["without", "both"],
      matchKeywords: ["hand", "forearm", "arm", "radius", "ulna", "humerus", "finger"],
      procedures: [
        {
          cpt: "73218",
          label: "MRI Upper Extremity (Non-Joint) - Without Contrast",
          shortLabel: "Without Contrast",
          description: "Bone and soft tissue imaging",
          duration: "30-45 min",
          prep: "Remove metal objects, jewelry",
          useCase: "Hand fractures, soft tissue masses, bone infection"
        },
        {
          cpt: "73220",
          label: "MRI Upper Extremity (Non-Joint) - With & Without Contrast",
          shortLabel: "With & Without Contrast",
          description: "Complete bone and soft tissue evaluation",
          duration: "60-75 min",
          prep: "IV contrast, kidney function check",
          useCase: "Tumor characterization, complex infection"
        }
      ]
    },

    // ============================================
    // LOWER EXTREMITY - MAIN ENTRIES
    // ============================================
    
    lowerExtremityJoint: {
      category: "Lower Extremity - Any Joint",
      includes: "Hip, Knee, or Ankle joint",
      clinicalUse: "Meniscus tears, ACL/MCL injuries, labral tears, cartilage damage",
      icon: "knee",
      contrastAvailability: ["without", "with", "both"],
      matchKeywords: ["hip", "knee", "ankle"],
      procedures: [
        {
          cpt: "73721",
          label: "MRI Lower Extremity (Joint) - Without Contrast",
          shortLabel: "Without Contrast",
          description: "Joint imaging without IV contrast injection",
          duration: "30-45 min",
          prep: "Remove metal objects",
          useCase: "Meniscus tears, ACL/MCL injuries, hip labral tears"
        },
        {
          cpt: "73722",
          label: "MRI Lower Extremity (Joint) - With Contrast",
          shortLabel: "With Contrast",
          description: "Enhanced joint imaging with IV contrast",
          duration: "45-60 min",
          prep: "IV contrast, kidney function check",
          useCase: "Joint infection, tumor evaluation, inflammatory arthritis"
        },
        {
          cpt: "73723",
          label: "MRI Lower Extremity (Joint) - With & Without Contrast",
          shortLabel: "With & Without Contrast",
          description: "Complete joint evaluation with comparison",
          duration: "60-75 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex joint pathology, tumor staging"
        }
      ]
    },

    lowerExtremityNonJoint: {
      category: "Lower Extremity - Other Than Joint",
      includes: "Foot, Leg, or Thigh bones/soft tissue (tibia, fibula, femur)",
      clinicalUse: "Stress fractures, bone tumors, soft tissue masses, shin splints",
      icon: "foot",
      contrastAvailability: ["without", "both"],
      matchKeywords: ["foot", "leg", "thigh", "tibia", "fibula", "femur", "shin", "calf", "toe"],
      procedures: [
        {
          cpt: "73718",
          label: "MRI Lower Extremity (Non-Joint) - Without Contrast",
          shortLabel: "Without Contrast",
          description: "Bone and soft tissue imaging",
          duration: "30-45 min",
          prep: "Remove metal objects",
          useCase: "Stress fractures, plantar fasciitis, Achilles tendon"
        },
        {
          cpt: "73720",
          label: "MRI Lower Extremity (Non-Joint) - With & Without Contrast",
          shortLabel: "With & Without Contrast",
          description: "Complete bone and soft tissue evaluation",
          duration: "60-75 min",
          prep: "IV contrast, kidney function check",
          useCase: "Bone tumor characterization, complex infection"
        }
      ]
    },

    // ============================================
    // REDIRECT ENTRIES (SIMPLIFIED - FIXED!)
    // ============================================
    
    shoulder: {
      category: "Shoulder",
      icon: "shoulder",
      redirectTo: "upperExtremityJoint"
    },

    elbow: {
      category: "Elbow",
      icon: "elbow",
      redirectTo: "upperExtremityJoint"
    },

    wrist: {
      category: "Wrist / Hand",
      icon: "wrist",
      redirectTo: "upperExtremityJoint"
    },

    hip: {
      category: "Hip",
      icon: "hip",
      redirectTo: "lowerExtremityJoint"
    },

    knee: {
      category: "Knee",
      icon: "knee",
      redirectTo: "lowerExtremityJoint"
    },

    ankle: {
      category: "Ankle / Foot",
      icon: "ankle",
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

    // ============================================
    // TORSO
    // ============================================

    abdomen: {
      category: "Abdomen",
      icon: "abdomen",
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
      icon: "chest",
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
      icon: "breast",
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
          cpt: "77048",
          label: "MRI Breast - Unilateral With & Without Contrast",
          shortLabel: "Breast - One Side Enhanced",
          description: "Single breast with contrast comparison",
          duration: "45-60 min",
          prep: "IV contrast, scheduled 7-14 days after period",
          useCase: "Cancer staging, suspicious lesion workup"
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

    orbitFaceNeck: {
      category: "Orbit / Face / Neck",
      icon: "eye",
      procedures: [
        {
          cpt: "70540",
          label: "MRI Orbit/Face/Neck - Without Contrast",
          shortLabel: "Orbit - Without",
          description: "Eye socket, facial structures",
          duration: "30-45 min",
          prep: "Remove metal, especially eye makeup",
          useCase: "Orbital mass, facial pain"
        }
      ]
    },

    tmj: {
      category: "TMJ",
      icon: "tmj",
      procedures: [
        {
          cpt: "70336",
          label: "MRI TMJ - Without Contrast",
          shortLabel: "TMJ - Without",
          description: "Jaw joint imaging",
          duration: "30-45 min",
          prep: "Remove metal from head area",
          useCase: "TMJ pain, jaw clicking"
        }
      ]
    },

    cardiac: {
      category: "Cardiac",
      icon: "heart",
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

  /**
 * ENHANCED CT PROCEDURES - COMPLETE DATASET
 * ==========================================
 * Includes Standard CT, CTA (Vascular Imaging), and Specialized Screening
 * 
 * Category Groups:
 * - standard: Diagnostic CT scans (Head, Chest, Abdomen, Spine, etc.)
 * - vascular: CTA procedures for blood vessel evaluation
 * - screening: Preventive and wellness screening (Lung, Cardiac, Colonoscopy)
 * 
 * New Metadata Fields:
 * - categoryGroup: 'standard' | 'vascular' | 'screening'
 * - displayIn: Array of where to show (e.g., ['torso', 'vascular', 'screening'])
 * - tags: Array of search keywords
 * - clinicalIndication: Patient-friendly description of why this scan is done
 * - isScreening: Boolean flag for screening procedures
 * - isVascular: Boolean flag for CTA procedures
 * - helperText: Optional education line for screening items
 */

const CT_PROCEDURES = {
  
  // ============================================
  // STANDARD CT - HEAD & NECK
  // ============================================
  
  head: {
    category: "Head / Brain",
    icon: "brain",
    categoryGroup: "standard",
    displayIn: ["head", "brain"],
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
    badge: "💓 CTA",
    procedures: [
      {
        cpt: "70496",
        label: "CTA Head - With Contrast",
        shortLabel: "CTA Head",
        description: "Brain aneurysm, stroke, vascular malformations",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check",
        useCase: "Aneurysm detection, stroke evaluation, vascular abnormalities",
        clinicalIndication: "Angiography of brain blood vessels for aneurysm, stroke, and vascular malformations",
        isVascular: true,
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
        clinicalIndication: "Angiography of neck blood vessels for carotid stenosis and dissection",
        isVascular: true,
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
    badge: "💓 CTA",
    procedures: [
      {
        cpt: "71275",
        label: "CTA Chest - With Contrast",
        shortLabel: "CTA Chest",
        description: "Pulmonary embolism, aortic dissection",
        duration: "15-20 min",
        prep: "IV contrast, kidney function check, breath holding",
        useCase: "Pulmonary embolism (PE), aortic dissection, aneurysm",
        clinicalIndication: "Angiography for pulmonary embolism detection and aortic evaluation",
        isVascular: true,
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
    badge: "💓 CTA",
    procedures: [
      {
        cpt: "75574",
        label: "CTA Coronary Arteries - With Contrast",
        shortLabel: "CTA Coronary",
        description: "Coronary artery disease evaluation",
        duration: "20-30 min",
        prep: "IV contrast, beta blockers, heart rate control",
        useCase: "Coronary artery disease, chest pain evaluation, bypass graft assessment",
        clinicalIndication: "Non-invasive angiography of coronary arteries for blockage detection",
        isVascular: true,
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
    badge: "💓 CTA",
    procedures: [
      {
        cpt: "74175",
        label: "CTA Abdomen & Pelvis - With Contrast",
        shortLabel: "CTA Abdomen",
        description: "Abdominal aortic aneurysm, mesenteric ischemia",
        duration: "20-25 min",
        prep: "IV contrast, kidney function check",
        useCase: "AAA evaluation, mesenteric ischemia, renal artery stenosis",
        clinicalIndication: "Angiography of abdominal vessels for aneurysm and vascular disease",
        isVascular: true,
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
    badge: "💓 CTA",
    procedures: [
      {
        cpt: "73706",
        label: "CTA Lower Extremity - With Contrast",
        shortLabel: "CTA Leg/Run-off",
        description: "Peripheral artery disease (PAD), claudication",
        duration: "20-30 min",
        prep: "IV contrast, kidney function check",
        useCase: "Peripheral artery disease, leg claudication, pre-surgical planning",
        clinicalIndication: "Angiography of leg arteries for peripheral artery disease evaluation",
        isVascular: true,
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
        clinicalIndication: "Angiography of arm arteries for vascular abnormalities",
        isVascular: true,
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
    procedures: [
      {
        cpt: "71271",
        label: "CT Lung Cancer Screening - Low Dose",
        shortLabel: "Lung Screening",
        description: "Preventive lung cancer screening",
        duration: "5-10 min",
        prep: "None required - no contrast",
        useCase: "Annual lung cancer screening for high-risk patients",
        clinicalIndication: "Low-dose CT for early lung cancer detection in high-risk patients",
        isScreening: true,
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
    procedures: [
      {
        cpt: "75571",
        label: "CT Cardiac Calcium Score - Without Contrast",
        shortLabel: "Calcium Score",
        description: "Coronary artery calcium scoring",
        duration: "10-15 min",
        prep: "None required - no contrast",
        useCase: "Cardiovascular risk assessment, preventive cardiology",
        clinicalIndication: "Quantifies coronary calcium to assess cardiovascular disease risk",
        isScreening: true,
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
    procedures: [
      {
        cpt: "74263",
        label: "CT Colonography (Virtual Colonoscopy) - Screening",
        shortLabel: "Virtual Colonoscopy",
        description: "Non-invasive colon cancer screening",
        duration: "20-30 min",
        prep: "Bowel preparation required, no sedation",
        useCase: "Colon cancer screening, alternative to optical colonoscopy",
        clinicalIndication: "Non-invasive colon imaging for polyp and cancer detection",
        isScreening: true,
        helperText: "Colon cancer screening ages 45+ - no sedation required",
        tags: ["screening", "preventive", "colon cancer", "colonography", "polyps"]
      }
    ]
  },

  screeningCoronary: {        // ✅ Correct name
  category: "Coronary CTA Screening",
  icon: "heart",
  categoryGroup: "screening",
  displayIn: ["screening", "vascular"],  // ✅ Added "vascular"
  isVascular: true,         // ✅ NEW - marks as CTA
  isScreening: true,
  badge: "💓 CTA",           // ✅ Matches other CTA procedures
  procedures: [
    {
      cpt: "75574",         // ✅ Correct CTA coronary code
      label: "CTA Coronary Arteries - Screening",
      shortLabel: "Heart CTA",
      description: "Non-invasive coronary artery evaluation",
      duration: "20-30 min",
      prep: "IV contrast required, heart rate control, beta blockers",  // ✅ Correct for CTA
      useCase: "Chest pain evaluation, family history of heart disease",
      clinicalIndication: "Coronary CTA for non-invasive cardiac assessment",
      isVascular: true,     // ✅ NEW
      isScreening: true,
      helperText: "Non-invasive heart evaluation",
      tags: ["coronary", "heart screening", "cta", "cardiac"]
    }
  ]
}
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CT_PROCEDURES };
}

  // ============================================
  // X-RAY PROCEDURES - COMPLETE REFERENCE
  // ============================================
  
  const XRAY_PROCEDURES = {
    
    chest: {
      category: "Chest",
      icon: "chest",
      viewOptions: [
        {
          views: "1",
          cpt: "71045",
          label: "X-Ray Chest - 1 View",
          shortLabel: "Chest - 1 View",
          description: "Single frontal chest X-ray",
          duration: "5 min",
          prep: "Remove jewelry, metal objects from chest area",
          useCase: "Basic chest screening, follow-up",
          isCommon: false
        },
        {
          views: "2",
          cpt: "71046",
          label: "X-Ray Chest - 2 Views (PA & Lateral)",
          shortLabel: "Chest - 2 Views",
          description: "Standard two-view chest X-ray",
          duration: "5-10 min",
          prep: "Remove jewelry, metal objects from chest area",
          useCase: "Standard chest X-ray, pneumonia, COVID, heart size",
          isCommon: true
        },
        {
          views: "apical",
          cpt: "71042",
          label: "X-Ray Chest - Apical Lordotic",
          shortLabel: "Chest - Apical Lordotic",
          description: "Specialized angled view of lung apex",
          duration: "10 min",
          prep: "Remove jewelry, metal objects",
          useCase: "Lung apex evaluation, apical masses",
          isCommon: false
        },
        {
          views: "3-4",
          cpt: "71047-71048",
          label: "X-Ray Chest - Oblique/Special Views",
          shortLabel: "Chest - Special Views",
          description: "Multiple angled chest views",
          duration: "10-15 min",
          prep: "Remove jewelry, metal objects",
          useCase: "Rib fractures, comprehensive chest evaluation",
          isCommon: false
        }
      ]
    },

    cervicalSpine: {
      category: "Cervical Spine (Neck)",
      icon: "spine",
      viewOptions: [
        {
          views: "<4",
          cpt: "72040",
          label: "X-Ray Cervical Spine - Less Than 4 Views",
          shortLabel: "C-Spine - <4 Views",
          description: "Limited cervical spine series",
          duration: "10 min",
          prep: "Remove neck jewelry, necklaces",
          useCase: "Limited neck evaluation",
          isCommon: false
        },
        {
          views: "4-5",
          cpt: "72050",
          label: "X-Ray Cervical Spine - 4-5 Views",
          shortLabel: "C-Spine - 4-5 Views",
          description: "Standard cervical spine series",
          duration: "10-15 min",
          prep: "Remove neck jewelry, necklaces",
          useCase: "Standard neck pain evaluation, whiplash",
          isCommon: true
        },
        {
          views: "6+",
          cpt: "72052",
          label: "X-Ray Cervical Spine - 6+ Views (Flex/Ext)",
          shortLabel: "C-Spine - 6+ Views",
          description: "Complete cervical series with flexion/extension",
          duration: "15-20 min",
          prep: "Remove neck jewelry, necklaces",
          useCase: "Instability evaluation, post-injury assessment",
          isCommon: false
        }
      ]
    },

    thoracicSpine: {
      category: "Thoracic Spine (Mid Back)",
      icon: "spine",
      viewOptions: [
        {
          views: "2",
          cpt: "72070",
          label: "X-Ray Thoracic Spine - 2 Views",
          shortLabel: "T-Spine - 2 Views",
          description: "Two-view thoracic spine",
          duration: "10 min",
          prep: "Remove clothing with metal fasteners",
          useCase: "Mid-back pain, compression fractures",
          isCommon: true
        },
        {
          views: "3+",
          cpt: "72074",
          label: "X-Ray Thoracic Spine - 3+ Views",
          shortLabel: "T-Spine - 3+ Views",
          description: "Complete thoracic spine series",
          duration: "15 min",
          prep: "Remove clothing with metal fasteners",
          useCase: "Scoliosis evaluation, detailed spine assessment",
          isCommon: false
        }
      ]
    },

    lumbarSpine: {
      category: "Lumbar Spine (Low Back)",
      icon: "spine",
      viewOptions: [
        {
          views: "<4",
          cpt: "72100",
          label: "X-Ray Lumbar Spine - Less Than 4 Views",
          shortLabel: "L-Spine - <4 Views",
          description: "Limited lumbar spine series",
          duration: "10 min",
          prep: "Remove belt, pants with metal",
          useCase: "Limited low back evaluation",
          isCommon: false
        },
        {
          views: "4",
          cpt: "72110",
          label: "X-Ray Lumbar Spine - 4 Views",
          shortLabel: "L-Spine - 4 Views",
          description: "Standard lumbar spine series",
          duration: "10-15 min",
          prep: "Remove belt, pants with metal",
          useCase: "Low back pain, sciatica evaluation",
          isCommon: true
        },
        {
          views: "6",
          cpt: "72114",
          label: "X-Ray Lumbar Spine - 6 Views (Flex/Ext)",
          shortLabel: "L-Spine - 6 Views",
          description: "Complete lumbar series with bending views",
          duration: "15-20 min",
          prep: "Remove belt, pants with metal",
          useCase: "Instability, spondylolisthesis evaluation",
          isCommon: false
        }
      ]
    },

    knee: {
      category: "Knee",
      icon: "knee",
      viewOptions: [
        {
          views: "2",
          cpt: "73560",
          label: "X-Ray Knee - 2 Views",
          shortLabel: "Knee - 2 Views",
          description: "AP and lateral knee views",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Knee pain, injury evaluation",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73562",
          label: "X-Ray Knee - 3 Views",
          shortLabel: "Knee - 3 Views",
          description: "Complete knee series",
          duration: "10 min",
          prep: "None required",
          useCase: "Comprehensive knee evaluation",
          isCommon: false,
          bilateral: true
        },
        {
          views: "4",
          cpt: "73564",
          label: "X-Ray Knee - 4 Views (Anika)",
          shortLabel: "Knee - 4 Views",
          description: "Specialized knee series",
          duration: "10-15 min",
          prep: "None required",
          useCase: "Detailed knee assessment",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    shoulder: {
      category: "Shoulder",
      icon: "shoulder",
      viewOptions: [
        {
          views: "2",
          cpt: "73020",
          label: "X-Ray Shoulder - 2 Views",
          shortLabel: "Shoulder - 2 Views",
          description: "AP and lateral shoulder",
          duration: "5-10 min",
          prep: "Remove clothing from shoulder area",
          useCase: "Shoulder pain, injury",
          isCommon: false,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73030",
          label: "X-Ray Shoulder - 3 Views (Complete)",
          shortLabel: "Shoulder - 3 Views",
          description: "Complete shoulder series",
          duration: "10-15 min",
          prep: "Remove clothing from shoulder area",
          useCase: "Rotator cuff evaluation, dislocation",
          isCommon: true,
          bilateral: true
        }
      ]
    },

    clavicle: {
      category: "Clavicle",
      icon: "clavicle",
      viewOptions: [
        {
          views: "2",
          cpt: "73000",
          label: "X-Ray Clavicle - 2 Views (Complete)",
          shortLabel: "Clavicle - Complete",
          description: "Complete clavicle X-ray",
          duration: "5 min",
          prep: "Remove clothing from shoulder/chest area",
          useCase: "Clavicle fracture, injury",
          isCommon: true
        }
      ]
    },

    abdomen: {
      category: "Abdomen (KUB)",
      icon: "abdomen",
      viewOptions: [
        {
          views: "1",
          cpt: "74018",
          label: "X-Ray Abdomen - 1 View (KUB)",
          shortLabel: "KUB - 1 View",
          description: "Single abdominal view (kidneys, ureters, bladder)",
          duration: "5 min",
          prep: "None required",
          useCase: "Kidney stones, constipation, abdominal pain",
          isCommon: true
        },
        {
          views: "2",
          cpt: "74019",
          label: "X-Ray Abdomen - 2 Views",
          shortLabel: "Abdomen - 2 Views",
          description: "AP and additional abdominal view",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Abdominal pain, bowel obstruction",
          isCommon: false
        },
        {
          views: "3+",
          cpt: "74021",
          label: "X-Ray Abdomen - 3+ Views (Acute Series)",
          shortLabel: "Abdomen - Acute Series",
          description: "Complete abdominal series with oblique",
          duration: "10-15 min",
          prep: "None required",
          useCase: "Bowel obstruction, acute abdomen",
          isCommon: false
        }
      ]
    },

    pelvis: {
      category: "Pelvis",
      icon: "pelvis",
      viewOptions: [
        {
          views: "1-2",
          cpt: "72170",
          label: "X-Ray Pelvis - 1 or 2 Views",
          shortLabel: "Pelvis - 1-2 Views",
          description: "Standard pelvis X-ray",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Hip pain, pelvic fracture",
          isCommon: true
        },
        {
          views: "3+",
          cpt: "72190",
          label: "X-Ray Pelvis - 3+ Views (Complete)",
          shortLabel: "Pelvis - Complete",
          description: "Complete pelvis series",
          duration: "10-15 min",
          prep: "None required",
          useCase: "Trauma evaluation, detailed assessment",
          isCommon: false
        }
      ]
    },

    ribs: {
      category: "Ribs",
      icon: "ribs",
      viewOptions: [
        {
          views: "2",
          cpt: "71100",
          label: "X-Ray Ribs - Unilateral 2 Views",
          shortLabel: "Ribs - 2 Views (One Side)",
          description: "Two views of one side of ribs",
          duration: "10 min",
          prep: "Remove clothing from chest area",
          useCase: "Rib fracture, chest wall pain",
          isCommon: false
        },
        {
          views: "3",
          cpt: "71101",
          label: "X-Ray Ribs - Including Chest 3-4 Views",
          shortLabel: "Ribs - 3-4 Views",
          description: "Ribs with chest views",
          duration: "10-15 min",
          prep: "Remove clothing from chest area",
          useCase: "Comprehensive rib evaluation",
          isCommon: false
        },
        {
          views: "bilateral",
          cpt: "71110",
          label: "X-Ray Ribs - Bilateral (Both Sides)",
          shortLabel: "Ribs - Bilateral",
          description: "Both sides of ribs",
          duration: "15 min",
          prep: "Remove clothing from chest area",
          useCase: "Bilateral rib trauma",
          isCommon: true
        }
      ]
    },

    ankle: {
      category: "Ankle",
      icon: "ankle",
      viewOptions: [
        {
          views: "2",
          cpt: "73600",
          label: "X-Ray Ankle - 2 Views",
          shortLabel: "Ankle - 2 Views",
          description: "AP and lateral ankle",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Ankle sprain, fracture evaluation",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73610",
          label: "X-Ray Ankle - 3 Views (Complete)",
          shortLabel: "Ankle - 3 Views",
          description: "Complete ankle series",
          duration: "10 min",
          prep: "None required",
          useCase: "Comprehensive ankle evaluation",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    foot: {
      category: "Foot",
      icon: "foot",
      viewOptions: [
        {
          views: "2",
          cpt: "73620",
          label: "X-Ray Foot - 2 Views",
          shortLabel: "Foot - 2 Views",
          description: "AP and lateral foot",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Foot pain, fracture",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73630",
          label: "X-Ray Foot - 3 Views (Complete)",
          shortLabel: "Foot - 3 Views",
          description: "Complete foot series",
          duration: "10 min",
          prep: "None required",
          useCase: "Comprehensive foot evaluation",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    hand: {
      category: "Hand",
      icon: "hand",
      viewOptions: [
        {
          views: "2",
          cpt: "73120",
          label: "X-Ray Hand - 2 Views",
          shortLabel: "Hand - 2 Views",
          description: "AP and lateral hand",
          duration: "5-10 min",
          prep: "Remove rings, jewelry",
          useCase: "Hand injury, fracture",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73130",
          label: "X-Ray Hand - 3 Views (Complete)",
          shortLabel: "Hand - 3 Views",
          description: "Complete hand series",
          duration: "10 min",
          prep: "Remove rings, jewelry",
          useCase: "Comprehensive hand evaluation",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    wrist: {
      category: "Wrist",
      icon: "wrist",
      viewOptions: [
        {
          views: "2",
          cpt: "73100",
          label: "X-Ray Wrist - 2 Views",
          shortLabel: "Wrist - 2 Views",
          description: "AP and lateral wrist",
          duration: "5-10 min",
          prep: "Remove watches, bracelets",
          useCase: "Wrist pain, fracture",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73110",
          label: "X-Ray Wrist - 3 Views (Complete)",
          shortLabel: "Wrist - 3 Views",
          description: "Complete wrist series",
          duration: "10 min",
          prep: "Remove watches, bracelets",
          useCase: "Comprehensive wrist evaluation, scaphoid",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    hip: {
      category: "Hip",
      icon: "hip",
      viewOptions: [
        {
          views: "2-3",
          cpt: "73521",
          label: "X-Ray Hip - Unilateral 2-3 Views",
          shortLabel: "Hip - 2-3 Views (One Side)",
          description: "One hip with multiple views",
          duration: "10 min",
          prep: "None required",
          useCase: "Hip pain, fracture evaluation",
          isCommon: true,
          bilateral: true
        },
        {
          views: "4+",
          cpt: "73522",
          label: "X-Ray Hip - Bilateral 3-4 Views",
          shortLabel: "Hip - Bilateral",
          description: "Both hips",
          duration: "10-15 min",
          prep: "None required",
          useCase: "Bilateral hip assessment",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    elbow: {
      category: "Elbow",
      icon: "elbow",
      viewOptions: [
        {
          views: "2",
          cpt: "73070",
          label: "X-Ray Elbow - 2 Views",
          shortLabel: "Elbow - 2 Views",
          description: "AP and lateral elbow",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Elbow pain, injury",
          isCommon: true,
          bilateral: true
        },
        {
          views: "3",
          cpt: "73080",
          label: "X-Ray Elbow - 3 Views (Complete)",
          shortLabel: "Elbow - 3 Views",
          description: "Complete elbow series",
          duration: "10 min",
          prep: "None required",
          useCase: "Comprehensive elbow evaluation",
          isCommon: false,
          bilateral: true
        }
      ]
    },

    femur: {
      category: "Femur (Thigh)",
      icon: "femur",
      viewOptions: [
        {
          views: "2",
          cpt: "73552",
          label: "X-Ray Femur - 2 Views",
          shortLabel: "Femur - 2 Views",
          description: "AP and lateral femur",
          duration: "10 min",
          prep: "None required",
          useCase: "Thigh pain, femur fracture",
          isCommon: true
        }
      ]
    },

    tibia: {
      category: "Tibia/Fibula (Lower Leg)",
      icon: "tibia",
      viewOptions: [
        {
          views: "2",
          cpt: "73590",
          label: "X-Ray Tibia/Fibula - 2 Views",
          shortLabel: "Lower Leg - 2 Views",
          description: "AP and lateral lower leg",
          duration: "10 min",
          prep: "None required",
          useCase: "Lower leg pain, fracture",
          isCommon: true,
          bilateral: true
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
      'c-spine': 'cervicalSpine',
      'neck': 'cervicalSpine',
      
      'thoracic spine': 'thoracicSpine',
      'thoracic spine (mid back)': 'thoracicSpine',
      't-spine': 'thoracicSpine',
      'mid back': 'thoracicSpine',
      
      'lumbar spine': 'lumbarSpine',
      'lumbar spine (low back)': 'lumbarSpine',
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
      'neck (soft tissue)': 'neckSoftTissue'
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
    } else {
      console.warn('âŒ Unsupported modality:', modality);
      return null;
    }
    
    // Find region
    const regionKey = normalizeRegionKey(region, modality);
    if (!regionKey) {
      console.warn('âŒ Region not found:', region);
      return null;
    }
    
    const categoryData = modalityData[regionKey];
    if (!categoryData) {
      console.warn('âŒ No data for region:', region);
      return null;
    }
    
    // Handle redirects
    if (categoryData.redirectTo) {
      console.log('ðŸ”„ Following redirect:', categoryData.redirectTo);
      const targetData = modalityData[categoryData.redirectTo];
      if (!targetData || !targetData.procedures) {
        console.warn('âŒ Redirect target not found:', categoryData.redirectTo);
        return null;
      }
      
      // Use procedures from target, but keep original category name
      const procedure = findProcedureByContrast(targetData.procedures, contrast);
      if (!procedure) {
        console.warn('âŒ No matching contrast in redirected target');
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
      console.warn('âŒ No procedures for region:', region);
      return null;
    }
    
    // Find matching contrast
    const procedure = findProcedureByContrast(categoryData.procedures, contrast);
    if (!procedure) {
      console.warn('âŒ No matching contrast:', { region: region, contrast: contrast });
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
  // EXPOSE TO GLOBAL SCOPE
  // ============================================

  window.ProcedureLibrary = {
    MRI: MRI_PROCEDURES,
    CT: CT_PROCEDURES,
    'X-Ray': XRAY_PROCEDURES
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

  console.log('âœ… Procedure Library loaded successfully!');
  console.log('ðŸ“¦ Available:', Object.keys(window.ProcedureLibrary).join(', '));

})();