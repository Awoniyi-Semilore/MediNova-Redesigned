// src/components/simulation/SimulationOpening.jsx

import { useState, useEffect, useRef } from 'react'
import styles from '../../styles/simulation.module.css'

const SLIDE_DURATIONS = [4000, 5000, 3000]

export default function SimulationOpening({
  cls, sim, subsim, variant, accentColor, theme, track, onComplete
}) {
  const [slide,       setSlide]       = useState(0)
  const [showVitals,  setShowVitals]  = useState(false)
  const [showCta,     setShowCta]     = useState(false)
  const [fadeOut,     setFadeOut]     = useState(false)
  const ambienceRef = useRef(null)
  const voiceRef    = useRef(null)

  const subsimId   = subsim?.id || sim?.id || ''
  const imageEntry = cls?.media?.images?.[subsimId] || {}
  const imgA       = imageEntry.scenario  || null
  const imgB       = imageEntry.reference || imageEntry.scenario || null
  const ambience   = cls?.media?.ambience || '/audio/hospital_background.mp3'
  const voiceFile  = cls?.media?.audio?.[subsimId] || null
  const vitals     = variant?.vitals || null

  useEffect(() => {
    // ── Start BOTH audio tracks immediately on mount ──
    if (ambienceRef.current) {
      ambienceRef.current.volume = 0.22
      ambienceRef.current.play().catch(() => {})
    }
    // Voice starts at the same time as ambience — no delay
    if (voiceRef.current) {
      voiceRef.current.volume = 0.88
      voiceRef.current.play().catch(() => {})
    }

    const t1 = setTimeout(() => { setSlide(1); setShowVitals(true) },  SLIDE_DURATIONS[0])
    const t2 = setTimeout(() => { setSlide(2); setShowCta(true) },     SLIDE_DURATIONS[0] + SLIDE_DURATIONS[1])

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  function handleSkip() {
    setFadeOut(true)
    if (ambienceRef.current) ambienceRef.current.pause()
    if (voiceRef.current)    voiceRef.current.pause()
    setTimeout(onComplete, 400)
  }

  const currentImg = slide === 0 ? imgA : imgB

  return (
    <div
      className={`${styles.opening} ${fadeOut ? styles.openingFadeOut : ''}`}
      onClick={showCta ? handleSkip : undefined}
    >
      <audio ref={ambienceRef} src={ambience} loop preload="auto" />
      {voiceFile && <audio ref={voiceRef} src={voiceFile} preload="auto" />}

      <div
        className={`${styles.openingBg} ${slide > 0 ? styles.openingBgB : styles.openingBgA}`}
        style={{
          backgroundImage:   currentImg ? `url(${currentImg})` : 'none',
          backgroundColor:   accentColor,
        }}
      />

      <div
        className={styles.openingOverlay}
        style={{
          background: `linear-gradient(to bottom, ${accentColor}55 0%, rgba(5,10,18,0.9) 100%)`
        }}
      />

      <div className={styles.openingContent}>
        <div className={styles.openingTop}>
          <div className={styles.openingEyebrow} style={{ color: accentColor }}>
            <span className={styles.openingDot} style={{ background: accentColor }} />
            {cls?.level?.replace(/_/g, ' ').toUpperCase()} · CLASS {cls?.num}
          </div>
          <div className={styles.openingTrack}>
            {track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
            {sim ? ` · ${sim.title}` : ''}
          </div>
        </div>

        <div className={styles.openingCentre}>
          {subsim && (
            <>
              <div className={styles.openingSubsimTitle}>{subsim.title}</div>
              <div className={styles.openingScenario}>{subsim.scenario}</div>
            </>
          )}
        </div>

        {showVitals && vitals && (
          <div className={`${styles.openingVitals} ${styles.openingVitalsIn}`}>
            {[
              { label: 'HR',   value: vitals.hr,           unit: 'bpm', warn: vitals.hr   > 100 || vitals.hr   < 60 },
              { label: 'BP',   value: vitals.bp,           unit: '',    warn: false                                   },
              { label: 'SpO₂', value: `${vitals.spo2}%`,  unit: '',    warn: vitals.spo2 < 94                        },
              { label: 'RR',   value: vitals.rr,           unit: '/min',warn: vitals.rr   > 20 || vitals.rr   < 12  },
              { label: 'Temp', value: `${vitals.temp}°C`, unit: '',    warn: vitals.temp > 38 || vitals.temp < 36  },
              { label: 'GCS',  value: vitals.gcs,          unit: '/15', warn: vitals.gcs  < 15                       },
            ]
              .filter(v => v.value !== undefined && v.value !== 'undefined%')
              .map((v, i) => (
                <div key={v.label} className={styles.openingVital} style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className={styles.openingVitalVal} style={{ color: v.warn ? '#ff6b6b' : '#fff' }}>
                    {v.value}<span className={styles.openingVitalUnit}>{v.unit}</span>
                  </div>
                  <div className={styles.openingVitalLabel}>{v.label}</div>
                </div>
              ))
            }
          </div>
        )}

        <div className={styles.openingBottom}>
          {showCta ? (
            <div className={styles.openingCta}>
              <span className={styles.openingCtaText}>TAP ANYWHERE TO BEGIN</span>
              <div className={styles.openingCtaPulse} style={{ borderColor: accentColor }} />
            </div>
          ) : (
            <button className={styles.openingSkip} onClick={handleSkip}>
              Skip intro →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}