import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import { useTheme } from '../../contexts/ThemeContext'
import styles from '../../styles/dashboard.module.css'

const CERT_ICONS = {
  clerkship:          { symbol: '⚕', label: 'Clerkship'         },
  junior_residency:   { symbol: '🩺', label: 'Junior Residency'  },
  senior_residency:   { symbol: '⚡', label: 'Senior Residency'  },
  fellowship:         { symbol: '🔬', label: 'Fellowship'         },
  board_certification:{ symbol: '👑', label: 'Board Certified'    },
}

function CertIcon({ symbol, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="#f9a825">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/>
    </svg>
  )
}

export default function CertificateCase() {
  const { CERTIFICATE_GROUPS, isCertEarned, earnedCertificates } = useProgress()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  return (
    <div className={styles.panel} id="trophyPanel">
      <div className={styles.panelHead}>
        <div className={styles.phLeft}>
          <div className={styles.phCross}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.phTitle}>
            Certificates — {earnedCertificates.length}/{CERTIFICATE_GROUPS.length}
          </div>
        </div>
        <div className={styles.phAction} onClick={() => navigate('/ward-map')}>
          View All →
        </div>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.tcGrid}>
          {CERTIFICATE_GROUPS.map(group => {
            const earned = isCertEarned(group.id)
            const info = CERT_ICONS[group.id]
            return (
              <div
                key={group.id}
                className={`${styles.tc} ${earned ? styles.tcEarned : styles.tcLocked}`}
                onClick={() => navigate('/ward-map')}
                title={earned ? `${info.label} — Earned` : `${info.label} — Locked`}
              >
                {earned ? (
                  <>
                    <CertIcon size={28} />
                    {/* Glow ring on earned certificates */}
                    <div className={styles.certGlow} style={{ '--cert-color': group.color }} />
                  </>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/>
                  </svg>
                )}
                <div className={styles.tcName}>{info.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}