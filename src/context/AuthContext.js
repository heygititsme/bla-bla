import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('busbuddy_user');
    if (saved) setCurrentUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      setCurrentUser(safeUser);
      localStorage.setItem('busbuddy_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('busbuddy_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
