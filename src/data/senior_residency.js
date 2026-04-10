// senior_residency.js - Classes 10-14: High Acuity & Complex Decision Making
// Competing priorities, time-critical decisions, leadership skills

export const SENIOR_RESIDENCY = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 10: ENDOCRINE EMERGENCIES
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    num: "10",
    level: "senior_residency",
    title: "Endocrine Emergencies",
    subtitle: "DKA, HHS & Adrenal Crisis",
    tagline: "The blood turns to acid. Restore the pH before it's too late.",
    estimatedMinutes: { doctor: 65, nurse: 60 },
    passMark: 80,
    xpReward: 350,
    media: {
      images: {
        "10A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/heart_sounds_normal.mp3",
      pdfs: { "jbds_dka": "/pdfs/class10_dka_guidelines.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "10D-A",
          title: "Severe DKA Management",
          mechanics: "mcq",
          objective: "Execute the DKA protocol safely",
          scenario: "19-year-old Type 1. pH 7.05, Ketones 6.8, Glucose 32, K+ 3.2. Confused, Kussmaul breathing.",
          questions: [
            {
              id: "10D-A-q1",
              stem: "What is the PRIMARY goal of insulin in DKA?",
              timeLimit: 45,
              options: [
                { id: "a", text: "To suppress ketogenesis", correct: true, explanation: "Insulin stops fat breakdown into ketones - this resolves the acidosis." },
                { id: "b", text: "To lower glucose to 5 mmol/L", correct: false, explanation: "Glucose reduction is a secondary effect - avoid rapid drops to prevent cerebral oedema." },
                { id: "c", text: "To prevent hypoglycaemia", correct: false, explanation: "Preventing hypoglycaemia is a secondary consideration in DKA management." },
                { id: "d", text: "To reduce potassium", correct: false, explanation: "Potassium management is a secondary consideration in DKA management." }
              ]
            },
            {
              id: "10D-A-q2",
              stem: "When should you add 10% dextrose to fluids?",
              timeLimit: 45,
              options: [
                { id: "a", text: "When glucose drops below 14 mmol/L", correct: true, explanation: "Continue FRII to clear ketones while preventing hypoglycaemia with dextrose." },
                { id: "b", text: "Immediately on admission", correct: false, explanation: "Adding dextrose immediately on admission is not appropriate and could worsen the condition." },
                { id: "c", text: "When pH normalizes", correct: false, explanation: "pH normalization is a goal of treatment, but adding dextrose is based on glucose levels." },
                { id: "d", text: "Never in DKA", correct: false, explanation: "Dextrose is sometimes needed in DKA management to prevent hypoglycaemia." }
              ]
            },
            {
              id: "10D-A-q3",
              stem: "What is the most feared complication of DKA treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Cerebral oedema", correct: true, explanation: "Cerebral oedema is the leading cause of DKA mortality, especially in children/young adults." },
                { id: "b", text: "Hypoglycaemia", correct: false, explanation: "Hypoglycaemia is a common complication but is usually manageable." },
                { id: "c", text: "Hyperkalaemia", correct: false, explanation: "Hyperkalaemia is a common complication but is usually manageable." },
                { id: "d", text: "Pulmonary embolism", correct: false, explanation: "Pulmonary embolism is not a typical complication of DKA management." }
              ]
            }
          ]
        },
        {
          id: "10D-B",
          title: "Adrenal Crisis",
          mechanics: "mcq",
          objective: "Recognize and treat adrenal insufficiency",
          scenario: "Patient on long-term steroids for 6 months. Presenting with vomiting, hypotension (80/50), hyponatraemia 118, hyperkalaemia 5.8.",
          questions: [
            {
              id: "10D-B-q1",
              stem: "What is the immediate life-saving treatment?",
              timeLimit: 30,
              options: [
                { id: "a", text: "IV Hydrocortisone 100mg immediately", correct: true, explanation: "Steroid replacement is urgent - do not wait for tests in suspected crisis." },
                { id: "b", text: "Fluid restriction", correct: false, explanation: "Fluid restriction is not the appropriate management for adrenal crisis." },
                { id: "c", text: "Wait for ACTH stimulation test", correct: false, explanation: "Waiting for tests in a suspected adrenal crisis is dangerous and delays life-saving treatment." },
                { id: "d", text: "Oral prednisolone", correct: false, explanation: "Oral prednisolone is not appropriate for immediate management in adrenal crisis." }
              ]
            },
            {
              id: "10D-B-q2",
              stem: "Why the hyperkalaemia in adrenal crisis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Aldosterone deficiency reduces renal potassium excretion", correct: true, explanation: "Mineralocorticoid deficiency causes salt wasting, hyperkalaemia, and acidosis." },
                { id: "b", text: "Insulin deficiency", correct: false, explanation: "Insulin deficiency is not the primary cause of hyperkalaemia in adrenal crisis." },
                { id: "c", text: "Renal failure", correct: false, explanation: "Renal failure is not the primary cause of hyperkalaemia in adrenal crisis." },
                { id: "d", text: "Cellular shift", correct: false, explanation: "Cellular shift is not the primary cause of hyperkalaemia in adrenal crisis." }
              ]
            }
          ]
        },
        {
          id: "10D-C",
          title: "Thyroid Storm",
          mechanics: "drag_drop",
          objective: "Apply the 'BLOCK' protocol for thyroid storm",
          scenario: "Patient with known Graves' disease. Fever 40°C, HR 160, agitated, jaundiced, confused.",
          questions: [
            {
              id: "10D-C-q1",
              stem: "Match the drug to its mechanism in thyroid storm.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Propylthiouracil", mechanism: "Blocks new hormone synthesis AND peripheral T4→T3 conversion" },
                { id: "b", label: "Iodine (Lugol's)", mechanism: "Blocks hormone release (Wolff-Chaikoff effect) - give 1hr AFTER PTU" },
                { id: "c", label: "Propranolol", mechanism: "Blocks adrenergic symptoms and peripheral T4→T3" },
                { id: "d", label: "Hydrocortisone", mechanism: "Treats relative adrenal insufficiency and blocks T4→T3" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "The 'BLOCK' protocol: Beta-blocker, Lugol's, Oxygen, Cooling, steroids/PTU." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the mechanisms of each drug in the 'BLOCK' protocol." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "10N-A",
          title: "Hourly DKA Monitoring",
          mechanics: "mcq",
          objective: "Track metabolic progress and detect complications",
          scenario: "Patient on FRII and sliding scale. Hourly bloods required.",
          questions: [
            {
              id: "10N-A-q1",
              stem: "What is the target rate of ketone reduction?",
              timeLimit: 45,
              options: [
                { id: "a", text: "0.5 mmol/L per hour", correct: true, explanation: "Ketones should fall by ~0.5 mmol/L/hr with appropriate insulin therapy." },
                { id: "b", text: "5.0 mmol/L per hour", correct: false, explanation: "A rate of 5.0 mmol/L/hr is too fast and could lead to complications." },
                { id: "c", text: "2.0 mmol/L per hour", correct: false, explanation: "A rate of 2.0 mmol/L/hr is too slow and may delay recovery." },
                { id: "d", text: "No specific target", correct: false, explanation: "There is a specific target for ketone reduction in DKA management." }
              ]
            },
            {
              id: "10N-A-q2",
              stem: "What early sign suggests cerebral oedema?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Headache with sudden drop in GCS", correct: true, explanation: "Headache is the earliest sign - act immediately if GCS drops." },
                { id: "b", text: "Rising glucose", correct: false, explanation: "Rising glucose is not a specific sign of cerebral oedema." },
                { id: "c", text: "Tachycardia", correct: false, explanation: "Tachycardia is not a specific sign of cerebral oedema." },
                { id: "d", text: "Polyuria", correct: false, explanation: "Polyuria is not a specific sign of cerebral oedema." }
              ]
            }
          ]
        },
        {
          id: "10N-B",
          title: "Potassium Replacement",
          mechanics: "text_input",
          objective: "Calculate and administer potassium safely",
          scenario: "Serum K+ 3.4 mmol/L. Patient on FRII. 70kg.",
          questions: [
            {
              id: "10N-B-q1",
              stem: "What is the maximum safe peripheral potassium infusion rate?",
              timeLimit: 45,
              textAnswer: "10",
              tolerance: 0,
              options: [
                { id: "a", text: "10 mmol/hour peripherally", correct: true, explanation: "Peripheral: max 10 mmol/hr. Central: max 20 mmol/hr." },
                { id: "b", text: "40 mmol/hour", correct: false, explanation: "40 mmol/hr exceeds safe limits for both peripheral and central administration." },
                { id: "c", text: "No limit", correct: false, explanation: "There are safe limits for potassium infusion rates." }
              ]
            },
            {
              id: "10N-B-q2",
              stem: "Why does potassium fall during DKA treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Insulin drives K+ intracellularly", correct: true, explanation: "Insulin stimulates Na+/K+ ATPase, shifting K+ into cells." },
                { id: "b", text: "Acidosis worsens", correct: false, explanation: "Acidosis can cause potassium to shift out of cells, but it's not the primary mechanism." },
                { id: "c", text: "Diuresis stops", correct: false, explanation: "Diuresis stopping can affect potassium levels, but it's not the main cause." },
                { id: "d", text: "Aldosterone increases", correct: false, explanation: "Aldosterone increases can cause potassium loss, but it's not the primary mechanism during DKA treatment." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 11: HAEMATOLOGY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 11,
    num: "11",
    level: "senior_residency",
    title: "Haematology",
    subtitle: "Sickle Cell, Coagulopathy & Transfusion",
    tagline: "Blood is life. Respect its complexity.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 80,
    xpReward: 325,
    media: {
      images: {
        "11A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/monitor_beeping.mp3",
      pdfs: { "sickle_guidelines": "/pdfs/class11_sickle.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "11D-A",
          title: "Acute Chest Syndrome",
          mechanics: "mcq",
          objective: "Recognize and manage this life-threatening complication",
          scenario: "Sickle cell patient with chest pain, fever 38.5°C, new infiltrate on CXR, falling SpO2.",
          questions: [
            {
              id: "11D-A-q1",
              stem: "What is the diagnostic criteria for Acute Chest Syndrome?",
              timeLimit: 45,
              options: [
                { id: "a", text: "New pulmonary infiltrate + respiratory symptoms/fever", correct: true, explanation: "ACS = new infiltrate involving at least one lung segment + symptoms." },
                { id: "b", text: "Chest pain only", correct: false, explanation: "Chest pain alone does not meet the criteria for ACS." },
                { id: "c", text: "Positive blood culture", correct: false, explanation: "Positive blood culture is not a diagnostic criterion for ACS." },
                { id: "d", text: "Elevated troponin", correct: false, explanation: "Elevated troponin is not a diagnostic criterion for ACS." }
              ]
            },
            {
              id: "11D-A-q2",
              stem: "What is the priority treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Exchange transfusion + antibiotics + oxygen", correct: true, explanation: "ACS requires aggressive management - exchange transfusion if severe." },
                { id: "b", text: "Simple analgesia only", correct: false, explanation: "Simple analgesia is not sufficient for managing ACS." },
                { id: "c", text: "Thrombolysis", correct: false, explanation: "Thrombolysis is not indicated for ACS." },
                { id: "d", text: "Steroids alone", correct: false, explanation: "Steroids alone are not the primary treatment for ACS." }
              ]
            },
            {
              id: "11D-A-q3",
              stem: "What is the most likely infectious organism?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Chlamydia pneumoniae or Mycoplasma", correct: true, explanation: "Atypical organisms are common in ACS, especially in children/young adults." },
                { id: "b", text: "Staphylococcus aureus only", correct: false, explanation: "Staphylococcus aureus is not the most likely infectious organism in ACS." },
                { id: "c", text: "Fungal", correct: false, explanation: "Fungal infections are not the most likely cause of ACS." },
                { id: "d", text: "Viral only", correct: false, explanation: "Viral infections are not the most likely cause of ACS." }
              ]
            }
          ]
        },
        {
          id: "11D-B",
          title: "Disseminated Intravascular Coagulation",
          mechanics: "mcq",
          objective: "Recognize DIC and treat the underlying cause",
          scenario: "Sepsis patient with bleeding from IV sites, purpura fulminans. PT 18, APTT 56, Fibrinogen 0.8, D-dimer >80, Platelets 45.",
          questions: [
            {
              id: "11D-B-q1",
              stem: "What is the primary treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Treat the underlying cause (sepsis)", correct: true, explanation: "DIC is a symptom - treating the cause is essential. Supportive care for bleeding." },
                { id: "b", text: "Heparin infusion", correct: false, explanation: "Heparin infusion is not the primary treatment for DIC." },
                { id: "c", text: "Tranexamic acid alone", correct: false, explanation: "Tranexamic acid alone is not the primary treatment for DIC." },
                { id: "d", text: "Platelet transfusion only", correct: false, explanation: "Platelet transfusion only is not the primary treatment for DIC." }
              ]
            },
            {
              id: "11D-B-q2",
              stem: "When should you give blood products?",
              timeLimit: 45,
              options: [
                { id: "a", text: "If bleeding or for invasive procedures only", correct: true, explanation: "Prophylactic transfusions not recommended - only if bleeding or procedure planned." },
                { id: "b", text: "To normalize all clotting tests", correct: false, explanation: "Normalizing clotting tests is not the primary indication for blood product transfusion." },
                { id: "c", text: "Immediately for all DIC", correct: false, explanation: "Immediate transfusion is not indicated for all DIC cases." },
                { id: "d", text: "Never in DIC", correct: false, explanation: "Blood products may be indicated in certain DIC cases." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "11N-A",
          title: "Sickle Cell Pain Crisis",
          mechanics: "mcq",
          objective: "Provide rapid, effective analgesia",
          scenario: "Patient in 10/10 pain. Known HbSS. Demanding pain relief.",
          questions: [
            {
              id: "11N-A-q1",
              stem: "What is the recommended timeframe for first dose of analgesia?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 30 minutes", correct: true, explanation: "'Golden 30 minutes' - rapid analgesia prevents pain escalation and complications." },
                { id: "b", text: "Within 2 hours", correct: false, explanation: "Delaying analgesia can lead to pain escalation and complications." },
                { id: "c", text: "After confirming with haematology", correct: false, explanation: "Confirming with haematology should not delay the administration of analgesia." },
                { id: "d", text: "When observations stable", correct: false, explanation: "Stable observations should not prevent the administration of analgesia for severe pain." }
              ]
            },
            {
              id: "11N-A-q2",
              stem: "Why might patients appear 'drug-seeking'?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Vaso-occlusive pain is severe and opioids are first-line", correct: true, explanation: "Sickle pain is one of the most severe pains - high opioid requirements are appropriate." },
                { id: "b", text: "They are addicted", correct: false, explanation: "Addiction is not the primary reason for increased opioid requirements in sickle cell pain." },
                { id: "c", text: "Placebo effect", correct: false, explanation: "The placebo effect is not the primary reason for increased opioid requirements in sickle cell pain." },
                { id: "d", text: "Psychological dependence only", correct: false, explanation: "Psychological dependence is not the primary reason for increased opioid requirements in sickle cell pain." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 12: TROPICAL MEDICINE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 12,
    num: "12",
    level: "senior_residency",
    title: "Tropical Medicine",
    subtitle: "Malaria, Dengue & Viral Haemorrhagic Fevers",
    tagline: "The fever has a thousand faces. Find the right one.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 80,
    xpReward: 325,
    media: {
      images: {
        "12A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/resus_ambience.mp3",
      pdfs: { "who_malaria": "/pdfs/class12_malaria.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "12D-A",
          title: "Cerebral Malaria",
          mechanics: "mcq",
          objective: "Recognize severe malaria and initiate artesunate",
          scenario: "Returned from Nigeria 5 days ago. Fever, rigors, confusion, seizures. Parasitaemia 8%.",
          questions: [
            {
              id: "12D-A-q1",
              stem: "Which Plasmodium species causes cerebral malaria?",
              timeLimit: 45,
              options: [
                { id: "a", text: "P. falciparum", correct: true, explanation: "P. falciparum is the only species causing cerebral malaria due to cytoadherence." },
                { id: "b", text: "P. vivax", correct: false, explanation: "P. vivax is not typically associated with cerebral malaria." },
                { id: "c", text: "P. ovale", correct: false, explanation: "P. ovale is not typically associated with cerebral malaria." },
                { id: "d", text: "P. malariae", correct: false, explanation: "P. malariae is not typically associated with cerebral malaria." }
              ]
            },
            {
              id: "12D-A-q2",
              stem: "What is the first-line treatment for severe malaria?",
              timeLimit: 45,
              options: [
                { id: "a", text: "IV Artesunate", correct: true, explanation: "IV artesunate reduces mortality by 35% vs quinine in severe malaria." },
                { id: "b", text: "Oral artemether-lumefantrine", correct: false, explanation: "Oral artemether-lumefantrine is not the first-line treatment for severe malaria." },
                { id: "c", text: "IV Quinine", correct: false, explanation: "IV quinine is a second-line treatment for severe malaria." },
                { id: "d", text: "Chloroquine", correct: false, explanation: "Chloroquine is not effective against severe malaria." }
              ]
            },
            {
              id: "12D-A-q3",
              stem: "What is the most specific sign of cerebral malaria?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Retinal whitening with vessel changes", correct: true, explanation: "Retinal changes are pathognomonic for cerebral malaria and correlate with severity." },
                { id: "b", text: "Neck stiffness", correct: false, explanation: "Neck stiffness is not specific to cerebral malaria." },
                { id: "c", text: "Focal weakness", correct: false, explanation: "Focal weakness is not specific to cerebral malaria." },
                { id: "d", text: "Papilloedema", correct: false, explanation: "Papilloedema is not specific to cerebral malaria." }
              ]
            }
          ]
        },
        {
          id: "12D-B",
          title: "Dengue Shock Syndrome",
          mechanics: "mcq",
          objective: "Recognize critical phase and manage plasma leakage",
          scenario: "Day 4 of illness. Fever resolving but patient looks unwell. Rising haematocrit, pleural effusion on CXR, pulse pressure narrow.",
          questions: [
            {
              id: "12D-B-q1",
              stem: "What defines the critical phase of dengue?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Plasma leakage phase around defervescence (days 3-7)", correct: true, explanation: "Critical phase = plasma leakage, haemoconcentration, thrombocytopenia - usually day 3-7." },
                { id: "b", text: "First 24 hours of fever", correct: false, explanation: "The first 24 hours of fever are not considered the critical phase." },
                { id: "c", text: "Convalescent phase", correct: false, explanation: "The convalescent phase is not the critical phase." },
                { id: "d", text: "When fever exceeds 40°C", correct: false, explanation: "Fever exceeding 40°C is not the defining characteristic of the critical phase." }
              ]
            },
            {
              id: "12D-B-q2",
              stem: "What is the fluid of choice for DSS?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Crystalloid boluses (10-20 ml/kg)", correct: true, explanation: "Aggressive crystalloid resuscitation - colloids if no response after 2 boluses." },
                { id: "b", text: "Blood transfusion", correct: false, explanation: "Blood transfusion is not the fluid of choice for DSS." },
                { id: "c", text: "5% Dextrose", correct: false, explanation: "5% Dextrose is not the fluid of choice for DSS." },
                { id: "d", text: "Oral rehydration", correct: false, explanation: "Oral rehydration is not the fluid of choice for DSS." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "12N-A",
          title: "Quinine Monitoring",
          mechanics: "mcq",
          objective: "Monitor for cardiotoxicity and hypoglycaemia",
          scenario: "Patient on IV Quinine loading dose for severe malaria.",
          questions: [
            {
              id: "12N-A-q1",
              stem: "Which ECG change indicates Quinine toxicity?",
              timeLimit: 45,
              options: [
                { id: "a", text: "QT prolongation", correct: true, explanation: "Quinine prolongs QT - monitor ECG. Risk of torsades." },
                { id: "b", text: "ST elevation", correct: false, explanation: "ST elevation is not a characteristic feature of Quinine toxicity." },
                { id: "c", text: "Short PR interval", correct: false, explanation: "Short PR interval is not associated with Quinine toxicity." },
                { id: "d", text: "Delta waves", correct: false, explanation: "Delta waves are not a feature of Quinine toxicity." }
              ]
            },
            {
              id: "12N-A-q2",
              stem: "Why does Quinine cause hypoglycaemia?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Stimulates pancreatic insulin release", correct: true, explanation: "Quinine is a potent stimulator of insulin - monitor glucose closely." },
                { id: "b", text: "Inhibits glycogenolysis", correct: false, explanation: "Inhibits glycogenolysis is not the mechanism of Quinine-induced hypoglycaemia." },
                { id: "c", text: "Blocks glucagon", correct: false, explanation: "Blocks glucagon is not the mechanism of Quinine-induced hypoglycaemia." },
                { id: "d", text: "Liver toxicity", correct: false, explanation: "Liver toxicity is not a recognized side effect of Quinine." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 13: OBSTETRIC EMERGENCIES
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 13,
    num: "13",
    level: "senior_residency",
    title: "Obstetric Emergencies",
    subtitle: "PPH, Eclampsia & Maternal Collapse",
    tagline: "Two lives hang in the balance. Every second counts.",
    estimatedMinutes: { doctor: 70, nurse: 65 },
    passMark: 85,
    xpReward: 400,
    media: {
      images: {
        "13A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/paediatric_ward.mp3",
      pdfs: { "rcog_pph": "/pdfs/class13_pph.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "13D-A",
          title: "Major Postpartum Haemorrhage",
          mechanics: "mcq",
          objective: "Execute the 4 Ts protocol and manage massive bleeding",
          scenario: "Delivered 4.5kg baby. Bleeding heavily. Fundus boggy. Blood loss >1500ml. HR 120, BP 85/50.",
          questions: [
            {
              id: "13D-A-q1",
              stem: "The boggy fundus indicates which cause?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Tone (Uterine atony)", correct: true, explanation: "Atony is the most common cause of PPH (70-80%). Boggy fundus = poor contraction." },
                { id: "b", text: "Tissue (Retained placenta)", correct: false },
                { id: "c", text: "Trauma (Cervical tear)", correct: false },
                { id: "d", text: "Thrombin (Coagulopathy)", correct: false }
              ]
            },
            {
              id: "13D-A-q2",
              stem: "What is the first-line uterotonic?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Oxytocin 5-10 IU IV/IM", correct: true, explanation: "Oxytocin is first-line for atony - immediate bolus then infusion." },
                { id: "b", text: "Carboprost", correct: false, explanation: "Carboprost is a second-line option for atony." },
                { id: "c", text: "Misoprostol", correct: false, explanation: "Misoprostol is used in resource-limited settings for atony." },
                { id: "d", text: "Ergometrine", correct: false, explanation: "Ergometrine is contraindicated in certain conditions and is not first-line." }
              ]
            },
            {
              id: "13D-A-q3",
              stem: "When should you activate major haemorrhage protocol?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Blood loss >1500ml or haemodynamic compromise", correct: true, explanation: "Early activation ensures blood products and team availability." },
                { id: "b", text: "Only after 2 litres lost", correct: false, explanation: "Activating too late can lead to complications." },
                { id: "c", text: "Only if Hb drops below 70", correct: false, explanation: "Hemoglobin level is not the sole indicator for major haemorrhage protocol." },
                { id: "d", text: "Only if patient collapses", correct: false, explanation: "Delaying activation can be life-threatening." }
              ]
            }
          ]
        },
        {
          id: "13D-B",
          title: "Eclampsia Management",
          mechanics: "mcq",
          objective: "Control seizures and manage severe pre-eclampsia",
          scenario: "34 weeks pregnant. BP 175/115, proteinuria +++, suddenly seizing. GCS 10 during seizure.",
          questions: [
            {
              id: "13D-B-q1",
              stem: "What is the first-line anticonvulsant?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Magnesium Sulfate IV", correct: true, explanation: "MgSO4 is superior to diazepam/phenytoin for eclampsia - prevents recurrence." },
                { id: "b", text: "Diazepam", correct: false, explanation: "Diazepam is not the first-line treatment for eclampsia." },
                { id: "c", text: "Phenytoin", correct: false, explanation: "Phenytoin is not the first-line treatment for eclampsia." },
                { id: "d", text: "Thiopental", correct: false, explanation: "Thiopental is not the first-line treatment for eclampsia." }
              ]
            },
            {
              id: "13D-B-q2",
              stem: "What is the definitive treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Delivery once stabilized", correct: true, explanation: "Delivery is the only cure - stabilize mother first, then deliver." },
                { id: "b", text: "Continue pregnancy with medications", correct: false, explanation: "Continuing pregnancy with medications is not the definitive treatment for eclampsia." },
                { id: "c", text: "Caesarean immediately regardless of stability", correct: false, explanation: "Caesarean delivery is not always immediately indicated and depends on the patient's condition." },
                { id: "d", text: "Wait for spontaneous labour", correct: false, explanation: "Waiting for spontaneous labour is not appropriate in eclampsia." }
              ]
            },
            {
              id: "13D-B-q3",
              stem: "What antihypertensive is safe in pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Labetalol", correct: true, explanation: "Labetalol and hydralazine are first-line. Avoid ACE inhibitors." },
                { id: "b", text: "Ramipril", correct: false, explanation: "Ramipril is contraindicated in pregnancy." },
                { id: "c", text: "Amlodipine", correct: false, explanation: "Amlodipine is not the first-line treatment for eclampsia." },
                { id: "d", text: "Atenolol", correct: false, explanation: "Atenolol is not the first-line treatment for eclampsia." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "13N-A",
          title: "Fundal Massage & Balloon",
          mechanics: "mcq",
          objective: "Perform mechanical management of atony",
          scenario: "Patient bleeding. Boggy fundus. Oxytocin given but continued bleeding.",
          questions: [
            {
              id: "13N-A-q1",
              stem: "What is the correct technique for fundal massage?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Firm circular massage to stimulate contraction", correct: true, explanation: "Firm pressure stimulates uterine contraction - be vigorous if needed." },
                { id: "b", text: "Gentle stroking", correct: false, explanation: "Gentle stroking is not effective for managing atony." },
                { id: "c", text: "Avoid touching the fundus", correct: false, explanation: "Avoiding touch to the fundus is not the correct approach." },
                { id: "d", text: "Apply pressure to the abdomen only", correct: false, explanation: "Applying pressure to the abdomen only is not the correct technique for fundal massage." }
              ]
            },
            {
              id: "13N-A-q2",
              stem: "When is a Bakri balloon indicated?",
              timeLimit: 45,
              options: [
                { id: "a", text: "When medical management fails and before surgery", correct: true, explanation: "Bakri balloon provides tamponade - bridge to definitive treatment or allows conservative management." },
                { id: "b", text: "First-line before any drugs", correct: false, explanation: "First-line treatment for atony is usually oxytocin or other uterotonic agents." },
                { id: "c", text: "Only after hysterectomy", correct: false, explanation: "Bakri balloon is used as a temporary measure before definitive treatment." },
                { id: "d", text: "Never in PPH", correct: false, explanation: "Bakri balloon can be used in PPH when other measures fail." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 14: INFECTIOUS DISEASE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 14,
    num: "14",
    level: "senior_residency",
    title: "Infectious Disease",
    subtitle: "Sepsis, HIV Complications & TB",
    tagline: "The invisible enemy. Fight it with knowledge.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 80,
    xpReward: 350,
    media: {
      images: {
        "14A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/resus_ambience.mp3",
      pdfs: { "sepsis_surviving": "/pdfs/class14_sepsis.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "14D-A",
          title: "Septic Shock Management",
          mechanics: "mcq",
          objective: "Apply the Surviving Sepsis Campaign bundle",
          scenario: "Lactate 4.5, BP 75/45 after 2L fluids, HR 135, Temp 38.8°C, Confused. Suspected pneumonia.",
          questions: [
            {
              id: "14D-A-q1",
              stem: "What is the target MAP?",
              timeLimit: 45,
              options: [
                { id: "a", text: "65 mmHg", correct: true, explanation: "MAP ≥65 mmHg is target for septic shock to maintain organ perfusion." },
                { id: "b", text: "55 mmHg", correct: false, explanation: "55 mmHg is too low and may lead to organ hypoperfusion." },
                { id: "c", text: "90 mmHg", correct: false, explanation: "90 mmHg is not the target MAP for septic shock." },
                { id: "d", text: "100 mmHg", correct: false, explanation: "100 mmHg is too high and may lead to complications." }
              ]
            },
            {
              id: "14D-A-q2",
              stem: "Which vasopressor is first-line?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Noradrenaline (Norepinephrine)", correct: true, explanation: "Noradrenaline is first-line vasopressor for septic shock." },
                { id: "b", text: "Adrenaline", correct: false, explanation: "Adrenaline is not the first-line vasopressor for septic shock." },
                { id: "c", text: "Dopamine", correct: false, explanation: "Dopamine is not the first-line vasopressor for septic shock." },
                { id: "d", text: "Vasopressin", correct: false, explanation: "Vasopressin is not the first-line vasopressor for septic shock." }
              ]
            },
            {
              id: "14D-A-q3",
              stem: "What is the antibiotic timing target?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 1 hour of recognition", correct: true, explanation: "Every hour of delay increases mortality. Give broad-spectrum antibiotics within 1 hour." },
                { id: "b", text: "Within 4 hours", correct: false, explanation: "Delaying antibiotic administration for more than 1 hour increases mortality." },
                { id: "c", text: "After cultures return", correct: false, explanation: "Delaying antibiotic administration until cultures return increases mortality." },
                { id: "d", text: "After CT scan", correct: false, explanation: "Delaying antibiotic administration for a CT scan increases mortality."                                                                                                                       }
              ]
            }
          ]
        },
        {
          id: "14D-B",
          title: "TB-HIV Co-infection",
          mechanics: "mcq",
          objective: "Manage immune reconstitution and drug interactions",
          scenario: "Newly diagnosed HIV, CD4 45. Started ART 2 weeks ago. Now fever, worsening CXR, confusion.",
          questions: [
            {
              id: "14D-B-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "TB Immune Reconstitution Inflammatory Syndrome (IRIS)", correct: true, explanation: "Paradoxical worsening after ART initiation in undiagnosed TB = IRIS." },
                { id: "b", text: "ART failure", correct: false, explanation: "ART failure would not typically present with these symptoms." },
                { id: "c", text: "Bacterial pneumonia", correct: false, explanation: "Bacterial pneumonia would not explain the immune reconstitution aspect." },
                { id: "d", text: "PML", correct: false, explanation: "PML is a different condition and would not present with these symptoms." }
              ]
            },
            {
              id: "14D-B-q2",
              stem: "What is the major drug interaction between Rifampicin and ARVs?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Rifampicin induces CYP450, reducing ARV levels", correct: true, explanation: "Rifampicin is potent enzyme inducer - requires dose adjustment of many ARVs." },
                { id: "b", text: "Rifampicin inhibits ARV metabolism", correct: false, explanation: "Rifampicin is a potent enzyme inducer, not an inhibitor." },
                { id: "c", text: "ARVs increase Rifampicin toxicity", correct: false, explanation: "ARVs do not significantly increase Rifampicin toxicity." },
                { id: "d", text: "No interaction", correct: false, explanation: "There is a significant interaction between Rifampicin and ARVs." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "14N-A",
          title: "Sepsis Six Bundle",
          mechanics: "drag_drop",
          objective: "Complete all elements of the Sepsis Six within 1 hour",
          scenario: "NEWS2 score 9. Suspected sepsis. You have 60 minutes.",
          questions: [
            {
              id: "14N-A-q1",
              stem: "Match the Sepsis Six intervention to its category (Give/Get/Measure).",
              timeLimit: 90,
              dragItems: [
                { id: "1", label: "High flow oxygen", category: "Give" },
                { id: "2", label: "Blood cultures", category: "Get" },
                { id: "3", label: "IV antibiotics", category: "Give" },
                { id: "4", label: "IV fluid challenge", category: "Give" },
                { id: "5", label: "Serum lactate", category: "Measure" },
                { id: "6", label: "Monitor urine output", category: "Measure" }
              ],
              options: [
                { id: "a", text: "All correctly categorized", correct: true, explanation: "Sepsis Six: 3 Give, 2 Measure, 1 Get." },
                { id: "b", text: "Some errors", correct: false, explanation: "Make sure to categorize each intervention correctly." },
                { id: "c", text: "All in one category", correct: false, explanation: "Interventions must be categorized into Give, Get, or Measure." },
                { id: "d", text: "Missing interventions", correct: false, explanation: "All six interventions must be included and categorized." }
              ]
            }
          ]
        }
      ]
    }
  }
];