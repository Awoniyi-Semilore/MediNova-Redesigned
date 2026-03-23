import { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './AuthContext'
import { CURRICULUM, LEVELS } from '../data/curriculum'

const ProgressContext = createContext()

export function useProgress() {
  return useContext(ProgressContext)
}

// Which classes belong to which certificate group
export const CERTIFICATE_GROUPS = [
  { id: 'clerkship',         label: 'Clerkship',          classIds: [1,2,3,4],     color: '#1565c0' },
  { id: 'junior_residency',  label: 'Junior Residency',   classIds: [5,6,7,8,9],   color: '#2e7d32' },
  { id: 'senior_residency',  label: 'Senior Residency',   classIds: [10,11,12,13,14], color: '#e65100' },
  { id: 'fellowship',        label: 'Fellowship',         classIds: [15,16,17,18], color: '#6a1b9a' },
  { id: 'board_certification',label:'Board Certification',classIds: [19,20],       color: '#c62828' },
]

// Achievements/badges
export const ACHIEVEMENTS = [
  { id: 'first_sim',       label: 'First Incision',      desc: 'Complete your first simulation',          icon: 'scalpel'   },
  { id: 'perfect_score',   label: 'Zero Defect',         desc: 'Score 100% on any simulation',            icon: 'star'      },
  { id: 'streak_7',        label: '7-Day Shift',         desc: 'Login 7 days in a row',                   icon: 'flame'     },
  { id: 'streak_30',       label: 'Iron Resident',       desc: 'Login 30 days in a row',                  icon: 'shield'    },
  { id: 'clerkship_done',  label: 'Clerkship Graduate',  desc: 'Complete all Clerkship classes',          icon: 'cert'      },
  { id: 'jr_done',         label: 'Junior Resident',     desc: 'Complete all Junior Residency classes',   icon: 'cert'      },
  { id: 'sr_done',         label: 'Senior Resident',     desc: 'Complete all Senior Residency classes',   icon: 'cert'      },
  { id: 'fellow_done',     label: 'Fellow',              desc: 'Complete all Fellowship classes',         icon: 'cert'      },
  { id: 'board_done',      label: 'Board Certified',     desc: 'Pass the Chief of Staff Examination',     icon: 'crown'     },
  { id: 'speed_demon',     label: 'Speed Rounds',        desc: 'Complete a sim with 0 wrong answers under 60s avg', icon: 'bolt' },
  { id: 'comeback',        label: 'Second Opinion',      desc: 'Retry a failed sim and pass',             icon: 'refresh'   },
  { id: 'both_tracks',     label: 'Cross-Trained',       desc: 'Complete Class 01 on both Doctor and Nurse tracks', icon: 'swap' },
]

// Default progress shape for a new user
function defaultProgress() {
  return {
    track: 'doctor',       // 'doctor' | 'nurse'
    streak: 0,
    lastLoginDate: null,
    totalXp: 0,
    classes: {},           // { classId: { status, score, attempts, completedAt } }
    certificates: {},      // { groupId: { earned, earnedAt } }
    achievements: {},      // { achievementId: { earned, earnedAt } }
    simHistory: [],        // [{ classId, simId, score, timeMs, date, track }]
  }
}

export function ProgressProvider({ children }) {
  const { currentUser } = useAuth()
  const [progress, setProgress] = useState(defaultProgress())
  const [loading, setLoading] = useState(true)

  // Load progress from Firestore on login
  useEffect(() => {
    if (!currentUser) { setLoading(false); return }

    async function loadProgress() {
      try {
        const ref = doc(db, 'progress', currentUser.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setProgress({ ...defaultProgress(), ...snap.data() })
        } else {
          // New user — create default progress document
          const def = defaultProgress()
          await setDoc(ref, def)
          setProgress(def)
        }
      } catch (err) {
        console.error('Failed to load progress:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
    updateStreak()
  }, [currentUser])

  // Update streak on login
  async function updateStreak() {
    if (!currentUser) return
    const today = new Date().toDateString()
    const ref = doc(db, 'progress', currentUser.uid)

    setProgress(prev => {
      const last = prev.lastLoginDate
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      let newStreak = prev.streak
      if (last === today) {
        return prev // already logged in today
      } else if (last === yesterday.toDateString()) {
        newStreak = prev.streak + 1
      } else if (!last) {
        newStreak = 1
      } else {
        newStreak = 1 // streak broken
      }

      const updated = { ...prev, streak: newStreak, lastLoginDate: today }
      updateDoc(ref, { streak: newStreak, lastLoginDate: today }).catch(console.error)
      return updated
    })
  }

  // Record a completed simulation attempt
  async function recordSimResult({ classId, simId, subsimId, score, timeMs, track }) {
    if (!currentUser) return
    const ref = doc(db, 'progress', currentUser.uid)

    const historyEntry = {
      classId, simId, subsimId, score, timeMs,
      track: track || progress.track,
      date: new Date().toISOString(),
    }

    const classKey = `classes.${classId}`
    const existing = progress.classes[classId] || { attempts: 0, bestScore: 0 }
    const newBestScore = Math.max(existing.bestScore || 0, score)
    const newAttempts = (existing.attempts || 0) + 1
    const passed = score >= (CURRICULUM.find(c => c.id === classId)?.passMark || 70)

    const classUpdate = {
      attempts: newAttempts,
      bestScore: newBestScore,
      lastScore: score,
      status: passed ? 'done' : existing.status === 'done' ? 'done' : 'active',
      completedAt: passed && !existing.completedAt ? new Date().toISOString() : existing.completedAt,
      track: track || progress.track,
    }

    const newProgress = {
      ...progress,
      classes: { ...progress.classes, [classId]: classUpdate },
      simHistory: [historyEntry, ...progress.simHistory].slice(0, 200),
      totalXp: progress.totalXp + Math.round(score * 1.5),
    }

    // Check certificate unlocks
    const updatedProgress = checkCertificates(newProgress)
    // Check achievement unlocks
    const finalProgress = checkAchievements(updatedProgress)

    setProgress(finalProgress)

    try {
      await updateDoc(ref, {
        [`classes.${classId}`]: classUpdate,
        simHistory: finalProgress.simHistory,
        totalXp: finalProgress.totalXp,
        certificates: finalProgress.certificates,
        achievements: finalProgress.achievements,
      })
    } catch (err) {
      console.error('Failed to save progress:', err)
    }

    return finalProgress
  }

  // Set role track (doctor/nurse)
  async function setTrack(track) {
    if (!currentUser) return
    const ref = doc(db, 'progress', currentUser.uid)
    setProgress(prev => ({ ...prev, track }))
    await updateDoc(ref, { track }).catch(console.error)
  }

  // Check if any certificate groups are newly complete
  function checkCertificates(prog) {
    const updated = { ...prog, certificates: { ...prog.certificates } }

    CERTIFICATE_GROUPS.forEach(group => {
      if (updated.certificates[group.id]?.earned) return
      const allDone = group.classIds.every(id => updated.classes[id]?.status === 'done')
      if (allDone) {
        updated.certificates[group.id] = {
          earned: true,
          earnedAt: new Date().toISOString(),
        }
      }
    })

    return updated
  }

  // Check if any achievements are newly unlocked
  function checkAchievements(prog) {
    const updated = { ...prog, achievements: { ...prog.achievements } }

    function unlock(id) {
      if (!updated.achievements[id]?.earned) {
        updated.achievements[id] = { earned: true, earnedAt: new Date().toISOString() }
      }
    }

    if (prog.simHistory.length >= 1) unlock('first_sim')
    if (prog.streak >= 7) unlock('streak_7')
    if (prog.streak >= 30) unlock('streak_30')
    if (prog.simHistory.some(s => s.score === 100)) unlock('perfect_score')
    if (prog.certificates['clerkship']?.earned) unlock('clerkship_done')
    if (prog.certificates['junior_residency']?.earned) unlock('jr_done')
    if (prog.certificates['senior_residency']?.earned) unlock('sr_done')
    if (prog.certificates['fellowship']?.earned) unlock('fellow_done')
    if (prog.certificates['board_certification']?.earned) unlock('board_done')

    const failedThenPassed = prog.simHistory.some((s, i) => {
      const prev = prog.simHistory.slice(i + 1).find(p => p.classId === s.classId && p.simId === s.simId)
      return prev && prev.score < 70 && s.score >= 70
    })
    if (failedThenPassed) unlock('comeback')

    return updated
  }

  // Derived values used across the app
  const classStatus = (classId) => progress.classes[classId]?.status || getDefaultStatus(classId)
  const classScore = (classId) => progress.classes[classId]?.bestScore || null
  const classAttempts = (classId) => progress.classes[classId]?.attempts || 0
  const isCertEarned = (groupId) => progress.certificates[groupId]?.earned || false
  const isAchievementEarned = (id) => progress.achievements[id]?.earned || false

  const completedCount = CURRICULUM.filter(c => classStatus(c.id) === 'done').length
  const activeClass = CURRICULUM.find(c => classStatus(c.id) === 'active') || CURRICULUM[0]
  const overallProgress = Math.round((completedCount / CURRICULUM.length) * 100)
  const earnedCertificates = CERTIFICATE_GROUPS.filter(g => isCertEarned(g.id))
  const urgentCount = 2 // placeholder — will connect to real urgent pages later

  return (
    <ProgressContext.Provider value={{
      progress,
      loading,
      track: progress.track,
      streak: progress.streak,
      totalXp: progress.totalXp,
      completedCount,
      activeClass,
      overallProgress,
      earnedCertificates,
      urgentCount,
      classStatus,
      classScore,
      classAttempts,
      isCertEarned,
      isAchievementEarned,
      recordSimResult,
      setTrack,
      CERTIFICATE_GROUPS,
      ACHIEVEMENTS,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

// Determine default status for a class based on what's been completed
function getDefaultStatus(classId) {
  if (classId === 1) return 'active'
  return 'locked'
}