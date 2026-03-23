import styles from '../../styles/dashboard.module.css'

export default function WelcomeStrip({ name, track, activeClass }) {
  const parts = name?.trim().split(' ') || []
  const first = parts[0] || 'Doctor'
  const rest = parts.slice(1).join(' ')

  return (
    <div className={styles.welcomeStrip}>
      <div className={styles.wsGreeting}>On Duty · MediNova Teaching Hospital</div>
      <div className={styles.wsName}>
        {first} <span className={styles.wsNameAccent}>{rest}</span>
      </div>
      <div className={styles.wsMeta}>
        {track} · {activeClass}
      </div>
    </div>
  )
}