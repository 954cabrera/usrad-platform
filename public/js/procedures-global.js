/**
 * COMPREHENSIVE IMAGING PROCEDURE LIBRARY
 * ==========================================
 * Complete CPT reference - Global version for public folder
 * 
 * Usage: window.ProcedureLibrary.MRI.knee.procedures
 * 
 * Last Updated: November 2, 2025
 * Data Source: Medicare CPT codes + Clinical references
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
      icon: "👁",
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
    },

    // ====================================================
    // CT EXTREMITIES - ADDED FOR CONSISTENCY WITH MRI
    // ====================================================

    shoulder: {
      category: "Shoulder",
      icon: String.fromCodePoint(0x1F4AA), // 💪 Flexed Biceps
      procedures: [
        {
          cpt: "73200",
          label: "CT Upper Extremity - Without Contrast",
          shortLabel: "Shoulder - Without",
          description: "Bone detail, fractures, arthritis",
          duration: "10-15 min",
          prep: "Remove metal objects",
          useCase: "Shoulder fractures, bone detail, arthritis"
        },
        {
          cpt: "73201",
          label: "CT Upper Extremity - With Contrast",
          shortLabel: "Shoulder - With",
          description: "Soft tissue evaluation, tumors",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue masses, infection, tumor staging"
        },
        {
          cpt: "73202",
          label: "CT Upper Extremity - With & Without Contrast",
          shortLabel: "Shoulder - Both",
          description: "Complete shoulder evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex masses, tumor characterization"
        }
      ]
    },

    elbow: {
      category: "Elbow",
      icon: String.fromCodePoint(0x1F4AA), // 💪 Flexed Biceps
      procedures: [
        {
          cpt: "73200",
          label: "CT Upper Extremity - Without Contrast",
          shortLabel: "Elbow - Without",
          description: "Bone detail, fractures, loose bodies",
          duration: "10-15 min",
          prep: "Remove metal objects",
          useCase: "Elbow fractures, loose bodies, arthritis"
        },
        {
          cpt: "73201",
          label: "CT Upper Extremity - With Contrast",
          shortLabel: "Elbow - With",
          description: "Soft tissue evaluation, masses",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue masses, infection evaluation"
        },
        {
          cpt: "73202",
          label: "CT Upper Extremity - With & Without Contrast",
          shortLabel: "Elbow - Both",
          description: "Complete elbow evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex pathology, tumor staging"
        }
      ]
    },

    wristCT: {
      category: "Wrist / Hand",
      icon: String.fromCodePoint(0x270B), // ✋ Raised Hand
      procedures: [
        {
          cpt: "73200",
          label: "CT Upper Extremity - Without Contrast",
          shortLabel: "Wrist - Without",
          description: "Bone detail, fractures, arthritis",
          duration: "10-15 min",
          prep: "Remove metal objects, jewelry",
          useCase: "Wrist fractures, scaphoid fracture, arthritis"
        },
        {
          cpt: "73201",
          label: "CT Upper Extremity - With Contrast",
          shortLabel: "Wrist - With",
          description: "Soft tissue evaluation, infection",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue infection, masses"
        },
        {
          cpt: "73202",
          label: "CT Upper Extremity - With & Without Contrast",
          shortLabel: "Wrist - Both",
          description: "Complete wrist evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex bone/soft tissue pathology"
        }
      ]
    },

    hipCT: {
      category: "Hip",
      icon: String.fromCodePoint(0x1F9B4), // 🦴 Bone
      procedures: [
        {
          cpt: "73700",
          label: "CT Lower Extremity - Without Contrast",
          shortLabel: "Hip - Without",
          description: "Bone detail, fractures, arthritis",
          duration: "10-15 min",
          prep: "Remove metal objects",
          useCase: "Hip fractures, bone detail, prosthesis evaluation"
        },
        {
          cpt: "73701",
          label: "CT Lower Extremity - With Contrast",
          shortLabel: "Hip - With",
          description: "Soft tissue evaluation, infection",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue masses, infection, tumor staging"
        },
        {
          cpt: "73702",
          label: "CT Lower Extremity - With & Without Contrast",
          shortLabel: "Hip - Both",
          description: "Complete hip evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex masses, tumor characterization"
        }
      ]
    },

    kneeCT: {
      category: "Knee",
      icon: String.fromCodePoint(0x1F9B5), // 🦵 Leg
      procedures: [
        {
          cpt: "73700",
          label: "CT Lower Extremity - Without Contrast",
          shortLabel: "Knee - Without",
          description: "Bone detail, fractures, loose bodies",
          duration: "10-15 min",
          prep: "Remove metal objects",
          useCase: "Knee fractures, tibial plateau, loose bodies"
        },
        {
          cpt: "73701",
          label: "CT Lower Extremity - With Contrast",
          shortLabel: "Knee - With",
          description: "Soft tissue evaluation, masses",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue masses, infection evaluation"
        },
        {
          cpt: "73702",
          label: "CT Lower Extremity - With & Without Contrast",
          shortLabel: "Knee - Both",
          description: "Complete knee evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex pathology, tumor staging"
        }
      ]
    },

    ankleCT: {
      category: "Ankle / Foot",
      icon: String.fromCodePoint(0x1F9B6), // 🦶 Foot
      procedures: [
        {
          cpt: "73700",
          label: "CT Lower Extremity - Without Contrast",
          shortLabel: "Ankle - Without",
          description: "Bone detail, fractures, arthritis",
          duration: "10-15 min",
          prep: "Remove metal objects",
          useCase: "Ankle fractures, calcaneus fracture, arthritis"
        },
        {
          cpt: "73701",
          label: "CT Lower Extremity - With Contrast",
          shortLabel: "Ankle - With",
          description: "Soft tissue evaluation, infection",
          duration: "15-20 min",
          prep: "IV contrast, kidney function check",
          useCase: "Soft tissue infection, masses"
        },
        {
          cpt: "73702",
          label: "CT Lower Extremity - With & Without Contrast",
          shortLabel: "Ankle - Both",
          description: "Complete ankle evaluation",
          duration: "20-25 min",
          prep: "IV contrast, kidney function check",
          useCase: "Complex bone/soft tissue pathology"
        }
      ]
    }
  };

// ====================================================
// ICON REFERENCE (for easy copying)
// ====================================================
// 
// Upper Extremity Icons:
// Shoulder/Elbow: String.fromCodePoint(0x1F4AA) // 💪 Flexed Biceps
// Wrist/Hand:     String.fromCodePoint(0x270B)  // ✋ Raised Hand
//
// Lower Extremity Icons:
// Hip:            String.fromCodePoint(0x1F9B4) // 🦴 Bone
// Knee:           String.fromCodePoint(0x1F9B5) // 🦵 Leg
// Ankle/Foot:     String.fromCodePoint(0x1F9B6) // 🦶 Foot
//
// Other Common Icons (for reference):
// Brain:          String.fromCodePoint(0x1F9E0) // 🧠 Brain
// Lungs:          String.fromCodePoint(0x1FAC1) // 🫁 Lungs
// Heart:          String.fromCodePoint(0x2764, 0xFE0F) // ❤️ Heart
// Bone:           String.fromCodePoint(0x1F9B4) // 🦴 Bone
// Nose:           String.fromCodePoint(0x1F443) // 👃 Nose
// Eye:            String.fromCodePoint(0x1F441, 0xFE0F) // 👁️ Eye
// Ribbon:         String.fromCodePoint(0x1F380) // 🎀 Ribbon

  

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  function normalizeRegionKey(region, modality) {  // ⭐ UPDATED: Added modality parameter
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
    
    // ⭐ NEW: For CT extremities that need special keys to avoid MRI conflicts
    if (modality === 'CT' && baseKey) {
      if (baseKey === 'wrist') return 'wristCT';
      if (baseKey === 'hip') return 'hipCT';
      if (baseKey === 'knee') return 'kneeCT';
      if (baseKey === 'ankle') return 'ankleCT';
    }
    
    return baseKey;
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
    
    // Find region (⭐ UPDATED: Now passes modality to normalizeRegionKey)
    const regionKey = normalizeRegionKey(region, modality);
    if (!regionKey) {
      console.warn('❌ Region not found:', region);
      return null;
    }
    
    const categoryData = modalityData[regionKey];
    if (!categoryData || !categoryData.procedures) {
      console.warn('❌ No procedures for region:', region);
      return null;
    }
    
    // Find matching contrast
    const contrastMap = {
      'without': 'Without Contrast',
      'with': 'With Contrast',
      'both': 'With & Without'
    };
    
    const contrastLabel = contrastMap[contrast.toLowerCase()] || contrast;
    
    const procedure = categoryData.procedures.find(function(p) {
      return p.label.indexOf(contrastLabel) !== -1 || 
             p.shortLabel.indexOf(contrastLabel) !== -1;
    });
    
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

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================

  window.ProcedureLibrary = {
    MRI: MRI_PROCEDURES,
    CT: CT_PROCEDURES
  };

  window.ProcedureHelpers = {
    resolveProcedure: resolveProcedure,
    normalizeRegionKey: normalizeRegionKey
  };

  console.log('✅ Procedure Library loaded successfully!');
  console.log('📦 Available:', Object.keys(window.ProcedureLibrary).join(', '));

})();