import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import styles from '../../styles/onboarding.module.css'

export default function CardSignup({ onAuth, onSwitch }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      onAuth(name, 'New Staff Member')
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <div className={styles.cardCross}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <span className={styles.cardHospitalName}>New Staff Registration</span>
        </div>
        <span className={styles.cardBadge}>STEP 02</span>
      </div>

      <div className={styles.ecgStrip}>
        <svg className={styles.ecgSvg} viewBox="0 0 400 24" preserveAspectRatio="none">
          <path className={styles.ecgLine}
            d="M0,12 L60,12 L70,12 L75,2 L80,22 L85,2 L90,12 L100,12
               L160,12 L170,12 L175,2 L180,22 L185,2 L190,12 L200,12
               L260,12 L270,12 L275,2 L280,22 L285,2 L290,12 L300,12
               L360,12 L370,12 L375,2 L380,22 L385,2 L390,12 L400,12"
          />
        </svg>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.eyebrow}>New Staff Registration</div>
        <div className={styles.redBar} />
        <div className={styles.title}>
          Sign your <span className={styles.titleAccent}>contract.</span>
        </div>
        <div className={styles.body}>
          Fill in your details to join the MediNova staff roster.
        </div>
        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>Full Name</label>
            <input className={styles.input} type="text"
              placeholder="Dr. Adeyemi Oluwaseun" value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className={styles.fieldLabel}>Email Address</label>
            <input className={styles.input} type="email"
              placeholder="you@medinova.org" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={styles.fieldLabel}>Password</label>
            <input className={styles.input} type="password"
              placeholder="Min. 8 characters" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            {error && <div className={styles.errorMsg}>{error}</div>}
          </div>
        </div>
        <button className={styles.btnRed} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Create My Account →'}
        </button>
        <div className={styles.linkRow}>
          Already registered? <a onClick={onSwitch}>Sign in</a>
        </div>
      </div>
    </>
  )
}