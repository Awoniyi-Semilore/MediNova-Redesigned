import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function CertificateCase() {
  const { results, completedCount } = useProgress()

  const totalCompleted = completedCount || 0
  const totalRequired = 20
  const progressPercent = Math.min(Math.round((totalCompleted / totalRequired) * 100), 100)
  const isCertified = totalCompleted >= totalRequired

  return (
    <div className={styles.panel}>
      {/* Reusing Panel Header logic for consistency */}
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div className={styles.phTitle}>Board Certification</div>
        </div>
        <div className={`${styles.certBadge} ${isCertified ? styles.active : ''}`}>
          {isCertified ? 'CERTIFIED' : 'IN PROGRESS'}
        </div>
      </div>

      <div className={styles.panelBody}>
        <p className={styles.urgSub} style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
          Complete all <strong>20 clinical cases</strong> to unlock your official 
          MediNova Board Certification and final residency transcript.
        </p>
        
        <div className={styles.progRow}>
          <span>Progress</span>
          <span>{totalCompleted} / {totalRequired} Cases</span>
        </div>
        
        <div className={styles.progTrack}>
          <div 
            className={styles.progFill} 
            style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }} 
          />
        </div>

        <button 
          className={styles.urgBtn}
          style={{ width: '100%', marginTop: '1.5rem', height: '40px' }}
          disabled={!isCertified}
          onClick={() => alert("Generating Board Certificate...")}
        >
          {isCertified ? 'Download Certificate' : 'Locked by Curriculum'}
        </button>
      </div>
    </div>
  )
}