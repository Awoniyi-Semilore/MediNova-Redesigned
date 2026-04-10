// src/components/simulation/SimulationPage.jsx
import { useState, useEffect, useMemo, useCallback } from 'react'
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

const Icons = {
  CheckCircle: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  XCircle: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  ChevronDown: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronUp: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  Trophy: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  Clock: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Target: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  ArrowRight: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  RotateCcw: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
    </svg>
  ),
  Home: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  FileText: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  Download: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Loader: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  )
}

export { Icons }

export default function SimulationPage() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const { track, classStatus, recordSimResult, unlockNextClass, classAttempts, classScore, results } = useProgress()

  const cls = useMemo(() => {
    return CURRICULUM.find(c => c.id === Number(classId))
  }, [classId])

  const accentColor = useMemo(
    () => cls ? getSimColor(cls.level, cls.id) : '#1565c0',
    [cls?.id, cls?.level]
  )
  const theme = useMemo(
    () => cls ? getLevelTheme(cls.level) : getLevelTheme('clerkship'),
    [cls?.level]
  )

  const [phase, setPhase] = useState('opening')
  const [currentSimIndex, setCurrentSimIndex] = useState(0)
  const [currentSubsimIndex, setCurrentSubsimIndex] = useState(0)
  const [allAnswers, setAllAnswers] = useState([])
  const [currentSimAnswers, setCurrentSimAnswers] = useState([])
  const [simScore, setSimScore] = useState(null)
  const [activeVariant, setActiveVariant] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [attemptKey, setAttemptKey] = useState(() => generateAttemptKey(cls?.id, 0))

  const trackData = useMemo(() => {
    if (!cls) return null
    return cls[track] || cls.doctor
  }, [cls, track])

  const sims = useMemo(() => trackData?.sims || [], [trackData])
  const currentSim = useMemo(() => sims[currentSimIndex] || null, [sims, currentSimIndex])

  const currentSubsim = useMemo(() => {
    if (!currentSim) return null
    if (currentSim.subsims?.length > 0) {
      return currentSim.subsims[currentSubsimIndex] || null
    }
    if (currentSim.questions?.length > 0) return currentSim
    return null
  }, [currentSim, currentSubsimIndex])

  useEffect(() => {
    setAttemptKey(generateAttemptKey(cls?.id, currentSimIndex, currentSubsimIndex))
  }, [cls?.id, currentSimIndex, currentSubsimIndex])

  useEffect(() => {
    if (!currentSubsim) {
      setActiveVariant(null)
      return
    }
    if (currentSubsim.variants?.length) {
      setActiveVariant(currentSubsim.variants[Math.floor(Math.random() * currentSubsim.variants.length)])
    } else if (currentSim?.variants?.length) {
      setActiveVariant(currentSim.variants[Math.floor(Math.random() * currentSim.variants.length)])
    } else {
      setActiveVariant(null)
    }
  }, [currentSubsim, currentSim])

  if (!cls) return <div style={{ padding: '4rem', textAlign: 'center' }}>Class not found.</div>

  const status = useMemo(() => classStatus(cls.id), [cls, classStatus, results])

  if (status === 'locked') {
    navigate(`/ward-map`)
    return null
  }

  const DesignComponent = DESIGN_MAP[cls.level] || SimDesign1Clerkship

  function handleOpeningComplete() { 
    setPhase('question') 
  }

  const handleAnswer = useCallback((answer) => {
    setCurrentSimAnswers(prev => [...prev, answer])
    setAllAnswers(prev => [...prev, answer])
  }, [])

  function handleSimComplete() {
    const total = currentSimAnswers.length
    const correct = currentSimAnswers.filter(a => a.correct).length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    setSimScore(score)
    setPhase('sim_debrief')
  }

  const handleRetry = useCallback(() => {
    setCurrentSimAnswers([])
    setAttemptKey(generateAttemptKey(cls?.id, currentSimIndex, currentSubsimIndex, Date.now()))
    setPhase('opening')
  }, [cls?.id, currentSimIndex, currentSubsimIndex])

  async function handleSimDebriefContinue() {
    const hasSubsims = currentSim?.subsims?.length > 0
    const moreSubsims = hasSubsims && currentSubsimIndex < (currentSim.subsims.length - 1)
    const moreSims = currentSimIndex < sims.length - 1

    if (moreSubsims) {
      setCurrentSubsimIndex(s => s + 1)
      setCurrentSimAnswers([])
      setPhase('opening')
    } else if (moreSims) {
      setCurrentSimIndex(s => s + 1)
      setCurrentSubsimIndex(0)
      setCurrentSimAnswers([])
      setPhase('opening')
    } else {
      if (isSaving) return
      setIsSaving(true)
      setError(null)
      
      const total = allAnswers.length
      const correct = allAnswers.filter(a => a.correct).length
      const finalScore = total > 0 ? Math.round((correct / total) * 100) : 0
      
      // Save to localStorage as backup
      const progressBackup = {
        classId: cls.id,
        score: finalScore,
        answers: allAnswers,
        track: track,
        level: cls.level,
        completedAt: new Date().toISOString(),
        synced: false
      }
      localStorage.setItem(`medinova_progress_${cls.id}`, JSON.stringify(progressBackup))
      
      try {
        await recordSimResult({
          classId: cls.id,
          score: finalScore,
          answers: allAnswers,
          track: track,
          level: cls.level,
          completedAt: new Date().toISOString()
        })
        
        progressBackup.synced = true
        localStorage.setItem(`medinova_progress_${cls.id}`, JSON.stringify(progressBackup))
        
        await unlockNextClass(cls.id)
        
        setSaveSuccess(true)
        setPhase('class_debrief')
      } catch (err) {
        console.error('Save failed:', err)
        setError("Failed to save results to cloud. Progress saved locally.")
        setPhase('class_debrief')
      } finally {
        setIsSaving(false)
      }
    }
  }

  const handleClassDebriefDone = useCallback(async () => {
    const pendingSave = localStorage.getItem(`medinova_progress_${cls.id}`)
    if (pendingSave) {
      const parsed = JSON.parse(pendingSave)
      if (!parsed.synced) {
        try {
          await recordSimResult(parsed)
          localStorage.setItem(`medinova_progress_${cls.id}`, JSON.stringify({...parsed, synced: true}))
        } catch (e) {
          console.log('Background sync failed')
        }
      }
    }
    navigate('/ward-map')
  }, [cls?.id, navigate, recordSimResult])

  if (error && phase !== 'class_debrief') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        background: '#0d2d5e',
        color: '#fff'
      }}>
        <div style={{ fontSize: '1.5rem' }}>⚠️ Error</div>
        <div>{error}</div>
        <button 
          onClick={() => setError(null)}
          style={{ padding: '0.75rem 1.5rem', background: accentColor, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (phase === 'question' && (!currentSim || !currentSubsim)) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme?.bg || '#f4f7fc',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Loading simulation...</div>
          <button 
            onClick={() => navigate('/ward-map')}
            style={{ padding: '0.75rem 1.5rem', background: accentColor, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Return to Map
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {phase === 'opening' && (
        <SimulationOpening
          cls={cls} 
          sim={currentSim} 
          subsim={currentSubsim}
          variant={activeVariant} 
          accentColor={accentColor}
          theme={theme} 
          track={track} 
          onComplete={handleOpeningComplete}
        />
      )}

      {phase === 'question' && currentSim && currentSubsim && (
        <DesignComponent
          cls={cls} 
          sim={currentSim} 
          subsim={currentSubsim}
          variant={activeVariant} 
          accentColor={accentColor}
          theme={theme} 
          track={track}
          attemptKey={attemptKey}
          onAnswer={handleAnswer}
          onSimComplete={handleSimComplete}
        />
      )}

      {phase === 'sim_debrief' && (
        <SimulationDebrief
          cls={cls} 
          sim={currentSim} 
          subsim={currentSubsim}
          answers={currentSimAnswers}
          score={simScore} 
          accentColor={accentColor}
          theme={theme} 
          level={cls.level} 
          onContinue={handleSimDebriefContinue}
          onRetry={handleRetry}
          isSaving={isSaving}
          icons={Icons}
        />
      )}

      {phase === 'class_debrief' && (
        <ClassDebrief
          cls={cls}
          answers={allAnswers}
          track={track} 
          accentColor={accentColor}
          onDone={handleClassDebriefDone}
          error={error}
          saveSuccess={saveSuccess}
          icons={Icons}
        />
      )}
    </>
  )
}

function generateAttemptKey(classId, simIndex, subsimIndex = 0, timestamp = null) {
  const base = `${classId}_${simIndex}_${subsimIndex}`
  return timestamp ? `${base}_t${timestamp}` : `${base}_v${Date.now()}`
}
