import { useNavigate } from 'react-router-dom'
import styles from '../../styles/dashboard.module.css'

const PAGES = [
  { title: 'Daily ECG Challenge', sub: 'Identify the arrhythmia · 2 min', path: '/ward-map', locked: false },
  { title: 'Drug Dosage Quiz', sub: '5 questions · Physician Track', path: '/ward-map', locked: false },
  { title: 'Triage Ordering Drill', sub: 'Unlocks after Class 03 completes', path: '#', locked: true },
]

export default function UrgentPages() {
  const navigate = useNavigate()

  return (
    <div className={styles.panel}>
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