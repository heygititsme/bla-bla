import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BusProvider } from './context/BusContext';
import './styles/index.css';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBuses from './pages/admin/AdminBuses';
import AdminRoutes from './pages/admin/AdminRoutes';
import AdminUsers from './pages/admin/AdminUsers';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminTracking from './pages/admin/AdminTracking';

// Driver
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverAttendance from './pages/driver/DriverAttendance';
import { DriverRoute, DriverTrip } from './pages/driver/DriverRoute';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentBus from './pages/student/StudentBus';
import { StudentTracking, StudentSchedule, StudentFeedback } from './pages/student/StudentPages';

// Parent
import ParentDashboard from './pages/parent/ParentPages';
import { ParentTracking, ParentAlerts, ParentDriverInfo } from './pages/parent/ParentPages';

import ProtectedRoute from './components/common/ProtectedRoute';

function RoleRedirect() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Navigate to={`/${currentUser.role}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<RoleRedirect />} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/buses" element={<ProtectedRoute role="admin"><AdminBuses /></ProtectedRoute>} />
            <Route path="/admin/routes" element={<ProtectedRoute role="admin"><AdminRoutes /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><AdminComplaints /></ProtectedRoute>} />
            <Route path="/admin/tracking" element={<ProtectedRoute role="admin"><AdminTracking /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute role="admin"><Profile /></ProtectedRoute>} />

            {/* Driver */}
            <Route path="/driver" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
            <Route path="/driver/route" element={<ProtectedRoute role="driver"><DriverRoute /></ProtectedRoute>} />
            <Route path="/driver/attendance" element={<ProtectedRoute role="driver"><DriverAttendance /></ProtectedRoute>} />
            <Route path="/driver/trip" element={<ProtectedRoute role="driver"><DriverTrip /></ProtectedRoute>} />
            <Route path="/driver/profile" element={<ProtectedRoute role="driver"><Profile /></ProtectedRoute>} />

            {/* Student */}
            <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/bus" element={<ProtectedRoute role="student"><StudentBus /></ProtectedRoute>} />
            <Route path="/student/tracking" element={<ProtectedRoute role="student"><StudentTracking /></ProtectedRoute>} />
            <Route path="/student/schedule" element={<ProtectedRoute role="student"><StudentSchedule /></ProtectedRoute>} />
            <Route path="/student/feedback" element={<ProtectedRoute role="student"><StudentFeedback /></ProtectedRoute>} />
            <Route path="/student/profile" element={<ProtectedRoute role="student"><Profile /></ProtectedRoute>} />

            {/* Parent */}
            <Route path="/parent" element={<ProtectedRoute role="parent"><ParentDashboard /></ProtectedRoute>} />
            <Route path="/parent/bus" element={<ProtectedRoute role="parent"><ParentTracking /></ProtectedRoute>} />
            <Route path="/parent/tracking" element={<ProtectedRoute role="parent"><ParentTracking /></ProtectedRoute>} />
            <Route path="/parent/alerts" element={<ProtectedRoute role="parent"><ParentAlerts /></ProtectedRoute>} />
            <Route path="/parent/driver" element={<ProtectedRoute role="parent"><ParentDriverInfo /></ProtectedRoute>} />
            <Route path="/parent/profile" element={<ProtectedRoute role="parent"><Profile /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BusProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
