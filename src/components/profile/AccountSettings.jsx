import { useState } from 'react'
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import styles from '../../styles/profile.module.css'

export default function AccountSettings({ currentUser }) {
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [email] = useState(currentUser?.email || '')
  const [track, setTrack] = useState('Physician / Med Student')
  const [profileMsg, setProfileMsg] = useState('')

  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)

  async function handleSaveProfile() {
    try {
      await updateProfile(auth.currentUser, { displayName })
      setProfileMsg('Profile updated successfully.')
      setTimeout(() => setProfileMsg(''), 3000)
    } catch {
      setProfileMsg('Failed to update profile.')
    }
  }

  async function handleUpdatePassword() {
    setPwdMsg('')
    if (!currentPwd || !newPwd || !confirmPwd) { setPwdMsg('Please fill in all fields.'); return }
    if (newPwd !== confirmPwd) { setPwdMsg('New passwords do not match.'); return }
    if (newPwd.length < 8) { setPwdMsg('Password must be at least 8 characters.'); return }
    setPwdLoading(true)
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPwd)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPwd)
      setPwdMsg('Password updated successfully.')
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('')
    } catch (e) {
      if (e.code === 'auth/wrong-password') setPwdMsg('Current password is incorrect.')
      else setPwdMsg('Failed to update password. Please try again.')
    } finally {
      setPwdLoading(false)
      setTimeout(() => setPwdMsg(''), 4000)
    }
  }

  async function handleSignOutAll() {
    await signOut(auth)
  }

  return (
    <div className={styles.twoCol}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
              <svg width="7" height="7" viewBox="0 0 10 10" fill="white">
                <rect x="4" y="0" width="2" height="10"/>
                <rect x="0" y="4" width="10" height="2"/>
              </svg>
            </div>
            <div className={styles.chTitle}>Edit Profile</div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.fGroup}>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Display Name</label>
              <input className={styles.fInput} type="text" value={displayName}
                onChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Email Address</label>
              <input className={styles.fInput} type="email" value={email} disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Role Track</label>
              <select className={styles.fSelect} value={track} onChange={e => setTrack(e.target.value)}>
                <option>Physician / Med Student</option>
                <option>Registered Nurse</option>
                <option>Paramedic / First Responder</option>
              </select>
            </div>
          </div>
          {profileMsg && <div style={{ fontSize: '0.75rem', color: '#2e7d32', marginTop: '0.6rem', fontFamily: 'Share Tech Mono, monospace' }}>{profileMsg}</div>}
          <button className={styles.btnPrimary} onClick={handleSaveProfile}>Save Changes</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
              <svg width="7" height="7" viewBox="0 0 10 10" fill="white">
                <rect x="4" y="0" width="2" height="10"/>
                <rect x="0" y="4" width="10" height="2"/>
              </svg>
            </div>
            <div className={styles.chTitle}>Security</div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.fGroup}>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Current Password</label>
              <input className={styles.fInput} type="password" placeholder="••••••••"
                value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} />
            </div>
            <div className={styles.fRow}>
              <div className={styles.fItem}>
                <label className={styles.fLabel}>New Password</label>
                <input className={styles.fInput} type="password" placeholder="Min. 8 chars"
                  value={newPwd} onChange={e => setNewPwd(e.target.value)} />
              </div>
              <div className={styles.fItem}>
                <label className={styles.fLabel}>Confirm</label>
                <input className={styles.fInput} type="password" placeholder="••••••••"
                  value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} />
              </div>
            </div>
          </div>
          {pwdMsg && <div style={{ fontSize: '0.75rem', color: pwdMsg.includes('success') ? '#2e7d32' : '#c62828', marginTop: '0.6rem', fontFamily: 'Share Tech Mono, monospace' }}>{pwdMsg}</div>}
          <button className={styles.btnPrimary} onClick={handleUpdatePassword} disabled={pwdLoading}>
            {pwdLoading ? 'Updating...' : 'Update Password'}
          </button>
          <button className={styles.btnGhost} onClick={handleSignOutAll}>
            Sign Out of All Devices
          </button>
        </div>
      </div>
    </div>
  )
}