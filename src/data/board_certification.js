// ─────────────────────────────────────────────────────────────────────────────
// MEDINOVA — BOARD CERTIFICATION (CLASSES 19–20)
// ─────────────────────────────────────────────────────────────────────────────

export const BOARD_CERTIFICATION = [
  // CLASS 19: MULTI-SYSTEM FAILURE
  {
    id: 19,
    num: "19",
    level: "board_certification",
    title: "Advanced Clinical Reasoning",
    subtitle: "Multi-System Organ Failure",
    tagline: "The final exam part one. No hints. No help.",
    estimatedMinutes: { doctor: 60, nurse: 60 },
    passMark: 95,
    xpReward: 1000,
    certificateTitle: "Board Certified Clinician — Part I",
    media: {
      images: { "19A-i": { scenario: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" } },
      audio: { "intro": "/audio/board_intro_final.mp3" }
    },
    doctor: {
      sims: [{
        id: "19A",
        title: "The Dying Patient",
        subsims: [{
          id: "19A-i",
          title: "Ethics and Escalation",
          scenario: "Patient with multi-organ failure. Family wants 'everything done'. Medicine is futile.",
          questions: [{
            id: "q1",
            stem: "Who has the final legal authority regarding the decision to perform CPR in a hospital setting?",
            options: [
              { id: "a", text: "The Next of Kin", correct: false },
              { id: "b", text: "The Consultant In Charge", correct: true, explanation: "While consultation is vital, medical futility is a clinical decision made by the senior physician." }
            ]
          }]
        }]
      }]
    },
    nurse: { /* End of life care (LCP) and family support */ }
  },

  // CLASS 20: THE FINAL VIVA
  {
    id: 20,
    num: "20",
    level: "board_certification",
    title: "The Grand Rounds",
    subtitle: "Consultant Level Practice",
    tagline: "Everything you've learned. All at once.",
    estimatedMinutes: { doctor: 75, nurse: 75 },
    passMark: 100,
    xpReward: 2000,
    certificateTitle: "Master of MediNova Medicine",
    media: {
      images: { "20A-i": { scenario: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" } },
      audio: { "intro": "/audio/final_congratulations.mp3" }
    },
    doctor: {
      sims: [{
        id: "20A",
        title: "The Synthesis",
        subsims: [{
          id: "20A-i",
          title: "Complex Comorbidity",
          scenario: "A pregnant patient with sepsis, a history of Sickle Cell, and suspected pulmonary embolism.",
          questions: [{
            id: "q1",
            stem: "In a critically ill pregnant patient, what is the primary consideration for fetal wellbeing?",
            options: [
              { id: "a", text: "Fetal Heart Monitoring", correct: false },
              { id: "b", text: "Aggressive Resuscitation of the Mother", correct: true, explanation: "The best way to save the fetus is to stabilize the mother's physiology (ABCs)." }
            ]
          }]
        }]
      }]
    },
    nurse: { /* Leadership, Delegation, and Quality Improvement */ }
  }
];