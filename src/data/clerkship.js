// clerkship.js - Classes 01-04: Foundation Clinical Skills
// Comprehensive, detailed cases for medical students and early trainees

export const CLERKSHIP = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 01: THE BASELINE ASSESSMENT
  // ═══════════════════════════════════════════════════════════════════════════════
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
      images: { 
        "1A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "1B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800",
        "1C": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/hospital_background.mp3",
      pdfs: { "clinical_guidelines": "/pdfs/class01_guidelines.pdf" }
    },
    
    // ─── DOCTOR TRACK ─────────────────────────────────────────────────────────────
    doctor: {
      sims: [
        {
          id: "1D-A",
          title: "The Chest Pain History",
          mechanics: "audio_mcq",
          objective: "Elicit a focused cardiac history and identify red flags",
          scenario: "Mr. Miller, 58, presents with 'heaviness' in his chest. He is a smoker with Type 2 Diabetes. The audio contains his account.",
          audio: "/audio/class01_patient_1Ai.mp3",
          questions: [
            {
              id: "1D-A-q1",
              stem: "The patient describes pain moving to his left jaw. Which SOCRATES category is this?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Site", correct: false, explanation: "Pain moving from the primary site to another area is Radiation. Cardiac pain typically radiates to the left arm, jaw, or neck." }, 
                { id: "b", text: "Radiation", correct: true, explanation: "Pain moving from the primary site to another area is Radiation. Cardiac pain typically radiates to the left arm, jaw, or neck." },
                { id: "c", text: "Character", correct: false, explanation: "Pain moving from the primary site to another area is Radiation. Cardiac pain typically radiates to the left arm, jaw, or neck." },
                { id: "d", text: "Severity", correct: false,  explanation: "Pain moving from the primary site to another area is Radiation. Cardiac pain typically radiates to the left arm, jaw, or neck." }
              ]
            },
            {
              id: "1D-A-q2",
              stem: "He mentions diaphoresis (profuse sweating). What is the physiological significance?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Autonomic nervous system activation", correct: true, explanation: "Diaphoresis suggests a massive sympathetic surge, a red flag for myocardial infarction." },
                { id: "b", text: "Anxiety only", correct: false, explanation: "Diaphoresis suggests a massive sympathetic surge, a red flag for myocardial infarction."},
                { id: "c", text: "Fever", correct: false, explanation: "Fever is not a typical sign of myocardial infarction." },
                { id: "d", text: "Hypoglycaemia", correct: false, explanation: "Hypoglycaemia can cause sweating, but it's not specific to myocardial infarction." }
              ]
            },
            {
              id: "1D-A-q3",
              stem: "Based on the history, what is your immediate priority?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Order a chest X-ray", correct: false, explanation: "While a chest X-ray may be useful later, the immediate priority is to assess for acute coronary syndrome." },
                { id: "b", text: "Perform a 12-lead ECG within 10 minutes", correct: true, explanation: "NICE guidelines require ECG within 10 minutes for suspected ACS." },
                { id: "c", text: "Prescribe analgesia and review in 2 hours", correct: false, explanation: "This is not the immediate priority in suspected ACS." },
                { id: "d", text: "Discharge with GP follow-up", correct: false, explanation: "Discharging a patient with suspected ACS is inappropriate." }
              ]
            }
          ]
        },
        {
          id: "1D-B",
          title: "The Abdominal Examination",
          mechanics: "hotspot",
          objective: "Identify signs of peritonitis and locate McBurney's point",
          scenario: "22-year-old female with 8 hours of RIF pain. She is guarding and lying still.",
          image: "/images/abdomen_diagram.jpeg",
          questions: [
            {
              id: "1D-B-q1",
              stem: "Click on McBurney's Point on the abdomen diagram.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Right upper quadrant", correct: false, explanation: "Right upper quadrant pain is more typical of gallbladder pathology." },
                { id: "b", text: "1/3 of the way from ASIS to umbilicus", correct: true, explanation: "This is the classic site for maximal tenderness in acute appendicitis." },
                { id: "c", text: "Suprapubic region", correct: false, explanation: "Suprapubic region pain is more typical of urinary tract pathology." },
                { id: "d", text: "Left iliac fossa", correct: false, explanation: "Left iliac fossa pain is more typical of diverticulitis or other left-sided conditions." }
              ]
            },
            {
              id: "1D-B-q2",
              stem: "What sign suggests localized peritonitis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Rebound tenderness (Blumberg's sign)", correct: true, explanation: "Pain on sudden release of pressure indicates peritoneal irritation." },
                { id: "b", text: "Bruit on auscultation", correct: false, explanation: "Bruit is not a sign of localized peritonitis." },
                { id: "c", text: "Shifting dullness", correct: false, explanation: "Shifting dullness is associated with ascites, not peritonitis." },
                { id: "d", text: "Succussion splash", correct: false, explanation: "Succussion splash is associated with pleural effusion, not peritonitis." }
              ]
            }
          ]
        },
        {
          id: "1D-C",
          title: "Mental Capacity Assessment",
          mechanics: "mcq",
          objective: "Apply the Mental Capacity Act framework",
          scenario: "Elderly patient with pneumonia refuses IV cannula. They seem confused.",
          questions: [
            {
              id: "1D-C-q1",
              stem: "What is the FIRST stage of the Mental Capacity Act assessment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Check for impairment of mind or brain", correct: true, explanation: "You must first establish if there is a functional or diagnostic impairment (e.g., delirium)." },
                { id: "b", text: "Ask the next of kin for permission", correct: false, explanation: "This is not the first stage of the assessment." },
                { id: "c", text: "Assume capacity", correct: false, explanation: "You cannot assume capacity without assessing the individual's ability to understand and weigh the information." },
                { id: "d", text: "Apply for a Deprivation of Liberty Safeguard", correct: false, explanation: "This is a last-resort measure taken when a person lacks capacity and their rights are being restricted." }
              ]
            },
            {
              id: "1D-C-q2",
              stem: "The patient cannot retain the information for 30 seconds. What does this indicate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Lacks capacity for this decision", correct: true, explanation: "Inability to retain information relevant to the decision indicates lack of capacity." },
                { id: "b", text: "Has capacity but is confused", correct: false, explanation: "The patient may have capacity but is currently confused." },
                { id: "c", text: "Needs sedation", correct: false, explanation: "Sedation is not indicated by the inability to retain information." },
                { id: "d", text: "Requires restraint", correct: false, explanation: "Restraint is not indicated by the inability to retain information." }
              ]
            }
          ]
        },
        {
          id: "1D-D",
          title: "The Deteriorating Patient",
          mechanics: "drag_drop",
          objective: "Calculate NEWS2 score and escalate appropriately",
          scenario: "72-year-old post-op patient. Observations: HR 112, BP 98/62, RR 24, SpO2 91% on air, Temp 38.2°C, Conscious.",
          questions: [
            {
              id: "1D-D-q1",
              stem: "Drag the correct NEWS2 scores to each parameter.",
              timeLimit: 90,
              dragItems: [
                { id: "hr", label: "Heart Rate 112", score: 2 },
                { id: "bp", label: "BP 98/62", score: 1 },
                { id: "rr", label: "RR 24", score: 2 },
                { id: "spo2", label: "SpO2 91% on air", score: 3 },
                { id: "temp", label: "Temp 38.2°C", score: 1 }
              ],
              options: [
                { id: "a", text: "Total NEWS2 = 9", correct: true, explanation: "NEWS2 ≥7 triggers emergency response." },
                { id: "b", text: "Total NEWS2 = 5", correct: false, explanation: "This score does not trigger emergency response." },
                { id: "c", text: "Total NEWS2 = 12", correct: false, explanation: "This score triggers emergency response." },
                { id: "d", text: "Total NEWS2 = 3", correct: false, explanation: "This score does not trigger emergency response." }
              ]
            },
            {
              id: "1D-D-q2",
              stem: "With NEWS2 of 9, what is your immediate action?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Continue routine observations", correct: false, explanation: "This is not appropriate for a NEWS2 of 9." },
                { id: "b", text: "Urgent review by clinician with critical care competencies", correct: true, explanation: "NEWS2 7+ requires immediate escalation." },
                { id: "c", text: "Reassess in 4 hours", correct: false, explanation: "This is not appropriate for a NEWS2 of 9." },
                { id: "d", text: "Discharge home", correct: false, explanation: "This is not appropriate for a NEWS2 of 9." }
              ]
            }
          ]
        }
      ]
    },

    // ─── NURSE TRACK ──────────────────────────────────────────────────────────────
    nurse: {
      sims: [
        {
          id: "1N-A",
          title: "NEWS2 Scoring & Escalation",
          mechanics: "mcq",
          objective: "Calculate NEWS2 and initiate escalation protocol",
          scenario: "Post-op patient: RR 26, SpO2 93% on air, HR 105, BP 110/70, Temp 37.8°C, Alert.",
          questions: [
            {
              id: "1N-A-q1",
              stem: "What is the maximum score for Respiratory Rate in NEWS2?",
              timeLimit: 45,
              options: [
                { id: "a", text: "3 points", correct: true, explanation: "A RR of 25 or higher is a red-flag alert and scores 3." },
                { id: "b", text: "1 point", correct: false, explanation: "A RR of 21-24 is a yellow-flag alert and scores 1." },
                { id: "c", text: "2 points", correct: false, explanation: "A RR of 25 or higher is a red-flag alert and scores 3." },
                { id: "d", text: "0 points", correct: false, explanation: "A RR of 12-20 is a green-flag alert and scores 0." }
              ]
            },
            {
              id: "1N-A-q2",
              stem: "Which single parameter triggers an immediate escalation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "SpO2 ≤ 91%", correct: true, explanation: "SpO2 ≤91% is a red flag requiring immediate action." },
                { id: "b", text: "Heart rate 100", correct: false, explanation: "A heart rate of 100 is a yellow-flag alert and scores 1." },
                { id: "c", text: "Temperature 37.8°C", correct: false, explanation: "A temperature of 37.8°C is a yellow-flag alert and scores 1." },
                { id: "d", text: "BP 110/70", correct: false, explanation: "A BP of 110/70 is a green-flag alert and scores 0." }
              ]
            }
          ]
        },
        {
          id: "1N-B",
          title: "Sepsis Screening",
          mechanics: "mcq",
          objective: "Perform bedside sepsis screening using qSOFA",
          scenario: "Elderly patient with UTI. Temp 38.9°C, shivering, confused, RR 22, BP 95/60.",
          questions: [
            {
              id: "1N-B-q1",
              stem: "Which vital sign is most indicative of early septic shock?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Tachycardia (High HR)", correct: true, explanation: "The body compensates for low blood volume/vasodilation by increasing heart rate first." },
                { id: "b", text: "Hypertension", correct: false, explanation: "Hypertension is not a typical sign of early septic shock." },
                { id: "c", text: "Bradycardia", correct: false, explanation: "Bradycardia is not a typical sign of early septic shock." },
                { id: "d", text: "Hypothermia only", correct: false, explanation: "Hypothermia is not a typical sign of early septic shock." }
              ]
            },
            {
              id: "1N-B-q2",
              stem: "What is the Sepsis Six bundle time target?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 1 hour", correct: true, explanation: "Sepsis Six must be completed within 1 hour of recognition." },
                { id: "b", text: "Within 4 hours", correct: false, explanation: "The Sepsis Six bundle time target is within 1 hour." },
                { id: "c", text: "Within 6 hours", correct: false, explanation: "The Sepsis Six bundle time target is within 1 hour." },
                { id: "d", text: "Within 12 hours", correct: false, explanation: "The Sepsis Six bundle time target is within 1 hour." }
              ]
            }
          ]
        },
        {
          id: "1N-C",
          title: "Manual Blood Pressure",
          mechanics: "audio_mcq",
          objective: "Interpret Korotkoff sounds for manual BP measurement",
          scenario: "Automated BP monitor failed. You must obtain manual reading. Patient has atrial fibrillation.",
          audio: "/audio/class01_nurse_N1Ai.mp3",
          questions: [
            {
              id: "1N-C-q1",
              stem: "Listen to the audio. What is the systolic BP?",
              timeLimit: 60,
              options: [
                { id: "a", text: "140 mmHg", correct: false, explanation: "This would be an elevated systolic pressure." },
                { id: "b", text: "156 mmHg", correct: true, explanation: "First Korotkoff sound marks systolic pressure." },
                { id: "c", text: "120 mmHg", correct: false, explanation: "This would be a normal diastolic pressure." },
                { id: "d", text: "180 mmHg", correct: false, explanation: "This would be an elevated systolic pressure." }
              ]
            },
            {
              id: "1N-C-q2",
              stem: "Why is BP measurement difficult in atrial fibrillation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Irregular pulse makes auscultation challenging", correct: true, explanation: "Irregular R-R intervals create variable blood flow sounds." },
                { id: "b", text: "Patients cannot sit still", correct: false, explanation: "Patients may be agitated or uncomfortable, making measurement difficult." },
                { id: "c", text: "The cuff size is wrong", correct: false, explanation: "Cuff size is not the primary issue in atrial fibrillation." },
                { id: "d", text: "Korotkoff sounds are absent", correct: false, explanation: "Korotkoff sounds are present but irregular in atrial fibrillation."}
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 02: INVESTIGATIONS & INTERPRETATION
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 2,
    num: "02",
    level: "clerkship",
    title: "Investigations & Interpretation",
    subtitle: "Blood, Imaging & Bedside Tests",
    tagline: "The numbers tell a story. Learn to read it.",
    estimatedMinutes: { doctor: 50, nurse: 45 },
    passMark: 70,
    xpReward: 175,
    media: {
      images: {
        "2A": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
        "2B": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800"
      },
      ambience: "/audio/lab_ambience.mp3",
      pdfs: { "lab_values": "/pdfs/class02_lab_guide.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "2D-A",
          title: "The Anaemic Patient",
          mechanics: "mcq",
          objective: "Interpret FBC and identify cause of anaemia",
          scenario: "FBC: Hb 85, MCV 70, MCH 22. Ferritin 8. Patient reports heavy periods.",
          questions: [
            {
              id: "2D-A-q1",
              stem: "What type of anaemia is indicated by MCV 70?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Microcytic", correct: true, explanation: "MCV <80 fL indicates microcytic anaemia." },
                { id: "b", text: "Normocytic", correct: false, explanation: "MCV between 80-100 fL indicates normocytic anaemia." },
                { id: "c", text: "Macrocytic", correct: false, explanation: "MCV >100 fL indicates macrocytic anaemia." },
                { id: "d", text: "Haemolytic", correct: false, explanation: "This refers to a different mechanism of anaemia." }
              ]
            },
            {
              id: "2D-A-q2",
              stem: "What is the most likely diagnosis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Iron deficiency anaemia", correct: true, explanation: "Low MCV, low MCH, low ferritin with menorrhagia history = iron deficiency." },
                { id: "b", text: "B12 deficiency", correct: false, explanation: "B12 deficiency typically causes macrocytic anaemia." },
                { id: "c", text: "Folate deficiency", correct: false, explanation: "Folate deficiency also causes macrocytic anaemia." },
                { id: "d", text: "Anaemia of chronic disease", correct: false, explanation: "This refers to a different mechanism of anaemia." }
              ]
            },
            {
              id: "2D-A-q3",
              stem: "What is the first-line treatment?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Oral ferrous sulfate 200mg TDS", correct: true, explanation: "Oral iron replacement is first-line for iron deficiency." },
                { id: "b", text: "IV iron immediately", correct: false, explanation: "IV iron is reserved for severe cases or when oral is not tolerated." },
                { id: "c", text: "Blood transfusion", correct: false, explanation: "Blood transfusion is not the first-line treatment for iron deficiency anaemia." },
                { id: "d", text: "B12 injections", correct: false, explanation: "B12 injections are used for B12 deficiency anaemia." }
              ]
            }
          ]
        },
        {
          id: "2D-B",
          title: "Chest X-Ray Interpretation",
          mechanics: "hotspot",
          objective: "Identify radiological signs of common conditions",
          scenario: "70-year-old with SOB. CXR shows abnormalities. Click on the key findings.",
          image: "/images/cxr_effusion.jpeg",
          questions: [
            {
              id: "2D-B-q1",
              stem: "Click on the area showing blunting of the costophrenic angle.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Right costophrenic angle", correct: true, explanation: "Blunting indicates pleural effusion - fluid in the pleural space." },
                { id: "b", text: "Left apex", correct: false, explanation: "The apex is not the area of blunting in this case." },
                { id: "c", text: "Cardiac silhouette", correct: false, explanation: "The cardiac silhouette is not the area of blunting in this case." },
                { id: "d", text: "Trachea", correct: false, explanation: "The trachea is not the area of blunting in this case." }
              ]
            },
            {
              id: "2D-B-q2",
              stem: "What does this finding indicate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Pleural effusion", correct: true, explanation: "Blunting of the costophrenic angle is a sign of pleural effusion." },
                { id: "b", text: "Pneumothorax", correct: false, explanation: "Pneumothorax would show a different radiological appearance." },
                { id: "c", text: "Consolidation", correct: false, explanation: "Consolidation appears as a dense opacity on CXR." },
                { id: "d", text: "Pulmonary embolism", correct: false, explanation: "Pulmonary embolism would show a different radiological appearance." }
              ]
            }
          ]
        },
        {
          id: "2D-C",
          title: "Arterial Blood Gas Analysis",
          mechanics: "mcq",
          objective: "Interpret ABG and determine acid-base status",
          scenario: "ABG: pH 7.25, pCO2 6.8 kPa, pO2 8.5 kPa, HCO3 18 mmol/L, Lactate 3.2",
          questions: [
            {
              id: "2D-C-q1",
              stem: "What is the primary acid-base disturbance?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Metabolic acidosis with respiratory compensation", correct: true, explanation: "Low pH, low HCO3 = metabolic acidosis. Elevated CO2 shows partial compensation." },
                { id: "b", text: "Respiratory acidosis", correct: false, explanation: "Respiratory acidosis would show a different pattern." },
                { id: "c", text: "Metabolic alkalosis", correct: false, explanation: "Metabolic alkalosis would show a different pattern." },
                { id: "d", text: "Respiratory alkalosis", correct: false, explanation: "Respiratory alkalosis would show a different pattern." }
              ]
            },
            {
              id: "2D-C-q2",
              stem: "What does the elevated lactate suggest?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Tissue hypoperfusion/shock", correct: true, explanation: "Lactate >2 suggests inadequate tissue oxygenation." },
                { id: "b", text: "Liver failure only", correct: false, explanation: "Liver failure would not be the primary cause of elevated lactate in this context." },
                { id: "c", text: "Normal finding", correct: false, explanation: "A lactate level of 3.2 is significantly elevated." },
                { id: "d", text: "Renal failure", correct: false, explanation: "Renal failure would not be the primary cause of elevated lactate in this context." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "2N-A",
          title: "Phlebotomy Order of Draw",
          mechanics: "drag_drop",
          objective: "Select correct tubes in order to prevent contamination",
          scenario: "You need to draw: Blood Cultures, FBC, U&Es, Coagulation screen, Group & Save.",
          questions: [
            {
              id: "2N-A-q1",
              stem: "Arrange the tubes in correct order of draw.",
              timeLimit: 90,
              dragItems: [
                { id: "1", label: "Blood Culture (Aerobic)", order: 1 },
                { id: "2", label: "Blue (Coagulation)", order: 2 },
                { id: "3", label: "Red/Gold (Serum)", order: 3 },
                { id: "4", label: "Green (Heparin)", order: 4 },
                { id: "5", label: "Purple (EDTA - FBC)", order: 5 },
                { id: "6", label: "Grey (Fluoride - Glucose)", order: 6 }
              ],
              options: [
                { id: "a", text: "Culture → Blue → Red → Green → Purple → Grey", correct: true, explanation: "This prevents cross-contamination of additives between tubes." },
                { id: "b", text: "Purple → Blue → Culture → Red → Green → Grey", correct: false, explanation: "This order is incorrect and risks contamination." },
                { id: "c", text: "Red → Culture → Blue → Purple → Green → Grey", correct: false, explanation: "This order is incorrect and risks contamination." },
                { id: "d", text: "Blue → Red → Culture → Purple → Green → Grey", correct: false, explanation: "This order is incorrect and risks contamination." }
              ]
            }
          ]
        },
        {
          id: "2N-B",
          title: "ECG Electrode Placement",
          mechanics: "hotspot",
          objective: "Correctly place precordial leads V1-V6",
          scenario: "Patient with chest pain. You need to perform a 12-lead ECG.",
          image: "/images/ecg_placement.jpeg",
          questions: [
            {
              id: "2N-B-q1",
              stem: "Where is V1 placed?",
              timeLimit: 60,
              options: [
                { id: "a", text: "4th Intercostal space, right sternal edge", correct: true, explanation: "V1 is placed in the 4th intercostal space at the right sternal edge." },
                { id: "b", text: "5th ICS, mid-clavicular line", correct: false, explanation: "This is the location for V2." },
                { id: "c", text: "5th ICS, left anterior axillary line", correct: false, explanation: "This is the location for V3." },
                { id: "d", text: "4th ICS, left sternal edge", correct: false, explanation: "This is the location for V4." }
              ]
            },
            {
              id: "2N-B-q2",
              stem: "Where is V6 placed?",
              timeLimit: 60,
              options: [
                { id: "a", text: "5th ICS, mid-axillary line", correct: true, explanation: "V6 is at the same horizontal level as V4 but in the mid-axillary line." },
                { id: "b", text: "4th ICS, right sternal edge", correct: false, explanation: "This is the location for V1." },
                { id: "c", text: "5th ICS, left sternal edge", correct: false, explanation: "This is the location for V2." },
                { id: "d", text: "6th ICS, anterior axillary line", correct: false, explanation: "This is the location for V3." }
              ]
            }
          ]
        },
        {
          id: "2N-C",
          title: "Urinalysis Interpretation",
          mechanics: "mcq",
          objective: "Interpret urine dipstick and microscopy results",
          scenario: "Urine dip: Leucocytes +++, Nitrites +++, Blood +, Protein +. Patient has dysuria.",
          questions: [
            {
              id: "2N-C-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Urinary tract infection", correct: true, explanation: "Leucocytes + nitrites = classic UTI." },
                { id: "b", text: "Nephrotic syndrome", correct: false, explanation: "Nephrotic syndrome typically shows heavy proteinuria without nitrites." },
                { id: "c", text: "Diabetes mellitus", correct: false, explanation: "Diabetes mellitus can cause glucosuria and ketonuria but not typically nitrites." },
                { id: "d", text: "Renal stones", correct: false, explanation: "Renal stones may cause hematuria but not typically leucocytes or nitrites." }
              ]
            },
            {
              id: "2N-C-q2",
              stem: "What is your immediate action?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Send MSU for culture and start empirical antibiotics", correct: true, explanation: "Empirical antibiotics should be started for symptomatic UTI while awaiting culture results."  },
                { id: "b", text: "Repeat dipstick in 1 week", correct: false, explanation: "Repeating the dipstick in a week is not appropriate for a symptomatic UTI." },
                { id: "c", text: "Increase fluid intake only", correct: false, explanation: "Increased fluid intake alone is not sufficient for treating symptomatic UTI." },
                { id: "d", text: "Discharge without treatment", correct: false, explanation: "Discharging without treatment is not appropriate for a symptomatic UTI." }
              ]   
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 03: ACUTE EMERGENCIES
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 3,
    num: "03",
    level: "clerkship",
    title: "Acute Emergencies",
    subtitle: "Basic & Advanced Life Support",
    tagline: "When seconds count, training takes over.",
    estimatedMinutes: { doctor: 55, nurse: 50 },
    passMark: 75,
    xpReward: 200,
    media: {
      images: {
        "3A": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
        "3B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/crash_call_ambience.mp3",
      pdfs: { "als_guidelines": "/pdfs/class03_als.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "3D-A",
          title: "Ventricular Fibrillation Arrest",
          mechanics: "mcq",
          objective: "Manage shockable rhythm per ALS algorithm",
          scenario: "Patient collapses. Monitor shows chaotic, disorganized rhythm. No pulse.",
          questions: [
            {
              id: "3D-A-q1",
              stem: "What is the immediate first step?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Defibrillate immediately", correct: false, explanation: "Defibrillation should occur within 2 minutes but CPR comes first." },
                { id: "b", text: "Start CPR while defibrillator is prepared", correct: true, explanation: "Start CPR immediately. Defibrillation should occur within 2 minutes but CPR comes first." },
                { id: "c", text: "Give adrenaline", correct: false, explanation: "Adrenaline should be given after the 3rd shock." },
                { id: "d", text: "Establish IV access", correct: false, explanation: "Establishing IV access is important but not the immediate first step." }
              ]
            },
            {
              id: "3D-A-q2",
              stem: "When is the first dose of adrenaline given in VF?",
              timeLimit: 45,
              options: [
                { id: "a", text: "After the 3rd shock", correct: true, explanation: "Adrenaline 1mg IV is given after the 3rd shock, then every 3-5 minutes." },
                { id: "b", text: "Immediately", correct: false, explanation: "Adrenaline should be given after the 3rd shock." },
                { id: "c", text: "After the 1st shock", correct: false, explanation: "Adrenaline should be given after the 3rd shock." },
                { id: "d", text: "Only if ROSC achieved", correct: false, explanation: "Adrenaline should be given after the 3rd shock." }
              ]
            },
            {
              id: "3D-A-q3",
              stem: "What energy level for the first biphasic shock?",
              timeLimit: 45,
              options: [
                { id: "a", text: "120-150 J", correct: true, explanation: "Start with 120-150J biphasic, escalate if needed." },
                { id: "b", text: "50 J", correct: false, explanation: "Insufficient energy for effective defibrillation." },
                { id: "c", text: "360 J", correct: false, explanation: "Higher energy levels are used if initial attempts are unsuccessful." },
                { id: "d", text: "200 J monophasic", correct: false, explanation: "Biphasic waveform is preferred for better efficacy." }
              ]
            }
          ]
        },
        {
          id: "3D-B",
          title: "Anaphylaxis Management",
          mechanics: "mcq",
          objective: "Recognize and treat anaphylaxis",
          scenario: "Patient post-bee sting. Stridor, widespread urticaria, BP 70/40, HR 130.",
          questions: [
            {
              id: "3D-B-q1",
              stem: "What is the FIRST-line treatment?",
              timeLimit: 30,
              options: [
                { id: "a", text: "IM Adrenaline 0.5mg (1:1000)", correct: true, explanation: "IM adrenaline is life-saving in anaphylaxis. Give immediately in lateral thigh." },
                { id: "b", text: "IV Chlorphenamine", correct: false, explanation: "Chlorphenamine is not the first-line treatment for anaphylaxis." },
                { id: "c", text: "IV Hydrocortisone", correct: false, explanation: "Hydrocortisone is not the first-line treatment for anaphylaxis." },
                { id: "d", text: "Nebulized salbutamol", correct: false, explanation: "Salbutamol is used for bronchospasm, not anaphylaxis." }
              ]
            },
            {
              id: "3D-B-q2",
              stem: "What is the correct positioning?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Supine with legs elevated", correct: true, explanation: "This improves venous return and cardiac output." },
                { id: "b", text: "Upright sitting", correct: false, explanation: "Upright positioning may worsen respiratory distress in anaphylaxis." },
                { id: "c", text: "Recovery position", correct: false, explanation: "Recovery position is not the preferred positioning for anaphylaxis." },
                { id: "d", text: "Trendelenburg", correct: false, explanation: "Trendelenburg positioning is not indicated for anaphylaxis." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "3N-A",
          title: "Airway Management",
          mechanics: "mcq",
          objective: "Select and insert appropriate airway adjunct",
          scenario: "Patient unconscious, snoring respirations, GCS 8.",
          questions: [
            {
              id: "3N-A-q1",
              stem: "How do you measure a Guedel (oropharyngeal) airway?",
              timeLimit: 45,
              options: [
                { id: "a", text: "From incisors to angle of jaw", correct: true, explanation: "Correct sizing prevents trauma and ensures airway patency." },
                { id: "b", text: "From nose to earlobe", correct: false, explanation: "This measurement is not used for Guedel airway sizing." },
                { id: "c", text: "From chin to sternum", correct: false, explanation: "This measurement is not used for Guedel airway sizing." },
                { id: "d", text: "Width of patient's thumb", correct: false, explanation: "This is not a standard method for measuring Guedel airways." }
              ]
            },
            {
              id: "3N-A-q2",
              stem: "When should you NOT use an oropharyngeal airway?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Patient with intact gag reflex", correct: true, explanation: "OPA will trigger vomiting/laryngospasm if gag reflex present." },
                { id: "b", text: "Unconscious patient", correct: false, explanation: "Unconscious patients may require airway adjuncts." },
                { id: "c", text: "Patient with snoring respirations", correct: false, explanation: "Snoring respirations may indicate partial airway obstruction." },
                { id: "d", text: "Patient with GCS 3", correct: false }
              ]
            }
          ]
        },
        {
          id: "3N-B",
          title: "Crash Team Response",
          mechanics: "drag_drop",
          objective: "Assign roles during cardiac arrest",
          scenario: "Crash call activated. You are the first nurse on scene. Organize the team.",
          questions: [
            {
              id: "3N-B-q1",
              stem: "Match the team member to their role.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Team Leader", role: "Coordinates, does not perform tasks" },
                { id: "b", label: "Airway", role: "Manages airway and breathing" },
                { id: "c", label: "Compressor", role: "Performs chest compressions" },
                { id: "d", label: "Drugs/Access", role: "IV access and medication administration" },
                { id: "e", label: "Recorder", role: "Documents timing and interventions" }
              ],
              options: [
                { id: "a", text: "All roles correctly assigned", correct: true, explanation: "Clear role allocation prevents chaos during arrest." },
                { id: "b", text: "Some roles incorrect", correct: false, explanation: "Each team member should have a clear and appropriate role." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 04: FLUIDS & SHOCK
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    num: "04",
    level: "clerkship",
    title: "Fluids & Shock",
    subtitle: "The Science of Resuscitation",
    tagline: "Circulation is life. Know when to fill and when to squeeze.",
    estimatedMinutes: { doctor: 50, nurse: 45 },
    passMark: 70,
    xpReward: 175,
    media: {
      images: {
        "4A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/ed_ambience.mp3",
      pdfs: { "fluid_resuscitation": "/pdfs/class04_fluids.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "4D-A",
          title: "Hypovolaemic Shock",
          mechanics: "mcq",
          objective: "Prescribe appropriate fluid resuscitation",
          scenario: "Trauma patient, BP 80/40, HR 130, cold peripheries, CRT 4 seconds.",
          questions: [
            {
              id: "4D-A-q1",
              stem: "Which fluid is preferred for initial trauma resuscitation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Balanced Crystalloid (e.g., Hartmann's)", correct: true, explanation: "Balanced crystalloids avoid hyperchloraemic acidosis seen with 0.9% saline." },
                { id: "b", text: "5% Dextrose", correct: false, explanation: "Dextrose is not used for fluid resuscitation in trauma." },
                { id: "c", text: "Colloids (e.g., Gelofusin)", correct: false, explanation: "Colloids are not first-line for initial trauma resuscitation." },
                { id: "d", text: "Blood products immediately", correct: false, explanation: "Blood products are not the first-line treatment for hypovolaemic shock." }
              ]
            },
            {
              id: "4D-A-q2",
              stem: "What is the target MAP in septic shock?",
              timeLimit: 45,
              options: [
                { id: "a", text: "65 mmHg", correct: true, explanation: "MAP ≥65 mmHg ensures adequate organ perfusion." },
                { id: "b", text: "45 mmHg", correct: false, explanation: "This is too low for adequate organ perfusion." },
                { id: "c", text: "85 mmHg", correct: false, explanation: "This is unnecessarily high and may cause complications." },
                { id: "d", text: "100 mmHg", correct: false, explanation: "This is unnecessarily high and may cause complications." }
              ]
            }
          ]
        },
        {
          id: "4D-B",
          title: "Fluid Prescription",
          mechanics: "text_input",
          objective: "Calculate daily fluid requirements",
          scenario: "70-year-old nil-by-mouth post-op. Weight 70kg. Calculate maintenance fluids.",
          questions: [
            {
              id: "4D-B-q1",
              stem: "Using the 4-2-1 rule, what is the hourly maintenance rate?",
              timeLimit: 90,
              textAnswer: "110",
              tolerance: 5,
              options: [
                { id: "a", text: "110 ml/hour", correct: true, explanation: "(10×4) + (10×2) + (50×1) = 110 ml/hr for 70kg patient." },
                { id: "b", text: "70 ml/hour", correct: false, explanation: "This would be the rate for a 50kg patient." },
                { id: "c", text: "140 ml/hour", correct: false, explanation: "This would be the rate for a 90kg patient." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "4N-A",
          title: "Cannulation & Infusion",
          mechanics: "mcq",
          objective: "Select appropriate cannula for clinical scenario",
          scenario: "Doctor orders 500ml Saline bolus over 15 minutes for hypovolaemic patient.",
          questions: [
            {
              id: "4N-A-q1",
              stem: "Which cannula has the largest bore for rapid fluids?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Grey (16G) or Orange (14G)", correct: true, explanation: "Large bore cannulas allow rapid fluid administration. Grey 16G or Orange 14G are best for resuscitation." },
                { id: "b", text: "Blue (22G)", correct: false, explanation: "Blue 22G is too small for rapid fluid administration." },
                { id: "c", text: "Pink (20G)", correct: false, explanation: "Pink 20G is not typically used for rapid fluid administration." },
                { id: "d", text: "Green (18G)", correct: false, explanation: "Green 18G is not the largest bore option." }
              ]
            },
            {
              id: "4N-A-q2",
              stem: "How do you calculate the flow rate for 500ml over 15 minutes?",
              timeLimit: 60,
              options: [
                { id: "a", text: "2000 ml/hour or 33 drops/minute (20 drops/ml set)", correct: true, explanation: "500ml × (60/15min) = 2000 ml/hr. For 20 drops/ml: 2000/60 × 20 = 33 drops/min." },
                { id: "b", text: "500 ml/hour", correct: false, explanation: "This is not the correct flow rate for 500ml over 15 minutes." },
                { id: "c", text: "125 ml/hour", correct: false, explanation: "This is not the correct flow rate for 500ml over 15 minutes." },
                { id: "d", text: "1000 ml/hour", correct: false, explanation: "This is not the correct flow rate for 500ml over 15 minutes." }
              ]
            }
          ]
        }
      ]
    }
  }
];