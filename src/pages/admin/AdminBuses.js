import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';

function BusModal({ bus, onClose, onSave, users }) {
  const drivers = users.filter(u => u.role === 'driver');
  const [form, setForm] = useState(bus || { number: '', model: '', capacity: 42, status: 'inactive', driverId: null, year: 2024, totalStudents: 0 });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{bus ? 'Edit Bus' : 'Add New Bus'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Bus Number</label>
              <input className="form-input" value={form.number} onChange={e => set('number', e.target.value)} placeholder="BUS-005" />
            </div>
            <div className="form-group">
              <label className="form-label">Model</label>
              <input className="form-input" value={form.model} onChange={e => set('model', e.target.value)} placeholder="Tata Starbus" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Capacity</label>
              <input className="form-input" type="number" value={form.capacity} onChange={e => set('capacity', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input className="form-input" type="number" value={form.year} onChange={e => set('year', parseInt(e.target.value))} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Assign Driver</label>
              <select className="form-select" value={form.driverId || ''} onChange={e => set('driverId', e.target.value ? parseInt(e.target.value) : null)}>
                <option value="">Unassigned</option>
                {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="on-time">On Time</option>
                <option value="delayed">Delayed</option>
                <option value="inactive">Inactive</option>
                <option value="breakdown">Breakdown</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>Save Bus</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBuses() {
  const { buses, users, addBus, updateBus, deleteBus } = useBus();
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = buses.filter(b => b.number.toLowerCase().includes(search.toLowerCase()) || b.model.toLowerCase().includes(search.toLowerCase()));
  const driverMap = {};
  users.filter(u => u.role === 'driver').forEach(d => { driverMap[d.id] = d.name; });

  const handleSave = (form) => {
    if (modal === 'add') addBus(form);
    else updateBus(modal.id, form);
    setModal(null);
  };

  const statusColor = { 'on-time': 'success', 'delayed': 'warning', 'inactive': 'info', 'breakdown': 'danger' };

  return (
    <Layout title="Bus Management" subtitle="Manage your entire fleet">
      {modal && <BusModal bus={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} users={users} />}

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total', value: buses.length, color: 'blue', icon: '🚌' },
          { label: 'On Time', value: buses.filter(b => b.status === 'on-time').length, color: 'green', icon: '✅' },
          { label: 'Delayed', value: buses.filter(b => b.status === 'delayed').length, color: 'amber', icon: '⚠️' },
          { label: 'Breakdown', value: buses.filter(b => b.status === 'breakdown').length, color: 'red', icon: '🔧' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Buses</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input className="form-input" style={{ width: 220 }} placeholder="🔍 Search buses..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-primary" onClick={() => setModal('add')}>+ Add Bus</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bus Number</th><th>Model</th><th>Year</th><th>Capacity</th><th>Driver</th><th>Students</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.number}</strong></td>
                  <td>{b.model}</td>
                  <td>{b.year}</td>
                  <td>{b.capacity}</td>
                  <td>{b.driverId ? driverMap[b.driverId] : <span style={{ color: 'var(--text3)' }}>Unassigned</span>}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${(b.totalStudents / b.capacity) * 100}%` }} />
                      </div>
                      <span style={{ fontSize: 12 }}>{b.totalStudents}/{b.capacity}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${statusColor[b.status]}`}>{b.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setModal(b)}>✏️ Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Delete this bus?')) deleteBus(b.id); }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
