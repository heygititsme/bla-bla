import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';

export default function DriverAttendance() {
  const { currentUser } = useAuth();
  const { buses, routes } = useBus();
  const myBus = buses.find(b => b.driverId === currentUser.id);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;

  const [attendance, setAttendance] = useState(
    myRoute ? myRoute.stops.reduce((acc, s) => ({ ...acc, [s.id]: { boarded: 0, alighted: 0, marked: false } }), {}) : {}
  );

  const markStop = (stopId, type, delta) => {
    setAttendance(prev => ({
      ...prev,
      [stopId]: { ...prev[stopId], [type]: Math.max(0, (prev[stopId]?.[type] || 0) + delta) }
    }));
  };

  const toggleMark = (stopId) => {
    setAttendance(prev => ({ ...prev, [stopId]: { ...prev[stopId], marked: !prev[stopId]?.marked } }));
  };

  const totalBoarded = Object.values(attendance).reduce((s, a) => s + (a.boarded || 0), 0);

  return (
    <Layout title="Stop Attendance" subtitle="Mark student boarding per stop">
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card"><div className="stat-icon green">👥</div><div><div className="stat-value">{totalBoarded}</div><div className="stat-label">Total Boarded</div></div></div>
        <div className="stat-card"><div className="stat-icon blue">✅</div><div><div className="stat-value">{Object.values(attendance).filter(a => a.marked).length}</div><div className="stat-label">Stops Marked</div></div></div>
        <div className="stat-card"><div className="stat-icon amber">🛑</div><div><div className="stat-value">{myRoute?.stops.length || 0}</div><div className="stat-label">Total Stops</div></div></div>
      </div>

      {myRoute ? (
        <div className="card">
          <div className="card-header"><div className="card-title">Mark Attendance by Stop</div></div>
          {myRoute.stops.map((stop, i) => {
            const att = attendance[stop.id] || { boarded: 0, alighted: 0, marked: false };
            return (
              <div key={stop.id} style={{ padding: '16px 0', borderBottom: i < myRoute.stops.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: att.marked ? '#ECFDF5' : 'var(--surface2)', border: `2px solid ${att.marked ? 'var(--success)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: att.marked ? 'var(--success)' : 'var(--text3)' }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{stop.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{stop.time}</div>
                    </div>
                  </div>
                  <button className={`btn btn-sm ${att.marked ? 'btn-success' : 'btn-secondary'}`} onClick={() => toggleMark(stop.id)}>
                    {att.marked ? '✅ Marked' : 'Mark Done'}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[{ label: 'Boarded', key: 'boarded', icon: '⬆️' }, { label: 'Alighted', key: 'alighted', icon: '⬇️' }].map(({ label, key, icon }) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface2)', borderRadius: 8, padding: '8px 14px' }}>
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      <span style={{ fontSize: 13, color: 'var(--text3)' }}>{label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm btn-icon" onClick={() => markStop(stop.id, key, -1)}>−</button>
                        <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{att[key] || 0}</span>
                        <button className="btn btn-primary btn-sm btn-icon" onClick={() => markStop(stop.id, key, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state"><div className="empty-icon">🗺️</div><p>No route assigned to your bus.</p></div>
      )}
    </Layout>
  );
}
