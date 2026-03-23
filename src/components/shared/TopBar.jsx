import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import styles from '../../styles/shared.module.css'
import NotificationPanel from './NotificationPanel'

export default function TopBar({ backLabel, backPath, pageTitle }) {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { currentUser } = useAuth()
  const { unreadCount, openPanel } = useNotifications()
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      const n = new Date()
      const h = String(n.getHours()).padStart(2, '0')
      const m = String(n.getMinutes()).padStart(2, '0')
      const s = String(n.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const displayName = currentUser?.displayName
    || currentUser?.email?.split('@')[0]
    || 'Doctor'
  const parts = displayName.trim().split(' ')
  const initials = parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
    : displayName.slice(0, 2).toUpperCase()

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.tbLeft}>
          {backLabel && (
            <>
              <button
                className={styles.tbBack}
                onClick={() => navigate(backPath || '/')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 3L5 8l5 5"/>
                </svg>
                {backLabel}
              </button>
              <div className={styles.tbSep} />
            </>
          )}
          <div className={styles.tbCross}>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
              <rect x="4" y="0" width="2" height="10"/>
              <rect x="0" y="4" width="10" height="2"/>
            </svg>
          </div>
          <div className={styles.tbLogo}>
            Medi<span className={styles.tbLogoAccent}>Nova</span>
          </div>
          {pageTitle && (
            <>
              <div className={styles.tbSep} />
              <div className={styles.tbSys}>{pageTitle}</div>
            </>
          )}
        </div>

        <div className={styles.tbRight}>
          <div className={styles.tbLive}>
            <div className={styles.tbLiveDot} />
            On Duty
          </div>
          <div className={styles.tbClock}>{time}</div>

          <div
            className={styles.themeToggle}
            onClick={toggleTheme}
            title="Toggle theme"
          >
            <span className={styles.ttLabel}>
              {isDark ? 'Dark' : 'Light'}
            </span>
            <div className={`${styles.ttTrack} ${isDark ? styles.ttTrackOn : ''}`}>
              <div className={`${styles.ttThumb} ${isDark ? styles.ttThumbOn : ''}`} />
            </div>
          </div>

          <div
            className={styles.tbNotif}
            onClick={openPanel}
            title="Notifications"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
              <path d="M8 1a5 5 0 0 1 5 5v3l1 2H2l1-2V6a5 5 0 0 1 5-5zM6.5 13a1.5 1.5 0 0 0 3 0"/>
            </svg>
            {unreadCount > 0 && <div className={styles.tbNotifDot} />}
          </div>

          <div
            className={styles.tbAvatar}
            onClick={() => navigate('/profile')}
            title="View Profile"
          >
            {initials}
          </div>
        </div>
      </div>

      <NotificationPanel />
    </>
  )
}