// src/components/simulation/SimDebrief.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SimulationDebrief — per-simulation debrief shown after each sub-simulation
// ClassDebrief      — post-class summary with working PDF download button
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATION DEBRIEF
// ─────────────────────────────────────────────────────────────────────────────
export function SimulationDebrief({
  cls, sim, subsim, answers, score, accentColor, theme, level, onContinue
}) {
  const [expanded, setExpanded] = useState(new Set())
  const passed    = score >= (cls?.passMark || 70)
  const questions = subsim?.questions || []

  function toggle(id) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function getAnswerForQuestion(qId) {
    return answers.find(a => a.questionId === qId)
  }

  const correct   = answers.filter(a => a.correct).length
  const total     = answers.length
  const avgTime   = total > 0
    ? Math.round(answers.reduce((s, a) => s + (a.timeMs || 0), 0) / total / 1000)
    : 0

  const isDark        = ['junior_residency', 'fellowship', 'board_certification'].includes(level)
  const bg            = isDark ? '#0a0f1a' : '#f4f7fc'
  const cardBg        = isDark ? '#0d1828' : '#fff'
  const textPrimary   = isDark ? '#e8f0f7' : '#0d2d5e'
  const textSecondary = isDark ? 'rgba(255,255,255,0.5)' : '#607d8b'
  const border        = isDark ? 'rgba(255,255,255,0.08)' : '#dce8f5'

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", paddingBottom: '4rem' }}>

      {/* Header */}
      <div style={{ background: '#0d2d5e', borderBottom: '2px solid #c62828', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{ width: 20, height: 20, background: '#c62828', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Simulation Review · {subsim?.title || sim?.title}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>
            {cls.title}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.6rem 1.4rem' }}>

        {/* Score card */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden', marginBottom: '1.4rem' }}>
          <div style={{ background: passed ? 'rgba(46,125,50,0.08)' : 'rgba(198,40,40,0.06)', borderBottom: `1px solid ${border}`, padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 600, lineHeight: 1, color: passed ? '#2e7d32' : accentColor }}>
                {score}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                / 100
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: textPrimary, marginBottom: 4 }}>
                {passed ? 'Simulation Passed' : 'Simulation Failed — Review Required'}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {correct}/{total} Correct · Avg response {avgTime}s · Pass mark {cls.passMark}%
              </div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: passed ? 'rgba(46,125,50,0.12)' : 'rgba(198,40,40,0.1)', border: `2px solid ${passed ? '#2e7d32' : accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: passed ? '#2e7d32' : accentColor, flexShrink: 0 }}>
              {passed ? '✓' : '✗'}
            </div>
          </div>

          {/* Right / wrong */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${border}` }}>
            <div style={{ padding: '0.9rem 1.1rem', borderRight: `1px solid ${border}` }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#2e7d32', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                ✓ What you got right
              </div>
              {answers.filter(a => a.correct).length === 0
                ? <div style={{ fontSize: '0.75rem', color: textSecondary }}>None correct this attempt.</div>
                : answers.filter(a => a.correct).map((a, i) => {
                    const q = questions.find(q => q.id === a.questionId)
                    return (
                      <div key={i} style={{ fontSize: '0.75rem', color: textSecondary, marginBottom: 3, display: 'flex', gap: 5 }}>
                        <span style={{ color: '#2e7d32', flexShrink: 0 }}>✓</span>
                        <span>{q?.stem?.slice(0, 55)}…</span>
                      </div>
                    )
                  })
              }
            </div>
            <div style={{ padding: '0.9rem 1.1rem' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                ✗ Where to improve
              </div>
              {answers.filter(a => !a.correct).length === 0
                ? <div style={{ fontSize: '0.75rem', color: '#2e7d32' }}>All questions answered correctly.</div>
                : answers.filter(a => !a.correct).map((a, i) => {
                    const q = questions.find(q => q.id === a.questionId)
                    return (
                      <div key={i} style={{ fontSize: '0.75rem', color: textSecondary, marginBottom: 3, display: 'flex', gap: 5 }}>
                        <span style={{ color: accentColor, flexShrink: 0 }}>✗</span>
                        <span>{q?.stem?.slice(0, 55)}…</span>
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>

        {/* Question-by-question review */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '0.8rem' }}>
          Question Review
        </div>

        {questions.map((q, i) => {
          const answer     = getAnswerForQuestion(q.id)
          const isOpen     = expanded.has(q.id)
          const wasCorrect = answer?.correct
          const correctOpt = q.options?.find(o => o.correct)

          return (
            <div key={q.id} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 10, marginBottom: '0.6rem', overflow: 'hidden' }}>
              <div onClick={() => toggle(q.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', cursor: 'pointer' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: wasCorrect ? 'rgba(46,125,50,0.12)' : 'rgba(198,40,40,0.08)', border: `1.5px solid ${wasCorrect ? '#2e7d32' : accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: wasCorrect ? '#2e7d32' : accentColor, flexShrink: 0 }}>
                  {wasCorrect ? '✓' : '✗'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: textPrimary, marginBottom: 2 }}>Q{i + 1} — {q.stem?.slice(0, 60)}…</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: textSecondary, textTransform: 'uppercase' }}>
                    {answer ? `${Math.round((answer.timeMs || 0) / 1000)}s` : 'No response'} · {wasCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <svg style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', flexShrink: 0 }} width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={textSecondary} strokeWidth="1.5">
                  <path d="M3 6l5 5 5-5"/>
                </svg>
              </div>

              {isOpen && (
                <div style={{ borderTop: `1px solid ${border}`, padding: '0.9rem 1rem' }}>
                  <div style={{ fontSize: '0.82rem', color: textPrimary, marginBottom: '0.8rem', lineHeight: 1.5 }}>{q.stem}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '0.8rem' }}>
                    {q.options?.map(opt => {
                      const isSel = opt.id === answer?.selectedId
                      const isCor = opt.correct
                      let bg2 = 'transparent', col = textSecondary, bord = '1px solid transparent'
                      if (isCor)           { bg2 = 'rgba(46,125,50,0.06)';  col = '#2e7d32';    bord = '1px solid rgba(46,125,50,0.2)' }
                      if (isSel && !isCor) { bg2 = 'rgba(198,40,40,0.05)'; col = accentColor; bord = `1px solid rgba(198,40,40,0.2)` }
                      return (
                        <div key={opt.id} style={{ padding: '7px 10px', background: bg2, border: bord, borderRadius: 6, display: 'flex', gap: 8, fontSize: '0.78rem', color: col }}>
                          {isCor ? '✓' : isSel ? '✗' : '○'} {opt.text}
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ padding: '0.7rem 0.9rem', background: wasCorrect ? 'rgba(46,125,50,0.06)' : `${accentColor}0d`, border: `1px solid ${wasCorrect ? 'rgba(46,125,50,0.2)' : `${accentColor}33`}`, borderRadius: 8, fontSize: '0.8rem', color: textSecondary, lineHeight: 1.6 }}>
                    <strong style={{ color: wasCorrect ? '#2e7d32' : accentColor }}>Clinical Pearl: </strong>
                    {correctOpt?.explanation}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Clinical debrief */}
        {subsim?.debrief && (
          <>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '0.8rem', marginTop: '1.2rem' }}>
              Clinical Debrief
            </div>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 12, padding: '1.2rem 1.3rem', marginBottom: '1.4rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: textPrimary, lineHeight: 1.75, borderLeft: `3px solid ${accentColor}`, paddingLeft: '1rem', marginBottom: '1rem' }}>
                {subsim.debrief.summary}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                Key Points
              </div>
              {subsim.debrief.keyPoints?.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, fontSize: '0.78rem', color: textSecondary }}>
                  <span style={{ color: accentColor, flexShrink: 0 }}>·</span>
                  <span>{pt}</span>
                </div>
              ))}
              {subsim.debrief.clinicalPearl && (
                <div style={{ marginTop: '0.8rem', padding: '0.7rem 0.9rem', background: `${accentColor}0d`, border: `1px solid ${accentColor}33`, borderRadius: 8 }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: accentColor, textTransform: 'uppercase', marginBottom: 4 }}>Clinical Pearl</div>
                  <div style={{ fontSize: '0.8rem', color: textSecondary, lineHeight: 1.6 }}>{subsim.debrief.clinicalPearl}</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Continue */}
        <button
          onClick={onContinue}
          style={{ width: '100%', padding: '0.9rem', background: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// CLASS DEBRIEF
// ─────────────────────────────────────────────────────────────────────────────
export function ClassDebrief({ cls, answers, track, accentColor, onDone }) {
  const total   = answers.length
  const correct = answers.filter(a => a.correct).length
  const score   = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed  = score >= (cls?.passMark || 70)
  const avgTime = total > 0
    ? Math.round(answers.reduce((s, a) => s + (a.timeMs || 0), 0) / total / 1000)
    : 0

  const debrief = cls?.classDebrief

  // PDF file lives at /public/pdfs/class01.pdf, class02.pdf, etc.
  const pdfNum          = String(cls.id).padStart(2, '0')
  const pdfPath         = `/pdfs/class${pdfNum}.pdf`
  const pdfDownloadName = `MediNova_Class${cls.num}_${cls.title.replace(/\s+/g, '')}.pdf`

  return (
    <div style={{ background: '#f4f7fc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", paddingBottom: '4rem' }}>

      {/* Header */}
      <div style={{ background: '#0d2d5e', borderBottom: '2px solid #c62828', padding: '1rem 2rem' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>
          Class Complete · {track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#fff', fontWeight: 600 }}>
          {cls.title} —{' '}
          <em style={{ fontStyle: 'italic', color: '#ef9a9a' }}>Case File Closed.</em>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.6rem 1.4rem' }}>

        {/* Overall score */}
        <div style={{ background: '#fff', border: '1px solid #dce8f5', borderRadius: 12, padding: '1.4rem', marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', fontWeight: 600, color: passed ? '#2e7d32' : accentColor, lineHeight: 1 }}>
              {score}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#90a4ae', textTransform: 'uppercase' }}>
              Final Score
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: '#0d2d5e', marginBottom: 4 }}>
              {passed ? '✓ Class Passed' : '✗ Class Failed — Retry Available'}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#607d8b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
              {correct}/{total} questions correct · {avgTime}s avg response · +{passed ? cls.xpReward : Math.round(cls.xpReward * 0.3)} XP earned
            </div>
            <div style={{ height: 8, background: '#e3eaf6', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${score}%`, background: passed ? '#2e7d32' : accentColor, borderRadius: 4, transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#90a4ae' }}>0</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#1565c0' }}>Pass: {cls.passMark}%</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#90a4ae' }}>100</span>
            </div>
          </div>
        </div>

        {/* Debrief sections */}
        {debrief?.sections?.map((section, si) => (
          <div key={si} style={{ background: '#fff', border: '1px solid #dce8f5', borderRadius: 12, padding: '1.1rem 1.3rem', marginBottom: '0.8rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem', paddingBottom: '0.4rem', borderBottom: '1px solid #f0f4f8' }}>
              {section.heading}
            </div>
            {section.items?.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', gap: 8, marginBottom: 5, fontSize: '0.8rem', color: '#37474f', lineHeight: 1.5 }}>
                <span style={{ color: accentColor, flexShrink: 0 }}>·</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}

        {/* Certificate progress hint */}
        <div style={{ background: 'rgba(249,168,37,0.05)', border: '1px solid rgba(249,168,37,0.2)', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>⭐</div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0d2d5e', marginBottom: 2 }}>
              Certificate Progress
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#607d8b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Complete all classes in this group to earn the {cls.level.replace(/_/g, ' ')} certificate
            </div>
          </div>
        </div>

        {/* ── PDF DOWNLOAD CARD ─────────────────────────────────────────────── */}
        <div style={{ background: '#fff', border: '1px solid #dce8f5', borderRadius: 12, overflow: 'hidden', marginBottom: '1.4rem' }}>

          {/* Navy header */}
          <div style={{ background: '#0d2d5e', padding: '0.8rem 1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 16, height: 16, background: '#c62828', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                <rect x="4" y="0" width="2" height="10"/>
                <rect x="0" y="4" width="10" height="2"/>
              </svg>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Clinical Learning Summary — Available for Download
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '1.1rem 1.3rem' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: '#0d2d5e', marginBottom: 4 }}>
              {cls.title} — Class {cls.num} Summary
            </div>
            <div style={{ fontSize: '0.8rem', color: '#607d8b', marginBottom: '1rem', lineHeight: 1.65 }}>
              A 6-page clinical reference document covering every topic in this class.
              Includes frameworks, examination tables, NEWS2 scoring, sepsis recognition,
              paediatric assessment, Manchester Triage, and key references. Authored by
              the Chief of Staff. Formatted for print and digital use.
            </div>

            {/* Download button */}
            <a
              href={pdfPath}
              download={pdfDownloadName}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: accentColor,
                color: '#fff',
                borderRadius: 7,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.88'}
              onMouseOut={e  => e.currentTarget.style.opacity = '1'}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M5 7l3 3 3-3"/>
                <path d="M3 13h10"/>
              </svg>
              Download PDF — Class {cls.num}
            </a>

            {/* File location reminder for developer */}
            <div style={{ marginTop: '0.7rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: '#b0bec5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              File path: /public/pdfs/class{pdfNum}.pdf
            </div>
          </div>
        </div>
        {/* ──────────────────────────────────────────────────────────────────── */}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button
            onClick={onDone}
            style={{ flex: 1, padding: '0.9rem', background: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}
          >
            Return to Ward Map →
          </button>
          {!passed && (
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.9rem 1.4rem', background: 'transparent', color: accentColor, border: `1.5px solid ${accentColor}`, borderRadius: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}
            >
              Retry
            </button>
          )}
        </div>

      </div>
    </div>
  )
}