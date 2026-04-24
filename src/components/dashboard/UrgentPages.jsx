
// src/components/dashboard/UrgentPages.jsx

import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function UrgentPages() {
  const navigate = useNavigate()
  const { completedCount } = useProgress()

  const PAGES = [
    { 
      title: 'Daily ECG Challenge', 
      sub: 'Identify the arrhythmia · 2 min', 
      path: '/drills/ecg', 
      locked: false 
    },
    { 
      title: 'Drug Dosage Quiz', 
      sub: 'Physician Calculation Track', 
      path: '/drills/meds', 
      locked: false 
    },
    { 
      title: 'Triage Ordering Drill', 
      sub: 'Unlocks after 5 Cases completed', 
      path: '/drills/triage', 
      locked: completedCount < 5 
    },
  ]

  return (
    <div className={styles.panel} id="urgentPanel">
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.phTitle}>Urgent Pages</div>
        </div>
        <div className={styles.phAction} onClick={() => navigate('/ward-map')}>View All →</div>
      </div>
      <div className={styles.panelBody}>
        <div className={styles.urgList}>
          {PAGES.map((p) => (
            <div key={p.title} className={`${styles.urgItem} ${p.locked ? styles.urgLocked : ''}`}>
              <div className={styles.urgContent}>
                <div className={styles.urgTitle}>{p.title}</div>
                <div className={styles.urgSub}>{p.sub}</div>
              </div>
              <button 
                className={styles.urgBtn} 
                disabled={p.locked}
                onClick={() => !p.locked && navigate(p.path)}
              >
                {p.locked ? 'Locked' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}