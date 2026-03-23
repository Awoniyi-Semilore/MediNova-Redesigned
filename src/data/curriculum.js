// ─────────────────────────────────────────────────────────────────────────────
// MEDINOVA TEACHING HOSPITAL — CLINICAL CURRICULUM
// Version: 1.0.0
//
// HOW TO EDIT:
// Each class follows the same structure as Class 01.
// To fill in a class, replace the comment block with the full class object.
//
// MEDIA FILES:
// images  → generate in Flow AI / Midjourney, upload to imgbb.com, paste URL
// audio   → download from freesound.org OR generate in ElevenLabs
// video   → assemble in CapCut using your images + audio, upload to Vimeo
//
// REUSED AUDIO (download ONCE, used across multiple classes):
// /audio/hospital_background.mp3   → freesound search: "hospital ambient"
// /audio/monitor_beeping.mp3       → freesound search: "cardiac monitor steady beep"
// /audio/monitor_alarm.mp3         → freesound search: "cardiac monitor alarm"
// /audio/ed_ambience.mp3           → freesound search: "emergency department ambient"
// /audio/resus_ambience.mp3        → freesound search: "resuscitation room sounds"
// /audio/timer_warning.mp3         → ElevenLabs: "Ten seconds remaining."
// /audio/sim_complete.mp3          → ElevenLabs: "Simulation complete."
// /audio/class_complete.mp3        → ElevenLabs: "Case file closed. Certificate ready."
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// DIFFICULTY LEVELS
// ─────────────────────────────────────────────────────────────────────────────
export const LEVELS = [
  {
    id: "clerkship",
    label: "Clerkship",
    classRange: [1, 4],
    tagline: "You just walked onto the ward. Learn to see before you act.",
    simulationDesign: "clipboard",
    colorPool: ["#1565c0", "#0277bd", "#283593", "#00695c"],
  },
  {
    id: "junior_residency",
    label: "Junior Residency",
    classRange: [5, 9],
    tagline: "Common presentations. Independent management. The clock has started.",
    simulationDesign: "monitor",
    colorPool: ["#2e7d32", "#388e3c", "#1b5e20", "#33691e"],
  },
  {
    id: "senior_residency",
    label: "Senior Residency",
    classRange: [10, 14],
    tagline: "High acuity. Competing priorities. Hesitation is not an option.",
    simulationDesign: "whiteboard",
    colorPool: ["#e65100", "#bf360c", "#ff6f00", "#e64a19"],
  },
  {
    id: "fellowship",
    label: "Fellowship",
    classRange: [15, 18],
    tagline: "Sub-specialty mastery. You are directing a team now.",
    simulationDesign: "command_centre",
    colorPool: ["#6a1b9a", "#4a148c", "#880e4f", "#ad1457"],
  },
  {
    id: "board_certification",
    label: "Board Certification",
    classRange: [19, 20],
    tagline: "No hints. No guidance. Just a patient and everything you know.",
    simulationDesign: "blank_slate",
    colorPool: ["#b71c1c", "#7f0000", "#c62828"],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CURRICULUM
// ─────────────────────────────────────────────────────────────────────────────
export const CURRICULUM = [

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 01 — THE BASELINE ASSESSMENT
  // Level: Clerkship
  // ═══════════════════════════════════════════════════════════════════════════
  // ─────────────────────────────────────────────────────────────────────────────
// CLASS 01 — COMPLETE WITH REAL MEDIA
// Replace the Class 01 object in your curriculum.js with this entire block
// ─────────────────────────────────────────────────────────────────────────────

{
  id: 1,
  num: "01",
  level: "clerkship",
  title: "The Baseline Assessment",
  subtitle: "History, Examination & Vital Signs",
  tagline: "Before you treat, you must first see.",
  estimatedMinutes: { doctor: 35, nurse: 30 },
  passMark: 70,
  xpReward: 150,
  certificateTitle: "Foundations of Clinical Assessment",

  wardMapDesc: {
    doctor: "Structured history taking, physical examination, and vital sign interpretation.",
    nurse: "Vital sign acquisition, triage assessment, pain evaluation, and patient communication.",
  },

  // ── REAL MEDIA LINKS ───────────────────────────────────────────────────────
  media: {
    // Images indexed by subsim ID for the simulation engine to look up
    images: {
      "1A-i": {
        scenario:  "https://i.ibb.co/tw0gVwjB/Whisk-ymyifznif2ykrtz10sm0yjytumnkrtlkhtok1yy.jpg",
        reference: "https://i.ibb.co/2782vwDN/5s53i61fh0000.jpg",
      },
      "1A-ii": {
        scenario:  "https://i.ibb.co/rfG0xwB7/3laght7a8g000.jpg",
        reference: "https://i.ibb.co/HLYw6YpW/6sm91sb7u0000.jpg",
      },
      "1A-iii": {
        scenario:  "https://i.ibb.co/pjysvGZD/76rj8to6r0000.jpg",
        reference: "https://i.ibb.co/354VQb4P/4vlcn7had0000.jpg",
      },
      "1B-i": {
        scenario:  "https://i.ibb.co/xSKkBYjW/2v8s7lov40000.jpg",
        reference: "https://i.ibb.co/mC2bPZ8R/7lpeu4a7v0000.jpg",
      },
      "1B-ii": {
        scenario:  "https://i.ibb.co/j95K5sdz/70oc6k0jb0000.jpg",
        reference: "https://i.ibb.co/XxCFWrWP/104dnefpl0000.jpg",
      },
      "1C-i": {
        scenario:  "https://i.ibb.co/Y4Dd7dGY/6bq7lnt000000.jpg",
        reference: "https://i.ibb.co/Q7DRF0Kg/5qri1ll6h0000.jpg",
      },
      "N1A-i": {
        scenario:  "https://i.ibb.co/7B5Cpd3/7j7oi77pog000.jpg",
        reference: "https://i.ibb.co/4gFCcgB5/1sf7q5nlv0000.jpg",
      },
      "N1A-ii": {
        scenario:  "https://i.ibb.co/gLK5b6SJ/17ehof69t0000.jpg",
        reference: "https://i.ibb.co/QvTPzt2r/4sv2oacgk0000.jpg",
      },
      "N1B-i": {
        scenario:  "https://i.ibb.co/gMbNQ7Yw/6kfedbvit0000.jpg",
        reference: "https://i.ibb.co/SXh3h0vK/6io2j23jr0000.jpg",
      },
    },

    // Ambient audio — reused across all classes in hospital settings
    ambience: "/audio/hospital_background.mp3",

    // Patient voice clips — unique per subsim
    audio: {
      "1A-i":  "/audio/class01_patient_1Ai.mp3",
      "1A-ii": "/audio/class01_patient_1Aii.mp3",
      "1A-iii":"/audio/class01_parent_1Aiii.mp3",
      "1B-i":  "/audio/class01_narrator_1Bi.mp3",
      "1B-ii": "/audio/class01_narrator_1Bii.mp3",
      "1C-i":  "/audio/class01_narrator_1Ci.mp3",
      "N1A-i": "/audio/class01_nurse_N1Ai.mp3",
      "N1A-ii":"/audio/class01_nurse_N1Aii.mp3",
      "N1B-i": "/audio/class01_nurse_N1Bi.mp3",
    },

    // Heart/lung sounds used in 1B-i auscultation
    clinicalAudio: {
      "heart_murmur_mitral": "/audio/heart_murmur_mitral_regurg.mp3",
      "heart_normal":        "/audio/heart_sounds_normal.mp3",
      "korotkoff":           "/audio/korotkoff_sounds.mp3",
    },

    // Vimeo ID — fill in once you upload the CapCut slideshow for Class 01
    vimeoId: "PASTE_VIMEO_ID_HERE",
  },

  description: {
    doctor: "Every clinical encounter begins here. You will conduct a structured history using SOCRATES and SAMPLE, perform a systematic physical examination, and interpret baseline vital signs. Deviation from this structure costs lives downstream.",
    nurse:  "Assessment is your primary clinical lens. You will acquire, document, and interpret vital signs, perform a structured triage evaluation, and establish therapeutic rapport before the physician arrives.",
  },

  // ── DOCTOR TRACK ──────────────────────────────────────────────────────────
  doctor: {
    sims: [
      {
        id: "1A",
        title: "Comprehensive History Taking",
        objective: "Elicit a complete structured history using SOCRATES and SAMPLE.",
        mechanics: "mcq",
        estimatedMinutes: 12,

        subsims: [
          {
            id: "1A-i",
            title: "The Cooperative Patient — Chest Pain",
            scenario: "A 45-year-old male presents with central chest discomfort for 2 hours. He is alert and cooperative. You have 8 minutes before the registrar arrives.",
            // Images pulled from media.images["1A-i"] above
            // Audio pulled from media.audio["1A-i"] above

            variants: [
              { patientAge: 45, patientGender: "male", vitals: { hr: 98,  bp: "142/88", spo2: 97, rr: 18, temp: 37.1, gcs: 15 } },
              { patientAge: 52, patientGender: "male", vitals: { hr: 104, bp: "156/92", spo2: 96, rr: 20, temp: 37.3, gcs: 15 } },
              { patientAge: 48, patientGender: "male", vitals: { hr: 88,  bp: "138/84", spo2: 98, rr: 16, temp: 36.9, gcs: 15 } },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 30,
                stem: "The patient describes his pain as 'a pressure, like something heavy on my chest.' Using SOCRATES, what is the most critical next question?",
                options: [
                  { id: "a", text: "Does the pain radiate to your left arm, jaw, or back?", correct: true,  explanation: "Radiation pattern differentiates ACS, aortic dissection, and musculoskeletal pain. Radiation to the jaw or left arm combined with diaphoresis strongly suggests ischaemia." },
                  { id: "b", text: "Have you eaten anything today?",                          correct: false, explanation: "Dietary history is not the priority in acute central chest pain assessment." },
                  { id: "c", text: "Do you have any known drug allergies?",                   correct: false, explanation: "Allergy history is important before prescribing but is secondary to characterising the presenting complaint." },
                  { id: "d", text: "What is your occupation?",                                correct: false, explanation: "Social history contributes to risk stratification but is not the immediate priority here." },
                ],
              },
              {
                id: "q2",
                timeLimit: 25,
                stem: "Pain began 2 hours ago at rest, constant, rated 7/10. Which associated symptom most increases your suspicion for STEMI?",
                options: [
                  { id: "a", text: "Diaphoresis and nausea",      correct: true,  explanation: "Autonomic symptoms — diaphoresis and nausea — in combination with rest pain mandates immediate ECG. These are cardinal features of myocardial ischaemia." },
                  { id: "b", text: "Mild non-productive cough",   correct: false, explanation: "Cough suggests a pulmonary aetiology — PE or pneumonia — rather than cardiac ischaemia." },
                  { id: "c", text: "Epigastric burning sensation", correct: false, explanation: "GORD can mimic cardiac pain, but diaphoresis and nausea are stronger cardiac red flags in this context." },
                  { id: "d", text: "Bilateral ankle oedema",       correct: false, explanation: "Peripheral oedema raises concern for heart failure but is not an acute STEMI presentation marker." },
                ],
              },
              {
                id: "q3",
                timeLimit: 20,
                stem: "He takes ramipril, metformin, and aspirin daily. What is the clinical significance of his existing aspirin use?",
                options: [
                  { id: "a", text: "Document dose and timing — he has partial antiplatelet cover. Loading dose may be adjusted accordingly.", correct: true,  explanation: "Existing aspirin use is clinically significant. Document dose, frequency, and time of last administration before prescribing additional antiplatelet therapy." },
                  { id: "b", text: "Aspirin use makes ACS less likely.",                                                                    correct: false, explanation: "Aspirin reduces risk but does not exclude ACS. Many compliant patients still present with ACS." },
                  { id: "c", text: "Aspirin is contraindicated in diabetic patients.",                                                       correct: false, explanation: "Aspirin is not contraindicated in diabetes. It is commonly prescribed for secondary cardiovascular prevention." },
                  { id: "d", text: "No significance — continue standard ACS protocol.",                                                       correct: false, explanation: "Existing antiplatelet therapy is always relevant. Documenting prior use before prescribing is mandatory." },
                ],
              },
            ],

            debrief: {
              summary: "Central pressure-type chest pain with radiation, diaphoresis, and nausea in a middle-aged male with cardiovascular risk factors is an acute coronary syndrome until proven otherwise. SOCRATES ensures systematic characterisation — never skip to investigation before completing the history.",
              keyPoints: [
                "SOCRATES: Site · Onset · Character · Radiation · Associated symptoms · Timing · Exacerbating/relieving factors · Severity",
                "Radiation to jaw or left arm + diaphoresis + nausea = ACS until proven otherwise",
                "Document all current medications before prescribing — especially antiplatelet and anticoagulant agents",
                "Risk factors (hypertension, diabetes, smoking, family history) increase pre-test probability — document all",
              ],
              clinicalPearl: "Classic STEMI presentation occurs in fewer than 50% of confirmed cases. Women, elderly patients, and diabetics frequently present atypically — jaw pain, epigastric discomfort, or fatigue alone. A low threshold for ECG is never wrong.",
            },
          },

          {
            id: "1A-ii",
            title: "The Uncooperative Patient — Capacity Assessment",
            scenario: "A 67-year-old female is brought by ambulance from a care home. She is agitated, confused, pulling at her IV line, and demanding to go home. Her daughter is present and demanding treatment.",

            variants: [
              { patientAge: 67, patientGender: "female", vitals: { hr: 112, bp: "168/98",  spo2: 91, rr: 24, temp: 38.6, gcs: 13 } },
              { patientAge: 71, patientGender: "female", vitals: { hr: 118, bp: "172/102", spo2: 89, rr: 26, temp: 38.9, gcs: 12 } },
              { patientAge: 64, patientGender: "female", vitals: { hr: 108, bp: "162/94",  spo2: 92, rr: 22, temp: 38.4, gcs: 14 } },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 30,
                stem: "Before proceeding with treatment, what is your immediate clinical priority?",
                options: [
                  { id: "a", text: "Formally assess mental capacity using the two-stage test",                             correct: true,  explanation: "Capacity is a clinical — not legal — determination. It must precede any treatment decision. Stage 1: does she have an impairment of the mind or brain? Stage 2: does that impairment cause inability to make this decision?" },
                  { id: "b", text: "Administer IV haloperidol 2.5mg to facilitate examination",                           correct: false, explanation: "Chemical restraint without capacity assessment is not appropriate as a first step and carries significant risk in elderly patients." },
                  { id: "c", text: "Ask her daughter to sign a consent form on her behalf",                                correct: false, explanation: "Next-of-kin cannot legally consent for an adult. Lasting Power of Attorney for Health and Welfare is required." },
                  { id: "d", text: "Document her refusal and arrange discharge with community follow-up",                  correct: false, explanation: "This patient has SpO₂ 91% and GCS 13. Discharging without treatment is clinically dangerous and indefensible." },
                ],
              },
              {
                id: "q2",
                timeLimit: 25,
                stem: "She currently lacks capacity due to acute confusional state. Under best interests principles, what is your next step?",
                options: [
                  { id: "a", text: "Provide minimum necessary treatment for the immediate clinical threat, reassess capacity as condition improves", correct: true,  explanation: "When capacity is lacking, treatment proceeds in best interests under the Mental Capacity Act 2005. It must be least restrictive and reassessed as the acute illness is treated." },
                  { id: "b", text: "Wait for her daughter to arrive before starting any treatment",                                              correct: false, explanation: "Her daughter cannot give consent. Waiting while SpO₂ is 89–92% is clinically indefensible." },
                  { id: "c", text: "Apply for an emergency court order before proceeding",                                                       correct: false, explanation: "Court orders are for complex non-urgent disputes — not acute medical emergencies." },
                  { id: "d", text: "Withhold treatment — she has expressed a wish to go home",                                                   correct: false, explanation: "Statements made during incapacity do not constitute valid advance refusal." },
                ],
              },
            ],

            debrief: {
              summary: "Mental capacity is time-specific, decision-specific, and presumed to exist unless evidence shows otherwise. Acute illness — infection, hypoxia, metabolic disturbance — is the most common reversible cause of temporary incapacity in hospital.",
              keyPoints: [
                "Mental Capacity Act 2005 presumes capacity — it must be proven absent, not present",
                "Capacity is decision-specific — a patient may have capacity for one decision but not another simultaneously",
                "Next-of-kin cannot consent for adults — Lasting Power of Attorney for Health and Welfare is required",
                "Best interests treatment must be: necessary, proportionate, least restrictive",
                "Reassess capacity regularly as the acute cause resolves",
              ],
              clinicalPearl: "Delirium is the most common cause of acute capacity impairment in hospital inpatients — present in up to 30% of elderly admissions. It is frequently missed because staff attribute confusion to baseline dementia without formal assessment. Use the 4AT or CAM score.",
            },
          },

          {
            id: "1A-iii",
            title: "Paediatric History — The Parent as Proxy",
            scenario: "A 4-year-old boy is brought by his mother. Fever for 3 days, irritable, refusing feeds. The child cannot give a reliable history.",

            variants: [
              { patientAge: 4, patientGender: "male",   vitals: { hr: 138, bp: "95/60", spo2: 97, rr: 28, temp: 38.8, gcs: 15 } },
              { patientAge: 3, patientGender: "male",   vitals: { hr: 142, bp: "90/58", spo2: 96, rr: 30, temp: 39.1, gcs: 15 } },
              { patientAge: 5, patientGender: "female", vitals: { hr: 132, bp: "98/62", spo2: 98, rr: 26, temp: 38.6, gcs: 15 } },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 25,
                stem: "Which component of the paediatric history is entirely absent from an adult history template?",
                options: [
                  { id: "a", text: "Birth history, developmental milestones, and immunisation status", correct: true,  explanation: "Paediatric history uniquely includes perinatal details, developmental trajectory, and vaccination history — all of which are irrelevant in adult presentations." },
                  { id: "b", text: "Allergy history",                                                  correct: false, explanation: "Allergy history is equally important in both paediatric and adult histories." },
                  { id: "c", text: "Family history of hereditary conditions",                           correct: false, explanation: "Family history is relevant in both populations." },
                  { id: "d", text: "Social history and home environment",                               correct: false, explanation: "Social history is vital in both populations, though safeguarding context differs." },
                ],
              },
              {
                id: "q2",
                timeLimit: 20,
                stem: "Mother reports a rash that 'went away when I pressed on it' two days ago. What is the immediate action?",
                options: [
                  { id: "a", text: "Treat as possible meningococcal septicaemia — initiate urgent sepsis protocol immediately",                correct: true,  explanation: "A non-blanching rash in a febrile child is meningococcal disease until proven otherwise. Even if resolved, the history demands blood cultures, IV access, and empirical IV ceftriaxone. Do not wait for the rash to reappear." },
                  { id: "b", text: "Reassure the mother as the rash has resolved",                                                          correct: false, explanation: "A resolving non-blanching rash in a febrile child is not a reason for reassurance. It may represent evolving life-threatening septicaemia." },
                  { id: "c", text: "Request a dermatology outpatient referral",                                                             correct: false, explanation: "This is an acute emergency. Outpatient referral is entirely inappropriate." },
                  { id: "d", text: "Discharge with safety-netting advice and viral illness information leaflet",                             correct: false, explanation: "Discharging a febrile child with a history of non-blanching rash is clinically dangerous and indefensible." },
                ],
              },
            ],

            debrief: {
              summary: "Paediatric history requires an additional systematic layer — perinatal history, developmental milestones, immunisation status. Non-blanching rash in a febrile child is a medical emergency regardless of whether the rash is currently visible.",
              keyPoints: [
                "Always include: birth history, developmental milestones, immunisation status, feeding history",
                "Non-blanching rash in febrile child = meningococcal disease until proven otherwise",
                "Observe parent-child interaction — abnormal attachment raises safeguarding concerns",
                "Age-specific vital sign normal ranges differ significantly from adults — always use a paediatric reference",
              ],
              clinicalPearl: "Children compensate haemodynamically for much longer than adults before decompensating suddenly. A child who looks 'not quite right' to an experienced clinician or their parent should be taken seriously even with normal vital signs. The Paediatric Assessment Triangle gives a rapid initial impression.",
            },
          },
        ],
      },

      {
        id: "1B",
        title: "The Systematic Physical Examination",
        objective: "Perform a structured physical examination and correctly identify abnormal findings.",
        mechanics: "hotspot",
        estimatedMinutes: 13,

        subsims: [
          {
            id: "1B-i",
            title: "Cardiac Auscultation — Valve Area Identification",
            scenario: "A 58-year-old male with known hypertension and an audible murmur on his last clinic letter presents for assessment. Auscultate and identify the valve area.",
            mechanics: "audio_mcq",
            audioInstruction: "Listen to the cardiac auscultation recording. Based on the sounds, select the correct anatomical auscultation zone.",
            // Clinical audio from media.clinicalAudio above

            variants: [
              { audioKey: "heart_murmur_mitral", correctHotspot: "mitral",   vitals: { hr: 82,  bp: "148/92", spo2: 97, rr: 16, gcs: 15 } },
              { audioKey: "heart_normal",         correctHotspot: "apex",     vitals: { hr: 76,  bp: "138/88", spo2: 98, rr: 15, gcs: 15 } },
              { audioKey: "heart_murmur_mitral",  correctHotspot: "mitral",   vitals: { hr: 88,  bp: "152/94", spo2: 97, rr: 17, gcs: 15 } },
            ],

            hotspots: [
              { id: "mitral",    label: "Mitral — 5th ICS midclavicular line", x: 42, y: 68, correct: true,  explanation: "The mitral valve is best auscultated at the cardiac apex — 5th ICS, midclavicular line. A pansystolic murmur loudest here radiating to the axilla is characteristic of mitral regurgitation." },
              { id: "aortic",    label: "Aortic — 2nd right ICS",              x: 38, y: 32, correct: false, explanation: "The aortic valve is heard at the 2nd right ICS. An ejection systolic murmur radiating to the carotids suggests aortic stenosis." },
              { id: "pulmonary", label: "Pulmonary — 2nd left ICS",            x: 34, y: 30, correct: false, explanation: "The pulmonary valve is heard at the 2nd left ICS. A soft systolic murmur may represent a flow murmur or pulmonary stenosis." },
              { id: "tricuspid", label: "Tricuspid — lower left sternal border",x: 46, y: 56, correct: false, explanation: "The tricuspid valve is heard at the lower left sternal border. Tricuspid regurgitation increases with inspiration (Carvallo's sign)." },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 30,
                stem: "After listening to the auscultation recording, which valve area is this murmur loudest at?",
                options: [
                  { id: "a", text: "Mitral area — 5th ICS midclavicular line (cardiac apex)", correct: true,  explanation: "Correct. The pansystolic murmur heard loudest at the cardiac apex, radiating to the axilla, is the hallmark of mitral regurgitation." },
                  { id: "b", text: "Aortic area — 2nd right intercostal space",                correct: false, explanation: "Aortic stenosis produces an ejection systolic murmur at the 2nd right ICS radiating to the carotids, not a pansystolic murmur at the apex." },
                  { id: "c", text: "Pulmonary area — 2nd left intercostal space",              correct: false, explanation: "Pulmonary valve sounds are heard at the 2nd left ICS. Pulmonary stenosis or a flow murmur would be heard here." },
                  { id: "d", text: "Tricuspid area — lower left sternal border",               correct: false, explanation: "Tricuspid regurgitation is pansystolic at the lower left sternal border and increases with inspiration — distinguishing it from mitral regurgitation." },
                ],
              },
            ],

            debrief: {
              summary: "Systematic cardiac auscultation follows the four valve areas in sequence. Character, timing, radiation, and response to dynamic manoeuvres all contribute to identification of the underlying pathology.",
              keyPoints: [
                "Aortic: 2nd right ICS — ejection systolic, radiates to carotids (stenosis)",
                "Pulmonary: 2nd left ICS — ejection systolic, increases with inspiration",
                "Tricuspid: lower left sternal border — pansystolic, increases with inspiration (Carvallo's sign)",
                "Mitral: 5th ICS midclavicular line — pansystolic radiating to axilla (regurgitation), or mid-diastolic rumble (stenosis)",
              ],
              clinicalPearl: "Aortic stenosis is the most common valvular lesion in the Western world. Its classic triad is angina, syncope, and dyspnoea. Once symptoms develop, median survival without intervention is 2–3 years. Never dismiss a harsh ejection systolic murmur in an elderly patient.",
            },
          },

          {
            id: "1B-ii",
            title: "Abdominal Examination — Identifying Peritonism",
            scenario: "A 32-year-old female with 6-hour worsening right iliac fossa pain. She is lying very still and reluctant to move.",
            mechanics: "hotspot",
            instruction: "Click the abdominal region where you would elicit rebound tenderness to assess for peritoneal irritation in this presentation.",

            variants: [
              { patientAge: 32, patientGender: "female", vitals: { hr: 102, bp: "112/72", spo2: 98, rr: 18, temp: 37.8, gcs: 15 } },
              { patientAge: 28, patientGender: "female", vitals: { hr: 108, bp: "108/70", spo2: 98, rr: 20, temp: 38.1, gcs: 15 } },
              { patientAge: 35, patientGender: "female", vitals: { hr: 98,  bp: "118/74", spo2: 99, rr: 17, temp: 37.6, gcs: 15 } },
            ],

            hotspots: [
              { id: "rif",        label: "Right iliac fossa",  x: 68, y: 74, correct: true,  explanation: "McBurney's point — two-thirds of the way from the umbilicus to the right anterior superior iliac spine — is the classic site of maximal tenderness in appendicitis. Rebound tenderness here (Blumberg's sign) suggests peritoneal irritation." },
              { id: "epigastric", label: "Epigastric region",  x: 44, y: 32, correct: false, explanation: "Epigastric tenderness is associated with peptic ulcer disease, pancreatitis, or gastritis. Not the primary assessment site in this presentation." },
              { id: "lif",        label: "Left iliac fossa",   x: 24, y: 74, correct: false, explanation: "Left iliac fossa tenderness suggests diverticulitis or left-sided colitis. Rovsing's sign — right iliac fossa pain on left-sided pressure — is positive in appendicitis." },
              { id: "umbilical",  label: "Umbilical region",   x: 44, y: 52, correct: false, explanation: "Periumbilical pain may be present early in appendicitis as visceral pain, but migrates to the right iliac fossa as the condition progresses." },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 25,
                stem: "Where do you apply pressure to elicit rebound tenderness (Blumberg's sign) in suspected appendicitis?",
                options: [
                  { id: "a", text: "Right iliac fossa — McBurney's point",    correct: true,  explanation: "McBurney's point is two-thirds of the way from the umbilicus to the right ASIS. Rebound tenderness here indicates peritoneal irritation consistent with appendicitis." },
                  { id: "b", text: "Epigastric region",                         correct: false, explanation: "Epigastric tenderness suggests peptic ulcer disease or pancreatitis, not appendicitis." },
                  { id: "c", text: "Left iliac fossa",                           correct: false, explanation: "Left-sided pressure causing right-sided pain is Rovsing's sign — a different clinical sign. The primary assessment point for rebound in appendicitis is the right iliac fossa." },
                  { id: "d", text: "Central umbilical region",                   correct: false, explanation: "Periumbilical pain occurs early in appendicitis as visceral pain, but the site for eliciting rebound tenderness is the right iliac fossa once the process has localised." },
                ],
              },
            ],

            debrief: {
              summary: "Appendicitis classically presents with central pain migrating to the right iliac fossa, anorexia, nausea, and low-grade fever. Peritonism — guarding, rigidity, and rebound tenderness — indicates parietal peritoneum involvement and suggests perforation risk.",
              keyPoints: [
                "McBurney's point: two-thirds of the way from umbilicus to right anterior superior iliac spine",
                "Blumberg's sign: rebound tenderness in the right iliac fossa",
                "Rovsing's sign: right iliac fossa pain on left-sided pressure",
                "Psoas sign: pain on right hip extension — retrocaecal appendix",
                "Obturator sign: pain on internal rotation of right hip — pelvic appendix",
              ],
              clinicalPearl: "The Alvarado score combines symptoms, signs, and basic investigations to stratify appendicitis risk. Score ≥7 is strongly associated with appendicitis and warrants surgical review. Clinical judgement remains paramount — scores are tools, not decisions.",
            },
          },
        ],
      },

      {
        id: "1C",
        title: "Vital Signs Interpretation",
        objective: "Accurately interpret vital signs and calculate NEWS2 score with correct escalation response.",
        mechanics: "mcq",
        estimatedMinutes: 10,

        subsims: [
          {
            id: "1C-i",
            title: "NEWS2 Scoring and Escalation",
            scenario: "You are reviewing a 72-year-old male on the surgical ward. Day 1 post-operatively. The healthcare assistant has called you urgently.",

            variants: [
              { patientAge: 72, patientGender: "male", vitals: { hr: 118, bp: "88/54",  spo2: 93, rr: 24, temp: 38.9, gcs: 14 }, news2: 13 },
              { patientAge: 68, patientGender: "male", vitals: { hr: 102, bp: "96/60",  spo2: 95, rr: 22, temp: 38.4, gcs: 15 }, news2: 7  },
              { patientAge: 75, patientGender: "male", vitals: { hr: 124, bp: "80/48",  spo2: 91, rr: 28, temp: 39.2, gcs: 13 }, news2: 14 },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 35,
                stem: "Vitals: HR 118, BP 88/54, SpO₂ 93%, RR 24, Temp 38.9°C, GCS 14. What is the NEWS2 score and required action?",
                options: [
                  { id: "a", text: "NEWS2 ≥7 — high urgency. Immediate senior review and critical care consideration within 30 minutes.",  correct: true,  explanation: "HR 118 (2) + BP 88/54 (3) + SpO₂ 93% (2) + RR 24 (2) + Temp 38.9 (1) + GCS 14 (3) = 13. Score ≥7 mandates an emergency response. Post-operative deterioration must never be normalised." },
                  { id: "b", text: "NEWS2 score 3 — low urgency. Increase monitoring and reassess in 4 hours.",                           correct: false, explanation: "This dramatically underestimates severity. Five abnormal parameters give a score well above the low threshold." },
                  { id: "c", text: "NEWS2 score 6 — medium urgency. Review within 60 minutes.",                                          correct: false, explanation: "Recalculate: hypotension alone scores 3 points. The combination of all abnormal parameters here gives a score above 10." },
                  { id: "d", text: "Continue routine monitoring — post-operative parameters are expected to be abnormal.",                 correct: false, explanation: "Post-operative vital sign abnormalities are never assumed to be benign. This patient has signs consistent with septic shock." },
                ],
              },
              {
                id: "q2",
                timeLimit: 20,
                stem: "You suspect post-operative sepsis. Which single investigation most immediately confirms haemodynamic compromise?",
                options: [
                  { id: "a", text: "Serum lactate",    correct: true,  explanation: "Lactate ≥2 mmol/L with clinical sepsis defines sepsis. Lactate ≥4 mmol/L defines septic shock and mandates immediate aggressive resuscitation regardless of blood pressure." },
                  { id: "b", text: "Full blood count", correct: false, explanation: "FBC is important in sepsis workup but is not the most immediately informative investigation for haemodynamic compromise." },
                  { id: "c", text: "Chest X-ray",      correct: false, explanation: "CXR helps identify a source of sepsis but does not quantify haemodynamic compromise." },
                  { id: "d", text: "12-lead ECG",      correct: false, explanation: "ECG excludes ACS as a cause of shock but does not confirm haemodynamic compromise from sepsis." },
                ],
              },
            ],

            debrief: {
              summary: "NEWS2 is validated for clinical deterioration identification. A score ≥7 warrants an emergency response. Post-operative deterioration must never be normalised without formal reassessment.",
              keyPoints: [
                "NEWS2 parameters: RR, SpO₂, supplemental oxygen, systolic BP, HR, consciousness, temperature",
                "Score 1–4: low — 4–6 hourly monitoring",
                "Score 5–6 or any single parameter scoring 3: medium — urgent review within 30–60 minutes",
                "Score ≥7: high — emergency response within 30 minutes, critical care consideration",
                "Lactate ≥2 mmol/L = sepsis; ≥4 mmol/L = septic shock",
              ],
              clinicalPearl: "Sepsis-3 (2016) defines sepsis as life-threatening organ dysfunction caused by a dysregulated host response to infection, identified by a SOFA score increase of ≥2. The bedside qSOFA (altered mental status, RR ≥22, SBP ≤100) is the screening tool — any two of three warrants full sepsis workup.",
            },
          },
        ],
      },
    ],

    classSummaryTemplate: {
      title: "The Baseline Assessment — Doctor Track",
      sections: [
        "SOCRATES and SAMPLE history frameworks",
        "Mental Capacity Act 2005 — two-stage test and best interests",
        "Paediatric history — unique components and red flags",
        "Cardiac auscultation — four valve areas and murmur characteristics",
        "Abdominal examination — peritonism signs and McBurney's point",
        "NEWS2 scoring — thresholds and escalation responses",
      ],
    },
  },

  // ── NURSE TRACK ───────────────────────────────────────────────────────────
  nurse: {
    sims: [
      {
        id: "N1A",
        title: "Vital Signs Acquisition & Triage",
        objective: "Accurately acquire, document, and interpret vital signs and perform structured triage.",
        mechanics: "mcq",
        estimatedMinutes: 12,

        subsims: [
          {
            id: "N1A-i",
            title: "Manual Blood Pressure — When the Machine Fails",
            scenario: "Night shift, medical admissions unit. The automated NIBP machine shows an error for a 68-year-old male with known atrial fibrillation. You need a manual reading immediately.",
            mechanics: "audio_mcq",
            audioInstruction: "Listen to the Korotkoff sounds recording. At what point do you record the systolic blood pressure?",
            // Audio: media.clinicalAudio["korotkoff"] — plays before questions

            variants: [
              { patientAge: 68, patientGender: "male", vitals: { hr: 88,  bp: "136/84", spo2: 96, rr: 18, temp: 36.8, gcs: 15 } },
              { patientAge: 68, patientGender: "male", vitals: { hr: 92,  bp: "148/90", spo2: 97, rr: 17, temp: 36.9, gcs: 15 } },
              { patientAge: 68, patientGender: "male", vitals: { hr: 96,  bp: "158/94", spo2: 96, rr: 19, temp: 37.0, gcs: 15 } },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 30,
                stem: "When performing manual sphygmomanometry, at what point do you record the SYSTOLIC blood pressure?",
                options: [
                  { id: "a", text: "At the first appearance of Korotkoff sounds (Phase I)",        correct: true,  explanation: "The systolic pressure is recorded at Phase I — the first appearance of clear tapping sounds as cuff pressure falls below systolic and blood flows through the partially compressed artery." },
                  { id: "b", text: "When Korotkoff sounds disappear completely (Phase V)",          correct: false, explanation: "Phase V — disappearance of sounds — corresponds to DIASTOLIC pressure in most adults." },
                  { id: "c", text: "When sounds become muffled (Phase IV)",                         correct: false, explanation: "Phase IV is used as the diastolic reading in children and pregnancy where Phase V sounds may persist to zero." },
                  { id: "d", text: "When the cuff pressure equals the patient's previous systolic", correct: false, explanation: "You must inflate 20–30 mmHg above the estimated systolic. Using a previous reading as the ceiling risks missing a raised pressure." },
                ],
              },
              {
                id: "q2",
                timeLimit: 25,
                stem: "The patient has atrial fibrillation. How does this affect your measurement technique?",
                options: [
                  { id: "a", text: "Take at least three readings and average them — AF causes beat-to-beat variation in systolic output", correct: true,  explanation: "AF causes variable ventricular filling and beat-to-beat variation in cardiac output and systolic pressure. Three readings averaged over 1–2 minutes provides a more representative value." },
                  { id: "b", text: "Use the dominant arm only — AF causes left-right discrepancy",                                       correct: false, explanation: "AF does not cause arm-to-arm discrepancy. A discrepancy >15 mmHg suggests subclavian stenosis or aortic coarctation." },
                  { id: "c", text: "Manual measurement is unreliable in AF — request arterial line",                                     correct: false, explanation: "Manual measurement is the bedside standard for non-invasive BP in AF. Arterial line is reserved for haemodynamically unstable patients." },
                  { id: "d", text: "AF does not affect measurement technique",                                                           correct: false, explanation: "The irregular rhythm of AF significantly affects reproducibility. Multiple measurements are required." },
                ],
              },
            ],

            debrief: {
              summary: "Manual sphygmomanometry remains a core nursing skill and the reference standard for non-invasive blood pressure measurement. AF introduces beat-to-beat haemodynamic variability requiring multiple readings.",
              keyPoints: [
                "Inflate cuff 20–30 mmHg above palpated radial pulse obliteration point",
                "Deflate at 2–3 mmHg per second",
                "Phase I Korotkoff = systolic; Phase V = diastolic (Phase IV in children and pregnancy)",
                "In AF: take minimum 3 readings and record the average",
                "Auscultatory gap: silence between Phase I and II — can cause underestimation of systolic if cuff not inflated high enough",
              ],
              clinicalPearl: "The auscultatory gap occurs in up to 20% of elderly hypertensive patients and can lead to underestimation of systolic BP by 20–40 mmHg. Always palpate the radial pulse to estimate systolic before auscultation.",
            },
          },

          {
            id: "N1A-ii",
            title: "Recognising Silent Hypoxia",
            scenario: "A 74-year-old female post COVID-19 pneumonia. She appears comfortable, chatting with family. SpO₂ reads 82% on room air. She says she feels perfectly fine.",

            variants: [
              { patientAge: 74, patientGender: "female", vitals: { hr: 94,  bp: "128/78", spo2: 82, rr: 20, temp: 37.2, gcs: 15 } },
              { patientAge: 74, patientGender: "female", vitals: { hr: 98,  bp: "132/80", spo2: 78, rr: 22, temp: 37.4, gcs: 15 } },
              { patientAge: 74, patientGender: "female", vitals: { hr: 90,  bp: "126/76", spo2: 84, rr: 19, temp: 37.1, gcs: 15 } },
            ],

            questions: [
              {
                id: "q1",
                timeLimit: 20,
                stem: "The patient appears well and denies breathlessness despite SpO₂ of 82%. What is the most appropriate immediate action?",
                options: [
                  { id: "a", text: "Apply supplemental oxygen and escalate immediately — patient comfort is not a measure of oxygenation status", correct: true,  explanation: "Silent hypoxia — well-documented in COVID-19 — means patients are profoundly hypoxic despite no dyspnoea. SpO₂ <94% requires supplemental oxygen. SpO₂ <85% is a medical emergency." },
                  { id: "b", text: "Reassure and repeat reading in 30 minutes",                                                                  correct: false, explanation: "SpO₂ 82% is a medical emergency regardless of patient comfort. A 30-minute delay risks rapid deterioration." },
                  { id: "c", text: "Check probe positioning — if reading persists and patient is asymptomatic, discharge",                        correct: false, explanation: "While probe position should be checked, a persistent SpO₂ of 82% is a clinical emergency. Discharge is absolutely contraindicated." },
                  { id: "d", text: "Document and inform the nurse in charge at the next handover",                                               correct: false, explanation: "SpO₂ 82% requires immediate action. Waiting for handover is a serious departure from safe nursing practice." },
                ],
              },
            ],

            debrief: {
              summary: "Silent hypoxia demonstrates that clinical observation must never rely solely on patient-reported wellbeing. Objective measurements must be acted upon regardless of the patient's apparent comfort.",
              keyPoints: [
                "SpO₂ <94%: supplemental oxygen, increase monitoring frequency, escalate",
                "SpO₂ <90%: urgent medical review",
                "SpO₂ <85%: medical emergency — immediate escalation",
                "Silent hypoxia: common in COVID-19 pneumonia, high-altitude illness, anaemia",
                "Never normalise an abnormal reading based on patient comfort",
              ],
              clinicalPearl: "Pulse oximetry is unreliable in poor peripheral perfusion, hypothermia, nail varnish, and carbon monoxide poisoning (where it falsely reads 100%). In suspected CO poisoning, only an ABG with co-oximetry accurately reflects oxygenation.",
            },
          },

          {
            id: "N1A-iii",
            title: "Pain Assessment — Choosing the Right Scale",
            scenario: "Three patients all need pain scoring. Select the most appropriate pain assessment tool for each.",
            mechanics: "drag",
            instruction: "Drag the correct pain assessment tool to match each patient.",

            dragItems: [
              { id: "numeric",   label: "Numeric Rating Scale (0–10)", description: "Self-reported numeric scale for cognitively intact adults" },
              { id: "wongbaker", label: "Wong-Baker FACES Scale",       description: "Faces scale — paediatric or mildly cognitively impaired" },
              { id: "abbey",     label: "Abbey Pain Scale",             description: "Behavioural — non-verbal patients with severe dementia" },
              { id: "flacc",     label: "FLACC Scale",                  description: "Behavioural — infants and young children under 3" },
            ],

            dropZones: [
              { id: "z1", label: "Alert 8-year-old with a fractured wrist",               correct: "wongbaker", explanation: "Wong-Baker FACES is validated for children from age 3 and preferred for children who cannot reliably use a numeric scale." },
              { id: "z2", label: "Cognitively intact 45-year-old post-appendicectomy",     correct: "numeric",   explanation: "The Numeric Rating Scale is the standard self-report tool for cognitively intact adults." },
              { id: "z3", label: "87-year-old with severe dementia who cannot communicate", correct: "abbey",     explanation: "The Abbey Pain Scale assesses pain behaviourally in non-verbal dementia patients across 6 domains: vocalisation, facial expression, body language, physiological changes, physical changes, and behaviour change." },
            ],

            debrief: {
              summary: "Pain is the fifth vital sign. Accurate assessment requires the tool appropriate to the patient's age, cognition, and communication ability.",
              keyPoints: [
                "Numeric Rating Scale: cognitively intact adults",
                "Wong-Baker FACES: children aged 3+, adults with mild cognitive impairment",
                "FLACC (Face, Legs, Activity, Cry, Consolability): infants and non-verbal children under 3",
                "Abbey Pain Scale: non-verbal adults with severe dementia",
              ],
              clinicalPearl: "Unrecognised pain in patients with dementia is one of the most prevalent and preventable causes of agitated behaviour in hospital. Behavioural disturbance in a patient with dementia should always prompt pain assessment before considering sedation.",
            },
          },
        ],
      },

      {
        id: "N1B",
        title: "Initial Triage & Therapeutic Communication",
        objective: "Perform structured MTS triage and adapt communication for complex patient presentations.",
        mechanics: "drag",
        estimatedMinutes: 18,

        subsims: [
          {
            id: "N1B-i",
            title: "Manchester Triage System — Four Simultaneous Patients",
            scenario: "You are triage nurse in a busy ED. Four patients arrive simultaneously. Categorise each using the Manchester Triage System.",
            mechanics: "drag",
            instruction: "Drag each patient to their correct MTS triage category.",

            dragItems: [
              { id: "p1", label: "52M — central chest pain, diaphoresis, onset 20 minutes ago", vitals: "HR 108, BP 88/54" },
              { id: "p2", label: "28F — twisted ankle playing football, mobilising with difficulty", vitals: "HR 82, BP 122/74" },
              { id: "p3", label: "8M — febrile, non-blanching rash, irritable", vitals: "HR 148, BP 88/56, Temp 39.4" },
              { id: "p4", label: "44F — headache 2 days, worse on bending, no fever, GCS 15", vitals: "HR 76, BP 128/82" },
            ],

            dropZones: [
              { id: "immediate",  label: "Immediate (Red) — 0 minutes",     correct: ["p3"], explanation: "Febrile child with non-blanching rash = meningococcal disease until proven otherwise. Requires immediate assessment." },
              { id: "veryurgent", label: "Very Urgent (Orange) — 10 minutes", correct: ["p1"], explanation: "Central chest pain with haemodynamic compromise (hypotension + tachycardia) mandates assessment within 10 minutes — potential STEMI." },
              { id: "urgent",     label: "Urgent (Yellow) — 60 minutes",    correct: ["p4"], explanation: "2-day headache worse on bending in a neurologically intact patient warrants assessment within 60 minutes to exclude raised ICP." },
              { id: "standard",   label: "Standard (Green) — 120 minutes",  correct: ["p2"], explanation: "Soft tissue ankle injury in a patient who is weight-bearing with normal vital signs can safely wait up to 2 hours." },
            ],

            debrief: {
              summary: "The Manchester Triage System allocates patients to one of five priority categories based on presenting complaint and discriminator assessment. Triage is dynamic — categories change as patients wait.",
              keyPoints: [
                "Immediate (Red): life-threatening — airway compromise, cardiac arrest, major haemorrhage",
                "Very Urgent (Orange): potential life threat — chest pain, severe breathlessness, altered consciousness",
                "Urgent (Yellow): significant but not immediately life-threatening",
                "Standard (Green): not urgent — minor injuries, chronic conditions",
                "Reassess triage category if patient condition changes while waiting",
              ],
              clinicalPearl: "The most dangerous triage error is under-triage. Under-triage rates above 5% are considered unacceptable. When in doubt, assign a higher category. The consequences of over-triage are delays for less sick patients; the consequences of under-triage can be death.",
            },
          },
        ],
      },
    ],

    classSummaryTemplate: {
      title: "The Baseline Assessment — Nurse Track",
      sections: [
        "Manual blood pressure measurement and common sources of error",
        "Silent hypoxia — recognition and objective response",
        "Pain assessment scale selection across patient populations",
        "Manchester Triage System — five-level categorisation",
        "Communication adaptations for complex patient presentations",
      ],
    },
  },

  // PDF GENERATION PROMPT
  pdfPrompt: {
    system: "You are a consultant-level clinician writing educational material for qualified healthcare professionals. Formal British English. All information must be evidence-based, referenced to NICE guidelines, RCUK guidance, or BSH equivalent. Write for a peer — not a student.",
    user: `Write a 4-page clinical learning summary PDF for Class 01 of the MediNova Teaching Hospital curriculum: 'The Baseline Assessment'.

Include:
1. SOCRATES and SAMPLE frameworks — full component descriptions with clinical commentary
2. Mental Capacity Act 2005 — two-stage test, best interests principles, common clinical scenarios
3. Paediatric history — unique components and the Paediatric Assessment Triangle
4. Cardiac auscultation — four valve areas, anatomical landmarks, classic murmur characteristics
5. Abdominal examination — peritonism signs, McBurney's point, Alvarado score
6. NEWS2 — complete parameter table, response thresholds, and Sepsis-3 qSOFA
7. Manual blood pressure measurement — Korotkoff phases, auscultatory gap, AF considerations
8. Pain assessment scales — selection criteria by population
9. Manchester Triage System — five categories with clinical examples

Format: Clinical reference document. Clear headings, bullet points for frameworks, at least one clinical pearl per section. End with Key References: MCA 2005, NICE NG51, RCUK ALS, BTS/SIGN, Sepsis-3 Singer et al. JAMA 2016.
Tone: Authoritative, peer-level. Written by a senior clinician for colleagues.`,
  },

  // POST-CLASS DEBRIEF
  classDebrief: {
    title: "Class 01 Complete — The Baseline Assessment",
    sections: [
      {
        heading: "What this class demonstrated",
        items: [
          "Systematic history taking using validated clinical frameworks",
          "Capacity impairment recognition and appropriate best interests management",
          "Paediatric red flag identification — non-blanching rash in febrile child",
          "Cardiac auscultation and valve area anatomy",
          "NEWS2 calculation and escalation thresholds",
          "Objective vital sign interpretation independent of patient-reported symptoms",
        ],
      },
      {
        heading: "Where errors most commonly occur",
        items: [
          "Rushing to investigation before completing history — the history dictates investigation priority",
          "Relying on patient-reported wellbeing as a surrogate for objective measurements",
          "Attributing post-operative vital sign deterioration to expected surgical changes",
          "Applying the wrong pain assessment scale for the patient's cognitive status",
          "Under-triaging patients with atypical presentations",
        ],
      },
      {
        heading: "Before you proceed to Class 02",
        items: [
          "You can deliver a complete SOCRATES history in under 4 minutes",
          "You can calculate a NEWS2 score from any set of vital signs in under 30 seconds",
          "You know the four cardiac valve areas without reference material",
          "You can name the two-stage capacity test from memory",
        ],
      },
    ],
  },
},

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 02 — RESPIRATORY EMERGENCIES
  // Level: Clerkship
  // Paste Class 02 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 03 — CARDIOVASCULAR EMERGENCIES
  // Level: Clerkship
  // Paste Class 03 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 04 — NEUROLOGICAL EMERGENCIES
  // Level: Clerkship
  // Paste Class 04 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 05 — SEPSIS & INFECTION
  // Level: Junior Residency
  // Paste Class 05 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 06 — GASTROINTESTINAL EMERGENCIES
  // Level: Junior Residency
  // Paste Class 06 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 07 — ENDOCRINE EMERGENCIES
  // Level: Junior Residency
  // Paste Class 07 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 08 — RENAL EMERGENCIES
  // Level: Junior Residency
  // Paste Class 08 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 09 — PAEDIATRIC & OBSTETRIC EMERGENCIES
  // Level: Junior Residency
  // Paste Class 09 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 10 — TRAUMA & MAJOR HAEMORRHAGE
  // Level: Senior Residency
  // Paste Class 10 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 11 — CARDIOPULMONARY RESUSCITATION
  // Level: Senior Residency
  // Paste Class 11 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 12 — CRITICAL CARE MEDICINE
  // Level: Senior Residency
  // Paste Class 12 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 13 — GERIATRIC & PALLIATIVE EMERGENCIES
  // Level: Senior Residency
  // Paste Class 13 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 14 — PSYCHIATRIC EMERGENCIES
  // Level: Senior Residency
  // Paste Class 14 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 15 — HAEMATOLOGICAL EMERGENCIES
  // Level: Fellowship
  // Paste Class 15 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 16 — TOXICOLOGY & DRUG OVERDOSE
  // Level: Fellowship
  // Paste Class 16 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 17 — ENVIRONMENTAL & BURNS EMERGENCIES
  // Level: Fellowship
  // Paste Class 17 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 18 — MASS CASUALTY & DISASTER MEDICINE
  // Level: Fellowship
  // Paste Class 18 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 19 — SURGICAL EMERGENCIES
  // Level: Board Certification
  // Paste Class 19 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASS 20 — THE CHIEF OF STAFF BOARD EXAMINATION
  // Level: Board Certification
  // Paste Class 20 content here when ready
  // ═══════════════════════════════════════════════════════════════════════════

]

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS — used by the simulation engine
// ─────────────────────────────────────────────────────────────────────────────

export function getClass(id) {
  return CURRICULUM.find(c => c.id === id) || null
}

export function getLevel(id) {
  return LEVELS.find(l => l.id === id) || null
}

export function getLevelForClass(classId) {
  const cls = getClass(classId)
  return cls ? getLevel(cls.level) : null
}

export function getSimsForClass(classId, track) {
  const cls = getClass(classId)
  return cls?.[track]?.sims || []
}

export function getRandomVariant(variants) {
  if (!variants?.length) return null
  return variants[Math.floor(Math.random() * variants.length)]
}

export function getRandomColor(levelId) {
  const lvl = getLevel(levelId)
  if (!lvl?.colorPool?.length) return "#1565c0"
  return lvl.colorPool[Math.floor(Math.random() * lvl.colorPool.length)]
}

export function getPdfPrompt(classId) {
  return getClass(classId)?.pdfPrompt || null
}

export function getClassDebrief(classId) {
  return getClass(classId)?.classDebrief || null
}