// src/components/simulation/SimDebrief.jsx
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATION DEBRIEF - Fixed Dark Mode & Contrast
// ─────────────────────────────────────────────────────────────────────────────

export function SimulationDebrief({
  cls, 
  sim, 
  subsim, 
  answers, 
  score, 
  accentColor, 
  level, 
  onContinue,
  onRetry,
  onBackToDashboard,  // NEW: Back to dashboard handler
  isSaving = false,
  minPassScore = 70   // NEW: Minimum score to show continue button
}) {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())
  const [showDetails, setShowDetails] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect system/Browser dark mode preference
  useEffect(() => {
    // Check localStorage first (if user has a preference saved)
    const savedMode = localStorage.getItem('medinova-theme')
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark')
    } else {
      // Fall back to system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDarkMode(mediaQuery.matches)
      
      // Listen for changes
      const handler = (e) => setIsDarkMode(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  // Also listen for custom theme changes (if your app has a theme toggle)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('medinova-theme')
      if (savedMode) setIsDarkMode(savedMode === 'dark')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  const navigate = useNavigate()
  function onBackToDashboard() {
    navigate('/dashboard')
  }

  const passed = score >= (cls?.passMark || 70)
  const canContinue = score >= minPassScore  // NEW: Threshold check
  const questions = subsim?.questions || []
  
  const toggleQuestion = (qId) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev)
      next.has(qId) ? next.delete(qId) : next.add(qId)
      return next
    })
  }

  const correctCount = answers.filter(a => a.correct).length
  const totalCount = answers.length
  const avgTime = totalCount > 0
    ? Math.round(answers.reduce((s, a) => s + (a.timeMs || 0), 0) / totalCount / 1000)
    : 0

  // Calculate grade
  const grade = useMemo(() => {
    if (score >= 90) return { label: 'Outstanding', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
    if (score >= 80) return { label: 'Proficient', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' }
    if (score >= 70) return { label: 'Pass', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' }
    return { label: 'Review Needed', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' }
  }, [score])

  // FIXED: Proper dark mode color scheme with good contrast
  const theme = useMemo(() => {
    if (isDarkMode) {
      return {
        bg: '#0a0f1a',           // Deep navy background
        card: '#111827',         // Slightly lighter card
        cardHover: '#1f2937',    // Hover state
        text: '#f9fafb',         // Near-white text (high contrast)
        textSecondary: '#d1d5db', // Light gray for secondary
        textMuted: '#9ca3af',    // Muted text (but still readable)
        border: '#374151',       // Visible borders
        borderSubtle: '#1f2937', // Subtle borders
        success: '#10b981',      // Green
        successBg: 'rgba(16, 185, 129, 0.15)',
        error: '#ef4444',        // Red
        errorBg: 'rgba(239, 68, 68, 0.15)',
        warning: '#f59e0b',      // Amber
        warningBg: 'rgba(245, 158, 11, 0.15)',
        accentGlow: `${accentColor}30`, // 30 = ~20% opacity
      }
    }
    // Light mode
    return {
      bg: '#f8fafc',
      card: '#ffffff',
      cardHover: '#f1f5f9',
      text: '#111827',         // Near-black (high contrast)
      textSecondary: '#374151',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      borderSubtle: '#f3f4f6',
      success: '#059669',
      successBg: 'rgba(5, 150, 105, 0.1)',
      error: '#dc2626',
      errorBg: 'rgba(220, 38, 38, 0.1)',
      warning: '#d97706',
      warningBg: 'rgba(217, 119, 6, 0.1)',
      accentGlow: `${accentColor}20`,
    }
  }, [isDarkMode, accentColor])

  // Icon components (inline SVG)
  const Icon = ({ name, size = 20, color = 'currentColor' }) => {
    const icons = {
      check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
      x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
      chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
      chevronUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
      trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
      clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
      arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
      rotateCcw: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
      home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      loader: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
    }
    return icons[name] || null
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text,
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      {/* ─── HEADER ─── */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px ${accentColor}40`
        }}>
          <Icon name="check" size={24} color="white" />
        </div>
        <div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: theme.textMuted,
            marginBottom: '0.25rem'
          }}>
            {cls?.level?.replace(/_/g, ' ')} · Class {cls?.num}
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
            color: theme.text  // FIXED: Explicit text color
          }}>
            {subsim?.title || sim?.title}
          </h1>
        </div>
      </div>

      {/* ─── SCORE CARD ─── */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: theme.card,
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: isDarkMode 
          ? '0 25px 50px -12px rgba(0,0,0,0.5)' 
          : '0 25px 50px -12px rgba(0,0,0,0.1)',
        border: `1px solid ${theme.border}`,
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}/>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Circular Score Display */}
          <div style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            marginBottom: '1.5rem'
          }}>
            <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="90" cy="90" r="80" fill="none" stroke={theme.border} strokeWidth="12"/>
              <circle cx="90" cy="90" r="80" fill="none" stroke={passed ? theme.success : grade.color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(score / 100) * 502} 502`} style={{ transition: 'stroke-dasharray 1s ease-out' }}/>
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, color: theme.text }}>
                {score}
              </span>
              <span style={{ fontSize: '0.875rem', color: theme.textMuted, marginTop: '0.25rem' }}>
                out of 100
              </span>
            </div>
          </div>

          {/* Grade Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            background: grade.bg,
            color: grade.color,
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1rem',
            border: `1px solid ${grade.color}30`
          }}>
            <Icon name={score >= 90 ? 'trophy' : score >= 70 ? 'check' : 'x'} size={16} color={grade.color} />
            {grade.label}
          </div>

          {/* Threshold Warning */}
          {!canContinue && (
            <div style={{
              padding: '0.75rem 1rem',
              background: theme.errorBg,
              border: `1px solid ${theme.error}40`,
              borderRadius: '10px',
              color: theme.error,
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Icon name="x" size={16} color={theme.error} />
              Score below {minPassScore}% - Retry required to continue
            </div>
          )}

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
            <StatItem icon={<Icon name="check" size={18} color={theme.success} />} value={`${correctCount}/${totalCount}`} label="Correct" color={theme.success} textColor={theme.text} mutedColor={theme.textMuted} />
            <StatItem icon={<Icon name="clock" size={18} color={theme.textMuted} />} value={`${avgTime}s`} label="Avg Time" color={theme.textMuted} textColor={theme.text} mutedColor={theme.textMuted} />
            <StatItem icon={<Icon name="target" size={18} color={theme.warning} />} value={`${cls?.passMark || 70}%`} label="Pass Mark" color={theme.warning} textColor={theme.text} mutedColor={theme.textMuted} />
          </div>
        </div>
      </div>

      {/* ─── ACTION BUTTONS ─── */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Primary Actions */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Continue button - only show if passed threshold */}
          {canContinue && (
            <button
              onClick={onContinue}
              disabled={isSaving}
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: accentColor,
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 20px ${accentColor}50`,
                transition: 'all 0.2s ease'
              }}
            >
              {isSaving ? (
                <><Icon name="loader" size={20} color="white" /> Saving...</>
              ) : (
                <><>Continue</> <Icon name="arrowRight" size={20} color="white" /></>
              )}
            </button>
          )}
          
          {/* Retry button - always show, but emphasize if failed threshold */}
          <button
            onClick={onRetry}
            style={{
              flex: canContinue ? '0 0 auto' : 1,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: `2px solid ${!canContinue ? accentColor : theme.border}`,
              background: !canContinue ? `${accentColor}15` : 'transparent',
              color: !canContinue ? accentColor : theme.text,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="rotateCcw" size={20} /> 
            {!canContinue ? 'Retry Required' : 'Retry'}
          </button>
        </div>

        {/* Back to Dashboard - always available */}
        {/* <button
          onClick={onBackToDashboard }
          style={{
            width: '100%',
            padding: '0.875rem 1.5rem',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            background: theme.card,
            color: theme.textSecondary,
            fontSize: '0.9375rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Icon name="dashboard" size={18} color={theme.textMuted} />
          Back to Dashboard
        </button> */}
      </div>

      {/* ─── QUESTION REVIEW ─── */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: theme.card,
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            width: '100%',
            padding: '1.25rem 1.5rem',
            border: 'none',
            background: 'transparent',
            color: theme.text,
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left'
          }}
        >
          <span>Question Review</span>
          <Icon name={showDetails ? 'chevronUp' : 'chevronDown'} size={20} color={theme.textMuted} />
        </button>

        {showDetails && (
          <div style={{ borderTop: `1px solid ${theme.border}` }}>
            {questions.map((q, idx) => {
              const answer = answers.find(a => a.questionId === q.id)
              const isCorrect = answer?.correct
              const isExpanded = expandedQuestions.has(q.id)

              return (
                <div key={q.id} style={{ borderBottom: `1px solid ${theme.borderSubtle}` }}>
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      border: 'none',
                      background: isCorrect ? theme.successBg : theme.errorBg,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isCorrect ? theme.success : theme.error,
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <Icon name={isCorrect ? 'check' : 'x'} size={18} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.text, marginBottom: '0.25rem', lineHeight: 1.4 }}>
                        Q{idx + 1}: {q.stem.substring(0, 100)}{q.stem.length > 100 ? '...' : ''}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: isCorrect ? theme.success : theme.error, fontWeight: 500 }}>
                        {isCorrect ? 'Correct' : 'Incorrect'} · {Math.round((answer?.timeMs || 0) / 1000)}s
                      </div>
                    </div>
                    <Icon name={isExpanded ? 'chevronUp' : 'chevronDown'} size={18} color={theme.textMuted} />
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '1rem 1.5rem 1.5rem',
                      background: isDarkMode ? '#0a0f1a' : '#f8fafc',
                      borderTop: `1px solid ${theme.borderSubtle}`
                    }}>
                      {/* Your Answer */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.textMuted, marginBottom: '0.5rem' }}>
                          Your Answer
                        </div>
                        <div style={{
                          padding: '0.875rem 1rem',
                          borderRadius: '8px',
                          background: isCorrect ? theme.successBg : theme.errorBg,
                          border: `1px solid ${isCorrect ? theme.success : theme.error}50`,
                          color: theme.text,
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {q.options.find(o => o.id === answer?.selectedId)?.text || 'No answer'}
                        </div>
                      </div>

                      {/* Correct Answer (if wrong) */}
                      {!isCorrect && (
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.success, marginBottom: '0.5rem' }}>
                            Correct Answer
                          </div>
                          <div style={{
                            padding: '0.875rem 1rem',
                            borderRadius: '8px',
                            background: theme.successBg,
                            border: `1px solid ${theme.success}50`,
                            color: theme.text,
                            fontSize: '0.875rem',
                            fontWeight: 500
                          }}>
                            {q.options.find(o => o.correct)?.text}
                          </div>
                        </div>
                      )}

                      {/* Explanation */}
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: accentColor, marginBottom: '0.5rem' }}>
                          Explanation
                        </div>
                        <div style={{
                          padding: '1rem',
                          borderRadius: '8px',
                          background: theme.card,
                          border: `1px solid ${theme.border}`,
                          color: theme.textSecondary,
                          fontSize: '0.875rem',
                          lineHeight: 1.6
                        }}>
                          {q.options.find(o => o.correct)?.explanation || 'No explanation available'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function StatItem({ icon, value, label, color, textColor, mutedColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: color, fontSize: '1.25rem', fontWeight: 700 }}>
        {icon}
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: mutedColor, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  )
}

// ClassDebrief component also updated for dark mode...
export function ClassDebrief({ cls, answers, track, accentColor, onDone, error, saveSuccess }) {
  // Similar dark mode implementation...
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  useEffect(() => {
    const savedMode = localStorage.getItem('medinova-theme')
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark')
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  const theme = isDarkMode ? {
    bg: '#0a0f1a',
    card: '#111827',
    text: '#f9fafb',
    textMuted: '#9ca3af',
    success: '#10b981',
    error: '#ef4444'
  } : {
    bg: '#f8fafc',
    card: '#ffffff',
    text: '#111827',
    textMuted: '#6b7280',
    success: '#059669',
    error: '#dc2626'
  }

  const total = answers.length
  const correct = answers.filter(a => a.correct).length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = score >= (cls?.passMark || 70)

  // ... rest of implementation with theme applied
  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1rem' }}>
      {/* Implementation continues with proper theme colors... */}
      <div style={{ width: '100%', maxWidth: '500px', background: theme.card, borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: 800, color: passed ? theme.success : theme.error }}>{score}%</div>
        <button onClick={onDone} style={{ marginTop: '1.5rem', padding: '1rem', background: accentColor, color: 'white', border: 'none', borderRadius: '12px', width: '100%', fontWeight: 600, cursor: 'pointer' }}>
          Return to Ward Map
        </button>
      </div>
    </div>
  )
}