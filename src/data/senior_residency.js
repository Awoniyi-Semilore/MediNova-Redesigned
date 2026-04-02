// ─────────────────────────────────────────────────────────────────────────────
// MEDINOVA — SENIOR RESIDENCY LEVEL (CLASSES 10–14)
// ─────────────────────────────────────────────────────────────────────────────

export const SENIOR_RESIDENCY = [
  // CLASS 10: ENDOCRINE EMERGENCIES (DKA)
  {
    id: 10,
    num: "10",
    level: "senior_residency",
    title: "Endocrine Emergencies",
    subtitle: "Diabetic Ketoacidosis (DKA) & HHS",
    tagline: "The blood is turning to acid. Restore the pH.",
    estimatedMinutes: { doctor: 55, nurse: 50 },
    passMark: 80,
    xpReward: 300,
    media: {
      images: { "10-i": "https://i.ibb.co/5791542/dka_monitor.jpg" },
      audio: { "intro": "/audio/class10_intro.mp3" }
    },
    doctor: {
      sims: [
        {
          id: "10D-A",
          title: "Case 1: The DKA Protocol",
          scenario: "19-year-old Type 1 Diabetic. pH 7.1, Ketones 4.8, Glucose 28.",
          task: "Initiate Fixed-Rate Insulin Infusion (FRII) and fluid resuscitation.",
          questions: [
            {
              id: "q1",
              stem: "What is the primary goal of insulin in DKA?",
              options: [
                { id: "a", text: "To suppress ketogenesis", correct: true, explanation: "Insulin stops the breakdown of fats into ketones, which is the source of the acidosis." },
                { id: "b", text: "To lower blood glucose to 5.0 mmol/L", correct: false }
              ]
            },
            {
              id: "q2",
              stem: "When should you add 10% Dextrose to the fluid regimen?",
              options: [
                { id: "a", text: "When blood glucose drops below 14.0 mmol/L", correct: true, explanation: "This prevents hypoglycemia while allowing the FRII to continue clearing ketones." },
                { id: "b", text: "Immediately on admission", correct: false }
              ]
            }
          ]
        },
        {
          id: "10D-B",
          title: "Case 2: Cerebral Oedema Risk",
          scenario: "Young patient in DKA becomes suddenly drowsy and bradycardic.",
          task: "Identify signs of raised intracranial pressure (ICP).",
          questions: [
            { id: "q1", stem: "What is the Cushing's Triad for raised ICP?", options: [{text: "Bradycardia, Hypertension, Irregular Respiration", correct: true}, {text: "Tachycardia, Hypotension, Tachypnoea", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "10N-A",
          title: "Case 1: Hourly Metabolic Monitoring",
          scenario: "Patient is on a sliding scale and FRII.",
          task: "Perform hourly bedside ketone and glucose checks.",
          questions: [
            { id: "q1", stem: "What is the target rate of ketone reduction per hour?", options: [{text: "0.5 mmol/L per hour", correct: true}, {text: "5.0 mmol/L per hour", correct: false}] }
          ]
        },
        {
          id: "10N-B",
          title: "Case 2: Potassium Replacement",
          scenario: "Serum Potassium is 3.4 mmol/L.",
          task: "Administer premixed fluids with Potassium Chloride (KCl).",
          questions: [
            { id: "q1", stem: "What is the maximum safe rate of peripheral Potassium infusion?", options: [{text: "10 mmol/hour", correct: true}, {text: "40 mmol/hour", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 11: HEMATOLOGY
  {
    id: 11,
    num: "11",
    title: "Hematology",
    subtitle: "Vaso-occlusive Sickle Cell Crisis",
    doctor: {
      sims: [
        {
          id: "11D-A",
          title: "Case 1: Acute Chest Syndrome",
          scenario: "Sickle cell patient develops chest pain, fever, and new infiltrate on CXR.",
          task: "Identify Acute Chest Syndrome and initiate exchange transfusion.",
          questions: [
            { id: "q1", stem: "Which of these is a diagnostic criteria for Acute Chest Syndrome?", options: [{text: "New pulmonary infiltrate on CXR", correct: true}, {text: "Negative blood culture", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "11N-A",
          title: "Case 1: Aggressive Analgesia",
          scenario: "Patient in 10/10 pain. Known HbSS.",
          task: "Administer opioids within the 'Golden 30 Minutes'.",
          questions: [
            { id: "q1", stem: "What is the recommended timeframe for the first dose of analgesia?", options: [{text: "30 minutes", correct: true}, {text: "2 hours", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 12: TROPICAL MEDICINE
  {
    id: 12,
    num: "12",
    title: "Tropical Medicine",
    subtitle: "Cerebral Malaria & Viral Hemorrhagic Fevers",
    doctor: {
      sims: [
        {
          id: "12D-A",
          title: "Case 1: The Returning Traveller",
          scenario: "Patient returned from Ghana 7 days ago. High fever, rigors, confusion.",
          task: "Request Thick and Thin films and calculate parasitaemia.",
          questions: [
            { id: "q1", stem: "Which Plasmodium species is most likely to cause severe/cerebral disease?", options: [{text: "P. falciparum", correct: true}, {text: "P. vivax", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "12N-A",
          title: "Case 1: Quinine Monitoring",
          scenario: "Patient is starting IV Quinine Loading Dose.",
          task: "Monitor for cardiotoxicity and hypoglycemia.",
          questions: [
            { id: "q1", stem: "Which ECG change is most associated with Quinine toxicity?", options: [{text: "QT Prolongation", correct: true}, {text: "Shortened PR interval", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 13: OBSTETRIC EMERGENCIES
  {
    id: 13,
    num: "13",
    title: "Obstetrics",
    subtitle: "Post-Partum Haemorrhage (PPH)",
    doctor: {
      sims: [
        {
          id: "13D-A",
          title: "Case 1: The 4 Ts of PPH",
          scenario: "Patient bleeding heavily after delivery of a 4.5kg baby.",
          task: "Identify the cause: Tone, Tissue, Trauma, or Thrombin.",
          questions: [
            { id: "q1", stem: "The fundus is 'boggy.' What is the diagnosis?", options: [{text: "Uterine Atony", correct: true}, {text: "Retained Placenta", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "13N-A",
          title: "Case 1: Fundal Massage",
          scenario: "Patient is bleeding. BP is dropping.",
          task: "Perform manual fundal massage to stimulate contraction.",
          questions: [
            { id: "q1", stem: "What is the first-line pharmacological agent for PPH?", options: [{text: "Syntocinon (Oxytocin)", correct: true}, {text: "Adrenaline", correct: false}] }
          ]
        }
      ]
    }
  },

  // CLASS 14: INFECTIOUS DISEASE
  {
    id: 14,
    num: "14",
    title: "Infectious Disease",
    subtitle: "Septic Shock & Source Control",
    doctor: {
      sims: [
        {
          id: "14D-A",
          title: "Case 1: Refractory Hypotension",
          scenario: "Sepsis patient. 2L of fluid given. MAP remains 55.",
          task: "Initiate Vasopressors (Noradrenaline) via central line.",
          questions: [
            { id: "q1", stem: "What is the target Mean Arterial Pressure (MAP) in septic shock?", options: [{text: "65 mmHg", correct: true}, {text: "90 mmHg", correct: false}] }
          ]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "14N-A",
          title: "Case 1: The Sepsis Six Bundle",
          scenario: "Patient triggered NEWS2 score of 7.",
          task: "Complete the Sepsis Six within 60 minutes.",
          questions: [
            { id: "q1", stem: "Which three items must you GIVE in Sepsis Six?", options: [{text: "Oxygen, Fluids, Antibiotics", correct: true}, {text: "Blood, Urine, Lactate", correct: false}] }
          ]
        }
      ]
    }
  }
];