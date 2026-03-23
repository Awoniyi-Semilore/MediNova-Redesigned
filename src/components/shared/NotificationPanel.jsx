import { useEffect, useRef, useState } from 'react'
import { useNotifications } from '../../contexts/NotificationContext'
import { useTheme } from '../../contexts/ThemeContext'
import styles from '../../styles/notifications.module.css'

function NotifIcon({ type }) {
  if (type === 'chief') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#64b5f6" strokeWidth="1.5">
      <circle cx="8" cy="5" r="3"/>
      <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
    </svg>
  )
  if (type === 'review') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ef5350" strokeWidth="1.5">
      <rect x="2" y="2" width="12" height="12" rx="1"/>
      <path d="M5 8h6M5 5h6M5 11h4"/>
    </svg>
  )
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4caf50" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 5v3l2 2"/>
    </svg>
  )
}

function iconClass(type, styles) {
  if (type === 'chief') return `${styles.niIcon} ${styles.niIconChief}`
  if (type === 'review') return `${styles.niIcon} ${styles.niIconReview}`
  return `${styles.niIcon} ${styles.niIconSystem}`
}

function NotifItem({ notif }) {
  const { toggleRead, deleteNotification } = useNotifications()
  const [exiting, setExiting] = useState(false)

  function handleDelete() {
    setExiting(true)
    setTimeout(() => deleteNotification(notif.id), 260)
  }

  return (
    <div className={[
      styles.notifItem,
      notif.unread ? styles.notifUnread : '',
      exiting ? styles.notifExiting : ''
    ].join(' ')}>
      <div className={iconClass(notif.type, styles)}>
        <NotifIcon type={notif.type} />
      </div>

      <div className={styles.niBody}>
        <div className={`${styles.niFrom} ${notif.unread ? styles.niFromUnread : styles.niFromRead}`}>
          {notif.from}
        </div>
        <div className={styles.niTitle}>{notif.title}</div>
        <div className={styles.niText}>{notif.text}</div>
        <div className={styles.niTime}>{notif.time}</div>
      </div>

      <div className={styles.niActions}>
        <button
          className={`${styles.niActionBtn} ${styles.niMarkBtn}`}
          onClick={() => toggleRead(notif.id)}
          title={notif.unread ? 'Mark as read' : 'Mark as unread'}
        >
          {notif.unread
            ? <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#1565c0" strokeWidth="2"><path d="M3 8l4 4 6-6"/></svg>
            : <svg width="10" height="10" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#1565c0"/></svg>
          }
        </button>
        <button
          className={`${styles.niActionBtn} ${styles.niDeleteBtn}`}
          onClick={handleDelete}
          title="Delete"
        >
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="#ef5350" strokeWidth="2">
            <path d="M3 3l10 10M13 3L3 13"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function NotificationPanel() {
  const {
    notifications,
    unreadCount,
    panelOpen,
    closePanel,
    markAllRead,
    clearAll
  } = useNotifications()
  const { isDark } = useTheme()
  const [ecgDrawn, setEcgDrawn] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (panelOpen) {
      setTimeout(() => setEcgDrawn(true), 200)
    } else {
      setEcgDrawn(false)
    }
  }, [panelOpen])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && panelOpen) closePanel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [panelOpen, closePanel])

  const themeClass = isDark ? styles.dark : styles.light

  return (
    <>
      <div
        className={`${styles.backdrop} ${panelOpen ? styles.backdropOpen : ''}`}
        onClick={closePanel}
      />

      <div
        ref={panelRef}
        className={`${styles.panel} ${panelOpen ? styles.panelOpen : ''} ${themeClass}`}
      >
        <div className={styles.panelHead}>
          <div className={styles.phLeft}>
            <div className={styles.phCross}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                <rect x="4" y="0" width="2" height="10"/>
                <rect x="0" y="4" width="10" height="2"/>
              </svg>
            </div>
            <div className={styles.phTitle}>Staff Notifications</div>
          </div>
          <div className={styles.phRight}>
            {unreadCount > 0 && (
              <div className={styles.phCount}>{unreadCount} Unread</div>
            )}
            <div className={styles.phClose} onClick={closePanel}>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"
                stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
                <path d="M3 3l10 10M13 3L3 13"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.panelEcg}>
          <svg className={styles.ecgSvg} viewBox="0 0 400 22" preserveAspectRatio="none">
            <path
              className={`${styles.ecgPath} ${ecgDrawn ? styles.ecgDraw : ''}`}
              d="M0,11 L60,11 L70,11 L75,1 L80,21 L85,1 L90,11 L150,11 L160,11 L165,1 L170,21 L175,1 L180,11 L240,11 L250,11 L255,1 L260,21 L265,1 L270,11 L330,11 L340,11 L345,1 L350,21 L355,1 L360,11 L400,11"
            />
          </svg>
        </div>

        <div className={styles.panelActions}>
          <div className={styles.paLabel}>
            {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
          </div>
          <div className={styles.paBtns}>
            <button
              className={`${styles.paBtn} ${styles.paBtnRead}`}
              onClick={markAllRead}
            >
              Mark All Read
            </button>
            <button
              className={`${styles.paBtn} ${styles.paBtnClear}`}
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>
        </div>

        <div className={styles.notifList}>
          {notifications.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"
                  stroke="#b0bec5" strokeWidth="1.5">
                  <path d="M8 1a5 5 0 0 1 5 5v3l1 2H2l1-2V6a5 5 0 0 1 5-5zM6.5 13a1.5 1.5 0 0 0 3 0"/>
                </svg>
              </div>
              <div className={styles.emptyText}>No notifications</div>
              <div className={styles.emptySubtext}>
                You are all caught up. Check back later for updates from the Chief of Staff.
              </div>
            </div>
          ) : (
            notifications.map(n => (
              <NotifItem key={n.id} notif={n} />
            ))
          )}
        </div>

        <div className={styles.panelFooter}>
          <div className={styles.pfText}>
            MediNova Teaching Hospital · Staff Portal
          </div>
        </div>
      </div>
    </>
  )
}