// src/components/onboarding/WelcomeScene.jsx

import styles from '../../styles/onboarding.module.css'

export default function WelcomeScene({ visible, name, onDashboard }) {
  const firstName = name?.split(' ')[0] || 'Doctor'

  return (
    <div className={`${styles.welcomeScene} ${visible ? styles.welcomeSceneVisible : ''}`}>
      <div className={styles.welcomeTitle}>
        Welcome back,{' '}
        <span className={styles.welcomeTitleAccent}>{firstName}.</span>
      </div>
      <div className={styles.welcomeSub}>
        Your shift board is ready. The ward is waiting for you.
      </div>
      <button className={styles.welcomeBtn} onClick={onDashboard}>
        Enter the Ward →
      </button>
    </div>
  )
}