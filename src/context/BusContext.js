import React, { createContext, useContext, useState } from 'react';
import { buses as initialBuses, routes as initialRoutes, complaints as initialComplaints, users as initialUsers } from '../data/mockData';

const BusContext = createContext(null);

export function BusProvider({ children }) {
  const [buses, setBuses] = useState(initialBuses);
  const [routes, setRoutes] = useState(initialRoutes);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [users, setUsers] = useState(initialUsers);

  const addBus = (bus) => setBuses(prev => [...prev, { ...bus, id: Date.now() }]);
  const updateBus = (id, data) => setBuses(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  const deleteBus = (id) => setBuses(prev => prev.filter(b => b.id !== id));

  const addRoute = (route) => setRoutes(prev => [...prev, { ...route, id: Date.now() }]);
  const updateRoute = (id, data) => setRoutes(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteRoute = (id) => setRoutes(prev => prev.filter(r => r.id !== id));

  const addComplaint = (complaint) => setComplaints(prev => [...prev, { ...complaint, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'open' }]);
  const updateComplaintStatus = (id, status) => setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));

  const getBusById = (id) => buses.find(b => b.id === id);
  const getRouteById = (id) => routes.find(r => r.id === id);
  const getDriverById = (id) => users.find(u => u.id === id && u.role === 'driver');

  return (
    <BusContext.Provider value={{
      buses, routes, complaints, users,
      addBus, updateBus, deleteBus,
      addRoute, updateRoute, deleteRoute,
      addComplaint, updateComplaintStatus,
      getBusById, getRouteById, getDriverById,
    }}>
      {children}
    </BusContext.Provider>
  );
}

export const useBus = () => useContext(BusContext);
