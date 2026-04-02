// ─────────────────────────────────────────────────────────────────────────────
// MEDINOVA — JUNIOR RESIDENCY LEVEL (CLASSES 05–09)
// ─────────────────────────────────────────────────────────────────────────────

export const JUNIOR_RESIDENCY = [
  // CLASS 05: RESPIRATORY MEDICINE
  {
    id: 5,
    num: "05",
    level: "junior_residency",
    title: "Respiratory Medicine",
    subtitle: "Acute Exacerbation of COPD & Asthma",
    tagline: "Airway is the first A. Don't let it fail.",
    estimatedMinutes: { doctor: 50, nurse: 45 },
    passMark: 75,
    xpReward: 250,
    media: {
      images: { "5-i": "https://i.ibb.co/6sm91sb7u0000/resus.jpg" },
      ambience: "/audio/ed_ambience.mp3",
    },
    doctor: {
      sims: [
        {
          id: "5D-A",
          title: "Case 1: The CO2 Retainer",
          scenario: "Mr. Henderson, 72, COPD. SpO2 is 84% on air. He is drowsy and has a flapping tremor.",
          task: "Interpret the Arterial Blood Gas (ABG) and titrate oxygen therapy.",
          questions: [
            {
              id: "q1",
              stem: "The ABG shows pH 7.24, pCO2 9.2 kPa, pO2 7.1 kPa. What is the diagnosis?",
              options: [
                { id: "a", text: "Type 2 Respiratory Failure (Acidotic)", correct: true, explanation: "High CO2 with a low pH indicates the patient is failing to ventilate, leading to respiratory acidosis." },
                { id: "b", text: "Type 1 Respiratory Failure", correct: false }
              ]
            },
            {
              id: "q2",
              stem: "What is the immediate management for this acidotic Type 2 failure?",
              options: [
                { id: "a", text: "Non-Invasive Ventilation (NIV/BiPAP)", correct: true, explanation: "NIV provides pressure support to help the patient blow off excess CO2." },
                { id: "b", text: "15L Non-rebreathe mask", correct: false, explanation: "Too much oxygen can worsen CO2 retention in these patients." }
              ]
            }
          ]
        },
        {
          id: "5D-B",
          title: "Case 2: Life-Threatening Asthma",
          scenario: "A 24-year-old is brought in. Peak flow is 25% of predicted. Chest is silent.",
          task: "Identify 'Silent Chest' and escalate to ICU.",
          questions: [
            {
              id: "q1",
              stem: "What does a 'Silent Chest' in acute asthma signify?",
              options: [
                { id: "a", text: "Impending respiratory arrest", correct: true, explanation: "It means there is so little air movement that a wheeze cannot even be heard. This is a pre-terminal sign." },
                { id: "b", text: "Recovery", correct: false }
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
          title: "Case 1: Controlled Oxygen Delivery",
          scenario: "Doctor orders oxygen at a target of 88-92%.",
          task: "Select the correct Venturi mask and flow rate.",
          questions: [
            {
              id: "q1",
              stem: "Which color Venturi valve provides exactly 24% oxygen?",
              options: [
                { id: "a", text: "Blue", correct: true, explanation: "Blue is 24%, White is 28%, Orange is 31%, Yellow is 35%, Red is 40%." },
                { id: "b", text: "Red", correct: false }
              ]
            }
          ]
        },
        {
          id: "5N-B",
          title: "Case 2: The Inhaler Technique",
          scenario: "Patient is ready for discharge. You must verify their MDI technique.",
          task: "Assess the use of a Spacer device.",
          questions: [
            {
              id: "q1",
              stem: "Why is a Spacer recommended for steroid inhalers?",
              options: [
                { id: "a", text: "To reduce risk of oral thrush and improve lung deposition", correct: true, explanation: "Spacers slow down the particles, ensuring they hit the lungs rather than the back of the throat." },
                { id: "b", text: "To make it smell better", correct: false }
              ]
            }
          ]
        }
      ]
    }
  },

  // CLASS 06: CARDIOLOGY
  {
    id: 6,
    num: "06",
    title: "Cardiology",
    subtitle: "Heart Failure & Arrhythmias",
    doctor: {
      sims: [
        {
          id: "6D-A",
          title: "Case 1: Acute Pulmonary Oedema",
          scenario: "A 78-year-old is 'drowning' in fluid. Fine crackles to the mid-zones. BP 170/100.",
          task: "Prescribe the 'POD' (Propped up, Oxygen, Diuretics) protocol.",
          questions: [
            { id: "q1", stem: "Which IV diuretic is first-line for fluid overload?", options: [{text: "Furosemide", correct: true}, {text: "Spironolactone", correct: false}] }
          ]
        },
        {
          id: "6D-B",
          title: "Case 2: Atrial Fibrillation",
          scenario: "Patient has palpitations. ECG shows 'irregularly irregular' rhythm with no P-waves.",
          task: "Decide between Rate and Rhythm control.",
          questions: [
            { id: "q1", stem: "What is the primary risk of untreated AF?", options: [{text: "Ischaemic Stroke", correct: true, explanation: "Stasis of blood in the atria leads to clot formation."}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "6N-A",
          title: "Case 1: Fluid Balance Masterclass",
          scenario: "Patient in heart failure is on IV Furosemide.",
          task: "Maintain a strict Intake/Output (I/O) chart.",
          questions: [
            { id: "q1", stem: "If a patient gains 2kg in 24 hours, what does this likely represent?", options: [{text: "Fluid Retention", correct: true}, {text: "Muscle Gain", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 07: GASTROENTEROLOGY
  {
    id: 7,
    num: "07",
    title: "Gastroenterology",
    subtitle: "The Upper GI Bleed",
    doctor: {
      sims: [
        {
          id: "7D-A",
          title: "Case 1: The Rockall Score",
          scenario: "45-year-old male, vomiting bright red blood. HR 120, BP 90/60.",
          task: "Risk stratify the bleed and prepare for endoscopy.",
          questions: [
            { id: "q1", stem: "What is the priority drug in suspected variceal bleeding?", options: [{text: "Terlipressin", correct: true}, {text: "Omeprazole", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "7N-A",
          title: "Case 1: Assessing Melaena",
          scenario: "Patient reports 'black tarry stools'.",
          task: "Identify the characteristic appearance of melaena.",
          questions: [
            { id: "q1", stem: "Melaena typically indicates bleeding from where?", options: [{text: "Upper GI tract (above D-J flexure)", correct: true}, {text: "Lower GI tract (Rectum)", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 08: NEUROLOGY
  {
    id: 8,
    num: "08",
    title: "Neurology",
    subtitle: "Acute Stroke & Seizures",
    doctor: {
      sims: [
        {
          id: "8D-A",
          title: "Case 1: The Thrombolysis Window",
          scenario: "FAST positive patient. Symptoms started 2 hours ago. CT shows no bleed.",
          task: "Calculate the NIHSS score and authorize Alteplase.",
          questions: [
            { id: "q1", stem: "What is the standard time window for IV Thrombolysis in stroke?", options: [{text: "4.5 hours", correct: true}, {text: "12 hours", correct: false}] }
          ]
        },
        {
          id: "8D-B",
          title: "Case 2: Status Epilepticus",
          scenario: "Patient has been seizing for 10 minutes without stopping.",
          task: "Administer the benzodiazepine protocol.",
          questions: [
            { id: "q1", stem: "What is the first-line IV drug for active seizures?", options: [{text: "Lorazepam", correct: true}, {text: "Phenytoin", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "8N-A",
          title: "Case 1: The NIHSS Assessment",
          scenario: "Monitoring a post-stroke patient every 15 minutes.",
          task: "Detect early signs of neurological hemorrhagic transformation.",
          questions: [
            { id: "q1", stem: "A drop in GCS by 2 points should trigger what?", options: [{text: "Immediate Medical Review", correct: true}, {text: "A repeat temp check", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 09: RENAL MEDICINE
  {
    id: 9,
    num: "09",
    title: "Renal Medicine",
    subtitle: "AKI & Metabolic Emergencies",
    doctor: {
      sims: [
        {
          id: "9D-A",
          title: "Case 1: The 'Sine Wave' ECG",
          scenario: "Potassium is 7.1. ECG shows wide QRS complexes.",
          task: "Execute the Hyperkalaemia Emergency protocol.",
          questions: [
            { id: "q1", stem: "Which drug 'protects the heart' but does not lower potassium?", options: [{text: "Calcium Gluconate", correct: true}, {text: "Insulin/Dextrose", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "9N-A",
          title: "Case 1: UOP Monitoring",
          scenario: "Patient is diagnosed with AKI Stage 3.",
          task: "Calculate the hourly urine output target.",
          questions: [
            { id: "q1", stem: "What is the definition of Oliguria?", options: [{text: "< 0.5 ml/kg/hr", correct: true}, {text: "< 1.5 ml/kg/hr", correct: false}] }
          ]
        }
      ]
    }
  }
];