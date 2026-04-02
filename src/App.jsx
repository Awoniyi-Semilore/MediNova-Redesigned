import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ProgressProvider } from './contexts/ProgressContext'
import ProtectedRoute from './ProtectedRoute'

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
                  {/* Public Route - Usually no footer here to keep focus on login */}
                  <Route path="/" element={<OnboardingFlow />} />

                  {/* Protected Clinical Routes */}
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
                      {/* Often simulations are full-screen, so you can omit Footer here if desired */}
                    </ProtectedRoute>
                  } />

                  <Route path="/class/:classId" element={
                    <ProtectedRoute>
                      <ClassDetail />
                      <Footer />
                    </ProtectedRoute>
                  } />

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </BrowserRouter>
          </ProgressProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}