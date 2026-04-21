import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import styles from '../../styles/onboarding.module.css'

export default function CardLogin({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)

      // ✅ THIS IS THE ONLY REQUIRED LINE
      // AuthContext already listens to Firebase state
      console.log("Logged in:", result.user)

      // optional: navigation handled by ProtectedRoute + auth state
    } catch (e) {
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

      <div className={styles.cardBody}>
        <div className={styles.eyebrow}>Staff Login</div>
        <div className={styles.title}>
          Welcome <span className={styles.titleAccent}>back.</span>
        </div>

        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>Staff Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@medinova.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className={styles.fieldLabel}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            {error && <div className={styles.errorMsg}>{error}</div>}
          </div>
        </div>

        <button
          className={styles.btnBlue}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Sign In →'}
        </button>

        <div className={styles.linkRow}>
          New here? <a onClick={onSwitch}>Create account</a>
        </div>
      </div>
    </>
  )
}
