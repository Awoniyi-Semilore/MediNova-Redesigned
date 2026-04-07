// src/components/simulation/SimDebrief.jsx
import { useState, useEffect } from 'react'

/**
 * SIMULATION DEBRIEF 
 * Shown after each individual sub-simulation (e.g., after Case 1.1)
 */
export function SimulationDebrief({
  cls, 
  sim, 
  subsim, 
  answers, 
  score, 
  accentColor, 
  level, 
  onContinue 
}) {
  const [expanded, setExpanded] = useState(new Set())
  const passed = score >= (cls?.passMark || 70)
  const questions = subsim?.questions || []

  const toggle = (id) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const getAnswerForQuestion = (qId) => answers.find(a => a.questionId === qId)
  const correct = answers.filter(a => a.correct).length
  const total = answers.length
  const avgTime = total > 0
    ? Math.round(answers.reduce((s, a) => s + (a.timeMs || 0), 0) / total / 1000)
    : 0

  const isDark = ['junior_residency', 'fellowship', 'board_certification'].includes(level)
  const bg = isDark ? '#070f1a' : '#f4f7fc'
  const cardBg = isDark ? '#0d1828' : '#fff'
  const textPrimary = isDark ? '#e8f0f7' : '#0d2d5e'
  const textSecondary = isDark ? 'rgba(255,255,255,0.5)' : '#607d8b'
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#dce8f5'

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", paddingBottom: '4rem' }}>
      {/* Dynamic Header */}
      <div style={{ background: '#0d2d5e', borderBottom: `2px solid ${accentColor}`, padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{ width: 20, height: 20, background: accentColor, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Simulation Review · {subsim?.title || sim?.title}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>
            {cls?.title || "Clinical Case"}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.6rem 1.4rem' }}>
        {/* Vitals / Score Card */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden', marginBottom: '1.4rem' }}>
          <div style={{ background: passed ? 'rgba(46,125,50,0.08)' : 'rgba(198,40,40,0.06)', borderBottom: `1px solid ${border}`, padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 600, color: passed ? '#2e7d32' : accentColor }}>{score}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: textSecondary }}>/ 100</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: textPrimary }}>
                {passed ? 'Objective Met' : 'Remediation Suggested'}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: textSecondary }}>
                {correct}/{total} Correct · {avgTime}s Avg · Pass: {cls?.passMark || 70}%
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '1rem', borderRight: `1px solid ${border}` }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#2e7d32', marginBottom: '0.5rem' }}>CORRECT ACUMEN</div>
              {answers.filter(a => a.correct).map((a, i) => (
                <div key={i} style={{ fontSize: '0.7rem', color: textSecondary, marginBottom: 4 }}>✓ {questions.find(q => q.id === a.questionId)?.stem.slice(0, 40)}...</div>
              ))}
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: accentColor, marginBottom: '0.5rem' }}>CLINICAL GAPS</div>
              {answers.filter(a => !a.correct).map((a, i) => (
                <div key={i} style={{ fontSize: '0.7rem', color: textSecondary, marginBottom: 4 }}>✗ {questions.find(q => q.id === a.questionId)?.stem.slice(0, 40)}...</div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Review Accordion */}
        {questions.map((q, i) => {
          const ans = getAnswerForQuestion(q.id);
          const isExp = expanded.has(q.id);
          const isCor = ans?.correct;
          return (
            <div key={q.id} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 10, marginBottom: '0.6rem' }}>
              <div onClick={() => toggle(q.id)} style={{ padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: isCor ? '#2e7d32' : accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  {isCor ? '✓' : '!'}
                </div>
                <div style={{ flex: 1, fontSize: '0.85rem', color: textPrimary, fontWeight: 500 }}>{q.stem}</div>
              </div>
              {isExp && (
                <div style={{ padding: '0 1rem 1rem', borderTop: `1px solid ${border}` }}>
                  <div style={{ marginTop: '1rem' }}>
                    {q.options.map(opt => (
                      <div key={opt.id} style={{ 
                        padding: '8px', 
                        borderRadius: 6, 
                        fontSize: '0.8rem', 
                        marginBottom: 4,
                        background: opt.correct ? 'rgba(46,125,50,0.1)' : (opt.id === ans?.selectedId ? 'rgba(198,40,40,0.1)' : 'transparent'),
                        color: opt.correct ? '#2e7d32' : (opt.id === ans?.selectedId ? accentColor : textSecondary),
                        border: opt.correct ? '1px solid #2e7d32' : '1px solid transparent'
                      }}>
                        {opt.text} {opt.correct && " (Correct)"}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', padding: '10px', background: `${accentColor}11`, borderRadius: 8, fontSize: '0.8rem', color: textSecondary, borderLeft: `3px solid ${accentColor}` }}>
                    <strong>Rationale:</strong> {q.options.find(o => o.correct)?.explanation}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        <button onClick={onContinue} style={{ width: '100%', marginTop: '2rem', padding: '1rem', background: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'Share Tech Mono', monospace", cursor: 'pointer' }}>
          CONTINUE TO NEXT PHASE →
        </button>
      </div>
    </div>
  )
}

/**
 * CLASS DEBRIEF 
 * Final Summary after all sub-sims are done. Handles PDF/Certificate.
 */
export function ClassDebrief({ cls, answers, track, accentColor, onDone }) {
  const total = answers.length
  const correct = answers.filter(a => a.correct).length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = score >= (cls?.passMark || 70)
  
  const pdfNum = String(cls?.id || 1).padStart(2, '0')
  const pdfPath = `/pdfs/class${pdfNum}.pdf`
  const pdfName = `MediNova_Class${pdfNum}_Summary.pdf`

  return (
    <div style={{ background: '#f4f7fc', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: '#0d2d5e', padding: '2rem', color: '#fff' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', opacity: 0.6 }}>CASE FILE CLOSED</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600 }}>{cls?.title}</div>
      </div>

      <div style={{ maxWidth: 720, margin: '-2rem auto 0', padding: '0 1rem 4rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 600, color: passed ? '#2e7d32' : accentColor }}>{score}%</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: '#607d8b' }}>FINAL ASSESSMENT SCORE</div>
          
          <div style={{ margin: '2rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: 8, fontSize: '0.9rem' }}>
            {cls?.classDebrief?.sections?.[0]?.items?.[0] || "Case completed successfully."}
          </div>

          {/* PDF DOWNLOAD SECTION */}
          <div style={{ border: '1px dashed #dce8f5', padding: '1.5rem', borderRadius: 12, marginTop: '2rem' }}>
            <div style={{ fontSize: '0.9rem', color: '#0d2d5e', fontWeight: 600, marginBottom: '0.5rem' }}>Clinical Reference Guide</div>
            <p style={{ fontSize: '0.75rem', color: '#607d8b', marginBottom: '1.5rem' }}>Download the complete summary for Class {cls?.num}. Contains all algorithms and pearls.</p>
            <a href={pdfPath} download={pdfName} style={{ background: accentColor, color: '#fff', padding: '0.8rem 1.5rem', borderRadius: 6, textDecoration: 'none', display: 'inline-block', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>
              DOWNLOAD SUMMARY PDF
            </a>
          </div>

          <button onClick={onDone} style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', background: '#0d2d5e', color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'Share Tech Mono', monospace", cursor: 'pointer' }}>
            RETURN TO WARD MAP
          </button>
        </div>
      </div>
    </div>
  )
}