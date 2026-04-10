// src/AppContent.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './contexts/ProgressContext'
import ProtectedRoute from './ProtectedRoute'

import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import Footer from './components/Footer/Footer'
import WardMapPage from './components/ward-map/WardMapPage'
import ClassDetail from './components/ward-map/ClassDetail'
import SimulationPage from './components/simulation/SimulationPage'

export default function AppContent() {
  return (
    <ProgressProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ProgressProvider>
  )
}