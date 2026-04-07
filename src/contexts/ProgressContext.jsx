import { createContext, useContext, useState, useEffect, useMemo } from 'react'
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

  // 1. Setup Sync with Firebase
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
        setDoc(userRef, {
          email: currentUser.email,
          results: [],
          streak: 0,
          track: 'doctor',
          lastActivityDate: null
        })
      }
      setLoading(false)
    }, () => setLoading(false))

    return () => unsubscribe()
  }, [currentUser, authLoading])

  // --- CORE LOGIC ---

  const classScore = (id) => {
    const classResults = results.filter(r => r.classId === id)
    return classResults.length > 0 ? Math.max(...classResults.map(r => r.score || 0)) : null
  }

  /**
   * LEVEL LOGIC: Checks if all classes in a specific level are passed
   */
  const isLevelComplete = (levelName) => {
    const levelClasses = CURRICULUM.filter(c => c.level === levelName)
    return levelClasses.every(c => (classScore(c.id) || 0) >= (c.passMark || 70))
  }

  /**
   * ADVANCED PROGRESSION: 
   * Ensures user completes classes in order AND passes the previous one.
   */
  const classStatus = (id) => {
    const score = classScore(id)
    const currentClass = CURRICULUM.find(c => c.id === id)
    if (score !== null && score >= (currentClass?.passMark || 70)) return 'done'

    // Logic for 'next' (Unlocking)
    const currentIndex = CURRICULUM.findIndex(c => c.id === id)
    if (currentIndex === 0) return 'next' // First class is always open

    const prevClass = CURRICULUM[currentIndex - 1]
    const prevScore = classScore(prevClass.id)
    
    // If previous class is passed, this one is 'next'. Otherwise 'locked'.
    return (prevScore !== null && prevScore >= (prevClass.passMark || 70)) ? 'next' : 'locked'
  }

  /**
   * SAVE RESULTS:
   * Handles Firebase update and Streak logic.
   */
  const recordSimResult = async (newResult) => {
    if (!currentUser) return
    const userRef = doc(db, 'users', currentUser.uid)
    const todayStr = new Date().toISOString().split('T')[0]
    
    let updatedStreak = streak
    const docSnap = await getDoc(userRef)
    const lastDate = docSnap.data()?.lastActivityDate

    // Streak Logic
    if (!lastDate) {
      updatedStreak = 1
    } else if (lastDate !== todayStr) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      updatedStreak = (lastDate === yesterdayStr) ? streak + 1 : 1
    }

    // Prepare result object with deep answer history for the PDF/Review
    const finalResult = {
      ...newResult,
      date: new Date().toISOString(),
      // Ensure we keep only the best attempts or a clean history
    }

    await updateDoc(userRef, {
      results: arrayUnion(finalResult),
      streak: updatedStreak,
      lastActivityDate: todayStr
    })
  }

  // --- COMPUTED STATS ---
  const completedCount = useMemo(() => 
    new Set(results.filter(r => r.score >= 70).map(r => r.classId)).size
  , [results])

  const overallProgress = useMemo(() => 
    Math.round((completedCount / CURRICULUM.length) * 100)
  , [completedCount])

  const value = { 
    results, 
    streak, 
    track, 
    setTrack: (t) => updateDoc(doc(db, 'users', currentUser.uid), { track: t }), 
    completedCount, 
    overallProgress, 
    classStatus, 
    classScore, 
    isLevelComplete, // Needed for Download Certificate button
    recordSimResult, 
    loading 
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export const useProgress = () => useContext(ProgressContext)