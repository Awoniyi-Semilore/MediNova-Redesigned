
// src/components/dashboard/WelcomeModal.jsx

import styles from '../../styles/dashboard.module.css'

const STEPS = [
  {
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#64b5f6" strokeWidth="1.5"><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/></svg>,
    label: 'Login Streak & Stats',
    sub: 'Keep your streak alive to unlock residency bonuses.'
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#64b5f6" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>,
    label: 'Ward Navigation',
    sub: 'Navigate the 20 floors of the teaching hospital.'
  },
  {
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#64b5f6" strokeWidth="1.5"><path d="M2 4h12M2 8h8M2 12h10"/></svg>,
    label: 'Board Certification',
    sub: 'Track your progress toward your official medical license.'
  },
]

export default function WelcomeModal({ onStartTour, onSkip }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <div className={styles.modalHead}>
          <div className={styles.modalCross}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.modalHTitle}>Hospital Orientation</div>
          <svg className={styles.modalEcg} viewBox="0 0 200 20" preserveAspectRatio="none">
            <path className={styles.mecg} d="M0,10 L40,10 L50,10 L55,1 L60,19 L65,1 L70,10 L110,10 L120,10 L125,1 L130,19 L135,1 L140,10 L200,10"/>
          </svg>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalTitle}>
            Your workstation is <span className={styles.modalTitleAccent}>online.</span>
          </div>
          <div className={styles.modalText}>
            Welcome to the MediNova Teaching Hospital. Let's walk through your clinical dashboard.
          </div>
          <div className={styles.modalSteps}>
            {STEPS.map((s) => (
              <div key={s.label} className={styles.ms}>
                <div className={styles.msIcon}>{s.icon}</div>
                <div>
                  <div className={styles.msLabel}>{s.label}</div>
                  <div className={styles.msSub}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.modalBtn} onClick={onStartTour}>
            Begin Orientation →
          </button>
          <div className={styles.modalSkip} onClick={onSkip}>
            Skip and go to Ward
          </div>
        </div>
      </div>
    </div>
  )
}