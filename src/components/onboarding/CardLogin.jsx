import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import styles from '../../styles/onboarding.module.css'

export default function CardLogin({ onAuth, onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const name = result.user.displayName || email.split('@')[0].replace(/[._]/g, ' ')
      const formatted = name.replace(/\b\w/g, c => c.toUpperCase())
      onAuth(formatted, 'Returning Staff Member')
    } catch {
      setError('Invalid email or password. Please try again.')
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
          <span className={styles.cardHospitalName}>Staff Login Portal</span>
        </div>
        <span className={styles.cardBadge}>SECURE</span>
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
        <div className={styles.eyebrow}>Staff Login</div>
        <div className={styles.redBar} />
        <div className={styles.title}>
          Welcome <span className={styles.titleAccent}>back.</span>
        </div>
        <div className={styles.body}>
          Your records are waiting. Sign in to resume your shifts.
        </div>
        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>Staff Email</label>
            <input className={styles.input} type="email"
              placeholder="you@medinova.org" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={styles.fieldLabel}>Password</label>
            <input className={styles.input} type="password"
              placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            {error && <div className={styles.errorMsg}>{error}</div>}
          </div>
        </div>
        <button className={styles.btnBlue} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Sign In to My Shift →'}
        </button>
        <div className={styles.linkRow}>
          New here? <a onClick={onSwitch}>Create an account</a>
        </div>
      </div>
    </>
  )
}