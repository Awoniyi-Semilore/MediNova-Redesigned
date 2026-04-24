// src/components/profile/AccountSettings.jsx

import { useState, useEffect } from 'react'
import { updateProfile, signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useProgress } from '../../contexts/ProgressContext'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/profile.module.css'

export default function AccountSettings({ currentUser }) {
  const { track, updateTrack } = useProgress()
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [localTrack, setLocalTrack] = useState(track || 'doctor')
  const [profileMsg, setProfileMsg] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const spriteOptions = ['lorelei', 'adventurer', 'avataaars', 'bottts', 'initials']
  const [spriteIndex, setSpriteIndex] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.photoURL || null)

  useEffect(() => {
    const seed = displayName.trim() || currentUser?.email || 'User'
    const styleName = spriteOptions[spriteIndex]
    const newUrl = `https://api.dicebear.com/9.x/${styleName}/svg?seed=${encodeURIComponent(seed)}`
    setAvatarUrl(newUrl)
  }, [displayName, spriteIndex, currentUser?.email])

  const handleNextSprite = () => {
    setSpriteIndex((prev) => (prev + 1) % spriteOptions.length)
  }

  async function handleSaveProfile() {
    if (!displayName.trim()) return setProfileMsg('Please enter your name.')
    setProfileLoading(true)
    setProfileMsg('Saving changes...')

    try {
      await updateProfile(auth.currentUser, { 
        displayName: displayName,
        photoURL: avatarUrl 
      })

      if (updateTrack) {
        await updateTrack(localTrack)
      }

      setProfileMsg('Profile updated successfully!')
      setTimeout(() => {
        setProfileMsg('')
        setProfileLoading(false)
      }, 2000)
    } catch (error) {
      setProfileMsg('Update failed. Please try again.')
      setProfileLoading(false)
    }
  }

  async function handleLogout() {
    setLogoutLoading(true)
    try {
      await signOut(auth)
      // Clear local session storage
      localStorage.removeItem('medinova_session_user')
      localStorage.removeItem('medinova_care_token')
      // Navigate to login
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      setLogoutLoading(false)
    }
  }

  return (
    <div className={styles.twoCol}>
      {/* Profile Update Card */}
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
               <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
            </div>
            <div className={styles.chTitle}>Edit Profile</div>
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.avatarPreviewWrap}>
            <div className={styles.avatarRing} onClick={handleNextSprite} style={{ cursor: 'pointer' }}>
               <div className={styles.avatarInner}>
                  <img src={avatarUrl} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
               </div>
               <div className={styles.avatarEditDot}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
               </div>
            </div>
            <p className={styles.avatarHint}>Tap avatar to change style</p>
          </div>

          <div className={styles.fGroup}>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Display Name</label>
              <input 
                className={styles.fInput} 
                type="text" 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)} 
                placeholder="Your name"
              />
            </div>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Learning Track</label>
              <select className={styles.fSelect} value={localTrack} onChange={e => setLocalTrack(e.target.value)}>
                <option value="doctor">Physician / Med Student</option>
                <option value="nurse">Registered Nurse</option>
                <option value="paramedic">Paramedic / EMS</option>
              </select>
            </div>
          </div>

          {profileMsg && (
            <div className={`${styles.msgPill} ${profileMsg.includes('failed') ? styles.msgError : styles.msgSuccess}`}>
              {profileMsg}
            </div>
          )}

          <button className={styles.btnPrimary} onClick={handleSaveProfile} disabled={profileLoading}>
            {profileLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Account Actions Card */}
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
               <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
            </div>
            <div className={styles.chTitle}>Account</div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.accountInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{currentUser?.email || 'Not available'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>User ID</span>
              <span className={styles.infoValue}>{currentUser?.uid?.slice(0, 12)}...</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email Verified</span>
              <span className={styles.infoValue}>{currentUser?.emailVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className={styles.actionList}>
            <button 
              className={styles.btnGhost} 
              onClick={handleLogout} 
              disabled={logoutLoading}
            >
              {logoutLoading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}