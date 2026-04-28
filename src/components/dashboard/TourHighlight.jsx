// src/components/dashboard/TourHighlight.jsx

import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/dashboard.module.css'

const HIGHLIGHTS = [
  { id: 'streakBar', title: 'Login Streak & Vitals', body: 'Your gold stars show consecutive daily logins. The stat cards show live progress — classes done, average score, certificates.' },
  { id: 'wardPanel', title: 'Ward Map', body: 'All clinical class floors at a glance. Green = completed, blue = active, yellow = next up, grey = locked.' },
  { id: 'shiftPanel', title: 'Shift Board', body: 'Your detailed class list. The active class glows blue. Complete it to unlock the next one.' },
]

export default function TourHighlight({ onEnd }) {
  const [idx, setIdx] = useState(0)
  const [box, setBox] = useState(null)
  const [tip, setTip] = useState(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    positionHighlight(idx)

    const handleResize = () => positionHighlight(idx)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [idx])

  function positionHighlight(i) {
    const el = document.getElementById(HIGHLIGHTS[i].id)
    const container = document.querySelector('[data-dashboard]')

    if (!el || !container) {
      if (i < HIGHLIGHTS.length - 1) setIdx(i + 1)
      else onEnd()
      return
    }

    // ✅ FIXED: Scroll element into view so it's not off-screen on mobile
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })

    const elRect = el.getBoundingClientRect()
    const cRect = container.getBoundingClientRect()

    const top = elRect.top - cRect.top - 4
    const left = elRect.left - cRect.left - 4
    const width = elRect.width + 8
    const height = elRect.height + 8

    setBox({ top, left, width, height })

    // ✅ FIXED: Viewport-aware positioning with mobile clamping
    const tooltipWidth = 260
    const tooltipHeight = 140
    const gap = 12

    // Calculate available space in all directions
    const spaceBelow = window.innerHeight - elRect.bottom
    const spaceAbove = elRect.top
    const spaceRight = window.innerWidth - elRect.right
    const spaceLeft = elRect.left

    let tipTop, tipLeft

    // Decide vertical position: prefer below, but flip to above if no room
    if (spaceBelow < tooltipHeight + gap && spaceAbove > tooltipHeight + gap) {
      tipTop = top - tooltipHeight - gap
    } else {
      tipTop = top + height + gap
    }

    // Horizontal: center on element, but clamp to viewport edges
    const idealLeft = left + (width / 2) - (tooltipWidth / 2)
    tipLeft = Math.max(10, Math.min(idealLeft, window.innerWidth - tooltipWidth - 10))

    // Final safety clamp for vertical (never off-screen)
    tipTop = Math.max(10, Math.min(tipTop, window.innerHeight - tooltipHeight - 10))

    setTip({
      top: tipTop,
      left: tipLeft,
      width: tooltipWidth
    })
  }

  function next() {
    if (idx >= HIGHLIGHTS.length - 1) {
      onEnd()
      return
    }
    setIdx(i => i + 1)
  }

  function skip() {
    onEnd()
  }

  const h = HIGHLIGHTS[idx]

  return (
    <div className={styles.hlBackdrop}>
      {box && (
        <div
          className={styles.hlBox}
          style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
        />
      )}

      {tip && (
        <div
          ref={tooltipRef}
          className={styles.hlTooltip}
          style={{ 
            top: tip.top, 
            left: tip.left, 
            width: tip.width,
            maxWidth: 'calc(100vw - 20px)'
          }}
        >
          <div className={styles.hlTitle}>{h.title}</div>
          <div className={styles.hlBody}>{h.body}</div>

          <div className={styles.hlNav}>
            <span className={styles.hlStep}>
              {idx + 1} of {HIGHLIGHTS.length}
            </span>

            <div className={styles.hlBtns}>
              <button className={styles.hlSkipBtn} onClick={skip}>
                Skip
              </button>

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