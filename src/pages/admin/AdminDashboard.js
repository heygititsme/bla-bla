import React from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';
import { useNavigate } from 'react-router-dom';
import MapPlaceholder from '../../components/common/MapPlaceholder';

export default function AdminDashboard() {
  const { buses, routes, users, complaints } = useBus();
  const navigate = useNavigate();

  const activeDrivers = users.filter(u => u.role === 'driver').length;
  const students = users.filter(u => u.role === 'student').length;
  const openComplaints = complaints.filter(c => c.status === 'open').length;

  const stats = [
    { icon: '🚌', color: 'blue', value: buses.length, label: 'Total Buses', change: '+2 this month', up: true },
    { icon: '🗺️', color: 'green', value: routes.length, label: 'Active Routes', change: 'All running', up: true },
    { icon: '👥', color: 'purple', value: students, label: 'Students', change: '+12 this week', up: true },
    { icon: '🚦', color: 'amber', value: activeDrivers, label: 'Drivers', change: `${activeDrivers} active`, up: true },
    { icon: '📝', color: 'red', value: openComplaints, label: 'Open Complaints', change: 'Need attention', up: false },
  ];

  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };
  const driverMap = {};
  users.filter(u => u.role === 'driver').forEach(d => { driverMap[d.id] = d.name; });

  return (
    <Layout title="Admin Dashboard" subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}>
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.up ? 'up' : 'down'}`}>
                {s.up ? '↑' : '↓'} {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Bus Fleet Status</div>
              <div className="card-subtitle">All {buses.length} buses</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/buses')}>Manage →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {buses.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.number}</strong><br /><span style={{ fontSize: 12, color: 'var(--text3)' }}>{b.model}</span></td>
                    <td>{b.driverId ? driverMap[b.driverId] : <span style={{ color: 'var(--text3)' }}>Unassigned</span>}</td>
                    <td>{b.totalStudents}/{b.capacity}</td>
                    <td><span className={`badge ${statusColor[b.status]}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Complaints</div>
              <div className="card-subtitle">{openComplaints} open</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/complaints')}>View All →</button>
          </div>
          {complaints.slice(0, 4).map(c => (
            <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: c.status === 'open' ? '#FEF2F2' : '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                {c.status === 'open' ? '🔴' : '✅'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.type}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }} className="truncate">{c.message}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{c.userName} · {c.date}</div>
              </div>
              <span className={`badge ${c.status}`} style={{ flexShrink: 0, alignSelf: 'flex-start' }}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Live Fleet Map</div>
            <div className="card-subtitle">Real-time positions</div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/tracking')}>Full Screen →</button>
        </div>
        <MapPlaceholder height={300} />
      </div>
    </Layout>
  );
}
