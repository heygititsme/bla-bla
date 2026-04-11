import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demoCredentials } from '../data/mockData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate(`/${result.user.role}`);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  const roleIcons = { admin: '🛡️', driver: '🚦', student: '📚', parent: '👨‍👩‍👧' };

  return (
    <div className="login-page">
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className="login-card">
          <div className="login-logo">
            <div className="li">🚌</div>
            <div>
              <h1>BusBuddy</h1>
              <div style={{ fontSize: 13, color: 'var(--text3)' }}>Smart University Transit</div>
            </div>
          </div>

          <div className="demo-creds">
            <h4>🎯 Quick Demo Login</h4>
            <div className="demo-creds-grid">
              {demoCredentials.map(cred => (
                <button key={cred.role} className="demo-btn" onClick={() => fillDemo(cred)}>
                  <span className="role-badge">{roleIcons[cred.role]} {cred.role}</span>
                  <span className="role-email">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary btn-full" type="submit" disabled={loading} style={{ marginTop: 8, padding: '12px', fontSize: 15 }}>
              {loading ? '⏳ Signing in...' : '🚀 Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text3)' }}>
            <a href="/" style={{ color: 'var(--brand)' }}>← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
