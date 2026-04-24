// src/components/profile/PerformanceReview.jsx

import { useState, useEffect, useCallback } from 'react'
import styles from '../../styles/profile.module.css'

function getNextMonday() {
  const d = new Date()
  const daysUntil = (8 - d.getDay()) % 7 || 7
  d.setDate(d.getDate() + daysUntil)
  d.setHours(0, 0, 0, 0)
  return d
}

function getPeriodPercent(nextMonday) {
  const now = new Date()
  const weekMs = 7 * 24 * 60 * 60 * 1000
  const msUntil = nextMonday - now
  const elapsed = weekMs - msUntil
  return Math.min(100, Math.max(0, Math.round((elapsed / weekMs) * 100)))
}

function buildReview(simsThisPeriod, simsTarget, avgScore, name) {
  const first = name?.split(' ')[0] || 'Learner'
  const remaining = Math.max(0, simsTarget - simsThisPeriod)

  if (simsThisPeriod >= simsTarget && avgScore >= 75) {
    return {
      status: 'satisfactory',
      badge: 'On Track',
      message: `Hi ${first}, you are doing excellent this week! With an average score of ${avgScore}%, you are mastering the material well. Your engagement is strong, and you are building great clinical reasoning skills. Keep up the fantastic work!`
    }
  }

  if (simsThisPeriod >= simsTarget && avgScore < 75) {
    return {
      status: 'warn',
      badge: 'Review Suggested',
      message: `Hi ${first}, you have completed your simulations for this period, which is great! Your accuracy is ${avgScore}%. Consider reviewing the debrief notes for any missed questions to strengthen your understanding. Every review session helps!`
    }
  }

  return {
    status: 'warn',
    badge: 'In Progress',
    message: `Hi ${first}, you have completed ${simsThisPeriod}/${simsTarget} simulations this week. Your accuracy is ${avgScore}%. Consistent practice is the key to building confidence. You only need ${remaining} more simulation${remaining > 1 ? 's' : ''} to complete this block. You have got this!`
  }
}

export default function PerformanceReview({
  name,
  simsThisPeriod,
  simsTarget,
  avgScore
}) {
  const [nextMonday, setNextMonday] = useState(getNextMonday)
  const [countdown, setCountdown] = useState('')
  const [periodPct, setPeriodPct] = useState(0)
  const [review, setReview] = useState(() => buildReview(simsThisPeriod, simsTarget, avgScore, name))
  const [justReset, setJustReset] = useState(false)

  const refreshReview = useCallback((newMonday) => {
    setReview(buildReview(simsThisPeriod, simsTarget, avgScore, name))
    setNextMonday(newMonday)
    setJustReset(true)
    setTimeout(() => setJustReset(false), 3000)
  }, [simsThisPeriod, simsTarget, avgScore, name])

  useEffect(() => {
    function tick() {
      const now = new Date()
      const diff = nextMonday - now
      setPeriodPct(getPeriodPercent(nextMonday))

      if (diff <= 0) {
        refreshReview(getNextMonday())
        return
      }

      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${String(d).padStart(2,'0')}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [nextMonday, refreshReview])

  useEffect(() => {
    setReview(buildReview(simsThisPeriod, simsTarget, avgScore, name))
  }, [simsThisPeriod, simsTarget, avgScore, name])

  const simsBarPct = Math.min(100, Math.round((simsThisPeriod / simsTarget) * 100))

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <div className={styles.rhCross}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
            <rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/>
          </svg>
        </div>
        <div className={styles.rhTitle}>Weekly Progress Check</div>
        {justReset && <div className={styles.resetToast}>New week started!</div>}
        <div className={`${styles.rhBadge} ${review.status === 'satisfactory' ? styles.rhOk : styles.rhWarn}`}>
          {review.badge}
        </div>
      </div>

      <div className={styles.reviewBody}>
        <div className={styles.reviewInner}>
          <div className={styles.rvSeal}>
            <div className={styles.rvSealIcon}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#64b5f6" strokeWidth="1.5">
                <circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
              </svg>
            </div>
            <div>
              <div className={styles.rvSealTitle}>Your Learning Coach</div>
              <div className={styles.rvSealSub}>MediNova Learning Platform</div>
            </div>
          </div>

          <div className={styles.rvDivider} />
          <div className={styles.rvMessage}>{review.message}</div>

          <div className={styles.rvMetrics}>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Simulations Done</div>
              <div className={styles.rvMVal}>{simsThisPeriod}/{simsTarget}</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${simsBarPct < 100 ? styles.fillWarn : styles.fillBlue}`} style={{ width: `${simsBarPct}%` }} />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Average Score</div>
              <div className={styles.rvMVal}>{avgScore}%</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${avgScore < 75 ? styles.fillWarn : styles.fillBlue}`} style={{ width: `${avgScore}%` }} />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Completion</div>
              <div className={styles.rvMVal}>{simsBarPct}%</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${simsBarPct < 100 ? styles.fillWarn : styles.fillBlue}`} style={{ width: `${simsBarPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.countdownStrip}>
          <div className={styles.cdLeft}>
            <div className={styles.cdLabel}>Next Week Starts In</div>
            <div className={styles.cdTime}>{countdown}</div>
            <div className={styles.cdNote}>Resets Monday at midnight</div>
          </div>
          <div className={styles.cdProg}>
            <div className={styles.cdProgRow}>
              <span>Week progress</span>
              <span>{periodPct}%</span>
            </div>
            <div className={styles.cdTrack}>
              <div className={styles.cdFill} style={{ width: `${periodPct}%` }} />
            </div>
          </div>
          <div className={styles.cdRight}>
            <div className={styles.cdRLabel}>Remaining</div>
            <div className={styles.cdRVal}>{Math.max(0, simsTarget - simsThisPeriod)}</div>
            <div className={styles.cdRSub}>Simulations</div>
          </div>
        </div>
      </div>
    </div>
  )
}