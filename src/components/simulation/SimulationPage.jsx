import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM } from '../../data/curriculum'
import { getSimColor, getLevelTheme } from './useSimColor'

import SimDesign1Clerkship  from './designs/SimDesign1Clerkship'
import SimDesign2JuniorRes  from './designs/SimDesign2JuniorRes'
import SimDesign3SeniorRes  from './designs/SimDesign3SeniorRes'
import SimDesign4Fellowship from './designs/SimDesign4Fellowship'
import SimDesign5Board      from './designs/SimDesign5Board'

import SimulationOpening from './SimulationOpening'
import { SimulationDebrief, ClassDebrief } from './SimDebrief'

const DESIGN_MAP = {
  clerkship:           SimDesign1Clerkship,
  junior_residency:    SimDesign2JuniorRes,
  senior_residency:    SimDesign3SeniorRes,
  fellowship:          SimDesign4Fellowship,
  board_certification: SimDesign5Board,
}

export default function SimulationPage() {
  const { classId } = useParams()
  const navigate    = useNavigate()
  const { track, classStatus, recordSimResult } = useProgress()

  const cls = useMemo(
    () => CURRICULUM.find(c => c.id === Number(classId)),
    [classId]
  )

  const accentColor = useMemo(
    () => cls ? getSimColor(cls.level, cls.id) : '#1565c0',
    [cls?.id, cls?.level]
  )
  const theme = useMemo(
    () => cls ? getLevelTheme(cls.level) : getLevelTheme('clerkship'),
    [cls?.level]
  )

  const [phase,              setPhase]               = useState('opening')
  const [currentSimIndex,    setCurrentSimIndex]     = useState(0)
  const [currentSubsimIndex, setCurrentSubsimIndex]  = useState(0)
  
  // STATS MANAGEMENT
  const [allAnswers,         setAllAnswers]          = useState([]) // For Class Debrief (Total)
  const [currentSimAnswers,  setCurrentSimAnswers]   = useState([]) // For Sim Debrief (Current)
  const [simScore,           setSimScore]            = useState(null)
  
  const [activeVariant,      setActiveVariant]       = useState(null)
  const [isSaving,           setIsSaving]            = useState(false) 
  const startTime = useRef(Date.now())

  // Logic to pick variants
  useEffect(() => {
    if (!cls) return
    const td     = cls[track] || cls.doctor
    const sims   = td?.sims || []
    const sim    = sims[currentSimIndex]
    const subsim = sim?.subsims?.[currentSubsimIndex]
    if (subsim?.variants?.length) {
      setActiveVariant(subsim.variants[Math.floor(Math.random() * subsim.variants.length)])
    } else {
      setActiveVariant(null)
    }
  }, [currentSimIndex, currentSubsimIndex, cls, track])

  if (!cls) return <div style={{ padding: '4rem', textAlign: 'center' }}>Class not found.</div>

  // Safety check for locked content
  const status = classStatus(cls.id)
  if (status === 'locked') {
    navigate(`/ward-map`) // Better to go back to map than class info
    return null
  }

  const trackData     = cls[track] || cls.doctor
  const sims          = trackData?.sims || []
  const currentSim    = sims[currentSimIndex]
  const currentSubsim = currentSim?.subsims?.[currentSubsimIndex]
  const Design        = DESIGN_MAP[cls.level] || SimDesign1Clerkship

  function handleOpeningComplete() { 
    setPhase('question') 
  }

  function handleAnswer(answer) {
    setCurrentSimAnswers(prev => [...prev, answer])
    setAllAnswers(prev => [...prev, answer])
  }

  function handleSimComplete() {
    const total   = currentSimAnswers.length
    const correct = currentSimAnswers.filter(a => a.correct).length
    setSimScore(total > 0 ? Math.round((correct / total) * 100) : 0)
    setPhase('sim_debrief')
  }

  async function handleSimDebriefContinue() {
    const moreSubsims  = currentSubsimIndex < (currentSim?.subsims?.length || 1) - 1
    const moreSims     = currentSimIndex < sims.length - 1

    if (moreSubsims) {
      setCurrentSubsimIndex(s => s + 1)
      setCurrentSimAnswers([]) // Reset for next sub-sim
      setPhase('opening')
    } else if (moreSims) {
      setCurrentSimIndex(s => s + 1)
      setCurrentSubsimIndex(0)
      setCurrentSimAnswers([]) // Reset for next sim
      setPhase('opening')
    } else {
      // FINAL SAVING LOGIC
      if (isSaving) return
      setIsSaving(true)
      
      const total      = allAnswers.length
      const correct    = allAnswers.filter(a => a.correct).length
      const finalScore = total > 0 ? Math.round((correct / total) * 100) : 0
      
      try {
        await recordSimResult({
          classId:  cls.id,
          score:    finalScore,
          answers:  allAnswers, // Save EVERYTHING to Firebase
          track:    track,
          level:    cls.level,
          completedAt: new Date().toISOString()
        })
        setPhase('class_debrief')
      } catch (err) {
        console.error("Failed to save simulation:", err)
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <>
      {phase === 'opening' && (
        <SimulationOpening
          cls={cls} sim={currentSim} subsim={currentSubsim}
          variant={activeVariant} accentColor={accentColor}
          theme={theme} track={track} onComplete={handleOpeningComplete}
        />
      )}

      {phase === 'question' && (
        <Design
          cls={cls} sim={currentSim} subsim={currentSubsim}
          variant={activeVariant} accentColor={accentColor}
          theme={theme} track={track} onAnswer={handleAnswer}
          onSimComplete={handleSimComplete}
        />
      )}

      {phase === 'sim_debrief' && (
        <SimulationDebrief
          cls={cls} sim={currentSim} subsim={currentSubsim}
          answers={currentSimAnswers} // Pass ONLY current subsim answers
          score={simScore} accentColor={accentColor}
          theme={theme} level={cls.level} onContinue={handleSimDebriefContinue}
        />
      )}

      {phase === 'class_debrief' && (
        <ClassDebrief
          cls={cls}
          answers={allAnswers} // Pass ALL answers for the final report
          track={track} accentColor={accentColor}
          onDone={() => navigate('/ward-map')}
        />
      )}
    </>
  )
}