// src/components/simulation/designs/SimDesign1Clerkship.jsx
// Design: The Patient Chart — cream paper with ECG texture
// Used for: Clerkship (Classes 01–04)

import { useState, useEffect, useRef } from 'react'
import styles from '../../../styles/simdesign1.module.css'

const TABS = ['Presenting Complaint', 'Past History', 'Medications', 'Examination']
const MECHANICS_LABEL = {
  mcq: 'MCQ', drag: 'Drag & Drop', hotspot: 'Hotspot', audio_mcq: 'Audio + MCQ',
}

export default function SimDesign1Clerkship({
  cls, sim, subsim, variant, accentColor, theme, track, onAnswer, onSimComplete
}) {
  const questions = subsim?.questions || []
  const [qIndex,          setQIndex]          = useState(0)
  const [selected,        setSelected]        = useState(null)
  const [revealed,        setRevealed]        = useState(false)
  const [timeLeft,        setTimeLeft]        = useState(questions[0]?.timeLimit || 30)
  const [timerPaused,     setTimerPaused]     = useState(false)
  const [allAnswers,      setAllAnswers]       = useState([])
  const [activeTab,       setActiveTab]       = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [audioPlaying,    setAudioPlaying]    = useState(false)
  const [showBanner,      setShowBanner]      = useState(false)
  const [showIndicator,   setShowIndicator]   = useState(false)

  const audioRef     = useRef(null)
  const timerRef     = useRef(null)
  const startTimeRef = useRef(Date.now())

  const q        = questions[qIndex]
  const vitals   = variant?.vitals
  const subsimId = subsim?.id || ''
  const audioSrc = cls?.media?.audio?.[subsimId] || subsim?.audio || null
  const hasAudio = !!(audioSrc || sim?.mechanics === 'audio_mcq' || subsim?.mechanics === 'audio_mcq')

  // Show audio banner on first render if audio exists
  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true)
      setShowIndicator(true)
      setTimeout(() => setShowBanner(false), 4000)
    }
  }, [])

  // Shuffle options and reset on question change
  useEffect(() => {
    if (!q?.options) return
    setShuffledOptions([...q.options].sort(() => Math.random() - 0.5))
    setSelected(null)
    setRevealed(false)
    setTimerPaused(false)
    setTimeLeft(q.timeLimit || 30)
    startTimeRef.current = Date.now()
  }, [qIndex, subsim])

  // ── TIMER — pauses when audio is playing ──────────────────────────────────
  useEffect(() => {
    if (revealed || timerPaused) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleReveal(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [qIndex, revealed, timerPaused])

  // Pause / resume timer when audio play state changes
  useEffect(() => {
    if (audioPlaying) {
      clearInterval(timerRef.current)
      setTimerPaused(true)
    } else {
      setTimerPaused(false)
    }
  }, [audioPlaying])

  function handleSelect(opt) {
    if (revealed) return
    setSelected(opt.id)
    clearInterval(timerRef.current)
    handleReveal(opt)
  }

  function handleReveal(opt) {
    setRevealed(true)
    const timeMs = Date.now() - startTimeRef.current
    const answer = {
      questionId: q.id,
      selectedId: opt?.id || null,
      correct:    opt?.correct || false,
      timeMs,
    }
    onAnswer(answer)
    setAllAnswers(prev => [...prev, answer])
  }

  function handleNext() {
    if (qIndex < questions.length - 1) setQIndex(i => i + 1)
    else onSimComplete([...allAnswers])
  }

  const timerPct   = (timeLeft / (q?.timeLimit || 30)) * 100
  const timerColor = timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : accentColor

  if (!q) return null

  return (
    <div className={styles.page}>

      {/* ── AUDIO BANNER ── */}
      {showBanner && (
        <div className={styles.audioBanner}>
          <span className={styles.audioBannerIcon}>🔊</span>
          <span className={styles.audioBannerText}>Audio playing — turn up your volume</span>
        </div>
      )}

      {/* ── AUDIO INDICATOR (persistent) ── */}
      {showIndicator && (
        <div className={styles.audioIndicator}>
          <div className={styles.audioIndicatorDot} style={{ background: audioPlaying ? '#4caf50' : '#90a4ae' }} />
          <span className={styles.audioIndicatorText}>{audioPlaying ? 'Playing…' : 'Audio'}</span>
        </div>
      )}

      {/* ── TABS ── */}
      <div className={styles.tabs} style={{ borderBottomColor: accentColor }}>
        {TABS.map((t, i) => (
          <div
            key={t}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            style={activeTab === i ? { color: accentColor } : {}}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </div>
        ))}
        <div className={styles.tabMechanics}>{MECHANICS_LABEL[sim?.mechanics] || 'MCQ'}</div>
      </div>

      {/* ── CHART HEADER ── */}
      <div className={styles.chartHead}>
        <div>
          <div className={styles.patientName} style={{ color: '#2c1810' }}>
            {variant?.patientAge
              ? `${variant.patientAge}${variant.patientGender === 'female' ? 'F' : 'M'} · Active Patient`
              : 'Active Patient'}
          </div>
          <div className={styles.patientMeta}>
            {cls.title} · {track === 'doctor' ? 'Physician Track' : 'Nurse Track'} · {subsim?.title}
          </div>
        </div>
        <div className={styles.chartInfo}>
          <div className={styles.chartNum} style={{ color: accentColor }}>
            Chart #{String(cls.id).padStart(2, '0')}-{sim?.id}
          </div>
          <div className={styles.chartDate}>
            Q{qIndex + 1} of {questions.length} · {sim?.estimatedMinutes || 12} min est.
          </div>
        </div>
      </div>

      {/* ── VITALS STRIP ── */}
      {vitals && (
        <div className={styles.vitalsStrip}>
          {[
            { l: 'HR',    v: vitals.hr,          w: vitals.hr   > 100 || vitals.hr < 60 },
            { l: 'BP',    v: vitals.bp,          w: false                                },
            { l: 'SpO₂',  v: `${vitals.spo2}%`, w: vitals.spo2 < 94                    },
            { l: 'RR',    v: vitals.rr,          w: vitals.rr   > 20                    },
            { l: 'Temp',  v: `${vitals.temp}°C`, w: vitals.temp > 38                    },
          ].filter(x => x.v !== undefined).map(x => (
            <div key={x.l} className={styles.vitalCell}>
              <div className={styles.vitalVal} style={{ color: x.w ? accentColor : '#2c1810' }}>{x.v}</div>
              <div className={styles.vitalLabel}>{x.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── BODY ── */}
      <div className={styles.body}>

        <div className={styles.sectionLabel} style={{ color: accentColor }}>Clinician's Note</div>
        <div className={styles.note} style={{ borderLeftColor: accentColor }}>
          "{subsim?.scenario}"
        </div>

        {/* ── AUDIO PLAYER ── */}
        {hasAudio && (
          <div className={styles.audioPlayer}>
            <div className={styles.audioLabel}>
              {subsim?.audioInstruction || 'Listen to the audio clip before answering.'}
            </div>
            <audio
              ref={audioRef}
              src={audioSrc}
              onPlay={() => setAudioPlaying(true)}
              onPause={() => setAudioPlaying(false)}
              onEnded={() => setAudioPlaying(false)}
            />
            <button
              className={styles.audioBtn}
              style={{ borderColor: accentColor, color: accentColor }}
              onClick={() => {
                if (audioPlaying) {
                  audioRef.current?.pause()
                } else {
                  audioRef.current?.play()
                }
              }}
            >
              {audioPlaying ? '■ Pause' : '▶ Play Audio'}
            </button>
            {/* Timer paused notice */}
            {audioPlaying && (
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.5rem',
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                animation: 'blink 1.2s infinite',
              }}>
                ⏸ Timer paused
              </span>
            )}
          </div>
        )}

        <div className={styles.sectionLabel} style={{ color: accentColor }}>Clinical Decision Required</div>
        <div className={styles.question}>{q.stem}</div>

        {/* ── OPTIONS ── */}
        <div className={styles.options}>
          {shuffledOptions.map((opt, i) => {
            const isSelected = selected === opt.id
            let optStyle = {}
            if (revealed) {
              if (opt.correct)                      optStyle = { borderColor: '#2e7d32', background: 'rgba(46,125,50,0.06)' }
              else if (isSelected && !opt.correct)  optStyle = { borderColor: accentColor, background: `${accentColor}0d` }
              else                                  optStyle = { opacity: 0.5 }
            } else if (isSelected) {
              optStyle = { borderColor: accentColor, background: `${accentColor}11` }
            }
            return (
              <div key={opt.id} className={styles.option} style={optStyle} onClick={() => handleSelect(opt)}>
                <div className={styles.optionKey} style={isSelected ? { color: accentColor } : {}}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className={styles.optionText}>{opt.text}</div>
                {revealed && opt.correct            && <div className={styles.optionTick}>✓</div>}
                {revealed && isSelected && !opt.correct && (
                  <div className={styles.optionCross} style={{ color: accentColor }}>✗</div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── EXPLANATION ── */}
        {revealed && selected && (() => {
          const selOpt = shuffledOptions.find(o => o.id === selected)
          return (
            <div className={styles.explanation} style={{
              borderLeftColor: selOpt?.correct ? '#2e7d32' : accentColor,
              background:      selOpt?.correct ? 'rgba(46,125,50,0.06)' : `${accentColor}0d`,
            }}>
              <div className={styles.explanationLabel} style={{ color: selOpt?.correct ? '#2e7d32' : accentColor }}>
                {selOpt?.correct ? '✓ Correct' : '✗ Incorrect'}
              </div>
              <div className={styles.explanationText}>{selOpt?.explanation}</div>
            </div>
          )
        })()}

        {revealed && (
          <button className={styles.nextBtn} style={{ background: accentColor }} onClick={handleNext}>
            {qIndex < questions.length - 1 ? 'Next Question →' : 'Complete Simulation →'}
          </button>
        )}
      </div>

      {/* ── FOOTER TIMER ── */}
      <div className={styles.footer}>
        <span className={styles.footerTimerLabel}>
          {timerPaused ? 'Paused' : 'Time'}
        </span>
        <div className={styles.footerBar}>
          <div
            className={styles.footerBarFill}
            style={{
              width:      `${timerPct}%`,
              background: timerPaused ? '#90a4ae' : timerColor,
              transition: 'width 1s linear, background 0.3s',
            }}
          />
        </div>
        <span className={styles.footerTimerVal} style={{ color: timerPaused ? '#90a4ae' : timerColor }}>
          {revealed ? '—' : timerPaused ? '⏸' : `0:${String(timeLeft).padStart(2, '0')}`}
        </span>
        <span className={styles.footerQCount}>Q{qIndex + 1}/{questions.length}</span>
      </div>
    </div>
  )
}