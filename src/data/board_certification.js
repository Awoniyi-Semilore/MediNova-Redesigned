// board_certification.js - Classes 19-20: The Final Assessment
// Complex multi-system cases requiring synthesis of all prior learning

export const BOARD_CERTIFICATION = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 19: ADVANCED CLINICAL REASONING
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 19,
    num: "19",
    level: "board_certification",
    title: "Advanced Clinical Reasoning",
    subtitle: "Multi-System Complications & Complex Decision Making",
    tagline: "The final exam part one. No hints. No help. Only your knowledge.",
    estimatedMinutes: { midwife: 90 },
    passMark: 85,
    xpReward: 1000,
    certificateTitle: "Board Certified Midwife — Part I",
    examConfig: {
      timeMinutes: 90,
      questionCount: 15,
      allowNavigation: false,
      requireAllCorrect: false
    },
    media: {
      images: {
        "19A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "19B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/birth_unit.mp3",
      pdfs: { "complex_cases": "/pdfs/class19_complex.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "19M-A",
          title: "The Deteriorating Woman - Sepsis in Labour",
          mechanics: "mcq",
          objective: "Recognize sepsis early and escalate appropriately",
          scenario: `Priya, 38 weeks. In spontaneous labour, 6cm dilated. Temp 38.8°C, HR 128, RR 26, BP 95/60. 
          Shivering, confused, saying she feels 'terrible'. Fetal tachycardia 170. 
          Prolonged rupture of membranes 36 hours. Meconium-stained liquor. 
          GBS positive on antenatal swab but no IAP given (admitted in advanced labour).`,
          questions: [
            {
              id: "19M-A-q1",
              stem: "What is your immediate priority using the Sepsis Six framework?",
              timeLimit: 60,
              options: [
                { id: "a", text: "High-flow oxygen, IV access, blood cultures, IV antibiotics (broad-spectrum within 1 hour), IV fluids, monitor urine output", correct: true, explanation: "Sepsis Six in pregnancy: every hour of delay increases mortality. Broad-spectrum antibiotics (piperacillin-tazobactam or cefuroxime + metronidazole) within 1 hour." },
                { id: "b", text: "Wait for blood culture results before antibiotics", correct: false, explanation: "Never wait for cultures in suspected sepsis. Empiric antibiotics within 1 hour is standard. Cultures taken but do not delay treatment." },
                { id: "c", text: "Continue labour and monitor only", correct: false, explanation: "Sepsis in labour is an emergency. Maternal condition takes priority over labour progress." },
                { id: "d", text: "Immediate caesarean regardless of maternal stability", correct: false, explanation: "Delivery may be needed but maternal resuscitation comes first. Unstable mother cannot safely undergo surgery." }
              ]
            },
            {
              id: "19M-A-q2",
              stem: "Which antibiotic regimen covers the most likely pathogens?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Piperacillin-tazobactam 4.5g IV TDS OR cefuroxime 1.5g TDS + metronidazole 500mg TDS + gentamicin if severe", correct: true, explanation: "Chorioamnionitis/sepsis in labour: cover Gram-negatives, anaerobes, and GBS. Piperacillin-tazobactam is broad-spectrum. Alternative: cefuroxime + metronidazole + gentamicin." },
                { id: "b", text: "Oral amoxicillin only", correct: false, explanation: "Oral antibiotics are insufficient for sepsis. IV broad-spectrum required." },
                { id: "c", text: "Flucloxacillin for GBS only", correct: false, explanation: "Flucloxacillin covers Staph aureus, not GBS (needs penicillin/ampicillin). Also needs Gram-negative and anaerobic coverage." },
                { id: "d", text: "Metronidazole alone", correct: false, explanation: "Metronidazole covers anaerobes only. Insufficient for polymicrobial chorioamnionitis." }
              ]
            },
            {
              id: "19M-A-q3",
              stem: "What is the mode of delivery if maternal condition deteriorates despite antibiotics?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Expedite delivery (instrumental if fully dilated, caesarean if not) to remove infected source (placenta/membranes)", correct: true, explanation: "Source control is critical in sepsis. Delivery removes infected tissue. Balance with maternal stability - resuscitate while preparing for delivery." },
                { id: "b", text: "Continue labour regardless", correct: false, explanation: "Continuing labour with deteriorating sepsis risks maternal death. Source control through delivery is essential." },
                { id: "c", text: "Wait for full antibiotic course before delivery", correct: false, explanation: "Waiting for antibiotics to work before delivery is dangerous. Sepsis requires source control (delivery) alongside antibiotics." },
                { id: "d", text: "No delivery - antibiotics will cure infection", correct: false, explanation: "Antibiotics alone cannot clear established chorioamnionitis. Infected placenta and membranes must be delivered." }
              ]
            }
          ]
        },
        {
          id: "19M-B",
          title: "The Complex Birth - Shoulder Dystocia with Complications",
          mechanics: "mcq",
          objective: "Manage shoulder dystocia with additional complications",
          scenario: `Emma, GDM, 40 weeks. Induced for macrosomia (EFW 4.6kg). 
          Second stage 2.5 hours. Forceps for delay. 
          Head delivers but turtle sign. McRoberts performed. Suprapubic pressure applied. 
          Anterior shoulder still impacted. Baby's face turning blue.`,
          questions: [
            {
              id: "19M-B-q1",
              stem: "What is the next manoeuvre after McRoberts and suprapubic pressure fail?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Internal manoeuvre: Rubin or Woods screw to rotate anterior shoulder into oblique diameter", correct: true, explanation: "Internal rotation manoeuvres are next step. Rubin: push anterior shoulder towards baby's chest. Woods: rotate posterior shoulder 180°. Avoid excessive force." },
                { id: "b", text: "Pull harder on the head", correct: false, explanation: "Pulling harder causes brachial plexus injury (Erb's palsy), clavicle fracture, or cervical spine injury. Never pull hard on head." },
                { id: "c", text: "Fundal pressure", correct: false, explanation: "Fundal pressure worsens impaction and increases uterine rupture risk. Absolutely contraindicated." },
                { id: "d", text: "Wait for next contraction", correct: false, explanation: "Waiting with shoulder dystocia causes hypoxia. Active manoeuvres required immediately." }
              ]
            },
            {
              id: "19M-B-q2",
              stem: "If internal manoeuvres fail, what is the next step?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Deliver posterior arm: flex elbow, sweep arm across chest, deliver arm", correct: true, explanation: "Posterior arm delivery reduces bisacromial diameter. Grasp posterior arm, flex elbow, sweep hand across chest, deliver arm. Then anterior shoulder usually delivers." },
                { id: "b", text: "Continue internal manoeuvres indefinitely", correct: false, explanation: "If internal manoeuvres fail after 1-2 attempts, move to next step. Time is critical." },
                { id: "c", text: "Perform Zavanelli manoeuvre (cephalic replacement) immediately", correct: false, explanation: "Zavanelli is last resort before symphysiotomy or decapitation. Not routine next step." },
                { id: "d", text: "Call for help but continue waiting", correct: false, explanation: "Help should already be called (HELPERR). Active progression through manoeuvres is required." }
              ]
            },
            {
              id: "19M-B-q3",
              stem: "What complication is most likely after this shoulder dystocia?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Brachial plexus injury (Erb's palsy) in 10-20% of shoulder dystocia cases", correct: true, explanation: "Erb's palsy (C5-C6) most common. Most resolve spontaneously. Document manoeuvres, duration, and traction applied for medicolegal purposes." },
                { id: "b", text: "Fractured skull", correct: false, explanation: "Skull fracture is not typical of shoulder dystocia. Clavicle or humerus fracture may occur with excessive traction." },
                { id: "c", text: "Cerebral palsy in 50% of cases", correct: false, explanation: "Cerebral palsy risk increases with prolonged hypoxia (>5-7 minutes) but is not 50%. Most shoulder dystocia resolved within 2-3 minutes have good outcomes." },
                { id: "d", text: "No complications expected", correct: false, explanation: "Shoulder dystocia carries significant complication risk. Always document and debrief parents." }
              ]
            }
          ]
        },
        {
          id: "19M-C",
          title: "The Undifferentiated Collapse - Amniotic Fluid Embolism",
          mechanics: "text_input",
          objective: "Recognize AFE and initiate immediate resuscitation",
          scenario: `Immediately after normal vaginal birth of term baby. 
          Woman suddenly gasping, cyanosed, BP unrecordable, HR 160. 
          Profuse bleeding from vagina. Confused, then unresponsive. 
          No prior warning signs. Normal labour until delivery.`,
          questions: [
            {
              id: "19M-C-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 90,
              options: [
                { id: "a", text: "Amniotic fluid embolism (AFE)", correct: true, explanation: "Classic AFE: sudden cardiovascular collapse during/after delivery with coagulopathy. Mortality 20-60%. Diagnosis of exclusion." },
                { id: "b", text: "Simple postpartum haemorrhage", correct: false, explanation: "PPH does not explain the sudden cardiorespiratory collapse preceding bleeding. AFE causes DIC which then causes bleeding." },
                { id: "c", text: "Pulmonary embolism from DVT", correct: false, explanation: "PE presents with dyspnoea, pleuritic pain, but not typically with immediate coagulopathy and collapse at delivery." },
                { id: "d", text: "Eclampsia seizure", correct: false, explanation: "Eclampsia has preceding pre-eclampsia, and seizure is primary event. AFE has no warning and different presentation." }
              ]
            },
            {
              id: "19M-C-q2",
              stem: "What is the immediate management priority?",
              timeLimit: 60,
              options: [
                { id: "a", text: "ABCDE resuscitation, high-flow oxygen, massive transfusion protocol, ICU admission, treat DIC", correct: true, explanation: "AFE: call for help, resuscitate, manage DIC with blood products (1:1:1 ratio), ICU for ventilatory and cardiovascular support. No specific antidote." },
                { id: "b", text: "Adrenaline 0.5mg IM for anaphylaxis", correct: false, explanation: "While AFE is anaphylactoid, it is not simple anaphylaxis. Requires full resuscitation and DIC management, not just adrenaline." },
                { id: "c", text: "Heparin for presumed PE", correct: false, explanation: "Heparin worsens AFE-related DIC and bleeding. AFE is not PE." },
                { id: "d", text: "Wait for blood results", correct: false, explanation: "AFE is clinical diagnosis. Do not wait for results - resuscitate immediately while sending tests." }
              ]
            }
          ]
        },
        {
          id: "19M-D",
          title: "Ethics & Complex Decision Making",
          mechanics: "mcq",
          objective: "Navigate end-of-life decisions and family conflict",
          scenario: `24 weeks. Preterm prelabour rupture of membranes. 
          No liquor visible on scan. Cervix closed. No contractions. 
          No signs of infection. Parents want 'everything done' including caesarean if needed. 
          You counsel on prognosis.`,
          questions: [
            {
              id: "19M-D-q1",
              stem: "What is the survival rate for babies born at 24 weeks with PPROM and oligohydramnios?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Approximately 30-40% survival with significant disability risk (40-50% neurodevelopmental impairment)", correct: true, explanation: "24 weeks: 30-40% survival. PPROM with oligohydramnios reduces lung development (pulmonary hypoplasia), further reducing survival. Honest compassionate counselling required." },
                { id: "b", text: "90% survival with no disability", correct: false, explanation: "90% is far too optimistic. Even at 24 weeks with intact membranes, survival is 30-40% with significant morbidity." },
                { id: "c", text: "No chance of survival - advise termination", correct: false, explanation: "While prognosis is poor, 30-40% survival means some babies do survive. Offer balanced information, not directive counselling." },
                { id: "d", text: "100% survival if caesarean performed", correct: false, explanation: "Caesarean does not guarantee survival at 24 weeks. Mode of delivery has less impact than gestation and lung development." }
              ]
            },
            {
              id: "19M-D-q2",
              stem: "What is the most appropriate counselling approach?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Balanced, honest information about risks and benefits, support parental decision-making, document discussions", correct: true, explanation: "Non-directive counselling: provide information, support decision. Parents may choose expectant management, active intervention, or palliative care. Respect autonomy." },
                { id: "b", text: "Tell them caesarean is only option", correct: false, explanation: "Directive counselling breaches autonomy. Parents need balanced information to make informed decisions." },
                { id: "c", text: "Advise termination immediately", correct: false, explanation: "While prognosis is poor, advising termination is directive. Present options and support their decision." },
                { id: "d", text: "Avoid discussing poor prognosis to prevent distress", correct: false, explanation: "Withholding information breaches duty of candour. Parents need honest information for informed decisions." }
              ]
            },
            {
              id: "19M-D-q3",
              stem: "Which principle supports offering palliative care as an option?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Non-maleficence - preventing suffering when chance of benefit is minimal", correct: true, explanation: "When prognosis is extremely poor, non-maleficence (do no harm) supports offering palliative care to prevent suffering from invasive interventions with minimal chance of success." },
                { id: "b", text: "Justice - resource allocation", correct: false, explanation: "While resources are finite, justice is not the primary principle in individual end-of-life decisions." },
                { id: "c", text: "Autonomy - parents must choose intensive care", correct: false, explanation: "Autonomy means parents choose from options, not that intensive care is mandatory." },
                { id: "d", text: "Beneficence - all treatment is beneficial", correct: false, explanation: "Not all treatment is beneficial. Invasive treatment with minimal chance of success may cause more harm than benefit." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 20: THE GRAND ROUNDS - FINAL VIVA
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 20,
    num: "20",
    level: "board_certification",
    title: "The Grand Rounds",
    subtitle: "Master Midwife Practice & Clinical Synthesis",
    tagline: "Everything you've learned. All at once. This is your moment.",
    isFinal: true,
    estimatedMinutes: { midwife: 120 },
    passMark: 90,
    xpReward: 2000,
    certificateTitle: "Master of Midwifery Practice",
    examConfig: {
      timeMinutes: 120,
      questionCount: 20,
      allowNavigation: false,
      requireAllCorrect: false
    },
    media: {
      images: {
        "20A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "20B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/birth_centre_ambience.mp3",
      pdfs: { "final_assessment": "/pdfs/class20_final.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "20M-A",
          title: "The Synthesis - Complex Multiparous Woman",
          mechanics: "mcq",
          objective: "Integrate multiple risk factors in one complex woman",
          scenario: `Priya, 38 years old. G5P4. Previous PPH 2500ml (uterine atony). 
          BMI 38. Type 2 diabetes on metformin. Hb 85 at 28 weeks (on iron). 
          36 weeks. Breech presentation. Wants vaginal birth. 
          BP 155/95. Proteinuria +++. Fetal growth 90th centile. 
          Previous caesarean for fetal distress 8 years ago.`,
          questions: [
            {
              id: "20M-A-q1",
              stem: "What is the PRIMARY risk factor for recurrent PPH in this woman?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Previous PPH from uterine atony (strongest predictor of recurrence)", correct: true, explanation: "Previous PPH from atony: 20-30% recurrence risk. Plus BMI >35, multiparity, diabetes, polyhydramnios (if present). Active third stage essential." },
                { id: "b", text: "Maternal age 38", correct: false, explanation: "Advanced maternal age increases some risks but is not the strongest predictor of recurrent PPH." },
                { id: "c", text: "BMI 38", correct: false, explanation: "Obesity increases PPH risk but previous PPH is the strongest predictor." },
                { id: "d", text: "Previous caesarean", correct: false, explanation: "Previous caesarean increases rupture risk but not specifically PPH risk unless placenta praevia/accreta develops." }
              ]
            },
            {
              id: "20M-A-q2",
              stem: "What is the priority intervention for the breech presentation at 36 weeks?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Offer ECV at 37 weeks after controlling BP and starting antihypertensives", correct: true, explanation: "ECV contraindicated if severe pre-eclampsia or uncontrolled BP. Control BP first, then ECV if safe. If ECV fails, plan caesarean at 39 weeks." },
                { id: "b", text: "Immediate caesarean today", correct: false, explanation: "36 weeks is too early for elective delivery unless severe complications. Aim for 37-39 weeks." },
                { id: "c", text: "Vaginal breech birth regardless of risk factors", correct: false, explanation: "Vaginal breech with previous caesarean, pre-eclampsia, and macrosomia risk is contraindicated." },
                { id: "d", text: "No action - wait for spontaneous version", correct: false, explanation: "Spontaneous version after 36 weeks is unlikely. Active management (ECV or planned caesarean) required." }
              ]
            },
            {
              id: "20M-A-q3",
              stem: "What antihypertensive is safe to start in pregnancy?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Labetalol 200mg BD or nifedipine MR 20mg BD", correct: true, explanation: "Labetalol and nifedipine are first-line in pregnancy. Avoid ACE inhibitors (teratogenic). Methyldopa if labetalol contraindicated (asthma)." },
                { id: "b", text: "Ramipril", correct: false, explanation: "ACE inhibitors are absolutely contraindicated in pregnancy - fetal renal agenesis, oligohydramnios." },
                { id: "c", text: "Atenolol", correct: false, explanation: "Atenolol is associated with fetal growth restriction. Labetalol or metoprolol preferred." },
                { id: "d", text: "No antihypertensives - delivery will cure it", correct: false, explanation: "While delivery cures pre-eclampsia, BP control is needed before delivery to prevent stroke." }
              ]
            },
            {
              id: "20M-A-q4",
              stem: "What PPH prevention bundle is essential for this woman?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Active third stage (10 units IM oxytocin), IV access, blood cross-matched, uterotonics ready, cell salvage if available", correct: true, explanation: "High-risk PPH bundle: active management, IV access, cross-match blood, warming devices, cell salvage, senior staff present, haematology alert." },
                { id: "b", text: "Physiological third stage", correct: false, explanation: "Physiological management is inappropriate for high PPH risk. Active management reduces PPH by 60%." },
                { id: "c", text: "No special precautions", correct: false, explanation: "This woman has multiple high-risk factors. Enhanced precautions mandatory." },
                { id: "d", text: "Elective caesarean without labour", correct: false, explanation: "Caesarean does not prevent PPH and may increase it. Vaginal birth with precautions is preferred if safe." }
              ]
            }
          ]
        },
        {
          id: "20M-B",
          title: "The Undifferentiated Emergency - Maternal Collapse",
          mechanics: "mcq",
          objective: "Diagnostic reasoning with minimal information",
          scenario: `Postpartum day 1 after normal vaginal birth. 
          Found collapsed on bathroom floor. 
          Unresponsive. No pulse. Partner says she complained of sudden severe headache then collapsed. 
          History: 42 years old. IVF twin pregnancy. Emergency caesarean for twin 2 after vaginal birth of twin 1. 
          BP was 160/100 in labour. No proteinuria documented.`,
          questions: [
            {
              id: "20M-B-q1",
              stem: "What is the most likely cause of collapse?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Postpartum intracranial haemorrhage from uncontrolled hypertension/eclampsia", correct: true, explanation: "Sudden severe headache then collapse = intracranial haemorrhage until proven otherwise. Postpartum eclampsia can occur up to 4 weeks. Emergency CT head." },
                { id: "b", text: "Simple vasovagal syncope", correct: false, explanation: "Vasovagal syncope does not cause unresponsiveness with no pulse. This is a collapse, not a faint." },
                { id: "c", text: "Postpartum haemorrhage", correct: false, explanation: "No excessive bleeding documented. Collapse with headache points to neurological cause, not haemorrhage." },
                { id: "d", text: "Pulmonary embolism", correct: false, explanation: "PE causes dyspnoea, chest pain, collapse. Sudden headache is not typical of PE." }
              ]
            },
            {
              id: "20M-B-q2",
              stem: "What is the immediate management?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Call resus team, CPR if no pulse, CT head if ROSC, magnesium sulfate if eclampsia suspected, neurosurgical referral", correct: true, explanation: "Postpartum collapse: resuscitate, investigate. If eclampsia suspected, magnesium sulfate. CT head for neurological symptoms. Multidisciplinary care." },
                { id: "b", text: "Wait for CT before any treatment", correct: false, explanation: "Do not delay resuscitation for CT. Stabilize first, then investigate." },
                { id: "c", text: "Give antibiotics for presumed sepsis", correct: false, explanation: "Sepsis is possible but headache points to neurological cause. Do not delay appropriate investigation." },
                { id: "d", text: "Heparin for presumed PE", correct: false, explanation: "Heparin worsens intracranial haemorrhage. Do not give anticoagulation until CT excludes bleed." }
              ]
            },
            {
              id: "20M-B-q3",
              stem: "What BP threshold in postpartum requires urgent treatment?",
              timeLimit: 60,
              options: [
                { id: "a", text: "≥160/110 mmHg - treat to prevent intracranial haemorrhage and eclampsia", correct: true, explanation: "Postpartum BP ≥160/110 requires urgent treatment. Stroke risk increases dramatically above this threshold. Labetalol or nifedipine first-line." },
                { id: "b", text: "≥140/90", correct: false, explanation: "140/90 is hypertensive but not an emergency threshold. Monitor and treat if persistent." },
                { id: "c", text: "≥180/120 only", correct: false, explanation: "Waiting for 180/120 increases stroke risk. 160/110 is the treatment threshold." },
                { id: "d", text: "No treatment needed postpartum", correct: false, explanation: "Postpartum pre-eclampsia/eclampsia can occur up to 4 weeks. BP monitoring and treatment essential." }
              ]
            }
          ]
        },
        {
          id: "20M-C",
          title: "The Rare Diagnosis - Acute Fatty Liver of Pregnancy",
          mechanics: "text_input",
          objective: "Recognize atypical presentation of rare disease",
          scenario: `38 weeks. Nulliparous. 
          2-week history of nausea, vomiting, malaise. 
          Now jaundiced, confused, hypoglycaemic (glucose 2.1). 
          ALT 450, bilirubin 120, INR 2.5, creatinine 180, platelets 85. 
          BP 130/80. No proteinuria. Fetal movements reduced.`,
          questions: [
            {
              id: "20M-C-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 90,
              options: [
                { id: "a", text: "Acute fatty liver of pregnancy (AFLP)", correct: true, explanation: "AFLP: third trimester, nulliparous, male fetus risk. Triad: jaundice, coagulopathy, encephalopathy. Swansea criteria for diagnosis. Maternal mortality 10-20%." },
                { id: "b", text: "Pre-eclampsia/HELLP", correct: false, explanation: "No hypertension, no proteinuria. HELLP has haemolysis (LDH, bilirubin from haemolysis). AFLP has synthetic liver failure (low glucose, high ammonia, coagulopathy)." },
                { id: "c", text: "Viral hepatitis", correct: false, explanation: "Viral hepatitis possible but 2-week prodrome with coagulopathy and hypoglycaemia is more typical of AFLP." },
                { id: "d", text: "Cholestasis of pregnancy", correct: false, explanation: "Cholestasis causes pruritus and raised bile acids, not coagulopathy, encephalopathy, or hypoglycaemia." }
              ]
            },
            {
              id: "20M-C-q2",
              stem: "What is the emergency treatment?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Delivery immediately (source control) + ICU support (glucose, clotting factors, possible liver transplant)", correct: true, explanation: "AFLP: delivery is only cure. Stabilize glucose, correct coagulopathy, deliver. ICU postpartum. Liver transplant if fulminant liver failure." },
                { id: "b", text: "Wait for spontaneous labour", correct: false, explanation: "AFLP is life-threatening. Waiting risks maternal death from liver failure, coagulopathy, encephalopathy." },
                { id: "c", text: "Steroids to improve liver function", correct: false, explanation: "Steroids do not treat AFLP. Delivery is the only definitive treatment." },
                { id: "d", text: "Antibiotics for presumed sepsis", correct: false, explanation: "While infection can coexist, AFLP is a metabolic liver disease, not infection. Delivery is priority." }
              ]
            }
          ]
        },
        {
          id: "20M-D",
          title: "Leadership & Team Management",
          mechanics: "mcq",
          objective: "Direct team during crisis and manage resources",
          scenario: `Major incident in birth centre. Two women in active labour. 
          You are the senior midwife. One junior midwife, one student. 
          Woman 1: Term, fully dilated, pushing, fetal bradycardia 60. 
          Woman 2: 30 weeks, preterm labour, cervix 4cm, no steroids given, no neonatal cot available. 
          Woman 3 (just arrived): 41 weeks, thick meconium, fetal tachycardia 180, temp 38.5°C.`,
          questions: [
            {
              id: "20M-D-q1",
              stem: "What is your first action?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Triage by immediate threat to life: Woman 1 (fetal bradycardia = immediate delivery) → Woman 3 (possible chorioamnionitis) → Woman 2 (preterm, stable for now)", correct: true, explanation: "Crisis resource management: prioritize by acuity. Fetal bradycardia in second stage = immediate threat. Chorioamnionitis needs antibiotics and delivery. Preterm labour stable for transfer/steroids." },
                                { id: "b", text: "Attend to Woman 2 first because preterm baby is most vulnerable", correct: false, explanation: "While preterm is vulnerable, she is currently stable at 4cm. Fetal bradycardia in second stage is an immediate life threat requiring instant action." },
                { id: "c", text: "Attend to Woman 3 first because infection spreads", correct: false, explanation: "Chorioamnionitis needs urgent attention but fetal bradycardia in second stage takes priority. Delegate antibiotics for Woman 3 while managing Woman 1." },
                { id: "d", text: "Call for help and wait", correct: false, explanation: "Calling for help is correct but waiting is dangerous. Triage and act simultaneously while help arrives." }
              ]
            },
            {
              id: "20M-D-q2",
              stem: "How do you manage Woman 1 with fetal bradycardia in second stage?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Immediate instrumental delivery (ventouse/forceps) if head on perineum, or emergency caesarean if not. Call obstetrician immediately.", correct: true, explanation: "Fetal bradycardia in second stage = immediate delivery. If head visible/on perineum: instrumental. If high/not fully dilated: category 1 caesarean. Every minute increases hypoxic brain injury risk." },
                { id: "b", text: "Change position and continue pushing", correct: false, explanation: "Position change may help with cord compression but bradycardia in second stage requires immediate delivery, not conservative measures." },
                { id: "c", text: "Give terbutaline to stop contractions", correct: false, explanation: "Tocolysis is for fetal distress in first stage to allow resuscitation. In second stage, delivery is the only option." },
                { id: "d", text: "Start syntocinon augmentation", correct: false, explanation: "Augmentation worsens fetal distress. Bradycardia in second stage requires delivery, not stronger contractions." }
              ]
            },
            {
              id: "20M-D-q3",
              stem: "What communication is essential during this crisis?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Clear closed-loop communication, allocate specific roles, regular updates, document times and decisions", correct: true, explanation: "Crisis resource management: clear roles (who does what), closed-loop (confirm instructions heard), situational awareness, debrief afterwards." },
                { id: "b", text: "Work independently without communicating", correct: false, explanation: "Independent work in crisis leads to errors and omissions. Communication is essential." },
                { id: "c", text: "Only communicate with family", correct: false, explanation: "Family communication is important but clinical team coordination takes priority during active crisis." },
                { id: "d", text: "Delegate all decisions to junior midwife", correct: false, explanation: "Senior midwife retains leadership. Delegate tasks, not decision-making responsibility." }
              ]
            }
          ]
        }
      ]
    }
  }
];