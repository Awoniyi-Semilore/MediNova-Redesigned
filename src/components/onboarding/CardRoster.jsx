// src/components/onboarding/CardRoster.jsx

import styles from '../../styles/onboarding.module.css'

export default function CardRoster({ onPick }) {
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
          <span className={styles.cardHospitalName}>Staff Identification</span>
        </div>
        <span className={styles.cardBadge}>STEP 01</span>
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
        <div className={styles.eyebrow}>Roster Check</div>
        <div className={styles.redBar} />
        <div className={styles.title}>
          Are you on our <span className={styles.titleAccent}>roster?</span>
        </div>
        <div className={styles.body}>
          Are you a returning staff member, or are you joining us for the very first time?
        </div>
        <div className={styles.choices}>
          <div className={styles.choice} onClick={() => onPick('login')}>
            <div className={styles.choiceIconBlue}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#1565c0" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span className={styles.choiceLabel}>Returning Staff</span>
            <span className={styles.choiceSub}>I have an account</span>
          </div>
          <div className={styles.choice} onClick={() => onPick('signup')}>
            <div className={styles.choiceIconRed}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#c62828" strokeWidth="2" strokeLinecap="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <span className={styles.choiceLabel}>New Staff</span>
            <span className={styles.choiceSub}>First time here</span>
          </div>
        </div>
      </div>
    </>
  )
}