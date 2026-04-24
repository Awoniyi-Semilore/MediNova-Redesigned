// junior_residency.js - Classes 05-09: Antenatal Care & Complications
// Building confidence with complex but common antenatal scenarios

export const JUNIOR_RESIDENCY = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 05: GESTATIONAL DIABETES
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 5,
    num: "05",
    level: "junior_residency",
    title: "Gestational Diabetes",
    subtitle: "Screening, Management & Birth Planning",
    tagline: "Sugar control today protects mother and baby tomorrow.",
    estimatedMinutes: { midwife: 55 },
    passMark: 75,
    xpReward: 250,
    media: {
      images: {
        "5A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "5B": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800"
      },
      ambience: "/audio/diabetes_clinic.mp3",
      pdfs: { "nice_diabetes": "/pdfs/class05_gdm.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "5M-A",
          title: "OGTT Interpretation",
          mechanics: "mcq",
          objective: "Correctly interpret oral glucose tolerance test results",
          scenario: "Priya, 28 weeks. OGTT results: Fasting 5.4 mmol/L, 2-hour 8.9 mmol/L. BMI 34 at booking.",
          questions: [
            {
              id: "5M-A-q1",
              stem: "Using WHO/IADPSG criteria, what is the diagnosis?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Gestational diabetes (fasting ≥5.1 OR 2-hour ≥8.5)", correct: true, explanation: "IADPSG criteria: fasting ≥5.1, 1-hour ≥10.0, or 2-hour ≥8.5 mmol/L. Either threshold being met diagnoses GDM." },
                { id: "b", text: "Normal glucose tolerance", correct: false, explanation: "Fasting 5.4 exceeds 5.1 threshold. This is diagnostic of GDM regardless of 2-hour value." },
                { id: "c", text: "Impaired glucose tolerance only", correct: false, explanation: "Impaired glucose tolerance is a pre-diabetes category outside pregnancy. In pregnancy, this meets GDM criteria." },
                { id: "d", text: "Type 2 diabetes", correct: false, explanation: "Type 2 diabetes in pregnancy requires fasting ≥7.0 or 2-hour ≥11.1, or HbA1c ≥48 mmol/mol." }
              ]
            },
            {
              id: "5M-A-q2",
              stem: "What is the first-line management for this woman?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Dietary modification + glucose monitoring for 1-2 weeks, then assess", correct: true, explanation: "All women with GDM receive dietary advice and self-monitoring. If targets not met in 1-2 weeks, add metformin or insulin." },
                { id: "b", text: "Start insulin immediately", correct: false, explanation: "Insulin is second-line if dietary management fails or if fasting glucose >7.0 at diagnosis." },
                { id: "c", text: "Oral glibenclamide", correct: false, explanation: "Glibenclamide is not recommended in pregnancy - crosses placenta and causes neonatal hypoglycaemia." },
                { id: "d", text: "No treatment needed - just monitor", correct: false, explanation: "GDM requires active management to reduce macrosomia, shoulder dystocia, and future T2DM risk." }
              ]
            },
            {
              id: "5M-A-q3",
              stem: "What are the target glucose levels for self-monitoring?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Fasting <5.3, 1-hour post-meal <7.8, 2-hour post-meal <6.4", correct: true, explanation: "NICE targets: fasting <5.3, 1-hour <7.8, 2-hour <6.4 mmol/L. Tighter than non-pregnancy targets." },
                { id: "b", text: "Fasting <7.0, post-meal <11.1", correct: false, explanation: "These are diabetic ranges, not pregnancy targets. Pregnancy requires tighter control." },
                { id: "c", text: "Fasting <6.0, post-meal <8.5", correct: false, explanation: "These are too lenient for pregnancy. Strict targets reduce fetal complications." },
                { id: "d", text: "Any value under 10.0", correct: false, explanation: "This is dangerously high and would result in significant fetal hyperinsulinaemia." }
              ]
            }
          ]
        },
        {
          id: "5M-B",
          title: "Birth Planning in GDM",
          mechanics: "mcq",
          objective: "Counsel on timing and mode of delivery",
          scenario: "Sarah, GDM on diet control only. Good glucose control. Currently 36 weeks. Estimated fetal weight 3.8kg.",
          questions: [
            {
              id: "5M-B-q1",
              stem: "When should delivery be offered if on diet-controlled GDM with good control?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Between 40+0 and 40+6 weeks", correct: true, explanation: "Diet-controlled GDM with good control: offer delivery by 40+6. If on medication or poor control: 38+0 to 38+6." },
                { id: "b", text: "At 36 weeks routinely", correct: false, explanation: "36 weeks is too early for uncomplicated diet-controlled GDM. Only if on insulin with poor control or other complications." },
                { id: "c", text: "At 42 weeks like low-risk women", correct: false, explanation: "GDM increases stillbirth risk - do not wait until 42 weeks. Delivery by 40+6 recommended." },
                { id: "d", text: "Induction at 37 weeks for all GDM", correct: false, explanation: "37 weeks is for GDM on medication or with complications, not diet-controlled with good control." }
              ]
            },
            {
              id: "5M-B-q2",
              stem: "What is the threshold for offering caesarean due to suspected macrosomia?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Estimated fetal weight >4.5kg (or >4.0kg if previous shoulder dystocia)", correct: true, explanation: "EFW >4.5kg or >4.0kg with previous shoulder dystocia are indications to discuss caesarean due to shoulder dystocia risk." },
                { id: "b", text: ">3.5kg automatically", correct: false, explanation: "3.5kg is within normal range. Macrosomia is >4.0kg, caesarean discussion at >4.5kg." },
                { id: "c", text: "Only if >5.0kg", correct: false, explanation: "5.0kg is extremely large but the threshold for discussion is lower at 4.5kg." },
                { id: "d", text: "Never - always attempt vaginal birth", correct: false, explanation: "While vaginal birth is preferred, caesarean should be discussed when shoulder dystocia risk is significant." }
              ]
            }
          ]
        },
        {
          id: "5M-C",
          title: "Neonatal Hypoglycaemia Prevention",
          mechanics: "mcq",
          objective: "Manage the baby immediately after birth to prevent hypoglycaemia",
          scenario: "Baby born to mother with GDM on metformin. Birth weight 4.2kg. Apgars 9 and 9.",
          questions: [
            {
              id: "5M-C-q1",
              stem: "What is the first action within 30 minutes of birth?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Skin-to-skin contact and initiate breastfeeding immediately", correct: true, explanation: "Early feeding stimulates baby's own insulin reduction and maintains glucose. Skin-to-skin promotes feeding readiness." },
                { id: "b", text: "Check blood glucose immediately before any feed", correct: false, explanation: "Feed first, then check glucose at 1-2 hours. Early feeding is more important than immediate testing." },
                { id: "c", text: "Give formula top-up routinely", correct: false, explanation: "Formula is not routine - support breastfeeding first. Only give formula if glucose <2.0 or baby symptomatic." },
                { id: "d", text: "Admit to neonatal unit for observation", correct: false, explanation: "NNU admission only if symptomatic, glucose <2.0, or unable to feed. Most GDM babies room-in with mother." }
              ]
            },
            {
              id: "5M-C-q2",
              stem: "At what glucose level is intervention required in first 48 hours?",
              timeLimit: 45,
              options: [
                { id: "a", text: "<2.0 mmol/L on two occasions or symptomatic baby", correct: true, explanation: "<2.0 mmol/L requires intervention. <2.6 is threshold for increased monitoring. Symptoms: jitteriness, lethargy, poor feeding, seizures." },
                { id: "b", text: "<3.5 mmol/L", correct: false, explanation: "3.5 is normal for newborns. Threshold for concern is much lower." },
                { id: "c", text: "<5.0 mmol/L", correct: false, explanation: "5.0 is a normal neonatal glucose. No intervention needed." },
                { id: "d", text: "Any reading below adult normal (4.0)", correct: false, explanation: "Neonatal glucose is normally lower than adult. Different thresholds apply." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 06: PRE-ECLAMPSIA & HYPERTENSIVE DISORDERS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 6,
    num: "06",
    level: "junior_residency",
    title: "Hypertensive Disorders",
    subtitle: "Pre-Eclampsia, Eclampsia & HELLP Syndrome",
    tagline: "The silent killer. Catch it before it catches her.",
    estimatedMinutes: { midwife: 60 },
    passMark: 75,
    xpReward: 275,
    media: {
      images: {
        "6A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
        "6B": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800"
      },
      ambience: "/audio/obstetric_emergency.mp3",
      pdfs: { "pre_eclampsia_guidelines": "/pdfs/class06_pet.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "6M-A",
          title: "Severe Pre-Eclampsia Recognition",
          mechanics: "mcq",
          objective: "Identify severe features requiring immediate action",
          scenario: "Nadia, 34 weeks. BP 168/110. Proteinuria +++. Headache, visual disturbances, epigastric pain. Reflexes brisk.",
          questions: [
            {
              id: "6M-A-q1",
              stem: "Which symptom indicates impending eclampsia?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Headache with visual disturbances (scotomata, flashing lights)", correct: true, explanation: "Cerebral irritation symptoms (headache, visual changes, hyperreflexia) are warning signs of imminent eclampsia." },
                { id: "b", text: "Mild ankle oedema", correct: false, explanation: "Ankle oedema is common in normal pregnancy and not a severe feature." },
                { id: "c", text: "Heartburn", correct: false, explanation: "Heartburn is common in pregnancy. Epigastric/RUQ pain specifically is a severe feature." },
                { id: "d", text: "Frequent urination", correct: false, explanation: "Frequency is normal in pregnancy and not related to pre-eclampsia severity." }
              ]
            },
            {
              id: "6M-A-q2",
              stem: "What is the immediate first-line antihypertensive?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Oral labetalol 200mg or oral nifedipine 10mg", correct: true, explanation: "Labetalol or nifedipine are first-line oral agents. Aim to reduce BP to <150/100 over several hours (not too rapidly)." },
                { id: "b", text: "IV hydralazine bolus", correct: false, explanation: "Hydralazine is second-line or for IV use if oral not possible. Risk of precipitous drop and fetal compromise." },
                { id: "c", text: "Sublingual nifedipine short-acting capsule", correct: false, explanation: "Short-acting nifedipine is contraindicated in pregnancy due to risk of precipitous BP drop and fetal distress." },
                { id: "d", text: "ACE inhibitor (enalapril)", correct: false, explanation: "ACE inhibitors are absolutely contraindicated in pregnancy - teratogenic and fetotoxic." }
              ]
            },
            {
              id: "6M-A-q3",
              stem: "What magnesium sulfate regimen is used for eclampsia prevention?",
              timeLimit: 45,
              options: [
                { id: "a", text: "4g IV over 5-10 minutes, then 1g/hour infusion", correct: true, explanation: "Magnesium sulfate is the anticonvulsant of choice. Loading dose 4g IV, maintenance 1g/hour for 24 hours post-delivery or post-seizure." },
                { id: "b", text: "2g IM in each buttock only", correct: false, explanation: "IM regimen (4g loading then 5g IM 4-hourly) is an alternative where IV unavailable, not preferred." },
                { id: "c", text: "10g IV bolus immediately", correct: false, explanation: "10g is excessive and risks magnesium toxicity (respiratory depression, cardiac arrest)." },
                { id: "d", text: "Diazepam 10mg IV", correct: false, explanation: "Diazepam is inferior to magnesium for eclampsia and causes neonatal sedation." }
              ]
            }
          ]
        },
        {
          id: "6M-B",
          title: "HELLP Syndrome",
          mechanics: "mcq",
          objective: "Recognize HELLP and manage multidisciplinary care",
          scenario: "Postpartum day 2. BP was 150/95 in labour. Now complaining of severe malaise, nausea. Platelets 85, Hb 85, LDH 1200, bilirubin 45.",
          questions: [
            {
              id: "6M-B-q1",
              stem: "What does HELLP stand for?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Haemolysis, Elevated Liver enzymes, Low Platelets", correct: true, explanation: "HELLP is a severe variant of pre-eclampsia. Can occur antenatally or postpartum (up to 7 days)." },
                { id: "b", text: "High blood pressure, Elevated LFTs, Low Potassium", correct: false, explanation: "This is incorrect. HELLP specifically involves haemolysis, liver enzymes, and platelets." },
                { id: "c", text: "Hypertension, Epigastric pain, Liver failure, Proteinuria", correct: false, explanation: "While these may be present, HELLP is the specific acronym for haemolysis, elevated liver enzymes, low platelets." },
                { id: "d", text: "Headache, Elevated LDH, Low Platelets, Proteinuria", correct: false, explanation: "Headache is a symptom, not part of the HELLP acronym definition." }
              ]
            },
            {
              id: "6M-B-q2",
              stem: "What is the definitive treatment?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Delivery of placenta (if undelivered) + supportive care + monitoring for DIC", correct: true, explanation: "Delivery is the only cure for pre-eclampsia/HELLP. Postpartum HELLP: supportive, monitor for DIC, liver haematoma, renal failure." },
                { id: "b", text: "Platelet transfusion to >100", correct: false, explanation: "Platelets are given only if <20 or for procedure/haemorrhage. Transfusion alone does not treat HELLP." },
                { id: "c", text: "Wait for spontaneous resolution", correct: false, explanation: "HELLP can progress to liver rupture, DIC, death. Active management required." },
                { id: "d", text: "Emergency liver transplant", correct: false, explanation: "Liver transplant is only for acute liver failure unresponsive to delivery and supportive care." }
              ]
            }
          ]
        },
        {
          id: "6M-C",
          title: "Eclampsia Seizure Management",
          mechanics: "drag_drop",
          objective: "Execute the eclampsia emergency protocol",
          scenario: "Woman at 36 weeks has a tonic-clonic seizure in the antenatal clinic. Unresponsive, tongue bleeding.",
          questions: [
            {
              id: "6M-C-q1",
              stem: "Arrange the immediate management steps in correct order.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Call for help + position on left side", action: "Airway protection, prevent aspiration" },
                { id: "b", label: "Give magnesium sulfate 4g IV", action: "Anticonvulsant and prevent recurrence" },
                { id: "c", label: "Monitor airway + give oxygen", action: "Maintain oxygenation" },
                { id: "d", label: "Control BP with labetalol", action: "Prevent stroke" },
                { id: "e", label: "Plan delivery once stable", action: "Definitive treatment" }
              ],
              options: [
                { id: "a", text: "Position → Magnesium → Oxygen → BP control → Delivery planning", correct: true, explanation: "ABCDE approach: Airway (position), Breathing (oxygen), Circulation (BP), Disability (magnesium), Delivery planning." },
                { id: "b", text: "Delivery immediately → Magnesium → Oxygen", correct: false, explanation: "Delivery is definitive but mother must be stabilized first. Seizing woman cannot be safely delivered." },
                { id: "c", text: "BP control first → then magnesium", correct: false, explanation: "Magnesium treats seizure and prevents recurrence. BP control prevents stroke but seizure takes priority." },
                { id: "d", text: "CT scan first → then treat", correct: false, explanation: "CT is not immediate priority. Treat seizure first, investigate if atypical or focal neurology." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 07: FETAL GROWTH & WELLBEING
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    num: "07",
    level: "junior_residency",
    title: "Fetal Assessment",
    subtitle: "Growth, Movements & Doppler Studies",
    tagline: "The baby speaks through measurements. Learn to listen.",
    estimatedMinutes: { midwife: 55 },
    passMark: 75,
    xpReward: 250,
    media: {
      images: {
        "7A": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800"
      },
      ambience: "/audio/ultrasound_room.mp3",
      pdfs: { "growth_protocol": "/pdfs/class07_growth.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "7M-A",
          title: "Small for Gestational Age (SGA)",
          mechanics: "mcq",
          objective: "Differentiate SGA from constitutionally small and manage surveillance",
          scenario: "32-week scan: EFW 1400g (10th centile). Previous scan at 28 weeks was 50th centile. Umbilical artery PI 1.0 (normal).",
          questions: [
            {
              id: "7M-A-q1",
              stem: "What does the drop from 50th to 10th centile with normal Doppler indicate?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Late-onset fetal growth restriction with placental insufficiency", correct: true, explanation: "Crossing centiles downward with normal UA Doppler suggests late FGR. Requires enhanced surveillance (twice weekly CTG, weekly Doppler)." },
                { id: "b", text: "Constitutionally small baby", correct: false, explanation: "Constitutionally small babies follow their centile, not cross down. Crossing centiles is pathological." },
                { id: "c", text: "Normal variation - no concern", correct: false, explanation: "Crossing centiles is never normal. Requires investigation and surveillance." },
                { id: "d", text: "Wrong dates", correct: false, explanation: "Wrong dates would show consistent smallness from first trimester, not a drop between 28 and 32 weeks." }
              ]
            },
            {
              id: "7M-A-q2",
              stem: "What additional Doppler measurement is most predictive of late FGR?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Uterine artery Doppler (notching/raised PI)", correct: true, explanation: "Uterine artery notching or raised PI indicates impaired placentation - predictive of late FGR and pre-eclampsia." },
                { id: "b", text: "Middle cerebral artery Doppler only", correct: false, explanation: "MCA Doppler shows brain-sparing effect in established severe FGR, not predictive of late-onset FGR." },
                { id: "c", text: "Ductus venosus Doppler", correct: false, explanation: "DV Doppler is for severe early FGR, not late-onset cases." },
                { id: "d", text: "No Doppler needed if UA normal", correct: false, explanation: "Uterine artery Doppler provides additional information even with normal UA Doppler." }
              ]
            },
            {
              id: "7M-A-q3",
              stem: "At what gestation should delivery be offered if late FGR and UA Doppler normal?",
              timeLimit: 45,
              options: [
                { id: "a", text: "37 weeks if isolated SGA, 32-36 weeks if abnormal Doppler develops", correct: true, explanation: "Delivery by 37 weeks for late FGR. Earlier if Doppler abnormalities, oligohydramnios, or reduced fetal movements develop." },
                { id: "b", text: "40 weeks routinely", correct: false, explanation: "40 weeks is too late for FGR. Stillbirth risk increases significantly beyond 37 weeks in FGR." },
                { id: "c", text: "Immediate delivery regardless of gestation", correct: false, explanation: "Immediate delivery only if severe abnormalities (absent/reversed end-diastolic flow, abnormal DV)." },
                { id: "d", text: "Wait until spontaneous labour", correct: false, explanation: "Spontaneous labour in FGR risks stillbirth. Planned delivery by 37 weeks is standard." }
              ]
            }
          ]
        },
        {
          id: "7M-B",
          title: "Reduced Fetal Movements",
          mechanics: "mcq",
          objective: "Assess and manage women presenting with reduced movements",
          scenario: "Emma, 32 weeks. Reports baby moving less over past 3 days. Normally very active. No pain, no bleeding.",
          questions: [
            {
              id: "7M-B-q1",
              stem: "What is the first action?",
              timeLimit: 30,
              options: [
                { id: "a", text: "CTG monitoring immediately for at least 20 minutes", correct: true, explanation: "Reduced movements = CTG immediately. Do not reassure without monitoring. 50% of stillbirths are preceded by RFM." },
                { id: "b", text: "Reassure and send home", correct: false, explanation: "Never reassure without CTG. RFM is associated with stillbirth, FGR, cord accident, and placental abruption." },
                { id: "c", text: "Ultrasound scan in 3 days", correct: false, explanation: "CTG is immediate. Ultrasound for growth/Doppler may follow but CTG is first-line." },
                { id: "d", text: "Advise cold drink and lying on left side", correct: false, explanation: "While these may stimulate movements, they are not diagnostic. CTG is mandatory for any RFM presentation." }
              ]
            },
            {
              id: "7M-B-q2",
              stem: "CTG shows reduced baseline variability but normal rate. What does this suggest?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Fetal sleep cycle or possible early hypoxia - extend monitoring to 40 minutes", correct: true, explanation: "Reduced variability may be sleep cycle (20-40 min) or early hypoxia. Extend CTG, consider ultrasound if persistent." },
                { id: "b", text: "Normal CTG - discharge", correct: false, explanation: "Reduced variability is not normal. Requires further assessment." },
                { id: "c", text: "Immediate emergency caesarean", correct: false, explanation: "Reduced variability alone is not indication for immediate delivery. Assess for other features (decelerations, tachycardia)." },
                { id: "d", text: "Fetal scalp pH", correct: false, explanation: "Fetal scalp pH is for labour, not antenatal reduced movements." }
              ]
            },
            {
              id: "7M-B-q3",
              stem: "How many episodes of reduced movements should trigger induction?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Any single episode with abnormal CTG, or recurrent episodes (≥3) even with normal CTGs", correct: true, explanation: "Single episode + abnormal CTG = delivery. Recurrent RFM (≥3 episodes) increases stillbirth risk - offer delivery at term." },
                { id: "b", text: "Only if movements completely stop for 24 hours", correct: false, explanation: "Waiting 24 hours is dangerous. Any RFM requires assessment." },
                { id: "c", text: "Never - reduced movements are not an indication for induction", correct: false, explanation: "RFM is a recognized indication for induction when recurrent or with other concerns." },
                { id: "d", text: "Only after 5 episodes", correct: false, explanation: "3 episodes is the threshold for offering delivery at term. 5 is too many." }
              ]
            }
          ]
        },
                  {
          id: "7M-C",
          title: "Oligohydramnios & Polyhydramnios",
          mechanics: "mcq",
          objective: "Identify causes and manage amniotic fluid abnormalities",
          scenario: "36-week scan: AFI 5cm (oligohydramnios). Fetal growth 25th centile. Doppler normal. Fetal movements normal.",
          questions: [
            {
              id: "7M-C-q1",
              stem: "What is the most likely cause of isolated oligohydramnios at term?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Placental insufficiency with reduced fetal renal perfusion", correct: true, explanation: "At term, oligohydramnios often indicates placental insufficiency reducing fetal renal blood flow and urine output." },
                { id: "b", text: "Fetal renal agenesis", correct: false, explanation: "Renal agenesis causes anhydramnios (no fluid) from mid-pregnancy, not isolated oligohydramnios at term." },
                { id: "c", text: "Maternal dehydration", correct: false, explanation: "Maternal dehydration may mildly reduce AFI but does not cause pathological oligohydramnios requiring intervention." },
                { id: "d", text: "Fetal swallowing abnormality", correct: false, explanation: "Swallowing abnormalities are rare and would present earlier with other features." }
              ]
            },
            {
              id: "7M-C-q2",
              stem: "What is the management at 36 weeks with oligohydramnios and normal Doppler?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Delivery by 37 weeks (induction of labour)", correct: true, explanation: "Oligohydramnios at term increases risk of cord compression, meconium aspiration, and stillbirth. Delivery by 37 weeks recommended." },
                { id: "b", text: "Continue expectant management to 40 weeks", correct: false, explanation: "Expectant management increases stillbirth risk. Delivery by 37 weeks is standard for term oligohydramnios." },
                { id: "c", text: "Amnioinfusion in pregnancy", correct: false, explanation: "Amnioinfusion is for intrapartum cord compression, not antenatal management." },
                { id: "d", text: "Emergency caesarean today", correct: false, explanation: "Emergency caesarean is not required if Doppler normal and CTG reassuring. Induction of labour is appropriate." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 08: MULTIPLE PREGNANCY & BREECH PRESENTATION
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 8,
    num: "08",
    level: "junior_residency",
    title: "Malpresentation & Multiples",
    subtitle: "Twins, Breech & External Cephalic Version",
    tagline: "When the baby is not head down, decisions multiply.",
    estimatedMinutes: { midwife: 60 },
    passMark: 80,
    xpReward: 300,
    media: {
      images: {
        "8A": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
        "8B": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
      },
      ambience: "/audio/scanning_room.mp3",
      pdfs: { "breech_guidelines": "/pdfs/class08_breech.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "8M-A",
          title: "Breech Presentation at 36 Weeks",
          mechanics: "mcq",
          objective: "Counsel on options and perform ECV or refer",
          scenario: "Anna, 36+0 weeks. First baby. Confirmed breech on scan. No contraindications. Wants to avoid caesarean if possible.",
          questions: [
            {
              id: "8M-A-q1",
              stem: "What is the success rate of external cephalic version (ECV) at 36 weeks for nulliparous women?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Approximately 40% for nulliparous, 60% for multiparous", correct: true, explanation: "ECV success: ~40% nulliparous, ~60% multiparous. Tocolysis (terbutaline) improves success. Attempt at 36-37 weeks optimal." },
                { id: "b", text: "90% regardless of parity", correct: false, explanation: "90% is far too high. ECV is successful in less than half of nulliparous women." },
                { id: "c", text: "10% - rarely successful", correct: false, explanation: "10% is too pessimistic. 40% is worthwhile given it avoids caesarean." },
                { id: "d", text: "Only works if done before 32 weeks", correct: false, explanation: "ECV is performed at 36-37 weeks, not before 32 weeks. Earlier attempts have higher reversion rates." }
              ]
            },
            {
              id: "8M-A-q2",
              stem: "What is an absolute contraindication to ECV?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Placenta praevia, recent antepartum haemorrhage, or abnormal CTG", correct: true, explanation: "Absolute contraindications: placenta praevia, APH, abnormal CTG, major uterine anomaly, ruptured membranes." },
                { id: "b", text: "Nulliparity", correct: false, explanation: "Nulliparity reduces success but is not a contraindication." },
                { id: "c", text: "BMI >30", correct: false, explanation: "High BMI reduces success but is not a contraindication." },
                { id: "d", text: "Previous caesarean section", correct: false, explanation: "One previous caesarean is not a contraindication. Multiple scars may reduce success." }
              ]
            },
            {
              id: "8M-A-q3",
              stem: "If ECV fails or is declined, what is the recommended mode of delivery?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Planned caesarean section is recommended for uncomplicated breech at term", correct: true, explanation: "Term breech trial showed planned caesarean is safer for baby. Some units offer vaginal breech birth with strict criteria." },
                { id: "b", text: "Vaginal breech birth is always safer", correct: false, explanation: "Vaginal breech has higher perinatal mortality and morbidity than planned caesarean for term breech." },
                { id: "c", text: "Induction of labour regardless", correct: false, explanation: "Induction with breech presentation is not recommended - increases complications." },
                { id: "d", text: "Wait for spontaneous labour then decide", correct: false, explanation: "Planned caesarean at 39 weeks is recommended. Emergency caesarean in labour has higher risks." }
              ]
            }
          ]
        },
        {
          id: "8M-B",
          title: "Twin Pregnancy Management",
          mechanics: "mcq",
          objective: "Differentiate chorionicity and manage antenatal surveillance",
          scenario: "12-week scan shows twins. Two separate placentas, lambda sign present, thick dividing membrane.",
          questions: [
            {
              id: "8M-B-q1",
              stem: "What is the chorionicity and amnionicity?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Dichorionic diamniotic (DCDA) - lowest risk twin type", correct: true, explanation: "Lambda sign (twin peak) and thick membrane indicate DCDA. DCDA twins have lowest complications and can go to 37+6 weeks." },
                { id: "b", text: "Monochorionic diamniotic (MCDA)", correct: false, explanation: "MCDA would show T-sign, thin membrane, and single placenta. These twins need fortnightly scans from 16 weeks for TTTS." },
                { id: "c", text: "Monochorionic monoamniotic (MCMA)", correct: false, explanation: "MCMA has no dividing membrane and is highest risk. Delivery by 32-34 weeks." },
                { id: "d", text: "Conjoined twins", correct: false, explanation: "Conjoined twins are rare and diagnosed by fused bodies, not membrane characteristics." }
              ]
            },
            {
              id: "8M-B-q2",
              stem: "At what gestation should DCDA twins be delivered?",
              timeLimit: 45,
              options: [
                { id: "a", text: "By 37+0 to 37+6 weeks (induction or caesarean)", correct: true, explanation: "NICE recommends delivery by 37+6 for DCDA twins. MCDA by 36+0, MCMA by 32-34 weeks." },
                { id: "b", text: "40 weeks like singletons", correct: false, explanation: "Twins have increased stillbirth risk beyond 37 weeks. Do not wait to 40 weeks." },
                { id: "c", text: "34 weeks routinely", correct: false, explanation: "34 weeks is too early for DCDA without complications. This is MCMA timing." },
                { id: "d", text: "42 weeks if uncomplicated", correct: false, explanation: "42 weeks is absolutely contraindicated for twins. Significant stillbirth risk." }
              ]
            },
            {
              id: "8M-B-q3",
              stem: "What is the major complication specific to monochorionic twins?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Twin-to-twin transfusion syndrome (TTTS)", correct: true, explanation: "TTTS occurs in 10-15% of MCDA twins due to placental vascular anastomoses. Requires laser ablation or serial amnioreduction." },
                { id: "b", text: "Pre-eclampsia", correct: false, explanation: "Pre-eclampsia is more common in twins but not specific to monochorionicity." },
                { id: "c", text: "Gestational diabetes", correct: false, explanation: "GDM is more common in twins but not specific to monochorionicity." },
                { id: "d", text: "Placenta praevia", correct: false, explanation: "Placenta praevia is not specifically associated with monochorionic twins." }
              ]
            }
          ]
        },
        {
          id: "8M-C",
          title: "External Cephalic Version Technique",
          mechanics: "drag_drop",
          objective: "Understand the ECV procedure and safety checks",
          scenario: "Performing ECV at 37 weeks. Tocolysis given. Fetal heart checked. Abdomen relaxed.",
          questions: [
            {
              id: "8M-C-q1",
              stem: "Match the ECV step to its correct action.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Forward roll technique", action: "Disengage breech, rotate fetal back towards maternal midline, rotate 180°" },
                { id: "b", label: "Backward roll technique", action: "Used if forward roll fails - rotate opposite direction" },
                { id: "c", label: "CTG before and after", action: "Mandatory 20-minute CTG pre- and post-procedure" },
                { id: "d", label: "Anti-D if Rh negative", action: "250-500 IU after procedure due to feto-maternal haemorrhage risk" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "ECV requires tocolysis, CTG monitoring, gentle sustained pressure, and anti-D for Rh-negative women." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the ECV protocol steps carefully." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the ECV protocol steps carefully." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 09: ANTENATAL MENTAL HEALTH & VULNERABLE WOMEN
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 9,
    num: "09",
    level: "junior_residency",
    title: "Maternal Mental Health",
    subtitle: "Depression, Anxiety & Safeguarding",
    tagline: "The mind in pregnancy is as important as the body.",
    estimatedMinutes: { midwife: 55 },
    passMark: 75,
    xpReward: 275,
    media: {
      images: {
        "9A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/counselling_room.mp3",
      pdfs: { "mental_health_guidelines": "/pdfs/class09_perinatal_mental_health.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "9M-A",
          title: "Antenatal Depression Screening",
          mechanics: "mcq",
          objective: "Use Whooley questions and GAD-2 to identify mental health needs",
          scenario: "Mei, 20 weeks. Crying at every appointment. Says she feels 'empty' and can't bond with the baby. Not sleeping well.",
          questions: [
            {
              id: "9M-A-q1",
              stem: "What are the two Whooley depression screening questions?",
              timeLimit: 60,
              options: [
                { id: "a", text: "During the past month, have you often been bothered by feeling down, depressed or hopeless? AND During the past month, have you often been bothered by having little interest or pleasure in doing things?", correct: true, explanation: "Whooley questions are the universal screening tool. 'Yes' to either = further assessment with GAD-2 and PHQ-9." },
                { id: "b", text: "Are you happy about the pregnancy? AND Do you want this baby?", correct: false, explanation: "While relevant, these are not validated screening questions for depression." },
                { id: "c", text: "Do you have thoughts of harming yourself? AND Do you have support at home?", correct: false, explanation: "These are important but not the initial screening questions. Suicide risk is assessed if screening positive." },
                { id: "d", text: "Are you eating well? AND Are you sleeping well?", correct: false, explanation: "These are general wellbeing questions, not validated depression screening tools." }
              ]
            },
            {
              id: "9M-A-q2",
              stem: "Mei scores 3 on GAD-2 (anxiety) and 12 on PHQ-9 (moderate depression). What is the management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Refer to perinatal mental health team, consider SSRI (sertraline first-line), offer psychological therapy", correct: true, explanation: "Moderate-severe depression in pregnancy requires multidisciplinary care. Sertraline is first-line SSRI (lowest placental transfer)." },
                { id: "b", text: "Reassure and monitor only", correct: false, explanation: "PHQ-9 >10 requires active intervention. Untreated antenatal depression affects fetal development and mother-infant bonding." },
                { id: "c", text: "Advise stopping all medication", correct: false, explanation: "Stopping antidepressants can cause relapse. Risk-benefit favors treatment if moderate-severe." },
                { id: "d", text: "Immediate admission to psychiatric unit", correct: false, explanation: "Admission only if severe with psychosis, active suicidal intent, or inability to care for self." }
              ]
            },
            {
              id: "9M-A-q3",
              stem: "Which SSRI has the lowest placental transfer and is first-line in pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Sertraline", correct: true, explanation: "Sertraline has lowest placental transfer and is not associated with cardiac defects. Avoid paroxetine (cardiac defects)." },
                { id: "b", text: "Fluoxetine", correct: false, explanation: "Fluoxetine has higher placental transfer and longer half-life. Second-line in pregnancy." },
                { id: "c", text: "Paroxetine", correct: false, explanation: "Paroxetine is associated with fetal heart defects and should be avoided in first trimester." },
                { id: "d", text: "Venlafaxine", correct: false, explanation: "Venlafaxine is an SNRI with higher toxicity in overdose and less pregnancy safety data." }
              ]
            }
          ]
        },
        {
          id: "9M-B",
          title: "Domestic Abuse & Safeguarding",
          mechanics: "mcq",
          objective: "Recognize signs and follow safeguarding protocols",
          scenario: "Fatima, 30 weeks. Attends alone despite partner usually coming. Wearing long sleeves in summer. Jumps when phone rings. Says she 'fell' again.",
          questions: [
            {
              id: "9M-B-q1",
              stem: "What is the most appropriate immediate action?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ask directly but sensitively: 'I'm concerned about your safety. Has someone hurt you?'", correct: true, explanation: "Direct enquiry in private is recommended. Use professional interpreter if needed. Document carefully." },
                { id: "b", text: "Ignore signs - she will disclose if she wants to", correct: false, explanation: "Midwives have duty to ask. Domestic abuse escalates in pregnancy (30% of abuse starts or worsens)." },
                { id: "c", text: "Confront her partner at next visit", correct: false, explanation: "Never confront the perpetrator. This increases danger to the woman and breaches confidentiality." },
                { id: "d", text: "Tell her she must leave the relationship", correct: false, explanation: "Leaving is most dangerous time (75% of domestic homicide occurs at separation). Support, don't direct." }
              ]
            },
            {
              id: "9M-B-q2",
              stem: "What is the threshold for mandatory safeguarding referral?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Any disclosure of domestic abuse during pregnancy - mandatory referral to safeguarding team", correct: true, explanation: "Domestic abuse in pregnancy is safeguarding concern for unborn child (Children Act). Refer to safeguarding midwife/social services." },
                { id: "b", text: "Only if physical injuries are visible", correct: false, explanation: "Coercive control, emotional abuse, and sexual abuse all warrant referral even without visible injuries." },
                { id: "c", text: "Only if she wants to press charges", correct: false, explanation: "Safeguarding duty exists regardless of woman's wishes, though her safety and autonomy must be balanced." },
                { id: "d", text: "Only if children already in household are affected", correct: false, explanation: "Unborn child is covered by safeguarding. Domestic abuse during pregnancy is child protection concern." }
              ]
            }
          ]
        },
        {
          id: "9M-C",
          title: "Substance Use in Pregnancy",
          mechanics: "mcq",
          objective: "Manage opioid dependence and neonatal abstinence syndrome",
          scenario: "Jade, 28 weeks. Heroin use 0.5g daily. Wants to stop for baby. Currently not in treatment.",
          questions: [
            {
              id: "9M-C-q1",
              stem: "What is the recommended management for heroin use in pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Opioid substitution therapy (methadone or buprenorphine) - never advise abrupt withdrawal", correct: true, explanation: "Abrupt withdrawal risks fetal distress, miscarriage, preterm labour. Methadone or buprenorphine maintenance is standard." },
                { id: "b", text: "Advise immediate 'cold turkey' withdrawal", correct: false, explanation: "Abrupt opioid withdrawal in pregnancy is dangerous for fetus. Gradual substitution is safer." },
                { id: "c", text: "Prescribe codeine phosphate to wean off", correct: false, explanation: "Codeine is not appropriate substitution. Methadone or buprenorphine are evidence-based." },
                { id: "d", text: "No treatment - just monitor", correct: false, explanation: "Untreated heroin use risks fetal growth restriction, stillbirth, preterm birth, and neonatal abstinence syndrome." }
              ]
            },
            {
              id: "9M-C-q2",
              stem: "What is neonatal abstinence syndrome (NAS) and when does it peak?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Withdrawal symptoms in baby after maternal opioid exposure - peaks 48-72 hours after birth", correct: true, explanation: "NAS: tremors, high-pitched cry, poor feeding, seizures. Onset 24-72 hours, peak 48-72 hours. Finnegan scoring guides treatment." },
                { id: "b", text: "Fetal alcohol syndrome - present at birth", correct: false, explanation: "FAS is from alcohol, not opioids. NAS is specifically opioid withdrawal in neonate." },
                { id: "c", text: "Immediate withdrawal symptoms at birth", correct: false, explanation: "NAS typically presents after 24 hours as drug clears from baby's system." },
                { id: "d", text: "Symptoms at 2 weeks of age", correct: false, explanation: "2 weeks is too late for typical NAS. Symptoms peak within first week." }
              ]
            }
          ]
        }
      ]
    }
  }
];