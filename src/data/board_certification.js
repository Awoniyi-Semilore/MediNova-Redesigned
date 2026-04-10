// board_certification.js - Classes 19-20: The Final Assessment
// Complex multi-system cases requiring synthesis of all prior learning
// No hints. No guidance. Just the patient and everything you know.

export const BOARD_CERTIFICATION = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // CLASS 19: ADVANCED CLINICAL REASONING
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 19,
    num: "19",
    level: "board_certification",
    title: "Advanced Clinical Reasoning",
    subtitle: "Multi-System Organ Failure & Complex Comorbidity",
    tagline: "The final exam part one. No hints. No help. Only your knowledge.",
    estimatedMinutes: { doctor: 90, nurse: 85 },
    passMark: 85,
    xpReward: 1000,
    certificateTitle: "Board Certified Clinician — Part I",
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
      ambience: "/audio/heart_sounds_normal.mp3",
      pdfs: { "complex_cases": "/pdfs/class19_complex.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "19D-A",
          title: "The Dying Patient - Ethics & Futility",
          mechanics: "mcq",
          objective: "Navigate end-of-life decisions and family conflict",
          scenario: `Patient with end-stage COPD, severe dementia, recurrent pneumonia. Multiple ICU admissions. 
          Family insists on "everything done." Patient never made advance directive. Third ICU admission this month. 
          Ventilator-dependent, not weaning. Multi-organ failure developing.`,
          questions: [
            {
              id: "19D-A-q1",
              stem: "Who has the final legal authority regarding CPR decisions in hospital?",
              timeLimit: 60,
              options: [
                { id: "a", text: "The Next of Kin", correct: false, explanation: "Next of kin can provide input but do not have legal authority to demand treatment."  },
                { id: "b", text: "The Consultant In Charge", correct: true, explanation: "Medical futility is a clinical decision. While consultation is vital, the senior physician decides when treatment is no longer beneficial." },
                { id: "c", text: "The Hospital CEO", correct: false, explanation: "Hospital administration does not make clinical decisions about individual patient care." },
                { id: "d", text: "The Court", correct: false, explanation: "Courts may get involved in extreme cases, but typically only after all clinical avenues are exhausted." }
              ]
            },
            {
              id: "19D-A-q2",
              stem: "What is the most appropriate next step?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Family meeting to discuss ceiling of care and transition to comfort-focused approach", correct: true, explanation: "Best interests framework: burdens of treatment now exceed benefits. Compassionate communication is key." },
                { id: "b", text: "Continue full active treatment indefinitely", correct: false, explanation: "Continuing aggressive treatment when it's no longer beneficial is not in the patient's best interests." },
                { id: "c", text: "Withdraw all treatment immediately without discussion", correct: false, explanation: "Withdrawing treatment without family discussion or ethical review is not appropriate." },
                { id: "d", text: "Transfer to another hospital", correct: false, explanation: "Transferring the patient does not address the underlying ethical and clinical issues." }
              ]
            },
            {
              id: "19D-A-q3",
              stem: "Which principle supports limiting treatment in this case?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Non-maleficence - treatment is causing harm without proportional benefit", correct: true, explanation: "Continued aggressive treatment may be futile and cause suffering." },
                { id: "b", text: "Autonomy - patient previously expressed wishes", correct: false, explanation: "Patient has not made an advance directive." },
                { id: "c", text: "Justice - resource allocation", correct: false, explanation: "While resource allocation is a consideration, it is not the primary principle in this case." },
                { id: "d", text: "Beneficence - all treatment is beneficial", correct: false, explanation: "Treatment that causes more harm than benefit does not align with beneficence." }
              ]
            }
          ]
        },
        {
          id: "19D-B",
          title: "Multi-System Failure - The Perfect Storm",
          mechanics: "mcq",
          objective: "Prioritize interventions in multi-organ dysfunction",
          scenario: `68-year-old septic from cholangitis. ARDS (PaO2/FiO2 120), AKI Stage 3 (Cr 450), 
          DIC (INR 3.5, Fibrinogen 0.6), Encephalopathy (GCS 10). BP 65/40 on noradrenaline 0.8 mcg/kg/min. 
          Bilirubin 280, lactate 8.5.`,
          questions: [
            {
              id: "19D-B-q1",
              stem: "What is the immediate priority?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Maximize vasopressors and add vasopressin to achieve MAP >65", correct: false, explanation: "While optimizing hemodynamics is important, source control is the priority in septic shock." },
                { id: "b", text: "Urgent ERCP for biliary drainage", correct: true, explanation: "Source control is critical in sepsis. Biliary sepsis requires drainage - antibiotics alone insufficient." },
                { id: "c", text: "Start renal replacement therapy", correct: false, explanation: "Renal replacement therapy may be needed, but source control is the priority." },
                { id: "d", text: "Platelet transfusion for DIC", correct: false, explanation: "Platelet transfusion may be indicated, but addressing the underlying cause is paramount." }
              ]
            },
            {
              id: "19D-B-q2",
              stem: "What ventilator strategy is appropriate for ARDS?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Low tidal volume (6ml/kg), high PEEP, prone positioning if severe", correct: true, explanation: "Lung-protective ventilation: TV 6ml/kg, plateau pressure <30, appropriate PEEP." },
                { id: "b", text: "High tidal volume (12ml/kg) to maximize minute ventilation", correct: false, explanation: "High tidal volumes cause ventilator-induced lung injury." },
                { id: "c", text: "Avoid PEEP to prevent barotrauma", correct: false, explanation: "PEEP is important for maintaining alveolar patency and preventing derecruitment." },
                { id: "d", text: "Immediate ECMO", correct: false, explanation: "ECMO is reserved for refractory cases where conventional ventilation is insufficient." }
              ]
            },
            {
              id: "19D-B-q3",
              stem: "What blood product strategy is correct in DIC with bleeding?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Give platelets if <10×10⁹/L (or <50 if procedure planned), FFP if PT>1.5×normal", correct: true, explanation: "Targeted replacement based on counts and coagulation studies, not formulaic." },
                { id: "b", text: "Transfuse platelets to >100 regardless", correct: false, explanation: "Platelet transfusion should be targeted based on clinical need and bleeding risk." },
                { id: "c", text: "FFP to completely normalize INR", correct: false, explanation: "FFP should be used judiciously based on clinical indication and coagulation status." },
                { id: "d", text: "Cryoprecipitate only if fibrinogen <0.5", correct: false, explanation: "Cryoprecipitate is indicated for severe fibrinogen deficiency, but other factors should also be considered." }
              ]
            }
          ]
        },
        {
          id: "19D-C",
          title: "Diagnostic Uncertainty - The Unknown",
          mechanics: "text_input",
          objective: "Develop differential and investigative strategy",
          scenario: `45-year-old with 6 months of fever, weight loss (15kg), night sweats. 
          Intermittent abdominal pain. Multiple negative cultures. CT shows retroperitoneal lymphadenopathy. 
          Autoimmune screen negative. TB negative. HIV negative. Blood cultures repeatedly negative.`,
          questions: [
            {
              id: "19D-C-q1",
              stem: "What is the most likely diagnosis category?",
              timeLimit: 90,
              options: [
                { id: "a", text: "Lymphoma (especially non-Hodgkin)", correct: true, explanation: "B symptoms + lymphadenopathy + negative infection workup = lymphoma until proven otherwise." },
                { id: "b", text: "TB (disseminated)", correct: false, explanation: "TB is a consideration, but multiple negative tests and lack of response to empiric treatment make it less likely." },
                { id: "c", text: "Autoimmune disease", correct: false, explanation: "Autoimmune disease is a consideration, but the clinical presentation is more consistent with lymphoma." },
                { id: "d", text: "Factitious disorder", correct: false, explanation: "Factitious disorder is unlikely given the objective findings and lack of psychological history." }
              ]
            },
            {
              id: "19D-C-q2",
              stem: "What is the definitive diagnostic test?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Excisional lymph node biopsy (not FNA)", correct: true, explanation: "FNA insufficient for lymphoma architecture. Need excisional biopsy for definitive diagnosis." },
                { id: "b", text: "Repeat blood cultures", correct: false, explanation: "Blood cultures have been repeatedly negative and are unlikely to yield a diagnosis at this point."   },
                { id: "c", text: "Bone marrow aspirate only", correct: false, explanation: "Bone marrow biopsy may be helpful but is not the first step in diagnosis." },
                { id: "d", text: "PET-CT alone", correct: false, explanation: "PET-CT is useful for staging but not definitive for diagnosis." }
              ]
            }
          ]
        },
        {
          id: "19D-D",
          title: "Drug Interactions & Prescribing",
          mechanics: "mcq",
          objective: "Identify and manage complex drug interactions",
          scenario: `Patient on warfarin (INR 2.5), amiodarone, simvastatin, omeprazole. 
          Prescribed clarithromycin for pneumonia. 5 days later: INR 6.8, myalgia, dark urine.`,
          questions: [
            {
              id: "19D-D-q1",
              stem: "What caused the INR rise?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Clarithromycin inhibits CYP3A4 and P-gp, reducing warfarin metabolism", correct: true, explanation: "Macrolides inhibit warfarin metabolism. Amiodarone also inhibits - double whammy effect." },
                { id: "b", text: "Omeprazole interaction", correct: false, explanation: "Omeprazole has minimal effect on warfarin metabolism and is unlikely to cause significant INR changes." },
                { id: "c", text: "Simvastatin effect", correct: false, explanation: "Simvastatin can increase the risk of myopathy when combined with certain drugs." },
                { id: "d", text: "Pneumonia itself", correct: false, explanation: "Pneumonia can cause systemic inflammation and affect coagulation, but is less likely to be the primary cause of such a significant INR rise." }
              ]
            },
            {
              id: "19D-D-q2",
              stem: "What is the likely cause of myalgia and dark urine?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Rhabdomyolysis from simvastatin-clarithromycin interaction", correct: true, explanation: "Clarithromycin inhibits simvastatin metabolism → increased risk myopathy/rhabdomyolysis." },
                { id: "b", text: "Warfarin skin necrosis", correct: false, explanation: "Warfarin skin necrosis is a rare but serious complication of warfarin therapy." },
                { id: "c", text: "Dehydration from pneumonia", correct: false, explanation: "Dehydration can contribute to coagulopathy but is less likely to cause such a significant INR rise." },
                { id: "d", text: "Amiodarone toxicity", correct: false, explanation: "Amiodarone toxicity can cause various complications but is not the primary concern here." }
              ]
            },
            {
              id: "19D-D-q3",
              stem: "What is the immediate management?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Stop warfarin, simvastatin, clarithromycin; check CK, renal function; consider vitamin K if bleeding", correct: true, explanation: "Stop offending drugs, investigate rhabdomyolysis, reverse anticoagulation if bleeding." },
                { id: "b", text: "Continue all medications", correct: false, explanation: "Continuing the interacting medications would likely worsen the patient's condition." },
                { id: "c", text: "Increase warfarin dose", correct: false, explanation: "Increasing the warfarin dose would further elevate the INR and increase bleeding risk." },
                { id: "d", text: "Start heparin", correct: false, explanation: "Heparin is not appropriate for managing warfarin-induced bleeding." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "19N-A",
          title: "End of Life Care",
          mechanics: "mcq",
          objective: "Recognize dying phase and implement comfort measures",
          scenario: "Patient with end-stage heart failure. Increasingly drowsy, reduced oral intake, mottled peripheries.",
          questions: [
            {
              id: "19N-A-q1",
              stem: "What medication is essential for comfort in dying patients?",
              timeLimit: 60,
              options: [
                { id: "a", text: "PRN opioids for pain/dyspnoea, anxiolytics for agitation, antiemetics", correct: true, explanation: "Anticipatory prescribing ensures symptoms are managed promptly without delay." },
                { id: "b", text: "Continue all chronic medications", correct: false, explanation: "Continuing chronic medications may not be appropriate in the final stages of life." },
                { id: "c", text: "Antibiotics for possible infection", correct: false, explanation: "Antibiotics are not always indicated in end-of-life care and may cause unnecessary burden." },
                { id: "d", text: "IV fluids to prevent dehydration", correct: false, explanation: "IV fluids are generally not recommended in the final stages of life as they may cause discomfort." }
              ]
            },
            {
              id: "19N-A-q2",
              stem: "What is a sign of imminent death (hours)?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Cheyne-Stokes breathing + inability to swallow + peripheral shutdown", correct: true, explanation: "These signs indicate death likely within hours - inform family, increase vigilance." },
                { id: "b", text: "Increased appetite", correct: false, explanation: "Increased appetite is not a sign of imminent death." },
                { id: "c", text: "Rising blood pressure", correct: false, explanation: "Rising blood pressure is not a sign of imminent death." },
                { id: "d", text: "Improved consciousness", correct: false, explanation: "Improved consciousness is not a sign of imminent death." }
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
    subtitle: "Consultant Level Practice & Clinical Synthesis",
    tagline: "Everything you've learned. All at once. This is your moment.",
    isFinal: true,
    estimatedMinutes: { doctor: 120, nurse: 110 },
    passMark: 90,
    xpReward: 2000,
    certificateTitle: "Master of MediNova Medicine",
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
      ambience: "/audio/monitor_alarm.mp3.mp3",
      pdfs: { "final_assessment": "/pdfs/class20_final.pdf" }
    },

    doctor: {
      sims: [
        {
          id: "20D-A",
          title: "The Synthesis - Complex Comorbidity",
          mechanics: "mcq",
          objective: "Integrate multiple specialties in one complex patient",
          scenario: `Pregnant patient at 32 weeks. Sepsis from pyelonephritis. 
          History of sickle cell disease (HbSS). Now with acute chest syndrome developing. 
          Suspected pulmonary embolism (dyspnoea out of proportion). 
          BP 85/50, HR 135, SpO2 88% on 15L, Temp 39.2°C. 
          Hb 52, WCC 28, Platelets 95. Bilirubin 85. Lactate 6.5.`,
          questions: [
            {
              id: "20D-A-q1",
              stem: "What is the PRIMARY consideration for fetal wellbeing?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Fetal heart monitoring", correct: false, explanation: "Fetal monitoring is important but maternal stability is the priority for fetal outcomes." },
                { id: "b", text: "Aggressive resuscitation of the mother", correct: true, explanation: "The best way to save the fetus is to stabilize the mother. Maternal physiology determines fetal outcomes." },
                { id: "c", text: "Emergency Caesarean section", correct: false, explanation: "Delivery may be necessary if maternal condition deteriorates, but initial focus should be on maternal resuscitation." },
                { id: "d", text: "Tocolysis to prevent preterm labour", correct: false, explanation: "Tocolysis is not appropriate in the context of maternal sepsis and instability." }
              ]
            },
            {
              id: "20D-A-q2",
              stem: "What is the priority intervention?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Exchange transfusion for ACS + broad antibiotics + ICU admission", correct: true, explanation: "ACS in sickle cell is life-threatening. Exchange transfusion reduces HbS, improves oxygenation." },
                { id: "b", text: "Therapeutic anticoagulation for PE first", correct: false, explanation: "Therapeutic anticoagulation is not the priority in this scenario." },
                { id: "c", text: "Delivery of baby", correct: false, explanation: "Delivery may be necessary if maternal condition deteriorates, but initial focus should be on maternal resuscitation." },
                { id: "d", text: "Simple transfusion only", correct: false, explanation: "Simple transfusion is not sufficient for managing ACS in sickle cell disease." }
              ]
            },
            {
              id: "20D-A-q3",
              stem: "What antibiotic regimen covers the likely pathogens?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Ceftriaxone + Azithromycin (atypical coverage) ± Vancomycin if MRSA risk", correct: true, explanation: "ACS often triggered by infection. Cover typical + atypical organisms." },
                { id: "b", text: "Metronidazole alone", correct: false, explanation: "Metronidazole is not effective against the likely pathogens in this scenario." },
                { id: "c", text: "Amoxicillin", correct: false, explanation: "Amoxicillin is not appropriate for treating the suspected infection in this scenario." },
                { id: "d", text: "Ciprofloxacin", correct: false, explanation: "Ciprofloxacin is not the preferred antibiotic for treating the suspected infection in this scenario." }
              ]
            },
            {
              id: "20D-A-q4",
              stem: "What is the transfusion target?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Hb 100, HbS <30%", correct: true, explanation: "Exchange transfusion target: Hb ~100 (not too high → viscosity), HbS <30%." },
                { id: "b", text: "Hb 70", correct: false, explanation: "Hb 70 is too low for a patient in this condition." },
                { id: "c", text: "Hb 150", correct: false, explanation: "Hb 150 is too high and could increase viscosity and risk of complications." },
                { id: "d", text: "Any HbS level acceptable", correct: false, explanation: "Specific HbS levels are important for effective exchange transfusion." }
              ]
            }
          ]
        },
        {
          id: "20D-B",
          title: "The Undifferentiated Collapse",
          mechanics: "mcq",
          objective: "Diagnostic reasoning with minimal information",
          scenario: `55-year-old found collapsed at home. Unknown downtime. 
          GCS 3. Pupils fixed dilated. Asystole on monitor. 
          Family arrived and are distraught. 
          History: Hypertension, diabetes, depression. 
          Empty medication bottles nearby (metformin, amlodipine, amitriptyline - all recently filled).`,
          questions: [
            {
              id: "20D-B-q1",
              stem: "What is the most likely cause of collapse?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Tricyclic antidepressant overdose (amitriptyline)", correct: true, explanation: "Amitriptyline overdose causes seizures, arrhythmias, anticholinergic effects, cardiac arrest." },
                { id: "b", text: "Hypoglycaemia from metformin", correct: false, explanation: "Hypoglycaemia is a possibility but less likely given the clinical presentation." },
                { id: "c", text: "Hypertensive emergency", correct: false, explanation: "Hypertensive emergency would present differently with elevated blood pressure." },
                { id: "d", text: "Stroke", correct: false, explanation: "Stroke would typically present with focal neurological deficits." }
              ]
            },
            {
              id: "20D-B-q2",
              stem: "What is the specific antidote?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Sodium bicarbonate (for sodium channel blockade)", correct: true, explanation: "TCA overdose: Sodium bicarbonate for wide QRS, hypotension, arrhythmias." },
                { id: "b", text: "Naloxone", correct: false, explanation: "Naloxone is used for opioid overdose." },
                { id: "c", text: "Flumazenil", correct: false, explanation: "Flumazenil is used for benzodiazepine overdose." },
                { id: "d", text: "Vitamin K", correct: false, explanation: "Vitamin K is used for warfarin overdose." }
              ]
            },
            {
              id: "20D-B-q3",
              stem: "What ECG finding indicates severe toxicity?",
              timeLimit: 60,
              options: [
                { id: "a", text: "QRS >100ms or terminal R wave in aVR", correct: true, explanation: "QRS >100ms predicts seizures, >160ms predicts ventricular arrhythmias." },
                { id: "b", text: "ST elevation", correct: false, explanation: "ST elevation is not typically associated with TCA overdose." },
                { id: "c", text: "Short PR interval", correct: false, explanation: "Short PR interval is not a typical finding in TCA overdose." },
                { id: "d", text: "Sinus bradycardia", correct: false, explanation: "Sinus bradycardia is not a typical finding in TCA overdose." }
              ]
            }
          ]
        },
        {
          id: "20D-C",
          title: "The Rare Diagnosis",
          mechanics: "text_input",
          objective: "Recognize atypical presentation of rare disease",
          scenario: `28-year-old with recurrent venous thrombosis (DVT x2, PE x1). 
          Miscarriage at 16 weeks (pre-eclampsia). 
          Now with livedo reticularis, thrombocytopenia, hemolytic anemia. 
          APS antibodies negative. ADAMTS13 pending.`,
          questions: [
            {
              id: "20D-C-q1",
              stem: "What is the most likely diagnosis?",
              timeLimit: 90,
              options: [
                { id: "a", text: "Antiphospholipid syndrome (despite negative initial tests - need repeat)", correct: false },
                { id: "b", text: "Thrombotic thrombocytopenic purpura (TTP)", correct: true, explanation: "Pentad: Thrombocytopenia, MAHA, neurologic symptoms, renal, fever. ADAMTS13 deficiency." },
                { id: "c", text: "Heparin-induced thrombocytopenia", correct: false, explanation: "HIT typically occurs after heparin exposure and presents with thrombocytopenia and thrombosis, but the clinical picture here is more consistent with TTP." },
                { id: "d", text: "Disseminated intravascular coagulation", correct: false, explanation: "DIC is a systemic disorder of coagulation, not the primary concern here." }
              ]
            },
            {
              id: "20D-C-q2",
              stem: "What is the emergency treatment?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Plasma exchange (daily until ADAMTS13 recovered)", correct: true, explanation: "TTP is hematologic emergency. Plasma exchange removes inhibitors, replaces ADAMTS13." },
                { id: "b", text: "Heparin infusion", correct: false, explanation: "Heparin is not appropriate for treating TTP and may worsen thrombocytopenia." },
                { id: "c", text: "Platelet transfusion", correct: false, explanation: "Platelet transfusion is not the primary treatment for TTP." },
                { id: "d", text: "Splenectomy", correct: false, explanation: "Splenectomy is not a standard treatment for TTP." }
              ]
            }
          ]
        },
        {
          id: "20D-D",
          title: "Leadership & Team Management",
          mechanics: "mcq",
          objective: "Direct team during crisis and manage resources",
          scenario: `Major incident declared. 15 casualties arriving. 
          You are the senior clinician. 2 junior doctors, 4 nurses, 1 anaesthetist. 
          Limited resources. First patient: Pregnant, 30 weeks, major trauma, unconscious. 
          Second patient: Child, severe asthma, arresting. 
          Third: Elderly, obviously deceased (head injury, signs incompatible with life).`,
          questions: [
            {
              id: "20D-D-q1",
              stem: "What is your first action?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Triage and allocate resources based on survivability and need", correct: true, explanation: "Major incident triage: Do most for most. Expectant category for unsalvageable." },
                { id: "b", text: "Work on the pregnant patient first (two lives)", correct: false, explanation: "While the pregnant patient is a priority, triage principles still apply. The child may have better chances of survival." },
                { id: "c", text: "Work on the child first (most emotive)", correct: false, explanation: "The child's condition is critical, but triage principles must be followed." },
                { id: "d", text: "Attempt resuscitation of the deceased patient", correct: false, explanation: "Resuscitation efforts should be focused on salvageable patients." }
              ]
            },
            {
              id: "20D-D-q2",
              stem: "How do you manage the obviously deceased patient?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Expectant category - do not use resources. Document and protect body.", correct: true, explanation: "In major incidents, resources are directed to salvageable patients." },
                { id: "b", text: "Attempt resuscitation anyway", correct: false, explanation: "Resuscitation efforts should be focused on salvageable patients." },
                { id: "c", text: "Ignore and focus on others", correct: false, explanation: "In major incidents, resources are directed to salvageable patients." },
                { id: "d", text: "Request more resources for this patient", correct: false, explanation: "In major incidents, resources are directed to salvageable patients." }
              ]
            },
            {
              id: "20D-D-q3",
              stem: "What communication is essential?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Clear, closed-loop communication with role allocation and regular updates", correct: true, explanation: "Crisis resource management: Clear roles, closed-loop communication, situational awareness." },
                { id: "b", text: "Work independently without communication", correct: false, explanation: "Effective communication is crucial during crises." },
                { id: "c", text: "Only communicate with family", correct: false, explanation: "Communication should be comprehensive and include all relevant stakeholders." },
                { id: "d", text: "Delegate all decisions to juniors", correct: false, explanation: "Senior staff should maintain oversight and make critical decisions." }
              ]
            }
          ]
        }
      ]
    },

    nurse: {
      sims: [
        {
          id: "20N-A",
          title: "Clinical Leadership",
          mechanics: "mcq",
          objective: "Delegate effectively and maintain safety during crisis",
          scenario: "Short-staffed shift. 6 high-dependency patients. 2 HCAs. You are the senior nurse.",
          questions: [
            {
              id: "20N-A-q1",
              stem: "What is your priority?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Rapid assessment of all patients, delegate tasks by acuity, escalate for help", correct: true, explanation: "Safety-first approach: Assess, prioritize, delegate, escalate." },
                { id: "b", text: "Focus on one patient only", correct: false, explanation: "A comprehensive approach is necessary to ensure all patients receive appropriate care." },
                { id: "c", text: "Do all tasks yourself", correct: false, explanation: "Effective delegation is crucial for managing high-dependency patient loads." },
                { id: "d", text: "Send patients home early", correct: false, explanation: "Discharge decisions should be made based on clinical criteria, not resource constraints." }
              ]
            },
            {
              id: "20N-A-q2",
              stem: "What should you delegate to HCAs?",
              timeLimit: 60,
              options: [
                { id: "a", text: "Vital signs, personal care, mobilization - NOT medication or complex assessments", correct: true, explanation: "Delegation within scope of practice maintains safety while optimizing resources." },
                { id: "b", text: "Medication administration", correct: false, explanation: "Medication administration is outside the scope of practice for HCAs." },
                { id: "c", text: "Discharge planning", correct: false, explanation: "Discharge planning requires clinical judgment and is typically the responsibility of registered nurses." },
                { id: "d", text: "Nothing - do everything yourself", correct: false, explanation: "Effective delegation is crucial for managing high-dependency patient loads." }
              ]
            }
          ]
        }
      ]
    }
  }
];