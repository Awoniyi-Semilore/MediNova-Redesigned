// junior_residency.js - Classes 05-09: Common Presentations & Independent Management
// Building confidence with complex but common clinical scenarios

export const JUNIOR_RESIDENCY = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 05: RESPIRATORY MEDICINE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 5,
    num: "05",
    level: "junior_residency",
    title: "Respiratory Medicine",
    subtitle: "COPD, Asthma & Respiratory Failure",
    tagline: "Airway is the first A. Don't let it fail.",
    estimatedMinutes: { doctor: 55, nurse: 50 },
    passMark: 75,
    xpReward: 250,
    media: {
      images: {
        "5A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "5B": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800"
      },
      ambience: "/audio/respiratory_ward.mp3",
      pdfs: { "bts_guidelines": "/pdfs/class05_bts_guidelines.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "5D-A",
          title: "The CO2 Retainer",
          mechanics: "mcq",
          objective: "Interpret ABG and titrate oxygen therapy safely",
          scenario: "Mr. Henderson, 72, COPD. SpO2 84% on air. Drowsy, flapping tremor noted.",
          questions: [
            {
              id: "5D-A-q1",
              stem: "ABG: pH 7.24, pCO2 9.2 kPa, pO2 7.1 kPa. What is the diagnosis?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Type 2 Respiratory Failure (Acidotic)", correct: true, explanation: "High CO2 with low pH indicates ventilatory failure causing respiratory acidosis." },
                { id: "b", text: "Type 1 Respiratory Failure", correct: false, explanation: "Type 1 = hypoxaemic only. Type 2 = hypercapnic ± hypoxaemic." },
                { id: "c", text: "Metabolic acidosis", correct: false, explanation: "Metabolic acidosis is not related to respiratory function." },
                { id: "d", text: "Compensated respiratory alkalosis", correct: false, explanation: "Compensated respiratory alkalosis is not the diagnosis for this case." }
              ]
            },
            {
              id: "5D-A-q2",
              stem: "What is the immediate management for this acidotic Type 2 failure?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Non-Invasive Ventilation (NIV/BiPAP)", correct: true, explanation: "NIV provides pressure support to help blow off excess CO2." },
                { id: "b", text: "15L Non-rebreathe mask", correct: false, explanation: "Too much oxygen can worsen CO2 retention in chronic hypoxic drive patients." },
                { id: "c", text: "Immediate intubation", correct: false, explanation: "Intubation is a more invasive option and not the immediate management." },
                { id: "d", text: "High-flow nasal cannula at 60L/min", correct: false, explanation: "High-flow nasal cannula is not the appropriate management for this condition." }
              ]
            },
            {
              id: "5D-A-q3",
              stem: "What oxygen target should you aim for in this COPD patient?",
              timeLimit: 45,
              options: [
                { id: "a", text: "88-92% SpO2", correct: true, explanation: "COPD patients with CO2 retention need controlled oxygen to avoid suppressing hypoxic drive." },
                { id: "b", text: "94-98% SpO2", correct: false, explanation: "Higher oxygen targets can worsen CO2 retention in COPD patients." },
                { id: "c", text: "100% SpO2", correct: false, explanation: "100% oxygen can be dangerous for COPD patients with CO2 retention." },
                { id: "d", text: "85-88% SpO2", correct: false, explanation: "Lower oxygen targets may not be sufficient for this patient." }
              ]
            }
          ]
        },
        {
          id: "5D-B",
          title: "Life-Threatening Asthma",
          mechanics: "audio_mcq",
          objective: "Identify silent chest and escalate appropriately",
          scenario: "24-year-old. Peak flow 25% predicted. Chest is silent on auscultation.",
          audio: "/audio/class05_asthma_silent.mp3",
          questions: [
            {
              id: "5D-B-q1",
              stem: "Listen to the audio. What does 'Silent Chest' signify?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Impending respiratory arrest", correct: true, explanation: "So little air movement that wheeze cannot be heard. This is a pre-terminal sign." },
                { id: "b", text: "Recovery phase", correct: false, explanation: "Silent chest is not a sign of recovery, but rather severe obstruction." },
                { id: "c", text: "Mild exacerbation", correct: false, explanation: "Mild exacerbation would still allow for some air movement and wheeze." },
                { id: "d", text: "Pneumothorax", correct: false, explanation: "Pneumothorax would present with decreased breath sounds but not necessarily a silent chest." }
              ]
            },
            {
              id: "5D-B-q2",
              stem: "What is your immediate priority?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Immediate ICU referral for possible intubation", correct: true, explanation: "Silent chest = life-threatening asthma requiring critical care input." },
                { id: "b", text: "Discharge with oral steroids", correct: false, explanation: "Discharge is not appropriate for a patient with a silent chest." },
                { id: "c", text: "Continue nebulizers and reassess in 1 hour", correct: false, explanation: "Continuing nebulizers is not appropriate for a patient with a silent chest." },
                { id: "d", text: "Chest X-ray only", correct: false, explanation: "Chest X-ray is not the appropriate management for this condition." }
              ]
            }
          ]
        },
        {
          id: "5D-C",
          title: "Pleural Effusion Diagnosis",
          mechanics: "hotspot",
          objective: "Interpret ultrasound findings and determine need for drainage",
          scenario: "Bedside ultrasound shows pleural fluid. Click on the appropriate needle insertion site.",
          image: "/images/pleural_ultrasound.jpeg",
          questions: [
            {
              id: "5D-C-q1",
              stem: "Click on the Triangle of Safety for chest drain insertion.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Mid-axillary line, 5th intercostal space", correct: true, explanation: "Triangle of Safety: lateral to nipple, anterior to mid-axillary line, above diaphragm, below axilla." },
                { id: "b", text: "2nd intercostal space mid-clavicular", correct: false, explanation: "2nd intercostal space mid-clavicular is the site for needle decompression, not chest drain insertion." },
                { id: "c", text: "7th intercostal space posterior", correct: false, explanation: "7th intercostal space posterior is not the standard site for chest drain insertion." },
                { id: "d", text: "Sub-xiphoid region", correct: false, explanation: "Sub-xiphoid region is not a standard site for chest drain insertion." }
              ]
            },
            {
              id: "5D-C-q2",
              stem: "What is the maximum initial drainage volume to prevent re-expansion pulmonary edema?",
              timeLimit: 45,
              options: [
                { id: "a", text: "1.5 litres", correct: true, explanation: "Drain maximum 1.5L initially to prevent re-expansion pulmonary edema." },
                { id: "b", text: "500 ml", correct: false, explanation: "500 ml is too low for the initial drainage volume." },
                { id: "c", text: "3 litres", correct: false, explanation: "3 litres is too high for the initial drainage volume." },
                { id: "d", text: "No limit - drain until cessation", correct: false, explanation: "There is a limit to prevent re-expansion pulmonary edema." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "5N-A",
          title: "Controlled Oxygen Delivery",
          mechanics: "mcq",
          objective: "Select correct Venturi mask and flow rate",
          scenario: "Doctor orders oxygen target 88-92% for COPD patient.",
          questions: [
            {
              id: "5N-A-q1",
              stem: "Which Venturi valve provides exactly 24% oxygen?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Blue", correct: true, explanation: "Blue=24%, White=28%, Orange=31%, Yellow=35%, Red=40%." },
                { id: "b", text: "Red", correct: false, explanation: "Red valve provides 40% oxygen, not 24%." },
                { id: "c", text: "Yellow", correct: false, explanation: "Yellow valve provides 35% oxygen." },
                { id: "d", text: "Green", correct: false, explanation: "Green valve provides 28% oxygen." }
              ]
            },
            {
              id: "5N-A-q2",
              stem: "What flow rate is required for the 24% Venturi mask?",
              timeLimit: 45,
              options: [
                { id: "a", text: "2-4 L/min", correct: true, explanation: "Each Venturi valve has a specified flow rate to achieve the stated FiO2." },
                { id: "b", text: "15 L/min", correct: false, explanation: "15 L/min is too high for the 24% Venturi mask." },
                { id: "c", text: "6 L/min", correct: false, explanation: "6 L/min is too high for the 24% Venturi mask." },
                { id: "d", text: "1 L/min", correct: false, explanation: "1 L/min is too low for the 24% Venturi mask." }
              ]
            }
          ]
        },
        {
          id: "5N-B",
          title: "Inhaler Technique Assessment",
          mechanics: "mcq",
          objective: "Verify MDI technique and spacer use",
          scenario: "Patient ready for discharge. You must verify their inhaler technique.",
          questions: [
            {
              id: "5N-B-q1",
              stem: "Why is a spacer recommended for steroid inhalers?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Reduce oral thrush and improve lung deposition", correct: true, explanation: "Spacers slow particles, ensuring they hit lungs rather than back of throat." },
                { id: "b", text: "Make it smell better", correct: false },
                { id: "c", text: "Required for drug activation", correct: false },
                { id: "d", text: "Prevent device clogging", correct: false }
              ]
            },
            {
              id: "5N-B-q2",
              stem: "How long should the patient hold their breath after inhaling?",
              timeLimit: 45,
              options: [
                { id: "a", text: "10 seconds", correct: true, explanation: "Holding breath allows particles to settle in peripheral airways." },
                { id: "b", text: "2 seconds", correct: false, explanation: "2 seconds is too short for effective particle deposition." },
                { id: "c", text: "30 seconds", correct: false, explanation: "30 seconds is too long and may cause discomfort." },
                { id: "d", text: "No need to hold breath", correct: false, explanation: "Holding breath is important for effective medication delivery." }
              ]
            }
          ]
        },
        {
          id: "5N-C",
          title: "Nursing Management of NIV",
          mechanics: "mcq",
          objective: "Troubleshoot NIV and ensure patient tolerance",
          scenario: "Patient on BiPAP becoming agitated, removing mask. SpO2 dropping.",
          questions: [
            {
              id: "5N-C-q1",
              stem: "What is your first action?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Reassure patient and check mask fit/pressure settings", correct: true, explanation: "Claustrophobia and poor fit are common issues - address before sedation." },
                { id: "b", text: "Sedate immediately with midazolam", correct: false, explanation: "Sedation should be a last resort and only after addressing comfort and fit." },
                { id: "c", text: "Switch to high-flow nasal cannula", correct: false, explanation: "High-flow nasal cannula is not a suitable replacement for NIV in this scenario." },
                { id: "d", text: "Call for immediate intubation", correct: false, explanation: "Intubation is a more invasive intervention and should be considered only if other measures fail." } 
              ]
            },
            {
              id: "5N-C-q2",
              stem: "What pressure parameter reduces CO2?",
              timeLimit: 45,
              options: [
                { id: "a", text: "IPAP (Inspiratory Positive Airway Pressure)", correct: true, explanation: "IPAP assists inspiration and augments tidal volume to blow off CO2." },
                { id: "b", text: "EPAP only", correct: false, explanation: "EPAP provides positive pressure during expiration and does not directly reduce CO2." },
                { id: "c", text: "Both equally", correct: false, explanation: "IPAP is more effective than EPAP for reducing CO2." },
                { id: "d", text: "Neither - oxygen flow rate only", correct: false, explanation: "Pressure parameters are crucial for CO2 management in NIV." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 06: CARDIOLOGY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 6,
    num: "06",
    level: "junior_residency",
    title: "Cardiology",
    subtitle: "Heart Failure, Arrhythmias & ACS",
    tagline: "The rhythm of life depends on your decisions.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 75,
    xpReward: 275,
    media: {
      images: {
        "6A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
        "6B": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800"
      },
      ambience: "/audio/monitor_beeping.mp3",
      pdfs: { "nice_cardiac": "/pdfs/class06_nice_cardiac.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "6D-A",
          title: "Acute Pulmonary Oedema",
          mechanics: "mcq",
          objective: "Execute the LMNOP protocol for acute heart failure",
          scenario: "78-year-old 'drowning' in fluid. Fine crackles to mid-zones. BP 170/100.",
          questions: [
            {
              id: "6D-A-q1",
              stem: "Which IV diuretic is first-line for acute decompensated heart failure?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Furosemide", correct: true, explanation: "Loop diuretic - first line for fluid overload in ADHF." },
                { id: "b", text: "Spironolactone", correct: false },
                { id: "c", text: "Bendroflumethiazide", correct: false },
                { id: "d", text: "Acetazolamide", correct: false }
              ]
            },
            {
              id: "6D-A-q2",
              stem: "What is the correct positioning for this patient?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Upright with legs dangling", correct: true, explanation: "Reduces venous return and preload, easing cardiac work." },
                { id: "b", text: "Supine flat", correct: false, explanation: "Supine position increases venous return and can worsen pulmonary oedema." },
                { id: "c", text: "Left lateral", correct: false, explanation: "Left lateral position is not ideal for acute pulmonary oedema." },
                { id: "d", text: "Trendelenburg", correct: false, explanation: "Trendelenburg position is not recommended for acute pulmonary oedema." }
              ]
            },
            {
              id: "6D-A-q3",
              stem: "Which vasodilator reduces afterload in ADHF?",
              timeLimit: 45,
              options: [
                { id: "a", text: "GTN infusion", correct: true, explanation: "Nitrates reduce preload and afterload, easing cardiac work." },
                { id: "b", text: "Adrenaline", correct: false, explanation: "Adrenaline increases heart rate and contractility, worsening heart failure." },
                { id: "c", text: "Phenylephrine", correct: false, explanation: "Phenylephrine is a vasopressor that increases blood pressure but does not reduce afterload." },
                { id: "d", text: "Noradrenaline", correct: false, explanation: "Noradrenaline is a potent vasopressor used in septic shock, not first-line for ADHF." }
              ]
            }
          ]
        },
        {
          id: "6D-B",
          title: "Atrial Fibrillation with RVR",
          mechanics: "mcq",
          objective: "Decide between rate and rhythm control",
          scenario: "Patient with palpitations. ECG: Irregularly irregular, no P-waves, rate 150.",
          questions: [
            {
              id: "6D-B-q1",
              stem: "What is the primary risk of untreated AF?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ischaemic Stroke", correct: true, explanation: "Stasis of blood in atria leads to clot formation. CHA2DS2-VASc guides anticoagulation." },
                { id: "b", text: "Ventricular fibrillation", correct: false, explanation: "Ventricular fibrillation is a different arrhythmia and not a direct risk of untreated AF." },
                { id: "c", text: "Complete heart block", correct: false, explanation: "Complete heart block is not a typical complication of untreated AF." },
                { id: "d", text: "Hypertrophic cardiomyopathy", correct: false, explanation: "Hypertrophic cardiomyopathy is a structural heart disease, not directly related to AF." }
              ]
            },
            {
              id: "6D-B-q2",
              stem: "For acute AF <48 hours with haemodynamic compromise, what is the treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Emergency electrical cardioversion", correct: true, explanation: "Haemodynamic instability = immediate cardioversion regardless of anticoagulation status." },
                { id: "b", text: "Amiodarone infusion and wait", correct: false, explanation: "Amiodarone is used for rate control but not as a first-line treatment for acute AF." },
                { id: "c", text: "Rate control with beta-blockers only", correct: false, explanation: "Rate control is important but not sufficient alone in haemodynamically unstable patients." },
                { id: "d", text: "Anticoagulate for 3 weeks then cardiovert", correct: false, explanation: "Anticoagulation is necessary before cardioversion but not the immediate treatment for haemodynamic compromise." }
              ]
            }
          ]
        },
        {
          id: "6D-C",
          title: "NSTEMI Management",
          mechanics: "drag_drop",
          objective: "Apply the correct antithrombotic regimen",
          scenario: "Patient with chest pain, troponin rising, ST depression in V4-V6.",
          questions: [
            {
              id: "6D-C-q1",
              stem: "Match the medication to its correct indication in NSTEMI.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Aspirin 300mg", indication: "Antiplatelet - all ACS" },
                { id: "b", label: "Ticagrelor 180mg", indication: "Dual antiplatelet with aspirin" },
                { id: "c", label: "Fondaparinux", indication: "Anticoagulant of choice in ACS" },
                { id: "d", label: "Morphine", indication: "Pain relief if refractory to GTN" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "Dual antiplatelet + anticoagulation is standard NSTEMI treatment." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the indications for each medication in NSTEMI management." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the indications for each medication in NSTEMI management." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "6N-A",
          title: "Fluid Balance Masterclass",
          mechanics: "text_input",
          objective: "Calculate and maintain strict I/O charts",
          scenario: "Patient in heart failure on IV Furosemide. Weight 70kg yesterday, 72kg today.",
          questions: [
            {
              id: "6N-A-q1",
              stem: "What does a 2kg weight gain in 24 hours represent?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Fluid retention of approximately 2 litres", correct: true, explanation: "1kg weight gain ≈ 1L fluid retention in acute settings." },
                { id: "b", text: "Muscle gain from nutrition", correct: false, explanation: "Muscle gain does not occur acutely and would not explain a 2kg increase in 24 hours." },
                { id: "c", text: "Normal variation", correct: false, explanation: "Normal variation would not result in a 2kg gain in 24 hours." },
                { id: "d", text: "Equipment error", correct: false, explanation: "Equipment error is a possibility but less likely than fluid retention." }
              ]
            },
            {
              id: "6N-A-q2",
              stem: "What is the minimum urine output target for this patient?",
              timeLimit: 45,
              textAnswer: "35",
              tolerance: 5,
              options: [
                { id: "a", text: "0.5 ml/kg/hour = 35 ml/hour", correct: true, explanation: "Minimum acceptable urine output is 0.5 ml/kg/hr." },
                { id: "b", text: "1 ml/kg/hour", correct: false, explanation: "1 ml/kg/hr is a more aggressive target and not the minimum standard." },
                { id: "c", text: "100 ml/hour regardless of weight", correct: false, explanation: "The minimum target is based on weight." }
              ]
            }
          ]
        },
        {
          id: "6N-B",
          title: "Cardiac Monitoring",
          mechanics: "hotspot",
          objective: "Identify arrhythmias on cardiac monitor",
          scenario: "Telemetry alarm sounding. Identify the rhythm and respond appropriately.",
          image: "/images/telemetry_afib.jpeg",
          questions: [
            {
              id: "6N-B-q1",
              stem: "Click on the irregular R-R intervals characteristic of AF.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Variable R-R intervals", correct: true, explanation: "AF shows irregularly irregular ventricular response." },
                { id: "b", text: "Regular P waves before each QRS", correct: false, explanation: "Regular P waves indicate sinus rhythm." },
                { id: "c", text: "Consistent PR interval", correct: false, explanation: "Consistent PR interval indicates a regular rhythm." },
                { id: "d", text: "Fixed heart rate", correct: false, explanation: "Fixed heart rate is characteristic of atrial flutter or fibrillation with a fixed AV conduction ratio." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 07: GASTROENTEROLOGY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    num: "07",
    level: "junior_residency",
    title: "Gastroenterology",
    subtitle: "GI Bleeding, Liver & Pancreas",
    tagline: "The gut reveals what the patient hides.",
    estimatedMinutes: { doctor: 55, nurse: 50 },
    passMark: 75,
    xpReward: 250,
    media: {
      images: {
        "7A": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800"
      },
      ambience: "/audio/gi_bleed_ambience.mp3",
      pdfs: { "nice_gi": "/pdfs/class07_gi_bleed.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "7D-A",
          title: "Upper GI Bleed",
          mechanics: "mcq",
          objective: "Risk stratify using Rockall score and manage actively bleeding patient",
          scenario: "45-year-old male, vomiting bright red blood. HR 120, BP 90/60. Known alcoholic liver disease.",
          questions: [
            {
              id: "7D-A-q1",
              stem: "What is the priority drug in suspected variceal bleeding?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Terlipressin", correct: true, explanation: "Terlipressin reduces portal pressure in variceal bleeding." },
                { id: "b", text: "Omeprazole", correct: false, explanation: "Omeprazole is used for peptic ulcer bleeding, not variceal bleeding." },
                { id: "c", text: "Tranexamic acid", correct: false, explanation: "Tranexamic acid is used for bleeding disorders, not specifically variceal bleeding." },
                { id: "d", text: "Octreotide", correct: false, explanation: "Octreotide is used for variceal bleeding but is not the priority drug." }
              ]
            },
            {
              id: "7D-A-q2",
              stem: "What is the target haemoglobin threshold for transfusion in UGIB?",
              timeLimit: 45,
              options: [
                { id: "a", text: "70 g/L (or 80 g/L if cardiovascular disease)", correct: true, explanation: "Restrictive transfusion strategy (Hb 70-80) improves outcomes vs liberal strategy." },
                { id: "b", text: "100 g/L", correct: false, explanation: "100 g/L is a higher threshold and not the minimum standard." },
                { id: "c", text: "90 g/L for all patients", correct: false, explanation: "The target is based on the patient's clinical status and not a fixed value." },
                { id: "d", text: "Transfuse to normal regardless", correct: false, explanation: "Transfusing to normal levels regardless of the patient's condition is not the recommended approach." }
              ]
            },
            {
              id: "7D-A-q3",
              stem: "When should antibiotics be given in cirrhotic patients with GI bleed?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 1 hour to all cirrhotics with GI bleed", correct: true, explanation: "Antibiotics reduce infection and mortality in cirrhotic patients with GI bleed." },
                { id: "b", text: "Only if fever develops", correct: false, explanation: "Antibiotics should be given prophylactically, not only if fever develops." },
                { id: "c", text: "After endoscopy only", correct: false, explanation: "Antibiotics should be given before endoscopy in high-risk patients." },
                { id: "d", text: "Not indicated", correct: false, explanation: "Antibiotics are indicated in cirrhotic patients with GI bleed." }
              ]
            }
          ]
        },
        {
          id: "7D-B",
          title: "Acute Pancreatitis",
          mechanics: "mcq",
          objective: "Calculate Glasgow score and manage complications",
          scenario: "55-year-old with severe epigastric pain radiating to back. Amylase 1200. Obese, alcoholic.",
          questions: [
            {
              id: "7D-B-q1",
              stem: "Which scoring system predicts severity in pancreatitis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Glasgow (Imrie) score", correct: true, explanation: "Glasgow score at 48 hours predicts severity and mortality." },
                { id: "b", text: "CURB-65", correct: false, explanation: "CURB-65 is used for pneumonia severity, not pancreatitis." },
                { id: "c", text: "Rockall score", correct: false, explanation: "Rockall score is used for upper GI bleeding, not pancreatitis." },
                { id: "d", text: "CHADS2-VASc", correct: false, explanation: "CHADS2-VASc is used for stroke risk assessment, not pancreatitis." }
              ]
            },
            {
              id: "7D-B-q2",
              stem: "What is the primary initial management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Aggressive IV fluids (250-500ml/hr)", correct: true, explanation: "Early aggressive fluid resuscitation reduces SIRS and organ failure." },
                { id: "b", text: "NPO and nil by mouth for 48 hours", correct: false, explanation: "NPO and nil by mouth for 48 hours is a secondary measure." },
                { id: "c", text: "Immediate ERCP", correct: false, explanation: "Immediate ERCP is not the primary initial management." },
                { id: "d", text: "Prophylactic antibiotics", correct: false, explanation: "Prophylactic antibiotics are not the primary initial management." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "7N-A",
          title: "Assessing Melaena",
          mechanics: "mcq",
          objective: "Identify characteristics of upper GI bleeding",
          scenario: "Patient reports 'black tarry stools' for 2 days. Feeling dizzy on standing.",
          questions: [
            {
              id: "7N-A-q1",
              stem: "Melaena typically indicates bleeding from where?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Upper GI tract (above D-J flexure)", correct: true, explanation: "Black tarry stool results from digestion of blood by gastric acid." },
                { id: "b", text: "Lower GI tract (rectum)", correct: false, explanation: "Lower GI bleeding typically results in bright red blood in stool." },
                { id: "c", text: "Small bowel only", correct: false, explanation: "Small bowel bleeding is less common and usually presents differently." },
                { id: "d", text: "Any GI source", correct: false, explanation: "Melaena specifically indicates upper GI bleeding." }
              ]
            },
            {
              id: "7N-A-q2",
              stem: "What is the significance of 'coffee ground' vomiting?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Partially digested blood from gastric source", correct: true, explanation: "Coffee ground appearance = blood exposed to gastric acid." },
                { id: "b", text: "Bile-stained vomit", correct: false, explanation: "Bile-stained vomit is associated with biliary obstruction." },
                { id: "c", text: "Faeculent vomiting", correct: false, explanation: "Faeculent vomiting is associated with intestinal obstruction." },
                { id: "d", text: "Normal finding", correct: false, explanation: "Normal finding is not associated with coffee ground vomiting." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 08: NEUROLOGY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 8,
    num: "08",
    level: "junior_residency",
    title: "Neurology",
    subtitle: "Stroke, Seizures & Altered Consciousness",
    tagline: "Time is brain. Every minute costs millions of neurons.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 80,
    xpReward: 300,
    media: {
      images: {
        "8A": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
        "8B": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
      },
      ambience: "/audio/neuro_ward.mp3",
      pdfs: { "nice_stroke": "/pdfs/class08_stroke.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "8D-A",
          title: "Acute Ischaemic Stroke",
          mechanics: "mcq",
          objective: "Apply thrombolysis criteria and manage hyperacute stroke",
          scenario: "FAST positive. Symptoms started 90 minutes ago. CT shows no bleed. BP 185/110.",
          questions: [
            {
              id: "8D-A-q1",
              stem: "What is the standard time window for IV Thrombolysis (Alteplase)?",
              timeLimit: 45,
              options: [
                { id: "a", text: "4.5 hours from symptom onset", correct: true, explanation: "EXTEND trial extended window to 4.5h for selected patients." },
                { id: "b", text: "12 hours", correct: false, explanation: "12 hours is outside the standard time window for IV thrombolysis." },
                { id: "c", text: "6 hours", correct: false, explanation: "6 hours is outside the standard time window for IV thrombolysis." },
                { id: "d", text: "24 hours", correct: false, explanation: "24 hours is outside the standard time window for IV thrombolysis." }
              ]
            },
            {
              id: "8D-A-q2",
              stem: "What BP threshold must be achieved before giving Alteplase?",
              timeLimit: 45,
              options: [
                { id: "a", text: "<185 systolic and <110 diastolic", correct: true, explanation: "Must reduce BP below these thresholds to reduce bleeding risk." },
                { id: "b", text: "<200 systolic", correct: false, explanation: "BP threshold is more specific." },
                { id: "c", text: "<140/90", correct: false, explanation: "This is a general BP target, not specific for thrombolysis." },
                { id: "d", text: "No threshold - give immediately", correct: false, explanation: "A BP threshold is required before administering thrombolysis." }
              ]
            },
            {
              id: "8D-A-q3",
              stem: "Which is an absolute contraindication to thrombolysis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Recent intracranial haemorrhage (<3 months)", correct: true, explanation: "Recent ICH is absolute contraindication due to recurrence risk." },
                { id: "b", text: "Age >80", correct: false, explanation: "Age is not an absolute contraindication." },
                { id: "c", text: "Diabetes mellitus", correct: false, explanation: "Diabetes is not an absolute contraindication." },
                { id: "d", text: "Previous stroke >1 year ago", correct: false, explanation: "Previous stroke is not an absolute contraindication." }
              ]
            }
          ]
        },
        {
          id: "8D-B",
          title: "Status Epilepticus",
          mechanics: "mcq",
          objective: "Execute the status epilepticus algorithm",
          scenario: "Patient seizing for 12 minutes. Two doses of lorazepam given. Still convulsing.",
          questions: [
            {
              id: "8D-B-q1",
              stem: "What is the definition of status epilepticus?",
              timeLimit: 45,
              options: [
                { id: "a", text: ">5 minutes of continuous seizures or >2 discrete seizures without recovery", correct: true, explanation: "Operational definition: seizure >5 min or recurrent without consciousness recovery." },
                { id: "b", text: ">30 minutes", correct: false, explanation: "30 minutes is not the standard definition for status epilepticus." },
                { id: "c", text: "Any seizure lasting >2 minutes", correct: false, explanation: "This is not the standard definition for status epilepticus." },
                { id: "d", text: ">3 seizures in 1 hour", correct: false, explanation: "This is not the standard definition for status epilepticus." }
              ]
            },
            {
              id: "8D-B-q2",
              stem: "What is the second-line agent after benzodiazepines fail?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Phenytoin or Levetiracetam", correct: true, explanation: "Load with phenytoin 20mg/kg or levetiracetam 60mg/kg after benzodiazepines." },
                { id: "b", text: "More lorazepam", correct: false, explanation: "Lorazepam is a first-line agent." },
                { id: "c", text: "Immediate thiopental", correct: false, explanation: "Thiopental is used in refractory status epilepticus." },
                { id: "d", text: "Paraldehyde", correct: false, explanation: "Paraldehyde is rarely used due to its toxicity." }
              ]
            },
            {
              id: "8D-B-q3",
              stem: "What is the most common cause of refractory status in adults?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Anti-epileptic medication non-adherence", correct: true, explanation: "Medication non-compliance is the most common precipitant." },
                { id: "b", text: "Brain tumour only", correct: false, explanation: "Brain tumour is not the most common cause." },
                { id: "c", text: "Hypoglycaemia", correct: false, explanation: "Hypoglycaemia is not the most common cause." },
                { id: "d", text: "Alcohol withdrawal only", correct: false, explanation: "Alcohol withdrawal is not the most common cause." }
              ]
            }
          ]
        },
        {
          id: "8D-C",
          title: "Meningitis",
          mechanics: "mcq",
          objective: "Recognize meningitis and start empirical antibiotics",
          scenario: "Fever, headache, neck stiffness, photophobia. GCS 13. Rash developing.",
          questions: [
            {
              id: "8D-C-q1",
              stem: "What is the priority before LP if altered consciousness or focal signs?",
              timeLimit: 45,
              options: [
                { id: "a", text: "CT head to exclude mass effect/herniation risk", correct: true, explanation: "CT before LP if GCS<13, focal signs, papilloedema, or immunocompromise." },
                { id: "b", text: "Immediate LP regardless", correct: false, explanation: "Immediate LP is not recommended if there are signs of increased intracranial pressure." },
                { id: "c", text: "MRI brain", correct: false, explanation: "MRI is not the first-line imaging modality for suspected meningitis." },
                { id: "d", text: "EEG", correct: false, explanation: "EEG is not used for diagnosing meningitis." }
              ]
            },
            {
              id: "8D-C-q2",
              stem: "What is the empirical antibiotic regimen for suspected bacterial meningitis in adults?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ceftriaxone + Vancomycin + Ampicillin (if >50 or immunocompromised)", correct: true, explanation: "Covers S.pneumoniae, N.meningitidis, and L.monocytogenes in older/immunocompromised." },
                { id: "b", text: "Amoxicillin alone", correct: false, explanation: "Amoxicillin is not effective against the most common causative organisms." },
                { id: "c", text: "Metronidazole", correct: false, explanation: "Metronidazole is not used for empirical treatment of bacterial meningitis." },
                { id: "d", text: "Ciprofloxacin", correct: false, explanation: "Ciprofloxacin is not the first-line agent for bacterial meningitis." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "8N-A",
          title: "NIHSS Assessment",
          mechanics: "drag_drop",
          objective: "Perform systematic stroke assessment",
          scenario: "Post-thrombolysis patient. Monitor for neurological deterioration.",
          questions: [
            {
              id: "8N-A-q1",
              stem: "Match the NIHSS component to what you are assessing.",
              timeLimit: 90,
              dragItems: [
                { id: "1a", label: "1a. Level of consciousness", item: "Alertness/arousal" },
                { id: "1b", label: "1b. LOC questions", item: "Month and age" },
                { id: "2", label: "2. Best gaze", item: "Eye movement" },
                { id: "3", label: "3. Visual fields", item: "Quadrant testing" },
                { id: "4", label: "4. Facial palsy", item: "Symmetry of smile/eyelids" },
                { id: "5", label: "5. Motor arm", item: "Drift over 10 seconds" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "NIHSS is standardized - consistency is crucial for detecting change." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the NIHSS components and their corresponding assessments." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the NIHSS components and their corresponding assessments." }
              ]
            },
            {
              id: "8N-A-q2",
              stem: "A drop in GCS by 2 points should trigger what?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Immediate medical review", correct: true, explanation: "Any neurological deterioration post-thrombolysis requires urgent assessment for bleeding." },
                { id: "b", text: "Repeat temp check", correct: false, explanation: "Repeat temperature check is not the immediate priority." },
                { id: "c", text: "Continue observations", correct: false, explanation: "Continue observations are important but not the immediate priority." },
                { id: "d", text: "Give paracetamol", correct: false, explanation: "Paracetamol is not the appropriate intervention for neurological deterioration." }
              ]
            }
          ]
        },
        {
          id: "8N-B",
          title: "Seizure First Aid",
          mechanics: "mcq",
          objective: "Protect patient during seizure and recognize when to call for help",
          scenario: "Patient on ward starts convulsing. Family present and distressed.",
          questions: [
            {
              id: "8N-B-q1",
              stem: "What is your FIRST action?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Call for help and note time", correct: true, explanation: "Timing is crucial - status epilepticus is >5 minutes. Call for help immediately." },
                { id: "b", text: "Put something in patient's mouth", correct: false, explanation: "Putting something in the patient's mouth can cause injury." },
                { id: "c", text: "Restrain the patient", correct: false, explanation: "Restraint can cause injury and is not the appropriate intervention." },
                { id: "d", text: "Give oral medication", correct: false, explanation: "Oral medication is not suitable during an active seizure."  }
              ]
            },
            {
              id: "8N-B-q2",
              stem: "When should you administer rescue benzodiazepines?",
              timeLimit: 45,
              options: [
                { id: "a", text: "If seizure >5 minutes or recurrent without recovery", correct: true, explanation: "Pre-hospital/ward buccal midazolam if seizure prolonged." },
                { id: "b", text: "Immediately for any seizure", correct: false, explanation: "Rescue benzodiazepines are not indicated for all seizures." },
                { id: "c", text: "Only if patient requests", correct: false, explanation: "Patient request is not a valid indication for rescue medication." },
                { id: "d", text: "After 30 minutes only", correct: false, explanation: "Delaying treatment can be harmful in status epilepticus." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 09: RENAL MEDICINE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 9,
    num: "09",
    level: "junior_residency",
    title: "Renal Medicine",
    subtitle: "AKI, Electrolytes & Dialysis",
    tagline: "The kidneys whisper before they scream. Listen carefully.",
    estimatedMinutes: { doctor: 55, nurse: 50 },
    passMark: 75,
    xpReward: 275,
    media: {
      images: {
        "9A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/renal_unit.mp3",
      pdfs: { "renal_assoc": "/pdfs/class09_aki.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "9D-A",
          title: "Hyperkalaemia Emergency",
          mechanics: "mcq",
          objective: "Execute the hyperkalaemia algorithm and interpret ECG changes",
          scenario: "K+ 7.1 mmol/L. ECG shows wide QRS, sine wave pattern developing. Dialysis patient missed session.",
          questions: [
            {
              id: "9D-A-q1",
              stem: "Which drug 'protects the heart' but does NOT lower potassium?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Calcium Gluconate/Chloride", correct: true, explanation: "Calcium stabilizes cardiac membrane but does not reduce K+ levels." },
                { id: "b", text: "Insulin/Dextrose", correct: false, explanation: "Insulin/Dextrose lowers K+ levels." },
                { id: "c", text: "Salbutamol", correct: false, explanation: "Salbutamol lowers K+ levels." },
                { id: "d", text: "Calcium Resonium", correct: false, explanation: "Calcium Resonium is not a standard treatment for hyperkalaemia." }
              ]
            },
            {
              id: "9D-A-q2",
              stem: "What is the definitive treatment for refractory hyperkalaemia in this dialysis patient?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Emergency haemodialysis", correct: true, explanation: "Dialysis is definitive treatment for life-threatening hyperkalaemia in renal failure." },
                { id: "b", text: "More insulin/dextrose", correct: false, explanation: "Insulin/dextrose is a temporary measure and not definitive." },
                { id: "c", text: "Sodium bicarbonate only", correct: false, explanation: "Sodium bicarbonate can help shift K+ intracellularly but is not definitive." },
                { id: "d", text: "Fluid challenge", correct: false, explanation: "Fluid challenge is not a standard treatment for hyperkalaemia." }
              ]
            },
            {
              id: "9D-A-q3",
              stem: "How quickly does insulin/dextrose shift K+ intracellularly?",
              timeLimit: 45,
              options: [
                { id: "a", text: "15-30 minutes", correct: true, explanation: "Onset 15-30 min, peak 30-60 min, lasts 2-6 hours. Temporary measure only." },
                { id: "b", text: "4-6 hours", correct: false, explanation: "4-6 hours is the duration of effect, not the onset." },
                { id: "c", text: "Immediately", correct: false, explanation: "Immediate effect is not characteristic of insulin/dextrose." },
                { id: "d", text: "24 hours", correct: false, explanation: "24 hours is too slow for clinical intervention." }
              ]
            }
          ]
        },
        {
          id: "9D-B",
          title: "Acute Kidney Injury Staging",
          mechanics: "mcq",
          objective: "Apply KDIGO criteria and determine cause",
          scenario: "Creatinine rose from 80 to 280 μmol/L over 48 hours. Urine output 15ml/hour. Patient septic.",
          questions: [
            {
              id: "9D-B-q1",
              stem: "What KDIGO stage is creatinine 3.5× baseline?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Stage 3", correct: true, explanation: "Stage 3: Creatinine ≥3× baseline or ≥354 μmol/L with acute rise, or urine output <0.3ml/kg/hr for ≥24h." },
                { id: "b", text: "Stage 1", correct: false, explanation: "Stage 1: Creatinine <2× baseline." },
                { id: "c", text: "Stage 2", correct: false, explanation: "Stage 2: Creatinine 2× baseline." },
                { id: "d", text: "Not AKI", correct: false, explanation: "This patient has AKI based on the criteria." }
              ]
            },
            {
              id: "9D-B-q2",
              stem: "What is the most likely cause in this septic patient?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Pre-renal (hypoperfusion)", correct: true, explanation: "Sepsis causes vasodilation and hypoperfusion - pre-renal AKI." },
                { id: "b", text: "Post-renal (obstruction)", correct: false, explanation: "Post-renal AKI is caused by urinary tract obstruction." },
                { id: "c", text: "Glomerulonephritis", correct: false, explanation: "Glomerulonephritis is a cause of intrinsic renal disease." },
                { id: "d", text: "Interstitial nephritis", correct: false, explanation: "Interstitial nephritis is a cause of intrinsic renal disease." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "9N-A",
          title: "Urine Output Monitoring",
          mechanics: "text_input",
          objective: "Calculate hourly urine output and identify oliguria",
          scenario: "AKI Stage 3 patient. Last 4 hours urine: 45ml, 38ml, 52ml, 35ml. Weight 70kg.",
          questions: [
            {
              id: "9N-A-q1",
              stem: "Calculate the average hourly urine output.",
              timeLimit: 60,
              textAnswer: "42.5",
              tolerance: 2,
              options: [
                { id: "a", text: "42.5 ml/hour", correct: true, explanation: "Total 170ml ÷ 4 hours = 42.5 ml/hr." },
                { id: "b", text: "170 ml/hour", correct: false, explanation: "This would be the total urine output over 4 hours." },
                { id: "c", text: "10.6 ml/hour", correct: false, explanation: "This is not the correct calculation for the average hourly urine output." }
              ]
            },
            {
              id: "9N-A-q2",
              stem: "What is the definition of oliguria?",
              timeLimit: 45,
              options: [
                { id: "a", text: "<0.5 ml/kg/hour", correct: true, explanation: "Oliguria = <0.5 ml/kg/hr. For 70kg = <35 ml/hr. This patient is borderline." },
                { id: "b", text: "<1.0 ml/kg/hour", correct: false, explanation: "This is the definition of polyuria." },
                { id: "c", text: "<100 ml/day", correct: false, explanation: "This is the definition of anuria." },
                { id: "d", text: "<400 ml/day", correct: false, explanation: "This is the definition of oliguria." }
              ]
            }
          ]
        },
        {
          id: "9N-B",
          title: "Dialysis Access Care",
          mechanics: "mcq",
          objective: "Protect vascular access and detect complications",
          scenario: "Haemodialysis patient with AV fistula in left arm. Preparing for cannulation.",
          questions: [
            {
              id: "9N-B-q1",
              stem: "Which intervention is CONTRAINDICATED in the fistula arm?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Blood pressure measurement", correct: true, explanation: "Never use fistula arm for BP, venepuncture, or cannulation - preserves vessel." },
                { id: "b", text: "Palpating for thrill", correct: false, explanation: "This is a normal assessment for a functioning fistula." },
                { id: "c", text: "Auscultating for bruit", correct: false, explanation: "This is a normal assessment for a functioning fistula." },
                { id: "d", text: "Checking for warmth", correct: false, explanation: "This is a normal assessment for a functioning fistula." }
              ]
            },
            {
              id: "9N-B-q2",
              stem: "What does loss of thrill indicate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Thrombosis - vascular emergency", correct: true, explanation: "Loss of thrill/bruit suggests thrombosis - requires urgent surgical review." },
                { id: "b", text: "Normal healing", correct: false, explanation: "Loss of thrill is not a sign of normal healing." },
                { id: "c", text: "Infection", correct: false, explanation: "Infection would present with other signs like redness, warmth, or purulent discharge." },
                { id: "d", text: "Successful maturation", correct: false, explanation: "Successful maturation would be indicated by the presence of a thrill and bruit." }
              ]
            }
          ]
        }
      ]
    }
  }
];