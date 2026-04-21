import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ProgressProvider } from './contexts/ProgressContext'

import ProtectedRoute from './ProtectedRoute'

// 🔐 IMPORT LOCK SYSTEM
import { isTeachingHospitalAllowed } from './utils/medinovaGate'

// Pages
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import Footer from './components/Footer/Footer'
import WardMapPage from './components/ward-map/WardMapPage'
import ClassDetail from './components/ward-map/ClassDetail'
import SimulationPage from './components/simulation/SimulationPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ProgressProvider>
            <BrowserRouter>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                <Routes>

                  {/* 🔐 PUBLIC ROUTE (LOCKED) */}
                  <Route
                    path="/"
                    element={
                      isTeachingHospitalAllowed()
                        ? <OnboardingFlow />
                        : <Navigate to="https://medinova-core.vercel.app/" replace />
                    }
                  />

                  {/* 🧠 PROTECTED ROUTES */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                      <Footer />
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                      <Footer />
                    </ProtectedRoute>
                  } />

                  <Route path="/ward-map" element={
                    <ProtectedRoute>
                      <WardMapPage />
                      <Footer />
                    </ProtectedRoute>
                  } />

                  <Route path="/simulation/:classId" element={
                    <ProtectedRoute>
                      <SimulationPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/class/:classId" element={
                    <ProtectedRoute>
                      <ClassDetail />
                      <Footer />
                    </ProtectedRoute>
                  } />

                  {/* ❌ CATCH ALL */}
                  <Route
                    path="*"
                    element={
                      isTeachingHospitalAllowed()
                        ? <Navigate to="/" />
                        : <Navigate to="https://medinova-core.vercel.app/" />
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
