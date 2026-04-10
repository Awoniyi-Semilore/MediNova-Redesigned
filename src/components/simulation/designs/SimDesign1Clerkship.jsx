// src/components/simulation/designs/SimDesign1Clerkship.jsx
// Design: The Patient Chart — cream paper with ECG texture
// Used for: Clerkship (Classes 01–04)

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../../../styles/simdesign1.module.css';

const TABS = ['Presenting Complaint', 'Past History', 'Medications', 'Examination'];
const MECHANICS_LABEL = {
  mcq: 'MCQ',
  drag: 'Drag & Drop',
  hotspot: 'Hotspot',
  audio_mcq: 'Audio + MCQ',
};

// Helper to get audio source with fallbacks
function getAudioSource(cls, subsim, sim) {
  const subsimId = subsim?.id || '';
  const simId = sim?.id || '';
  
  if (cls?.media?.audio?.[subsimId]) return cls.media.audio[subsimId];
  if (cls?.media?.audio?.[simId]) return cls.media.audio[simId];
  if (subsim?.audio) return subsim.audio;
  if (sim?.audio) return sim.audio;
  return null;
}

export default function SimDesign1Clerkship({
  cls,
  sim,
  subsim,
  variant,
  accentColor,
  track,
  onAnswer,
  onSimComplete,
}) {
  const questions = subsim?.questions || [];
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30);
  const [timerPaused, setTimerPaused] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const revealedRef = useRef(false); // Track revealed state in ref for timer access

  // Safely get current question
  const q = questions[qIndex] || null;
  const vitals = variant?.vitals;
  
  const audioSrc = getAudioSource(cls, subsim, sim);
  const hasVoice = !!audioSrc;
  const hasAudio = hasVoice;

  // Keep revealedRef in sync
  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  // Audio Setup - Fixed to set both banner and indicator
  useEffect(() => {
    if (hasVoice) {
      setShowBanner(true);
      setShowIndicator(true);
      const timer = setTimeout(() => setShowBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [hasVoice]);

  // Question Reset Logic
  useEffect(() => {
    if (!q?.options) {
      console.warn('No question or options available at index:', qIndex);
      return;
    }
    setShuffledOptions([...q.options].sort(() => Math.random() - 0.5));
    setSelected(null);
    setRevealed(false);
    revealedRef.current = false;
    setTimerPaused(false);
    setTimeLeft(q.timeLimit || 30);
    startTimeRef.current = Date.now();
  }, [qIndex, subsim, q?.id]);

  // Timer Effect - Fixed to not call handleReveal during render
  useEffect(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Don't start timer if no question, already revealed, or paused
    if (!q || revealed || timerPaused) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time's up - use functional update and schedule reveal outside render
          clearInterval(timerRef.current);
          timerRef.current = null;
          // Use setTimeout to move reveal out of render phase
          setTimeout(() => {
            if (!revealedRef.current) {
              handleReveal(null);
            }
          }, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [q?.id, revealed, timerPaused]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync Timer with Audio Playback
  useEffect(() => {
    setTimerPaused(audioPlaying);
  }, [audioPlaying]);

  // FIX: Use useCallback to ensure stable function reference
  const handleReveal = useCallback((opt) => {
    // Prevent multiple calls
    if (revealedRef.current) return;
    revealedRef.current = true;
    
    // FIX: Guard against undefined q
    if (!q) {
      console.error('handleReveal called but q is undefined');
      return;
    }
    
    setRevealed(true);
    if (audioRef.current) audioRef.current.pause();
    
    const timeMs = Date.now() - startTimeRef.current;
    const answer = {
      questionId: q.id,
      selectedId: opt?.id || null,
      correct: opt?.correct || false,
      timeMs,
    };
    
    // Schedule onAnswer call outside of render phase
    setTimeout(() => {
      onAnswer(answer);
    }, 0);
    
    setAllAnswers((prev) => [...prev, answer]);
  }, [q, onAnswer]);

  // FIX: Use useCallback for handleSelect
  const handleSelect = useCallback((opt) => {
    if (revealed || !q) return;
    setSelected(opt.id);
    // Clear timer before revealing
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    handleReveal(opt);
  }, [revealed, q, handleReveal]);

  // FIX: Use useCallback for handleNext
  const handleNext = useCallback(() => {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      onSimComplete([...allAnswers]);
    }
  }, [qIndex, questions.length, allAnswers, onSimComplete]);

  const timerPct = (timeLeft / (q?.timeLimit || 30)) * 100;
  const timerColor = timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : accentColor;

  // Get tab content based on active tab
  const getTabContent = () => {
    switch(activeTab) {
      case 0: // Presenting Complaint
        return subsim?.scenario || 'No presenting complaint recorded.';
      case 1: // Past History
        return variant?.history || 'No significant past medical history.';
      case 2: // Medications
        return variant?.medications || 'No current medications listed.';
      case 3: // Examination
        return variant?.examination || 'Examination findings not documented.';
      default:
        return '';
    }
  };

  // FIX: Early return with loading state if no question available
  if (!q) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fdfaf6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: '#2c1810', marginBottom: '1rem' }}>
            Loading question...
          </div>
          <div style={{ fontSize: '0.9rem', color: '#607d8b' }}>
            {questions.length === 0 ? 'No questions available' : `Question ${qIndex + 1} of ${questions.length}`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Audio Banner - Fixed with inline styles for reliability */}
      {showBanner && (
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
          background: 'rgba(13,45,94,0.95)',
          backdropFilter: 'blur(8px)',
          animation: 'bannerSlideIn 0.4s ease',
        }}>
          <span style={{fontSize: '1rem'}}>🔊</span>
          <span style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em'
          }}>Audio playing — check volume</span>
        </div>
      )}

      {showIndicator && (
        <div style={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 10px',
          background: 'rgba(13,45,94,0.88)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: audioPlaying ? '#4caf50' : '#90a4ae',
            animation: audioPlaying ? 'audioBlink 1.2s infinite' : 'none'
          }}/>
          <span style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>{audioPlaying ? 'Playing…' : 'Audio Ready'}</span>
        </div>
      )}

      {/* Navigation Header */}
      <div style={{
        background: '#0d2d5e',
        padding: '0.8rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `2px solid ${accentColor}`,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <button 
          onClick={() => window.history.back()}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '0.4rem 0.8rem',
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          ← Back
        </button>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          color: '#fff',
          fontSize: '1rem'
        }}>
          {cls?.title}
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase'
        }}>
          {track === 'doctor' ? 'Physician' : 'Nurse'} Track
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabs} style={{ borderBottomColor: accentColor, marginTop: showBanner ? '40px' : 0 }}>
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

      {/* Chart Content */}
      <div className={styles.chartHead}>
        <div>
          <div className={styles.patientName}>
            {variant?.patientAge
              ? `${variant.patientAge}${variant.patientGender === 'female' ? 'F' : 'M'} · Active Patient`
              : 'Active Patient'}
          </div>
          <div className={styles.patientMeta}>
            {cls?.title} · {track === 'doctor' ? 'Physician' : 'Nurse'} · {subsim?.title}
          </div>
        </div>
        <div className={styles.chartInfo}>
          <div className={styles.chartNum} style={{ color: accentColor }}>
            Chart #{String(cls?.id || 0).padStart(2, '0')}-{sim?.id}
          </div>
          <div className={styles.chartDate}>
            Q{qIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Vitals Strip */}
      {vitals && (
        <div className={styles.vitalsStrip}>
          {[
            { l: 'HR', v: vitals.hr, w: vitals.hr > 100 || vitals.hr < 60 },
            { l: 'BP', v: vitals.bp, w: false },
            { l: 'SpO₂', v: `${vitals.spo2}%`, w: vitals.spo2 < 94 },
            { l: 'RR', v: vitals.rr, w: vitals.rr > 20 },
            { l: 'Temp', v: `${vitals.temp}°C`, w: vitals.temp > 38 },
          ].filter(x => x.v !== undefined && x.v !== null).map(x => (
            <div key={x.l} className={styles.vitalCell}>
              <div className={styles.vitalVal} style={{ color: x.w ? accentColor : '#2c1810' }}>{x.v}</div>
              <div className={styles.vitalLabel}>{x.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content Display */}
      <div style={{
        background: 'rgba(240,235,224,0.5)',
        padding: '0.8rem 1.4rem',
        borderBottom: '1px solid #e8e2d5',
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: '0.9rem',
        color: '#3d2a1e',
        fontStyle: 'italic',
        lineHeight: 1.6
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: '0.5rem',
          textTransform: 'uppercase',
          color: accentColor,
          marginRight: '0.5rem',
          fontStyle: 'normal'
        }}>
          {TABS[activeTab]}:
        </span>
        {getTabContent()}
      </div>

      {/* Decision Area */}
      <div className={styles.body}>
        <div className={styles.sectionLabel} style={{ color: accentColor }}>Clinician's Note</div>
        <div className={styles.note} style={{ borderLeftColor: accentColor }}>
          "{subsim?.scenario || 'No scenario available'}"
        </div>

        {hasAudio && (
          <div className={styles.audioPlayer}>
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
              onClick={() => audioPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
            >
              {audioPlaying ? '■ Pause' : '▶ Play Audio'}
            </button>
            {audioPlaying && <span className={styles.audioBlink}>⏸ Timer paused</span>}
          </div>
        )}

        <div className={styles.sectionLabel} style={{ color: accentColor }}>Clinical Decision Required</div>
        <div className={styles.question}>{q?.stem || 'Question loading...'}</div>

        <div className={styles.options}>
          {shuffledOptions.map((opt, i) => {
            const isSelected = selected === opt.id;
            let optStyle = {};
            if (revealed) {
              if (opt.correct) optStyle = { borderColor: '#2e7d32', background: 'rgba(46,125,50,0.06)' };
              else if (isSelected) optStyle = { borderColor: accentColor, background: `${accentColor}0d` };
              else optStyle = { opacity: 0.5 };
            } else if (isSelected) {
              optStyle = { borderColor: accentColor, background: `${accentColor}11` };
            }

            return (
              <div key={opt.id} className={styles.option} style={optStyle} onClick={() => handleSelect(opt)}>
                <div className={styles.optionKey} style={isSelected ? { color: accentColor } : {}}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className={styles.optionText}>{opt.text}</div>
                {revealed && opt.correct && <div className={styles.optionTick}>✓</div>}
                {revealed && isSelected && !opt.correct && (
                  <div className={styles.optionCross} style={{ color: accentColor }}>✗</div>
                )}
              </div>
            );
          })}
        </div>

        {revealed && selected && (
          <div className={styles.explanation} style={{ 
              borderLeftColor: shuffledOptions.find(o => o.id === selected)?.correct ? '#2e7d32' : accentColor 
            }}>
            <div className={styles.explanationText}>
              {shuffledOptions.find(o => o.id === selected)?.explanation || 'No explanation available'}
            </div>
          </div>
        )}

        {revealed && (
          <button className={styles.nextBtn} style={{ background: accentColor }} onClick={handleNext}>
            {qIndex < questions.length - 1 ? 'Next Question →' : 'Complete Simulation →'}
          </button>
        )}
      </div>

      {/* Footer Timer */}
      <div className={styles.footer}>
        <span className={styles.footerTimerLabel}>{timerPaused ? 'PAUSED' : 'TIME'}</span>
        <div className={styles.footerBar}>
          <div
            className={styles.footerBarFill}
            style={{
              width: `${timerPct}%`,
              background: timerPaused ? '#90a4ae' : timerColor,
            }}
          />
        </div>
        <span className={styles.footerTimerVal} style={{ color: timerPaused ? '#90a4ae' : timerColor }}>
          {revealed ? '--' : `0:${String(timeLeft).padStart(2, '0')}`}
        </span>
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
  );
}