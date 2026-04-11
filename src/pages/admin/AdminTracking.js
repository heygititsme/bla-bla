import React from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';
import MapPlaceholder from '../../components/common/MapPlaceholder';

export default function AdminTracking() {
  const { buses, users } = useBus();
  const driverMap = {};
  users.filter(u => u.role === 'driver').forEach(d => { driverMap[d.id] = d.name; });
  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };

  return (
    <Layout title="Live Fleet Tracking" subtitle="Real-time bus locations">
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div style={{ gridColumn: 'span 1' }}>
          {buses.map(b => (
            <div key={b.id} className="bus-status-strip">
              <div style={{ fontSize: 20 }}>🚌</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{b.number}</span>
                  <span className={`badge ${statusColor[b.status]}`}>{b.status}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>
                  Driver: {b.driverId ? driverMap[b.driverId] : 'Unassigned'} · {b.totalStudents} students
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: b.status === 'inactive' ? '0%' : b.status === 'on-time' ? '65%' : '30%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Active Right Now', value: buses.filter(b => b.status === 'on-time').length, icon: '✅' },
            { label: 'Delayed', value: buses.filter(b => b.status === 'delayed').length, icon: '⚠️' },
            { label: 'Students in Transit', value: buses.reduce((s, b) => s + b.totalStudents, 0), icon: '👥' },
          ].map(s => (
            <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16 }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div>
                <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Live Map — All Buses</div>
          <div style={{ fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite' }} />
            Live
          </div>
        </div>
        <MapPlaceholder height={480} />
      </div>
    </Layout>
  );
}
