// ─────────────────────────────────────────────────────────────────────────────
// MEDINOVA — CLERKSHIP LEVEL (CLASSES 01–04)
// ─────────────────────────────────────────────────────────────────────────────

export const CLERKSHIP = [
  // CLASS 01: THE BASELINE ASSESSMENT
  {
    id: 1,
    num: "01",
    level: "clerkship",
    title: "The Baseline Assessment",
    subtitle: "History, Examination & Vital Signs",
    tagline: "Before you treat, you must first see.",
    estimatedMinutes: { doctor: 45, nurse: 40 },
    passMark: 70,
    xpReward: 150,
    media: {
      images: { "1A-i": "https://i.ibb.co/tw0gVwjB/scenario1.jpg" },
      ambience: "/audio/hospital_background.mp3",
    },
    
    // --- DOCTOR TRACK ---
    doctor: {
      sims: [
        {
          id: "1D-A",
          title: "Case 1: The Chest Pain History",
          scenario: "Mr. Miller (58) presents with 'heaviness' in his chest. He is a smoker with Type 2 Diabetes.",
          task: "Elicit a SOCRATES history and identify high-risk features for ACS.",
          questions: [
            {
              id: "q1",
              stem: "The patient says the pain 'moves to my left jaw.' Which SOCRATES category does this belong to?",
              options: [
                { id: "a", text: "Site", correct: false },
                { id: "b", text: "Radiation", correct: true, explanation: "Pain moving from the primary site to another area is Radiation. Cardiac pain typically radiates to the left arm or jaw." }
              ]
            },
            {
              id: "q2",
              stem: "He mentions the pain is associated with profuse sweating (diaphoresis). What is the physiological significance of this?",
              options: [
                { id: "a", text: "Autonomic nervous system activation", correct: true, explanation: "Diaphoresis suggests a massive sympathetic surge, a red flag for myocardial infarction." },
                { id: "b", text: "Anxiety only", correct: false }
              ]
            }
          ]
        },
        {
          id: "1D-B",
          title: "Case 2: The Abdominal Exam",
          scenario: "A 22-year-old female presents with 8 hours of RIF pain. She is guarding.",
          task: "Perform a systematic palpation and identify signs of peritonitis.",
          questions: [
            {
              id: "q1",
              stem: "Where is McBurney's Point located?",
              options: [
                { id: "a", text: "1/3 of the way from the ASIS to the Umbilicus", correct: true, explanation: "This is the classic site for maximal tenderness in acute appendicitis." },
                { id: "b", text: "The midpoint of the inguinal ligament", correct: false }
              ]
            }
          ]
        },
        {
          id: "1D-C",
          title: "Case 3: Mental Capacity",
          scenario: "An elderly patient with pneumonia refuses a life-saving IV cannula. They seem confused.",
          task: "Determine if the patient has the capacity to refuse treatment.",
          questions: [
            {
              id: "q1",
              stem: "What is the first stage of the Mental Capacity Act assessment?",
              options: [
                { id: "a", text: "Check for impairment of the mind or brain", correct: true, explanation: "You must first establish if there is a functional or diagnostic impairment (e.g., delirium)." },
                { id: "b", text: "Ask the next of kin for permission", correct: false }
              ]
            }
          ]
        }
      ]
    },

    // --- NURSE TRACK ---
    nurse: {
      sims: [
        {
          id: "1N-A",
          title: "Case 1: NEWS2 Scoring",
          scenario: "A post-op patient has a Respiratory Rate of 26 and SpO2 of 93% on air.",
          task: "Calculate the NEWS2 score and initiate the correct escalation protocol.",
          questions: [
            {
              id: "q1",
              stem: "What is the maximum score for Respiratory Rate in NEWS2?",
              options: [
                { id: "a", text: "3 points", correct: true, explanation: "A RR of 25 or higher is a red-flag alert and scores 3." },
                { id: "b", text: "1 point", correct: false }
              ]
            }
          ]
        },
        {
          id: "1N-B",
          title: "Case 2: The Sepsis Screen",
          scenario: "An elderly patient has a temp of 38.9°C and is shivering. They have a urinary catheter.",
          task: "Perform a bedside sepsis screening and identify the potential source.",
          questions: [
            {
              id: "q1",
              stem: "Which vital sign is most indicative of early septic shock?",
              options: [
                { id: "a", text: "Tachycardia (High HR)", correct: true, explanation: "The body compensates for low blood volume/vasodilation by increasing the heart rate first." },
                { id: "b", text: "Hypertension", correct: false }
              ]
            }
          ]
        }
      ]
    }
  },

  // CLASS 02: INVESTIGATIONS & INTERPRETATION
  {
    id: 2,
    num: "02",
    title: "Investigations & Interpretation",
    subtitle: "Blood, Imaging & Bedside Tests",
    doctor: {
      sims: [
        {
          id: "2D-A",
          title: "Case 1: The Microcytic Anemia",
          scenario: "FBC shows Hb 85, MCV 70. Patient reports heavy periods.",
          task: "Interpret the blood film and recommend the next diagnostic step.",
          questions: [
            { id: "q1", stem: "What is the most likely cause of this microcytic anemia?", options: [{text: "Iron Deficiency", correct: true}, {text: "B12 Deficiency", correct: false}] }
          ]
        },
        {
          id: "2D-B",
          title: "Case 2: The CXR Challenge",
          scenario: "70-year-old with SOB. CXR shows blunting of the costophrenic angles.",
          task: "Identify the radiological sign of pleural effusion.",
          questions: [
            { id: "q1", stem: "What does 'blunting of the costophrenic angle' indicate?", options: [{text: "Fluid in the pleural space", correct: true}, {text: "Pneumothorax", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "2N-A",
          title: "Case 1: Phlebotomy Order of Draw",
          scenario: "You need to draw Blood Cultures, FBC, and U&Es.",
          task: "Select the correct tubes in the correct order to prevent cross-contamination.",
          questions: [
            { id: "q1", stem: "Which bottle must be filled first?", options: [{text: "Blood Culture (Aerobic)", correct: true}, {text: "EDTA (Purple)", correct: false}] }
          ]
        },
        {
          id: "2N-B",
          title: "Case 2: ECG Electrode Placement",
          scenario: "A patient reports chest pain. You need to perform a 12-lead ECG.",
          task: "Correctly place the precordial leads (V1-V6).",
          questions: [
            { id: "q1", stem: "Where is V1 placed?", options: [{text: "4th Intercostal space, right sternal edge", correct: true}, {text: "5th ICS, mid-clavicular line", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 03: ACUTE EMERGENCIES (The Crash Call)
  {
    id: 3,
    num: "03",
    title: "Acute Emergencies",
    subtitle: "Basic & Advanced Life Support",
    doctor: {
      sims: [
        {
          id: "3D-A",
          title: "Case 1: Ventricular Fibrillation",
          scenario: "Patient collapses. Monitor shows a disorganized, chaotic rhythm.",
          task: "Direct the arrest team through the shockable rhythm algorithm.",
          questions: [
            { id: "q1", stem: "When should the first dose of Adrenaline be given in VF?", options: [{text: "After the 3rd shock", correct: true}, {text: "Immediately", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "3N-A",
          title: "Case 1: Airway Management",
          scenario: "Patient is unconscious with snoring respirations.",
          task: "Select the correct airway adjunct and perform the head-tilt/chin-lift.",
          questions: [
            { id: "q1", stem: "How do you measure a Guedel (Oropharyngeal) airway?", options: [{text: "From the incisors to the angle of the jaw", correct: true}, {text: "From the nose to the earlobe", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 04: FLUIDS & SHOCK
  {
    id: 4,
    num: "04",
    title: "Fluids & Shock",
    subtitle: "The Science of Resuscitation",
    doctor: {
      sims: [
        {
          id: "4D-A",
          title: "Case 1: Hypovolaemic Shock",
          scenario: "Trauma patient, BP 80/40, HR 130. Cold peripheries.",
          task: "Prescribe an appropriate fluid bolus and target MAP.",
          questions: [
            { id: "q1", stem: "Which fluid is preferred for initial trauma resuscitation?", options: [{text: "Balanced Crystalloid (e.g. Hartmann's)", correct: true}, {text: "5% Dextrose", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "4N-A",
          title: "Case 1: Cannulation & Infusion",
          scenario: "Doctor orders 500ml Saline bolus over 15 minutes.",
          task: "Select the correct cannula gauge for rapid fluid resuscitation.",
          questions: [
            { id: "q1", stem: "Which color cannula has the largest bore for rapid fluids?", options: [{text: "Grey (16G) or Orange (14G)", correct: true}, {text: "Blue (22G)", correct: false}] }
          ]
        }
      ]
    }
  }
];