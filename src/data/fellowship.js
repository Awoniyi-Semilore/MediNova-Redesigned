export const FELLOWSHIP = [
  // CLASS 15: PEDIATRICS
  {
    id: 15, num: "15", level: "fellowship", title: "Pediatrics", subtitle: "Meningococcal Sepsis",
    doctor: {
      sims: [
        {
          id: "15D-A", title: "Case 1: The Non-Blanching Rash",
          scenario: "A 3-year-old is brought in with a purple 'starry' rash. HR 160, BP 70/40.",
          task: "Perform rapid fluid resuscitation (20ml/kg) and initiate ceftriaxone.",
          questions: [{ id: "q1", stem: "What is the fluid bolus volume for a 15kg child in shock?", options: [{text: "300ml", correct: true}, {text: "150ml", correct: false}] }]
        },
        {
          id: "15D-B", title: "Case 2: The Wet Lung (Bronchiolitis)",
          scenario: "6-month-old infant with 'see-saw' breathing and subcostal recession.",
          task: "Assess the work of breathing and decide on respiratory support.",
          questions: [{ id: "q1", stem: "What is the primary treatment for mild bronchiolitis?", options: [{text: "Supportive care (Feeding/Hydration)", correct: true}, {text: "Salbutamol nebs", correct: false}] }]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "15N-A", title: "Case 1: Pediatric GCS (pGCS)",
          scenario: "Assessing a child's level of consciousness after a fall.",
          task: "Apply the modified GCS for non-verbal children.",
          questions: [{ id: "q1", stem: "A child who 'shouts/screams' in response to pain scores what for Verbal?", options: [{text: "2 (Incomprehensible)", correct: true}, {text: "5 (Oriented)", correct: false}] }]
        }
      ]
    }
  },

  // CLASS 16: PSYCHIATRY
  {
    id: 16, num: "16", title: "Psychiatry", subtitle: "Acute Agitation & Mental Health Act",
    doctor: {
      sims: [
        {
          id: "16D-A", title: "Case 1: Sectioning (MHA)",
          scenario: "Patient is suicidal and trying to leave the ward. No capacity.",
          task: "Apply Section 5(2) — Doctor's Holding Power.",
          questions: [{ id: "q1", stem: "How long does a Section 5(2) last?", options: [{text: "72 hours", correct: true}, {text: "28 days", correct: false}] }]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "16N-A", title: "Case 1: Rapid Tranquillisation",
          scenario: "Patient is physically aggressive toward staff.",
          task: "Administer IM Haloperidol and Lorazepam per hospital policy.",
          questions: [{ id: "q1", stem: "What is the mandatory monitoring after IM sedation?", options: [{text: "Physical observations every 15-30 mins", correct: true}, {text: "Check pupils once", correct: false}] }]
        }
      ]
    }
  },

  // CLASS 17: MAJOR TRAUMA
  {
    id: 17, num: "17", title: "Trauma Surgery", subtitle: "The Pan-Scan & Lethal Triad",
    doctor: {
      sims: [
        {
          id: "17D-A", title: "Case 1: ATLS Primary Survey",
          scenario: "RTC victim. Trachea deviated, absent breath sounds on the right.",
          task: "Perform needle decompression for Tension Pneumothorax.",
          questions: [{ id: "q1", stem: "Where is the needle inserted for decompression?", options: [{text: "2nd ICS, mid-clavicular line", correct: true}, {text: "5th ICS, mid-axillary line", correct: false}] }]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "17N-A", title: "Case 1: The Massive Transfusion Protocol",
          scenario: "Active internal hemorrhage. BP 60/30.",
          task: "Coordinate the delivery of O-negative blood and FFP.",
          questions: [{ id: "q1", stem: "What is the 'Lethal Triad' in trauma?", options: [{text: "Acidosis, Coagulopathy, Hypothermia", correct: true}, {text: "Sepsis, Bleeding, Pain", correct: false}] }]
        }
      ]
    }
  },

  // CLASS 18: GERIATRIC MEDICINE
  {
    id: 18, num: "18", title: "Geriatrics", subtitle: "The Frailty Syndrome",
    doctor: {
      sims: [
        {
          id: "18D-A", title: "Case 1: The Confused Elder",
          scenario: "85-year-old with dementia is suddenly hallucinating.",
          task: "Perform a CAM (Confusion Assessment Method) for Delirium.",
          questions: [{ id: "q1", stem: "What is the hallmark difference between Dementia and Delirium?", options: [{text: "Delirium has an acute onset and fluctuates", correct: true}, {text: "Dementia is reversible", correct: false}] }]
        }
      ]
    },
    nurse: {
      sims: [
        {
          id: "18N-A", title: "Case 1: Pressure Area Care",
          scenario: "Patient is immobile and incontinent.",
          task: "Calculate the Waterlow Score and order a dynamic mattress.",
          questions: [{ id: "q1", stem: "Which grade is a pressure ulcer with full-thickness skin loss?", options: [{text: "Grade 3", correct: true}, {text: "Grade 1", correct: false}] }]
        }
      ]
    }
  }
];