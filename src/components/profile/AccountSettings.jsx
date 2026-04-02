import { useState, useEffect } from 'react'
import { 
  updateProfile, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  signOut 
} from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useProgress } from '../../contexts/ProgressContext'
import styles from '../../styles/profile.module.css'

export default function AccountSettings({ currentUser }) {
  const { track, updateTrack } = useProgress()
  
  // PROFILE STATE
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  const [email] = useState(currentUser?.email || '')
  const [localTrack, setLocalTrack] = useState(track || 'doctor')
  const [profileMsg, setProfileMsg] = useState('')
  
  // AVATAR LOGIC
  const spriteOptions = ['lorelei', 'adventurer', 'avataaars', 'bottts', 'initials']
  const [spriteIndex, setSpriteIndex] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.photoURL || null)

  // Sync initials fallback for the preview if no image is generated yet
  const initials = displayName 
    ? displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
    : '??'

  useEffect(() => {
    const seed = displayName.trim() || currentUser?.email || 'User'
    const styleName = spriteOptions[spriteIndex]
    const newUrl = `https://api.dicebear.com/9.x/${styleName}/svg?seed=${encodeURIComponent(seed)}`
    setAvatarUrl(newUrl)
  }, [displayName, spriteIndex, currentUser?.email])

  const handleNextSprite = () => {
    setSpriteIndex((prev) => (prev + 1) % spriteOptions.length)
  }

  // SECURITY STATE
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)

  async function handleSaveProfile() {
    setProfileMsg('Processing...')
    try {
      await updateProfile(auth.currentUser, { 
        displayName: displayName,
        photoURL: avatarUrl 
      })

      if (updateTrack) {
        await updateTrack(localTrack)
      }

      setProfileMsg('Clinical record updated.')
      setTimeout(() => setProfileMsg(''), 3000)
      // Force a reload or state refresh if your parent component doesn't auto-update
      window.location.reload(); 
    } catch (error) {
      console.error(error)
      setProfileMsg('Update failed.')
    }
  }

  async function handleUpdatePassword() {
    setPwdMsg('')
    if (!currentPwd || !newPwd || !confirmPwd) { setPwdMsg('Required fields empty.'); return }
    if (newPwd !== confirmPwd) { setPwdMsg('Passwords do not match.'); return }
    setPwdLoading(true)
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPwd)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPwd)
      setPwdMsg('Password updated.')
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('')
    } catch (e) {
      setPwdMsg('Authentication failed.')
    } finally {
      setPwdLoading(false)
      setTimeout(() => setPwdMsg(''), 4000)
    }
  }

  return (
    <div className={styles.twoCol}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
               <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
            </div>
            <div className={styles.chTitle}>Dossier Update</div>
          </div>
        </div>
        
        <div className={styles.cardBody}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            {/* MATCHING THE PROFILEHERO STYLE */}
            <div className={styles.avatarRing} onClick={handleNextSprite} style={{ cursor: 'pointer' }}>
               <div className={styles.avatarInner}>
                  <img src={avatarUrl} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
               </div>
               <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#1565c0', borderRadius: '50%', padding: '5px', border: '2px solid white' }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
               </div>
            </div>
            <p style={{ fontSize: '0.6rem', color: '#90a4ae', marginTop: '10px', fontFamily: 'monospace' }}>CLICK CIRCLE TO ROTATE AVATAR STYLE</p>
          </div>

          <div className={styles.fGroup}>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Full Name</label>
              <input className={styles.fInput} type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Medical Track</label>
              <select className={styles.fSelect} value={localTrack} onChange={e => setLocalTrack(e.target.value)}>
                <option value="doctor">Physician / Med Student</option>
                <option value="nurse">Registered Nurse</option>
                <option value="paramedic">Paramedic / EMS</option>
              </select>
            </div>
          </div>
          {profileMsg && <div style={{ fontSize: '0.7rem', color: '#2e7d32', margin: '0.5rem 0' }}>{profileMsg}</div>}
          <button className={styles.btnPrimary} onClick={handleSaveProfile}>Update Profile</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.chLeft}>
            <div className={styles.chCross}>
               <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><rect x="4" y="0" width="2" height="10"/><rect x="0" y="4" width="10" height="2"/></svg>
            </div>
            <div className={styles.chTitle}>Security Settings</div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.fGroup}>
            <div className={styles.fItem}>
              <label className={styles.fLabel}>Current Password</label>
              <input className={styles.fInput} type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} />
            </div>
            <div className={styles.fRow} style={{ display: 'flex', gap: '10px' }}>
              <div className={styles.fItem} style={{ flex: 1 }}>
                <label className={styles.fLabel}>New Password</label>
                <input className={styles.fInput} type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
              </div>
              <div className={styles.fItem} style={{ flex: 1 }}>
                <label className={styles.fLabel}>Confirm</label>
                <input className={styles.fInput} type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} />
              </div>
            </div>
          </div>
          {pwdMsg && <div style={{ fontSize: '0.7rem', color: '#c62828', margin: '0.5rem 0' }}>{pwdMsg}</div>}
          <button className={styles.btnPrimary} onClick={handleUpdatePassword} disabled={pwdLoading}>Change Password</button>
          <button className={styles.btnGhost} onClick={() => signOut(auth)} style={{ marginTop: '1rem', width: '100%' }}>Logout of Session</button>
        </div>
      </div>
    </div>
  )
}