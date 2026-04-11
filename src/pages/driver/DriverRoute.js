import React from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';
import MapPlaceholder from '../../components/common/MapPlaceholder';

export function DriverRoute() {
  const { currentUser } = useAuth();
  const { buses, routes } = useBus();
  const myBus = buses.find(b => b.driverId === currentUser.id);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;

  return (
    <Layout title="My Route" subtitle="Your assigned route details">
      {myRoute ? (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <div><div className="card-title" style={{ color: myRoute.color }}>{myRoute.name}</div>
                <div className="card-subtitle">{myRoute.stops.length} stops · {myRoute.totalDistance} · {myRoute.estimatedTime}</div></div>
            </div>
            <div className="stop-timeline">
              {myRoute.stops.map((stop, i) => (
                <div key={stop.id} className="stop-item">
                  <div className={`stop-dot ${i === 0 ? 'active' : ''}`} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="stop-name">{stop.name}</div>
                    <span style={{ fontWeight: 600 }}>{stop.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Route Map</div></div>
            <MapPlaceholder height={380} highlightBusId={myBus?.id} />
          </div>
        </div>
      ) : <div className="empty-state"><div className="empty-icon">🗺️</div><p>No route assigned.</p></div>}
    </Layout>
  );
}

export function DriverTrip() {
  const { currentUser } = useAuth();
  const { buses, updateBus } = useBus();
  const myBus = buses.find(b => b.driverId === currentUser.id);

  const statusOptions = [
    { value: 'on-time', label: 'On Time', icon: '✅', desc: 'Running as scheduled' },
    { value: 'delayed', label: 'Delayed', icon: '⚠️', desc: 'Behind schedule due to traffic' },
    { value: 'breakdown', label: 'Breakdown', icon: '🔧', desc: 'Mechanical issue — need help' },
    { value: 'inactive', label: 'Trip Ended', icon: '🅿️', desc: 'Trip completed or not started' },
  ];

  return (
    <Layout title="Trip Status" subtitle="Update your current trip status">
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-header"><div className="card-title">Current Status</div></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {statusOptions.map(opt => (
            <div key={opt.value}
              onClick={() => myBus && updateBus(myBus.id, { status: opt.value })}
              style={{
                padding: 16, borderRadius: 10, cursor: 'pointer',
                border: `2px solid ${myBus?.status === opt.value ? 'var(--brand)' : 'var(--border)'}`,
                background: myBus?.status === opt.value ? '#EEF2FF' : 'transparent',
                transition: 'all 0.15s'
              }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
