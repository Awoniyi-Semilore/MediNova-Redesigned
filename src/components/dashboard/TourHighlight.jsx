import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/dashboard.module.css'

const HIGHLIGHTS = [
  { id: 'streakBar', title: 'Login Streak & Vitals', body: 'Your gold stars show consecutive daily logins. The stat cards show live progress — classes done, average score, certificates, and urgent pages.' },
  { id: 'wardPanel', title: 'Ward Map', body: 'All clinical class floors at a glance. Green = completed, blue = active, yellow = next up, grey = locked. Click any cell to jump to that floor.' },
  { id: 'shiftPanel', title: 'Shift Board', body: 'Your detailed class list. The active class glows blue. Complete it to unlock the next one. Each shift contains multiple sub-simulations.' },
  // Trophy Case removed from highlights
  { id: 'urgentPanel', title: 'Urgent Pages', body: 'Daily challenges that expire at midnight. Fast, focused drills — ECG reads, drug quizzes, triage drills. Complete them to keep your streak alive.' },
]

export default function TourHighlight({ onEnd }) {
  const [idx, setIdx] = useState(0)
  const [box, setBox] = useState(null)
  const [tip, setTip] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    positionHighlight(idx)
    // Re-position on window resize to keep highlights accurate
    window.addEventListener('resize', () => positionHighlight(idx))
    return () => window.removeEventListener('resize', () => positionHighlight(idx))
  }, [idx])

  function positionHighlight(i) {
    const el = document.getElementById(HIGHLIGHTS[i].id)
    const container = document.querySelector('[data-dashboard]')
    
    if (!el || !container) {
      // If an element is missing, skip to next or end tour
      if (i < HIGHLIGHTS.length - 1) setIdx(i + 1)
      else onEnd()
      return
    }

    const elRect = el.getBoundingClientRect()
    const cRect = container.getBoundingClientRect()
    
    const top = elRect.top - cRect.top - 4
    const left = elRect.left - cRect.left - 4
    const width = elRect.width + 8
    const height = elRect.height + 8
    
    setBox({ top, left, width, height })
    
    // Positioning tooltip below the highlight
    const tipTop = top + height + 12
    const tipLeft = Math.min(left, cRect.width - 280) // 280 is approx tooltip width
    setTip({ top: tipTop, left: Math.max(8, tipLeft) })
  }

  function next() {
    if (idx >= HIGHLIGHTS.length - 1) { onEnd(); return }
    setIdx(i => i + 1)
  }

  function skip() { onEnd() }

  const h = HIGHLIGHTS[idx]

  return (
    <div className={styles.hlBackdrop} ref={containerRef}>
      {box && (
        <div className={styles.hlBox} style={{ top: box.top, left: box.left, width: box.width, height: box.height }} />
      )}
      {tip && (
        <div className={styles.hlTooltip} style={{ top: tip.top, left: tip.left }}>
          <div className={styles.hlTitle}>{h.title}</div>
          <div className={styles.hlBody}>{h.body}</div>
          <div className={styles.hlNav}>
            <span className={styles.hlStep}>{idx + 1} of {HIGHLIGHTS.length}</span>
            <div className={styles.hlBtns}>
              <button className={styles.hlSkipBtn} onClick={skip}>Skip</button>
              <button className={styles.hlNextBtn} onClick={next}>
                {idx === HIGHLIGHTS.length - 1 ? 'Finish ✓' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}