import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'
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

const TOUR_KEY = 'mn_tour_done'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { isDark } = useTheme()
  const { activeClass, track, loading } = useProgress()
  const [showModal, setShowModal] = useState(false)
  const [showTour, setShowTour] = useState(false)

  const displayName = currentUser?.displayName
    || currentUser?.email?.split('@')[0]
    || 'Doctor'

  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY)
    if (!done) setShowModal(true)
  }, [])

  function handleStartTour() {
    setShowModal(false)
    setTimeout(() => setShowTour(true), 300)
  }

  function handleSkipModal() {
    setShowModal(false)
    localStorage.setItem(TOUR_KEY, 'true')
  }

  function handleEndTour() {
    setShowTour(false)
    localStorage.setItem(TOUR_KEY, 'true')
  }

  const themeClass = isDark ? styles.dark : styles.light
  const activeTitle = activeClass
    ? `Class ${activeClass.num} — ${activeClass.title}`
    : 'Getting Started'

  if (loading) return (
    <div className={`${styles.app} ${themeClass}`} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: 'Share Tech Mono, monospace',
      fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em',
      color: '#64b5f6'
    }}>
      Loading your ward...
    </div>
  )

  return (
    <div className={`${styles.app} ${themeClass}`} data-dashboard>
      <TopBar pageTitle="Clinical Workstation · v2.4" />

      <div className={styles.bgStrip}>
        <img
          className={styles.bgImg}
          src="/images/reception.jpeg"
          alt="MediNova Reception"
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.mainContent}>
        <WelcomeStrip
          name={displayName}
          track={track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
          activeClass={activeTitle}
        />
        <StreakBar />
        <VitalsRow />
        <div className={styles.twoCol}>
          <WardMap />
          <div className={styles.colRight}>
            <ShiftBoard />
            <CertificateCase />
          </div>
        </div>
        <UrgentPages />
      </div>

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