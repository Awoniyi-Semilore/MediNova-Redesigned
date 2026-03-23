import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/onboarding.module.css'
import CardWelcome from './CardWelcome'
import CardRoster from './CardRoster'
import CardLogin from './CardLogin'
import CardSignup from './CardSignup'
import CardNotice from './CardNotice'
import WelcomeScene from './WelcomeScene'

const CARDS = ['welcome', 'roster', 'form', 'notice']

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const [stack, setStack] = useState(['welcome'])
  const [formType, setFormType] = useState('login')
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

  function goBack() {
    if (stack.length <= 1) return
    const prev = stack[stack.length - 2]
    setExiting(current)
    timerRef.current = setTimeout(() => {
      setExiting(null)
      setStack(s => s.slice(0, -1))
    }, 600)
  }

  function pickRoster(type) {
    setFormType(type)
    transitionTo('form')
  }

  function handleAuth(name, role) {
    const parts = name.trim().split(' ')
    const initials = parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
      : name.slice(0, 2).toUpperCase()
    setUserData({ name, role, initials })
    transitionTo('notice')
  }

  function handleEnterWard() {
    setShowWelcome(true)
  }

  function handleDashboard() {
    navigate('/dashboard')
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const dotMap = { welcome: 0, roster: 1, form: 2, notice: 3 }
  const activeDot = dotMap[current] ?? 0

  function cardClass(key) {
    if (exiting === key) return `${styles.card} ${styles.cardExit}`
    if (current === key && exiting !== key) return `${styles.card} ${styles.cardActive}`
    return styles.card
  }

  return (
    <div className={styles.root}>
      <img
        className={styles.bg}
        src="/images/hospital.jpeg"
        alt="MediNova Teaching Hospital"
      />
      <div className={styles.overlay} />

      <div className={styles.particles}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className={styles.topBar}>
        <div className={styles.logo}>
          Medi<span className={styles.logoAccent}>Nova</span>
        </div>
        <div className={styles.tagline}>Teaching Hospital · Est. 2024</div>
      </div>

      {stack.length > 1 && !showWelcome && (
        <button className={styles.backBtn} onClick={goBack}>← Back</button>
      )}

      <div className={styles.stage}>
        <div className={cardClass('welcome')}>
          <CardWelcome onNext={() => transitionTo('roster')} />
        </div>

        <div className={cardClass('roster')}>
          <CardRoster onPick={pickRoster} />
        </div>

        <div className={cardClass('form')}>
          {formType === 'login'
            ? <CardLogin onAuth={handleAuth} onSwitch={() => { setFormType('signup') }} />
            : <CardSignup onAuth={handleAuth} onSwitch={() => { setFormType('login') }} />
          }
        </div>

        <div className={cardClass('notice')}>
          <CardNotice userData={userData} onEnter={handleEnterWard} />
        </div>
      </div>

      <div className={styles.dots}>
        {CARDS.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === activeDot ? styles.dotActive : ''}`}
          />
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