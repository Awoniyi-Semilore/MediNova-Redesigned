import styles from '../../styles/profile.module.css'

export default function ProgressBreakdown({ simsThisPeriod, simsTarget, avgScore, urgentDone, urgentTotal, overallPct, streak }) {
  const bars = [
    { name: 'Simulations Completed', val: `${simsThisPeriod} / ${simsTarget}`, pct: Math.round((simsThisPeriod / simsTarget) * 100), color: styles.pfAmber },
    { name: 'Average Simulation Score', val: `${avgScore}%`, pct: avgScore, color: styles.pfBlue },
    { name: 'Urgent Pages Completed', val: `${urgentDone} / ${urgentTotal}`, pct: urgentTotal > 0 ? Math.round((urgentDone / urgentTotal) * 100) : 0, color: styles.pfRed },
    { name: 'Overall Course Completion', val: `${overallPct}%`, pct: overallPct, color: styles.pfGreen },
    { name: 'Login Consistency', val: `${streak} / 7 days`, pct: Math.round((streak / 7) * 100), color: styles.pfGreen },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div className={styles.chLeft}>
          <div className={styles.chCross}>
            <svg width="7" height="7" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.chTitle}>Progress Breakdown</div>
        </div>
        <span className={`${styles.chBadge} ${styles.badgeInfo}`}>This Period</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.progList}>
          {bars.map((b) => (
            <div key={b.name} className={styles.piItem}>
              <div className={styles.piRow}>
                <span className={styles.piName}>{b.name}</span>
                <span className={styles.piVal}>{b.val}</span>
              </div>
              <div className={styles.piTrack}>
                <div className={`${styles.piFill} ${b.color}`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}