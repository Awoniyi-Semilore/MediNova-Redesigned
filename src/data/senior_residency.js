// senior_residency.js - Classes 10-14: Labour, Birth & Immediate Postpartum
// High acuity scenarios, competing priorities, emergency skills

export const SENIOR_RESIDENCY = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 10: NORMAL LABOUR & BIRTH
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    num: "10",
    level: "senior_residency",
    title: "Normal Labour",
    subtitle: "First Stage, Pain Relief & Birth Preparation",
    tagline: "Labour is a journey. Guide her through it with skill and compassion.",
    estimatedMinutes: { midwife: 65 },
    passMark: 80,
    xpReward: 350,
    media: {
      images: {
        "10A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/labour_ward.mp3",
      pdfs: { "labour_guidelines": "/pdfs/class10_labour.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "10M-A",
          title: "Latent Phase Assessment",
          mechanics: "mcq",
          objective: "Differentiate latent from active labour and manage expectations",
          scenario: "Priya, 39 weeks. Contractions every 10-15 minutes, lasting 30 seconds. Cervix 2cm, soft, anterior, 50% effaced. Membranes intact.",
          questions: [
            {
              id: "10M-A-q1",
              stem: "What is the definition of active labour?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Regular painful contractions with cervical dilation ≥4cm and progressive effacement", correct: true, explanation: "Active labour: ≥4cm with progressive change. Latent phase: 0-3cm. Admission in latent phase increases intervention rates." },
                { id: "b", text: "Any regular contractions regardless of cervical dilatation", correct: false, explanation: "Regular contractions alone do not define active labour. Cervical change is required." },
                { id: "c", text: "Ruptured membranes regardless of contractions", correct: false, explanation: "SROM without contractions is not active labour. May need induction if not in labour within 24 hours." },
                { id: "d", text: "When woman requests epidural", correct: false, explanation: "Pain relief request does not define labour stage. Assess cervix objectively." }
              ]
            },
            {
              id: "10M-A-q2",
              stem: "What is the recommended management for latent phase at home?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Stay home, rest, eat, hydrate, use TENS/paracetamol, return when contractions 3-4 min apart or waters break", correct: true, explanation: "Latent phase at home reduces admission time and intervention. Provide clear criteria for return." },
                { id: "b", text: "Admit immediately for monitoring", correct: false, explanation: "Admission in latent phase increases risk of augmentation, epidural, and caesarean without improving outcomes." },
                { id: "c", text: "Start syntocinon augmentation", correct: false, explanation: "Augmentation is for arrested active labour, not latent phase. Inappropriate use increases uterine hyperstimulation." },
                { id: "d", text: "Perform amniotomy to speed labour", correct: false, explanation: "Amniotomy in latent phase increases infection risk and may not shorten labour." }
              ]
            },
            {
              id: "10M-A-q3",
              stem: "What is the normal rate of cervical dilation in active labour?",
              timeLimit: 45,
              options: [
                { id: "a", text: "At least 0.5cm/hour for nulliparous, 1cm/hour for multiparous", correct: true, explanation: "Friedman curve: minimum 0.5cm/hr nulliparous, 1cm/hr multiparous. Slower progress warrants assessment for CPD or inefficient contractions." },
                { id: "b", text: "Exactly 1cm every 30 minutes", correct: false, explanation: "Labour progress is not linear. Some hours faster, some slower. Average rates guide, not dictate." },
                { id: "c", text: "No minimum - every labour is different", correct: false, explanation: "While individual variation exists, extremely slow progress may indicate obstruction and needs assessment." },
                { id: "d", text: "3cm per hour minimum", correct: false, explanation: "3cm/hour is rapid labour, not minimum. This expectation would lead to unnecessary intervention." }
              ]
            }
          ]
        },
        {
          id: "10M-B",
          title: "Pain Relief in Labour",
          mechanics: "drag_drop",
          objective: "Match pain relief options to clinical scenarios",
          scenario: "Labour ward with multiple women requesting different pain relief. Match the best option.",
          questions: [
            {
              id: "10M-B-q1",
              stem: "Match the pain relief method to the appropriate scenario.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Entonox (50% N2O + 50% O2)", scenario: "First stage, self-administered, short-acting, woman remains mobile" },
                { id: "b", label: "Epidural analgesia", scenario: "Severe pain, long labour, or medical indication (pre-eclampsia, breech, twins)" },
                { id: "c", label: "Intramuscular diamorphine", scenario: "Moderate pain in early labour, need rest, not near delivery" },
                { id: "d", label: "TENS machine", scenario: "Latent phase or early labour at home, non-pharmacological preference" }
              ],
              options: [
                { id: "a", text: "All correctly matched", correct: true, explanation: "Entonox: self-administered, short-acting. Epidural: gold standard but restricts mobility. Diamorphine: sedating, avoid near delivery. TENS: early labour only." },
                { id: "b", text: "Some errors", correct: false, explanation: "Review the indications and contraindications for each analgesic method." },
                { id: "c", text: "All incorrect", correct: false, explanation: "Review the indications and contraindications for each analgesic method." }
              ]
            }
          ]
        },
        {
          id: "10M-C",
          title: "Fetal Monitoring in Labour",
          mechanics: "hotspot",
          objective: "Interpret CTG patterns and classify using FIGO guidelines",
          scenario: "CTG in active labour: Baseline 145, variability 10-15, accelerations present, no decelerations for 40 minutes.",
          image: "/images/normal_ctg.jpeg",
          questions: [
            {
              id: "10M-C-q1",
              stem: "Click on the CTG feature that defines a normal (Category 1) trace.",
              timeLimit: 60,
              options: [
                { id: "a", text: "Baseline 110-160, variability 5-25, no late/variable decelerations, accelerations present", correct: true, explanation: "Category 1 (normal): baseline 110-160, variability ≥5, no decelerations (or early only), accelerations present (not required if normal otherwise)." },
                { id: "b", text: "Baseline >160 with variability <3", correct: false, explanation: "Tachycardia with reduced variability is abnormal. Could indicate fetal infection, hypoxia, or maternal pyrexia." },
                { id: "c", text: "Late decelerations with every contraction", correct: false, explanation: "Late decelerations indicate uteroplacental insufficiency - Category 2 (suspicious) or 3 (pathological)." },
                { id: "d", text: "Variable decelerations dropping to 60 for >60 seconds", correct: false, explanation: "Profound variable decelerations are Category 3 (pathological) requiring immediate action." }
              ]
            },
            {
              id: "10M-C-q2",
              stem: "How often should the CTG be reviewed and documented in active labour?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Every 15-30 minutes, with full assessment every hour", correct: true, explanation: "NICE: CTG reviewed every 15-30 min in active labour. Full documentation hourly. Escalate if any concern." },
                { id: "b", text: "Once on admission then only if called", correct: false, explanation: "Continuous CTG requires continuous attention. Intermittent auscultation is an alternative for low-risk women." },
                { id: "c", text: "Every 2 hours is sufficient", correct: false, explanation: "2-hourly review is too infrequent for continuous CTG. Abnormalities can develop rapidly." },
                { id: "d", text: "Only when midwife has time", correct: false, explanation: "CTG monitoring is a continuous responsibility, not discretionary." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 11: SECOND STAGE & BIRTH
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 11,
    num: "11",
    level: "senior_residency",
    title: "Second Stage & Birth",
    subtitle: "Pushing, Positioning & Perineal Protection",
    tagline: "The moment of truth. Support her power, protect her body.",
    estimatedMinutes: { midwife: 60 },
    passMark: 80,
    xpReward: 325,
    media: {
      images: {
        "11A": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
      },
      ambience: "/audio/birth_room.mp3",
      pdfs: { "second_stage": "/pdfs/class11_birth.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "11M-A",
          title: "Active Second Stage Management",
          mechanics: "mcq",
          objective: "Support physiological pushing and recognize delay",
          scenario: "Nulliparous woman, fully dilated 2 hours. Strong contractions. Head visible at introitus with pushing. No progress in last 30 minutes.",
          questions: [
            {
              id: "11M-A-q1",
              stem: "What is the definition of delayed second stage in nulliparous women?",
              timeLimit: 45,
              options: [
                { id: "a", text: ">2 hours without epidural, >3 hours with epidural", correct: true, explanation: "NICE: Delayed second stage nulliparous >2 hours (no epidural) or >3 hours (with epidural). Multiparous: >1 hour (no epidural) or >2 hours (with epidural)." },
                { id: "b", text: ">1 hour regardless of parity or analgesia", correct: false, explanation: "1 hour is too short for nulliparous. Parity and epidural status affect thresholds." },
                { id: "c", text: ">30 minutes if head visible", correct: false, explanation: "30 minutes with head visible may indicate obstruction but is not the definition of delayed second stage." },
                { id: "d", text: ">4 hours for everyone", correct: false, explanation: "4 hours is far too long. Intervention would be needed well before this." }
              ]
            },
            {
              id: "11M-A-q2",
              stem: "What position is associated with shortest second stage and lowest episiotomy rate?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Upright positions (squatting, kneeling, standing, birth stool)", correct: true, explanation: "Upright positions use gravity, increase pelvic outlet, reduce episiotomy and instrumental delivery. Support woman's choice." },
                { id: "b", text: "Supine lithotomy", correct: false, explanation: "Supine is associated with longer second stage, more interventions, and reduced pelvic outlet. Avoid unless medical indication." },
                { id: "c", text: "Left lateral only", correct: false, explanation: "Left lateral is useful for slow birth or perineal tear prevention but not associated with shortest second stage." },
                { id: "d", text: "Position does not matter", correct: false, explanation: "Position significantly affects labour outcomes. Upright positions are evidence-based for optimal birth." }
              ]
            },
            {
              id: "11M-A-q3",
              stem: "What is the first intervention for delayed second stage with good contractions?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Change position, encourage mobilization, empty bladder, consider oxytocin augmentation", correct: true, explanation: "Conservative measures first: position change, bladder emptying (catheter if needed), then oxytocin if contractions inadequate." },
                { id: "b", text: "Immediate forceps delivery", correct: false, explanation: "Instrumental delivery is last resort after conservative measures and if fetal/maternal compromise develops." },
                { id: "c", text: "Immediate caesarean section", correct: false, explanation: "Caesarean in second stage is difficult and risky. Try conservative measures and instrumental if appropriate." },
                { id: "d", text: "Tell her to push harder", correct: false, explanation: "Directed pushing (Valsalva) reduces oxygen transfer to fetus. Support physiological pushing with position changes." }
              ]
            }
          ]
        },
        {
          id: "11M-B",
          title: "Perineal Protection & Episiotomy",
          mechanics: "mcq",
          objective: "Prevent tears and perform episiotomy only when indicated",
          scenario: "Nulliparous woman, spontaneous birth, head crowning rapidly. Perineum stretching. You need to control the birth.",
          questions: [
            {
              id: "11M-B-q1",
              stem: "What technique reduces third and fourth degree tears?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Warm compress on perineum, hands-on (guard perineum), controlled delivery of head and shoulders, communicate with woman", correct: true, explanation: "Hands-on with warm compress reduces OASI by 50%. Controlled delivery, shoulder rotation, and communication are key." },
                { id: "b", text: "Hands-off (wait and see) approach", correct: false, explanation: "Hands-off is associated with higher tear rates. Hands-on with warm compress is evidence-based." },
                { id: "c", text: "Routine episiotomy for all nulliparous women", correct: false, explanation: "Routine episiotomy increases perineal trauma, pain, dyspareunia. Restricted use is evidence-based." },
                { id: "d", text: "Tell her to push as hard and fast as possible", correct: false, explanation: "Rapid explosive delivery increases tear risk. Controlled, guided birth protects perineum." }
              ]
            },
            {
              id: "11M-B-q2",
              stem: "What are the indications for episiotomy?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Fetal distress requiring instrumental delivery, shoulder dystocia, breech birth, rigid perineum preventing birth", correct: true, explanation: "Indications: instrumental delivery, shoulder dystocia, breech, rigid perineum. NOT routine for nulliparity or predicted tear." },
                { id: "b", text: "All nulliparous women to prevent tears", correct: false, explanation: "Routine episiotomy does not prevent severe tears and increases overall perineal trauma." },
                { id: "c", text: "If perineum looks like it might tear", correct: false, explanation: "Predicting tears is inaccurate. Most tears heal better than episiotomy. Episiotomy only for specific indications." },
                { id: "d", text: "At woman's request without indication", correct: false, explanation: "While woman has choice, episiotomy is a surgical procedure with risks. Counsel on evidence if no indication." }
              ]
            },
            {
              id: "11M-B-q3",
              stem: "What angle should a mediolateral episiotomy be cut at?",
              timeLimit: 45,
              options: [
                { id: "a", text: "60 degrees from midline (not 45) to avoid sphincter", correct: true, explanation: "NICE: 60 degrees from midline (45 degrees from vertical). This angle protects external anal sphincter. 45 degrees from midline is too close to sphincter." },
                { id: "b", text: "90 degrees (direct lateral)", correct: false, explanation: "90 degrees causes excessive bleeding and poor healing. Not recommended." },
                { id: "c", text: "30 degrees (close to midline)", correct: false, explanation: "30 degrees is essentially midline and risks extension into sphincter and rectum." },
                { id: "d", text: "45 degrees from midline (old teaching)", correct: false, explanation: "45 degrees from midline (which is 45 from vertical) was old teaching. Current evidence supports 60 degrees from midline." }
              ]
            }
          ]
        },
        {
          id: "11M-C",
          title: "Shoulder Dystocia Emergency",
          mechanics: "drag_drop",
          objective: "Execute the shoulder dystocia drill in correct sequence",
          scenario: "Head delivered but retracts against perineum (turtle sign). Shoulders not delivering with next contraction. Fetal heart dropping.",
          questions: [
            {
              id: "11M-C-q1",
              stem: "Arrange the HELPERR manoeuvres in correct order.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "H - Help", action: "Call for help, call obstetrician, anaesthetist, paediatrician" },
                { id: "b", label: "E - Evaluate for episiotomy", action: "Cut episiotomy if needed for manoeuvres (not always necessary)" },
                { id: "c", label: "L - Legs (McRoberts)", action: "Hyperflex mother's thighs onto abdomen - resolves 90% of cases" },
                { id: "d", label: "P - Pressure (suprapubic)", action: "Apply suprapubic pressure to displace anterior shoulder from symphysis" },
                { id: "e", label: "E - Enter (internal manoeuvres)", action: "Woods screw or Rubin manoeuvre - rotate shoulders obliquely" },
                { id: "f", label: "R - Remove posterior arm", action: "Deliver posterior arm across chest - reduces diameter" },
                { id: "g", label: "R - Roll (all-fours)", action: "Gaskin manoeuvre - mother on hands and knees" }
              ],
              options: [
                { id: "a", text: "Help → Evaluate → Legs → Pressure → Enter → Remove → Roll", correct: true, explanation: "HELPERR sequence. McRoberts + suprapubic pressure resolve most. Internal manoeuvres if persistent. Document manoeuvres and time." },
                { id: "b", text: "Episiotomy first → then call help", correct: false, explanation: "Help first. Episiotomy may not be needed if McRoberts works. Don't delay calling for help." },
                { id: "c", text: "Internal manoeuvres first", correct: false, explanation: "Internal manoeuvres are invasive and reserved for after external manoeuvres fail." },
                { id: "d", text: "Roll to all-fours first", correct: false, explanation: "All-fours is effective but usually tried after McRoberts and suprapubic pressure." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 12: THIRD STAGE & POSTPARTUM HAEMORRHAGE
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 12,
    num: "12",
    level: "senior_residency",
    title: "Third Stage & PPH",
    subtitle: "Active Management, Haemorrhage & Resuscitation",
    tagline: "The most dangerous minute in midwifery. Be ready.",
    estimatedMinutes: { midwife: 60 },
    passMark: 80,
    xpReward: 325,
    media: {
      images: {
        "12A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/emergency_buzzer.mp3",
      pdfs: { "pph_protocol": "/pdfs/class12_pph.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "12M-A",
          title: "Active Third Stage Management",
          mechanics: "mcq",
          objective: "Administer oxytocin and deliver placenta safely",
          scenario: "Baby born 2 minutes ago. Apgars 9 and 9. Cord pulsation ceased. Signs of placental separation visible.",
          questions: [
            {
              id: "12M-A-q1",
              stem: "What is the correct oxytocin regimen for active third stage?",
              timeLimit: 45,
              options: [
                { id: "a", text: "10 units IM oxytocin with birth of anterior shoulder OR immediately after birth", correct: true, explanation: "10 units IM oxytocin is standard. Can give with anterior shoulder or immediately after birth. Then controlled cord traction with counter-traction." },
                { id: "b", text: "Syntometrine (oxytocin + ergometrine) for all women", correct: false, explanation: "Syntometrine is second-line or if no oxytocin. Contraindicated in hypertension (ergometrine causes vasoconstriction)." },
                { id: "c", text: "40 units oxytocin in 500ml saline IV infusion", correct: false, explanation: "40 units in 500ml is for PPH treatment, not prophylaxis. Prophylaxis is 10 units IM." },
                { id: "d", text: "No oxytocin - physiological third stage", correct: false, explanation: "Active management reduces PPH by 60%. Physiological management only if woman specifically requests and low risk." }
              ]
            },
            {
              id: "12M-A-q2",
              stem: "What are the signs of placental separation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Cord lengthening, small gush of blood, uterus rises and becomes globular, fundus hard", correct: true, explanation: "These are the classic signs. Do not pull before signs appear - risk of cord avulsion or uterine inversion." },
                { id: "b", text: "Pull cord immediately after birth", correct: false, explanation: "Pulling before separation causes cord avulsion, retained placenta, or uterine inversion." },
                { id: "c", text: "Wait 30 minutes regardless of signs", correct: false, explanation: "30 minutes is threshold for retained placenta. If signs present, deliver with controlled traction." },
                { id: "d", text: "Push on fundus to expel placenta", correct: false, explanation: "Fundal pressure (Credé) is dangerous - causes uterine inversion. Use controlled cord traction with counter-traction." }
              ]
            },
            {
              id: "12M-A-q3",
              stem: "What is the definition of primary postpartum haemorrhage?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Blood loss ≥500ml from genital tract within 24 hours of birth", correct: true, explanation: "Minor PPH: 500-1000ml. Major PPH: >1000ml. Severe: >1000ml with signs of shock. Secondary PPH: 24 hours to 12 weeks." },
                { id: "b", text: "Any bleeding in first hour", correct: false, explanation: "Any bleeding is not PPH. 500ml threshold defines PPH. Visual estimation underestimates by 30-50%." },
                { id: "c", text: "Blood loss >2000ml only", correct: false, explanation: "2000ml is life-threatening major PPH. 500ml is the diagnostic threshold." },
                { id: "d", text: "Bleeding after 24 hours", correct: false, explanation: "Bleeding after 24 hours is secondary PPH, usually due to infection or retained tissue." }
              ]
            }
          ]
        },
        {
          id: "12M-B",
          title: "Major PPH Management",
          mechanics: "mcq",
          objective: "Execute the major haemorrhage protocol",
          scenario: "Blood loss 1500ml in 10 minutes. BP 85/50, HR 125. Uterus boggy. Oxytocin given but continued bleeding.",
          questions: [
            {
              id: "12M-B-q1",
              stem: "What is the first-line uterotonic after oxytocin fails?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Ergometrine 0.5mg IM (if no hypertension) or carboprost 0.25mg IM", correct: true, explanation: "Second-line: ergometrine (if normotensive) or carboprost (PGF2α). Third-line: misoprostol 800mcg PR." },
                { id: "b", text: "More oxytocin 10 units", correct: false, explanation: "Additional oxytocin is unlikely to work if first dose failed. Move to second-line agents." },
                { id: "c", text: "Wait for placenta to deliver spontaneously", correct: false, explanation: "Active management required. Waiting in major PPH is dangerous." },
                { id: "d", text: "Immediate hysterectomy", correct: false, explanation: "Hysterectomy is last resort after all medical and surgical measures fail." }
              ]
            },
            {
              id: "12M-B-q2",
              stem: "What is the 4 Ts mnemonic for PPH causes?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Tone (atony), Trauma (lacerations), Tissue (retained placenta), Thrombin (coagulopathy)", correct: true, explanation: "Tone (70% of PPH) - atony. Trauma - cervical/vaginal tears. Tissue - retained placenta/membranes. Thrombin - DIC/coagulopathy." },
                { id: "b", text: "Time, Temperature, Tension, Trauma", correct: false, explanation: "This is not the PPH mnemonic. 4 Ts specifically address the four main causes of PPH." },
                { id: "c", text: "Tachycardia, Thirst, Temperature drop, Tissue pallor", correct: false, explanation: "These are shock signs, not PPH causes." },
                { id: "d", text: "Tears, Tamponade, Tourniquet, Transfusion", correct: false, explanation: "These are management options, not the cause classification." }
              ]
            },
            {
              id: "12M-B-q3",
              stem: "What is the minimum fluid resuscitation for major PPH?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Crystalloid 3:1 ratio (3ml for every 1ml blood lost) + call for blood products early", correct: true, explanation: "3:1 crystalloid replacement. Activate major haemorrhage protocol early. O-negative if crossmatch unavailable. FFP:platelets:RBC in 1:1:1 if massive." },
                { id: "b", text: "1:1 ratio (1ml for 1ml lost)", correct: false, explanation: "1:1 is for blood products, not crystalloid. Crystalloid distributes throughout extracellular space, requiring 3:1." },
                { id: "c", text: "No fluids - give blood only", correct: false, explanation: "Blood takes time to prepare. Crystalloid resuscitation is immediate while awaiting blood." },
                { id: "d", text: "Dextrose 5% infusion", correct: false, explanation: "Dextrose 5% is not appropriate for volume resuscitation. Use Hartmann's or Plasma-Lyte." }
              ]
            }
          ]
        },
        {
          id: "12M-C",
          title: "Uterine Atony & Bimanual Compression",
          mechanics: "hotspot",
          objective: "Perform bimanual compression and identify when to escalate",
          scenario: "PPH 2000ml. Uterus boggy and atonic. Oxytocin and ergometrine given. Bleeding continues.",
          image: "/images/bimanual_compression.jpeg",
          questions: [
            {
              id: "12M-C-q1",
              stem: "Click on the correct hand placement for bimanual uterine compression.",
              timeLimit: 60,
              options: [
                { id: "a", text: "One hand on abdomen compressing fundus, other fist in vagina elevating uterus against abdominal hand", correct: true, explanation: "Bimanual compression: abdominal hand compresses fundus posteriorly, vaginal fist elevates uterus anteriorly. Maintains apposition of anterior and posterior walls." },
                { id: "b", text: "Both hands on abdomen only", correct: false, explanation: "External massage alone is insufficient for major atony. Bimanual compression is required." },
                { id: "c", text: "Pull cord while pushing on fundus", correct: false, explanation: "This is dangerous and can cause uterine inversion. Never pull cord while pushing fundus." },
                { id: "d", text: "Insert both hands into vagina", correct: false, explanation: "Both hands in vagina does not provide the fundal compression needed for bimanual compression." }
              ]
            },
            {
              id: "12M-C-q2",
              stem: "When should a Rusch balloon (uterine tamponade) be inserted?",
              timeLimit: 45,
              options: [
                { id: "a", text: "After uterotonics fail and before surgical intervention, to tamponade bleeding", correct: true, explanation: "Bakri/Rusch balloon provides tamponade when medical management fails. Fills with 300-500ml saline. If bleeding stops, leave 24 hours." },
                { id: "b", text: "First-line before any drugs", correct: false, explanation: "Balloon is second-line after uterotonics fail. Drugs are faster and less invasive." },
                { id: "c", text: "Only after hysterectomy", correct: false, explanation: "Balloon is used to avoid hysterectomy. If balloon fails, then surgical options (B-Lynch, ligation, hysterectomy)." },
                { id: "d", text: "Never - it causes infection", correct: false, explanation: "Balloon is evidence-based and safe. Infection risk is low with antibiotic prophylaxis." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 13: EMERGENCY OBSTETRIC SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 13,
    num: "13",
    level: "senior_residency",
    title: "Obstetric Emergencies",
    subtitle: "Cord Prolapse, Uterine Rupture & Amniotic Fluid Embolism",
    tagline: "When seconds decide between life and death. Act without hesitation.",
    estimatedMinutes: { midwife: 70 },
    passMark: 85,
    xpReward: 400,
    media: {
      images: {
        "13A": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
      },
      ambience: "/audio/crash_call.mp3",
      pdfs: { "obstetric_emergencies": "/pdfs/class13_emergencies.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "13M-A",
          title: "Cord Prolapse",
          mechanics: "mcq",
          objective: "Recognize and manage cord prolapse immediately",
          scenario: "Artificial rupture of membranes at 5cm. Sudden fetal bradycardia (60bpm). Vaginal examination: cord palpable beside head, pulsating.",
          questions: [
            {
              id: "13M-A-q1",
              stem: "What is the immediate first action?",
              timeLimit: 30,
              options: [
                { id: "a", text: "Push presenting part off cord manually (keep fingers in vagina), call for help, prepare for emergency caesarean", correct: true, explanation: "Immediate manual elevation of presenting part relieves cord compression. Do not remove hand until in theatre. All-fours position or knee-chest also helps." },
                { id: "b", text: "Start syntocinon augmentation", correct: false, explanation: "Augmentation worsens cord compression. Stop any oxytocin immediately." },
                { id: "c", text: "Wait for next contraction to see if heart rate recovers", correct: false, explanation: "Cord prolapse causes immediate hypoxia. Waiting risks fetal death within minutes." },
                { id: "d", text: "Perform amnioinfusion", correct: false, explanation: "Amnioinfusion is not appropriate for cord prolapse. Immediate manual relief and delivery required." }
              ]
            },
            {
              id: "13M-A-q2",
              stem: "What position helps relieve cord compression while preparing for theatre?",
              timeLimit: 45,
              options: [
                { id: "a", text: "All-fours (knee-chest) or left lateral with head down and pillow under hips", correct: true, explanation: "Gravity displaces uterus off cord. Knee-chest or steep Trendelenburg with manual elevation. Continuous fetal monitoring." },
                { id: "b", text: "Supine flat", correct: false, explanation: "Supine increases uterine compression of cord against sacrum and maternal vessels." },
                { id: "c", text: "Sitting upright", correct: false, explanation: "Upright increases downward pressure of presenting part on cord." },
                { id: "d", text: "Standing", correct: false, explanation: "Standing is impractical and increases pressure on cord." }
              ]
            },
            {
              id: "13M-A-q3",
              stem: "What is the target 'decision to delivery' interval?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Within 15 minutes for cord prolapse with fetal bradycardia", correct: true, explanation: "Cord prolapse: 15-minute decision-to-delivery interval. Category 1 caesarean. Fetal mortality increases dramatically after 10-15 minutes." },
                { id: "b", text: "30 minutes is acceptable", correct: false, explanation: "30 minutes is too long for cord prolapse. Brain damage occurs after 8-10 minutes of complete hypoxia." },
                { id: "c", text: "60 minutes", correct: false, explanation: "60 minutes would result in fetal death or severe neurological damage." },
                { id: "d", text: "No rush - monitor first", correct: false, explanation: "Cord prolapse is a category 1 emergency. Every second counts." }
              ]
            }
          ]
        },
        {
          id: "13M-B",
          title: "Uterine Rupture",
          mechanics: "mcq",
          objective: "Recognize signs of impending or actual rupture",
          scenario: "Previous caesarean section. Induction with syntocinon. Contractions every 2 minutes, lasting 90 seconds. Sudden severe abdominal pain, scar tenderness, fetal bradycardia.",
          questions: [
            {
              id: "13M-B-q1",
              stem: "What is the classic sign of uterine rupture?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Sudden onset of constant severe pain with scar tenderness, fetal bradycardia, and loss of contractions on monitor", correct: true, explanation: "Rupture: pain (may be absent with epidural), scar tenderness, fetal distress, vaginal bleeding, haematuria, loss of uterine tone, maternal shock." },
                { id: "b", text: "Gradual increase in contraction strength", correct: false, explanation: "Rupture is sudden, not gradual. Loss of contractions is more typical than increase." },
                { id: "c", text: "Improved fetal heart rate", correct: false, explanation: "Fetal heart rate deteriorates with rupture due to placental separation and maternal shock." },
                { id: "d", text: "Decreased pain with epidural", correct: false, explanation: "Epidural may mask pain, making diagnosis harder. Other signs (fetal distress, scar tenderness, bleeding) become more important." }
              ]
            },
            {
              id: "13M-B-q2",
              stem: "What is the immediate management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Stop syntocinon immediately, large-bore IV access, cross-match blood, emergency laparotomy", correct: true, explanation: "Stop oxytocin, resuscitate, prepare for laparotomy. Delivery baby, repair uterus or hysterectomy if uncontrollable." },
                { id: "b", text: "Continue syntocinon to deliver quickly", correct: false, explanation: "Continuing oxytocin worsens rupture and causes uterine expulsion of fetus into abdomen." },
                { id: "c", text: "Attempt vaginal birth", correct: false, explanation: "Vaginal birth with uterine rupture is impossible and dangerous. Emergency laparotomy required." },
                { id: "d", text: "Wait for senior review", correct: false, explanation: "Uterine rupture is an emergency. Do not wait - immediate laparotomy while resuscitating." }
              ]
            }
          ]
        },
        {
          id: "13M-C",
          title: "Amniotic Fluid Embolism",
          mechanics: "mcq",
          objective: "Recognize this rare catastrophic emergency",
          scenario: "Immediately after normal vaginal birth. Woman suddenly gasping, cyanosed, BP drops to 60/40, HR 140. Profuse bleeding. Confused.",
          questions: [
            {
              id: "13M-C-q1",
              stem: "What is the pathophysiology of amniotic fluid embolism?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Anaphylactoid reaction to fetal cells entering maternal circulation causing DIC and cardiopulmonary collapse", correct: true, explanation: "AFE is an immunological reaction, not simple embolism. Triggers: fetal squames, hair, meconium in maternal circulation. Mortality 20-60%." },
                { id: "b", text: "Bacterial infection of amniotic fluid", correct: false, explanation: "Chorioamnionitis is infection. AFE is an immunological/anaphylactoid reaction, not infectious." },
                { id: "c", text: "Simple mechanical blockage of pulmonary vessels", correct: false, explanation: "While fetal cells enter circulation, the reaction is immunological (anaphylactoid), not mechanical blockage." },
                { id: "d", text: "Allergic reaction to oxytocin", correct: false, explanation: "Oxytocin allergy is rare and presents differently. AFE is specifically related to amniotic fluid components." }
              ]
            },
            {
              id: "13M-C-q2",
              stem: "What is the immediate management?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Immediate resuscitation (ABCDE), high-flow oxygen, blood products for DIC, ICU admission, notify haematology", correct: true, explanation: "AFE: call for help, resuscitate, manage DIC with blood products, ICU for ventilatory and cardiovascular support. No specific antidote." },
                { id: "b", text: "Give adrenaline 0.5mg IM", correct: false, explanation: "Adrenaline is for anaphylaxis. AFE is anaphylactoid but management is resuscitation and DIC management, not just adrenaline." },
                { id: "c", text: "Antibiotics immediately", correct: false, explanation: "Antibiotics treat infection. AFE is not infectious. DIC and cardiovascular collapse are the priorities." },
                { id: "d", text: "Wait for blood results before treating", correct: false, explanation: "AFE is a clinical diagnosis. Do not wait for results - resuscitate immediately while sending tests." }
              ]
            }
          ]
        }
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 14: NEONATAL RESUSCITATION & TRANSITION
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 14,
    num: "14",
    level: "senior_residency",
    title: "Neonatal Resuscitation",
    subtitle: "Birth to Breathing, NRP & Stabilization",
    tagline: "The first minute determines the first year. Make it count.",
    estimatedMinutes: { midwife: 60 },
    passMark: 80,
    xpReward: 350,
    media: {
      images: {
        "14A": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800"
      },
      ambience: "/audio/resus_room.mp3",
      pdfs: { "nrp_guidelines": "/pdfs/class14_nrp.pdf" }
    },

    midwife: {
      sims: [
        {
          id: "14M-A",
          title: "Newborn Life Support",
          mechanics: "drag_drop",
          objective: "Execute the NRP algorithm for a non-breathing baby",
          scenario: "Term baby born. Not crying. Floppy. Blue. Heart rate 80 on stethoscope.",
          questions: [
            {
              id: "14M-A-q1",
              stem: "Arrange the initial steps in correct order.",
              timeLimit: 90,
              dragItems: [
                { id: "a", label: "Dry and stimulate", action: "Dry baby, remove wet towel, rub back or flick soles" },
                { id: "b", label: "Position airway", action: "Sniffing position - head neutral, neck slightly extended" },
                { id: "c", label: "Suction if needed", action: "Suction mouth then nose only if obstructed or meconium-stained and non-vigorous" },
                { id: "d", label: "Assess breathing and heart rate", action: "Look for chest movement, auscultate heart rate for 6 seconds" }
              ],
              options: [
                { id: "a", text: "Dry/stimulate → Position → Suction if needed → Assess breathing and HR", correct: true, explanation: "NRP: Dry, position, suction (if needed), assess. Golden minute: complete these within 60 seconds." },
                { id: "b", text: "Suction first always", correct: false, explanation: "Routine suction is not recommended. Only if airway obstructed or meconium-stained non-vigorous baby." },
                { id: "c", text: "Intubate immediately", correct: false, explanation: "Intubation is not first-line. Only if bag-mask ventilation fails or specific indications." },
                { id: "d", text: "Give cardiac compressions first", correct: false, explanation: "Compressions only if HR <60 after 30 seconds of effective ventilation." }
              ]
            }
          ]
        },
        {
          id: "14M-B",
          title: "Positive Pressure Ventilation",
          mechanics: "mcq",
          objective: "Perform effective bag-mask ventilation",
          scenario: "Baby not breathing after initial steps. Heart rate 60. You start bag-mask ventilation.",
          questions: [
            {
              id: "14M-B-q1",
              stem: "What is the correct ventilation rate for newborn resuscitation?",
              timeLimit: 45,
              options: [
                { id: "a", text: "40-60 breaths per minute", correct: true, explanation: "NRP: 40-60 breaths/minute. Squeeze bag to produce visible chest rise. Avoid excessive pressure (pneumothorax risk)." },
                { id: "b", text: "20 breaths per minute", correct: false, explanation: "20 is too slow. Newborns need 40-60 breaths/minute for adequate ventilation." },
                { id: "c", text: "100 breaths per minute", correct: false, explanation: "100 is compression rate, not ventilation rate. Ventilation at 100 would cause air trapping." },
                { id: "d", text: "12 breaths per minute", correct: false, explanation: "12 is adult rate. Newborns have higher respiratory requirements." }
              ]
            },
            {
              id: "14M-B-q2",
              stem: "Heart rate remains 50 after 30 seconds of bag-mask ventilation. What next?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Start chest compressions (3:1 ratio with ventilations) and consider intubation", correct: true, explanation: "HR <60 after 30 seconds effective ventilation = compressions. 3 compressions:1 ventilation. Intubate if bag-mask ineffective." },
                { id: "b", text: "Continue bag-mask only", correct: false, explanation: "HR <60 indicates cardiac compromise. Compressions required alongside ventilation." },
                { id: "c", text: "Give adrenaline immediately", correct: false, explanation: "Adrenaline is given if HR <60 after 60 seconds of compressions and ventilation." },
                { id: "d", text: "Stop resuscitation", correct: false, explanation: "HR 50 is not asystole. Continue resuscitation with compressions and ventilation." }
              ]
            },
            {
              id: "14M-B-q3",
              stem: "What oxygen concentration should be used for term babies?",
              timeLimit: 45,
              options: [
                { id: "a", text: "21% (room air) initially, titrate up if HR not improving", correct: true, explanation: "NRP 2021: Start with 21% for term babies. Preterm <32 weeks: 21-30%. Titrate based on SpO2 and heart rate response." },
                { id: "b", text: "100% oxygen for all babies", correct: false, explanation: "100% oxygen is not recommended initially. Hyperoxia causes oxidative stress. Titrate from 21%." },
                { id: "c", text: "50% oxygen", correct: false, explanation: "50% is not the starting point. Start with 21% and titrate based on response." },
                { id: "d", text: "No oxygen needed", correct: false, explanation: "Some babies need oxygen supplementation. Start with 21% and assess response." }
              ]
            }
          ]
        },
        {
          id: "14M-C",
          title: "Meconium-Stained Liquor",
          mechanics: "mcq",
          objective: "Manage the non-vigorous baby born through meconium",
          scenario: "Thick meconium-stained liquor at birth. Baby born floppy, not crying, HR 90, poor tone.",
          questions: [
            {
              id: "14M-C-q1",
              stem: "What is the management for a non-vigorous baby with meconium-stained liquor?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Dry, position, suction mouth then nose under direct vision if needed, start ventilation if apnoeic", correct: true, explanation: "NRP 2021: No longer routine intubation and suction for meconium. Dry, stimulate, suction if airway obstructed, then standard resuscitation." },
                { id: "b", text: "Immediate intubation and tracheal suction before any other steps", correct: false, explanation: "Routine tracheal suction is no longer recommended. It delays ventilation and does not improve outcomes." },
                { id: "c", text: "No suction needed - just dry and stimulate", correct: false, explanation: "Suction may be needed if airway is obstructed by meconium. Assess and clear if needed." },
                { id: "d", text: "Give antibiotics immediately", correct: false, explanation: "Antibiotics are not part of immediate resuscitation. Consider if meconium aspiration syndrome develops later." }
              ]
            },
            {
              id: "14M-C-q2",
              stem: "What is the definition of a 'vigorous' baby?",
              timeLimit: 45,
              options: [
                { id: "a", text: "Strong respiratory effort, good muscle tone, HR >100", correct: true, explanation: "Vigorous: strong cry/breathing, good tone, HR >100. Non-vigorous: weak/absent breathing, poor tone, HR <100." },
                                { id: "b", text: "Any baby who cries at birth", correct: false, explanation: "Crying alone does not define vigour. Tone and heart rate are also assessed." },
                { id: "c", text: "Baby with Apgar 10", correct: false, explanation: "Apgar is assessed at 1 and 5 minutes. Vigour is assessed immediately at birth for resuscitation decisions." },
                { id: "d", text: "Term baby only", correct: false, explanation: "Vigour applies to all gestations. Preterm babies can be vigorous; term babies can be non-vigorous." }
              ]
            }
          ]
        }
      ]
    }
  }
];