import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/profile.module.css'
import TopBar from '../shared/TopBar'
import ProfileHero from './ProfileHero'
import StatStrip from './StatStrip'
import PerformanceReview from './PerformanceReview'
import ProgressBreakdown from './ProgressBreakdown'
import AccountSettings from './AccountSettings'

export default function Profile() {
  const { currentUser } = useAuth()
  const { isDark } = useTheme()
  const { streak, completedCount, overallProgress, avgScore, track, activeClass } = useProgress()

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Doctor'
  const themeClass = isDark ? styles.dark : styles.light

  const activeTitle = activeClass ? `Class ${activeClass.num} Active` : 'Curriculum Starting'

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar backLabel="Dashboard" backPath="/dashboard" pageTitle="Staff Dossier · Confidential" />

      <ProfileHero
        name={displayName}
        role={track === 'doctor' ? "Attending Physician" : "Head Nurse"}
        track={track === 'doctor' ? "Physician Track" : "Nursing Track"}
        activeClass={activeTitle}
        photoURL={currentUser?.photoURL}
        staffId={`MN-${1000 + (completedCount * 7)}`}
        email={currentUser?.email || ''}
        joined="March 2025"
      />

      <StatStrip
        streak={streak}
        classesDone={completedCount}
        total={20}
        avgScore={avgScore}
        certificates={Math.floor(completedCount / 4)}
        simsThisPeriod={completedCount % 5}
        simsTarget={5}
      />

      <div className={styles.body}>
        <div className={styles.sectionLabel}>Clinical Performance Review</div>
        <PerformanceReview
          name={displayName}
          simsThisPeriod={completedCount % 5}
          simsTarget={5}
          simsUrgent={0}
          urgentTarget={2}
          avgScore={avgScore}
        />

        <div className={styles.sectionLabel}>Progress Breakdown</div>
        <ProgressBreakdown
          simsThisPeriod={completedCount % 5}
          simsTarget={5}
          avgScore={avgScore}
          urgentDone={0}
          urgentTotal={2}
          overallPct={overallProgress}
          streak={streak}
        />

        <div className={styles.sectionLabel}>Account Settings</div>
        <AccountSettings currentUser={currentUser} />
      </div>
    </div>
  )
}