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

const TOUR_KEY = 'mn_tour_done'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { isDark } = useTheme() // Assuming useTheme provides isDark
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

  // This applies the .dark or .light class from your CSS
  const themeClass = isDark ? styles.dark : styles.light
  
  const activeTitle = activeClass
    ? `Class ${activeClass.num} — ${activeClass.title}`
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
    <div className={`${styles.app} ${themeClass}`}>
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
            {/* UrgentPages moved inside/below for better balance if needed, 
                or kept at bottom per your previous code */}
            <div style={{ marginTop: '1.1rem' }}>
                <UrgentPages />
            </div>
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