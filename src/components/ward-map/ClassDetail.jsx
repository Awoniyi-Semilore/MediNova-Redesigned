import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useProgress } from '../../contexts/ProgressContext'
import { CURRICULUM, LEVELS } from '../../data/curriculum'
import TopBar from '../shared/TopBar'
import styles from '../../styles/classdetail.module.css'

const MECHANICS_LABELS = {
  mcq:       'MCQ · Timed',
  drag:      'Drag & Drop',
  hotspot:   'Hotspot',
  audio_mcq: 'Audio + MCQ',
  text_input:'Text Input',
  speech:    'Speech',
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
  const {
    track,
    setTrack,
    classStatus,
    classScore,
    classAttempts,
    progress,
    CERTIFICATE_GROUPS,
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

  // Accent colour — randomised from level pool but stable per class per session
  const accentColor = level?.colorPool[cls.id % level.colorPool.length] || '#1565c0'

  // Track data
  const trackData = cls[track] || cls.doctor
  const sims = trackData?.sims || []
  const desc = cls.description?.[track] || cls.description?.doctor || ''

  // Attempt history for this class
  const history = (progress.simHistory || [])
    .filter(h => h.classId === cls.id)
    .slice(0, 5)

  // Certificate group for this class
  const certGroup = CERTIFICATE_GROUPS.find(g => g.classIds.includes(cls.id))
  const certEarned = certGroup ? isCertEarned(certGroup.id) : false

  // Status badge
  function statusBadgeClass() {
    if (status === 'done')   return `${styles.ssBadge} ${styles.badgeDone}`
    if (status === 'active') return `${styles.ssBadge} ${styles.badgeActive}`
    return `${styles.ssBadge} ${styles.badgeLocked}`
  }
  function statusLabel() {
    if (status === 'done')   return 'Completed'
    if (status === 'active') return 'In Progress'
    return 'Locked'
  }

  // Sim status
  function getSimStatus(si) {
    if (status === 'done')   return 'done'
    if (status === 'active') return si === 0 ? 'active' : 'lock'
    return 'lock'
  }
  function simItemClass(s) {
    if (s === 'done')   return `${styles.simItem} ${styles.simItemDone}`
    if (s === 'active') return `${styles.simItem} ${styles.simItemActive}`
    return `${styles.simItem} ${styles.simItemLock}`
  }

  // CTA logic
  const canEnter = status === 'active' || status === 'done' || status === 'next'
  const ctaLabel = status === 'done'
    ? 'Review Case File'
    : status === 'active'
    ? 'Continue Simulation →'
    : status === 'next'
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
        {/* Use scenario image as background if available */}
        {cls.media?.images?.[0] && (
          <img
            className={styles.heroBg}
            src={cls.media.images[0]}
            alt={cls.title}
          />
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
              <div
                className={styles.heroLevelDot}
                style={{ background: accentColor }}
              />
              {level?.label || cls.level}
              &nbsp;·&nbsp;
              {track === 'doctor' ? 'Physician Track' : 'Nurse Track'}
            </div>
            <div className={styles.heroNum}>Class {cls.num}</div>
            <div className={styles.heroTitle}>
              {cls.title.split(' ')[0]}{' '}
              <em>{cls.title.split(' ').slice(1).join(' ')}</em>
            </div>
            <div className={styles.heroTagline}>{cls.tagline}</div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroXp}>+{cls.xpReward} XP on completion</div>
            <div className={styles.heroPassMark}>Pass mark: {cls.passMark}%</div>
            <div className={styles.heroTime}>
              ~{cls.estimatedMinutes?.[track] || cls.estimatedMinutes?.doctor || 30} min
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
              <div className={styles.ssVal} style={{ color: accentColor }}>
                {score}%
              </div>
            </div>
          </>
        )}
        <div className={styles.ssDivider} />
        <div className={styles.ssItem}>
          <span>Certificate Group</span>
          <div className={styles.ssVal} style={{ fontSize: '0.85rem' }}>
            {certGroup?.label || '—'}
            {certEarned && (
              <span style={{ marginLeft: 6, color: '#f9a825' }}>★ Earned</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>

        {/* TRACK TOGGLE */}
        <div className={styles.trackToggle}>
          <span className={styles.ttLabel}>Viewing as:</span>
          <button
            className={`${styles.ttBtn} ${track === 'doctor' ? styles.ttBtnActive : ''}`}
            onClick={() => setTrack('doctor')}
          >
            Physician
          </button>
          <button
            className={`${styles.ttBtn} ${track === 'nurse' ? styles.ttBtnActive : ''}`}
            onClick={() => setTrack('nurse')}
          >
            Nurse
          </button>
          <span
            className={styles.ttNote}
            onClick={() => navigate('/profile')}
          >
            Change default in profile →
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className={styles.sectionLabel}>Case Briefing</div>
        <div className={styles.descCard}>
          <div className={styles.descHead}>
            <div className={styles.descCross}><CrossIcon /></div>
            <div className={styles.descTitle}>
              {track === 'doctor' ? 'Physician Track' : 'Nurse Track'} — Clinical Brief
            </div>
          </div>
          <div className={styles.descBody}>
            <div className={styles.descText}>{desc}</div>
          </div>
        </div>

        {/* SIMS */}
        <div className={styles.sectionLabel}>Sub-Simulations</div>
        <div className={styles.simsCard}>
          <div className={styles.simsHead}>
            <div className={styles.simsHeadLeft}>
              <div className={styles.descCross}><CrossIcon /></div>
              <div className={styles.descTitle}>
                {sims.length} Simulation{sims.length !== 1 ? 's' : ''} · {track === 'doctor' ? 'Physician' : 'Nurse'} Track
              </div>
            </div>
          </div>
          <div className={styles.simsBody}>
            {sims.length === 0 ? (
              <div className={styles.historyEmpty}>
                Content coming soon for this track
              </div>
            ) : sims.map((sim, si) => {
              const ss = getSimStatus(si)
              return (
                <div key={sim.id} className={simItemClass(ss)}>
                  <div className={styles.simItemRow}>
                    <div className={styles.simNum}>{sim.id}</div>
                    <div className={styles.simInfo}>
                      <div className={styles.simTitle}>{sim.title}</div>
                      <div className={styles.simObj}>{sim.objective}</div>
                    </div>
                    <div className={styles.simMechanics}>
                      {MECHANICS_LABELS[sim.mechanics] || sim.mechanics}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ATTEMPT HISTORY */}
        {attempts > 0 && (
          <>
            <div className={styles.sectionLabel}>Attempt History</div>
            <div className={styles.historyCard}>
              <div className={styles.historyHead}>
                <div className={styles.simsHeadLeft}>
                  <div className={styles.descCross}><CrossIcon /></div>
                  <div className={styles.descTitle}>Your Score History</div>
                </div>
              </div>
              <div className={styles.historyBody}>
                {history.length === 0 ? (
                  <div className={styles.historyEmpty}>No attempts recorded yet</div>
                ) : (
                  <div className={styles.historyList}>
                    {history.map((h, i) => {
                      const passed = h.score >= (cls.passMark || 70)
                      const date = new Date(h.date)
                      const dateStr = `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                      return (
                        <div key={i} className={styles.historyItem}>
                          <div className={styles.histDate}>{dateStr}</div>
                          <div className={styles.histTrack}>
                            {h.track === 'doctor' ? 'Physician' : 'Nurse'}
                          </div>
                          <div className={`${styles.histScore} ${passed ? styles.histScorePass : styles.histScoreFail}`}>
                            {h.score}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div className={styles.ctaRow}>
          <div className={styles.ctaInfo}>
            <div className={styles.ctaTitle}>
              {status === 'done'
                ? 'Case file completed — review available'
                : status === 'active'
                ? 'Your simulation is in progress'
                : status === 'next'
                ? 'Ready to begin — this case is unlocked'
                : 'Complete the previous case to unlock this floor'
              }
            </div>
            <div className={styles.ctaSub}>
              {canEnter
                ? `~${cls.estimatedMinutes?.[track] || 30} minutes · Pass mark ${cls.passMark}% · +${cls.xpReward} XP`
                : 'Locked until previous case is completed'
              }
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