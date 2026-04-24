// src/data/clerkship.js - Classes 01-04: Foundation Midwifery Skills
// Pre-conception, early pregnancy, and baseline midwifery assessment

export const CLERKSHIP = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 01: PRE-CONCEPTION & FERTILITY AWARENESS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    num: "01",
    level: "clerkship",
    title: "Pre-Conception Care",
    subtitle: "Fertility Awareness & Preparing for Pregnancy",
    tagline: "Before conception begins, the groundwork of health is laid.",
    estimatedMinutes: { midwife: 45 },
    passMark: 70,
    xpReward: 150,
    media: {
      images: { 
        "1A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        "1B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800",
        "1C": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/clinic_background.mp3",
      pdfs: { "preconception_guidelines": "/pdfs/class01_preconception.pdf" }
    },
    
    midwife: {
      sims: [
        {
          id: "1M-A",
          title: "Fertility Awareness Methods",
          mechanics: "mcq",
          objective: "Teach natural fertility awareness and cycle tracking",
          scenario: "Sarah, 28, wants to conceive in 6 months. She has irregular cycles (32-38 days). She is unsure when she ovulates.",
          questions: [
            {
              id: "1M-A-q1",
              stem: "Which cervical mucus change indicates peak fertility?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Thick, white, and sticky", correct: false, explanation: "Thick sticky mucus indicates non-fertile phase. Clear stretchy mucus (like egg white) indicates oestrogen surge and peak fertility." },
                { id: "b", text: "Clear, stretchy, and slippery (egg-white consistency)", correct: true, explanation: "Fertile mucus is clear, stretchy, and slippery - allowing sperm passage. It appears 1-2 days before ovulation." },
                { id: "c", text: "Dry or absent", correct: false, explanation: "Dry mucus indicates non-fertile phase, usually post-ovulation or pre-menstrual." },
                { id: "d", text: "Yellow and creamy", correct: false, explanation: "Yellow creamy mucus may indicate infection or non-fertile phase, not peak fertility." }
              ]
            },
            {
              id: "1M-A-q2",
              stem: "Sarah's basal body temperature rises by 0.3-0.5°C after ovulation. What hormone causes this?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Oestrogen", correct: false, explanation: "Oestrogen dominates the follicular phase and does not raise basal temperature." },
                { id: "b", text: "Progesterone", correct: true, explanation: "Progesterone released from corpus luteum raises BBT by 0.3-0.5°C, confirming ovulation has occurred." },
                { id: "c", text: "FSH", correct: false, explanation: "FSH stimulates follicle growth but does not affect basal temperature." },
                { id: "d", text: "LH", correct: false, explanation: "LH triggers ovulation but the temperature rise is caused by progesterone after ovulation." }
              ]
            },
            {
              id: "1M-A-q3",
              stem: "What is the first pre-conception supplement you recommend?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Folic acid 400mcg daily", correct: true, explanation: "Folic acid 400mcg daily for at least 3 months pre-conception reduces neural tube defect risk by 70%." },
                { id: "b", text: "Iron 200mg daily", correct: false, explanation: "Iron is important but not the priority pre-conception supplement unless anaemic." },
                { id: "c", text: "Vitamin D 1000IU", correct: false, explanation: "Vitamin D is recommended but folic acid is the critical first-line pre-conception supplement." },
                { id: "d", text: "Calcium 1000mg", correct: false, explanation: "Calcium is important in pregnancy but folic acid is the priority pre-conception." }
              ]
            }
          ]
        },
        {
          id: "1M-B",
          title: "Pre-Conception Risk Assessment",
          mechanics: "hotspot",
          objective: "Identify risk factors that need management before conception",
          scenario: "Priya, 34, BMI 32, Type 2 diabetes, smokes 10 cigarettes daily. Wants to start trying for a baby next month.",
          image: "/images/risk_assessment_form.jpeg",
          questions: [
            {
              id: "1M-B-q1",
              stem: "Click on the risk factor requiring MOST urgent intervention before conception.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Maternal age 34", correct: false, explanation: "Age 34 is advanced maternal age but not the most urgent modifiable risk." },
                { id: "b", text: "Smoking", correct: true, explanation: "Smoking is the most urgent modifiable risk - increases miscarriage, stillbirth, SIDS. Must stop before conception." },
                { id: "c", text: "BMI 32", correct: false, explanation: "Obesity is important but smoking cessation takes priority due to immediate fetal toxicity." },
                { id: "d", text: "Type 2 diabetes", correct: false, explanation: "Diabetes needs optimization but smoking is more urgent to address first." }
              ]
            },
            {
              id: "1M-B-q2",
              stem: "What HbA1c target should be achieved before conception?",
              timeLimit: 45,
              options: [
                { id: "a", text: "<48 mmol/mol (6.5%)", correct: true, explanation: "Pre-conception HbA1c <48 mmol/mol reduces congenital anomaly risk. Refer to diabetic pre-conception clinic." },
                { id: "b", text: "<75 mmol/mol (9%)", correct: false, explanation: "This is too high and associated with significantly increased malformation risk." },
                { id: "c", text: "No target needed", correct: false, explanation: "Strict glycaemic control pre-conception is essential to reduce teratogenic risk." },
                { id: "d", text: "<58 mmol/mol (7.5%)", correct: false, explanation: "While better than 9%, the target should be <48 mmol/mol for optimal outcomes." }
              ]
            }
          ]
        },
        {
          id: "1M-C",
          title: "Rubella & Vaccination Status",
          mechanics: "mcq",
          objective: "Assess immunity and manage non-immune women",
          scenario: "Emma, 26, blood tests show rubella IgG negative. She wants to conceive in 3 months.",
          questions: [
            {
              id: "1M-C-q1",
              stem: "What is your immediate advice?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Offer MMR vaccination now, advise avoiding pregnancy for 1 month post-vaccine", correct: true, explanation: "MMR is a live vaccine. Avoid pregnancy for 1 month after vaccination. Check immunity again post-vaccination." },
                { id: "b", text: "No action needed - rubella is rare now", correct: false, explanation: "Rubella non-immunity is serious - congenital rubella syndrome causes deafness, cataracts, heart defects." },
                { id: "c", text: "Advise she can conceive immediately after vaccination", correct: false, explanation: "Live vaccines require pregnancy avoidance for 1 month due to theoretical teratogenic risk." },
                { id: "d", text: "Give immunoglobulin instead", correct: false, explanation: "Immunoglobulin is not used for rubella pre-conception - vaccination is the correct approach." }
              ]
            },
            {
              id: "1M-C-q2",
              stem: "Which other infection status must be checked pre-conception?",
              timeLimit: 45,
              options: [
                { id: "a", text: "All of these: HIV, Hepatitis B, Syphilis, Varicella", correct: true, explanation: "All are checked pre-conception. Varicella non-immunity also requires vaccination if non-immune." },
                { id: "b", text: "HIV only", correct: false, explanation: "Multiple infections affect pregnancy outcomes and require screening." },
                { id: "c", text: "None - only check if symptomatic", correct: false, explanation: "Universal screening is recommended for blood-borne viruses in pregnancy planning." },
                { id: "d", text: "Hepatitis B only", correct: false, explanation: "Multiple infections must be screened, not just Hepatitis B." }
              ]
            }
          ]
        },
        {
          id: "1M-D",
          title: "Genetic Screening & Family History",
          mechanics: "drag_drop",
          objective: "Identify couples needing genetic counselling",
          scenario: "Aisha and her partner are both of African-Caribbean descent. Her sister has sickle cell disease. They want to conceive.",
          questions: [
            {
              id: "1M-D-q1",
              stem: "Drag the correct screening pathway for this couple.",
              timeLimit: 90,
              dragItems: [
                { id: "1", label: "Step 1: Offer haemoglobinopathy screening", order: 1 },
                { id: "2", label: "Step 2: If both carriers, refer for genetic counselling", order: 2 },
                { id: "3", label: "Step 3: Discuss options (IVF/PGD, prenatal diagnosis, adoption)", order: 3 },
                { id: "4", label: "Step 4: Support informed reproductive choice", order: 4 }
              ],
              options: [
                { id: "a", text: "Screen → Counsel → Options → Support", correct: true, explanation: "This is the correct pathway for at-risk couples. Both partners must be screened." },
                { id: "b", text: "Counsel → Screen → Support → Options", correct: false, explanation: "Screening must come before counselling so results inform the discussion." },
                { id: "c", text: "Options → Screen → Counsel → Support", correct: false, explanation: "Options cannot be discussed before knowing carrier status." },
                { id: "d", text: "Screen → Options → Counsel → Support", correct: false, explanation: "Genetic counselling should precede discussion of specific options." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 02: EARLY PREGNANCY ASSESSMENT
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 2,
    num: "02",
    level: "clerkship",
    title: "Early Pregnancy Care",
    subtitle: "Confirmation, Dating & First Trimester Screening",
    tagline: "The first trimester sets the course for the entire journey.",
    estimatedMinutes: { midwife: 50 },
    passMark: 70,
    xpReward: 175,
    media: {
      images: {
        "2A": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
        "2B": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800"
      },
      ambience: "/audio/early_pregnancy_clinic.mp3",
      pdfs: { "dating_scan": "/pdfs/class02_dating.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "2M-A",
          title: "Pregnancy Confirmation & Dating",
          mechanics: "mcq",
          objective: "Calculate gestational age and EDD accurately",
          scenario: "Lisa, LMP 14th January 2026. Regular 28-day cycles. Presents today (18th February) with positive urine pregnancy test.",
          questions: [
            {
              id: "2M-A-q1",
              stem: "Using Naegele's rule, what is Lisa's estimated due date?",
              timeLimit: 60,
              options: [
                { id: "a", text: "21st October 2026", correct: true, explanation: "Naegele's rule: LMP + 1 year - 3 months + 7 days. 14 Jan 2026 → 21 Oct 2026." },
                { id: "b", text: "14th October 2026", correct: false, explanation: "This forgot to add the 7 days. Always add 7 days to the adjusted month." },
                { id: "c", text: "7th November 2026", correct: false, explanation: "This added 7 days but went the wrong direction with months." },
                { id: "d", text: "21st November 2026", correct: false, explanation: "This added instead of subtracting months." }
              ]
            },
            {
              id: "2M-A-q2",
              stem: "Lisa's ultrasound at 8 weeks shows CRL 18mm. What does this confirm?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Viable intrauterine pregnancy consistent with dates", correct: true, explanation: "CRL 18mm at 8 weeks is appropriate. Ultrasound dating is most accurate in first trimester (±5 days)." },
                { id: "b", text: "Pregnancy is 12 weeks gestation", correct: false, explanation: "CRL 18mm corresponds to approximately 8 weeks, not 12 weeks." },
                { id: "c", text: "Ectopic pregnancy", correct: false, explanation: "A visible intrauterine CRL with cardiac activity confirms viable intrauterine pregnancy, excluding ectopic." },
                { id: "d", text: "Missed miscarriage", correct: false, explanation: "Missed miscarriage would show no cardiac activity or disproportionately small CRL." }
              ]
            },
            {
              id: "2M-A-q3",
              stem: "When should the dating scan ideally be performed?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Between 8+0 and 14+1 weeks", correct: true, explanation: "Optimal dating scan window is 8+0 to 14+1 weeks for accurate CRL measurement and combined screening." },
                { id: "b", text: "At 6 weeks to confirm cardiac activity", correct: false, explanation: "While 6-week scans confirm viability, dating is more accurate at 8-14 weeks." },
                { id: "c", text: "At 18-20 weeks anomaly scan", correct: false, explanation: "Anomaly scan is too late for accurate dating - head circumference is used if no earlier scan." },
                { id: "d", text: "At 24 weeks", correct: false, explanation: "24 weeks is far too late for accurate pregnancy dating." }
              ]
            }
          ]
        },
        {
          id: "2M-B",
          title: "Nuchal Translucency Screening",
          mechanics: "hotspot",
          objective: "Identify correct NT measurement technique and interpret risk",
          scenario: "12-week scan. You are reviewing the sonographer's NT image. NT measures 3.2mm. Crown-rump length 58mm.",
          image: "/images/nt_scan.jpeg",
          questions: [
            {
              id: "2M-B-q1",
              stem: "Click on the correct anatomical landmarks that must be visible for valid NT measurement.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Nasal bone, amnion separate from nuchal membrane, neutral fetal position", correct: true, explanation: "Valid NT requires: nasal bone visible, amnion distinguishable from nuchal skin, neutral neck position, fetus occupying >75% of image." },
                { id: "b", text: "Fetal spine only", correct: false, explanation: "Spine alone is insufficient - specific landmarks are required for valid NT measurement." },
                { id: "c", text: "Four-chamber heart view", correct: false, explanation: "Four-chamber heart is part of anomaly scan, not NT screening at 12 weeks." },
                { id: "d", text: "Any clear neck image", correct: false, explanation: "Specific landmarks and technique are required - not any neck image is valid." }
              ]
            },
            {
              id: "2M-B-q2",
              stem: "NT 3.2mm at 12 weeks (CRL 58mm). What is your interpretation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Increased risk for chromosomal abnormality - refer for diagnostic testing", correct: true, explanation: "NT >3.0mm at 12 weeks is increased risk. Combined with maternal age and biochemistry, refer for CVS or amniocentesis discussion." },
                { id: "b", text: "Normal variant - no action needed", correct: false, explanation: "NT 3.2mm is above 99th centile and warrants further investigation." },
                { id: "c", text: "Indication for immediate termination", correct: false, explanation: "Increased NT is a screening result, not diagnostic. Further testing and counselling required." },
                { id: "d", text: "Repeat NT in 2 weeks", correct: false, explanation: "NT is time-specific. Repeating at 14 weeks is not standard practice - proceed with combined screening results." }
              ]
            }
          ]
        },
        {
          id: "2M-C",
          title: "Hyperemesis Gravidarum",
          mechanics: "mcq",
          objective: "Assess severity and manage dehydration in early pregnancy",
          scenario: "Chloe, 9 weeks pregnant. Unable to keep any food or fluids down for 48 hours. Ketones 3+ on urine dip. Weight loss 3kg in 1 week.",
          questions: [
            {
              id: "2M-C-q1",
              stem: "What is the threshold for ketonuria that indicates severe HG requiring admission?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Ketones 3+ or 4+", correct: true, explanation: "Ketones 3+ or 4+ indicate significant starvation and dehydration requiring IV rehydration and antiemetics." },
                { id: "b", text: "Ketones 1+", correct: false, explanation: "1+ ketones can occur with mild nausea - oral rehydration and dietary advice usually sufficient." },
                { id: "c", text: "Any ketonuria", correct: false, explanation: "Trace ketonuria is common in pregnancy and not an admission criterion." },
                { id: "d", text: "Only if blood ketones >3 mmol/L", correct: false, explanation: "While blood ketones are more accurate, urine ketones 3+ are a practical admission threshold." }
              ]
            },
            {
              id: "2M-C-q2",
              stem: "What is the first-line antiemetic for HG?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Cyclizine or Promethazine", correct: true, explanation: "First-line antihistamines (cyclizine/promethazine) are safe in pregnancy. Follow with ondansetron if refractory." },
                { id: "b", text: "Ondansetron immediately", correct: false, explanation: "Ondansetron is second-line due to limited first-trimester safety data, though increasingly used." },
                { id: "c", text: "Metoclopramide only", correct: false, explanation: "Metoclopramide can be used but antihistamines are preferred first-line for HG." },
                { id: "d", text: "No medication - just fluids", correct: false, explanation: "Antiemetics are essential alongside rehydration for effective HG management." }
              ]
            },
            {
              id: "2M-C-q3",
              stem: "Which electrolyte disturbance is most dangerous in prolonged HG?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Hypokalaemia", correct: true, explanation: "Hypokalaemia from vomiting can cause cardiac arrhythmias. Monitor and replace potassium in IV fluids." },
                { id: "b", text: "Hypernatraemia", correct: false, explanation: "HG typically causes dehydration with normal or low sodium, not hypernatraemia." },
                { id: "c", text: "Hypercalcaemia", correct: false, explanation: "Calcium disturbances are not characteristic of HG." },
                { id: "d", text: "Hyponatraemia only", correct: false, explanation: "While hyponatraemia occurs, hypokalaemia is more immediately dangerous due to cardiac effects." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 03: ANTENATAL SCREENING & BLOOD TESTS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 3,
    num: "03",
    level: "clerkship",
    title: "Antenatal Screening",
    subtitle: "Blood Tests, Infections & Anomaly Detection",
    tagline: "Screen wisely. Counsel compassionately. Act decisively.",
    estimatedMinutes: { midwife: 55 },
    passMark: 75,
    xpReward: 200,
    media: {
      images: {
        "3A": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
        "3B": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/clinic_background.mp3",
      pdfs: { "screening_guidelines": "/pdfs/class03_screening.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "3M-A",
          title: "Anaemia in Pregnancy",
          mechanics: "mcq",
          objective: "Interpret FBC and manage iron deficiency",
          scenario: "FBC at 28 weeks: Hb 95, MCV 78, MCH 26. Ferritin 12. Patient reports fatigue and palpitations.",
          questions: [
            {
              id: "3M-A-q1",
              stem: "What type of anaemia is indicated by MCV 78 and MCH 26?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Microcytic hypochromic", correct: true, explanation: "MCV <82 and MCH <27 indicate microcytic hypochromic anaemia - iron deficiency is most common in pregnancy." },
                { id: "b", text: "Normocytic normochromic", correct: false, explanation: "Normocytic would have MCV 82-100. This is microcytic." },
                { id: "c", text: "Macrocytic", correct: false, explanation: "Macrocytic has MCV >100, typically B12/folate deficiency." },
                { id: "d", text: "Haemolytic", correct: false, explanation: "Haemolytic anaemia typically shows normocytic or macrocytic cells with raised reticulocytes." }
              ]
            },
            {
              id: "3M-A-q2",
              stem: "What is the first-line oral iron replacement?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Sodium feredetate (Niferex) 200mg twice daily", correct: true, explanation: "Oral ferrous sulfate or feredetate 200mg twice daily with vitamin C. Hb should rise by 10g/L in 2 weeks." },
                { id: "b", text: "IV iron immediately", correct: false, explanation: "IV iron is reserved for non-adherence, malabsorption, or if oral iron fails after 4 weeks." },
                { id: "c", text: "Blood transfusion", correct: false, explanation: "Transfusion only if Hb <70 with symptoms, or <80 with cardiac compromise." },
                { id: "d", text: "Folic acid 5mg alone", correct: false, explanation: "Folic acid treats macrocytic anaemia, not iron deficiency." }
              ]
            },
            {
              id: "3M-A-q3",
              stem: "What dietary advice maximizes iron absorption?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Take with orange juice, avoid tea/coffee within 1 hour", correct: true, explanation: "Vitamin C enhances absorption. Tea/coffee tannins inhibit absorption. Separate by 1-2 hours." },
                { id: "b", text: "Take with milk for stomach protection", correct: false, explanation: "Calcium in milk inhibits iron absorption." },
                { id: "c", text: "Take with breakfast regardless of content", correct: false, explanation: "Cereals with phytates and coffee at breakfast inhibit absorption." },
                { id: "d", text: "Take on an empty stomach with water only", correct: false, explanation: "While absorption is best on empty stomach, GI side effects often require food. Vitamin C is better." }
              ]
            }
          ]
        },
        {
          id: "3M-B",
          title: "Group B Streptococcus Management",
          mechanics: "mcq",
          objective: "Identify risk factors and implement intrapartum antibiotic prophylaxis",
          scenario: "Maria, 36 weeks. Previous baby had early-onset GBS sepsis. Current pregnancy GBS status unknown.",
          questions: [
            {
              id: "3M-B-q1",
              stem: "What is the risk of early-onset GBS in a subsequent pregnancy after an affected infant?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Approximately 10% (10-fold increased risk)", correct: true, explanation: "Previous affected infant carries ~10% recurrence risk. Intrapartum antibiotic prophylaxis (IAP) is strongly indicated." },
                { id: "b", text: "Same as general population (0.5%)", correct: false, explanation: "Risk is significantly elevated after an affected infant." },
                { id: "c", text: "No increased risk", correct: false, explanation: "There is a well-documented increased recurrence risk." },
                { id: "d", text: "100% risk", correct: false, explanation: "While risk is increased, it is not absolute." }
              ]
            },
            {
              id: "3M-B-q2",
              stem: "What intrapartum antibiotic regimen is recommended?",
              timeLimit: 45,
              options: [
                { id: "a", text: "IV Benzylpenicillin 3g then 1.5g 4-hourly until delivery", correct: true, explanation: "Benzylpenicillin is first-line. If penicillin allergic: cefazolin if low-risk allergy, clindamycin if high-risk/anaphylaxis risk." },
                { id: "b", text: "Oral amoxicillin once in labour", correct: false, explanation: "Oral antibiotics are insufficient - IV antibiotics must be given at least 4 hours before delivery for optimal effect." },
                { id: "c", text: "Metronidazole 400mg TDS", correct: false, explanation: "Metronidazole covers anaerobes, not GBS." },
                { id: "d", text: "No antibiotics needed if previous baby was treated successfully", correct: false, explanation: "Previous affected infant is an indication for IAP regardless of that baby's outcome." }
              ]
            },
            {
              id: "3M-B-q3",
              stem: "When should IAP ideally be started?",
              timeLimit: 30,
              options: [
                { id: "a", text: "As soon as labour is established or membranes ruptured, aiming for 4 hours before delivery", correct: true, explanation: "IAP should be given at least 4 hours before delivery for maximum efficacy in preventing vertical transmission." },
                { id: "b", text: "Only if fever develops in labour", correct: false, explanation: "Prophylaxis is given based on risk factors, not just if chorioamnionitis develops." },
                { id: "c", text: "At 36 weeks antenatally", correct: false, explanation: "Antenatal antibiotics do not prevent early-onset GBS - intrapartum is required." },
                { id: "d", text: "After delivery to the baby", correct: false, explanation: "Postnatal baby antibiotics are for suspected infection, not prophylaxis." }
              ]
            }
          ]
        },
        {
          id: "3M-C",
          title: "HIV in Pregnancy",
          mechanics: "drag_drop",
          objective: "Counsel on vertical transmission prevention",
          scenario: "Grace, newly diagnosed HIV positive at booking. CD4 450, viral load 25,000. Wants to know risks to baby.",
          questions: [
            {
              id: "3M-C-q1",
              stem: "Drag the interventions in order to reduce vertical transmission from 25% to <1%.",
              timeLimit: 90,
              dragItems: [
                { id: "1", label: "Antiretroviral therapy from second trimester", order: 1 },
                { id: "2", label: "Planned caesarean if viral load >1000 at 36 weeks", order: 2 },
                { id: "3", label: "IV AZT in labour", order: 3 },
                { id: "4", label: "Avoid breastfeeding if formula available", order: 4 },
                { id: "5", label: "Baby oral AZT for 4-6 weeks", order: 5 }
              ],
              options: [
                { id: "a", text: "ART → Delivery mode → IV AZT → Feeding → Baby prophylaxis", correct: true, explanation: "Comprehensive strategy reduces transmission to <1%. ART suppresses viral load, mode of delivery based on VL, baby gets prophylaxis." },
                { id: "b", text: "Delivery mode → ART → Baby prophylaxis → Feeding → IV AZT", correct: false, explanation: "ART must come first to reduce viral load before delivery decisions." },
                { id: "c", text: "Feeding → ART → IV AZT → Delivery mode → Baby prophylaxis", correct: false, explanation: "Feeding is important but not the first intervention in sequence." },
                { id: "d", text: "Baby prophylaxis → IV AZT → ART → Delivery mode → Feeding", correct: false, explanation: "Baby prophylaxis is last, not first." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 04: NORMAL PREGNANCY PHYSIOLOGY & COMMON COMPLAINTS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    num: "04",
    level: "clerkship",
    title: "Pregnancy Physiology",
    subtitle: "Understanding Normal Changes & Reassuring Women",
    tagline: "Every complaint has a story. Know normal to spot abnormal.",
    estimatedMinutes: { midwife: 50 },
    passMark: 70,
    xpReward: 175,
    media: {
      images: {
        "4A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/clinic_background.mp3",
      pdfs: { "physiology_guide": "/pdfs/class04_physiology.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "4M-A",
          title: "Physiological Anaemia of Pregnancy",
          mechanics: "mcq",
          objective: "Distinguish physiological dilutional anaemia from true iron deficiency",
          scenario: "Priya, 24 weeks. Hb 105, MCV 88, MCH 30. Ferritin 45. She is worried about being anaemic.",
          questions: [
            {
              id: "4M-A-q1",
              stem: "What is the primary cause of lower Hb in normal pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Plasma volume expansion (50% increase) exceeds red cell mass increase (25%)", correct: true, explanation: "Haemodilution is normal in pregnancy. Hb 105 with normal MCV/MCH and ferritin 45 is physiological, not pathological." },
                { id: "b", text: "Iron deficiency from fetal demands", correct: false, explanation: "While iron deficiency is common, this case shows normal ferritin and normal MCV/MCH - this is physiological haemodilution." },
                { id: "c", text: "Vitamin B12 deficiency", correct: false, explanation: "B12 deficiency would show macrocytosis (MCV >100), not MCV 88." },
                { id: "d", text: "Bone marrow suppression", correct: false, explanation: "Bone marrow suppression is not a feature of normal pregnancy." }
              ]
            },
            {
              id: "4M-A-q2",
              stem: "What Hb threshold defines anaemia in pregnancy at sea level?",
              timeLimit: 45,
              options: [
                { id: "a", text: "<110 g/L in first and third trimester, <105 g/L in second trimester", correct: true, explanation: "WHO thresholds: <110 g/L (1st/3rd trimester), <105 g/L (2nd trimester). Below this, investigate and treat." },
                { id: "b", text: "<120 g/L at all stages", correct: false, explanation: "120 g/L is the non-pregnant threshold. Pregnancy thresholds are lower due to physiological haemodilution." },
                { id: "c", text: "<100 g/L only in third trimester", correct: false, explanation: "Thresholds vary by trimester, not just third trimester." },
                { id: "d", text: "<90 g/L at any stage", correct: false, explanation: "90 g/L is severe anaemia requiring urgent intervention, not the diagnostic threshold." }
              ]
            }
          ]
        },
        {
          id: "4M-B",
          title: "Pregnancy-Induced Hypertension vs Pre-Eclampsia",
          mechanics: "mcq",
          objective: "Differentiate gestational hypertension from pre-eclampsia",
          scenario: "Amina, 32 weeks. BP 145/92 (was 118/76 at booking). No proteinuria. No symptoms. Fetal growth normal.",
          questions: [
            {
              id: "4M-B-q1",
              stem: "What is the correct classification?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Gestational hypertension (new onset >20 weeks, no proteinuria)", correct: true, explanation: "Gestational hypertension: new onset >20 weeks without proteinuria or other systemic features. Monitor closely for progression to pre-eclampsia." },
                { id: "b", text: "Pre-eclampsia", correct: false, explanation: "Pre-eclampsia requires hypertension PLUS proteinuria or other end-organ dysfunction." },
                { id: "c", text: "Chronic hypertension", correct: false, explanation: "Chronic hypertension is pre-existing or diagnosed <20 weeks. This is new onset at 32 weeks." },
                { id: "d", text: "White coat hypertension", correct: false, explanation: "While possible, new onset at 32 weeks should be managed as gestational hypertension until proven otherwise." }
              ]
            },
            {
              id: "4M-B-q2",
              stem: "What is the immediate management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "BP monitoring twice weekly, urine dip for protein, bloods (FBC, LFT, U&E), fetal monitoring", correct: true, explanation: "Gestational hypertension requires surveillance for progression. BP monitoring, proteinuria checks, and blood monitoring are essential." },
                { id: "b", text: "Immediate delivery", correct: false, explanation: "Delivery is not indicated for gestational hypertension without severe features." },
                { id: "c", text: "Start antihypertensives immediately", correct: false, explanation: "Antihypertensives (labetalol/nifedipine) if BP >150/100 or for maternal indication. 145/92 requires monitoring first." },
                { id: "d", text: "Reassure and discharge to routine care", correct: false, explanation: "Gestational hypertension requires enhanced surveillance, not routine care." }
              ]
            }
          ]
        },
        {
          id: "4M-C",
          title: "Common Pregnancy Complaints",
          mechanics: "mcq",
          objective: "Provide evidence-based advice for common symptoms",
          scenario: "Joanna, 18 weeks. Complains of heartburn, constipation, and leg cramps. Worried about taking any medication.",
          questions: [
            {
              id: "4M-C-q1",
              stem: "What is the first-line management for pregnancy heartburn?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Lifestyle modifications (small meals, avoid triggers, head elevated) + antacids or ranitidine if needed", correct: true, explanation: "Antacids and ranitidine are safe in pregnancy. PPIs if refractory. Avoid sodium bicarbonate (fluid retention)." },
                { id: "b", text: "Omeprazole 40mg immediately", correct: false, explanation: "Step-up approach: lifestyle first, then antacids, then H2 blockers, then PPIs if needed." },
                { id: "c", text: "No medication - it will resolve after delivery", correct: false, explanation: "While true that it resolves postpartum, women need symptom relief during pregnancy." },
                { id: "d", text: "Sodium bicarbonate tablets", correct: false, explanation: "Sodium bicarbonate causes fluid retention and alkalosis - avoid in pregnancy." }
              ]
            },
            {
              id: "4M-C-q2",
              stem: "Which supplement reduces pregnancy leg cramps?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Magnesium 200-400mg daily", correct: true, explanation: "Magnesium supplementation reduces leg cramps in pregnancy. Also ensure adequate calcium." },
                { id: "b", text: "Iron 200mg daily", correct: false, explanation: "Iron does not reduce leg cramps and may worsen constipation." },
                { id: "c", text: "Vitamin D 1000IU", correct: false, explanation: "Vitamin D is important but not specifically for leg cramps." },
                { id: "d", text: "Quinine 300mg nocte", correct: false, explanation: "Quinine is no longer recommended in pregnancy due to safety concerns." }
              ]
            },
            {
              id: "4M-C-q3",
              stem: "What is the safest laxative in pregnancy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Dietary fibre + fluids + bulk-forming laxatives (ispaghula)", correct: true, explanation: "Bulk-forming laxatives are safe first-line. Osmotic (lactulose) if needed. Avoid stimulant laxatives long-term." },
                { id: "b", text: "Senna daily", correct: false, explanation: "Stimulant laxatives can cause uterine contractions if overused. Reserve for short-term use." },
                { id: "c", text: "Sodium phosphate enema", correct: false, explanation: "Phosphate enemas can cause electrolyte disturbances - avoid in pregnancy." },
                { id: "d", text: "Castor oil", correct: false, explanation: "Castor oil stimulates uterine contractions and is contraindicated in pregnancy." }
              ]
            }
          ]
        }
      ]
    }
  }
];