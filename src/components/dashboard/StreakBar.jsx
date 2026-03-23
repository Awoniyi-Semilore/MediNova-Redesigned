import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

const TOTAL_STARS = 10

export default function StreakBar() {
  const { streak, totalXp, urgentCount } = useProgress()
  const navigate = useNavigate()

  // Generate staff ID from xp (stable per user session)
  const staffId = `MN-${String(10000 + (totalXp % 90000)).padStart(5, '0')}`

  return (
    <div className={styles.streakBar} id="streakBar">
      <div className={styles.sbLeft}>
        <div>
          <div className={styles.sbLabelText}>Login Streak</div>
          <div className={styles.sbStars}>
            {Array.from({ length: TOTAL_STARS }).map((_, i) => (
              <svg key={i} className={styles.star} viewBox="0 0 16 16">
                <path
                  className={i < streak ? styles.starOn : styles.starOff}
                  d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className={styles.sbCount}>
          {streak} <span className={styles.sbCountSub}>Day Streak</span>
        </div>
      </div>

      <div className={styles.sbRight}>
        <span className={styles.chip}>Staff ID: {staffId}</span>
        <span className={styles.chip}>XP: {totalXp.toLocaleString()}</span>
        {urgentCount > 0 && (
          <span
            className={`${styles.chip} ${styles.chipRed}`}
            onClick={() => navigate('/ward-map')}
            style={{ cursor: 'pointer' }}
          >
            {urgentCount} Urgent {urgentCount === 1 ? 'Page' : 'Pages'}
          </span>
        )}
      </div>
    </div>
  )
}