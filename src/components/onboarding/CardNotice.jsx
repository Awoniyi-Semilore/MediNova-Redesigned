// src/components/onboarding/CardNotice.jsx

import { useMemo } from 'react'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/onboarding.module.css'

export default function CardNotice({ onEnter }) {
  // ✅ FIXED: Now uses the working ProgressContext instead of hardcoded values
  const { completedCount, streak, track, sessionUser } = useProgress()

  // Generate user display info from session or fallback
  const userData = useMemo(() => {
    const raw = localStorage.getItem('medinova_session_user')
    const session = raw ? JSON.parse(raw) : null
    const name = session?.name || session?.email?.split('@')[0] || 'Doctor'
    const initials = name.substring(0, 2).toUpperCase()
    const role = track === 'doctor' ? 'Attending Physician' : 'Head Nurse'
    return { name, initials, role }
  }, [track])

  // Persistent Staff ID based on User ID
  const staffId = useMemo(() => {
    const raw = localStorage.getItem('medinova_session_user')
    const session = raw ? JSON.parse(raw) : null
    if (!session?.uid) return 'MN-00000'
    const hash = session.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return `MN-${10000 + (hash % 90000)}`
  }, [])

  console.log('[CardNotice] Rendering with completedCount:', completedCount, 'streak:', streak)

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
        <span className={styles.cardBadge}>ACTIVE SESSION</span>
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
        <div className={styles.eyebrow}>Medical Staff Identity</div>
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
            <span className={styles.vitalLabel}>Total</span>
          </div>
          <div className={styles.vitalBox}>
            {/* ✅ FIXED: Now shows REAL completed count from Firestore */}
            <span className={styles.vitalVal}>{completedCount}</span>
            <span className={styles.vitalLabel}>Done</span>
          </div>
          <div className={styles.vitalBox}>
            {/* ✅ FIXED: Now shows REAL streak from Firestore */}
            <span className={styles.vitalVal}>{streak}</span>
            <span className={styles.vitalLabel}>Streak</span>
          </div>
        </div>

        <div className={styles.notice}>
          <div className={styles.noticeHead}>Chief of Staff Memo</div>
          <div className={styles.noticeBody}>
            Welcome to your shift. Your performance is being logged. 
            Ensure all <strong>Class Files</strong> are updated before the end of the week.
            Clinical excellence is our only standard.
          </div>
        </div>

        <button className={styles.btnBlue} onClick={onEnter}>
          Proceed to Ward Map →
        </button>
      </div>
    </>
  )
}