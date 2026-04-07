import styles from '../../styles/profile.module.css'

export default function ProgressBreakdown({ simsThisPeriod, simsTarget, avgScore, urgentDone, urgentTotal, overallPct, streak }) {
  const bars = [
    { name: 'Rotation Simulations', val: `${simsThisPeriod} / ${simsTarget}`, pct: Math.min(100, Math.round((simsThisPeriod / simsTarget) * 100)), color: styles.pfAmber },
    { name: 'Clinical Accuracy', val: `${avgScore}%`, pct: avgScore, color: styles.pfBlue },
    { name: 'Urgent Response Rate', val: `${urgentDone} / ${urgentTotal}`, pct: urgentTotal > 0 ? Math.round((urgentDone / urgentTotal) * 100) : 0, color: styles.pfRed },
    { name: 'Total Curriculum Progress', val: `${overallPct}%`, pct: overallPct, color: styles.pfGreen },
    { name: 'Weekly Attendance', val: `${streak} / 7 days`, pct: Math.min(100, Math.round((streak / 7) * 100)), color: styles.pfBlue },
  ]

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div className={styles.chLeft}>
          <div className={styles.chCross}>
            <svg width="7" height="7" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.chTitle}>Clinical Progress Breakdown</div>
        </div>
        <span className={`${styles.chBadge} ${styles.badgeInfo}`}>Live Audit</span>
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