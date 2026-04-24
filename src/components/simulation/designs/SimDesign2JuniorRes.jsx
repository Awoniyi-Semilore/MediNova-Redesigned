// src/components/simulation/designs/SimDesign2JuniorRes.jsx
// Design: The Monitor — dark oscilloscope grid, green ECG, split panel
// Used for: Junior Residency (Classes 05–09)

import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/simdesign2.module.css';

function getAudioSource(cls, subsim, sim) {
  const subsimId = subsim?.id || '';
  const simId = sim?.id || '';
  if (cls?.media?.audio?.[subsimId]) return cls.media.audio[subsimId];
  if (cls?.media?.audio?.[simId]) return cls.media.audio[simId];
  if (subsim?.audio) return subsim.audio;
  if (sim?.audio) return sim.audio;
  return null;
}

export default function SimDesign2JuniorRes({ cls, sim, subsim, variant, accentColor, track, onAnswer, onSimComplete }) {
  const questions = subsim?.questions || [];
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30);
  const [timerPaused, setTimerPaused] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [clock, setClock] = useState('');

  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const q = questions[qIndex];
  const vitals = variant?.vitals;
  const audioSrc = getAudioSource(cls, subsim, sim);
  const hasVoice = !!audioSrc;
  const hasAudio = hasVoice;

  useEffect(() => {
    const updateClock = () => setClock(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    updateClock();
    const c = setInterval(updateClock, 1000);
    return () => clearInterval(c);
  }, []);

  useEffect(() => {
    if (hasVoice) {
      setShowBanner(true);
      setShowIndicator(true);
      const timer = setTimeout(() => setShowBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [hasVoice]);

  useEffect(() => {
    if (!q?.options) return;
    setShuffledOptions([...q.options].sort(() => Math.random() - 0.5));
    setSelected(null);
    setRevealed(false);
    setTimerPaused(false);
    setTimeLeft(q.timeLimit || 30);
    startTimeRef.current = Date.now();
  }, [qIndex, subsim]);

  useEffect(() => {
    if (revealed || timerPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); handleReveal(null); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [qIndex, revealed, timerPaused]);

  useEffect(() => { setTimerPaused(audioPlaying); }, [audioPlaying]);

  function handleSelect(opt) {
    if (revealed) return;
    setSelected(opt.id);
    handleReveal(opt);
  }

  function handleReveal(opt) {
    setRevealed(true);
    if (audioRef.current) audioRef.current.pause();
    const timeMs = Date.now() - startTimeRef.current;
    const answer = { questionId: q.id, selectedId: opt?.id || null, correct: opt?.correct || false, timeMs };
    onAnswer(answer);
    setAllAnswers((prev) => [...prev, answer]);
  }

  function handleNext() {
    if (qIndex < questions.length - 1) setQIndex((i) => i + 1);
    else onSimComplete([...allAnswers]);
  }

  const timerPct = (timeLeft / (q?.timeLimit || 30)) * 100;
  const timerColor = timerPaused ? '#607d8b' : timeLeft <= 5 ? '#ff4444' : timeLeft <= 10 ? '#fdcb6e' : accentColor;

  if (!q) return null;

  return (
    <div className={styles.page}>
      {/* Audio Banner - Fixed with inline styles */}
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
          }}>Audio Stream Active — Monitor Volume</span>
        </div>
      )}

      {showIndicator && (
        <div style={{
          position: 'fixed',
          bottom: 64,
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
            background: audioPlaying ? '#00b894' : '#607d8b',
            animation: audioPlaying ? 'audioBlink 1.2s infinite' : 'none'
          }}/>
          <span style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>{audioPlaying ? 'Receiving Audio…' : 'Audio Channel'}</span>
        </div>
      )}

      {/* Navigation Header */}
      <div style={{
        background: '#0a1218',
        borderBottom: '1px solid #1a2d3d',
        padding: '0.55rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        marginTop: showBanner ? '40px' : 0
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
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          ← Back
        </button>
        <div className={styles.statusDots}>
          <div className={styles.dot} style={{ background: accentColor }} />
          <div className={styles.dot} style={{ background: '#ff4444', animation: 'pulse 2s infinite' }} />
        </div>
        <div className={styles.topTitle}>MediNova System v.2.4 · Class {cls.num} · {subsim?.title || sim?.title}</div>
        <div className={styles.topClock}>{clock}</div>
      </div>

      <div className={styles.vitalsStrip}>
        {vitals && [
          { l: 'HR bpm', v: vitals.hr, w: vitals.hr > 100 || vitals.hr < 60 },
          { l: 'BP mmHg', v: vitals.bp, w: false },
          { l: 'SpO₂', v: `${vitals.spo2}%`, w: vitals.spo2 < 94 },
          { l: 'RR /min', v: vitals.rr, w: vitals.rr > 20 },
          { l: 'Temp', v: `${vitals.temp}°C`, w: vitals.temp > 38 },
        ].filter(x => x.v !== undefined && x.v !== null).map(x => (
          <div key={x.l} className={styles.vitalItem}>
            <div className={styles.vitalVal} style={{ color: x.w ? '#ff4444' : accentColor }}>{x.v}</div>
            <div className={styles.vitalLabel}>{x.l}</div>
          </div>
        ))}
      </div>

      <div className={styles.split}>
        <div className={styles.leftPanel}>
          <div className={styles.panelHead} style={{ color: accentColor, borderBottomColor: '#1a2d3d' }}>LIVE ECG TRACE</div>
          <div className={styles.ecgWrap}>
            <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
              <polyline points="0,30 20,30 25,10 30,50 35,5 40,40 45,30 85,30 110,30 115,10 120,50 125,5 130,40 135,30 175,30 200,30" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.panelHead} style={{ color: accentColor, borderBottomColor: '#1a2d3d', marginTop: '1rem' }}>SCENARIO DATA</div>
          <div className={styles.scenarioText}>{subsim?.scenario}</div>
          {/* {hasAudio && (
            <div className={styles.audioRow}>
              <audio ref={audioRef} src={audioSrc} onPlay={() => setAudioPlaying(true)} onPause={() => setAudioPlaying(false)} onEnded={() => setAudioPlaying(false)} />
              <button className={styles.audioBtn} style={{ borderColor: accentColor, color: accentColor }} onClick={() => audioPlaying ? audioRef.current?.pause() : audioRef.current?.play()}>
                {audioPlaying ? '■ Pause' : '▶ Play Clip'}
              </button>
              <span className={styles.audioHint}>{audioPlaying ? '⏸ Timer Suspended' : (subsim?.audioInstruction || 'Audio available')}</span>
            </div>
          )} */}
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.panelHead} style={{ color: accentColor, borderBottomColor: '#1a2d3d' }}>INTERVENTION SELECTION</div>
          <div className={styles.question}>{q.stem}</div>
          <div className={styles.options}>
            {shuffledOptions.map((opt, i) => {
              const isSelected = selected === opt.id;
              let optStyle = {};
              if (revealed) {
                if (opt.correct) optStyle = { borderColor: accentColor, color: accentColor, background: `${accentColor}11` };
                else if (isSelected) optStyle = { borderColor: '#ff4444', color: '#ff4444', background: '#ff444411' };
                else optStyle = { opacity: 0.35 };
              } else if (isSelected) optStyle = { borderColor: accentColor, color: accentColor, boxShadow: `inset 0 0 10px ${accentColor}33` };
              return (
                <div key={opt.id} className={styles.option} style={optStyle} onClick={() => handleSelect(opt)}>
                  <span className={styles.optKey}>{String.fromCharCode(65 + i)}</span>
                  <span className={styles.optText}>{opt.text}</span>
                  {revealed && opt.correct && <span style={{ marginLeft: 'auto', color: accentColor }}>✓</span>}
                  {revealed && isSelected && !opt.correct && <span style={{ marginLeft: 'auto', color: '#ff4444' }}>✗</span>}
                </div>
              );
            })}
          </div>
          {revealed && selected && (
            <div className={styles.explanation} style={{ borderLeftColor: shuffledOptions.find(o => o.id === selected)?.correct ? accentColor : '#ff4444' }}>
              <div className={styles.expLabel} style={{ color: shuffledOptions.find(o => o.id === selected)?.correct ? accentColor : '#ff4444' }}>
                {shuffledOptions.find(o => o.id === selected)?.correct ? 'CORRECT_DATA' : 'INCORRECT_DATA'}
              </div>
              <div className={styles.expText}>{shuffledOptions.find(o => o.id === selected)?.explanation}</div>
            </div>
          )}
          {revealed && (
            <button className={styles.nextBtn} style={{ background: accentColor }} onClick={handleNext}>
              {qIndex < questions.length - 1 ? 'LOAD NEXT Q →' : 'FINALIZE REPORT →'}
            </button>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footLabel} style={{ color: timerPaused ? '#607d8b' : accentColor }}>{timerPaused ? 'PAUSED' : 'COUNTDOWN'}</span>
        <div className={styles.footBar}><div className={styles.footBarFill} style={{ width: `${timerPct}%`, background: timerColor }} /></div>
        <span className={styles.footVal} style={{ color: timerColor }}>{revealed ? '--' : timerPaused ? '⏸' : `0:${String(timeLeft).padStart(2, '0')}`}</span>
        <span className={styles.footCount}>STAGE {qIndex + 1} OF {questions.length}</span>
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}