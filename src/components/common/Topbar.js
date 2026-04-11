import React, { useState } from 'react';
import { notifications } from '../../data/mockData';

export default function Topbar({ title, subtitle }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      <div className="topbar-actions">
        <div style={{ position: 'relative' }}>
          <button className="topbar-btn" onClick={() => setShowNotifs(!showNotifs)}>
            🔔
            {unread > 0 && <span className="notification-dot" />}
          </button>
          {showNotifs && (
            <div style={{
              position: 'absolute', right: 0, top: '110%',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)',
              width: 320, zIndex: 100, overflow: 'hidden'
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 14 }}>
                Notifications
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  background: n.read ? 'transparent' : 'var(--surface2)',
                  display: 'flex', gap: 10, alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: 16 }}>
                    {n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : n.type === 'danger' ? '🚨' : 'ℹ️'}
                  </span>
                  <div>
                    <div style={{ fontSize: 13 }}>{n.message}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="topbar-btn">⚙️</button>
      </div>
    </header>
  );
}
