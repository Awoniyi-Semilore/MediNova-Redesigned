// src/components/ward-map/CaseFile.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/wardmap.module.css'

// Status icons for case numbers
function NumIcon({ status }) {
  if (status === 'done') return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#4caf50" strokeWidth="2.5">
      <path d="M3 8l4 4 6-6"/>
    </svg>
  )
  if (status === 'next') return (
    <svg width="9" height="9" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" fill="#0d2d5e"/>
      <circle cx="8" cy="8" r="2.5" fill="#fff"/>
    </svg>
  )
  if (status === 'chief') return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="#c62828">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/>
    </svg>
  )
  // Locked icon
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#90a4ae" strokeWidth="1.5">
      <rect x="5" y="7" width="6" height="6" rx="1"/>
      <path d="M6 7V5a2 2 0 0 1 4 0v2"/>
    </svg>
  )
}

export default function CaseFile({ cls }) {
  const navigate = useNavigate()
  const { classStatus, classScore, classAttempts } = useProgress()
  const [open, setOpen] = useState(false)

  // FIX: classStatus returns 'done', 'next', or 'locked' — NOT 'active'
  const status = cls.id === 20 || cls.isFinal ? 'chief' : classStatus(cls.id)
  const score = classScore(cls.id)
  const attempts = classAttempts(cls.id)
  
  const accuracy = score !== null ? score : 0
  
  const getAccuracyClass = () => {
    if (status === 'locked') return ''
    if (accuracy >= 80) return styles.accuracyHigh
    if (accuracy >= 60) return styles.accuracyMedium
    if (attempts > 0) return styles.accuracyLow
    return ''
  }

  function cfClass() {
    let base = styles.caseFile
    if (status === 'chief') base += ` ${styles.cfChief}`
    if (status === 'locked') base += ` ${styles.cfLock}`
    return base
  }

  function getButtonClass() {
    if (status === 'locked') return `${styles.cbBtn} ${styles.btnLocked}`
    if (status === 'chief') return `${styles.cbBtn} ${styles.btnChief}`
    if (status === 'done') return `${styles.cbBtn} ${styles.btnDone}`
    return `${styles.cbBtn} ${styles.btnContinue}`
  }

  function getButtonText() {
    if (status === 'locked') return '🔒 Locked'
    if (status === 'done') return 'Re-examine Case'
    if (status === 'chief') return 'Start Board Exam'
    return 'Begin Case'
  }

  function handleNavigate() {
    if (status === 'locked') return
    navigate(`/class/${cls.id}`)
  }

  function handleToggle() {
    if (status === 'locked') return
    setOpen(o => !o)
  }

  return (
    <div className={cfClass()}>
      <div className={styles.caseHeader} onClick={handleToggle}>
        <div className={styles.chNum}>
          <div className={styles.chN}>{String(cls.num || cls.id).padStart(2, '0')}</div>
          <div className={styles.chIcon}>
            <NumIcon status={status} />
          </div>
        </div>

        <div className={styles.chBody}>
          <div className={styles.chbInfo}>
            <div className={styles.chbName}>{cls.title}</div>
            <div className={styles.chbMeta}>{cls.subtitle || 'Patient Admission File'}</div>
          </div>

          <div className={styles.chbRight}>
            <div className={styles.chbAccuracy}>
              <div className={`${styles.accuracyCircle} ${getAccuracyClass()}`}>
                {status === 'locked' ? '—' : `${accuracy}%`}
              </div>
              <div className={styles.accuracyLabel}>Accuracy</div>
            </div>
            
            <div className={`${styles.chbTag} ${styles['tg' + status.charAt(0).toUpperCase() + status.slice(1)]}`}>
              {status === 'chief' ? 'Board Exam' : status}
            </div>
          </div>
        </div>
      </div>

      {open && status !== 'locked' && (
        <div className={styles.caseBody}>
          <div className={styles.cbInner}>
            <div className={styles.cbQuote}>
              {cls.tagline || "Initial clinical briefing available for review."}
            </div>
            <div className={styles.cbFoot}>
              <div className={styles.cbfInfo}>
                {score !== null 
                  ? `Highest Competency: ${score}% · ${attempts} attempt${attempts !== 1 ? 's' : ''}` 
                  : "No attempts logged."}
              </div>
              <button 
                className={getButtonClass()}
                onClick={handleNavigate}
                disabled={status === 'locked'}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {open && status === 'locked' && (
        <div className={styles.caseBody}>
          <div className={styles.cbInner}>
            <div className={styles.cbQuote} style={{ borderLeftColor: '#90a4ae' }}>
              This case is locked. Complete the previous case to unlock access.
            </div>
            <div className={styles.cbFoot}>
              <div className={styles.cbfInfo}>
                Prerequisites not met
              </div>
              <button 
                className={getButtonClass()}
                disabled={true}
              >
                🔒 Locked
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
