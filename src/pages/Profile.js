import React, { useState } from 'react';
// import Layout from '../../components/common/Layout';
// import { useAuth } from '../../context/AuthContext';
import Layout from "../components/common/Layout";
import { AuthContext } from "../context/AuthContext";

const roleColors = { admin: '#7C3AED', driver: '#059669', student: '#1D4ED8', parent: '#EA580C' };

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout title="My Profile" subtitle="Manage your account details">
      <div className="grid-2" style={{ maxWidth: 900 }}>
        <div>
          <div className="card" style={{ marginBottom: 16, textAlign: 'center', padding: '32px 24px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${roleColors[currentUser.role]}, #818CF8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 28, margin: '0 auto 16px' }}>{currentUser.avatar}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{currentUser.name}</div>
            <div style={{ fontSize: 14, color: 'var(--text3)', marginTop: 4 }}>{currentUser.email}</div>
            <span className={`badge ${currentUser.role}`} style={{ marginTop: 12 }}>{currentUser.role}</span>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Account Info</div></div>
            {[
              { label: 'User ID', value: `#${currentUser.id}` },
              { label: 'Role', value: currentUser.role },
              { label: 'Status', value: 'Active' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.label}</span>
                <span style={{ fontWeight: 500, fontSize: 14, textTransform: 'capitalize' }}>{item.value}</span>
              </div>
            ))}
            <button className="btn btn-danger btn-full" style={{ marginTop: 16 }} onClick={logout}>↩ Sign Out</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Edit Profile</div></div>
          {saved && <div className="alert success" style={{ marginBottom: 16 }}><span className="alert-icon">✅</span><div className="alert-msg">Changes saved!</div></div>}
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" defaultValue={currentUser.name} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" defaultValue={currentUser.email} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+91 9876543210" />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" placeholder="Leave blank to keep current" />
            </div>
            <button className="btn btn-primary btn-full" type="submit">💾 Save Changes</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
