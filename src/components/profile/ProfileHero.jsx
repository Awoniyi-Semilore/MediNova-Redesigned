import styles from '../../styles/profile.module.css'

export default function ProfileHero({ name, role, track, activeClass, staffId, email, joined, photoURL }) {
  const parts = name?.trim().split(' ') || []
  const first = parts[0] || 'Doctor'
  const rest = parts.slice(1).join(' ')
  
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (parts[0]?.slice(0, 2) || 'MN').toUpperCase()

  return (
    <div className={styles.hero}>
      {/* Background Hospital Cross Decoration */}
      <svg className={styles.heroBgCross} viewBox="0 0 300 300" fill="none">
        <rect x="135" y="0" width="30" height="300" fill="currentColor" fillOpacity="0.03"/>
        <rect x="0" y="135" width="300" height="30" fill="currentColor" fillOpacity="0.03"/>
      </svg>
      
      <div className={styles.heroContent}>
        <div className={styles.avatarCol}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              {photoURL ? (
                <img src={photoURL} alt="Profile" className={styles.heroAvatarImg} />
              ) : (
                <span className={styles.heroInitials}>{initials}</span>
              )}
            </div>
          </div>
          <div className={styles.avatarBadgeLabel}>
            <div className={styles.badgePulse} />
            Active Duty
          </div>
        </div>

        <div className={styles.heroInfo}>
          <div className={styles.heroEyebrow}>MediNova Teaching Hospital · Authorized Personnel</div>
          <div className={styles.heroName}>
            {first} <span className={styles.heroNameAccent}>{rest}</span>
          </div>
          <div className={styles.heroRole}>
            {role} <span className={styles.heroRoleDivider}>/</span> {track} <span className={styles.heroRoleDivider}>/</span> {activeClass}
          </div>
          <div className={styles.heroId}>
            <span className={styles.idLabel}>ID:</span> {staffId} 
            <span className={styles.idSep}>·</span> 
            <span className={styles.idLabel}>SINCE:</span> {joined}
            <span className={styles.idSep}>·</span> 
            {email}
          </div>
        </div>

        <div className={styles.heroEcgCol}>
          <svg width="160" height="30" viewBox="0 0 320 30" preserveAspectRatio="none">
            <path className={styles.ecgPath}
              d="M0,15 L55,15 L65,15 L70,2 L75,28 L80,2 L85,15 L140,15 L150,15 L155,2 L160,28 L165,2 L170,15 L225,15 L235,15 L240,2 L245,28 L250,2 L255,15 L320,15"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}