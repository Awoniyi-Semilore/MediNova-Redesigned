import styles from '../../styles/profile.module.css'

export default function ProfileHero({ name, role, track, activeClass, staffId, email, joined, photoURL }) {
  const parts = name?.trim().split(' ') || []
  const first = parts[0] || 'Doctor'
  const rest = parts.slice(1).join(' ')
  
  const initials = parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
    : (parts[0] || 'D').slice(0, 2).toUpperCase()

  return (
    <div className={styles.hero}>
      <svg className={styles.heroBgCross} viewBox="0 0 300 300" fill="none">
        <rect x="130" y="0" width="40" height="300" fill="white"/>
        <rect x="0" y="130" width="300" height="40" fill="white"/>
      </svg>
      <div className={styles.heroContent}>
        <div className={styles.avatarCol}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              {/* If photoURL exists, show image. Otherwise show initials */}
              {photoURL ? (
                <img 
                  src={photoURL} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                />
              ) : (
                initials
              )}
            </div>
          </div>
          <div className={styles.avatarEditBtn} style={{ fontSize: '0.65rem', marginTop: '8px', opacity: 0.8 }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.5">
              <path d="M11 2l3 3L5 14H2v-3L11 2z"/>
            </svg>
            Active Badge
          </div>
        </div>

        <div className={styles.heroInfo}>
          <div className={styles.heroEyebrow}>MediNova Teaching Hospital · Staff Dossier</div>
          <div className={styles.heroName}>
            {first} <span className={styles.heroNameAccent}>{rest}</span>
          </div>
          <div className={styles.heroRole}>
            {role} · {track} · {activeClass}
          </div>
          <div className={styles.heroId}>
            Staff ID: {staffId} &nbsp;·&nbsp; Joined: {joined} &nbsp;·&nbsp; {email}
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