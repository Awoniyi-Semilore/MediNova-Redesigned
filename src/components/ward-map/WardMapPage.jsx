import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM, LEVELS } from '../../data/curriculum'
import TopBar from '../shared/TopBar'
import CaseFile from './CaseFile'
import styles from '../../styles/wardmap.module.css'

// Level Accordion Component
function LevelAccordion({ level, classes, track }) {
  const [isOpen, setIsOpen] = useState(false)
  const { classStatus } = useProgress()
  
  const doneCount = classes.filter(c => classStatus(c.id) === 'done').length
  const totalCount = classes.length
  const allCompleted = doneCount === totalCount && totalCount > 0

  // Get appropriate milestone text based on level
  const getRankMilestone = (label) => {
    const goals = {
      "Clerkship": "Complete these rotations to officially join the Clerkship Team.",
      "Junior Residency": "Master these cases to earn your Junior Resident credentials.",
      "Senior Residency": "Demonstrate specialty competence to clear your Senior Residency.",
      "Fellowship": "Sub-specialty mastery. You are directing a team now.",
      "Board Certification": "Final board evaluations for Consultant status."
    }
    return goals[label] || `Master this phase to advance your clinical standing.`
  }

  return (
    <div className={`${styles.levelGroup} ${isOpen ? styles.levelGroupOpen : ''}`}>
      <div className={styles.levelHeader} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.levelInfo}>
          {/* <span className={styles.levelLabel}>Current Training Phase</span> */}
          <span className={styles.levelTitle}>{level.label}</span>
          <div className={styles.levelObjective}>{getRankMilestone(level.label)}</div>
        </div>
        <div className={styles.levelStatus}>
          <span className={styles.classCount}>
            {doneCount}/{totalCount} Complete
          </span>
          <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.levelContent}>
          <div className={styles.caseGrid}>
            {classes.map((cls) => (
              <CaseFile key={cls.id} cls={cls} track={track} />
            ))}
          </div>

          {allCompleted && (
            <div className={styles.certWrapper}>
              <button className={styles.certButton} onClick={() => window.print()}>
                Download {level.label} Clinical Certification
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Main Ward Map Page
export default function WardMapPage() {
  const { isDark } = useTheme()
  const { track, completedCount, overallProgress } = useProgress()
  
  // Apply theme class
  const themeClass = isDark ? styles.dark : styles.light

  // Group classes by level with proper string comparison
  const groupedCases = LEVELS.map(level => {
    const levelClasses = CURRICULUM.filter(c => {
      const classLevel = String(c.level).toLowerCase()
      const levelId = String(level.id).toLowerCase()
      const levelLabel = String(level.label).toLowerCase()
      return classLevel === levelId || classLevel === levelLabel
    })
    return { ...level, classes: levelClasses }
  })

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar 
        pageTitle="Clinical Ward Map" 
        backLabel="Dashboard" 
        backPath="/dashboard" 
      />

      <div className={styles.scrollArea}>
        {/* Hero Section */}
        <div className={styles.hero} style={{marginTop: '55px'}}>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <div className={styles.heroSub}>
                {track === 'doctor' ? 'Medical Officer' : 'Specialist Nurse'} Portal
              </div>
              <div className={styles.heroTitle}>
                MediNova <em>Ward Map</em>
              </div>
            </div>
            
            <div className={styles.heroVitals}>
              <div className={styles.hv}>
                <div className={styles.hvVal}>{completedCount}</div>
                <div className={styles.hvLbl}>Cleared</div>
              </div>
              <div className={styles.hv}>
                <div className={styles.hvVal}>{overallProgress}%</div>
                <div className={styles.hvLbl}>Rank Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className={styles.mapContainer}>
          {groupedCases.map(group => (
            <LevelAccordion 
              key={group.id} 
              level={group} 
              classes={group.classes} 
              track={track} 
            />
          ))}
        </div>
      </div>
    </div>
  )
};