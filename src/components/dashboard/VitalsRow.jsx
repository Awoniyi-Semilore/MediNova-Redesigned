import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function VitalsRow() {
  const { results, streak, avgScore, completedCount } = useProgress()

  return (
    <div className={styles.vitals}>
      {/* Clinical Streak */}
      <div className={`${styles.vc} ${styles.vcBlue}`}>
        <div className={styles.vcLabel}>Clinical Streak</div>
        <div className={styles.vcVal}>{streak || 0}<small>d</small></div>
        <div className={`${styles.vcChg} ${styles.chgUp}`}>Active Duty</div>
      </div>

      {/* Cases Solved */}
      <div className={`${styles.vc} ${styles.vcGreen}`}>
        <div className={styles.vcLabel}>Cases Solved</div>
        <div className={styles.vcVal}>{completedCount || 0}<small>/20</small></div>
        <div className={`${styles.vcChg} ${styles.chgUp}`}>Total Progress</div>
      </div>

      {/* Avg Accuracy */}
      <div className={`${styles.vc} ${styles.vcAmber}`}>
        <div className={styles.vcLabel}>Avg. Accuracy</div>
        <div className={styles.vcVal}>{avgScore || 0}<small>%</small></div>
        <div className={`${styles.vcChg} ${styles.chgWarn}`}>Quality of Care</div>
      </div>

      {/* Sims Run */}
      <div className={`${styles.vc} ${styles.vcRed}`}>
        <div className={styles.vcLabel}>Sims Run</div>
        <div className={styles.vcVal}>{results?.length || 0}<small>s</small></div>
        <div className={`${styles.vcChg} ${styles.chgRed}`}>Training Volume</div>
      </div>
    </div>
  )
}