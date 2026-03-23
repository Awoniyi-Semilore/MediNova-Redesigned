import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export function useNotifications() {
  return useContext(NotificationContext)
}

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    unread: true,
    type: 'chief',
    from: 'Chief of Staff',
    title: 'Mandatory simulation update — all staff',
    text: 'Effective immediately, all physician track staff are required to complete Class 03 (ER & Trauma Bay) before the end of this calendar month. Failure to comply will result in access restrictions.',
    time: 'Today · 08:02'
  },
  {
    id: 2,
    unread: true,
    type: 'review',
    from: 'Performance Review',
    title: 'Your weekly appraisal has been updated',
    text: 'Your Clinical Performance Review for this period has been assessed. You have completed 2 of 5 required simulations. Please review your dossier for the full report.',
    time: 'Today · 00:00'
  },
  {
    id: 3,
    unread: true,
    type: 'system',
    from: 'System',
    title: 'New login detected on your account',
    text: 'A login to your MediNova account was detected from a new device in Lagos, Nigeria. If this was not you, please change your password immediately.',
    time: 'Yesterday · 22:47'
  },
  {
    id: 4,
    unread: false,
    type: 'chief',
    from: 'Chief of Staff',
    title: 'MediNova scheduled maintenance — Sunday 02:00',
    text: 'The platform will be unavailable for approximately 2 hours this Sunday from 02:00 to 04:00 WAT for scheduled system maintenance. Please save your progress beforehand.',
    time: 'Mon · 09:15'
  },
  {
    id: 5,
    unread: false,
    type: 'review',
    from: 'Performance Review',
    title: "Last week's appraisal — satisfactory",
    text: 'Your performance during last week\'s review period met the required clinical standard. All 5 simulations were completed with an average score of 84%. Well done.',
    time: 'Mon · 00:00'
  }
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [panelOpen, setPanelOpen] = useState(false)

  const unreadCount = notifications.filter(n => n.unread).length

  function openPanel() { setPanelOpen(true) }
  function closePanel() { setPanelOpen(false) }

  function toggleRead(id) {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n)
    )
  }

  function deleteNotification(id) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  function clearAll() {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      panelOpen,
      openPanel,
      closePanel,
      toggleRead,
      deleteNotification,
      markAllRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  )
}