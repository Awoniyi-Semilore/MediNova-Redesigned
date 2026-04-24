// src/components/dashboard/StreakBar.jsx

import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function StreakBar() {
  const { streak } = useProgress()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  const currentStreak = streak || 0

  // Build visual flame bars (max 7 for a week view)
  const maxBars = 7
  const filledBars = Math.min(currentStreak, maxBars)

  return (
    <div className={styles.streakBar} id="streakBar">
      {/* LEFT: Date + Icon */}
      <div className={styles.sbLeft}>
        <div className={styles.sbIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="#FFD700" stroke="#F9A825" strokeWidth="1"/>
          </svg>
        </div>
        <div className={styles.sbDateBlock}>
          <span className={styles.sbDate}>{today}</span>
          <span className={styles.sbShift}>Current Shift</span>
        </div>
      </div>

      {/* CENTER: Visual streak bars + message */}
      <div className={styles.sbCenter}>
        <div className={styles.sbBars}>
          {Array.from({ length: maxBars }).map((_, i) => (
            <div
              key={i}
              className={`${styles.sbBar} ${i < filledBars ? styles.sbBarFill : ''}`}
            />
          ))}
        </div>
        <span className={styles.sbHint}>
          {currentStreak === 0
            ? 'Complete a simulation to start your streak'
            : currentStreak === 1
            ? '1 day active — complete another simulation tomorrow'
            : currentStreak < 7
            ? `${currentStreak} days strong — keep the rhythm going`
            : `${currentStreak} days — clinical excellence sustained`}
        </span>
      </div>

      {/* RIGHT: Count + Fire */}
      <div className={styles.sbRight}>
        <div className={styles.sbCountWrap}>
          <span className={styles.sbCount}>{currentStreak}</span>
          <span className={styles.sbFire}>{currentStreak > 0 ? '🔥' : '⚡'}</span>
        </div>
        <span className={styles.sbLabel}>DAY STREAK</span>
      </div>
    </div>
  )
}
