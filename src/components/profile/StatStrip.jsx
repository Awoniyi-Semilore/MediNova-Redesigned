import styles from '../../styles/profile.module.css'

const TOTAL_STARS = 10

export default function StatStrip({ streak, classesDone, total, avgScore, certificates, simsThisPeriod, simsTarget }) {
  return (
    <div className={styles.statStrip}>
      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Login Streak</div>
        <div className={styles.ssStars}>
          {Array.from({ length: TOTAL_STARS }).map((_, i) => (
            <svg key={i} className={styles.star} viewBox="0 0 16 16">
              <path
                className={i < streak ? styles.starOn : styles.starOff}
                d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"
              />
            </svg>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4 }}>
          <div className={styles.ssVal}>{streak}</div>
          <div className={`${styles.ssChg} ${styles.chgUp}`}>days</div>
        </div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Classes Done</div>
        <div className={styles.ssVal}>{classesDone}<small>/{total}</small></div>
        <div className={`${styles.ssChg} ${styles.chgUp}`}>↑ Latest Unit</div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Average Score</div>
        <div className={styles.ssVal}>{avgScore}<small>%</small></div>
        <div className={`${styles.ssChg} ${styles.chgUp}`}>Clinical Grade</div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Certificates</div>
        <div className={styles.ssVal}>{certificates}<small>/5</small></div>
        <div className={`${styles.ssChg} ${styles.chgNt}`}>Next at {Math.ceil((classesDone + 1) / 4) * 4}</div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Rotation Progress</div>
        <div className={styles.ssVal}>{simsThisPeriod}<small>/{simsTarget}</small></div>
        <div className={`${styles.ssChg} ${simsThisPeriod < simsTarget ? styles.chgDn : styles.chgUp}`}>
          {simsThisPeriod < simsTarget ? 'In Rotation' : 'Completed'}
        </div>
      </div>
    </div>
  )
}