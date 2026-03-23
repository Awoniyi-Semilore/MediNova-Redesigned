import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import styles from '../../styles/profile.module.css'
import TopBar from '../shared/TopBar'
import ProfileHero from './ProfileHero'
import StatStrip from './StatStrip'
import PerformanceReview from './PerformanceReview'
import ProgressBreakdown from './ProgressBreakdown'
import AccountSettings from './AccountSettings'

const MOCK = {
  streak: 7,
  classesDone: 3,
  total: 20,
  avgScore: 84,
  certificates: 2,
  simsThisPeriod: 2,
  simsTarget: 5,
  urgentDone: 0,
  urgentTotal: 2,
  overallPct: 15,
}

export default function Profile() {
  const { currentUser } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Doctor'
  const themeClass = isDark ? styles.dark : styles.light

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar backLabel="Dashboard" backPath="/dashboard" pageTitle="Staff Dossier · Confidential" />

      <ProfileHero
        name={displayName}
        role="Attending Physician"
        track="Physician Track"
        activeClass="Class 03 Active"
        staffId="MN-48291"
        email={currentUser?.email || ''}
        joined="March 2025"
      />

      <StatStrip
        streak={MOCK.streak}
        classesDone={MOCK.classesDone}
        total={MOCK.total}
        avgScore={MOCK.avgScore}
        certificates={MOCK.certificates}
        simsThisPeriod={MOCK.simsThisPeriod}
        simsTarget={MOCK.simsTarget}
      />

      <div className={styles.body}>
        <div className={styles.sectionLabel}>Clinical Performance Review</div>
        <PerformanceReview
          name={displayName}
          simsThisPeriod={MOCK.simsThisPeriod}
          simsTarget={MOCK.simsTarget}
          simsUrgent={MOCK.urgentDone}
          urgentTarget={MOCK.urgentTotal}
          avgScore={MOCK.avgScore}
        />

        <div className={styles.sectionLabel}>Progress Breakdown</div>
        <ProgressBreakdown
          simsThisPeriod={MOCK.simsThisPeriod}
          simsTarget={MOCK.simsTarget}
          avgScore={MOCK.avgScore}
          urgentDone={MOCK.urgentDone}
          urgentTotal={MOCK.urgentTotal}
          overallPct={MOCK.overallPct}
          streak={MOCK.streak}
        />

        <div className={styles.sectionLabel}>Account Settings</div>
        <AccountSettings currentUser={currentUser} />
      </div>
    </div>
  )
}