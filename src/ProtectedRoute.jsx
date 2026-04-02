import { Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useProgress } from './contexts/ProgressContext'

export default function ProtectedRoute({ children }) {
  const { currentUser, loading: authLoading } = useAuth()
  const { loading: progressLoading } = useProgress()

  // Show a professional medical loader while verifying identity
  if (authLoading || progressLoading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a1628',
        color: '#1565c0',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid #1a2a40', 
          borderTop: '3px solid #1565c0', 
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '20px', letterSpacing: '2px', fontSize: '10px', fontWeight: 'bold' }}>
          VERIFYING CLINICAL CREDENTIALS...
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/" />
  }

  return children
}