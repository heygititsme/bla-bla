import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';
import MapPlaceholder from '../../components/common/MapPlaceholder';

export function StudentTracking() {
  const { currentUser } = useAuth();
  const { buses, routes } = useBus();
  const myBus = buses.find(b => b.id === currentUser.busId);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;

  return (
    <Layout title="Live Tracking" subtitle="Track your bus in real time">
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Bus Status</div></div>
          {myBus ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 36 }}>🚌</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{myBus.number}</div>
                  <div style={{ fontSize: 13, color: 'var(--text3)' }}>{myBus.model}</div>
                </div>
                <span className={`badge ${myBus.status === 'on-time' ? 'success' : myBus.status === 'delayed' ? 'warning' : 'danger'}`} style={{ marginLeft: 'auto' }}>{myBus.status}</span>
              </div>
              {[
                { label: 'Next Stop', value: myRoute?.stops[myBus.currentStop]?.name || '—' },
                { label: 'ETA', value: myRoute?.stops[myBus.currentStop]?.time || '—' },
                { label: 'Occupancy', value: `${myBus.totalStudents}/${myBus.capacity}` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.value}</span>
                </div>
              ))}
            </div>
          ) : <div className="empty-state" style={{ padding: '20px 0' }}><p>No bus assigned.</p></div>}
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Stop Progress</div></div>
          {myRoute ? (
            <div className="stop-timeline">
              {myRoute.stops.map((stop, i) => (
                <div key={stop.id} className="stop-item">
                  <div className={`stop-dot ${i < (myBus?.currentStop || 0) ? 'passed' : i === (myBus?.currentStop || 0) ? 'active' : ''}`} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="stop-name">{stop.name}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{stop.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="empty-state" style={{ padding: '20px 0' }}><p>No route info.</p></div>}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Live Map</div></div>
        <MapPlaceholder height={360} highlightBusId={currentUser.busId} />
      </div>
    </Layout>
  );
}

export function StudentSchedule() {
  const { currentUser } = useAuth();
  const { buses, routes } = useBus();
  const myBus = buses.find(b => b.id === currentUser.busId);
  const myRoute = myBus ? routes.find(r => r.id === myBus.routeId) : null;

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Layout title="Schedule" subtitle="Your bus schedule for the week">
      {myRoute ? (
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">{myRoute.name}</div><div className="card-subtitle">{myRoute.totalDistance} · {myRoute.estimatedTime}</div></div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Stop</th>
                  {weekdays.map(d => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {myRoute.stops.map(stop => (
                  <tr key={stop.id}>
                    <td style={{ fontWeight: 500 }}>{stop.name}</td>
                    {weekdays.map(d => (
                      <td key={d} style={{ textAlign: 'center', fontWeight: 600, color: 'var(--brand)', fontSize: 13 }}>{stop.time}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : <div className="empty-state"><div className="empty-icon">📅</div><p>No schedule available.</p></div>}
    </Layout>
  );
}

export function StudentFeedback() {
  const { currentUser } = useAuth();
  const { addComplaint, buses } = useBus();
  const [form, setForm] = useState({ type: 'Late Arrival', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const types = ['Late Arrival', 'Driver Behavior', 'Overcrowding', 'Route Issue', 'App Issue', 'Other'];
  const myBus = buses.find(b => b.id === currentUser.busId);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint({ ...form, userId: currentUser.id, userName: currentUser.name, busId: currentUser.busId });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ type: 'Late Arrival', message: '' }); }, 3000);
  };

  return (
    <Layout title="Submit Feedback" subtitle="Help us improve your experience">
      <div style={{ maxWidth: 560 }}>
        {submitted && (
          <div className="alert success" style={{ marginBottom: 20 }}>
            <span className="alert-icon">✅</span>
            <div><div className="alert-msg">Feedback submitted successfully!</div><div className="alert-time">Our team will review it shortly.</div></div>
          </div>
        )}
        <div className="card">
          <div className="card-header"><div className="card-title">Report an Issue</div></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Issue Type</label>
              <select className="form-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Bus</label>
              <input className="form-input" value={myBus ? myBus.number : 'No bus assigned'} disabled />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" placeholder="Describe the issue in detail..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            </div>
            <button className="btn btn-primary btn-full" type="submit">📨 Submit Feedback</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
