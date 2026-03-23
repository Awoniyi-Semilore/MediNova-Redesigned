import { useState, useEffect } from 'react'
import { useProgress } from '../../contexts/ProgressContext'
import { useTheme } from '../../contexts/ThemeContext'
import { CURRICULUM } from '../../data/curriculum'
import TopBar from '../shared/TopBar'
import CaseFileGroup from './CaseFileGroup'
import styles from '../../styles/wardmap.module.css'

const GROUPS = [
  { label: 'Clerkship · Cases 01–04',                  ids: [1,2,3,4]     },
  { label: 'Junior Residency · Cases 05–09',            ids: [5,6,7,8,9]   },
  { label: 'Senior Residency · Cases 10–14',            ids: [10,11,12,13,14] },
  { label: 'Fellowship · Cases 15–18',                  ids: [15,16,17,18] },
  { label: 'Board Certification · Cases 19–20',         ids: [19,20]       },
]

export default function WardMapPage() {
  const { isDark } = useTheme()
  const {
    track,
    setTrack,
    completedCount,
    overallProgress,
    streak,
    classStatus,
  } = useProgress()

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [localTrack, setLocalTrack] = useState(track)

  // Show role modal on first visit to ward map
  useEffect(() => {
    const seen = sessionStorage.getItem('mn_wardmap_role_seen')
    if (!seen) setShowRoleModal(true)
  }, [])

  function handleRolePick(role) {
    setLocalTrack(role)
    setTrack(role)
    sessionStorage.setItem('mn_wardmap_role_seen', 'true')
    setShowRoleModal(false)
  }

  function handleSkipRole() {
    sessionStorage.setItem('mn_wardmap_role_seen', 'true')
    setShowRoleModal(false)
  }

  const themeClass = isDark ? styles.dark : styles.light
  const activeClass = CURRICULUM.find(c => classStatus(c.id) === 'active')

  return (
    <div className={`${styles.page} ${themeClass}`}>
      <TopBar
        backLabel="Dashboard"
        backPath="/dashboard"
        pageTitle="Ward Map · Case Files"
      />

      {/* HERO */}
      <div className={styles.hero}>
        <svg className={styles.heroBg} viewBox="0 0 200 200" fill="none">
          <rect x="90" y="0" width="20" height="200" fill="white"/>
          <rect x="0" y="90" width="200" height="20" fill="white"/>
        </svg>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>
              <div className={styles.heroAlert} />
              MediNova Teaching Hospital · Active Clinical Curriculum
            </div>
            <div className={styles.heroTitle}>
              Active <em>Case Files.</em>
            </div>
            <div className={styles.heroSub}>
              {localTrack === 'doctor' ? 'Physician Track' : 'Nurse Track'}
              &nbsp;·&nbsp;
              {activeClass ? `Class ${activeClass.num} Active` : 'Getting Started'}
            </div>
          </div>
          <div className={styles.heroVitals}>
            <div className={styles.hv}>
              <div className={styles.hvVal}>{completedCount}</div>
              <div className={styles.hvLbl}>Completed</div>
            </div>
            <div className={styles.hv}>
              <div className={styles.hvVal}>{20 - completedCount}</div>
              <div className={styles.hvLbl}>Remaining</div>
            </div>
            <div className={styles.hv}>
              <div className={styles.hvVal}>{streak}</div>
              <div className={styles.hvLbl}>Day Streak</div>
            </div>
            <div className={styles.hv}>
              <div className={styles.hvVal}>{overallProgress}%</div>
              <div className={styles.hvLbl}>Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS STRIP */}
      <div className={styles.progStrip}>
        <div className={styles.psLabel}>Overall Progression</div>
        <div className={styles.psTrack}>
          <div className={styles.psFill} style={{ width: `${overallProgress}%` }} />
        </div>
        <div className={styles.psPct}>{overallProgress}%</div>
      </div>

      {/* LEGEND */}
      <div className={styles.legend}>
        {[
          { cls: styles.ldDone,   label: 'Completed' },
          { cls: styles.ldActive, label: 'In Progress' },
          { cls: styles.ldNext,   label: 'Next Up' },
          { cls: styles.ldLock,   label: 'Locked' },
          { cls: styles.ldChief,  label: 'Final Exam' },
        ].map(l => (
          <div key={l.label} className={styles.legItem}>
            <div className={`${styles.legDot} ${l.cls}`} />
            {l.label}
          </div>
        ))}

        {/* Track toggle in legend */}
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => setShowRoleModal(true)}
          className={styles.legItem}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M10 5l3 3-3 3"/>
          </svg>
          Switch to {localTrack === 'doctor' ? 'Nurse' : 'Doctor'} Track
        </div>
      </div>

      {/* BOARD */}
      <div className={styles.board}>
        {GROUPS.map(g => (
          <CaseFileGroup
            key={g.label}
            group={g.label}
            classes={CURRICULUM.filter(c => g.ids.includes(c.id))}
            track={localTrack}
          />
        ))}
      </div>

      {/* ROLE SELECTION MODAL */}
      {showRoleModal && (
        <div className={styles.roleModalBackdrop}>
          <div className={styles.roleModal}>
            <div className={styles.rmHead}>
              <div className={styles.rmCross}>
                <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                  <rect x="4" y="0" width="2" height="10"/>
                  <rect x="0" y="4" width="10" height="2"/>
                </svg>
              </div>
              <div className={styles.rmTitle}>Entering the Ward</div>
            </div>
            <div className={styles.rmBody}>
              <div className={styles.rmQuestion}>
                Are you holding the <em>clipboard or the IV line</em> today?
              </div>
              <div className={styles.rmSub}>
                Your role determines the content, scenarios, and scoring of every case file.
                You can switch at any time from your profile settings.
              </div>
              <div className={styles.rmChoices}>
                <div className={styles.rmChoice} onClick={() => handleRolePick('doctor')}>
                  <div className={`${styles.rmChoiceIcon} ${styles.rmIconBlue}`}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="#1565c0" strokeWidth="1.5">
                      <circle cx="8" cy="5" r="3"/>
                      <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
                    </svg>
                  </div>
                  <span className={styles.rmChoiceLabel}>Physician</span>
                  <span className={styles.rmChoiceSub}>Diagnostics · Prescribing · Algorithms</span>
                </div>
                <div className={styles.rmChoice} onClick={() => handleRolePick('nurse')}>
                  <div className={`${styles.rmChoiceIcon} ${styles.rmIconRed}`}>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="#c62828" strokeWidth="1.5">
                      <path d="M8 1v14M1 8h14"/>
                    </svg>
                  </div>
                  <span className={styles.rmChoiceLabel}>Nurse</span>
                  <span className={styles.rmChoiceSub}>Execution · Monitoring · Patient Care</span>
                </div>
              </div>
              <div className={styles.rmNote}>
                Already set? <a onClick={handleSkipRole}>Continue as {localTrack}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}