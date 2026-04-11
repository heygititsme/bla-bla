import React from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';

export default function StudentBus() {
  const { currentUser } = useAuth();
  const { buses, routes, users } = useBus();
  const myBus = buses.find(b => b.id === currentUser.busId);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;
  const driver = myBus ? users.find(u => u.id === myBus.driverId) : null;
  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };

  if (!myBus) return (
    <Layout title="My Bus" subtitle="Bus assignment details">
      <div className="empty-state"><div className="empty-icon">🚌</div><p>No bus assigned to your account.</p></div>
    </Layout>
  );

  return (
    <Layout title="My Bus" subtitle={`${myBus.number} — ${myBus.model}`}>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">{myBus.number}</div><div className="card-subtitle">{myBus.model} · {myBus.year}</div></div>
            <span className={`badge ${statusColor[myBus.status]}`}>{myBus.status}</span>
          </div>
          <div className="progress-bar" style={{ marginBottom: 20 }}>
            <div className="progress-fill" style={{ width: `${(myBus.totalStudents / myBus.capacity) * 100}%` }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16, marginTop: -12 }}>{myBus.totalStudents}/{myBus.capacity} seats occupied</div>
          {[
            { label: 'Bus Model', value: myBus.model },
            { label: 'Year', value: myBus.year },
            { label: 'Capacity', value: `${myBus.capacity} seats` },
            { label: 'Route', value: myRoute?.name || '—' },
            { label: 'Distance', value: myRoute?.totalDistance || '—' },
            { label: 'Journey Time', value: myRoute?.estimatedTime || '—' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
              <span style={{ fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div>
          {driver && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header"><div className="card-title">Your Driver</div></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: 'var(--success)' }}>{driver.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{driver.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text3)' }}>{driver.email}</div>
                  <span className="badge success" style={{ marginTop: 6 }}>On Duty</span>
                </div>
              </div>
            </div>
          )}
          {myRoute && (
            <div className="card">
              <div className="card-header"><div className="card-title">Route Stops</div></div>
              <div className="stop-timeline">
                {myRoute.stops.map((stop, i) => (
                  <div key={stop.id} className="stop-item">
                    <div className={`stop-dot ${i === 0 ? 'active' : ''}`} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="stop-name">{stop.name}</div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{stop.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
