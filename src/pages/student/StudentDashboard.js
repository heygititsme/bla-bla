import React from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';
import { notifications } from '../../data/mockData';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const { buses, routes, users } = useBus();
  const myBus = buses.find(b => b.id === currentUser.busId);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;
  const myDriver = myBus ? users.find(u => u.id === myBus.driverId) : null;

  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };
  const statusIcon = { 'on-time': '✅', 'delayed': '⚠️', 'inactive': '💤', 'breakdown': '🔧' };

  return (
    <Layout title="My Dashboard" subtitle={`Good morning, ${currentUser.name.split(' ')[0]}!`}>
      {myBus ? (
        <>
          <div className="stat-grid" style={{ marginBottom: 24 }}>
            <div className="stat-card">
              <div className="stat-icon blue">🚌</div>
              <div><div className="stat-value">{myBus.number}</div><div className="stat-label">My Bus</div></div>
            </div>
            <div className="stat-card">
              <div className={`stat-icon ${myBus.status === 'on-time' ? 'green' : myBus.status === 'delayed' ? 'amber' : 'red'}`}>{statusIcon[myBus.status]}</div>
              <div><div className="stat-value" style={{ fontSize: 18, textTransform: 'capitalize' }}>{myBus.status}</div><div className="stat-label">Bus Status</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">👤</div>
              <div><div className="stat-value" style={{ fontSize: 18 }}>{myDriver?.name.split(' ')[0] || 'N/A'}</div><div className="stat-label">Driver</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon amber">⏰</div>
              <div><div className="stat-value">{myRoute?.stops[myRoute.stops.length - 1]?.time || '—'}</div><div className="stat-label">Arrival Time</div></div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <div><div className="card-title">Bus Details</div><div className="card-subtitle">{myBus.model}</div></div>
                <span className={`badge ${statusColor[myBus.status]}`}>{myBus.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Bus Number', value: myBus.number },
                  { label: 'Model', value: myBus.model },
                  { label: 'Capacity', value: `${myBus.totalStudents}/${myBus.capacity} seats` },
                  { label: 'Route', value: myRoute?.name || 'Not assigned' },
                  { label: 'Driver', value: myDriver?.name || 'Unassigned' },
                  { label: 'Contact', value: myDriver ? 'Available on request' : '—' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="card-header"><div className="card-title">Today's Stops</div></div>
                {myRoute ? (
                  <div className="stop-timeline">
                    {myRoute.stops.map((stop, i) => (
                      <div key={stop.id} className="stop-item">
                        <div className={`stop-dot ${i < myBus.currentStop ? 'passed' : i === myBus.currentStop ? 'active' : ''}`} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div className="stop-name">{stop.name}</div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{stop.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <div style={{ color: 'var(--text3)', fontSize: 14, padding: '12px 0' }}>No route info available</div>}
              </div>

              <div className="card">
                <div className="card-header"><div className="card-title">Recent Alerts</div></div>
                {notifications.slice(0, 3).map(n => (
                  <div key={n.id} className={`alert ${n.type}`} style={{ marginBottom: 8 }}>
                    <span className="alert-icon">{n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : n.type === 'danger' ? '🚨' : 'ℹ️'}</span>
                    <div><div className="alert-msg">{n.message}</div><div className="alert-time">{n.time}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state"><div className="empty-icon">🚌</div><p>No bus assigned to your account yet.</p></div>
      )}
    </Layout>
  );
}
