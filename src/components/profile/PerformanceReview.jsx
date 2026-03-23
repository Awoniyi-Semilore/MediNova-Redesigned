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
  const first = name?.split(' ')[0] || 'Doctor'
  const remaining = Math.max(0, simsTarget - simsThisPeriod)

  if (simsThisPeriod >= simsTarget && avgScore >= 75) {
    return {
      status: 'satisfactory',
      badge: 'Satisfactory',
      message: `Dr. ${first}, your performance during this review period meets the expected clinical standard. You have completed all ${simsTarget} required simulations with a commendable average score of ${avgScore}%. Your consistency of engagement is noted and appreciated. Continue at this standard and you will be well placed for advancement to the higher ward floors ahead of schedule. The department is proud of your progress.`
    }
  }

  if (simsThisPeriod >= simsTarget && avgScore < 75) {
    return {
      status: 'warn',
      badge: 'Score Review Required',
      message: `Dr. ${first}, while your simulation frequency this period meets the minimum requirement, your average score of ${avgScore}% falls below the acceptable clinical threshold of 75%. Completing simulations without achieving the required standard does not constitute satisfactory progress. You are advised to revisit the debrief materials for your recent sessions and focus on accuracy before your next review.`
    }
  }

  return {
    status: 'warn',
    badge: 'Needs Improvement',
    message: `Dr. ${first}, your performance report for the current review period has been assessed. Only ${simsThisPeriod} of the required ${simsTarget} simulations have been completed, placing your activity below the expected clinical threshold. Your average score of ${avgScore}% is commendable — however, consistency of engagement is equally critical to your progression. Failure to meet the minimum simulation requirement in the next review period will result in a formal caution and temporary restriction of access to advanced ward floors. You are strongly encouraged to complete at least ${remaining} additional simulation${remaining > 1 ? 's' : ''} before the next appraisal.`
  }
}

export default function PerformanceReview({
  name,
  simsThisPeriod,
  simsTarget,
  simsUrgent,
  urgentTarget,
  avgScore
}) {
  const [nextMonday, setNextMonday] = useState(getNextMonday)
  const [countdown, setCountdown] = useState('')
  const [periodPct, setPeriodPct] = useState(0)
  const [review, setReview] = useState(() =>
    buildReview(simsThisPeriod, simsTarget, avgScore, name)
  )
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
        const newMonday = getNextMonday()
        refreshReview(newMonday)
        return
      }

      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(
        `${String(d).padStart(2,'0')}d ` +
        `${String(h).padStart(2,'0')}h ` +
        `${String(m).padStart(2,'0')}m ` +
        `${String(s).padStart(2,'0')}s`
      )
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [nextMonday, refreshReview])

  useEffect(() => {
    setReview(buildReview(simsThisPeriod, simsTarget, avgScore, name))
  }, [simsThisPeriod, simsTarget, avgScore, name])

  const simsBarPct = Math.round((simsThisPeriod / simsTarget) * 100)
  const urgentBarPct = urgentTarget > 0
    ? Math.round((simsUrgent / urgentTarget) * 100)
    : 0

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <div className={styles.rhCross}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
            <rect x="4" y="0" width="2" height="10"/>
            <rect x="0" y="4" width="10" height="2"/>
          </svg>
        </div>
        <div className={styles.rhTitle}>Weekly Appraisal · Chief of Staff</div>
        {justReset && (
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.58rem',
            color: '#4caf50',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginRight: 'auto',
            marginLeft: '0.8rem'
          }}>
            ↺ Review Updated
          </div>
        )}
        <div className={`${styles.rhBadge} ${review.status === 'satisfactory' ? styles.rhOk : styles.rhWarn}`}>
          {review.badge}
        </div>
      </div>

      <div className={styles.reviewBody}>
        <div className={styles.reviewInner}>
          <div className={styles.rvSeal}>
            <div className={styles.rvSealIcon}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
                stroke="#64b5f6" strokeWidth="1.5">
                <circle cx="8" cy="5" r="3"/>
                <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
              </svg>
            </div>
            <div>
              <div className={styles.rvSealTitle}>Prof. Chukwuemeka Obi</div>
              <div className={styles.rvSealSub}>
                Chief of Staff · MediNova Teaching Hospital
              </div>
            </div>
          </div>

          <div className={styles.rvDivider} />

          <div className={styles.rvMessage}>
            {review.message}
          </div>

          <div className={styles.rvMetrics}>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Simulations</div>
              <div className={styles.rvMVal}>{simsThisPeriod}/{simsTarget}</div>
              <div className={styles.rvMBar}>
                <div
                  className={`${styles.rvMFill} ${styles.fillWarn}`}
                  style={{ width: `${simsBarPct}%` }}
                />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Urgent Pages</div>
              <div className={styles.rvMVal}>{simsUrgent}/{urgentTarget}</div>
              <div className={styles.rvMBar}>
                <div
                  className={`${styles.rvMFill} ${styles.fillRed}`}
                  style={{ width: `${urgentBarPct}%` }}
                />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Avg Score</div>
              <div className={styles.rvMVal}>{avgScore}%</div>
              <div className={styles.rvMBar}>
                <div
                  className={`${styles.rvMFill} ${styles.fillBlue}`}
                  style={{ width: `${avgScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.countdownStrip}>
          <div className={styles.cdLeft}>
            <div className={styles.cdLabel}>Next Appraisal In</div>
            <div className={styles.cdTime}>{countdown}</div>
            <div className={styles.cdNote}>Resets every Monday · 00:00</div>
          </div>
          <div className={styles.cdProg}>
            <div className={styles.cdProgRow}>
              <span>Period elapsed</span>
              <span>{periodPct}%</span>
            </div>
            <div className={styles.cdTrack}>
              <div className={styles.cdFill} style={{ width: `${periodPct}%` }} />
            </div>
          </div>
          <div className={styles.cdRight}>
            <div className={styles.cdRLabel}>Sims Still Needed</div>
            <div className={styles.cdRVal}>
              {Math.max(0, simsTarget - simsThisPeriod)}
            </div>
            <div className={styles.cdRSub}>Before next review</div>
          </div>
        </div>
      </div>
    </div>
  )
}