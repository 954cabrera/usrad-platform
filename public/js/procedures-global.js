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

    // ============================================
    // UPPER EXTREMITY - MAIN ENTRIES
    // ============================================
    
    upperExtremityJoint: {
      category: "Upper Extremity - Any Joint",
      includes: "Shoulder, Elbow, or Wrist joint",
      clinicalUse: "Rotator cuff tears, labral tears, ligament injuries, joint effusions",
      icon: String.fromCodePoint(0x1F4AA), // 💪
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
      icon: String.fromCodePoint(0x270B), // ✋
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
      icon: String.fromCodePoint(0x1F9B5), // 🦵
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
      icon: String.fromCodePoint(0x1F9B6), // 🦶
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
      icon: String.fromCodePoint(0x1F4AA), // 💪
      redirectTo: "upperExtremityJoint"
    },

    elbow: {
      category: "Elbow",
      icon: String.fromCodePoint(0x1F4AA), // 💪
      redirectTo: "upperExtremityJoint"
    },

    wrist: {
      category: "Wrist / Hand",
      icon: String.fromCodePoint(0x270B), // ✋
      redirectTo: "upperExtremityJoint"
    },

    hip: {
      category: "Hip",
      icon: String.fromCodePoint(0x1F9B4), // 🦴
      redirectTo: "lowerExtremityJoint"
    },

    knee: {
      category: "Knee",
      icon: String.fromCodePoint(0x1F9B5), // 🦵
      redirectTo: "lowerExtremityJoint"
    },

    ankle: {
      category: "Ankle / Foot",
      icon: String.fromCodePoint(0x1F9B6), // 🦶
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
      icon: "👁️",
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
      icon: "🦴",
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

  const CT_PROCEDURES = {
    
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

    sinuses: {
      category: "Sinuses",
      icon: "👃",
      procedures: [
        {
          cpt: "70486",
          label: "CT Sinuses - Without Contrast",
          shortLabel: "Sinuses",
          description: "Sinusitis, polyps, surgical planning",
          duration: "5-10 min",
          prep: "None required",
          useCase: "Chronic sinusitis, polyps, pre-surgical planning"
        }
      ]
    },

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
      'wrist / hand': 'wrist',
      'wrist/hand': 'wrist',
      'hand': 'wrist',
      
      'hip': 'hip',
      'knee': 'knee',
      'ankle': 'ankle',
      'ankle / foot': 'ankle',
      'ankle/foot': 'ankle',
      'foot': 'ankle',
      
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
    
    // For CT extremities that need special keys to avoid MRI conflicts
    if (modality === 'CT' && baseKey) {
      if (baseKey === 'wrist') return 'wristCT';
      if (baseKey === 'hip') return 'hipCT';
      if (baseKey === 'knee') return 'kneeCT';
      if (baseKey === 'ankle') return 'ankleCT';
    }
    
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
    } else {
      console.warn('❌ Unsupported modality:', modality);
      return null;
    }
    
    // Find region
    const regionKey = normalizeRegionKey(region, modality);
    if (!regionKey) {
      console.warn('❌ Region not found:', region);
      return null;
    }
    
    const categoryData = modalityData[regionKey];
    if (!categoryData) {
      console.warn('❌ No data for region:', region);
      return null;
    }
    
    // Handle redirects
    if (categoryData.redirectTo) {
      console.log('🔄 Following redirect:', categoryData.redirectTo);
      const targetData = modalityData[categoryData.redirectTo];
      if (!targetData || !targetData.procedures) {
        console.warn('❌ Redirect target not found:', categoryData.redirectTo);
        return null;
      }
      
      // Use procedures from target, but keep original category name
      const procedure = findProcedureByContrast(targetData.procedures, contrast);
      if (!procedure) {
        console.warn('❌ No matching contrast in redirected target');
        return null;
      }
      
      return {
        cpt_code: procedure.cpt,
        label: procedure.label,
        patient_label: procedure.label + '\nCPT ' + procedure.cpt,
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
      console.warn('❌ No procedures for region:', region);
      return null;
    }
    
    // Find matching contrast
    const procedure = findProcedureByContrast(categoryData.procedures, contrast);
    if (!procedure) {
      console.warn('❌ No matching contrast:', { region: region, contrast: contrast });
      return null;
    }
    
    console.log('✅ [Procedure Library] Found:', procedure);
    
    return {
      cpt_code: procedure.cpt,
      label: procedure.label,
      patient_label: procedure.label + '\nCPT ' + procedure.cpt,
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
    CT: CT_PROCEDURES
  };

  window.ProcedureHelpers = {
    resolveProcedure: resolveProcedure,
    normalizeRegionKey: normalizeRegionKey,
    isAmbiguousBodyPart: isAmbiguousBodyPart,
    getCategoriesForBodyPart: getCategoriesForBodyPart,
    filterByContrast: filterByContrast
  };

  console.log('✅ Procedure Library loaded successfully!');
  console.log('📦 Available:', Object.keys(window.ProcedureLibrary).join(', '));

})();