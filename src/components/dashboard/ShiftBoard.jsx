import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM } from '../../data/curriculum'
import styles from '../../styles/dashboard.module.css'

export default function ShiftBoard() {
  const navigate = useNavigate()
  const { classStatus, activeClass } = useProgress()

  // Show active class + 2 before + 2 after
  const activeIdx = CURRICULUM.findIndex(c => c.id === activeClass?.id) || 0
  const start = Math.max(0, activeIdx - 2)
  const visible = CURRICULUM.slice(start, start + 5)

  return (
    <div className={styles.panel} id="shiftPanel">
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.phTitle}>Shift Board</div>
        </div>
        <div
          className={styles.phAction}
          onClick={() => navigate(`/class/${activeClass?.id}`)}
        >
          Continue →
        </div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.shiftList}>
          {visible.map(cls => {
            const s = classStatus(cls.id)
            const rowCls = s === 'done'
              ? styles.srDone
              : s === 'active'
              ? styles.srActive
              : styles.srLock
            const tagCls = s === 'done'
              ? styles.tagDone
              : s === 'active'
              ? styles.tagActive
              : styles.tagLocked
            const tagLabel = s === 'done' ? 'Done' : s === 'active' ? 'Active' : 'Locked'

            return (
              <div
                key={cls.id}
                className={`${styles.shiftRow} ${rowCls}`}
                onClick={() => s !== 'locked' && navigate(`/class/${cls.id}`)}
                style={{ cursor: s === 'locked' ? 'default' : 'pointer' }}
              >
                <div className={styles.srNum}>{cls.num}</div>
                <div className={styles.srInfo}>
                  <div className={styles.srName}>{cls.title}</div>
                  <div className={styles.srSub}>{cls.subtitle}</div>
                </div>
                <span className={`${styles.srTag} ${tagCls}`}>{tagLabel}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}