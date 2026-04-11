import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';

export default function AdminUsers() {
  const { users } = useBus();
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const counts = { admin: users.filter(u => u.role === 'admin').length, driver: users.filter(u => u.role === 'driver').length, student: users.filter(u => u.role === 'student').length, parent: users.filter(u => u.role === 'parent').length };

  return (
    <Layout title="User Management" subtitle="All registered users">
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {[
          { role: 'admin', icon: '🛡️', color: 'purple', count: counts.admin },
          { role: 'driver', icon: '🚦', color: 'green', count: counts.driver },
          { role: 'student', icon: '📚', color: 'blue', count: counts.student },
          { role: 'parent', icon: '👨‍👩‍👧', color: 'amber', count: counts.parent },
        ].map(r => (
          <div key={r.role} className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setFilterRole(r.role === filterRole ? 'all' : r.role)}>
            <div className={`stat-icon ${r.color}`}>{r.icon}</div>
            <div><div className="stat-value">{r.count}</div><div className="stat-label" style={{ textTransform: 'capitalize' }}>{r.role}s</div></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Users ({filtered.length})</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <select className="form-select" style={{ width: 140 }} value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
            <input className="form-input" style={{ width: 220 }} placeholder="🔍 Search users..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>User</th><th>Email</th><th>Role</th><th>Bus ID</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand), #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{u.avatar}</div>
                      <span style={{ fontWeight: 500 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text3)', fontSize: 13 }}>{u.email}</td>
                  <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                  <td>{u.busId ? `BUS-00${u.busId}` : <span style={{ color: 'var(--text3)' }}>—</span>}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">View</button>
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
