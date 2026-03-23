import CaseFile from './CaseFile'
import styles from '../../styles/wardmap.module.css'
import { useProgress } from '../../contexts/ProgressContext'

export default function CaseFileGroup({ group, classes, track }) {
  const { classStatus } = useProgress()
  const done = classes.filter(c => classStatus(c.id) === 'done').length

  return (
    <div className={styles.wing}>
      <div className={styles.wingHeader}>
        <div className={styles.wingLabel}>{group}</div>
        <div className={styles.wingLine} />
        <div className={styles.wingCount}>{done}/{classes.length} complete</div>
      </div>

      {classes.map(cls => (
        <CaseFile key={cls.id} cls={cls} track={track} />
      ))}
    </div>
  )
}