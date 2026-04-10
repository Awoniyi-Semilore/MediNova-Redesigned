// src/components/simulation/SimulationOpening.jsx

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from '../../styles/simulation.module.css'

const SLIDE_DURATIONS = [4000, 5000, 3000]

export default function SimulationOpening({
  cls, sim, subsim, variant, accentColor, theme, track, onComplete
}) {
  const [slide,       setSlide]       = useState(0)
  const [showVitals,  setShowVitals]  = useState(false)
  const [showCta,     setShowCta]     = useState(false)
  const [fadeOut,     setFadeOut]     = useState(false)
  const [showBanner,  setShowBanner]  = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioError,  setAudioError]  = useState(null)
  const [audioUnlocked, setAudioUnlocked] = useState(false)
  
  const ambienceRef = useRef(null)
  const voiceRef    = useRef(null)
  const containerRef = useRef(null)

  // Get images from curriculum media
  const getImages = () => {
    if (!cls?.media?.images) return { imgA: null, imgB: null }
    
    const images = cls.media.images
    const simId = sim?.id || ''
    const subsimId = subsim?.id || ''
    const classNum = cls?.num || '1'
    
    if (images[subsimId]) {
      return { imgA: images[subsimId], imgB: images[subsimId] }
    }
    
    if (images[simId]) {
      return { imgA: images[simId], imgB: images[simId] }
    }
    
    const num = classNum.toString()
    const possibleKeys = [
      `${num}A`, `${num}B`, `${num}C`,
      `${num}-A`, `${num}-B`, `${num}-C`,
      `class${num}`, `class_${num}`,
      'default', 'scenario', 'main'
    ]
    
    for (const key of possibleKeys) {
      if (images[key]) {
        return { imgA: images[key], imgB: images[key] }
      }
    }
    
    const imageValues = Object.values(images)
    if (imageValues.length > 0) {
      return { imgA: imageValues[0], imgB: imageValues[0] }
    }
    
    return { imgA: null, imgB: null }
  }

  const { imgA, imgB } = getImages()
  
  const getAudio = () => {
    if (!cls?.media) return null
    
    const subsimId = subsim?.id || ''
    const simId = sim?.id || ''
    
    if (cls.media.audio?.[subsimId]) return cls.media.audio[subsimId]
    if (cls.media.audio?.[simId]) return cls.media.audio[simId]
    if (subsim?.audio) return subsim.audio
    if (sim?.audio) return sim.audio
    
    return null
  }
  
  const voiceFile = getAudio()
  const ambience = cls?.media?.ambience || '/audio/hospital_background.mp3'
  const vitals = variant?.vitals || null
  const hasAudio = !!(voiceFile || ambience)

  // Show audio banner immediately if we have audio
  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true)
      setShowIndicator(true)
      const timer = setTimeout(() => setShowBanner(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [hasAudio])

  // FIX: Proper audio unlock with user interaction handling
  const unlockAudio = useCallback(async () => {
    console.log('Attempting to unlock audio...')
    setAudioUnlocked(true)
    
    let ambienceSuccess = false
    let voiceSuccess = false

    // Try to play ambience
    if (ambienceRef.current) {
      ambienceRef.current.volume = 0.22
      try {
        await ambienceRef.current.play()
        ambienceSuccess = true
        console.log('Ambience playing')
      } catch (e) {
        console.log('Ambience failed:', e.name)
        // Don't set error if it's just autoplay policy - we'll retry on click
        if (e.name !== 'NotAllowedError') {
          setAudioError('ambience')
        }
      }
    }
    
    // Try to play voice
    if (voiceRef.current && voiceFile) {
      voiceRef.current.volume = 0.88
      try {
        await voiceRef.current.play()
        voiceSuccess = true
        console.log('Voice playing')
      } catch (e) {
        console.log('Voice failed:', e.name)
        if (e.name !== 'NotAllowedError') {
          setAudioError('voice')
        }
      }
    }

    const anyPlaying = ambienceSuccess || voiceSuccess
    setAudioPlaying(anyPlaying)
    
    // If still blocked, show banner again to prompt another click
    if (!anyPlaying && hasAudio) {
      setShowBanner(true)
      setTimeout(() => setShowBanner(false), 3000)
    }
    
    return anyPlaying
  }, [voiceFile, hasAudio])

  // Try autoplay on mount (will likely fail due to browser policy)
  useEffect(() => {
    // Small delay to ensure refs are set
    const timer = setTimeout(() => {
      unlockAudio()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [unlockAudio])

  // Slide transitions
  useEffect(() => {
    const t1 = setTimeout(() => { setSlide(1); setShowVitals(true) },  SLIDE_DURATIONS[0])
    const t2 = setTimeout(() => { setSlide(2); setShowCta(true) },     SLIDE_DURATIONS[0] + SLIDE_DURATIONS[1])

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  function handleSkip() {
    setFadeOut(true)
    if (ambienceRef.current) ambienceRef.current.pause()
    if (voiceRef.current)    voiceRef.current.pause()
    setAudioPlaying(false)
    setTimeout(onComplete, 400)
  }

  // FIX: Click handler that properly retries audio if blocked
  function handleContainerClick() {
    if (!audioUnlocked || !audioPlaying) {
      // Try to unlock audio first
      unlockAudio().then(playing => {
        if (playing && showCta) {
          // If audio is now playing and CTA is showing, proceed
          handleSkip()
        }
      })
    } else if (showCta) {
      // Audio is playing and CTA is showing, proceed to next phase
      handleSkip()
    }
  }

  const currentImg = slide === 0 ? imgA : imgB

  return (
    <div
      ref={containerRef}
      className={`${styles.opening} ${fadeOut ? styles.openingFadeOut : ''}`}
      onClick={handleContainerClick}
    >
      {/* Audio Banner - Shows when audio needs attention */}
      {(showBanner || (audioError && !audioPlaying)) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          padding: '0.55rem 1.4rem',
          background: audioError ? 'rgba(198,40,40,0.95)' : 'rgba(13,45,94,0.95)',
          backdropFilter: 'blur(8px)',
          animation: 'bannerSlideIn 0.4s ease',
        }}>
          <span style={{fontSize: '1rem'}}>{audioError ? '⚠️' : '🔊'}</span>
          <span style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em'
          }}>
            {audioError ? 'Audio Error - Click to retry' : 
             audioPlaying ? 'Audio playing — check volume' : 
             'Click anywhere to enable audio'}
          </span>
        </div>
      )}

      {/* Audio Indicator */}
      {showIndicator && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 16,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 10px',
          background: audioError ? 'rgba(198,40,40,0.88)' : 'rgba(13,45,94,0.88)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: audioPlaying ? '#4caf50' : audioError ? '#ff4444' : '#90a4ae',
            animation: audioPlaying ? 'audioBlink 1.2s infinite' : 'none'
          }}/>
          <span style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            {audioPlaying ? 'Playing…' : audioError ? 'Error' : 'Click to play'}
          </span>
        </div>
      )}

      <audio 
        ref={ambienceRef} 
        src={ambience} 
        loop 
        preload="auto"
        onPlay={() => { setAudioPlaying(true); setAudioError(null) }}
        onPause={() => {
          if (!voiceRef.current || voiceRef.current.paused) {
            setAudioPlaying(false)
          }
        }}
        onError={(e) => {
          console.error('Ambience error:', e)
          setAudioError('ambience')
        }}
      />
      
      {voiceFile && (
        <audio 
          ref={voiceRef} 
          src={voiceFile} 
          preload="auto"
          onPlay={() => { setAudioPlaying(true); setAudioError(null) }}
          onPause={() => setAudioPlaying(false)}
          onEnded={() => setAudioPlaying(false)}
          onError={(e) => {
            console.error('Voice error:', e)
            setAudioError('voice')
          }}
        />
      )}

      <div
        className={`${styles.openingBg} ${slide > 0 ? styles.openingBgB : styles.openingBgA}`}
        style={{
          backgroundImage: currentImg ? `url(${currentImg})` : 'none',
          backgroundColor: accentColor || '#1565c0',
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
              .filter(v => v.value !== undefined && v.value !== 'undefined%' && v.value !== 'undefined°C' && v.value !== null)
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
            <button className={styles.openingSkip} onClick={(e) => { e.stopPropagation(); handleSkip(); }}>
              Skip intro →
            </button>
          )}
        </div>
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes bannerSlideIn {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes audioBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}