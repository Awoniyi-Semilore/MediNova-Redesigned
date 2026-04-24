// src/components/profile/StatStrip.jsx

import styles from '../../styles/profile.module.css'

const TOTAL_STARS = 7

export default function StatStrip({ streak, classesDone, total, avgScore, certificates, simsThisPeriod, simsTarget }) {
  return (
    <div className={styles.statStrip}>
      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Learning Streak</div>
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
        <div className={styles.ssMetricRow}>
          <div className={styles.ssVal}>{streak}</div>
          <div className={`${styles.ssChg} ${styles.chgUp}`}>Day Streak</div>
        </div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Classes Completed</div>
        <div className={styles.ssVal}>{classesDone}<small>/{total}</small></div>
        <div className={`${styles.ssChg} ${styles.chgUp}`}>Keep Going</div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Average Score</div>
        <div className={styles.ssVal}>{avgScore}<small>%</small></div>
        <div className={`${styles.ssChg} ${avgScore >= 75 ? styles.chgUp : styles.chgDn}`}>
           {avgScore >= 75 ? 'Great Work' : 'Keep Practicing'}
        </div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Certificates</div>
        <div className={styles.ssVal}>{certificates}<small>/5</small></div>
        <div className={`${styles.ssChg} ${styles.chgNt}`}>Next at class {Math.ceil((classesDone + 1) / 4) * 4}</div>
      </div>

      <div className={styles.ssItem}>
        <div className={styles.ssLbl}>Current Block</div>
        <div className={styles.ssVal}>{simsThisPeriod}<small>/{simsTarget}</small></div>
        <div className={`${styles.ssChg} ${simsThisPeriod >= simsTarget ? styles.chgUp : styles.chgNt}`}>
          {simsThisPeriod >= simsTarget ? 'Block Complete' : 'In Progress'}
        </div>
      </div>
    </div>
  )
}