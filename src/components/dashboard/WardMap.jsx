import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM } from '../../data/curriculum'
import styles from '../../styles/dashboard.module.css'

export default function WardMap() {
  const navigate = useNavigate()
  const { classStatus, overallProgress } = useProgress()

  function getCellClass(cls) {
    const s = classStatus(cls.id)
    if (cls.id === 20) return `${styles.wc} ${styles.wcChief}`
    if (s === 'done')   return `${styles.wc} ${styles.wcDone}`
    if (s === 'active') return `${styles.wc} ${styles.wcNow}`
    // next up = first locked after active
    const activeId = CURRICULUM.find(c => classStatus(c.id) === 'active')?.id || 1
    if (cls.id === activeId + 1) return `${styles.wc} ${styles.wcNext}`
    return `${styles.wc} ${styles.wcLock}`
  }

  return (
    <div className={styles.panel} id="wardPanel">
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.phTitle}>Ward Map — 20 Floors</div>
        </div>
        <div
          className={styles.phAction}
          onClick={() => navigate('/ward-map')}
        >
          Full Map →
        </div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.wardGrid}>
          {CURRICULUM.map(cls => (
            <div
              key={cls.id}
              className={getCellClass(cls)}
              onClick={() => navigate(`/class/${cls.id}`)}
              title={cls.title}
            >
              <span className={styles.wn}>{cls.num}</span>
              <span className={styles.wl}>{cls.title.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          ))}
        </div>
        <div className={styles.progRow}>
          <span>Overall Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <div className={styles.progTrack}>
          <div className={styles.progFill} style={{ width: `${overallProgress}%` }} />
        </div>
      </div>
    </div>
  )
}