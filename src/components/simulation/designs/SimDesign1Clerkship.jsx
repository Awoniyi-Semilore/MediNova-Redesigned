// src/components/simulation/designs/SimDesign1Clerkship.jsx
// Design: The Patient Chart — cream paper with ECG texture
// Used for: Clerkship (Classes 01–04)

import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/simdesign1.module.css';

const TABS = ['Presenting Complaint', 'Past History', 'Medications', 'Examination'];
const MECHANICS_LABEL = {
  mcq: 'MCQ',
  drag: 'Drag & Drop',
  hotspot: 'Hotspot',
  audio_mcq: 'Audio + MCQ',
};

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

  const q = questions[qIndex];
  const vitals = variant?.vitals;
  const subsimId = subsim?.id || '';
  const audioSrc = cls?.media?.audio?.[subsimId] || subsim?.audio || null;
  const hasAudio = !!(audioSrc || sim?.mechanics === 'audio_mcq' || subsim?.mechanics === 'audio_mcq');

  // Initial Audio Setup
  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true);
      setShowIndicator(true);
      const timer = setTimeout(() => setShowBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [hasAudio]);

  // Question Reset Logic
  useEffect(() => {
    if (!q?.options) return;
    setShuffledOptions([...q.options].sort(() => Math.random() - 0.5));
    setSelected(null);
    setRevealed(false);
    setTimerPaused(false);
    setTimeLeft(q.timeLimit || 30);
    startTimeRef.current = Date.now();
  }, [qIndex, subsim]);

  // Unified Timer Control
  useEffect(() => {
    if (revealed || timerPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleReveal(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qIndex, revealed, timerPaused]);

  // Sync Timer with Audio Playback
  useEffect(() => {
    setTimerPaused(audioPlaying);
  }, [audioPlaying]);

  function handleSelect(opt) {
    if (revealed) return;
    setSelected(opt.id);
    handleReveal(opt);
  }

  function handleReveal(opt) {
    setRevealed(true);
    if (audioRef.current) audioRef.current.pause(); // Stop audio on answer
    
    const timeMs = Date.now() - startTimeRef.current;
    const answer = {
      questionId: q.id,
      selectedId: opt?.id || null,
      correct: opt?.correct || false,
      timeMs,
    };
    onAnswer(answer);
    setAllAnswers((prev) => [...prev, answer]);
  }

  function handleNext() {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      onSimComplete([...allAnswers]);
    }
  }

  const timerPct = (timeLeft / (q?.timeLimit || 30)) * 100;
  const timerColor = timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : accentColor;

  if (!q) return null;

  return (
    <div className={styles.page}>
      {/* Audio UI */}
      {showBanner && (
        <div className={styles.audioBanner}>
          <span className={styles.audioBannerIcon}>🔊</span>
          <span className={styles.audioBannerText}>Audio playing — check volume</span>
        </div>
      )}

      {showIndicator && (
        <div className={styles.audioIndicator}>
          <div className={styles.audioIndicatorDot} style={{ background: audioPlaying ? '#4caf50' : '#90a4ae' }} />
          <span className={styles.audioIndicatorText}>{audioPlaying ? 'Playing…' : 'Audio Ready'}</span>
        </div>
      )}

      {/* Tabs Section */}
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

      {/* Chart Content */}
      <div className={styles.chartHead}>
        <div>
          <div className={styles.patientName}>
            {variant?.patientAge
              ? `${variant.patientAge}${variant.patientGender === 'female' ? 'F' : 'M'} · Active Patient`
              : 'Active Patient'}
          </div>
          <div className={styles.patientMeta}>
            {cls.title} · {track === 'doctor' ? 'Physician' : 'Nurse'} · {subsim?.title}
          </div>
        </div>
        <div className={styles.chartInfo}>
          <div className={styles.chartNum} style={{ color: accentColor }}>
            Chart #{String(cls.id).padStart(2, '0')}-{sim?.id}
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

      {/* Decision Area */}
      <div className={styles.body}>
        <div className={styles.sectionLabel} style={{ color: accentColor }}>Clinician's Note</div>
        <div className={styles.note} style={{ borderLeftColor: accentColor }}>
          "{subsim?.scenario}"
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
        <div className={styles.question}>{q.stem}</div>

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
              {shuffledOptions.find(o => o.id === selected)?.explanation}
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
    </div>
  );
}