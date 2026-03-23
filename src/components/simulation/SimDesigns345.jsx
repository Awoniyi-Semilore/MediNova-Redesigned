// src/components/simulation/SimDesigns345.jsx

import { useState, useEffect, useRef } from 'react'

// ─── KEYFRAMES (injected via <style> tag in each component) ───────────────────
const SHARED_KEYFRAMES = `
  @keyframes bannerIn  { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
  @keyframes bannerOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-100%)} }
  @keyframes speakerPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes audioBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes simBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }
`

// ─── AUDIO BANNER ─────────────────────────────────────────────────────────────
function AudioBanner() {
  return (
    <div style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,
      display:'flex',alignItems:'center',justifyContent:'center',gap:'0.6rem',
      padding:'0.55rem 1.4rem',
      background:'rgba(13,45,94,0.95)',
      backdropFilter:'blur(8px)',
      animation:'bannerIn 0.4s ease, bannerOut 0.4s ease 3.6s forwards',
    }}>
      <span style={{fontSize:'1rem',animation:'speakerPulse 1s infinite'}}>🔊</span>
      <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.6rem',color:'rgba(255,255,255,0.9)',textTransform:'uppercase',letterSpacing:'0.12em'}}>
        Audio playing — turn up your volume
      </span>
    </div>
  )
}

// ─── AUDIO INDICATOR ──────────────────────────────────────────────────────────
function AudioIndicator({ playing }) {
  return (
    <div style={{
      position:'fixed',bottom:64,right:16,zIndex:40,
      display:'flex',alignItems:'center',gap:5,
      padding:'5px 10px',
      background:'rgba(13,45,94,0.88)',
      border:'1px solid rgba(255,255,255,0.15)',
      borderRadius:20,
    }}>
      <div style={{
        width:6,height:6,borderRadius:'50%',
        background: playing ? '#4caf50' : '#90a4ae',
        animation: playing ? 'audioBlink 1.2s infinite' : 'none',
      }}/>
      <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'0.5rem',color:'rgba(255,255,255,0.7)',textTransform:'uppercase',letterSpacing:'0.08em',whiteSpace:'nowrap'}}>
        {playing ? 'Playing…' : 'Audio'}
      </span>
    </div>
  )
}

// ─── ECG BACKGROUND HELPER ────────────────────────────────────────────────────
function ecgBg(hexColor, opacity = 0.07) {
  const encoded = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48">` +
    `<polyline points="0,24 20,24 26,10 31,38 36,6 41,28 46,24 90,24 116,24 121,10 126,38 131,6 136,28 141,24 185,24 210,24 215,10 220,38 225,6 230,28 235,24 240,24" ` +
    `fill="none" stroke="${hexColor}" stroke-width="0.6" opacity="${opacity}"/>` +
    `</svg>`
  )
  return {
    backgroundImage:  `url("data:image/svg+xml,${encoded}")`,
    backgroundSize:   '240px 48px',
    backgroundRepeat: 'repeat',
  }
}

