import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/dashboard.module.css'

export default function VitalsRow() {
  const {
    completedCount,
    overallProgress,
    earnedCertificates,
    urgentCount,
    CERTIFICATE_GROUPS,
  } = useProgress()

  const vitals = [
    {
      label: 'Classes Done',
      value: completedCount,
      sub: <small>/20</small>,
      change: '↑ keep going',
      changeClass: styles.chgUp,
      accent: styles.vcBlue,
    },
    {
      label: 'Overall Progress',
      value: overallProgress,
      sub: <small>%</small>,
      change: `${20 - completedCount} classes remaining`,
      changeClass: styles.chgWarn,
      accent: styles.vcGreen,
    },
    {
      label: 'Certificates',
      value: earnedCertificates.length,
      sub: <small>/{CERTIFICATE_GROUPS.length}</small>,
      change: `${CERTIFICATE_GROUPS.length - earnedCertificates.length} remaining`,
      changeClass: styles.chgWarn,
      accent: styles.vcAmber,
    },
    {
      label: 'Urgent Pages',
      value: urgentCount,
      sub: null,
      change: urgentCount > 0 ? 'Due today' : 'All clear',
      changeClass: urgentCount > 0 ? styles.chgRed : styles.chgUp,
      accent: styles.vcRed,
    },
  ]

  return (
    <div className={styles.vitals} id="vitalsRow">
      {vitals.map(v => (
        <div key={v.label} className={`${styles.vc} ${v.accent}`}>
          <div className={styles.vcLabel}>{v.label}</div>
          <div className={styles.vcVal}>{v.value}{v.sub}</div>
          <div className={`${styles.vcChg} ${v.changeClass}`}>{v.change}</div>
        </div>
      ))}
    </div>
  )
}