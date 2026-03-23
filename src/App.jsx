import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ProgressProvider } from './contexts/ProgressContext'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
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
              <Routes>
                <Route path="/"               element={<OnboardingFlow />} />
                <Route path="/dashboard"      element={<Dashboard />} />
                <Route path="/profile"        element={<Profile />} />
                <Route path="/ward-map"       element={<WardMapPage />} />
                <Route path="/simulation/:classId" element={<SimulationPage />} />
                <Route path="/class/:classId" element={<ClassDetail />} />
                <Route path="*"              element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </ProgressProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}