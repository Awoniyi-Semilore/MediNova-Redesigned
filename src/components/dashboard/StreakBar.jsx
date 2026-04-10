//src/components/dashboard/StreakBar.jsx

import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function StreakBar() {
  const { streak } = useProgress()

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className={styles.streakBar} id="streakBar">
      <div className={styles.sbLeft}>
        <div className={styles.sbIcon}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9.5 6H14.5L10.5 9L12 14L8 11L4 14L5.5 9L1.5 6H6.5L8 1Z" fill="#FFD700"/>
          </svg>
        </div>
        <span className={styles.sbDate}>{today}</span>
      </div>
      
      <div className={styles.sbRight}>
        <span className={styles.sbLabel}>CURRENT STREAK</span>
        <span className={styles.sbCount}>{streak || 0}</span>
        <div className={styles.sbFire}>🔥</div>
      </div>
    </div>
  )
}