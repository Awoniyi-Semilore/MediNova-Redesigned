// src/contexts/ProgressContext.jsx

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { CURRICULUM } from '../data/curriculum'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const { currentUser, loading: authLoading } = useAuth()
  const [results, setResults] = useState([])
  const [streak, setStreak] = useState(0)
  const [track, setTrack] = useState('doctor')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!currentUser) {
      setLoading(false)
      return
    }

    const userRef = doc(db, 'users', currentUser.uid)
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setResults(data.results || [])
        setStreak(data.streak || 0)
        setTrack(data.track || 'doctor')
      } else {
        // Create new user document
        setDoc(userRef, {
          email: currentUser.email,
          results: [],
          streak: 0,
          track: 'doctor',
          lastActivityDate: null
        })
      }
      setLoading(false)
    }, (err) => {
      console.error('Firebase snapshot error:', err)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [currentUser, authLoading])

  // --- CORE LOGIC ---

  const classScore = useCallback((id) => {
    const normalizedId = String(id)
    const classResults = results.filter(r => String(r.classId) === normalizedId)
    return classResults.length > 0 
      ? Math.max(...classResults.map(r => r.score || 0)) 
      : null
  }, [results])

  const classAttempts = useCallback((id) => {
    const normalizedId = String(id)
    return results.filter(r => String(r.classId) === normalizedId).length
  }, [results])

  const isLevelComplete = useCallback((levelName) => {
    const levelClasses = CURRICULUM.filter(c => c.level === levelName)
    return levelClasses.every(c => (classScore(c.id) || 0) >= (c.passMark || 70))
  }, [classScore])

  const classStatus = useCallback((id) => {
    const normalizedId = typeof id === 'string' ? parseInt(id, 10) : id
    const score = classScore(normalizedId)
    const currentClass = CURRICULUM.find(c => c.id === normalizedId)
    
    if (!currentClass) return 'locked'
    
    // If passed, always allow access
    if (score !== null && score >= (currentClass?.passMark || 70)) {
      return 'done'
    }

    // First class is always available
    const currentIndex = CURRICULUM.findIndex(c => c.id === normalizedId)
    if (currentIndex === 0) return 'next'

    // Check previous class
    const prevClass = CURRICULUM[currentIndex - 1]
    const prevScore = classScore(prevClass.id)
    
    return (prevScore !== null && prevScore >= (prevClass.passMark || 70)) ? 'next' : 'locked'
  }, [classScore])

  // Get active class (next available)
  const activeClass = useMemo(() => {
    for (const cls of CURRICULUM) {
      const status = classStatus(cls.id)
      if (status === 'next') return cls
    }
    return null
  }, [classStatus])

  const recordSimResult = useCallback(async (newResult) => {
    if (!currentUser) {
      console.error('No current user, cannot save result')
      return
    }

    const userRef = doc(db, 'users', currentUser.uid)
    
    // Get current data first
    const docSnap = await getDoc(userRef)
    const userData = docSnap.data() || {}
    const currentStreak = userData.streak || 0
    const lastDate = userData.lastActivityDate
    
    // Calculate dates properly
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    
    // Calculate yesterday's date string
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    let updatedStreak = currentStreak

    if (!lastDate) {
      // First activity ever
      updatedStreak = 1
    } else if (lastDate === todayStr) {
      // Already active today, keep streak
      updatedStreak = currentStreak
    } else if (lastDate === yesterdayStr) {
      // Was active yesterday, increment streak
      updatedStreak = currentStreak + 1
    } else {
      // Streak broken, start new
      updatedStreak = 1
    }

    // Normalize classId to STRING for consistency
    const finalResult = {
      ...newResult,
      classId: String(newResult.classId),
      score: Math.round(newResult.score || 0),
      date: new Date().toISOString(),
    }

    try {
      await updateDoc(userRef, {
        results: arrayUnion(finalResult),
        streak: updatedStreak,
        lastActivityDate: todayStr
      })
      console.log('✅ Saved result, streak:', updatedStreak)
    } catch (err) {
      console.error('❌ Firebase save failed:', err)
      throw err
    }
  }, [currentUser])

  const unlockNextClass = useCallback(async (completedClassId) => {
    console.log('Unlocking next after class:', completedClassId)
    // Next class is automatically available via classStatus logic
  }, [])

  const completedCount = useMemo(() => {
    return new Set(results.filter(r => r.score >= 70).map(r => r.classId)).size
  }, [results])

  const overallProgress = useMemo(() => {
    return Math.round((completedCount / CURRICULUM.length) * 100)
  }, [completedCount])

  const value = { 
    results, 
    streak, 
    track, 
    activeClass,  // ADDED: activeClass
    setTrack: (t) => {
        setTrack(t);
        if (currentUser) {
          updateDoc(doc(db, 'users', currentUser.uid), { track: t })
            .catch(err => console.error('Track update failed:', err))
        }
    }, 
    completedCount, 
    overallProgress, 
    classStatus, 
    classScore, 
    classAttempts,
    isLevelComplete, 
    recordSimResult, 
    unlockNextClass,
    loading 
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}