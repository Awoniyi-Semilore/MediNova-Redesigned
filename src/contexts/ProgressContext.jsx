import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { db } from '../lib/firebase'
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore'
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

    const timer = setTimeout(() => {
      if (loading) setLoading(false)
    }, 5000)

    const userRef = doc(db, 'users', currentUser.uid)

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      clearTimeout(timer)
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
    }, (error) => {
      clearTimeout(timer)
      setLoading(false)
    })

    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  }, [currentUser, authLoading])

  const updateTrack = async (newTrack) => {
    setTrack(newTrack)
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid)
      try {
        await updateDoc(userRef, { track: newTrack })
      } catch (e) {
        await setDoc(userRef, { track: newTrack }, { merge: true })
      }
    }
  }

  // --- CORE UTILITY FUNCTIONS ---

  const classScore = (id) => {
    const classResults = results.filter(r => r.classId === id)
    if (classResults.length === 0) return null
    return Math.max(...classResults.map(r => r.score || 0))
  }

  const classAttempts = (id) => {
    return results.filter(r => r.classId === id).length
  }

  const classStatus = (id) => {
    const isDone = results.some(r => r.classId === id)
    if (isDone) return 'done'

    // Simple Progression Logic: 
    // If it's the first class, or the previous class is done, it's 'next'
    const previousClassDone = id === 1 || results.some(r => r.classId === id - 1)
    
    if (previousClassDone) return 'next'
    return 'locked'
  }

  // --- COMPUTED STATS ---

  const completedCount = useMemo(() => {
    return new Set(results.map(r => r.classId)).size
  }, [results])

  const overallProgress = useMemo(() => {
    if (CURRICULUM.length === 0) return 0
    return Math.round((completedCount / CURRICULUM.length) * 100)
  }, [completedCount])

  const avgScore = useMemo(() => {
    if (results.length === 0) return 0
    const total = results.reduce((acc, curr) => acc + (curr.score || 0), 0)
    return Math.round(total / results.length)
  }, [results])

  const activeClass = useMemo(() => {
    const completedIds = results.map(r => r.classId)
    return CURRICULUM.find(c => !completedIds.includes(c.id)) || CURRICULUM[0]
  }, [results])

  const recordSimResult = async (newResult) => {
    if (!currentUser) return
    const userRef = doc(db, 'users', currentUser.uid)
    const todayStr = new Date().toISOString().split('T')[0]
    
    let updatedStreak = streak
    const docSnap = await getDoc(userRef)
    const lastDate = docSnap.data()?.lastActivityDate

    if (!lastDate) updatedStreak = 1
    else if (lastDate !== todayStr) {
      const diff = Math.floor((new Date(todayStr) - new Date(lastDate)) / 86400000)
      updatedStreak = diff === 1 ? streak + 1 : 1
    }

    const updatedResults = [...results, { ...newResult, date: new Date().toISOString() }]
    await updateDoc(userRef, {
      results: updatedResults,
      streak: updatedStreak,
      lastActivityDate: todayStr
    })
  }

  const value = { 
    results, 
    streak, 
    track, 
    setTrack: updateTrack, 
    completedCount, 
    overallProgress, 
    avgScore, 
    activeClass, 
    classStatus, 
    classScore, 
    classAttempts, 
    recordSimResult, 
    loading 
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => useContext(ProgressContext)