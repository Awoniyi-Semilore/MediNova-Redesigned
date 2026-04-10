// fellowship.js - Classes 15-18: Sub-specialty Mastery & Leadership
// Complex cases requiring team direction and advanced decision-making

export const FELLOWSHIP = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 15: PAEDIATRICS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 15,
    num: "15",
    level: "fellowship",
    title: "Paediatrics",
    subtitle: "Neonatal Emergencies, Sepsis & Dehydration",
    tagline: "Small patients, big decisions. Precision is everything.",
    estimatedMinutes: { doctor: 70, nurse: 65 },
    passMark: 85,
    xpReward: 450,
    media: {
      images: {
        "15A": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800"
      },
      ambience: "/audio/paediatric_ward.mp3",
      pdfs: { "paediatric_sepsis": "/pdfs/class15_paeds_sepsis.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "15D-A",
          title: "Meningococcal Sepsis",
          mechanics: "mcq",
          objective: "Recognize purpura fulminans and execute paediatric sepsis protocol",
          scenario: "3-year-old with purple 'starry' rash. HR 175, BP 65/40, CRT 5 seconds, lethargic.",
          questions: [
            {
              id: "15D-A-q1",
              stem: "What is the immediate fluid bolus for a 15kg child in shock?",
              timeLimit: 45,
              options: [
                { id: "a", text: "300ml (20ml/kg)", correct: true, explanation: "20ml/kg boluses in paediatric shock - reassess after each." },
                { id: "b", text: "150ml (10ml/kg)", correct: false, explanation: "10ml/kg may be used in cardiogenic shock, but initial bolus for septic shock is 20ml/kg." },
                { id: "c", text: "500ml (33ml/kg)", correct: false, explanation: "500ml (33ml/kg) is a larger volume and may be used in more severe cases." },
                { id: "d", text: "50ml (3ml/kg)", correct: false, explanation: "50ml (3ml/kg) is a smaller volume and may be used in less severe cases." }
              ]
            },
            {
              id: "15D-A-q2",
              stem: "What is the antibiotic urgency?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 1 hour - ideally within minutes if septic shock suspected", correct: true, explanation: "Every minute counts in paediatric sepsis - give antibiotics immediately after cultures." },
                { id: "b", text: "Within 4 hours", correct: false, explanation: "Delaying antibiotic administration can be life-threatening in paediatric sepsis." },
                { id: "c", text: "After CT scan", correct: false, explanation: "CT scan is not a prerequisite for initiating antibiotic therapy in suspected sepsis." },
                { id: "d", text: "After LP", correct: false, explanation: "Lumbar puncture is not a prerequisite for initiating antibiotic therapy in suspected sepsis." }
              ]
            },
            {
              id: "15D-A-q3",
              stem: "What does the non-blanching rash indicate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "DIC with vascular thrombosis", correct: true, explanation: "Purpura fulminans = DIC causing skin necrosis - requires urgent treatment + plastic surgery input." },
                { id: "b", text: "Allergic reaction", correct: false, explanation: "Allergic reactions typically present with itching, hives, or swelling." },
                { id: "c", text: "Viral exanthem", correct: false, explanation: "Viral exanthems are usually benign and do not present with non-blanching rash." },
                { id: "d", text: "Heat rash", correct: false, explanation: "Heat rash is a benign condition that does not cause non-blanching lesions." }
              ]
            }
          ]
        },
        {
          id: "15D-B",
          title: "Bronchiolitis & Respiratory Distress",
          mechanics: "mcq",
          objective: "Assess work of breathing and decide on respiratory support",
          scenario: "6-month-old with 'see-saw' breathing, subcostal recession, feeding poorly. RR 65.",
          questions: [
            {
              id: "15D-B-q1",
              stem: "What is the primary treatment for moderate bronchiolitis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Supportive care (feeding/hydration)", correct: true, explanation: "No evidence for bronchodilators or steroids in bronchiolitis - supportive care only." },
                { id: "b", text: "Salbutamol nebulisers", correct: false, explanation: "Salbutamol is not effective in bronchiolitis." },
                { id: "c", text: "Steroids", correct: false, explanation: "Steroids are not effective in bronchiolitis." },
                { id: "d", text: "Antibiotics", correct: false, explanation: "Antibiotics are not effective in bronchiolitis as it is typically viral." }
              ]
            },
            {
              id: "15D-B-q2",
              stem: "What indicates severe respiratory distress requiring CPAP?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Severe recession + grunting + inability to feed", correct: true, explanation: "Severe work of breathing with feeding compromise = CPAP indication." },
                { id: "b", text: "Mild cough", correct: false, explanation: "Mild cough is not indicative of severe respiratory distress." },
                { id: "c", text: "Fever alone", correct: false, explanation: "Fever alone is not indicative of severe respiratory distress." },
                { id: "d", text: "Happy wheezer", correct: false, explanation: "A 'happy wheezer' is a term used to describe a child who is wheezing but otherwise well, which is not indicative of severe respiratory distress." }
              ]
            }
          ]
        },
        {
          id: "15D-C",
          title: "Paediatric Dehydration",
          mechanics: "text_input",
          objective: "Calculate fluid deficit and prescribe DKA fluids",
          scenario: "8-year-old diabetic. Weight 25kg. Estimated 8% dehydrated. pH 7.15, Glucose 28.",
          questions: [
            {
              id: "15D-C-q1",
              stem: "What is the fluid deficit?",
              timeLimit: 60,
              textAnswer: "2000",
              tolerance: 100,
              options: [
                { id: "a", text: "2000ml (8% of 25kg)", correct: true, explanation: "8% dehydration = 80ml/kg deficit. 25kg × 80ml = 2000ml." },
                { id: "b", text: "250ml", correct: false, explanation: "This is too low for an 8% dehydration." },
                { id: "c", text: "5000ml", correct: false, explanation: "This is too high for an 8% dehydration." }
              ]
            },
            {
              id: "15D-C-q2",
              stem: "Over how many hours should deficit replacement occur?",
              timeLimit: 45,
              options: [
                { id: "a", text: "48 hours", correct: true, explanation: "Paediatric DKA: replace deficit over 48 hours to prevent cerebral oedema." },
                { id: "b", text: "24 hours", correct: false, explanation: "24 hours is too rapid for paediatric DKA fluid replacement." },
                { id: "c", text: "12 hours", correct: false, explanation: "12 hours is too rapid for paediatric DKA fluid replacement." },
                { id: "d", text: "72 hours", correct: false, explanation: "72 hours is too slow for paediatric DKA fluid replacement." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "15N-A",
          title: "Paediatric GCS Assessment",
          mechanics: "mcq",
          objective: "Apply modified GCS for non-verbal children",
          scenario: "Assessing 2-year-old post head injury. Eyes open to pain, withdraws to pain, crying but inconsolable.",
          questions: [
            {
              id: "15N-A-q1",
              stem: "What is the verbal score for inconsolable crying?",
              timeLimit: 45,
              options: [
                { id: "a", text: "2 (Incomprehensible)", correct: true, explanation: "Modified paediatric GCS: Crying but inconsolable = 2." },
                { id: "b", text: "5 (Oriented)", correct: false, explanation: "5 indicates the child is oriented and can follow commands." },
                { id: "c", text: "1 (None)", correct: false, explanation: "1 indicates no verbal response." },
                { id: "d", text: "4 (Confused)", correct: false, explanation: "4 indicates the child is confused or disoriented." }
              ]
            },
            {
              id: "15N-A-q2",
              stem: "What is the total GCS?",
              timeLimit: 45,
              options: [
                { id: "a", text: "9 (E2, V2, M5)", correct: true, explanation: "Eyes to pain=2, Verbal crying=2, Motor withdraws=5. Total=9." },
                { id: "b", text: "15", correct: false, explanation: "15 indicates the child is fully alert and oriented." },
                { id: "c", text: "3", correct: false, explanation: "3 indicates the child is in a coma." },
                { id: "d", text: "12", correct: false, explanation: "12 indicates the child has a moderate level of consciousness." }
              ]
            }
          ]
        },
        {
          id: "15N-B",
          title: "Paediatric Medication Safety",
          mechanics: "mcq",
          objective: "Double-check weight-based dosing",
          scenario: "Paracetamol prescribed for 18kg child. Dose 480mg. Is this safe?",
          questions: [
            {
              id: "15N-B-q1",
              stem: "What is the maximum single dose of paracetamol for this child?",
              timeLimit: 45,
              options: [
                { id: "a", text: "480mg (15mg/kg × 18kg = 270mg... wait, 480mg is too high!)", correct: true, explanation: "15mg/kg × 18 = 270mg max. 480mg is an overdose - check prescription!" },
                { id: "b", text: "480mg is correct", correct: false, explanation: "480mg is an overdose for an 18kg child." },
                { id: "c", text: "1000mg", correct: false, explanation: "1000mg is too high for an 18kg child." },
                { id: "d", text: "No maximum", correct: false, explanation: "There is a maximum dose for paracetamol based on weight." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 16: PSYCHIATRY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 16,
    num: "16",
    level: "fellowship",
    title: "Psychiatry",
    subtitle: "Acute Agitation, Mental Health Act & Risk",
    tagline: "The mind in crisis requires both compassion and boundaries.",
    estimatedMinutes: { doctor: 65, nurse: 60 },
    passMark: 85,
    xpReward: 425,
    media: {
      images: {
        "16A": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
      },
      ambience: "/audio/psychiatric_unit.mp3",
      pdfs: { "mental_health_act": "/pdfs/class16_mha.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "16D-A",
          title: "Sectioning Under Mental Health Act",
          mechanics: "mcq",
          objective: "Apply Section 5(2) and understand legal framework",
          scenario: "Patient suicidal, trying to leave ward. No capacity. Previous section 3 patient.",
          questions: [
            {
              id: "16D-A-q1",
              stem: "How long does Section 5(2) last?",
              timeLimit: 45,
              options: [
                { id: "a", text: "72 hours", correct: true, explanation: "Section 5(2) is doctor's holding power - up to 72 hours for assessment." },
                { id: "b", text: "28 days", correct: false, explanation: "28 days is the maximum for Section 2, not 5(2)." },
                { id: "c", text: "6 months", correct: false, explanation: "6 months is not a standard duration for any Section." },
                { id: "d", text: "24 hours", correct: false, explanation: "24 hours is too short for a Section 5(2) hold." }
              ]
            },
            {
              id: "16D-A-q2",
              stem: "What is required for Section 5(2)?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Patient already informal inpatient + needs urgent assessment", correct: true, explanation: "5(2) converts informal to detained for assessment - only for inpatients." },
                { id: "b", text: "Any patient in A&E", correct: false, explanation: "Section 5(2) is not applicable to all patients in A&E." },
                { id: "c", text: "Two doctors required", correct: false, explanation: "Only one doctor is required for Section 5(2)." },
                { id: "d", text: "Police involvement", correct: false, explanation: "Police involvement is not a requirement for Section 5(2)." }
              ]
            },
            {
              id: "16D-A-q3",
              stem: "What is the next step after 5(2) if detention continues?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Section 2 (Assessment) or Section 3 (Treatment)", correct: true, explanation: "5(2) is bridge to formal assessment (S2) or treatment (S3) section." },
                { id: "b", text: "Section 136", correct: false, explanation: "Section 136 is for immediate detention in a psychiatric hospital." },
                { id: "c", text: "Discharge immediately", correct: false, explanation: "Discharge is not an option if the patient is detained under Section 5(2)." },
                { id: "d", text: "Police custody", correct: false, explanation: "Police custody is not a legal mechanism for detaining patients under the Mental Health Act." }
              ]
            }
          ]
        },
        {
          id: "16D-B",
          title: "Capacity Assessment",
          mechanics: "drag_drop",
          objective: "Apply MCA 2005 two-stage test",
          scenario: "Patient with bipolar mania refusing lithium. Talkative, grandiose, spending recklessly.",
          questions: [
            {
              id: "16D-B-q1",
              stem: "Match the MCA stage to the assessment.",
              timeLimit: 90,
              dragItems: [
                { id: "1", label: "Stage 1: Diagnostic", test: "Is there an impairment of mind or brain?" },
                { id: "2", label: "Stage 2: Functional", test: "Can they understand, retain, use/weigh, communicate?" },
                { id: "3", label: "Decision", test: "If lack capacity, decision in best interests" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "MCA two-stage: First establish impairment, then test functional capacity." },
                { id: "b", text: "Some errors", correct: false, explanation: "Some items are not correctly matched." }
              ]
            },
            {
              id: "16D-B-q2",
              stem: "Does this patient lack capacity for lithium decision?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Yes - mania impairs ability to weigh information", correct: true, explanation: "Grandiose mania impairs insight and ability to weigh treatment risks/benefits." },
                { id: "b", text: "No - they can communicate", correct: false, explanation: "Communication does not necessarily indicate capacity." },
                { id: "c", text: "Yes - because they refuse", correct: false, explanation: "Refusal alone does not indicate lack of capacity." },
                { id: "d", text: "No - they understand the words", correct: false, explanation: "Understanding words does not necessarily indicate capacity." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "16N-A",
          title: "Rapid Tranquillisation",
          mechanics: "mcq",
          objective: "Administer IM sedation safely and monitor appropriately",
          scenario: "Patient physically aggressive toward staff. IM Haloperidol and Lorazepam given per policy.",
          questions: [
            {
              id: "16N-A-q1",
              stem: "What is the mandatory monitoring after IM sedation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Physical observations every 15-30 minutes", correct: true, explanation: "Close monitoring for respiratory depression, hypotension, oversedation." },
                { id: "b", text: "Check pupils once", correct: false },
                { id: "c", text: "No monitoring needed", correct: false },
                { id: "d", text: "Daily weight", correct: false }
              ]
            },
            {
              id: "16N-A-q2",
              stem: "What is the aim of rapid tranquillisation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Reduce agitation to allow assessment - NOT unconsciousness", correct: true, explanation: "RT aims for calm, not sleep. Patient should be rousable and communicative." },
                { id: "b", text: "Induce deep sleep", correct: false, explanation: "Inducing deep sleep is dangerous and not the goal of RT." },
                { id: "c", text: "Treat underlying illness", correct: false, explanation: "RT is symptomatic treatment for agitation, not a cure for the underlying psychiatric condition." },
                { id: "d", text: "Punish aggression", correct: false, explanation: "Punishment is not a valid objective for rapid tranquillisation." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 17: MAJOR TRAUMA
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 17,
    num: "17",
    level: "fellowship",
    title: "Trauma Surgery",
    subtitle: "ATLS, Damage Control & The Lethal Triad",
    tagline: "Trauma is a surgical disease. Speed saves lives.",
    estimatedMinutes: { doctor: 75, nurse: 70 },
    passMark: 90,
    xpReward: 500,
    media: {
      images: {
        "17A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/resus_ambience.mp3",
      pdfs: { "atls_manual": "/pdfs/class17_atls.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "17D-A",
          title: "ATLS Primary Survey",
          mechanics: "drag_drop",
          objective: "Execute ABCDE in correct sequence with simultaneous interventions",
          scenario: "RTC victim. Trachea deviated, absent breath sounds right, hypotensive, confused.",
          questions: [
            {
              id: "17D-A-q1",
              stem: "Arrange the ABCDE interventions in priority order.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "A - Airway", action: "Jaw thrust, suction, consider definitive airway" },
                { id: "b", label: "B - Breathing", action: "Needle decompression right chest" },
                { id: "c", label: "C - Circulation", action: "2 large bore IVs, O-neg blood, stop external bleeding" },
                { id: "d", label: "D - Disability", action: "GCS, pupil check, glucose" },
                { id: "e", label: "E - Exposure", action: "Remove clothes, prevent hypothermia" }
              ],
              options: [
                { id: "a", text: "A→B→C→D→E correct sequence", correct: true, explanation: "ABCDE sequence identifies life threats in priority order." },
                { id: "b", text: "Wrong sequence", correct: false, explanation: "Incorrect sequence can lead to missed life threats and worse outcomes." }
              ]
            },
            {
              id: "17D-A-q2",
              stem: "Where do you needle decompress for tension pneumothorax?",
              timeLimit: 45,
              options: [
                { id: "a", text: "2nd intercostal space, mid-clavicular line", correct: true, explanation: "2nd ICS MCL for emergency decompression. 5th ICS mid-axillary for chest drain." },
                { id: "b", text: "5th intercostal space, mid-axillary line", correct: false, explanation: "This is the location for a chest drain, not emergency decompression." },
                { id: "c", text: "Over the liver", correct: false, explanation: "This is not a valid location for needle decompression." },
                { id: "d", text: "Sub-xiphoid", correct: false, explanation: "This is not a valid location for needle decompression." }
              ]
            },
            {
              id: "17D-A-q3",
              stem: "What is the lethal triad in trauma?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Hypothermia, Acidosis, Coagulopathy", correct: true, explanation: "The lethal triad - each worsens the others. Break the cycle with damage control surgery." },
                { id: "b", text: "Sepsis, Bleeding, Pain", correct: false, explanation: "These are serious conditions but not part of the lethal triad." },
                { id: "c", text: "Hypoxia, Hypercarbia, Hypotension", correct: false, explanation: "These are important but not the defining components of the lethal triad." },
                { id: "d", text: "Infection, Malnutrition, Dehydration", correct: false, explanation: "These are serious conditions but not the lethal triad." }
              ]
            }
          ]
        },
        {
          id: "17D-B",
          title: "Damage Control Surgery",
          mechanics: "mcq",
          objective: "Recognize when to stop definitive surgery and pack",
          scenario: "Laparotomy for liver injury. BP 70/40 despite 6 units PRBC. pH 7.15, Temp 33°C, PT 25.",
          questions: [
            {
              id: "17D-B-q1",
              stem: "What is your decision?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Pack abdomen, temporary closure, ICU for rewarming/resuscitation", correct: true, explanation: "Damage control surgery: stop before lethal triad worsens. Return when stable." },
                { id: "b", text: "Continue definitive repair", correct: false, explanation: "Continuing definitive repair in the presence of the lethal triad can be fatal." },
                { id: "c", text: "Close and discharge to ward", correct: false, explanation: "Discharging the patient without addressing the lethal triad is dangerous." },
                { id: "d", text: "Amputate", correct: false, explanation: "Amputation is not a standard approach for managing the lethal triad." }
              ]
            },
            {
              id: "17D-B-q2",
              stem: "What is the target temperature?",
              timeLimit: 45,
              options: [
                { id: "a", text: ">35°C before return to theatre", correct: true, explanation: "Rewarm to >35°C, correct coagulopathy, then return for definitive surgery." },
                { id: "b", text: "32°C", correct: false, explanation: "32°C is too low for safe return to theatre." },
                { id: "c", text: "30°C", correct: false, explanation: "30°C is too low for safe return to theatre." },
                { id: "d", text: "Temperature doesn't matter", correct: false, explanation: "Temperature is crucial for safe return to theatre." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "17N-A",
          title: "Massive Transfusion Protocol",
          mechanics: "mcq",
          objective: "Coordinate blood products and monitor for complications",
          scenario: "Active internal haemorrhage. MTP activated. BP 60/30.",
          questions: [
            {
              id: "17N-A-q1",
              stem: "What is the typical MTP ratio?",
              timeLimit: 45,
              options: [
                { id: "a", text: "1:1:1 (RBC:FFP:Platelets)", correct: true, explanation: "1:1:1 ratio approximates whole blood and improves outcomes in massive haemorrhage." },
                { id: "b", text: "4:1:1", correct: false, explanation: "This ratio is not standard for massive transfusion." },
                { id: "c", text: "PRBC only", correct: false, explanation: "PRBC alone is insufficient for managing massive haemorrhage." },
                { id: "d", text: "Crystalloid only", correct: false, explanation: "Crystalloid solutions are not appropriate for managing massive haemorrhage." }
              ]
            },
            {
              id: "17N-A-q2",
              stem: "What calcium monitoring is required?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ionized calcium - citrate in blood products causes hypocalcaemia", correct: true, explanation: "Massive transfusion causes hypocalcaemia from citrate toxicity - monitor and replace." },
                { id: "b", text: "Total calcium only", correct: false, explanation: "Total calcium monitoring is not sufficient for managing massive haemorrhage." },
                { id: "c", text: "No monitoring needed", correct: false, explanation: "Calcium monitoring is essential for managing massive haemorrhage." },
                { id: "d", text: "Magnesium only", correct: false, explanation: "Magnesium monitoring is not typically required for managing massive haemorrhage." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 18: GERIATRIC MEDICINE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 18,
    num: "18",
    level: "fellowship",
    title: "Geriatrics",
    subtitle: "Frailty, Delirium & Polypharmacy",
    tagline: "Age is not a disease. Frailty is.",
    estimatedMinutes: { doctor: 60, nurse: 55 },
    passMark: 85,
    xpReward: 425,
    media: {
      images: {
        "18A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/gi_bleed_ambience.mp3",
      pdfs: { "nice_delirium": "/pdfs/class18_delirium.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "18D-A",
          title: "Delirium vs Dementia",
          mechanics: "mcq",
          objective: "Differentiate and manage acute confusion",
          scenario: "85-year-old with dementia suddenly hallucinating, agitated, not sleeping. Post-op day 2 from hip replacement.",
          questions: [
            {
              id: "18D-A-q1",
              stem: "What is the hallmark difference between delirium and dementia?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Delirium has acute onset and fluctuates", correct: true, explanation: "Delirium = acute, fluctuating, reversible. Dementia = chronic, progressive." },
                { id: "b", text: "Dementia is reversible", correct: false, explanation: "Dementia is typically irreversible, while delirium is potentially reversible." },
                { id: "c", text: "Delirium only affects memory", correct: false, explanation: "Delirium affects attention and awareness, not just memory." },
                { id: "d", text: "Dementia causes hallucinations only", correct: false, explanation: "Dementia can cause various cognitive symptoms, not just hallucinations." }
              ]
            },
            {
              id: "18D-A-q2",
              stem: "What is the first-line management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Multicomponent non-pharmacological interventions", correct: true, explanation: "Reorientation, sleep hygiene, vision/hearing aids, mobilization - medication last resort." },
                { id: "b", text: "Haloperidol immediately", correct: false, explanation: "Haloperidol is not the first-line treatment for delirium." },
                { id: "c", text: "Physical restraint", correct: false, explanation: "Physical restraint is not recommended for managing delirium." },
                { id: "d", text: "Sedation to sleep", correct: false, explanation: "Sedation should be used cautiously and only when necessary." }
              ]
            },
            {
              id: "18D-A-q3",
              stem: "Which medication likely precipitated this?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Tramadol (opioid analgesia)", correct: true, explanation: "Opioids, anticholinergics, benzodiazepines common delirium precipitants in elderly." },
                { id: "b", text: "Paracetamol", correct: false, explanation: "Paracetamol is not typically associated with delirium." },
                { id: "c", text: "Vitamin D", correct: false, explanation: "Vitamin D is not a common cause of delirium." },
                { id: "d", text: "Thyroxine", correct: false, explanation: "Thyroxine is not a common cause of delirium." }
              ]
            }
          ]
        },
        {
          id: "18D-B",
          title: "Comprehensive Geriatric Assessment",
          mechanics: "drag_drop",
          objective: "Assess frailty domains and plan multidisciplinary care",
          scenario: "90-year-old recurrent falls, weight loss, polypharmacy, social isolation.",
          questions: [
            {
              id: "18D-B-q1",
              stem: "Match the CGA domain to the assessment tool.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Physical function", tool: "Barthel ADL index" },
                { id: "b", label: "Cognition", tool: "MMSE or MoCA" },
                { id: "c", label: "Nutrition", tool: "MUST score" },
                { id: "d", label: "Falls risk", tool: "Timed Up and Go" },
                { id: "e", label: "Frailty", tool: "Clinical Frailty Scale" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "CGA uses validated tools across all domains." },
                { id: "b", text: "Some errors", correct: false, explanation: "There are some mismatches in the domain-tool pairings." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "18N-A",
          title: "Pressure Area Care",
          mechanics: "mcq",
          objective: "Calculate Waterlow score and implement prevention",
          scenario: "Patient immobile and incontinent. Waterlow score calculated.",
          questions: [
            {
              id: "18N-A-q1",
              stem: "Which grade is full-thickness skin loss?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Grade 3", correct: true, explanation: "Grade 3: Full thickness skin loss. Grade 4: Extensive destruction/tissue necrosis." },
                { id: "b", text: "Grade 1", correct: false, explanation: "Grade 1: Intact skin with non-blanchable redness." },
                { id: "c", text: "Grade 2", correct: false, explanation: "Grade 2: Partial thickness skin loss with exposed dermis." },
                { id: "d", text: "Grade 4", correct: false, explanation: "Grade 4: Extensive destruction/tissue necrosis." }
              ]
            },
            {
              id: "18N-A-q2",
              stem: "What Waterlow score triggers high risk?",
              timeLimit: 45,
              options: [
                { id: "a", text: ">10", correct: true, explanation: "Waterlow >10 = at risk, >15 = high risk, >20 = very high risk." },
                { id: "b", text: ">5", correct: false, explanation: "Waterlow >5 = at risk." },
                { id: "c", text: ">25", correct: false, explanation: "Waterlow >25 = very high risk." },
                { id: "d", text: ">50", correct: false, explanation: "Waterlow >50 is not a standard threshold."}
              ]
            }
          ]
        }
      ]
    }
  }
];