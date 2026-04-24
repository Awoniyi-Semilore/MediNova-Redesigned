// src/components/onboarding/CardLogin.jsx

import { useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import styles from '../../styles/onboarding.module.css'

export default function CardLogin({ onAuth }) {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')

    if (!email || !token) {
      setError('Please enter email and access token.')
      return
    }

    setLoading(true)
    console.log('[CardLogin] Attempting login for email:', email)

        try {
      // ✅ 1. Check user exists in hospital/main/care_users
      const careUsersRef = collection(db, 'hospital', 'main', 'care_users')
      const q = query(careUsersRef, where('email', '==', email))
      console.log('[CardLogin] Querying care_users subcollection for email:', email)
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        console.log('[CardLogin] ❌ User not found in care_users')
        setError('User not found.')
        setLoading(false)
        return
      }

      const userDoc = snapshot.docs[0]
      const userId = userDoc.id
      const userData = userDoc.data()
      console.log('[CardLogin] ✅ User found in care_users. AutoID:', userId, 'Data:', userData)

      // ✅ 2. Get learner token from Firestore
      const hospitalRef = doc(db, 'hospital', 'main')
      const hospitalSnap = await getDoc(hospitalRef)
      console.log('[CardLogin] Hospital config fetched:', hospitalSnap.exists())

      const learnerToken = hospitalSnap.data()?.meta?.token?.learner_token

      if (!learnerToken) {
        console.log('[CardLogin] ❌ No learner_token found in hospital/main')
        setError('System configuration error.')
        setLoading(false)
        return
      }

      // ✅ 3. Validate token
      if (token !== learnerToken) {
        console.log('[CardLogin] ❌ Token mismatch. Entered:', token, 'Expected:', learnerToken)
        setError('Invalid access token.')
        setLoading(false)
        return
      }

      console.log('[CardLogin] ✅ Token validated. Login successful.')

      // ✅ 4. SAVE TO LOCALSTORAGE for ProgressContext to read
      const sessionUser = {
        uid: userId,                    // Firestore doc ID — CRITICAL for ProgressContext
        email: userData.email,
        name: userData.name || userData.email?.split('@')[0] || 'Learner',
        role: 'Learner',
        track: userData.track || 'doctor',
        loggedInAt: new Date().toISOString()
      }
      localStorage.setItem('medinova_session_user', JSON.stringify(sessionUser))
      console.log('[CardLogin] 💾 Saved to localStorage (medinova_session_user):', sessionUser)

      // ✅ 5. Notify parent
      onAuth(userData.email, 'Learner')

    } catch (e) {
      console.error('[CardLogin] ❌ Login error:', e)
      setError('Login failed. Try again.')
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
          <span className={styles.cardHospitalName}>Access Portal</span>
        </div>
        <span className={styles.cardBadge}>TOKEN AUTH</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.eyebrow}>Secure Login</div>
        <div className={styles.title}>
          Enter your <span className={styles.titleAccent}>credentials.</span>
        </div>

        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@medinova.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className={styles.fieldLabel}>Access Token</label>
            <input
              className={styles.input}
              type="text"
              placeholder="LEARNER-123"
              value={token}
              onChange={(e) => setToken(e.target.value)}
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
          {loading ? 'Verifying...' : 'Access System →'}
        </button>
      </div>
    </>
  )
}