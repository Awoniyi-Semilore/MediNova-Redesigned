import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../contexts/ProgressContext'
import { useTheme } from '../../contexts/ThemeContext'
import styles from '../../styles/wardmap.module.css'

function NumIcon({ status }) {
  if (status === 'done') return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#2e7d32" strokeWidth="2.5">
      <path d="M3 8l4 4 6-6"/>
    </svg>
  )
  if (status === 'active') return (
    <svg width="9" height="9" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" fill="#1565c0"/>
      <circle cx="8" cy="8" r="2.5" fill="#fff"/>
    </svg>
  )
  if (status === 'next') return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="#f9a825">
      <path d="M5 3l6 5-6 5V3z"/>
    </svg>
  )
  if (status === 'chief') return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="#c62828">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z"/>
    </svg>
  )
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#cfd8dc" strokeWidth="1.5">
      <rect x="5" y="7" width="6" height="6" rx="1"/>
      <path d="M6 7V5a2 2 0 0 1 4 0v2"/>
    </svg>
  )
}

export default function CaseFile({ cls, track }) {
  const navigate = useNavigate()
  const { classStatus, classScore, classAttempts } = useProgress()
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [openSims, setOpenSims] = useState(new Set())

  const status = cls.id === 20 ? 'chief' : classStatus(cls.id)
  const score = classScore(cls.id)
  const attempts = classAttempts(cls.id)

  const progress = status === 'done' ? 100
    : status === 'active' ? Math.min(90, (attempts * 30))
    : 0

  function cfClass() {
    if (status === 'chief')  return `${styles.caseFile} ${styles.cfChief}`
    if (status === 'done')   return `${styles.caseFile} ${styles.cfDone}`
    if (status === 'active') return `${styles.caseFile} ${styles.cfActive}`
    if (status === 'next')   return `${styles.caseFile} ${styles.cfNext}`
    return `${styles.caseFile} ${styles.cfLock}`
  }

  function tagClass() {
    if (status === 'chief')  return `${styles.chbTag} ${styles.tgChief}`
    if (status === 'done')   return `${styles.chbTag} ${styles.tgDone}`
    if (status === 'active') return `${styles.chbTag} ${styles.tgActive}`
    if (status === 'next')   return `${styles.chbTag} ${styles.tgNext}`
    return `${styles.chbTag} ${styles.tgLock}`
  }

  function tagLabel() {
    if (status === 'chief')  return 'Final Exam'
    if (status === 'done')   return 'Completed'
    if (status === 'active') return 'In Progress'
    if (status === 'next')   return 'Next Up'
    return 'Locked'
  }

  function scClass(s) {
    if (s === 'done')   return `${styles.simCard} ${styles.scDone}`
    if (s === 'active') return `${styles.simCard} ${styles.scActive}`
    return `${styles.simCard} ${styles.scLock}`
  }

  function toggleSim(simId, e) {
    e.stopPropagation()
    setOpenSims(prev => {
      const next = new Set(prev)
      next.has(simId) ? next.delete(simId) : next.add(simId)
      return next
    })
  }

  function handleEnter(e) {
    e.stopPropagation()
    if (status === 'locked') return
    navigate(`/class/${cls.id}`)
  }

  const trackData = cls[track] || cls.doctor
  const sims = trackData?.sims || []

  const desc = cls.description?.[track] || cls.description?.doctor || ''

  return (
    <div className={cfClass()}>
      {/* HEADER ROW */}
      <div className={styles.caseHeader} onClick={() => setOpen(o => !o)}>
        <div className={styles.chNum}>
          <div className={styles.chN}>{cls.num}</div>
          <div className={styles.chIcon}>
            <NumIcon status={status} />
          </div>
        </div>

        <div className={styles.chBody}>
          <div className={styles.chbInfo}>
            <div className={styles.chbName}>{cls.title}</div>
            <div className={styles.chbMeta}>{cls.subtitle}</div>
          </div>

          <div className={styles.chbRight}>
            <div className={styles.chbProg}>
              <div className={styles.chbpRow}>
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className={styles.chbpTrack}>
                <div className={styles.chbpFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className={tagClass()}>{tagLabel()}</div>
          </div>
        </div>

        <div className={styles.chChev}>
          <svg
            className={`${styles.chev} ${open ? styles.chevOpen : ''}`}
            width="14" height="14" viewBox="0 0 16 16"
            fill="none" stroke="#90a4ae" strokeWidth="1.5"
          >
            <path d="M3 6l5 5 5-5"/>
          </svg>
        </div>
      </div>

      {/* ACCORDION BODY */}
      {open && (
        <div className={styles.caseBody}>
          <div className={styles.cbInner}>
            {/* Description quote */}
            <div className={styles.cbQuote}>{desc}</div>

            {/* Sub-simulations */}
            {sims.length > 0 && (
              <>
                <div className={styles.cbSimsHd}>
                  Sub-Simulations · {sims.length} Case{sims.length > 1 ? 's' : ''}
                  <div className={styles.cbSimsLine} />
                </div>

                <div className={styles.cbSims}>
                  {sims.map((sim, si) => {
                    const simStatus = status === 'done' ? 'done'
                      : status === 'active' && si === 0 ? 'active'
                      : status === 'locked' ? 'lock' : 'lock'
                    const simOpen = openSims.has(sim.id)
                    const hasSubsims = sim.subsims?.length > 0 && simStatus !== 'lock'

                    return (
                      <div key={sim.id} className={scClass(simStatus)}>
                        <div
                          className={styles.simRow}
                          onClick={hasSubsims ? (e) => toggleSim(sim.id, e) : undefined}
                        >
                          <div className={styles.srBadge}>{sim.id}</div>
                          <div className={styles.srText}>
                            <div className={styles.srName}>{sim.title}</div>
                            <div className={styles.srSub}>{sim.objective}</div>
                          </div>
                          <div className={styles.srPill}>
                            {simStatus === 'done' ? 'Done' : simStatus === 'active' ? 'Active' : 'Locked'}
                          </div>
                          {hasSubsims && (
                            <svg
                              className={`${styles.chev} ${simOpen ? styles.chevOpen : ''}`}
                              style={{ marginLeft: 8, flexShrink: 0 }}
                              width="12" height="12" viewBox="0 0 16 16"
                              fill="none" stroke="#90a4ae" strokeWidth="1.5"
                            >
                              <path d="M3 6l5 5 5-5"/>
                            </svg>
                          )}
                        </div>

                        {/* Sub-sub items */}
                        {hasSubsims && simOpen && (
                          <div className={styles.subsubArea}>
                            {sim.subsims.map((ss, ssi) => (
                              <div key={ssi} className={styles.subsubRow}>
                                <div className={styles.subsubDot} />
                                <div className={styles.subsubText}>{ss.title || ss}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {/* Footer */}
            <div className={styles.cbFoot}>
              <div className={styles.cbfInfo}>
                {score !== null
                  ? <>Best score: <strong>{score}%</strong></>
                  : status === 'active'
                  ? <>{progress}% complete — <strong>in progress</strong></>
                  : status === 'locked'
                  ? 'Complete previous case to unlock'
                  : status === 'next'
                  ? 'Ready to begin'
                  : '—'
                }
              </div>

              {status === 'active' && (
                <button className={`${styles.cbBtn} ${styles.btnContinue}`} onClick={handleEnter}>
                  Continue →
                </button>
              )}
              {status === 'done' && (
                <button className={`${styles.cbBtn} ${styles.btnReview}`} onClick={handleEnter}>
                  Review Case
                </button>
              )}
              {status === 'next' && (
                <button className={`${styles.cbBtn} ${styles.btnContinue}`} onClick={handleEnter}>
                  Begin →
                </button>
              )}
              {status === 'chief' && (
                <button
                  className={`${styles.cbBtn} ${status === 'locked' ? styles.btnLocked : styles.btnChief}`}
                  disabled={status === 'locked'}
                  onClick={handleEnter}
                >
                  Enter Exam →
                </button>
              )}
              {status === 'locked' && (
                <button className={`${styles.cbBtn} ${styles.btnLocked}`} disabled>
                  Locked
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}