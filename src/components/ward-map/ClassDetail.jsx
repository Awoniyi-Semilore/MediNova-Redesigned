import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM, LEVELS } from '../../data/curriculum'
import TopBar from '../shared/TopBar'
import styles from '../../styles/classdetail.module.css'

const MECHANICS_LABELS = {
  mcq:        'MCQ · Timed',
  drag:       'Drag & Drop',
  hotspot:    'Hotspot',
  audio_mcq:  'Audio + MCQ',
  text_input: 'Text Input',
  speech:     'Speech',
}

function CrossIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
      <rect x="4" y="0" width="2" height="10"/>
      <rect x="0" y="4" width="10" height="2"/>
    </svg>
  )
}

export default function ClassDetail() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  
  // UPDATED: Use 'results' instead of 'progress'
  const {
    track,
    setTrack,
    classStatus,
    classScore,
    classAttempts,
    results, // Corrected from 'progress'
    CERTIFICATE_GROUPS = [], // Default to empty array to avoid undefined
    isCertEarned,
  } = useProgress()

  const cls = CURRICULUM.find(c => c.id === Number(classId))
  const themeClass = isDark ? styles.dark : styles.light

  if (!cls) return (
    <div className={`${styles.page} ${themeClass}`} style={{ padding: '4rem', textAlign: 'center' }}>
      <p>Class not found.</p>
    </div>
  )

  const status = classStatus(cls.id)
  const score = classScore(cls.id)
  const attempts = classAttempts(cls.id)
  const level = LEVELS.find(l => l.id === cls.level)

  const accentColor = level?.colorPool[cls.id % level.colorPool.length] || '#1565c0'

  const trackData = cls[track] || cls.doctor
  const sims = trackData?.sims || []
  const desc = cls.description 
  ? (typeof cls.description === 'object' ? (cls.description[track] || cls.description.doctor) : cls.description)
  : (cls.tagline || "Clinical documentation and briefing for this case are pending.");

  // FIXED: Filter from 'results' instead of 'progress.simHistory'
  const history = (results || [])
    .filter(h => h.classId === cls.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
    .slice(0, 5)

  // FIXED: Added safety check for CERTIFICATE_GROUPS
  const certGroup = (CERTIFICATE_GROUPS || []).find(g => g.classIds.includes(cls.id))
  const certEarned = certGroup && typeof isCertEarned === 'function' ? isCertEarned(certGroup.id) : false

  // Status badge helpers
  function statusBadgeClass() {
    if (status === 'done')   return `${styles.ssBadge} ${styles.badgeDone}`
    if (status === 'active' || status === 'next') return `${styles.ssBadge} ${styles.badgeActive}`
    return `${styles.ssBadge} ${styles.badgeLocked}`
  }
  
  function statusLabel() {
    if (status === 'done')   return 'Completed'
    if (status === 'active' || status === 'next') return 'In Progress'
    return 'Locked'
  }

  function getSimStatus(si) {
    if (status === 'done')   return 'done'
    if (status === 'active' || status === 'next') return si === 0 ? 'active' : 'lock'
    return 'lock'
  }

  function simItemClass(s) {
    if (s === 'done')   return `${styles.simItem} ${styles.simItemDone}`
    if (s === 'active') return `${styles.simItem} ${styles.simItemActive}`
    return `${styles.simItem} ${styles.simItemLock}`
  }

  const canEnter = status === 'active' || status === 'done' || status === 'next'
  const ctaLabel = status === 'done'
    ? 'Review Case File'
    : status === 'active' || status === 'next'
    ? 'Begin Simulation →'
    : 'Locked — Complete Previous Case'

  function handleEnterSim() {
    if (!canEnter) return
    navigate(`/simulation/${cls.id}`)
  }

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar
        backLabel="Ward Map"
        backPath="/ward-map"
        pageTitle={`Case ${cls.num}`}
      />

      {/* HERO */}
      <div className={styles.hero}>
        {cls.media?.images?.[0] && (
          <img className={styles.heroBg} src={cls.media.images[0]} alt={cls.title} />
        )}
        <div
          className={styles.heroOverlay}
          style={{
            background: cls.media?.images?.[0]
              ? `linear-gradient(to bottom, ${accentColor}88 0%, rgba(10,22,40,0.92) 100%)`
              : `linear-gradient(135deg, ${accentColor} 0%, #0a1628 100%)`,
          }}
        />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLevel}>
              <div className={styles.heroLevelDot} style={{ background: accentColor }} />
              {level?.label || cls.level} &nbsp;·&nbsp; {track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
            </div>
            <div className={styles.heroNum}>Class {cls.num}</div>
            <div className={styles.heroTitle}>
              {cls.title.split(' ')[0]} <em>{cls.title.split(' ').slice(1).join(' ')}</em>
            </div>
            <div className={styles.heroTagline}>{cls.tagline}</div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroXp}>+{cls.xpReward} XP on completion</div>
            <div className={styles.heroPassMark}>Pass mark: {cls.passMark}%</div>
            <div className={styles.heroTime}>
              ~{cls.estimatedMinutes?.[track] || 30} min
            </div>
          </div>
        </div>
      </div>

      {/* STATUS STRIP */}
      <div className={styles.statusStrip}>
        <div className={styles.ssItem}>
          <span>Status</span>
          <div className={statusBadgeClass()}>{statusLabel()}</div>
        </div>
        <div className={styles.ssDivider} />
        <div className={styles.ssItem}>
          <span>Attempts</span>
          <div className={styles.ssVal}>{attempts}</div>
        </div>
        {score !== null && (
          <>
            <div className={styles.ssDivider} />
            <div className={styles.ssItem}>
              <span>Best Score</span>
              <div className={styles.ssVal} style={{ color: accentColor }}>{score}%</div>
            </div>
          </>
        )}
      </div>

      <div className={styles.body}>
        {/* TRACK TOGGLE */}
        <div className={styles.trackToggle}>
          <span className={styles.ttLabel}>Viewing as:</span>
          <button
            className={`${styles.ttBtn} ${track === 'doctor' ? styles.ttBtnActive : ''}`}
            onClick={() => setTrack('doctor')}
          > Physician </button>
          <button
            className={`${styles.ttBtn} ${track === 'nurse' ? styles.ttBtnActive : ''}`}
            onClick={() => setTrack('nurse')}
          > Nurse </button>
        </div>

        {/* DESCRIPTION */}
        <div className={styles.sectionLabel}>Case Briefing</div>
        <div className={styles.descCard}>
          <div className={styles.descHead}>
            <div className={styles.descCross}><CrossIcon /></div>
            <div className={styles.descTitle}>Clinical Brief</div>
          </div>
          <div className={styles.descBody}>
            <div className={styles.descText}>{desc}</div>
          </div>
        </div>

        {/* SIMS */}
        <div className={styles.sectionLabel}>Sub-Simulations</div>
        <div className={styles.simsCard}>
          <div className={styles.simsBody}>
            {sims.length === 0 ? (
              <div className={styles.historyEmpty}>Coming soon</div>
            ) : sims.map((sim, si) => (
                <div key={sim.id} className={simItemClass(getSimStatus(si))}>
                  <div className={styles.simItemRow}>
                    <div className={styles.simNum}>{sim.id}</div>
                    <div className={styles.simInfo}>
                      <div className={styles.simTitle}>{sim.title}</div>
                      <div className={styles.simObj}>{sim.objective}</div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* ATTEMPT HISTORY */}
        {attempts > 0 && (
          <>
            <div className={styles.sectionLabel}>Attempt History</div>
            <div className={styles.historyCard}>
              <div className={styles.historyBody}>
                <div className={styles.historyList}>
                  {history.map((h, i) => (
                    <div key={i} className={styles.historyItem}>
                      <div className={styles.histDate}>
                        {new Date(h.date).toLocaleDateString()}
                      </div>
                      <div className={styles.histTrack}>{h.track}</div>
                      <div className={`${styles.histScore} ${h.score >= cls.passMark ? styles.histScorePass : styles.histScoreFail}`}>
                        {h.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div className={styles.ctaRow}>
          <div className={styles.ctaInfo}>
            <div className={styles.ctaTitle}>
              {status === 'done' ? 'Completed' : 'Ready to begin'}
            </div>
          </div>
          <button
            className={`${styles.ctaBtn} ${canEnter ? styles.ctaBtnPrimary : styles.ctaBtnDisabled}`}
            onClick={handleEnterSim}
            disabled={!canEnter}
            style={canEnter ? { background: accentColor } : {}}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  )
}