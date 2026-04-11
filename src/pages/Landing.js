import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto', padding: '20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚌</div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: 'white' }}>BusBuddy</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-outline-white" style={{ padding: '9px 22px', fontSize: 14 }} onClick={() => navigate('/login')}>Log In</button>
          <button className="btn-white" style={{ padding: '9px 22px', fontSize: 14 }} onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </nav>

      <div className="landing-hero">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 13, marginBottom: 24, color: '#FCD34D' }}>
          ✨ Now with real-time tracking
        </div>
        <h1>Smart Bus Management<br />for <span className="accent">Modern Universities</span></h1>
        <p>Track buses in real time, manage routes, and keep students, parents, and drivers connected — all in one platform.</p>
        <div className="hero-btns">
          <button className="btn-white" onClick={() => navigate('/login')}>🚀 Launch Dashboard</button>
          <button className="btn-outline-white">📖 View Demo</button>
        </div>

        <div className="hero-cards">
          {[
            { icon: '🚌', num: '24', label: 'Active Buses' },
            { icon: '👥', num: '1,200+', label: 'Students Served' },
            { icon: '🗺️', num: '12', label: 'Active Routes' },
            { icon: '📍', num: '99.2%', label: 'On-Time Rate' },
          ].map(c => (
            <div key={c.label} className="hero-card">
              <div className="hc-icon">{c.icon}</div>
              <div className="hc-num">{c.num}</div>
              <div className="hc-label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-features">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ color: 'white', fontSize: 32 }}>Everything you need</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 10, fontSize: 16 }}>Four role-based dashboards, built for every stakeholder</p>
        </div>
        <div className="feature-grid">
          {[
            { icon: '🛡️', title: 'Admin Control', desc: 'Manage buses, drivers, routes, and users from a central command dashboard.' },
            { icon: '🚦', title: 'Driver Tools', desc: 'Start trips, mark stops, update status, and stay in sync with dispatch.' },
            { icon: '📱', title: 'Student Portal', desc: 'Track your bus live, check schedules, and submit feedback instantly.' },
            { icon: '👨‍👩‍👧', title: 'Parent Alerts', desc: 'Get notified when your child boards and alights. Peace of mind, always.' },
          ].map(f => (
            <div key={f.title} className="feature-item">
              <div className="fi-icon">{f.icon}</div>
              <div className="fi-title">{f.title}</div>
              <div className="fi-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60, paddingBottom: 60 }}>
          <button className="btn-white" style={{ padding: '14px 40px', fontSize: 16 }} onClick={() => navigate('/login')}>
            Get Started Free →
          </button>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 12, fontSize: 13 }}>No setup required. Demo credentials provided.</p>
        </div>
      </div>
    </div>
  );
}
