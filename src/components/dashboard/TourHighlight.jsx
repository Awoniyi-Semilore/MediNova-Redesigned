// src/components/dashboard/Dashboard.jsx

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

// Components
import TopBar from '../shared/TopBar'
import WelcomeStrip from './WelcomeStrip'
import StreakBar from './StreakBar'
import VitalsRow from './VitalsRow'
import WardMap from './WardMap'
import ShiftBoard from './ShiftBoard'
import CertificateCase from './CertificateCase'
import UrgentPages from './UrgentPages'
import WelcomeModal from './WelcomeModal'
import TourHighlight from './TourHighlight'

// ✅ FIXED: Key changed so tour shows on EVERY fresh login
// We clear this on logout, so each new login = fresh tour
const TOUR_KEY = 'mn_tour_session'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { isDark } = useTheme() 
  const { activeClass, track, loading } = useProgress()
  const [showModal, setShowModal] = useState(false)
  const [showTour, setShowTour] = useState(false)

  const displayName = currentUser?.displayName
    || currentUser?.email?.split('@')[0]
    || 'Doctor'

  // ✅ FIXED: Show tour EVERY time dashboard mounts with no session flag
  // This means: every login = tour shows. Logout clears the flag.
  useEffect(() => {
    const sessionDone = sessionStorage.getItem(TOUR_KEY)
    if (!sessionDone) {
      setShowModal(true)
    }
  }, [])

  function handleStartTour() {
    setShowModal(false)
    setTimeout(() => setShowTour(true), 300)
  }

  function handleSkipModal() {
    setShowModal(false)
    sessionStorage.setItem(TOUR_KEY, 'true')
  }

  function handleEndTour() {
    setShowTour(false)
    sessionStorage.setItem(TOUR_KEY, 'true')
  }

  const themeClass = isDark ? styles.dark : styles.light

  const activeTitle = activeClass
    ? `Class ${activeClass.id} — ${activeClass.title}`
    : 'Residency Initializing...'

  if (loading) return (
    <div className={`${styles.app} ${themeClass}`} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: 'Share Tech Mono, monospace',
      color: '#1565c0'
    }}>
      <div className={styles.tbLiveDot} style={{ marginRight: '10px' }} />
      UPDATING CLINICAL RECORDS...
    </div>
  )

  return (
    <div className={`${styles.app} ${themeClass}`} data-dashboard>
      <TopBar />

      <div className={styles.bgStrip}>
        <img
          className={styles.bgImg}
          src="/images/reception.jpeg"
          alt="MediNova Reception"
        />
        <div className={styles.bgOverlay} />
      </div>

      <main className={styles.mainContent}>
        <WelcomeStrip
          name={displayName}
          track={track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
          activeClass={activeTitle}
        />

        <StreakBar />

        <VitalsRow />

        <div className={styles.twoCol}>
          <div className={styles.colLeft}>
            <WardMap />
          </div>

          <div className={styles.colRight}>
            <ShiftBoard />
            <CertificateCase />
          </div>
        </div>
      </main>

      {showModal && (
        <WelcomeModal
          onStartTour={handleStartTour}
          onSkip={handleSkipModal}
        />
      )}

      {showTour && (
        <TourHighlight onEnd={handleEndTour} />
      )}
    </div>
  )
}
