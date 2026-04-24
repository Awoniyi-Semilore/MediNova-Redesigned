// src/components/profile/Profile.jsx

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

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Learner'
  const themeClass = isDark ? styles.dark : styles.light

  const activeTitle = activeClass ? `Class ${activeClass.id} Active` : 'Getting Started'

  // Rotation progress within current block of 5 classes
  const rotationProgress = completedCount % 5
  const rotationTarget = 5

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar backLabel="Dashboard" backPath="/dashboard" pageTitle="My Learning Profile" />

      <ProfileHero
        name={displayName}
        role={track === 'doctor' ? "Medical Student" : "Nursing Student"}
        track={track === 'doctor' ? "Physician Track" : "Nursing Track"}
        activeClass={activeTitle}
        photoURL={currentUser?.photoURL}
        staffId={`MN-${1000 + (completedCount * 7)}`}
        email={currentUser?.email || ''}
        joined={currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2026"}
      />

      <StatStrip
        streak={streak}
        classesDone={completedCount}
        total={20}
        avgScore={avgScore}
        certificates={Math.floor(completedCount / 4)}
        simsThisPeriod={rotationProgress}
        simsTarget={rotationTarget}
      />

      <div className={styles.body}>
        <div className={styles.sectionLabel}>Performance Overview</div>
        <PerformanceReview
          name={displayName}
          simsThisPeriod={rotationProgress}
          simsTarget={rotationTarget}
          avgScore={avgScore}
        />

        <div className={styles.sectionLabel}>Learning Progress</div>
        <ProgressBreakdown
          simsThisPeriod={rotationProgress}
          simsTarget={rotationTarget}
          avgScore={avgScore}
          overallPct={overallProgress}
          streak={streak}
        />

        <div className={styles.sectionLabel}>Account Settings</div>
        <AccountSettings currentUser={currentUser} />
      </div>
    </div>
  )
}