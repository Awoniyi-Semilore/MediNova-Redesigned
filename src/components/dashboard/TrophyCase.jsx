
// src/components/dashboard/TrophyCase.jsx

import styles from '../../styles/dashboard.module.css'

const TROPHIES = [
  { name: 'Intern Wing', earned: true },
  { name: 'General Ward', earned: true },
  { name: '+18 Locked', earned: false },
]

function StarIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/>
    </svg>
  )
}

export default function TrophyCase() {
  return (
    <div className={styles.panel} id="trophyPanel">
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.phTitle}>Trophy Case</div>
        </div>
        <div className={styles.phAction}>All Certs →</div>
      </div>
      <div className={styles.panelBody}>
        <div className={styles.tcGrid}>
          {TROPHIES.map((t) => (
            <div key={t.name} className={`${styles.tc} ${t.earned ? styles.tcEarned : styles.tcLocked}`}>
              <StarIcon color={t.earned ? '#f9a825' : 'currentColor'} />
              <div className={styles.tcName}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}