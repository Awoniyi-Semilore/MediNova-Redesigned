// src/components/onboarding/OnboardingFlow.jsx

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/onboarding.module.css'

import CardWelcome from './CardWelcome'
import CardLogin from './CardLogin'
import CardNotice from './CardNotice'
import WelcomeScene from './WelcomeScene'

const CARDS = ['welcome', 'login', 'notice']

export default function OnboardingFlow() {
  const navigate = useNavigate()

  const [stack, setStack] = useState(['welcome'])
  const [userData, setUserData] = useState({ name: '', role: '', initials: '' })
  const [showWelcome, setShowWelcome] = useState(false)
  const [exiting, setExiting] = useState(null)

  const timerRef = useRef(null)

  const current = stack[stack.length - 1]

  function transitionTo(next) {
    const prev = stack[stack.length - 1]
    setExiting(prev)

    timerRef.current = setTimeout(() => {
      setExiting(null)
      setStack(s => [...s, next])
    }, 600)
  }

  // ✅ FIXED: Accept full user data from CardLogin
  function handleAuth(email, role, fullUserData = null) {
    const name = fullUserData?.name || email?.split('@')[0] || 'Learner'
    const initials = name.slice(0, 2).toUpperCase()

    const user = { name, role, initials }

    setUserData(user)

    // ✅ SAVE SESSION (already done in CardLogin, but ensure consistency)
    // CardLogin now saves medinova_session_user with uid, email, name, role, track
    console.log('[OnboardingFlow] Auth success. User:', user)

    transitionTo('notice')
  }

  function handleEnterWard() {
    setShowWelcome(true)
  }

  function handleDashboard() {
    navigate('/dashboard')
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const dotMap = { welcome: 0, login: 1, notice: 2 }
  const activeDot = dotMap[current] ?? 0

  function cardClass(key) {
    if (exiting === key) return `${styles.card} ${styles.cardExit}`
    if (current === key) return `${styles.card} ${styles.cardActive}`
    return styles.card
  }

  return (
    <div className={styles.root}>
      <img className={styles.bg} src="/images/hospital.jpeg" alt="" />
      <div className={styles.overlay} />

      <div className={styles.topBar}>
        <div className={styles.logo}>
          Medi<span className={styles.logoAccent}>Nova</span>
        </div>
      </div>

      <div className={styles.stage}>

        <div className={cardClass('welcome')}>
          <CardWelcome onNext={() => transitionTo('login')} />
        </div>

        <div className={cardClass('login')}>
          <CardLogin onAuth={handleAuth} />
        </div>

        <div className={cardClass('notice')}>
          <CardNotice userData={userData} onEnter={handleEnterWard} />
        </div>

      </div>

      <div className={styles.dots}>
        {CARDS.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i === activeDot ? styles.dotActive : ''}`} />
        ))}
      </div>

      <WelcomeScene
        visible={showWelcome}
        name={userData.name}
        onDashboard={handleDashboard}
      />
    </div>
  )
}