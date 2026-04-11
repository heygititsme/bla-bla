import React from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';
import MapPlaceholder from '../../components/common/MapPlaceholder';
import { notifications } from '../../data/mockData';

export default function ParentDashboard() {
  const { currentUser } = useAuth();
  const { buses, routes, users } = useBus();

  const linkedStudent = users.find(u => u.id === currentUser.linkedStudentId);
  const studentBus = linkedStudent ? buses.find(b => b.id === linkedStudent.busId) : null;
  const studentRoute = studentBus ? routes.find(r => r.id === studentBus.routeId) : null;
  const driver = studentBus ? users.find(u => u.id === studentBus.driverId) : null;

  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };

  return (
    <Layout title="Parent Dashboard" subtitle={`Tracking ${linkedStudent?.name || 'your child'}`}>
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon blue">🚌</div>
          <div><div className="stat-value">{studentBus?.number || '—'}</div><div className="stat-label">Child's Bus</div></div>
        </div>
        <div className="stat-card">
          <div className={`stat-icon ${studentBus?.status === 'on-time' ? 'green' : 'amber'}`}>
            {studentBus?.status === 'on-time' ? '✅' : '⚠️'}
          </div>
          <div><div className="stat-value" style={{ fontSize: 18, textTransform: 'capitalize' }}>{studentBus?.status || '—'}</div><div className="stat-label">Bus Status</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">🕐</div>
          <div><div className="stat-value">{studentRoute?.stops[studentRoute.stops.length - 1]?.time || '—'}</div><div className="stat-label">ETA at Univ.</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">🔔</div>
          <div><div className="stat-value">{notifications.filter(n => !n.read).length}</div><div className="stat-label">Unread Alerts</div></div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Child Info</div></div>
          {linkedStudent ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand), #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: 16 }}>{linkedStudent.avatar}</div>
                <div><div style={{ fontWeight: 700, fontSize: 16 }}>{linkedStudent.name}</div><div style={{ fontSize: 13, color: 'var(--text3)' }}>{linkedStudent.email}</div></div>
              </div>
              {[
                { label: 'Assigned Bus', value: studentBus?.number || '—' },
                { label: 'Route', value: studentRoute?.name || '—' },
                { label: 'Driver', value: driver?.name || 'Unassigned' },
                { label: 'Bus Status', value: <span className={`badge ${statusColor[studentBus?.status || 'inactive']}`}>{studentBus?.status || 'inactive'}</span> },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{item.value}</span>
                </div>
              ))}
            </div>
          ) : <div className="empty-state" style={{ padding: '20px 0' }}><p>No student linked.</p></div>}
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">Recent Alerts</div></div>
            {notifications.map(n => (
              <div key={n.id} className={`alert ${n.type}`} style={{ marginBottom: 8, opacity: n.read ? 0.65 : 1 }}>
                <span className="alert-icon">{n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : n.type === 'danger' ? '🚨' : 'ℹ️'}</span>
                <div>
                  <div className="alert-msg">{n.message}</div>
                  <div className="alert-time">{n.time}{n.read ? ' · Read' : ' · New'}</div>
                </div>
              </div>
            ))}
          </div>

          {driver && (
            <div className="card">
              <div className="card-header"><div className="card-title">Driver Info</div></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--success)', fontSize: 15 }}>{driver.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{driver.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text3)' }}>Bus Driver · {studentBus?.number}</div>
                </div>
                <span className="badge success" style={{ marginLeft: 'auto' }}>On Duty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export function ParentTracking() {
  const { currentUser } = useAuth();
  const { users, buses } = useBus();
  const linkedStudent = users.find(u => u.id === currentUser.linkedStudentId);
  return (
    <Layout title="Live Tracking" subtitle={`Tracking ${linkedStudent?.name || 'your child'}'s bus`}>
      <div className="card">
        <div className="card-header"><div className="card-title">Live Map</div></div>
        <MapPlaceholder height={480} highlightBusId={linkedStudent?.busId} />
      </div>
    </Layout>
  );
}

export function ParentAlerts() {
  return (
    <Layout title="Alerts & Notifications" subtitle="All alerts for your child">
      <div style={{ maxWidth: 600 }}>
        {notifications.map(n => (
          <div key={n.id} className={`alert ${n.type}`} style={{ marginBottom: 12, opacity: n.read ? 0.65 : 1 }}>
            <span className="alert-icon" style={{ fontSize: 20 }}>{n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : n.type === 'danger' ? '🚨' : 'ℹ️'}</span>
            <div style={{ flex: 1 }}>
              <div className="alert-msg">{n.message}</div>
              <div className="alert-time">{n.time} · {n.read ? 'Read' : 'Unread'}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export function ParentDriverInfo() {
  const { currentUser } = useAuth();
  const { users, buses } = useBus();
  const linkedStudent = users.find(u => u.id === currentUser.linkedStudentId);
  const myBus = linkedStudent ? buses.find(b => b.id === linkedStudent.busId) : null;
  const driver = myBus ? users.find(u => u.id === myBus.driverId) : null;

  return (
    <Layout title="Driver Information" subtitle="Details about your child's bus driver">
      {driver ? (
        <div style={{ maxWidth: 500 }}>
          <div className="card">
            <div style={{ textAlign: 'center', padding: '24px 0 20px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 28, margin: '0 auto 12px' }}>{driver.avatar}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{driver.name}</div>
              <div style={{ fontSize: 14, color: 'var(--text3)', marginTop: 4 }}>Bus Driver</div>
              <span className="badge success" style={{ marginTop: 10 }}>Active</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              {[
                { label: 'Assigned Bus', value: myBus?.number },
                { label: 'Model', value: myBus?.model },
                { label: 'Email', value: driver.email },
                { label: 'Status', value: 'On Duty' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <div className="empty-state"><div className="empty-icon">👤</div><p>No driver assigned yet.</p></div>}
    </Layout>
  );
}
