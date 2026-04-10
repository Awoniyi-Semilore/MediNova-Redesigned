// src/components/simulation/useQuestionEngine.js
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

/**
 * Enhanced Question Engine with Deterministic Shuffling
 * - Options shuffle per attempt, not per question view
 * - Correct answer position varies to prevent A-B-C pattern memorization
 * - Maintains consistent mapping during a single attempt
 */
export function useQuestionEngine(questions, onAnswer, onSimComplete, attemptKey = 'default') {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30)
  const [timerPaused, setTimerPaused] = useState(false)
  const [allAnswers, setAllAnswers] = useState([])
  
  // Store shuffled order per question - persists for entire attempt
  const [shuffleMaps, setShuffleMaps] = useState(() => 
    generateShuffleMaps(questions, attemptKey)
  )

  const timerRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const revealedRef = useRef(false)

  const q = questions[qIndex]
  
  // Get shuffled options for current question
  const shuffledOptions = useMemo(() => {
    if (!q?.options) return []
    const map = shuffleMaps[q.id] || generateSingleShuffle(q.options, q.id + attemptKey)
    return map.indices.map(i => q.options[i])
  }, [q, shuffleMaps, attemptKey])

  // Find which displayed option is correct (for UI highlighting)
  const correctDisplayIndex = useMemo(() => {
    if (!q?.options) return -1
    return shuffledOptions.findIndex(opt => opt.correct)
  }, [shuffledOptions, q])

  // Reset state when question changes
  useEffect(() => {
    if (!q) return
    
    setSelected(null)
    setRevealed(false)
    revealedRef.current = false
    setTimerPaused(false)
    setTimeLeft(q.timeLimit || 30)
    startTimeRef.current = Date.now()
  }, [qIndex, q?.id])

  // Timer logic
  useEffect(() => {
    if (revealed || timerPaused || !q) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          // Auto-reveal on timeout with no answer
          setTimeout(() => handleReveal(null), 0)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [qIndex, revealed, timerPaused, q])

  const handleReveal = useCallback((opt) => {
    if (revealedRef.current) return
    revealedRef.current = true
    setRevealed(true)
    
    if (timerRef.current) clearInterval(timerRef.current)

    const timeMs = Date.now() - startTimeRef.current
    
    // Map back to original option ID
    const originalOpt = opt ? q.options.find(o => o.id === opt.id) : null
    
    const answer = {
      questionId: q.id,
      selectedId: opt?.id || null,
      correct: originalOpt?.correct || false,
      timeMs,
      // Store shuffle info for analytics
      shuffleVersion: shuffleMaps[q.id]?.version || 0
    }

    onAnswer(answer)
    setAllAnswers(prev => [...prev, answer])
  }, [q, onAnswer, shuffleMaps])

  const handleSelect = useCallback((opt) => {
    if (revealed || !q) return
    setSelected(opt.id)
    handleReveal(opt)
  }, [revealed, q, handleReveal])

  const handleNext = useCallback(() => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1)
    } else {
      onSimComplete([...allAnswers])
    }
  }, [qIndex, questions.length, allAnswers, onSimComplete])

  const pauseTimer = useCallback(() => setTimerPaused(true), [])
  const resumeTimer = useCallback(() => setTimerPaused(false), [])

  return {
    q,
    qIndex,
    questions,
    selected,
    revealed,
    timeLeft,
    timerPaused,
    shuffledOptions,
    correctDisplayIndex,
    allAnswers,
    select: handleSelect,
    next: handleNext,
    pauseTimer,
    resumeTimer
  }
}

/**
 * Generate deterministic shuffle maps for all questions
 * Uses seeded random so same attemptKey = same shuffle (for consistency)
 * Different attemptKey = different shuffle (for replay variety)
 */
function generateShuffleMaps(questions, attemptKey) {
  const maps = {}
  
  questions.forEach(q => {
    maps[q.id] = generateSingleShuffle(q.options, q.id + attemptKey)
  })
  
  return maps
}

/**
 * Fisher-Yates shuffle with string seed
 */
function generateSingleShuffle(options, seed) {
  const indices = options.map((_, i) => i)
  
  // Simple seeded PRNG
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash = hash & hash
  }
  
  // Fisher-Yates with seeded random
  for (let i = indices.length - 1; i > 0; i--) {
    // Linear congruential generator for pseudo-random
    hash = (hash * 1664525 + 1013904223) % 4294967296
    const j = Math.abs(hash) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  
  return { indices, version: Math.abs(hash) % 1000 }
}

/**
 * Hook for tracking attempt history to generate unique keys
 */
export function useAttemptTracker(classId, simId) {
  const [attemptCount, setAttemptCount] = useState(() => {
    const key = `attempts_${classId}_${simId}`
    return parseInt(localStorage.getItem(key) || '0', 10)
  })

  const incrementAttempt = useCallback(() => {
    const key = `attempts_${classId}_${simId}`
    const next = attemptCount + 1
    localStorage.setItem(key, String(next))
    setAttemptCount(next)
    return next
  }, [classId, simId, attemptCount])

  const getAttemptKey = useCallback(() => {
    return `${classId}_${simId}_v${attemptCount}`
  }, [classId, simId, attemptCount])

  return { attemptCount, incrementAttempt, getAttemptKey }
}