// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ProgressProvider } from './contexts/ProgressContext'

import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import Footer from './components/Footer/Footer'
import WardMapPage from './components/ward-map/WardMapPage'
import ClassDetail from './components/ward-map/ClassDetail'
import SimulationPage from './components/simulation/SimulationPage'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import ProtectedRoute from './ProtectedRoute'

/* =========================
   FIREBASE-ONLY GUARD
========================= */
function RequireAuth({ children }) {
  return children;
}

/* =========================
   APP
========================= */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ProgressProvider>

            <BrowserRouter>
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                <Routes>

                  {/* ENTRY */}
                  <Route
                    path="/"
                    element={<OnboardingFlow />}
                  />

                  {/* DASHBOARD */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <RequireAuth>
                          <Dashboard />
                          <Footer />
                        </RequireAuth>
                      </ProtectedRoute>
                    }
                  />

                  {/* PROFILE */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <RequireAuth>
                          <Profile />
                          <Footer />
                        </RequireAuth>
                      </ProtectedRoute>
                    }
                  />

                  {/* WARD MAP */}
                  <Route
                    path="/ward-map"
                    element={
                      <ProtectedRoute>
                        <RequireAuth>
                          <WardMapPage />
                          <Footer />
                        </RequireAuth>
                      </ProtectedRoute>
                    }
                  />

                  {/* SIMULATION */}
                  <Route
                    path="/simulation/:classId"
                    element={
                      <ProtectedRoute>
                        <RequireAuth>
                          <SimulationPage />
                        </RequireAuth>
                      </ProtectedRoute>
                    }
                  />

                  {/* CLASS DETAIL */}
                  <Route
                    path="/class/:classId"
                    element={
                      <ProtectedRoute>
                        <RequireAuth>
                          <ClassDetail />
                          <Footer />
                        </RequireAuth>
                      </ProtectedRoute>
                    }
                  />

                  {/* CATCH ALL */}
                  <Route
                    path="*"
                    element={<Navigate to="/" />}
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
