// fellowship.js - Classes 15-18: Complex Birth & Advanced Midwifery
// Complex cases requiring advanced decision-making and leadership

export const FELLOWSHIP = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 15: PRETERM LABOUR & BIRTH
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 15,
    num: "15",
    level: "fellowship",
    title: "Preterm Labour",
    subtitle: "Tocolysis, Antenatal Corticosteroids & Neuroprotection",
    tagline: "Every day in utero is worth three in NICU. Fight for those days.",
    estimatedMinutes: { midwife: 70 },
    passMark: 85,
    xpReward: 450,
    media: {
      images: {
        "15A": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800"
      },
      ambience: "/audio/nicu_corridor.mp3",
      pdfs: { "preterm_guidelines": "/pdfs/class15_preterm.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "15M-A",
          title: "Threatened Preterm Labour",
          mechanics: "mcq",
          objective: "Confirm preterm labour and initiate appropriate management",
          scenario: "Priya, 30 weeks. Regular painful contractions every 5 minutes. Cervix 2cm dilated, 80% effaced, soft, anterior. Fetal fibronectin positive.",
          questions: [
            {
              id: "15M-A-q1",
              stem: "What is the diagnostic criteria for preterm labour?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Regular contractions (≥4 in 20 min or ≥8 in 60 min) with cervical change (≥1cm or ≥80% effacement)", correct: true, explanation: "Preterm labour: regular contractions + cervical change. FFN positive supports diagnosis. TVS cervical length <25mm also predictive." },
                { id: "b", text: "Any contractions before 37 weeks", correct: false, explanation: "Braxton Hicks contractions are common and not preterm labour. Cervical change is required." },
                { id: "c", text: "Cervical length <25mm alone", correct: false, explanation: "Short cervix is a risk factor but not diagnostic of active preterm labour without contractions." },
                { id: "d", text: "Positive fetal fibronectin alone", correct: false, explanation: "FFN positive has high negative predictive value but positive alone does not confirm labour." }
              ]
            },
            {
              id: "15M-A-q2",
              stem: "What are the antenatal corticosteroid regimens?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Betamethasone 12mg IM, two doses 24 hours apart OR Dexamethasone 6mg IM, four doses 12 hours apart", correct: true, explanation: "Steroids reduce RDS by 50% if birth >24 hours after first dose. Maximum benefit 48 hours to 7 days after first dose. Repeat if >7 days and still <34 weeks." },
                { id: "b", text: "Single dose of any steroid", correct: false, explanation: "Single dose is insufficient. Two-dose betamethasone or four-dose dexamethasone required." },
                { id: "c", text: "Only if birth imminent within 1 hour", correct: false, explanation: "Steroids take 24 hours for full effect but partial benefit within hours. Give even if birth may be sooner." },
                { id: "d", text: "Only after 34 weeks", correct: false, explanation: "Steroids are given up to 34+6 weeks. After 35 weeks, benefit is less clear unless elective caesarean." }
              ]
            },
            {
              id: "15M-A-q3",
              stem: "What is the tocolytic of choice to delay birth for 48 hours?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Nifedipine (calcium channel blocker) 20mg orally, then 10-20mg 6-8 hourly", correct: true, explanation: "Nifedipine is first-line tocolytic. Avoid if maternal hypotension, cardiac disease. Atosiban (oxytocin antagonist) if nifedipine contraindicated." },
                { id: "b", text: "Salbutamol IV infusion", correct: false, explanation: "Salbutamol (β-agonist) is no longer first-line due to maternal side effects (tachycardia, pulmonary oedema, hyperglycaemia)." },
                { id: "c", text: "Indomethacin", correct: false, explanation: "Indomethacin (NSAID) is used <32 weeks but risks fetal ductus arteriosus closure and oligohydramnios. Not first-line." },
                { id: "d", text: "No tocolysis - let labour progress", correct: false, explanation: "Tocolysis for 48 hours allows steroid administration and in-utero transfer to unit with NICU facilities." }
              ]
            }
          ]
        },
        {
          id: "15M-B",
          title: "Magnesium Sulfate for Neuroprotection",
          mechanics: "mcq",
          objective: "Identify eligibility and administer magnesium for fetal neuroprotection",
          scenario: "32 weeks. In established preterm labour. Cervix 5cm. Birth expected within 4 hours. No magnesium contraindications.",
          questions: [
            {
              id: "15M-B-q1",
              stem: "What is the magnesium sulfate regimen for fetal neuroprotection?",
              timeLimit: 45,
              options: [
                { id: "a", text: "4g IV loading over 30 minutes, then 1g/hour infusion until birth (or 24 hours max)", correct: true, explanation: "Magnesium sulfate reduces cerebral palsy by 30% in babies <30 weeks. Also used 30-34 weeks if imminent birth <24 hours. Monitor maternal reflexes and urine output." },
                { id: "b", text: "2g IM once", correct: false, explanation: "2g IM is insufficient. IV loading with maintenance infusion is required for neuroprotection." },
                { id: "c", text: "Only if birth <28 weeks", correct: false, explanation: "Benefit extends to 30 weeks routinely, and 30-34 weeks if birth imminent within 24 hours." },
                { id: "d", text: "Contraindicated in all preterm labour", correct: false, explanation: "Magnesium is recommended for neuroprotection. Contraindications: myasthenia gravis, renal failure, heart block." }
              ]
            },
            {
              id: "15M-B-q2",
              stem: "What maternal side effect requires stopping magnesium?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Respiratory rate <12/min, absent patellar reflexes, or urine output <30ml/hour", correct: true, explanation: "Magnesium toxicity: loss of reflexes first, then respiratory depression, then cardiac arrest. Stop infusion, give calcium gluconate 1g IV if severe." },
                { id: "b", text: "Mild headache", correct: false, explanation: "Headache is not a sign of magnesium toxicity. Monitor reflexes, respiratory rate, and urine output." },
                { id: "c", text: "Nausea", correct: false, explanation: "Nausea is a common side effect but not an indication to stop magnesium." },
                { id: "d", text: "Warm flushing sensation", correct: false, explanation: "Warm flushing is a normal side effect of magnesium and not dangerous." }
              ]
            }
          ]
        },
        {
          id: "15M-C",
          title: "Preterm Prelabour Rupture of Membranes (PPROM)",
          mechanics: "mcq",
          objective: "Manage PPROM and reduce infection risks",
          scenario: "28 weeks. Sudden gush of fluid. No contractions. Speculum: pooling of clear fluid in vagina. Nitrazine positive. Ferning positive.",
          questions: [
            {
              id: "15M-C-q1",
              stem: "What is the immediate management for PPROM at 28 weeks?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Admit for observation, steroids if not given, erythromycin 250mg QDS for 10 days, expectant management until 34 weeks", correct: true, explanation: "PPROM <34 weeks: expectant management with erythromycin, steroids, and monitoring for chorioamnionitis. Delivery at 34 weeks or if infection develops." },
                { id: "b", text: "Immediate induction of labour", correct: false, explanation: "Delivery at 28 weeks has high neonatal mortality. Expectant management with antibiotics prolongs pregnancy and improves outcomes." },
                { id: "c", text: "No antibiotics - just monitor", correct: false, explanation: "Erythromycin reduces chorioamnionitis and prolongs latency. Antibiotics are standard care." },
                { id: "d", text: "Amniocentesis to check for infection", correct: false, explanation: "Amniocentesis is not routine. Clinical assessment (temperature, WCC, CRP, fetal tachycardia, uterine tenderness) guides management." }
              ]
            },
            {
              id: "15M-C-q2",
              stem: "What are signs of chorioamnionitis requiring delivery?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Maternal fever >37.8°C, tachycardia, uterine tenderness, foul-smelling liquor, fetal tachycardia", correct: true, explanation: "Chorioamnionitis: fever + one other sign (tachycardia, tenderness, foul liquor, fetal tachycardia, WCC >15). Delivery indicated regardless of gestation." },
                { id: "b", text: "Clear liquor continuing to leak", correct: false, explanation: "Clear liquor leakage is expected in PPROM and not a sign of infection." },
                { id: "c", text: "Mild contractions", correct: false, explanation: "Contractions may indicate preterm labour but not necessarily infection." },
                { id: "d", text: "Positive GBS swab", correct: false, explanation: "GBS colonization is not chorioamnionitis. IAP in labour if GBS positive, but does not require immediate delivery." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 16: COMPLEX MEDICAL CONDITIONS IN PREGNANCY
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 16,
    num: "16",
    level: "fellowship",
    title: "Medical Complications",
    subtitle: "Cardiac, Renal & Haematological Disorders",
    tagline: "When pregnancy meets pathology, knowledge is the bridge between them.",
    estimatedMinutes: { midwife: 65 },
    passMark: 85,
    xpReward: 425,
    media: {
      images: {
        "16A": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
      },
      ambience: "/audio/high_dependency.mp3",
      pdfs: { "medical_conditions": "/pdfs/class16_medical.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "16M-A",
          title: "Cardiac Disease in Pregnancy",
          mechanics: "mcq",
          objective: "Recognize decompensation and manage safely",
          scenario: "28-year-old with congenital heart disease (tetralogy of Fallot repaired). 32 weeks. Now breathless at rest, orthopnoea, SpO2 88% on air, unable to lie flat.",
          questions: [
            {
              id: "16M-A-q1",
              stem: "What is the most dangerous period for cardiac decompensation in pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Labour and immediate postpartum (first 24-72 hours)", correct: true, explanation: "Cardiac output increases further in labour (300-500ml autotransfusion with each contraction). Postpartum: sudden fluid shifts, highest risk of pulmonary oedema." },
                { id: "b", text: "First trimester only", correct: false, explanation: "First trimester has haemodynamic changes but not the peak risk. Labour and postpartum are highest risk." },
                { id: "c", text: "Second trimester", correct: false, explanation: "Second trimester is when cardiac output peaks but decompensation is more common in third trimester and peripartum." },
                { id: "d", text: "Only if caesarean section performed", correct: false, explanation: "Vaginal birth is usually preferred for cardiac disease (less blood loss, less infection). Caesarean only for obstetric indications." }
              ]
            },
            {
              id: "16M-A-q2",
              stem: "What is the NYHA classification and what does class III-IV indicate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "NYHA III = symptoms with minimal activity; NYHA IV = symptoms at rest. Both indicate high maternal mortality risk", correct: true, explanation: "NYHA III-IV: 30-70% maternal mortality risk. Requires joint cardiac-obstetric care, early delivery planning, ICU availability." },
                { id: "b", text: "NYHA is only for heart failure", correct: false, explanation: "NYHA classifies functional capacity for all cardiac disease. Applies to congenital, valvular, and cardiomyopathy." },
                { id: "c", text: "NYHA III-IV is safe for vaginal birth", correct: false, explanation: "NYHA III-IV carries significant risk. Individualized plan with cardiac team. Often elective delivery in controlled setting." },
                { id: "d", text: "NYHA classification not relevant in pregnancy", correct: false, explanation: "NYHA is highly relevant and guides delivery planning, monitoring intensity, and need for cardiac intervention." }
              ]
            },
            {
              id: "16M-A-q3",
              stem: "What is the preferred mode of delivery for most cardiac conditions?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Vaginal birth with assisted second stage (forceps/vacuum) and early epidural", correct: true, explanation: "Vaginal birth with assisted second stage reduces pushing effort. Early epidural reduces catecholamine surge. Avoid prolonged labour." },
                { id: "b", text: "Elective caesarean for all cardiac patients", correct: false, explanation: "Caesarean has more blood loss, infection risk, thrombosis risk. Reserved for obstetric indications or specific cardiac conditions." },
                { id: "c", text: "Planned preterm delivery at 32 weeks", correct: false, explanation: "32 weeks is too early unless maternal condition critical. Aim for term if possible, or 37-38 weeks for severe cardiac disease." },
                { id: "d", text: "Home birth", correct: false, explanation: "Home birth is absolutely contraindicated for significant cardiac disease. Hospital with cardiac and ICU support required." }
              ]
            }
          ]
        },
        {
          id: "16M-B",
          title: "Thrombocytopenia in Pregnancy",
          mechanics: "mcq",
          objective: "Differentiate causes and manage safely",
          scenario: "36 weeks. Platelets 85. No bleeding. Previous platelets normal. BP 130/80. No proteinuria. Fetal growth normal.",
          questions: [
            {
              id: "16M-B-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Gestational thrombocytopenia (incidental, benign, platelets usually >70)", correct: true, explanation: "Gestational thrombocytopenia: 5-8% of pregnancies, platelets >70, no history, no fetal effects. Most common cause of low platelets in pregnancy." },
                { id: "b", text: "ITP (immune thrombocytopenic purpura)", correct: false, explanation: "ITP is possible but less common. History of low platelets, may be <50. Fetal platelets can be low (risk of neonatal ICH)." },
                { id: "c", text: "Pre-eclampsia/HELLP", correct: false, explanation: "No hypertension, no proteinuria, normal LFTs. HELLP would show haemolysis and elevated liver enzymes." },
                { id: "d", text: "DIC", correct: false, explanation: "DIC would have bleeding, abnormal clotting, and clinical cause (abruption, sepsis, dead fetus)." }
              ]
            },
            {
              id: "16M-B-q2",
              stem: "What is the platelet threshold for safe epidural insertion?",
              timeLimit: 45,
              options: [
                { id: "a", text: "≥80 × 10⁹/L for epidural, ≥50 for spinal, but individual assessment required", correct: true, explanation: "Most anaesthetists accept ≥80 for epidural. <50 is generally contraindicated. 50-80: individual risk-benefit with senior anaesthetist." },
                { id: "b", text: "Any platelet count is safe", correct: false, explanation: "Low platelets increase risk of spinal/epidural haematoma and paralysis. Thresholds exist for safety." },
                { id: "c", text: ">150 only", correct: false, explanation: "150 is normal non-pregnant level. Many pregnant women have platelets 100-150 and can safely have regional anaesthesia." },
                { id: "d", text: "Platelets do not affect epidural safety", correct: false, explanation: "Platelet count directly affects coagulation and risk of neuraxial haematoma. Always check before regional anaesthesia." }
              ]
            }
          ]
        },
        {
          id: "16M-C",
          title: "Sickle Cell Disease in Pregnancy",
          mechanics: "drag_drop",
          objective: "Manage acute chest crisis and pain in pregnant woman with sickle cell",
          scenario: "HbSS, 24 weeks. Severe chest pain, fever 38.5°C, SpO2 89% on air, new infiltrate on CXR. Worsening anaemia (Hb 52).",
          questions: [
            {
              id: "16M-C-q1",
              stem: "Match the management priority to the intervention.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Immediate priority", action: "Oxygen to maintain SpO2 >95%, IV fluids, analgesia, antibiotics" },
                { id: "b", label: "Haematology input", action: "Exchange transfusion if Hb <50 or severe symptoms - target HbS <30%" },
                { id: "c", label: "Fetal monitoring", action: "Continuous CTG - acute chest crisis causes hypoxia and acidosis" },
                { id: "d", label: "Thromboprophylaxis", action: "LMWH throughout pregnancy and 6 weeks postpartum - high VTE risk" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "Acute chest crisis in pregnancy is life-threatening. Multidisciplinary care: obstetrics, haematology, respiratory. Exchange transfusion if severe." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the management priorities for sickle cell acute chest crisis in pregnancy." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the management priorities for sickle cell acute chest crisis in pregnancy." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 17: BIRTH AFTER PREVIOUS CAESAREAN & VBAC
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 17,
    num: "17",
    level: "fellowship",
    title: "Birth After Caesarean",
    subtitle: "VBAC, ERCS & Uterine Scar Safety",
    tagline: "The scar tells a story. Read it carefully before writing the next chapter.",
    estimatedMinutes: { midwife: 75 },
    passMark: 90,
    xpReward: 500,
    media: {
      images: {
        "17A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/birth_centre.mp3",
      pdfs: { "vbac_guidelines": "/pdfs/class17_vbac.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "17M-A",
          title: "VBAC Counselling & Selection",
          mechanics: "mcq",
          objective: "Identify good candidates and counsel on risks",
          scenario: "Emma, previous caesarean for breech. Now 36 weeks, cephalic, uncomplicated pregnancy. Wants VBAC.",
          questions: [
            {
              id: "17M-A-q1",
              stem: "What is the success rate for VBAC in low-risk women?",
              timeLimit: 45,
              options: [
                { id: "a", text: "72-75% for women with previous caesarean for non-recurring indication (breech, fetal distress)", correct: true, explanation: "VBAC success: 72-75% if previous caesarean for breech/failure to progress with adequate trial. Lower (50-60%) if previous caesarean for failure to progress in second stage." },
                { id: "b", text: "95% success rate", correct: false, explanation: "95% is unrealistic. 25-30% will need repeat caesarean despite attempting VBAC." },
                { id: "c", text: "Only 20% successful", correct: false, explanation: "20% is too pessimistic. Most women with appropriate selection achieve vaginal birth." },
                { id: "d", text: "VBAC is never recommended", correct: false, explanation: "VBAC is recommended for most women with one previous caesarean. Repeat caesarean has its own risks." }
              ]
            },
            {
              id: "17M-A-q2",
              stem: "What is the risk of uterine rupture in spontaneous labour after one previous caesarean?",
              timeLimit: 45,
              options: [
                { id: "a", text: "0.5% (1 in 200) for spontaneous labour, 1-2% with induction (prostaglandins contraindicated)", correct: true, explanation: "Spontaneous VBAC: 0.5% rupture risk. Induction with prostaglandins: 2-3% risk (contraindicated). Mechanical induction (balloon) safer if induction needed." },
                { id: "b", text: "10% risk", correct: false, explanation: "10% is far too high. Would make VBAC unacceptable. Actual risk is much lower." },
                { id: "c", text: "No risk if previous caesarean was elective", correct: false, explanation: "Lower segment caesarean has lower risk than classical, but risk is never zero." },
                { id: "d", text: "50% risk", correct: false, explanation: "50% is completely incorrect. VBAC would never be offered at this risk level." }
              ]
            },
            {
              id: "17M-A-q3",
              stem: "Which factor reduces VBAC success?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Previous caesarean for failure to progress in second stage, BMI >30, age >40, no previous vaginal birth", correct: true, explanation: "Previous second stage caesarean suggests CPD. BMI >30, age >40, and no prior vaginal birth all reduce success. Induction also reduces success." },
                { id: "b", text: "Previous caesarean for breech", correct: false, explanation: "Breech is a non-recurring indication and associated with HIGHER VBAC success, not lower." },
                { id: "c", text: "Spontaneous onset of labour", correct: false, explanation: "Spontaneous labour increases VBAC success compared to induction." },
                { id: "d", text: "Cephalic presentation", correct: false, explanation: "Cephalic presentation is required for VBAC and does not reduce success." }
              ]
            }
          ]
        },
        {
          id: "17M-B",
          title: "Uterine Rupture Recognition in VBAC",
          mechanics: "mcq",
          objective: "Recognize scar dehiscence/rupture during VBAC labour",
          scenario: "VBAC labour. Previous caesarean for breech. 7cm dilated. Suddenly severe abdominal pain between contractions. Fetal heart drops to 80. Previously normal CTG.",
          questions: [
            {
              id: "17M-B-q1",
              stem: "What is the most specific sign of uterine rupture during labour?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Sudden fetal bradycardia with loss of uterine contractions on monitor + scar pain", correct: true, explanation: "Rupture: sudden fetal distress (bradycardia most common), loss of uterine tone, scar pain, vaginal bleeding, maternal shock. Bradycardia is most consistent sign." },
                { id: "b", text: "Gradual slowing of contractions", correct: false, explanation: "Rupture causes sudden loss of contractions, not gradual slowing." },
                { id: "c", text: "Improved fetal heart rate", correct: false, explanation: "Fetal heart rate deteriorates with rupture due to placental separation and hypoxia." },
                { id: "d", text: "Increased contraction strength", correct: false, explanation: "Rupture causes loss of uterine tone and contractions, not increased strength." }
              ]
            },
            {
              id: "17M-B-q2",
              stem: "What is the immediate management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Category 1 caesarean immediately, resuscitate mother, massive haemorrhage protocol", correct: true, explanation: "Uterine rupture is category 1 emergency. Deliver baby, repair uterus or hysterectomy if needed. Massive transfusion likely." },
                { id: "b", text: "Continue VBAC trial", correct: false, explanation: "Continuing VBAC with suspected rupture is dangerous. Immediate delivery required." },
                { id: "c", text: "Attempt vaginal instrumental delivery", correct: false, explanation: "Instrumental delivery with rupture is impossible and dangerous. Laparotomy required." },
                { id: "d", text: "Wait for senior review", correct: false, explanation: "Do not wait. Uterine rupture is a surgical emergency. Every minute increases fetal and maternal mortality." }
              ]
            }
          ]
        },
        {
          id: "17M-C",
          title: "Induction of Labour After Previous Caesarean",
          mechanics: "mcq",
          objective: "Counsel on induction methods and risks",
          scenario: "41 weeks. Previous caesarean for breech. Cervix unfavourable (Bishop 3). Wants induction if possible.",
          questions: [
            {
              id: "17M-C-q1",
              stem: "What is the safest induction method after previous caesarean?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Mechanical methods (balloon catheter) or low-dose oxytocin if cervix favourable. AVOID prostaglandins", correct: true, explanation: "Prostaglandins (dinoprostone, misoprostol) increase rupture risk to 2-3%. Mechanical induction or oxytocin (if favourable) preferred." },
                { id: "b", text: "Prostaglandin gel (Dinoprostone) as standard", correct: false, explanation: "Prostaglandins are contraindicated after caesarean due to increased rupture risk." },
                { id: "c", text: "High-dose syntocinon immediately", correct: false, explanation: "High-dose oxytocin increases rupture risk. Low-dose oxytocin only if cervix favourable." },
                { id: "d", text: "No induction possible - elective caesarean only", correct: false, explanation: "Induction is possible with appropriate methods. Not all women need elective caesarean." }
              ]
            },
            {
              id: "17M-C-q2",
              stem: "What is the counselling if induction fails?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Offer repeat caesarean or reassess if prostaglandins used (but avoid prostaglandins)", correct: true, explanation: "Failed induction after caesarean: repeat caesarean usually recommended. Continuing induction increases rupture risk without improving success." },
                { id: "b", text: "Continue induction for 72 hours", correct: false, explanation: "72 hours of induction after caesarean significantly increases rupture risk without benefit." },
                { id: "c", text: "Send home and wait for spontaneous labour", correct: false, explanation: "If induction indicated (post-dates), sending home risks stillbirth. Decision needed: continue caesarean or different induction." },
                { id: "d", text: "Forceps delivery regardless of station", correct: false, explanation: "Forceps with high head or unengaged head is dangerous and contraindicated." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 18: STILLBIRTH & PREGNANCY LOSS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 18,
    num: "18",
    level: "fellowship",
    title: "Pregnancy Loss",
    subtitle: "Stillbirth, Late Miscarriage & Bereavement Care",
    tagline: "When there is no heartbeat, compassion must be louder than silence.",
    estimatedMinutes: { midwife: 60 },
    passMark: 85,
    xpReward: 425,
    media: {
      images: {
        "18A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/quiet_room.mp3",
      pdfs: { "bereavement_care": "/pdfs/class18_bereavement.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "18M-A",
          title: "Diagnosis of Stillbirth",
          mechanics: "mcq",
          objective: "Confirm intrauterine death and manage immediate care",
          scenario: "38 weeks. No fetal movements for 3 days. Midwife unable to locate fetal heart with Doppler. Urgent ultrasound arranged.",
          questions: [
            {
              id: "18M-A-q1",
              stem: "How is stillbirth diagnosed?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ultrasound confirming absent fetal cardiac activity with no prior documentation of death", correct: true, explanation: "Ultrasound by experienced operator to confirm absent cardiac activity. Do not use CTG (may record maternal heart rate). Document time of diagnosis." },
                { id: "b", text: "CTG showing flat trace", correct: false, explanation: "CTG can record maternal heart rate or show false positives. Ultrasound is required for definitive diagnosis." },
                { id: "c", text: "Absence of fetal movements for 24 hours", correct: false, explanation: "Reduced movements require investigation but do not diagnose stillbirth. Ultrasound confirmation needed." },
                { id: "d", text: "Doppler unable to locate heart rate", correct: false, explanation: "Doppler may fail due to position, maternal obesity, or operator error. Ultrasound is diagnostic." }
              ]
            },
            {
              id: "18M-A-q2",
              stem: "What is the immediate priority after diagnosis?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Privacy, time with partner, compassionate communication, discuss options for birth, avoid rushed decisions", correct: true, explanation: "SANDS guidelines: privacy, time, compassionate care. Discuss induction vs expectant. Most choose induction within 24-48 hours. Offer memory making (photos, footprints, locks of hair)." },
                { id: "b", text: "Immediate induction regardless of wishes", correct: false, explanation: "While induction is usually recommended within 48 hours for maternal safety, rushing decisions is traumatic. Allow time for processing." },
                { id: "c", text: "Send home to await spontaneous labour", correct: false, explanation: "Expectant management carries risks: DIC, infection, psychological distress. Most women prefer induction within 24-48 hours." },
                { id: "d", text: "No discussion - just arrange medical management", correct: false, explanation: "Autonomy is crucial. Women need information and time to make decisions about their care." }
              ]
            },
            {
              id: "18M-A-q3",
              stem: "What investigation is most important to identify cause?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Placental histology, autopsy (with consent), Kleihauer, infection screen, maternal tests (thyroid, diabetes, APS)", correct: true, explanation: "Placental histology identifies cause in 30-40%. Autopsy in 20-30%. Kleihauer for feto-maternal haemorrhage. Infection screen. Maternal thrombophilia if recurrent." },
                { id: "b", text: "No investigation needed - it was unavoidable", correct: false, explanation: "Investigations help parents understand, guide future pregnancy care, and provide data for prevention." },
                { id: "c", text: "CTG review only", correct: false, explanation: "CTG review may identify missed warning signs but does not determine cause of death." },
                { id: "d", text: "Genetic testing of parents only", correct: false, explanation: "Genetic testing is part of workup but placental and fetal investigations are usually more informative." }
              ]
            }
          ]
        },
        {
          id: "18M-B",
          title: "Induction for Late Intrauterine Death",
          mechanics: "mcq",
          objective: "Manage medical induction of labour for stillbirth",
          scenario: "37 weeks, confirmed IUFD 24 hours ago. Cervix unfavourable. Woman wants induction today.",
          questions: [
            {
              id: "18M-B-q1",
              stem: "What is the recommended induction regimen for late IUFD?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Mifepristone 200mg orally, then misoprostol 24-48 hours later (or dinoprostone if preferred)", correct: true, explanation: "Mifepristone (anti-progesterone) sensitizes uterus to prostaglandins. Then misoprostol or dinoprostone for cervical ripening and labour. Higher doses than for live birth." },
                { id: "b", text: "Syntocinon immediately regardless of cervical status", correct: false, explanation: "Syntocinon with unfavourable cervix has high failure rate. Cervical preparation needed first." },
                { id: "c", text: "No induction - wait for spontaneous labour", correct: false, explanation: "Spontaneous labour may not occur for weeks. Risks: DIC (10% after 3-4 weeks), infection, psychological distress." },
                { id: "d", text: "Caesarean section routinely", correct: false, explanation: "Caesarean for stillbirth only if induction contraindicated or fails. Higher morbidity than vaginal birth." }
              ]
            },
            {
              id: "18M-B-q2",
              stem: "What analgesia is recommended for labour after stillbirth?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Full range including epidural - physical pain is real regardless of outcome", correct: true, explanation: "Women in labour after stillbirth experience same physical pain. Offer all analgesia options. Epidural may help with emotional as well as physical pain." },
                { id: "b", text: "Avoid epidural - she should feel the pain", correct: false, explanation: "This is cruel and not evidence-based. Pain relief is a human right regardless of pregnancy outcome." },
                { id: "c", text: "Only Entonox", correct: false, explanation: "Restricting analgesia is inappropriate. Full range should be offered and woman's choice respected." },
                { id: "d", text: "No analgesia - focus on emotional support only", correct: false, explanation: "Emotional support is crucial but does not replace physical pain relief. Both are needed." }
              ]
            }
          ]
        },
        {
          id: "18M-C",
          title: "Bereavement Care & Memory Making",
          mechanics: "drag_drop",
          objective: "Provide compassionate bereavement care and memory making",
          scenario: "Baby born sleeping at 38 weeks. Parents want to spend time with baby. You need to facilitate memory making and future support.",
          questions: [
            {
              id: "18M-C-q1",
              stem: "Match the bereavement care element to its purpose.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Memory box (photos, footprints, handprints, lock of hair)", purpose: "Tangible memories for parents to keep forever" },
                { id: "b", label: "Cooling cot (cuddle cot)", purpose: "Allows extended time with baby in room temperature for days" },
                { id: "c", label: "Baptism/naming ceremony", purpose: "Spiritual recognition of baby's existence and identity" },
                { id: "d", label: "SANDS/charity referral", purpose: "Ongoing peer support and professional counselling" },
                { id: "e", label: "Post-mortem discussion", purpose: "Information gathering to understand cause and guide future pregnancies" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "Bereavement care is holistic: practical (memory making), spiritual, emotional, and informational. Each element serves a different need." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the purposes of each bereavement care element." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the purposes of each bereavement care element." }
              ]
            }
          ]
        }
      ]
    }
  }
];