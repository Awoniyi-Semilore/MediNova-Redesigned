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
      message: `Dr. ${first}, your performance during this review period meets the clinical standard. With an average accuracy of ${avgScore}%, your quality of care is commendable. Engagement remains high, and you are well-positioned for higher ward floor advancement. Keep up this standard.`
    }
  }

  if (simsThisPeriod >= simsTarget && avgScore < 75) {
    return {
      status: 'warn',
      badge: 'Review Required',
      message: `Dr. ${first}, while you meet simulation volume, your accuracy of ${avgScore}% is below the 75% threshold. Completing shifts without precision is a clinical risk. Revisit the debrief materials for your failed modules immediately.`
    }
  }

  return {
    status: 'warn',
    badge: 'Incomplete Duty',
    message: `Dr. ${first}, your appraisal shows only ${simsThisPeriod}/${simsTarget} simulations completed. While your accuracy is ${avgScore}%, consistency is mandatory for licensure. Failure to meet requirements may result in restricted floor access. Complete ${remaining} more sim${remaining > 1 ? 's' : ''} before the Monday reset.`
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

  // Cap bars at 100%
  const simsBarPct = Math.min(100, Math.round((simsThisPeriod / simsTarget) * 100))
  const urgentBarPct = urgentTarget > 0 ? Math.min(100, Math.round((simsUrgent / urgentTarget) * 100)) : 0

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <div className={styles.rhCross}>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
            <rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/>
          </svg>
        </div>
        <div className={styles.rhTitle}>Weekly Appraisal · Chief of Staff</div>
        {justReset && <div className={styles.resetToast}>↺ Records Reset</div>}
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
              <div className={styles.rvSealTitle}>Prof. Chukwuemeka Obi</div>
              <div className={styles.rvSealSub}>Chief of Staff · MediNova Teaching Hospital</div>
            </div>
          </div>

          <div className={styles.rvDivider} />
          <div className={styles.rvMessage}>{review.message}</div>

          <div className={styles.rvMetrics}>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Simulations</div>
              <div className={styles.rvMVal}>{simsThisPeriod}/{simsTarget}</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${simsBarPct < 100 ? styles.fillWarn : styles.fillBlue}`} style={{ width: `${simsBarPct}%` }} />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Urgent Pages</div>
              <div className={styles.rvMVal}>{simsUrgent}/{urgentTarget}</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${styles.fillRed}`} style={{ width: `${urgentBarPct}%` }} />
              </div>
            </div>
            <div className={styles.rvMetric}>
              <div className={styles.rvMLabel}>Avg Score</div>
              <div className={styles.rvMVal}>{avgScore}%</div>
              <div className={styles.rvMBar}>
                <div className={`${styles.rvMFill} ${avgScore < 75 ? styles.fillWarn : styles.fillBlue}`} style={{ width: `${avgScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.countdownStrip}>
          <div className={styles.cdLeft}>
            <div className={styles.cdLabel}>Next Appraisal In</div>
            <div className={styles.cdTime}>{countdown}</div>
            <div className={styles.cdNote}>Resets Monday · 00:00</div>
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
            <div className={styles.cdRLabel}>Pending Duty</div>
            <div className={styles.cdRVal}>{Math.max(0, simsTarget - simsThisPeriod)}</div>
            <div className={styles.cdRSub}>Required sims</div>
          </div>
        </div>
      </div>
    </div>
  )
}