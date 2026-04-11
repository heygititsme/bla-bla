import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = {
  admin: [
    { label: 'Overview', icon: '📊', path: '/admin' },
    { label: 'Buses', icon: '🚌', path: '/admin/buses' },
    { label: 'Routes', icon: '🗺️', path: '/admin/routes' },
    { label: 'Users', icon: '👥', path: '/admin/users' },
    { label: 'Complaints', icon: '📝', path: '/admin/complaints', badge: 2 },
    { label: 'Tracking', icon: '📍', path: '/admin/tracking' },
  ],
  driver: [
    { label: 'Dashboard', icon: '📊', path: '/driver' },
    { label: 'My Route', icon: '🗺️', path: '/driver/route' },
    { label: 'Attendance', icon: '✅', path: '/driver/attendance' },
    { label: 'Trip Status', icon: '🚦', path: '/driver/trip' },
  ],
  student: [
    { label: 'Dashboard', icon: '📊', path: '/student' },
    { label: 'My Bus', icon: '🚌', path: '/student/bus' },
    { label: 'Live Tracking', icon: '📍', path: '/student/tracking' },
    { label: 'Schedule', icon: '⏰', path: '/student/schedule' },
    { label: 'Feedback', icon: '💬', path: '/student/feedback' },
  ],
  parent: [
    { label: 'Dashboard', icon: '📊', path: '/parent' },
    { label: "Child's Bus", icon: '🚌', path: '/parent/bus' },
    { label: 'Live Tracking', icon: '📍', path: '/parent/tracking' },
    { label: 'Alerts', icon: '🔔', path: '/parent/alerts', badge: 2 },
    { label: 'Driver Info', icon: '👤', path: '/parent/driver' },
  ],
};

const roleColors = { admin: '#7C3AED', driver: '#059669', student: '#1D4ED8', parent: '#EA580C' };

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;
  const items = navItems[currentUser.role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🚌</div>
        <div>
          <div className="logo-text">BusBuddy</div>
          <div className="logo-sub">Smart Transit</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          {items.map(item => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="sidebar-section" style={{ marginTop: 16 }}>
          <div className="sidebar-section-label">Account</div>
          <button className="nav-item" onClick={() => navigate(`/${currentUser.role}/profile`)}>
            <span className="nav-icon">👤</span>
            Profile
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar" style={{ background: `linear-gradient(135deg, ${roleColors[currentUser.role]}, #818CF8)` }}>
            {currentUser.avatar}
          </div>
          <div className="user-info">
            <div className="name">{currentUser.name}</div>
            <div className="role">{currentUser.role}</div>
          </div>
          <button className="logout-btn" title="Logout" onClick={logout}>⬅</button>
        </div>
      </div>
    </aside>
  );
}
