import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';

export default function AdminComplaints() {
  const { complaints, updateComplaintStatus } = useBus();
  const [filter, setFilter] = useState('all');

  const filtered = complaints.filter(c => filter === 'all' || c.status === filter);

  return (
    <Layout title="Complaints & Feedback" subtitle="Manage all reported issues">
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total', value: complaints.length, color: 'blue', icon: '📝' },
          { label: 'Open', value: complaints.filter(c => c.status === 'open').length, color: 'red', icon: '🔴' },
          { label: 'In Progress', value: complaints.filter(c => c.status === 'in-progress').length, color: 'amber', icon: '⚙️' },
          { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: 'green', icon: '✅' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Complaints</div>
          <div className="tabs" style={{ margin: 0, border: 'none' }}>
            {['all', 'open', 'in-progress', 'resolved'].map(s => (
              <button key={s} className={`tab-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)} style={{ textTransform: 'capitalize' }}>{s}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>User</th><th>Type</th><th>Message</th><th>Bus</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.userName}</td>
                  <td><span style={{ fontSize: 13, fontWeight: 500 }}>{c.type}</span></td>
                  <td style={{ maxWidth: 200 }}><span className="truncate" style={{ display: 'block', fontSize: 13, color: 'var(--text3)' }}>{c.message}</span></td>
                  <td>BUS-00{c.busId}</td>
                  <td style={{ fontSize: 13, color: 'var(--text3)' }}>{c.date}</td>
                  <td><span className={`badge ${c.status}`}>{c.status}</span></td>
                  <td>
                    <select className="form-select" style={{ fontSize: 12, padding: '4px 8px' }} value={c.status} onChange={e => updateComplaintStatus(c.id, e.target.value)}>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
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
