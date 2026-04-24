// src/contexts/ProgressContext.jsx

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore'
import { CURRICULUM } from '../data/curriculum'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  // ============================================
  // CUSTOM AUTH: Read from localStorage instead of Firebase Auth
  // ============================================
  const [sessionUser, setSessionUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

    // Load user from localStorage on mount AND when window regains focus
  useEffect(() => {
    function checkSession() {
      console.log('[ProgressContext] Checking for session user...')
      const raw = localStorage.getItem('medinova_session_user')
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          console.log('[ProgressContext] ✅ Session user found:', parsed.uid, parsed.email)
          setSessionUser(parsed)
        } catch (e) {
          console.error('[ProgressContext] ❌ Failed to parse session user:', e)
          localStorage.removeItem('medinova_session_user')
          setSessionUser(null)
        }
      } else {
        console.log('[ProgressContext] ⚠️ No session user in localStorage. User not logged in.')
        setSessionUser(null)
      }
      setAuthLoading(false)
    }

    checkSession()

    // Re-check when user navigates back to this tab (after login in same tab)
    window.addEventListener('focus', checkSession)
    return () => window.removeEventListener('focus', checkSession)
  }, [])

  // Listen for login events from other tabs/components
    useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'medinova_session_user') {
        console.log('[ProgressContext] 🔄 Storage event detected for session user')
        const raw = e.newValue || localStorage.getItem('medinova_session_user')
        if (raw) {
          try {
            const parsed = JSON.parse(raw)
            console.log('[ProgressContext] ✅ Updated session user:', parsed.uid)
            setSessionUser(parsed)
          } catch (err) {
            console.error('[ProgressContext] ❌ Parse error on storage event:', err)
          }
        } else {
          console.log('[ProgressContext] 🚪 Session user removed from storage')
          setSessionUser(null)
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    // Also check immediately in case localStorage was set before listener attached
    handleStorage({ key: 'medinova_session_user' })
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const [results, setResults] = useState([])
  const [streak, setStreak] = useState(0)
  const [track, setTrackState] = useState('doctor')
  const [loading, setLoading] = useState(true)

  // Firestore listener using sessionUser.uid instead of currentUser.uid
  useEffect(() => {
    if (authLoading) {
      console.log('[ProgressContext] ⏳ Auth still loading, waiting...')
      return
    }

    if (!sessionUser) {
      console.log('[ProgressContext] ⚠️ No session user. Skipping Firestore listener.')
      setResults([])
      setStreak(0)
      setTrackState('doctor')
      setLoading(false)
      return
    }

        console.log('[ProgressContext] 🔌 Attaching Firestore listener for user:', sessionUser.uid)
    const userRef = doc(db, 'hospital', 'main', 'care_users', sessionUser.uid)

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('[ProgressContext] 📥 Firestore data received:', {
          resultCount: (data.results || []).length,
          streak: data.streak,
          track: data.track
        })
        setResults(data.results || [])
        setStreak(data.streak || 0)
        setTrackState(data.track || 'doctor')
      } else {
        console.log('[ProgressContext] 🆕 User doc does not exist. Creating with defaults.')
        setDoc(userRef, {
          email: sessionUser.email,
          name: sessionUser.name,
          results: [],
          streak: 0,
          track: 'doctor',
          lastActivityDate: null
        })
        setResults([])
        setStreak(0)
        setTrackState('doctor')
      }
      setLoading(false)
    }, (err) => {
      console.error('[ProgressContext] ❌ Firestore snapshot error:', err)
      setLoading(false)
    })

    return () => {
      console.log('[ProgressContext] 🔌 Detaching Firestore listener')
      unsubscribe()
    }
  }, [sessionUser, authLoading])

  // =========================
  // CORE LOGIC (unchanged logic, uses sessionUser instead of currentUser)
  // =========================

  const classScore = useCallback((id) => {
    const normalizedId = String(id)
    const classResults = results.filter(
      r => String(r.classId) === normalizedId
    )
    const score = classResults.length > 0
      ? Math.max(...classResults.map(r => r.score || 0))
      : null
    console.log(`[ProgressContext] classScore(${id}):`, score, `from ${classResults.length} results`)
    return score
  }, [results])

  const classAttempts = useCallback((id) => {
    const normalizedId = String(id)
    const count = results.filter(
      r => String(r.classId) === normalizedId
    ).length
    console.log(`[ProgressContext] classAttempts(${id}):`, count)
    return count
  }, [results])

  const classStatus = useCallback((id) => {
    const normalizedId = String(id)
    const currentClass = CURRICULUM.find(
      c => String(c.id) === normalizedId
    )
    if (!currentClass) {
      console.log(`[ProgressContext] classStatus(${id}): class not found in CURRICULUM`)
      return 'locked'
    }

    const score = classScore(normalizedId)

    // Already completed
    if (score !== null && score >= (currentClass.passMark || 70)) {
      console.log(`[ProgressContext] classStatus(${id}): done (score=${score}, passMark=${currentClass.passMark || 70})`)
      return 'done'
    }

    const currentIndex = CURRICULUM.findIndex(
      c => String(c.id) === normalizedId
    )

    if (currentIndex === -1) return 'locked'
    if (currentIndex === 0) {
      console.log(`[ProgressContext] classStatus(${id}): next (first class)`)
      return 'next'
    }

    const prevClass = CURRICULUM[currentIndex - 1]
    if (!prevClass) return 'locked'

    const prevScore = classScore(prevClass.id)

    const status = (prevScore !== null && prevScore >= (prevClass.passMark || 70))
      ? 'next'
      : 'locked'
    console.log(`[ProgressContext] classStatus(${id}): ${status} (prevClass=${prevClass.id}, prevScore=${prevScore})`)
    return status
  }, [classScore])

  const isLevelComplete = useCallback((levelName) => {
    const levelClasses = CURRICULUM.filter(c => c.level === levelName)
    return levelClasses.every(
      c => (classScore(c.id) || 0) >= (c.passMark || 70)
    )
  }, [classScore])

  const activeClass = useMemo(() => {
    for (const cls of CURRICULUM) {
      if (classStatus(cls.id) === 'next') return cls
    }
    return null
  }, [classStatus])

  const recordSimResult = useCallback(async (newResult) => {
    if (!sessionUser) {
      console.log('[ProgressContext] ❌ recordSimResult: No session user. Cannot save.')
      return
    }

        console.log('[ProgressContext] 💾 Saving result for user:', sessionUser.uid, 'Result:', newResult)
    const userRef = doc(db, 'hospital', 'main', 'care_users', sessionUser.uid)

    try {
      const docSnap = await getDoc(userRef)
      const userData = docSnap.data() || {}

      const currentStreak = typeof userData.streak === 'number'
        ? userData.streak
        : 0

      const lastDate = userData.lastActivityDate || null

      const now = new Date()
      const todayStr = now.toISOString().split('T')[0]

      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      let updatedStreak = currentStreak

      if (!lastDate) updatedStreak = 1
      else if (lastDate === todayStr) updatedStreak = currentStreak
      else if (lastDate === yesterdayStr) updatedStreak = currentStreak + 1
      else updatedStreak = 1

      const finalResult = {
        ...newResult,
        classId: String(newResult.classId),
        score: Math.round(newResult.score || 0),
        date: new Date().toISOString(),
      }

      console.log('[ProgressContext] 📝 Writing to Firestore:', { finalResult, updatedStreak, todayStr })

      await updateDoc(userRef, {
        results: arrayUnion(finalResult),
        streak: updatedStreak,
        lastActivityDate: todayStr
      })

      console.log('[ProgressContext] ✅ Result saved successfully!')
    } catch (err) {
      console.error('[ProgressContext] ❌ Failed to save result:', err)
      throw err
    }
  }, [sessionUser])

  const completedCount = useMemo(() => {
    const count = new Set(
      results
        .filter(r => (r.score || 0) >= 70)
        .map(r => String(r.classId))
    ).size
    console.log('[ProgressContext] completedCount:', count)
    return count
  }, [results])

  const overallProgress = useMemo(() => {
    const progress = Math.round((completedCount / CURRICULUM.length) * 100)
    console.log('[ProgressContext] overallProgress:', progress + '%')
    return progress
  }, [completedCount])

  const isClassUnlocked = useCallback((id) => {
    return classStatus(id) !== 'locked'
  }, [classStatus])

  const setTrack = useCallback((t) => {
    setTrackState(t)
    if (sessionUser) {
            const userRef = doc(db, 'hospital', 'main', 'care_users', sessionUser.uid)
      updateDoc(userRef, { track: t })
        .then(() => console.log('[ProgressContext] ✅ Track updated to:', t))
        .catch(err => console.error('[ProgressContext] ❌ Track update failed:', err))
    } else {
      console.log('[ProgressContext] ⚠️ Cannot save track: no session user')
    }
  }, [sessionUser])

  const value = {
    results,
    streak,
    track,
    activeClass,
    setTrack,
    completedCount,
    overallProgress,
    classStatus,
    classScore,
    classAttempts,
    isLevelComplete,
    isClassUnlocked,
    recordSimResult,
    loading: loading || authLoading,
    // Expose session user for components that need it
    sessionUser
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}