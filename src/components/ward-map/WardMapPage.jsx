import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM, LEVELS } from '../../data/curriculum'
import TopBar from '../shared/TopBar'
import CaseFileGroup from './CaseFileGroup'
import styles from '../../styles/wardmap.module.css'

export default function WardMapPage() {
  const { isDark } = useTheme()
  const { 
    track, 
    setTrack, 
    completedCount, 
    overallProgress, 
    streak, 
    activeClass 
  } = useProgress()
  
  const [showRoleModal, setShowRoleModal] = useState(false)
  const themeClass = isDark ? styles.dark : styles.light

  // Group curriculum by levels
  const groupedCases = LEVELS.map(level => ({
    ...level,
    classes: CURRICULUM.filter(c => c.level === level.id)
  }))

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar 
        pageTitle="Ward Map · Case Files" 
        backLabel="Dashboard"
        backPath="/dashboard"
      />

      <div className={styles.scrollArea}>
        {/* HERO SECTION - The top part you wanted to maintain */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <div className={styles.heroEyebrow}>
                <div className={styles.heroAlert} />
                MediNova Teaching Hospital · Active Clinical Curriculum
              </div>
              <div className={styles.heroTitle}>
                Active <em>Case Files.</em>
              </div>
              <div className={styles.heroSub}>
                {track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
                &nbsp;·&nbsp;
                {activeClass ? `Case ${activeClass.id} Active` : 'Getting Started'}
              </div>
            </div>
            <div className={styles.heroVitals}>
              <div className={styles.hv}>
                <div className={styles.hvVal}>{completedCount}</div>
                <div className={styles.hvLbl}>Completed</div>
              </div>
              <div className={styles.hv}>
                <div className={styles.hvVal}>{streak}</div>
                <div className={styles.hvLbl}>Day Streak</div>
              </div>
              <div className={styles.hv}>
                <div className={styles.hvVal}>{overallProgress}%</div>
                <div className={styles.hvLbl}>Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* LEGEND & TRACK TOGGLE */}
        <div className={styles.legend}>
          {[
            { cls: styles.ldDone, label: 'Completed' },
            { cls: styles.ldActive, label: 'In Progress' },
            { cls: styles.ldLock, label: 'Locked' },
          ].map(l => (
            <div key={l.label} className={styles.legItem}>
              <div className={`${styles.legDot} ${l.cls}`} />
              {l.label}
            </div>
          ))}
          <div
            style={{ marginLeft: 'auto', cursor: 'pointer', fontWeight: '600', color: '#1565c0' }}
            onClick={() => setTrack(track === 'doctor' ? 'nurse' : 'doctor')}
          >
            Switch to {track === 'doctor' ? 'Nurse' : 'Physician'} Track
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className={styles.content} style={{ paddingTop: '2rem' }}>
          <div className={styles.wingsContainer}>
            {groupedCases.map(group => (
              <CaseFileGroup 
                key={group.id}
                group={group.label}
                classes={group.classes}
                track={track}
              />
            ))}
          </div>
          <div style={{ height: '6rem' }} />
        </div>
      </div>
    </div>
  )
}