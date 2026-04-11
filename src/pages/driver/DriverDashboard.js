import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';

export default function DriverDashboard() {
  const { currentUser } = useAuth();
  const { buses, routes, updateBus } = useBus();
  const [tripActive, setTripActive] = useState(false);

  const myBus = buses.find(b => b.driverId === currentUser.id);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;

  const statusOptions = ['on-time', 'delayed', 'breakdown'];
  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'breakdown': 'danger', 'inactive': 'info' };

  const toggleTrip = () => {
    if (myBus) {
      updateBus(myBus.id, { status: tripActive ? 'inactive' : 'on-time' });
      setTripActive(!tripActive);
    }
  };

  if (!myBus) return (
    <Layout title="Driver Dashboard" subtitle="Welcome back">
      <div className="empty-state"><div className="empty-icon">🚌</div><p>No bus assigned to you yet. Contact your admin.</p></div>
    </Layout>
  );

  return (
    <Layout title="Driver Dashboard" subtitle={`Welcome, ${currentUser.name}`}>
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon blue">🚌</div>
          <div><div className="stat-value">{myBus.number}</div><div className="stat-label">Assigned Bus</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">👥</div>
          <div><div className="stat-value">{myBus.totalStudents}</div><div className="stat-label">Students Today</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">🛑</div>
          <div><div className="stat-value">{myRoute?.stops.length || 0}</div><div className="stat-label">Stops</div></div>
        </div>
        <div className="stat-card">
          <div className={`stat-icon ${tripActive ? 'green' : 'red'}`}>{tripActive ? '🟢' : '🔴'}</div>
          <div><div className="stat-value">{tripActive ? 'Active' : 'Idle'}</div><div className="stat-label">Trip Status</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Trip Control</div></div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{tripActive ? '🚦' : '🅿️'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{tripActive ? 'Trip In Progress' : 'Trip Not Started'}</div>
            <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>
              {myRoute ? `Route: ${myRoute.name}` : 'No route assigned'}
            </div>
            <button className={`btn btn-full ${tripActive ? 'btn-danger' : 'btn-success'}`} style={{ padding: 14, fontSize: 15 }} onClick={toggleTrip}>
              {tripActive ? '⏹ Stop Trip' : '▶ Start Trip'}
            </button>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 8 }}>
            <div className="form-label" style={{ marginBottom: 8 }}>Update Bus Status</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {statusOptions.map(s => (
                <button key={s} className={`btn btn-sm ${myBus.status === s ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, textTransform: 'capitalize' }}
                  onClick={() => updateBus(myBus.id, { status: s })}>
                  {s === 'on-time' ? '✅' : s === 'delayed' ? '⚠️' : '🔧'} {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Today's Route</div>
            <span className={`badge ${statusColor[myBus.status]}`}>{myBus.status}</span>
          </div>
          {myRoute ? (
            <div className="stop-timeline">
              {myRoute.stops.map((stop, i) => (
                <div key={stop.id} className="stop-item">
                  <div className={`stop-dot ${i < (myBus.currentStop || 0) ? 'passed' : i === (myBus.currentStop || 0) && tripActive ? 'active' : ''}`} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div className="stop-name">{stop.name}</div>
                      {i === myBus.currentStop && tripActive && <span style={{ fontSize: 11, background: '#EEF2FF', color: 'var(--brand)', padding: '1px 7px', borderRadius: 4 }}>Current</span>}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{stop.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="empty-state" style={{ padding: '30px 0' }}><p>No route assigned</p></div>}
        </div>
      </div>
    </Layout>
  );
}
