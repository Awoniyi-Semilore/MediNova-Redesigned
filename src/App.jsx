import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ProgressProvider } from './contexts/ProgressContext'

import ProtectedRoute from './ProtectedRoute'
import { isTeachingHospitalAllowed } from './utils/medinovaGate'

// Pages
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import Footer from './components/Footer/Footer'
import WardMapPage from './components/ward-map/WardMapPage'
import ClassDetail from './components/ward-map/ClassDetail'
import SimulationPage from './components/simulation/SimulationPage'

/* =========================
   🔐 ACCESS GUARD WRAPPER
========================= */
function RequireAccess({ children }) {
  const [checked, setChecked] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    // small delay ensures sessionStorage is written after redirect
    const timer = setTimeout(() => {
      setAllowed(isTeachingHospitalAllowed())
      setChecked(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // ⏳ prevent flicker / false redirect
  if (!checked) return null

  if (!allowed) {
    return (
      <Navigate
        to="https://medinova-core.vercel.app/"
        replace
      />
    )
  }

  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ProgressProvider>

            <BrowserRouter>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                <Routes>

                  {/* 🔐 PUBLIC ENTRY (LOCKED) */}
                  <Route
                    path="/"
                    element={
                      <RequireAccess>
                        <OnboardingFlow />
                      </RequireAccess>
                    }
                  />

                  {/* 🧠 PROTECTED ROUTES */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <RequireAccess>
                        <Dashboard />
                        <Footer />
                      </RequireAccess>
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <RequireAccess>
                        <Profile />
                        <Footer />
                      </RequireAccess>
                    </ProtectedRoute>
                  } />

                  <Route path="/ward-map" element={
                    <ProtectedRoute>
                      <RequireAccess>
                        <WardMapPage />
                        <Footer />
                      </RequireAccess>
                    </ProtectedRoute>
                  } />

                  <Route path="/simulation/:classId" element={
                    <ProtectedRoute>
                      <RequireAccess>
                        <SimulationPage />
                      </RequireAccess>
                    </ProtectedRoute>
                  } />

                  <Route path="/class/:classId" element={
                    <ProtectedRoute>
                      <RequireAccess>
                        <ClassDetail />
                        <Footer />
                      </RequireAccess>
                    </ProtectedRoute>
                  } />

                  {/* ❌ CATCH ALL */}
                  <Route
                    path="*"
                    element={
                      <RequireAccess>
                        <Navigate to="/" />
                      </RequireAccess>
                    }
                  />

                </Routes>

              </div>
            </BrowserRouter>

          </ProgressProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