// ─── SHARED QUESTION ENGINE HOOK ──────────────────────────────────────────────
// timerPaused is driven externally via audioPlaying state
function useQuestionEngine(questions, onAnswer, onSimComplete) {
  const [qIndex,          setQIndex]          = useState(0)
  const [selected,        setSelected]        = useState(null)
  const [revealed,        setRevealed]        = useState(false)
  const [timeLeft,        setTimeLeft]        = useState(questions[0]?.timeLimit || 30)
  const [timerPaused,     setTimerPaused]     = useState(false)
  const [allAnswers,      setAllAnswers]       = useState([])
  const [shuffledOptions, setShuffledOptions] = useState([])
  const timerRef     = useRef(null)
  const startTimeRef = useRef(Date.now())

  const q = questions[qIndex]

  useEffect(() => {
    if (!q?.options) return
    setShuffledOptions([...q.options].sort(() => Math.random() - 0.5))
    setSelected(null)
    setRevealed(false)
    setTimerPaused(false)
    setTimeLeft(q.timeLimit || 30)
    startTimeRef.current = Date.now()
  }, [qIndex])

  useEffect(() => {
    if (revealed || timerPaused) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); reveal(null); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [qIndex, revealed, timerPaused])

  function pauseTimer()  { clearInterval(timerRef.current); setTimerPaused(true)  }
  function resumeTimer() { setTimerPaused(false) }

  function select(opt) {
    if (revealed) return
    setSelected(opt.id)
    clearInterval(timerRef.current)
    reveal(opt)
  }

  function reveal(opt) {
    setRevealed(true)
    const timeMs = Date.now() - startTimeRef.current
    const answer = { questionId: q?.id, selectedId: opt?.id || null, correct: opt?.correct || false, timeMs }
    onAnswer(answer)
    setAllAnswers(prev => [...prev, answer])
  }

  function next(currentAllAnswers) {
    if (qIndex < questions.length - 1) setQIndex(i => i + 1)
    else onSimComplete(currentAllAnswers)
  }

  return {
    q, qIndex, questions, selected, revealed,
    timeLeft, timerPaused, shuffledOptions, allAnswers,
    select, next, pauseTimer, resumeTimer,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN 3 — The Theatre Brief (Senior Residency)
// ─────────────────────────────────────────────────────────────────────────────
export function SimDesign3SeniorRes({
  cls, sim, subsim, variant, accentColor, track, onAnswer, onSimComplete
}) {
  const questions = subsim?.questions || []
  const eng = useQuestionEngine(questions, onAnswer, onSimComplete)

  const [showBanner,    setShowBanner]    = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [audioPlaying,  setAudioPlaying]  = useState(false)
  const audioRef = useRef(null)

  const subsimId = subsim?.id || ''
  const audioSrc = cls?.media?.audio?.[subsimId] || subsim?.audio || null
  const hasAudio = !!audioSrc

  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true)
      setShowIndicator(true)
      setTimeout(() => setShowBanner(false), 4000)
    }
  }, [])

  // Pause / resume timer based on audio state
  useEffect(() => {
    if (audioPlaying) eng.pauseTimer()
    else eng.resumeTimer()
  }, [audioPlaying])

  if (!eng.q) return null

  const timerPct   = (eng.timeLeft / (eng.q?.timeLimit || 30)) * 100
  const timerColor = eng.timerPaused ? '#607d8b' : eng.timeLeft <= 5 ? '#c0392b' : eng.timeLeft <= 10 ? '#e67e22' : accentColor
  const vitals     = variant?.vitals

  const checkItems = [
    { label: 'Consent signed',      ok: true              },
    { label: 'Site marked',         ok: true              },
    { label: 'Allergies confirmed', ok: true              },
    { label: 'Blood available',     ok: Math.random()>0.3 },
    { label: 'Antibiotics given',   ok: true              },
    { label: 'ICU bed confirmed',   ok: Math.random()>0.5 },
  ]

  return (
    <div style={{ background:'#e8ede8', ...ecgBg('#2e7d32',0.06), minHeight:'100vh', fontFamily:"'DM Sans',sans-serif", paddingBottom:56 }}>
      <style>{SHARED_KEYFRAMES}</style>
      {showBanner    && <AudioBanner />}
      {showIndicator && <AudioIndicator playing={audioPlaying} />}

      {/* Header */}
      <div style={{ background:'#1a2e1a', padding:'0.7rem 1.4rem', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:2 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.58rem', color:accentColor, textTransform:'uppercase', letterSpacing:'0.14em' }}>
          MediNova Teaching Hospital · {track==='doctor'?'Physician':'Nurse'} Track · Class {cls.num}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:accentColor, display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:accentColor, display:'inline-block', animation:'simBlink 1.5s infinite' }}/>
            Simulation Active
          </span>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.65rem', color:'#fff' }}>
            {new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Briefing strip */}
      <div style={{ background:'rgba(240,245,240,0.95)', borderBottom:`2px solid #1a2e1a`, padding:'0.8rem 1.4rem', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.8rem', position:'relative', zIndex:2 }}>
        {[
          { label:'Class',      value:cls.title },
          { label:'Simulation', value:subsim?.title||sim?.title },
          { label:'Track',      value:track==='doctor'?'Physician':'Nurse' },
        ].map(item=>(
          <div key={item.label} style={{ borderLeft:`3px solid ${accentColor}`, paddingLeft:'0.7rem' }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.48rem', color:'#4a6a4a', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:2 }}>{item.label}</div>
            <div style={{ fontSize:'0.78rem', color:'#1a2e1a', fontWeight:500 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ padding:'1rem 1.4rem', maxWidth:860, margin:'0 auto', position:'relative', zIndex:2 }}>

        {/* WHO checklist */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4, marginBottom:'0.8rem' }}>
          {checkItems.map(item=>(
            <div key={item.label} style={{ background:'rgba(255,255,255,0.9)', border:'1px solid #c0cfc0', borderRadius:3, padding:'5px 7px', display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:item.ok?accentColor:'#e0e0e0', flexShrink:0 }}/>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.48rem', color:'#4a6a4a', textTransform:'uppercase' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Vitals */}
        {vitals&&(
          <div style={{ display:'flex', gap:8, marginBottom:'0.8rem' }}>
            {[
              {l:'HR', v:vitals.hr,          w:vitals.hr>100},
              {l:'BP', v:vitals.bp,          w:false},
              {l:'SpO₂',v:`${vitals.spo2}%`,w:vitals.spo2<94},
              {l:'Temp',v:`${vitals.temp}°C`,w:vitals.temp>38},
            ].map(x=>(
              <div key={x.l} style={{ background:'rgba(255,255,255,0.9)', border:`1px solid ${x.w?'#c0392b':'#c0cfc0'}`, borderRadius:3, padding:'6px 10px', textAlign:'center', flex:1 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.7rem', color:x.w?'#c0392b':'#1a2e1a', fontWeight:500 }}>{x.v}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.44rem', color:'#4a6a4a', textTransform:'uppercase' }}>{x.l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Audio */}
        {hasAudio&&(
          <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', background:'rgba(255,255,255,0.8)', border:`1px solid ${accentColor}44`, borderRadius:4, padding:'0.5rem 0.8rem', marginBottom:'0.8rem' }}>
            <audio ref={audioRef} src={audioSrc}
              onPlay={()=>setAudioPlaying(true)}
              onPause={()=>setAudioPlaying(false)}
              onEnded={()=>setAudioPlaying(false)}
            />
            <button onClick={()=>audioPlaying?audioRef.current?.pause():audioRef.current?.play()}
              style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', textTransform:'uppercase', padding:'4px 10px', background:'transparent', border:`1px solid ${accentColor}`, borderRadius:3, cursor:'pointer', color:accentColor, whiteSpace:'nowrap' }}>
              {audioPlaying?'■ Pause':'▶ Play Audio'}
            </button>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:'#4a6a4a', textTransform:'uppercase' }}>
              {audioPlaying?'⏸ Timer paused':(subsim?.audioInstruction||'Listen before answering')}
            </span>
          </div>
        )}

        {/* Scenario */}
        <div style={{ background:'rgba(255,255,255,0.9)', border:'1px solid #c0cfc0', borderRadius:4, padding:'0.8rem 1rem', marginBottom:'0.8rem' }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.5rem', color:'#4a6a4a', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>Active Case</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', color:'#1a2e1a', lineHeight:1.65, fontStyle:'italic' }}>{subsim?.scenario}</div>
        </div>

        {/* Question */}
        <div style={{ fontSize:'0.85rem', color:'#1a2e1a', fontWeight:500, lineHeight:1.55, marginBottom:'0.8rem', padding:'0.7rem 0.9rem', background:'rgba(255,255,255,0.9)', border:'1px solid #c0cfc0', borderLeft:`3px solid #c0392b`, borderRadius:'0 4px 4px 0' }}>
          {eng.q.stem}
        </div>

        {/* Options */}
        <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:'0.8rem' }}>
          {eng.shuffledOptions.map((opt,i)=>{
            let border='1px solid #c0cfc0',bg='rgba(255,255,255,0.9)',color='#1a2e1a'
            if(eng.revealed){
              if(opt.correct){border=`1px solid ${accentColor}`;bg=`${accentColor}14`;color=accentColor}
              else if(eng.selected===opt.id){border='1px solid #c0392b';bg='rgba(198,40,40,0.05)';color='#c0392b'}
              else{color='#b0c0b0'}
            }else if(eng.selected===opt.id){border=`1px solid ${accentColor}`;bg=`${accentColor}11`}
            return(
              <div key={opt.id} onClick={()=>eng.select(opt)}
                style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'9px 11px', background:bg, border, borderRadius:3, cursor:eng.revealed?'default':'pointer', color, fontSize:'0.8rem', transition:'all 0.15s' }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.58rem', color:'#4a6a4a', flexShrink:0, paddingTop:1 }}>{String.fromCharCode(65+i)}</span>
                <span style={{flex:1}}>{opt.text}</span>
                {eng.revealed&&opt.correct&&<span style={{flexShrink:0}}>✓</span>}
                {eng.revealed&&eng.selected===opt.id&&!opt.correct&&<span style={{flexShrink:0}}>✗</span>}
              </div>
            )
          })}
        </div>

        {/* Explanation */}
        {eng.revealed&&eng.selected&&(()=>{
          const s=eng.shuffledOptions.find(o=>o.id===eng.selected)
          return(
            <div style={{ padding:'0.8rem 1rem', background:s?.correct?`${accentColor}0f`:'rgba(198,40,40,0.04)', border:`1px solid ${s?.correct?accentColor:'#c0392b'}`, borderLeft:`3px solid ${s?.correct?accentColor:'#c0392b'}`, borderRadius:'0 4px 4px 0', marginBottom:'0.8rem' }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:s?.correct?accentColor:'#c0392b', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>
                {s?.correct?'✓ Correct':'✗ Incorrect'}
              </div>
              <div style={{ fontSize:'0.8rem', color:'#1a2e1a', lineHeight:1.6 }}>{s?.explanation}</div>
            </div>
          )
        })()}

        {eng.revealed&&(
          <button onClick={()=>eng.next(eng.allAnswers)}
            style={{ width:'100%', padding:'0.8rem', background:accentColor, color:'#fff', border:'none', borderRadius:4, fontFamily:"'Share Tech Mono',monospace", fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.1em', cursor:'pointer' }}>
            {eng.qIndex<eng.questions.length-1?'Next Question →':'Complete Simulation →'}
          </button>
        )}
      </div>

      {/* Footer timer */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, display:'flex', alignItems:'center', gap:'0.7rem', padding:'0.6rem 1.4rem', background:'rgba(240,245,240,0.97)', borderTop:'1px solid #c0cfc0', zIndex:10 }}>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.5rem', color:'#4a6a4a', textTransform:'uppercase' }}>
          {eng.timerPaused?'Paused':'Decision Clock'}
        </span>
        <div style={{ flex:1, height:3, background:'#c0cfc0', borderRadius:2, overflow:'hidden', maxWidth:400 }}>
          <div style={{ height:'100%', width:`${timerPct}%`, background:timerColor, borderRadius:2, transition:'width 1s linear, background 0.3s' }}/>
        </div>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.72rem', color:timerColor }}>
          {eng.revealed?'—':eng.timerPaused?'⏸':`0:${String(eng.timeLeft).padStart(2,'0')}`}
        </span>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.5rem', color:'#4a6a4a' }}>Q{eng.qIndex+1}/{eng.questions.length}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN 4 — The Command Centre (Fellowship)
// ─────────────────────────────────────────────────────────────────────────────
export function SimDesign4Fellowship({
  cls, sim, subsim, variant, accentColor, track, onAnswer, onSimComplete
}) {
  const questions = subsim?.questions || []
  const eng = useQuestionEngine(questions, onAnswer, onSimComplete)

  const [showBanner,    setShowBanner]    = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [audioPlaying,  setAudioPlaying]  = useState(false)
  const audioRef = useRef(null)

  const subsimId = subsim?.id || ''
  const audioSrc = cls?.media?.audio?.[subsimId] || subsim?.audio || null
  const hasAudio = !!audioSrc

  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true); setShowIndicator(true)
      setTimeout(() => setShowBanner(false), 4000)
    }
  }, [])

  useEffect(() => {
    if (audioPlaying) eng.pauseTimer()
    else eng.resumeTimer()
  }, [audioPlaying])

  if (!eng.q) return null

  const timerPct   = (eng.timeLeft / (eng.q?.timeLimit || 30)) * 100
  const timerColor = eng.timerPaused ? '#607d8b' : eng.timeLeft <= 5 ? '#ff4444' : eng.timeLeft <= 10 ? '#fdcb6e' : accentColor
  const vitals     = variant?.vitals
  const dark='#0d0a1a', panel='#090714', border='#1f1840', border2='#1a1030'

  return (
    <div style={{ background:dark, ...ecgBg('#9c27b0',0.05), minHeight:'100vh', fontFamily:"'DM Sans',sans-serif", paddingBottom:48 }}>
      <style>{SHARED_KEYFRAMES}</style>
      {showBanner    && <AudioBanner />}
      {showIndicator && <AudioIndicator playing={audioPlaying} />}

      {/* Top bar */}
      <div style={{ background:'#120e22', borderBottom:`1px solid ${border}`, padding:'0.6rem 1rem', display:'flex', alignItems:'center', gap:'0.8rem', position:'relative', zIndex:2 }}>
        <div style={{ width:18, height:18, background:accentColor, borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.6rem', color:accentColor, textTransform:'uppercase', letterSpacing:'0.14em' }}>
          ICU Command · Class {cls.num} · {track==='doctor'?'Physician':'Nurse'} Track · Fellowship
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:accentColor, animation:'simBlink 1.5s infinite' }}/>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:accentColor, textTransform:'uppercase' }}>
            {subsim?.title||sim?.title}
          </span>
        </div>
      </div>

      {/* Body — sidebar + main */}
      <div style={{ display:'grid', gridTemplateColumns:'150px 1fr', minHeight:'calc(100vh - 104px)', position:'relative', zIndex:2 }}>

        {/* Sidebar */}
        <div style={{ background:'rgba(9,7,20,0.92)', borderRight:`1px solid ${border2}`, padding:'0.8rem' }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.48rem', color:'#4a1472', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>System Status</div>
          {vitals&&[
            {l:'HR',  v:vitals.hr,          w:vitals.hr>100},
            {l:'BP',  v:vitals.bp,          w:false},
            {l:'SpO₂',v:`${vitals.spo2}%`, w:vitals.spo2<94},
            {l:'GCS', v:vitals.gcs,         w:vitals.gcs<15},
          ].map(x=>(
            <div key={x.l} style={{ background:'#120e22', border:`1px solid ${border}`, borderRadius:4, padding:'0.5rem', marginBottom:4, textAlign:'center' }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.7rem', color:x.w?'#ff4444':accentColor }}>{x.v}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.42rem', color:'#4a1472', textTransform:'uppercase' }}>{x.l}</div>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding:'0.9rem 1rem', background:'rgba(9,7,20,0.5)' }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:accentColor, textTransform:'uppercase', letterSpacing:'0.14em', borderBottom:`1px solid ${border}`, paddingBottom:'0.4rem', marginBottom:'0.7rem' }}>
            Critical Assessment
          </div>
          <div style={{ fontSize:'0.78rem', color:'#6a5080', lineHeight:1.6, marginBottom:'0.7rem' }}>{subsim?.scenario}</div>

          {/* Audio */}
          {hasAudio&&(
            <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', background:`${accentColor}0d`, border:`1px solid ${accentColor}33`, borderRadius:4, padding:'0.5rem 0.8rem', marginBottom:'0.7rem' }}>
              <audio ref={audioRef} src={audioSrc}
                onPlay={()=>setAudioPlaying(true)}
                onPause={()=>setAudioPlaying(false)}
                onEnded={()=>setAudioPlaying(false)}
              />
              <button onClick={()=>audioPlaying?audioRef.current?.pause():audioRef.current?.play()}
                style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', textTransform:'uppercase', padding:'4px 10px', background:'transparent', border:`1px solid ${accentColor}`, borderRadius:3, cursor:'pointer', color:accentColor, whiteSpace:'nowrap' }}>
                {audioPlaying?'■ Pause':'▶ Play Audio'}
              </button>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:'#4a1472', textTransform:'uppercase' }}>
                {audioPlaying?'⏸ Timer paused':(subsim?.audioInstruction||'Listen before answering')}
              </span>
            </div>
          )}

          <div style={{ fontSize:'0.82rem', color:'#d1c4e9', fontWeight:500, lineHeight:1.5, marginBottom:'0.7rem' }}>{eng.q.stem}</div>

          <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:'0.7rem' }}>
            {eng.shuffledOptions.map((opt,i)=>{
              let bord=`1px solid ${border}`,bg=panel,color='#6a5080'
              if(eng.revealed){
                if(opt.correct){bord=`1px solid ${accentColor}`;bg=`${accentColor}22`;color=accentColor}
                else if(eng.selected===opt.id){bord='1px solid #ff4444';color='#ff4444'}
                else{color='#2a1840'}
              }else if(eng.selected===opt.id){bord=`1px solid ${accentColor}`;color=accentColor}
              return(
                <div key={opt.id} onClick={()=>eng.select(opt)}
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:bg, border:bord, borderRadius:4, cursor:eng.revealed?'default':'pointer', fontSize:'0.75rem', color, transition:'all 0.15s' }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.58rem', color:'#4a1472', flexShrink:0 }}>{String.fromCharCode(65+i)}</span>
                  <span style={{flex:1}}>{opt.text}</span>
                  {eng.revealed&&opt.correct&&<span style={{flexShrink:0}}>✓</span>}
                  {eng.revealed&&eng.selected===opt.id&&!opt.correct&&<span style={{flexShrink:0,color:'#ff4444'}}>✗</span>}
                </div>
              )
            })}
          </div>

          {eng.revealed&&eng.selected&&(()=>{
            const s=eng.shuffledOptions.find(o=>o.id===eng.selected)
            return(
              <div style={{ padding:'0.8rem', background:'#120e22', border:`1px solid ${s?.correct?accentColor:'#ff4444'}`, borderLeft:`3px solid ${s?.correct?accentColor:'#ff4444'}`, borderRadius:'0 4px 4px 0', marginBottom:'0.8rem' }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:s?.correct?accentColor:'#ff4444', textTransform:'uppercase', marginBottom:4 }}>
                  {s?.correct?'✓ Correct':'✗ Incorrect'}
                </div>
                <div style={{ fontSize:'0.78rem', color:'#6a5080', lineHeight:1.6 }}>{s?.explanation}</div>
              </div>
            )
          })()}

          {eng.revealed&&(
            <button onClick={()=>eng.next(eng.allAnswers)}
              style={{ padding:'0.75rem 1.4rem', background:accentColor, color:'#fff', border:'none', borderRadius:6, fontFamily:"'Share Tech Mono',monospace", fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.1em', cursor:'pointer' }}>
              {eng.qIndex<eng.questions.length-1?'Next →':'Complete →'}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.5rem 1rem', background:'rgba(8,6,18,0.97)', borderTop:`1px solid ${border2}`, zIndex:10 }}>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:'#4a1472', textTransform:'uppercase' }}>
          {eng.timerPaused?'Paused':'Decision Window'}
        </span>
        <div style={{ flex:1, height:3, background:border, borderRadius:2, maxWidth:280, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${timerPct}%`, background:timerColor, borderRadius:2, transition:'width 1s linear' }}/>
        </div>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.72rem', color:timerColor }}>
          {eng.revealed?'—':eng.timerPaused?'⏸':`0:${String(eng.timeLeft).padStart(2,'0')}`}
        </span>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:'#4a1472' }}>Q{eng.qIndex+1}/{eng.questions.length}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN 5 — The Tribunal (Board Certification)
// ─────────────────────────────────────────────────────────────────────────────
export function SimDesign5Board({
  cls, sim, subsim, variant, accentColor, track, onAnswer, onSimComplete
}) {
  const questions = subsim?.questions || []
  const eng = useQuestionEngine(questions, onAnswer, onSimComplete)

  const [showBanner,    setShowBanner]    = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [audioPlaying,  setAudioPlaying]  = useState(false)
  const [totalTime,     setTotalTime]     = useState((cls.examConfig?.timeMinutes||30)*60)
  const audioRef = useRef(null)

  const subsimId = subsim?.id || ''
  const audioSrc = cls?.media?.audio?.[subsimId] || subsim?.audio || null
  const hasAudio = !!audioSrc
  const gold     = accentColor

  useEffect(() => {
    if (hasAudio) {
      setShowBanner(true); setShowIndicator(true)
      setTimeout(() => setShowBanner(false), 4000)
    }
  }, [])

  useEffect(() => {
    if (audioPlaying) eng.pauseTimer()
    else eng.resumeTimer()
  }, [audioPlaying])

  // Overall exam countdown (not paused by audio — separate from question timer)
  useEffect(() => {
    const t = setInterval(() => setTotalTime(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  if (!eng.q) return null

  const mins           = String(Math.floor(totalTime / 60)).padStart(2, '0')
  const secs           = String(totalTime % 60).padStart(2, '0')
  const totalQuestions = cls.examConfig?.questionCount || questions.length

  return (
    <div style={{ background:'#0c0a08', ...ecgBg('#8b6914',0.07), minHeight:'100vh', fontFamily:"'DM Sans',sans-serif", display:'flex', flexDirection:'column' }}>
      <style>{SHARED_KEYFRAMES}</style>
      {showBanner    && <AudioBanner />}
      {showIndicator && <AudioIndicator playing={audioPlaying} />}

      {/* Header */}
      <div style={{ background:'#120e0a', borderBottom:'1px solid #2a1f14', padding:'0.7rem 1.4rem', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.7rem' }}>
          <div style={{ width:20, height:20, border:`1.5px solid ${gold}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill={gold}><path d="M5 1l1 2.5L9 4 7 6l.5 3L5 8l-2.5 1L3 6 1 4l3-.5z"/></svg>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.9rem', color:gold, fontWeight:600, letterSpacing:'0.06em' }}>
            MediNova Board of Examiners
          </div>
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:'#3d2a14', textTransform:'uppercase', letterSpacing:'0.12em' }}>
          Record #{eng.qIndex+1} of {totalQuestions} · {track==='doctor'?'Physician':'Nurse'} Track
        </div>
      </div>

      {/* Examiner bar */}
      <div style={{ background:'#100c08', borderBottom:'1px solid #2a1f14', padding:'0.8rem 1.4rem', display:'flex', alignItems:'center', gap:'0.8rem', position:'relative', zIndex:2 }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:'#1a1208', border:`1.5px solid ${gold}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:gold }}>PCO</span>
        </div>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', color:'#d4a843', fontWeight:600 }}>Prof. Chukwuemeka Obi</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.5rem', color:'#3d2a14', textTransform:'uppercase', letterSpacing:'0.1em' }}>Chief of Staff · MediNova Teaching Hospital</div>
        </div>
        <div style={{ marginLeft:'auto', textAlign:'right' }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'1rem', color:totalTime<300?'#c62828':gold }}>{mins}:{secs}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.45rem', color:'#3d2a14', textTransform:'uppercase' }}>Remaining</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, padding:'1.4rem', maxWidth:760, margin:'0 auto', width:'100%', position:'relative', zIndex:2 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:'#3d2a14', textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:'0.7rem' }}>
          Question {eng.qIndex+1} of {totalQuestions} · No references · No second attempt
        </div>

        {/* Audio */}
        {hasAudio&&(
          <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', background:`${gold}0d`, border:`1px solid ${gold}33`, borderRadius:4, padding:'0.5rem 0.8rem', marginBottom:'0.8rem' }}>
            <audio ref={audioRef} src={audioSrc}
              onPlay={()=>setAudioPlaying(true)}
              onPause={()=>setAudioPlaying(false)}
              onEnded={()=>setAudioPlaying(false)}
            />
            <button onClick={()=>audioPlaying?audioRef.current?.pause():audioRef.current?.play()}
              style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', textTransform:'uppercase', padding:'4px 10px', background:'transparent', border:`1px solid ${gold}`, borderRadius:2, cursor:'pointer', color:gold, whiteSpace:'nowrap' }}>
              {audioPlaying?'■ Pause':'▶ Play Audio'}
            </button>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.52rem', color:'#3d2a14', textTransform:'uppercase' }}>
              {audioPlaying?'⏸ Timer paused':(subsim?.audioInstruction||'Listen before answering')}
            </span>
          </div>
        )}

        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:'#e8d5a0', lineHeight:1.75, marginBottom:'1.2rem' }}>{eng.q.stem}</div>

        <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:'1rem' }}>
          {eng.shuffledOptions.map((opt,i)=>{
            let bord='1px solid #2a1f14',bg='#100c08',color='#7a6040'
            if(eng.revealed){
              if(opt.correct){bord=`1px solid ${gold}`;bg=`${gold}22`;color=gold}
              else if(eng.selected===opt.id){bord='1px solid #c62828';color='#c62828'}
              else{color='#2a1f14'}
            }else if(eng.selected===opt.id){bord=`1px solid ${gold}`;color=gold}
            return(
              <div key={opt.id} onClick={()=>eng.select(opt)}
                style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'0.75rem 1rem', background:bg, border:bord, borderRadius:2, cursor:eng.revealed?'default':'pointer', transition:'all 0.2s' }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.6rem', color:'#3d2a14', flexShrink:0, paddingTop:2 }}>{String.fromCharCode(65+i)}</span>
                <span style={{ fontSize:'0.82rem', color, lineHeight:1.4, flex:1 }}>{opt.text}</span>
                {eng.revealed&&opt.correct&&<span style={{flexShrink:0,color:gold}}>✓</span>}
                {eng.revealed&&eng.selected===opt.id&&!opt.correct&&<span style={{flexShrink:0,color:'#c62828'}}>✗</span>}
              </div>
            )
          })}
        </div>

        {eng.revealed&&eng.selected&&(()=>{
          const s=eng.shuffledOptions.find(o=>o.id===eng.selected)
          return(
            <div style={{ padding:'0.9rem 1rem', background:'#120e0a', border:`1px solid ${s?.correct?gold:'#c62828'}`, borderLeft:`3px solid ${s?.correct?gold:'#c62828'}`, borderRadius:'0 3px 3px 0', marginBottom:'1rem' }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.55rem', color:s?.correct?gold:'#c62828', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5 }}>
                {s?.correct?'✓ Entered into record — Correct':'✗ Entered into record — Incorrect'}
              </div>
              <div style={{ fontSize:'0.82rem', color:'#7a6040', lineHeight:1.65 }}>{s?.explanation}</div>
            </div>
          )
        })()}

        {eng.revealed&&(
          <button onClick={()=>eng.next(eng.allAnswers)}
            style={{ padding:'0.85rem 2rem', background:gold, color:'#0c0a08', border:'none', borderRadius:2, fontFamily:"'Share Tech Mono',monospace", fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.12em', cursor:'pointer', fontWeight:600 }}>
            {eng.qIndex<eng.questions.length-1?'Next Record →':'Submit to Board →'}
          </button>
        )}
      </div>

      {/* Footer dots */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.7rem 1.4rem', background:'rgba(8,6,4,0.97)', borderTop:'1px solid #2a1f14', position:'relative', zIndex:2 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.5rem', color:'#3d2a14', textTransform:'uppercase', letterSpacing:'0.1em' }}>
          Board Examination · {eng.timerPaused?'Audio Playing — Timer Paused':'In Progress'}
        </div>
        <div style={{ display:'flex', gap:3 }}>
          {Array.from({length:totalQuestions}).map((_,i)=>(
            <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:i<eng.qIndex?gold:i===eng.qIndex?'#d4a843':'#2a1f14', boxShadow:i===eng.qIndex?`0 0 4px ${gold}`:'none' }}/>
          ))}
        </div>
      </div>
    </div>
  )
}