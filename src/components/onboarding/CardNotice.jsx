import { useMemo } from 'react'
import styles from '../../styles/onboarding.module.css'

export default function CardNotice({ userData, onEnter }) {
  const staffId = useMemo(() =>
    'MN-' + Math.floor(10000 + Math.random() * 90000), [])

  return (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <div className={styles.cardCross}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <span className={styles.cardHospitalName}>Staff Notice Board</span>
        </div>
        <span className={styles.cardBadge}>ACTIVE</span>
      </div>

      <div className={styles.ecgStrip}>
        <svg className={styles.ecgSvg} viewBox="0 0 400 24" preserveAspectRatio="none">
          <path className={styles.ecgLine}
            d="M0,12 L60,12 L70,12 L75,2 L80,22 L85,2 L90,12 L100,12
               L160,12 L170,12 L175,2 L180,22 L185,2 L190,12 L200,12
               L260,12 L270,12 L275,2 L280,22 L285,2 L290,12 L300,12
               L360,12 L370,12 L375,2 L380,22 L385,2 L390,12 L400,12"
          />
        </svg>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.eyebrow}>Welcome Back</div>
        <div className={styles.redBar} />

        <div className={styles.avatarRow}>
          <div className={styles.avatar}>{userData.initials}</div>
          <div>
            <div className={styles.avatarName}>{userData.name}</div>
            <div className={styles.avatarRole}>{userData.role}</div>
          </div>
          <div className={styles.staffIdTag}>
            <div className={styles.staffIdLabel}>Staff ID</div>
            <div className={styles.staffIdNum}>{staffId}</div>
          </div>
        </div>

        <div className={styles.vitalStrip}>
          <div className={styles.vitalBox}>
            <span className={styles.vitalVal}>20</span>
            <span className={styles.vitalLabel}>Classes</span>
          </div>
          <div className={styles.vitalBox}>
            <span className={styles.vitalVal}>0</span>
            <span className={styles.vitalLabel}>Completed</span>
          </div>
          <div className={styles.vitalBox}>
            <span className={styles.vitalVal}>0</span>
            <span className={styles.vitalLabel}>Streak</span>
          </div>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeHead}>Notice from the Chief of Staff</div>
          <div className={styles.noticeBody}>
            The Head of Department will be reviewing all staff progress this{' '}
            <strong>Friday</strong>. Ensure your pending simulations are completed.
            Put in your very best.
          </div>
        </div>

        <button className={styles.btnBlue} onClick={onEnter}>
          Proceed to the Ward →
        </button>
      </div>
    </>
  )
}